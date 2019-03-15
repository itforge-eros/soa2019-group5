package v1.memo

import java.util.UUID

import cats.effect.IO
import javax.inject.{Inject, Singleton}
import models.{Memo, MemoForm}
import play.api.mvc._
import repositories.MemoRepository
import io.circe.generic.auto._
import io.circe.syntax._
import play.api.data.Form
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

  private val form: Form[MemoForm] = {
    import play.api.data.Forms._

    Form(
      mapping(
        "title" -> text,
        "content" -> text,
        "summary" -> text,
        "tags" -> set(text)
      )(MemoForm.apply)(MemoForm.unapply)
    )
  }

  def put(id: UUID): Action[MemoForm] = Action.async(parse.form(form)) {
    implicit request =>
      val io = memoRepository.updateMemo(id, request.body) map {
        case true => Ok
        case false => InternalServerError
      }
      io.unsafeToFuture()
  }

  def delete(id: UUID): Action[AnyContent] = ???


}
