import Pokemon from '../entity/Pokemon'
import PokemonRepository from '../repository/PokemonRepository'

export default class SearchPokemon {
  private pokemonRepo: PokemonRepository

  constructor(pokemonRepo: PokemonRepository) {
    this.pokemonRepo = pokemonRepo
  }

  async getActivePokemon(): Promise<Pokemon> {
    return await this.pokemonRepo.getActivePokemon()
  }

  async getAllPokemon(offset: number, limit: number): Promise<Pokemon[]> {
    try {
      const pokemons = await this.pokemonRepo.getListOfPokemons(offset, limit)

      return Promise.resolve(pokemons)
    } catch {
      return Promise.resolve([])
    }
  }

  async searchPokemon(keyword: string): Promise<Pokemon[]> {
    try {
      const pokemons = await this.pokemonRepo.searchPokemonByName(keyword)

      return Promise.resolve(pokemons)
    } catch {
      return Promise.resolve([])
    }
  }
}
