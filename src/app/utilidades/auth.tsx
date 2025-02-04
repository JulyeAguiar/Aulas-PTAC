import { cookies } from "next/headers";
import Usuario from "../../../interfaces/usuario";
import { ApiURL } from "../../../config";


export async function fetchUser():Promise<Usuario | null>{
    try{
        const cookieStored = await cookies()
        const token = cookieStored.get('restaurant-token')
        const res = await fetch(`${ApiURL}/usuario`, {
            method: 'GET',
            headers:{'Autorization' : `Bearer: ${token?.value}`}
        })
        const data = await res.json()
        return data.usuario
    }
    catch (error){
        return null
    }

}