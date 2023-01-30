import axios from "axios"

type CodeParam = {
  code: string
}

//Login User on Github
const login = async (codeParam: CodeParam) => {
  if (codeParam.code.length > 1) {
    console.log("login with", codeParam)
    const response = await axios.post("/getAccessToken", codeParam)

    if (response.data) {
      console.log("user details", response.data)
      localStorage.setItem("user", JSON.stringify(response.data)) //localstorage only accepts data in strings

      return response.data
    }
  }
}

//Logout User
const logout = () => {
  localStorage.removeItem("user")
}

const authService = {
  login,
  logout,
}

export default authService
