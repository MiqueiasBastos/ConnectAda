/**
 * A entidade `Usuario` deve ser capaz de:

- Autenticar um usuário (verificar se nome de usuário e senha estão corretos);
- Adicionar outro usuário à lista de amigos;
- Remover outro usuário da lista de amigos;
- Criar uma postagem;
- Comentar uma postagem;
 */

import md5 from "../libs/md5.js";

export class Usuario {
  #estaAutenticado = false;
  #nomeCompleto;
  #senha;
  #usuario;
  #github;
  #amigos = [];
  static listaUsuarios = [];

  constructor({ nomeCompleto, senha, usuario, github = "" }) {
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

  static logar(usuario, senha) {
    const index = Usuario.listaUsuarios.findIndex((usuarioCadastrado) => {
      return usuarioCadastrado.usuario === usuario;
    });

    if (index === -1) throw new Error("Usuário não encontrado");

    return Usuario.listaUsuarios[index].autenticar(usuario, senha);
  }

  autenticar(usuario, senha) {
    if (usuario !== this.#usuario || md5(senha) !== this.#senha) {
      throw new Error("Usuário e/ou senha inválidos");
    }

    this.#estaAutenticado = true;

    return this;
  }

  desconectar() {
    this.#estaAutenticado = false;
  }

  adicionarAmigo(usuario) {
    this.#amigos.push(usuario);
  }

  removerAmigo(usuario) {
    const index = this.#amigos.indexOf(usuario);
    this.#amigos.splice(index, 1);
  }

  criarPostagem(texto) {
    if (!this.#estaAutenticado) {
      throw new Error("Usuário não está autorizado");
    }
    new Postagem({
      autor: this,
      texto,
    });
  }

  removerPostagem(postagem) {
    if (!this.#estaAutenticado) {
      throw new Error("Usuário não está autorizado");
    }
    const index = Postagem.listaPostagens.indexOf(postagem);
    Postagem.listaPostagens.splice(index, 1);
  }

  comentarPostagem(postagem, texto) {
    if (!this.#estaAutenticado) {
      throw new Error("Usuário não autorizado");
    }
    postagem.adicionarComentario(texto, this);
  }

  get usuario() {
    return this.#usuario;
  }
  get estaAutenticado() {
    return this.#estaAutenticado;
  }
}
