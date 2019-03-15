package repositories.mongo

import java.util.UUID

import cats.effect.IO
import javax.inject.{Inject, Singleton}
import models.Memo
import play.api.libs.json.{JsValue, Json, OFormat}
import play.modules.reactivemongo.{ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.api.DefaultDB
import reactivemongo.bson.BSONDocument
import reactivemongo.play.json._
import reactivemongo.play.json.collection.JSONCollection
import repositories.MemoRepository

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class MemoMongo @Inject()(implicit ec: ExecutionContext,
                val reactiveMongoApi: ReactiveMongoApi)
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


  private def collection: Future[JSONCollection] = reactiveMongoApi.database.map(_.collection[JSONCollection]("memos"))
  private implicit val memoFormat: OFormat[Memo] = Json.format[Memo]

}
