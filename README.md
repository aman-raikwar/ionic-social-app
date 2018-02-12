


ionic start studyfeed sidemenu
cd studyfeed
ionic serve
ionic serve -a $IP -p $PORT --no-livereload


ionic g page intro

ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage

ionic g page country
ionic g provider RestApi
ionic g pipe search
ionic g pipe sort
ionic g page notes
ionic g page contacts
ionic g page ladder
ionic g page country-detail
ionic generate component country-detail-form

sudo npm install firebase angularfire2 --save


ionic link
sudo npm install @ionic/app-scripts@latest @ionic/pro@latest
ionic info
ionic cordova platform add android
ionic link --pro-id 0db67374
cordova plugin add cordova-plugin-ionic --save --variable APP_ID="0db67374" --variable CHANNEL_NAME="Master" --variable UPDATE_METHOD="background"
git push ionic master




Notes:

https://github.com/angular/angularfire2
https://github.com/angular/angularfire2/blob/master/docs/rtdb/lists.md