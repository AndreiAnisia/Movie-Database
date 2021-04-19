import './App.css';
import Row from './Pages/Row';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Movies from './Pages/Movies';
import Series from './Pages/Series';
import Search from './Pages/Search';

function App() {
   return (
      <>
         <Router>
            <Header />
            <div className="app">
               <Container>
                  <Switch>
                     <Route path="/" exact component={Row} />
                     <Route path="/movies" component={Movies} />
                     <Route path="/series" component={Series} />
                     <Route path="/search" component={Search} />
                  </Switch>
               </Container>
            </div>
            <Navigation />
         </Router>
      </>
   );
}

export default App;
