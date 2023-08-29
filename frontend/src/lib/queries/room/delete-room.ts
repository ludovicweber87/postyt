import axios from "axios";
import { RoomType } from "./type";

const deleteRoom = async ({ roomName }: Pick<RoomType, "roomName">) => {
  return axios.delete(`http://localhost:4000/api/room/${roomName}`);
};

export default deleteRoom;
