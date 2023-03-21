import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  addWebsite,
  fetchWebsiteResults,
} from "../slices/websiteAnalyzationSlice";

export default function SearchBar() {
  const [website, setWebsite] = useState<string>("");
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(addWebsite(website));
    dispatch(fetchWebsiteResults(website));
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="URL want to be checked"
          variant="outlined"
          onChange={(event) => {
            setWebsite(event.target.value);
          }}
        />
        <Button type="submit" variant="contained">
          Analyze
        </Button>
      </Stack>
    </form>
  );
}
