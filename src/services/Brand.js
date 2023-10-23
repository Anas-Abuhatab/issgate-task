import axios from "../plugins/axios.js";

class Brand {
  static async list(options) {
    return new Promise(async (response, rej) => {
      await axios
        .get(`/api/Brand?page=${options.page}&limit=${options.limit}`)
        .then((res) => {
          response(res);
        })
        .catch((error) => {
          rej(error);
        });
    });
  }
  static async view(id) {
    return new Promise(async (response, rej) => {
      await axios
        .get(`/api/Brand/${id}`)
        .then((res) => {
          response(res);
        })
        .catch((error) => {
          rej(error);
        });
    });
  }
  static async delete(id) {
    return new Promise(async (response, rej) => {
      await axios
        .delete(`/api/Brand/Remove/${id}`)
        .then((res) => {
          response(res);
        })
        .catch((error) => {
          rej(error);
        });
    });
  }
  static async changeStatus(id) {
    return new Promise(async (response, rej) => {
      await axios
        .post(`/api/Brand/Activation/${id}`)
        .then((res) => {
          response(res);
        })
        .catch((error) => {
          rej(error);
        });
    });
  }
  static async getLanguage() {
    return new Promise(async (response, rej) => {
      await axios
        .get(`/api/Languages`)
        .then((res) => {
          response(res);
        })
        .catch((error) => {
          rej(error);
        });
    });
  }
  static async create(data) {
    return new Promise(async (response, rej) => {
      await axios
        .post(`/api/Brand`,data)
        .then((res) => {
          response(res);
        })
        .catch((error) => {
          rej(error);
        });
    });
  }

  static async update(data,id) {
    return new Promise(async (response, rej) => {
      await axios
        .put(`/api/Brand?BrandId=${id}`,data)
        .then((res) => {
          response(res);
        })
        .catch((error) => {
          rej(error);
        });
    });
  }
}

export default Brand;
