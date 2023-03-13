import http from "k6/http";
import { sleep, check } from "k6";


export let UserId;

export default function PostUserSuccess() {

  const token = '4d544428f97b222e8f78b9112861201540c747a042aba95c5e04ea0a8f08ca97';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };


  const data = {
    "name": "JotaPe Desafio Nexus",
    "gender": "male",
    "email": "jotapedesafio@nexus.com",
    "status": "active"
  };

  // Enviar a solicitação POST com o cabeçalho HTTP Authorization e o corpo da solicitação em formato JSON
  const res = http.post('https://gorest.co.in/public/v2/users', JSON.stringify(data), { headers });

  if (res.status === 201) {
    console.log('Solicitação POST bem-sucedida');
    UserId = JSON.parse(res.body).id;
    console.log(res.body)

  } else {
    console.log(`Erro na solicitação POST: ${res.status} ${res.body}`);
  }

  check(res, {
    'Validar o nome incluído': (r) => JSON.parse(r.body).name === `JotaPe Desafio Nexus`,
    'Validar o gênero incluído': (r) => JSON.parse(r.body).gender === `male`,
    'Validar o Email incluído': (r) => JSON.parse(r.body).email === `jotapedesafio@nexus.com`,
    'Validar o status incluído': (r) => JSON.parse(r.body).status === `active`,
  });

  sleep(1)
}


