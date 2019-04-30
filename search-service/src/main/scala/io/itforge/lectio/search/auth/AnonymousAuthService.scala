package io.itforge.lectio.search.auth

import cats.Monad
import cats.data.{Kleisli, OptionT}
import cats.effect.{IO, LiftIO}
import org.http4s.server.AuthMiddleware

class AnonymousAuthService[F[_]: LiftIO: Monad] extends AuthException {

  val anonymousUser: Option[User] = Some(User("Anonymous", "Anonymous"))

  val middleware: AuthMiddleware[F, User] =
    AuthMiddleware {
      Kleisli { _ =>
        OptionT(IO(anonymousUser).to[F])
      }
    }

}

object AnonymousAuthService {

  def apply[F[_]: LiftIO: Monad]: AnonymousAuthService[F] = new AnonymousAuthService[F]

}
