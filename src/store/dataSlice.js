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
      query: ({ category, id }) => `${category}/${id}/credits`,
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
