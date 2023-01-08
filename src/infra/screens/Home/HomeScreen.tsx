import { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SearchBar } from '@rneui/themed'

import { useTheme } from '../../hooks'

import ViewModel from './HomeViewModel'

const Item = ({ title }) => (
  <View>
    <Text style={{ color: 'black' }}>{title}</Text>
  </View>
)

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const { buildListData, searchPokemonByKeyword, listData, initListData } = ViewModel()

  const renderItem = ({ item }) => <Item title={item.name} />

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
      <Text>Test</Text>
    </View>
  )
}
