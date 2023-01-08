import Pokemon from '../../../src/core/entity/Pokemon'
import PokemonRepository from '../../../src/core/repository/PokemonRepository'

export default class PokemonRepositoryInMemory implements PokemonRepository {
  private pokemons: Pokemon[] = [
    new Pokemon('Test Pokemon 1', 3, [], [], undefined),
    new Pokemon('Test Pokemon 2', 3, [], [], undefined),
    new Pokemon('Test Pokemon 3', 3, [], [], undefined),
  ]

  private pokemon: Pokemon = new Pokemon('Test Pokemon', 3, [], [], undefined)

  private pokemonEvolve: Pokemon = new Pokemon('Test Pokemon Evolve', 3, [], [], undefined)

  getActivePokemon(): Promise<Pokemon> {
    return Promise.resolve(this.pokemon)
  }
  changeActivePokemon(pokemon: Pokemon): Promise<boolean> {
    this.pokemon = pokemon
    return Promise.resolve(true)
  }
  getNextEvolution(pokemon: Pokemon): Promise<Pokemon> {
    return Promise.resolve(this.pokemonEvolve)
  }
  searchPokemonByName(name: string): Promise<Pokemon[]> {
    return Promise.resolve(this.pokemons.filter((element) => element.name.indexOf(name) !== -1))
  }
  async getListOfPokemons(offset: number, limit: number): Promise<Pokemon[]> {
    return Promise.resolve(this.pokemons)
  }
}
