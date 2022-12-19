import React, { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci"
import authService from "../features/auth/authService"

import "./Header.scss"
import "../App.scss"

const Header = () => {
  // const [codeParam, setCodeParam] = useState({
  //   code: null,
  // })
  const [userState, setUserState] = useState("")

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeExists = urlParams.get("code")
    if (codeExists) {
      //   setCodeParam({ ...codeParam, code: codeExists })
      //   console.log(codeParam)
      authService.login({ code: codeExists })
      setUserState("logged")
    }
  }, [])

  const clientId = process.env.REACT_APP_CLIENT_ID
  const redirectURI = process.env.REACT_APP_REDIRECT_URI
  const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${redirectURI}`

  return (
    <section className="header container">
      <div className="logo">Emumba</div>
      <div className="top-right">
        <div className="search">
          <input className="searchbar" />
          <div className="search-icon">
            <CiSearch size={20} />
          </div>
        </div>
        <div className="secondary-button">
          <a href={GITHUB_LOGIN_URL}>Login</a>
        </div>
      </div>
    </section>
  )
}

export default Header
