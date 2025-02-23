import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { sendIcon } from "../icons/sendIcon";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../ui/Input";

const JoiningRoom = () => {
    const roomId = useParams().id;
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);

    return (
        <div className='w-screen h-screen bgimage flex justify-center items-center selection:bg-yellow-900/30'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='sm:w-1/3 sm:h-fit pb-7 w-fit px-5 h-fit bg-white/50 shadow-xl rounded-4xl border'>
                <div className="text-4xl flex justify-center text-center uppercase font-semibold mt-7 font-mono">
                    Enter Your Name
                </div>
                <div className="text-xl flex justify-center mt-7 uppercase">
                    <Input
                        type={"text"}
                        width="w-fit"
                        placeholder={"Name"}
                        ref={nameRef}
                        endIcon={sendIcon()}
                        onClick={() => {
                            if (nameRef.current?.value) navigate(`/room/${roomId}/${nameRef.current?.value}`);
                            else toast.error("Please enter your name", {
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

export default JoiningRoom
