import jwtDecode from "jwt-decode";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return console.log("getToken: no token found");
  }
  const decodedToken = jwtDecode(token);

  return decodedToken;
};

export default getToken;
