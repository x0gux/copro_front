import AXIOS from ".";

export const getStatus = async () => {
    const response = await AXIOS.get("/get/status?limit=1")
    return response.data
}