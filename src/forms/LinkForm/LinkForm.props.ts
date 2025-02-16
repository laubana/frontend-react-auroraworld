import { Category } from "../../types/Category";

export interface LinkFormProps {
  mode?: "create" | "update";
  linkId?: string;
  categories: Category[];
  categoryId?: string;
  name?: string;
  url?: string;
}
