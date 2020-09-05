import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import ChatLayout from "./Pages/ChatLayout/ChatLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/chat" component={ChatLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
