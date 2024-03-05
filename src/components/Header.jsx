import React, { useEffect,useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setWalletUser } from '../reducer';
import { Provider ,auth,signInWithPopup} from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { ethers } from 'ethers';
const Header = () => {
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user);
  const walletUser=useSelector((state)=>state.walletUser);
  const navigate=useNavigate();
  const connectWallet= async()=>{
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    dispatch(setWalletUser(account));
  }
  const [logger,setLogger]=useState(false);
  const checkLogger=()=>{
    const q = query(collection(db, "loggers"), where("uid", "==", user.uid));
    getDocs(q).then((querySnapshot) => {
    if (querySnapshot.size > 0) setLogger(true);
  });
  }
  useEffect(()=>{
          if(user) checkLogger();
  },[user])
  return (
    <div className='fixed text-white z-50 w-screen scrollbar-hide p-2 px-4  md:px-16 md:p-3 bg-[#131921] drop-shadow-lg'>
      <div className='w-full h-full hidden md:flex items-center justify-between'>
        <Link to={"/"} className='flex items-center gap-2'>
           <img src='/images/bgnw.png' alt='hero' className='w-8'/>
           <p className=' text-xl font-bold'>Dappazon</p>
        </Link>
        <div className='flex items-center gap-8'>
          <motion.ul
          initial={{opacity:0,x:200}} 
          animate={{opacity:1,x:0}} 
          exit={{opacity:0,x:200}} 
          className='flex items-center ml-auto gap-8'>
            <li onClick={()=>navigate("/")}
            className='cursor-pointer  hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Home</li>
            <li className='cursor-pointer  hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Menu</li>
            <li className='cursor-pointer  hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Services</li>
          <li onClick={()=>navigate('/order')}
          className='cursor-pointer  hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Orders</li>
          </motion.ul>
          {logger?<button 
          onClick={()=>navigate("/log")}
          className='bg-orange-400 px-2 py-2 rounded-md'>Create A Log</button>:null}
           {logger&!walletUser?<button 
          onClick={connectWallet}
          className='bg-orange-400 px-2 py-2 rounded-md'>Connect To Wallet</button>:null}
          {user?<img
            className='w-[40px] h-[40px] rounded-full object-cover' src="./images/avatar.png"/>:null}
      </div>
    </div>
  </div>
  )
}

export default Header;