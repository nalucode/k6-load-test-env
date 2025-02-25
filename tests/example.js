import http from 'k6/http';
import { sleep, check } from 'k6';


export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 200 },
    { duration: '2m', target: 200 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'],
    'http_req_failed': ['rate<0.01'],
  },
};

export default function () {

  const res1 = http.get('https://test.k6.io');
  check(res1, {
    'status é 200': (r) => r.status === 200,
  });


  const res2 = http.get('https://test.k6.io/news.php');
  check(res2, {
    'news retorna 200': (r) => r.status === 200,
  });


  const responses = http.batch([
    ['GET', 'https://test.k6.io'],
    ['GET', 'https://test.k6.io/pi.php'],
    ['GET', 'https://test.k6.io/flip_coin.php'],
  ]);
  check(responses[0], {
    'batch status 200': (r) => r.status === 200,
  });


  sleep(Math.random() * 1.5 + 0.5);
}