FROM ruby:2.5.1

ENV LANG C.UTF-8

RUN apt-get update -yqq && apt-get install -yqq build-essential

RUN curl https://deb.nodesource.com/setup_8.x \
         --location \
         --silent \
    | bash - \
    && apt-get install -yqq nodejs

RUN useradd --user-group \
            --create-home \
            --shell /bin/false \
            app

ENV HOME=/home/app

USER app
WORKDIR $HOME

COPY --chown=app:app Gemfile* $HOME/
COPY --chown=app:app package* $HOME/
RUN bundle install --jobs=20 --clean
RUN npm install

COPY . $HOME/

CMD ["jekyll", "s", "--host", "0.0.0.0"]
