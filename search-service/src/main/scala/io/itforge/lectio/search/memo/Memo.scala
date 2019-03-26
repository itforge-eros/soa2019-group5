package io.itforge.lectio.search.memo

case class Memo(title: String,
                content: String,
                summary: String,
                tags: Set[String])
