package v1.memo

import javax.inject.Inject
import play.api.routing.Router.Routes
import play.api.routing.SimpleRouter
import play.api.routing.sird._

class MemoRouter @Inject()(controller: MemoController) extends SimpleRouter {
  val prefix = "/v1/memos"

  override def routes: Routes = {
    case GET(p"/$id") =>
      controller.get(id)
  }
}
