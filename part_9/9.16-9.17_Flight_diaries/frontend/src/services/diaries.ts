import axios from "axios";
import { DiaryEntry } from "../types";


async function getAll () {
    const res = await axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries");
    console.log(res.data);
    return res.data;


}

export default {
    getAll
}