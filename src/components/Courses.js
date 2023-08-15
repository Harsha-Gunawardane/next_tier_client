import { useContext, useEffect } from "react";
import useSidebar from "../hooks/useSidebar";

export default function Courses() {

<<<<<<< HEAD
    const [minimizeButtonRef] = useOutletContext();

    useEffect(() => {
        minimizeButtonRef.current.click()
    }, [])
=======
    const { setSidebarOptionHandler } = useSidebar();

    // useEffect(() => {
    setSidebarOptionHandler("courses")
    // });
>>>>>>> 215282dcc017b8e1c4fe65308641349a7e51efb4

    return (
        <div>
            <h1>Courses</h1>
        </div>
    )
}
