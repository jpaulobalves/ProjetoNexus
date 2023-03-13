import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

export default function PostUserFail() {

  const token = '4d544428f97b222e8f78b9112861201540c747a042aba95c5e04ea0a8f08ca97';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };


  const data = {
    "name": "Teste email em branco",
    "gender": "male",
    "email": "",
    "status": "active"
  };

  // Enviar a solicitação POST com o cabeçalho HTTP Authorization e o corpo da solicitação em formato JSON
  const res = http.post('https://gorest.co.in/public/v2/users', JSON.stringify(data), { headers });


  if (res.status === 422) {
    console.log('Validação de email em branco');
    console.log(res)
    check(res, {
      "Status 422": (r) => r.status === 422,
      'Validar o gênero incluído': (r) => JSON.parse(r.body).message === `can't be blank`,

    });
  } 

  sleep(1)
}


