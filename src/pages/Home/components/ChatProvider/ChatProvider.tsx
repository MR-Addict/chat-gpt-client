import { createContext, useContext, useState } from "react";
import { MessageType, Message, OptionsType } from "@/types/chatgpt";

const defaultMessages: MessageType[] = [];
const defaultOptions: OptionsType = { model: "gpt-3.5-turbo", temperature: 0.7, top_p: 0.9, max_tokens: 2048 };

type ChatGPTStatusType = "idle" | "thinking" | "error";

interface ChatContextProps {
  apiToken: string;
  options: OptionsType;
  messages: MessageType[];
  chatgptStatus: ChatGPTStatusType;
  resetMessages: () => void;
  regenerateResponse: () => void;
  setApiToken: (value: string) => void;
  setOptions: (options: OptionsType) => void;
  setMessages: (messages: MessageType[]) => void;
  generateResponse: (messages: MessageType[]) => void;
  setChatgptStatus: (status: ChatGPTStatusType) => void;
}

const ChatContext = createContext<ChatContextProps>({
  apiToken: "",
  chatgptStatus: "idle",
  options: defaultOptions,
  messages: defaultMessages,
  resetMessages: () => {},
  regenerateResponse: () => {},
  setApiToken: (value: string) => {},
  setOptions: (options: OptionsType) => {},
  setMessages: (messages: MessageType[]) => {},
  generateResponse: (messages: MessageType[]) => {},
  setChatgptStatus: (status: ChatGPTStatusType) => {},
});

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiToken, setApiToken] = useState("");
  const [messages, setMessages] = useState(defaultMessages);
  const [options, setOptions] = useState<OptionsType>(defaultOptions);
  const [chatgptStatus, setChatgptStatus] = useState<ChatGPTStatusType>("idle");

  function generateResponse(messages: MessageType[]) {
    console.log(messages);

    if (!apiToken) return;
    if (!messages.length) return;
    setChatgptStatus("thinking");

    fetch("https://api.mraddict.one/openai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: apiToken },
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

  function regenerateResponse() {
    if (messages[messages.length - 1].role === "assistant") {
      const slicedMessages = messages.slice(0, -1);
      setMessages(slicedMessages);
      generateResponse(slicedMessages);
    } else {
      generateResponse(messages);
    }
  }

  function resetMessages() {
    setChatgptStatus("idle");
    setMessages(defaultMessages);
  }

  return (
    <ChatContext.Provider
      value={{
        apiToken,
        options,
        messages,
        setOptions,
        setApiToken,
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
