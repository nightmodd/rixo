//checl for as const in the end
export const SORT_OPTIONS = {
  lowToHigh: ['price', 'asc'],
  highToLow: ['price', 'desc'],
  'A-Z': ['name', 'asc'],
  'Z-A': ['name', 'desc'],
  default: ['id', 'asc'],
} as const;

export const SORT_LABELS = {
  lowToHigh: 'Price: Low to High',
  highToLow: 'Price: High to Low',
  'A-Z': 'Name: A-Z',
  'Z-A': 'Name: Z-A',
  default: 'Sort By',
} as const;
