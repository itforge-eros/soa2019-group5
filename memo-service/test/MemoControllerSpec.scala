import java.util.UUID

import akka.stream.Materializer
import cats.effect.IO
import models.{Memo, MemoForm}
import org.scalatest.mockito.MockitoSugar
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import play.api.test.Helpers._
import repositories.MemoRepository
import v1.memo.MemoController
import org.mockito.Mockito._
import play.api.libs.json.{Format, Json}
import play.api.mvc.ControllerComponents

import scala.concurrent.ExecutionContext.Implicits.global

class MemoControllerSpec extends PlaySpec
  with GuiceOneAppPerTest
  with Injecting
  with MockitoSugar {


  "v1 MemoController" should {

    implicit lazy val materializer: Materializer = app.materializer
    implicit val memoFormFormat: Format[MemoForm] = Json.format[MemoForm]
    implicit lazy val components: ControllerComponents = inject[ControllerComponents]

    "return 200 if success" in {
      val id = UUID.fromString("40d9894d-f25c-4594-bc6d-1aaad973f55d")

      val controller = new MemoController(components, mockMemoRepository)
      val response = controller.get(id).apply(FakeRequest())

      status(response) mustBe OK
    }

    "return 200 if updated success" in {
      val id = UUID.fromString("40d9894d-f25c-4594-bc6d-1aaad973f55d")
      val memoForm = MemoForm("Hello, World!", "Hello, it's me!", "Hi", Set("simple", "hello"))
      val existedMemo = Memo(id, "Hello, Thailand", "Hi, I'am Thai!", "Introduce", Set("introducing"))

      val mockMemoRepository = mock[MemoRepository]
      when(mockMemoRepository.updateMemo(id, memoForm)) thenReturn IO.pure(true)
      val controller = new MemoController(components, mockMemoRepository)
      val request = FakeRequest(PUT, s"/")
        .withJsonBody(Json.toJson(memoForm))
      val response = controller.put(id).apply(request)
      status(response) mustBe OK
    }
  }

  private val mockMemoRepository = new MemoRepository {
    override def findMemo(id: UUID): IO[Option[Memo]] = IO.pure(Some(Memo(id=id)))
    override def insertMemo(memo: Memo): IO[Boolean] = IO.pure(true)
    override def updateMemo(id: UUID, modifier: MemoForm): IO[Boolean] = IO.pure(true)
  }

}
