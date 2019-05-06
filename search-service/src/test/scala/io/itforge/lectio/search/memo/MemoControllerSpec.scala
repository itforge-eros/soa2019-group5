package io.itforge.lectio.search.memo

import cats.effect.IO
import io.circe.generic.auto._
import io.circe.syntax._
import io.itforge.lectio.search.auth.{AnonymousAuthService, AuthService}
import io.itforge.lectio.search.utils.CirceDateDecoder
import org.http4s._
import org.http4s.implicits._
import org.mockito.MockitoSugar._
import org.mockito.ArgumentMatchers._

class MemoControllerSpec
    extends org.specs2.mutable.Specification
    with MemoData
    with AuthData
    with CirceDateDecoder {

  "find all memos" >> {
    val request = Request[IO](Method.GET, Uri.uri("/all"))
    "should return 200" >> {
      val status = send(request).status
      status must beEqualTo(Status.Ok)
    }
    "should return correct json" >> {
      val json = send(request).as[String].unsafeRunSync()
      json must beEqualTo(memos.asJson.noSpaces)
    }
  }

  "search memos" >> {
    val request =
      Request[IO](
        Method.GET,
        Uri.uri("/search/keyword"),
        headers = Headers(Header("Authorization", bearerToken)))
    "should return 200" >> {
      val status = send(request).status
      status must beEqualTo(Status.Ok)
    }
    "should return correct json" >> {
      val json = send(request).as[String].unsafeRunSync()
      json must beEqualTo(memos.asJson.noSpaces)
    }
    "should return 401 when no Authentication header presented" >> {
      val noAuthRequest = Request[IO](Method.GET, Uri.uri("/search/keyword"))
      val status = send(noAuthRequest).status
      status must beEqualTo(Status.Unauthorized)
    }
  }

  def send(request: Request[IO]): Response[IO] =
    new MemoEndpoints[IO]
      .endpoints(memoService, AuthService[IO](publicKey).middleware)
      .orNotFound(request)
      .unsafeRunSync()

  private val memoService: MemoService[IO] = {
    val service = mock[MemoService[IO]]
    when(service.findAll).thenReturn(IO.pure(memos))
    when(service.query("keyword", None, None, Set(), None, Some(userId)))
      .thenReturn(IO.pure(memos))

    service
  }

}
