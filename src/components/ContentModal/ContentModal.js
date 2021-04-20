import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './ContentModal.css';
import Carousel from '../Carousel/Carousel';

const useStyles = makeStyles((theme) => ({
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   paper: {
      width: '90%',
      height: '80%',
      border: '1px solid black',
      borderRadius: 10,
      color: 'white',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 3),
      backgroundImage:
         'linear-gradient( 94.3deg,  rgba(26,33,64,1) 10.9%, rgba(81,84,115,1) 87.1% );',
      outline: 'none',
   },
}));

export default function ContentModal({ children, type, id }) {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
   const [content, setContent] = useState();
   const [video, setVideo] = useState();
   const img_500 = 'https://image.tmdb.org/t/p/w500';
   const unavailable = 'https://www.movienewz.com/img/films/poster-holder.jpg';

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const fetchData = async () => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/${type}/${id}?api_key=1ab538aeeefdb2e5398ae31c8ed43aba&language=en-US`
      );

      setContent(data);
   };

   const fetchVideo = async () => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=1ab538aeeefdb2e5398ae31c8ed43aba&language=en-US`
      );

      // console.log(data);
      setVideo(data.results[0]?.key);
   };

   useEffect(() => {
      fetchData();
      fetchVideo();
   }, []);

   return (
      <div>
         <div
            className="media"
            style={{ cursor: 'pointer' }}
            color="inherit"
            onClick={handleOpen}
         >
            {children}
         </div>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={open}>
               {content && (
                  <div className={classes.paper}>
                     <div className="ContentModal">
                        <img
                           alt={content.name || content.title}
                           className="ContentModal__portrait"
                           src={
                              content.poster_path
                                 ? `${img_500}/${content.poster_path}`
                                 : unavailable
                           }
                        />
                        <img
                           alt={content.name || content.title}
                           className="ContentModal__landscape"
                           src={
                              content.backdrop_path
                                 ? `${img_500}/${content.backdrop_path}`
                                 : unavailable
                           }
                        />
                        <div className="ContentModal__about">
                           <span className="ContentModal__title">
                              {content.name || content.title}(
                              {(
                                 content.first_air_date ||
                                 content.release_date ||
                                 '-----'
                              ).substring(0, 4)}
                              )
                           </span>
                           {content.tagline && (
                              <i className="tagline">{content.tagline}</i>
                           )}
                           <span className="ContentModal__description">
                              {content.overview}
                           </span>
                           <div>
                              <Carousel type={type} id={id} />
                           </div>
                           <Button
                              variant="contained"
                              startIcon={<YouTubeIcon />}
                              color="secondary"
                              target="__blank"
                              href={`https://www.youtube.com/watch?v=${video}`}
                           >
                              Watch the Trailer
                           </Button>
                        </div>
                     </div>
                  </div>
               )}
            </Fade>
         </Modal>
      </div>
   );
}
