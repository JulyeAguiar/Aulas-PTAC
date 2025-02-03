
type TituloProp = {
    titulo: string
};

const Titulo: React.FC<TituloProp> = ({ titulo }) => {
    return (
        
        <h1 className="titulo">{titulo}</h1>
    )
}

export default Titulo