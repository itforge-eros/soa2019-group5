package io.itforge.lectio.search.memo

class MemoService[F[_]](repository: MemoRepositoryAlgebra[F]) {

  def findAll: F[List[Memo]] =
    repository.findAll

  def query(query: String): F[List[Memo]] =
    repository.searchQuery(query)

}

object MemoService {

  def apply[F[_]](repositoryAlgebra: MemoRepositoryAlgebra[F]) =
    new MemoService(repositoryAlgebra)

}
