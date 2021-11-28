FROM node:latest

ENV APP_PATH=/react-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npx create-react-app . --template redux
RUN yarn add @headlessui/react
RUN yarn add @heroicons/react
RUN yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
RUN yarn add @craco/craco