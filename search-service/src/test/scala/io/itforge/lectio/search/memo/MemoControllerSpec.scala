package io.itforge.lectio.search.memo

import cats.effect.IO
import io.circe.generic.auto._
import io.circe.syntax._
import org.http4s._
import org.http4s.implicits._
import org.mockito.MockitoSugar._

class MemoControllerSpec
    extends org.specs2.mutable.Specification
    with MemoData {

  "find all memos" >> {
    val request = Request[IO](Method.GET, Uri.uri("/all"))
    "return 200" >> {
      val status = send(request).status
      status must beEqualTo(Status.Ok)
    }
    "return correct json" >> {
      val json = send(request).as[String].unsafeRunSync()
      json must beEqualTo(memos.asJson.noSpaces)
    }
  }

  "search memos" >> {
    val request = Request[IO](Method.GET, Uri.uri("/search/keyword"))
    "return 200" >> {
      val status = send(request).status
      status must beEqualTo(Status.Ok)
    }
    "return correct json" >> {
      val json = send(request).as[String].unsafeRunSync()
      json must beEqualTo(memos.asJson.noSpaces)
    }
  }

  def send(request: Request[IO]): Response[IO] =
    new MemoEndpoints[IO]
      .endpoints(memoService)
      .orNotFound(request)
      .unsafeRunSync()

  private val memoService: MemoService[IO] = {
    val service = mock[MemoService[IO]]
    when(service.findAll) thenReturn IO.pure(memos)
    when(service.query("keyword", None, Some(10), Set())) thenReturn IO.pure(
      memos)

    service
  }

}