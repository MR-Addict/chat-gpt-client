import { useChatContext } from "../ChatProvider";
export default function resetMessages() {
  const { setChatgptStatus, setMessages } = useChatContext();

  setChatgptStatus("idle");
  setMessages([]);
}
