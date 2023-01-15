import * as React from "react"
import { Link } from "react-router-dom"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import Tooltip from "@mui/material/Tooltip"
import PersonAdd from "@mui/icons-material/PersonAdd"
import Logout from "@mui/icons-material/Logout"
import ArticleIcon from "@mui/icons-material/Article"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "../redux/auth/authSlice"
import { paperProps } from "./constants/constants"

import "./scss/UserIcon.scss"

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <img
          onClick={handleClick}
          className="avatar"
          src={user.avatar_url}
          alt="avatar"
        />
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>Signed In As</MenuItem>
        <MenuItem>{user.login}</MenuItem>
        <Divider />
        <MenuItem>
          <Link to="/my-notes">
            <ListItemIcon>
              <ArticleIcon fontSize="small" />
            </ListItemIcon>
            Your Notes
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/create-note">
            <ListItemIcon>
              <NoteAddIcon fontSize="small" />
            </ListItemIcon>
            Create a Note
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            Your Github Profile
          </a>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
