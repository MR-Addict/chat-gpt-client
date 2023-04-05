import { useWindowSize } from "@/hooks";
import { NormalSettings, MobileSettings, ChatContextProvider } from "./components";

export default function Layout({ children }: { children: React.ReactNode }) {
  const smallScreen = useWindowSize().width < 768;

  return (
    <ChatContextProvider>
      <section aria-label='chat page' className='w-full flex-1 flex flex-col md:flex-row'>
        {smallScreen ? <MobileSettings /> : <NormalSettings />}
        {children}
      </section>
    </ChatContextProvider>
  );
}
