import { Usuario } from "./classe/Usuario.class.js";
import { Postagem } from "./classe/Postagem.class.js";
import { Comentario } from "./classe/Comentario.class.js";
import { Administrador } from "./classe/Administrador.class.js";

new Usuario({
  nomeCompleto: "Aline Pereira",
  senha: "12345",
  usuario: "alinepereira",
  github: "pereiraaline",
});

let usuarioSessao;
let ehAdministrador;

const formLogin = document.querySelector("#form-login");

formLogin.onsubmit = (event) => {
  event.preventDefault();
  const form = new FormData(formLogin); // cria instancia de formulario a partir do elemento html
  const usuario = form.get("usuario");
  const senha = form.get("senha");

  try {
    usuarioSessao = Usuario.logar(usuario, senha);
    ehAdministrador = usuarioSessao instanceof Administrador;
    formLogin.reset();
    renderizarFeed();
    mudarTela('feed');

  } catch (error) {
    alert(error.message);
  }

};

const formCadastro = document.querySelector("#form-cadastro");

formCadastro.onsubmit = (event) => {
  event.preventDefault();
  const form = new FormData(formCadastro);
  const nomeCompleto = form.get("nome-completo");
  const usuario = form.get("usuario");
  const senha = form.get("senha");
  const github = form.get("usuario-github");

  usuarioSessao = new Usuario({ nomeCompleto: nomeCompleto, usuario: usuario, senha: senha, github: github });
  usuarioSessao.autenticar(usuario, senha);
  ehAdministrador = false;
  formCadastro.reset();

  const modal = bootstrap.Modal.getInstance(document.querySelector("#modal-cadastro"));
  modal.hide();

  renderizarFeed();
  mudarTela('feed');
}

const formPublicar = document.querySelector("#form-publicar");
formPublicar.onsubmit = (event) => {
  event.preventDefault();
  const form = new FormData(formPublicar);
  const descricao = form.get("descricao");

  new Postagem({
    autor: usuarioSessao,
    texto: descricao,
  })

  formPublicar.reset();
  renderizarFeed();
  console.log(Postagem.listaPostagens);
}
const modalEditarPostagem = document.querySelector("#modal-editar-postagem");

modalEditarPostagem.addEventListener("show.bs.modal", (event) => {
  const botaoModal = event.relatedTarget;
  const indicePostagem = botaoModal.getAttribute("data-bs-id");

  const postagem = Postagem.listaPostagens[indicePostagem];

  const inputDescricao = modalEditarPostagem.querySelector(".modal-body input");
  const botaoSalvar = modalEditarPostagem.querySelector(".modal-body  button");

  inputDescricao.value = postagem.texto;

  botaoSalvar.onclick = function (event) {
      event.preventDefault();
      postagem.modificarTexto(inputDescricao.value);

      const modal = bootstrap.Modal.getInstance(modalEditarPostagem);
      modal.hide();
      renderizarFeed();
  };
});

const mudarTela = (tela) => {

  const telaLogin = document.querySelector('#tela-login');
  const telaFeed = document.querySelector('#tela-feed');

  telaLogin.classList.replace('d-flex', 'd-none');
  telaFeed.classList.replace('d-flex', 'd-none');

  switch (tela) {
    case 'login':
      telaLogin.classList.replace('d-none', 'd-flex');
      break;

    case 'feed':
      telaFeed.classList.replace('d-none', 'd-flex');
      break;

    default:
      telaLogin.classList.replace('d-none', 'd-flex');
      break;
  }
}

const renderizarFeed = () => {
  const saudacao = document.querySelector('#header-saudacao');
  saudacao.innerHTML = `Olá, ${usuarioSessao.nomeCompleto}`;

  const imagensPerfil = [
    document.querySelector('#postagem-imagem-perfil'),
    document.querySelector('#header-imagem-perfil')
  ];

  imagensPerfil.forEach((imagem) => {
    imagem.src = usuarioSessao.imagemPerfil
  })

  const listaPostagens = document.querySelector('#postagens')
  const cardsPostagens = Postagem.listaPostagens.map((postagem, index) => {
    return postagem.renderizarCard(usuarioSessao, index)
  }) 
  listaPostagens.innerHTML = cardsPostagens.join('')

}

function adicionarComentario(event) {
  event.preventDefault();
  const indicePostagem = event.target.getAttribute('data-indicePostagem')
  const input = event.target.querySelector('input')
  const postagem = Postagem.listaPostagens[indicePostagem]
  postagem.adicionarComentario(input.value, usuarioSessao)

  renderizarFeed()
}

function apagarComentario(indicePostagem, indiceComentario){
  const postagem = Postagem.listaPostagens[indicePostagem]
  const comentario = postagem.comentarios[indiceComentario]
  postagem.removerComentario(comentario)
  
  renderizarFeed()
}

function apagarPostagem(indicePostagem){
  const postagem = Postagem.listaPostagens[indicePostagem]

  usuarioSessao.removerPostagem(postagem)
  renderizarFeed()
}

window.adicionarComentario = adicionarComentario
window.apagarComentario = apagarComentario
window.apagarPostagem = apagarPostagem

