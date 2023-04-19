// const clientId = '138559359729fd67a790';
// const clientSecret = '8c9ce7c9e8d4c597e5cade45b958e92ff1085cf6';
// const scopes = 'repo';
// const grantType = 'client_credentials';


// fetch('https://github.com/login/oauth/access_token', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
//     'Access-Control-Allow-Origin': '*', 
//   },
//   body: JSON.stringify({
//     'scope': scopes,
//     'grant_type': grantType
//   })
// })
// .then(response => response.json())
// .then(data => {
//   const accessToken = data.access_token;
//   console.log('Access Token:', accessToken);
// })
// .catch(error => {
//   console.error('Error:', error);
// });