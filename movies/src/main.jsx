import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import NowPlayingPage from "./pages/nowPlayingPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import MovieRecommendations from "./pages/movieRecommendations";
import MovieCredits from "./pages/movieCredits";
import PlaylistMoviesPage from "./pages/playlistMoviesPage";

// adding theming using https://mui.com/material-ui/customization/theming/
// also used https://mui.com/material-ui/customization/typography/
// + https://v4.mui.com/customization/typography/
import { ThemeProvider, createTheme } from '@mui/material/styles';







const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff96bcff",
    },
    secondary: {
      main: "#fc9ec1ff",
    },
    background: {
      
      paper: "#ffe7efff",
    },
    text: {
      primary: "#8b123fff",
      secondary: "#8b123fff",
    },
    


    
    
    
  },
  //added a google font, imported to index.html
  typography: {
      fontFamily: "'Playfair Display', serif",
      allVariants: {
      color: "#8b123f", 
    },

    },




});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
                    <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                    <Route path="/movies/now-playing" element={<NowPlayingPage />} />
                    <Route path="/movies/popular" element={<PopularMoviesPage />} />
                    <Route path="/movies/toprated" element={<TopRatedMoviesPage />} />
                    <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                    <Route path="/movies/trending" element={<TrendingMoviesPage />} />
                    <Route path="/movies/playlist" element={<PlaylistMoviesPage />} />

                    
                    <Route path="/movies/:id/recommendations" element={<MovieRecommendations />} />
                    <Route path="/movies/:id/credits" element={<MovieCredits />} />
                    

          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};



const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
