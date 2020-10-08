import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import MainContainer from '../../containers/MainContainer';
import { GameModePage, LocalModePage } from '../../pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainContainer>
        <Switch>
          <Route exact path="/" component={GameModePage} />
          <Route exact path="/local">
            <LocalModePage />
          </Route>
        </Switch>
      </MainContainer>
    </div>
  );
}

export default App;
