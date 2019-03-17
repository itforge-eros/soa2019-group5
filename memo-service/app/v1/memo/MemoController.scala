package v1.memo

import java.util.UUID

import javax.inject.{Inject, Singleton}
import models.Memo
import play.api.mvc._
import repositories.MemoRepository
import io.circe.generic.auto._
import io.circe.syntax._
import play.api.libs.circe.Circe

import scala.concurrent.ExecutionContext

@Singleton
class MemoController @Inject()(cc: ControllerComponents,
                               val memoRepository: MemoRepository)
                              (implicit ec: ExecutionContext)
  extends AbstractController(cc)
  with Circe {

  def get(id: UUID): Action[AnyContent] = Action.async {
    val io = memoRepository.findMemo(id) map {
      case Some(memo) => Ok(memo.asJson)
      case None => NotFound
    }

    io.unsafeToFuture()
  }

  def post: Action[AnyContent] = Action.async {
    val memo = Memo()
    val io = memoRepository.insertMemo(memo) map {
      case true => Created.withHeaders(LOCATION -> routes.MemoController.get(memo.id).url)
      case false => InternalServerError
    }

    io.unsafeToFuture()
  }

  def put(id: UUID): Action[AnyContent] = ???

  def delete(id: UUID): Action[AnyContent] = ???


}
