package io.itforge.lectio.search.memo

import cats._
import cats.effect._
import com.sksamuel.elastic4s.circe._
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import com.sksamuel.elastic4s.searches.{QueryApi, SearchRequest}
import io.circe.generic.auto._
import io.itforge.lectio.search.utils.ElasticHelper

import scala.language.higherKinds

class MemoRepositoryInterpreter[F[_]: Monad: LiftIO](client: ElasticClient)
    extends MemoRepositoryAlgebra[F]
    with ElasticHelper {

  override def findAll: F[List[Memo]] =
    client.fetch {
      search("memos")
    }

  override def searchQuery(query: String,
                           offset: Option[Int],
                           limit: Option[Int],
                           tags: Set[String]): F[List[Memo]] = {
    client.fetch {
      val filter = combineOptionalQuery(
        Some(q(_.query(query))),
        offset.map(a => q(_.start(a))),
        limit.map(a => q(_.limit(a))),
        tags.toList.headOption.map(a =>
          q(_ query {
            boolQuery.must(termQuery("tags", a))
          }))
      )

      filter(search("memos")) query {
        boolQuery.must(
//          termsSetQuery("tags", tags, "1")
          termQuery("tags", tags.head)
        )
      }
    }
  }

}

object MemoRepositoryInterpreter {

  def apply[F[_]: Monad: LiftIO](
      client: ElasticClient): MemoRepositoryInterpreter[F] =
    new MemoRepositoryInterpreter[F](client)

}
