package io.itforge.lectio.search.utils

import cats.data.Validated.Valid
import cats.data.ValidatedNel
import cats.implicits._
import org.http4s.dsl.impl.{OptionalMultiQueryParamDecoderMatcher, OptionalQueryParamDecoderMatcher}
import org.http4s.{ParseFailure, QueryParamDecoder, QueryParameterValue}

object SearchParams {

  import QueryParamDecoder._

  object Limit extends OptionalQueryParamDecoderMatcher[Int]("limit")
  object Offset extends OptionalQueryParamDecoderMatcher[Int]("offset")
  object Tags extends OptionalMultiQueryParamDecoderMatcher[String]("tags")
  object Sort extends OptionalQueryParamDecoderMatcher[String]("sort")

}

abstract class MultiQueryParamDecoderMatcher[T: QueryParamDecoder](name: String) {
  def unapply(params: Map[String, Seq[String]]): Option[List[T]] =
    params.get(name) match {
      case Some(values) =>
        Some(values.toList.traverse(s => QueryParamDecoder[T].decode(QueryParameterValue(s))))
          .map(_.getOrElse(Nil))
      case None => None
    }
}
