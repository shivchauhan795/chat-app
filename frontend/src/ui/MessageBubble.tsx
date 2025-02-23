interface MessageProps {
    message: string;
    senderName: string;
    key: number
    myName: string
}
const defaultStyle = "bg-[#733e0a]/20 text-black px-4 py-3 sm:mx-10 mx-4 max-w-[100%] break-words"

export const MessageBubble = (props: MessageProps) => {
    return (
        <div className={`${props.senderName === props.myName ? "self-end items-end" : "self-start items-start"} flex flex-col max-w-[70%] justify-end`}>
            <div
                key={props.key}
                className={`${defaultStyle} ${props.senderName === props.myName ? "rounded-s-4xl rounded-tr-4xl" : "rounded-e-4xl rounded-tl-4xl"} `}
            >
                {props.message}
            </div>
            <div className="text-black sm:mx-10 mx-4 text-sm">{props.senderName}</div>
        </div>

    )
}