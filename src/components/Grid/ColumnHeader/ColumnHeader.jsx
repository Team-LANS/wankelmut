import React from 'react'

const ColumnHeader = (props) => (
  <div>
    <input
      placeholder={'Enter Criteria'}
      value={props.value}
      onChange={props.onChange}
      type="text"/>
  </div>
)

export default ColumnHeader
