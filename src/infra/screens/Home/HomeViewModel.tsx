import { useState, useCallback } from 'react'

import Pokemon from '../../../core/entity/Pokemon'
import SearchPokemon from '../../../core/usecase/SearchPokemon'
import { DEFAULT_PAGE_SIZE } from '../../constants'
import PokemonRepositoryInfra from '../../repository/PokemonRepositoryInfra'

export interface PokemonDecorator {
  pokemon: Pokemon
  selected: boolean
}

const HomeViewModel = () => {
  const pokemonRepo: PokemonRepositoryInfra = new PokemonRepositoryInfra()
  const searchPokemon: SearchPokemon = new SearchPokemon(pokemonRepo)

  const [offset, setOffset] = useState(0)
  const [listData, setListData] = useState<PokemonDecorator[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedOne, setSelectedOne] = useState(false)
  let selectedPokemon: Pokemon = {} as Pokemon

  const setIndicatorLoading = (stateBool: boolean) => {
    setLoading(stateBool)
    setRefreshing(stateBool)
  }

  const initListData = async () => {
    setIndicatorLoading(true)
    await setListData([])
    await setOffset(0)
    await buildListData()
  }

  const selectPokemon = (pokemon: Pokemon) => {
    setListData(
      listData.map((element) => {
        if (element.pokemon.name === pokemon.name) {
          element.selected = !element.selected
          setSelectedOne(element.selected)
          if (element.selected) {
            selectedPokemon = pokemon
          } else {
            selectedPokemon = {} as Pokemon
          }
        } else {
          element.selected = false
        }

        return element
      })
    )
  }

  const buildListData = async () => {
    const response = await searchPokemon.getAllPokemon(offset, DEFAULT_PAGE_SIZE)
    response.forEach((element) => {
      listData.push({ pokemon: element, selected: false })
    })
    setListData(listData)
    setOffset(offset + DEFAULT_PAGE_SIZE)
    setIndicatorLoading(false)
  }

  const searchPokemonByKeyword = async (keyword: string) => {
    setListData([])
    setOffset(0)
    setIndicatorLoading(true)
    const response = await searchPokemon.searchPokemon(keyword)
    // listData.push(...response)
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
    selectPokemon,
    selectedOne,
  }
}

export default HomeViewModel
