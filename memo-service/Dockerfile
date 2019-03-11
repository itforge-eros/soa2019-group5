FROM openjdk:8-jre
COPY dist /dist
EXPOSE 9000
CMD /dist/bin/start -Dhttp.port=9000 -Dplay.secret.key=secretsecret121232121 -Dpidfile.path=/dev/null