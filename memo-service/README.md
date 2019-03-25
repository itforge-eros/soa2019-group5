# Memo Service

1. Setup Nodejs LTS
1. `npm install`
1. Setup MongoDB instance
1. Copy `.env.example` to `.env`
1. Change `MONGODB_URL` variable to match your mongodb URI

# Test

`npm test` (Require MongoDB)

# Run

`npm start`

# Endpoints

`GET /api/memos` Get all of memos  
`GET /api/memos/:uuid` Get a memo by uuid  
`POST /api/memos` Create an empty memo  
`PUT /api/memos/:uuid` Update a memo by uuid  
`DELETE /api/memos/:uuid` Delete a memo by uuid  
