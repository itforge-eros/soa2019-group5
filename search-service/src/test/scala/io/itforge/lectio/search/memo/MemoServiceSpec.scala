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
      val result = memoService.query("keyword", None, None).unsafeRunSync()
      result must beEqualTo(memos)
    }
  }

  private val memoRepository: MemoRepositoryAlgebra[IO] = {
    val service = mock[MemoRepositoryAlgebra[IO]]
    when(service.findAll) thenReturn IO.pure(memos)
    when(service.searchQuery("keyword", None, None)) thenReturn IO.pure(memos)

    service
  }

  private val memoService = MemoService[IO](memoRepository)

}
