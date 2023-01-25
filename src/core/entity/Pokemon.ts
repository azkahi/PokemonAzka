import Berry, { BerryType } from './Berry'

export default class Pokemon {
  name: string
  sprites: string[]
  weight: number
  stats: Stats[]
  prevBerry?: Berry

  public constructor(name: string, weight: number, sprites: string[], stats: Stats[], prevBerry?: Berry) {
    this.name = name
    this.weight = weight
    this.sprites = sprites
    this.stats = stats
    this.prevBerry = prevBerry
  }

  public checkBerryOkay(berry: Berry): boolean {
    return (
      this.prevBerry?.berryType !== berry.berryType ||
      this.prevBerry === undefined ||
      this.prevBerry?.berryType === BerryType.Others
    )
  }

  public changePokemonWeight(weight: number): void {
    this.weight = this.weight + weight

    if (this.weight <= 0) {
      this.weight = 1
    }
  }

  public eatBerry(berry: Berry): void {
    this.prevBerry = berry
  }

  // Prototype design pattern
  private clone(pokemon: Pokemon): void {
    this.name = pokemon.name
    this.weight = pokemon.weight
    this.sprites = pokemon.sprites
    this.stats = pokemon.stats
    this.prevBerry = pokemon.prevBerry
  }

  public evolveTo(pokemon: Pokemon): void {
    this.clone(pokemon)
  }
}

export interface Stats {
  label: string
  base: number
}
