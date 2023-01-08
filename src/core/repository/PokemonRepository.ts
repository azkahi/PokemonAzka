import Pokemon from '../entity/Pokemon'

export default interface PokemonRepository {
  getActivePokemon(): Promise<Pokemon>
  changeActivePokemon(pokemon: Pokemon): Promise<boolean>
  getNextEvolution(pokemon: Pokemon): Promise<Pokemon>
  getListOfPokemons(offset: number, limit: number): Promise<Pokemon[]>
  searchPokemonByName(name: string): Promise<Pokemon[]>
}
