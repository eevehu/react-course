import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages';
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('messages');

      if (!stored) {
        const defaultValue = [];
        localStorage.setItem('messages', JSON.stringify(defaultValue));
        return defaultValue;
      }

      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse messages from localStorage:', error);
      const fallback = [];
      localStorage.setItem('messages', JSON.stringify(fallback));
      return fallback;
    }
  });


  if (JSON.parse(localStorage.getItem('messages')) === null) {
    localStorage.setItem('messages', JSON.stringify(""));
  }



  useEffect(() => {
    console.log("Updated Storage");
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages])

  return (
    <div className="app-container">
      <div className="welcome-text-container">
        <p className="welcome-text">
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      </div>
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
