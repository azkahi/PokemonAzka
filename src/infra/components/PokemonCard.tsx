import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'

import { Parallelogram } from './shapes/Parallelogram'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const PokemonIcon = ({ uri }) => (
  <View style={styles.iconPokemonContainer}>
    <Image source={{ uri }} style={styles.iconPokemon} />
  </View>
)

export const PokemonCard = ({ pokemon, selected, selectPokemon }) => (
  <TouchableOpacity style={[selected ? styles.selectedCardPokemon : null]} onPress={() => selectPokemon(pokemon)}>
    <Parallelogram style={styles.cardPokemon}>
      <PokemonIcon uri={pokemon.sprites[0]} />
      <View style={styles.textContainer}>
        <Text style={styles.textPokemon}>{pokemon.name}</Text>
      </View>
    </Parallelogram>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  cardPokemon: {
    backgroundColor: 'white',
    margin: 30,
  },
  selectedCardPokemon: {
    backgroundColor: '#0A285F',
  },
  iconPokemon: {
    width: 40,
    height: 40,
  },
  iconPokemonContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#0A285F',
    margin: 10,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPokemon: {
    color: '#0A285F',
    textAlign: 'center',
    fontSize: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
