/**
 * A entidade `Usuario` deve ser capaz de:

- Autenticar um usuário (verificar se nome de usuário e senha estão corretos);
- Adicionar outro usuário à lista de amigos;
- Remover outro usuário da lista de amigos;
- Criar uma postagem;
- Comentar uma postagem;
 */

import md5 from "./libs/md5.js";

class Usuario{
    #estaAutenticado = false;
    #nomeCompleto;
    #senha;
    #usuario;
    #github;
    #amigos = [];

    constructor({nomeCompleto, senha, usuario, github}){
        this.#nomeCompleto = nomeCompleto
        this.#senha = md5(senha)
        this.#usuario = usuario
        this.#github = github
    }


}
