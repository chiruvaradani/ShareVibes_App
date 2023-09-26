import axios from "axios"
import Client from "./Client";

export const generateToken=async(userData)=>{
    try{
        console.log('In Api call');
        fetch('http://10.217.38.34:4200/generateToken', userData).then((res)=>{
            console.log(res);
        })
    //    const response = await Client.post('/generateToken',userData)
    //    console.log(response);
    }catch(err){
        console.log('error');
    }
}
