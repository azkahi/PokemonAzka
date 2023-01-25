import Constants from 'expo-constants'

import Pokemon, { Stats } from '../../core/entity/Pokemon'
import PokemonRepository from '../../core/repository/PokemonRepository'
import RequestAPIHelper from '../utils/requestAPIHelper'

const baseUrl = Constants.expoConfig.extra.baseUrl

export default class PokemonRepositoryInfra implements PokemonRepository {
  async getNextEvolution(pokemon: Pokemon): Promise<Pokemon> {
    const response = await RequestAPIHelper.GetRequest(`${baseUrl}/pokemon/${pokemon.name}`)

    const speciesResponse = await RequestAPIHelper.GetRequest(response.species.url)

    const evolutionChainResponse = await RequestAPIHelper.GetRequest(
      speciesResponse.evolution_chain.url
    )

    const evolutionChain: string[] = []

    let nextChain = evolutionChainResponse.chain
    let evolveExist = nextChain.evolves_to.length > 0
    while (evolveExist) {
      evolutionChain.push(nextChain.species.name)

      nextChain = nextChain.evolves_to[0]

      evolveExist = nextChain.evolves_to.length > 0
    }

    for (let idxChain = 0; idxChain < evolutionChain.length; idxChain++) {
      const element = evolutionChain[idxChain]

      if (element === pokemon.name) {
        if (evolutionChain[idxChain + 1]) {
          return Promise.resolve(
            await this.generatePokemonFromURL(
              evolutionChain[idxChain + 1],
              `${baseUrl}/pokemon/${evolutionChain[idxChain + 1]}`
            )
          )
        } else {
          return Promise.reject(new Error('Final Evolution'))
        }
      }
    }
  }

  async searchPokemonByName(name: string): Promise<Pokemon[]> {
    const responsePokemon = await RequestAPIHelper.GetRequest(`${baseUrl}/pokemon/${name}`)

    if (responsePokemon === 'Not Found') {
      return Promise.resolve([])
    } else {
      const retArr = []
      console.log({name: responsePokemon.name})
      const resPokemon = await this.generatePokemonFromURL(
        responsePokemon.name,
        `${baseUrl}/pokemon/${name}`
      )
      retArr.push(resPokemon)
      return Promise.resolve(retArr)
    }
  }

  private async generatePokemonFromURL(name: string, url: string): Promise<Pokemon> {
    const responsePokemon = await RequestAPIHelper.GetRequest(url)

    const stats: Stats[] = []

    responsePokemon.stats.forEach((statItem: any) => {
      const stat = { label: statItem.stat.name, base: statItem.base_stat }
      stats.push(stat)
    })

    const pokemon = new Pokemon(
      name,
      responsePokemon.weight,
      Object.values(responsePokemon.sprites),
      stats,
      undefined
    )

    return Promise.resolve(pokemon)
  }

  async getListOfPokemons(offset: number, limit: number): Promise<Pokemon[]> {
    const response = await RequestAPIHelper.GetRequest(
      `${baseUrl}/pokemon?offset=${offset}&limit=${limit}`
    )

    const pokemons: Pokemon[] = []

    await Promise.all(
      response.results.map(async (element: any) => {
        const pokemon = await this.generatePokemonFromURL(element.name, element.url)

        pokemons.push(pokemon)
      })
    )

    return pokemons
  }
}
