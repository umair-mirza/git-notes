import React from "react"
import { Routes, Route } from "react-router-dom"
import NotesTable from "./NotesTable"

import "../App.scss"

const MainWindow = () => {
  return (
    <div className="container top-bottom-space">
      <NotesTable />
    </div>
  )
}

export default MainWindow
