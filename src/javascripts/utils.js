export const zipWith = (f, xs, ys) => xs.map((n, i) => f(n, ys[i]))

export const transpose = array => array.reduce((r, a) => a.map((v, i) => [...(r[i] || []), v]), [])

export const normalizeRow = row => {
  const normalizer = Math.sqrt(row.reduce((previous, element) => previous + Math.pow(element, 2), 0))
  return normalizer > 0 ? row.map(value => value / normalizer) : row
}

export const normalizeMatrix = matrix => matrix.map(normalizeRow)

export const distance = (base, reference) => {
  const distance = zipWith((x, y) => Math.pow(x - y, 2), base, reference)
    .reduce((previous, element) => previous + element, 0)
  return Math.sqrt(distance())
}

export const distanceMatrix = (base, reference) => base.map(row => distance(base, reference))
