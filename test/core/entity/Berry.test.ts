import Berry from '../../../src/core/entity/Berry'

describe('Berry entity', () => {
  test('Should create berry from constructor args', async function () {
    const reservation = new Berry('Test Berry', 'very-soft')
    expect(reservation.name).toBe('Test Berry')
    expect(reservation.weightInKg).toBe(2)
  })
})
