export function getToken() {
  const token = JSON.parse(localStorage.getItem('token'))
  return token === null ? '' : token
}
