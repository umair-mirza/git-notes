import React, { useState, useEffect, useMemo } from "react"
import { CiSearch } from "react-icons/ci"
import authService from "../features/auth/authService"
import { useSelector, useDispatch } from "react-redux"
import { login } from "../features/auth/authSlice"

import "./Header.scss"
import "../App.scss"

const Header = () => {
  const [tempCode, setTempCode] = useState("")

  const dispatch = useDispatch()

  const codeParam = useMemo(() => ({ code: tempCode })) //useMemo ensures that the state’s reference value does not change during each render

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeExists = urlParams.get("code")
    if (codeExists) {
      setTempCode(codeExists)
      console.log(codeParam)
      // authService.login(codeParam)
      dispatch(login(codeParam))
    }
  }, [tempCode, codeParam])

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
