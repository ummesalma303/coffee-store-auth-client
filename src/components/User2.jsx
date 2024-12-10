import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const User2 = () => {
    // const [users,setUser]=useState()
    // useEffect(()=>{
    //     fetch('https://coffee-store-server-omega-seven.vercel.app/user')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data)
    //     setUser(data)})
    // },[])

    const {isPending,isError,error,data: users}=useQuery({
        queryKey:["users"],
        queryFn: async()=>{
            const res = await fetch('https://coffee-store-server-omega-seven.vercel.app/user')
            return res.json()
        }
    })

    if(isPending){
        return <div className="flex justify-center items-center"> <span className="loading loading-spinner text-primary"></span></div>
    }else if(isError){
        return <p>{error.message}</p>
    }

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

            //   const remaining = users.filter(user=>user._id !== id)
            //   setUser(remaining)
                })
            
            }
          });
    }


    return (
        <div className='pb-16'>
        <div className="text-center my-4">
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
            {/* <button type="button" className='btn'>{ isCompleted?<IoCheckmarkDoneSharp />:<IoCheckmarkOutline />}</button> */}
          </td>
          </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default User2;