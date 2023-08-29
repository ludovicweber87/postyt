import axios from "axios";
import { RoomType } from "./type";

const getRoom = ({ roomName }: Pick<RoomType, "roomName">) => {
  return axios.get(`http://localhost:4000/api/room/${roomName}`);
};

export default getRoom;
