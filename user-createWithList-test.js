import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3,
  duration: '1m',
};

export default () => {
  const url = 'https://petstore.swagger.io/v2/user/createWithList';
  const payload = JSON.stringify([
    {
      id: Math.floor(Math.random() * 10000),
      username: `user${Math.floor(Math.random() * 1000)}`,
      firstName: 'Test',
      lastName: 'User',
      email: `test${Math.floor(Math.random() * 1000)}@example.com`,
      password: 'testPassword123',
      phone: '+1234567890',
      userStatus: 1
    }
  ]);
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200 or default': (r) => r.status === 200 || r.status === 201,
    'no error in response': (r) => !r.body.includes('error')
  });

  sleep(1);
};