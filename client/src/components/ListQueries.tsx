import Pagination from "@mui/material/Pagination";
import { useState } from "react";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const itemsPerPage = 3;

function Items({ currentItems }: { currentItems: any }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: any) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

export default function PaginatedItems() {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: React.ChangeEvent<unknown>, page: number) => {
    const newOffset = ((page - 1) * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <Pagination count={pageCount} onChange={handlePageClick} />
    </>
  );
}
