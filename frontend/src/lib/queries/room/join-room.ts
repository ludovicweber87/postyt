import axios from "axios";
import { RoomType } from "./type";

const joinRoom = ({
  roomName,
  password,
}: Pick<RoomType, "password" | "roomName">) => {
  return axios.post("http://localhost:4000/api/room/join", {
    roomName,
    password,
  });
};

export default joinRoom;
