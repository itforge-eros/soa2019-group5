package io.itforge.lectio.search.utils

sealed trait SortBy
case class SortDesc(field: String) extends SortBy
case class SortAsc(field: String) extends SortBy
