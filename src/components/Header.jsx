function Header({ busca, setBusca, abrirFormulario }) {
    return (
        <header className="header">
            <div className="logo">
                <span className="logo-icon">📚</span>
                <span>DJvirtual</span>
            </div>

            <div className="search-box">
                <span>🔍</span>

                <input
                    type="text"
                    placeholder="Pesquisar livros por nome, gênero ou autor..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <button
                className="btn-novo"
                onClick={abrirFormulario}
            >
                + Novo Livro
            </button>
        </header>
    );
}

export default Header;