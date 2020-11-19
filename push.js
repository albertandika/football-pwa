var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BOld9Kju91tLygtwPYECDQv0OyOdF23_m0jO6jv4qgIQpCYjY4IvUx7JGy2cGTHxR_U44eoWI6s5H-E-TJ4dEJI",
   "privateKey": "p6G-BVopgwZmUU-ON524rIp7XqTDVsqAhnFl4C1r63k"
};


webPush.setVapidDetails(
   'mailto:albertandika93@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fq-r4mfXaIk:APA91bHOAOQznWv1Y5yALgvggNpMV9wsl9PmHnd-MBg3pWbuNC4TSgfLboOtxPBX0xQbvbTepVOP7_V-bwaE1BMamUp-tF6kDAXs16ahQs1lA5PzoFFOB24GIAywPBqp8RvyBQrZVizs",
   "keys": {
      "p256dh": "BE3WUFBzOL+U6Mybo8i5zDT4wZz+ZyeYNW+jBD4mdjYFnh8aU11wCFHEc/DGsN1gtROVxRyIQznKGq8uJHIAgHs=",
      "auth": "rVoiic0udhjy69PeZEWNfQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '415811394288',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);