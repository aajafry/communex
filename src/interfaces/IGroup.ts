import { IMessage, IUser } from "./index";

export interface IGroup {
  name: string;
  members: Partial<IUser[]>;
  messages: Partial<IMessage[]>;
  _id?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
