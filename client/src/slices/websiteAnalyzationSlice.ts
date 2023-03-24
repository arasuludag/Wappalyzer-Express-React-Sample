import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface WebsiteAnalizationDetails {
  numOfURLs: number;
  technologies: string[];
}

export interface WebsiteAnalizationResults {
  id: number;
  name: string;
  status: "idle" | "loading" | "failed";
  details: WebsiteAnalizationDetails;
}

const initialState: {
  results: WebsiteAnalizationResults[];
  nextFreeID: number;
} = {
  results: [],
  nextFreeID: 0,
};

// ID system would need to be changed after implementing a real database and database fetch.

export const websiteAnalyzationSlice = createSlice({
  name: "websiteAnalyzation",
  initialState,
  reducers: {
    addWebsite: (state, action: PayloadAction<string>) => {
      state.results.push({
        id: state.nextFreeID,
        name: action.payload,
        status: "loading",
        details: { numOfURLs: 0, technologies: [] },
      });

      state.nextFreeID++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWebsiteResults.fulfilled, (state, action) => {
      const index = state.results.findIndex(
        (state) =>
          state.name === action.payload.website && state.status === "loading"
      );

      state.results[index].details = action.payload.response;
      state.results[index].status = "idle";
    });
  },
});

export const fetchWebsiteResults = createAsyncThunk(
  "websiteAnalyzation/fetchWebsiteResults",
  async (website: string) => {
    const response = await fetch("/api/analyze/" + encodeURIComponent(website));

    return {
      website: website,
      response: await response.json(),
    };
  }
);

export const { addWebsite } = websiteAnalyzationSlice.actions;

export const selectWebsites = (state: RootState) =>
  state.websiteAnalization.results;

export default websiteAnalyzationSlice.reducer;
