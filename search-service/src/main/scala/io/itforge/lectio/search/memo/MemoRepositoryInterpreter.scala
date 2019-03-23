package io.itforge.lectio.search.memo

import cats.Monad
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import io.itforge.lectio.search.utils.ElasticHelper

import scala.language.higherKinds

class MemoRepositoryInterpreter[F[_]: Monad](client: ElasticClient)
    extends MemoRepositoryAlgebra[F]
    with ElasticHelper {

  override def findAll: F[List[Memo]] =
    client.fetch[F, Memo] {
      search("memo")
    }

}

object MemoRepositoryInterpreter {

  def apply[F[_]: Monad](client: ElasticClient): MemoRepositoryInterpreter[F] =
    new MemoRepositoryInterpreter(client)

}
