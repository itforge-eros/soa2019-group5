package io.itforge.lectio.search.memo

import cats.effect.IO

class MemoService(repository: MemoRepositoryAlgebra[IO]) {

  def findAll: IO[List[Memo]] =
    repository.findAll

}
