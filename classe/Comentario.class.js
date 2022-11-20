export class Comentario {
    #autor;
    #texto;

    constructor({ autor, texto }) {
        this.#autor = autor;
        this.#texto = texto;
    }
}