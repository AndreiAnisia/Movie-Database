import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ type, id }) => {
   const [credits, setCredits] = useState();

   const img_300 = 'https://image.tmdb.org/t/p/w300';
   const noPicture =
      'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg';

   const items = credits?.map((credit) => (
      <div className="carouselItem">
         <img
            src={
               credit.profile_path
                  ? `${img_300}/${credit.profile_path}`
                  : noPicture
            }
            alt={credit?.name}
            onDragStart={handleDragStart}
            className="carouselItem__img"
         />
         <b className="carouselItem__txt">{credit?.name}</b>
      </div>
   ));

   const responsive = {
      0: {
         items: 3,
      },
      512: {
         items: 5,
      },
      1024: {
         items: 7,
      },
   };

   const fetchCredits = async () => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=1ab538aeeefdb2e5398ae31c8ed43aba&language=en-US`
      );

      setCredits(data.cast);
   };

   useEffect(() => {
      fetchCredits();
   }, []);

   return (
      <AliceCarousel
         autoPlay
         autoPlayInterval="1000"
         responsive={responsive}
         infinite
         disableDotsControls
         disableButtonsControls
         mouseTracking
         items={items}
      />
   );
};

export default Carousel;
