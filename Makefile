deploy:
	rm -rf vendor \
	&& composer install \
	&& bin/console c:c \
	&& bin/console c:w \
	&& rm -rf node_modules \
	&& npm install \
	&& npm run build
