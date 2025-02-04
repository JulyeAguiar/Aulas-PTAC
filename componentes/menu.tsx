import {Usuario} from "../interfaces/interfaces"

type MenuProps ={
    user: Usuario
}

export function Menu ({user}: MenuProps){
    return(
        <div>
            <div>
                <img src="https://github.com/JulyeAguiar.png" alt="Ususario"/>
            </div>
            <h2>{user.nome}</h2>
        </div>
    )
}