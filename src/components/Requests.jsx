import React from 'react'
import { BASE_URL } from '../utils/constants'
import { addRequest, removeRequest } from '../utils/requestSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
const Requests = () => {

  
    const requests = useSelector((store)=>store.request)
    console.log("REQUESTS",requests)
    const dispatch = useDispatch();

    const fetchRequests = async()=>{
        try {
            const response = await axios.get(BASE_URL+'/user/requests/received',{withCredentials:true})
            console.log('Requests',response.data.data)
            dispatch(addRequest(response.data.data))
        } catch (error) {
            console.log("Error getting requests: ",error)
        }
    }

    const handleReview = async(status, _id)=>{
        try {

            const response = await axios.post(BASE_URL + '/request/review/'+ status+"/"+ _id,{}, {withCredentials:true});
            dispatch(removeRequest(_id))
        } catch (error) {
            console.log("Error reviewing request: ",error)
        }
    }

    useEffect(()=>{
        fetchRequests()
    },[])

    if(!requests) return;

    if(requests?.length===0) return <div className='flex justify-center my-10'><h1 className='flex justify-center my-10'>No Requests</h1></div>
    return (
        <div className='text-center my-10'>
            <h1 className="text-bold text-4xl">Requests Received</h1>
    
            {requests?.map((request)=>{
    
                const {_id,firstName, lastName, gender, photoUrl, skills, about, age } = request.fromUserId;
    
                return(
                    <div key={_id} className='justify-between items-center flex m-4 p-4 rounded-lg border bg-base-200 w-full mx-auto'>
                        <div>
                            <img alt="photo" className='w-20 h-20 rounded-full' src={photoUrl}/>
                        </div>
                        <div className="text-left ml-4 ">
                            <h2 className='text-xl'><b>{firstName+ " "+ lastName}</b></h2>
                           {age && gender && <p>{age+" "+ gender}</p> }
                            <p className='max w-50'>{about}</p>
                            <p>{skills}</p>
                        </div>
                        <div>
                        <button className="btn btn-primary m-2" onClick={()=>handleReview("accepted",request._id)}>Accept</button>
                        {/* {console.log("_id",_id)};
                        {console.log("request._id",request._id)}; */}
                        <button className="btn btn-secondary m-2" onClick={()=>handleReview("rejected",request._id)}>Reject</button>
                        </div>
                    </div>
                )
                
            })}
        </div>
      )
}

export default Requests