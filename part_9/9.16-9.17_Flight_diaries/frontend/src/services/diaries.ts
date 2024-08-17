import axios from "axios";

async function getAll () {
    const res = await axios.get("http://localhost:3000/api/diaries");
    console.log(res.data);
    return res.data;


}

export default {
    getAll
}