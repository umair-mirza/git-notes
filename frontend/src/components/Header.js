import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GITHUB_LOGIN_URL } from "./constants/constants"
import { login, reset } from "../redux/auth/authSlice"

import AccountMenu from "./AccountMenu"
import SearchBar from "./SearchBar"

import "./scss/Header.scss"

const Header = () => {
  const [tempCode, setTempCode] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

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
  }, [tempCode, dispatch])

  const redirectHome = () => {
    navigate("/")
  }

  return (
    <section className="header container">
      <div onClick={redirectHome} className="logo">
        GIT NOTES
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
