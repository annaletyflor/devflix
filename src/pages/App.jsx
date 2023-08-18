import { useEffect, useState } from "react";
import logo from "../assets/devflix.png";
import searchIcon from "../assets/search.svg";
import MovieCard from "../components/movieCard/movieCard";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const apiKey = "e4d577fa";
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  useEffect(() => {
    searchMovies("Batman");
  }, []);
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    console.log(data);
    setMovies(data.Search);
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" && searchMovies(searchTerm);
  };

  //   fetch(apiUrl)
  //     .then((response)=>response.json())
  //     .then((data) => console.log(data));

  return (
    <div id="app">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Pesquise por filmes"
        />
        <img src={searchIcon} alt="" onClick={() => searchMovies(searchTerm)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movies={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nenhum filme foi encontrado!😨</h2>
        </div>
      )}
    </div>
  );
};
export default App;
