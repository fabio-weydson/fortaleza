angular.module('mobionicApp.data', [])

// Home Data: Home page configuration
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
            icon: 'ion-trophy',
             subMenu: [
                {
                    title: "Historia",
                    url: '#/app/historia',
                    icon:"ion-clock",
                },
                {
                    title: "Símbolos",
                    url: '#/app/simbolos',
                    icon:"ion-flag",
                },
                {
                    title: "Poderes do Clube",
                    url: '#/app/poderes',
                    icon:"ion-briefcase",
                },
                {
                    title: "Equipe",
                    url: '#/app/jogadores',
                    icon:"ion-person-stalker",
                }] 
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
                }
                // {
                //     title: "Papeis de Parede",
                //     url: '#/app/papeis_de_parede',
                //     icon:"ion-wand",
                // }
                ] 
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
        }
        // {
        //     title: 'Mais',
        //     icon: 'ion-more',
        //      subMenu: [
        //         // {
        //         //     title: "Newsletter",
        //         //     url: '#/app/member',
        //         //     icon:"ion-paper-airplane",
        //         // },
        //         {
        //             title: "Contatos",
        //             url: '#/app/contact',
        //             icon:"ion-ios7-email",
        //         }
        //         // {
        //         //     title: "Ajustes",
        //         //     url: '#/app/settings',
        //         //     icon:"ion-ios7-gear",
        //         // },
        // //          {
        // //     title: 'Plugins',
        // //     icon: 'ion-code',
        // //     url: '#/app/plugins'
        // // },
        // ]  
        // }
        // {
        //     title: 'Elements',
        //     icon: 'ion-code',
        //     url: '#/app/elements'
        // }
        
    ];

    return data;
})

.factory('FotosData', function($http, $q, FotosStorage) {

    var json = 'https://api.instagram.com/v1/users/698161208/media/recent/?access_token=206080583.5b9e1e6.85d847631af641f1a32e0e0eb4524763&count=60';

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

// Gallery Data: Gallery configuration
.factory('VideosData', function($http, $q, VideosStorage) {

    var json = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UUV5UiFF5AlNKW4sLXcYMG_g&fields=items/id,items/snippet/publishedAt,items/snippet/title,items/snippet/description,items/snippet/resourceId/videoId,items/snippet/thumbnails/default,items/snippet/thumbnails/high&key=AIzaSyDAyzQoPMlHyqjx5MJ5NS9jv3cM8JihcOc';
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.items;
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


    service.getAll = function() { return data; };

    service.get = function(memberId) { return data[memberId]; };

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('PostsData', function($http, $q, PostsStorage) {

    
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

    service.get = function(postId) { 
	    return data.Noticias[postId];
	};

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('ProximosJogosData', function($http, $q, ProximosJogosStorage) {

    
    var json = 'http://www.fortalezaec.net/Json/Jogos?categoriaId=00e967dfc6f74ca5b523546ce9cce0f2&ano=2016&ordem=asc';

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
        ProximosJogosStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = ProximosJogosStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(postId) { 
        return data.Noticias[postId];
    };

    return service;
})
// Posts Data: JSON Wordpress Posts configuration
.factory('TempoRealData', function($http, $q, TempoRealStorage) {

    
    var json = 'http://www.fortalezaec.net/Json/UltimoJogo?categoriaId=00e967dfc6f74ca5b523546ce9cce0f2';

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
       //  var dataJogoFull = d.channel.item.data;
        
       //  var dataJogo = dataJogoFull.replace(" ", "<br/>as ");
       // 	data['data'] = dataJogo;
       //  var time1  = d.channel.item.dadosevento.time1.trim();
       // 	var escudo1 = StrToURL(time1);

      	// data['escudo_1'] = 'https://apidadoscampeonatos.gazetaesportiva.net/uploads/equipe/imagem/'+escudo1.toLowerCase()+'.png';
      	// var time2  = d.channel.item.dadosevento.time2.trim();
       //  var escudo2 = StrToURL(time2);
      	// data['escudo_2'] = 'https://apidadoscampeonatos.gazetaesportiva.net/uploads/equipe/imagem/'+escudo2.toLowerCase()+'.png';


        TempoRealStorage.save(data);
        deferred.resolve();
        localStorage.setItem('hora_jogo', data.DataHora);
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

    service.get = function(tempoId) { 
	    return data[tempoId];
	};

    return service;
})
.factory('LancesData', function($http, $q, LancesStorage) {
    var hora_jogo = localStorage.getItem('hora_jogo');
    var hora_jogo
    var hora_before = hora_jogo -= 60 * 60;
    var hora_depois = hora_jogo += 180 * 60;
    
    var json = 'https://graph.facebook.com/v2.4/FortalezaOficial/posts?fields=picture,full_picture,message,created_time&since='+hora_before+'&until='+hora_depois+'&access_token=CAAWZCKW9JPX4BAH5gLJmcn7LqDgiyGTLzRM4A3VjcAcFyXFbWqUHMVYTzLandVjgpsNghZBdQBY2ctK1MPugFl6EHDAIYIwdE6lM4rtSrKlmn2YwUqyTmQZArPuFrPc7nLhgvemoyo8dqve2FdCpNqE69ZAKKcA8rNUUT3rR2ptw7WZBvCJAUEnFZCnEPDj98ZD';
    console.log(json);
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

    service.get = function(lanceId) { 
	    return data[lanceId];
	};

    return service;
})
// Posts Data: JSON Wordpress Posts configuration
.factory('DestaquesData', function($http, $q, DestaquesStorage) {

    var json = 'http://www.fortalezaec.net/Json/DestaquesMaiores?visivel=true';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).


    success(function(d) {
         d = d.Model;
        $.each(d, function( index, value ) {
            if(value.Foto) {
                data.push(value);
            }
        });

        DestaquesStorage.save(data);
        deferred.resolve();
    }).

    error(function() {
        data = DestaquesStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(postId) { 
	    return data[postId];
	};

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('JogadoresData', function($http, $q, JogadoresStorage) {

    
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