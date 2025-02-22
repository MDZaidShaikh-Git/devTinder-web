import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addConnection } from '../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'

const Connections = () => {

    const connections = useSelector((store)=>store.connection)
    const dispatch = useDispatch()

    const fetchConnections = async()=>{
        try {
            const response = await axios.get(BASE_URL+'/user/connection',{withCredentials:true})
            console.log('Connections',response.data.data)
            dispatch(addConnection(response.data.data))
        } catch (error) {
            console.log(error)   
        }
    }

    useEffect(()=>{
        fetchConnections()
    },[])

    if(!connections) return;
    if(connections.length===0) return <div className='flex justify-center my-10'><h1>No Connections</h1></div>
    
  return (
    <div className='text-center my-10'>
        <h1 className="text-bold text-4xl">Connections</h1>

        {connections.map((connection)=>{

            const {firstName, lastName, gender, photoUrl, skills, about, age } = connection;

            return(
                <div className='flex m-4 p-4 rounded-lg border bg-base-200 max-w-2xl mx-auto'>
                    <div>
                        <img alt="photo" className='w-20 h-20 rounded-full' src={photoUrl}/>
                    </div>
                    <div className="text-left ml-4 ">
                        <h2 className='text-xl'><b>{firstName+ " "+ lastName}</b></h2>
                       {age && gender && <p>{age+" "+ gender}</p> }
                        <p>{about}</p>
                        <p>{skills}</p>
                    </div>
                </div>
            )
            
        })}
    </div>
  )
}

export default Connections