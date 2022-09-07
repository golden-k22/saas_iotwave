## Introduction

This project is based on Wave. [Wave](https://devdojo.com/wave) is a Software as a Service Starter Kit that can help you build your next great idea 💰. Wave is built with [Laravel](https://laravel.com), [Voyager](https://voyager.devdojo.com), [TailwindCSS](https://tailwindcss.com), and a few other awesome technologies. Here are some of the awesome features ✨:

 - [Authentication](https://wave.devdojo.com/docs/features/authentication)
 - [User Profiles](https://wave.devdojo.com/docs/features/user-profiles)
 - [User Impersonation](https://wave.devdojo.com/docs/features/user-impersonation)
 - [Subscriptions](https://wave.devdojo.com/docs/features/billing)
 - [Subscription Plans](https://wave.devdojo.com/docs/features/subscription-plans)
 - [User Roles](https://wave.devdojo.com/docs/features/user-roles)
 - [Notifications](https://wave.devdojo.com/docs/features/notifications)
 - [Announcements](https://wave.devdojo.com/docs/features/announcements)
 - [Fully Functional Blog](https://wave.devdojo.com/docs/features/blog)
 - [Out of the Box API](https://wave.devdojo.com/docs/features/api)
 - [Voyager Admin](https://wave.devdojo.com/docs/features/admin)
 - [Customizable Themes](https://wave.devdojo.com/docs/features/themes)




## Installation

To install Wave, you'll want to clone or download this repo:

```
git clone https://github.com/JOTFIRST/saas_iotwave.git project_name
```

Next, we can install Wave with these **4 simple steps**:

### 1. Create a New Database

During the installation we need to use a PostgreSQL database. You will need to create a new database and save the credentials for the next step.

### 2. Copy the `.env.example` file

We need to specify our Environment variables for our application. You will see a file named `.env.example`, you will need to duplicate that file and rename it to `.env`.

Then, open up the `.env` file and update your *DB_DATABASE*, *DB_USERNAME*, and *DB_PASSWORD* in the appropriate fields. You will also want to update the *APP_URL* to the URL of your application.

```bash
APP_NAME=Wave
APP_ENV=local
APP_KEY=base64:8dQ7xw/kM9EYMV4cUkzKgET8jF4P0M0TOmmqN05RN2w=
APP_DEBUG=false
APP_LOG_LEVEL=debug
APP_URL=https://iotwave.tpitservice.com

MIX_APP_URL=https://iotwave.tpitservice.com
MIX_IOT_APP_URL=https://saas.iotim.tpitservice.com
MIX_IOT_MQTT_SERVER_URL=wss://saas.mqtt.tpitservice.com:8083
MIX_PROTOCOL_TYPE=wss
APP_TIMEZONE='Asia/Singapore'

DEFAULT_PASSWORD=password

DB_CONNECTION=pgsql
DB_HOST=private-app-82ccd341-8d5f-42fb-a861-ba64cd35858b-do-user-103446.b.db.ondigitalocean.com
DB_PORT=25060
DB_DATABASE=saastempdb
DB_USERNAME=saas_iot360
DB_PASSWORD=AVNS_a6KGm2X7OJlD6ntwROw
```


### 3. Add Composer Dependencies

Next, we will need to install all our composer dependencies by running the following command:

```php
composer install
```
### 4. Run Migrations and Seeds

We need to migrate our database structure into our database, which we can do by running:

```php
php artisan migrate
```
<br>
Finally, we will need to seed our database with the following command:

```php
php artisan db:seed
```
<br>

🎉 And that's it! You will now be able to visit your URL and see your Wave application up and running.


## Watch, Learn, and Build

We've also got a full video series on how you can setup, build, and configure Wave. 🍿 You can watch first few videos for free, and additional videos will require a [DevDojo Pro](https://devdojo.com/pro) subscription. By subscribing to a [DevDojo Pro](https://devdojo.com/pro) subscription you will also be supporting the ongoing development of this project. It's a win win! 🙌

[Click here to watch the Wave Video Series](https://devdojo.com/course/wave).


## Documentation

Checkout the [official documentation here](https://wave.devdojo.com/docs).
