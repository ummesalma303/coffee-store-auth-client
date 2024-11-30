import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const User = () => {
    const loadedUsers= useLoaderData()
    // console.log(users)

    const [users,setUser]=useState(loadedUsers)
    console.log(users)
    const deleteUser=(id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {


                fetch(`http://localhost:5000/user/${id}`,{
                    method:"DELETE"
                })
                .then(res=>res.json())
                .then(data=>{
                    // console.log(data)
                      Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success"
              });

              const remaining = users.filter(user=>user._id !== id)
              setUser(remaining)
                })
            
            }
          });
    }




   
    return (
        <div className='py-16'>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>email</th>
        <th>time</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((user,i)=><tr key={user._id}>
            <th>{i}</th>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.leastLoginTime}</td>
            <td><button className='btn'>Edit</button> <button onClick={()=>deleteUser(user?._id)} className='btn'>Delete</button></td>
          </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default User;