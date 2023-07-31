import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Profile() {
  const axiosPrivate=useAxiosPrivate();
  useEffect(() => {
    const 
    getStaffProfile = async () => {
      let isMounted = true;
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get('/staff/profile', {
          signal: controller.signal,
        });
        console.log(response.data);
        const profileInfo = response.data;

      } catch (error) {
        console.log(error);
      }
    };
    
    getStaffProfile();
  }, []);
  return (
    <div>
      <h1>InstituteStaffProfile</h1>
    </div>
  )
}

export default Profile
