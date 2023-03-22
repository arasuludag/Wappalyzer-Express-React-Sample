import Grid from "@mui/material/Grid";
import ListQueries from "../components/ListQueries";
import SearchBar from "../components/SearchBar";

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
        <SearchBar />
      </Grid>
      <Grid item>
        <ListQueries />
      </Grid>
    </Grid>
  );
}
