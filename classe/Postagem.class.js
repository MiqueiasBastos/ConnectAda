export class Postagem {
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

    adicionarComentario(texto, autor) {
        this.#comentarios.push(new Comentario({
            texto,
            autor
        }))
    }

    removerComentario(comentario) {
        const index = this.#comentarios.indexOf(comentario);

        if(index !== -1){
            this.#comentarios.splice(index, 1);
        }
    }

    modificarTexto(texto){
        this.#texto = texto
    }


}