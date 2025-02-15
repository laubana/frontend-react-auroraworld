import { User } from "../../types/User";

export interface LinkCardProps {
  linkId: string;
  category: string;
  name: string;
  url: string;
  users: User[];
}
