import http from "k6/http";
import { sleep, check } from "k6";
import { UserId } from "./PostUserSucess1.js";
import Authorization from "../utils/Autorizacao.js";

export default function PutUser() {


  const data = {
    "name": "JotaPe Desafio Alterado",
    "gender": "male",
    "email": "jotapedesafioalterado@nexus.com",
    "status": "active"
  };

    let headers = Authorization();
    let id = UserId;
    const res = http.put(`https://gorest.co.in/public/v2/users/${id}`, JSON.stringify(data), { headers });

  if (res.status === 200) {
    console.log('Alteração via Put ✓');
    
  check(res, {
    "status is 200": (r) => r.status === 200,
    'Validar o nome alterado': (r) => JSON.parse(r.body).name === `JotaPe Desafio Alterado`,
    'Validar o gênero alterado': (r) => JSON.parse(r.body).gender === `male`,
    'Validar o Email alterado': (r) => JSON.parse(r.body).email === `jotapedesafioalterado@nexus.com`,
    'Validar o status alterado': (r) => JSON.parse(r.body).status === `active`,
  });


  } else {
    console.log(`Erro na solicitação Put: ${res.status} ${res.body}`);
  }

  sleep(1)
}


