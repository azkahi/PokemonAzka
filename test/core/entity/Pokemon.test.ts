import Berry from '../../../src/core/entity/Berry'
import Pokemon from '../../../src/core/entity/Pokemon'

describe('Pokemon entity', () => {
  test('Should create pokemon from constructor args', async function () {
    const sprites = ['sprite_url']
    const stats = [{ label: 'Speed', base: 6 }]
    const pokemon = new Pokemon('Test Pokemon', 3, sprites, stats, undefined)
    expect(pokemon.name).toBe('Test Pokemon')
    expect(pokemon.weight).toBe(3)
    expect(pokemon.sprites[0]).toBe('sprite_url')
    expect(pokemon.stats[0].label).toBe('Speed')
    expect(pokemon.stats[0].base).toBe(6)
    expect(pokemon.prevBerry).toBe(undefined)
  })

  test('Should change pokemon weight', async function () {
    const sprites = ['sprite_url']
    const stats = [{ label: 'Speed', base: 6 }]
    const pokemon = new Pokemon('Test Pokemon', 3, sprites, stats, undefined)

    pokemon.changePokemonWeight(3)

    expect(pokemon.weight).toBe(6)

    pokemon.changePokemonWeight(-10)

    expect(pokemon.weight).toBe(1)
  })

  test('Should check pokemon berry to be not okay', async function () {
    const sprites = ['sprite_url']
    const stats = [{ label: 'Speed', base: 6 }]
    const berry = new Berry('Test Berry', 'hard', 'sprite_url')
    const pokemon = new Pokemon('Test Pokemon', 3, sprites, stats, berry)

    const nextBerry = new Berry('Next Berry', 'hard', 'sprite_url')

    expect(pokemon.checkBerryOkay(nextBerry)).toBe(false)
  })

  test('Should check pokemon berry to be okay', async function () {
    const sprites = ['sprite_url']
    const stats = [{ label: 'Speed', base: 6 }]
    const berry = new Berry('Test Berry', 'others', 'sprite_url')
    const pokemon = new Pokemon('Test Pokemon', 3, sprites, stats, berry)

    const nextBerry = new Berry('Next Berry', 'hard', 'sprite_url')

    expect(pokemon.checkBerryOkay(nextBerry)).toBe(true)
  })
})
