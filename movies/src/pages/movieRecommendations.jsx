import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getMovieRecommendations } from "../api/tmdb-api";

const MovieRecommendations = () => {
  const { id } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) return <Spinner />
  if (isError) return <h1>{error.message}</h1>

  const movies = data.results;

  return (
    <PageTemplate
      title="Recommended Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default MovieRecommendations;