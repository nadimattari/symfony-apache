FROM dunglas/frankenphp:1-php8.2

# Install PHP extensions
RUN install-php-extensions \
    bcmath \
    gd \
    intl \
    mbstring \
    opcache \
    pdo_mysql \
    zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# PHP settings
COPY docker/server/php/php.ini /usr/local/etc/php/conf.d/extra-php-config.ini

WORKDIR /app

# Copy app (for prod builds; dev uses volume)
COPY . /app

# Install dependencies (prod env so dev-only bundles are not loaded)
RUN APP_ENV=prod composer install --no-dev --optimize-autoloader --no-interaction

# Permissions
RUN chown -R www-data:www-data /app/var /app/public 2>/dev/null || true

# The Caddyfile is mounted per environment (dev: standard mode, prod: worker mode).
ENV SERVER_NAME=:80
