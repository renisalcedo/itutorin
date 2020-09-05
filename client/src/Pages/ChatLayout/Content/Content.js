import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Image } from "react-bootstrap";
import userIcon2 from "../../../assets/userIcon2.jpg";
import "./Content.scss";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 2000);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  render() {
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
              <div className="single-discussion">
                <div className="user-info">
                  <div className="image">
                    <Image src={userIcon2} alt="icon" rounded />
                  </div>
                  <div className="img-desc">
                    <h2>Asel Peiris</h2>
                    <p className="discussion-date">2020-09-05</p>
                  </div>
                </div>
                <div className="comment-content">
                  <div className="comment-details">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </div>
              </div>
              <div className="single-discussion">
                <div className="user-info">
                  <div className="image">
                    <Image src={userIcon2} alt="icon" rounded />
                  </div>
                  <div className="img-desc">
                    <h2>Asel Peiris</h2>
                    <p className="discussion-date">2020-09-05</p>
                  </div>
                </div>
                <div className="comment-content">
                  <div className="comment-details">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </div>
              </div>
              <div className="single-discussion">
                <div className="user-info">
                  <div className="image">
                    <Image src={userIcon2} alt="icon" rounded />
                  </div>
                  <div className="img-desc">
                    <h2>Asel Peiris</h2>
                    <p className="discussion-date">2020-09-05</p>
                  </div>
                </div>
                <div className="comment-content">
                  <div className="comment-details">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </div>
              </div>
              <div className="single-discussion">
                <div className="user-info">
                  <div className="image">
                    <Image src={userIcon2} alt="icon" rounded />
                  </div>
                  <div className="img-desc">
                    <h2>Asel Peiris</h2>
                    <p className="discussion-date">2020-09-05</p>
                  </div>
                </div>
                <div className="comment-content">
                  <div className="comment-details">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </div>
              </div>
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
              value={this.state.markdownString}
              initialValue="<p>This is the initial content of the editor</p>"
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
              //   onEditorChange={}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Content;
