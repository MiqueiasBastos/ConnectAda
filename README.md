# Projeto Final - Rede Social (Connect Ada)

## Objetivo

Desenvolver as entidades de uma rede social.

## Requisitos

A entidade `Usuario` deve ser capaz de:

- ok Autenticar um usuário (verificar se nome de usuário e senha estão corretos);
- ok Adicionar outro usuário à lista de amigos;
- ok Remover outro usuário da lista de amigos;
- ok Criar uma postagem;
- ok Comentar uma postagem;

A entidade `Postagem` deve ser capaz de:

- ok Apagar comentários;
- x Modificar o título
- ok Modificar a descrição;

A entidade `Administrador` deve ser uma especialização de `Usuario`. Apenas um administrador deve ser capaz de excluir um usuário.

## Obervações

- Podem criar os atributos que julgarem necessários para as entidades;
- Não precisam se limitar às entidades `Usuario`, `Administrador` e `Postagem` - se fizer sentido, podem criar outras!