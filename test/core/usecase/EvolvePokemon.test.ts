import EvolvePokemon from '../../../src/core/usecase/EvolvePokemon'
import PokemonRepositoryInMemory from '../repository/PokemonRepositoryInMemory'

describe('Pokemon Repository', () => {
  let pokemonRepo: PokemonRepositoryInMemory
  let evolvePokemon: EvolvePokemon

  beforeEach(async () => {
    pokemonRepo = new PokemonRepositoryInMemory()
    evolvePokemon = new EvolvePokemon(pokemonRepo)
  })

  test('Should return the next available evolution', async function () {
    const willEvolveTo = await evolvePokemon.willEvolveTo(await pokemonRepo.getActivePokemon())
    expect(willEvolveTo.name).toBe('Test Pokemon Evolve')
  })

  test('Should evolve the current active pokemon', async function () {
    const resultChange = await evolvePokemon.evolve(await pokemonRepo.getActivePokemon())
    expect(resultChange).toBe(true)

    const pokemon = await pokemonRepo.getActivePokemon()

    expect(pokemon.name).toBe('Test Pokemon Evolve')
  })
})
