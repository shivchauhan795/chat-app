import { useEffect, useRef, useState } from 'react'
import './App.css'
import { sendIcon } from "./icons/sendIcon.tsx";
import { Input } from './ui/Input.tsx';

function App() {
  const [messages, setMessages] = useState(["hi there", "hlo"]);
  const wsRef = useRef<WebSocket>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);  // keep the scroll at the bottom

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      setMessages(messages => [...messages, event.data]);
    }
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
  }, []);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  return (
    <div className='flex flex-col justify-between w-full h-screen items-center bgimage text-white'>
      <div className='h-5/6 pt-5 flex flex-col gap-5 overflow-auto w-full '>
        {messages
          .map(message =>
            <div className='bg-white text-black px-3 py-2 ml-6 w-fit rounded-xl'>
              {message}
            </div>
          )
        }
        <div ref={messagesEndRef} />
      </div>
      <div className='h-1/6 w-screen p-5  flex justify-between gap-3 text-black'>

        <Input
          type="text"
          placeholder="Message"
          ref={inputRef}
          endIcon={sendIcon()}
          onClick={
            () => {
              if (!inputRef.current) return;
              wsRef.current?.send(JSON.stringify({
                type: "chat",
                payload: {
                  message: inputRef.current.value
                }
              }))
              inputRef.current.value = "";
            }
          }
        />

      </div>
    </div>
  )
}

export default App
