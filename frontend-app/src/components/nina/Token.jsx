//retrieves the access token
export default function getToken() {
  return localStorage.getItem("token");
}
