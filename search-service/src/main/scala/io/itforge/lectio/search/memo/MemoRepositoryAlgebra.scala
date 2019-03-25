package io.itforge.lectio.search.memo

trait MemoRepositoryAlgebra[F[_]] {

  def findAll: F[List[Memo]]

  def searchQuery(query: String,
                  offset: Option[Int],
                  limit: Option[Int],
                  tags: Set[String]): F[List[Memo]]

}
