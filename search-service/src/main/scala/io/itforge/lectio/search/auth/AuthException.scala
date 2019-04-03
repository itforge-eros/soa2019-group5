package io.itforge.lectio.search.auth

trait AuthException {

  val AUTH_HEADER_NOT_FOUND = "Couldn't find an Authorization header"
  val TOKEN_NOT_FOUND = "Token not found"

}
