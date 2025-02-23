import { useEffect, useRef, useState } from 'react'
import { sendIcon } from "../icons/sendIcon.tsx";
import { Input } from '../ui/Input.tsx';
import { MessageBubble } from '../ui/MessageBubble.tsx';
interface Data {
    message: string,
    senderName: string
}

function Chat() {
    const [messages, setMessages] = useState([""]);
    const [data, setdata] = useState<Data[]>([]);
    const wsRef = useRef<WebSocket>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);  // keep the scroll at the bottom

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onmessage = (event) => {
            console.log(event);
            const eventData = JSON.parse(event.data);
            setdata(data => [...data, eventData]);
            console.log(data);
            setMessages(messages => [...messages, eventData.message]);
        }
        wsRef.current = ws;
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: "red",
                    name: "shiv"
                }
            }))
        }
        return () => {
            ws.close();
        }
    }, []);


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    return (
        <div className='flex flex-col justify-between w-full h-screen items-center bgimage text-white'>
            <div className={`h-5/6 pt-5 flex flex-col gap-5 overflow-auto w-full items-end custom-scrollbar`}>
                {data
                    .map((message, index) =>
                        <>
                            <MessageBubble key={index} message={message.message} senderName={message.senderName} />
                        </>
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
                    width='w-full'
                    onClick={
                        () => {
                            if (!inputRef.current) return;
                            wsRef.current?.send(JSON.stringify({
                                type: "chat",
                                payload: {
                                    message: inputRef.current.value,
                                    name: "Shiv"
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

export default Chat;
