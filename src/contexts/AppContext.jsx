import { API } from "@/config";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider.");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedChatData, setSelectedChatData] = useState({});
  // allowed selected chat type only [user || group]
  const [selectedChatType, setSelectedChatType] = useState("");
  const token = localStorage.getItem("communex-auth-token");

  const handleGetUser = useCallback(async () => {
    try {
      const response = await API.get("/user/me");
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch user. Please try again."
      );
    }
  }, []);

  const handleGetUsers = useCallback(async () => {
    try {
      const response = await API.get("/user/users");
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch users. Please try again."
      );
    }
  }, []);

  const handleGetUserGroups = useCallback(async () => {
    try {
      const response = await API.get("/group/getUserGroups");
      if (response.status === 200) {
        setGroups(response.data.groups);
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch user groups. Please try again."
      );
    }
  }, []);

  useEffect(() => {
    if (token) {
      handleGetUser();
      handleGetUsers();
      handleGetUserGroups();
    }
  }, [handleGetUser, handleGetUserGroups, handleGetUsers, token]);

  const value = {
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
