import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { selectWebsites } from "../slices/websiteAnalyzationSlice";
import { useAppSelector } from "../app/hooks";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";

export default function BasicTable() {
  const websites = useAppSelector(selectWebsites);
  let { id } = useParams();

  if (id === undefined) return null;

  const website = websites.find((website) => website.id === parseInt(id!));

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      rowSpacing={5}
      sx={{ margin: "50px auto" }}
    >
      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h4">
              {website?.name.replace(/(^\w+:|^)\/\//, "")}'s results
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h4">
              {website?.details.numOfURLs} pages found
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={6}>
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            display: "table",
            tableLayout: "fixed",
            maxWidth: 800,
          }}
        >
          <Table aria-label="details table">
            <TableBody>
              {website
                ? website.details.technologies.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
