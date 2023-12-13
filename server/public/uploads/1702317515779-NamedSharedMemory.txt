// Copyright (C) 2022 Intel Corporation
// SPDX-License-Identifier: MIT
#include <format>
#include "NamedSharedMemory.h"
#include "sddl.h"

#define GOOGLE_GLOG_DLL_DECL
#define GLOG_NO_ABBREVIATED_SEVERITIES
#include <glog/logging.h>

#define PAGE 4096

template<typename T, typename U = T>
constexpr T align(T what, U to) {
    return (what + to - 1) & ~(to - 1);
}

NamedSharedMem::NamedSharedMem()
    : mapfile_handle_(NULL),
      data_offset_base_(sizeof(NamedSharedMemoryHeader)),
      header_(NULL),
      buf_(NULL),
      alloc_granularity_(0),
      refcount_(0),
      buf_created_(false),
      buf_size_(0){};


NamedSharedMem::NamedSharedMem(std::string mapfile_name, uint64_t buf_size)
    : mapfile_handle_(NULL),
      data_offset_base_(sizeof(NamedSharedMemoryHeader)),
      header_(NULL),
      buf_(NULL),
      alloc_granularity_(0),
      refcount_(0),
      buf_created_(false),
      buf_size_(0){

    SYSTEM_INFO system_info;
    GetSystemInfo(&system_info);
    
    alloc_granularity_ = system_info.dwAllocationGranularity;

    CreateSharedMem(std::move(mapfile_name), buf_size);
};

void NamedSharedMem::OutputErrorLog(const char* error_string,
                                    DWORD last_error) {
    try {
        if (last_error != 0) {
            LOG(ERROR) << error_string << last_error << "";
        }
    } catch (...) {
        LOG(ERROR) << error_string << "unknown last error\n";
    }
}

HRESULT NamedSharedMem::CreateSharedMem(std::string mapfile_name, uint64_t buf_size)
{
    HRESULT hr = S_OK;

    if (buf_size == 0) {
        LOG(ERROR) << " CreateSharedMem failed with zero buf_size.";
        return E_FAIL;
    }

    mapfile_name_ = std::move(mapfile_name);

    DWORD buf_size_low = buf_size & 0xFFFFFFFF;
    DWORD buf_size_high = (buf_size & 0xFFFFFFFF00000000ULL) >> 32;

    SECURITY_ATTRIBUTES sa = { sizeof(sa) };
    if (ConvertStringSecurityDescriptorToSecurityDescriptorW(L"D:PNO_ACCESS_CONTROLS:(ML;;NW;;;LW)",
        SDDL_REVISION_1, &sa.lpSecurityDescriptor, NULL))
    {

        mapfile_handle_ = CreateFileMappingA(
            INVALID_HANDLE_VALUE,    // use paging file
            &sa,                    // default security
            PAGE_READWRITE,          // read/write access
            buf_size_high,           // maximum object size (high-order DWORD)
            buf_size_low,                // maximum object size (low-order DWORD)
            mapfile_name_.c_str());                 // name of mapping object

        LocalFree(sa.lpSecurityDescriptor);
    }
    else {
        OutputErrorLog("Failed to set security. Error code: ", GetLastError());
        return E_FAIL;
    }

    if (mapfile_handle_ == NULL) {
        OutputErrorLog("Could not create file mapping object. Error code: ",
                       GetLastError());
        return E_FAIL;
    }

    buf_ = static_cast<void*>(MapViewOfFile(mapfile_handle_,   // handle to map object
        FILE_MAP_ALL_ACCESS, // read/write permission
        0,
        0,
        buf_size));

    if (buf_ == NULL) {
        OutputErrorLog("Could not map view of file. Error code: ",
                       GetLastError());
        CloseHandle(mapfile_handle_);
        return E_FAIL;
    }


    // Populate header info
    memset(buf_, 0, buf_size);

    UnmapViewOfFile(buf_);
    buf_ = NULL;
    
    // Always map header
    header_ = static_cast<NamedSharedMemoryHeader*>(MapViewOfFile(mapfile_handle_,   // handle to map object
        FILE_MAP_ALL_ACCESS, // write permission
        0,
        0,
        PAGE));

    if (header_ == NULL) {
        OutputErrorLog("Could not map view of file. Error code: ",
                       GetLastError());
        return E_FAIL;
    }

    header_->max_entries = (buf_size - sizeof(NamedSharedMemoryHeader)) / sizeof(PmNsmFrameData);
    header_->current_write_offset = data_offset_base_;
    header_->buf_size = buf_size;
    header_->process_active = true;
    header_->num_frames_written = 0;

    // Query qpc frequency
    if (!QueryPerformanceFrequency(&header_->qpc_frequency)) {
      OutputErrorLog("QueryPerformanceFrequency failed with error: ",
                     GetLastError());
    }

    try {
      LOG(INFO) << std::format("Shared mem initialized with size {} bytes.\n",
                               buf_size);
    } catch (...) {
      LOG(INFO) << "Shared mem initialized\n";
    }

    refcount_++;
    buf_created_ = true;
    buf_size_ = buf_size;
    return hr;
}

