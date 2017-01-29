all:
	sudo apt-get install -y zlib1g-dev ruby ruby-dev build-essential
	curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash 
	sudo apt-get install -y nodejs
	sudo gem install jekyll bundler
	bundler update
	bundler install
	sudo npm install
	npm rebuild node-sass
test:
	gulp serve
