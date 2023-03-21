import { CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchBar from "./components/SearchBar";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline enableColorScheme />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <SearchBar />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
