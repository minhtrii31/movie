export function checkIfLoggedIn() {
  const user = localStorage.getItem("user");
  return !!user;
}
export function getLoggedInUser() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}
