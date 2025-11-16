import React, { useState } from 'react'
import axios from '../api/axios'
import { Link ,useNavigate} from 'react-router-dom'

function Register() {

    const [name,setName]=useState('')
    const [userid,setUserid]=useState('')
    const [password,setPassword]=useState('')
    const [repassword,setRepassword]=useState('')
    const [message,setMessage]=useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    
    const handleRegister = async (e)=>{
        e.preventDefault();
        setMessage('');
        setError('')
        if(password !== repassword){
            setError("Password does not match each other");
            return;
        }
        if(password.length<6){
            setError("Password Must Be Greater than 6 characters");
            return
        }
        setLoading(true);

    
        try{
            const res = await axios.post("/auth/register",{name,userid,password});
            // setMessage("Registered Successfullly")
            // navigate("/");
            if (res.data.status === "success") {
                setMessage("Registered Successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        }
        catch(err){
            setError("Registeration Failed")
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div>
        <div className='flex h-screen flex-col text-center justify-center items-center mx-auto bg-purple-900'>
            <div className='bg-purple-400 p-10 rounded-xl text-xl text-purple-900'>
                <h2 className='text-center font-bold text-3xl pb-5'>Register Page</h2>
                <form onSubmit={handleRegister}>
                <div className="flex flex-col gap-y-5">
                    <div className='flex items-center justify-center gap-5'>
                    <label htmlFor="name">Name</label>
                    <input required className='p-2 rounded-3xl' type="text" id='name' placeholder='Enter Your Full Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className='flex items-center justify-center gap-5'>
                    <label htmlFor="userid">Userid</label>
                    <input required className='p-2 rounded-3xl' type="text" id='userid' placeholder='Set Your UserID' value={userid} onChange={(e)=>setUserid(e.target.value)}/>
                </div>
                
                <div className='flex items-center justify-center gap-5'>
                    <label htmlFor="password">Password</label>
                    <input required className='p-2 rounded-3xl' type="password" id='password' placeholder='Set Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='flex items-center justify-center gap-5'>
                    <label htmlFor="password">Re-Type the Password</label>
                    <input required className='p-2 rounded-3xl' type="password" id='password' placeholder='Re-type Your Password' value={repassword} onChange={(e)=>setRepassword(e.target.value)}/>
                </div>
                </div>
                {message && <p className='text-green-700'>{message}</p>}
                {error && <p className='text-red-500'>{error}</p>}
                <button type="submit" className='mt-5 mb-5 bg-purple-900 text-white font-bold px-4 py-2 rounded-2xl self-center'>{loading?"Registering":"Register Now"}</button>
            </form>
            <div className='flex justify-center'>
                <p>Already Have an Account?</p>
                <button className='underline  font-bold'><Link to="/">Login Now</Link></button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Register
