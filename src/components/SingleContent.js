import { Badge } from '@material-ui/core';
import React from 'react';
import './SingleContent.css';

function SingleContent({ id, title, image, date, type, vote }) {
   const img_300 = 'https://image.tmdb.org/t/p/w300';
   const img_unavaible =
      'https://www.movienewz.com/img/films/poster-holder.jpg';

   return (
      <div className="media">
         <Badge
            badgeContent={vote}
            color={vote > 6 ? 'primary' : 'secondary'}
         />

         <img
            className="image"
            src={image ? img_300 + image : img_unavaible}
            alt={title}
         />
         <b className="title">{title}</b>
         <div className="info">
            <span className="info">
               {type === 'tv' ? 'TV Series' : 'Movie'}
            </span>
            <span className="info">{date}</span>
         </div>
      </div>
   );
}

export default SingleContent;
