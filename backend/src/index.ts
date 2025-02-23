import WebSocket, { WebSocketServer } from "ws";
import * as uuid from "uuid";
const uuidv4 = uuid.v4;
const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
    name: string;
    id: string;
}
let allSockets: User[] = [];

wss.on("connection", (socket: WebSocket) => {

    socket.on("message", (message: string) => {
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