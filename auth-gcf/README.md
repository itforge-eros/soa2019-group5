# Authentication Oauth2 Implicit Flow for Lectio PWA
Ref: [link](https://medium.com/google-cloud/understanding-oauth2-and-building-a-basic-authorization-server-of-your-own-a-beginners-guide-cf7451a16f66)

## Flow 
1. Take user to this page [here](https://asia-northeast1-kavinvin-211411.cloudfunctions.net/auth?response_type=token&redirect_url=https:%2F%2Fgoogle.com&client_id=lectio-pwa) . 
`https://asia-northeast1-kavinvin-211411.cloudfunctions.net/auth?response_type=token&redirect_url=https://google.com&client_id=lectio-pwa`
(You may change the `redirect_url` param to the site url e.g. `localhost:3000/token`) The service will return a token via query parameter.
1. Then type in username and password `admin` and `admin` (test user).
1. The site redirect to the `redirec_url` with a token in query param. `https://www.google.com/?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcl9pZCI6ImJmNzg5NjA0LWFiMDEtNGI0MC04ZTZjLWE1NDk0N2ZjMjAzMyIsImlhdCI6MTU1NTA1MTgwMywiZXhwIjoxNTU2ODUxODAzLCJpc3MiOiJsZWN0aW8taXNzdWVyIn0.mHsNQPFqg6kJ_eDW_rwVZ-D5gwXX9D2tOr73L9jNXDBPW20RupmqVLse5fnecqNiYup_-On_jWoyDDlqV25XiX5QP9nn6vxs3pHnxss8HnsV9_c87-gNAosO47Bsd87VkqO8qwOwikMQomHgV2iYcaY4hhTKgre-co0rp1Y5z33dcnr7I0ZhHCr28Z4yn1JkkziIvwLwy9-ncn0-iYUg9fOBDF1De6ccLTIcRPYS8ea_zKkBKuEs9xydA3etQe53LYYcug6mqJSNpH9VnnB9HZGH4t4sghoSwWDYtrQ4sk6vxf0tfNAvkbBiPStPtbPWTlAutt-tvRtkrDaOkLCOWA
&token_type=JWT&expires_in=1800000`
