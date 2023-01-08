import BerryRepository from '../../../src/core/repository/BerryRepository'
import BerryRepositoryInMemory from './BerryRepositoryInMemory'

describe('Berry Repository', () => {
  let berryRepo: BerryRepository

  beforeEach(async () => {
    berryRepo = new BerryRepositoryInMemory()
  })

  test('Should return available berries from in memory', async function () {
    const berries = await berryRepo.getListOfBerries()
    expect(berries).toHaveLength(3)
  })
})
