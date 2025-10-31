import React from "react";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import Box from "@mui/material/Box";

const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;
  
  return (
    <Box sx={{ bgcolor: "#fff0f3ff" }}>
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
    </Box>
  );
};

export default MovieReviewPage;
