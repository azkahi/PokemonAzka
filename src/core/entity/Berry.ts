export default class Berry {
  name: string
  berryType: BerryType
  weight: number

  constructor(name: string, berryType: string) {
    this.name = name
    this.berryType = berryType as unknown as BerryType
    this.weightInKg =
      BerryTypeWeightInKg[
        Object.keys(BerryType)[
          Object.values(BerryType).indexOf(this.berryType)
        ] as keyof typeof BerryTypeWeightInKg
      ]
  }
}

export enum BerryType {
  VerySoft = 'very-soft',
  Soft = 'soft',
  Hard = 'hard',
  VeryHard = 'very-hard',
  SuperHard = 'super-hard',
  Others = 'others',
}

export enum BerryTypeWeightInKg {
  VerySoft = 2,
  Soft = 3,
  Hard = 5,
  VeryHard = 8,
  SuperHard = 10,
  Others = 1,
}
