import Berry from '~core/entity/Berry'
import FeedPokemon from '../../../src/core/usecase/FeedPokemon'
import BerryRepositoryInMemory from '../repository/BerryRepositoryInMemory'
import PokemonRepositoryInMemory from '../repository/PokemonRepositoryInMemory'

describe('Pokemon Repository', () => {
  let pokemonRepo: PokemonRepositoryInMemory
  let berryRepo: BerryRepositoryInMemory
  let feedPokemon: FeedPokemon

  beforeEach(async () => {
    pokemonRepo = new PokemonRepositoryInMemory()
    berryRepo = new BerryRepositoryInMemory()
    feedPokemon = new FeedPokemon(pokemonRepo, berryRepo)
  })

  test('Should be able feed pokemon', async function () {
    const pokemon = await pokemonRepo.getActivePokemon()

    const resultChange1 = await feedPokemon.execute(
      new Berry('Test Berry', 'soft', 'sprite_url'),
      pokemon
    )
    expect(resultChange1).toBe(true)

    expect(pokemon.weight).toBe(6)

    const resultChange2 = await feedPokemon.execute(
      new Berry('Test Berry', 'soft', 'sprite_url'),
      pokemon
    )
    expect(resultChange2).toBe(true)

    expect(pokemon.weight).toBe(1)
  })
})
