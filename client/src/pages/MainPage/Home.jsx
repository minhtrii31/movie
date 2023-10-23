import React from "react";
import CustomCarousel from "../../components/Carousel/CustomCarousel";
import MovieCard from "../../components/MovieCard/MovieCard";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Heading from "../../components/UI/Heading/Heading";
import { Container, Row } from "react-bootstrap";

function Home() {
  return (
    <MainLayout>
      <CustomCarousel />
      <Heading name={"Lastest Movie"} />
      <Container>
        <Row>
          <MovieCard latestOnly={true} />
        </Row>
      </Container>
      <Heading name={"Top Movies"} />
      <Container>
        <Row>
          <MovieCard top={true} latestOnly={false} />
        </Row>
      </Container>
      <Heading name={"About us"}></Heading>
      <Container className="p-sm-5">
        <p className="text-center">
          People have many reasons to opt for a free movie site. Many of us want
          to trim unnecessary expenses. Some do not watch movies frequently
          enough to pay for a monthly subscription. And many just prefer free
          entertainment. No matter what your reason is, you should stick with
          safe sites only. There are thousands of free movie sites on the
          Internet but only a few of them are safe. Free sites need ads for
          income while ads can carry viruses and malware. Security is the main
          reason people decide to pay for paid streaming services instead. If it
          has been your headache for a while, we have found you the cure: a free
          site with no ads. Or to be more specific, Mvie. With no ads, Mvie
          poses no risk to both your device and identity. The site also boasts a
          huge collection of movies for free streaming, HD quality, fast loading
          speed, constant content updates, and many more outstanding features. A
          penny saved is a penny earned. Earn money effortlessly by watching
          movies online for free at Mvie!
        </p>
        <p className="text-center">
          Mvie is a new name in the streaming industry. However, its content
          library and features show that every site has a chance to stand out,
          no matter where they are a newbie or a veteran. We have spent years
          learning about the industry as well as users expectations in order to
          create the best free movie site for the movie fan community. Mvie
          allows users to watch and download thousands of movies and TV shows in
          the best resolution possible with no ads. We also provide users with
          fast loading speed, safe and private sources, seamless streaming
          feature, and many other benefits you never expect from a free movie
          site.
        </p>
      </Container>
    </MainLayout>
  );
}

export default Home;
