import AXIOS from ".";

export const getMonitoring = async () => {
    const response = await AXIOS.get("/get/sensor?limit=1")
    return response.data
}