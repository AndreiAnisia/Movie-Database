import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleContent from '../components/SingleContent';
import './Row.css';
import CustomPagination from '../components/Pagination';

function Row({ title, fetchUrl }) {
   const [movies, setMovies] = useState([]);
   const [page, setPage] = useState(1);
   const baseURL = 'https://api.themovedb.org/3';

   const fetchData = async () => {
      const { request } = await axios.get(
         `https://api.themoviedb.org/3/trending/all/day?api_key=1ab538aeeefdb2e5398ae31c8ed43aba&page=${page}`
      );

      const response = request.response;
      const result = JSON.parse(response);
      console.log(result);
      setMovies(result.results);
   };

   useEffect(() => {
      fetchData();
   }, [page]);

   return (
      <div>
         <span className="pageTitle">Trending</span>
         <div className="trending">
            {movies.map((movie) => {
               return (
                  <SingleContent
                     key={movie.id}
                     title={movie.title}
                     date={movie.release_date}
                     image={movie.poster_path}
                     type={movie.media_type}
                     vote={movie.vote_average}
                  />
               );
            })}
         </div>
         <CustomPagination setPage={setPage} numPages={10} />
      </div>
   );
}

export default Row;
