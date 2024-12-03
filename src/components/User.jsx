import React, { useState } from 'react';
import { IoCheckmarkDoneSharp, IoCheckmarkOutline } from 'react-icons/io5';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const User = () => {
    const loadedUsers= useLoaderData()
  const isCompleted = false;
    const [users,setUser]=useState(loadedUsers)
   
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


                fetch(`https://coffee-store-server-omega-seven.vercel.app/user/${id}`,{
                    method:"DELETE"
                })
                .then(res=>res.json())
                .then(data=>{
                  
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
        <div className="text-center my-3">
        <input type="text" className='border-2 w-1/2 p-3 rounded-lg' placeholder='search.....' />
      </div>
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
            <th>{i +1}</th>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.leastLoginTime}</td>
          <td className='space-x-4'><button className='btn'>Edit</button>
            <button onClick={() => deleteUser(user?._id)} className='btn'>Delete</button>
            <button type="button" className='btn'>{ isCompleted?<IoCheckmarkDoneSharp />:<IoCheckmarkOutline />}</button>
          </td>
          </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default User;