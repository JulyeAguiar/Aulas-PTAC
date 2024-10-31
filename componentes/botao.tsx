type TituloProp ={
    titulo : string,
    numero : number,
    funcao: () => void

};

const Botao:React.FC<TituloProp> = ({funcao}) =>{
    return (  <button onClick={funcao}>Fazer login</button>)
}

export default Botao