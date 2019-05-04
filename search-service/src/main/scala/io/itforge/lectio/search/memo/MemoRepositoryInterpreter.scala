package io.itforge.lectio.search.memo

import cats._
import cats.effect._
import com.sksamuel.elastic4s.circe._
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl.{termQuery, _}
import io.circe.generic.auto._
import io.itforge.lectio.search.utils.{ElasticHelper, SortBy}

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
      sortBy: Option[SortBy],
      userId: Option[String]): F[List[Memo]] =
    client.fetch {
      search(index)
        .query {
          multiMatchQuery(query)
        }
        .postFilter {
          boolQuery.filter {
            val tagFilters = tags.map(termQuery("tags", _)).toList
            userId match {
              case Some(id) =>
                termQuery("user_id", id) :: tagFilters
              case None => tagFilters
            }
          }
        }
        .start(offset)
        .limit(limit)
        .sortBy(sortBy)
    }

}

object MemoRepositoryInterpreter {

  def apply[F[_]: Monad: LiftIO](
      client: ElasticClient,
      index: String): MemoRepositoryInterpreter[F] =
    new MemoRepositoryInterpreter[F](client, index)

}
