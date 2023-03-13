import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";
import Authorization from "../utils/Autorizacao.js";

export default function PostUserFail() {

  const data = {
    "name": "Teste email em branco",
    "gender": "male",
    "email": "",
    "status": "active"
  };

  let headers = Authorization();
  const res = http.post('https://gorest.co.in/public/v2/users', JSON.stringify(data), { headers });


  if (res.status === 422) {
    console.log('Validação de email em branco ✓');

    check(res, {
      "Status 422": (r) => r.status === 422
    });
  } else {
    console.log(`Erro na solicitação POST: ${res.status} ${res.body}`);
  } 

  sleep(1)
}


