/**
 * A entidade `Usuario` deve ser capaz de:

- Autenticar um usuário (verificar se nome de usuário e senha estão corretos);
- Adicionar outro usuário à lista de amigos;
- Remover outro usuário da lista de amigos;
- Criar uma postagem;
- Comentar uma postagem;
 */

import md5 from "./libs/md5.js";

class Usuario {
  #estaAutenticado = false;
  #nomeCompleto;
  #senha;
  #usuario;
  #github;
  #amigos = [];
  static listaUsuarios = [];

  constructor({ nomeCompleto, senha, usuario, github }) {
    if (
      Usuario.listaUsuarios.findIndex((usuarioCadastrado) => {
        return usuarioCadastrado.usuario === usuario;
      }) !== -1
    ) {
      throw new Error("Usuário já cadastrado!");
    }

    this.#nomeCompleto = nomeCompleto;
    this.#senha = md5(senha);
    this.#usuario = usuario;
    this.#github = github;

    Usuario.listaUsuarios.push(this);
  }

  autenticar(usuario, senha) {
    if (usuario !== this.#usuario || md5(senha) !== this.#senha) {
      throw new Error("Usuário e/ou senha inválidos");
    }

    this.#estaAutenticado = true;
  }

  desconectar() {
    this.#estaAutenticado = false;
  }

  adicionarAmigo (usuario) {
    this.#amigos.push(usuario);
  }

  removerAmigo (usuario) {
    const index = this.#amigos.indexOf(usuario)
    this.#amigos.splice(index, 1);
}

  get usuario() {
    return this.#usuario;
  }
}
