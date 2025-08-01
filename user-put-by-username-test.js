import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '1m', // This can be shorter or just a few iterations
};

export default () => {
  const username = `user${Math.floor(Math.random() * 1000)}`;
  const url = `https://petstore.swagger.io/v2/user/${username}`;
  const payload = JSON.stringify({
    id: Math.floor(Math.random() * 10000),
    username: username,
    firstName: 'Updated',
    lastName: 'User',
    email: `updated${Math.floor(Math.random() * 1000)}@example.com`,
    password: 'newPassword123',
    phone: '+1234567890',
    userStatus: 1
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const urlRes = http.put(url, payload, params);
  check(urlRes, { 'status returned 200': (r) => r.status === 200 });
  sleep(1);
};
