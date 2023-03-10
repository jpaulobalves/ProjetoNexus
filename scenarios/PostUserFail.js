import http from "k6/http";
import { sleep } from "k6";
import { Trend, Rate, Counter } from "k6/metrics"
import { check, fail } from "k6";

export let PostFailDuration = new Trend('Post_Fail_Duration');
export let PostFailRate = new Rate('Post_Fail_Rate');
export let PostFailSuccess = new Rate('Post_Fail_Success');

export default function PostUserFail() {

  const token = '53aca372c5abf69bf30554143c2ae29c04a394ddcee0647276a0343a61896438';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };


  const data = {
    "name": "",
    "gender": "male",
    "email": "",
    "status": "active"
  };

  // Enviar a solicitação POST com o cabeçalho HTTP Authorization e o corpo da solicitação em formato JSON
  const res = http.post('https://gorest.co.in/public/v2/users', JSON.stringify(data), { headers });


  if (res.status === 422) {
    console.log('Validação negativa ok');
  } 

  PostFailDuration.add(res.timings.duration);
  PostFailRate.add(res.status != 422);
  PostFailSuccess.add(res.status == 422);

  let durationMsg = 'Max Duration ${10000/10000}s'
  if(!check(res,{
      'max duration': (r) => r.timings.duration < 5000,
  })){
      fail(durationMsg);
  }


  sleep(1)
}


