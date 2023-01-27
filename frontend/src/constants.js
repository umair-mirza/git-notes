//For OAuth Login Code - Header Component
const clientId = process.env.REACT_APP_CLIENT_ID
const redirectURI = process.env.REACT_APP_REDIRECT_URI
const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user%20gist&redirect_uri=${redirectURI}`

export { GITHUB_LOGIN_URL }
