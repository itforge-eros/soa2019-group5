package io.itforge.lectio.search.memo

import java.util.UUID

case class Memo(uuid: UUID, title: String, content: String, tags: Set[String], user_id: UUID)
