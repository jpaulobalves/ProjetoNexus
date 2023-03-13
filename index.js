import { group, sleep } from "k6";
import PostUserSuccess from "./scenarios/PostUserSucess1.js";
import PostUserFail from "./scenarios/PostUserFail2.js";
import GetUserJoao from "./scenarios/GetUserJoao3.js";
import PutUser from "./scenarios/PutUser4.js";
import GetUserAtt from "./scenarios/GetUserAtt5.js";
import DeleteUser6 from "./scenarios/DeleteUser6.js";


export default () => {
    group('Post de criação de usuário - validação dos campos criados', () => {
        PostUserSuccess();
    }
    );

    group('Post faltando dados para validação', () => {
        PostUserFail();
    }
    );

    group('Get para obtenção de dados do post anterior', () => {
        GetUserJoao();
    }
    );

    
    group('Put de alteção de nome e email', () => {
        PutUser();
    }
    );
    
    group('Get para validação dos dados alterados', () => {
        GetUserAtt();
    }
    );

    group('Deletando o usuário do teste', () => {
        DeleteUser6();
    }
    );

    sleep(1);
}
