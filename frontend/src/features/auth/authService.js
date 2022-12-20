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
        console.log("user details", response.data)
        localStorage.setItem("user", JSON.stringify(response.data))
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
