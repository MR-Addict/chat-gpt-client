"use client";

import { createContext, useContext, useState } from "react";
import { MessageType, Message, OptionsType } from "@/types/chatgpt";

const defaultMessages: MessageType[] = [];
const defaultOptions: OptionsType = { model: "gpt-3.5-turbo", temperature: 0.7, top_p: 0.9, max_tokens: 2048 };

interface ChatContextProps {
  apiToken: string;
  userInput: string;
  options: OptionsType;
  messages: MessageType[];
  chatgptStatus: "idle" | "thinking" | "error";
  resetMessages: () => void;
  regenerateResponse: () => void;
  setApiToken: (value: string) => void;
  setUserInput: (value: string) => void;
  setOptions: (options: OptionsType) => void;
  setMessages: (messages: MessageType[]) => void;
  generateResponse: (messages: MessageType[]) => void;
  setChatgptStatus: (status: "idle" | "thinking" | "error") => void;
}

const ChatContext = createContext<ChatContextProps>({
  apiToken: "",
  userInput: "",
  chatgptStatus: "idle",
  options: defaultOptions,
  messages: defaultMessages,
  resetMessages: () => {},
  regenerateResponse: () => {},
  setApiToken: (value: string) => {},
  setUserInput: (value: string) => {},
  setOptions: (options: OptionsType) => {},
  setMessages: (messages: MessageType[]) => {},
  generateResponse: (messages: MessageType[]) => {},
  setChatgptStatus: (status: "idle" | "thinking" | "error") => {},
});

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiToken, setApiToken] = useState("");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState(defaultMessages);
  const [options, setOptions] = useState<OptionsType>(defaultOptions);
  const [chatgptStatus, setChatgptStatus] = useState<"idle" | "thinking" | "error">("idle");

  function resetMessages() {
    setChatgptStatus("idle");
    setMessages(defaultMessages);
  }

  function regenerateResponse() {
    if (!messages.length) return;

    if ((messages[messages.length - 1].role = "assistant")) {
      const slicedMessages = messages.slice(0, -1);
      setMessages(slicedMessages);
      generateResponse(slicedMessages);
    } else {
      generateResponse(messages);
    }
  }

  function generateResponse(messages: MessageType[]) {
    if (!messages.length) return;
    setChatgptStatus("thinking");

    fetch("https://api.mraddict.one/openai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "UkZ9L4Fx6uzQnZTHCIB7T3BlbkFJQw6NKkNHYWrQciq9zM3p",
      },
      body: JSON.stringify({ ...options, messages }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.status) {
          console.error(result.message);
          setChatgptStatus("error");
        } else {
          const message = Message.parse(result.data.choices[0].message);
          setMessages([...messages, message]);
          setChatgptStatus("idle");
        }
      })
      .catch((error) => {
        console.error(error);
        setChatgptStatus("error");
      });
  }

  return (
    <ChatContext.Provider
      value={{
        apiToken,
        options,
        messages,
        userInput,
        setOptions,
        setApiToken,
        setUserInput,
        generateResponse,
        regenerateResponse,
        chatgptStatus,
        resetMessages,
        setChatgptStatus,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
