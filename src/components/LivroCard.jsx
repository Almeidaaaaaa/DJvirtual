function LivroCard({
    livro,
    excluirLivro,
    editarLivro
}) {


    return (

        <article className="livro-card">


            {/* CAPA */}

            <div className="livro-capa">

                📚

            </div>


            {/* INFORMAÇÕES */}

            <div className="livro-info">


                {/* STATUS */}

                <div className="livro-status">

                    {livro.status

                        ? "✓ Lido"

                        : "○ Não lido"

                    }

                </div>


                {/* NOME */}

                <h3>
                    {livro.nome}
                </h3>


                {/* AUTOR */}

                <p className="autor">

                    {livro.autor}

                </p>


                {/* DETALHES */}

                <div className="livro-detalhes">


                    <span>

                        {livro.genero}

                    </span>


                    <span>

                        {livro.qtpagina} páginas

                    </span>


                </div>


                {/* BOTÕES */}

                <div className="card-buttons">


                    {/* EDITAR */}

                    <button

                        type="button"

                        className="btn-editar"

                        onClick={() =>
                            editarLivro(livro)
                        }

                    >

                        ✏️ Editar

                    </button>


                    {/* EXCLUIR */}

                    <button

                        type="button"

                        className="btn-excluir"

                        onClick={() =>
                            excluirLivro(livro.id)
                        }

                    >

                        🗑 Excluir

                    </button>


                </div>


            </div>


        </article>

    );

}


export default LivroCard;
