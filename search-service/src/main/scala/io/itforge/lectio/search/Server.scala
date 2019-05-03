package io.itforge.lectio.search

import cats.effect._
import cats.implicits._
import com.sksamuel.elastic4s.http.{ElasticClient, ElasticProperties}
import io.circe.config.parser
import io.circe.generic.auto._
import io.itforge.lectio.search.auth.AuthService
import io.itforge.lectio.search.config.SearchServiceConfig
import io.itforge.lectio.search.memo.{MemoEndpoints, MemoRepositoryInterpreter, MemoService}
import org.http4s.server.blaze.BlazeServerBuilder
import org.http4s.server.{Router, Server => Http4sServer}
import org.http4s.syntax.kleisli._

object Server extends IOApp {

  def createServer[F[_]: ContextShift: ConcurrentEffect: Timer]: Resource[F, Http4sServer[F]] =
    for {
      conf <- Resource.liftF(parser.decodePathF[F, SearchServiceConfig]("service"))
      client = ElasticClient(ElasticProperties(conf.elastic.uri))
      memoRepo = MemoRepositoryInterpreter[F](client, conf.elastic.memosIndex)
      memoService = MemoService[F](memoRepo)
      authService = AuthService[F](conf.auth.publicKey)
      services = MemoEndpoints.endpoints[F](memoService, authService.middleware)
      httpApp = Router("/" -> services).orNotFound
      server <- BlazeServerBuilder[F]
        .bindHttp(conf.server.port, conf.server.host)
        .withHttpApp(httpApp)
        .resource
    } yield server

  def run(args: List[String]): IO[ExitCode] =
    createServer.use(_ => IO.never).as(ExitCode.Success)

}
