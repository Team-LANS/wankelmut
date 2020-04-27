import React from 'react'

const RowHeader = (props) => (
  <div>
    <input
      placeholder={'Enter Choice'}
      value={props.value}
      onChange={props.onChange}
      type="text"/>
    {props.isBest ? <span>Best Solution</span> : null}
  </div>
)

export default RowHeader
