import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movies.service";
import { getActorById } from "../../services/actor.service";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import "./MovieDetail.css";
import StarRating from "./StarRating";
import { getGenreById } from "../../services/genres.service";
import Genre from "../Genre/Genre";
import Heading from "../UI/Heading/Heading";
import useLoading from "../../hooks/useLoading";
import Loading from "../Loading/Loading";
import Comment from "../Comment/Comment";
import { getCommentByMovie } from "../../services/comment.service";
import { Link } from "react-router-dom";
import { addHistory } from "../../services/user.service";
import { checkIfLoggedIn, getLoggedInUser } from "../../utils/authUtils";
import ActorsCard from "../ActorsCard/ActorsCard";

function MovieDetail() {
  const { id } = useParams();
  const isLoading = useLoading();
  const user = getLoggedInUser();
  const isAuthenticated = checkIfLoggedIn();

  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await getMovieById(id);
      setMovie(movie);

      const actor = movie.actors.map((id) => getActorById(id));
      const actorData = await Promise.all(actor);
      setActors(actorData);

      const genres = movie.genres.map((id) => getGenreById(id));
      const genresData = await Promise.all(genres);
      setGenres(genresData);
    };
    getCommentByMovie(id)
      .then((commentData) => setComment(commentData))
      .catch((error) => console.log("Error fetching data", error));
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <Loading />;
  }
  const backgroundStyle = {
    backgroundImage: `url(${movie.imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    padding: "50px 0",
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout>
          <div className="detail-background" style={backgroundStyle}>
            <Container className="detail-container" style={{ padding: 30 }}>
              <Row className="justify-content-md-space-between ">
                <Col lg={4}>
                  <div style={{ padding: 20, width: "100%" }}>
                    <Card>
                      <Card.Img
                        variant="center"
                        src={movie.poster}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                        }}
                      />
                    </Card>
                  </div>
                </Col>
                <Col lg={8}>
                  <h1 className="text-center" style={{ color: "#a688fa" }}>
                    {movie.title}
                  </h1>
                  <div className="text-center">
                    <p>Director: {movie.director}</p>
                    <p>Release Year: {movie.releaseYear}</p>
                  </div>
                  {isAuthenticated ? (
                    <Link
                      onClick={() => {
                        addHistory(movie._id, user._id);
                      }}
                      to={`/play/${movie._id}`}
                    >
                      <Button className="buttonStyle w-100" size="lg">
                        Watch Now
                      </Button>
                    </Link>
                  ) : (
                    <Alert
                      variant="secondary"
                      key="secondary"
                      className="text-center"
                    >
                      Please login to watch{" "}
                    </Alert>
                  )}
                  <Heading name={"Genres"} />
                  <div className="text-center genre-container">
                    <Genre genres={genres} />
                  </div>
                  <Heading name={"IMDB Rating"} />
                  <div style={{ margin: "30px 0" }}>
                    <StarRating rating={movie.imdbRating} />
                  </div>
                  <Heading name={"Description"} />
                  <p style={{ padding: 12 }}>{movie.description}</p>
                  <Heading name={"Cast"} />
                  <div style={{}}>
                    <Row>
                      <ActorsCard actors={actors}></ActorsCard>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Heading name={"Trailer"}></Heading>
              <VideoPlayer videoUrl={movie.video} />
              <div
                style={{ width: "100%", textAlign: "center", margin: "30px 0" }}
              ></div>
              <Heading name={"Comment"} />
              <Comment comments={comment} movieId={id} />
            </Container>
          </div>
        </MainLayout>
      )}
    </>
  );
}
export default MovieDetail;
