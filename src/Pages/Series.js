import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genres from '../components/Genres';
import CustomPagination from '../components/Pagination';
import SingleContent from '../components/SingleContent';

function Series() {
   const [series, setSeries] = useState([]);
   const [page, setPage] = useState(1);
   const [numPages, setNumPages] = useState();
   const [genres, setGenres] = useState([]);
   const [selectedGenres, setSelectedGenres] = useState([]);
   const [genresforURL, setGenresforURL] = useState([]);

   const fetchData = async () => {
      const { request } = await axios.get(
         `https://api.themoviedb.org/3/discover/tv?api_key=1ab538aeeefdb2e5398ae31c8ed43aba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresforURL.join()}`
      );

      const response = request.response;
      const result = JSON.parse(response);
      setNumPages(result.total_pages);
      setSeries(result.results);
   };

   useEffect(() => {
      fetchData();
   }, [page, genresforURL]);

   return (
      <div>
         <span className="pageTitle">Tv Series</span>
         <Genres
            type="tv"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
            setGenresforURL={setGenresforURL}
            genresforURL={genresforURL}
         />
         <div className="trending">
            {series.map((serie) => {
               return (
                  <SingleContent
                     key={serie.id}
                     id={serie.id}
                     title={serie.name}
                     date={serie.first_air_date}
                     image={serie.poster_path}
                     type="tv"
                     vote={serie.vote_average}
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

export default Series;
