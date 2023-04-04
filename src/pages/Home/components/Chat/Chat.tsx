import ChatInput from "./ChatInput/ChatInput";
import ChatWindow from "./ChatWindow/ChatWindow";

import style from "./Chat.module.css";

export default function Chat() {
  return (
    <section aria-label='chat window' className={style.window}>
      <ChatWindow />
      <ChatInput />
    </section>
  );
}
