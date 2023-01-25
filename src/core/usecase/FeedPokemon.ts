import Berry from '../entity/Berry'
import Pokemon from '../entity/Pokemon'
import BerryRepository from '../repository/BerryRepository'
import PokemonRepository from '../repository/PokemonRepository'

export default class FeedPokemon {
  private pokemonRepo: PokemonRepository
  private berryRepo: BerryRepository

  constructor(pokemonRepo: PokemonRepository, berryRepository: BerryRepository) {
    this.pokemonRepo = pokemonRepo
    this.berryRepo = berryRepository
  }

  async execute(berry: Berry, pokemon: Pokemon): Promise<boolean> {
    try {
      if (pokemon.checkBerryOkay(berry)) {
        pokemon.changePokemonWeight(berry.weight)
        pokemon.eatBerry(berry)
      } else {
        pokemon.changePokemonWeight(-2 * berry.weight)
      }
      return Promise.resolve(true)
    } catch {
      return Promise.resolve(false)
    }
  }

  async getAllBerries(offset: number, limit: number): Promise<Berry[]> {
    try {
      const berries = await this.berryRepo.getListOfBerries(offset, limit)

      return Promise.resolve(berries)
    } catch {
      return Promise.resolve([])
    }
  }
}
