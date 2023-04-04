import { useChatContext } from "./ChatProvider";
import { MessageType, Message } from "@/types/chatgpt";

export default function generateResponse(messages: MessageType[]) {
  const { options, apiToken, setChatgptStatus, setMessages } = useChatContext();

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
