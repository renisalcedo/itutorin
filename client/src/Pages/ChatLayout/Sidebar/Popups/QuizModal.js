import React, { useState } from "react";
import { Modal, Form, Button, Col } from "react-bootstrap";

function QuizModal(props) {
  // const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");

  const handleSubmission = () => {};

  const onQChange = (e) => {
    // setQuestion(e.target.value);
  };

  const onAChange = (e) => {
    // setAnswer(e.target.value);
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create Quiz</Modal.Title>
        </Modal.Header>

        <Form.Row style={{ margin: "5px" }}>
          <Form.Group as={Col}>
            <Form.Label>Question</Form.Label>
            <Form.Control type="text" onChange={onQChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row style={{ margin: "5px" }}>
          <Form.Group as={Col}>
            <Form.Label>Expected Answer</Form.Label>
            <Form.Control type="text" onChange={onAChange} />
          </Form.Group>
        </Form.Row>
        <Modal.Footer>
          <Button variant="dark" onClick={handleSubmission}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QuizModal;
