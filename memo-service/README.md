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

`200 OK`
```json
[
  {
    "id": "d3195cc1-db5b-415d-8526-fcfed80850dd",
    "title": "CNN with Python",
    "content": "Computer Vision has become ubiquitous in our society, with applications in search, image understanding, apps, mapping, ...",
    "summary": "This course is a deep dive into details of the deep learning architectures with a focus on learning end-to-end models for these tasks, ...",
    "tags": [
      "science",
      "programming"
    ],
    "created_time": "2019-02-12T08:22:06.286Z",
    "updated_time": "2019-02-12T08:22:06.286Z"
  },
  {
    "id": "0c11b474-efec-4293-a6e0-0b837913c010",
    "title": "Markdown for dummy",
    "content": "Markdown is a lightweight markup language with plain text formatting syntax. Its design allows it to be converted to many output formats, ...",
    "tags": [
      "github pages",
      "markdown"
    ],
    "created_time": "2019-02-12T08:22:06.286Z",
    "updated_time": "2019-02-12T08:22:06.286Z"
  }
]
```  
---
`GET /api/memos/:uuid` Get a memo by uuid  
`POST /api/memos` Create an empty memo  
`PUT /api/memos/:uuid` Update a memo by uuid  
`DELETE /api/memos/:uuid` Delete a memo by uuid  
