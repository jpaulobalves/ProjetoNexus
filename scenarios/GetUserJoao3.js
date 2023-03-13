import http from "k6/http";
import { sleep, check } from "k6";
import { UserId } from "./PostUserSucess1.js";
import Authorization from "../utils/Autorizacao.js";

export default function () {
    let headers = Authorization();
    let id = UserId;
    let res = http.get(`https://gorest.co.in/public/v2/users/${id}`, { headers })


    if (res.status === 200) {
      console.log('Get de usuário inicial ✓');
      console.log(res.body)
      check(res, {
        "status is 200": (r) => r.status === 200,
          'Validar o nome ': (r) => JSON.parse(r.body).name === `JotaPe Desafio Nexus`,
          'Validar o gênero ': (r) => JSON.parse(r.body).gender === `male`,
          'Validar o Email ': (r) => JSON.parse(r.body).email === `jotapedesafio@nexus.com`,
          'Validar o status ': (r) => JSON.parse(r.body).status === `active`,
        });
  
    } else {
      console.log(`Erro na solicitação POST: ${res.status} ${res.body}`);
    } 

    sleep(1);
}
