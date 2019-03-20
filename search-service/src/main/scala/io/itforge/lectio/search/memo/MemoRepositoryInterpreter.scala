package io.itforge.lectio.search.memo

//import cats._
//import cats.implicits._
import akka.actor.ActorSystem
import cats.effect.{Effect, IO}
import com.sksamuel.elastic4s.RefreshPolicy
import com.sksamuel.elastic4s.http.{ElasticClient, ElasticProperties, Response}
import com.sksamuel.elastic4s.http.search.SearchResponse
import io.circe.generic.auto._
import com.sksamuel.elastic4s.cats.effect.instances._
import com.sksamuel.elastic4s.circe._
import com.sksamuel.elastic4s.http.ElasticDsl._
import com.sksamuel.elastic4s.streams.ReactiveElastic._

class MemoRepositoryInterpreter(client: ElasticClient)
  extends MemoRepositoryAlgebra[IO] {

  override def findAll: IO[List[Memo]] =
    client.execute(search("memos")).map(_.result.to[Memo].toList)

}

