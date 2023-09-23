import { QueryDocumentSnapshot } from 'firebase/firestore';
import { SORT_OPTIONS } from '../constants/sort';

export interface Category {
  name: string;
  description: string;
  related: Category[];
  products: Product[];
  filters: Filter[];
}

export interface Filter {
  name: string;
  options: string[];
}

export interface ProductBase {
  id: string;
  name: string;
  type: string;
  price: string;
  sizes: Size[];
  images: string[];
}

export interface Product extends ProductBase {
  description: string;
  currency: string;
  category: string;
  details: Details;
  related: Product[];
  style_with: Product[];
  variants: Variant[];
}

export interface Size {
  value: string;
  quantity: number;
}

export interface Details {
  fit: string;
  fabric: string;
  inspiration: string;
}

export interface Variant {
  image: string;
  id: string;
}

export interface PaginationState<Type> {
  data: Type[];
  hasMore: boolean;
  cursor: QueryDocumentSnapshot<Type> | null;
}

export interface PaginationFirstState<Type> {
  data: Type[];
  hasMore: boolean;
  cursor: QueryDocumentSnapshot<Type> | null;
  sort: keyof typeof SORT_OPTIONS | null;
}

export interface HomeSubHero {
  id: string;
  imgs: Array<string>;
  title: string;
}

export interface HomeSection {
  id: string;
  img: string;
  title: string;
  description: string;
}

export interface HomeData {
  subHeroData: Array<HomeSubHero>;
  sectionsData: Array<HomeSection>;
}
