//service worker file

//cashing

//cash with one by one assets
const cashName = 'v1';
const cashAssets = [
    'index.html',
    'second.html',
    'css.css',
    'js.js'
]


//call install events
self.addEventListener('install', (e) => {
    console.log('service worker is installlled....')

    //wait until get rid of serviceworker
    e.waitUntil(
        //caches API
        caches.open(cashName).then(cache => {
            console.log('CACHING FILES BROOO!')
            cache.addAll(cashAssets)
        }).then(() => self.skipWaiting())
    );
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
    );
});

//main sync event to run background sync
self.addEventListener('sync', function (event) {
    if (event.tag === 'sync-messages') {
        console.log('SYNC is running Broooooo!...');
        event.waitUntil(syncdatafun());
    } else {
        window.alert('sync didnt worked broooo!');
    }
});

//call fetch event offline mode
self.addEventListener('fetch', e => {
    console.log('Service Worker Fetching...');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )

})

//-----------------------------------------------------


//function to sync the data from indexeddb
function syncdatafun() {

    console.log('SYNC DATA FUNCTION FIRED.....')

    var request = indexedDB.open('DATABASE1', 1);

    request.onsuccess = function (e) {
        // e.target.result has the connection to the database
        let dbd = e.target.result;

        console.log(dbd);
        console.log("DB Opened!" + `${dbd}`);

        let transaction = dbd.transaction("articles", "readwrite");
        // Access an object store
        let articles = transaction.objectStore("articles");
        const request = articles.openCursor();
        request.onsuccess = e => {
            const cursor = e.target.result
            if (cursor) {
                //alert(`ID: ${cursor.key} Topics: ${cursor.value.text} `)
                console.log(`indexeddb data : keys: ${cursor.key} and values: ${cursor.value.text}`);
                MainData.push(cursor.key + cursor.value.text);
                sendDataToServer(cursor.value, cursor.key);
                cursor.continue()
            }
        }
        request.onerror = function (error) {
            console.error('IndexedDB error:', error)
        }

        // order sent to the server
        function sendDataToServer(data, index) {
            fetch('index.html', {
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => {
                if (response) {
                    console.log(`delete data here... ${index}`)
                    //deleteFromIndexdb(index)
                }
            });
        }

    }

    request.onerror = function (e) {
        console.log(e);
    };


}