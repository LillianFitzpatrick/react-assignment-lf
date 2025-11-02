import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getMovieCredits } from "../api/tmdb-api";
import Box from "@mui/material/Box";


//movie credits - displays on movie details page, and once clicked-
// it shows a list of the cast members, and the roles they play in the movie
//links from the actors name to their TMDB page.

const MovieCredits = () => {
  const { id } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const cast = data.cast;

  // Links the actor's name to their TMDB page, via their person.id from TMBD
  // Shows the character that they played in the movie via person.character
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
