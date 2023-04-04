import { createContext, useContext, useState } from "react";

import { MessageType, OptionsType } from "@/types/chatgpt";

const defaultMessages: MessageType[] = [];
const defaultOptions: OptionsType = { model: "gpt-3.5-turbo", temperature: 0.7, top_p: 0.9, max_tokens: 2048 };

type ChatGPTStatusType = "idle" | "thinking" | "error";

interface ChatContextProps {
  apiToken: string;
  options: OptionsType;
  messages: MessageType[];
  chatgptStatus: ChatGPTStatusType;
  setOptions: (options: OptionsType) => void;
  setAndStoreApiToken: (value: string) => void;
  setMessages: (messages: MessageType[]) => void;
  setChatgptStatus: (status: ChatGPTStatusType) => void;
}

const ChatContext = createContext<ChatContextProps>({
  apiToken: "",
  chatgptStatus: "idle",
  options: defaultOptions,
  messages: defaultMessages,
  setOptions: (options: OptionsType) => {},
  setAndStoreApiToken: (value: string) => {},
  setMessages: (messages: MessageType[]) => {},
  setChatgptStatus: (status: ChatGPTStatusType) => {},
});

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState(defaultMessages);
  const [options, setOptions] = useState<OptionsType>(defaultOptions);
  const [chatgptStatus, setChatgptStatus] = useState<ChatGPTStatusType>("idle");
  const [apiToken, setApiToken] = useState(atob(localStorage.getItem("apiToken") || ""));

  function setAndStoreApiToken(token: string) {
    setApiToken(token);
    localStorage.setItem("apiToken", btoa(token));
  }

  return (
    <ChatContext.Provider
      value={{
        apiToken,
        options,
        messages,
        setOptions,
        setMessages,
        chatgptStatus,
        setChatgptStatus,
        setAndStoreApiToken,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
