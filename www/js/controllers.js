angular.module('mobionicApp.controllers', [])

// Home Controller
/*
.controller('HomeCtrl', function($scope, Data) {

 $scope.items = Data.items;
 });
 */
.controller('HomeCtrl',function($scope, $ionicLoading, PostsData, PostsStorage) {

    $scope.news = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    PostsData.async().then(
        // successCallback
        function() {
            $scope.news = PostsData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.news = PostsStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

})

// News Controller
.controller('NewsCtrl', function($scope, $ionicLoading, NewsData, NewsStorage) {

    $scope.news = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    NewsData.async().then(
        // successCallback
        function() {
            $scope.news = NewsData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.news = NewsStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

})

// New Controller
.controller('NewCtrl', function($scope, $stateParams, NewsData) {

    $scope.new = NewsData.get($stateParams.newId);

})

// Products Controller
.controller('ProductsCtrl', function($scope, $ionicLoading, ProductsData, ProductsStorage) {

    $scope.products = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    ProductsData.async().then(
        // successCallback
        function() {
            $scope.products = ProductsData.getAll();
            $scope.letterLimit = ProductsData.getLetterLimit();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.products = ProductsStorage.all();
            $scope.letterLimit = ProductsData.getLetterLimit();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

})

// Product Controller
.controller('ProductCtrl', function($scope, $stateParams, ProductsData) {

    $scope.product = ProductsData.get($stateParams.productId);

})

// Gallery Controller
.controller('FotosCtrl', function($scope, $ionicLoading, FotosData, FotosStorage, $document) {

    $scope.fotos = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    FotosData.async().then(
        // successCallback
        function() {
            $scope.fotos = FotosData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.fotos = FotosStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    )

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 15;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.fotos.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };

    $scope.abre_foto = function (foto, text) {
        $('#lightbox span').html('<img src="'+foto+'"/><b>'+text+'</b>').promise().done(function(){
            $('#lightbox .share').attr('ng-click', "sharePost('"+foto+"', '"+text+"')");
            $('#lightbox').fadeIn(500);  
        });  
    };
    $scope.close_foto = function () {
        $('#lightbox span').html('').promise().done(function(){
            $('#lightbox').fadeOut(500);  
        });  
    };

    $scope.sharePost = function (img,link) {
        var subject = "Siga o Fortaleza no Instagram";
        var message = "  Via App ofical Fortaleza EC http://bit.ly/1bc2Xja";
        message = message.replace(/(<([^>]+)>)/ig,"");
        var link = link;
        var image = img;
        alert(img);
       // window.plugins.socialsharing.share(message, subject, image, link);

    }

})

// Gallery Controller
.controller('VideosCtrl',	function($scope, $ionicLoading, VideosData, VideosStorage, $document) {

    $scope.videos = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    VideosData.async().then(
        // successCallback
        function() {
            $scope.videos = VideosData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.videos = VideosStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    )

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 7;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.videos.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };
  

})

// Video Controller
.controller('VideoCtrl', ['$scope', '$sce', '$stateParams', 'VideosData', function($scope, $sce, $stateParams, VideosData){
      $scope.video = VideosData.get($stateParams.videoId);

    var idVideo = $scope.video.snippet.resourceId.videoId;
    var urlEmbed = $sce.trustAsHtml('<iframe src="https://www.youtube.com/embed/'+idVideo+'?rel=0&showinfo=0&allownetworking=internal" frameborder="0" width="100%" height="100%"></iframe>');

    $scope.video['embed'] = urlEmbed;



    $scope.loadURL = function (url) {
        window.open(url,'_self');
    }

    $scope.sharePost = function () {

        var subject = $scope.video.snippet.title;
        var message = "  Via App ofical Fortaleza EC http://bit.ly/1bc2Xja";
        message += message.replace(/(<([^>]+)>)/ig,"");
        var imagem = $scope.video.snippet.thumbnails.default.url;
        var link = 'https://youtu.be/'+idVideo;
        window.plugins.socialsharing.share(message, subject, img, link);
  
    }

   $scope.init = function () {
        var window_width = $('.media-container').width();
        window_width *= 1;
        var valueHeight = Math.round((window_width/16)*9);
       $('.media-container .ng-binding').width(window_width).height(valueHeight);
    };

      $scope.$on('$rootScope.orientation.change', function () {
      alert('orientacao alterada');
    });
}])

// Contact Controller
.controller('ContactCtrl', function($scope) {

    $scope.contact = {
      subject:  '',
      body: ''
    }

    $scope.submitForm = function() {

        window.plugin.email.open({
            to:      ['fabioweydson@gmail.com'],
            subject: 'Mensagem APP'+$scope.contact.subject,
            body:    $scope.contact.body
        });

    };

})
.controller('AboutCtrl', function($scope) {

    $scope.about = {
      subject:  '',
      body: ''
    }


})
// Posts Controller
.controller('DestaquesCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, DestaquesData, DestaquesStorage) {

    $scope.destaques = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    DestaquesData.async().then(
        // successCallback
        function() {
            $scope.destaques = DestaquesData.getAll();
            $ionicLoading.hide();
            $ionicSlideBoxDelegate.$getByHandle('slidehome').update();
        },
        // errorCallback
        function() {
            $scope.destaques = DestaquesStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {

        }
    );

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.posts.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };

})
// Posts Controller
.controller('PostsCtrl', function($scope, $ionicLoading, PostsData, PostsStorage) {

    $scope.posts = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    PostsData.async().then(
        // successCallback
        function() {
            $scope.posts = PostsData.getAll().Noticias;
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.posts = PostsStorage.all().Noticias;
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 7;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.posts.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };

})

// Post Controller
.controller('PostCtrl', function($scope, $stateParams, PostsData) {

    $scope.post = PostsData.get($stateParams.postId);

    $scope.loadURL = function (url) {
        window.open(url,'_blank');
    }

    $scope.sharePost = function () {
        var subject = $scope.post.Titulo;
        var message = $scope.post.Subtitulo;
        message = message.replace(/(<([^>]+)>)/ig,"");
        message += '  Baixe o APP ofical http://bit.ly/1bc2Xja';
        var img = 'http://fortalezaec.net/{{post.FotoNoticia}}';
        var link = $scope.post.URL;
        window.plugins.socialsharing.share(message, subject, img, link);
    }

})

// Posts Controller
.controller('TempoRealCtrl', function($scope, $ionicLoading, TempoRealData, TempoRealStorage) {

    $scope.temporeal = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,
      showDelay: 10
    });

    TempoRealData.async().then(
        // successCallback
        function() {
            $scope.temporeal = TempoRealData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.temporeal = TempoRealStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );


})
// Lances Controller
.controller('LancesCtrl', function($scope, $ionicLoading, LancesData, LancesStorage, $sce) {

    $scope.lances = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    LancesData.async().then(
        // successCallback
        function() {
            $scope.lances = LancesData.getAll();
            $ionicLoading.hide();
            $scope.lances2 = [];

            for (var o in $scope.lances)
               $scope.lances2.push($scope.lances[o])
            },
        // errorCallback
        function() {
            $scope.lances = LancesStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {


        }
    );

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.lances.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };

    $scope.toTrustedHTML = function( html ){
        html += " ";
        var newvar = html.replace(/(<([^>]+)>)/ig,"");
        newvar = newvar.replace(/(\r\n|\n|\r)/gm,"");
        //console.log(newvar);
        return newvar;
    }




})
// Jogadores Controller
.controller('JogadoresCtrl', function($scope, $ionicLoading, JogadoresData, JogadoresStorage) {

    $scope.jogadores = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    JogadoresData.async().then(
        // successCallback
        function() {
            $scope.jogadores = JogadoresData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.jogadores = JogadoresStorage.all();
            console.log('local');
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.jogadores.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };

})
// Jogador Controller
.controller('JogadorCtrl', function($scope, $stateParams, JogadoresData) {

    $scope.jogador = JogadoresData.get($stateParams.jogadorId);

    $scope.loadURL = function (url) {
        window.open(url,'_self');
    }

    $scope.sharePost = function () {

        var subject = $scope.jogador.NomeUsual;
        var message = $scope.jogador.Idade;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.jogador.url;

        
        
        window.plugins.socialsharing.share(message, subject, null, link);
    }

})

// Plugins Controller
.controller('PluginsCtrl', function($scope, PluginsData) {
  $scope.items = PluginsData.items;
})

// Device Controller
.controller('DeviceCtrl', function($scope) {
  $scope.device = device;
})

// Notifications Controller
.controller('NotificationsCtrl', function($scope) {

    $scope.alertNotify = function() {
    navigator.notification.alert("Sample Alert",function() {console.log("Alert success")},"My Alert","Close");
    };

    $scope.beepNotify = function() {
    navigator.notification.beep(1);
    };

    $scope.vibrateNotify = function() {
    navigator.notification.vibrate(3000);
    };

    $scope.confirmNotify = function() {
    navigator.notification.confirm("My Confirmation",function(){console.log("Confirm Success")},"Are you sure?",["Ok","Cancel"]);
    };

})

// Seetings Controller
.controller('SettingsCtrl', function($scope, SettingsStorage, NewsStorage, ProductsStorage, AboutStorage, GalleryStorage, FeedsStorage, PostsStorage, ServerPostsStorage) {

    $scope.settings = SettingsStorage.all();

    $scope.saveSettings = function() {
        SettingsStorage.save($scope.settings);
    };

    $scope.$watch('settings', function() { SettingsStorage.save($scope.settings) }, true);

    $scope.resetSettings = function() {
        SettingsStorage.clear();
        $scope.settings = SettingsStorage.all();
    };

    $scope.resetNewsStorage = function() {
        NewsStorage.clear();
    };

    $scope.resetProductsStorage = function() {
        ProductsStorage.clear();
    };

    $scope.resetProductsGalleryStorage = function() {
        GalleryStorage.clear();
    };

    $scope.resetAboutStorage = function() {
        AboutStorage.clear();
    };

    $scope.resetFeedsStorage = function() {
        FeedsStorage.clear();
    };

    $scope.resetPostsStorage = function() {
        PostsStorage.clear();
    };

    $scope.resetServerPostsStorage = function() {
        ServerPostsStorage.clear();
    };

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MenuData, $ionicActionSheet) {

  $scope.items = MenuData.items;
  $scope.subMenus = MenuData.items.subMenus;

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
   $scope.toggleGroup = function(item) {
   
    if ($scope.isGroupShown(item)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = item;
    }
  };
  $scope.isGroupShown = function(item) {
    return $scope.shownGroup === item;
  };
    // Triggered on a button click, or some other target
    $scope.show = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: '<b>Share</b> This' },
           { text: 'Move' }
         ],
         destructiveText: 'Delete',
         titleText: 'Modify your album',
         cancelText: 'Cancel',
         cancel: function() {
              // add cancel code..
            },
         buttonClicked: function(index) {
           return true;
         }
        });

    };

})

        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
//target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        