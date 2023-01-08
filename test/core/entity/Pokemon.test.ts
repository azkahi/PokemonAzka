import Pokemon, { Stats } from '../../../src/core/entity/Pokemon'

describe('Pokemon entity', () => {
  test('Should create pokemon from constructor args', async function () {
    const sprites = ['sprite_url']
    const stats = [{ label: 'Speed', base: 6 }]
    const pokemon = new Pokemon('Test Pokemon', 3, sprites, stats)
    expect(pokemon.name).toBe('Test Pokemon')
    expect(pokemon.weight).toBe(3)
    expect(pokemon.sprites[0]).toBe('sprite_url')
    expect(pokemon.stats[0].label).toBe('speed')
    expect(pokemon.stats[0].base).toBe(6)
  })
})
