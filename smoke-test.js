import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '1m', // This can be shorter or just a few iterations
};

export default () => {
  const urlRes = http.get('https://quickpizza.grafana.com');
  check(urlRes, { 'status returned 200': (r) => r.status == 200 })
  sleep(1);
};