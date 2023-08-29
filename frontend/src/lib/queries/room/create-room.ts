import axios from "axios";
import { RoomType } from "./type";

async function createRoom({ roomName, createdBy, password }: RoomType) {
  return axios.post("http://localhost:4000/api/room", {
    roomName,
    createdBy,
    password,
  });
}

export default createRoom;
