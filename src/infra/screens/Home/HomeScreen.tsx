import { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SearchBar } from '@rneui/themed'

import { useTheme } from '../../hooks'

import ViewModel from './HomeViewModel'

const Item = ({ pokemon }) => (
  <View>
    <Text>{pokemon.name}</Text>
  </View>
)

export const HomeScreen = (): JSX.Element => {
  const { buildListData, searchPokemonByKeyword, listData, initListData } = ViewModel()

  const renderItem = ({ item }) => {
    return <Item pokemon={item} />
  }

  const [keyword, setKeyword] = useState('')

  const updateKeyword = (search: string) => {
    setKeyword(search)
  }

  useEffect(() => {
    initListData()
  }, [])

  const { s } = useTheme()

  return (
    <View style={[s.flex1]}>
      <SearchBar
        placeholder="Search Pokemon Here..."
        onChangeText={updateKeyword}
        value={keyword}
      />
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
