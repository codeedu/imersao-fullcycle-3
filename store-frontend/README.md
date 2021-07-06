![Next.js](../img/nextjs.png)

# Imersão Full Stack & FullCycle 3.0 - Codebank - Front-end da loja

## Descrição

Repositório do front-end da loja (Code Store) feito com Next.js

**Importante**: A aplicação do Apache Kafka, Golang (codebank), back-end da loja deve estar rodando primeiro.

## Rodar a aplicação

### Configurar /etc/hosts

A comunicação entre as aplicações se dá de forma direta através da rede da máquina.
Para isto é necessário configurar um endereços que todos os containers Docker consigam acessar.

Acrescente no seu /etc/hosts (para Windows o caminho é C:\Windows\system32\drivers\etc\hosts):
```
127.0.0.1 host.docker.internal
```
Em todos os sistemas operacionais é necessário abrir o programa para editar o *hosts* como Administrator da máquina ou root.

Execute os comandos:

```
docker-compose up
```

Acessar http://localhost:3002/credit-cards.

### Para Windows 

Lembrar de instalar o WSL2 e Docker. Vejo o vídeo: [https://www.youtube.com/watch?v=j6ioaes03oY](https://www.youtube.com/watch?v=j6ioaes03oY) 

Siga o guia rápido de instalação: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 