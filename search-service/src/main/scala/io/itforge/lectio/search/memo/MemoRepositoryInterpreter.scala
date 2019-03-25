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

  def combineQuery(ops: List[SearchCompose]): SearchCompose = ops match {
    case Nil        => (a => a)
    case op :: Nil  => op
    case op :: tail => op.compose(combineQuery(tail))
  }

  def q(op: SearchRequest => SearchRequest)(a: SearchRequest): SearchRequest =
    op(a)

  override def searchQuery(query: String,
                           offset: Option[Int],
                           limit: Option[Int]): F[List[Memo]] = {

    client.fetch {
      val ops = List[Option[SearchCompose]](
        offset.map(a => q(_.limit(a))),
        limit.map(a => q(_.start(a)))
      )

      search("memos") limit 3 start 10
      val a: SearchRequest => SearchRequest =
        ops.flatten.foldLeft((a: SearchRequest) => a)(_.compose(_))
      a(search("memos"))
    }
  }

  def composeQuery(request: SearchRequest, f: SearchCompose): SearchRequest =
    f(request)

  type SearchCompose = SearchRequest => SearchRequest

}

object MemoRepositoryInterpreter {

  def apply[F[_]: Monad: LiftIO](
      client: ElasticClient): MemoRepositoryInterpreter[F] =
    new MemoRepositoryInterpreter[F](client)

}
