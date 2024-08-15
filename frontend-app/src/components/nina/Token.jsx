//retrieves the access token for access in the dashboard
export default function getToken() {
  return localStorage.getItem("token");
}
