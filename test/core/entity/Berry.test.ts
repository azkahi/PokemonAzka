import Berry from '../../../src/core/entity/Berry'

describe('Berry entity', () => {
  test('Should create berry from constructor args', async function () {
    const berry = new Berry('Test Berry', 'very-soft')
    expect(berry.name).toBe('Test Berry')
    expect(berry.weightInKg).toBe(2)
  })
})
