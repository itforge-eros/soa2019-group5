package io.itforge.lectio.search.memo

class MemoService[F[_]](repository: MemoRepositoryAlgebra[F]) {

  def findAll: F[List[Memo]] =
    repository.findAll

  def query(query: String,
            offset: Option[Int],
            limit: Option[Int],
            tags: Set[String]): F[List[Memo]] =
    repository.searchQuery(query, offset, limit, tags)

}

object MemoService {

  def apply[F[_]](repositoryAlgebra: MemoRepositoryAlgebra[F]) =
    new MemoService(repositoryAlgebra)

}
