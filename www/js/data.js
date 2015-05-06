angular.module('mobionicApp.data', [])

// Home Data: Home page configuration
/*
.factory('Data', function(){

    var data = {};

    data.items = [
        {
            title: 'News',
            icon: 'ion-ios7-calendar-outline',
            note: 'Latest News',
            url: '#/app/news'
        },
        {
            title: 'Products',
            icon: 'ion-ios7-cart',
            note: 'Our Products',
            url: '#/app/products'
        },
        {
            title: 'Gallery',
            icon: 'ion-images',
            note: 'Our Photos',
            url: '#/app/gallery'
        },
        {
            title: 'Map',
            icon: 'ion-map',
            note: 'Find Us',
            url: '#/app/map'
        },
        {
            title: 'About',
            icon: 'ion-person-stalker',
            note: 'About Us',
            url: '#/app/about'
        },
        {
            title: 'Contact',
            icon: 'ion-email',
            note: 'Contact Us',
            url: '#/app/contact'
        },
        {
            title: 'RSS',
            icon: 'ion-social-rss',
            note: 'RSS Feed',
            url: '#/app/feeds'
        },
        {
            title: 'Wordpress JSON',
            icon: 'ion-social-wordpress',
            note: 'JSON API plugin',
            url: '#/app/posts'
        },
        {
            title: 'Wordpress Pagination',
            icon: 'ion-ionic',
            note: 'Server Side',
            url: '#/app/serverposts'
        },
        {
            title: 'Mobile Plugins',
            icon: 'ion-iphone',
            note: 'Cordova/PhoneGap',
            url: '#/app/plugins'
        },
    ];
    */
    .factory('Data', function($http, $q, NewsStorage) {

    var json = 'json/news.json';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.result;
        NewsStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = NewsStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(newId) { return data[newId]; };

    return service;
})

// Menu Data: Menu configuration
.factory('MenuData', function(){
    var data = {};


    data.items = [
        {
            title: 'Home',
            icon: 'ion-ios7-home',
            url: '#/app'
        },
        {
            title: 'O Clube',
            icon: 'ion-person-stalker',
            url: '#/app/jogadores'
        },
        {
            title: 'Noticias',
            icon: 'ion-ios7-paper-outline',
            url: '#/app/posts'
        },
         {
            title: 'Galeria',
            icon: 'ion-images',
           
             subMenu: [
                {
                    title: "Fotos",
                    url: '#/app/fotos',
                    icon:"ion-android-image",
                },
                {
                    title: "Videos",
                    url: '#/app/videos',
                    icon:"ion-social-youtube",
                },
                {
                    title: "Papeis de Parede",
                    url: '#/app/papeis_de_parede',
                    icon:"ion-wand",
                }] 
        },
         {
            title: 'Partidas',
            icon:"ion-ios7-football",
            subMenu: [
                {
                    title: "Tempo Real",
                    url: '#/app/tempo_real',
                    icon:"ion-monitor",
                },
                {
                    title: "Proximos Jogos",
                    url: '#/app/proximos_jogos',
                    icon:"ion-calendar",
                }]  
        },
        {
            title: 'Loja Oficial',
            icon: 'ion-ios7-cart',
            url: '#/app/products'
        },
        {
            title: 'Socio Torcedor',
            icon: 'ion-android-star',
            url: '#/app/socio'
        },
         {
            title: 'Ingressos',
            icon: 'ion-card',
            url: '#/app/ingressos'
        },
        {
            title: 'Mais',
            icon: 'ion-more',
             subMenu: [
                {
                    title: "Newsletter",
                    url: '#/app/member',
                    icon:"ion-paper-airplane",
                },
                {
                    title: "Contatos",
                    url: '#/app/contatos',
                    icon:"ion-ios7-email",
                },
                {
                    title: "Ajustes",
                    url: '#/app/settings',
                    icon:"ion-ios7-gear",
                },
                 {
            title: 'Plugins',
            icon: 'ion-code',
            url: '#/app/plugins'
        }]  
        }
        // {
        //     title: 'Elements',
        //     icon: 'ion-code',
        //     url: '#/app/elements'
        // },
        
        // {
        //     title: 'Tabs',
        //     icon: 'ion-ios7-albums-outline',
        //     url: '#/app/tabs'
        // },
        // {
        //     title: 'Grid',
        //     icon: 'ion-grid',
        //     url: '#/app/grid'
        // }
        
    ];

    return data;
})

