import api from "./api";
export async function getAllMovies() {
  try {
    const res = await api.get("/api/movies");
    return res.data;
  } catch (e) {
    throw e;
  }
}
export async function getMovieById(id) {
  try {
    const response = await api.get(`/api/movies/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createMovie(title) {
  try {
    const response = await api.post("/api/movies", { title });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateMovieById(id, title) {
  try {
    const response = await api.put(`/api/movies/${id}`, { title });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getMoviesByGenre(id) {
  try {
    const response = await api.get(`/api/movies/bygenre/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}
