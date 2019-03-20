package io.itforge.lectio.search.memo

import java.time.Instant

case class Memo(
  title: String,
  content: String,
  summary: String,
  tags: Set[String],
  created_time: Instant,
  updated_time: Instant
)
