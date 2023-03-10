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
import { SearchBar, Button } from '@rneui/themed'

import { useTheme } from '../../hooks'

import { PokemonCard } from '../../components/PokemonCard'

import ViewModel from './HomeViewModel'

export const HomeScreen = (): JSX.Element => {
  const {
    buildListData,
    searchPokemonByKeyword,
    listData,
    initListData,
    loading,
    refreshing,
    onRefresh,
    selectPokemon,
    selectedOne
  } = ViewModel()

  const { s } = useTheme()

  const renderItem = ({ item }) => {
    return (
      <PokemonCard pokemon={item.pokemon} selected={item.selected} selectPokemon={selectPokemon} />
    )
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
        inputContainerStyle={styles.searchBarInputContainer}
        containerStyle={styles.searchBarContainer}
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
          onEndReached={buildListData()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={renderItem}
          keyExtractor={(item) => item.pokemon.name}
        />
      )}
      {selectedOne ? (
        <Button
          title={'I choose you!'}
          buttonStyle={{
            backgroundColor: '#FFCC00',
            borderRadius: 3,
          }}
          containerStyle={{
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  searchBarInputContainer: {
    backgroundColor: '#FFCC00',
  },
  searchBarContainer: {
    backgroundColor: '#0075BE',
  },
})
