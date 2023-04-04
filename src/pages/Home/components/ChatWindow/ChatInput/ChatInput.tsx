import { useState } from "react";
import { MdSend } from "react-icons/md";

import style from "./ChatInput.module.css";
import { MessageType } from "@/types/chatgpt";
import { usePopupContext } from "@/contexts";
import { useChatContext, generateResponse } from "../../../ChatProvider";

export default function ChatInput() {
  const { popup } = usePopupContext();
  const [userInput, setUserInput] = useState("");
  const { apiToken, messages, setMessages, chatgptStatus } = useChatContext();

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInput(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!apiToken) {
      popup({ status: false, message: "You need to add apiToken to chat" });
      return;
    }

    setUserInput("");
    const newMessages: MessageType[] = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    generateResponse(newMessages);
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className='w-full relative'>
        <div className={style["input-wrapper"]}>
          <textarea
            required
            value={userInput}
            maxLength={2000}
            onChange={handleInput}
            placeholder='Ask me anything!'
            className={style.input}
          />
        </div>

        <button type='submit' aria-label='send message button' disabled={!userInput || chatgptStatus === "thinking"}>
          <MdSend size={23} />
        </button>
      </div>
    </form>
  );
}
