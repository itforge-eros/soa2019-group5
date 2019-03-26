# Search Service

## Preriquisite

1. Install sbt
`brew install sbt`

## Test

`sbt test`

## Build

Build to JAR
`sbt assembly`

## Run

`sbt run`

## Endpoints

Search
`GET /search/:keyword?tags=:tag&limit=:limit&offset:offset`

List All (For testing)
`GET /all`
