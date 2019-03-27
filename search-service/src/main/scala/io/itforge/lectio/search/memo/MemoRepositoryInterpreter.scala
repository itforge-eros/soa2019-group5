package io.itforge.lectio.search.memo

import cats._
import cats.effect._
import com.sksamuel.elastic4s.circe._
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import io.circe.generic.auto._
import io.itforge.lectio.search.Config
import io.itforge.lectio.search.utils.ElasticHelper

import scala.language.higherKinds

class MemoRepositoryInterpreter[F[_]: Monad: LiftIO](client: ElasticClient)
    extends MemoRepositoryAlgebra[F]
    with ElasticHelper {

  override def findAll: F[List[Memo]] =
    client.fetch {
      search(index)
    }

  override def searchQuery(query: String,
                           offset: Option[Int],
                           limit: Option[Int],
                           tags: Set[String]): F[List[Memo]] = {
    client.fetch {
      search(index)
        .query {
          matchQuery("title", query)
        }
        .postFilter {
          boolQuery.filter {
            tags.map(termQuery("tags", _))
          }
        }
        .start(offset)
        .limit(limit)
    }
  }

  private val index = Config.memosIndex

}

object MemoRepositoryInterpreter {

  def apply[F[_]: Monad: LiftIO](
      client: ElasticClient): MemoRepositoryInterpreter[F] =
    new MemoRepositoryInterpreter[F](client)

}
