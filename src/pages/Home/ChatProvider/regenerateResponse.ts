import generateResponse from "./generateResponse";
import { useChatContext } from "../ChatProvider";

export default function regenerateResponse() {
  const { messages, setMessages } = useChatContext();

  if (messages[messages.length - 1].role === "assistant") {
    const slicedMessages = messages.slice(0, -1);
    setMessages(slicedMessages);
    generateResponse(slicedMessages);
  } else {
    generateResponse(messages);
  }
}
