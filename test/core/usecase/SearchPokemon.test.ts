import SearchPokemon from '../../../src/core/usecase/SearchPokemon'
import PokemonRepositoryInMemory from '../repository/PokemonRepositoryInMemory'

describe('Pokemon Repository', () => {
  let pokemonRepo: PokemonRepositoryInMemory
  let searchPokemon: SearchPokemon

  beforeEach(async () => {
    pokemonRepo = new PokemonRepositoryInMemory()
    searchPokemon = new SearchPokemon(pokemonRepo)
  })

  test('Should return the current pokemon', async function () {
    const pokemon = await searchPokemon.getActivePokemon()
    expect(pokemon.name).toBe('Test Pokemon')
  })

  test('Should return all pokemon', async function () {
    const pokemons = await searchPokemon.getAllPokemon(0, 3)
    expect(pokemons).toHaveLength(3)
  })

  test('Should return pokemon with keyword', async function () {
    const pokemons = await searchPokemon.searchPokemon('3')
    expect(pokemons).toHaveLength(1)
  })
})
