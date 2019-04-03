

organization := "io.itforge"
name := "search-service"
version := "1.0.0"
scalaVersion := "2.12.8"

val http4sVersion = "0.20.0-M6"
val specs2Version = "4.1.0"
val logbackVersion = "1.2.3"
val elastic4sVersion = "6.5.1"
val mockitoVersion = "1.2.1"
val catsVersion = "1.6.0"
val circeVersion = "0.11.1"
val circeConfigVersion = "0.6.1"
val jwtScalaVersion = "2.1.0"
val randomDataGeneratorVersion = "2.6"

libraryDependencies ++= Seq(
  "org.typelevel"             %% "cats-core"              % catsVersion,
  "org.http4s"                %% "http4s-blaze-server"    % http4sVersion,
  "org.http4s"                %% "http4s-circe"           % http4sVersion,
  "org.http4s"                %% "http4s-dsl"             % http4sVersion,
  "org.specs2"                %% "specs2-core"            % specs2Version     % Test,
  "ch.qos.logback"            %  "logback-classic"        % logbackVersion,
  "com.sksamuel.elastic4s"    %% "elastic4s-core"         % elastic4sVersion,
  "com.sksamuel.elastic4s"    %% "elastic4s-http"         % elastic4sVersion,
  "com.sksamuel.elastic4s"    %  "elastic4s-circe_2.12"   % elastic4sVersion,
  "com.sksamuel.elastic4s"    %% "elastic4s-cats-effect"  % elastic4sVersion,
  "com.sksamuel.elastic4s"    %% "elastic4s-testkit"      % elastic4sVersion  % Test,
  "com.sksamuel.elastic4s"    %% "elastic4s-embedded"     % elastic4sVersion  % Test,
  "org.mockito"               %  "mockito-scala_2.12"     % mockitoVersion,
  "io.circe"                  %% "circe-generic"          % circeVersion,
  "io.circe"                  %% "circe-literal"          % circeVersion,
  "io.circe"                  %% "circe-generic-extras"   % circeVersion,
  "io.circe"                  %% "circe-parser"           % circeVersion,
  "io.circe"                  %% "circe-config"           % circeConfigVersion,
  "com.pauldijou"             %% "jwt-core"               % jwtScalaVersion,
  "com.pauldijou"             %% "jwt-circe"              % jwtScalaVersion,
  "com.danielasfregola"       %% "random-data-generator"  % randomDataGeneratorVersion,
)
addCompilerPlugin("org.spire-math" %% "kind-projector"     % "0.9.6")
addCompilerPlugin("com.olegpy"     %% "better-monadic-for" % "0.2.4")
addCompilerPlugin("org.scalamacros" % "paradise" % "2.1.0" cross CrossVersion.full)
enablePlugins(ScalafmtPlugin)

assemblyMergeStrategy in assembly := {
  case x if Assembly.isConfigFile(x) =>
    MergeStrategy.concat
  case PathList(ps @ _*) if Assembly.isReadme(ps.last) || Assembly.isLicenseFile(ps.last) =>
    MergeStrategy.rename
  case PathList("META-INF", xs @ _*) =>
    xs map {_.toLowerCase} match {
      case "manifest.mf" :: Nil | "index.list" :: Nil | "dependencies" :: Nil =>
        MergeStrategy.discard
      case ps @ x :: xs if ps.last.endsWith(".sf") || ps.last.endsWith(".dsa") =>
        MergeStrategy.discard
      case "plexus" :: xs =>
        MergeStrategy.discard
      case "services" :: xs =>
        MergeStrategy.filterDistinctLines
      case "spring.schemas" :: Nil | "spring.handlers" :: Nil =>
        MergeStrategy.filterDistinctLines
      case _ => MergeStrategy.last
    }
  case _ => MergeStrategy.last
}

scalacOptions ++= Seq(
  "-deprecation",
  "-encoding", "UTF-8",
  "-language:higherKinds",
  "-language:postfixOps",
  "-feature",
  "-Ypartial-unification",
  "-Xfatal-warnings",
)
