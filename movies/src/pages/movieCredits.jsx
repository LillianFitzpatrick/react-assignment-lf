import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getMovieCredits } from "../api/tmdb-api";
import Box from "@mui/material/Box";

const MovieCredits = () => {
  const { id } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const cast = data.cast;

  return (
    <Box sx={{ bgcolor: "#fff0f3ff" }}>
    <div style={{ padding: "1rem"}}>
      <h2>Cast</h2>
      <ul>
        {cast.map((person) => (
          <li key={person.credit_id}>
            <a href={`https://www.themoviedb.org/person/${person.id}`} target="_blank">
            {person.name}
             </a> — <em>{person.character}</em>
        </li>
        ))}
      </ul>
    </div>
    </Box>
  );
};

export default MovieCredits;
