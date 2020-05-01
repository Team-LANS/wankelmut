import { distanceMatrix, normalizeMatrix, transpose, zipWith } from './utils'

const calculateBest = (choices, columnHeaders) => {
  const criterias = transpose(choices)
  const normalizedCriterias = normalizeMatrix(criterias)

  const weights = columnHeaders.map(header => header.weight)

  const weightedCriterias = normalizedCriterias.map((row, index) => row.map(value => value * weights[index]))

  const weightedChoices = transpose(weightedCriterias)
  const impacts = columnHeaders.map(header => header.impact)

  const idealSolution = weightedCriterias.map(criteria => Math.max.apply(null, criteria))
  const worstSolution = weightedCriterias.map(criteria => Math.min.apply(null, criteria))
  const idealWithImpacts = impacts.map((impact, index) => impact ? idealSolution[index] : worstSolution[index])
  const worstWithImpacts = impacts.map((impact, index) => impact ? worstSolution[index] : idealSolution[index])

  const distancesToIdeal = distanceMatrix(weightedChoices, idealWithImpacts)
  const distancesToWorst = distanceMatrix(weightedChoices, worstWithImpacts)

  const relativeDistances = zipWith((x, y) => (x / (x + y)), distancesToWorst, distancesToIdeal)
  return relativeDistances.indexOf(Math.max(...relativeDistances))
}

export default calculateBest
