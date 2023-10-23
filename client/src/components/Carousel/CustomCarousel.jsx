import React, { useEffect, useState } from "react";
import { Button, Carousel, Image } from "react-bootstrap";
import { getAllMovies } from "../../services/movies.service";
import { Link } from "react-router-dom";

function CustomCarouse() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        const latestFourMovies = data
          .sort((a, b) => b.releaseYear - a.releaseYear)
          .slice(0, 4);
        setMovies(latestFourMovies);
      })
      .catch((e) => {
        console.log("Error fetching data: ", e);
      });
  }, []);
  return (
    <Carousel data-bs-theme="light" style={{ position: "relative" }}>
      {movies.map((m) => (
        <Carousel.Item key={m._id}>
          <Image
            src={m.imageUrl}
            style={{
              height: 1000,
              width: "100%",
              objectFit: "cover",
              opacity: 0.5,
            }}
          />
          <Carousel.Caption>
            <h5>{m.title}</h5>
            <p
              style={{
                overflow: "ellipsis",
                whiteSpace: "none",
              }}
            >
              {m.description || m.director}
            </p>
            <Link to={`/movies/${m._id}`}>
              <Button
                className="buttonStyle"
                style={{ marginBottom: "30px", textDecoration: "none" }}
              >
                Watch Now
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export default CustomCarouse;
