import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const SignIn = (id) => {

    const {signInUser}=useContext(AuthContext)
    // console.log(signInUser)
    const handleSignIn=e=>{
        e.preventDefault()
        const email =e.target.email.value
        const password =e.target.password.value
        console.log(email,password)

        signInUser(email,password)
        .then(res=>{
            // console.log(res.user)
            // console.log(res.user.metadata?.lastSignInTime)
            const leastLoginTime =res.user.metadata?.lastSignInTime
            const user= {email,password,leastLoginTime}

            // update last login time
            fetch('http://localhost:5000/user/',{
                method:"PATCH",
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res=>res.json())
            .then(data=>{

                if (data.modifiedCount>0) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Added User",
                        icon: "success"
                      });
                }

                
                  e.target.reset()
                console.log(data)
            })
        })
        .catch(err=>{
          console.log(err.message)
        })
        // createUser(email,password)
        // .then(res=>{
        //   console.log(res?.user)

        //   const user={name,email}
        //   console.log(user)
        //   fetch('http://localhost:5000/user',{
        //     method:"POST",
        //     headers:{
        //       'content-type':"application/json"
        //     },
        //     body:JSON.stringify(user)
        //   })
        //   .then(res=>res.json())
        //   .then(data=>{
        //     if(data.insertedId){
        //       Swal.fire({
        //         title: "Good job!",
        //         text: "Added User",
        //         icon: "success"
        //       });
        //       e.target.reset()
        //     }
        //     console.log(data)
        //   })



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
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary text-white">Sign in</button>
        </div>
      </form>
    </div>
        </div>
    );
};

export default SignIn;