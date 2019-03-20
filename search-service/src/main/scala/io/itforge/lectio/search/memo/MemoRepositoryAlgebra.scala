package io.itforge.lectio.search.memo

trait MemoRepositoryAlgebra[F[_]] {

  def findAll: F[List[Memo]]

}
