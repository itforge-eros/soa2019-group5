package models

import java.time.LocalDateTime
import java.util.UUID

import reactivemongo.bson.{BSONDocument, BSONDocumentWriter}

case class MemoForm(title: String, content: String, summary: String, tags: Set[String])
case class Memo(
                 id: UUID = UUID.randomUUID,
                 title: String = "",
                 content: String = "",
                 summary: String = "",
                 tags: Set[String] = Set.empty,
                 created_time: LocalDateTime = LocalDateTime.now(),
                 updated_time: LocalDateTime = LocalDateTime.now()
               )

object MemoForm {
  implicit val memoWriter: BSONDocumentWriter[MemoForm] =
    BSONDocumentWriter[MemoForm] { memoForm: MemoForm =>
      BSONDocument(
        "title" -> memoForm.title,
        "content" -> memoForm.content,
        "summary" -> memoForm.summary,
        "tags" -> memoForm.tags
      )
    }
}