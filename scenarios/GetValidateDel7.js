import http from "k6/http";
import { sleep, check } from "k6";
import { UserId } from "./PostUserSucess1.js";
import Authorization from "../utils/Autorizacao.js";

export default function () {   
    let headers = Authorization();
    let id = UserId;
    let res = http.get(`https://gorest.co.in/public/v2/users/${id}`,  { headers })

      if (res.status === 404) {
        console.log('Get de usuário deletado ✓');
        console.log(res.body)

        check(res, {
          "status is 404": (r) => r.status === 404,
          'Validar a mensagem do retorno após apagar o usuário no passo anterior': (r) => JSON.parse(r.body).message === `Resource not found`,

          });
    
      } else {
        console.log(`Erro na solicitação Get: ${res.status} ${res.body}`);
      } 


    sleep(1);
}