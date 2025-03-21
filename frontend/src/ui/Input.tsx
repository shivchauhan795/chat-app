import { ReactElement } from "react";

interface InputProps {
    type: string;
    placeholder: string;
    ref?: any
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    uppercase?: boolean
    width: string
    onClick?: () => void
    onEmojiClick?: () => void
    onChange?: () => void
}

const DefaultStyle = "px-3 py-1 h-3/5 border-2 rounded-2xl flex items-center justify-between outline-none";

export const Input = (props: InputProps) => {
    return (
        <div className={`${DefaultStyle} ${props.width}`} >
            {props.startIcon && <span className="mr-2 cursor-pointer" onClick={props.onEmojiClick}>{props.startIcon}</span>}
            <input
                className={`flex-1 p-1 outline-none selection:bg-yellow-900/30 ${props.uppercase && "uppercase"}`}
                type={props.type}
                placeholder={props.placeholder}
                ref={props.ref}
                onKeyDown={(e) => e.key === "Enter" && props.onClick?.()}   // on the click of enter the onClick function will be called
                onChange={props.onChange} // detects typing and close the emohipicker
            />
            {props.endIcon && <span className="ml-2 cursor-pointer" onClick={props.onClick}>{props.endIcon}</span>}
        </div>
    );
};
