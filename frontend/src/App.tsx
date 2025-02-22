
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState(["hi there", "hlo"]);
  const [textBoxMessage, setTextBoxMessage] = useState("");
  const wsRef = useRef<WebSocket>(null);
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
    return () => {
      ws.close();
    }
  }, []);

  return (
    <div className='flex flex-col justify-between w-full h-screen items-center bg-slate-800 text-white'>
      <div className='h-5/6 pt-5 flex flex-col gap-5 overflow-auto w-full'>
        {messages.map(message => <div className='bg-white text-black px-3 py-2 ml-6 w-fit rounded-xl'>{message}</div>)}
      </div>
      <div className='h-1/6 w-screen p-5  flex justify-between gap-3'>
        <input className=' px-3 py-1 w-3/4 h-3/5 border rounded-2xl' type="text" placeholder="Type your message..." onChange={(e) => { setTextBoxMessage(e.target.value) }} value={textBoxMessage} />
        <button onClick={
          () => {
            wsRef.current?.send(JSON.stringify({
              type: "chat",
              payload: {
                message: textBoxMessage
              }
            }))
            setTextBoxMessage("");
          }
        } className='rounded-2xl px-3 py-1 border w-1/4 h-3/5 cursor-pointer'>Send</button>
      </div>
    </div>
  )
}

export default App
