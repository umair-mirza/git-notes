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
    .then((result) => {
      console.log("access token backend", result.data)
    })
    .catch((err) => {
      console.log("error:", err)
    })
})

app.listen(8000, () => {
  console.log("server is running on port 8000")
})
