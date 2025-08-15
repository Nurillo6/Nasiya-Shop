import axios from "axios"
import API from "./getEnv"

const instance = () => {
    return axios.create({ baseURL: API })
}
export default instance