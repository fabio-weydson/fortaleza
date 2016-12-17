angular.module('mobionicApp.controllers', [])

// Home Controller
.controller('HomeCtrl',function($scope, $ionicLoading, PostsData, PostsStorage, ImgCache) {

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
    $scope.message = $scope.ativotexto.replace(/(<([^>]+)>)/ig,"");
    $scope.image = $scope.ativoimg;
    console.log($scope.ativoimg);
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
            window.plugins.socialsharing.shareViaWhatsApp($scope.message, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }

        $scope.loadURL = function (url) {
            window.open(url,'_system');
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
.controller('VideoCtrl', ['$scope', '$ionicLoading', '$ionicActionSheet' ,'$sce', '$stateParams', '$timeout', 'VideosData', function($scope, $ionicLoading, $ionicActionSheet, $sce, $stateParams, $timeout, VideosData){
    
    $scope.video = VideosData.get($stateParams.videoId);


    $scope.idVideo = $scope.video.snippet.resourceId.videoId;
    $scope.video_url = 'https://www.youtube.com/embed/'+$scope.idVideo+'?rel=0&showinfo=0&allownetworking=internal&fs=0&theme=light&controls=2&autohide=1';
    $scope.urlEmbed = $sce.trustAsHtml('<iframe id="frame_video" src="'+ $scope.video_url+'" frameborder="0" width="100%" height="100%"></iframe>');

    $scope.video.embed = $scope.urlEmbed;


     window.addEventListener("orientationchange", function() {
        $('.media-container').height('0');
            $scope.loading = $ionicLoading.show({
              template: '<i class="icon ion-loading-a"></i> Carregando',
              showBackdrop: true,
              showDelay: 3
    });
        $timeout(function() {
           var window_width = $('.media-container').width();
            var window_height = window.innerHeight;
            window_width *= 1;
            var valueHeight = Math.round((window_width/16)*9);
            //alert(window.orientation+"_"+window_width+"_"+valueHeight);
        if(window.orientation == 0) {
            $('.media-container').height(valueHeight);
            $('.media-container .ng-binding').width(window_width).height(valueHeight);
            $('#video .padding,.nav-bar-container').show();
            $('.has-header').animate({
                    top: "44px",
                    }, 500);
            //$scope.video.embed = $scope.urlEmbed;
            $scope.video.embed = $sce.trustAsHtml('<iframe id="frame_video" src="https://www.youtube.com/embed/'+$scope.idVideo+'?rel=0&showinfo=0&allownetworking=internal&fs=0&theme=light&controls=2&autohide=1?&feature=player_embedded" frameborder="0" width="'+window_width+'" height="'+valueHeight+'"></iframe>');
            //$('#frame_video').attr('src', $scope.video_url);
            $ionicLoading.hide();
        }else {
            $('.media-container').height(window_height);
            $('.media-container .ng-binding').width(window_width).height(valueHeight);
            $('.has-header').animate({
                    top: "0px",
                    }, 500).promise().done(function(){
                        $('#video .padding,.nav-bar-container').hide();
                    });
            //$('#frame_video').attr('src', $scope.video_url);
            //$scope.video.embed = $scope.urlEmbed;
            $scope.video.embed = $sce.trustAsHtml('<iframe id="frame_video" src="https://www.youtube.com/embed/'+$scope.idVideo+'?rel=0&showinfo=0&allownetworking=internal&fs=0&theme=light&controls=2&autohide=1&feature=player_embedded" frameborder="0" width="'+window_width+'" height="'+valueHeight+'"></iframe>');
            $ionicLoading.hide();
            }
        }, 500);
    })


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
    //$scope.image = $scope.video.snippet.thumbnails.default.url;

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
            window.plugins.socialsharing.share($scope.message, $scope.subject, null, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, null, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, null, $scope.link);
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

.controller('DestaquesCtrl', function($scope, $ionicLoading, $interval, $location, $ionicSlideBoxDelegate, DestaquesData, DestaquesStorage, ImgCache) {
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

.controller('PostCtrl', function($scope,  $ionicLoading,$ionicActionSheet, $stateParams, PostsData) {

    $scope.post = PostsData.get($stateParams.postId);
    $scope.post.postId = $stateParams.postId;

    $scope.sharePost = function() {
        
    $scope.subject = $scope.post.Titulo;
    $scope.link = 'http://fortalezaec.net'+$scope.post.URL.replace('/App/', '/Ver/');
    $scope.message = $scope.post.Titulo + ' ' + $scope.link;
    if($scope.post.FotoNoticia) {
        $scope.image = 'http://fortalezaec.net'+$scope.post.FotoNoticia;
    } else {
        $scope.image = null;
    }
    console.log($scope.link);


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

.controller('NoticiaCtrl', ['$scope', '$sce', '$ionicLoading', '$ionicActionSheet', '$stateParams', 'PostsData', function($scope, $sce,$ionicLoading, $ionicActionSheet, $stateParams, PostsData, $cordovaSocialSharing) {
    $scope.post = PostsData.get($stateParams.postId);
    $scope.post.postId = $stateParams.postId;
    $scope.post.iframe = 'http://www.fortalezaec.net/'+ $scope.post.URL;
    var urlEmbed = $sce.trustAsHtml('<iframe src="'+$scope.post.iframe+'" frameborder="0" width="100%" height="100%" data-tap-disabled="true"></iframe>');

    $scope.post.embed = urlEmbed;

    
        if (/iPhone|iPod|iPad/.test(navigator.userAgent))
            $('iframe').wrap(function(){
                var $this = $(this);
                return $('<div />').css({
                    width: $this.attr('width'),
                    height: $this.attr('height'),
                    overflow: 'scroll',
                    '-webkit-overflow-scrolling': 'touch'
                });
            });
   

    $scope.sharePost = function() {

    $scope.subject = $scope.post.Titulo;
    $scope.link = 'http://fortalezaec.net'+$scope.post.URL.replace('/App/', '/Ver/');;
    $scope.message = $scope.post.Titulo + ' ' + $scope.link;
    if($scope.post.FotoNoticia) {
        $scope.image = 'http://fortalezaec.net'+$scope.post.FotoNoticia;
    } else {
        $scope.image = null;
    }

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

    $scope.subject =  "Tempo Real: "+$scope.temporeal.Mandante.Nome+" X "+$scope.temporeal.Visitante.Nome;
    $scope.link = 'http://bit.ly/1j0YCLy';
    $scope.message = $scope.subject+" "+$('#lances a[data-active="true"] img').data('texto');
    $scope.message = $scope.message.replace(/(<([^>]+)>)/ig,"")
    if($scope.image) {
        $scope.image = $('#lances a[data-active="true"] img').data('imgfull');
    } else {
        $scope.image = null;
    }

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
            window.plugins.socialsharing.shareViaWhatsApp($scope.subject, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }

})

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

.controller('ProximosJogosCtrl', function($scope, $ionicLoading, ProximosJogosData, ProximosJogosStorage) {

    if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
    }

    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.getTime();
    currentDate = Math.floor(currentDate / 1000);

    $scope.jogos = [];
    $scope.storage = '';
    $scope.datahoje = currentDate;
    console.log($scope.datahoje);
    
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


.controller('AppCtrl', function($scope, $ionicModal, $timeout, MenuData, $ionicActionSheet) {

  $scope.items = MenuData.items;
  $scope.subMenus = MenuData.items.subMenus;

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

})

        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
//target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
