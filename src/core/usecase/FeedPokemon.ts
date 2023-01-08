import Berry from '../entity/Berry'
import BerryRepository from '../repository/BerryRepository'
import PokemonRepository from '../repository/PokemonRepository'

export default class FeedPokemon {
  private pokemonRepo: PokemonRepository
  private berryRepo: BerryRepository

  constructor(pokemonRepo: PokemonRepository, berryRepository: BerryRepository) {
    this.pokemonRepo = pokemonRepo
    this.berryRepo = berryRepository
  }

  async execute(berry: Berry): Promise<boolean> {
    try {
      const pokemon = await this.pokemonRepo.getActivePokemon()

      if (pokemon.checkBerryOkay(berry)) {
        pokemon.changePokemonWeight(berry.weight)
        pokemon.prevBerry = berry
      } else {
        pokemon.changePokemonWeight(-2 * berry.weight)
      }

      return Promise.resolve(true)
    } catch {
      return Promise.resolve(false)
    }
  }

  async getAllBerries(): Promise<Berry[]> {
    try {
      const berries = await this.berryRepo.getListOfBerries()

      return Promise.resolve(berries)
    } catch {
      return Promise.resolve([])
    }
  }
}