void NamedSharedMem::OpenSharedMemView(std::string mapfile_name)
{
    mapfile_name_ = mapfile_name;

    mapfile_handle_ = OpenFileMapping(
        FILE_MAP_READ | FILE_MAP_WRITE,   // read/write access
        FALSE,                            // do not inherit the name
        mapfile_name.c_str());            // name of mapping object

    if (mapfile_handle_ == NULL)
    {
        OutputErrorLog("Could not open file mapping object. Error code: ",
                       GetLastError());
        throw std::runtime_error{"failed open file mapping object"};
    }
    else {
        try {
          LOG(INFO) << std::format("Client opened mapfile from {}",
                                   mapfile_name);
        } catch (...) {
          LOG(INFO) << "Client opened mapfile\n";
        }
    }

    // Map header
    header_ = static_cast<NamedSharedMemoryHeader*>(MapViewOfFile(mapfile_handle_,    // handle to map object
        FILE_MAP_READ | FILE_MAP_WRITE ,  // read permission
        0,
        0,
        PAGE));
    
    if (header_ == NULL) {
        OutputErrorLog("Could not map view of file. Error code: ",
                       GetLastError());
        return;
    }
    
    if (header_->buf_size > kBufSize) {
        OutputErrorLog("Named Shared Memory header is incorrect.",
                       0);
      return;
    }

    buf_ = static_cast<void*>(MapViewOfFile(mapfile_handle_,    // handle to map object
        FILE_MAP_READ,  // read permission
        0,
        0,
        header_->buf_size));

    if (buf_ == NULL) {
        OutputErrorLog("Could not map view of file. Error code: ",
                       GetLastError());
    }
}


NamedSharedMem::~NamedSharedMem() {
    if (buf_ != NULL) {
        UnmapViewOfFile(buf_);
        buf_ = NULL;
    }

    if (header_ != NULL) {
        UnmapViewOfFile(header_);
        header_ = NULL;
    }

    if (mapfile_handle_ != NULL) {
        CloseHandle(mapfile_handle_);
        mapfile_handle_ = NULL;
    }
}

