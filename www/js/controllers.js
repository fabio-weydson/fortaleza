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

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
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
            $scope.storage = 'Data from local storage';
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

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
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
            $scope.storage = 'Data from local storage';
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

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
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
            $scope.storage = 'Data from local storage';
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
.controller('GalleryCtrl', function($scope, GalleryData) {

    $scope.items = GalleryData.items;

})

// Gallery Controller
.controller('GalleryCtrl2',	function($scope, $ionicLoading, GalleryData2, GalleryStorage) {

     $scope.videos = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });

    GalleryData2.async().then(
        // successCallback
        function() {
            $scope.videos = GalleryData2.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.videos = GalleryData2.all();
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    )

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 5;

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
.controller('VideoCtrl1', function($scope, $stateParams, GalleryData2) {

    $scope.video = GalleryData2.get($stateParams.videoId);

    var feedURL = $scope.video.link[1].href;
        var fragments = feedURL.split("/");
        var idVideo = fragments[fragments.length - 2];

    var urlEmbed = trustAsHtml('<iframe src="https://www.youtube.com/embed/'+idVideo+'?rel=0&showinfo=0&allownetworking=internal" frameborder="0" width="100%" height="150%"></iframe>');

    $scope.video['embed'] = urlEmbed;



    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }

    $scope.sharePost = function () {

        var subject = $scope.video.title.$t;
        var message = $scope.video.title.$t;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.video.title.$t;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }

})


// Video Controller
.controller('VideoCtrl', ['$scope', '$sce', '$stateParams', 'GalleryData2', function($scope, $sce, $stateParams, GalleryData2){
      $scope.video = GalleryData2.get($stateParams.videoId);

    var feedURL = $scope.video.link[1].href;
        var fragments = feedURL.split("/");
        var idVideo = fragments[fragments.length - 2];

    var urlEmbed = $sce.trustAsHtml('<iframe src="https://www.youtube.com/embed/'+idVideo+'?rel=0&showinfo=0&allownetworking=internal" frameborder="0" width="100%" height="150%"></iframe>');

    $scope.video['embed'] = urlEmbed;



    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }

    $scope.sharePost = function () {

        var subject = $scope.video.title.$t;
        var message = $scope.video.title.$t;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.video.title.$t;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
}])
// Map Controller
.controller('MapCtrl', function($scope, MapData) {

    $scope.windowOptions = false;

    $scope.onClick = function () {
    this.windowOptions = !this.windowOptions;
    };

    $scope.closeClick = function () {
    this.windowOptions = false;
    };

    $scope.map = MapData.map;

})

// About Controller
.controller('AboutCtrl', function($scope, $ionicLoading, AboutData, AboutStorage) {

    $scope.about = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });

    AboutData.async().then(
        // successCallback
        function() {
            $scope.about = AboutData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.about = AboutStorage.all();
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

})

// Member Controller
.controller('MemberCtrl', function($scope, $stateParams, AboutData) {

    $scope.member = AboutData.get($stateParams.memberId);

})
// Tempo Real Controller
.controller('MemberCtrl', function($scope, $stateParams, AboutData) {

    $scope.member = AboutData.get($stateParams.memberId);

})
// Contact Controller
.controller('ContactCtrl', function($scope) {

    $scope.contact = {
      subject:  '',
      body: ''
    }

    $scope.submitForm = function() {

        window.plugin.email.open({
            to:      ['username@company.com'],
            cc:      ['username1@company.com'],
            bcc:     ['username2@company.com'],
            subject: $scope.contact.subject,
            body:    $scope.contact.body
        });

    };

})
// Posts Controller
.controller('DestaquesCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, DestaquesData, DestaquesStorage) {

    $scope.destaques = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
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
            $scope.storage = 'Data from local storage';
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

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
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
            $scope.storage = 'Data from local storage';
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
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }

    $scope.sharePost = function () {

        var subject = $scope.post.Titulo;
        var message = $scope.post.Subtitulo;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.post.url;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }

})

