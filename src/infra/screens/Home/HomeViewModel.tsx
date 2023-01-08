import { useState } from 'react'

import Pokemon from '../../../core/entity/Pokemon'
import SearchPokemon from '../../../core/usecase/SearchPokemon'
import { DEFAULT_PAGE_SIZE } from '../../constants'
import PokemonRepositoryInfra from '../../repository/PokemonRepositoryInfra'

const HomeViewModel = () => {
  const pokemonRepo: PokemonRepositoryInfra = new PokemonRepositoryInfra()
  const searchPokemon: SearchPokemon = new SearchPokemon(pokemonRepo)

  const [offset, setOffset] = useState(0)
  const [listData, setListData] = useState([])
  const [data, setData] = useState({} as Pokemon)

  const initListData = async () => {
    await setListData([])
    await setOffset(0)
    await buildListData()
  }
  const buildListData = async () => {
    const response = await searchPokemon.getAllPokemon(offset, DEFAULT_PAGE_SIZE)
    listData.push(...response)
    setListData(listData)
    setOffset(offset + 1)
  }

  const searchPokemonByKeyword = async (keyword: string) => {
    setListData([])
    setOffset(0)
    const response = await searchPokemon.searchPokemon(keyword)
    listData.push(response)
  }

  return {
    listData,
    buildListData,
    searchPokemonByKeyword,
    initListData,
  }
}

export default HomeViewModel
