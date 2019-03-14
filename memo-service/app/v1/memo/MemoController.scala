package v1.memo

import java.time.LocalDateTime
import java.util.UUID

import javax.inject.{Inject, Singleton}
import play.api.data.Form
import play.api.i18n.MessagesApi
import play.api.libs.json.{JsValue, Json, Writes}
import play.api.mvc._
import play.modules.reactivemongo.{MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.play.json.collection.JSONCollection
import reactivemongo.play.json._
import collection._
import models.Memo
import reactivemongo.bson.BSONDocument

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class MemoController @Inject()(cc: ControllerComponents,
                               val reactiveMongoApi: ReactiveMongoApi)
                              (implicit ec: ExecutionContext) extends AbstractController(cc)
  with MongoController with ReactiveMongoComponents{

  val logger = play.api.Logger(this.getClass)

  implicit val memoFormat = Json.format[Memo]

  def collection: Future[JSONCollection] = database.map(_.collection[JSONCollection]("memos"))

  def get(id: UUID): Action[AnyContent] = Action.async {
    val query = BSONDocument("id" -> id.toString)
    logger.info(s"GET Memo id $id")
    collection.flatMap(_.find(query).one[JsValue])
      .map {
        case None => NotFound
        case Some(memo) => Ok(memo)
      }
  }

  def post: Action[AnyContent] = Action.async {
    val newMemo = Memo()

    collection.flatMap(_.insert.one(newMemo)).map { lastError =>
      logger.info(s"Successful created with last error $lastError")
      Created.withHeaders(LOCATION -> routes.MemoController.get(newMemo.id).url)
    }
  }

  def put(id: UUID): Action[AnyContent] = ???

  def delete(id: UUID): Action[AnyContent] = ???

}