// Plugins Data: Mobile Plugins configuration
.factory('PluginsData', function(){
    var data = {};

    data.items = [
        {
            title: 'Device',
            icon: 'ion-ipad',
            note: 'Device API',
            url: '#/app/plugins/device'
        },
        {
            title: 'Geolocation',
            icon: 'ion-location',
            note: 'Geolocation API',
            url: '#/app/plugins/geolocation'
        },
        {
            title: 'Notifications',
            icon: 'ion-alert',
            note: 'Dialogs API',
            url: '#/app/plugins/notifications'
        },
        {
            title: 'Barcode',
            icon: 'ion-qr-scanner',
            note: 'Barcode Scanner',
            url: '#/app/plugins/barcodescanner'
        }
    ];

    return data;
})

// Map Data: Map configuration
.factory('MapData', function(){
    var data = {};

    data.map = {
        zoom: 12,
        center: {
            latitude: 40.74,
            longitude: -74.18
        },
        markers: [
        {
            id: 1,
            icon: 'img/blue_marker.png',
            latitude: 40.71,
            longitude: -74.21,
            title: 'This is our main store'
        },
        {
            id: 2,
            latitude: 40.72,
            longitude: -74.20,
            title: 'This is our second store'
        },
        {
            id: 3,
            latitude: 40.73,
            longitude: -74.19,
            title: 'This is our third store'
        },
        {
            id: 4,
            latitude: 40.74,
            longitude: -74.18,
            title: 'This is our fourth store'
        },
        {
            id: 5,
            latitude: 40.75,
            longitude: -74.17,
            title: 'This is our fifth store'
        },
        {
            id: 6,
            latitude: 40.76,
            longitude: -74.16,
            title: 'This is our sixth store'
        },
        {
            id: 7,
            icon: 'img/plane.png',
            latitude: 40.77,
            longitude: -74.15,
            title: 'Airport'
        }]
    };

    return data;
})


// News Data: JSON
.factory('FotosData', function($http, $q, FotosStorage) {

    var json = 'https://api.instagram.com/v1/users/698161208/media/recent/?access_token=206080583.5b9e1e6.3530d3cd24ea4328af6e09f335122038&count=24';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.data;
        console.log(data);
        FotosStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = FotosStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(fotoId) { return data[fotoId]; };

    return service;
})

// News Data: JSON
.factory('NewsData', function($http, $q, NewsStorage) {

    var json = 'json/news.json?v=2';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.result;
        NewsStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = NewsStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(newId) { return data[newId]; };

    return service;
})

// Products Data: JSON
.factory('ProductsData', function($http, $q, ProductsStorage) {

    var json = 'json/products.json?v=2';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.result;
        ProductsStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = ProductsStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(productId) { return data[productId]; };

    service.getLetterLimit = function() { return 100; };

    return service;
})

// Gallery Data: Gallery configuration
.factory('VideosData', function($http, $q, VideosStorage) {

    var json = 'http://gdata.youtube.com/feeds/users/siteoficialfortaleza/uploads?&alt=json&start-index=2';
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.feed.entry;
        VideosStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = VideosStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(videoId) { return data[videoId]; };

    return service;
})

