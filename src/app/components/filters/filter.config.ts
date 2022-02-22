export interface FilterConfig {
  name: string,
  value: string,
  active: boolean
}
export const filterAll: FilterConfig[] = [
    {name: 'Все', value: 'all', active: true},
    {name: 'Мясные', value: 'meat', active: false},
    {name: 'Вегетарианская', value: 'vegan', active: false},
    {name: 'Гриль', value: 'grill', active: false},
    {name: 'Острые', value: 'sharpness', active: false},
  ];


