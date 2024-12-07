import { socket } from "@/config";
import {
  useState,
  useCallback,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import { useApp } from "./index.js";

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider.");
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const typingTimeouts = useRef({});
  const { user } = useApp();

  const handleConnect = useCallback(() => {
    if (!user) return;
    console.log(`Connected to socket server user: ${user?.name}`);
  }, [user]);

  const handleDisconnect = useCallback(
    (reason) => {
      if (!user) return;
      console.log(
        `Disconnected from server user: ${user?.name} due to reason: ${reason}`
      );
    },
    [user]
  );

  const handleError = useCallback((error) => {
    console.log("socket error: ", error);
    socket.disconnect();
  }, []);

  const handleReceiveDirectMessage = useCallback((data) => {
    setChatMessages((prevMessages) => [...prevMessages, data]);
  }, []);

  const handleReceiveDirectTyping = useCallback(
    (sender) => {
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

  const handleReceiveGroupMessage = useCallback((data) => {
    setChatMessages((prevMessages) => [...prevMessages, data]);
  }, []);

  const handleReceiveGroupTyping = useCallback(
    (sender) => {
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
    if (Object.keys(user).length) {
      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);
      socket.on("connect_error", handleError);
      socket.on("receiveDirectMessage", handleReceiveDirectMessage);
      socket.on("receiveDirectTyping", handleReceiveDirectTyping);
      socket.on("receiveGroupMessage", handleReceiveGroupMessage);
      socket.on("receiveGroupTyping", handleReceiveGroupTyping);

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
        socket.off("connect_error", handleError);
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
    if (Object.keys(user).length) {
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [user]);

  const handleSendDirectMessage = (message) => {
    socket.emit("sendDirectMessage", message, (response) => {
      console.log(response.status, response?.message);
    });
  };

  const handleSendDirectTyping = (typing) => {
    socket.emit("sendDirectTyping", typing);
  };

  const handleSendGroupMessage = (message) => {
    socket.emit("sendGroupMessage", message, (response) => {
      console.log(response.status, response?.message);
    });
  };

  const handleSendGroupTyping = (typing) => {
    socket.emit("sendGroupTyping", typing);
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
