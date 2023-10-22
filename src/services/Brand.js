import axios from "../plugins/axios.js";

class Brand {
  static async list(email, password) {
    return new Promise(async (response, rej) => {
      await axios
        .post("/api/Brand", {
            page: 1,
            limit: 10,
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

export default Brand;
