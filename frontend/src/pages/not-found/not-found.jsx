import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="container top-bottom-space">
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
    </div>
  )
}

export default NotFound
