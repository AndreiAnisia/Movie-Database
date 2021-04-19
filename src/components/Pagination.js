import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const CustomPagination = ({ setPage, numPages }) => {
   const handlePageChange = (page) => {
      setPage(page);
      window.scroll(0, 0);
   };

   return (
      <div
         style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 15,
            paddingBottom: 25,
         }}
      >
         <Pagination
            count={numPages}
            hideNextButton
            hidePrevButton
            onChange={(e) => handlePageChange(e.target.textContent)}
         />
      </div>
   );
};

export default CustomPagination;
