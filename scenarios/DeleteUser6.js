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
    let res = http.del(`https://gorest.co.in/public/v2/users/${id}`,  { headers })

    console.log(res)

    check(res, {
      "status is 204": (r) => r.status === 204,
    });

    if (res.status === 204) {
        console.log(`Usuário ${UserId} deletado com sucesso`);
    
    } else {
        console.log(`Erro na solicitação Delete: ${res.status} ${res.body}`);
        console.log(res.body)
        console.log(`Usuário ${UserId} não foi deletado`);
    }
    
    sleep(1);
}
