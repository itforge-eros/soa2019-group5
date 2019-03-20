package io.itforge.lectio.search

import cats.effect.{Effect, IO, Sync}
import io.circe.Json
import cats._
import cats.implicits._
import io.itforge.lectio.search.memo.MemoService
import org.http4s.HttpRoutes
import org.http4s.circe._
import org.http4s.dsl.Http4sDsl

import scala.language.higherKinds
import io.circe.generic.auto._
import io.circe.syntax._



class SearchRoutes extends Http4sDsl[IO] {

  def routes(memoService: MemoService): HttpRoutes[IO] =
    HttpRoutes.of[IO] {
      case GET -> Root / "all" =>
        for {
          memos <- memoService.findAll
          response <- Ok(memos.asJson)
        } yield response

    }

}
