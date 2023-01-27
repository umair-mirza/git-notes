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
import { logout, reset } from "../../store/auth/authSlice"
import { paperProps } from "./constants"
import { Box, styled } from "@mui/material"

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

  const CustomLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
  })

  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <Box
          component="img"
          onClick={handleClick}
          src={user.avatar_url}
          alt="avatar"
          sx={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
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
          <CustomLink to="/my-notes">
            <ListItemIcon>
              <ArticleIcon fontSize="small" />
            </ListItemIcon>
            Your Notes
          </CustomLink>
        </MenuItem>
        <MenuItem>
          <CustomLink to="/create-note">
            <ListItemIcon>
              <NoteAddIcon fontSize="small" />
            </ListItemIcon>
            Create a Note
          </CustomLink>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <Box
            component="a"
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Your Github Profile
          </Box>
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
