const zipWith = (f, xs, ys) => xs.map((n, i) => f(n, ys[i]))

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
  const worstSolution = weightedData.map(criteria => Math.min.apply(null, criteria))

  const weightedChoices = transpose(weightedData)
  const impacts = columnHeaders.map(header => header.impact)

  const distancesToIdeal = weightedChoices.map(choice => {
    return choice.map((value, index) => {
      const solutionValue = impacts[index] ? idealSolution[index] : worstSolution[index]
      return Math.pow(solutionValue - value, 2)
    })
  }).map(differences => Math.sqrt(differences.reduce((previous, element) => previous + element, 0)))

  const distancesToWorst = weightedChoices.map(choice => {
    return choice.map((value, index) => {
      const solutionValue = !impacts[index] ? idealSolution[index] : worstSolution[index]
      return Math.pow(solutionValue - value, 2)
    })
  }).map(differences => Math.sqrt(differences.reduce((previous, element) => previous + element, 0)))

  const relativeDistances = zipWith((x, y) => (x / (x + y)), distancesToWorst, distancesToIdeal)
  return relativeDistances.indexOf(Math.max(...relativeDistances))
}

export default calculateBest
