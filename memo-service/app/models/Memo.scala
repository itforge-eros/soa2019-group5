package models

import java.time.LocalDateTime
import java.util.UUID

case class Memo(
                 id: UUID = UUID.randomUUID,
                 title: String = "",
                 content: String = "",
                 summary: String = "",
                 tags: Set[String] = Set.empty,
                 created_time: LocalDateTime = LocalDateTime.now(),
                 updated_time: LocalDateTime = LocalDateTime.now()
               )