void NamedSharedMem::WriteFrameData(PmNsmFrameData* data) {
    uint64_t data_size_bytes = sizeof(PmNsmFrameData);

    uint64_t write_to_offset = header_->current_write_offset;
    if (write_to_offset + data_size_bytes >= header_->buf_size) {
        // not enough space, move to front of the buffer
        write_to_offset = data_offset_base_;
    }

    uint64_t map_offset = (write_to_offset / alloc_granularity_) * alloc_granularity_;
    DWORD map_offset_low = map_offset & 0xFFFFFFFF;
    DWORD map_offset_high = (map_offset & 0xFFFFFFFF00000000ULL) >> 32;

    uint64_t in_map_offset = write_to_offset % alloc_granularity_;

    SIZE_T num_bytes_to_map = ((in_map_offset + sizeof(PmNsmFrameData)) > alloc_granularity_) ? 2 * alloc_granularity_ : alloc_granularity_;

    num_bytes_to_map = num_bytes_to_map > header_->buf_size ? header_->buf_size
                                                            : num_bytes_to_map;

    // Map data region
    buf_ = static_cast<void*>(MapViewOfFile(mapfile_handle_,   // handle to map object
        FILE_MAP_WRITE, // write permission
        map_offset_high,
        map_offset_low,
        num_bytes_to_map));

    if (buf_ == NULL) {
        OutputErrorLog("Could not map view of file. Error code: ",
                       GetLastError());
        return;
    }

    std::memcpy(static_cast<void*>(static_cast<char*>(buf_) + in_map_offset),
        static_cast<void*>(data), sizeof(PmNsmFrameData));

    if (IsFull()) {
      header_->head_idx = (header_->head_idx + 1) % header_->max_entries;
    }

    header_->tail_idx = (header_->tail_idx + 1) % header_->max_entries;
    header_->current_write_offset = write_to_offset + sizeof(PmNsmFrameData);
    header_->num_frames_written++;

    LARGE_INTEGER qpc;
    QueryPerformanceCounter(&qpc);
    LOG(INFO) << data->present_event.ProcessId << "," << qpc.QuadPart
              << "," << data->present_event.SwapChainAddress << "," 
              << "," << data->present_event.PresentStartTime << ","
              << (int)data->present_event.FinalState << ","
              << data->present_event.ScreenTime << "," << header_->tail_idx
              << "," << header_->head_idx << "," << header_->num_frames_written;

    UnmapViewOfFile(buf_);
    buf_ = NULL;
}

// Pop the first frame and move the head_idx
void NamedSharedMem::DequeueFrameData() {
  if (!IsEmpty()) {
    header_->head_idx = (header_->head_idx + 1) % header_->max_entries;
  }
}

bool NamedSharedMem::IsFull() {
    if (header_ == nullptr) {
        return false;
    }

    if (((header_->tail_idx+1) % header_->max_entries) == (header_->head_idx)) {
        return true;
    }

    return false;
}

bool NamedSharedMem::IsEmpty() {
    if ((header_ == nullptr) ||
        (header_->head_idx == header_->tail_idx)) {
        return true;
    }

    return false;
}

void NamedSharedMem::NotifyProcessKilled() {
  header_->process_active = false;
  FlushViewOfFile(header_, sizeof(NamedSharedMemoryHeader));
}

void NamedSharedMem::RecordFirstFrameTime(uint64_t start_qpc) {
    header_->start_qpc = start_qpc;
    // Query qpc frequency
    if (!QueryPerformanceFrequency(&header_->qpc_frequency)) {
      OutputErrorLog("QueryPerformanceFrequency failed with error: ",
                     GetLastError());
    }
}

uint64_t NamedSharedMem::RecordAndGetLastDisplayedQpc(uint64_t qpc) {
  uint64_t last_qpc = ULLONG_MAX;
  last_qpc = header_->last_displayed_qpc;
  header_->last_displayed_qpc = qpc;
  return last_qpc;
}

void NamedSharedMem::WriteTelemetryCapBits(
    std::bitset<static_cast<size_t>(GpuTelemetryCapBits::gpu_telemetry_count)>
        gpu_telemetry_cap_bits,
    std::bitset<static_cast<size_t>(CpuTelemetryCapBits::cpu_telemetry_count)>
        cpu_telemetry_cap_bits) {
  header_->gpuTelemetryCapBits = gpu_telemetry_cap_bits;
  header_->cpuTelemetryCapBits = cpu_telemetry_cap_bits;
}