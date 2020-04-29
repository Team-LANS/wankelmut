const calculateBest = (data, columnHeaders) => {
  const transpose = array => array.reduce((r, a) => a.map((v, i) => [...(r[i] || []), v]), [])

  const transposed = transpose(data)
  const normalizedData = transposed.map(row => {
    const normalizer = Math.sqrt(row.reduce((previous, element) => previous + Math.pow(element, 2), 0))
    return normalizer > 0 ? row.map(value => value / normalizer) : row
  })
  const weights = columnHeaders.map(header => header.weight)

  const weightedData = normalizedData.map((row, index) => row.map(value => value * weights[index]))
  const idealSolution = weightedData.map(criteria => Math.max.apply(null, criteria))
  console.table(idealSolution)
  const worstSolution = weightedData.map(criteria => Math.min.apply(null, criteria))

  const weightedChoices = transpose(weightedData)
  const impacts = columnHeaders.map(header => header.impact)
  // TODO: Simplify
  const distancesToIdeal = weightedChoices.map(choice => {
    const differences = choice.map((value, index) => {
      const solutionValue = impacts[index] ? idealSolution[index] : worstSolution[index]
      return Math.pow(solutionValue - value, 2)
    })
    return Math.sqrt(differences.reduce((previous, element) => previous + element, 0))
  })
  console.table(distancesToIdeal)
  const distancesToWorst = weightedChoices.map(choice => {
    const differences = choice.map((value, index) => {
      const solutionValue = !impacts[index] ? idealSolution[index] : worstSolution[index]
      return Math.pow(solutionValue - value, 2)
    })
    return Math.sqrt(differences.reduce((previous, element) => previous + element, 0))
  })
  console.table(distancesToWorst)
  // TODO: Replace with Zip
  const relativeDistances = Array(distancesToWorst.length)
  for (let i = 0; i < distancesToWorst.length; i++) {
    const sum = distancesToIdeal[i] + distancesToWorst[i]
    relativeDistances[i] = distancesToWorst[i] / sum
  }
  return relativeDistances.indexOf(Math.max(...relativeDistances))
}

export default calculateBest
