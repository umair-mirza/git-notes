import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import { visuallyHidden } from "@mui/utils"

import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchNotes,
  resetNotes,
  resetSearch,
} from "../features/notes/notesSlice"
import Spinner from "../components/Spinner"

import "./NoteTable.scss"
import "../components/UserIcon.scss"
import "../components/Spinner.scss"

const headCells = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: true,
    label: "Avatar",
  },
  {
    id: "user",
    numeric: false,
    disablePadding: true,
    label: "User",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Time",
  },
  {
    id: "note-id",
    numeric: false,
    disablePadding: false,
    label: "Note Id",
  },
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Public Gists
      </Typography>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
}

//Main component
export default function NotesTable() {
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("calories")
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { notes, searchedNote, isSuccess, isLoading, message } = useSelector(
    (state) => state.notes
  )

  useEffect(() => {
    dispatch(fetchNotes({ currPage: page + 1, rowsPerPage: rowsPerPage }))

    return () => {
      if (isSuccess) {
        dispatch(resetNotes())
      }
    }
  }, [dispatch, page, rowsPerPage])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = notes.map((n) => n.login)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const noteHandler = (noteId) => {
    navigate(`/notes/${noteId}`)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 3000) : 0

  const totalCount = 3000

  const selectedNotes =
    Object.keys(searchedNote).length > 0 && notes ? [searchedNote] : notes

  //This will render the notes based on the data available
  const renderNotes = () => {
    if (isLoading && !notes && !searchedNote) {
      return (
        <TableBody>
          <Spinner />
        </TableBody>
      )
    } else {
      return (
        <TableBody>
          {selectedNotes.map((note, index) => (
            <TableRow key={note.id} hover>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>
                <img
                  className="avatar"
                  src={note.owner.avatar_url}
                  alt="avatar"
                />
              </TableCell>
              <TableCell>{note.owner.login}</TableCell>
              <TableCell>{note.created_at}</TableCell>
              <TableCell>{note.updated_at}</TableCell>
              <TableCell
                className="select-cell"
                onClick={() => noteHandler(note.id)}
              >
                {note.id}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
    }
  }

  const allResultsHandler = () => {
    dispatch(resetSearch())
    navigate("/")
  }

  return (
    <div className="container top-bottom-space">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={notes.length}
              />
              {renderNotes()}
            </Table>
          </TableContainer>
          {selectedNotes.length > 1 && (
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              showFirstButton
              showLastButton
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
        {Object.keys(searchedNote).length > 0 && (
          <div>
            <button onClick={allResultsHandler} className="primary-button">
              Back to All Results
            </button>
          </div>
        )}
      </Box>
    </div>
  )
}
