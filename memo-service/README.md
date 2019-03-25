# Memo Service

1. Setup Nodejs LTS
1. `npm install`
1. Setup MongoDB instance
1. Copy `.env.example` to `.env`
1. Change `MONGODB_URL` variable to match your mongodb URI

# Test

`npm test` (Require MongoDB)

# Run

`npm start` (Require MongoDB)

# Endpoints

`GET /api/memos` Get all of memos, if no memos in a database, it return empty list.  

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

`200 OK` When found.
```json
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
  }
```
`404 Not found`
```json
{
  "error": 404,
  "message": "Not found"
}
```
---
`POST /api/memos` _POST with empty body_ to create an empty memo.  
Then, it will return `201 Created` Empty Response with  
Header `Location: /api/memos/7c4bf536-1872-4732-b207-3542c5f199f3` is refer to a newly created empty memo.

---
`PUT /api/memos/:uuid` Update a memo by uuid  
Example request body to change `title` and `content` value.  
```json
{
  "title": "New Title",
  "content": "New Content"
}
```
Reponse `200 OK` with an updated memo object
```json
{
    "id": "<uuid>",
    "title": "New Title",
    "content": "New Content",
    "tags": [],
    "created_time": "2019-02-12T08:22:06.286Z",
    "updated_time": "2019-02-12T08:22:06.286Z"
  }
```
---
`DELETE /api/memos/:uuid` Delete a memo by uuid  
