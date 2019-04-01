package io.itforge.lectio.search.config

final case class ServerConfig(host: String, port: Int)
final case class ElasticSearchConfig(uri: String, memosIndex: String)
final case class SearchServiceConfig(server: ServerConfig, elastic: ElasticSearchConfig)
