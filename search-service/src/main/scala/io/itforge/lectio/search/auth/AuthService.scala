package io.itforge.lectio.search.auth

import cats._
import cats.data._
import cats.effect._
import io.circe.generic.auto._
import org.http4s.Request
import org.http4s.headers.Authorization
import org.http4s.server.AuthMiddleware
import pdi.jwt.{JwtAlgorithm, JwtCirce}

class AuthService[F[_]: LiftIO: Monad](publicKey: String) extends AuthException {

  val middleware: AuthMiddleware[F, User] =
    AuthMiddleware.apply(authUser)

  private def authUser: Kleisli[OptionT[F, ?], Request[F], User] =
    Kleisli { request =>
      val user = for {
        header <- request.headers.get(Authorization).toRight(AUTH_HEADER_NOT_FOUND)
        token <- header.value.split(" ").toList match {
          case "Bearer" :: bearerToken :: Nil => Right(bearerToken)
          case _ => Left(TOKEN_NOT_FOUND)
        }
        credential <- getCredential(token, stripedPublicKey)
        user = User(credential.username, credential.user_id)
      } yield user

      OptionT(IO(user.toOption).to[F])
    }

  private def getCredential(token: String, key: String): Either[String, UserCredential] =
    JwtCirce
      .decodeJson(token, key, List(algorithm))
      .flatMap(_.as[UserCredential].toTry)
      .toEither
      .left
      .map(_.getMessage)

  private val algorithm = JwtAlgorithm.RS256
  private val stripedPublicKey = publicKey.filter(!_.isWhitespace)

}

object AuthService {

  def apply[F[_]: LiftIO: Monad](publicKey: String): AuthService[F] = new AuthService[F](publicKey)

}

case class User(username: String, userId: String)
case class UserCredential(username: String, user_id: String, iat: Long, exp: Long, iss: String)
