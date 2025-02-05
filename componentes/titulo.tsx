import styles from "../css/navbar.module.css";
type TituloProp = {
    titulo: string
};

const Titulo: React.FC<TituloProp> = ({ titulo }) => {
    return (
        
        <h1 className={styles.titulog}>{titulo}</h1>
    )
}

export default Titulo