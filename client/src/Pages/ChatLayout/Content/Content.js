import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Image } from "react-bootstrap";
import userIcon2 from "../../../assets/userIcon2.jpg";
import "./Content.scss";
// import dummyData from "../dummyData";
import Button from "react-bootstrap/Button";
import { socket } from "../../../utils/constants";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: "",
      currentText: "",
      roomId: "",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 2000);

    const sessionValues = JSON.parse(window.localStorage.getItem('session_values'))
    this.setState({user: sessionValues.user, roomId: sessionValues.roomId})

    socket.emit('join', {session_id: sessionValues.roomId, user: sessionValues.user})
    socket.on('join', (server_msg) => {
      const { data } = this.state;
      data.push({
        name: "SERVER",
        dateTime: new Date().toDateString(),
        content: `User ${server_msg.user} Has Joined the session ...`,
      });

      this.setState({
        data: data,
      });
    })

    socket.on("message", (channel_msg) => {
      const { data } = this.state;
      data.push({
        name: channel_msg.user,
        dateTime: new Date().toDateString(),
        content: channel_msg.msg,
      });

      this.setState({
        data: data,
      });
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  handleTinyEditorChange = (e) => {
    this.setState({
      currentText: e.target.getContent({ format: "text" }),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { currentText, user, roomId } = this.state;

    socket.emit("message", {
      user: user,
      room: roomId,
      msg: currentText,
    });
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <div className="discussion">
          <div className="discussion-title">
            <div className="ticket-title">
              <span className="title-text">Chat Section : {this.state.roomId}</span>
            </div>
          </div>
          <div className="discussion-comments">
            <div className="discussions">
              {data.map((dataElement, index) => {
                return (
                  <div className="single-discussion">
                    <div className="user-info">
                      <div className="image">
                        <Image src={userIcon2} alt="icon" rounded />
                      </div>
                      <div className="img-desc">
                        <h2>{dataElement.name}</h2>
                        <p className="discussion-date">
                          {dataElement.dateTime}
                        </p>
                      </div>
                    </div>
                    <div className="comment-content">
                      <div className="comment-details">
                        {dataElement.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              ref={(el) => {
                this.el = el;
              }}
            />
          </div>
          <div className="discussion-editor">
            <Editor
              apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
              value={this.state.currentText}
              init={{
                height: "100%",
                width: "100%",
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "textpattern",
                ],
                textpattern_patterns: [
                  { start: "#", format: "h1" },
                  { start: "##", format: "h2" },
                  { start: "###", format: "h3" },
                  { start: "####", format: "h4" },
                  { start: "#####", format: "h5" },
                  { start: "######", format: "h6" },
                  { start: "* ", cmd: "InsertUnorderedList" },
                  { start: "- ", cmd: "InsertUnorderedList" },
                  {
                    start: "1. ",
                    cmd: "InsertOrderedList",
                    value: { "list-style-type": "decimal" },
                  },
                  {
                    start: "1) ",
                    cmd: "InsertOrderedList",
                    value: { "list-style-type": "decimal" },
                  },
                  {
                    start: "a. ",
                    cmd: "InsertOrderedList",
                    value: { "list-style-type": "lower-alpha" },
                  },
                  {
                    start: "a) ",
                    cmd: "InsertOrderedList",
                    value: { "list-style-type": "lower-alpha" },
                  },
                  {
                    start: "i. ",
                    cmd: "InsertOrderedList",
                    value: { "list-style-type": "lower-roman" },
                  },
                  {
                    start: "i) ",
                    cmd: "InsertOrderedList",
                    value: { "list-style-type": "lower-roman" },
                  },
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
              }}
              onChange={this.handleTinyEditorChange}
            />
          </div>
          <div className="message-submit">
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default Content;
