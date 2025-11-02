import React from "react";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Box from "@mui/material/Box";

//New trending movies page - Closely follows the same layout as homePage.jsx
const TrendingMoviesPage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['trending'],
    queryFn: getTrendingMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

     return (
      <Box sx={{ bgcolor: "#fff0f3ff" }}>
      <PageTemplate
        title="Trending Today"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
      </Box>
  );

};
export default TrendingMoviesPage;
