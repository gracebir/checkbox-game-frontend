/** @format */
import axios from "axios";

const instance = axios.create({
    baseURL: "https://task-api-k86t.onrender.com/api/v1",
    // headers: { "X-Custom-Header": "foobar" },
});

export default instance;
