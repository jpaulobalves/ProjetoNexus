import http from "k6/http";
import { sleep } from "k6";

export let UserId;

export default function PostUserSuccess() {

  const token = '53aca372c5abf69bf30554143c2ae29c04a394ddcee0647276a0343a61896438';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };


  const data = {
    "name": "JotaPe Teste 121",
    "gender": "male",
    "email": "testu11111@gmail.com",
    "status": "active"
  };

  // Enviar a solicitação POST com o cabeçalho HTTP Authorization e o corpo da solicitação em formato JSON
  const res = http.post('https://gorest.co.in/public/v2/users', JSON.stringify(data), { headers });

  if (res.status === 201) {
    console.log('Solicitação POST bem-sucedida');
    UserId = JSON.parse(res.body).id;
    console.log(`${UserId}`)

  } else {
    console.log(`Erro na solicitação POST: ${res.status} ${res.body}`);
  }

  sleep(1)
}


