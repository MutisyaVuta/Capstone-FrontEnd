export default function getToken() {
  let token = localStorage.getItem("token");
  return token;
}
