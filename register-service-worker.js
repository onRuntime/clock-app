"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/clock-app/expo-service-worker.js",{scope:"/clock-app/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}));