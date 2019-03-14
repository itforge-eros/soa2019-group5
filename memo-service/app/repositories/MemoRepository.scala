package repositories

import java.util.UUID

import models.Memo

trait MemoRepository[T[_]] {

  def findMemo(id: UUID): T[Option[Memo]]

  def insertMemo(memo: Memo): T[Boolean]

}
