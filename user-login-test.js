import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3,
  duration: '1m',
};

export default () => {
  const username = `user${Math.floor(Math.random() * 1000)}`;
  const password = 'testPassword123';
  const url = `https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`;

  const res = http.get(url);

  check(res, { 'status returned 200': (r) => r.status === 200 });

  sleep(1);
};