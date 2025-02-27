import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { sendIcon } from "../icons/sendIcon";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";

const JoinRoom = () => {

    const navigate = useNavigate();
    const roomCodeRef = useRef<HTMLInputElement>(null);

    return (
        <div className='w-screen h-screen bgimage flex justify-center items-center selection:bg-yellow-900/30'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='sm:w-1/3 sm:h-fit pb-7 w-fit px-5 h-fit bg-white/50 shadow-xl rounded-4xl border'>
                <div className="text-4xl flex justify-center text-center uppercase font-semibold mt-7 font-mono">
                    Join Room
                </div>
                <div className="text-xl flex justify-center mt-7 uppercase">
                    <Input
                        type={"text"}
                        width="w-fit"
                        placeholder={"Room Code"}
                        ref={roomCodeRef}
                        endIcon={sendIcon()}
                        uppercase={true}
                        onClick={() => {
                            if (roomCodeRef.current?.value) {
                                const uppercaseRoomCode = roomCodeRef.current?.value.toUpperCase();
                                navigate(`/joiningroom/${uppercaseRoomCode}`);
                            }
                            else toast.error("Please enter a room code", {
                                style: {
                                    backgroundColor: "#ebc9a9"
                                }
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default JoinRoom
