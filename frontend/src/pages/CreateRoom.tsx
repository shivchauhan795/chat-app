import { useState } from "react";
import { copyIcon } from "../icons/copyIcon";
import toast, { Toaster } from "react-hot-toast";
import { sendIcon } from "../icons/sendIcon";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
    const [roomCode, setroomCode] = useState("");
    const navigate = useNavigate();
    const createRoomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setroomCode(code);
    };

    return (
        <div className='w-screen h-screen bgimage flex justify-center items-center selection:bg-yellow-900/30'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='sm:w-fit px-9 sm:h-fit pb-7 w-2/3 h-fit bg-white/50 shadow-xl rounded-4xl border'>
                <div className="text-4xl flex justify-center text-center uppercase font-semibold mt-7 font-mono">
                    Create Your Room
                </div>
                {!roomCode &&
                    <>
                        <div className="text-xl flex justify-center mt-7">Generate a Room Code</div>
                        <div className="flex justify-center">
                            <button onClick={() => { createRoomCode() }} className="text-2xl flex border px-4 py-2 cursor-pointer rounded-2xl bg-[#733e0a]/50 mt-7"> Generate</button>
                        </div>
                    </>
                }
                {roomCode &&
                    <div className="text-2xl flex justify-center items-center mt-7 font-mono">
                        Room Code: {roomCode}
                        <span className="ml-2 cursor-pointer"
                            onClick={() => {
                                navigator.clipboard.writeText(roomCode);
                                toast.success("Copied to clipboard", {
                                    style: {
                                        backgroundColor: "#ebc9a9"
                                    }
                                });
                            }}>{copyIcon()}
                        </span>
                    </div>
                }
                {roomCode &&
                    <div className="flex justify-center">
                        <button onClick={() => { navigate(`/joiningroom/${roomCode}`) }} className="text-xl flex gap-2 justify-center items-center border px-4 py-2 cursor-pointer rounded-2xl bg-[#733e0a]/50 mt-7"> Enter Room{sendIcon()}</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CreateRoom
