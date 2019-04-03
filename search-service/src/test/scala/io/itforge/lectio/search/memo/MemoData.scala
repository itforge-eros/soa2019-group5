package io.itforge.lectio.search.memo

import java.util.UUID

import com.danielasfregola.randomdatagenerator.RandomDataGenerator
import org.mockito.MockitoSugar._
import org.mockito.stubbing.ReturnsDeepStubs
import org.scalacheck.{Arbitrary, Gen}
import org.scalacheck._

import scala.reflect.runtime.universe._
import scala.util.{Failure, Success, Try}

trait MemoData extends RandomDataGenerator {

//  val memo1: Memo = Memo(
//    UUID.fromString("92172254-427e-41c7-a8c3-21aef0df03a6"),
//    "Functional Programming in Scala",
//    "content",
//    "summary",
//    Set("tag1", "tag2"),
//  )
  val memo1: Memo = random[Memo]

//  val memo2: Memo = Memo(
//    UUID.fromString("f78ab916-6866-4e1b-9952-e4bf78490d74"),
//    "Functional Programming in JavaScript",
//    "content",
//    "summary",
//    Set("tag1", "tag2"),
//  )

  val memo2: Memo = random[Memo]

  val memos: List[Memo] = List(memo1, memo2)

  private implicit def arbitraryMemo: Arbitrary[Memo] = Arbitrary {
    for {
      uuid <- Gen.uuid
      title <- Gen.alphaStr.map(_.take(10))
      content <- Gen.alphaStr.map(_.take(20))
      tags <- Gen.listOfN(5, Gen.alphaStr.map(_.take(5)))
      user_id <- Gen.uuid
    } yield Memo(uuid, title, content, tags.toSet, user_id)
  }

}
