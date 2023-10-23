import React from "react";
import { Container } from "react-bootstrap";

function Heading({ name }) {
  return (
    <Container>
      <div className="header">
        <h4 style={{ fontWeight: "bold" }}>{name}</h4>
      </div>
    </Container>
  );
}

export default Heading;
