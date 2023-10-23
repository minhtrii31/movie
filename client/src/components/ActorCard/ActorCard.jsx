import React from "react";
import { Card } from "react-bootstrap";
function ActorCard({ actor }) {
  const cardStyle = {
    backgroundColor: "transparent",
    marginBottom: "20px",
    color: "#fff",
    padding: "30px",
    outLine: "none",
    border: "none",
  };
  return (
    <Card style={cardStyle}>
      <Card.Img variant="top" src={actor.img} className="rounded-circle" />
      <Card.Body>
        <Card.Title
          style={{
            color: "#a688fa",
            textAlign: "center",
          }}
        >
          <p>{actor.name}</p>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default ActorCard;
