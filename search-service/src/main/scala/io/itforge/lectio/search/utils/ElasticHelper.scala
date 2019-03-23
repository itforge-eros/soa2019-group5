package io.itforge.lectio.search.utils

import com.sksamuel.elastic4s.cats.effect.instances._
import com.sksamuel.elastic4s.circe._
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import com.sksamuel.elastic4s.searches.SearchRequest
import io.circe.generic.auto._

trait ElasticHelper {

  implicit class ElasticClientHelper(client: ElasticClient) {

    def fetch[F[_], T](request: SearchRequest): F[List[T]] =
      client
        .execute(request)
        .map(_.result)
        .map(_.to[T])
        .map(_.toList)
        .to

  }

}
