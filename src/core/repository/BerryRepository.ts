import Berry from '../entity/Berry'

export default interface BerryRepository {
  getListOfBerries(offset: number, limit: number): Promise<Berry[]>
}
