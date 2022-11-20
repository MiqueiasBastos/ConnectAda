import { Usuario } from "./classe/Usuario.class.js";
import { Postagem } from "./classe/Postagem.class.js";
import { Comentario } from "./classe/Comentario.class.js";
import { Administrador } from "./classe/Administrador.class.js";

new Usuario({
  nomeCompleto: "Aline Pereira",
  senha: "12345",
  usuario: "alinepereira",
  github: "github.com/pereiraaline",
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

    usuarioSessao = new Usuario({nomeCompleto: nomeCompleto, usuario: usuario, senha: senha, github: github});
    usuarioSessao.autenticar(usuario, senha);
    ehAdministrador = false;
    formCadastro.reset();
    console.log(usuarioSessao);
}
