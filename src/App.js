import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=85b79cdf';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('wonder woman');
    }, []);
    return (
        <div className="app">
            <h1>Movie Land</h1>
            <div className='search'>
                <input
                    placeholder='search for movies'
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                />
                <img
                    src={SearchIcon}
                    alt='Search Icon'
                    onClick={() => { searchMovies(searchTerm) }}
                />
            </div>
            {movies.length > 0 ? (
                <div className='container'>
                    {movies.map((movie)=>(
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className=''>
                    <h2>No Movies found</h2>
                </div>
            )}
        </div>
    );
}

export default App;

