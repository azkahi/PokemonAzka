import Pokemon from '../entity/Pokemon'

export default interface PokemonRepository {
  getNextEvolution(pokemon: Pokemon): Promise<Pokemon>
  getListOfPokemons(offset: number, limit: number): Promise<Pokemon[]>
  searchPokemonByName(name: string): Promise<Pokemon[]>
}
