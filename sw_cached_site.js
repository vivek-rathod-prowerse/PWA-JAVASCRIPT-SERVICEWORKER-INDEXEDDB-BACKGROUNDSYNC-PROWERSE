//service worker file

//cashing

//cash with one by one assets
const cashName = 'v2';


//call install events
self.addEventListener('install', (e) => {
    console.log('service worker is installlled....')
});

//call activate events
self.addEventListener('activate', (e) => {
    console.log('service worker is activated....')

    //get rid of unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cashName) {
                        console.log('service worker clearing old caches');
                        return caches.delete(cache);
                    }
                })
            );
        })
    )
    ;
});

//call fetch event offline mode
self.addEventListener('fetch', e => {
    console.log('Service Worker Fetching...');
    e.respondWith(
        fetch(e.request).then(res => {
            //make clone of response server
            const resClone = res.clone();
            //open cache
            caches.open(cashName).then(cache => {
                //add the response to cache
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => caches.match(e.request)).then(res => res)
    )

})


//to read indexeddb database
function readDB() {
    indexedDB.open('DATABASE1', 1).then(function (db) {
        var tx = db.transaction(['articles'], 'readonly');
        var store = tx.objectStore('articles');
        return store.getAll();
    }).then(function (items) {
        // Use beverage data
    });
}

