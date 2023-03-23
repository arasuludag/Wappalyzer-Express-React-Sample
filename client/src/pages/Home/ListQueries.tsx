import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectWebsites } from "../../slices/websiteAnalyzationSlice";
import WebsiteTable from "./WebsiteTable";

const itemsPerPage = 3;

export default function PaginatedItems() {
  const [currentPage, setCurrentPage] = useState(1);
  const websites = useAppSelector(selectWebsites);

  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;

  const currentItems = websites
    .slice() // Stops reverse from mutating.
    .reverse()
    .slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(websites.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      spacing={0}
      sx={{ height: 300 }}
    >
      <WebsiteTable websites={currentItems} />
      <Pagination
        count={nPages}
        onChange={handlePageClick}
        sx={{ position: "relative", bottom: 0 }}
      />
    </Stack>
  );
}
