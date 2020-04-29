import React from 'react'

import classes from './ColumnHeader.module.css'

const ColumnHeader = (props) => {
  const { name, weight, impact } = props.header

  return <div className={classes.ColumnHeader}>
    <label>
      Name
      <input
        placeholder={'Enter Criteria'}
        value={name}
        onChange={e => props.onHeaderChange({ ...props.header, name: e.target.value })}
        type="text"/>
    </label>
    <label>
      Weight
      <input
        placeholder={'Enter Weight'}
        value={weight}
        onChange={e => props.onHeaderChange({ ...props.header, weight: e.target.value })}
        type="text"/>
    </label>
    <label>
      Positive?
      <input
        checked={impact}
        onChange={e => props.onHeaderChange({ ...props.header, impact: e.target.checked })}
        type="checkbox"
      />
    </label>
  </div>
}

export default ColumnHeader
