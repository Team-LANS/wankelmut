import React from 'react'

const Cell = (props) => (
  <div>
    <input
      type="text"
      value={props.value}
      onChange={props.onChange}
    />
    <span>Contributation: {props.contribution}</span>
  </div>
)

export default Cell