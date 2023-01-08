import Pokemon from '../entity/Pokemon'
import PokemonRepository from '../repository/PokemonRepository'

export default class EvolvePokemon {
  private pokemonRepo: PokemonRepository

  constructor(pokemonRepo: PokemonRepository) {
    this.pokemonRepo = pokemonRepo
  }

  async willEvolveTo(pokemon: Pokemon): Promise<Pokemon> {
    try {
      const pokemonToEvolveTo = await this.pokemonRepo.getNextEvolution(pokemon)
      return Promise.resolve(pokemonToEvolveTo)
    } catch {
      return Promise.reject(new Error('No evolution!'))
    }
  }

  async evolve(pokemon: Pokemon): Promise<boolean> {
    try {
      const pokemonToEvolveTo = await this.pokemonRepo.getNextEvolution(pokemon)

      pokemon.evolveTo(pokemonToEvolveTo)

      return Promise.resolve(true)
    } catch {
      return Promise.resolve(false)
    }
  }
}
