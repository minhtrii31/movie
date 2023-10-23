import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import Home from "./pages/MainPage/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Profile from "./components/Profile/Profile";
import ActorsPage from "./pages/ActorsPage/ActorsPage";
import FullScreenVideoPlayer from "./components/FullScreenVideoPlayer/FullScreenVideoPlayer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/play/:id" element={<FullScreenVideoPlayer />} />
        <Route path="/actors" element={<ActorsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
