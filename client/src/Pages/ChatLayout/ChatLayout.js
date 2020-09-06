import React, { Component } from "react";
import "./ChatLayout.scss";
import { UserConsumer } from "../../context/userContext";

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
        <UserConsumer>
          {(props) => {
            return (
              <div className="chat">
                <div className="chat-sidebar">
                  <Sidebar user={props} />
                </div>
                <div className="chat-content">
                  <Content user={props} />
                </div>
              </div>
            );
          }}
        </UserConsumer>
      </>
    );
  }
}

export default ChatLayout;
