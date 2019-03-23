package memo.domains.memo

import java.time.Instant
import java.util.UUID

case class Memo(
                 id: String = UUID.randomUUID().toString,
                 title: String = "",
                 content: String = "",
                 summary: String = "",
                 tags: Set[String] = Set.empty,
                 created_time: Instant = Instant.now(),
                 updated_time: Instant = Instant.now()
               )
