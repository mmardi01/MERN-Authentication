import React,{useEffect,useState} from 'react'
import './Home.css'
import axios from 'axios';
interface UserInfo {
  _id: string;
  username: string;
  email: string;
}

const Home = () => {
 
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const checkUserInfo = async () => {

    const useInfo = window.localStorage.getItem('userInfo');
    if (useInfo)
      setUserInfo(JSON.parse(useInfo));
    else
      await  axios.post('/api/logout');
  }

  useEffect(()=> {
    checkUserInfo();
  }, [])

  return (
    <div className='home-page'>
      <h1>Welcome {userInfo?.username} !</h1>
    </div> 
  )
}

export default Home