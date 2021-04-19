import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
   root: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      zIndex: 100,
      background:
         'linear-gradient( 171.8deg,  rgba(5,111,146,1) 13.5%, rgba(6,57,84,1) 78.6% );',
   },
});

export default function Navigation() {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);
   const history = useHistory();

   useEffect(() => {
      if (value === 0) history.push('/');
      if (value === 1) history.push('/movies');
      if (value === 2) history.push('/series');
      if (value === 3) history.push('/search');
   }, [value, history]);

   return (
      <BottomNavigation
         value={value}
         onChange={(event, newValue) => {
            setValue(newValue);
         }}
         showLabels
         className={classes.root}
      >
         <BottomNavigationAction
            label="Trending"
            style={{ color: '#F3F5FB' }}
            icon={<WhatshotIcon />}
         />
         <BottomNavigationAction
            label="Movies"
            style={{ color: '#F3F5FB' }}
            icon={<MovieIcon />}
         />
         <BottomNavigationAction
            label="Tv Series"
            style={{ color: '#F3F5FB' }}
            icon={<TvIcon />}
         />
         <BottomNavigationAction
            label="Search"
            style={{ color: '#F3F5FB' }}
            icon={<SearchIcon />}
         />
      </BottomNavigation>
   );
}
