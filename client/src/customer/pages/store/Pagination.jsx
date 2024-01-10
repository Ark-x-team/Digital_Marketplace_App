// Importing necessary libraries and components
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import productStore from "../../../store/products/ProductStore";

// Functional component for pagination
function PaginationCursor() {
  // Destructuring properties and functions from the productStore
  const { totalPage, page, setPage } = productStore();

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect to set the page in the productStore when currentPage changes
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    // Pagination component to display page navigation controls
    <Pagination
      onChange={setCurrentPage} // Handler function for page change
      total={totalPage} // Total number of pages
      page={page} // Current active page
      showControls // Show pagination controls
      color="primary" // Color of the pagination component
      variant="light" // Light variant of the pagination component
      className="my-4 flex justify-center" // Custom styling using Tailwind CSS
    />
  );
}

// Exporting the PaginationCursor component
export default PaginationCursor;
