package io.itforge.lectio.search.memo

import com.danielasfregola.randomdatagenerator.magnolia.RandomDataGenerator
import org.scalacheck.rng.Seed
import org.scalacheck.{Arbitrary, Gen}

trait MemoData extends RandomDataGenerator {

  override val seed: Seed = Seed(0)

  val memo1: Memo = random[Memo]

  val memo2: Memo = random[Memo]

  val memo3: Memo = random[Memo]

  val memos: List[Memo] = List(memo1, memo2, memo3)

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
