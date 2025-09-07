export default function getUserInfo() {
  if (localStorage.getItem("token")) {
    return false;
  }
  return true;
}
