FROM node:18.3.0

LABEL version="1.0"
LABEL description="This is the base docker image for the Try It Out backend API."
LABEL maintainer = ["jackdev1@icloud.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --omit=dev
COPY . .

EXPOSE 3001

CMD ["node", "server.js"]