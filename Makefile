app: appserver watcher

build:
	npm install
	gulp build:production

appserver:
	nginx -p . -c config/nginx.conf

watcher:
	gulp watch

setup:
	brew install node nginx
	npm install -g bower gulp
	npm install
	bower install

test:
	npm test

copyright_header:
	bundle exec ruby config/copyright_header.rb

.PHONY: appserver watcher setup test copyright_header
