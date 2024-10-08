import axios from "axios";

const useFetchData = async (setState) => {
    try {
        const { data } = await axios.get("/cars/");
        setState(data.allCars);
    } catch (err) {
        console.log(err);
    }
}

export default useFetchData;