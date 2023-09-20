import { useState, useEffect } from "react";
import React from "react";
import './App.css';
import SearchIcon from './search.svg'; // search icon by icons8
import MovieCard from "./MovieCard";

const API_URL = 'https://www.omdbapi.com?apikey=3dfdcdfb';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const res = await fetch(`${API_URL}&s=${title}`);
        const data = await res.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('john wick');
    }, []);
    return (
        <div className="app">
            <h1>MovieWorld</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                />
                <div className="searchBtn">
                    <img src={SearchIcon}
                        alt="search"
                        onClick={() => { searchMovies(searchTerm) }}
                    />
                </div>
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map(movie => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">No movies Found</div>
                    )
            }

        </div>
    );
}

export default App;