import { Category } from "../../types/Category";

export interface LinkCardOwnedProps {
  linkId: string;
  categories: Category[];
  categoryId: string;
  categoryName: string;
  name: string;
  url: string;
  own: true;
  writable?: boolean;
}

export interface LinkCardUnwritableProps {
  linkId: string;
  categories?: never;
  categoryId: string;
  categoryName: string;
  name: string;
  url: string;
  own?: false;
  writable?: false;
}

export interface LinkCardWritableProps {
  linkId: string;
  categories: Category[];
  categoryId: string;
  categoryName: string;
  name: string;
  url: string;
  own?: false;
  writable: true;
}
