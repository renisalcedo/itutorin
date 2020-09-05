import React, { Component } from "react";
import "./ChatLayout.scss";

import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";

class ChatLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="chat">
          <div className="chat-sidebar">
            <Sidebar />
          </div>
          <div className="chat-content">
            <Content />
          </div>
        </div>
      </>
    );
  }
}

export default ChatLayout;
