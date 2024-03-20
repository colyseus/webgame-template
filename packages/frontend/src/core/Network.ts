import { Client, Room } from "colyseus.js";
import type { MyRoomState } from "../../../backend/src/rooms/MyRoom";

// detect if we're running on localhost
const endpoint = (window.location.href.indexOf("localhost") >= 0 || window.location.href.indexOf("127.0.0.1") >= 0)
  ? "http://localhost:2567"
  : "https://" + window.location.hostname;

export default {
  client: new Client(endpoint),
  room: null as Room<MyRoomState> | null,
}