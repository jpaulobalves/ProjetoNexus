import http from 'k6/http';

export function authenticate(token) {
  let headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return headers;
}
