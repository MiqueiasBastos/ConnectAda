class Postagem {
    #autor;
    #texto;
    #data;
    #comentarios = [];
    static listaPostagens = [];

    constructor({ autor, texto }) {
        this.#autor = autor;
        this.#texto = texto;
        this.#data = Date.now();

        Postagem.listaPostagens.push(this);
        Postagem.listaPostagens.sort((a, b) => { return b.data - a.data });
    }

    get data() {
        return this.#data
    }

}