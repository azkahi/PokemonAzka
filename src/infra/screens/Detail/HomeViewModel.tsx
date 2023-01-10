import { useState, useCallback } from 'react'

import Pokemon from '../../../core/entity/Pokemon'
import feedPokemon from '../../../core/usecase/SearchPokemon'
import { DEFAULT_PAGE_SIZE } from '../../constants'
import PokemonRepositoryInfra from '../../repository/PokemonRepositoryInfra'

const DetailViewModel = () => {
  const pokemonRepo: PokemonRepositoryInfra = new PokemonRepositoryInfra()
  const feedPokemon: SearchPokemon = new SearchPokemon(pokemonRepo)

  const [offset, setOffset] = useState(0)
  const [listData, setListData] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState({} as Pokemon)

  const setIndicatorLoading = (stateBool: boolean) => {
    setLoading(stateBool)
    setRefreshing(stateBool)
  }

  const initListData = async () => {
    await setListData([])
    await setOffset(0)
    await buildListData()
  }
  const buildListData = async () => {
    setIndicatorLoading(true)
    const response = await searchPokemon.getAllPokemon(offset, DEFAULT_PAGE_SIZE)
    listData.push(...response)
    setListData(listData)
    setOffset(offset + 1)
    setIndicatorLoading(false)
  }

  const searchPokemonByKeyword = async (keyword: string) => {
    setListData([])
    setOffset(0)
    setIndicatorLoading(true)
    const response = await searchPokemon.searchPokemon(keyword)
    listData.push(...response)
    setIndicatorLoading(false)
  }

  const onRefresh = useCallback(() => {
    initListData()
  }, [])

  return {
    listData,
    buildListData,
    searchPokemonByKeyword,
    initListData,
    loading,
    refreshing,
    setRefreshing,
    onRefresh,
  }
}

export default DetailViewModel
