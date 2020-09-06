import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Image } from "react-bootstrap";
import userIcon2 from "../../../assets/userIcon2.jpg";
import "./Content.scss";
import dummyData from "../dummyData";
import Button from "react-bootstrap/Button";
import socket from "../../../utils/socket";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dummyData,
      user: "Asel Peiris",
      currentText: "",
      roomId: "",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 2000);

    socket.on("message", (msg) => {
      console.log(msg);
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

  handleSubmit = () => {
    let { data, currentText, user, roomId } = this.state;
    let dataElement = {
      name: user,
      dateTime: new Date().toDateString(),
      content: currentText,
    };

    data.push(dataElement);

    this.setState({
      currentText: "",
      data: data,
    });

    socket.emit("message", {
      user: user,
      room: roomId,
      msg: dataElement.content,
    });
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <div className="discussion">
          <div className="discussion-title">
            <div className="ticket-title">
              <span className="title-text">Chat Section</span>
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
