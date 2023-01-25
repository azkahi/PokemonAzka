import Constants from 'expo-constants'

import Berry from '../../core/entity/Berry'
import BerryRepository from '../../core/repository/BerryRepository'
import RequestAPIHelper from '../utils/requestAPIHelper'

const baseUrl = Constants.expoConfig.extra.baseUrl

export default class BerryRepositoryInfra implements BerryRepository {
  async getListOfBerries(offset: number, limit: number): Promise<Berry[]> {
    const response = await RequestAPIHelper.GetRequest(
      `${baseUrl}/berry?offset=${offset}&limit=${limit}`
    )

    const berries: Berry[] = []

    await Promise.all(
      response.results.map(async (element: any) => {
        const responseBerry = await RequestAPIHelper.GetRequest(element.url)

        const defaultSprite = await RequestAPIHelper.GetRequest(responseBerry.item.url)

        const berry = new Berry(
          responseBerry.name,
          responseBerry.firmness.name,
          defaultSprite.sprites.default
        )

        berries.push(berry)
      })
    )

    return berries
  }
}
