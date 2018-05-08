FROM node:9

MAINTAINER Ales Dostal <a.dostal@apitree.cz>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN npm install

# Delete .npmrc. It is needed for npm install, but contains private key to NPM repository and we don't want to leave that in a docker image.
#RUN rm .npmrc

# Build application, because Next.js have random HASH and BULD_ID
RUN cd /usr/src/app && npm run build

EXPOSE 8080
CMD ["npm", "start"]
