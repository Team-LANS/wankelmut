import calculateBest from './topsis'

describe('calculateBest', () => {
  const headers = [{ weight: 1, impact: true }, { weight: 2, impact: true }]

  const choices = [[1, 2], [3, 4]]

  it('should return best index', () => {
    expect(calculateBest(choices, headers)).toEqual(1)
  })

  describe('with negative impact', () => {
    it('should return best index', () => {
      const headers = [{ weight: 1, impact: false }, { weight: 2, impact: false }]

      expect(calculateBest(choices, headers)).toEqual(0)
    })
  })

  describe('with null values', () => {
    it('should return best index', () => {
      const choices = [[1, null], [1, 3]]

      expect(calculateBest(choices, headers)).toEqual(1)
    })
  })
})
