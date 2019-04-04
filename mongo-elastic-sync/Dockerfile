FROM rwynn/monstache:4.16.1
COPY config.toml config.toml
ENTRYPOINT ["monstache", "--enable-http-server", "-f", "config.toml"]