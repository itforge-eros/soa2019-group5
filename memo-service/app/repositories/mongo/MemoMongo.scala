package repositories.mongo

import java.util.UUID

import cats.effect.IO
import cats.syntax.writer
import models.Memo
import play.api.libs.json.{JsValue, Json, OFormat}
import play.modules.reactivemongo.{MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.api.DefaultDB
import reactivemongo.bson.{BSONDocument, BSONDocumentWriter, Macros}
import reactivemongo.play.json.collection.JSONCollection
import reactivemongo.play.json._
import repositories.MemoRepository
import v1.memo.routes

import scala.concurrent.{ExecutionContext, Future}

class MemoMongo(implicit ec: ExecutionContext,
                val reactiveMongoApi: ReactiveMongoApi,
                val database: Future[DefaultDB])
  extends MemoRepository
  with ReactiveMongoComponents {

  override def findMemo(id: UUID): IO[Option[Memo]] = {
    val query = BSONDocument("id" -> id.toString)

    IO.fromFuture(IO {
      collection.flatMap(_.find(query).one[JsValue].map(_.map(_.as[Memo])))
    })
  }

  override def insertMemo(memo: Memo): IO[Boolean] = {
    val logger = play.api.Logger(this.getClass)

    IO.fromFuture(IO {
      collection.flatMap(_.insert.one(memo)).map { lastError =>
        logger.info(s"Successful created with last error $lastError")

        lastError.ok
      }
    })
  }


  private def collection: Future[JSONCollection] = database.map(_.collection[JSONCollection]("memos"))
  private implicit val memoFormat: OFormat[Memo] = Json.format[Memo]

}
