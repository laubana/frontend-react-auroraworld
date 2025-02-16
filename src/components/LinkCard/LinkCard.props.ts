import { Category } from "../../types/Category";
import { User } from "../../types/User";

export interface LinkCardOwnedProps {
  linkId: string;
  categories: Category[];
  categoryId: string;
  categoryName: string;
  name: string;
  url: string;
  users: User[];
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
  users?: never;
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
  users?: never;
  own?: false;
  writable: true;
}
