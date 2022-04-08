FROM ubuntu:18.04

WORKDIR /home
COPY . /home
EXPOSE 3030

RUN mkdir /root/.nvm

ENV NVM_DIR   /root/.nvm
ENV NODE_VERSION 14.18.0
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN apt -y update && apt -y upgrade && apt -y install curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION
RUN npm install

ENTRYPOINT ["npm", "start"]