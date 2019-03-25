package io.itforge.lectio.search.memo

import cats.effect.Effect
import cats.implicits._
import io.circe.generic.auto._
import io.circe.syntax._
import io.itforge.lectio.search.utils.Pagination
import org.http4s.HttpRoutes
import org.http4s.circe._
import org.http4s.dsl.Http4sDsl

import scala.language.higherKinds

class MemoEndpoints[F[_]: Effect] extends Http4sDsl[F] {

  import Pagination._

  def getAllMemosEndpoint(memoService: MemoService[F]): HttpRoutes[F] =
    HttpRoutes.of[F] {
      case GET -> Root / "all" =>
        for {
          memos <- memoService.findAll
          response <- Ok(memos.asJson)
        } yield response
    }

  def getSearchEndpoint(memoService: MemoService[F]): HttpRoutes[F] =
    HttpRoutes.of[F] {
      case GET -> Root / "search" / query :? Offset(offset) :? Limit(limit) =>
        for {
          memos <- memoService.query(query,
                                     offset.getOrElse(0),
                                     limit.getOrElse(10))
          response <- Ok(memos.asJson)
        } yield response
    }

  def endpoints(memoService: MemoService[F]): HttpRoutes[F] =
    getAllMemosEndpoint(memoService) <+>
      getSearchEndpoint(memoService)

}

object MemoEndpoints {

  def endpoints[F[_]: Effect](memoService: MemoService[F]): HttpRoutes[F] =
    new MemoEndpoints[F].endpoints(memoService)

}
