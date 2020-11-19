if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

//tambahkan ini untuk pengecekan notification
if ("Notification" in window) {
    requestPermissionNotif();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}


// cek notification in browser
function requestPermissionNotif() {
    Notification.requestPermission().then(function (result) {
        if (result === "denied") {
            console.log(" Fitur notifikasi tidak diizinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan izin.");
            return;
        }

        if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(function (registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BOld9Kju91tLygtwPYECDQv0OyOdF23_m0jO6jv4qgIQpCYjY4IvUx7JGy2cGTHxR_U44eoWI6s5H-E-TJ4dEJI")
                }).then(function (subscribe) {
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function (e) {
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                });
            });
        }
    });
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}