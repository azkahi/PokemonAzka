import { CommonActions } from '@react-navigation/native'
import { useState, useCallback } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

import Berry from '../../../core/entity/Berry'
import Pokemon, { Stats } from '../../../core/entity/Pokemon'
import EvolvePokemon from '../../../core/usecase/EvolvePokemon'
import FeedPokemon from '../../../core/usecase/FeedPokemon'
import SearchPokemon from '../../../core/usecase/SearchPokemon'
import { pokemonState } from '../../atoms/PokemonState'
import { DEFAULT_PAGE_SIZE } from '../../constants'
import BerryRepositoryInfra from '../../repository/BerryRepositoryInfra'
import PokemonRepositoryInfra from '../../repository/PokemonRepositoryInfra'

interface BerryDecorator {
  berry: Berry
  selected: boolean
}

const DetailViewModel = () => {
  const pokemonRepo: PokemonRepositoryInfra = new PokemonRepositoryInfra()
  const berryRepo: BerryRepositoryInfra = new BerryRepositoryInfra()
  const evolvePokemon: EvolvePokemon = new EvolvePokemon(pokemonRepo)
  const feedPokemon: FeedPokemon = new FeedPokemon(pokemonRepo, berryRepo)
  const searchPokemon: SearchPokemon = new SearchPokemon(pokemonRepo)

  const [selectedPokemon, setSelectedPokemon] = useRecoilState(pokemonState)

  const [offset, setOffset] = useState(0)
  const [listData, setListData] = useState<BerryDecorator[]>([])
  const [selectedBerry, setSelectedBerry] = useState({} as Berry)
  const [canEvolve, setCanEvolve] = useState(false)
  const [loading, setLoading] = useState(false)

  const initListData = async () => {
    setLoading(true)
    checkCanEvolve()
    await setListData([])
    await setOffset(0)
    await buildListData()
  }

  const buildListData = async () => {
    const response = await feedPokemon.getAllBerries(offset, DEFAULT_PAGE_SIZE)
    response.forEach((element) => {
      listData.push({ berry: element, selected: false })
    })
    setListData(listData)
    setOffset(offset + DEFAULT_PAGE_SIZE)
    setLoading(false)
  }

  const deletePokemon = (navigation: any) => {
    // Initiate empty class pokemon
    const sprites = selectedPokemon.sprites
    const stats: Stats[] = []
    const berry = new Berry('', 'others', 'sprite_url')
    const newPokemon = new Pokemon('', -1, sprites, stats, berry)

    setSelectedPokemon(newPokemon)

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routeNames: ['Pokemon List'],
        routes: [{ name: 'Pokemon List' }],
      })
    )
  }

  const selectBerry = (berry: Berry) => {
    setListData(
      listData.map((element) => {
        if (element.berry.name === berry.name) {
          element.selected = !element.selected
          if (element.selected) {
            setSelectedBerry(berry)
          } else {
            setSelectedBerry({} as Berry)
          }
        } else {
          element.selected = false
        }

        return element
      })
    )
  }

  const feedThePokemon = async (berry: Berry) => {
    // Workaround since atom cant save class, we need to initiate class with its functions as new object
    const clonePokemon = new Pokemon(
      selectedPokemon.name,
      selectedPokemon.weight,
      selectedPokemon.sprites,
      selectedPokemon.stats,
      selectedPokemon.prevBerry
    )

    const response = await feedPokemon.execute(berry, clonePokemon)

    if (response) {
      await setSelectedPokemon(clonePokemon)
      await checkCanEvolve()
    }
  }

  const checkCanEvolve = async () => {
    const response = await evolvePokemon.willEvolveTo(selectedPokemon)

    if (response.weight <= selectedPokemon.weight) {
      setCanEvolve(true)
    } else {
      setCanEvolve(false)
    }
  }

  const evolveThePokemon = async () => {
    // Workaround since atom cant save class, we need to initiate class with its functions as new object
    const clonePokemon = new Pokemon(
      selectedPokemon.name,
      selectedPokemon.weight,
      selectedPokemon.sprites,
      selectedPokemon.stats,
      selectedPokemon.prevBerry
    )

    const response = await evolvePokemon.evolve(clonePokemon)

    if (response) {
      setSelectedPokemon(clonePokemon)
      setCanEvolve(false)
      checkCanEvolve()
    }
  }

  return {
    selectedPokemon,
    loading,
    deletePokemon,
    initListData,
    buildListData,
    listData,
    selectBerry,
    selectedBerry,
    feedThePokemon,
    canEvolve,
    evolveThePokemon,
  }
}

export default DetailViewModel
