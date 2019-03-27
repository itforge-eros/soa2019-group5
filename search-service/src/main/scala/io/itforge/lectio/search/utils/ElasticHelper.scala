package io.itforge.lectio.search.utils

import cats.Monoid
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

  implicit class ElasticRequest(request: SearchRequest) {

    def start(i: Option[Int]): SearchRequest =
      i.map(request.start).getOrElse(request)

    def limit(i: Option[Int]): SearchRequest =
      i.map(request.limit).getOrElse(request)

  }

  def q(op: SearchCompose)(a: SearchRequest): SearchRequest =
    op(a)

  def combineOptionalQuery(ops: Option[SearchCompose]*): SearchCompose =
    ops.flatten
      .foldLeft((a: SearchRequest) => a)(_ andThen _)

  type SearchCompose = SearchRequest => SearchRequest

  case class SearchFilter(filter: SearchRequest => SearchRequest)

  implicit val searchFilterMonoid: Monoid[SearchFilter] =
    new Monoid[SearchFilter] {
      def empty: SearchFilter = SearchFilter(identity)
      def combine(x: SearchFilter, y: SearchFilter): SearchFilter =
        SearchFilter(x.filter andThen y.filter)
    }

}
