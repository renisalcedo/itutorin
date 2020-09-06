import React, { Component } from "react";
import BackgroundSlider from "react-background-slider";
import background1 from "../../assets/Background1.jpg";
import background2 from "../../assets/Background2.jpg";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Landing.scss";
import UserContext from "../../context/userContext";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { formState: 1, userName: "", roomId: null };
  }
  static contextType = UserContext;

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
                type="number"
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

                    setUser(updatedUser);
                  }}
                >
                  Join
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {formState === 2 && (
          <Card className="main-card">
            <div>
              <Link to="/chat">
                <Button
                  className="option-button"
                  variant="dark"
                  style={{ borderRadius: "30px" }}
                >
                  Create a Session
                </Button>
              </Link>
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
