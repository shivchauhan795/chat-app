import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}
let allSockets: User[] = [];

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message as unknown as string);
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if (parsedMessage.type === "chat") {
            const currentRoom = allSockets.find((x) => x.socket == socket)?.room;

            if (currentRoom) {
                allSockets.filter((x) => x.room === currentRoom).forEach((x) => x.socket.send(parsedMessage.payload.message));
            }

        }
    });

    // socket.on("disconnect", () => {
    //     allSockets = allSockets.filter(x => x != socket);
    // })

});