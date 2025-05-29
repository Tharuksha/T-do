import { useState } from "react";
import LandingPage from "./components/LandingPage";
import TodoApp from "./components/TodoApp";

function App() {
  const [showApp, setShowApp] = useState(false);

  const handleGetStarted = () => {
    setShowApp(true);
  };

  const handleBackToLanding = () => {
    setShowApp(false);
  };

  if (showApp) {
    return <TodoApp onBackToLanding={handleBackToLanding} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}

export default App;
