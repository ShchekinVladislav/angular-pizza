export interface Pizza {
  name: string,
  description: string,
  priceAll: Price,
  priceActive: number,
  avatar: string,
  id: number
  bough: Bough[],
  size: Size[],
  display: boolean,
  filter: [],
  tag?: string
}

export interface Bough {
  name: string,
  value: string,
  active: boolean
}

export interface Size {
  name: string,
  value: number,
  active: boolean
}

export interface Price {
  small: PriceBough[],
  big: PriceBough[],
}

export interface PriceBough {
  value: number,
  price: number
}

