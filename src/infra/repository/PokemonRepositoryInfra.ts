import Pokemon from '../../core/entity/Pokemon'
import PokemonRepository from '../../core/repository/PokemonRepository'
import RequestAPIHelper from '../utils/requestAPIHelper'

export default class PokemonRepositoryInfra implements PokemonRepository {
  getActivePokemon(): Promise<Pokemon> {
    throw new Error('Method not implemented.')
  }
  changeActivePokemon(pokemon: Pokemon): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  getNextEvolution(pokemon: Pokemon): Promise<Pokemon> {
    throw new Error('Method not implemented.')
  }
  searchPokemonByName(name: string): Promise<Pokemon[]> {
    throw new Error('Method not implemented.')
  }
  async getListOfPokemons(offset: number, limit: number): Promise<Pokemon[]> {
    const response = await RequestAPIHelper.GetRequest(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    )

    const pokemons: Pokemon[] = []

    response.results.forEach((element: any) => {
      const pokemon = new Pokemon(element.name, 1, [], [], undefined)
      pokemons.push(pokemon)
    })

    return pokemons
  }
}
