import { useWindowSize } from "@/hooks";
import { NormalSettings, MobileSettings, ChatContextProvider } from "./components";

export default function Layout({ children }: { children: React.ReactNode }) {
  const smallScreen = useWindowSize().width < 1024;

  return (
    <ChatContextProvider>
      <section aria-label='chat page' className='w-full flex-1 flex flex-col lg:flex-row'>
        {smallScreen ? <MobileSettings /> : <NormalSettings />}
        {children}
      </section>
    </ChatContextProvider>
  );
}
