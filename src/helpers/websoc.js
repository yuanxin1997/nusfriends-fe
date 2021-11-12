import WebSocket from "isomorphic-ws";

export const wsTrigger = (id) => {
    const websocket = new WebSocket(
        `ws://nusfriends-be.herokuapp.com/nus-friends?userId=${id}`
    );
    websocket.onopen = () => {
        websocket.send(JSON.stringify(id));
        console.log("ping usedId: ", id);
        websocket.close();
    };
};
