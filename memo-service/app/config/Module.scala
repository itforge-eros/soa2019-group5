package config

import com.google.inject.AbstractModule
import com.google.inject.name.Names
import repositories.MemoRepository
import repositories.mongo.MemoMongo

class Module extends AbstractModule {

  override def configure(): Unit = {
    bind(classOf[MemoRepository]) to classOf[MemoMongo]
  }

}
