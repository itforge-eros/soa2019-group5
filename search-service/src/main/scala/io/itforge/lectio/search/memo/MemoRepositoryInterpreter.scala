package io.itforge.lectio.search.memo

import cats.Monad
import cats.effect.LiftIO
import com.sksamuel.elastic4s.cats.effect.instances._
import com.sksamuel.elastic4s.circe._
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import io.circe.generic.auto._

import scala.language.higherKinds

class MemoRepositoryInterpreter[F[_]: Monad: LiftIO](client: ElasticClient)
    extends MemoRepositoryAlgebra[F] {

  override def findAll: F[List[Memo]] = LiftIO[F].liftIO {
    client
      .execute {
        search("memos")
      }
      .map(_.result.to[Memo].toList)
  }

}

object MemoRepositoryInterpreter {

  def apply[F[_]: Monad: LiftIO](
      client: ElasticClient): MemoRepositoryInterpreter[F] =
    new MemoRepositoryInterpreter(client)

}
