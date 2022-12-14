import { useState } from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";
import { useNavigate } from 'react-router-dom';


export default function Register() {
  // create State
  const [name, setName] = useState("fall");
  const [email, setEmail] = useState("fall1133@gmail.com");
  const [password, setPassword] = useState("123456");
  // hooks
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log({ data })
      if (data?.error) {
        toast.error(data.error);
        return
      } else {
        localStorage.setItem('auth', JSON.stringify(data));
         setAuth ({...auth,token: data.token, user: data.user})
       
        toast.success("Registration successful")
        navigate('/dashboard');
      }
      
      
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. try again")
    }
  };
  return (
    <div>
      <Jumbotron title="REGISTER" />
     
      <div className='container mt-5 '>
        <div className='row'>
          <div className='col-md-6 offset=md-3 '>
            <form onSubmit ={handleSubmit}>
            <input type="text"
              className="form-control mb-4 p-2 "
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              
            /> 
            <input type="email"
              className="form-control mb-4 p-2 "
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
           
              
            />
            <input type="password"
              className="form-control mb-4 p-2 "
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             
              
            />
              <button className='btn btn-primary' type="submit">
                Submit</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}
