import { useState, useEffect } from "react"

const usePersist = () => {
    const persistValue = JSON.parse(localStorage.getItem("persist")) || false;
    const [persist, setPersist] = useState(persistValue);

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])

    return [persist, setPersist]
}
export default usePersist