// About Data: JSON
.factory('AboutData', function($http, $q, AboutStorage) {

    var json = 'json/about.json';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.result;
        AboutStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = AboutStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(memberId) { return data[memberId]; };

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('PostsData', function($http, $q, PostsStorage) {

    /* (For DEMO purposes) Local JSON data */
    var json = 'http://www.fortalezaec.net/Json/Noticias?first=0&limit=20';

    /* Set your URL as you can see in the following example */
    // var json = 'YourWordpressURL/?json=get_recent_posts';

    /* With user-friendly permalinks configured */
    // var json = 'YourWordpressURL/api/get_recent_posts';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.Model;
        PostsStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = PostsStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(postId) { //console.log(data.posts);
	    return data.Noticias[postId];
	};

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('TempoRealData', function($http, $q, TempoRealStorage) {

    /* (For DEMO purposes) Local JSON data */
    var json = 'http://179.188.17.9/~fortalezaapp/webservice/tempo_real.php?ver=tempo_real';


    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {

        data = d.channel.item.dadosevento;
        var dataJogoFull = d.channel.item.data;
        var dataJogo = dataJogoFull.replace("-", "<br/>");;
       	data['data'] = dataJogo;
       	var escudo1 = StrToURL(d.channel.item.dadosevento.time1);
       	// escudo1 = escudo1.;
      	data['escudo_1'] = 'http://e.imguol.com/futebol/brasoes/40x40/'+escudo1.toLowerCase()+'.png';
      	var escudo2 = StrToURL(d.channel.item.dadosevento.time2);
      	//var escudo2 = escudo2.toLowerCase();
      	data['escudo_2'] = 'http://e.imguol.com/futebol/brasoes/40x40/'+escudo2.toLowerCase()+'.png';


        TempoRealStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = TempoRealStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(tempoId) { //console.log(data.posts);
	    return data[tempoId];
	};

    return service;
})
.factory('LancesData', function($http, $q, LancesStorage) {

    /* (For DEMO purposes) Local JSON data */
    var json = 'http://globoesporte.globo.com/ce/futebol/campeonato-cearense/jogo/26-04-2015/fortaleza-ceara/mensagens.json';


    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {

		console.log(Object.keys(d).length);

        //data['equipe_visitante'] = d.jogo.equipe_visitante.nome;


				LancesStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = LancesStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(lanceId) { //console.log(data.posts);
	    return data[lanceId];
	};

    return service;
})
// Posts Data: JSON Wordpress Posts configuration
.factory('DestaquesData', function($http, $q, DestaquesStorage) {

    /* (For DEMO purposes) Local JSON data */
    var json = 'http://www.fortalezaec.net/Json/DestaquesMaiores?visivel=true';

    /* Set your URL as you can see in the following example */
    // var json = 'YourWordpressURL/?json=get_recent_posts';

    /* With user-friendly permalinks configured */
    // var json = 'YourWordpressURL/api/get_recent_posts';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.Model;
        DestaquesStorage.save(data);
        deferred.resolve();

    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = DestaquesStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(postId) { //console.log(data.posts);
	    return data.Noticias[postId];
	};

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('JogadoresData', function($http, $q, JogadoresStorage) {

    /* (For DEMO purposes) Local JSON data */
    var json = 'http://www.fortalezaec.net/Json/Jogadores?categoriaId=00e967dfc6f74ca5b523546ce9cce0f2';

    /* Set your URL as you can see in the following example */
    // var json = 'YourWordpressURL/?json=get_recent_posts';

    /* With user-friendly permalinks configured */
    // var json = 'YourWordpressURL/api/get_recent_posts';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.Model;
        JogadoresStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = JogadoresStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(jogadorId) {
	    return data[jogadorId];
	};

    return service;
})
// ServerPosts Data: JSON Wordpress Posts configuration with Server Side pagination
.factory('ServerPostsData', function($http, $q, ServerPostsStorage) {

    var data = [];
    var service = {};

    /* (For DEMO purposes) Local JSON data */
    var json = 'json/serverposts&';

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    // var json = 'YourWordpressURL/?json=get_recent_posts&';

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
    // var json = 'YourWordpressURL/api/get_recent_posts?';

    service.getURL = function() { return json; };

    service.setData = function(posts) { data = posts; };

    service.get = function(serverpostId) { return data[serverpostId]; };

    return service;
})

// RSS Feeds Data: JSON
.factory('FeedsData', function($http, $q, FeedsStorage) {

    var xml = 'http://esportes.opovo.com.br/esportes/temporeal/mobile-fortaleza.xml';
    var url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(xml);
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};
    var entries = [];

    service.async = function() {
    $http({method: 'JSONP', url: url, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d;
        FeedsStorage.save(data.responseData.feed);
        entries = data.responseData.feed.item;
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = FeedsStorage.all();
        entries = data.entries;
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data.responseData.feed; };

    service.get = function(entryId) { return entries[entryId];  };

    return service;
})

// Settings Data: Settings configuration
.factory('SettingsData', function(){
    var data = {};

    data.items = {
        options: [
        {
           name: 'First Option',
           value: true
        },
        {
           name: 'Second Option',
           value: false
        },
        {
           name: 'Third Option',
           value: false
        },
        {
           name: 'Fourth Option',
           value: false
        },
        {
           name: 'Fifth Option',
           value: false
        }],
        sorting: 'A',
        range:30
    };

    return data;
})
