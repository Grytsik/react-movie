import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIurl, APIkey, APItoken } from '../API/API';

export const fetchApi = createApi({
  reducerPath: 'fetchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APIurl,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Authorization', `Bearer ${APItoken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrandingSlider: builder.query({
      query: () => `trending/movie/week`,
    }),
    getSearch: builder.query({
      query: ({ category, value }) => `search/${category}?query=${value}`,
    }),
    getTrandingTvOrMovie: builder.query({
      query: ({ category, value }) => `${category}/${value}`,
    }),
    getCategory: builder.query({
      query: (category) => `discover/${category}`,
    }),
    getSelectMovie: builder.query({
      query: ({ category, id }) => `${category}/${id}`,
    }),
    getActors: builder.query({
      query: (id) => `movie/${id}/credits`,
    }),
    getVideo: builder.query({
      query: ({ category, id }) => `${category}/${id}/videos`,
    }),
    getImageForMovie: builder.query({
      query: ({ category, id }) => `${category}/${id}/images`,
    }),
  }),
});

export const {
  useGetTrandingSliderQuery,
  useGetSearchQuery,
  useGetCategoryQuery,
  useGetSelectMovieQuery,
  useGetActorsQuery,
  useGetTrandingTvOrMovieQuery,
  useGetVideoQuery,
  useGetImageForMovieQuery,
} = fetchApi;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { APIkey, APIurl } from '../API/API';

// const initialState = {
//   data: [],
//   actors: [],
//   loading: false,
//   error: null,
// };

// export const fetchData = createAsyncThunk('data/fetchData', async (value) => {
//   const response = await fetch(`${APIurl}${value}api_key=${APIkey}`);
//   const data = await response.json();
//   return data;
// });

// export const fetchActors = createAsyncThunk('data/fetchActors', async (id) => {
//   const response = await fetch(`${APIurl}movie/${id}/credits?api_key=${APIkey}`);
//   const actors = await response.json();
//   return actors;
// });

// export const dataSlice = createSlice({
//   name: 'data',
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchData.rejected, (state) => {
//         state.error = null;
//         state.loading = false;
//       })
//       .addCase(fetchActors.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchActors.fulfilled, (state, action) => {
//         state.loading = false;
//         state.actors = action.payload.cast.filter((item) => item !== '').slice(0, 6);
//       })
//       .addCase(fetchActors.rejected, (state) => {
//         state.error = null;
//       });
//   },
// });
// export const {clearData} = dataSlice.actions;
// export default dataSlice.reducer;
