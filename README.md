# PWA-JAVASCRIPT-SERVICEWORKER-INDEXEDDB-BACKGROUNDSYNC-PROWERSE
So this is just an learning purpose project to learn about the difference difference api such as Indexeddb and Serviceworker and etc more.

# index.html

this file is the main html file and contains the code of
# CREATING INDEXEDDB DATABASE
# UPLOADING DATA IN INDEXEDDB WITH THE FILE
# CONNECT THE JS.JS FILE

# Events of creating and updating indexeddb

    request.onupgradeneeded = function () {
        let db = request.result;
        if (!db.objectStoreNames.contains('articles')) {
            db.createObjectStore('articles', {keyPath: 'id'});
        }

    };

    request.onerror = function () {
        console.error("Unable to access database", request.error);
        console.log("Article Publish failed", request.error);
    };

    request.onsuccess = function () {
        db = request.result;
        console.log("Article Published", request.result);
    };
    
# FUNCTION TO UPLOAD FILE : function doFile(e)
# FUNCTION TO ADD DATA IN INDEXEDDB : AddData()
# FUNCTION TO ADD DATA WITH FILE IN INDEXEDDB : doFile(e)
# FUNCTION TO VIEW DATA : viewData()
# FUNCTION TO VIEW FILE : ViewFILE()

# JS.JS FILE
this file register the serviceworker and background sync API and send to sw_cashed.js 

# sw_cashed.js
this file contains all of the events of the serviceworker and contains the function to sync indexeddb data with background sync api

# sw_cached_site,js
this file contains the code of cache the website so we can see website even if the website is offline.
