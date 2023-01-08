import Berry from "./Berry"

export default class Pokemon {
  name: string
  sprites: string[]
  weight: number
  stats: Stats[]
  prevBerry?: Berry

  constructor(name: string, weight: number, sprites: string[], stats: Stats[], prevBerry?: Berry) {
    this.name = name
    this.weight = weight
    this.sprites = sprites
    this.stats = stats
    this.prevBerry = prevBerry
  }
}

export interface Stats {
  label: string
  base: number
}
