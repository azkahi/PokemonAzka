export default class RequestAPIHelper {
  static GetRequest = async (url: any) => {
    const response = await fetch(url, {
      method: 'GET',
    })

    if (response.status === 200) return response.json()

    return null
  }
}
