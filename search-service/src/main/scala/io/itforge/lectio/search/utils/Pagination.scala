package io.itforge.lectio.search.utils

import org.http4s.QueryParamDecoder
import org.http4s.dsl.impl.OptionalQueryParamDecoderMatcher

object Pagination {

  /* Necessary for decoding query parameters */
  import QueryParamDecoder._

  /* Parses out the optional offset and page size params */
  object Limit extends OptionalQueryParamDecoderMatcher[Int]("limit")
  object Offset extends OptionalQueryParamDecoderMatcher[Int]("offset")

}
