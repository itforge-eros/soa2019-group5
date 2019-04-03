package io.itforge.lectio.search.memo

import io.itforge.lectio.search.utils.SortBy

trait MemoRepositoryAlgebra[F[_]] {

  def findAll: F[List[Memo]]

  def searchQuery(
      query: String,
      offset: Option[Int],
      limit: Option[Int],
      tags: Set[String],
      sortBy: Option[SortBy],
      userId: Option[String]): F[List[Memo]]

}
