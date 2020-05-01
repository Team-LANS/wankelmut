import { normalizeRow, transpose, zipWith } from './utils'

describe('zipWith', () => {
  it('should do zip two array with function', () => {
    const result = zipWith((x, y) => x + y, [1, 2, 3], [1, 2, 3])
    expect(result).toEqual([2, 4, 6])
  })
})

describe('transpose', function () {
  it('should transpose matrix', () => {
    const matrix = [[1, 2], [3, 4]]

    expect(transpose(matrix)).toEqual([[1, 3], [2, 4]])
  })
})

describe('normalizeRow', () => {
  it('should normalize row', () => {
    const result = normalizeRow([3, 4])

    expect(result).toEqual([0.6, 0.8])
  })
})
