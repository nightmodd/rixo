import { QueryDocumentSnapshot } from 'firebase/firestore';

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
  name: string;
  id: string;
}

export interface PaginationState<Type> {
  data: Type[];
  hasMore: boolean;
  cursor: QueryDocumentSnapshot<Type> | null;
}
