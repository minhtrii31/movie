import React, { useEffect, useState } from "react";
import { getAllGenres } from "../../services/genres.service";
import { Container } from "react-bootstrap";
import "./Genres.css";
import Genre from "../Genre/Genre";
function Genres({ onGenreSelect }) {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getAllGenres()
      .then((data) => {
        setGenres(data);
      })
      .catch((e) => {
        console.log("Error fetching data: ", e);
      });
  }, []);
  return (
    <Container className="text-center">
      <div className="col">
        <ul className="list-inline">
          <li className="list-inline-item">
            <button
              className="btn btn-outline-info"
              onClick={() => onGenreSelect("all")}
            >
              All
            </button>
          </li>
          <Genre genres={genres} onSelect={onGenreSelect} />
        </ul>
      </div>
    </Container>
  );
}

export default Genres;
