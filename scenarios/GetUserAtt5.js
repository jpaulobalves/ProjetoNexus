import http from "k6/http";
import { sleep, check } from "k6";
import { UserId } from "./PostUserSucess1.js";

export default function () {   
    const token = '4d544428f97b222e8f78b9112861201540c747a042aba95c5e04ea0a8f08ca97';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    let id = UserId;
    let res = http.get(`https://gorest.co.in/public/v2/users/${id}`,  { headers })

    console.log(res.body)

    check(res, {
        "status is 204": (r) => r.status === 200,
        'Validar o nome incluído': (r) => JSON.parse(r.body).name === `JotaPe Desafio Alterado`,
        'Validar o gênero incluído': (r) => JSON.parse(r.body).gender === `male`,
        'Validar o Email incluído': (r) => JSON.parse(r.body).email === `jotapedesafioalterado@nexus.com`,
        'Validar o status incluído': (r) => JSON.parse(r.body).status === `active`,
      });


    sleep(1);
}