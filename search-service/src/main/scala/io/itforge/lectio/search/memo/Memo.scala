package io.itforge.lectio.search.memo

case class Memo(uuid: String,
                title: String,
                content: String,
                summary: String,
                tags: Set[String])
