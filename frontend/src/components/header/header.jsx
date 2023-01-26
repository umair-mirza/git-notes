import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { GITHUB_LOGIN_URL } from "./constants"
import { login, reset } from "../../store/auth/authSlice"

import AccountMenu from "../account-menu/account-menu"
import SearchBar from "../search-bar/search-bar"

import { Box, Container, Stack, Typography } from "@mui/material"

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
    <Box backgroundColor="primary.main" padding="10px">
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            color="white"
            fontWeight="bold"
            component="h1"
            fontSize={{ xs: "20px", sm: "30px" }}
            onClick={redirectHome}
            sx={{ cursor: "pointer" }}
          >
            GIT NOTES
          </Typography>
          <Box>
            <Stack direction="row" alignItems="center" gap={5}>
              {location.pathname === "/" && <SearchBar />}
              {user ? (
                <AccountMenu />
              ) : (
                <Box>
                  <a href={GITHUB_LOGIN_URL}>Login</a>
                </Box>
              )}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
