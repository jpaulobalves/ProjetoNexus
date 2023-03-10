import { group, sleep } from "k6";
import GetUser from "./scenarios/GetUser.js";
import PostUserSuccess from "./scenarios/PostUserSucess.js";
import PostUserFail from "./scenarios/PostUserFail.js";
import GetUserJoao from "./scenarios/GetUserJoao.js";


export default () => {
    group('Endpoint Post User Success - Controller Consumer - gorest.co.in', () => {
        PostUserSuccess();
    }
    );

    group('Endpoint Get User - Controller Consumer - gorest.co.in', () => {
        GetUser();
    }
    );

    group('Endpoint Post User Fail - Controller Consumer - gorest.co.in', () => {
        PostUserFail();
    }
    );

    group('Endpoint GetuserJoão - Controller Consumer - gorest.co.in', () => {
        GetUserJoao();
    }
    );






    sleep(1);
}
