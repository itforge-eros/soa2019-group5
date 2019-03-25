package io.itforge.lectio.search.utils

import cats.effect.LiftIO
import com.sksamuel.elastic4s.HitReader
import com.sksamuel.elastic4s.cats.effect.instances._
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import com.sksamuel.elastic4s.searches.SearchRequest

trait ElasticHelper {

  implicit class ElasticClientHelper(client: ElasticClient) {

    def fetch[F[_]: LiftIO, T: HitReader](request: SearchRequest): F[List[T]] =
      client
        .execute(request)
        .map(_.result.to[T].toList)
        .to

  }

  def q(op: SearchCompose)(a: SearchRequest): SearchRequest =
    op(a)

  def combineQuery(ops: List[SearchCompose]): SearchCompose = ops match {
    case Nil        => identity
    case op :: Nil  => op
    case op :: tail => op.andThen(combineQuery(tail))
  }

  def combineOptionalQuery(ops: Option[SearchCompose]*): SearchCompose = {
    ops.flatten
      .foldLeft((a: SearchRequest) => a)(_.compose(_))
  }

  type SearchCompose = SearchRequest => SearchRequest

}
