
type NavProp = {
    titulo: string
};

const Navbar: React.FC<NavProp> = () => {
    return (
        <nav className="navbar">
            <a href="/" className="logo">Pastiamo</a>
            <div className="links">
                <a href="/cadastrar">Cadastrar</a>
                <a href="/login">Login</a>
            </div>
        </nav>

            )
}

export default Navbar