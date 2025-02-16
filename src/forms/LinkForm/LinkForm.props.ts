import { Category } from "../../types/Category";

export interface LinkFormProps {
  mode?: "create" | "update";
  linkId?: string;
  category?: string;
  categories?: Category[];
  name?: string;
  url?: string;
}
