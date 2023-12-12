import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import productStore from "../../../store/products/ProductStore";

function PaginationCursor() {
  const { totalPage, page, setPage } = productStore();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  return (
    <Pagination
      onChange={setCurrentPage}
      total={totalPage}
      page={page}
      showControls
      color="primary"
      variant="light"
      className="my-4 flex justify-center"
    />
  );
}

export default PaginationCursor;
