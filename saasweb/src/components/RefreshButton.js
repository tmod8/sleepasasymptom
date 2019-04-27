import React from 'react'

const RefreshButton = ({refresh}) => (
    <i className="fa fa-refresh m-1" onClick={() => {refresh()}} >{" Data refresh"}</i>
)

export default RefreshButton