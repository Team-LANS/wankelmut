import React, { useEffect, useState } from 'react'

import classes from './Grid.module.css'
import RowHeader from '../../components/Grid/RowHeader/RowHeader'
import ColumnHeader from '../../components/Grid/ColumnHeader/ColumnHeader'
import Cell from '../../components/Grid/Cell/Cell'
import calculateBest from '../../javascripts/topsis'

const Grid = (props) => {
  const [columnHeaders, setColumnHeaders] = useState([
    { name: 'Entertainment', weight: 4, impact: true },
    { name: 'Facilities', weight: 2, impact: true },
    { name: 'TravelCost', weight: 6, impact: false },
    { name: 'Accomodation', weight: 8, impact: false }
  ])
  const [rowHeaders, setRowHeaders] = useState(['Hogwarts', 'Hogsmead', 'Azkaban'])

  const [data, setData] = useState([
    [9, 7, 6, 7],
    [8, 7, 9, 6],
    [7, 8, 6, 6]
  ])

  const [bestIndex, setBestIndex] = useState(0)

  useEffect(() => {
    setBestIndex(calculateBest(data, columnHeaders))
  }, [data, columnHeaders])

  const renderColumnHeaders = () => {
    return columnHeaders.map((header, index) => {
      return <ColumnHeader
        key={`columnHeader${index}`}
        header={header}
        onHeaderChange={(header) => changeColumnHeader(index, header)}
        className={classes.Cell}>{header}</ColumnHeader>
    })
  }

  const addRow = () => {
    setRowHeaders(previous => [...previous, ''])
    setData(previous => [...previous, Array(columnHeaders.length).fill(0)])
  }

  const addColum = () => {
    setColumnHeaders(previous => [...previous, { name: '', weight: 0, impact: true }])
    setData(previous => [...previous].map(row => [...row, 0]))
  }

  const changeRowHeader = (rowIndex, value) => {
    const newHeaders = [...rowHeaders]
    newHeaders[rowIndex] = value
    setRowHeaders(newHeaders)
  }

  const changeColumnHeader = (columIndex, value) => {
    const newHeaders = [...columnHeaders]
    newHeaders[columIndex] = value
    setColumnHeaders(newHeaders)
  }

  const changeCell = (rowIndex, columnIndex, value) => {
    const newData = [...data]
    newData[rowIndex][columnIndex] = value
    setData(newData)
  }

  const renderRow = (rowIndex) => {
    const rowHeader = <RowHeader
      key={`rowHeader${rowIndex}`}
      value={rowHeaders[rowIndex]}
      isBest={rowIndex === bestIndex}
      onChange={(e) => changeRowHeader(rowIndex, e.target.value)}
    />

    return [rowHeader, ...data[rowIndex].map((entry, columnIndex) => {
      return <Cell
        key={`data${rowIndex},${columnIndex}`}
        value={data[rowIndex][columnIndex]}
        contribution={0}
        onChange={(e) => changeCell(rowIndex, columnIndex, e.target.value)}>
        Entry: {entry}
      </Cell>
    })]
  }

  const renderRows = () => {
    return data.map((_, index) => renderRow(index))
  }

  return <>
    <div className={classes.Grid} style={{ gridTemplateColumns: `repeat(${columnHeaders.length + 1}, 1fr)` }}>
      <div className={classes.Cell}/>
      {renderColumnHeaders()}
      {renderRows()}
    </div>
    <div>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColum}>Add Column</button>
    </div>
  </>
}

export default Grid
