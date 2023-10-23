import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { checkIfLoggedIn, getLoggedInUser } from "../../utils/authUtils";
import "./Comment.css";
import { postComment } from "../../services/comment.service";
import { Link } from "react-router-dom";

function Comment({ comments, movieId }) {
  const isAuthenticated = checkIfLoggedIn();
  const user = getLoggedInUser();

  const [text, setText] = useState("");

  const handlePostComment = async () => {
    if (!text) {
      return;
    }

    try {
      const success = await postComment(movieId, text, user);
      if (success) {
        window.location.reload();
      } else {
        return;
      }
    } catch (error) {
      console.error("Error posting comment: ", error);
    }
  };

  return (
    <Container style={{ padding: 10 }}>
      {comments.map((comment) => (
        <div key={comment._id} style={{ display: "flex" }}>
          <i className="bi bi-person-circle" style={{ fontSize: 40 }}></i>
          <div
            className="comment-info"
            style={{ marginLeft: 30, color: "#fff" }}
          >
            <p>{comment.user.name}</p>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
      {isAuthenticated ? (
        <div className="rounded comment-container">
          <div className="comment-header">
            <i className="bi bi-person-circle" style={{ fontSize: 40 }}></i>
            <div className="comment-info">
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label> {user.name}</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="comment-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <Button className="buttonStyle" onClick={handlePostComment}>
                Post
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-center">
          Please{" "}
          <Link
            to={"/login"}
            style={{ textDecoration: "none", margin: "0 5px" }}
          >
            login/sign
          </Link>
          up to comment
        </h3>
      )}
    </Container>
  );
}

export default Comment;
