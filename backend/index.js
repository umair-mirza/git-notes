const { default: axios } = require("axios")
const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
const app = express()
require("dotenv").config()

app.use(cors())
app.use(bodyParser.json())

app.post("/getAccessToken", (req, res) => {
  console.log("code", req.body.code)
  axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      code: req.body.code,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    })
    .then((response) => String(response.data))
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString)
      const access_token = params.get("access_token")
      console.log("the token", access_token)

      // Request to return data of a user that has been authenticated
      return axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    })
    .then((response) => response.data)
    .then((data) => {
      console.log(JSON.stringify(data))
      return res.status(200).json(data)
    })
    .catch((err) => {
      console.log("error:", err)
      return res.status(400).json(err)
    })
})

app.listen(8000, () => {
  console.log("server is running on port 8000")
})
