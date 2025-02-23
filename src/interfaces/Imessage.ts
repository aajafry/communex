import { IUser } from "./index";

export interface IMessage {
  sender: Partial<IUser>;
  recipient: Partial<IUser>;
  contentType: "text" | "file";
  content?: string;
  isRead: boolean;
  attachmentUrl?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
