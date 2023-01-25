import { useEffect } from 'react'
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import { Button } from '@rneui/themed'

import { useTheme } from '../../hooks'
import ViewModel from './DetailViewModel'

const windowWidth = Dimensions.get('window').width

export const DetailScreen = ({ navigation }): JSX.Element => {
  const {
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
    evolveThePokemon
  } = ViewModel()

  const { s } = useTheme()

  const renderStats = ({ item }) => {
    return (
      <View style={styles.pokemonStatsContainer}>
        <Text style={styles.pokemonStats}>
          {item.label}: {item.base}
        </Text>
      </View>
    )
  }

  const renderBerries = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => selectBerry(item.berry)}
        style={[styles.berryContainer, item.selected ? styles.selectedBerryContainer : null]}
      >
        <Image source={{ uri: item.berry.defaultSprite }} style={styles.berryImage} />
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    initListData()
  }, [])

  return (
    <View style={[s.flex1, styles.container]}>
      <Button
        title={'Delete Pokemon'}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainerStyle}
        onPress={() => deletePokemon(navigation)}
      />
      {loading ? (
        <View style={[s.flex1, s.justifyCenter, s.alignCenter]}>
          <ActivityIndicator />
        </View>
      ) : null}
      <View style={styles.pokemonTitleContainer}>
        <Text style={styles.pokemonTitle}>{selectedPokemon.name}</Text>
      </View>
      <View style={styles.pokemonImageContainer}>
        <Image source={{ uri: selectedPokemon.sprites[0] }} style={styles.pokemonImage} />
      </View>

      {canEvolve ? (
        <Button
          title={'Evolve Pokemon'}
          buttonStyle={styles.buttonStyle}
          containerStyle={[styles.buttonContainerStyle, styles.bottomButtonContainer]}
          onPress={() => evolveThePokemon()}
        />
      ) : null}

      <View style={styles.pokemonWeightContainer}>
        <Text style={styles.pokemonWeight}>weight: {selectedPokemon.weight}</Text>
      </View>
      <FlatList
        horizontal={false}
        numColumns={1}
        style={styles.listContainer}
        data={selectedPokemon.stats}
        renderItem={renderStats}
        keyExtractor={(item: any) => item.label}
      />
      <FlatList
        horizontal={true}
        style={styles.berryListContainer}
        data={listData}
        renderItem={renderBerries}
        keyExtractor={(item: any) => item.berry.name}
      />
      {selectedBerry.name !== undefined ? (
        <Button
          title={'Feed Pokemon'}
          buttonStyle={styles.buttonStyle}
          containerStyle={[styles.buttonContainerStyle, styles.bottomButtonContainer]}
          onPress={() => feedThePokemon(selectedBerry)}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  pokemonTitleContainer: {
    marginTop: 30,
  },
  pokemonTitle: {
    fontSize: 20,
  },
  pokemonImageContainer: {
    marginTop: 30,
  },
  pokemonImage: {
    width: 120,
    height: 120,
  },
  berryImage: {
    width: 60,
    height: 60,
  },
  listContainer: {
    marginTop: 30,
    flexGrow: 0
  },
  berryListContainer: {
    marginTop: 30,
    flexGrow: 0
  },
  pokemonWeightContainer: {
    marginTop: 5,
  },
  pokemonWeight: {
    fontSize: 20,
    color: 'black',
  },
  pokemonStatsContainer: {
    marginTop: 2,
  },
  pokemonStats: {
    fontSize: 15,
    color: 'black',
  },
  buttonStyle: {
    backgroundColor: 'red',
    borderRadius: 120,
  },
  buttonContainerStyle: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  selectedBerryContainer: {
    backgroundColor: '#0A285F',
  },
  berryContainer: {},
  bottomButtonContainer: {
    marginTop: 10
  }
})
