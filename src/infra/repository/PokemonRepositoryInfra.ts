import Pokemon, { Stats } from '../../core/entity/Pokemon'
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

    await Promise.all(
      response.results.map(async (element: any) => {
        const responsePokemon = await RequestAPIHelper.GetRequest(element.url)

        const stats: Stats[] = []

        responsePokemon.stats.forEach((statItem: any) => {
          const stat = { label: statItem.stat.name, base: statItem.base_stat }
          stats.push(stat)
        })

        const pokemon = new Pokemon(
          element.name,
          responsePokemon.weight,
          Object.values(responsePokemon.sprites),
          stats,
          undefined
        )

        pokemons.push(pokemon)
      })
    )

    return pokemons
  }
}
