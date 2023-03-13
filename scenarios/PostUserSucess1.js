import http from "k6/http";
import { sleep, check } from "k6";
import Authorization from "../utils/Autorizacao.js";

export let UserId;

export default function PostUserSuccess() {

  const data = {
    "name": "JotaPe Desafio Nexus",
    "gender": "male",
    "email": "jotapedesafio@nexus.com",
    "status": "active"
  };

  let headers = Authorization();
  const res = http.post('https://gorest.co.in/public/v2/users', JSON.stringify(data), { headers });

  if (res.status === 201) {
    console.log('Post - Criação de usuário ✓');
    UserId = JSON.parse(res.body).id;
  }

  else if (res.status === 422) {
    console.log('Há campos obrigatórios faltando ✓');

  } else {
    console.log(`Erro na solicitação POST: ${res.status} ${res.body}`);
  }

  check(res, {
    "status is 201": (r) => r.status === 201,
    'Validar o nome incluído': (r) => JSON.parse(r.body).name === `JotaPe Desafio Nexus`,
    'Validar o gênero incluído': (r) => JSON.parse(r.body).gender === `male`,
    'Validar o Email incluído': (r) => JSON.parse(r.body).email === `jotapedesafio@nexus.com`,
    'Validar o status incluído': (r) => JSON.parse(r.body).status === `active`,
  });

  sleep(1)
}


