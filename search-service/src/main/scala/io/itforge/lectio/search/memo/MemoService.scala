package io.itforge.lectio.search.memo

import io.itforge.lectio.search.auth.AuthService
import io.itforge.lectio.search.utils.{SortAsc, SortBy, SortDesc}

class MemoService[F[_]](repository: MemoRepositoryAlgebra[F]) {

  /**
    * Search and filtering
    *
    * @param query search keyword
    * @param offset start query at the offset; default: 0
    * @param limit limit query result size; default: 10
    * @param tags filter with tags
    * @param sort sorting field and ordering
    *             default ordering: ascending
    *             format: field_name:[asc|desc]
    *             example: title:desc
    */
  def query(
      query: String,
      offset: Option[Int],
      limit: Option[Int],
      tags: Set[String],
      sort: Option[String],
      userId: Option[String]): F[List[Memo]] =
    repository.searchQuery(
      query,
      offset,
      limit.orElse(Some(10)),
      tags,
      sort.flatMap(extractSortingString),
      userId)

  def findAll: F[List[Memo]] =
    repository.findAll

  private def extractSortingString(s: String): Option[SortBy] =
    s.split(":").toList match {
      case fieldName :: "asc" :: _ => Some(SortAsc(fieldName))
      case fieldName :: "desc" :: _ => Some(SortDesc(fieldName))
      case fieldName :: _ => Some(SortAsc(fieldName))
      case _ => None
    }

}

object MemoService {

  def apply[F[_]](repositoryAlgebra: MemoRepositoryAlgebra[F]) =
    new MemoService(repositoryAlgebra)

}
