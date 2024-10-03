
interface Usuario {
    id: number,
    nome: string,
    email: string,
    password: string,
    tipo: ("cliente"|"adm")
}


export default Usuario