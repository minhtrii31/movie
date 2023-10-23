import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Loading from "../../components/Loading/Loading";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBox from "../../components/SearchBox/SearchBox";
import Heading from "../../components/UI/Heading/Heading";
import Genres from "../../components/Genres/Genres";
import { getAllMovies } from "../../services/movies.service";
import { Container, Row } from "react-bootstrap";

function MoviesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId === "all" ? null : genreId);
  };

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout>
          <Heading name={"Search"} />
          <SearchBox onSearch={handleSearch} />
          <Genres onGenreSelect={handleGenreSelect} />
          <Heading name={"All Movies"} />
          <Container>
            <Row>
              <MovieCard
                latestOnly={false}
                searchKeyword={searchKeyword}
                selectedGenre={selectedGenre}
                movies={movies}
              />
            </Row>
          </Container>
        </MainLayout>
      )}
    </div>
  );
}

export default MoviesPage;
