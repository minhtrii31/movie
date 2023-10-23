import React from "react";
import { Col } from "react-bootstrap";
import ActorCard from "../ActorCard/ActorCard";

function ActorsCard({ actors }) {
  return (
    <>
      {actors.map((actor) => (
        <Col xs={12} md={6} lg={3} xl={3} key={actor._id}>
          <ActorCard actor={actor} />
        </Col>
      ))}
    </>
  );
}

export default ActorsCard;
