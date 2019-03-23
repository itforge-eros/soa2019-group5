package memo.infrastructure.repositories

import cats.Monad
import cats.effect.IO
import memo.domains.memo.{Memo, MemoRepository}
import reactivemongo.api.collections.bson.BSONCollection
import reactivemongo.bson.{BSONArray, BSONDateTime, BSONDocument, BSONDocumentWriter}

import scala.concurrent.ExecutionContext

class MemoMongoRepository[F[_] : Monad](val collection: BSONCollection)(implicit ec: ExecutionContext)
  extends MemoRepository[F] {

  implicit lazy val memoBSONWriter: BSONDocumentWriter[Memo]
  = (memo: Memo) => BSONDocument(
    "id" -> memo.id,
    "title" -> memo.title,
    "content" -> memo.content,
    "summary" -> memo.summary,
    "tags" -> BSONArray(memo.tags),
    "created_time" -> BSONDateTime(memo.created_time.getEpochSecond),
    "updated_time" -> BSONDateTime(memo.updated_time.getEpochSecond)
  )

  override def create(memo: Memo): F[Boolean] = {
    IO.fromFuture(IO {
      collection.insert.one(memo).map(_ => true)
    }).to
  }

  override def update(memo: Memo): F[Option[Memo]] = ???

  override def get(uuid: String): F[Option[Memo]] = ???

  override def delete(uuid: String): F[Unit] = ???
}
