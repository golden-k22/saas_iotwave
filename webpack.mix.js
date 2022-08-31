const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/notification.js', 'public/js')
    .js('resources/js/alarmRecordDashboard.js', 'public/js')
    .js('resources/js/alarmSettingDashboard.js', 'public/js')
    .js('resources/js/gatewayDashboard.js', 'public/js')
    .js('resources/js/deviceDashboard.js', 'public/js')
    .js('resources/js/groupDashboard.js', 'public/js')
    .js('resources/js/realtimeDashboard.js', 'public/js')
    .js('resources/js/reportDashboard.js', 'public/js')
    .sass('resources/sass/bootstrap.scss', 'public/css')
    .sass('resources/sass/custom.scss', 'public/css');