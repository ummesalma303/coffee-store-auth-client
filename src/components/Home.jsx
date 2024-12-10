import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Coffee from './Coffee';
// import { useQuery } from '@tanstack/react-query';

const Home = () => {

    const coffees = useLoaderData();
    // const {isPending,data:coffees}=useQuery({
    //     queryKey:[coffees],
    //     queryFn: async()=>{
    //         const res = await fetch('https://coffee-store-server-omega-seven.vercel.app/coffee')
    //         return res.json()
    //     }
    // })

    // if (isPending) {
    //     return <div className="flex justify-center items-center"> <span className="loading loading-spinner text-primary"></span></div>
    // }

    // better use tanstack query or similar packages
    const [loadedCoffees, setLoadedCoffees] = useState(coffees);

    return (
        <div>
            <h2>Welcome Coffee home: {loadedCoffees.length}</h2>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {
                    loadedCoffees.map(coffee => <Coffee
                        coffee={coffee}
                        loadedCoffees={loadedCoffees}
                        setLoadedCoffees={setLoadedCoffees}
                        key={coffee._id}
                    ></Coffee>)
                }
            </div>
        </div>
    );
};

export default Home;