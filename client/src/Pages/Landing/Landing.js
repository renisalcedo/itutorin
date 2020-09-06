import React, { Component } from "react";
import BackgroundSlider from "react-background-slider";
import background1 from "../../assets/Background1.png";
import background2 from "../../assets/Background2.png";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Landing.scss";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { formState: 1 };
  }
  render() {
    const { formState } = this.state;
    return (
      <>
        <BackgroundSlider
          images={[background1, background2]}
          duration={5}
          transition={2}
        />
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

        {formState === 3 && (
          <Card className="main-card">
            <div>
              <Form.Control type="number" placeholder="Room Id" required />
              <Link to="/chat">
                <Button
                  className="option-button"
                  variant="dark"
                  style={{ borderRadius: "30px" }}
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
                  Join as a mentor
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
                Join as a Student
              </Button>
            </div>
          </Card>
        )}
      </>
    );
  }
}

export default Landing;
