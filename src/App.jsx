import { useState } from "react";
import LandingPage from "./components/LandingPage";
import TodoApp from "./components/TodoApp";
import ChatBot from "./components/ChatBot";

function App() {
  const [showApp, setShowApp] = useState(false);

  const handleGetStarted = () => {
    setShowApp(true);
  };

  const handleBackToLanding = () => {
    setShowApp(false);
  };

  return (
    <>
      {showApp ? (
        <TodoApp onBackToLanding={handleBackToLanding} />
      ) : (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      <ChatBot />
    </>
  );
}

export default App;
