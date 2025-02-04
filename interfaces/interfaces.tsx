export interface Usuario{
    id?: number,
    nome: string,
    email: string,
    tipo?: 'cliente' | 'adm'
}

export default Usuario