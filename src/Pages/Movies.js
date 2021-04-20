import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomPagination from '../components/Pagination';
import SingleContent from '../components/SingleContent';
import Genres from '../components/Genres';

function Movies() {
   const [movies, setMovies] = useState([]);
   const [page, setPage] = useState(1);
   const [numPages, setNumPages] = useState();
   const [genres, setGenres] = useState([]);
   const [selectedGenres, setSelectedGenres] = useState([]);
   const [genresforURL, setGenresforURL] = useState([]);

   const fetchData = async () => {
      const { request } = await axios.get(
         `https://api.themoviedb.org/3/discover/movie?api_key=1ab538aeeefdb2e5398ae31c8ed43aba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresforURL.join()}`
      );

      const response = request.response;
      const result = JSON.parse(response);
      setNumPages(result.total_pages);
      setMovies(result.results);
   };

   useEffect(() => {
      fetchData();
   }, [page, genresforURL]);

   return (
      <div>
         <span className="pageTitle">Movies</span>
         <Genres
            type="movie"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
            setGenresforURL={setGenresforURL}
            genresforURL={genresforURL}
         />
         <div className="trending">
            {movies.map((movie) => {
               return (
                  <SingleContent
                     key={movie.id}
                     id={movie.id}
                     title={movie.title}
                     date={movie.release_date}
                     image={movie.poster_path}
                     type="movie"
                     vote={movie.vote_average}
                  />
               );
            })}
         </div>
         {numPages && numPages > 1 && (
            <CustomPagination setPage={setPage} numPages={numPages} />
         )}
      </div>
   );
}

export default Movies;
