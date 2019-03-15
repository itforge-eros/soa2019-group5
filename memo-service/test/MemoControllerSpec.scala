import java.util.UUID

import cats.effect.IO
import models.Memo
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import play.api.test.Helpers._
import repositories.MemoRepository
import v1.memo.MemoController
import scala.concurrent.ExecutionContext.Implicits.global

class MemoControllerSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "MemoController" should {
    "return 200 if success" in {
      val id = UUID.fromString("40d9894d-f25c-4594-bc6d-1aaad973f55d")

      val controller = new MemoController(stubControllerComponents(), mockMemoRepository)
      val response = controller.get(id).apply(FakeRequest())
      status(response) mustBe OK
    }
  }

  private val mockMemoRepository = new MemoRepository {
    override def findMemo(id: UUID): IO[Option[Memo]] = IO.pure(Some(Memo(id=id)))
    override def insertMemo(memo: Memo): IO[Boolean] = IO.pure(true)
  }

}
