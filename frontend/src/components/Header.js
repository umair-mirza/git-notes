import React, { useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/auth/authSlice"
import AccountMenu from "./AccountMenu"
import SearchBar from "./SearchBar"
import { reset } from "../features/auth/authSlice"

import "./Header.scss"
import "../App.scss"

const Header = () => {
  const [tempCode, setTempCode] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isSuccess, message } = useSelector((state) => state.auth)

  //Constants
  const clientId = process.env.REACT_APP_CLIENT_ID
  const redirectURI = process.env.REACT_APP_REDIRECT_URI
  const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user%20gist&redirect_uri=${redirectURI}`

  useEffect(() => {
    if (user) {
      dispatch(reset())
    } else {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const codeExists = urlParams.get("code")

      if (codeExists) {
        setTempCode({ code: codeExists })
      }
      dispatch(login(tempCode))
      navigate("/")
    }
  }, [tempCode])

  const redirectHome = () => {
    navigate("/")
  }

  return (
    <section className="header container">
      <div onClick={redirectHome} className="logo">
        Emumba
      </div>
      <div className="top-right">
        <SearchBar />
        {user ? (
          <AccountMenu />
        ) : (
          <div className="secondary-button">
            <a href={GITHUB_LOGIN_URL}>Login</a>
          </div>
        )}
      </div>
    </section>
  )
}

export default Header
