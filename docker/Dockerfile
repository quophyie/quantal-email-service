FROM node:8.1.2
# RUN mvn org.apache.maven.plugins:maven-dependency-plugin:2.6:get -Dartifact=org.springframework.boot:spring-boot-maven-plugin:LATEST
# RUN mkdir /opt/app
RUN mkdir -p /opt/app/app
RUN mkdir -p /opt/app/dist
RUN mkdir -p /opt/app/test
RUN mkdir -p /opt/app/migrations
RUN mkdir -p /opt/app/seeds
ADD app/ /opt/app/app
ADD dist/ /opt/app/dist
ADD test/ /opt/app/test/
ADD migrations/ /opt/app/migrations/
ADD seeds/ /opt/app/seeds/
ADD index.js /opt/app
ADD knexfile.js /opt/app
ADD package.json /opt/app
ADD package-lock.json /opt/app
ADD README.md /opt/app

RUN cd /opt/app && npm i

ADD docker/wait-for-it.sh /wait-for-it.sh
RUN chmod 777 /wait-for-it.sh

CMD ["/bin/bash","-c", "npm --prefix /opt/app/ start"]