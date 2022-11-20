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
    formLogin.reset();

  } catch (error) {
    alert(error.message);
  }

  
};
