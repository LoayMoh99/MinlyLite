import React, { useState, useEffect } from "react";

import { getPublicContent } from "../services/user.service";
import Search from "./Search";
import MediaCard from "./MediaCard";

const API_URL = "http://www.omdbapi.com/?apikey=c14fb68";

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title: string = "Spiderman") => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data.data.message);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <Search />

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie: any) => (
            <MediaCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
