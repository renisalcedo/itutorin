import React, { Component } from "react";
import BackgroundSlider from "react-background-slider";
import background1 from "../../assets/Background1.jpg";
import background2 from "../../assets/Background2.jpg";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Landing.scss";
import UserContext from "../../context/userContext";
import { socket } from "../../utils/constants"
import axios from 'axios'

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { formState: 1, userName: "", roomId: null };
  }
  static contextType = UserContext;

  componentDidMount() {
    socket.on('create_session', (server_msg) => {
      const roomId = server_msg.session_id
      this.setState({roomId: roomId})
      window.localStorage.setItem("session_values",
       JSON.stringify({user: this.state.userName, roomId: roomId}))
    })

    socket.on("join", (server_msg) => {
      window.localStorage.setItem("session_values", JSON.stringify(
        {user: server_msg.user, roomId: server_msg.session_id})
      )
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { formState, userName, roomId } = this.state;
    const { user, setUser } = this.context;

    return (
      <>
        <BackgroundSlider
          images={[background1, background2]}
          duration={5}
          transition={2}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="title-container">
            <span className="site-title">iTutoring.online</span>
          </div>
          {formState === 1 && (
            <Button
              variant="dark"
              style={{ borderRadius: "30PX", padding: "15px" }}
              onClick={() => this.setState({ formState: 2 })}
              className="start-button"
            >
              Start a Mentoring session
            </Button>
          )}
        </div>

        {formState === 3 && (
          <Card className="main-card">
            <div>
              <Form.Control
                type="text"
                placeholder="Username"
                required
                name="userName"
                onChange={this.onChange}
              />
              <Form.Control
                type="text"
                placeholder="Room Id"
                required
                name="roomId"
                onChange={this.onChange}
              />
              <Link to="/chat">
                <Button
                  className="option-button"
                  variant="dark"
                  style={{ borderRadius: "30px" }}
                  onClick={() => {
                    const updatedUser = { name: userName, roomId: roomId };
                    const username = updatedUser.name

                    setUser(updatedUser);
                    socket.emit("join", {session_id: roomId, user: username})
                  }}
                >
                  Join
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {formState === 4 && (
          <Card className="main-card">
            <div>
              <Form.Control
                type="text"
                placeholder="Username"
                required
                name="userName"
                onChange={this.onChange}
              />
              <Link to="/chat">
                <Button
                  className="option-button"
                  variant="dark"
                  style={{ borderRadius: "30px" }}
                  onClick={() => {
                    const updatedUser = { name: userName };
                    setUser(updatedUser);

                    const username = updatedUser.name
                    axios.post("https://precise-braid-288518.ue.r.appspot.com/sessions", {user: username})
                    .then(d => {
                      socket.emit('create_session', username)
                    })
                    .catch(e => console.log(e))
                  }}
                >
                  Create
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {formState === 2 && (
          <Card className="main-card">
            <div>
              <Button
                className="option-button"
                variant="dark"
                style={{ borderRadius: "30px" }}
                onClick={() => this.setState({formState: 4})}
                >
                Create a Session
              </Button>
              <Button
                className="option-button"
                variant="dark"
                style={{ borderRadius: "30px" }}
                onClick={() =>
                  this.setState({
                    formState: 3,
                  })
                }
              >
                Join a Session
              </Button>
            </div>
          </Card>
        )}
      </>
    );
  }
}

export default Landing;
