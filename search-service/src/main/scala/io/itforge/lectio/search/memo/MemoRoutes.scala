package io.itforge.lectio.search.memo

import cats.effect.IO
import io.circe.generic.auto._
import io.circe.syntax._
import org.http4s.HttpRoutes
import org.http4s.circe._
import org.http4s.dsl.Http4sDsl

import scala.language.higherKinds

class MemoRoutes extends Http4sDsl[IO] {

  def routes(memoService: MemoService): HttpRoutes[IO] =
    HttpRoutes.of[IO] {
      case GET -> Root / "all" =>
        for {
          memos <- memoService.findAll
          response <- Ok(memos.asJson)
        } yield response

    }

}
