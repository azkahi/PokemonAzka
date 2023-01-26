import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    extra: {
      eas: {
        projectId: '1448cbe6-2fa9-48fe-a042-44e17e88c6e0',
      },
      baseUrl: 'https://pokeapi.co/api/v2',
      universalLinks: [],
    },
  }
}
