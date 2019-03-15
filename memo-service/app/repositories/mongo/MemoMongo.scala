package repositories.mongo

import java.util.UUID

import cats.effect.IO
import javax.inject.{Inject, Singleton}
import models.{Memo, MemoForm}
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

  private val logger = play.api.Logger(this.getClass)

  override def findMemo(id: UUID): IO[Option[Memo]] = {
    val query = BSONDocument("id" -> id.toString)

    IO.fromFuture(IO {
      collection.flatMap(_.find(query).one[JsValue].map(_.map(_.as[Memo])))
    })
  }

  override def insertMemo(memo: Memo): IO[Boolean] = {
    IO.fromFuture(IO {
      collection.flatMap(_.insert.one(memo)).map { lastError =>
        logger.info(s"Created with last error $lastError")

        lastError.ok
      }
    })
  }

  override def updateMemo(id: UUID, modifier: MemoForm): IO[Boolean] = {

    import models.MemoForm._
    val query = BSONDocument("id" -> id.toString)
    val mod = BSONDocument("$set" -> modifier)

    IO.fromFuture(IO {
      collection.flatMap(_.update.one(query, modifier, upsert = false, multi = false))
        .map { result =>
          logger.info(s"Updated with last error $result")

          result.ok
        }
    })
  }

  private def collection: Future[JSONCollection] = reactiveMongoApi.database.map(_.collection[JSONCollection]("memos"))
  private implicit val memoFormat: OFormat[Memo] = Json.format[Memo]
  private implicit val memoFormFormat: OFormat[MemoForm] = Json.format[MemoForm]
}
