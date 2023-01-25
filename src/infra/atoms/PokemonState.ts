import { atom } from 'recoil'

import Pokemon from '../../core/entity/Pokemon'
import persistAtom from '../utils/persistAtoms'

export const pokemonState = atom({
  key: 'pokemonState',
  default: {} as Pokemon,
  effects_UNSTABLE: [persistAtom('pokemonState')],
})
