package io.itforge.lectio.search.memo

import java.time.Instant

trait MemoData {

  val memo1: Memo = Memo(
    "Functional Programming in Scala",
    "content",
    "summary",
    Set("tag1", "tag2"),
  )

  val memo2: Memo = Memo(
    "Functional Programming in JavaScript",
    "content",
    "summary",
    Set("tag1", "tag2"),
  )

  val memos: List[Memo] = List(memo1, memo2)

}
