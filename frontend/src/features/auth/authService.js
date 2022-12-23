import axios from "axios"

//Login User on Github
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
        localStorage.setItem("user", JSON.stringify(response.data)) //localstorage only accepts data in strings
        localStorage.setItem("isSuccess", true)

        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

//Logout User
const logout = () => {
  localStorage.removeItem("user")
  localStorage.setItem("isSuccess", false)
}

const authService = {
  login,
  logout,
}

export default authService
