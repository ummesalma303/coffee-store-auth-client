import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const SignUp = () => {
    const {createUser,setUser}=useContext(AuthContext)
   
    const handleSignUp=e=>{
        e.preventDefault()
        const name =e.target.name.value
        const email =e.target.email.value
        const password =e.target.password.value
       
        createUser(email,password)
        .then(res=>{
          setUser(res?.user)

          const leastLoginTime =res.user.metadata?.lastSignInTime
          const user={name,email,leastLoginTime}
         
          fetch('https://coffee-store-server-omega-seven.vercel.app/user',{
            method:"POST",
            headers:{
              'content-type':"application/json"
            },
            body:JSON.stringify(user)
          })
          .then(res=>res.json())
          .then(data=>{
          
          })

          Swal.fire({
            title: "Good job!",
            text: "Added User",
            icon: "success"
          });
          e.target.reset()



        })
        .catch(err=>{
         
        })
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" name='name' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name='password' className="input input-bordered" required />
          
            </div>
            <div>
            <p>Already have an account please<NavLink to='/signIn' className='text-blue-600'> signin</NavLink></p>
            </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-success text-white">Sign Up</button>
        </div>
      </form>
    </div>
        </div>
    );
};

export default SignUp;