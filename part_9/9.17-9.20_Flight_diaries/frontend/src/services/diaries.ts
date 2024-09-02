import axios from "axios";
import { DiaryEntry, DiaryForm } from "../types";


const baseURL = "http://localhost:3000/api/diaries"


async function getAll () {
    const res = await axios.get<DiaryEntry[]>(baseURL);
    console.log(res.data);
    return res.data;
}

async function create (newData: DiaryForm) {
    const res = await axios.post(baseURL, newData);
    if (res.status !== 201) {
        throw new Error(res.statusText);
    }
}

export default {
    getAll,
    create

}