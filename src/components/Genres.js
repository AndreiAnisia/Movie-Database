import axios from 'axios';
import React, { useEffect } from 'react';
import Chip from '@material-ui/core/Chip';

const Genres = ({
   selectedGenres,
   setSelectedGenres,
   genres,
   setGenres,
   type,
   setPage,
   setGenresforURL,
   genresforURL,
}) => {
   const handleAdd = (genre) => {
      setSelectedGenres([...selectedGenres, genre]);
      setGenres(genres.filter((g) => g.id !== genre.id));
      setPage(1);
      setGenresforURL([...genresforURL, genre.id]);
   };

   const handleRemove = (genre) => {
      setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
      setGenres([...genres, genre]);
      setPage(1);
      setGenresforURL(genresforURL.filter((g) => g !== genre.id));
   };

   const fetchGenres = async () => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/genre/${type}/list?api_key=1ab538aeeefdb2e5398ae31c8ed43aba&language=en-US`
      );

      setGenres(data.genres);
   };

   useEffect(() => {
      fetchGenres();

      return () => {
         setGenres({});
      };
   }, []);

   return (
      <div style={{ padding: '6px 0' }}>
         {selectedGenres &&
            selectedGenres.map((genre) => {
               return (
                  <Chip
                     label={genre.name}
                     // variant="outlined"
                     clickable
                     color="primary"
                     style={{ margin: 2 }}
                     key={genre.id}
                     onDelete={() => handleRemove(genre)}
                  />
               );
            })}
         {genres &&
            genres.map((genre) => {
               return (
                  <Chip
                     label={genre.name}
                     variant="outlined"
                     clickable
                     color="primary"
                     style={{ margin: 2 }}
                     // size="small"
                     key={genre.id}
                     onClick={() => handleAdd(genre)}
                  />
               );
            })}
      </div>
   );
};

export default Genres;
