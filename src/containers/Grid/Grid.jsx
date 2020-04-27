import React, { useEffect, useState } from 'react'

import classes from './Grid.module.css'
import RowHeader from '../../components/Grid/RowHeader/RowHeader'
import ColumnHeader from '../../components/Grid/ColumnHeader/ColumnHeader'
import Cell from '../../components/Grid/Cell/Cell'

const Grid = (props) => {
  const [columnHeaders, setColumnHeaders] = useState(['Entertainment', 'Facilities', 'TravelCost', 'Accomodation'])
  const [rowHeaders, setRowHeaders] = useState(['Hogwarts', 'Hogsmead', 'Azkaban'])

  const [data, setData] = useState([
    [9, 7, 6, 7],
    [8, 7, 9, 6],
    [7, 8, 6, 6]
  ])

  const [bestIndex, setBestIndex] = useState(0)

  useEffect(() => {
    setBestIndex(calculateBest())
  }, [data])

  const calculateBest = () => {
    const transpose = array => array.reduce((r, a) => a.map((v, i) => [...(r[i] || []), v]), [])

    const transposed = transpose(data)
    const normalizedData = transposed.map(row => {
      const normalizer = Math.sqrt(row.reduce((previous, element) => previous + Math.pow(element, 2), 0))
      return normalizer > 0 ? row.map(value => value / normalizer) : 0
    })
    const weights = [4, 2, 6, 8]
    const weightedData = normalizedData.map((row, index) => row.map(value => value * weights[index]))
    const idealSolution = weightedData.map(criteria => Math.max.apply(null, criteria))
    const worstSolution = weightedData.map(criteria => Math.min.apply(null, criteria))

    const weightedChoices = transpose(weightedData)
    const impact = [true, true, false, false]
    // TODO: Simplify
    const distancesToIdeal = weightedChoices.map(choice => {
      const differences = choice.map((value, index) => {
        const solutionValue = impact[index] ? idealSolution[index] : worstSolution[index]
        return Math.pow(solutionValue - value, 2)
      })
      return Math.sqrt(differences.reduce((previous, element) => previous + element, 0))
    })
    const distancesToWorst = weightedChoices.map(choice => {
      const differences = choice.map((value, index) => {
        const solutionValue = !impact[index] ? idealSolution[index] : worstSolution[index]
        return Math.pow(solutionValue - value, 2)
      })
      return Math.sqrt(differences.reduce((previous, element) => previous + element, 0))
    })
    // TODO: Replace with Zip
    const relativeDistances = Array(distancesToWorst.length)
    for (let i = 0; i < distancesToWorst.length; i++) {
      const sum = distancesToIdeal[i] + distancesToWorst[i]
      relativeDistances[i] = distancesToWorst[i] / sum
    }
    return relativeDistances.indexOf(Math.max(...relativeDistances))
  }

  const renderColumnHeaders = () => {
    return columnHeaders.map((header, index) => {
      return <ColumnHeader
        key={`columnHeader${index}`}
        value={header}
        onChange={e => changeColumnHeader(index, e.target.value)}
        className={classes.Cell}>{header}</ColumnHeader>
    })
  }

  const addRow = () => {
    setRowHeaders(previous => [...previous, ''])
    setData(previous => [...previous, Array(columnHeaders.length).fill(0)])
  }

  const addColum = () => {
    setColumnHeaders(previous => [...previous, ''])
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
