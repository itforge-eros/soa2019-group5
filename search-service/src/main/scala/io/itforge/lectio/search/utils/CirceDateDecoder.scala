package io.itforge.lectio.search.utils

import java.util.Date

import io.circe.{Decoder, Encoder}

import scala.util.{Failure, Success, Try}

trait CirceDateDecoder {
  val format = new java.text.SimpleDateFormat("yyyy-MM-dd")
  implicit val decodeDate: Decoder[Date] = Decoder.decodeString.emap { s =>
    Try(format.parse(s)) match {
      case Success(value) => Right(value)
      case Failure(_) => Left("Cannot parse \"${s}\" to Date")
    }
  }
  implicit val encodeDate: Encoder[Date] =
    Encoder.encodeString.contramap[Date](_.toInstant.toString)
}
