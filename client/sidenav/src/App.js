import React from 'react';
import Navbar from "../../src/Pages/ChatLayout/Sidebar/Navbar";
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router,Route } from "react-router-dom";
import { SidebarData } from "../../src/Pages/ChatLayout/Sidebar/SidebarData";

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