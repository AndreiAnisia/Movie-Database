import { Button, Tab, Tabs, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SingleContent from '../components/SingleContent';
import CustomPagination from '../components/Pagination';

function Search() {
   const [type, setType] = useState(0);
   const [page, setPage] = useState(1);
   const [searchText, setSearchText] = useState('');
   const [content, setContent] = useState();
   const [numPages, setNumPages] = useState();

   const fetchSearch = async () => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/search/${
            type ? 'tv' : 'movie'
         }?api_key=1ab538aeeefdb2e5398ae31c8ed43aba&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      setContent(data.results);
      setNumPages(data.total_pages);
   };
   useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
   }, [type, page]);

   return (
      <div>
         <div style={{ display: 'flex', margin: '15px 0' }}>
            <TextField
               style={{ flex: 1 }}
               className="searchbox"
               label="Search"
               variant="filled"
               onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
               variant="outlined"
               style={{ marginLeft: 10 }}
               onClick={fetchSearch}
            >
               <SearchIcon />
            </Button>
         </div>

         <Tabs
            value={type}
            indicatorColor="primary"
            value={type}
            style={{
               paddingBottom: 15,
            }}
            onChange={(event, newValue) => {
               setType(newValue);
               setPage(1);
            }}
         >
            <Tab
               style={{ maxWidth: 'none', width: '50%' }}
               label="Search Movies"
            />
            <Tab
               style={{ maxWidth: 'none', width: '50%' }}
               label="Search Tv Series"
            />
         </Tabs>

         <div className="trending">
            {content &&
               content.map((serie) => {
                  return (
                     <SingleContent
                        key={serie.id}
                        id={serie.id}
                        title={serie.name || serie.title}
                        date={serie.first_air_date || serie.release_date}
                        image={serie.poster_path}
                        type={type ? 'tv' : 'movie'}
                        vote={serie.vote_average}
                     />
                  );
               })}
            {content == false &&
               (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
         </div>
         {numPages && numPages > 1 && (
            <CustomPagination setPage={setPage} numPages={numPages} />
         )}
      </div>
   );
}

export default Search;
