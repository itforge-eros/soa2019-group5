package io.itforge.lectio.search

import cats.effect._
import cats.implicits._
import com.sksamuel.elastic4s.http.{ElasticClient, ElasticProperties}
import io.itforge.lectio.search.memo.{
  MemoRepositoryInterpreter,
  MemoEndpoints,
  MemoService
}
import org.http4s.server.blaze.BlazeServerBuilder
import org.http4s.server.{Router, Server => Http4sServer}
import org.http4s.syntax.kleisli._

object Server extends IOApp {

  def createServer[F[_]: ContextShift: ConcurrentEffect: Timer]
    : Resource[F, Http4sServer[F]] = {
    val client = ElasticClient(ElasticProperties("http://localhost:9200"))
    val memoRepository = MemoRepositoryInterpreter[F](client)
    val memoService = MemoService[F](memoRepository)
    val routes = MemoEndpoints.endpoints[F](memoService)

    BlazeServerBuilder[F]
      .bindHttp(9001, "0.0.0.0")
      .withHttpApp(Router("/" -> routes).orNotFound)
      .resource
  }

  def run(args: List[String]): IO[ExitCode] =
    createServer.use(_ => IO.never).as(ExitCode.Success)

}
