import { useWindowSize } from "@/hooks";
import { ChatContextProvider, NormalSettings, MobileSettings, ChatWindow } from "./components";

export default function Home() {
  const smallScreen = useWindowSize().width < 768;

  return (
    <ChatContextProvider>
      {smallScreen ? <MobileSettings /> : <NormalSettings />}
      <ChatWindow />
    </ChatContextProvider>
  );
}
