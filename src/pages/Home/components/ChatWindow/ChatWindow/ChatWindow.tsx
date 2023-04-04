import { MdErrorOutline } from "react-icons/md";

import style from "./ChatWindow.module.css";
import { LoadingDots } from "@/components";
import { useChatContext } from "../../../ChatProvider";

export default function ChatWindow() {
  const { messages, chatgptStatus } = useChatContext();

  return (
    <div className={style.frame}>
      <div className={style.messages}>
        {messages.map((item, index) =>
          item.role === "user" ? (
            <div key={index} className='flex flex-row justify-end'>
              <p className='bg-indigo-600 text-white w-fit px-4 py-2 rounded-lg whitespace-pre-wrap'>{item.content}</p>
            </div>
          ) : (
            <div key={index} className='flex flex-row justify-start'>
              <article className='bg-gray-300 text-gray-700 w-fit px-4 py-2 rounded-lg whitespace-pre-wrap'>
                {item.content}
              </article>
            </div>
          )
        )}

        {chatgptStatus === "thinking" && (
          <div className='ml-2'>
            <LoadingDots color='gray' size={5} />
          </div>
        )}

        {chatgptStatus === "error" && (
          <div className='w-fit px-4 py-2 rounded-lg bg-red-600 text-white flex flex-row items-center gap-1'>
            <span>
              <MdErrorOutline size={20} />
            </span>
            <p>ChatGPT failed to response!</p>
          </div>
        )}
      </div>
    </div>
  );
}
