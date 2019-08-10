import React from 'react';
<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Dashboad from './components/dashboard/Dashboard';
import NoteDetails from './components/notes/NoteDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateNote from './components/notes/CreateNote';
import NoteList from './components/notes/NoteList';
import UpdateNote from './components/notes/UpdateNote';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Dashboad} />
        <Route path="/notelist" component={NoteList} />
        <Route path="/note/:id" component={NoteDetails} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/create" component={CreateNote} />
        <Route path="/update/:id" component={UpdateNote} />
      </Switch>
      </div>
    </BrowserRouter>
>>>>>>> Stashed changes
  );
}

export default App;
