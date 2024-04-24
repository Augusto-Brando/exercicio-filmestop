import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import './SearchInput.css';

const SearchInput = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    // Função para obter os gêneros disponíveis
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: {
              api_key: '11ec76091491ac1f3435a1cc88dcd729',
              language: 'pt-BR',
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Erro ao obter os gêneros:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    // Verificar se há um filtro na URL
    const genreParam = searchParams.get('genre');
    if (genreParam) {
      setSelectedGenre(genreParam);
      fetchMovies(genreParam);
    } else {
      // Se não houver filtro, limpar os filmes filtrados
      setFilteredMovies([]);
      setSelectedGenre('');
    }
  }, [searchParams]);

  const fetchMovies = async (genreId) => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        {
          params: {
            api_key: '11ec76091491ac1f3435a1cc88dcd729',
            with_genres: genreId,
            language: 'pt-BR',
          },
        }
      );
      setFilteredMovies(response.data.results);
    } catch (error) {
      console.error('Erro ao obter os filmes por gênero:', error);
    }
  };

  const handleGenreChange = async (genreId) => {
    setSearchParams({ genre: genreId });
    setSelectedGenre(genreId);
    fetchMovies(genreId);
  };

  // Verifica se estamos na página de detalhes do filme
  const isMovieDetailPage = location.pathname.includes('/movie/');

  return (
    // Renderiza o componente apenas se não estivermos na página de detalhes do filme
    !isMovieDetailPage && (
      <div className="MovieGenreFilterContainer">
        <h2>Escolha um gênero:</h2>
        <select value={selectedGenre} onChange={(e) => handleGenreChange(e.target.value)}>
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <h3>Resultados:</h3>
        <div className="movies-container">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    )
  );
};

export default SearchInput;
