// Mobionic: Mobile Ionic Framework

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mobionicApp' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mobionicApp', ['ionic', 'mobionicApp.controllers', 'mobionicApp.data', 'mobionicApp.directives', 'mobionicApp.filters', 'mobionicApp.storage', 'ngSanitize'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    navigator.splashscreen.hide();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Open any external link with InAppBrowser Plugin
    $(document).on('click', 'a[href^=http], a[href^=https]', function(e){

        e.preventDefault();
        var $this = $(this);
        var target = $this.data('inAppBrowser') || '_blank';

        window.open($this.attr('href'), target);

    });

  });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // $ionicConfigProvider
    // http://ionicframework.com/docs/api/provider/%24ionicConfigProvider/
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');

    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'PostsCtrl'
        }
      }
    })
    .state('app.products', {
      url: "/products",
      views: {
        'menuContent' :{
          //templateUrl: "templates/loja.html",
          templateUrl: "templates/construcao.html"
           //controller: 'ProductsCtrl'
                  }
      }
    })

    .state('app.product', {
      url: "/products/:productId",
      views: {
        'menuContent' :{
          templateUrl: "templates/product.html",
          controller: 'ProductCtrl'
        }
      }
    })
  .state('app.fotos', {
      url: "/fotos",
      views: {
        'menuContent' :{
          templateUrl: "templates/fotos.html",
          controller: 'FotosCtrl'
        }
      }
    })
    .state('app.videos', {
      url: "/videos",
      views: {
        'menuContent' :{
          templateUrl: "templates/videos.html",
          controller: 'VideosCtrl'
        }
      }
    })
    .state('app.video', {
      url: "/video/:videoId",
      views: {
        'menuContent' :{
          templateUrl: "templates/video.html",
          controller: 'VideoCtrl'
        }
      }
    })
    .state('app.historia', {
      url: "/historia",
      views: {
        'menuContent' :{
          templateUrl: "templates/historia.html",
          controller: 'TextosCtrl'
        }
      }
    })
    .state('app.simbolos', {
      url: "/simbolos",
      views: {
        'menuContent' :{
          templateUrl: "templates/historia.html",
          controller: 'TextosCtrl'
        }
      }
    })
 .state('app.poderes', {
      url: "/poderes",
      views: {
        'menuContent' :{
          templateUrl: "templates/historia.html",
          controller: 'TextosCtrl'
        }
      }
    })
    .state('app.jogador', {
      url: "/jogador/:jogadorId",
      views: {
        'menuContent' :{
          templateUrl: "templates/jogador.html",
          controller: 'JogadorCtrl'
        }
      }
    })
    .state('app.jogadores', {
      url: "/jogadores",
      views: {
        'menuContent' :{
          templateUrl: "templates/jogadores.html",
          controller: 'JogadoresCtrl'
        }
      }
    })
  .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html"
          //controller: 'AboutCtrl'
        }
      }
    })
    .state('app.instagram', {
      url: "/instagram",
      views: {
        'menuContent' :{
          templateUrl: "templates/instagram.html"
        }
      }
    })
    .state('app.contact', {
      url: "/contact",
      views: {
        'menuContent' :{
          templateUrl: "templates/contact.html",
          controller: 'ContactCtrl'
        }
      }
    })
    .state('app.posts', {
      url: "/posts",
      views: {
        'menuContent' :{
          templateUrl: "templates/posts.html",
          controller: 'PostsCtrl'
        }
      }
    })

    .state('app.post', {
      url: "/posts/:postId",
      views: {
        'menuContent' :{
          templateUrl: "templates/post.html",
          controller: 'PostCtrl'
        }
      }
    })
     .state('app.noticia', {
      url: "/noticia/:postId",
      views: {
        'menuContent' :{
          templateUrl: "templates/noticia.html",
          controller: 'NoticiaCtrl'
        }
      }
    })
       .state('app.destaques', {
      url: "/destaques/:postId",
      views: {
        'menuContent' :{
          templateUrl: "templates/destaque.html",
          controller: 'DestaquesCtrl'
        }
      }
    })
   .state('app.destaque', {
      url: "/destaque/:postId",
      views: {
        'menuContent' :{
          templateUrl: "templates/destaque.html",
          controller: 'DestaqueCtrl'
        }
      }
    })
 .state('app.socio', {
      url: "/socio",
      views: {
        'menuContent' :{
          templateUrl: "templates/socio.html"
        }
      }
    })
    .state('app.tempo_real', {
      url: "/tempo_real",
      views: {
        'menuContent' :{
          templateUrl: "templates/tempo_real.html",
          controller: 'TempoRealCtrl'
        }
      }
    })
     .state('app.proximos_jogos', {
      url: "/proximos_jogos",
      views: {
        'menuContent' :{
          templateUrl: "templates/proximos_jogos.html",
          controller: 'ProximosJogosCtrl'
        }
      }
    })
    .state('app.lances', {
      url: "/lances",
      views: {
        'menuContent' :{
          templateUrl: "templates/lances.html",
          controller: 'LancesCtrl'
        }
      }
    })
    .state('app.plugins', {
      url: "/plugins",
      views: {
        'menuContent' :{
          templateUrl: "templates/plugins.html",
          controller: 'PluginsCtrl'
        }
      }
    })
    .state('app.notifications', {
      url: "/plugins/notifications",
      views: {
        'menuContent' :{
          templateUrl: "templates/plugins/notifications.html",
          controller: 'NotificationsCtrl'
        }
      }
    })
    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('app.ingressos', {
      url: "/ingressos",
      views: {
        'menuContent' :{
          //templateUrl: "templates/ingressos.html"  
           templateUrl: "templates/construcao.html"
               }
      }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});

  function StrToURL(string) {
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		A : /[\xC0-\xC6]/g,
		e : /[\xE8-\xEB]/g,
		E : /[\xC8-\xCB]/g,
		i : /[\xEC-\xEF]/g,
		I : /[\xCC-\xCF]/g,
		o : /[\xF2-\xF6]/g,
		O : /[\xD2-\xD6]/g,
		u : /[\xF9-\xFC]/g,
		U : /[\xD9-\xDC]/g,
		c : /\xE7/g,
		C : /\xC7/g,
		n : /\xF1/g,
		N : /\xD1/g,
		'-' : /\s/g
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}
