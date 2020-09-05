import React from 'react';
import Navbar from "./components/Navbar";
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router,Route } from "react-router-dom";
import { SidebarData } from "./components/SidebarData";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/">
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
