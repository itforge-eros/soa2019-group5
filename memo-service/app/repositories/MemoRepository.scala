package repositories

import java.util.UUID

import cats.effect.IO
import models.{Memo, MemoForm}

trait MemoRepository {

  def updateMemo(id: UUID, modifier: MemoForm): IO[Boolean]

  def findMemo(id: UUID): IO[Option[Memo]]

  def insertMemo(memo: Memo): IO[Boolean]

}
