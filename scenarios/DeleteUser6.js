import http from "k6/http";
import { sleep, check } from "k6";
import { UserId } from "./PostUserSucess1.js";
import Authorization from "../utils/Autorizacao.js";

export default function () {   
    let headers = Authorization();
    let id = UserId;
    let res = http.del(`https://gorest.co.in/public/v2/users/${id}`, null ,{ headers })


    check(res, {
      "status is 204": (r) => r.status === 204,
    });

    if (res.status === 204) {
        console.log(`Usuário ${UserId} deletado com sucesso`);
    
    } else {
        console.log(`Erro na solicitação Delete: ${res.status} ${res.body}`);
        console.log(`Usuário ${UserId} não foi deletado`);
    }
    
    sleep(1);
}
