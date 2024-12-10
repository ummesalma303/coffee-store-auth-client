import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const SignIn = (id) => {

    const {signInUser,user,setUser}=useContext(AuthContext)
  
    const handleSignIn=e=>{
        e.preventDefault()
        const email =e.target.email.value
        const password =e.target.password.value

        signInUser(email,password)
        .then(res=>{
            setUser(res?.user)

            const leastLoginTime =res.user.metadata?.lastSignInTime
            const user= {email,password,leastLoginTime}
            /* ------------------------------- using axios ------------------------------ */
            axios.patch('https://coffee-store-server-omega-seven.vercel.app/user/')
            .then(data=>{
              console.log(data.data)
              if (data.modifiedCount>0) {
                  Swal.fire({
                      title: "Good job!",
                      text: "Added User",
                      icon: "success"
                    });
              }

              
                e.target.reset()
               
          })
      })
            /* ------------------------------- using fetch ------------------------------ */
            // fetch('https://coffee-store-server-omega-seven.vercel.app/user/',{
            //     method:"PATCH",
            //     headers:{
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(user)
            // })
            // .then(res=>res.json())
            // .then(data=>{

            //     if (data.modifiedCount>0) {
            //         Swal.fire({
            //             title: "Good job!",
            //             text: "Added User",
            //             icon: "success"
            //           });
            //     }

                
            //       e.target.reset()
                 
            // })
        // })
        // .catch(err=>{
         
        // })
        
        
    }
    return (
            <div className='flex justify-center items-center h-screen'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSignIn} className="card-body">
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
            <p>create a account <NavLink to='/signUp' className='text-blue-600'>Sign UP</NavLink></p>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary text-white">Sign in</button>
        </div>
      </form>
    </div>
        </div>
    );
};

export default SignIn;