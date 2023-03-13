import http from "k6/http";
import { sleep, check } from "k6";
import { UserId } from "./PostUserSucess1.js";
import Authorization from "../utils/Autorizacao.js";

export default function () {   
    let headers = Authorization();
    let id = UserId;
    let res = http.get(`https://gorest.co.in/public/v2/users/${id}`,  { headers })

      if (res.status === 200) {
        console.log('Get de usuário inicial ✓');
        console.log(res.body)
        check(res, {
          "status is 200": (r) => r.status === 200,
          'Validar o nome trocado no passo anterior': (r) => JSON.parse(r.body).name === `JotaPe Desafio Alterado`,
          'Validar o gênero trocado no passo anterior': (r) => JSON.parse(r.body).gender === `male`,
          'Validar o Email trocado no passo anterior': (r) => JSON.parse(r.body).email === `jotapedesafioalterado@nexus.com`,
          'Validar o status trocado no passo anterior': (r) => JSON.parse(r.body).status === `active`,
          });
    
      } else {
        console.log(`Erro na solicitação POST: ${res.status} ${res.body}`);
      } 


    sleep(1);
}