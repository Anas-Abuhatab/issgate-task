import axios from "../plugins/axios.js";

class Auth {
  static async login(email, password) {
    return new Promise(async (response, rej) => {
      await axios
        .post("/api/Auth/Authenticate", {
          username: `${email}`,
          password: `${password}`,
          rememberMe: false,
        })
        .then((res) => {
          if (res.data.IsSuccess) {
            let userObJ = {
              token: res.data.Data.Token,
            };
            localStorage.setItem("accessToken", userObJ.token);
            localStorage.setItem("userDataInfo", JSON.stringify(res.data.Data));
        }
        response(res);
        })
        .catch((error) => {
          rej(error);
        });
    });
  }
}

export default Auth;
