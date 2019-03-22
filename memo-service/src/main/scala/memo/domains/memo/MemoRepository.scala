package memo.domains.memo

trait MemoRepository[F[_]] {
  def create(memo: Memo): F[Boolean]

  def update(memo: Memo): F[Option[Memo]]

  def get(uuid: String): F[Option[Memo]]

  def delete(uuid: String): F[Unit]
}
