import http from "k6/http";
import { sleep } from "k6";
import { Trend, Rate, Counter } from "k6/metrics"
import { check, fail } from "k6";
import { UserId } from "./PostUserSucess";

export let GetUserDuration = new Trend('get_user_duration');
export let GetUserFailRate = new Rate('get_user_fail_rate');
export let GetUserSuccessRate = new Rate('get_user_success_rate');
export let GetUserReqs = new Rate('get_user_reqs');


export default function () {   
    const token = '53aca372c5abf69bf30554143c2ae29c04a394ddcee0647276a0343a61896438';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };



    let id = UserId;
    let res = http.get(`https://gorest.co.in/public/v2/users/${id}`,  { headers })

    console.log(res)

    GetUserDuration.add(res.timings.duration);
    GetUserReqs.add(1);
    GetUserFailRate.add(res.status == 0 || res.status > 399);
    GetUserSuccessRate.add(res.status < 399);

    let durationMsg = 'Max Duration ${10000/10000}s'
    if(!check(res,{
        'max duration': (r) => r.timings.duration < 5000,
    })){
        fail(durationMsg);
    }

    sleep(1);
}