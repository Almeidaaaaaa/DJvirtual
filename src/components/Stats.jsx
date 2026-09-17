function Stats({ livros }) {

    const total = livros.length;

    const lidos = livros.filter(
        (livro) => livro.status === true
    ).length;

    const naoLidos = total - lidos;

    return (
        <section className="stats">

            <div className="stat-card">
                <div className="stat-icon">📚</div>

                <div>
                    <span>Total de livros</span>
                    <strong>{total}</strong>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon">✅</div>

                <div>
                    <span>Livros lidos</span>
                    <strong>{lidos}</strong>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon">📖</div>

                <div>
                    <span>Não lidos</span>
                    <strong>{naoLidos}</strong>
                </div>
            </div>

        </section>
    );
}

export default Stats;