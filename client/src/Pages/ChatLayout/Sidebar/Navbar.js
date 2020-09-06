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
<<<<<<< HEAD
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
=======
      <IconContext.Provider value={{ color: "#fff" }}></IconContext.Provider>


      <nav className="nav-menu-active">
        <ul className="nav-menu-items">
          {SidebarData.map((item, index) => {
            return (
              <Button variant="outline-info" style={{margin:"10px",padding:"2px",width:"95%",border:"none"}}>
                <li key={index} className={item.cname}>
                  {item.icon} {item.title}
                </li>
              </Button>
            );
          })}
          <Button className="quiz" variant="info">
            Quiz
>>>>>>> d2f6151dfbd15af14013c65fb0c50a0899a364e2
          </Button>
          );
        </ul>
      </nav>
      <QuizModal show={show} onHide={hideQuiz} />
    </>
  );
}

export default Navbar;



