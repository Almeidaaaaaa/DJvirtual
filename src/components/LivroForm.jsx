import { useEffect, useState } from "react";


function LivroForm({
    fecharFormulario,
    adicionarLivro,
    atualizarLivro,
    livroEditando
}) {


    // =====================================================
    // ESTADOS DO FORMULÁRIO
    // =====================================================

    const [nome, setNome] = useState("");

    const [genero, setGenero] = useState("");

    const [autor, setAutor] = useState("");

    const [qtpagina, setQtpagina] = useState("");

    const [status, setStatus] = useState(false);


    // =====================================================
    // PREENCHER FORMULÁRIO NA EDIÇÃO
    // =====================================================

    useEffect(() => {


        // Se existe um livro sendo editado
        if (livroEditando) {


            setNome(
                livroEditando.nome
            );


            setGenero(
                livroEditando.genero
            );


            setAutor(
                livroEditando.autor
            );


            setQtpagina(
                livroEditando.qtpagina
            );


            setStatus(
                livroEditando.status
            );


        } else {


            // Se não existe livro em edição,
            // limpa o formulário para novo cadastro

            setNome("");

            setGenero("");

            setAutor("");

            setQtpagina("");

            setStatus(false);

        }

    }, [livroEditando]);


    // =====================================================
    // ENVIAR FORMULÁRIO
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Objeto que será enviado para a API Django
        const livro = {

            nome: nome,

            genero: genero,

            autor: autor,

            qtpagina: Number(qtpagina),

            status: status

        };


        // =================================================
        // EDIÇÃO
        // =================================================

        if (livroEditando) {


            await atualizarLivro(

                livroEditando.id,

                livro

            );


        } else {


            // =================================================
            // NOVO CADASTRO
            // =================================================

            await adicionarLivro(livro);

        }

    };


    // =====================================================
    // INTERFACE
    // =====================================================

    return (

        <div className="modal-overlay">


            <div className="modal">


                {/* CABEÇALHO */}

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


                    {/* BOTÃO FECHAR */}

                    <button

                        type="button"

                        className="btn-fechar"

                        onClick={fecharFormulario}

                    >

                        ×

                    </button>


                </div>


                {/* FORMULÁRIO */}

                <form onSubmit={handleSubmit}>


                    {/* NOME */}

                    <label>
                        Nome do livro *
                    </label>


                    <input

                        type="text"

                        placeholder="Digite o nome do livro"

                        value={nome}

                        onChange={(e) =>
                            setNome(e.target.value)
                        }

                        required

                    />


                    {/* AUTOR */}

                    <label>
                        Autor *
                    </label>


                    <input

                        type="text"

                        placeholder="Digite o autor"

                        value={autor}

                        onChange={(e) =>
                            setAutor(e.target.value)
                        }

                        required

                    />


                    {/* GÊNERO + PÁGINAS */}

                    <div className="form-row">


                        {/* GÊNERO */}

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


                        {/* PÁGINAS */}

                        <div>

                            <label>
                                Páginas *
                            </label>


                            <input

                                type="number"

                                min="1"

                                placeholder="Ex: 300"

                                value={qtpagina}

                                onChange={(e) =>
                                    setQtpagina(e.target.value)
                                }

                                required

                            />

                        </div>


                    </div>


                    {/* STATUS */}

                    <label>
                        Status
                    </label>


                    <select

                        value={status}

                        onChange={(e) =>

                            setStatus(
                                e.target.value === "true"
                            )

                        }

                    >

                        <option value="false">
                            Não lido
                        </option>


                        <option value="true">
                            Lido
                        </option>

                    </select>


                    {/* BOTÕES */}

                    <div className="form-buttons">


                        {/* CANCELAR */}

                        <button

                            type="button"

                            className="btn-cancelar"

                            onClick={fecharFormulario}

                        >

                            Cancelar

                        </button>


                        {/* SALVAR */}

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
