// make sure sw are supported

if ('serviceWorker' in navigator) {
    console.log('Service Worker Supported Brooo!')
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw_cashed.js').then(() => navigator.serviceWorker.ready)
            //registering the background sync and tag name is : sync-messages
            .then(registeration => {
                //registeration.sync.register('\'sync-messages\'')
                if ('SyncManager' in window) {
                    registeration.sync.register('sync-messages')
                    console.log('successfully registered SYNC')
                }
            })
            .catch(err => console.log(`Service Worker Error brooo! ${err}`))
    })
}


/* without registration of background sync

if ('serviceWorker' in navigator) {
    console.log('Service Worker Supported Brooo!')
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw_cashed.js').then(reg => console.log('service worker registered brooo!')).catch(err => console.log(`Service Worker Error brooo! ${err}`))
    })
}


 */