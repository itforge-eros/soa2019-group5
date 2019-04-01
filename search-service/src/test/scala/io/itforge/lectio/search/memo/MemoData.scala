package io.itforge.lectio.search.memo

import java.util.UUID

trait MemoData {

  val memo1: Memo = Memo(
    UUID.fromString("92172254-427e-41c7-a8c3-21aef0df03a6"),
    "Functional Programming in Scala",
    "content",
    "summary",
    Set("tag1", "tag2"),
  )

  val memo2: Memo = Memo(
    UUID.fromString("f78ab916-6866-4e1b-9952-e4bf78490d74"),
    "Functional Programming in JavaScript",
    "content",
    "summary",
    Set("tag1", "tag2"),
  )

  val memos: List[Memo] = List(memo1, memo2)

}
