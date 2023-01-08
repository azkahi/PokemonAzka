import Berry from '../entity/Berry'

export default interface BerryRepository {
  getListOfBerries(): Promise<Berry[]>
}
