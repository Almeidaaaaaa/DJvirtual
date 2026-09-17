function LivroCard({ livro, excluirLivro, editarLivro }) {

    return (
        <article className="livro-card">

            <div className="livro-capa">
                📚
            </div>

            <div className="livro-info">

                <div className="livro-status">
                    {livro.status ? "✓ Lido" : "○ Não lido"}
                </div>

                <h3>{livro.nome}</h3>

                <p className="autor">
                    {livro.autor}
                </p>

                <div className="livro-detalhes">
                    <span>{livro.genero}</span>
                    <span>{livro.qtpagina} páginas</span>
                </div>

                <div className="card-buttons">

                    <button
                        className="btn-editar"
                        onClick={() => editarLivro(livro)}
                    >
                        ✏️ Editar
                    </button>

                    <button
                        className="btn-excluir"
                        onClick={() => excluirLivro(livro.id)}
                    >
                        🗑 Excluir
                    </button>

                </div>

            </div>

        </article>
    );
}

export default LivroCard;