import { useEffect } from "react";

const useSort = (state, setState, arr, func) => {
    useEffect(() => {
        func();
        switch (state) {

            case "Car Type":
                setState([...arr].sort((a, b) => a.carType.localeCompare(b.carType))
                );
                break;
            case "Location":
                setState([...arr].sort((a, b) => a.address.city.localeCompare(b.address.city))
                );
                break;
            case "Price":
                setState([...arr].sort((a, b) => a.price - b.price));
                break;
            default:
                break;
        }
    }, [state]);

}

export default useSort;