import React, { Component } from "react";
import Navbar from "./Navbar";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Navbar />
      </>
    );
  }
}

export default Sidebar;
