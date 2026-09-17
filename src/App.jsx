import { useEffect, useState } from "react";

import Header from "./components/Header";
import Stats from "./components/Stats";
import LivroCard from "./components/LivroCard";
import LivroForm from "./components/LivroForm";

import "./App.css";


const API_URL = "http://127.0.0.1:8000/api/livros/";


function App() {

    const [livros, setLivros] = useState([]);

    const [busca, setBusca] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [livroEditando, setLivroEditando] = useState(null);

    const [carregando, setCarregando] = useState(true);


    // Buscar livros na API
    useEffect(() => {

        buscarLivros();

    }, []);


    async function buscarLivros() {

        try {

            setCarregando(true);

            const resposta = await fetch(API_URL);

            const dados = await resposta.json();

            setLivros(dados);

        } catch (erro) {

            console.error("Erro ao buscar livros:", erro);

        } finally {

            setCarregando(false);

        }
    }


    // Cadastrar livro
    async function adicionarLivro(novoLivro) {

        try {

            const resposta = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(novoLivro)

            });

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar livro");
            }

            const livroCriado = await resposta.json();


            // Atualiza o estado sem recarregar a página
            setLivros((livrosAtuais) => [
                ...livrosAtuais,
                livroCriado
            ]);


            setMostrarFormulario(false);


        } catch (erro) {

            console.error("Erro ao cadastrar:", erro);

        }
    }


    // Excluir livro
    async function excluirLivro(id) {

        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este livro?"
        );

        if (!confirmar) {
            return;
        }


        try {

            const resposta = await fetch(
                `${API_URL}${id}/`,
                {
                    method: "DELETE"
                }
            );


            if (!resposta.ok) {
                throw new Error("Erro ao excluir livro");
            }


            // Remove do estado sem recarregar a página
            setLivros((livrosAtuais) =>
                livrosAtuais.filter(
                    (livro) => livro.id !== id
                )
            );


        } catch (erro) {

            console.error("Erro ao excluir:", erro);

        }
    }

    function editarLivro(livro) {

    setLivroEditando(livro);

    setMostrarFormulario(true);
}


async function atualizarLivro(id, livroAtualizado) {

    try {

        const resposta = await fetch(
            `${API_URL}${id}/`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(livroAtualizado)
            }
        );


        if (!resposta.ok) {
            throw new Error("Erro ao atualizar livro");
        }


        const livroAtualizadoApi = await resposta.json();


        // Atualiza somente o livro alterado
        setLivros((livrosAtuais) =>
            livrosAtuais.map((livro) =>
                livro.id === id
                    ? livroAtualizadoApi
                    : livro
            )
        );


        // Fecha o formulário
        setMostrarFormulario(false);

        // Limpa o livro em edição
        setLivroEditando(null);


    } catch (erro) {

        console.error(
            "Erro ao atualizar livro:",
            erro
        );

    }
}


    // Filtro da pesquisa
    const livrosFiltrados = livros.filter((livro) => {

        const texto = busca.toLowerCase();

        return (
            livro.nome.toLowerCase().includes(texto) ||
            livro.genero.toLowerCase().includes(texto) ||
            livro.autor.toLowerCase().includes(texto)
        );

    });


    return (

        <div className="app">

            <Header
                busca={busca}
                setBusca={setBusca}
                abrirFormulario={() => setMostrarFormulario(true)}
            />


            <main className="container">

                <section className="hero">

                    <div>

                        <span className="section-label">
                            BIBLIOTECA DE LIVROS
                        </span>

                        <h1>
                            Sua próxima
                            <span> leitura </span>
                            começa aqui
                        </h1>

                        <p>
                            Organize, acompanhe e descubra
                            seus livros em um só lugar.
                        </p>

                    </div>

                </section>


                <Stats livros={livros} />


                <div className="lista-header">

                    <div>
                        <h2>Minha biblioteca</h2>

                        <p>
                            {livrosFiltrados.length} livro(s)
                            encontrado(s)
                        </p>
                    </div>

                </div>


                {carregando ? (

                    <div className="mensagem">
                        Carregando livros...
                    </div>

                ) : livrosFiltrados.length === 0 ? (

                    <div className="mensagem">

                        <div className="mensagem-icon">
                            📚
                        </div>

                        <h3>
                            Nenhum livro encontrado
                        </h3>

                        <p>
                            Cadastre um livro ou tente outra pesquisa.
                        </p>

                    </div>

                ) : (

                    <div className="livros-grid">

                        {livrosFiltrados.map((livro) => (

                            <LivroCard
                                key={livro.id}
                                livro={livro}
                                excluirLivro={excluirLivro}
                            />

                        ))}

                    </div>

                )}

            </main>


            {mostrarFormulario && (

                <LivroForm
                    fecharFormulario={() =>
                        setMostrarFormulario(false)
                    }
                    adicionarLivro={adicionarLivro}
                />

            )}

        </div>
    );
}

export default App;
