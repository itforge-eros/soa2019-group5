package io.itforge.lectio.search.auth

case class UserJwt(username: String, user_id: String, iat: Long, exp: Long, iss: String)
