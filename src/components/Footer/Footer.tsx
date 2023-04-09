import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className='text-gray-500 flex flex-row items-center gap-1 text-sm mt-1'>
      <span>Copyright &copy; {new Date().getFullYear()} MR-Addict</span>
      <a
        target='_blank'
        aria-label='github source link'
        className='hover:text-gray-300'
        href='https://github.com/MR-Addict/chat-gpt-client'
      >
        <AiFillGithub size={15} />
      </a>
    </footer>
  );
}
