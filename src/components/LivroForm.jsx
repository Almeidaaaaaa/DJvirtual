import { useEffect, useState } from "react";


function LivroForm({
    fecharFormulario,
    adicionarLivro,
    atualizarLivro,
    livroEditando
}) {

    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [autor, setAutor] = useState("");
    const [qtpagina, setQtpagina] = useState("");
    const [status, setStatus] = useState(false);


    // Preenche o formulário quando estamos editando
    useEffect(() => {

        if (livroEditando) {

            setNome(livroEditando.nome);
            setGenero(livroEditando.genero);
            setAutor(livroEditando.autor);
            setQtpagina(livroEditando.qtpagina);
            setStatus(livroEditando.status);

        } else {

            setNome("");
            setGenero("");
            setAutor("");
            setQtpagina("");
            setStatus(false);

        }

    }, [livroEditando]);


    const handleSubmit = async (e) => {

        e.preventDefault();


        const livro = {
            nome: nome,
            genero: genero,
            autor: autor,
            qtpagina: Number(qtpagina),
            status: status
        };


        if (livroEditando) {

            // Atualização
            await atualizarLivro(
                livroEditando.id,
                livro
            );

        } else {

            // Cadastro
            await adicionarLivro(livro);

        }
    };


    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <div>

                        <span className="modal-label">
                            {livroEditando
                                ? "EDITAR LIVRO"
                                : "NOVO LIVRO"
                            }
                        </span>

                        <h2>
                            {livroEditando
                                ? "Alterar livro"
                                : "Adicione um novo livro"
                            }
                        </h2>

                        <p>
                            {livroEditando
                                ? "Altere as informações do livro."
                                : "Preencha as informações para adicionar à sua biblioteca."
                            }
                        </p>

                    </div>

                    <button
                        className="btn-fechar"
                        onClick={fecharFormulario}
                    >
                        ×
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <label>
                        Nome do livro *
                    </label>

                    <input
                        type="text"
                        placeholder="Digite o nome do livro"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />


                    <label>
                        Autor *
                    </label>

                    <input
                        type="text"
                        placeholder="Digite o autor"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        required
                    />


                    <div className="form-row">

                        <div>

                            <label>
                                Gênero *
                            </label>

                            <input
                                type="text"
                                placeholder="Ex: Fantasia"
                                value={genero}
                                onChange={(e) =>
                                    setGenero(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div>

                            <label>
                                Páginas *
                            </label>

                            <input
                                type="number"
                                placeholder="Ex: 300"
                                value={qtpagina}
                                onChange={(e) =>
                                    setQtpagina(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>


                    <label>
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value === "true")
                        }
                    >

                        <option value="false">
                            Não lido
                        </option>

                        <option value="true">
                            Lido
                        </option>

                    </select>


                    <div className="form-buttons">

                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={fecharFormulario}
                        >
                            Cancelar
                        </button>


                        <button
                            type="submit"
                            className="btn-salvar"
                        >
                            {livroEditando
                                ? "💾 Salvar alterações"
                                : "💾 Salvar Livro"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default LivroForm;