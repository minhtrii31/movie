import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./MovieCard.css";
import { getAllMovies, getMovieById } from "../../services/movies.service";
import { Link } from "react-router-dom";

function MovieCard({ latestOnly, searchKeyword, selectedGenre, movie, top }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (movie) {
      getMovieById(movie)
        .then((data) => {
          setMovies([data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getAllMovies(latestOnly, searchKeyword, selectedGenre)
        .then((data) => {
          const sortedMovies = data.sort(
            (a, b) => b.releaseYear - a.releaseYear
          );

          let filteredMovies = latestOnly
            ? sortedMovies.slice(0, 4)
            : sortedMovies;
          if (searchKeyword) {
            const lowercaseSearchKeyword = searchKeyword.toLowerCase();
            filteredMovies = filteredMovies.filter((movie) =>
              movie.title.toLowerCase().includes(lowercaseSearchKeyword)
            );
          }
          if (selectedGenre) {
            filteredMovies = filteredMovies.filter((movie) =>
              movie.genres.includes(selectedGenre)
            );
          }
          if (top) {
            const topMovies = data.sort((a, b) => b.imdbRating - a.imdbRating);
            filteredMovies = topMovies.slice(0, 4);
          }
          setMovies(filteredMovies);
        })
        .catch((e) => {
          console.log("Error fetching data: ", e);
        });
    }
  }, [searchKeyword, latestOnly, selectedGenre, movie, top]);
  return (
    <>
      {movies.map((movie) => (
        <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
          <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none" }}>
            <Card
              className="card-hover"
              style={{
                marginBottom: "20px",
                color: "#fff",
                cursor: "pointer",
              }}
              bg="dark"
            >
              <Card.Img variant="top" src={movie.poster} />
              <Card.Body className="text-center">
                <Card.Title style={{ color: "#a688fa" }}>
                  {movie.title}
                </Card.Title>
                <Card.Text style={{ marginBottom: 10 }}>
                  Release Year: {movie.releaseYear}
                </Card.Text>
                <Card.Text style={{ marginBottom: 10 }}>
                  IMDB Rating: {movie.imdbRating}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </>
  );
}

export default MovieCard;
