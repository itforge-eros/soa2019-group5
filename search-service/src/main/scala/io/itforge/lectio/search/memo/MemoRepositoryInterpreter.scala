package io.itforge.lectio.search.memo

import cats._
import cats.effect._
import com.sksamuel.elastic4s.circe._
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import io.circe.generic.auto._
import io.itforge.lectio.search.utils.{ElasticHelper, SortBy}
import io.circe.generic.extras._
import io.circe.syntax._

import scala.language.higherKinds

class MemoRepositoryInterpreter[F[_]: Monad: LiftIO](client: ElasticClient, index: String)
    extends MemoRepositoryAlgebra[F]
    with ElasticHelper {

  override def findAll: F[List[Memo]] =
    client.fetch {
      search(index)
    }

  override def searchQuery(
      query: String,
      offset: Option[Int],
      limit: Option[Int],
      tags: Set[String],
      sortBy: Option[SortBy]): F[List[Memo]] =
    client.fetch {
      search(index)
        .query {
          multiMatchQuery(query)
        }
        .postFilter {
          boolQuery.filter {
            tags.map(termQuery("tags", _))
          }
        }
        .start(offset)
        .limit(limit)
//      TODO: Fix 500 sorting error in ElasticSearch
//        .sortBy(sortBy)
    }

}

object MemoRepositoryInterpreter {

  def apply[F[_]: Monad: LiftIO](client: ElasticClient, index: String): MemoRepositoryInterpreter[F] =
    new MemoRepositoryInterpreter[F](client, index)

}
