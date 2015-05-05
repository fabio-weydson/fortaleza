angular.module('mobionicApp.storage', [])

.factory('NewsStorage', function() {
  return {
    all: function() {
      var news = window.localStorage['news'];
      if(news) {
        return angular.fromJson(news);
      }
      return {};
    },
    save: function(news) {
      window.localStorage['news'] = angular.toJson(news);
    },
    clear: function() {
      window.localStorage.removeItem('news');
    }
  }
})

.factory('ProductsStorage', function() {
  return {
    all: function() {
      var products = window.localStorage['products'];
      if(products) {
        return angular.fromJson(products);
      }
      return {};
    },
    save: function(products) {
      window.localStorage['products'] = angular.toJson(products);
    },
    clear: function() {
      window.localStorage.removeItem('products');
    }
  }
})

.factory('JogadoresStorage', function() {
  return {
    all: function() {
      var jogadores = window.localStorage['jogadores'];
      if(jogadores) {
        return angular.fromJson(jogadores);
      }
      return {};
    },
    save: function(jogadores) {
      window.localStorage['jogadores'] = angular.toJson(jogadores);
    },
    clear: function() {
      window.localStorage.removeItem('jogadores');
    }
  }
})

.factory('AboutStorage', function() {
  return {
    all: function() {
      var about = window.localStorage['about'];
      if(about) {
        return angular.fromJson(about);
      }
      return {};
    },
    save: function(about) {
      window.localStorage['about'] = angular.toJson(about);
    },
    clear: function() {
      window.localStorage.removeItem('about');
    }
  }
})
.factory('FotosStorage', function() {
  return {
    all: function() {
      var fotos = window.localStorage['fotos'];
      if(fotos) {
        return angular.fromJson(fotos);
      }
      return {};
    },
    save: function(fotos) {
      window.localStorage['fotos'] = angular.toJson(fotos);
    },
    clear: function() {
      window.localStorage.removeItem('fotos');
    }
  }
})
.factory('VideosStorage', function() {
  return {
    all: function() {
      var videos = window.localStorage['videos'];
      if(videos) {
        return angular.fromJson(videos);
      }
      return {};
    },
    save: function(videos) {
      window.localStorage['videos'] = angular.toJson(videos);
    },
    clear: function() {
      window.localStorage.removeItem('videos');
    }
  }
})
.factory('PostsStorage', function() {
  return {
    all: function() {
      var posts = window.localStorage['posts'];
      if(posts) {
        return angular.fromJson(posts);
      }
      return {};
    },
    save: function(posts) {
      window.localStorage['posts'] = angular.toJson(posts);
    },
    clear: function() {
      window.localStorage.removeItem('posts');
    }
  }
})
.factory('DestaquesStorage', function() {
  return {
    all: function() {
      var destaques = window.localStorage['destaques'];
      if(destaques) {
        return angular.fromJson(destaques);
      }
      return {};
    },
    save: function(destaques) {
      window.localStorage['destaques'] = angular.toJson(destaques);
    },
    clear: function() {
      window.localStorage.removeItem('destaques');
    }
  }
})
.factory('TempoRealStorage', function() {
  return {
    all: function() {
      var temporeal = window.localStorage['temporeal'];
      if(temporeal) {
        return angular.fromJson(temporeal);
      }
      return {};
    },
    save: function(temporeal) {
      window.localStorage['temporeal'] = angular.toJson(temporeal);
    },
    clear: function() {
      window.localStorage.removeItem('temporeal');
    }
  }
})
.factory('LancesStorage', function() {
  return {
    all: function() {
      var lances = window.localStorage['lances'];
      if(lances) {
        return angular.fromJson(lances);
      }
      return {};
    },
    save: function(lances) {
      window.localStorage['lances'] = angular.toJson(lances);
    },
    clear: function() {
      window.localStorage.removeItem('lances');
    }
  }
})

.factory('ServerPostsStorage', function() {
  return {
    all: function() {
      var serverposts = window.localStorage['serverposts'];
      if(serverposts) {
        return angular.fromJson(serverposts);
      }
      return {};
    },
    save: function(serverposts) {
      window.localStorage['serverposts'] = angular.toJson(serverposts);
    },
    clear: function() {
      window.localStorage.removeItem('serverposts');
    }
  }
})

.factory('FeedsStorage', function() {
  return {
    all: function() {
      var feeds = window.localStorage['feeds'];
      if(feeds) {
        return angular.fromJson(feeds);
      }
      return {};
    },
    save: function(feeds) {
      window.localStorage['feeds'] = angular.toJson(feeds);
    },
    clear: function() {
      window.localStorage.removeItem('feeds');
    }
  }
})

.factory('SettingsStorage', function() {
  return {
    all: function() {
      var settings = window.localStorage['settings'];
      if(settings) {
        return angular.fromJson(settings);
      }
      return {
            // Initial App Setting Values
            options: [
            {
               name: 'First Option',
               checked: true
            },
            {
               name: 'Second Option',
               checked: false
            },
            {
               name: 'Third Option',
               checked: false
            },
            {
               name: 'Fourth Option',
               checked: false
            },
            {
               name: 'Fifth Option',
               checked: false
            }],
            sorting: 'A',
            range:30
        };
    },
    save: function(settings) {
      window.localStorage['settings'] = angular.toJson(settings);
    },
    clear: function() {
      window.localStorage.removeItem('settings');
    }
  }
})
