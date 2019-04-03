package io.itforge.lectio.search.memo

import cats.effect.IO
import org.mockito.MockitoSugar._

class MemoServiceSpec extends org.specs2.mutable.Specification with MemoData {

  "findAll memos" >> {
    "return correct memos" >> {
      val result = memoService.findAll.unsafeRunSync()
      result must beEqualTo(memos)
    }
  }

  "search memos" >> {
    "return correct memos" >> {
      val result =
        memoService.query(memo1.title, Some(0), Some(10), Set(), None, None).unsafeRunSync()
      result must beEqualTo(memo1 :: Nil)
    }
  }

  private val memoRepository: MemoRepositoryAlgebra[IO] = {
    val service = mock[MemoRepositoryAlgebra[IO]]
    when(service.findAll).thenReturn(IO.pure(memos))
    when(service.searchQuery(memo1.title, Some(0), Some(10), Set(), None, None))
      .thenReturn(IO.pure(memo1 :: Nil))

    service
  }

  private val memoService = MemoService[IO](memoRepository)

}
