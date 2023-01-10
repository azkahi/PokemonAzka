import { useState, useEffect } from 'react'
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { SearchBar } from '@rneui/themed'

import { useTheme } from '../../hooks'

import { PokemonCard } from '../../components/PokemonCard'

import ViewModel from './HomeViewModel'

export const DetailScreen = (): JSX.Element => {
  const {
    buildListData,
    searchPokemonByKeyword,
    listData,
    initListData,
    loading,
    refreshing,
    onRefresh,
  } = ViewModel()

  const { s } = useTheme()

  const renderItem = ({ item }) => {
    return <PokemonCard pokemon={item} />
  }

  const [keyword, setKeyword] = useState('')

  const updateKeyword = (search: string) => {
    setKeyword(search)
  }

  useEffect(() => {
    initListData()
  }, [])

  return (
    <View style={[s.flex1]}>
      <SearchBar
        placeholder="Search Pokemon Here..."
        onChangeText={updateKeyword}
        value={keyword}
      />
      {loading ? (
        <View style={[s.flex1, s.justifyCenter, s.alignCenter]}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          horizontal={false}
          numColumns={3}
          data={listData}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      )}
    </View>
  )
}
