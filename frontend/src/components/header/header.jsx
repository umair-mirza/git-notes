import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { GITHUB_LOGIN_URL } from "./constants"
import { login, reset } from "../../redux/auth/authSlice"

import AccountMenu from "../account-menu/account-menu"
import SearchBar from "../search-bar/search-bar"

import "./header.scss"

const Header = () => {
  const [tempCode, setTempCode] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

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
        {location.pathname === "/" && <SearchBar />}
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
