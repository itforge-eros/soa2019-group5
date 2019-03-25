package io.itforge.lectio.search.memo

import cats._
import cats.effect._
import com.sksamuel.elastic4s.circe._
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import com.sksamuel.elastic4s.searches.SearchRequest
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
                           limit: Option[Int]): F[List[Memo]] = {
    client.fetch {
      val filter = combineOptionalQuery(
        offset.map(a => q(_.limit(a))),
        limit.map(a => q(_.start(a)))
      )

      filter(search("memos"))
    }
  }

}

object MemoRepositoryInterpreter {

  def apply[F[_]: Monad: LiftIO](
      client: ElasticClient): MemoRepositoryInterpreter[F] =
    new MemoRepositoryInterpreter[F](client)

}
