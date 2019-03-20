package io.itforge.lectio.search.memo

import cats.effect.IO
import com.sksamuel.elastic4s.cats.effect.instances._
import com.sksamuel.elastic4s.circe._
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import io.circe.generic.auto._

class MemoRepositoryInterpreter(client: ElasticClient)
  extends MemoRepositoryAlgebra[IO] {

  override def findAll: IO[List[Memo]] =
    client.execute {
      search("memos")
    }.map(_.result.to[Memo].toList)

}

object MemoRepositoryInterpreter {

  def apply(client: ElasticClient): MemoRepositoryInterpreter =
    new MemoRepositoryInterpreter(client)

}

