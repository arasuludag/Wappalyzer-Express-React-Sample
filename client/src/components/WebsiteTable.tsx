import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { WebsiteAnalizationResults } from "../slices/websiteAnalyzationSlice";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function BasicTable(props: {
  websites: WebsiteAnalizationResults[];
}) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    const path = "/details/" + id;
    navigate(path);
  };

  const state = (website: WebsiteAnalizationResults) => {
    if (website.status === "loading") return "Analyzing...";
    else
      return (
        <Button variant="text" onClick={() => handleClick(website.id)}>
          View More
        </Button>
      );
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        display: "table",
        tableLayout: "fixed",
        maxWidth: 800,
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Website</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.websites.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{state(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
