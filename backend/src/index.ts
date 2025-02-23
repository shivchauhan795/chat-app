import { WebSocketServer, WebSocket } from "ws";
import { v4 as uuidv4 } from 'uuid';
const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
    name: string;
    id: string;
}
let allSockets: User[] = [];

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message as unknown as string);
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
                name: parsedMessage.payload.name,
                id: uuidv4()
            })
        }
        if (parsedMessage.type === "chat") {
            const currentRoom = allSockets.find((x) => x.socket == socket)?.room;
            const myId = allSockets.find((x) => x.socket == socket)?.id;
            const myName = allSockets.find((x) => x.socket == socket)?.name;

            if (currentRoom) {
                allSockets.filter((x) => x.room === currentRoom).forEach((x) => x.socket.send(JSON.stringify(
                    {
                        message: parsedMessage.payload.message,
                        senderName: myName,
                        senderId: myId
                    }
                )
                ));
            }

        }
    });

    socket.on("disconnect", () => {
        allSockets = allSockets.filter(x => x.socket != socket);
    })

});