import { useWindowSize } from "@/hooks";
import { NormalSettings, MobileSettings, Chat, ChatContextProvider } from "./components";

export default function Home() {
  const smallScreen = useWindowSize().width < 768;

  return (
    <ChatContextProvider>
      {smallScreen ? <MobileSettings /> : <NormalSettings />}
      <Chat />
    </ChatContextProvider>
  );
}
