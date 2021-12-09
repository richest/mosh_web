import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return(
        <Link to="/home">
        <img style={{ maxWidth: "70px" }} src="/webapp/images/logo.png" alt="Glitters" />
      </Link>
    )
}
export default Logo