package io.itforge.lectio.search.memo

import cats.effect.Effect
import cats.implicits._
import io.circe.generic.auto._
import io.circe.syntax._
import io.itforge.lectio.search.auth.{AuthService, User}
import io.itforge.lectio.search.utils.SearchParams
import org.http4s.{AuthedService, HttpRoutes}
import org.http4s.circe._
import org.http4s.dsl.Http4sDsl
import SearchParams._
import org.http4s.server.AuthMiddleware

import scala.language.higherKinds

class MemoEndpoints[F[_]: Effect] extends Http4sDsl[F] {

  def getAllMemosEndpoint(memoService: MemoService[F]): HttpRoutes[F] =
    HttpRoutes.of[F] {
      case GET -> Root / "all" =>
        for {
          memos <- memoService.findAll
          response <- Ok(memos.asJson)
        } yield response
    }

  def getSearchEndpoint(memoService: MemoService[F]): AuthedService[User, F] =
    AuthedService {
      case GET -> Root / "search" / query
            :? Offset(offset)
            :? Limit(limit)
            :? Tags(tags)
            :? Sort(sort) as user => {
        if (query == "*")
          for {
            memos <- memoService.findAll
            response <- Ok(memos.asJson)
          } yield response
        else
          for {
            memos <- memoService.query(
              query,
              offset,
              limit,
              tags.getOrElse(Nil).toSet,
              sort,
              Some(user.userId.toString))
            response <- Ok(memos.asJson)
          } yield response
      }
    }

  def endpoints(memo: MemoService[F], auth: AuthMiddleware[F, User]): HttpRoutes[F] =
    getAllMemosEndpoint(memo) <+>
      auth(getSearchEndpoint(memo))

}

object MemoEndpoints {

  def endpoints[F[_]: Effect](memo: MemoService[F], auth: AuthMiddleware[F, User]): HttpRoutes[F] =
    new MemoEndpoints[F].endpoints(memo, auth)

}
