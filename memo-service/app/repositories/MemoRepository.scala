package repositories

import java.util.UUID

import cats.effect.IO
import models.Memo

trait MemoRepository {

  def findMemo(id: UUID): IO[Option[Memo]]

  def insertMemo(memo: Memo): IO[Boolean]

}
