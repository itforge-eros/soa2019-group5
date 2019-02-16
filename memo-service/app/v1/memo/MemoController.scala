package v1.memo

import java.time.LocalDateTime

import javax.inject.{Inject, Singleton}
import play.api.data.Form
import play.api.i18n.MessagesApi
import play.api.libs.json.{JsValue, Json, Writes}
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

case class Memo(
                 id: String,
                 title: String,
                 content: String,
                 summary: String,
                 tags: Set[String],
                 created_time: LocalDateTime,
                 updated_time: LocalDateTime
               )

@Singleton
class MemoController @Inject()(cc: ControllerComponents)
                              (implicit ec: ExecutionContext, mp: MessagesApi) extends AbstractController (cc){

  val logger = play.api.Logger(this.getClass)

  private val form: Form[Memo] = {
    import play.api.data.Forms._

    Form(
      mapping(
        "id" -> text,
        "title" -> text,
        "content" -> text,
        "summary" -> text,
        "tags" -> set(text),
        "created_time" -> localDateTime,
        "updated_time" -> localDateTime
      )(Memo.apply)(Memo.unapply)
    )
  }

  implicit val memoWriter = new Writes[Memo] {
    def writes(memo: Memo): JsValue = Json.obj(
      "id" -> memo.id,
      "title" -> memo.title,
      "content" -> memo.content,
      "summary" -> memo.summary,
      "tags" -> memo.tags,
      "created_time" -> memo.created_time,
      "updated_time" -> memo.updated_time
    )
  }

  def get(id: String): Action[AnyContent] = Action.async {
    Future {
      Ok("OKK")
    }
  }

  def post: Action[AnyContent] = Action.async { implicit request =>

    def failure(badForm: Form[Memo]) = {
      Future.successful(BadRequest)
    }

    def success(memo: Memo) = {
        Future.successful(Created(Json.toJson(memo)).withHeaders(LOCATION -> "X"))
    }

    form.bindFromRequest().fold(failure, success)
  }

  def put(id: String): Action[AnyContent] = ???

  def delete(id: String): Action[AnyContent] = ???


}
