import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinnerGif from '../assets/loading-spinner.gif'
import dayjs from 'dayjs'
import './ChatInput.css'


export function ChatInput({ chatMessages, setChatMessages }) {
      const [inputText, setInputText] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const time = dayjs().valueOf(); 
      const formattedTime = dayjs(time).format('h:mma');

      function saveInputText(event) {
        setInputText(event.target.value);
      }
      function checkKey(event) {
        if (event.key === 'Enter' && inputText !== '') {
          sendMessage();
        } else if (event.key === 'Escape') {
          event.target.value = ''
        }
      }

      //This should work for the time logic
      async function sendMessage() {
        const newChatMessages = [
          ...chatMessages,
          {
            message: inputText,
            sender: 'user',
            time: formattedTime,
            id: crypto.randomUUID()
          }
        ];

        setChatMessages(newChatMessages);
        setInputText('');
        setChatMessages([
          ...newChatMessages,
          {
            message: <img src={LoadingSpinnerGif} className="loading-spinner"/>,
            sender: 'robot',
            id: crypto.randomUUID()
          }
        ]);

        setIsLoading(true);
        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
          ...newChatMessages,
          {
            message: response,
            sender: 'robot',
            time: formattedTime,
            id: crypto.randomUUID()
          }
        ]);

        setIsLoading(false);

      }

      return (
        <div className="chat-input-container">
          <input
            disabled={isLoading}
            placeholder="Send a message to ChatBot"
            size="30"
            onChange={saveInputText}
            value={inputText}
            onKeyDown={checkKey}
            className="chat-input"
          />
          <button
            disabled={isLoading || inputText === ""}
            onClick={sendMessage}
            className="send-button"
          >Send</button>
          <button onClick={() => {
            setChatMessages([]);
            localStorage.setItem('messages', JSON.stringify([]));
            }} className="clear-button">
            Clear
          </button>
        </div>
      );
    }