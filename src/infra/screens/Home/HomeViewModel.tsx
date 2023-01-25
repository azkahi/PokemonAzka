import { CommonActions } from '@react-navigation/native'
import { useState, useCallback } from 'react'
import { useRecoilState } from 'recoil'

import Pokemon from '../../../core/entity/Pokemon'
import SearchPokemon from '../../../core/usecase/SearchPokemon'
import { pokemonState } from '../../atoms/PokemonState'
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
  const [selectedPokemon, setSelectedPokemon] = useState({} as Pokemon)
  const [keyword, setKeyword] = useState('')
  const [finalSelectedPokemon, setFinalSelectedPokemon] = useRecoilState(pokemonState)

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
          if (element.selected) {
            setSelectedPokemon(pokemon)
          } else {
            setSelectedPokemon({} as Pokemon)
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
    setKeyword(keyword)
    listData.length = 0
    setListData([])
    setOffset(0)
    setIndicatorLoading(true)
    if (!keyword) {
      buildListData()
    } else {
      const response = await searchPokemon.searchPokemon(keyword)
      response.forEach((element) => {
        listData.push({ pokemon: element, selected: false })
      })
      setListData(listData)
    }
    setIndicatorLoading(false)
  }

  const onRefresh = useCallback(() => {
    initListData()
  }, [])

  const choosePokemon = async (pokemon: Pokemon, navigation: any) => {
    setFinalSelectedPokemon(pokemon)
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routeNames: ['Pokemon Detail'],
        routes: [{ name: 'Pokemon Detail' }],
      })
    )
  }

  const checkPokemonState = async (navigation: any) => {
    const pokemonActive = finalSelectedPokemon

    if (pokemonActive.name === undefined) {
      return
    }

    if (pokemonActive.name !== '') {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routeNames: ['Pokemon Detail'],
          routes: [{ name: 'Pokemon Detail' }],
        })
      )
    }
  }

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
    selectedPokemon,
    choosePokemon,
    keyword,
    setKeyword,
    checkPokemonState,
  }
}

export default HomeViewModel
