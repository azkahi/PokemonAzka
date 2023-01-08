import Berry from '../../../src/core/entity/Berry'

describe('Berry entity', () => {
  test('Should create berry from constructor args', async function () {
    const berry = new Berry('Test Berry', 'very-soft', 'sprite_url')
    expect(berry.name).toBe('Test Berry')
    expect(berry.weight).toBe(2)
    expect(berry.defaultSprite).toBe('sprite_url')
  })
})
