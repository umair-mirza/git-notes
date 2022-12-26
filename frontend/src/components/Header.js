import React, { useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { login } from "../features/auth/authSlice"
import AccountMenu from "./AccountMenu"
import SearchBar from "./SearchBar"

import "./Header.scss"
import "../App.scss"

const Header = () => {
  const [tempCode, setTempCode] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const codeParam = useMemo(() => ({ code: tempCode }), [tempCode]) //useMemo ensures that the state’s reference value does not change during each render

  const { user, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/")
    } else {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const codeExists = urlParams.get("code")

      if (codeExists) {
        setTempCode(codeExists)
        console.log(codeParam)
        dispatch(login(codeParam))
      }
    }
  }, [tempCode, codeParam, user, isSuccess, message, dispatch, navigate])

  const clientId = process.env.REACT_APP_CLIENT_ID
  const redirectURI = process.env.REACT_APP_REDIRECT_URI
  const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${redirectURI}`

  return (
    <section className="header container">
      <div className="logo">
        <Link to="/">Emumba</Link>
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
