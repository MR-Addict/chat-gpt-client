import { useWindowSize } from "@/hooks";
import { ChatContextProvider } from "./ChatProvider";
import { NormalSettings, MobileSettings, Chat } from "./components";

export default function Home() {
  const smallScreen = useWindowSize().width < 768;

  return (
    <ChatContextProvider>
      {smallScreen ? <MobileSettings /> : <NormalSettings />}
      <Chat />
    </ChatContextProvider>
  );
}
