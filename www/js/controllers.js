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
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
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
        function() {
        }
    );

})
.controller('BannerController',['$scope', '$sce',  function($scope, $sce) {
  
  
    $scope.SetImage = function() {
        var imgLinks = [
        //['img/banner_loja.jpg','#/app/loja'],
        ['img/banner_socio.jpg','#/app/socio']
        ];
        var R =  Math.floor(Math.random() * imgLinks.length);
        $scope.banner = $sce.trustAsHtml('<a href="'+imgLinks[R][1]+'" class="banner" nav-clear menu-close><img class="full-image" src="'+imgLinks[R][0]+'"></a>');
    }
     $scope.SetImage();
}])
// News Controller
.controller('NewsCtrl', function($scope, $ionicLoading, NewsData, NewsStorage) {

    $scope.news = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
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


// Gallery Controller
.controller('FotosCtrl', function($scope, $ionicLoading, $ionicActionSheet, FotosData, FotosStorage, $document) {

    $scope.fotos = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',
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
    $scope.ativoimg='0';
    $scope.ativolink='0';
    $scope.ativotexto ='0';

    $scope.abre_foto = function (passedEventObject, thumbid) {
     var window_height = window.innerHeight;
         $('#lightbox span').css('max-height', window_height-Math.round((window_height*25)/100));
        var imagem = $('#fotos div[data-thumbid="'+thumbid+'"] img').data('imgfull');
        var texto = $('#fotos div[data-thumbid="'+thumbid+'"] img').data('texto');
        var link = $('#fotos div[data-thumbid="'+thumbid+'"] img').data('link');
        texto = texto.replace(/(^|\W)(#[a-z\d][\w-]*)/ig, "$1<em class='hash_tag'>$2</em>").replace(/\s*$/, "");
         texto = texto.replace(/(^|\W)(@[a-z\d][\w-]*)/ig, "$1<em class='hash_tag'>$2</em>").replace(/\s*$/, "");
        $('#lightbox span').html('<img src="'+imagem+'"/><b>'+texto+'</b>').promise().done(function(){
            $scope.ativoimg = imagem;
            $scope.ativolink = link;
            $scope.ativotexto = texto;
            $('#lightbox').fadeIn(500);  
        });  
    };
    $scope.close_foto = function () {
        $('#lightbox span').html('').promise().done(function(){
            $('#lightbox').fadeOut(500);  
        });  
    };

     $scope.sharePost = function() {
        
    $scope.subject = null;
    $scope.link = $scope.ativolink.replace('https://instagram.com', 'http://instagr.am');
    $scope.message = $scope.ativotexto.replace(/(<([^>]+)>)/ig,"") + ' ' + $scope.ativolink.replace('https://instagram.com', 'http://instagr.am');
    $scope.image = $scope.ativoimg;

            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, null, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }



})

// Gallery Controller
.controller('VideosCtrl',   function($scope, $ionicLoading, VideosData, VideosStorage, $document) {
    $scope.videos = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
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
    $scope.loadURL = function (url) {
        window.open(url,'_system');
    }

})

// Video Controller
.controller('VideoCtrl', ['$scope', '$ionicLoading', '$ionicActionSheet' ,'$sce', '$stateParams', 'VideosData', function($scope, $ionicLoading, $ionicActionSheet, $sce, $stateParams, VideosData){
      $scope.video = VideosData.get($stateParams.videoId);


    $scope.idVideo = $scope.video.snippet.resourceId.videoId;
    $scope.video_url = 'https://www.youtube.com/embed/'+$scope.idVideo+'?rel=0&showinfo=0&allownetworking=internal&fs=0&theme=light&controls=2&autohide=1';
    $scope.urlEmbed = $sce.trustAsHtml('<iframe id="frame_video" src="'+ $scope.video_url+'" frameborder="0" width="100%" height="100%"></iframe>');

    $scope.video.embed = $scope.urlEmbed;


     window.addEventListener("orientationchange", function() {
           var window_width = $('.media-container').width();
            var window_height = window.innerHeight;
            window_width *= 1;
            var valueHeight = Math.round((window_width/16)*9);
        if(window.orientation == 0) {
            $('.media-container').height(valueHeight);
            $('.media-container .ng-binding').width(window_width).height(valueHeight);
            $('#video .padding,.nav-bar-container').show();
            $('.has-header').css('top', '44px');
            //$scope.video.embed = $scope.urlEmbed;
           $('#frame_video').attr('src', $scope.video_url);
        }else {
            $('.media-container').height(window_height);
            $('.media-container .ng-binding').width(window_width).height(valueHeight);
            $('#video .padding,.nav-bar-container').hide();
            $('.has-header').css('top', '0px');
           $('#frame_video').attr('src', $scope.video_url);
            //$scope.video.embed = $scope.urlEmbed;
        }
    })

    $scope.loadURL = function (url) { 
        window.open(url,'_system');
    }



   $scope.init = function () {
        //screen.unlockOrientation();
        var window_width = $('.media-container').width();
        window_width *= 1;
        var valueHeight = Math.round((window_width/16)*9);
       $('.media-container .ng-binding').width(window_width).height(valueHeight);
       
    };

    $scope.sharePost = function() {
        
    $scope.subject = $scope.video.snippet.title;
    $scope.link = 'https://youtu.be/'+$scope.idVideo ;
    $scope.message =  $scope.subject + ' ' + $scope.link;
    $scope.image = $scope.video.snippet.thumbnails.default.url;

            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, null, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }



    //   $scope.$on('$rootScope.orientation.change', function () {
    //   alert('orientacao alterada');
    // });
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
            subject: 'Mensagem APP: '+$scope.contact.subject,
            body:    $scope.contact.body
        });

    }
        $scope.loadURL = function (url, target) {
        window.open(url, target);
    }


})
.controller('AboutCtrl', function($scope) {

    $scope.about = {
      subject:  '',
      body: ''
    }


})
// Posts Controller
.controller('DestaquesCtrl', function($scope, $ionicLoading, $interval, $location, $ionicSlideBoxDelegate, DestaquesData, DestaquesStorage) {
  $scope.intervalo = 4000;
    $scope.destaques = [];
    $scope.storage = '';

    DestaquesData.async().then(
        // successCallback
        function() {
            $scope.destaques = DestaquesData.getAll();
            $ionicSlideBoxDelegate.$getByHandle('slidehome').update();
            $scope.animaBarra($scope.intervalo-1000);
        },
        // errorCallback
        function() {
            $scope.destaques = DestaquesStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $scope.animaBarra();
        },
        // notifyCallback
        function() {

        }
    );
       
    $scope.animaBarra = function(tempo){

           $(".meter > span").stop().width(0);
           $(".meter > span").animate({
                        width: '100%'
                    }, tempo);
    }
    $scope.slideChanged = function(index) {
        $scope.animaBarra($scope.intervalo);

        if(index==3) {
            $interval(function(){
                if($location.path()=='/app/home') {
                $ionicSlideBoxDelegate.$getByHandle('slidehome').slide(0,0);
                            $ionicSlideBoxDelegate.$getByHandle('slidehome').start();
                        }

            },$scope.intervalo)
        }
    }

           
})

// Post Controller
.controller('DestaqueCtrl', function($scope,  $ionicLoading, $ionicActionSheet, $stateParams, DestaquesData) {

    $scope.destaque = DestaquesData.get($stateParams.postId);
    $scope.destaque.postId = $stateParams.postId;

    
    $scope.sharePost = function() {
        
    $scope.subject = $scope.post.Titulo;
    $scope.link = 'http://fortalezaec.net'+$scope.post.URL;
    $scope.message = $scope.post.Titulo + ' ' + $scope.link;
    $scope.image = 'http://fortalezaec.net'+$scope.post.FotoNoticia;

            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, $scope.image, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }

})

// Posts Controller
.controller('PostsCtrl', function($scope, $ionicLoading, PostsData, PostsStorage) {

    $scope.posts = [];
    $scope.storage = '';
     $scope.loadData = function () {
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
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
    }
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
     $scope.loadData();
})

// Post Controller
.controller('PostCtrl', function($scope,  $ionicLoading,$ionicActionSheet, $stateParams, PostsData) {

    $scope.post = PostsData.get($stateParams.postId);
    $scope.post.postId = $stateParams.postId;

    $scope.sharePost = function() {
        
    $scope.subject = $scope.post.Titulo;
    $scope.link = 'http://fortalezaec.net'+$scope.post.URL;
    $scope.message = $scope.post.Titulo + ' ' + $scope.link;
    $scope.image = 'http://fortalezaec.net'+$scope.post.FotoNoticia;

            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, $scope.image, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }


})

// Post Controller
.controller('NoticiaCtrl', ['$scope', '$sce', '$ionicLoading', '$ionicActionSheet', '$stateParams', 'PostsData', function($scope, $sce,$ionicLoading, $ionicActionSheet, $stateParams, PostsData, $cordovaSocialSharing) {
    $scope.post = PostsData.get($stateParams.postId);
    $scope.post.postId = $stateParams.postId;
    $scope.post.iframe = 'http://www.fortalezaec.net/'+ $scope.post.URL;
    var urlEmbed = $sce.trustAsHtml('<iframe src="'+$scope.post.iframe+'" frameborder="0" width="100%" height="100%"></iframe>');

    $scope.post.embed = urlEmbed;

   

    $scope.sharePost = function() {

    $scope.subject = $scope.post.Titulo;
    $scope.link = 'http://fortalezaec.net'+$scope.post.URL;
    $scope.message = $scope.post.Titulo + ' ' + $scope.link;
    $scope.image = 'http://fortalezaec.net'+$scope.post.FotoNoticia;

            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, $scope.image, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }

}])

// Posts Controller
.controller('TempoRealCtrl', function($scope, $ionicLoading, TempoRealData, $ionicActionSheet, TempoRealStorage) {

    $scope.temporeal = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
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
     $scope.close_foto = function () {
        $('#lightbox2 span').html('').promise().done(function(){
            $('#lightbox2').fadeOut(500);  
             $('a[data-active="true"]').attr('data-active', false);
        });  
    };


    $scope.sharePost = function() {

    $scope.subject =  "Tempo Real: "+temporeal.Mandante.Nome+" X "+temporeal.Visitante.Nome;
    $scope.link = 'http://bit.ly/1j0YCLy';
    $scope.message = $scope.subject+" "+$('#lances a[data-active="true"] img').data('texto');
    $scope.message = $scope.message.replace(/(<([^>]+)>)/ig,"")
    $scope.image = $('#lances a[data-active="true"] img').data('imgfull');

    $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
    }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, $scope.image, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }

})
// Lances Controller
.controller('LancesCtrl', function($scope, $ionicLoading, LancesData, LancesStorage, $sce) {

    $scope.lances = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    LancesData.async().then(
        // successCallback
        function() {
            $scope.lances = LancesData.getAll();
            $ionicLoading.hide();
            $scope.lances2 = [];

         
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
        return newvar;
    }

    $scope.abre_foto = function (passedEventObject, thumbid) {
    $('a[data-active="true"]').attr('data-active', false);
     $('a[data-thumbid="'+thumbid+'"]').attr('data-active', true);
     var window_height = window.innerHeight;
         $('#lightbox2 span').css('max-height', window_height-Math.round((window_height*25)/100));
        var imagem = $('a[data-thumbid="'+thumbid+'"] img').data('imgfull');
        var texto = $('a[data-thumbid="'+thumbid+'"] img').data('texto');
        var link = $('a[data-thumbid="'+thumbid+'"] img').data('link');
        $('#lightbox2 span').html('<img src="'+imagem+'"/><b>'+texto+'</b>').promise().done(function(){
            $scope.ativoimg = imagem;
            $scope.ativolink = link;
            $('#lightbox2').fadeIn(500);  
        });  
    };


})
// Posts Controller post
.controller('ProximosJogosCtrl', function($scope, $ionicLoading, ProximosJogosData, ProximosJogosStorage) {



    $scope.jogos = [];
    $scope.storage = '';
     $scope.loadData = function () {
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    ProximosJogosData.async().then(
        // successCallback
        function() {
            $scope.jogos = ProximosJogosData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.jogos = ProximosJogosStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    }
    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 10;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.jogos.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };
     $scope.loadData();
})
// Jogadores Controller
.controller('JogadoresCtrl', function($scope, $ionicLoading, JogadoresData, JogadoresStorage) {

    $scope.jogadores = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
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
        window.plugins.socialsharing.share(message, null, null, link);
    }

})
.controller('TextosCtrl', function($scope, $ionicLoading, $stateParams, $state) {


    
  

   $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });
    if($state.current.name=='app.historia') {
        $scope.colors = [
          {id:'FortalezaEC', name:'Fortaleza EC'},
          {id:'AlcidesSantos', name:'Alcides Santos'},
          {id:'StellaFC', name:'Stella FC'},
          {id:'Cronologia', name:'Cronologia'},
          {id:'Titulos', name:'Titulos'},
          {id:'Curiosidades', name:'Curiosidades'}
        ];
    } else if($state.current.name=='app.simbolos') {
        $scope.colors = [
          {id:'NossasCores', name:'Nossas Cores'},
          {id:'NossoEscudo', name:'Nosso Escudo'},
          {id:'NossoMascote', name:'Nosso Mascote'},
          {id:'NossaBandeira', name:'Nossa Bandeira'},
          {id:'NossaTorcida', name:'Nossa Torcida'},
          {id:'NossoHino', name:'Nosso Hino'},
           {id:'NossoUniforme', name:'Nosso Uniforme'},
            {id:'Juba', name:'Juba'}
        ];
    } else if($state.current.name=='app.poderes') {
        $scope.colors = [
          {id:'DiretoriaExecutiva', name:'Diretoria Executiva'},
          {id:'ConselhoDeliberativo', name:'Conselho Deliberativo'},
          {id:'ConselhoFiscal', name:'Conselho Fiscal'},
          {id:'ConselhoEtica', name:'Conselho de Etica'},
          {id:'Presidentes', name:'Presidentes'},
          {id:'SocioTorcedor', name:'Socio Torcedor'},
           {id:'SocioProprietario', name:'Socio Proprietario'},
            {id:'Estatuto', name:'Estatuto'}
        ];
    }  


$scope.colorsSelected = $scope.colors[0];

$scope.changedValue=function(item){
        $ionicLoading.show();
     $.getJSON("http://www.fortalezaec.net/Json/textosestaticos?name="+item.id, function(result){
         $scope.texto = '<h1 class="title">'+item.name+'</h1>'+result.Model.Textos;
          $ionicLoading.hide();
    });

    }  


    $scope.changedValue($scope.colors[0]);


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
