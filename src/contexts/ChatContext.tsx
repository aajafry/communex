import { socket } from "@/config";
import {
  useState,
  useCallback,
  useEffect,
  useContext,
  createContext,
  useRef,
  ReactNode,
} from "react";
import { useApp } from "./index";
import { IGroup, IMessage, IUser } from "@/interfaces";

interface ChatContextType {
  typingUser: IUser["name"] | null;
  chatMessages: IMessage[];
  setChatMessages: (messages: IMessage[]) => void;
  handleSendDirectMessage: ({
    sender,
    recipient,
    content,
  }: {
    sender: IUser["_id"];
    recipient: IUser["_id"] | IGroup["_id"];
    content: string;
  }) => void;
  handleSendDirectTyping: ({
    sender,
    recipient,
  }: {
    sender: IUser["name"];
    recipient: IUser["_id"];
  }) => void;
  handleSendGroupMessage: ({
    sender,
    groupId,
    content,
  }: {
    sender: IUser["_id"];
    groupId: IGroup["_id"];
    content: string;
  }) => void;
  handleSendGroupTyping: ({
    sender,
    groupId,
  }: {
    sender: IUser["name"];
    groupId: IGroup["_id"];
  }) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider.");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [typingUser, setTypingUser] = useState<IUser["name"] | null>(null);
  const typingTimeouts = useRef<Record<string, NodeJS.Timeout>>({});
  const { user } = useApp();

  const handleConnect = useCallback(() => {
    if (!user) return;
    console.log(`Connected to socket server user: ${user.name}`);
  }, [user]);

  const handleDisconnect = useCallback(
    (reason: string) => {
      if (!user) return;
      console.log(
        `Disconnected from server user: ${user.name} due to reason: ${reason}`
      );
    },
    [user]
  );

  const handleError = useCallback((error: string) => {
    console.log("socket error: ", error);
    socket.disconnect();
  }, []);

  const handleReceiveDirectMessage = useCallback((data: IMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, data]);
  }, []);

  const handleReceiveDirectTyping = useCallback(
    (sender: IUser["name"]) => {
      if (sender !== user?.name) {
        setTypingUser(sender);
        if (typingTimeouts.current[sender]) {
          clearTimeout(typingTimeouts.current[sender]);
        }

        typingTimeouts.current[sender] = setTimeout(() => {
          setTypingUser(null);
          delete typingTimeouts.current[sender];
        }, 3000);
      }
    },
    [user?.name]
  );

  const handleReceiveGroupMessage = useCallback((data: IMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, data]);
  }, []);

  const handleReceiveGroupTyping = useCallback(
    (sender: IUser["name"]) => {
      if (sender !== user?.name) {
        setTypingUser(sender);
        if (typingTimeouts.current[sender]) {
          clearTimeout(typingTimeouts.current[sender]);
        }

        typingTimeouts.current[sender] = setTimeout(() => {
          setTypingUser(null);
          delete typingTimeouts.current[sender];
        }, 3000);
      }
    },
    [user?.name]
  );

  useEffect(() => {
    if (user && Object.keys(user).length) {
      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);
      socket.on("connect_error", (err: Error) => handleError(err.message));
      socket.on("receiveDirectMessage", handleReceiveDirectMessage);
      socket.on("receiveDirectTyping", handleReceiveDirectTyping);
      socket.on("receiveGroupMessage", handleReceiveGroupMessage);
      socket.on("receiveGroupTyping", handleReceiveGroupTyping);

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
        socket.off("connect_error", (err: Error) => handleError(err.message));
        socket.off("receiveDirectMessage", handleReceiveDirectMessage);
        socket.off("receiveDirectTyping", handleReceiveDirectTyping);
        socket.off("receiveGroupMessage", handleReceiveGroupMessage);
        socket.off("receiveGroupTyping", handleReceiveGroupTyping);

        const currentTimeouts = typingTimeouts.current;
        Object.values(currentTimeouts).forEach(clearTimeout);
        typingTimeouts.current = {};
      };
    }
  }, [
    user,
    handleConnect,
    handleDisconnect,
    handleError,
    handleReceiveDirectMessage,
    handleReceiveDirectTyping,
    handleReceiveGroupMessage,
    handleReceiveGroupTyping,
  ]);

  useEffect(() => {
    if (user && Object.keys(user).length) {
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [user]);

  const handleSendDirectMessage = ({
    sender,
    recipient,
    content,
  }: {
    sender: IUser["_id"];
    recipient: IUser["_id"];
    content: string;
  }) => {
    socket.emit(
      "sendDirectMessage",
      { sender, recipient, content },
      (response: { status: string; message: string }) => {
        console.log(response.status, response?.message);
      }
    );
  };

  const handleSendDirectTyping = ({
    sender,
    recipient,
  }: {
    sender: IUser["name"];
    recipient: IUser["_id"];
  }) => {
    socket.emit("sendDirectTyping", { sender, recipient });
  };

  const handleSendGroupMessage = ({
    sender,
    groupId,
    content,
  }: {
    sender: IUser["_id"];
    groupId: IGroup["_id"];
    content: string;
  }) => {
    socket.emit(
      "sendGroupMessage",
      {
        sender,
        groupId,
        content,
      },
      (response: { status: string; message: string }) => {
        console.log(response.status, response?.message);
      }
    );
  };

  const handleSendGroupTyping = ({
    sender,
    groupId,
  }: {
    sender: IUser["name"];
    groupId: IGroup["_id"];
  }) => {
    socket.emit("sendGroupTyping", { sender, groupId });
  };

  const value = {
    typingUser,
    chatMessages,
    setChatMessages,
    handleSendDirectMessage,
    handleSendDirectTyping,
    handleSendGroupMessage,
    handleSendGroupTyping,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
