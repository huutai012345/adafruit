const axios = require("axios");

const createData = async (req, res) => {
  let value = req.body.value;

  axios({
    method: "post",
    url:
      "https://io.adafruit.com/api/v2/huutai012345/feeds/dieu-khien-den/data",
    headers: {
      "X-AIO-Key": "aio_EUrx347HPSYhhS6UKgosaY49wIwU",
    },
    data: {
      value: value,
    },
    responseType: "json",
  })
    .then(function (response) {
      return res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAllData = async (req, res) => {
  axios({
    method: "get",
    url:
      "https://io.adafruit.com/api/v2/huutai012345/feeds/dieu-khien-den/data",
    headers: {
      "X-AIO-Key": "aio_EUrx347HPSYhhS6UKgosaY49wIwU",
    },
    responseType: "json",
  })
    .then(function (response) {
      let value = "1";
      let data = response.data.filter((item) => {
        if (item.value === value) {
          value === "1" ? (value = "0") : (value = "1");
          return true;
        }
      });

      data = data.map((item) => {
        return {
          created_at: item.created_at,
          updated_at: "",
          value: item.value,
          used_time: 0,
          power: 0,
        };
      });

      for (let i = 0; i < data.length - 1; i = i + 2) {
        let used_time =
          Date.parse(data[i].created_at) - Date.parse(data[i + 1].created_at);

        used_time = parseFloat(used_time / 1000 / 60).toFixed(3);

        data[i].updated_at = new Date(
          Date.parse(data[i].created_at) + 7 * 60 * 60 * 1000
        );

        data[i].created_at = new Date(
          Date.parse(data[i + 1].created_at) + 7 * 60 * 60 * 1000
        );

        data[i].used_time = used_time;
        data[i].power = parseFloat(((used_time / 60) * 2).toFixed(3));
      }

      data = data.filter((item, index) => {
        return index % 2 === 0;
      });

      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getLastData = async (req, res) => {
  axios({
    method: "get",
    url:
      "https://io.adafruit.com/api/v2/huutai012345/feeds/dieu-khien-den/data/last",
    headers: {
      "X-AIO-Key": "aio_EUrx347HPSYhhS6UKgosaY49wIwU",
    },
    responseType: "json",
  })
    .then(function (response) {
      return res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getAllData,
  createData,
  getLastData,
};
