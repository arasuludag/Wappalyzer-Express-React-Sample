import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface WebsiteAnalizationDetails {
  slug: string;
  name: string;
  description: string;
  confidence: number;
  version: number | null;
  icon: string;
  website: string;
  cpe: string;
  categories: { id: string; slug: string; name: string }[];
}

export interface WebsiteAnalizationResults {
  name: string;
  status: "idle" | "loading" | "failed";
  details: WebsiteAnalizationDetails[];
}

const initialState: { results: WebsiteAnalizationResults[]; version: number } =
  {
    results: [],
    version: 0,
  };

export const websiteAnalyzationSlice = createSlice({
  name: "websiteAnalyzation",
  initialState,
  reducers: {
    addWebsite: (state, action: PayloadAction<string>) => {
      state.results.push({
        name: action.payload,
        status: "loading",
        details: [],
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWebsiteResults.fulfilled, (state, action) => {
      const index = state.results.findIndex(
        (state) =>
          state.name === action.payload.website && state.status === "loading"
      );

      state.version++;

      state.results[index].details = action.payload.response;
      state.results[index].status = "idle";
    });
  },
});

export const fetchWebsiteResults = createAsyncThunk(
  "websiteAnalyzation/fetchWebsiteResults",
  async (website: string) => {
    const response = await fetch(
      "/api/technologies/" + encodeURIComponent(website)
    );

    return {
      website: website,
      response: await response.json(),
    };
  }
);

export const { addWebsite } = websiteAnalyzationSlice.actions;

export default websiteAnalyzationSlice.reducer;