// ServerPosts Controller
.controller('ServerPostsCtrl', function($scope, $http, $ionicLoading, ServerPostsData, ServerPostsStorage) {
    var data = []
    $scope.posts = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });

    $scope.loadData = function () {

        $http({method: 'GET', url: ServerPostsData.getURL() + 'page=' + $scope.page, timeout: 5000}).
        // this callback will be called asynchronously
        // when the response is available.
        success(function(data) {
            $scope.more = data.pages !== $scope.page;
            $scope.posts = $scope.posts.concat(data.posts);
            ServerPostsData.setData($scope.posts);
            ServerPostsStorage.save(data);
            $ionicLoading.hide();
        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        error(function() {
            $scope.posts = ServerPostsStorage.all().posts;
            ServerPostsData.setData(ServerPostsStorage.all().posts);
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        });

    };

    $scope.showMoreItems = function () {
        $scope.page += 1;
        $ionicLoading.show({
        template: '<i class="icon ion-loading-c"></i> Carregando',

        //Will a dark overlay or backdrop cover the entire view
        showBackdrop: false,

        // The delay in showing the indicator
        showDelay: 10
        });
        $scope.loadData();
    }

    $scope.hasMoreItems = function () {
        return $scope.more;
    }

    $scope.page = 1;
    $scope.more = true;
    $scope.loadData();

})

// ServerPost Controller
.controller('ServerPostCtrl', function($scope, $stateParams, ServerPostsData) {

    $scope.post = ServerPostsData.get($stateParams.serverpostId);

    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }

    $scope.sharePost = function () {

        var subject = $scope.post.title;
        var message = $scope.post.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.post.url;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }

})
// Posts Controller
.controller('TempoRealCtrl', function($scope, $ionicLoading, TempoRealData, TempoRealStorage) {

    $scope.temporeal = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
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
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );


})
// Lances Controller
.controller('LancesCtrl', function($scope, $ionicLoading, LancesData, LancesStorage) {

    $scope.lances = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });

    LancesData.async().then(
        // successCallback
        function() {
            $scope.lances = LancesData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.lances = LancesStorage.all();
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );


})
// Jogadores Controller
.controller('JogadoresCtrl', function($scope, $ionicLoading, JogadoresData, JogadoresStorage) {

    $scope.jogadores = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
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
            $scope.storage = 'Data from local storage';
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
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }

    $scope.sharePost = function () {

        var subject = $scope.jogador.NomeUsual;
        var message = $scope.jogador.Idade;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.jogador.url;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }

})

// RSS Feeds Controller
.controller('FeedsCtrl', function($scope, $ionicLoading, FeedsData, FeedsStorage) {

    $scope.feeds = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Carregando',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });

    var data;

    FeedsData.async().then(
        // successCallback
        function() {
            data = FeedsData.getAll();

            $scope.title = data.title;
            $scope.description = data.description;
            $scope.link = data.link;
            $scope.feeds = data.item;

            $ionicLoading.hide();

        },
        // errorCallback
        function() {
            data = FeedsStorage.all();
            //console.log(data);
            $scope.storage = 'Data from local storage';

            $scope.title = data.title;
            $scope.description = data.description;
            $scope.link = data.link;
            $scope.feeds = data.entries;

            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

    var page = 1;
    // Define the number of the feed results in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.feeds.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    $scope.$apply();
    };

})

// RSS Feed Controller
.controller('FeedCtrl', function($scope, $stateParams, FeedsData) {

    $scope.entry = FeedsData.get($stateParams.entryId);

    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }

    $scope.shareEntry = function () {

        var subject = $scope.entry.title;
        var message = $scope.entry.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.entry.link;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
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

// Barcodescanner Controller
.controller('BarcodescannerCtrl', function($scope) {

    $scope.scan = function() {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            $scope.$apply();
        }, function(error) {
            $scope.error = error;
            $scope.$apply();
        });
    };

})

// Geolocation Controller
.controller('GeolocationCtrl', function($scope, $ionicLoading) {

    $scope.map = {
    center: {
        latitude: 45,
        longitude: -73
    },
    marker: {},
    zoom: 5
    };

    $scope.loading = $ionicLoading.show({

      //The text to display in the loading indicator
      template: '<i class="icon ion-loading-c"></i> Getting current location',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });

    var options = { enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(function(position) {

        $scope.map = {
            center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            marker: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            zoom: 12
        };

        $ionicLoading.hide();

        }, function(error) {
        alert('Unable to get location: ' + error.message);
        $ionicLoading.hide();
    }, options);


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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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
