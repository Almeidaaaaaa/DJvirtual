import { useEffect, useState } from "react";

import Header from "./components/Header";
import Stats from "./components/Stats";
import LivroCard from "./components/LivroCard";
import LivroForm from "./components/LivroForm";

import "./App.css";


// URL da API Django
const API_URL = "http://127.0.0.1:8000/api/livros/";


function App() {

  
    const [livros, setLivros] = useState([]);

    
    const [busca, setBusca] = useState("");

    
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    
    const [livroEditando, setLivroEditando] = useState(null);

    
    const [carregando, setCarregando] = useState(true);


    // =====================================================
    // BUSCAR LIVROS
    // =====================================================

    useEffect(() => {

        buscarLivros();

    }, []);


    async function buscarLivros() {

        try {

            setCarregando(true);

            const resposta = await fetch(API_URL);

            if (!resposta.ok) {
                throw new Error("Erro ao buscar livros");
            }

            const dados = await resposta.json();

            setLivros(dados);

        } catch (erro) {

            console.error("Erro ao buscar livros:", erro);

        } finally {

            setCarregando(false);

        }
    }


    // =====================================================
    // ABRIR FORMULÁRIO PARA NOVO LIVRO
    // =====================================================

    function abrirNovoLivro() {

      
        setLivroEditando(null);

        
        setMostrarFormulario(true);
    }


    // =====================================================
    // CADASTRAR LIVRO
    // =====================================================

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


            
            setLivros((livrosAtuais) => [

                ...livrosAtuais, // ... pegue todos que jáexixtem 

                livroCriado

            ]);


           
            setMostrarFormulario(false);

           
            setLivroEditando(null);


        } catch (erro) {

            console.error("Erro ao cadastrar:", erro);

        }
    }


    // =====================================================
    // EXCLUIR LIVRO
    // =====================================================

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


           // deleta sem recarregar a página 
            setLivros((livrosAtuais) =>

                livrosAtuais.filter(
                    (livro) => livro.id !== id
                )

            );


        } catch (erro) {

            console.error("Erro ao excluir:", erro);

        }
    }


    // =====================================================
    // ABRIR EDIÇÃO DO LIVRO
    // =====================================================

    function editarLivro(livro) {

       
        setLivroEditando(livro);

     
        setMostrarFormulario(true);
    }


    // =====================================================
    // ATUALIZAR LIVRO
    // =====================================================

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


          
            setLivros((livrosAtuais) =>

                livrosAtuais.map((livro) =>

                    livro.id === id
                        ? livroAtualizadoApi
                        : livro

                )

            );


         
            setMostrarFormulario(false);

        
            setLivroEditando(null);


        } catch (erro) {

            console.error(
                "Erro ao atualizar livro:",
                erro
            );

        }
    }


    // =====================================================
    // FILTRO / PESQUISA
    // =====================================================

    const livrosFiltrados = livros.filter((livro) => {

        const texto = busca.toLowerCase();


        return (

            livro.nome.toLowerCase().includes(texto) ||

            livro.genero.toLowerCase().includes(texto) ||

            livro.autor.toLowerCase().includes(texto)

        );

    });


    // =====================================================
    // INTERFACE
    // =====================================================

    return (

        <div className="app">


            {/* HEADER */}

            <Header

                busca={busca}

                setBusca={setBusca}

                abrirFormulario={abrirNovoLivro}

            />


            <main className="container">


                {/* HERO */}

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


                {/* ESTATÍSTICAS */}

                <Stats livros={livros} />


                {/* CABEÇALHO DA LISTA */}

                <div className="lista-header">

                    <div>

                        <h2>
                            Minha biblioteca
                        </h2>


                        <p>

                            {livrosFiltrados.length}

                            {" "}

                            livro(s) encontrado(s)

                        </p>

                    </div>

                </div>


                {/* LISTA DOS LIVROS */}

                {carregando ? (

                    // CARREGANDO

                    <div className="mensagem">

                        Carregando livros...

                    </div>


                ) : livrosFiltrados.length === 0 ? (

                    // NENHUM LIVRO

                    <div className="mensagem">

                        <div className="mensagem-icon">
                            📚
                        </div>


                        <h3>
                            Esta página se perdeu em uma boa história e nunca mais voltou.
                        </h3>


                        <p>
                            Sistema fora do ar, verifique sua conexão e tente novamente.
                        </p>

                    </div>


                ) : (

                    // LIVROS

                    <div className="livros-grid">

                        {livrosFiltrados.map((livro) => (

                            <LivroCard

                                key={livro.id}

                                livro={livro}

                                excluirLivro={excluirLivro}

                                editarLivro={editarLivro}

                            />

                        ))}

                    </div>

                )}

            </main>


            {/* FORMULÁRIO */}

            {mostrarFormulario && (

                <LivroForm

                    fecharFormulario={() => {

                        setMostrarFormulario(false);

                        setLivroEditando(null);

                    }}

                    adicionarLivro={adicionarLivro}

                    atualizarLivro={atualizarLivro}

                    livroEditando={livroEditando}

                />

            )}

        </div>

    );

}


export default App;



export default App;
