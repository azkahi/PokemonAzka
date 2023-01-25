import { useState, useEffect } from 'react'
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native'
import { SearchBar, Button } from '@rneui/themed'

import { useTheme } from '../../hooks'

import { PokemonCard } from '../../components/PokemonCard'

import ViewModel from './HomeViewModel'

export const HomeScreen = ({ navigation }): JSX.Element => {
  const {
    buildListData,
    searchPokemonByKeyword,
    listData,
    initListData,
    loading,
    refreshing,
    onRefresh,
    selectPokemon,
    selectedPokemon,
    choosePokemon,
    keyword,
    setKeyword,
    checkPokemonState
  } = ViewModel()

  const { s } = useTheme()

  const renderItem = ({ item }) => {
    return (
      <PokemonCard pokemon={item.pokemon} selected={item.selected} selectPokemon={selectPokemon} />
    )
  }

  useEffect(() => {
    initListData()
    checkPokemonState(navigation)
  }, [])

  return (
    <View style={[s.flex1]}>
      <SearchBar
        placeholder="Search Pokemon Here..."
        onChangeText={searchPokemonByKeyword}
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
          onEndReached={() => buildListData()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={renderItem}
          keyExtractor={(item) => item.pokemon.name}
        />
      )}
      {selectedPokemon.name !== undefined ? (
        <Button
          title={'I choose you!'}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainerStyle}
          onPress={() => choosePokemon(selectedPokemon, navigation)}
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
  buttonStyle: {
    backgroundColor: '#FFCC00',
    borderRadius: 3,
  },
  buttonContainerStyle: {
    marginHorizontal: 10,
    marginVertical: 10,
  }
})
