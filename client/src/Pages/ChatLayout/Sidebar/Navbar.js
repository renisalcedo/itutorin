import React, { useState } from "react";
import "./Navbar.css";
import Button from "react-bootstrap/Button";
import QuizModal from "./Popups/QuizModal";

function Navbar() {
  const [show, setShow] = useState(false);

  const showQuiz = () => {
    setShow(true);
  };

  const hideQuiz = () => {
    setShow(false);
  };

  return (
    <>
      <nav className="nav-menu-active">
        <ul className="nav-menu-items">
          <Button
            variant="outline-info"
            style={{ margin: "10px", padding: "5px", width: "18rem" }}
            onClick={showQuiz}
          >
            Create Quiz
          </Button>
          <Button
            variant="outline-info"
            style={{ margin: "10px", padding: "5px", width: "18rem" }}
          >
            Create Flashcard
          </Button>
          );
        </ul>
      </nav>
      <QuizModal show={show} onHide={hideQuiz} />
    </>
  );
}

export default Navbar;
