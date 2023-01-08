import Berry from '../../../src/core/entity/Berry'
import BerryRepository from '../../../src/core/repository/BerryRepository'

export default class PokemonRepositoryInMemory implements BerryRepository {
  private berries: Berry[] = [
    new Berry('Test Berry 1', 'hard', ''),
    new Berry('Test Berry 2', 'soft', ''),
    new Berry('Test Berry 3', 'others', ''),
  ]

  getListOfBerries(): Promise<Berry[]> {
    return Promise.resolve(this.berries)
  }
}