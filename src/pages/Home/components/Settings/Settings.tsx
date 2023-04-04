import classNames from "classnames";
import { AiOutlineClear } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import style from "./Settings.module.css";
import { useChatContext, regenerateResponse, resetMessages } from "../../ChatProvider";

export default function Settings() {
  const { options, apiToken, setAndStoreApiToken, setOptions, chatgptStatus } = useChatContext();

  return (
    <div className={style.window}>
      <div className='flex flex-col gap-1'>
        <h1 className={style.title}>Settings</h1>

        <div className='p-3 border border-gray-500 rounded-md flex flex-col gap-2'>
          <div className={style.inputelement}>
            <label htmlFor='model'>Model</label>
            <select
              required
              id='model'
              name='model'
              value={options.model}
              className={style.input}
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
            >
              <option value='gpt-3.5-turbo'>gpt-3.5-turbo</option>
            </select>
          </div>

          <div className={style.inputelement}>
            <label htmlFor='temperature'>Temperature</label>
            <input
              required
              type='number'
              id='temperature'
              name='temperature'
              min={0}
              max={1}
              value={options.temperature}
              onChange={(e) => setOptions({ ...options, [e.target.name]: Number(e.target.value) })}
              className={style.input}
            />
          </div>

          <div className={style.inputelement}>
            <label htmlFor='top_p'>Top p</label>
            <input
              required
              type='number'
              id='top_p'
              name='top_p'
              min={0}
              max={1}
              value={options.top_p}
              className={style.input}
              onChange={(e) => setOptions({ ...options, [e.target.name]: Number(e.target.value) })}
            />
          </div>

          <div className={style.inputelement}>
            <label htmlFor='max_tokens'>Max Tokens</label>
            <input
              required
              type='number'
              id='max_tokens'
              name='max_tokens'
              min={1}
              max={2048}
              value={options.max_tokens}
              className={style.input}
              onChange={(e) => setOptions({ ...options, [e.target.name]: Number(e.target.value) })}
            />
          </div>

          <div className={style.inputelement}>
            <label htmlFor='apiToken'>API Token</label>
            <input
              required
              type='text'
              id='apiToken'
              autoComplete='off'
              maxLength={100}
              value={"*".repeat(apiToken.length)}
              className={style.input}
              onChange={(e) => setAndStoreApiToken(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <h1 className={style.title}>Operations</h1>

        <div className='flex flex-col gap-3'>
          <button
            type='button'
            aria-label='regenerate button'
            onClick={regenerateResponse}
            disabled={chatgptStatus === "thinking"}
            className={classNames(style.btn, "border border-gray-500")}
          >
            <IoChatbubbleEllipsesOutline size={18} />
            <span>Regnerate</span>
          </button>

          <button
            type='button'
            aria-label='clear prompt button'
            onClick={resetMessages}
            disabled={chatgptStatus === "thinking"}
            className={classNames(style.btn, "border border-gray-500")}
          >
            <AiOutlineClear size={20} />
            <span>Clear prompts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
