import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from "../api/axios.js"

function Login() {

    const [userid, setUserid] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleLogin =(e)=>{
        e.preventDefault();
        setError("")
        setLoading(true);

        try{
            const res=axios.post("/auth/login",{userid,password});
            if(res.data.status==="success"){
                navigate("/")
            }
            else{
                setError("Login Failed !!")
            }
        }
        catch(err){
            setError("Login Failed !! ")
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div>
            <div className='flex h-screen flex-col text-center justify-center items-center mx-auto bg-purple-900'>
                <div className='bg-purple-400 p-10 rounded-xl text-xl text-purple-900'>
                    <h2 className='text-center font-bold text-3xl pb-5'>Login Page</h2>
                    <form onSubmit={handleLogin}>
                     <div className="flex flex-col gap-y-5">
                      <div className='flex items-center justify-center gap-5'>
                        <label htmlFor="userid">Userid</label>
                        <input className='p-2 rounded-3xl' type="text" id='userid' placeholder='Enter Your UserID' value={userid} onChange={(e)=>setUserid(e.target.value)}/>
                      </div>
                      <div className='flex items-center justify-center gap-5'>
                        <label htmlFor="password">Password</label>
                        <input className='p-2 rounded-3xl' type="text" id='password' placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                      </div>
                     </div>
                     {error && <p style={{ color: "red" }}>{error}</p>}
                     <button type="submit" className='mt-5 mb-5 bg-purple-900 text-white font-bold px-4 py-2 rounded-2xl self-center'>{loading ? 'Logging in...' : 'Login'}</button>
                    </form>
                <div className='flex justify-center'>
                    <p>Not Have an Account ?</p>
                    <button className='underline  font-bold'><Link to="/register">Create Now</Link></button>
                </div>
                </div>
            </div>
        </div>
  )
}

export default Login
