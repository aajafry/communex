import { API } from "@/config";
import { IGroup, IUser } from "@/interfaces";
import { getAccessToken, handleError } from "@/utilities";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

interface AppContextType {
  user: IUser | null;
  users: IUser[];
  groups: IGroup[];
  selectedChatData: IUser | IGroup | null;
  selectedChatType: "user" | "group" | "";
  setUser: (user: IUser) => void;
  setUsers: (users: IUser[]) => void;
  setGroups: (groups: IGroup[]) => void;
  setSelectedChatData: (data: IUser | IGroup) => void;
  setSelectedChatType: (type: "user" | "group" | "") => void;
}

type getUserResponse = {
  message: string;
  user: IUser;
};

type getUsersResponse = {
  message: string;
  users: IUser[];
};

type getGroupsResponse = {
  message: string;
  groups: IGroup[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider.");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedChatData, setSelectedChatData] = useState<
    IUser | IGroup | null
  >(null);
  // allowed selected chat type only [user || group]
  const [selectedChatType, setSelectedChatType] = useState<
    "user" | "group" | ""
  >("");

  const accessToken = getAccessToken();

  const handleGetUser = useCallback(async () => {
    try {
      const { data } = await API.get<getUserResponse>("/user/me");
      setUser(data.user);
    } catch (error: unknown) {
      toast.error(
        handleError(error, "Failed to fetch user. Please try again.")
      );
    }
  }, []);

  const handleGetUsers = useCallback(async () => {
    try {
      const { data } = await API.get<getUsersResponse>("/user/users");
      setUsers(data.users);
    } catch (error: unknown) {
      toast.error(
        handleError(error, "Failed to fetch users. Please try again.")
      );
    }
  }, []);

  const handleGetUserGroups = useCallback(async () => {
    try {
      const { data } = await API.get<getGroupsResponse>("/group/getUserGroups");
      setGroups(data.groups);
    } catch (error: unknown) {
      console.error(
        handleError(error, "Failed to fetch user groups. Please try again.")
      );
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      handleGetUser();
      handleGetUsers();
      handleGetUserGroups();
    }
  }, [handleGetUser, handleGetUserGroups, handleGetUsers, accessToken]);

  const value = useMemo(
    () => ({
      user,
      users,
      groups,
      selectedChatData,
      selectedChatType,
      setUser,
      setUsers,
      setGroups,
      setSelectedChatData,
      setSelectedChatType,
    }),
    [user, users, groups, selectedChatData, selectedChatType]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
