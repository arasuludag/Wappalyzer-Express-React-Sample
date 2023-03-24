import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  addWebsite,
  fetchWebsiteResults,
} from "../../slices/websiteAnalyzationSlice";

export default function SearchBar() {
  const [website, setWebsite] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(addWebsite(website)); // This is blocking.
    dispatch(fetchWebsiteResults(website));
  }

  useEffect(() => {
    const urlChk =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const urlRegex = new RegExp(urlChk);

    if (website.match(urlRegex)) setIsDisabled(false);
    else setIsDisabled(true);
  }, [website]);

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Stack spacing={2}>
        <TextField
          id="url-query-textfield"
          inputProps={{ "data-testid": "url-query-textfield" }}
          label="URL want to be checked"
          variant="outlined"
          onChange={(event) => {
            setWebsite(event.target.value);
          }}
        />
        <Button
          type="submit"
          data-testid="analyze-button"
          variant="contained"
          disabled={isDisabled}
        >
          Analyze
        </Button>
      </Stack>
    </form>
  );
}
