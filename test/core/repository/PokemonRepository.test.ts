import Pokemon from '../../../src/core/entity/Pokemon'
import PokemonRepository from '../../../src/core/repository/PokemonRepository'
import PokemonRepositoryInMemory from './PokemonRepositoryInMemory'

describe('Pokemon Repository', () => {
  let pokemonRepo: PokemonRepository

  beforeEach(async () => {
    pokemonRepo = new PokemonRepositoryInMemory()
  })

  test('Should return available Pokemons from in memory', async function () {
    const pokemons = await pokemonRepo.getListOfPokemons(0, 3)
    expect(pokemons).toHaveLength(3)
  })

  test('Should be able to search pokemon from list', async function () {
    const pokemons = await pokemonRepo.searchPokemonByName('3')
    expect(pokemons).toHaveLength(1)
  })

  test('Should be able to get active pokemon and get next evolution', async function () {
    const pokemon = await pokemonRepo.getActivePokemon()
    const pokemonEvolve = await pokemonRepo.getNextEvolution(pokemon)
    expect(pokemon.name).toBe('Test Pokemon')
    expect(pokemonEvolve.name).toBe('Test Pokemon Evolve')
  })

  test('Should be able to remove and change active pokemon', async function () {
    let pokemon = await pokemonRepo.getActivePokemon()
    expect(pokemon.name).toBe('Test Pokemon')

    const resultChange1 = await pokemonRepo.changeActivePokemon({} as Pokemon)

    expect(resultChange1).toBe(true)

    pokemon = await pokemonRepo.getActivePokemon()

    expect(pokemon.name).toBe(undefined)

    const pokemons = await pokemonRepo.getListOfPokemons(0, 3)

    const resultChange2 = await pokemonRepo.changeActivePokemon(pokemons[0])

    expect(resultChange2).toBe(true)

    pokemon = await pokemonRepo.getActivePokemon()

    expect(pokemon.name).toBe('Test Pokemon 1')
  })
})
