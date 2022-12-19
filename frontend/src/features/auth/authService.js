import axios from "axios"

const login = async (codeParam) => {
  if (codeParam.code.length > 1) {
    try {
      console.log("login with", codeParam)
      const response = await axios.post(
        "http://localhost:8000/getAccessToken",
        codeParam
      )

      if (response.data) {
        console.log("access token:", response.data.access_token)
        localStorage.setItem("user", JSON.stringify(response.data.access_token))
        localStorage.setItem("isLoggedIn", true)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const authService = {
  login,
}

export default authService
