import React,{useEffect,useState} from 'react'
import './Home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface UserInfo {
  _id: string;
  username: string;
  email: string;
}

const Home = () => {
 
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const navigate = useNavigate();

  const checkUserInfo = async () => {

    const useInfo = window.localStorage.getItem('userInfo');
    if (useInfo)
      setUserInfo(JSON.parse(useInfo));
    else {
      try {
        await  axios.post('/api/users/logout');
        navigate('/signin');
      }
      catch {
  
      }
    }
  }
    
    const handleLogout = async () => {
      try {
        const res = await  axios.post('/api/users/logout', '', {withCredentials:  true});
        console.log(res);
        navigate('/signin');
      }
      catch (e) {
      console.log(e);
    }
  }

  useEffect(()=> {
    checkUserInfo();
  }, [])

  return (
    <div className='home-page'>
      <h1>Welcome {userInfo?.username} !</h1>
      <button onClick={handleLogout}>Logout</button>
    </div> 
  )
}

export default Home