import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ListQueries from "./ListQueries";
import SearchBar from "./SearchBar";

export default function HomePage() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ margin: "50px auto" }}
      rowSpacing={6}
    >
      <Grid item>
        <Typography variant="h2">Silverlight</Typography>
      </Grid>
      <Grid item>
        <SearchBar />
      </Grid>
      <Grid item>
        <ListQueries />
      </Grid>
    </Grid>
  );
}
