
FROM openjdk:8-jre-alpine
COPY ./app.jar ./app.jar
EXPOSE 9001
CMD ["java", "-Xms128M", "-Xmx512m", "-server", "-jar", "app.jar"]