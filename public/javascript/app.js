angular.module('about', ['ui.router'])
  .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    'use strict';

    $urlRouterProvider.when('/about', '/about/company');
    $urlRouterProvider.when('/about/contact', '/about/contact/amsterdam');
    $urlRouterProvider.when('/about/careers', '/about/careers/career1');

    $stateProvider
      .state('about', {
        url: '/about',
        parent: 'common',
        templateUrl: 'about/views/about.html'
      })
        .state('about.company', {
          url: '/company',
          scrollGroup: 'about',
          views: {
            'header': {
              templateUrl: 'about/views/header-company.html'
            },
            'content': {
              templateUrl: 'about/views/content-company.html',
              controller: ["$scope", function($scope) {
                $scope.$parent.activeTab = 'company';
              }]
            }
          }
        })
        .state('about.values', {
          url: '/values',
          scrollGroup: 'about',
          views: {
            'header': {
              templateUrl: 'about/views/header-values.html'
            },
            'content': {
              templateUrl: 'about/views/content-values.html',
              controller: ["$scope", function($scope) {
                $scope.$parent.activeTab = 'values';
              }]
            }
          }
        })
        .state('about.careers', {
          url: '/careers',
          scrollGroup: 'about',
          views: {
            'header': {
              templateUrl: 'about/views/header-careers.html'
            },
            'content': {
              templateUrl: 'about/views/content-careers.html',
              controller: ["$scope", function($scope) {
                $scope.$parent.activeTab = 'careers';
              }]
            }
          }
        })
          .state('about.careers.career1', {
            url: '/career1',
            templateUrl: 'about/views/careers.career1.html',
            scrollGroup: 'about',
            scrollTo: 'section.content-section',
            controller: ["$scope", function($scope) {
              $scope.$parent.activeTab = 'career1';
            }]
          })
          .state('about.careers.career2', {
            url: '/career2',
            templateUrl: 'about/views/careers.career2.html',
            scrollGroup: 'about',
            scrollTo: 'section.content-section',
            controller: ["$scope", function($scope) {
              $scope.$parent.activeTab = 'career2';
            }]
          })
        .state('about.contact', {
          url: '/contact',
          scrollGroup: 'about',
          views: {
            'header': {
              templateUrl: 'about/views/header-contact.html'
            },
            'content': {
              templateUrl: 'about/views/content-contact.html',
              controller: ["$scope", function($scope) {
                $scope.$parent.activeTab = 'contact';
              }]
            }
          }
        })
          .state('about.contact.amsterdam', {
            url: '/amsterdam',
            templateUrl: 'about/views/contact.amsterdam.html',
            scrollGroup: 'about',
            controller: ["$scope", function($scope) {
              $scope.$parent.activeTab = 'amsterdam';
            }]
          })
          .state('about.contact.accra', {
            url: '/accra',
            templateUrl: 'about/views/contact.accra.html',
            scrollGroup: 'about',
            controller: ["$scope", function($scope) {
              $scope.$parent.activeTab = 'sanpaulo';
            }]
          })
          .state('about.contact.kharkiv', {
            url: '/kharkiv',
            templateUrl: 'about/views/contact.kharkiv.html',
            scrollGroup: 'about',
            controller: ["$scope", function($scope) {
              $scope.$parent.activeTab = 'kharkiv';
            }]
          });
  }]);
angular.module('about')
  .directive('contactMap', ["GoogleMapConfigValue", function(GoogleMapConfigValue) {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        'xcoord': '=',
        'ycoord': '='
      },
      link: function($scope, element) {
        GoogleMapConfigValue.general.center = new google.maps.LatLng($scope.xcoord + 0.0055,$scope.ycoord);

        var customMapStyle = new google.maps.StyledMapType(GoogleMapConfigValue.styling, GoogleMapConfigValue.meta),
            map = new google.maps.Map(element[0], GoogleMapConfigValue.general),
            marker = new google.maps.Marker({
              position: new google.maps.LatLng($scope.xcoord,$scope.ycoord),
              map: map,
              animation: google.maps.Animation.DROP
            });

        map.mapTypes.set('MAP', customMapStyle );
      }
    };
  }]);
angular.module('about')
  .value('GoogleMapConfigValue', {
    general: {
      zoom: 15,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      scrollwheel: false,
      draggable: false,
      mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'MAP']
      },
      mapTypeId: 'MAP'
    },
    styling: [
      {
        stylers: [
          { gamma: 0.65 },
          { saturation: -20 },
          { weight: 0.3 },
          { lightness: 0 }
        ]
      },
      {
        featureType: 'water',
        stylers: [
          { color: '#92a0a9' }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          { lightness: 90 },
          { visibility: 'on' }
        ]
      },
      {
        featureType: 'transit',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          { visibility: 'on' }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ],
    meta: {
      name: 'Custom Style'
    }
  });
angular.module('auth', ['ngBiscuit', 'ui.router', 'restangular', 'data', 'helper'])
  .config(["$stateProvider", function($stateProvider) {
    'use strict';

    $stateProvider
      .state('login', {
        url: '/login?back_link',
        parent: 'common',
        templateUrl: 'auth/views/login-page.html',
        controller: 'LoginController',
        data: { public: true }
      })
      .state('logout', {
        url: '/logout?back_link',
        data: {},
        controller: 'LogoutController'
      })
      .state('signup', {
        url: '/signup',
        parent: 'common',
        templateUrl: 'auth/views/signup-page.html',
        controller: 'SignupController',
        data: { public: true }
      })
      .state('reset-password', {
        url: '/reset-password/request',
        parent: 'common',
        templateUrl: 'auth/views/reset-password.html',
        controller: 'ResetPasswordController',
        data: { public: true }
      })
      .state('confirm-new-password', {
        url: '/reset-password/confirmation?token',
        parent: 'common',
        templateUrl: 'auth/views/confirm-password.html',
        controller: 'ConfirmPasswordController',
        data: { public: true }
      });
  }])
  .config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push('authRejector');
  }]);
angular.module('auth')
  .service('AccessTokenManager', ["cookieStore", "DOMAIN", function(cookieStore, DOMAIN) {
    'use strict';

    this.get = function() {
      return cookieStore.get('accessToken') || null;
    };

    this.set = function(token) {
      cookieStore.put('accessToken', token, { domain : DOMAIN, path: '/' });
    };

    this.remove = function() {
      cookieStore.remove('accessToken', { domain : DOMAIN, path: '/' });
    };

    this.removeSession = function() {
      cookieStore.remove('_studytube_session_v2', { domain : DOMAIN, path: '/' });
    };
  }]);
angular.module('auth')
  .factory('authRejector', ["$q", "AccessTokenManager", "RedirectService", function($q, AccessTokenManager, RedirectService) {
    return {
      responseError: function(rejection) {
        if (rejection.status === 401 && 'sessions' !== rejection.config.url.slice(-8)) {
          AccessTokenManager.remove();
          RedirectService.reload();
        }

        return $q.reject(rejection);
      }
    };
  }]);
angular.module('auth')
  .service('AuthService', ["$http", "$q", "AccessTokenManager", "SessionService", function($http, $q, AccessTokenManager, SessionService) {
    'use strict';

    var currentToken = null,
      loginDeferred = $q.defer();

    this.loginPromise = loginDeferred.promise;

    this.loginByCredentials = function(username, password) {
      return SessionService.create(username, password)
        .then(function(response) {
          AccessTokenManager.set(response.contents);

          return response;
        });
    };

    this.loginByToken = function() {
      currentToken = AccessTokenManager.get();
      $http.defaults.headers.common['X-Token'] = currentToken;

      return SessionService.get(currentToken)
        .then(function(response) {
          loginDeferred.resolve(response);
        });
    };

    this.isAuthorizationValid = function() {
      return !currentToken || currentToken === AccessTokenManager.get();
    };

    this.logout = function() {
      currentToken = null;
      AccessTokenManager.remove();
      SessionService.destroy();

      // required to clear session on old app
      AccessTokenManager.removeSession();
    };
  }]);
angular.module('auth')
  .controller('ConfirmPasswordController', ["$scope", "$state", "$q", "$stateParams", "FlashService", "ResetPasswordService", function($scope, $state, $q, $stateParams, FlashService, ResetPasswordService) {
    'use strict';

    $scope.submitForm = function() {
      ResetPasswordService.confirmNewPassword($scope.password, $scope.confirmation, $stateParams.token)
        .then(function() {
          FlashService.success('PASSWORD_RESTORED_SUCCESSFULLY');
          $state.go('login');
        })
        .catch(function(errors) {
          $scope.errors = errors;
        });
    };

    $scope.resetError = function() {
      $scope.errors = {};
    };
  }]);
angular.module('auth')
  .controller('LoginController', ["$scope", "$state", "AuthService", "RedirectService", function($scope, $state, AuthService, RedirectService) {
    'use strict';

    $scope.login = function() {
      AuthService.loginByCredentials($scope.username, $scope.password)
        .then(function() {
          var url = $state.params.back_link;

          if (url) {
            RedirectService.redirect(url);
          } else {
            $state.go('dashboard');
          }
        })
        .catch(function() {
          $scope.loginFailed = true;
        });
    };

    $scope.resetError = function() {
      $scope.loginFailed = false;
    };
  }]);
angular.module('auth')
  .directive('loginModal', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'auth/views/login-modal.html',
      replace: true,
      link: function($scope, iElm, iAttrs, controller) {
        // ...
      }
    };
  });
angular.module('auth')
  .controller('LogoutController', ["$state", "AuthService", function($state, AuthService) {
    'use strict';

    AuthService.logout();
    $state.go('login', $state.params);
  }]);
angular.module('auth')
  .controller('ResetPasswordController', ["$scope", "$state", "FlashService", "ResetPasswordService", function($scope, $state, FlashService, ResetPasswordService) {
    'use strict';

    $scope.submitForm = function() {
      ResetPasswordService.sendResetRequest($scope.email)
        .then(function() {
          $state.go('login');
          FlashService.success('RESET_PASSWORD_EMAIL_SENT');
        })
        .catch(function(errors) {
          $scope.errors = errors;
        });
    };

    $scope.resetError = function() {
      $scope.errors = {};
    };
  }]);
angular.module('auth')
  .factory('ResetPasswordService', ["Restangular", "ErrorHandlingService", "LINKS", function(Restangular, ErrorHandlingService, LINKS) {
    'use strict';

    return {
      sendResetRequest: function(email) {
        return Restangular.allUrl('reset-passwords', LINKS.apiResetPassword).post({ email: email })
          .catch(ErrorHandlingService.handleAsync);
      },
      confirmNewPassword: function(password, confirmation, token) {
        return Restangular.oneUrl('reset-passwords', LINKS.apiResetPassword + '/' + token).patch({
          token: token,
          password: password,
          passwordConfirmation: confirmation
        })
          .catch(ErrorHandlingService.handleAsync);
      }
    };
  }]);
angular.module('auth')
  .service('SessionService', ["Restangular", "LINKS", function(Restangular, LINKS) {
    'use strict';

    return {
      get: function(token) {
        return Restangular.allUrl('sessions', LINKS.apiAuth).get(token);
      },
      create: function(username, password) {
        return Restangular.allUrl('sessions', LINKS.apiAuth).post({ email: username, password: password });
      },
      destroy: function() {
        return Restangular.allUrl('sessions', LINKS.apiAuth).remove();
      }
    };
  }]);
angular.module('auth')
  .controller('SignupController', ["$scope", "$state", "$window", "AuthService", "UserService", function($scope, $state, $window, AuthService, UserService) {
    'use strict';

    $scope.errors = {};
    $scope.userData = {};

    $scope.submitForm = function() {
      $scope.formStatus = 'waiting';

      UserService.create($scope.userData)
        .then(function(user) {
          $scope.formStatus = 'sent';

          AuthService.loginByCredentials($scope.userData.email, $scope.userData.password)
            .then(function() {
              if ($window.tap) {
                $scope.registerWindowTap(user);
              }

              $state.go('courses.all', {}, { reload: true });
            });
        })
        .catch(function(errors) {
          $scope.formStatus = 'error';
          $scope.errors = {};
          
          angular.forEach(errors, function(messages, key) {
            if (messages && messages.length) {
              $scope.errors[key] = messages[0];
            }
          });
        });
    };

    $scope.resetErrors = function() {
      $scope.errors = {};
    };
  }]);
angular.module('auth')
  .directive('signupModal', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'auth/views/signup-modal.html',
      replace: true
    };
  });
angular.module('courses', ['ui.router', 'ui', 'auth'])
  .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    'use strict';


    $stateProvider
      .state('courses', {
        url: '/courses',
        abstract: true,
        parent: 'common',
        templateUrl: 'courses/views/courses.html',
        controller: 'CoursesController'
      })
      .state('courses.all', {
        url: '',
        templateUrl: 'courses/views/list.html',
        scrollGroup: 'courses',
        controller: 'AllCoursesController'
      })
      .state('courses.search', {
        url: '/search?query',
        templateUrl: 'courses/views/list.html',
        scrollGroup: 'courses',
        controller: 'SearchCoursesController'
      })
      .state('courses.category', {
        url: '/categories/:categoryId/:categoryName',
        templateUrl: 'courses/views/list.html',
        scrollGroup: 'courses',
        controller: 'CategoryCoursesController'
      })
      //TODO: this states is quick fix to allow short urls, should be removed when we preload all the data from the beginning
      .state('courses.categoryShort', {
        url: '/categories/:categoryId',
        templateUrl: 'courses/views/list.html',
        scrollGroup: 'courses',
        controller: 'CategoryCoursesController'
      })
      .state('course', {
        url: '/courses/:courseId',
        parent: 'common',
        templateUrl: 'courses/views/course.html',
        controller: 'CourseController',
        resolve: {
          courseData: ["$stateParams", "CourseInitializationService", "initialData", function($stateParams, CourseInitializationService, initialData) {
            return CourseInitializationService.initialize(parseInt($stateParams.courseId));
          }]
        }
      })
      .state('course.buy', {
        url: '/buy',
        templateUrl: 'courses/views/buy-course.html',
        controllerProvider: ["CurrentUserService", function(CurrentUserService) {
          return CurrentUserService.get() ? 'BuyCourseController' : 'BuyCoursePublicController';
        }]
      })
      .state('course.add', {
        url: '/add',
        template: '',
        controller: 'AddCourseController',
        data: { private: true },
        resolve: {
          authorization: ["InitializationService", "initialData", function(InitializationService, initialData) {
            return InitializationService.initializePrivate();
          }]
        }
      })
      .state('course.callback', {
        url: '/callback',
        templateUrl: 'courses/views/get-callback.html',
        controller: 'GetCallbackController'
      })
      .state('course.brochure', {
        url: '/brochure',
        templateUrl: 'courses/views/get-brochure.html',
        controller: 'GetBrochureController'
      })
      .state('course.long', {
        url: '/:courseName'
      });
  }]);

angular.module('courses')
  .controller('AddCourseController', ["$scope", "$state", "CurrentUserService", "FlashService", "RedirectService", "UserService", function($scope, $state, CurrentUserService, FlashService, RedirectService, UserService) {
    'use strict';

    var currentUser = CurrentUserService.get();

    if (-1 !== currentUser.courses.indexOf($scope.course.id)) {
      $state.go('^');

      return;
    }

    UserService.addCourse(currentUser, $scope.course.id)
      .then(function() {
        RedirectService.redirect($scope.course.courseUrl);
      })
      .catch(function() {
        FlashService.error('ADD_COURSE_ERROR');
        $state.go('^');
      });
  }]);
angular.module('courses')
  .controller('AllCoursesController', ["$scope", function($scope) {
    'use strict';

    $scope.coursesSearch.query = '';
    $scope.setCurrentCategory();
    $scope.loadCourses();
  }]);

angular.module('courses')
  .controller('BuyCourseController', ["$scope", "$q", "$state", "CurrentUserService", "FlashService", "OrderItemService", "OrderService", "RedirectService", "UserService", function($scope, $q, $state, CurrentUserService, FlashService, OrderItemService, OrderService, RedirectService, UserService) {
    'use strict';

    $scope.currentUser = CurrentUserService.get();

    $scope.coupon = {};

    if (-1 !== $scope.currentUser.courses.indexOf($scope.course.id)) {
      RedirectService.redirect(CurrentUserService.getCourse($scope.course.id).courseUrl);
    } else if ($scope.currentUser.hasContentLicence) {
      $state.go('^.add');
    } else {
      createOrder();
    }

    $scope.applyCoupon = function() {
      $scope.coupon.formState = 'waiting';
      OrderService.giveDiscount($scope.order, $scope.coupon.code)
        .then(function(order) {
          $scope.coupon.formState = 'success';
          $scope.order = order;
        })
        .catch(function() {
          $scope.coupon.formState = 'error';
        });
    };

    $scope.proceedToPayment = function() {
      RedirectService.redirect($scope.order.paymentUrl);
    };

    $scope.addCourseWithDiscount = function() {
      UserService.addCourse($scope.currentUser, $scope.course.id, $scope.order.id)
        .then(function() {
          RedirectService.redirect($scope.course.courseUrl);
        })
        .catch(function() {
          FlashService.error('ADD_COURSE_ERROR');
        });
    };

    function createOrder() {
      OrderItemService.create({
        licenceType: 'course',
        courseId: $scope.course.id
      })
        .then(function(order) {
          $scope.order = order;
        })
        .catch(function() {
          FlashService.error('COURSE_NOT_AVAILABLE_ERROR');
          $state.go('^');
        });
    }
  }]);

angular.module('courses')
  .controller('BuyCoursePublicController', ["$scope", "$q", "$state", "$window", "AuthService", "CurrentUserService", "FlashService", "OrderService", "OrderItemService", "RedirectService", "UserService", function($scope, $q, $state, $window, AuthService, CurrentUserService, FlashService, OrderService, OrderItemService, RedirectService, UserService) {
    'use strict';

    $scope.signUpFormIsShown = true;
    $scope.userData = {};
    $scope.errors = {};
    $scope.coupon = {};

    createOrder();

    $scope.addCourseWithDiscount = $scope.proceedToPayment = function() {
      if ($scope.signUpFormIsShown) {
        return $scope.signUpAndPurchase($scope.userData);
      } else {
        return $scope.signInAndPurchase($scope.userData);
      }
    };

    $scope.toggleSignUpForm = function() {
      $scope.signUpFormIsShown = !$scope.signUpFormIsShown;
      $scope.userData = {};
    };

    $scope.signInAndPurchase = function(user) {
      $scope.signInAndProceed(user).then(function(currentUser) {
          if (-1 !== currentUser.courses.indexOf($scope.course.id)) {
            RedirectService.redirect(CurrentUserService.getCourse($scope.course.id).courseUrl);
          } else if (currentUser.hasContentLicence) {
            $state.go('^.add');
          } else {
            purchaseCourse(currentUser);
          }
        })
        .catch(function() {
          $scope.loginFailed = true;
        });
    };

    $scope.signUpAndPurchase = function(userData) {

      //we don't need confirmation for purchase page
      userData.passwordConfirmation = userData.password;

      UserService.create(userData)
        .then(function(user) {
          FlashService.success('SUCCESSFULLY_REGISTERED');

          if ($window.tap) {
            $scope.registerWindowTap(user);
          }

          return $scope.signInAndPurchase(userData);
        })
        .catch(function(errors) {
          $scope.formStatus = 'error';
          $scope.errors = {};

          angular.forEach(errors, function(messages, key) {
            if (messages && messages.length) {
              $scope.errors[key] = messages[0];
            }
          });
        });
    };

    $scope.applyCoupon = function() {
      $scope.coupon.formState = 'waiting';
      OrderService.giveDiscount($scope.order, $scope.coupon.code)
        .then(function(order) {
          $scope.coupon.formState = 'success';
          $scope.order = order;
        })
        .catch(function() {
          $scope.coupon.formState = 'error';
        });
    };

    function purchaseCourse(currentUser) {
        OrderService.assignToCurrentUser($scope.order)
          .then(function(order) {
            if ($scope.order.total) {
              return RedirectService.redirect(order.paymentUrl);
            }

            UserService.addCourse(currentUser, $scope.course.id, $scope.order.id)
              .then(function() {
                RedirectService.redirect($scope.course.courseUrl);
              })
              .catch(function() {
                FlashService.error('ADD_COURSE_ERROR');
                $state.go('^');
              });
          })
          .catch(function() {
            FlashService.error('COURSE_NOT_AVAILABLE_ERROR');
            $state.go('^');
          });
    }

    function createOrder() {
      OrderItemService.create({
        licenceType: 'course',
        courseId: $scope.course.id
      })
        .then(function(order) {
          $scope.order = order;
        })
        .catch(function() {
          FlashService.error('COURSE_NOT_AVAILABLE_ERROR');
          $state.go('^');
        });
    }
  }]);

angular.module('courses')
  .controller('CategoryCoursesController', ["$scope", "$stateParams", function($scope, $stateParams) {
    'use strict';

    var categoryId = parseInt($stateParams.categoryId, 10);

    $scope.coursesSearch.query = '';
    $scope.setCurrentCategory(categoryId);
    $scope.loadCourses({ categoryId: categoryId });
  }]);

angular.module('courses')
  .controller('CourseController', ["$scope", "$rootScope", "$state", "CurrentUserService", "PopupService", "RedirectService", "courseData", "PLAYER_URL", function($scope, $rootScope, $state, CurrentUserService, PopupService, RedirectService, courseData, PLAYER_URL) {
    'use strict';

    $scope.currentUser = CurrentUserService.get();
    $scope.course = courseData.course;
    $scope.similarCourses = courseData.similarCourses;

    $rootScope.title = $scope.course.name;

    if ($scope.course.videoId) {
      $scope.course.introVideo = '//player.vimeo.com/video/' + $scope.course.videoId + '?title=0&amp;byline=0&amp;portrait=0&amp;color=44a894&amp;api=1';
    }

    $scope.getCourseDuration = function(course) {
      var parts = course.duration.split(':');

      return parts[0] + 'h ' + parts[1] + 'min';
    };

    $scope.showFullDescription = function() {
      $scope.fullDescriptionIsShown = true;
    };

    $scope.getTopicPath = function(topic) {
      return PLAYER_URL
        .replace('{courseId}', $scope.course.id)
        .replace('{topicId}', topic.id);
    };

    $scope.buyCourse = function() {
      $state.go('course.buy');
    };

    $scope.addCourse = function() {
      $state.go('course.add');
    };

    $scope.getCallback = function() {
      $state.go('course.callback');
    };

    $scope.getCourseBrochure = function() {
      $state.go('course.brochure');
    };

    $scope.canAdd = function() {
      return 0 === $scope.course.price || CurrentUserService.hasContentLicence();
    };

    $scope.cancel = function() {
      $state.go('^');
    };

    $scope.isCoursePurchased = function(courseId) {
      return CurrentUserService.hasCourse(courseId);
    };

    $scope.previewTopic = function(topic) {
      if ($scope.currentUser) {
        RedirectService.redirect($scope.getTopicPath(topic));
      } else {
        $scope.topicToPreview = topic;
        PopupService.show('course_preview');
      }
    };
  }]);
angular.module('courses')
  .service('CourseInitializationService', ["$q", "$state", "CategoryService", "CourseService", "CurrentUserService", "RedirectService", function($q, $state, CategoryService, CourseService, CurrentUserService, RedirectService) {
    'use strict';

    this.initialize = function(courseId) {
      if (CurrentUserService.hasCourse(courseId)) {
        RedirectService.redirect(CurrentUserService.getCourse(courseId).courseUrl);

        return $q.reject();
      }

      return $q.all({
        course: CourseService.get(courseId),
        similarCourses: CourseService.getSimilar(courseId)
      })
        .then(function(response) {
          var course = response.course;

          if (course.isAnnounced) {
            return redirectToAllCourses();
          }

          course.categoriesInfo = course.categories.map(function(categoryId) {
            return CategoryService.getOneCached(categoryId);
          });

          return response;
        })
        .catch(redirectToAllCourses);
    };

    function redirectToAllCourses() {
      $state.go('courses.all');

      return $q.reject();
    }
  }]);
angular.module('courses')
  .directive('courseIntroVideoModal', ["$sce", "$window", "PopupService", function($sce, $window, PopupService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'courses/views/intro-video-modal.html',
      replace: true,
      controller: ["$scope", function($scope) {
        $scope.videoUrl = $sce.trustAsResourceUrl($scope.course.introVideo);
      }],
      link: function($scope, $element) {
        $scope.popup = PopupService.get('course_intro_video');

        $scope.$watch('popup.visible', function(newValue, oldValue) {
          var frame = $element.find('iframe')[0];

          if (newValue !== oldValue) {
            $window.Froogaloop(frame).api(newValue ? 'play' : 'pause');
          }
        });
      }
    };
  }]);
angular.module('courses')
  .directive('courseItem', ["$state", "CurrentUserService", function($state, CurrentUserService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'courses/views/course-item.html',
      replace: true,
      scope: {
        'course': '='
      },
      controller: ["$scope", function($scope) {
        var currentCourse = CurrentUserService.getCourse($scope.course.id);

        $scope.alreadyBought = function() {
          return CurrentUserService.hasCourse($scope.course.id);
        };

        if ($scope.course.isAnnounced) {
          $scope.courseLink = '';
        } else if (currentCourse) {
          $scope.courseLink = $scope.course.courseUrl;
          $scope.progress = Math.ceil(100 * currentCourse.progress);
        } else {
          $scope.courseLink = $state.href('course.long', { courseId: $scope.course.id , courseName: $scope.course.nameSlug});
        }
      }]
    };
  }]);
angular.module('courses')
  .directive('coursePreviewModal', ["$timeout", "$window", "CurrentUserService", "FlashService", "UserService", "RedirectService", function($timeout, $window, CurrentUserService, FlashService, UserService, RedirectService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'courses/views/course-preview.html',
      replace: true,
      link: function(scope, element) {
        scope.signUpFormIsShown = true;
        scope.userData = {};

        scope.toggleSignUpForm = function() {
          scope.signUpFormIsShown = !scope.signUpFormIsShown;
          scope.userData = {};
        };

        scope.proceedToPreview = function() {
          if (scope.signUpFormIsShown) {
            return scope.signUpAndPreview(scope.userData);
          } else {
            return scope.signInAndPreview(scope.userData);
          }
        };

        scope.signInAndPreview = function(user) {
          scope.signInAndProceed(user)
            .then(function() {
              $timeout(function() {
                RedirectService.redirect(scope.getTopicPath(scope.topicToPreview));
              }, 1000);
            })
            .catch(function() {
              scope.loginFailed = true;
            });
        };

        scope.signUpAndPreview = function(userData) {
          //we don't need confirmation for preview
          userData.passwordConfirmation = userData.password;

          UserService.create(userData)
            .then(function(user) {
              FlashService.success('SUCCESSFULLY_REGISTERED');

              if ($window.tap) {
                scope.registerWindowTap(user);
              }

              return scope.signInAndPreview(userData);
            })
            .catch(function(errors) {
              scope.formStatus = 'error';
              scope.errors = {};

              angular.forEach(errors, function(messages, key) {
                if (messages && messages.length) {
                  scope.errors[key] = messages[0];
                }
              });
            });
        };
      }
    };
  }]);
angular.module('courses')
  .controller('CoursesController', ["$rootScope", "$scope", "$state", "$translate", "$q", "CategoryService", "CourseService", function($rootScope, $scope, $state, $translate, $q, CategoryService, CourseService) {
    'use strict';

    $scope.courses = [];
    $scope.cachedCourses = [];
    $scope.trainingOrganisations = [];
    $scope.currentTrainingOrganisation = null;
    $scope.categories = CategoryService.getAllCached();
    $scope.currentCategory = null;
    $scope.coursesSearch = { query: '' };

    $scope.setCurrentCategory = function(categoryId) {
      $scope.currentCategory = CategoryService.getOneCached(categoryId);
      $rootScope.title = $scope.currentCategory ? $scope.currentCategory.name : $translate.instant('HP_NAV_ITEM_1');
    };

    $scope.selectCategory = function(category) {
      if (category) {
        $state.go('courses.category', { categoryId: category.id, categoryName: category.nameSlug });
      } else {
        $state.go('courses.all');
      }
    };

    $scope.loadCourses = function(filters) {
      var requestParams = filters || {};
      requestParams.perPage = 999;

      return CourseService.getAll(requestParams).then(function(courses) {
          $scope.courses = courses;
        });
    };

    $scope.searchCourses = function() {
      $state.go('courses.search', { query: $scope.coursesSearch.query });
    };

  }]);

angular.module('courses')
  .controller('GetBrochureController', ["$scope", "$state", "CourseService", "FlashService", function($scope, $state, CourseService, FlashService) {
    'use strict';

    $scope.errors = {};
    $scope.requestData = {};

    $scope.requestBrochure = function() {
      $scope.formState = 'waiting';

      CourseService.requestBrochure($scope.course.id, $scope.requestData)
        .then(function() {
          $scope.formState = 'sent';
          FlashService.success('BROCHURE_REQUEST_SENT');
          $state.go('^');
        })
        .catch(function(errors) {
          $scope.formState = 'error';
          $scope.errors = {};

          angular.forEach(errors, function(messages, key) {
            if (messages && messages.length) {
              $scope.errors[key] = messages[0];
            }
          });
        });
    };

    $scope.cancel = function() {
      $state.go('^');
    };

    $scope.resetErrors = function(key) {
      $scope.errors[key] = null;
    };
  }]);
angular.module('courses')
  .controller('GetCallbackController', ["$scope", "$state", "CourseService", "FlashService", function($scope, $state, CourseService, FlashService) {
    'use strict';

    $scope.errors = {};
    $scope.requestData = {};

    $scope.requestCallback = function() {
      $scope.formState = 'waiting';

      CourseService.requestCallback($scope.course.id, $scope.requestData)
        .then(function() {
          $scope.formState = 'sent';
          FlashService.success('CALLBACK_REQUEST_SENT');
          $state.go('^');
        })
        .catch(function(errors) {
          $scope.formState = 'error';
          $scope.errors = {};

          angular.forEach(errors, function(messages, key) {
            if (messages && messages.length) {
              $scope.errors[key] = messages[0];
            }
          });
        });
    };

    $scope.cancel = function() {
      $state.go('^');
    };

    $scope.resetErrors = function(key) {
      $scope.errors[key] = null;
    };
  }]);
angular.module('courses')
  .controller('SearchCoursesController', ["$scope", "$stateParams", function($scope, $stateParams) {
    'use strict';

    $scope.setCurrentCategory();
    $scope.loadCourses({ query: $stateParams.query }).then($scope.showAllCourses);
  }]);

angular.module('data', ['restangular']);
angular.module('data')
  .factory('AcademyService', ["$location", "Restangular", "$q", "ErrorHandlingService", function($location, Restangular, $q, ErrorHandlingService) {
    'use strict';

    var currentAcademy = null;

    return {
      getCurrent: function() {
        return currentAcademy;
      },
      initialize: function() {
        var subdomain = $location.host().split('.').slice(0, -2).join('.');

        return this.getBySubdomain(subdomain)
          .then(function(academy) {
            currentAcademy = academy;

            return currentAcademy;
          });
      },
      getBySubdomain: function(subdomain) {
        return Restangular.all('academies').getList({ subdomain: subdomain })
          .then(function(results) {
            if (0 === results.length) {
              return $q.reject();
            }

            return $q.when(results[0]);
          })
          .catch(ErrorHandlingService.handleAsync);
      },
      create: function(academy) {
        return validate(academy)
          .then(function() {
            return Restangular.all('academies').post(academy);
          })
          .catch(ErrorHandlingService.handleAsync);
      }
    };

    function validate(academy) {
      var errors = {
        field: []
      };

      // validation rules go here

      if (errors.field.length
      // || add conditions for all your fields
      ) {
        return $q.reject({data: errors});
      }

      return $q.when();
    }

  }]);
angular.module('data')
  .factory('CategoryService', ["Restangular", "$q", "ErrorHandlingService", function(Restangular, $q, ErrorHandlingService){
    'use strict';

    var cachedCategories,
      cachedCategoriesMap = {};

    return {
      get: function(id) {
        return Restangular.all('categories').get(id)
          .catch(ErrorHandlingService.handleAsync);
      },
      getAll: function() {
        return Restangular.all('categories').getList()
          .catch(ErrorHandlingService.handleAsync);
      },
      getAllCached: function() {
        return cachedCategories;
      },
      getOneCached: function(id) {
        return cachedCategoriesMap[id] || null;
      },
      initialize: function() {
        return this.getAll()
          .then(function(categories) {
            cachedCategories = categories;

            angular.forEach(cachedCategories, function(category) {
              cachedCategoriesMap[category.id] = category;
            });
          });
      }
    };
  }]);

angular.module('data')
  .factory('CourseService', ["Restangular", "ErrorHandlingService", function(Restangular, ErrorHandlingService) {
    'use strict';

    return {
      get: function(id) {
        return Restangular.all('courses').get(id)
          .catch(ErrorHandlingService.handleAsync);
      },
      getAll: function(params) {
        return Restangular.all('courses').getList(params)
          .catch(ErrorHandlingService.handleAsync);
      },
      getSimilar: function(id) {
        var params = {
          perPage: 3,
          similarCourseId: id
        };

        return Restangular.all('similar-courses').getList(params)
          .catch(ErrorHandlingService.handleAsync);
      },
      requestCallback: function(courseId, requestData) {
        return Restangular.one('courses', courseId).post('callback-request', requestData)
          .catch(ErrorHandlingService.handleAsync);
      },
      requestBrochure: function(courseId, requestData) {
        return Restangular.one('courses', courseId).post('brochure-request', requestData)
          .catch(ErrorHandlingService.handleAsync);
      }
    };
  }]);
angular.module('data')
  .service('CurrentUserService', ["$q", "UserService", function($q, UserService) {
    'use strict';

    var currentUser;

    this.initialize = function(userId) {
      return $q.all({
        user: UserService.get(userId),
        courses: UserService.getUserCourses(userId)
      })
        .then(function(response) {
          currentUser = response.user;
          currentUser.coursesInfo = response.courses;

          currentUser.currentCoursesInfo = response.courses.filter(function(course) {
            return 1 !== course.progress;
          });

          currentUser.finishedCoursesInfo = response.courses.filter(function(course) {
            return 1 === course.progress;
          });

          currentUser.isExpert = currentUser.roles.some(function(role) {
            return ['expert', 'admin'].indexOf(role) !== -1;
          });

          return currentUser;
        });
    };

    this.get = function() {
      return currentUser;
    };

    this.getCourse = function(courseId) {
      return currentUser && currentUser.coursesInfo.filter(function(course) {
        return courseId === course.id;
      })[0];
    };

    this.hasContentLicence = function() {
      return currentUser && currentUser.hasContentLicence;
    };

    this.hasCourse = function(courseId) {
      return currentUser && -1 !== currentUser.courses.indexOf(courseId);
    };
  }]);
angular.module('data')
  .factory('DiscountCodeService', ["Restangular", "$q", "ErrorHandlingService", function(Restangular, $q, ErrorHandlingService) {
    'use strict';

    return {
      get: function(discountCode) {
        return Restangular.all('discount-codes').getList({ discountCode: discountCode })
          .catch(ErrorHandlingService.handleAsync);
      }
    };
  }]);
angular.module('data')
  .factory('ErrorHandlingService', ["$q", function($q) {
    'use strict';

    return {
      handleAsync: function(response) {
        var structuredErrors = {
          status: response.status
        };

        if (response.data) {
          angular.extend(structuredErrors, response.data);
        }

        return $q.reject(structuredErrors);
      }
    };
  }]);

angular.module('data')
  .factory('ExpertService', ["$q", "$window", "Restangular", "ErrorHandlingService", function($q, $window, Restangular, ErrorHandlingService) {
    'use strict';

    function validate(expert) {
      var errors = {
        email: []
      };

      if (!expert.email) {
        errors.email.push('REQUIRED');
      }

      if (errors.email.length) {
        return $q.reject({ data: errors });
      }

      return $q.when();
    }

    return {
      becomeExpert: function(expert) {
        return validate(expert)
          .then(function() {
            return Restangular.all('become-expert-requests').post(expert);
          })
          .catch(ErrorHandlingService.handleAsync);
      }
    };
  }]);
angular.module('data')
  .factory('InstructorService', ["Restangular", "ErrorHandlingService", function(Restangular, ErrorHandlingService) {
    'use strict';

    return {
      get: function(id) {
        return Restangular.all('instructors').get(id)
          .catch(ErrorHandlingService.handleAsync);
      },
      getAll: function(params) {
        return Restangular.all('instructors').getList(params)
          .catch(ErrorHandlingService.handleAsync);
      },
      sendMessage: function(id, contactMessage) {
        var requestData = {
          name: contactMessage.name,
          companyName: contactMessage.companyName,
          role: contactMessage.role,
          phone: contactMessage.phone,
          email: contactMessage.email,
          wouldLike: contactMessage.wouldLike,
          message: contactMessage.message
        };

        return Restangular.one('instructors', id).all('contacts').post(requestData);
      }
    };
  }]);
angular.module('data')
  .factory('OrderItemService', ["Restangular", "$q", "ErrorHandlingService", function(Restangular, $q, ErrorHandlingService) {
    'use strict';
    
    var LICENCE_TYPES = ['content', 'course'];

    function validate(orderItem) {
      var errors = {
        licenceType: [],
        courseId: []
      };
      
      if (!orderItem.licenceType) {
        errors.licenceType.push('Cannot be empty');
      } else if (-1 === LICENCE_TYPES.indexOf(orderItem.licenceType)) {
        errors.licenceType.push('Illegal value');
      }

      if ('course' === orderItem.licenceType && !orderItem.courseId) {
        errors.courseId.push('Required for course licence');
      }

      if (errors.licenceType.length || errors.courseId.length) {
        return $q.reject({ data: errors });
      }

      return $q.when();
    }

    return {
      create: function(orderItemData) {
        return validate(orderItemData)
          .then(function() {
            return Restangular.all('order-items').post(orderItemData);
          })
          .catch(ErrorHandlingService.handleAsync);
      }
    };
  }]);
angular.module('data')
  .factory('OrderService', ["Restangular", "$q", "ErrorHandlingService", function(Restangular, $q, ErrorHandlingService) {
    'use strict';

    return {
      giveDiscount: function(order, discountCode) {
        return Restangular.one('orders', order.id).patch({ discountCode: discountCode, uuid: order.uuid })
          .catch(ErrorHandlingService.handleAsync);
      },
      assignToCurrentUser: function(order) {
        return Restangular.one('orders', order.uuid).all('assign-to-user').patch()
          .catch(ErrorHandlingService.handleAsync);
      }
    };
  }]);
angular.module('data')
  .factory('UserService', ["$q", "$window", "Restangular", "ErrorHandlingService", function($q, $window, Restangular, ErrorHandlingService) {
    'use strict';

    return {
      get: function(id) {
        return Restangular.all('users').get(id)
          .catch(ErrorHandlingService.handleAsync);
      },
      getAll: function(params) {
        return Restangular.all('users').getList(params)
          .catch(ErrorHandlingService.handleAsync);
      },
      getUserCourses: function(id) {
        return Restangular.one('users', id).all('courses').getList()
          .catch(ErrorHandlingService.handleAsync);
      },
      getRecommendedCourses: function(id) {
        return Restangular.one('users', id).all('recommended-courses').getList()
          .catch(ErrorHandlingService.handleAsync);
      },
      create: function(userData) {
        return validateRegistration(userData)
          .then(function() {
            return Restangular.all('users').post(userData);
          })
          .catch(ErrorHandlingService.handleAsync);
      },
      update: function(user) {
        return validateUpdate(user)
          .then(function() {
            var updateFields = {
              name: user.name,
              twitterUrl: user.twitterUrl,
              facebookUrl: user.facebookUrl,
              linkedinUrl: user.linkedinUrl,
              websiteUrl: user.websiteUrl
            };

            if (user.newPassword) {
              updateFields.password = user.newPassword;
              updateFields.passwordConfirmation = user.newPasswordConfirmation;
              updateFields.currentPassword = user.currentPassword;
            }

            return user.patch(updateFields);
          })
          .catch(ErrorHandlingService.handleAsync);
      },
      addCourse: function(user, courseId, orderId) {
        var params = {
          courseId: courseId
        };

        if (orderId) {
          params.orderId = orderId;
        }

        return Restangular.one('users', user.id).all('courses').post(params)
          .then(function() {
            user.courses.push(courseId);
          })
          .catch(ErrorHandlingService.handleAsync);
      },
      updateImage: function(user, newImage) {
        return validateUpdate(user)
          .then(function() {
            var imageData = new $window.FormData();

            imageData.append('avatar', newImage);

            return Restangular.one('users', user.id)
              .withHttpConfig({ transformRequest: angular.identity })
              .customPOST(imageData, null, undefined, { 'Content-Type': undefined, 'X-HTTP-Method-Override': 'patch' });
          });
      }
    };

    function validateRegistration(user) {
      var errors = {
        email: [],
        name: [],
        password: [],
        passwordConfirmation: []
      };

      if (!user.email) {
        errors.email.push('REQUIRED');
      }

      if (!user.name) {
        errors.name.push('REQUIRED');
      }

      if (!user.password) {
        errors.password.push('REQUIRED');
      }

      if (!user.passwordConfirmation) {
        errors.passwordConfirmation.push('REQUIRED');
      } else if (user.passwordConfirmation !== user.password) {
        errors.passwordConfirmation.push('SHOULD_MATCH_PASSWORD');
      }

      if (errors.email.length ||
        errors.name.length ||
        errors.password.length ||
        errors.passwordConfirmation.length
      ) {
        return $q.reject({ data: errors });
      }

      return $q.when();
    }

    function validateUpdate(user) {
      var errors = {
        email: [],
        name: [],
        twitterUrl: [],
        facebookUrl: [],
        linkedinUrl: [],
        websiteUrl: [],
        newPassword: [],
        newPasswordConfirmation: [],
        currentPassword: []
      };

      if (!user.email) {
        errors.email.push('REQUIRED');
      }

      if (!user.name) {
        errors.name.push('REQUIRED');
      }


      if (user.twitterUrl && !isWebsiteLinkValid(user.twitterUrl, 'twitter.com')) {
        errors.twitterUrl.push('INVALID_URL');
      }

      if (user.facebookUrl && !isWebsiteLinkValid(user.facebookUrl, 'facebook.com')) {
        errors.facebookUrl.push('INVALID_URL');
      }

      if (user.linkedinUrl && !isWebsiteLinkValid(user.linkedinUrl, 'linkedin.com')) {
        errors.linkedinUrl.push('INVALID_URL');
      }

      if (user.websiteUrl && !isWebsiteLinkValid(user.websiteUrl)) {
        errors.websiteUrl.push('INVALID_URL');
      }

      if (user.newPassword) {
        if (!user.newPasswordConfirmation) {
          errors.newPasswordConfirmation.push('REQUIRED');
        } else if (user.newPasswordConfirmation !== user.newPassword) {
          errors.newPasswordConfirmation.push('DOES_NOT_MATCH_PASSWORD');
        }

        if (!user.currentPassword) {
          errors.currentPassword.push('REQUIRED');
        }
      }

      if (errors.email.length ||
        errors.name.length ||
        errors.twitterUrl.length ||
        errors.facebookUrl.length ||
        errors.linkedinUrl.length ||
        errors.websiteUrl.length ||
        errors.newPassword.length ||
        errors.newPasswordConfirmation.length ||
        errors.currentPassword.length
      ) {
        return $q.reject({ data: errors });
      }

      return $q.when();
    }

    function isWebsiteLinkValid(value, domain) {
      var matches;

      if (domain) {
        matches = value.match(new RegExp('^(http|https):\/\/(www.)?(' + domain + ')\/(\\w+)'));
      } else {
        matches = value.match(new RegExp('^(http|https):\/\/(www.)?([\\w\\.]+)'));
      }

      return !!matches && !!matches.length;
    }

  }]);
angular.module('helper', []);
angular.module('helper')
  .service('RedirectService', ["$window", function($window) {
    'use strict';

    this.redirect = function(url) {
      $window.location.href = url;
    };

    this.reload = function() {
      $window.location.reload();
    };
  }]);
angular.module('instructors', ['data', 'ui.router'])
  .config(["$stateProvider", function($stateProvider) {
    'use strict';

    $stateProvider
      .state('instructors', {
        url: '/instructors',
        abstract: true,
        parent: 'common',
        templateUrl: 'instructors/views/instructors.html',
        controller: 'InstructorsController'
      })
      .state('instructors.all', {
        url: '',
        templateUrl: 'instructors/views/list.html',
        scrollGroup: 'instructors',
        controller: 'AllInstructorsController'
      })
      .state('instructors.search', {
        url: '/search?query',
        templateUrl: 'instructors/views/list.html',
        scrollGroup: 'instructors',
        controller: 'SearchInstructorsController'
      })
      //TODO: this states is quick fix to allow short urls, should be removed when we preload all the data from the beginning
      .state('instructors.categoryShort', {
        url: '/categories/:categoryId',
        templateUrl: 'instructors/views/list.html',
        scrollGroup: 'instructors',
        controller: 'CategoryInstructorsController'
      })
      .state('instructorShort', {
        url: '/instructors/:instructorId',
        parent: 'common',
        templateUrl: 'instructors/views/instructor.html',
        controller: 'InstructorController'
      })
      .state('instructors.category', {
        url: '/categories/:categoryId/:categoryName',
        templateUrl: 'instructors/views/list.html',
        scrollGroup: 'instructors',
        controller: 'CategoryInstructorsController'
      })
      .state('instructor', {
        url: '/instructors/:instructorId/:instructorName',
        parent: 'common',
        templateUrl: 'instructors/views/instructor.html',
        controller: 'InstructorController'
      });
  }]);
angular.module('instructors')
  .controller('AllInstructorsController', ["$scope", function($scope) {
    'use strict';

    $scope.instructorSearch.query = '';
    $scope.setCurrentCategory();
    $scope.loadInstructors();
  }]);
angular.module('instructors')
  .controller('CategoryInstructorsController', ["$scope", "$stateParams", function($scope, $stateParams) {
    'use strict';

    var categoryId = parseInt($stateParams.categoryId, 10);

    $scope.instructorSearch.query = '';
    $scope.setCurrentCategory(categoryId);
    $scope.loadInstructors({ categoryId: categoryId });
  }]);
angular.module('instructors')
  .controller('InstructorController', ["$rootScope", "$scope", "$q", "$state", "$stateParams", "FlashService", "CourseService", "InstructorService", function($rootScope, $scope, $q, $state, $stateParams, FlashService, CourseService, InstructorService) {
    'use strict';

    $scope.contact = {};



    InstructorService.get(parseInt($stateParams.instructorId, 10))
      .then(function(instructor) {
        $scope.instructor = instructor;
        $rootScope.title = $scope.instructor.name;

        $scope.instructor.courses = [];
        angular.forEach($scope.instructor.teaching, function(course) {
          CourseService.get(course).then(function(courseInfo) {
            $scope.instructor.courses.push(courseInfo);
          });
        });
        // Commented out because we need instructor's video but not the course's one

        //if (instructor.teaching[0] && instructor.teaching[0].videoId) {
        //  $scope.instructor.introVideo = '//player.vimeo.com/video/' + instructor.teaching[0].videoId + '?title=0&amp;byline=0&amp;portrait=0&amp;color=44a894&amp;api=1';
        //}
      })
      .catch(function() {
        $state.go('instructors.all');
      });

    $scope.sendMessage = function(contactData) {
      InstructorService.sendMessage($scope.instructor.id, contactData)
        .then(function() {
          $scope.contactForm.$setPristine();
          $scope.contact = {};

          FlashService.success('CONTACT_MESSAGE_SENT');
          $scope.messageIsSent = true;
        })
        .catch(function() {
          FlashService.error('CONTACT_MESSAGE_ERROR');
        });
    };
  }]);
angular.module('instructors')
  .directive('instructorIntroVideoModal', ["$sce", "$window", "PopupService", function($sce, $window, PopupService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'instructors/views/intro-video-modal.html',
      replace: true,
      controller: ["$scope", function($scope) {
        $scope.videoUrl = $sce.trustAsResourceUrl($scope.instructor.introVideo);
      }],
      link: function($scope, $element) {
        $scope.popup = PopupService.get('instructor_intro_video');

        $scope.$watch('popup.visible', function(newValue, oldValue) {
          var frame = $element.find('iframe')[0];

          if (newValue !== oldValue) {
            $window.Froogaloop(frame).api(newValue ? 'play' : 'pause');
          }
        });
      }
    };
  }]);
angular.module('instructors')
  .directive('instructorItem', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'instructors/views/instructor-item.html',
      replace: true,
      scope: {
        instructor: '='
      },
      controller: ["$scope", function($scope) {}]
    };
  });
angular.module('instructors')
  .controller('InstructorsController', ["$scope", "$state", "CategoryService", "InstructorService", function($scope, $state, CategoryService, InstructorService) {
    'use strict';

    $scope.instructors = [];
    $scope.categories = CategoryService.getAllCached();
    $scope.currentCategory = null;
    $scope.instructorSearch = { query: '' };

    $scope.setCurrentCategory = function(categoryId) {
      $scope.currentCategory = CategoryService.getOneCached(categoryId);
    };

    $scope.selectCategory = function(category) {
      if (category) {
        $state.go('instructors.category', { categoryId: category.id, categoryName: category.nameSlug });
      } else {
        $state.go('instructors.all');
      }
    };

    $scope.loadInstructors = function(filters) {
      var requestParams = filters || {};
      requestParams.perPage = 999;

      InstructorService.getAll(requestParams)
        .then(function(instructors) {
          $scope.instructors = instructors;
        });
    };

    $scope.searchInstructors = function() {
      $state.go('instructors.search', { query: $scope.instructorSearch.query });
    };
  }]);
angular.module('instructors')
  .controller('SearchInstructorsController', ["$scope", "$stateParams", function($scope, $stateParams) {
    'use strict';

    $scope.setCurrentCategory();
    $scope.loadInstructors({ query: $stateParams.query });
  }]);
angular.module('legal', ['ui.router'])
  .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    'use strict';

    $urlRouterProvider.when('/legal', '/legal/conditions');

    $stateProvider
      .state('legal', {
        url: '/legal',
        parent: 'common',
        templateUrl: 'legal/views/legal.html'
      })
        .state('legal.conditions', {
          url: '/conditions',
          templateUrl: 'legal/views/legal.conditions.html',
          scrollGroup: 'legal',
          controller: ["$scope", function($scope) {
            $scope.$parent.activeTab = 'conditions';
          }]
        })
        .state('legal.privacy', {
          url: '/privacy',
          templateUrl: 'legal/views/legal.privacy.html',
          scrollGroup: 'legal',
          controller: ["$scope", function($scope) {
            $scope.$parent.activeTab = 'privacy';
          }]
        });
  }]);
angular.module('profile', ['ui.router', 'pascalprecht.translate'])
  .config(["$stateProvider", function($stateProvider) {
    'use strict';
    $stateProvider
      //.state('profile', {
      //  url: '/users/:userId',
      //  templateUrl: 'profile/views/profile.html',
      //  controller: 'ProfileController'
      //})
      .state('dashboard', {
        url: '/dashboard',
        parent: 'common',
        templateUrl: 'profile/views/dashboard.html',
        controller: 'DashboardController',
        data: { private: true },
        resolve: {
          authorization: ["InitializationService", "initialData", function(InitializationService, initialData) {
            return InitializationService.initializePrivate();
          }]
        }
      });
  }]);
angular.module('profile')
  .directive('changeProfileInfo', ["$window", "UserService", "PopupService", function($window, UserService, PopupService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'profile/views/change-profile-info.html',
      controller: ["$scope", function($scope) {
        $scope.imagePreview = null;
        $scope.newImage = null;

        $scope.tempUser = angular.copy($scope.user);

        $scope.submitProfileInfoForm = function(user) {
          $scope.formState = 'waiting';

          UserService.update(user)
            .then(function(updatedUser) {
              $scope.user.name = updatedUser.name;
              $scope.user.twitterUrl = updatedUser.twitterUrl;
              $scope.user.facebookUrl = updatedUser.facebookUrl;
              $scope.user.linkedinUrl = updatedUser.linkedinUrl;
              $scope.user.websiteUrl = updatedUser.websiteUrl;
            })
            .then(function() {
              if ($scope.newImage) {
                return UserService.updateImage($scope.user, $scope.newImage)
                  .then(function(updatedUser) {
                    $scope.user.avatar = updatedUser.avatar;
                  });
              }
            })
            .then(function() {
              $scope.resetDefaults();
              $scope.formState = 'sent';
              PopupService.hide('profile_info');
            })
            .catch(function(errors) {
              $scope.formState = 'error';
              $scope.errors = {};

              angular.forEach(errors, function(messages, key) {
                if (messages && messages.length) {
                  $scope.errors[key] = messages[0];
                }
              });
            })
            .finally(function() {
              $scope.newImage = null;
              $scope.tempUser.currentPassword = '';
            });
        };

        $scope.resetErrors = function() {
          $scope.errors = {};
        };

        $scope.resetDefaults = function() {
          $scope.resetErrors();

          $scope.tempUser = angular.copy($scope.user);

          $scope.tempUser.newPassword = '';
          $scope.tempUser.newPasswordConfirmation = '';
          $scope.tempUser.currentPassword = '';

          $scope.passwordFieldsAreShown = false;
        };
      }]
    };
  }]);
angular.module('profile')
  .controller('DashboardController', ["$scope", "CurrentUserService", "UserService", function($scope, CurrentUserService, UserService) {
    'use strict';

    $scope.user = CurrentUserService.get();
    $scope.recommendedCourses = [];

    //UserService.getRecommendedCourses($scope.user.id)
    //  .then(function(courses) {
    //    $scope.recommendedCourses = courses;
    //  });
  }]);
angular.module('profile')
  .controller('ProfileController', ["$scope", "CurrentUserService", function($scope, CurrentUserService) {
    'use strict';

    $scope.user = CurrentUserService.get();
  }]);
angular.module('ui', []);
angular.module('ui')
  .directive('collapse', function() {
    'use strict';

    return {
      scope: {
        isCollapsed: '=collapse',
        minHeight: '@collapseHeight'
      },
      link: function($scope, element) {
        var initialHeight = element.height();

        $scope.$watch('isCollapsed', function() {
          if ($scope.isCollapsed) {
            element.height($scope.minHeight || 0);
          } else {
            element.height(initialHeight);
          }
        });

        $scope.isCollapsed = true;
      }
    };
  });
angular.module('ui')
  .filter('currencyFormat', ["numberFilter", "$translate", function(numberFilter, $translate) {
    return function(price, fractionSize, currencySymbol) {
      var currencyStr,
        fraction = fractionSize || 0,
        currency = currencySymbol || '€';

      if (!price) {
        currencyStr = $translate.instant('FREE');
      } else {
        currencyStr = currency + numberFilter(price, fraction);
      }

      return currencyStr;
    };
  }]);
angular.module('ui').
  directive('fileChanged', function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function($scope, element, attrs, ngModel) {
        if (!ngModel) {
          return;
        }

        ngModel.$render = angular.noop;

        element.bind('change', function(event) {
          ngModel.$setViewValue(event.target.files[0]);
          $scope.$apply();
        });
      }
    };
  });

angular.module('ui').
  directive('filePreview', ["FileReader", function(FileReader) {
    return {
      restrict: 'A',
      link: function($scope) {
        $scope.$watch('newImage', function(filePreview) {
          if (filePreview && Object.keys(filePreview).length !== 0) {
            FileReader.readAsDataUrl(filePreview).then(function(result) {
              $scope.imagePreview = result;
            });
          }
        });
      }
    };
  }]);
angular.module('ui')
  .factory('FileReader', ["$q", "$window", function($q, $window) {

    if (!$window.FileReader) {
      throw new Error('Browser does not support FileReader');
    }

    function readAsDataUrl(file) {
      var deferred = $q.defer(),
        reader = new $window.FileReader();

      reader.onload = function() {
        deferred.resolve(reader.result);
      };

      reader.onerror = function() {
        deferred.reject(reader.error);
      };

      reader.readAsDataURL(file);

      return deferred.promise;
    }

    return {
      readAsDataUrl: readAsDataUrl
    };
  }]);

angular.module('ui')
  .factory('FlashService', ["$translate", "growl", function($translate, growl) {
    'use strict';

    return {
      success: function(message) {
        growl.success($translate.instant(message));
      },
      error: function(message) {
        growl.error($translate.instant(message));
      },
      warning: function(message) {
        growl.warning($translate.instant(message));
      },
      info: function(message) {
        growl.info($translate.instant(message));
      }
    };
  }]);
angular.module('ui')
  .filter('html', ["$sce", function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }]);
angular.module('ui')
  .directive('onEnter', function() {
    return {
      restrict: 'A',
      scope: {
        onEnterCallback: '&onEnter'
      },
      link: function(scope, element) {
        element.on('keydown', function(event) {
          if (event.which === 13) {
            scope.onEnterCallback();
          }
        });
      }
    };
  });
angular.module('ui')
  .directive('popupAutohideOpener', ["PopupService", "$timeout", function(PopupService, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        var active = false,
          name = $attrs.popupAutohideOpener,
          closingTimer;

        $element.on('click', function() {
          var popup = PopupService.get(name);

          PopupService.show(name);

          if (!active) {
            active = true;

            popup.element.on('mouseleave', startCountdown);
            popup.element.on('mouseenter', stopCountdown);
          }

          $scope.$apply();
        });

        function startCountdown() {
          closingTimer = $timeout(function() {
            PopupService.hide(name);
          }, 2000);
        }

        function stopCountdown() {
          $timeout.cancel(closingTimer);
        }
      }]
    };
  }]);
angular.module('ui')
  .directive('popupCloser', ["PopupService", function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        $element.on('click', function() {
          PopupService.hide($attrs.popupCloser);
          $scope.$apply();
        });
      }]
    };
  }]);
angular.module('ui')
  .directive('popupContainer', ["$document", "PopupService", function($document, PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: ["$scope", "$element", function($scope, $element) {
        $scope.popupContainer = PopupService.getPopupContainer();

        $scope.isPopupVisible = function(name) {
          var popup = PopupService.get(name);

          return popup && popup.visible;
        };

        $element.on('click', function(event) {
          angular.forEach($scope.popupContainer.popups, function(popup) {
            if (!popup.visible) {
              return;
            }

            if (popup.modal) {
              return;
            }

            if (popup.justOpened) {
              popup.justOpened = false;

              return;
            }

            if (contain(popup.element[0], event.target)) {
              return;
            }

            popup.visible = false;
          });

          $scope.$apply();
        });

        $document.on('keydown', function(event) {
          if (event.keyCode === 27) {
            PopupService.hideAll();
            $scope.$apply();
          }
        });
      }]
    };

    function contain(container, element) {
      while (element) {
        if (element === container) {
          return true;
        }

        element = element.parentNode;
      }
    }
  }]);
angular.module('ui')
  .directive('popupModalOpener', ["PopupService", function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        $element.on('click', function() {
          PopupService.show($attrs.popupModalOpener, true);
          $scope.$apply();
        });
      }]
    };
  }]);
angular.module('ui')
  .directive('popupOpener', ["PopupService", function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        $element.on('click', function() {
          PopupService.show($attrs.popupOpener);
          $scope.$apply();
        });
      }]
    };
  }]);
angular.module('ui')
  .service('PopupService', function() {
    'use strict';

    var self = this,
      container = {
        popups: {},
        hasModal: false
      };

    this.getPopupContainer = function() {
      return container;
    };

    this.get = function(name) {
      return container.popups[name];
    };

    this.show = function(name, modal) {
      check(name);

      container.popups[name].visible = true;

      if (modal) {
        container.popups[name].modal = true;
        container.hasModal = true;
      } else {
        container.popups[name].justOpened = true;
      }
    };

    this.hide = function(name) {
      check(name);

      container.popups[name].visible = false;
      container.popups[name].justOpened = false;

      if (container.popups[name].modal) {
        container.popups[name].modal = false;
        container.hasModal = false;
      }
    };

    this.hideAll = function() {
      angular.forEach(container.popups, function(status, name) {
        self.hide(name);
      });
    };

    this.toggle = function(name) {
      check(name);

      if (container.popups[name].visible) {
        self.hide(name);
      } else {
        self.show(name);
      }
    };

    this.createPopup = function(name, element) {
      container.popups[name] = {
        element: element,
        justOpened: false,
        visible: false
      };
    };

    function check(name) {
      if (!container.popups[name]) {
        throw new Error(name + ' popup does not exist!');
      }
    }
  });
angular.module('ui')
  .directive('popupToggler', ["PopupService", function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        $element.on('click', function() {
          PopupService.toggle($attrs.popupToggler);
          $scope.$apply();
        });
      }]
    };
  }]);
angular.module('ui')
  .directive('popupWindow', ["PopupService", function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        PopupService.createPopup($attrs.popupWindow, $element);
      }]
    };
  }]);
angular.module('ui')
  .filter('socialName', function() {
    return function(url) {
      var socialName = url.split('/').slice(-1)[0];

      return socialName.split('?')[0];
    };
  });
angular.module('ui')
  .directive('toggleOnClick', ["$document", function($document) {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        toggleOnClick: '='
      },
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        var body = $document.find('body');

        body.on('click', function() {
          $scope.toggleOnClick = false;
          $scope.$apply();
        });

        $document.on('keydown', function(event) {
          if (event.keyCode === 27) {
            $scope.toggleOnClick = false;
            $scope.$apply();
          }
        });

        $element.on('click', function(event) {
          $scope.toggleOnClick = !$scope.toggleOnClick;
          $scope.$apply();
        });
      }]
    };
  }]);
(function(window) {
  'use strict';

  var app = angular.module('academy', ['ui.router', 'ngSanitize', 'pascalprecht.translate', 'ngBiscuit', 'angular-growl', 'app-templates', 'restangular', 'about', 'auth', 'courses', 'data', 'helper', 'instructors', 'legal', 'profile', 'ui']);

  app.config(["$locationProvider", "$stateProvider", "$urlRouterProvider", "$uiViewScrollProvider", "growlProvider", function($locationProvider, $stateProvider, $urlRouterProvider, $uiViewScrollProvider, growlProvider) {
   // $urlRouterProvider.otherwise('/');
    $urlRouterProvider.otherwise(function($injector){
      $injector.get('$state').transitionTo('home');
      $injector.get('$rootScope').prerenderStatusCode = 404;
    });

    $stateProvider
      .state('common', {
        url: '',
        abstract: true,
        templateUrl: 'academy/views/basic-layout.html',
        data: {},
        resolve: {
          initialData: ["InitializationService", function(InitializationService) {
            return InitializationService.initialize();
          }]
        }
      });



    $stateProvider
      .state('home', {
        url: '/',
        parent: 'common',
        templateUrl: 'academy/views/landing.html',
        controller: 'LandingController'
      })
      .state('pricing', {
        url: '/pricing',
        parent: 'common',
        templateUrl: 'academy/views/pricing.html',
        controller: 'PricingController'
      })
      .state('subscribe', {
        url: '/subscribe?promo',
        parent: 'pricing',
        templateUrl: 'academy/views/subscription.html',
        controller: 'SubscriptionController'
      })
      .state('become-expert', {
        url: '/become-expert',
        parent: 'common',
        templateUrl: 'academy/views/become-expert.html',
        controller: 'BecomeExpertController'
      })
      .state('features', {
        url: '/features',
        parent: 'common',
        templateUrl: 'academy/views/features.html'
      })
      .state('thanks', {
        url: '/thanks',
        parent: 'common',
        templateUrl: 'academy/views/thanks.html'
      })
      .state('expert', {
        url: '/expert',
        parent: 'common',
        resolve: {
          redirect: ["$q", "RedirectService", "LINKS", function($q, RedirectService, LINKS) {
            RedirectService.redirect(LINKS.expertApp);

            return $q.reject();
          }]
        }
      });
    $stateProvider
      .state('december', {
        url: '/decemberactie',
        parent: 'common',
        resolve: {
          redirect: ["$q", "RedirectService", "LINKS", function ($q, RedirectService, LINKS) {
            RedirectService.redirect(LINKS.december);

            return $q.reject();
          }]
        }
      });

    $locationProvider.html5Mode(true);

    growlProvider.globalTimeToLive(3000);
  }]);

  app.value('settings', {
    debug: {
      grid: false
    }
  });

  app.run(["$rootScope", "cookieStore", "$state", "$uiViewScroll", "AuthService", "AccessTokenManager", "PopupService", "RedirectService", "settings", function($rootScope, cookieStore, $state, $uiViewScroll, AuthService, AccessTokenManager, PopupService, RedirectService, settings) {
    settings.debug.grid = cookieStore.get('LndGrid');

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      if (!AuthService.isAuthorizationValid()) {
        RedirectService.reload();
      }

      $rootScope.hasFilledHeader = 'home' !== toState.name;
      PopupService.hideAll();

      if (toState.data.private && !AccessTokenManager.get()) {
        $state.go('login', { back_link: $state.href(toState, toParams) });
        event.preventDefault();
      } else if (toState.data.public && AccessTokenManager.get()) {
        $state.go('dashboard');
        event.preventDefault();
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
      if (!fromState.scrollGroup || fromState.scrollGroup !== toState.scrollGroup) {
        $uiViewScroll(angular.element('body'));
      } else if (toState.scrollTo) {
        $uiViewScroll(angular.element(toState.scrollTo));
      }

      $rootScope.title = 'Studytube Online Trainingen';
    });
  }]);

  window.app = app;
})(window);
angular.module('academy')
  .controller('AcademyController', ["$location", "$scope", "$state", "$window", "AuthService", "CurrentUserService", "FlashService", "RedirectService", "OrderItemService", "SubscriptionService", "ORGANISATIONS_URL", function($location, $scope, $state, $window, AuthService, CurrentUserService, FlashService, RedirectService, OrderItemService, SubscriptionService, ORGANISATIONS_URL) {
    'use strict';

    $scope.organisationsUrl = ORGANISATIONS_URL;

    if ($window.ga) {
      $scope.$on('$viewContentLoaded', function() {
        $window.ga('send', 'pageview', { page: $location.path() });
      });
    }

    $scope.startSubscription = function() {
      if (CurrentUserService.get()) {
        SubscriptionService.buyContentLicence();
      } else {
        $state.go('subscribe');
      }
    };

    $scope.getCurrentUser = function() {
      return CurrentUserService.get();
    };

    $scope.signOut = function() {
      AuthService.logout();

      if ($state.current.data.private) {
        $state.go('home');
      }

      RedirectService.reload();
    };

    $scope.signInAndProceed = function(userData) {
      return AuthService.loginByCredentials(userData.email, userData.password)
        .then(function(user) {
          return AuthService.loginByToken()
            .then(function() {
              return CurrentUserService.initialize(user.userId);
            });
        });
    };

    $scope.registerWindowTap = function(restangularisedUser) {
      $window.tap('transaction', '' + restangularisedUser.id, 1, {}, 'registered', function(data) {
        restangularisedUser.patch({
          tapfiliateTransactionId: data.id,
          tapfiliateId: data.affiliate_id
        });
      });
    };
  }]);
angular.module('academy')
  .controller('BecomeExpertController', ["$scope", "ExpertService", function($scope, ExpertService) {
    'use strict';

    $scope.submitForm = function() {
      $scope.formState = 'waiting';

      ExpertService.becomeExpert({
        name: $scope.name,
        expertise: $scope.expertise,
        email: $scope.email,
        phone: $scope.phone
      })
        .then(function() {
          $scope.formState = 'sent';
        })
        .catch(function(errors) {
          $scope.formState = 'error';
          $scope.errors = {};

          angular.forEach(errors, function(messages, key) {
            if (messages && messages.length) {
              $scope.errors[key] = messages[0];
            }
          });
        });
    };

    $scope.resetErrors = function() {
      $scope.errors = {};
    };
  }]);

(function() {
  'use strict';

  angular.module('academy').config(["$translateProvider", "RestangularProvider", "growlProvider", function($translateProvider, RestangularProvider, growlProvider) {
    RestangularProvider
      .setBaseUrl('https://api.studytube-staging.nl/academy/')
      .setMethodOverriders(['put', 'patch', 'delete']);

    RestangularProvider
      .setDefaultHttpFields({ cache: true });

    $translateProvider.preferredLanguage('nl');

    growlProvider.globalTimeToLive(3000);
  }])
    .constant('ORGANISATIONS_URL', 'https://organisations.studytube-staging.nl/')
    .constant('PLAYER_URL', 'http://academy.studytube-staging.nl/player/courses/{courseId}/topics/{topicId}');

  angular.module('auth')
    .constant('DOMAIN', 'studytube-staging.nl')
    .constant('LINKS', {
      apiResetPassword: 'https://api.studytube-staging.nl/reset-passwords',
      apiAuth: 'https://api.studytube-staging.nl/sessions',
      expertApp: 'https://www.studytube-staging.nl/expert/',
      december: 'https://www.studytube-staging.nl/decemberactie'
    });

  window.INTERCOM_ID = 'r3vnpweg';
})();

angular.module('academy')
  .directive('desktopHeader', ["CategoryService", function(CategoryService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'academy/views/desktop-header.html',
      replace: false,
      controller: ["$scope", function($scope) {
        var categories = CategoryService.getAllCached(),
          middle = Math.floor(categories.length/2);

        $scope.categories = [
          categories.slice(0, middle),
          categories.slice(middle, categories.length)
        ];
      }]
    };
  }]);
angular.module('academy')
  .service('InitializationService', ["$q", "Restangular", "$state", "$window", "AcademyService", "AccessTokenManager", "AuthService", "CategoryService", "CurrentUserService", function($q, Restangular, $state, $window, AcademyService, AccessTokenManager, AuthService, CategoryService, CurrentUserService) {
    'use strict';

    var self = this,
      academyPromise = AcademyService.initialize()
        .then(function(academy) {
          Restangular.setDefaultHeaders({ 'X-Academy-ID': academy.id });
        }),

      dataPromise = academyPromise
        .then(function() {
          return CategoryService.initialize();
        }),

      userPromise = $q.all({
        academy: academyPromise,
        login: AuthService.loginPromise
      })
        .then(function(response) {
          return CurrentUserService.initialize(response.login.userId);
        })
        .then(function(currentUser) {
          $window.Intercom('update', {
            email: currentUser.email,
            name: currentUser.name,
            user_hash: currentUser.intercomHash
            //user_id: currentUser.id
          });
        })
        .catch(function() {
          AuthService.logout();
          self.userPromise = null;

          if ($state.current.data.private) {
            $state.go($state.current.name, {}, {reload: true});
          }
        });

    this.initialize = function() {
      var promises = [dataPromise];

      if (AccessTokenManager.get()) {
        promises.push(userPromise);
        AuthService.loginByToken();
      }

      return $q.all(promises);
    };

    this.initializePrivate = function() {
      AuthService.loginByToken();

      return userPromise;
    };
  }]);
angular.module('academy')
  .controller('LandingController', ["$scope", "CourseService", function($scope, CourseService) {
    'use strict';

    $scope.featuredCourses = [];

    CourseService.getAll({ sort: 'featured', page: 1, perPage: 6 })
      .then(function(courses) {
        $scope.featuredCourses = courses;
      });
  }]);
angular.module('academy')
  .directive('mobileHeader', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'academy/views/mobile-header.html',
      replace: false
    };
  });
angular.module('academy')
  .controller('PricingController', ["$scope", function($scope) {
    'use strict';

    // nothing here for now...
  }]);
angular.module('courses')
  .controller('SubscriptionController', ["$scope", "$state", "$window", "AuthService", "CurrentUserService", "FlashService", "OrderItemService", "SubscriptionService", "RedirectService", "UserService", function($scope, $state, $window, AuthService, CurrentUserService, FlashService, OrderItemService, SubscriptionService, RedirectService, UserService) {
    'use strict';

    $scope.signUpFormIsShown = true;
    $scope.userData = {};
    $scope.errors = {};
    $scope.subscription = SubscriptionService.getSubscriptionDetails($state.params.promo);
    $scope.currentUser = CurrentUserService.get();

    $scope.subscribe = function() {
      if ($scope.currentUser) {
        SubscriptionService.buyContentLicence($scope.subscription.monthAmount);
      } else if ($scope.signUpFormIsShown) {
        $scope.signUpAndSubscribe($scope.userData);
      } else {
        $scope.signInAndSubscribe($scope.userData);
      }
    };

    $scope.signInAndSubscribe = function(user) {
      $scope.signInAndProceed(user).then(function(currentUser) {
        if (currentUser.hasContentLicence) {
          $state.go('dashboard');
        } else {
          SubscriptionService.buyContentLicence($scope.subscription.monthAmount);
        }
      })
        .catch(function() {
          $scope.loginFailed = true;
        });
    };

    $scope.signUpAndSubscribe = function(userData) {

      //we don't need confirmation for purchase page
      userData.passwordConfirmation = userData.password;

      UserService.create(userData)
        .then(function(user) {
          FlashService.success('SUCCESSFULLY_REGISTERED');

          if ($window.tap) {
            $scope.registerWindowTap(user);
          }

          return $scope.signInAndSubscribe(userData);
        })
        .catch(function(errors) {
          $scope.formStatus = 'error';
          $scope.errors = {};

          angular.forEach(errors, function(messages, key) {
            if (messages && messages.length) {
              $scope.errors[key] = messages[0];
            }
          });
        });
    };

    $scope.toggleSignUpForm = function() {
      $scope.signUpFormIsShown = !$scope.signUpFormIsShown;
      $scope.userData = {};
    };

    $scope.cancel = function() {
      $state.go('^');
    };
  }]);
angular.module('academy')
  .service('SubscriptionService', ["FlashService", "RedirectService", "OrderItemService", function(FlashService, RedirectService, OrderItemService) {
    'use strict';

    var subscriptions = {
      'standard': {
        name: 'standard',
        description: 'STANDARD_SUBSCRIPTION_DESCRIPTION',
        price: 'STANDARD_SUBSCRIPTION_PRICE',
        monthAmount: 1
      },
      'eenjaar': {
        name: 'eenjaar',
        description: 'YEAR_PROMO_SUBSCRIPTION_DESCRIPTION',
        price: 'YEAR_PROMO_SUBSCRIPTION_PRICE',
        monthAmount: 12
      },
      'driemaanden': {
        name: 'driemaanden',
        description: 'QUARTER_PROMO_SUBSCRIPTION_DESCRIPTION',
        price: 'QUARTER_PROMO_SUBSCRIPTION_PRICE',
        monthAmount: 3
      }
    };

    this.buyContentLicence = function(monthAmount) {
      var requestParams = {
        licenceType: 'content',
        subscriptionTerm: monthAmount || 1
      };

      return OrderItemService.create(requestParams)
        .then(function(order) {
          RedirectService.redirect(order.paymentUrl);
        })
        .catch(function() {
          FlashService.error('BUY_CONTENT_LICENSE_ERROR');
        });
    };

    this.getSubscriptionDetails = function(name) {
      return subscriptions[name || 'standard'];
    };
  }]);
angular.module('academy').config(["$translateProvider", function($translateProvider) {
  $translateProvider.translations('en', {
    //header-desktop
    ABOUT_US: 'About us',
    FEATURES: 'Features',
    PRICING: 'Pricing',
    FACULTY:'Faculty',
    LIBRARY: 'Library',
    HOME: 'Home',
    SHOW_FULL_TEXT: 'Show full text',
    COURSE_CATEGORIES: 'Course categories',
    HP_BLOCK_TITLE: 'Course categories',
    HP_NAV_ITEM_1: 'All courses',
    HP_NAV_ITEM_2: 'Data & CRM',
    HP_NAV_ITEM_3: 'Health',
    HP_NAV_ITEM_4: 'HR',
    HP_NAV_ITEM_5: 'Internet & organization',
    HP_NAV_ITEM_6: 'Management skills',
    HP_NAV_ITEM_7: 'Oral communication',
    HP_NAV_ITEM_8: 'Office productivity',
    HP_NAV_ITEM_9: 'Online marketing',
    HP_NAV_ITEM_10: 'Personal effectiveness',
    HP_NAV_ITEM_11: 'Project',
    HP_NAV_ITEM_12: 'Sales',
    HP_NAV_ITEM_13: 'Written communication',
    HP_NAV_ITEM_14: 'Social media',
    BECOME_AN_INSTRUCTOR: 'Become an instructor',
    FOR_ORGANIZATIONS: 'For organizations',
    SIGN_IN: 'Sign in',
    SIGN_UP: 'Sign up',
    SIGN_OUT: 'Sign out',
    ACCOUNT: 'Account',
    MY_COURSES: 'My courses',
    MY_DASHBOARD: 'My dashboard',
    PROFILE_SETTINGS: 'Profile settings',
    SWITCH_ACADEMY: 'Switch Academy',
    STUDYTUBE_ACADEMY: 'Studytube academy',
    HVDS_ACADEMY: 'HVDS academy',
    ADMINISTRATION: 'Administration',
    //header-mobile
    NAVIGATION: 'Navigation',
    BROWSE: 'Browse',
    USER_MENU: 'User menu',
    // footer
    PAGES: 'Pages',
    PF_MENU_P1_1: 'Home',
    PF_MENU_P1_2: 'Pricing',
    PF_MENU_P1_3: 'Courses',
    PF_MENU_P1_4: 'Faculty',
    BROWSE_COURSES: 'Browse courses',
    SUPPORT: 'Support',
    PF_MENU_P2_1: 'Terms & conditions',
    PF_MENU_P2_2: 'Terms & conditions #2',
    PF_MENU_P2_3: 'Privacy regulations',
    CONNECT: 'Connect',
    CONTACTS: 'Contact us',
    PRESSDOC: 'Pressdoc',
    VAT: 'VAT',
    KVK: 'KVK',
    //landing page
    LANDING_TITLE: 'Studytube',
    LANDING_TITLE_DESCRIPTION: 'Increase the performance of employees and your business!',
    JOIN_STUDYTUBE: 'Join studytube',
    PRIORITY: 'priority',
    CONTENT_SECTION_TITLE_SECONDARY: 'To provide highest possible online courses',
    LANDING_PITCH_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ullam, cumque ratione amet reprehenderit perspiciatis. Nobis laborum eveniet libero assumenda, maiores adipisci ratione molestiae ipsa architecto tempore minus commodi a.',
    LANDING_PRIORITY_LIST_1: 'Personalized Experience',
    LANDING_PRIORITY_LIST_2: 'Result driven learning',
    LANDING_PRIORITY_LIST_3: 'Courses from top experts only',
    LANDING_PRIORITY_LIST_4: 'Online learning made social and fun',
    LANDING_PRIORITY_LIST_5: 'All courses are created with love',
    FEATURED_COURSES: 'Featured courses',
    BROWSE_ALL: 'Browse all',
    TESTIMONIALS: 'Testimonials',
    STUDYTUBE_IN_MEDIA: 'Studytube in media',
    ADV_SUBSCRIPTION: 'Master hundreds of courses only for <strong>€49</strong> per month.',
    START_SUBSCRIPTION: 'Start subscription',
    //become-expert page
    BECOME_EXPERT_PAGE_TITLE: 'Interested in becoming one of our experts?',
    BECOME_EXPERT_PAGE_DESCRIPTION: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro quaerat nemo odio, tempora molestiae quo vel harum non cupiditate vero! Accusantium a repellendus dolor corrupti. Quisquam debitis consequatur totam culpa.',
    NAME: 'Name',
    EXPERTIZE: 'Expertise',
    EMAIL_ADDRESS: 'Email address',
    PHONE_NUMBER: 'Phone number',
    GET_FREE_BROCHURE: 'Get free brochure',
    PROCESSING: 'Processing...',
    REQUIRED: 'Required',
    EXPERT_BROCHURE_SENT_MESSAGE: 'Thank you for your interest!<br>We will send you our awesome brochure in a short time.',
    //pricing page
    PRICING_TITLE: 'Studytube comes in<br><strong>two flavours!</strong>',
    FLAVOUR: 'Flavour',
    FLAVOUR_TITLE_1: 'All You Can Learn',
    FLAVOUR_TITLE_2: 'Pay Per Course',
    CS_TITLE_STROKED_TEXT_1: 'Access all courses for a small monthly fee',
    CS_TITLE_STROKED_TEXT_2: 'What\'s included',
    CS_TITLE_STROKED_TEXT_3: 'Lifetime access',
    PRICING_PLAN_1: 'With “All you can learn” subscription you will get unlimited access to all of our courses.',
    PRICING_PLAN_2: 'You buy a single course, and get access for the rest of your life.',
    PER_MONTH: 'per month',
    PER_COURSE: 'per course',
    CREATE_FREE_ACCOUNT: 'Create free account',
    PRICING_PLAN_EXTRA: 'More than $20,000 worth of content',
    PRICING_FEATURE_1: 'Learn what you want, when you want, from our entire library.',
    PRICING_FEATURE_2: 'New courses are added to our library weekly - so the value of your membership keeps growing',
    PRICING_FAQ_TITLE_1: 'How many courses can I take?',
    PRICING_FAQ_TITLE_2: 'Can I cancel my subscription at any time?',
    PRICING_FAQ_BODY_1: 'As many as you want! Studytube subscription includes unlimited access to our entire library of courses.',
    PRICING_FAQ_BODY_2: 'Minimum duration of the subscription is a 3 months. After that you can cancel at any time.',
    START_SUBSCRIPTION_NOW: 'Start subscription now',
    //about
    ABOUT_COMPANY: 'About company',
    OUR_VALUES: 'Our values',
    CAREERS: 'Careers',
    COMPANY_TITLE: 'We are here to change the world<br>of <strong>corporate learning!</strong>',
    VALUES_TITLE: 'Driven by <strong>ideals!</strong>',
    CAREERS_TITLE: 'Become one of <strong>us!</strong>',
    CONTACT_TITLE: 'Drop us a <strong>line.</strong>',
    OUR_MISSION: 'Our mission',
    MEET_TEAM: 'Meet the team',
    ABOUT_BLOCK_TITLE_2: 'Over 20',
    ABOUT_BLOCK_TEXT_1: 'Launched from Homam’s dorm room in the University of Maastricht',
    ABOUT_BLOCK_TEXT_2: 'Grown to an exceptional team of more than 20 crazy highly-skilled people',
    ABOUT_BLOCK_TEXT_3: 'Users got smarter with StudyTube so far',
    OUR_MISSION_TEXT: 'StudyTube is committed to bringing the best online learning experience to every member of the goal workforce, to built a place where professionals can learn anything that makes them more productive and successful in their professional career.',
    MEET_TEAM_TEXT: 'Dreamers, Designers, Computer Geeks, E-Learning People... <br>Handful of talented people.',
    VALUES_TITLE_SECONDARY_1: 'Company values',
    VALUES_TITLE_SECONDARY_2: 'Course values',
    COMPANY_VALUES_ITEM_1: 'Empathethic',
    COMPANY_VALUES_ITEM_2: 'Simple',
    COMPANY_VALUES_ITEM_3: 'Smart',
    COMPANY_VALUES_ITEM_4: 'Challenging',
    COMPANY_VALUES_ITEM_5: 'Ambitious',
    COMPANY_VALUES_ITEM_1_DESCRIPTION: 'Distill to the meaningful and balanced.',
    COMPANY_VALUES_ITEM_2_DESCRIPTION: 'Distill to the meaningful and balanced.',
    COMPANY_VALUES_ITEM_3_DESCRIPTION: 'Distill to the meaningful and balanced.',
    COMPANY_VALUES_ITEM_4_DESCRIPTION: 'Distill to the meaningful and balanced.',
    COMPANY_VALUES_ITEM_5_DESCRIPTION: 'Distill to the meaningful and balanced.',
    COURSE_VALUES_ITEM_1: 'Creativity & Fun',
    COURSE_VALUES_ITEM_2: 'Result oriented',
    COURSE_VALUES_ITEM_3: 'Personal',
    COURSE_VALUES_ITEM_1_DESCRIPTION: 'We strive to ensure that each course is fun to follow. It is an online course much more difficult to increase the motivation and maintain than a classroom course. Attention of a student It is very important that your course alternate methods (videos, images, text, questions) that arouse interest in order to reduce the risk of diversion and increase motivation. So Incorporate the theme of your course in videos, tell stories and give many examples you present energetic, enthusiastic and confident.',
    COURSE_VALUES_ITEM_2_DESCRIPTION_1: 'How well your course is also content: really only be a success when students show new behavior. In other words, not only to ensure that students gain new knowledge and insights, but also that they adapt their behavior on this knowledge and that they train skills. You want to prevent students stuck in old habits. Therefore, make sure that you:',
    COURSE_VALUES_ITEM_2_DESCRIPTION_2: '<strong>Sufficient finds connections between theory and practice</strong>',
    COURSE_VALUES_ITEM_2_DESCRIPTION_3: 'Try to give the (theoretical) explanation you give. Much as possible examples and / or practical situations Also try to look for images that illustrate this example well. When issuing an example.',
    COURSE_VALUES_ITEM_2_DESCRIPTION_4: '<strong>Specific enough practical questions.</strong>',
    COURSE_VALUES_ITEM_2_DESCRIPTION_5: 'A question is not meant to hear about anyone, but in order to think about a situation in practice. The student Think of a course on the prevention of conflict in the workplace to a question like: "Jack is a web developer. He has problems with his internet connection. How can he be his supervisor - who is always very busy and would rather not be disturbed - the best approach here about? ".',
    COURSE_VALUES_ITEM_2_DESCRIPTION_6: '<strong>The student shows work on a final product.</strong>',
    COURSE_VALUES_ITEM_2_DESCRIPTION_7: 'The student has not only new knowledge and insights obtained after completion of the course, but he or she also has something tangible in hand to user know into practice immediately. Think of a sales course to making a sales pitch or a course on presentation techniques on a script and presentation slides.',
    COURSE_VALUES_ITEM_3_DESCRIPTION_1: 'Courses that are tailored to the individual delivering the highest results. One of the main features of Study Tube is also the fact that courses \'adaptive\' offer. In other words, when a student question in the course answers wrong - and therefore the part apparently not fully understand - he gets extra content offered to ensure that he or she still comes to the same knowledge as someone who is the same part or directly understands. It is also important that you keep the \'distance\' between you (the expert) and the student as much as possible and avoid as much as possible formal language. In short, so make sure that you:',
    COURSE_VALUES_ITEM_3_DESCRIPTION_2: '<strong>For each topic one or more adaptive paths create.</strong>',
    COURSE_VALUES_ITEM_3_DESCRIPTION_3: 'These are additional learning routes which you repeat the learned knowledge in a different form or simplified explains.',
    COURSE_VALUES_ITEM_3_DESCRIPTION_4: '<strong>Gives feedback on each answer option.</strong>',
    COURSE_VALUES_ITEM_3_DESCRIPTION_5: 'Therefore do you play on the individual development of a student and make sure that he / she can memorize the content.',
    COURSE_VALUES_ITEM_3_DESCRIPTION_6: '<strong>The student appeals to you in the form.</strong>',
    COURSE_VALUES_ITEM_3_DESCRIPTION_7: 'In this way, the student gets a lot more sense that there is little distance between him or her and the expert who teaches the course.',
    COURSE_VALUES_ITEM_3_DESCRIPTION_8: '<strong>Gives examples which connect to the experiences of the student.</strong>',
    COURSE_VALUES_ITEM_3_DESCRIPTION_9: 'Think carefully about exactly who your target audience is and tailor your examples to them. A doctor is of a perception other than a lawyer or a web developer.',
    ALL_POSITIONS: 'All positions',
    APPLY_POSITION: 'Apply for this position',
    CAREERS_TITLE_SECONDARY_1: 'We need new people',
    CAREERS_TITLE_SECONDARY_1_DESCRIPTION: 'StudyTube is committed to bringing the best online learning experience to every member of the goal workforce, to built a place where professionals can learn anything that makes them more productive and successful in their professional career.',
    CONTACT_TITLE_SECONDARY_1: 'We are we',
    CONTACT_TITLE_SECONDARY_1_DESCRIPTION: 'StudyTube HQ are in a nice and cozy penthouse right in the middle of Amsterdam.  We also have a couple offices around the world.',
    //auth
    LOG_IN: 'Log in',
    HAVE_AN_ACCOUNT: 'Already a member?',
    PASSWORD: 'Password',
    PASSWORD_CONFIRMATION: 'Password (confirmation)',
    FORGOT_PASSWORD: 'Forgot password?',
    FORGOT_PASSWORD_2: 'Forgot<br/>your password?',
    LET_ME_IN: 'Let me in',
    INVALID_EMAIL: 'Invalid email...',
    INVALID_PASSWORD: '... or password',
    NOT_HAVE_ACCOUNT: 'Do not have an account yet?',
    USERNAME: 'Username',
    CREATE_ACCOUNT: 'Create an account',
    NEW_USER: 'Are you a new user? Create an account',
    //courses
    COURSES_TITLE: 'Buy all you can learn subscription for <strong>€49</strong> per month!',
    JOIN_STUDYTUBE_NOW: 'Join Studytube now',
    BY_CATEGORY: 'By category',
    BY_CATEGORY_INSTRUCTOR: 'By category',
    BY_CATEGORY_COURSES: 'By category',
    LOAD_MORE_INSTRUCTORS: 'load more',
    LOAD_MORE_COURSES: 'load more',
    FIND_INSTRUCTOR: 'Find an instructor',
    FIND_COURSE: 'Find a course',
    PLAY_VIDEO: 'Play video',
    LIFETIME_ACCESS: 'Lifetime access',
    USERS: 'users',
    BUY_FOR: 'Buy for',
    ADD_COURSE: 'Add',
    COURSE_INSTALLED: 'Installed',
    COURSES_ITEM_TITLE_1: 'Instructors',
    COURSES_ITEM_TITLE_2: 'About',
    COURSES_ITEM_TITLE_3: 'Curriculum',
    COURSES_ITEM_TITLE_4: 'Similar courses',
    COURSE_COMING_SOON: '(Coming soon)',
    PREVIEW: 'preview',
    READ_FULL_TEXT: 'Read full text',
    CONFIRM_PURCHASE: 'Confirm purchase',
    REDEEM_COUPON: 'Redeem a coupon',
    UNLIMITED_ACCESS: 'Unlimited access to all courses',
    TERMINATE_SUBSCRIPTION: 'Your subscription can be terminated monthly',
    INVALID_CODE: 'Invalid coupon code',
    APPLY_CODE: 'Apply code',
    COUPON_ACTIVATED: 'Coupon code successfully activated',
    SUBTOTAL: 'Subtotal',
    TOTAL: 'Total',
    PROCEED: 'Proceed',
    AGREE_TERM_PURCHASING_COURSES: 'Payment will bring you to the 3rd party payment provider. By clicking the proceed you agree to our <a href="/legal/conditions" class="fbc-legal__link" target="_blank">Terms & Conditions</a> on purchasing courses.',
    LOGIN_PLEASE: 'Please login to continue',
    GET_CALLBACK: 'Get a call back',
    QUESTION: 'Question',
    GET_BROCHURE: 'Get brochure',
    COURSE_PREVIEW: 'Watch this free issue',
    PREVIEW_TEXT_1: 'We offer you the topic',
    PREVIEW_TEXT_2: 'from course',
    PREVIEW_TEXT_3: 'for free! Please create an account to continue',
    COURSE_PREVIEW_MOBILE: 'Course preview',
    PREVIEW_TEXT_P1: 'We offer you the topic {{ subject }} from course ',
    PREVIEW_TEXT_P2: '{{ name }} for free! Please create an account to continue',
    //instructors
    INSTRUCTORS_TITLE: 'Meet our faculty',
    ALL_EXPERTS: 'All experts',
    MEMBER_OF: 'Member of',
    INSTRUCTOR_TITLE_SECONDARY_1: 'Publications',
    INSTRUCTOR_TITLE_SECONDARY_2: 'Teaching',
    INSTRUCTOR_TITLE_SECONDARY_3: 'Reference',
    INSTRUCTOR_TITLE_SECONDARY_4: 'Testimonials',
    INSTRUCTOR_TITLE_SECONDARY_5: 'Want a customized learning for your organization',
    SEE_SOURCE: 'See source',
    COMPANY_NAME: 'Company name',
    YOUR_NAME: 'Your name',
    CANNOT_EMPTY: 'Cannot be empty',
    YOUR_ROLE: 'Your role',
    YOUR_PHONE_NUMBER: 'Your phone number',
    YOUR_EMAIL: 'Your email',
    I_WOULD_LIKE: 'I would like...',
    I_WOULD_LIKE_ITEM_1: 'to get customized course for my organization',
    I_WOULD_LIKE_ITEM_2: 'to get a call back',
    I_WOULD_LIKE_ITEM_3: 'to make an appointment',
    I_WOULD_LIKE_ITEM_4: 'to book an offline training',
    I_WOULD_LIKE_ITEM_5: 'something else',
    YOUR_MESSAGE: 'Your message',
    SEND_MESSAGE: 'Send message',
    //profile
    EDIT_PROFILE: 'Edit profile',
    CURRENT_COURSES: 'Current courses',
    RECOMMENDED_COURSES: 'Recommended courses',
    FINISHED_COURSES: 'Finished courses',
    NO_COURSES_YET: 'You have no courses yet',
    GO_LIBRARY: 'Go to library',
    PROFILE_AVATAR_DESCRIPTION: 'Avatar should be a square image at minimum 300 x 300 px.',
    CHANGE_IMAGE: 'Change image',
    NEW_PASSWORD: 'New password',
    CONFIRM_PASSWORD: 'Confirm new password',
    CONFIRM_PASSWORD_2: 'Confirm password',
    DISCARD: 'Discard',
    SAVE: 'Save',
    CONTACT_MESSAGE_SENT: 'Message has been sent! Thank you!',
    CONTACT_MESSAGE_ERROR: 'Error occurred! Please contact us to solve this.',
    FREE: 'Free',
    LEGAL_ITEM_1: 'Terms and conditions',
    LEGAL_ITEM_2: 'Privacy regulations',
    CHANGE_PASSWORD: 'Change password',
    CURRENT_PASSWORD: 'Current password',
    INVALID_URL: 'Url is not valid',
    //features page
    FEATURES_TITLE: 'What makes us<br><strong>Unique?</strong>',
    FEATURES_SECONDARY_TITLE_1: 'Recognized top experts',
    FEATURES_SECONDARY_TITLE_2: 'Practical and result-oriented courses',
    SEE_ALL_EXPERTS: 'See all experts',
    FEATURES_SECONDARY_TITLE_1_DISCRIPTION: 'Studytube only works with recognised experts in their fields. They are selected on the basis of their field of expertise, experience, reputation and publications.',
    //flash messages
    ALREADY_SUBSCRIBED: 'You already have a subscription',
    BUY_CONTENT_LICENSE_ERROR: 'An error occurred, please try again later.',
    ADD_COURSE_ERROR: 'An error occurred, please try again later.',
    COURSE_NOT_AVAILABLE_ERROR: 'Course is not available now. Please contact us to solve this.',
    CALLBACK_REQUEST_SENT: 'Callback request sent',
    BROCHURE_REQUEST_SENT: 'Brochure request was successfully sent',
    RESET_PASSWORD_EMAIL_SENT: 'Link was sent to your e-mail',
    PASSWORD_RESTORED_SUCCESSFULLY : 'Your restored password succsfully',
    SUCCESSFULLY_REGISTERED: 'You have been successfully registered',
    //reset password form
    SEND_RESET_LINK: 'Send reset link',
    //confirm password form
    CONFIRM_NEW_PASSWORD: 'Confirm',
    //subscriptions
    STANDARD_SUBSCRIPTION_DESCRIPTION: 'Your subscription can be terminated monthly.',
    STANDARD_SUBSCRIPTION_PRICE: '€49 p/m',
    QUARTER_PROMO_SUBSCRIPTION_DESCRIPTION: 'Payment is per quarter with a discount of 20%',
    QUARTER_PROMO_SUBSCRIPTION_PRICE: '€39 p/m',
    YEAR_PROMO_SUBSCRIPTION_DESCRIPTION: 'Payment is per year with a discount of 41%',
    YEAR_PROMO_SUBSCRIPTION_PRICE: '€29 p/m',
    TIME_GREAT: 'Great job! You already spent',
    TIME_MIN: 'minutes',
    TIME_DES_P1: 'in training this week.',
    TIME_DES_P2: 'Keep up the good work!',
    LET_STARTED: 'Let\'s get started!'
  });
}]);
angular.module('academy').config(["$translateProvider", function($translateProvider) {
  $translateProvider.translations('nl', {
    //header-desktop
    ABOUT_US: 'Over ons',
    FEATURES: 'Functionaliteiten',
    PRICING: 'Prijzen',
    FACULTY:'Experts',
    LIBRARY: 'Trainingsaanbod',
    HOME: 'Home',
    SHOW_FULL_TEXT: 'Laat alles zien',
    COURSE_CATEGORIES: 'Trainingen per vakgebied',
    HP_BLOCK_TITLE: 'Trainingen per vakgebied',
    HP_NAV_ITEM_1: 'Alle trainingen',
    HP_NAV_ITEM_2: 'Data & CRM',
    HP_NAV_ITEM_3: 'Gezondheid',
    HP_NAV_ITEM_4: 'HR',
    HP_NAV_ITEM_5: 'Internet & organizatie',
    HP_NAV_ITEM_6: 'Management vaardigheden',
    HP_NAV_ITEM_7: 'Gesproken communicatie',
    HP_NAV_ITEM_8: 'Office productiviteit',
    HP_NAV_ITEM_9: 'Online marketing',
    HP_NAV_ITEM_10: 'Persoonlijke effectiviteit',
    HP_NAV_ITEM_11: 'Project management',
    HP_NAV_ITEM_12: 'Verkoop',
    HP_NAV_ITEM_13: 'Geschreven communicatie',
    HP_NAV_ITEM_14: 'Sociale media',
    BECOME_AN_INSTRUCTOR: 'Word Studytube trainer',
    FOR_ORGANIZATIONS: 'Voor werkgevers',
    SIGN_IN: 'Log in',
    SIGN_UP: 'Aanmelden',
    SIGN_OUT: 'Log uit',
    ACCOUNT: 'Mijn account',
    MY_COURSES: 'Mijn trainingen',
    MY_DASHBOARD: 'Mijn trainingen',
    PROFILE_SETTINGS: 'Profiel instellingen',
    SWITCH_ACADEMY: 'Wijzig Academie',
    STUDYTUBE_ACADEMY: 'Studytube academy',
    HVDS_ACADEMY: 'HVDS academy',
    ADMINISTRATION: 'Administratie',
    //header-mobile
    NAVIGATION: 'Navigatie',
    BROWSE: 'Ontdek trainingen',
    USER_MENU: 'User menu',
    // footer
    PAGES: 'Pagina\'s',
    PF_MENU_P1_1: 'Home',
    PF_MENU_P1_2: 'Prijzen',
    PF_MENU_P1_3: 'Trainingen',
    PF_MENU_P1_4: 'Experts',
    BROWSE_COURSES: 'Ontdek trainingen',
    SUPPORT: 'Support',
    PF_MENU_P2_1: 'Algemene voorwaarden',
    PF_MENU_P2_2: 'Algemene voorwaarden',
    PF_MENU_P2_3: 'Privacyverklaring',
    CONNECT: 'Connect',
    CONTACTS: 'Contact',
    PRESSDOC: 'Perskit',
    VAT: 'BTW',
    KVK: 'KVK',
    //landing page
    LANDING_TITLE: 'Leer praktische vaardigheden online.',
    LANDING_TITLE_DESCRIPTION: 'Online trainingen gegeven door Top Experts.',
    JOIN_STUDYTUBE: 'Gratis aanmelden',
    PRIORITY: 'Onze missie',
    CONTENT_SECTION_TITLE_SECONDARY: 'Online trainingen met het beste resultaat.',
    LANDING_PITCH_TEXT: 'Een online training heeft pas waarde als jouw prestaties aantoonbaar verbeterd zijn. Het is daarom ook zaak om zowel kennis, inzicht en vaardigheden te trainen die je blijft toepassen in de praktijk. Volgens een studie van IBM zijn mensen die dergelijke competentiegerichte online cursussen volgen in staat om hun productiviteit met 50% te verhogen.',
    LANDING_PRIORITY_LIST_1: 'Erkende topexperts',
    LANDING_PRIORITY_LIST_2: 'Persoonlijke leerroute',
    LANDING_PRIORITY_LIST_3: 'Creativiteit & fun',
    LANDING_PRIORITY_LIST_4: 'Intuitief design',
    LANDING_PRIORITY_LIST_5: 'Trainen van hard skills: Werken aan een eindproduct',
    FEATURED_COURSES: 'Trainingen',
    BROWSE_ALL: 'Ontdek alle trainingen',
    TESTIMONIALS: 'Aanbevelingen',
    STUDYTUBE_IN_MEDIA: 'Studytube in de media',
    ADV_SUBSCRIPTION: 'Onbeperkt toegang tot alle trainingen voor slechts <strong>€49</strong> per maand',
    START_SUBSCRIPTION: 'Neem een abonnement',
    //become-expert page
    BECOME_EXPERT_PAGE_TITLE: 'Heb je interesse om expert bij ons te worden?',
    BECOME_EXPERT_PAGE_DESCRIPTION: 'Ben je een erkend expert binnen een bepaald vakgebied en zie je mogelijkheden om samen met ons een relevante, unieke training te realiseren? Vraag dan kosteloos en geheel vrijblijvend een brochure aan voor meer informatie. Hierin lees je onder meer over onze productiemethodologie en - last but not least - het verdienmodel.',
    NAME: 'Naam',
    EXPERTIZE: 'Vakgebied',
    EMAIL_ADDRESS: 'E-mailadres',
    PHONE_NUMBER: 'Telefoonnummer',
    GET_FREE_BROCHURE: 'Ontvang een gratis brochure',
    PROCESSING: 'Momentje...',
    REQUIRED: 'Verplicht',
    EXPERT_BROCHURE_SENT_MESSAGE: 'Dank je voor je interesse! We zullen je onze brochure zo snel mogelijk toesturen!',
    //pricing page
    PRICING_TITLE: 'Studytube komt in <br><strong>twee smaken!</strong>',
    FLAVOUR: 'Smaak',
    FLAVOUR_TITLE_1: 'All You can Learn',
    FLAVOUR_TITLE_2: 'Betaal per cursus',
    CS_TITLE_STROKED_TEXT_1: 'Toegang tot alle cursussen voor een kleine maandelijkse bijdrage',
    CS_TITLE_STROKED_TEXT_2: 'Inclusief:',
    CS_TITLE_STROKED_TEXT_3: 'Levenslang toegang',
    PRICING_PLAN_1: 'Met "All You Can Learn" krijg je ongelimiteerd toegang tot al onze trainingen',
    PRICING_PLAN_2: 'Krijg voor een eenmalige vergoeding levenslang toegang tot de trainingen van jouw keuze',
    PER_MONTH: 'per maand',
    PER_COURSE: 'per training',
    CREATE_FREE_ACCOUNT: 'Kosteloos inschrijven',
    PRICING_PLAN_EXTRA: 'Totale waarde: meer dan €20.000',
    PRICING_FEATURE_1: 'Leer alles wat je wilt, wanneer je maar wilt',
    PRICING_FEATURE_2: 'Wekelijks nieuwe trainingen: een continue stijging van de waarde van je abonnement',
    PRICING_FAQ_TITLE_1: 'Hoeveel trainingen kan ik volgen?',
    PRICING_FAQ_TITLE_2: 'Kan ik op ieder moment mijn abonnement opzeggen?',
    PRICING_FAQ_BODY_1: 'Zoveel je maar wilt! Een Studytube-abonnement houdt in dat je ongelimiteerd toegang krijgt tot al onze trainingen',
    PRICING_FAQ_BODY_2: 'Een abonnement duurt minimaal 3 maanden, daarna kun je op ieder moment opzeggen',
    START_SUBSCRIPTION_NOW: 'Neem een abonnement',
    //about
    ABOUT_COMPANY: 'Over Studytube',
    OUR_VALUES: 'Waarden',
    CAREERS: 'Werken bij',
    COMPANY_TITLE: 'Klaar om de wereld van <strong>zakelijke trainingen</strong> <br>drastisch te veranderen',
    VALUES_TITLE: 'Gedreven door <strong>idealen!</strong>',
    CAREERS_TITLE: 'Word een van <strong>ons!</strong>',
    CONTACT_TITLE: 'We horen graag van je.',
    OUR_MISSION: 'Onze missie',
    MEET_TEAM: 'Ons team',
    ABOUT_BLOCK_TITLE_2: 'Meer dan 20',
    ABOUT_BLOCK_TEXT_1: 'Opgericht vanuit de studentenkamer van Homam aan de Universiteit van Maastricht',
    ABOUT_BLOCK_TEXT_2: 'Gegroeid naar een exceptioneel team van meer dan 20 zeer vaardige mensen',
    ABOUT_BLOCK_TEXT_3: 'Gebruikers hebben zichzelf met Studytube verrijkt',
    OUR_MISSION_TEXT: 'Het is ons doel om de best mogelijke online leerevaring te realiseren voor ieder lid van de werkvloer, om een plek te bouwen waar professionals alles kunnen leren om hun productiviteit te verhogen en meer succes te hebben in hun carriere',
    MEET_TEAM_TEXT: 'Dromers, ontwerpers, computer nerds, e-learning specialisten... <br>Een handvol getalenteerde mensen.',
    VALUES_TITLE_SECONDARY_1: 'Waarden',
    VALUES_TITLE_SECONDARY_2: 'Kernwaarden',
    COMPANY_VALUES_ITEM_1: 'Empathisch',
    COMPANY_VALUES_ITEM_2: 'Eenvoudig',
    COMPANY_VALUES_ITEM_3: 'Slim',
    COMPANY_VALUES_ITEM_4: 'Uitdagend',
    COMPANY_VALUES_ITEM_5: 'Ambitieus',
    COMPANY_VALUES_ITEM_1_DESCRIPTION: 'Om succesvol te kunnen zijn moet je je erg goed kunnen inleven in de gedachtes en gevoelens van de cursisten.',
    COMPANY_VALUES_ITEM_2_DESCRIPTION: 'Wij zijn continu op zoek naar manieren om ons platform en onze methodes nog eenvoudiger te maken dan ze al zijn',
    COMPANY_VALUES_ITEM_3_DESCRIPTION: 'Er zijn altijd zaken die beter, sneller of doelmatiger kunnen. Wij proberen dan ook altijd om out-of-the-box te denken en op die manier te innoveren',
    COMPANY_VALUES_ITEM_4_DESCRIPTION: 'Geen uitdaging is ons te ver en wij houden erg van het zoeken naar oplossingen die voor anderen als "onmogelijk" gezien worden',
    COMPANY_VALUES_ITEM_5_DESCRIPTION: 'Wij streven ernaar om een aardbeving te veroorzaken in de wereld van zakelijke trainingen.',
    COURSE_VALUES_ITEM_1: 'CREATIVITEIT & FUN',
    COURSE_VALUES_ITEM_2: 'RESULTAATGERICHT',
    COURSE_VALUES_ITEM_3: 'PERSOONLIJK',
    COURSE_VALUES_ITEM_1_DESCRIPTION: 'Een goede online training moet leuk zijn om te volgen. Het is bij een online cursus veel lastiger om de motivatie te verhogen en de aandacht vast te houden dan bij een klassikale cursus. Daarom bevat iedere cursus afwisselende werkvormen (video\'s, afbeeldingen, tekst, vragen) die interesse wekken om zo het risico op afleiding te verminderen en de motivatie te verhogen. Ook worden er diverse verhalen verteld en veel voorbeelden gegeven.',
    COURSE_VALUES_ITEM_2_DESCRIPTION_1: 'Een training is pas echt een succes zodra cursisten nieuw gedrag laten zien. Met andere woorden: cursisten dienen niet alleen nieuwe kennis en inzichten te verkrijgen, maar dienen ook hun vaardigheden te trainen en hun gedrag op deze kennis en inzichten aan te passen. Er moet dus voorkomen worden dat cursisten blijven hangen in oude gewoontes. Iedere training bevat dan ook voldoende verbanden tussen theorie en praktijk, vele praktijkgerichte vragen en opdrachten en laat de cursist waar mogelijk werken aan een eindproduct.',
    COURSE_VALUES_ITEM_2_DESCRIPTION_2: '',
    COURSE_VALUES_ITEM_2_DESCRIPTION_3: '',
    COURSE_VALUES_ITEM_2_DESCRIPTION_4: '',
    COURSE_VALUES_ITEM_2_DESCRIPTION_5: '',
    COURSE_VALUES_ITEM_2_DESCRIPTION_6: '',
    COURSE_VALUES_ITEM_2_DESCRIPTION_7: '',
    COURSE_VALUES_ITEM_3_DESCRIPTION_1: 'Trainingen die zijn toegespitst op het individu leveren de hoogste resultaten op. Alle traingen worden dan ook adaptief aangeboden: zodra je een vraag in de training fout beantwoordt krijgt je extra content - zoals een video, tekst of een extra vraag - aangeboden om ervoor te zorgen dat je alsnog op hetzelfde kennisniveau komt als iemand die hetzelfde onderdeel wel direct begrijpt. Daarnaast wordt bij iedere vraag voldoende feedback gegeven.',
    COURSE_VALUES_ITEM_3_DESCRIPTION_2: '',
    COURSE_VALUES_ITEM_3_DESCRIPTION_3: '',
    COURSE_VALUES_ITEM_3_DESCRIPTION_4: '',
    COURSE_VALUES_ITEM_3_DESCRIPTION_5: '',
    COURSE_VALUES_ITEM_3_DESCRIPTION_6: '',
    COURSE_VALUES_ITEM_3_DESCRIPTION_7: '',
    COURSE_VALUES_ITEM_3_DESCRIPTION_8: '',
    COURSE_VALUES_ITEM_3_DESCRIPTION_9: '',
    ALL_POSITIONS: 'Alle mogelijkheden',
    APPLY_POSITION: 'Solliciteer op deze functie!',
    CAREERS_TITLE_SECONDARY_1: 'Wij zijn op zoek naar versterking!',
    CAREERS_TITLE_SECONDARY_1_DESCRIPTION: 'Het is ons doel om de best mogelijke online leerevaring te realiseren voor ieder lid van de werkvloer, om een plek te bouwen waar professionals alles kunnen leren om hun productiviteit te verhogen en meer succes te hebben in hun carriere',
    CONTACT_TITLE_SECONDARY_1: 'Onze vestiging',
    CONTACT_TITLE_SECONDARY_1_DESCRIPTION: 'Het Studytube HQ is gevestigd in een penthouse in hartje Amsterdam. Daarnaast hebben wij een aantal vestigingen in het buitenland',
    //auth
    LOG_IN: 'Log in',
    HAVE_AN_ACCOUNT: 'Heb je al een account?',
    PASSWORD: 'Wachtwoord',
    PASSWORD_CONFIRMATION: 'Wachtwoord (bevestiging)',
    FORGOT_PASSWORD: 'Wachtwoord vergeten?',
    FORGOT_PASSWORD_2: 'Wachtwoord<br/>vergeten?',
    LET_ME_IN: 'Inloggen',
    INVALID_EMAIL: 'Ongeldig email...',
    INVALID_PASSWORD: '... of wachtwoord',
    NOT_HAVE_ACCOUNT: 'Nog geen account? Registreer nu je gratis account!',
    USERNAME: 'Gebruikersnaam',
    CREATE_ACCOUNT: 'Gratis aanmelden',
    NEW_USER: 'Heb je nog geen account? Maak dan een account aan om verder te gaan',
    //courses
    COURSES_TITLE: 'Onbeperkt toegang tot alle trainingen voor slechts <strong>€49</strong> per maand!',
    JOIN_STUDYTUBE_NOW: 'Neem een abonnement',
    BY_CATEGORY_INSTRUCTOR: 'Experts per vakgebied',
    BY_CATEGORY_COURSES: 'Trainingen per vakgebied',
    LOAD_MORE_INSTRUCTORS: 'Laad meer experts',
    LOAD_MORE_COURSES: 'Laad meer trainingen',
    FIND_INSTRUCTOR: 'Vind een expert',
    FIND_COURSE: 'Vind een training',
    PLAY_VIDEO: 'Speel af',
    LIFETIME_ACCESS: 'Levenslang toegang',
    USERS: 'gebruikers',
    BUY_FOR: 'Koop voor',
    ADD_COURSE: 'Voeg toe',
    COURSE_INSTALLED: 'Toegevoegd',
    COURSES_ITEM_TITLE_1: 'Expert(s)',
    COURSES_ITEM_TITLE_2: 'Over',
    COURSES_ITEM_TITLE_3: 'Inhoud',
    COURSES_ITEM_TITLE_4: 'Vergelijkbare trainingen',
    COURSE_COMING_SOON: '(Binnenkort)',
    PREVIEW: 'Preview',
    READ_FULL_TEXT: 'Lees volledige tekst',
    CONFIRM_PURCHASE: 'Bevestig aankoop',
    REDEEM_COUPON: 'Voer een kortingscode in',
    UNLIMITED_ACCESS: 'Onbeperkt toegang tot alle trainingen voor',
    TERMINATE_SUBSCRIPTION: 'Je abonnement kan maandelijks opgezegd worden',
    INVALID_CODE: 'Ongeldige kortingscode',
    APPLY_CODE: 'Pas kortingscode toe',
    COUPON_ACTIVATED: 'kortingscode succesvol toegepast',
    SUBTOTAL: 'Prijs exclusief BTW',
    TOTAL: 'Totaal',
    PROCEED: 'Afrekenen',
    AGREE_TERM_PURCHASING_COURSES: 'Door op Afrekenen te klikken ga je akkoord met de <a href="/legal/conditions" class="fbc-legal__link" target="_blank">Algemene Voorwaarden</a>.',
    LOGIN_PLEASE: 'Log in om de verder te gaan',
    GET_CALLBACK: 'Bel mij voor advies',
    QUESTION: 'Vraag',
    GET_BROCHURE: 'Ontvang de brochure',
    COURSE_PREVIEW: 'Bekijk dit gratis onderwerp',
    PREVIEW_TEXT_1: 'Je ontvangt gratis het onderwerp',
    PREVIEW_TEXT_2: 'van de training',
    PREVIEW_TEXT_3: 'Maak een account aan of log in om meteen toegang te krijgen tot dit gratis onderwerp.',
    PREVIEW_TEXT_P1: 'Je ontvangt gratis het onderwerp {{ subject }} van de training ',
    PREVIEW_TEXT_P2: '{{ name }}. Maak een account aan of log in om meteen toegang te krijgen tot dit gratis onderwerp.',
    COURSE_PREVIEW_MOBILE: 'Bekijk dit<br/>gratis onderwerp',
    //instructors
    INSTRUCTORS_TITLE: 'Maak kennis met onze experts',
    ALL_EXPERTS: 'Alle experts',
    MEMBER_OF: 'Lid van',
    INSTRUCTOR_TITLE_SECONDARY_1: 'Publicaties',
    INSTRUCTOR_TITLE_SECONDARY_2: 'Trainingen',
    INSTRUCTOR_TITLE_SECONDARY_3: 'Referenties',
    INSTRUCTOR_TITLE_SECONDARY_4: 'Aanbevelingen',
    INSTRUCTOR_TITLE_SECONDARY_5: 'Incompany trainingen',
    SEE_SOURCE: 'Zie bron',
    COMPANY_NAME: 'Bedrijfsnaam',
    YOUR_NAME: 'Naam',
    CANNOT_EMPTY: 'Alsjeblieft invullen',
    YOUR_ROLE: 'Functie',
    YOUR_PHONE_NUMBER: 'Telefoonnummer',
    YOUR_EMAIL: 'E-mail',
    I_WOULD_LIKE: 'Ik wil graag...',
    I_WOULD_LIKE_ITEM_1: 'een incompany training voor mijn bedrijf boeken',
    I_WOULD_LIKE_ITEM_2: 'teruggebeld worden',
    I_WOULD_LIKE_ITEM_3: 'een afspraak maken',
    I_WOULD_LIKE_ITEM_4: 'een klassikale training boeken',
    I_WOULD_LIKE_ITEM_5: 'voor iets anders contact opnemen',
    YOUR_MESSAGE: 'Jouw bericht',
    SEND_MESSAGE: 'Verstuur bericht',
    //profile
    EDIT_PROFILE: 'Pas profiel aan',
    CURRENT_COURSES: 'Huidige trainingen',
    FINISHED_COURSES: 'Afgeronde trainingen',
    RECOMMENDED_COURSES: 'Aanbevolen trainingen',
    NO_COURSES_YET: 'Je hebt nog geen trainingen',
    GO_LIBRARY: 'Ga naar trainingsaanbod',
    PROFILE_AVATAR_DESCRIPTION: 'Afbeelding moet minimaal 300x300 px groot zijn',
    CHANGE_IMAGE: 'Wijzig afbeelding',
    NEW_PASSWORD: 'Nieuw wachtwoord',
    CONFIRM_PASSWORD: 'Bevestig nieuw wachtwoord',
    CONFIRM_PASSWORD_2: 'Bevestig wachtwoord',
    DISCARD: 'Negeren',
    SAVE: 'Opslaan',
    CONTACT_MESSAGE_SENT: 'Bericht is verstuurd. Dank je!',
    FREE: 'Gratis',
    LEGAL_ITEM_1: 'Algemene voorwaarden',
    LEGAL_ITEM_2: 'Privacyverklaring',
    CHANGE_PASSWORD: 'Wijzig wachtwoord',
    CURRENT_PASSWORD: 'Huidig wachtwoord',
    INVALID_URL: 'Url is niet geldig',
    //features page
    FEATURES_TITLE: 'Wat maakt Studytube zo <br><strong>uniek</strong>',
    FEATURES_SECONDARY_TITLE_1: 'Erkende topexperts',
    FEATURES_SECONDARY_TITLE_2: 'Praktische & resultaatgerichte trainingen',
    SEE_ALL_EXPERTS: 'Bekijk alle experts',
    FEATURES_SECONDARY_TITLE_1_DISCRIPTION: 'Studytube werkt enkel samen met erkende experts binnen een specifiek zakelijk vakgebied. Zij worden geselecteerd op basis van hun expertisegebied, ervaring, bekendheid en publicaties.',
    //flash messages
    ALREADY_SUBSCRIBED: 'Je hebt al een abonnement',
    BUY_CONTENT_LICENSE_ERROR: 'Er is iets mis gegaan en je hebt geen abonnement aangeschaft. Probeer het nogmaals.',
    ADD_COURSE_ERROR: 'Er is iets mis gegaan en je hebt geen training toegevoegd. Probeer het nogmaals.',
    COURSE_NOT_AVAILABLE_ERROR: 'De training is niet beschikbaar op het moment. Neem contact met ons op.',
    CALLBACK_REQUEST_SENT: 'Terugbelverzoek werd succesvol verstuurd',
    BROCHURE_REQUEST_SENT: 'Brochure aanvraag werd succesvol verstuurd',
    RESET_PASSWORD_EMAIL_SENT: 'Je hebt een mail ontvangen om je wachtwoord te wijzigen',
    PASSWORD_RESTORED_SUCCESSFULLY : 'Je wachtwoord is succesvol gewijzigd',
    SUCCESSFULLY_REGISTERED: 'You have been successfully registered',
    //reset password form
    SEND_RESET_LINK: 'Stuur me een nieuw wachtwoord',
    //confirm password form
    CONFIRM_NEW_PASSWORD: 'Bevestig',
    //subscriptions
    STANDARD_SUBSCRIPTION_DESCRIPTION: 'Betaling is per maand met een minimale looptijd van 3 maanden.',
    STANDARD_SUBSCRIPTION_PRICE: '€49 p/m',
    QUARTER_PROMO_SUBSCRIPTION_DESCRIPTION: 'Betaling is vooraf voor 3 maanden. Jouw korting bedraagt 20%!',
    QUARTER_PROMO_SUBSCRIPTION_PRICE: '€39 p/m',
    YEAR_PROMO_SUBSCRIPTION_DESCRIPTION: 'Betaling is vooraf voor 1 jaar. Jouw korting bedraagt 41%!',
    YEAR_PROMO_SUBSCRIPTION_PRICE: '€29 p/m',
    TIME_GREAT: 'Heel goed, je hebt al',
    TIME_MIN: 'minuten',
    TIME_DES_P1: 'getraind deze week.',
    TIME_DES_P2: 'Ga zo door!',
    LET_STARTED: 'Laten we van start gaan!'
  });
}]);

angular.module('app-templates', ['about/views/about.html', 'about/views/careers.career1.html', 'about/views/careers.career2.html', 'about/views/contact.accra.html', 'about/views/contact.amsterdam.html', 'about/views/contact.kharkiv.html', 'about/views/content-careers.html', 'about/views/content-company.html', 'about/views/content-contact.html', 'about/views/content-values.html', 'about/views/header-careers.html', 'about/views/header-company.html', 'about/views/header-contact.html', 'about/views/header-values.html', 'academy/views/basic-layout.html', 'academy/views/become-expert.html', 'academy/views/desktop-header.html', 'academy/views/features.html', 'academy/views/footer.html', 'academy/views/landing.html', 'academy/views/mobile-header.html', 'academy/views/pricing.html', 'academy/views/subscription.html', 'academy/views/thanks.html', 'auth/views/confirm-password.html', 'auth/views/login-modal.html', 'auth/views/login-page.html', 'auth/views/reset-password.html', 'auth/views/signup-modal.html', 'auth/views/signup-page.html', 'courses/views/buy-course.html', 'courses/views/course-item.html', 'courses/views/course-preview.html', 'courses/views/course.html', 'courses/views/courses.html', 'courses/views/get-brochure.html', 'courses/views/get-callback.html', 'courses/views/intro-video-modal.html', 'courses/views/list.html', 'instructors/views/instructor-item.html', 'instructors/views/instructor.html', 'instructors/views/instructors.html', 'instructors/views/intro-video-modal.html', 'instructors/views/list.html', 'legal/views/legal.conditions.html', 'legal/views/legal.html', 'legal/views/legal.privacy.html', 'profile/views/change-profile-info.html', 'profile/views/dashboard.html', 'profile/views/profile.html']);

angular.module("about/views/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/about.html",
    "<main class=\"page-content\">\n" +
    "  <article>\n" +
    "    <div ui-view=\"header\"></div>\n" +
    "\n" +
    "    <div class=\"content-section content-section--half-top content-section--contrast\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <aside class=\"nav-tabs\">\n" +
    "              <div class=\"l-stacked\">\n" +
    "                <div class=\"grid\">\n" +
    "                  <div class=\"grid__item p4--one-half p8--one-quarter\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <a ui-sref=\"about.company\" class=\"nav-tabs__item\" ng-class=\"{'nav-tabs__item--active': activeTab == 'company'}\" translate=\"ABOUT_COMPANY\">About company</a>\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p4--one-half p8--one-quarter\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <a ui-sref=\"about.values\" class=\"nav-tabs__item\" ng-class=\"{'nav-tabs__item--active': activeTab == 'values'}\" translate=\"OUR_VALUES\">Our values</a>\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p4--one-half p8--one-quarter\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <a ui-sref=\"about.careers\" class=\"nav-tabs__item\" ng-class=\"{'nav-tabs__item--active': activeTab == 'careers'}\" translate=\"CAREERS\">Careers</a>\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p4--one-half p8--one-quarter\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <a ui-sref=\"about.contact\" class=\"nav-tabs__item\" ng-class=\"{'nav-tabs__item--active': activeTab == 'contact'}\" translate=\"CONTACTS\">Contact us</a>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </aside>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ui-view=\"content\"></div>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-list-inline is-center-aligned\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"title-tertiary content-section__title-secondary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                  Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <button class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "  </article>\n" +
    "</main>");
}]);

angular.module("about/views/careers.career1.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/careers.career1.html",
    "<div class=\"l-block-large\">\n" +
    "  <h1 class=\"title-secondary content-section__title-primary\">Junior Commercieel medewerker</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"l-block-large\">\n" +
    "  <div class=\"content-formatting\">\n" +
    "    <p>Je kent Studytube waarschijnlijk van onze online tentamentrainingen. We zijn nu de business-to-business markt aan het veroveren en daarvoor hebben we een junior sales team nodig! We hebben in September een online leerplatform gelanceerd met hoogwaardige online trainingen op allerlei vakgebieden. Van timemanagement tot debatteren, van PRINCE2 tot snellezen en van inspirerend leiding geven tot beïnvloeden. We zijn het ‘Netflix voor online bedrijfstrainingen’ en ons doel is zoveel mogelijk professionals met Studytube te laten groeien, zowel zakelijk als persoonlijk. Voor meer informatie <a href=\"https://organisations.studytube.nl/\">organisations.studytube.nl</a></p>\n" +
    "\n" +
    "    <h1>Je werkzaamheden</h1>\n" +
    "    <p>De eerste zes maanden bel je zoveel mogelijk leads om hen te enthousiasmeren en een afspraak te maken voor een online demonstratie. Tijdens deze gesprekken probeer je het bedrijf zo goed mogelijk te kwalificeren, in andere woorden je probeert er achter te komen of het goeie zakelijke fit is. Zodra je genoeg ervaring hebt met het kwalificeren van leads groei je door en ga je ook de online demo’s verzorgen. Het doel van een online demo is het bedrijf in kwestie een pilot te verkopen. De dealwaarde van een pilot ligt tussen de €2.500 en €5.000. Als junior commercieel medewerker ben je uiteindelijk verantwoordelijk voor het gehele traject. Het doel is om zoveel mogelijk medewerkers van het betreffende bedrijf (vaak via de HR/P&O-afdeling) een abonnement voor 5 tientjes per maand per medewerker te verkopen. Daarvoor krijgen ze onbeperkt toegang tot al onze trainingen. Deze online trainingen zijn stuk voor stuk - met onze professionele begeleiding - gemaakt door top-experts op het betreffende vakgebied. Onze trainingen zijn direct toepasbaar op je werk/privé.</p>\n" +
    "    <p>Nadat je ervaring in ons telesales team hebt opgedaan en bewezen hebt te kunnen closen, kan je bij ons snel doorgroeien naar de functie van accountmanager en deals met een waarde van tussen de ca. 25K en 100K sluiten en uiteraard onze bestaande klanten blij houden.</p>\n" +
    "\n" +
    "    <p>De ideale commercieel medewerker:</p>\n" +
    "    <ul>\n" +
    "      <li>Is enorm gedreven en positief ingesteld;</li>\n" +
    "      <li>Is secuur en resultaatgericht;</li>\n" +
    "      <li>Ziet targets als een extra drive;</li>\n" +
    "      <li>Is leergierig en wil zich commercieel verder ontwikkelen;</li>\n" +
    "      <li>Is ondernemend en zelfsturend;</li>\n" +
    "      <li>Handelt alle administratieve taken zorgvuldig af;</li>\n" +
    "      <li>Is fulltime beschikbaar;</li>\n" +
    "      <li>Heeft een HBO/WO titel;</li>\n" +
    "      <li>Is woonachtig in de omgeving Amsterdam, of bereid om te verhuizen;</li>\n" +
    "      <li>Heeft een perfecte beheersing van de Nederlandse taal in woord en online geschrift;</li>\n" +
    "      <li>Communicatief zeer sterk aan de telefoon.</li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <h1>Wat we bieden</h1>\n" +
    "\n" +
    "    <p>Wij bieden een ambitieuze werkomgeving bij een goed gefinancierde en snelgroeiende startup. Wij bieden veel opleidingsmogelijkheden en een team van jonge gedreven collega’s. Wij geloven in talent en potentie boven ervaring!  Je startsalaris is ca. €2.000 bruto plus een (oplopende) bonus afhankelijk van je prestaties.</p>\n" +
    "    <p>Enthousiast om bij ons aan de slag te gaan? Mail dan je CV met motivatiebrief naar Homam Karimi <a href=\"mailto:homam@studytube.nl\">homam@studytube.nl</a>.</p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<a href=\"mailto:homam@studytube.nl\" class=\"button button--full button--primary\" translate=\"APPLY_POSITION\">Apply for this position</a>");
}]);

angular.module("about/views/careers.career2.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/careers.career2.html",
    "<div class=\"l-block-large\">\n" +
    "  <h1 class=\"title-secondary content-section__title-primary\">Front-end/UX unicorn</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"l-block-large\">\n" +
    "  <div class=\"content-formatting\">\n" +
    "    <h1>We are looking for a Front-end/UX unicorn</h1>\n" +
    "\n" +
    "    <h1>Who we are</h1>\n" +
    "    <p>StudyTube is a VC backed online education start-up, based in the centre of Amsterdam, that works towards our goal of unleashing an earthquake in the world of e-learning. We do not just offer online courses, but we provide companies a unique and very user-friendly course building tool and an online marketplace. Keywords: adaptive learning, gamification, online role-playing and management dashboard.</p>\n" +
    "\n" +
    "    <h1>To do so, we rely on:</h1>\n" +
    "    <ul>\n" +
    "      <li>A young, super smart and culturally diverse team, working together closely in our offices in Amsterdam and Kharkhov.</li>\n" +
    "      <li>An intense focus on design and usability that makes us stand out.</li>\n" +
    "      <li>A get-things-done attitude that challenges each team member to over-deliver every day while allowing the freedom to do so in the way that is most productive for each individual.</li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <p>Having found product market fit, we are now growing the team in three areas - sales, education and development.</p>\n" +
    "\n" +
    "    <h1>Your role:</h1>\n" +
    "\n" +
    "    <p>Our company is looking for a talented UX designer. Upon joining our Front End team in Amsterdam, you’ll be actively thinking about product improvements and designing new features.</p>\n" +
    "\n" +
    "    <h1>Our expectations</h1>\n" +
    "\n" +
    "    <p>We are looking for a genuine user experience designer, a specialist who is always seeking ways to improve the user experience and likes to solve complex problems. You should always be looking to improve your skills and don’t stop at something that’s just “good enough”. We’re looking for a specialist who is equally comfortable discussing theory, psychology of users, or the semantic implications of the DIV tag. An ideal designer should find the potential of the web exciting and challenging and aim to build things that millions of other people could use everyday.</p>\n" +
    "\n" +
    "    <h1>Your qualification:</h1>\n" +
    "\n" +
    "    <p>Your main mission is to efficiently combine your knowledge and expertise with the goals of Studytube to deliver top-rate user experience. You’ll be working in a collaborative environment and will be a vital part of the team. You’ll be working hard to make sure that users are satisfied and will be truly excited about working in an agile and collaborative environment.</p>\n" +
    "\n" +
    "    <ul>\n" +
    "      <li>Simplicity is the key to successful design;</li>\n" +
    "      <li>Collaboration with the CEO, product owner, other developers and copywriter to deliver world class user experience;</li>\n" +
    "      <li>Visual design: you will be working closely with the designer or designing your self;</li>\n" +
    "      <li>HTML/CSS: You’ll get the full ownership of your ideas - you’ll be expected to do both, create beautiful mockups/prototypes/wireframes and implement them.</li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <h1>The required working experience</h1>\n" +
    "    <ul>\n" +
    "      <li>Minimum 2 years of UX design experience;</li>\n" +
    "      <li>Strong knowledge of HTML and CSS;</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<a href=\"mailto:homam@studytube.nl\" class=\"button button--full button--primary\" translate=\"APPLY_POSITION\">Apply for this position</a>");
}]);

angular.module("about/views/contact.accra.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/contact.accra.html",
    "<aside class=\"about-map\">\n" +
    "  <div contact-map xcoord=\"5.635211\" ycoord=\"-0.132845\" class=\"about-map__googlemap\"></div>\n" +
    "\n" +
    "  <div class=\"about-map__popover\">\n" +
    "    <address class=\"l-block\">\n" +
    "      <strong>Studytube</strong><br>\n" +
    "      12 Spintex Rd,<br>\n" +
    "      Accra,<br>\n" +
    "      Ghana\n" +
    "    </address>\n" +
    "\n" +
    "    <button class=\"button button--primary button--full\" onClick=\"window.location.href='mailto:info@studytube.nl';\"><i class=\"icon-mail-alt\"></i></button>\n" +
    "  </div>\n" +
    "</aside>");
}]);

angular.module("about/views/contact.amsterdam.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/contact.amsterdam.html",
    "<aside class=\"about-map\">\n" +
    "  <div contact-map xcoord=\"52.371073\" ycoord=\"4.889383\" class=\"about-map__googlemap\"></div>\n" +
    "\n" +
    "  <div class=\"about-map__popover\">\n" +
    "    <address class=\"l-block\">\n" +
    "      <strong>Studytube</strong><br>\n" +
    "      Spuistraat 239,<br>\n" +
    "      1012 VP Amsterdam,<br>\n" +
    "      The Netherlands\n" +
    "    </address>\n" +
    "\n" +
    "    <button class=\"button button--primary button--full\" onClick=\"window.location.href='mailto:info@studytube.nl';\"><i class=\"icon-mail-alt\"></i></button>\n" +
    "  </div>\n" +
    "</aside>");
}]);

angular.module("about/views/contact.kharkiv.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/contact.kharkiv.html",
    "<aside class=\"about-map\">\n" +
    "  <div contact-map xcoord=\"50.004216\" ycoord=\"36.237900\" class=\"about-map__googlemap\"></div>\n" +
    "\n" +
    "  <div class=\"about-map__popover\">\n" +
    "    <address class=\"l-block\">\n" +
    "      <strong>Studytube</strong><br>\n" +
    "      st. Ivanova 7/9,<br>\n" +
    "      Kharkiv,<br>\n" +
    "      Ukraine\n" +
    "    </address>\n" +
    "\n" +
    "    <button class=\"button button--primary button--full\" onClick=\"window.location.href='mailto:info@studytube.nl';\"><i class=\"icon-mail-alt\"></i></button>\n" +
    "  </div>\n" +
    "</aside>");
}]);

angular.module("about/views/content-careers.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/content-careers.html",
    "<div class=\"content-section content-section--contrast\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"l-block-x-large\">\n" +
    "          <div class=\"title-stroked title-stroked--alt\">\n" +
    "            <div class=\"title-stroked__text\" translate=\"CAREERS_TITLE_SECONDARY_1\">We need new people</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block\">\n" +
    "          <div class=\"grid grid--center\">\n" +
    "            <div class=\"grid__item p6--eight-twelfths\">\n" +
    "              <div class=\"title-tertiary content-section__title-secondary is-center-aligned\" translate=\"CAREERS_TITLE_SECONDARY_1_DESCRIPTION\">StudyTube is committed to bringing the best online learning experience to every member of the goal workforce, to built a place where professionals can learn anything that makes them more productive and successful in their professional career.</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<section class=\"content-section\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths p10--eleven-twelfths\">\n" +
    "        <div class=\"l-stacked l-stacked--large\">\n" +
    "          <div class=\"grid\">\n" +
    "            <div class=\"grid__item p8--three-tenths p10--one-quarter\">\n" +
    "              <aside class=\"l-stacked__item\">\n" +
    "                <div class=\"only-gt-p8\">\n" +
    "                  <div class=\"l-block-large\">\n" +
    "                    <div class=\"title-stroked\">\n" +
    "                      <h1 class=\"title-stroked__text\" translate=\"ALL_POSITIONS\">All positions</h1>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"nav\">\n" +
    "                    <ul class=\"l-list l-list--small\">\n" +
    "                      <li class=\"l-list__item\"><a ui-sref=\"about.careers.career1\" class=\"nav__item\" ng-class=\"{'nav__item--active': activeTab == 'career1'}\">Junior Commercieel medewerker</a></li>\n" +
    "                      <li class=\"l-list__item\"><a ui-sref=\"about.careers.career2\" class=\"nav__item\" ng-class=\"{'nav__item--active': activeTab == 'career2'}\">Front-end/UX unicorn</a></li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"only-lt-p8\">\n" +
    "                  <select class=\"input-select input--full\" name=\"\" id=\"\">\n" +
    "                    <optgroup label=\"All positions\">\n" +
    "                      <option value=\"0\">Career 1</option>\n" +
    "                      <option value=\"1\">Career 2</option>\n" +
    "                    </optgroup>\n" +
    "                  </select>\n" +
    "                </div>\n" +
    "              </aside>\n" +
    "            </div><!--\n" +
    "            --><div class=\"grid__item p8--seven-tenths p10--three-quarters\">\n" +
    "              <div class=\"l-stacked__item\">\n" +
    "                <div ui-view></div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>");
}]);

angular.module("about/views/content-company.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/content-company.html",
    "<div class=\"content-section content-section--contrast\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"l-block-large l-block-huge-gt-p6\">\n" +
    "          <div class=\"title-stroked title-stroked--alt\">\n" +
    "            <div class=\"title-stroked__text\" translate=\"ABOUT_COMPANY\">About company</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-large l-block-huge-gt-p6\">\n" +
    "          <div class=\"l-stacked l-stacked--large\">\n" +
    "            <div class=\"grid grid--wide\">\n" +
    "              <div class=\"grid__item p6--one-third\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <div class=\"about-block lt-p6-center-aligned\">\n" +
    "                    <div class=\"l-block\">\n" +
    "                      <div class=\"about-block__title\">2010</div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"about-block__text\" translate=\"ABOUT_BLOCK_TEXT_1\">Launched from Homam’s dorm room in the University of Maastricht</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p6--one-third\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <div class=\"about-block lt-p6-center-aligned\">\n" +
    "                    <div class=\"l-block\">\n" +
    "                      <div class=\"about-block__title\" translate=\"ABOUT_BLOCK_TITLE_2\">Over 20</div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"about-block__text\" translate=\"ABOUT_BLOCK_TEXT_2\">Grown to an exceptional team of more than 20 crazy highly-skilled people</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p6--one-third\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <div class=\"about-block lt-p6-center-aligned\">\n" +
    "                    <div class=\"l-block\">\n" +
    "                      <div class=\"about-block__title\">15.000+</div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"about-block__text\" translate=\"ABOUT_BLOCK_TEXT_3\">Users got smarter with StudyTube so far</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-large l-block-huge-gt-p6\">\n" +
    "          <div class=\"title-stroked title-stroked--alt\">\n" +
    "            <div class=\"title-stroked__text\" translate=\"OUR_MISSION\">Our mission</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-x-large-gt-p6\">\n" +
    "          <div class=\"grid grid--center\">\n" +
    "            <div class=\"grid__item p6--ten-twelfths\">\n" +
    "              <div class=\"title-tertiary content-section__title-secondary is-center-aligned\" translate=\"OUR_MISSION_TEXT\">StudyTube is committed to bringing the best online learning experience to every member of the goal workforce, to built a place where professionals can learn anything that makes them more productive and successful in their professional career.</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<section class=\"content-section\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"l-block-x-large\">\n" +
    "          <div class=\"title-stroked\">\n" +
    "            <h1 class=\"title-stroked__text\" translate=\"MEET_TEAM\">Meet the team</h1>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-x-large\">\n" +
    "          <div class=\"title-tertiary content-section__title-secondary is-center-aligned\" translate=\"MEET_TEAM_TEXT\">Dreamers, Designers, Computer Geeks, E-Learning People... <br>Handful of talented people.</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-large\">\n" +
    "          <div class=\"l-stacked l-stacked--large\">\n" +
    "            <div class=\"grid\">\n" +
    "              <div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/homam.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Homam Karimi</h1>\n" +
    "                      <div class=\"ut-content__role\">CEO & Founder</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/gerhard.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Gerhard Riphagen</h1>\n" +
    "                      <div class=\"ut-content__role\">CPO & Co-founder</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/chris.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Chris de Bruin</h1>\n" +
    "                      <div class=\"ut-content__role\">CTO</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/steve.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Stepan Suvorov</h1>\n" +
    "                      <div class=\"ut-content__role\">JavaScript Team Lead</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/yasin.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Yasin Tuncbilek</h1>\n" +
    "                      <div class=\"ut-content__role\">Sales analyst</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/mark-v.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Mark Visser</h1>\n" +
    "                      <div class=\"ut-content__role\">Account Manager</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/bastiaan-van-achterbergh.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Bastiaan van Achterbergh</h1>\n" +
    "                      <div class=\"ut-content__role\">Account Manager</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/sebastiaan-menheere.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Sebastiaan Menheeren</h1>\n" +
    "                      <div class=\"ut-content__role\">Account Manager</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/laura.png\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Laura van Heesch</h1>\n" +
    "                      <div class=\"ut-content__role\">eLearning Consultant</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/caroline.png\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Caroline Eerden</h1>\n" +
    "                      <div class=\"ut-content__role\">eLearning Consultant</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/paul.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Paul Vessies</h1>\n" +
    "                      <div class=\"ut-content__role\">eLearning Consultant</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/volo.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Volodymyr Dziubak</h1>\n" +
    "                      <div class=\"ut-content__role\">UX & Front-end developer</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/misha.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Michael Grinko</h1>\n" +
    "                      <div class=\"ut-content__role\">JavaScript Developer</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/herman.png\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Herman Litvinov</h1>\n" +
    "                      <div class=\"ut-content__role\">JavaScript Developer</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/eduard.jpeg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Eduard Plyushkin</h1>\n" +
    "                      <div class=\"ut-content__role\">Backend Developer</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/valera.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Valera Abornyev</h1>\n" +
    "                      <div class=\"ut-content__role\">Front-end Developer</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/max.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Maxim Didenko</h1>\n" +
    "                      <div class=\"ut-content__role\">QA Engineer</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/marije-dudink.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Marije Dudink</h1>\n" +
    "                      <div class=\"ut-content__role\">Production Assistant</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/sylvain.stedenburg.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Sylvain Stedenburg</h1>\n" +
    "                      <div class=\"ut-content__role\">Production Assistant</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/rick.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Rick Kemna</h1>\n" +
    "                      <div class=\"ut-content__role\">Production Assistant</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/shems-elchelabi.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Shems Elchelabi</h1>\n" +
    "                      <div class=\"ut-content__role\">Production Assistant</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/PedroduBuf.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Pedro du Buf</h1>\n" +
    "                      <div class=\"ut-content__role\">Production Assistant</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/leon.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Leon Neijs</h1>\n" +
    "                      <div class=\"ut-content__role\">Production Assistant</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/daan-de-meijier.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Daan de Meijier</h1>\n" +
    "                      <div class=\"ut-content__role\">Sales analyst</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/hanneke-huijer.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Hanneke Huijer</h1>\n" +
    "                      <div class=\"ut-content__role\">Sales analyst</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/team/MarleenSpek.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Marleen Spek</h1>\n" +
    "                      <div class=\"ut-content__role\">Manager StudytubeLaw</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <a ui-sref=\"about.careers\" class=\"user-tile__avatar\"><img src=\"/images/team/you.jpg\" alt=\"\" class=\"user-tile__avatar\"></a>\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">We want you</h1>\n" +
    "                      <div class=\"ut-content__role\">Check our open positions</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"content-section\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"l-block-x-large\">\n" +
    "          <div class=\"title-stroked\">\n" +
    "            <h1 class=\"title-stroked__text\">Raad van Advies</h1>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-x-large\">\n" +
    "          <div class=\"title-tertiary content-section__title-secondary is-center-aligned\">Studytube heeft een Raad van Advies. Deze bestaat uit prominenten met kennis op het gebied van ondernemerschap, de trainingsbranche, technology en internationaal ondernemen. </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-large\">\n" +
    "          <div class=\"l-stacked l-stacked--large\">\n" +
    "            <div class=\"grid\">\n" +
    "              <div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/advisers/BoudewijnOverduin.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Boudewijn Overduin</h1>\n" +
    "                      <div class=\"ut-content__role\">Co-founder and former CEO of Vergouwen Overduin</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/advisers/CorVink.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Cor Vink</h1>\n" +
    "                      <div class=\"ut-content__role\">Executive Boardmember at Schouten Global</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/advisers/HermanHintzen.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Herman Hintzen</h1>\n" +
    "                      <div class=\"ut-content__role\">Managing partner henQ invest, Venture Capital</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p2--one-half p6--one-third p10--one-quarter\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <section class=\"user-tile\">\n" +
    "                    <img src=\"/images/advisers/StephenEdkins.jpg\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                    <div class=\"ut-content\">\n" +
    "                      <h1 class=\"ut-content__name\">Stephen Edkins</h1>\n" +
    "                      <div class=\"ut-content__role\">Director Redcrest, Venture Capital</div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>");
}]);

angular.module("about/views/content-contact.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/content-contact.html",
    "<div class=\"content-section content-section--contrast\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"l-block-x-large\">\n" +
    "          <div class=\"title-stroked title-stroked--alt\">\n" +
    "            <div class=\"title-stroked__text\" translate=\"CONTACT_TITLE_SECONDARY_1\">We are we</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-x-large\">\n" +
    "          <div class=\"grid grid--center\">\n" +
    "            <div class=\"grid__item p6--eight-twelfths\">\n" +
    "              <div class=\"title-tertiary content-section__title-secondary is-center-aligned\" translate=\"CONTACT_TITLE_SECONDARY_1_DESCRIPTION\">StudyTube HQ are in a nice and cozy penthouse right in the middle of Amsterdam.  We also have a couple offices around the world.</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <aside class=\"nav-tabs nav-tabs--alt\">\n" +
    "          <div class=\"l-stacked\">\n" +
    "            <div class=\"grid\">\n" +
    "              <div class=\"grid__item p6--one-third\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <a ui-sref=\"about.contact.amsterdam\" class=\"nav-tabs__item nav-tabs__item--full\" ng-class=\"{'nav-tabs__item--active': activeTab == 'amsterdam'}\">Amsterdam</a>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "                  --><div class=\"grid__item p6--one-third\">\n" +
    "              <div class=\"l-stacked__item\">\n" +
    "                <a ui-sref=\"about.contact.accra\" class=\"nav-tabs__item nav-tabs__item--full\" ng-class=\"{'nav-tabs__item--active': activeTab == 'sanpaulo'}\">Accra</a>\n" +
    "              </div>\n" +
    "            </div><!--\n" +
    "                  --><div class=\"grid__item p6--one-third\">\n" +
    "              <div class=\"l-stacked__item\">\n" +
    "                <a ui-sref=\"about.contact.kharkiv\" class=\"nav-tabs__item nav-tabs__item--full\" ng-class=\"{'nav-tabs__item--active': activeTab == 'kharkiv'}\">Kharkiv</a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </aside>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div ui-view></div>");
}]);

angular.module("about/views/content-values.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/content-values.html",
    "<div class=\"content-section content-section--contrast\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"l-block-x-large\">\n" +
    "          <div class=\"title-stroked title-stroked--alt\">\n" +
    "            <div class=\"title-stroked__text\" translate=\"VALUES_TITLE_SECONDARY_1\">Company values</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"is-center-aligned\">\n" +
    "          <div class=\"l-block-x-large\">\n" +
    "            <div class=\"about-block\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <div class=\"about-block__title\" translate=\"COMPANY_VALUES_ITEM_1\">Empathethic</div>\n" +
    "              </div>\n" +
    "              <div class=\"about-block__text\" translate=\"COMPANY_VALUES_ITEM_1_DESCRIPTION\">Distill to the meaningful and balanced.</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-x-large\">\n" +
    "            <div class=\"about-block\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <div class=\"about-block__title\" translate=\"COMPANY_VALUES_ITEM_2\">Simple</div>\n" +
    "              </div>\n" +
    "              <div class=\"about-block__text\" translate=\"COMPANY_VALUES_ITEM_2_DESCRIPTION\">Distill to the meaningful and balanced.</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-x-large\">\n" +
    "            <div class=\"about-block\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <div class=\"about-block__title\" translate=\"COMPANY_VALUES_ITEM_3\">Smart</div>\n" +
    "              </div>\n" +
    "              <div class=\"about-block__text\" translate=\"COMPANY_VALUES_ITEM_3_DESCRIPTION\">Distill to the meaningful and balanced.</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-x-large\">\n" +
    "            <div class=\"about-block\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <div class=\"about-block__title\" translate=\"COMPANY_VALUES_ITEM_4\">Challenging</div>\n" +
    "              </div>\n" +
    "              <div class=\"about-block__text\" translate=\"COMPANY_VALUES_ITEM_4_DESCRIPTION\">Distill to the meaningful and balanced.</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-large\">\n" +
    "            <div class=\"about-block\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <div class=\"about-block__title\" translate=\"COMPANY_VALUES_ITEM_5\">Ambitious</div>\n" +
    "              </div>\n" +
    "              <div class=\"about-block__text\" translate=\"COMPANY_VALUES_ITEM_5_DESCRIPTION\">Distill to the meaningful and balanced.</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<section class=\"content-section\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"l-block-large\">\n" +
    "          <div class=\"title-stroked\">\n" +
    "            <h1 class=\"title-stroked__text\" translate=\"VALUES_TITLE_SECONDARY_2\">Course values</h1>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-stacked l-stacked--large\">\n" +
    "          <div class=\"grid\">\n" +
    "            <div class=\"grid__item p10--one-third\">\n" +
    "              <div class=\"l-stacked__item\">\n" +
    "                <section class=\"about-course-value\">\n" +
    "                  <div class=\"l-block\">\n" +
    "                    <i class=\"icon-lamp\"></i>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"l-block-med\">\n" +
    "                    <h1 class=\"about-course-value__title\" translate=\"COURSE_VALUES_ITEM_1\">Creativiteit & Fun</h1>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_1_DESCRIPTION\">Wij streven ernaar dat iedere cursus leuk is om te volgen. Het is bij een online cursus veel lastiger om de motivatie te verhogen en de aandacht van een cursist vast te houden dan bij een klassikale cursus. Het is erg belangrijk dat jouw cursus afwisselende werkvormen (video’s, afbeeldingen, tekst, vragen) bevat die interesse wekken om zo het risico op afleiding te verminderen en de motivatie te verhogen. Verwerk dus de rode draad van je cursus in video’s, vertel verhalen en geef veel voorbeelden die je energiek, enthousiast en met zelfvertrouwen presenteert.</div>\n" +
    "                </section>\n" +
    "              </div>\n" +
    "            </div><!--\n" +
    "                --><div class=\"grid__item p10--one-third\">\n" +
    "            <div class=\"l-stacked__item\">\n" +
    "              <section class=\"about-course-value\">\n" +
    "                <div class=\"l-block\">\n" +
    "                  <i class=\"icon-badge\"></i>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-med\">\n" +
    "                  <h1 class=\"about-course-value__title\" translate=\"COURSE_VALUES_ITEM_2\">Resultaatgericht</h1>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-med\">\n" +
    "                  <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_2_DESCRIPTION_1\">\n" +
    "                    Hoe goed je cursus inhoudelijk ook is:  is pas echt een succes zodra cursisten nieuw gedrag laten zien. Met andere woorden: zorg er niet alleen voor dat cursisten nieuwe kennis en inzichten verkrijgen, maar ook dat zij hun gedrag aanpassen op deze kennis en inzichten en dat zij vaardigheden trainen. Je wilt voorkomen dat cursisten blijven hangen in oude gewoontes. Zorg er daarom ook voor dat je:\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-med\">\n" +
    "                  <div class=\"l-block-small\" translate=\"COURSE_VALUES_ITEM_2_DESCRIPTION_2\">\n" +
    "                    <strong>Voldoende verbanden legt tussen theorie en praktijk</strong>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_2_DESCRIPTION_3\">\n" +
    "                    Probeer zoveel mogelijk praktijkvoorbeelden en/of prak- tijksituaties te geven bij de (theoretische) uitleg die je geeft. Probeer ook bij het uitschrijven van een voorbeeld op zoek te gaan naar afbeeldingen die dit voorbeeld goed illustreren.\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-med\">\n" +
    "                  <div class=\"l-block-small\" translate=\"COURSE_VALUES_ITEM_2_DESCRIPTION_4\">\n" +
    "                    <strong>Voldoende praktijkgerichte vragen uitwerkt.</strong>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_2_DESCRIPTION_5\">\n" +
    "                    Een vraag is niet bedoeld om iemand te overhoren maar om de cursist na te laten denken over een situatie in de praktijk. Denk bij een cursus over het voorkomen van conflictsituaties op de werkvloer aan een vraag als: “Jaap is webdeveloper. Hij heeft problemen met zijn internet- verbinding. Hoe kan hij zijn leidinggevende – die het altijd erg druk heeft en liever niet gestoord wordt – hier het beste over benaderen?”.\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-small\" translate=\"COURSE_VALUES_ITEM_2_DESCRIPTION_6\">\n" +
    "                  <strong>De cursist laat werken aan een eindproduct.</strong>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_2_DESCRIPTION_7\">\n" +
    "                  De cursist heeft dan na het volgen van de cursus niet alleen nieuwe kennis en inzichten verkregen, maar hij of zij heeft ook iets tastbaars in handen om direct te gebrui- ken in de praktijk. Denk bij een verkoopcursus aan het maken van een salespitch of bij een cursus over presen- tatietechnieken aan een script en presentatieslides.\n" +
    "                </div>\n" +
    "              </section>\n" +
    "            </div>\n" +
    "          </div><!--\n" +
    "                --><div class=\"grid__item p10--one-third\">\n" +
    "            <div class=\"l-stacked__item\">\n" +
    "              <section class=\"about-course-value\">\n" +
    "                <div class=\"l-block\">\n" +
    "                  <i class=\"icon-heart\"></i>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-med\">\n" +
    "                  <h1 class=\"about-course-value__title\" translate=\"COURSE_VALUES_ITEM_3\">Personalijk</h1>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-med\">\n" +
    "                  <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_3_DESCRIPTION_1\">\n" +
    "                    Cursussen die zijn toegespitst op het individu leveren de hoogste resultaten op. Eén van de belangrijkste features van Studytube is dan ook het feit dat cursus- sen ‘adaptief’ worden aangeboden. Met andere woorden: zodra een cursist een vraag in de cursus fout beantwoordt - en dus het betreffende onderdeel kennelijk niet volledig begrijpt – krijgt hij extra content aangeboden om ervoor te zorgen dat hij of zij alsnog op hetzelfde kennisniveau komt als iemand die hetzelfde onderdeel wel direct begrijpt. Ook is het belangrijk dat je de ‘afstand’ tussen jou (de expert) en de cursist zo klein mogelijk houdt en zo veel mogelijk formeel taalgebruik voorkomt. Kortom, zorg er dus voor dat je:\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-med\">\n" +
    "                  <div class=\"l-block-small\" translate=\"COURSE_VALUES_ITEM_3_DESCRIPTION_2\">\n" +
    "                    <strong>Voor ieder onderwerp één of meerdere adaptieve paden aanmaakt.</strong>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_3_DESCRIPTION_3\">\n" +
    "                    Dit zijn extra leerroutes waarin je de geleerde kennis in een andere vorm herhaalt of versimpeld uitlegt.\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-med\">\n" +
    "                  <div class=\"l-block-small\" translate=\"COURSE_VALUES_ITEM_3_DESCRIPTION_4\">\n" +
    "                    <strong>Feedback geeft bij iedere antwoordmogelijkheid.</strong>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_3_DESCRIPTION_5\">\n" +
    "                    Daardoor speel je in op de individuele ontwikkeling van een cursist en zorg je ervoor dat hij/zij de inhoud beter kan onthouden.\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-med\">\n" +
    "                  <div class=\"l-block-small\" translate=\"COURSE_VALUES_ITEM_3_DESCRIPTION_6\">\n" +
    "                    <strong>De cursist aanspreekt in de jij-vorm.</strong>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_3_DESCRIPTION_7\">\n" +
    "                    Op deze manier krijgt de cursist veel meer het gevoel dat er weinig afstand is tussen hem of haar en de expert die de cursus geeft.\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-block-small\" translate=\"COURSE_VALUES_ITEM_3_DESCRIPTION_8\">\n" +
    "                  <strong>Voorbeelden geeft die aansluiten op de belevingswereld van de cursist.</strong>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"about-course-value__body\" translate=\"COURSE_VALUES_ITEM_3_DESCRIPTION_9\">\n" +
    "                  Denk dus goed na over wie precies je doelgroep is en stem je voorbeelden op hen af. Een arts heeft immers een andere belevingswereld dan een advocaat of een webdeveloper.\n" +
    "                </div>\n" +
    "              </section>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>");
}]);

angular.module("about/views/header-careers.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/header-careers.html",
    "<div class=\"content-header content-header--large content-header--bg-about-careers\">\n" +
    "  <div class=\"ch-body\">\n" +
    "    <div class=\"ch-body__text\">\n" +
    "      <h1 class=\"title-primary\" translate=\"CAREERS_TITLE\">Become one of <strong>us!</strong></h1>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("about/views/header-company.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/header-company.html",
    "<div class=\"content-header content-header--large content-header--bg-about-company\">\n" +
    "  <div class=\"ch-body\">\n" +
    "    <div class=\"ch-body__text\">\n" +
    "      <h1 class=\"title-primary\" translate=\"COMPANY_TITLE\">We are here to change the world<br>of <strong>corporate learning!</strong></h1>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("about/views/header-contact.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/header-contact.html",
    "<div class=\"content-header content-header--large content-header--bg-about-contact\">\n" +
    "  <div class=\"ch-body\">\n" +
    "    <div class=\"ch-body__text\">\n" +
    "      <h1 class=\"title-primary\" translate=\"CONTACT_TITLE\">Drop us a <strong>line.</strong></h1>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("about/views/header-values.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/views/header-values.html",
    "<div class=\"content-header content-header--large content-header--bg-about-values\">\n" +
    "  <div class=\"ch-body\">\n" +
    "    <div class=\"ch-body__text\">\n" +
    "      <h1 class=\"title-primary\" translate=\"VALUES_TITLE\">Driven by <strong>ideals!</strong></h1>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("academy/views/basic-layout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/basic-layout.html",
    "<div ng-cloak>\n" +
    "  <mobile-header class=\"only-lt-p8\"></mobile-header>\n" +
    "  <desktop-header class=\"only-gt-p8\"></desktop-header>\n" +
    "\n" +
    "  <ui-view ng-cloak></ui-view>\n" +
    "\n" +
    "  <ng-include src=\"'academy/views/footer.html'\" ng-cloak></ng-include>\n" +
    "\n" +
    "  <login-modal ng-if=\"!getCurrentUser()\" ng-show=\"isPopupVisible('login')\" ng-cloak></login-modal>\n" +
    "  <signup-modal ng-if=\"!getCurrentUser()\" ng-show=\"isPopupVisible('signup')\" ng-cloak></signup-modal>\n" +
    "</div>");
}]);

angular.module("academy/views/become-expert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/become-expert.html",
    "<main class=\"page-content\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"solo-form\">\n" +
    "          <div class=\"l-block-x-large\">\n" +
    "            <div class=\"sf-header\">\n" +
    "              <div class=\"l-block\">\n" +
    "                <div class=\"sf-header__title\" translate=\"BECOME_EXPERT_PAGE_TITLE\">Interested in becoming one of our experts?</div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"grid grid-center\">\n" +
    "                <div class=\"grid__item p8--eight-twelfths\">\n" +
    "                  <div class=\"sf-header__description\" translate=\"BECOME_EXPERT_PAGE_DESCRIPTION\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro quaerat nemo odio, tempora molestiae quo vel harum non cupiditate vero! Accusantium a repellendus dolor corrupti. Quisquam debitis consequatur totam culpa.</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"solo-form__form\">\n" +
    "            <form   action=\"\"\n" +
    "                    class=\"form-become-expert\"\n" +
    "                    ng-hide=\"formState == 'sent'\"\n" +
    "                    ng-submit=\"submitForm()\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input  type=\"text\"\n" +
    "                          class=\"input input--full input--alt\"\n" +
    "                          ng-class=\"{ 'input--error': errors.name }\"\n" +
    "                          ng-disabled=\"formState == 'waiting'\"\n" +
    "                          ng-model=\"name\"\n" +
    "                          ng-change=\"resetErrors()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"NAME\">Name</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.name\" translate=\"REQUIRED\">{{ errors.name }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input  type=\"text\"\n" +
    "                          class=\"input input--full input--alt\"\n" +
    "                          ng-class=\"{ 'input--error': errors.expertise }\"\n" +
    "                          ng-disabled=\"formState == 'waiting'\"\n" +
    "                          ng-model=\"expertise\"\n" +
    "                          ng-change=\"resetErrors()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"EXPERTIZE\">Expertise</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.expertise\" translate=\"REQUIRED\">{{ errors.expertise }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input  type=\"email\"\n" +
    "                          class=\"input input--full input--alt\"\n" +
    "                          ng-class=\"{ 'input--error': errors.email }\"\n" +
    "                          ng-disabled=\"formState == 'waiting'\"\n" +
    "                          ng-model=\"email\"\n" +
    "                          ng-change=\"resetErrors()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.email\" translate=\"REQUIRED\">{{ errors.email }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-large\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input  type=\"text\"\n" +
    "                          class=\"input input--full input--alt\"\n" +
    "                          ng-class=\"{ 'input--error': errors.phone }\"\n" +
    "                          ng-disabled=\"formState == 'waiting'\"\n" +
    "                          ng-model=\"phone\"\n" +
    "                          ng-change=\"resetErrors()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PHONE_NUMBER\">Phone number</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.phone\" translate=\"REQUIRED\">{{ errors.phone }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <button class=\"button button--primary button--full\" ng-disabled=\"formState == 'waiting'\">\n" +
    "                <span ng-if=\"formState != 'waiting'\" translate=\"GET_FREE_BROCHURE\">Get free brochure</span>\n" +
    "                <span ng-if=\"formState == 'waiting'\" translate=\"PROCESSING\">Processing...</span>\n" +
    "              </button>\n" +
    "            </form>\n" +
    "\n" +
    "            <div ng-show=\"formState == 'sent'\" translate=\"EXPERT_BROCHURE_SENT_MESSAGE\">\n" +
    "              Thank you for your interest!<br>\n" +
    "              We will send you our awesome brochure in a short time.\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</main>");
}]);

angular.module("academy/views/desktop-header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/desktop-header.html",
    "<header class=\"page-header\" ng-class=\"{ 'page-header--filled': hasFilledHeader }\">\n" +
    "  <div class=\"l-tricol\">\n" +
    "    <div class=\"l-tricol__mid\">\n" +
    "      <a ui-sref=\"home\"><h1 class=\"page-header__title\">Studytube</h1></a>\n" +
    "    </div>\n" +
    "\n" +
    "      <div class=\"l-tricol__left\">\n" +
    "        <ul class=\"l-list-inline l-list-inline--collapsed ph-menu\">\n" +
    "          <li class=\"l-list-inline__item\">\n" +
    "            <button class=\"ph-menu__item\" popup-autohide-opener=\"library\">\n" +
    "              <span class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "                <span class=\"l-list-inline__item\">\n" +
    "                  <i class=\"icon-list\"></i>\n" +
    "                </span>\n" +
    "                <span class=\"l-list-inline__item\" translate=\"LIBRARY\">\n" +
    "                  Library\n" +
    "                </span>\n" +
    "              </span>\n" +
    "            </button>\n" +
    "          </li>\n" +
    "\n" +
    "          <li class=\"l-list-inline__item\"><a ui-sref=\"features\" class=\"ph-menu__item\" translate=\"FEATURES\">Features</a></li>\n" +
    "\n" +
    "          <li class=\"l-list-inline__item\"><a ui-sref=\"pricing\" class=\"ph-menu__item\" translate=\"PRICING\">Pricing</a></li>\n" +
    "\n" +
    "          <li class=\"l-list-inline__item\"><a ui-sref=\"instructors.all\" class=\"ph-menu__item\" translate=\"FACULTY\">Faculty</a></li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <div class=\"header-popover header-popover--wide header-popover--pivot-left\" popup-window=\"library\" ng-show=\"isPopupVisible('library')\">\n" +
    "          <div class=\"hp-header\">\n" +
    "            <div class=\"hp-header__title\">\n" +
    "              <span class=\"l-list-inline l-list-inline--collapsed\" popup-closer=\"library\">\n" +
    "                <span class=\"l-list-inline__item\">\n" +
    "                  <i class=\"icon-list\"></i>\n" +
    "                </span>\n" +
    "                <span class=\"l-list-inline__item\" translate=\"LIBRARY\">\n" +
    "                  Library\n" +
    "                </span>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"hp-block l-block-small\">\n" +
    "            <div class=\"l-block-small\">\n" +
    "              <div class=\"hp-block__title\" translate=\"COURSE_CATEGORIES\">Course categories</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"grid\">\n" +
    "              <div class=\"grid__item one-half\">\n" +
    "                <div class=\"nav-alt\">\n" +
    "                  <ul class=\"l-list l-list--small\">\n" +
    "                    <li class=\"l-list__item\"><a ui-sref=\"courses.all\" class=\"nav-alt__item\" translate=\"HP_NAV_ITEM_1\">All courses</a></li>\n" +
    "                    <li class=\"l-list__item\" ng-repeat=\"category in categories[0]\">\n" +
    "                      <a ng-href=\"/courses/categories/{{ category.id }}/{{ category.nameSlug }}\" class=\"nav-alt__item\">{{ category.name }}</a>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item one-half\">\n" +
    "                  <div class=\"nav-alt\">\n" +
    "                    <ul class=\"l-list l-list--small\">\n" +
    "                      <li class=\"l-list__item\" ng-repeat=\"category in categories[1]\">\n" +
    "                        <a ng-href=\"/courses/categories/{{ category.id }}/{{ category.nameSlug }}\" class=\"nav-alt__item\">{{ category.name }}</a>\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block\">\n" +
    "            <div class=\"grid grid--narrow\">\n" +
    "              <div class=\"grid__item one-half\">\n" +
    "                <a ui-sref=\"become-expert\" class=\"banner banner--alt\">\n" +
    "                  <div class=\"banner__icon\"><i class=\"icon-wheel-alt\"></i></div>\n" +
    "                  <span translate=\"BECOME_AN_INSTRUCTOR\">Become an instructor</span>\n" +
    "                </a>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item one-half\">\n" +
    "                  <a class=\"banner banner--alt\" ng-href=\"{{ organisationsUrl }}\">\n" +
    "                    <div class=\"banner__icon\"><i class=\"icon-case-alt\"></i></div>\n" +
    "                    <span translate=\"FOR_ORGANIZATIONS\">For organizations</span>\n" +
    "                  </a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-tricol__right\">\n" +
    "        <div ng-if=\"!getCurrentUser()\">\n" +
    "          <ul class=\"l-list-inline l-list-inline--collapsed ph-menu\">\n" +
    "            <li class=\"l-list-inline__item\"><a href=\"\" class=\"ph-menu__item\" popup-modal-opener=\"login\"><span translate=\"SIGN_IN\">Sign in</span></a></li>\n" +
    "\n" +
    "            <li class=\"l-list-inline__item\"><a href=\"\" class=\"ph-menu__item ph-menu__item--button\" popup-modal-opener=\"signup\"><span translate=\"SIGN_UP\">Sign up</span></a></li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"getCurrentUser()\">\n" +
    "          <!--<div class=\"hp-header__title ph-welcome\">Welcome {{ getCurrentUser().name }}</div>-->\n" +
    "          <!--<div class=\"page-header__time\" popup-toggler=\"time\">0 min.</div>-->\n" +
    "          <button popup-toggler=\"user\">\n" +
    "            <img ng-src=\"{{ getCurrentUser().avatar || '/images/default-avatar.jpg' }}\" alt=\"\" class=\"ph-user\">\n" +
    "          </button>\n" +
    "\n" +
    "          <div class=\"header-popover header-popover--pivot-right\" popup-window=\"user\" ng-show=\"isPopupVisible('user')\">\n" +
    "            <div class=\"hp-header\">\n" +
    "              <div class=\"hp-header__title hp-header__title--truncated\">{{ getCurrentUser().name }}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"hp-block\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <div class=\"hp-block__title\" translate=\"ACCOUNT\">Account</div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"nav-alt\">\n" +
    "                <ul class=\"l-list l-list--small\">\n" +
    "                  <li class=\"l-list__item\"><a ui-sref=\"dashboard\" class=\"nav-alt__item\" translate=\"MY_COURSES\">My courses</a></li>\n" +
    "                  <li class=\"l-list__item\"><a href=\"\" ng-click=\"signOut()\" class=\"nav-alt__item\" translate=\"SIGN_OUT\">Sign\n" +
    "                    out</a></li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"hp-block\" ng-if=\"getCurrentUser().isExpert\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <a ui-sref=\"expert\" class=\"button button--primary button--full\">Administration</a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- <div class=\"hp-block\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <div class=\"hp-block__title\" translate=\"SWITCH_ACADEMY\">Switch Academy</div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"nav-alt\">\n" +
    "                <ul class=\"l-list l-list--small\">\n" +
    "                  <li class=\"l-list__item\"><a href=\"\" class=\"nav-alt__item nav-alt__item--active\" translate=\"STUDYTUBE_ACADEMY\">Studytube academy</a>\n" +
    "                  </li>\n" +
    "                  <li class=\"l-list__item\"><a href=\"\" class=\"nav-alt__item\"translate=\"HVDS_ACADEMY\">HVDS academy</a></li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "            </div> -->\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"header-popover header-popover--pivot-time\" popup-window=\"time\" ng-show=\"isPopupVisible('time')\">\n" +
    "            <div class=\"hp-time\">\n" +
    "              <div class=\"hp-time__des\" translate=\"TIME_GREAT\">Great job! You already spent</div>\n" +
    "              <div class=\"hp-time__min\">21 <span translate=\"TIME_MIN\">minutes</span></div>\n" +
    "              <div class=\"hp-time__des\" translate=\"TIME_DES_P1\">in training this week.</div>\n" +
    "              <div class=\"hp-time__des\" translate=\"TIME_DES_P2\">Keep up the good work!</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"hp-block\">\n" +
    "              <div class=\"hp-weeks-time\">\n" +
    "                <ul class=\"l-list l-list--small\">\n" +
    "                  <li class=\"l-list__item hp-weeks-time__item\">\n" +
    "                    <div class=\"l-justified\">\n" +
    "                      <div class=\"l-justified__item hp-weeks-time__spent\">WEEK 33</div>\n" +
    "                      <div class=\"l-justified__item hp-weeks-time__spent\">33 min</div>\n" +
    "                    </div>\n" +
    "                  </li>\n" +
    "                  <li class=\"l-list__item hp-weeks-time__item\">\n" +
    "                    <div class=\"l-justified\">\n" +
    "                      <div class=\"l-justified__item hp-weeks-time__spent\">WEEK 22</div>\n" +
    "                      <div class=\"l-justified__item hp-weeks-time__spent\">22 min</div>\n" +
    "                    </div>\n" +
    "                  </li>\n" +
    "                  <li class=\"l-list__item hp-weeks-time__item\">\n" +
    "                    <div class=\"l-justified\">\n" +
    "                      <div class=\"l-justified__item hp-weeks-time__spent\">WEEK 11</div>\n" +
    "                      <div class=\"l-justified__item hp-weeks-time__spent\">11 min</div>\n" +
    "                    </div>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"hp-time__des\" style=\"display: none;\" translate=\"LET_STARTED\">Laten we van start gaan!</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</header>\n" +
    "");
}]);

angular.module("academy/views/features.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/features.html",
    "<main class=\"page-content\">\n" +
    "  <article>\n" +
    "    <div class=\"content-header content-header--large content-header--bg-features\">\n" +
    "      <div class=\"ch-body\">\n" +
    "        <div class=\"ch-body__text\">\n" +
    "          <h1 class=\"title-primary\" translate=\"FEATURES_TITLE\">What makes us<br><strong>Unique?</strong></h1>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section class=\"content-section content-section--large\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths p8--six-twelfths is-center-aligned\">\n" +
    "            <div class=\"l-block-med\">\n" +
    "              <h1 class=\"title-secondary content-section__title-primary\" translate=\"FEATURES_SECONDARY_TITLE_1\">Recognized top experts</h1>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"content-formatting\">\n" +
    "              <p translate=\"FEATURES_SECONDARY_TITLE_1_DISCRIPTION\">Studytube only works with recognised experts in their fields. They are selected on the basis of their field of expertise, experience, reputation and publications.</p>\n" +
    "              <p><a ui-sref=\"instructors.all\" translate=\"SEE_ALL_EXPERTS\">See all experts</a></p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <div class=\"experts-grid-section\"></div>\n" +
    "\n" +
    "    <section class=\"content-section content-section--large content-section--contrast\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-med only-lt-p8 is-center-aligned\">\n" +
    "              <h1 class=\"title-tertiary content-section__title-primary\">Persoonlijke leerroute</h1>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-stacked l-stacked--large\">\n" +
    "              <div class=\"grid grid--wide\">\n" +
    "                <div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <img src=\"/images/features-img-adaptive-path.jpg\" alt=\"\" class=\"content-section__image\">\n" +
    "                  </div>\n" +
    "                </div><!--\n" +
    "                --><div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <div class=\"l-block-med only-gt-p8\">\n" +
    "                    <h1 class=\"title-tertiary content-section__title-primary\">Persoonlijke leerroute</h1>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"content-formatting\">\n" +
    "                    <p>Trainingen die zijn toegespitst op het individu leveren de hoogste resultaten op. Zodra je een vraag in een training fout beantwoordt krijg je dan ook extra content aangeboden om ervoor te zorgen dat een onderwerp alsnog begrijpt. Daarnaast wordt bij iedere vraag voldoende feedback gegeven.</p>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <div class=\"content-section content-section--large\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <section class=\"l-block-x-large\">\n" +
    "              <div class=\"l-block-med only-lt-p8 is-center-aligned\">\n" +
    "                <h1 class=\"title-tertiary content-section__title-secondary\">Creativiteit & Fun</h1>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid grid--wide grid--rev\">\n" +
    "                  <div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"/images/features-img-creative-and-fun.jpg\" alt=\"\" class=\"content-section__image content-section__image--shadow\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div class=\"l-block-med only-gt-p8\">\n" +
    "                      <h1 class=\"title-tertiary content-section__title-secondary\">Creativiteit & Fun</h1>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"content-formatting\">\n" +
    "                      <p>Een online training moet leuk zijn om te volgen. Daarom bevat iedere training afwisselende werkvormen (video’s, afbeeldingen, tekst, vragen) die interesse wekken en de motivatie verhogen. Ook worden er interessant verhalen en anekdotes gedeeld en veel voorbeelden gegeven.</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </section>\n" +
    "\n" +
    "            <section>\n" +
    "              <div class=\"l-block-med only-lt-p8 is-center-aligned\">\n" +
    "                <h1 class=\"title-tertiary content-section__title-secondary\">Intuïtief design</h1>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid grid--wide\">\n" +
    "                  <div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"/images/features-img-intuitive-design.jpg\" alt=\"\" class=\"content-section__image\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div class=\"l-block-med only-gt-p8\">\n" +
    "                      <h1 class=\"title-tertiary content-section__title-secondary\">Intuïtief design</h1>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"content-formatting\">\n" +
    "                      <p>Het volgen van een training op Studytube voelt als het browsen op je favoriete consumentenwebsite. Het systeem is voor iedereen eenvoudig te gebruiken, zelfs als je nog nooit een online training hebt gevolgd.</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </section>\n" +
    "\n" +
    "            <section class=\"l-block-large\">\n" +
    "              <div class=\"l-block-med only-lt-p8 is-center-aligned\">\n" +
    "                <h1 class=\"title-tertiary content-section__title-secondary\">Competentiegericht online leren</h1>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid grid--wide grid--rev\">\n" +
    "                  <div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"/images/features-img-competency-based-learning.jpg\" alt=\"Competency-based learning\" class=\"content-section__image\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"l-block-med only-gt-p8\">\n" +
    "                        <h1 class=\"title-tertiary content-section__title-secondary\">Competentiegericht online leren</h1>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"content-formatting\">\n" +
    "                        <p>Een training is pas echt een succes als je nieuw gedrag laat zien. Je dient dus niet alleen nieuwe kennis en inzichten te verkrijgen, maar ook je vaardigheden te trainen en je gedrag hier op aan te passen. Alle trainingen zijn er dan ook op gericht dat je ook na afloop je nieuwe vaardigheden in de praktijk blijft toepassen.</p>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </section>\n" +
    "\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked\">\n" +
    "                <div class=\"title-stroked__text\" translate=\"FEATURES_SECONDARY_TITLE_2\">Practical and result-oriented courses</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <section class=\"l-block-x-large\">\n" +
    "              <div class=\"l-block-med only-lt-p8 is-center-aligned\">\n" +
    "                <h1 class=\"title-tertiary content-section__title-secondary\">Trainen van hard skills: Werken aan een eindproduct</h1>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid grid--wide\">\n" +
    "                  <div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"/images/features-img-hard-skills.jpg\" alt=\"\" class=\"content-section__image\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"l-block-med only-gt-p8\">\n" +
    "                        <h1 class=\"title-tertiary content-section__title-secondary\">Trainen van hard skills: Werken aan een eindproduct</h1>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"content-formatting\">\n" +
    "                        <p>Om inhoudelijke vaardigheden je trainen werk je tijdens een training aan een aantal opdrachten die gericht zijn op je eigen afdeling of bedrijf. Deze praktijkopdrachten resulteren uiteindelijk in een eindproduct, zoals een marketingplan, een social media strategie of een verkoopstrategie.</p>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </section>\n" +
    "\n" +
    "            <section>\n" +
    "              <div class=\"l-block-med only-lt-p8 is-center-aligned\">\n" +
    "                <h1 class=\"title-tertiary content-section__title-secondary\">Trainen van soft skills: 'Rollenspel in de cloud'</h1>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid grid--wide grid--rev\">\n" +
    "                  <div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"/images/features-img-roleplaying.jpg\" alt=\"\" class=\"content-section__image content-section__image--shadow\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"l-block-med only-gt-p8\">\n" +
    "                        <h1 class=\"title-tertiary content-section__title-secondary\">Trainen van soft skills: 'Rollenspel in de cloud'</h1>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"content-formatting\">\n" +
    "                        <p>Door de toepassing van interactieve multimedia kun je je soft skills trainen en toetsen. Bij een sales training ga je bijvoorbeeld met behulp van je webcam een gesprek aan met een fictieve klant, waarin je reageert op een bezwaar. Anderen kunnen jou vervolgens hierover feedback geven.</p>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </section>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\" ng-if=\"!getCurrentUser().hasContentLicence\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-list-inline is-center-aligned\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"title-tertiary content-section__title-secondary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                  Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <a ui-sref=\"pricing\" class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "  </article>\n" +
    "</main>");
}]);

angular.module("academy/views/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/footer.html",
    "<footer class=\"page-footer\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"page-footer__block\">\n" +
    "          <div class=\"l-stacked l-stacked--large\">\n" +
    "            <div class=\"grid grid--full\">\n" +
    "              <div class=\"grid__item p10--two-thirds\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <div class=\"l-stacked l-stacked--large\">\n" +
    "                    <div class=\"grid\">\n" +
    "                      <div class=\"grid__item p4--one-third\">\n" +
    "                        <div class=\"l-stacked__item\">\n" +
    "                          <div class=\"pf-menu\">\n" +
    "                            <div class=\"l-block\">\n" +
    "                              <div class=\"pf-menu__title\" translate=\"PAGES\">Pages</div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <ul class=\"l-list l-list--small\">\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item\" ui-sref=\"home\" translate=\"PF_MENU_P1_1\">Home</a></li>\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item\" ui-sref=\"pricing\" translate=\"PF_MENU_P1_2\">Pricing</a></li>\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item\" ui-sref=\"courses.all\" translate=\"PF_MENU_P1_3\">Courses</a></li>\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item\" ui-sref=\"instructors.all\" translate=\"PF_MENU_P1_4\">Faculty</a></li>\n" +
    "                            </ul>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div><!--\n" +
    "                      --><div class=\"grid__item p4--one-third\">\n" +
    "                        <div class=\"l-stacked__item\">\n" +
    "                          <div class=\"pf-menu\">\n" +
    "                            <div class=\"l-block\">\n" +
    "                              <div class=\"pf-menu__title\">Studytube</div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <ul class=\"l-list l-list--small\">\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item\" ui-sref=\"about.company\" translate=\"ABOUT_US\">About us</a></li>\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item\" ui-sref=\"legal.conditions\" translate=\"PF_MENU_P2_1\">Terms & conditions</a></li>\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item\" ui-sref=\"legal.privacy\" translate=\"PF_MENU_P2_3\">Privacy regulations</a></li>\n" +
    "                            </ul>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div><!--\n" +
    "                      --><div class=\"grid__item p4--one-third\">\n" +
    "                        <div class=\"l-stacked__item\">\n" +
    "                          <div class=\"pf-menu\">\n" +
    "                            <div class=\"l-block\">\n" +
    "                              <div class=\"pf-menu__title\" translate=\"CONNECT\">Connect</div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <ul class=\"l-list l-list--small\">\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item\" ui-sref=\"about.contact\" translate=\"CONTACTS\">Contact us</a></li>\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item pf-menu__item--facebook\" href=\"https://www.facebook.com/pages/StudyTube/146297768747662\">Facebook</a></li>\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item pf-menu__item--twitter\" href=\"https://twitter.com/StudyTube\">Twitter</a></li>\n" +
    "                              <li class=\"l-list__item\"><a class=\"pf-menu__item\" href=\"\" ng-href=\"http://studytube.pr.co/\" translate=\"PRESSDOC\">Pressdoc</a></li>\n" +
    "                            </ul>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "                  --><div class=\"grid__item p10--one-third\">\n" +
    "              <div class=\"l-stacked__item\">\n" +
    "                <div class=\"l-stacked l-stacked--small\">\n" +
    "                  <div class=\"grid\">\n" +
    "                    <div class=\"grid__item one-whole p6--one-half p10--one-whole\">\n" +
    "                      <div class=\"l-stacked__item\">\n" +
    "                        <a ui-sref=\"become-expert\" class=\"banner banner--alt\">\n" +
    "                          <div class=\"banner__icon\"><i class=\"icon-wheel-alt\"></i></div>\n" +
    "                          <span translate=\"BECOME_AN_INSTRUCTOR\">Become an instructor</span>\n" +
    "                        </a>\n" +
    "                      </div>\n" +
    "                    </div><!--\n" +
    "                          --><div class=\"grid__item one-whole p6--one-half p10--one-whole\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <a class=\"banner banner--alt\" ng-href=\"{{ organisationsUrl }}\">\n" +
    "                        <div class=\"banner__icon\"><i class=\"icon-case-alt\"></i></div>\n" +
    "                        <span translate=\"FOR_ORGANIZATIONS\">For organizations</span>\n" +
    "                      </a>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"page-footer__block page-footer__block--small is-center-aligned\">\n" +
    "          <div class=\"pf-legal\">\n" +
    "            <ul class=\"l-list-inline\">\n" +
    "              <li class=\"l-list-inline__item\">© Studytube B.V.</li>\n" +
    "              <li class=\"l-list-inline__item\"><span translate=\"KVK\">KVK</span>: 5190901</li>\n" +
    "              <li class=\"l-list-inline__item\"><span translate=\"VAT\">BTW</span>: 8232.14.333.B01</li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</footer>");
}]);

angular.module("academy/views/landing.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/landing.html",
    "<main class=\"page-content\">\n" +
    "  <article>\n" +
    "    <div class=\"landing-header\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths new-positioning-grid\">\n" +
    "            <div class=\"landing-header__content\">\n" +
    "              <div class=\"grid grid--rev\">\n" +
    "                <div class=\"grid__item p8--five-twelfths p10--one-half\">\n" +
    "                  <div class=\"lh-content\">\n" +
    "                    <div class=\"lh-content__text\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <h1 class=\"title-primary\" translate=\"LANDING_TITLE\">Studytube</h1>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <div class=\"title-tertiary\" translate=\"LANDING_TITLE_DESCRIPTION\">Verhoog de performance van werknemers én uw business!</div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <button class=\"button button--primary button--large button--rounded\"\n" +
    "                              popup-modal-opener=\"signup\"\n" +
    "                              ng-if=\"!getCurrentUser()\"\n" +
    "                              translate=\"JOIN_STUDYTUBE\">Join studytube</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div><!--\n" +
    "                --><div class=\"grid__item p8--seven-twelfths p10--one-half\">\n" +
    "                  <img src=\"/images/landing-device.png\" alt=\"\" class=\"landing-header__deviceimg only-gt-p8\">\n" +
    "                  <img src=\"/images/landing-device-mobile.png\" alt=\"\" class=\"landing-header__deviceimg only-lt-p8\">\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section class=\"content-section content-section--contrast\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked title-stroked--alt\">\n" +
    "                <div class=\"title-stroked__text\" translate=\"PRIORITY\">priority</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-large is-center-aligned\">\n" +
    "              <h1 class=\"title-secondary\" translate=\"CONTENT_SECTION_TITLE_SECONDARY\">To provide highest possible online courses</h1>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid\">\n" +
    "                  <div class=\"grid__item p8--one-half is-middle-aligned is-center-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img class=\"content-section__image\" src=\"/images/landing-img-1.jpg\" alt=\"\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p8--one-half is-middle-aligned\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"content-formatting landing-pitch\">\n" +
    "                        <p translate=\"LANDING_PITCH_TEXT\">\n" +
    "                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ullam, cumque ratione amet reprehenderit perspiciatis. Nobis laborum eveniet libero assumenda, maiores adipisci ratione molestiae ipsa architecto tempore minus commodi a.\n" +
    "                        </p>\n" +
    "\n" +
    "                        <ul>\n" +
    "                          <li><a ui-sref=\"features\" translate=\"LANDING_PRIORITY_LIST_1\">Personalized Experience &#8594;</a></li>\n" +
    "                          <li><a ui-sref=\"features\" translate=\"LANDING_PRIORITY_LIST_2\">Result driven learning &#8594;</a></li>\n" +
    "                          <li><a ui-sref=\"features\" translate=\"LANDING_PRIORITY_LIST_3\">Courses from top experts only &#8594;</a></li>\n" +
    "                          <li><a ui-sref=\"features\" translate=\"LANDING_PRIORITY_LIST_4\">Online learning made social and fun &#8594;</a></li>\n" +
    "                          <li><a ui-sref=\"features\" translate=\"LANDING_PRIORITY_LIST_5\">All courses are created with love &#8594;</a></li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"content-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked\">\n" +
    "                <h1 class=\"title-stroked__text\" translate=\"FEATURED_COURSES\">Featured courses</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid\">\n" +
    "                  <div class=\"grid__item p6--one-half p10--one-third\" ng-repeat=\"course in featuredCourses\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <course-item course=\"course\"></course-item>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <a ui-sref=\"courses.all\" class=\"button button--primary button--full\" translate=\"BROWSE_ALL\">Browse all</a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--alt\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked\">\n" +
    "                <h1 class=\"title-stroked__text\" translate=\"TESTIMONIALS\">Testimonials</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-stacked l-stacked--large\">\n" +
    "              <div class=\"grid\">\n" +
    "                <div class=\"grid__item p6--one-half\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div class=\"testimonial\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <div class=\"testimonial__quote\">\n" +
    "                          Alles ziet er heel strak uit en werkt ook heel goed! Ik denk dat het belangrijkste wat je hiermee bereikt hebt is dat je het leren \"leuk\" hebt gemaakt. Alles is zeer interactief gemaakt met mooie visuele plaatjes en video's. Ook fijn is het feit dat je niet meteen alles ziet en daardoor steeds benieuwd bent wat het volgende is. Zo moet leren zijn!\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"tm-user\">\n" +
    "                        <div class=\"l-block\">\n" +
    "                          <a href=\"http://nl.linkedin.com/in/lucderksen\" class=\"tm-user__name\">- Luc Derksen,</a> Eigenaar SuperSelfieStok\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                          <div class=\"l-list-inline__item\">\n" +
    "                            <img src=\"/images/testimonials/luc-derksen.jpg\" alt=\"\" class=\"tm-user__avatar\">\n" +
    "                          </div>\n" +
    "                          <div class=\"l-list-inline__item\">\n" +
    "                            <a href=\"http://nl.linkedin.com/in/lucderksen\"><i class=\"icon-social-linkedin\"></i></a>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div><!--\n" +
    "                --><div class=\"grid__item p6--one-half\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div class=\"testimonial\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <div class=\"testimonial__quote\">\n" +
    "                          Als zelfstandige moet ik een duizendpoot zijn. Veel nieuwe dingen leren en implementeren in korte tijd. De cursussen van Studytube helpen mij mijn bedrijf te laten groeien.\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"tm-user\">\n" +
    "                        <div class=\"l-block\">\n" +
    "                          <a href=\"http://nl.linkedin.com/in/fvdveen\" class=\"tm-user__name\">- Floris van der Feen,</a> CEO Livecom\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                          <div class=\"l-list-inline__item\">\n" +
    "                            <img src=\"/images/testimonials/floris-van-der-veen.jpg\" alt=\"\" class=\"tm-user__avatar\">\n" +
    "                          </div>\n" +
    "                          <div class=\"l-list-inline__item\">\n" +
    "                            <a href=\"http://nl.linkedin.com/in/fvdveen\"><i class=\"icon-social-linkedin\"></i></a>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div><!--\n" +
    "                --><div class=\"grid__item p6--one-half\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div class=\"testimonial\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <div class=\"testimonial__quote\">\n" +
    "                          De trainingen van Studytube zijn creatief en leerzaam. Ik volg inmiddels al m’n vierde training met veel plezier.\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"tm-user\">\n" +
    "                        <div class=\"l-block\">\n" +
    "                          <a href=\"https://www.linkedin.com/pub/robert-trimp/20/22/70a\" class=\"tm-user__name\">- Robert Trimp,</a> Project Manager\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                          <div class=\"l-list-inline__item\">\n" +
    "                            <img src=\"/images/testimonials/robert-trimp.jpg\" alt=\"\" class=\"tm-user__avatar\">\n" +
    "                          </div>\n" +
    "                          <div class=\"l-list-inline__item\">\n" +
    "                            <a href=\"https://www.linkedin.com/pub/robert-trimp/20/22/70a\"><i class=\"icon-social-linkedin\"></i></a>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div><!--\n" +
    "                --><div class=\"grid__item p6--one-half\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div class=\"testimonial\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <div class=\"testimonial__quote\">\n" +
    "                          De kwaliteit van de trainingen is boven mijn verwachting. Gebruiksvriendelijk en erg prettig om mee te werken.\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"tm-user\">\n" +
    "                        <div class=\"l-block\">\n" +
    "                          <a href=\"http://nl.linkedin.com/in/stephanieament\" class=\"tm-user__name\">- Stephanie Ament,</a> PhD Candidate at MUMC\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                          <div class=\"l-list-inline__item\">\n" +
    "                            <img src=\"/images/testimonials/stephanie-ament.jpg\" alt=\"\" class=\"tm-user__avatar\">\n" +
    "                          </div>\n" +
    "                          <div class=\"l-list-inline__item\">\n" +
    "                            <a href=\"http://nl.linkedin.com/in/stephanieament\"><i class=\"icon-social-linkedin\"></i></a>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "\n" +
    "    <aside class=\"content-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked\">\n" +
    "                <h1 class=\"title-stroked__text\" translate=\"STUDYTUBE_IN_MEDIA\">Studytube in media</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"l-stacked\">\n" +
    "                <div class=\"grid\">\n" +
    "                  <div class=\"grid__item is-middle-aligned one-half p2--one-third p4--one-quarter p6--one-fifth\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"https://studytube-assets-production.s3-external-3.amazonaws.com/assets/redesign/home_new/home-media-fd-f8f4fa198546a2b118f4a9bc5ddef59c.png\" class=\"reference-image\" alt=\"\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item is-middle-aligned one-half p2--one-third p4--one-quarter p6--one-fifth\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"https://studytube-assets-production.s3-external-3.amazonaws.com/assets/redesign/home_new/home-media-sprout-63410d4f864d5da094472aff04d0adad.png\" class=\"reference-image\" alt=\"\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item is-middle-aligned one-half p2--one-third p4--one-quarter p6--one-fifth\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"https://studytube-assets-production.s3-external-3.amazonaws.com/assets/redesign/home_new/home-media-nuzakelijk-7f30ef821d9799d30eef029a42a900d7.png\" class=\"reference-image\" alt=\"\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item is-middle-aligned one-half p2--one-third p4--one-quarter p6--one-fifth\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"https://studytube-assets-production.s3-external-3.amazonaws.com/assets/redesign/home_new/home-media-dutchcowboys-74428cf0dea3690b052bcfba4fbbe4bf.png\" class=\"reference-image\" alt=\"\">\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item is-middle-aligned one-half p2--one-third p4--one-quarter p6--one-fifth\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img src=\"https://studytube-assets-production.s3-external-3.amazonaws.com/assets/redesign/home_new/home-media-volkskrant-bdeab655a843f3a4085f82475b893f10.png\" class=\"reference-image\" alt=\"\">\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\" ng-if=\"!getCurrentUser().hasContentLicence\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-list-inline is-center-aligned\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"title-tertiary content-section__title-secondary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                  Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <a ui-sref=\"subscribe\" class=\"button button--primary button--rounded\" translate=\"START_SUBSCRIPTION\">Start subscription</a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "  </article>\n" +
    "</main>");
}]);

angular.module("academy/views/mobile-header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/mobile-header.html",
    "<div id=\"offscreen-box\" class=\"l-offscreen\" ng-class=\"{ 'l-offscreen--open-left': isPopupVisible('library_mobile'), 'l-offscreen--open-right': isPopupVisible('user_mobile') }\">\n" +
    "  <div id=\"offscreen-left-panel\" class=\"l-offscreen__sidebar l-offscreen__sidebar--left\" popup-window=\"library_mobile\">\n" +
    "    <div class=\"offscreen-panel\">\n" +
    "      <div class=\"l-block\">\n" +
    "        <div class=\"l-justified\">\n" +
    "          <div class=\"l-justified__item is-middle-aligned\">\n" +
    "            <div class=\"offscreen-panel__title-primary\" translate=\"NAVIGATION\">Navigation</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-justified__item is-middle-aligned\">\n" +
    "            <button popup-closer=\"library_mobile\" class=\"offscreen-close-button\"><i class=\"icon-cross\"></i>\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"nav-alt\">\n" +
    "        <ul class=\"l-list l-list--small\">\n" +
    "          <li class=\"l-list__item\"><a ui-sref=\"courses.all\" class=\"nav-alt__item\" translate=\"BROWSE\">Library</a></li>\n" +
    "          <li class=\"l-list__item\"><a ui-sref=\"features\" class=\"nav-alt__item\" translate=\"FEATURES\">Features</a></li>\n" +
    "          <li class=\"l-list__item\"><a ui-sref=\"pricing\" class=\"nav-alt__item\" translate=\"PRICING\">Pricing</a></li>\n" +
    "          <li class=\"l-list__item\"><a ui-sref=\"instructors.all\" class=\"nav-alt__item\" translate=\"FACULTY\">Faculty</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"op-banners\">\n" +
    "        <ul class=\"l-list\">\n" +
    "          <li class=\"l-list__item\">\n" +
    "            <a ui-sref=\"become-expert\" class=\"banner banner--alt\">\n" +
    "              <div class=\"banner__icon\"><i class=\"icon-wheel-alt\"></i></div>\n" +
    "              <span translate=\"BECOME_AN_INSTRUCTOR\">Become an instructor</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"l-list__item\">\n" +
    "            <a class=\"banner banner--alt\">\n" +
    "              <div class=\"banner__icon\"><i class=\"icon-case-alt\"></i></div>\n" +
    "              <span translate=\"FOR_ORGANIZATIONS\">For organizations</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div id=\"offscreen-right-panel\" class=\"l-offscreen__sidebar l-offscreen__sidebar--right\" ng-if=\"getCurrentUser()\"\n" +
    "       popup-window=\"user_mobile\">\n" +
    "    <div class=\"offscreen-panel\">\n" +
    "      <div class=\"l-block\">\n" +
    "        <div class=\"l-justified\">\n" +
    "          <div class=\"l-justified__item is-middle-aligned\">\n" +
    "            <div class=\"offscreen-panel__title-primary\" translate=\"USER_MENU\">User menu</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-justified__item is-middle-aligned\">\n" +
    "            <button popup-closer=\"user_mobile\" class=\"offscreen-close-button\"><i class=\"icon-cross\"></i></button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-med\">\n" +
    "        <div class=\"nav-alt\">\n" +
    "          <ul class=\"l-list l-list--small\">\n" +
    "            <li class=\"l-list__item\"><a ui-sref=\"dashboard\" class=\"nav-alt__item\" translate=\"MY_DASHBOARD\">My dashboard</a></li>\n" +
    "            <li class=\"l-list__item\"><a href=\"\" ng-click=\"signOut()\" class=\"nav-alt__item\" translate=\"SIGN_OUT\">Sign\n" +
    "              out</a></li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block\" ng-if=\"getCurrentUser().isExpert\">\n" +
    "        <a ui-sref=\"expert\" class=\"button button--primary button--full\">Administration</a>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- <div class=\"l-block-small\">\n" +
    "        <div class=\"offscreen-panel__title-secondary\" translate=\"SWITCH_ACADEMY\">Switch academy</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"nav-alt\">\n" +
    "        <ul class=\"l-list l-list--small\">\n" +
    "          <li class=\"l-list__item\"><a href=\"\" class=\"nav-alt__item nav-alt__item--active\" translate=\"STUDYTUBE_ACADEMY\">Studytube academy</a></li>\n" +
    "          <li class=\"l-list__item\"><a href=\"\" class=\"nav-alt__item\" translate=\"HVDS_ACADEMY\">HVDS academy</a></li>\n" +
    "        </ul>\n" +
    "      </div> -->\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div id=\"offscreen-overlay\" class=\"l-offscreen__overlay\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<header class=\"page-header\" ng-class=\"{ 'page-header--filled': hasFilledHeader }\">\n" +
    "  <div class=\"l-tricol\">\n" +
    "    <div class=\"l-tricol__mid\">\n" +
    "      <a ui-sref=\"home\"><h1 class=\"page-header__title\">Studytube</h1></a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-tricol__left\">\n" +
    "      <ul class=\"l-list-inline l-list-inline--collapsed ph-menu\">\n" +
    "        <li class=\"l-list-inline__item\">\n" +
    "          <button class=\"ph-menu__item\" id=\"offscreen-left-trigger\" popup-modal-opener=\"library_mobile\"><i class=\"icon-list\"></i></button>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-tricol__right\">\n" +
    "      <div ng-if=\"!getCurrentUser()\">\n" +
    "        <ul class=\"l-list-inline l-list-inline--collapsed ph-menu\">\n" +
    "          <li class=\"l-list-inline__item\"><a href=\"\" class=\"ph-menu__item ph-menu__item--button\" popup-modal-opener=\"login\"><span translate=\"SIGN_IN\">Sign in</span></a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <!--<div class=\"page-header__time\" popup-toggler=\"time\">0 min.</div>-->\n" +
    "\n" +
    "      <button id=\"offscreen-right-trigger\" ng-if=\"getCurrentUser()\" popup-modal-opener=\"user_mobile\">\n" +
    "        <img ng-src=\"{{ getCurrentUser().avatar || '/images/default-avatar.jpg' }}\" alt=\"\" class=\"ph-user\">\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"header-popover header-popover--pivot-time\" popup-window=\"time\" ng-show=\"isPopupVisible('time')\">\n" +
    "    <div class=\"hp-time\">\n" +
    "      <div class=\"hp-time__min\">21</div>\n" +
    "      <div class=\"hp-time__des\">min</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"hp-block\">\n" +
    "      <div class=\"hp-weeks-time\">\n" +
    "        <ul class=\"l-list l-list--small\">\n" +
    "          <li class=\"l-list__item hp-weeks-time__item\">\n" +
    "            <div class=\"l-justified\">\n" +
    "              <div class=\"l-justified__item\">WEEK 33</div>\n" +
    "              <div class=\"l-justified__item\">33 min</div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "          <li class=\"l-list__item hp-weeks-time__item\">\n" +
    "            <div class=\"l-justified\">\n" +
    "              <div class=\"l-justified__item\">WEEK 22</div>\n" +
    "              <div class=\"l-justified__item\">22 min</div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "          <li class=\"l-list__item hp-weeks-time__item\">\n" +
    "            <div class=\"l-justified\">\n" +
    "              <div class=\"l-justified__item\">WEEK 11</div>\n" +
    "              <div class=\"l-justified__item\">11 min</div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</header>\n" +
    "");
}]);

angular.module("academy/views/pricing.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/pricing.html",
    "<main class=\"page-content\">\n" +
    "  <article>\n" +
    "    <div class=\"content-header content-header--large content-header--bg-pricing\">\n" +
    "      <div class=\"ch-body\">\n" +
    "        <div class=\"ch-body__text\">\n" +
    "          <h1 class=\"title-primary\" translate=\"PRICING_TITLE\">Studytube comes in<br><strong>two flavours!</strong></h1>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section class=\"pricing-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-x-large is-center-aligned\">\n" +
    "              <div class=\"l-supplement\">\n" +
    "                <div class=\"l-supplement__main\">\n" +
    "                  <h1 class=\"title-secondary\" translate=\"FLAVOUR_TITLE_1\">All You Can Learn</h1>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-supplement__info\">\n" +
    "                  <div class=\"title-supplement pricing-section__title-supplement\"><span translate=\"FLAVOUR\">Flavour</span> 1</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked title-stroked--alt\">\n" +
    "                <div class=\"title-stroked__text\" translate=\"CS_TITLE_STROKED_TEXT_1\">Access all courses for a small monthly fee</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pricing-plan\">\n" +
    "              <span translate=\"PRICING_PLAN_1\">With “All you can learn” subscription you will get unlimited access to all of our courses.</span>\n" +
    "\n" +
    "              <div class=\"pp-price\">\n" +
    "                <div class=\"l-supplement\">\n" +
    "                  <div class=\"l-supplement__main\">\n" +
    "                    <div class=\"pp-price__main\">€49</div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"l-supplement__info\">\n" +
    "                    <div class=\"pp-price__supplement\" translate=\"PER_MONTH\">per month</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"pricing-plan__extra\" translate=\"PRICING_PLAN_EXTRA\">\n" +
    "                More than $20,000 worth of content\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"content-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked\">\n" +
    "                <h1 class=\"title-stroked__text\" translate=\"CS_TITLE_STROKED_TEXT_2\">What's included</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid grid--center\">\n" +
    "                  <div class=\"grid__item p6--five-twelfths\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"l-block-large\">\n" +
    "                        <div class=\"l-media\">\n" +
    "                          <div class=\"l-media__figure\">\n" +
    "                            <i class=\"icon-book\"></i>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div class=\"l-media__body\">\n" +
    "                            <div class=\"pricing-feature\" translate=\"PRICING_FEATURE_1\">Learn what you want, when you want, from our entire library.</div>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"l-media\">\n" +
    "                        <div class=\"l-media__figure\">\n" +
    "                          <i class=\"icon-calendar\"></i>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-media__body\">\n" +
    "                          <div class=\"pricing-feature\" translate=\"PRICING_FEATURE_2\">New courses are added to our library weekly - so the value of your membership keeps growing</div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p6--five-twelfths push--p6--one-twelfth\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"l-block-med\">\n" +
    "                        <div class=\"pricing-faq\">\n" +
    "                          <div class=\"l-block-small\">\n" +
    "                            <div class=\"pricing-faq__title\" translate=\"PRICING_FAQ_TITLE_1\">How many courses can I take?</div>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div class=\"pricing-faq__body\" translate=\"PRICING_FAQ_BODY_1\">As many as you want! Studytube subscription includes unlimited access to our entire library of courses.</div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"pricing-faq\">\n" +
    "                        <div class=\"l-block-small\">\n" +
    "                          <div class=\"pricing-faq__title\" translate=\"PRICING_FAQ_TITLE_2\">Can I cancel my subscription at any time?</div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"pricing-faq__body\" translate=\"PRICING_FAQ_BODY_2\">Minimum duration of the subscription is a 3 months. After that you can cancel at any time.</div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"is-center-aligned\" ng-if=\"!getCurrentUser().hasContentLicence\">\n" +
    "              <a ui-sref=\"subscribe\" class=\"button button--primary button--rounded\" translate=\"START_SUBSCRIPTION_NOW\">Start subscription now</a>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"content-section content-section--large content-section--contrast\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-x-large is-center-aligned\">\n" +
    "              <div class=\"l-supplement\">\n" +
    "                <div class=\"l-supplement__main\">\n" +
    "                  <h1 class=\"title-secondary\" translate=\"FLAVOUR_TITLE_2\">Pay Per Course</h1>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-supplement__info\">\n" +
    "                  <div class=\"title-supplement content-section__title-supplement\"><span translate=\"FLAVOUR\">Flavour</span> 2</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked title-stroked--alt\">\n" +
    "                <div class=\"title-stroked__text\" translate=\"CS_TITLE_STROKED_TEXT_3\">Lifetime access</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pricing-plan\">\n" +
    "              <span translate=\"PRICING_PLAN_2\">You buy a single course, and get access for the rest of your life.</span>\n" +
    "\n" +
    "              <div class=\"pp-price\">\n" +
    "                <div class=\"l-supplement\">\n" +
    "                  <div class=\"l-supplement__main\">\n" +
    "                    <div class=\"pp-price__main\">€99 - €499</div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"l-supplement__info\">\n" +
    "                    <div class=\"pp-price__supplement\" translate=\"PER_COURSE\">per course</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"is-center-aligned\" ng-if=\"!getCurrentUser()\">\n" +
    "                <button class=\"button button--secondary button--rounded\" popup-modal-opener=\"signup\" translate=\"CREATE_FREE_ACCOUNT\">Create free account</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "  </article>\n" +
    "</main>\n" +
    "\n" +
    "<div ui-view></div>");
}]);

angular.module("academy/views/subscription.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/subscription.html",
    "<div class=\"modal\">\n" +
    "	<div class=\"modal-window\">\n" +
    "		<div class=\"mw-header\">\n" +
    "			<div class=\"l-tricol\">\n" +
    "				<div class=\"l-tricol__right\">\n" +
    "					<button class=\"mw-header__closebutton icon-cross\" ng-click=\"cancel()\"></button>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"l-tricol__mid\">\n" +
    "					<div class=\"mw-header__title\">Subscription</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"modal-window__block\">\n" +
    "			<div class=\"form-buy-course\">\n" +
    "        <div class=\"fbc-section fbc-section--first l-block\">\n" +
    "          <div class=\"l-justified\">\n" +
    "            <div class=\"l-justified__item is-middle-aligned\">\n" +
    "              <div class=\"fbc-section__entry\" translate=\"UNLIMITED_ACCESS\">Unlimited access to all courses</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-justified__item is-middle-aligned\">\n" +
    "              <div class=\"fbc-section__price\">{{ subscription.price | translate }}</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-justified\">\n" +
    "            <div class=\"l-justified__item is-middle-aligned\">\n" +
    "              <span class=\"form__action-primary form__action-primary__alt\">{{ subscription.description | translate }}</span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "				<div>\n" +
    "          <div ng-if=\"!currentUser\">\n" +
    "            <form ng-show=\"!signUpFormIsShown\" name=\"signIn\" class=\"form form--alt form__full form__purchase l-block\">\n" +
    "              <div class=\"fbc-legal fbc-legal__alt fbc-legal__above-text\" translate=\"LOGIN_PLEASE\">Please login to continue</div>\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input name=\"email\"\n" +
    "                         type=\"text\" class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{'input--error': loginFailed}\"\n" +
    "                         ng-model=\"userData.email\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "                  <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_EMAIL\">Invalid email...</span>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input name=\"password\"\n" +
    "                         type=\"password\" class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{'input--error': loginFailed}\"\n" +
    "                         ng-model=\"userData.password\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "                  <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_PASSWORD\">... or password</span>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"is-center-aligned fbc-legal__under-text\">\n" +
    "                <span translate=\"NOT_HAVE_ACCOUNT\">Do not have an account yet?</span>\n" +
    "                <a href=\"\" class=\"form__action-primary\" ng-click=\"toggleSignUpForm()\" translate=\"SIGN_UP\">Sign up</a>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "\n" +
    "            <form ng-show=\"signUpFormIsShown\" name=\"signUp\" class=\"form form--alt form__full form__purchase l-block\">\n" +
    "              <div class=\"fbc-legal fbc-legal__alt fbc-legal__above-text\" translate=\"NEW_USER\">Are you a new user? Create an account</div>\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input type=\"text\"\n" +
    "                         class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{ 'input--error': errors.name }\"\n" +
    "                         ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                         ng-model=\"userData.name\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"USERNAME\">Username</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.name\">{{ errors.name | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input type=\"email\"\n" +
    "                         class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{ 'input--error': errors.email }\"\n" +
    "                         ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                         ng-model=\"userData.email\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.email\">{{ errors.email | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input type=\"password\"\n" +
    "                         class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{ 'input--error': errors.password }\"\n" +
    "                         ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                         ng-model=\"userData.password\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.password\">{{ errors.password | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"is-center-aligned fbc-legal__under-text\">\n" +
    "                <span translate=\"HAVE_AN_ACCOUNT\">Already a member?</span>\n" +
    "                <a href=\"\" class=\"form__action-primary\" translate=\"LOG_IN\" ng-click=\"toggleSignUpForm()\">Log in</a>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "\n" +
    "          <button class=\"button button--primary button--full l-block\" ng-click=\"subscribe()\" translate=\"PROCEED\">Proceed</button>\n" +
    "          <div class=\"fbc-legal fbc-legal__alt\" ng-bind-html=\"'AGREE_TERM_PURCHASING_COURSES' | translate\"></div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("academy/views/thanks.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("academy/views/thanks.html",
    "<main>\n" +
    "  <aside class=\"content-section\">\n" +
    "    <div class=\"l-wrap thanks\">\n" +
    "      <div class=\"grid grid--center\">\n" +
    "        <div class=\"grid__item ten-twelfths\">\n" +
    "          <div class=\"l-list-inline is-center-aligned\">\n" +
    "            <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "              <div class=\"content-section__title-tertiary thanks__title\">\n" +
    "                Hartelijk dank voor uw aanvraag.<br/>We nemen zo spoedig mogelijk contact met u op!\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </aside>\n" +
    "</main>");
}]);

angular.module("auth/views/confirm-password.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/views/confirm-password.html",
    "<main class=\"page-content\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"solo-form solo-form__page\">\n" +
    "          <div class=\"l-block\">\n" +
    "            <div class=\"sf-header\">\n" +
    "              <div class=\"sf-header__title\" translate=\"CONFIRM_PASSWORD_2\">Confirm password</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"solo-form__form\">\n" +
    "            <form class=\"form\" ng-submit=\"submitForm()\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator\">\n" +
    "                  <input type=\"password\" class=\"input input--full\"\n" +
    "                         ng-class=\"{ 'input--error': errors.password }\"\n" +
    "                         ng-model=\"password\"\n" +
    "                         ng-change=\"resetError()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "                  <span class=\"input-decorator__errormsg\" ng-if=\"errors.password\">{{ errors.password[0] | translate }}</span>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator\">\n" +
    "                  <input type=\"password\" class=\"input input--full\"\n" +
    "                         ng-class=\"{ 'input--error': errors.confirmation }\"\n" +
    "                         ng-model=\"confirmation\"\n" +
    "                         ng-change=\"resetError()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PASSWORD_CONFIRMATION\">Password (confirmation)</div>\n" +
    "                  <span class=\"input-decorator__errormsg\" ng-if=\"errors.confirmation\">{{ errors.confirmation[0] | translate }}</span>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-med\">\n" +
    "                <button class=\"button button--primary button--full\" ng-disabled=\"!password || password !== confirmation\" translate=\"CONFIRM_NEW_PASSWORD\">Confirm</button>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</main>\n" +
    "");
}]);

angular.module("auth/views/login-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/views/login-modal.html",
    "<div class=\"modal\">\n" +
    "  <div class=\"modal-window\" popup-window=\"login\">\n" +
    "    <div class=\"mw-header\">\n" +
    "      <div class=\"l-tricol\">\n" +
    "        <div class=\"l-tricol__right\">\n" +
    "          <button class=\"mw-header__closebutton icon-cross\" popup-closer=\"login\"></button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-tricol__mid\">\n" +
    "          <div class=\"mw-header__title\" translate=\"LOG_IN\">Sign in</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-window__block\" ng-controller=\"LoginController\">\n" +
    "      <!-- <div class=\"l-block\">\n" +
    "        <div class=\"grid grid--narrow\">\n" +
    "          <div class=\"grid__item one-half\">\n" +
    "            <button class=\"button-social button-social--facebook\"></button>\n" +
    "          </div>\n" +
    "          <div class=\"grid__item one-half\">\n" +
    "            <button class=\"button-social button-social--twitter\"></button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block\">\n" +
    "        <div class=\"grid grid--narrow\">\n" +
    "          <div class=\"grid__item one-half\">\n" +
    "            <button class=\"button-social button-social--linkedin\"></button>\n" +
    "          </div>\n" +
    "          <div class=\"grid__item one-half\">\n" +
    "            <button class=\"button-social button-social--googleplus\"></button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div> -->\n" +
    "\n" +
    "      <form class=\"form form--alt\" ng-submit=\"login()\">\n" +
    "        <div class=\"l-block-small\">\n" +
    "          <label class=\"input-decorator input-decorator--alt\">\n" +
    "            <input  name=\"email\"\n" +
    "                    type=\"text\" class=\"input input--full input--alt\"\n" +
    "                    ng-class=\"{'input--error': loginFailed}\"\n" +
    "                    ng-model=\"username\"\n" +
    "                    ng-change=\"resetError()\">\n" +
    "            <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "            <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_EMAIL\">Invalid email...</span>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-small\">\n" +
    "          <label class=\"input-decorator input-decorator--alt\">\n" +
    "            <input  name=\"password\"\n" +
    "                    type=\"password\" class=\"input input--full input--alt\"\n" +
    "                    ng-class=\"{'input--error': loginFailed}\"\n" +
    "                    ng-model=\"password\"\n" +
    "                    ng-change=\"resetError()\">\n" +
    "            <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "            <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_PASSWORD\">... or password</span>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-med is-center-aligned\">\n" +
    "          <a ui-sref=\"reset-password\" class=\"form__action-secondary\" translate=\"FORGOT_PASSWORD\">Forgot password?</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-med\">\n" +
    "          <button class=\"button button--primary button--full\" ng-disabled=\"!username || !password\" translate=\"LET_ME_IN\">Let me in</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"is-center-aligned\">\n" +
    "          <span translate=\"NOT_HAVE_ACCOUNT\">Do not have an account yet?</span> <a href=\"\" class=\"form__action-primary\" popup-closer=\"login\" popup-modal-opener=\"signup\"><span translate=\"SIGN_UP\">Sign up</span></a>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("auth/views/login-page.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/views/login-page.html",
    "<main class=\"page-content\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"solo-form\">\n" +
    "          <div class=\"l-block-x-large\">\n" +
    "            <div class=\"sf-header\">\n" +
    "              <div class=\"sf-header__title\" translate=\"LOG_IN\">Log in</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"solo-form__form\" ng-controller=\"LoginController\">\n" +
    "            <!-- <div class=\"l-block\">\n" +
    "              <div class=\"grid grid--narrow\">\n" +
    "                <div class=\"grid__item one-half\">\n" +
    "                  <button class=\"button-social button-social--facebook\"></button>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item one-half\">\n" +
    "                  <button class=\"button-social button-social--twitter\"></button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div> -->\n" +
    "\n" +
    "            <!-- <div class=\"l-block\">\n" +
    "              <div class=\"grid grid--narrow\">\n" +
    "                <div class=\"grid__item one-half\">\n" +
    "                  <button class=\"button-social button-social--linkedin\"></button>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item one-half\">\n" +
    "                  <button class=\"button-social button-social--googleplus\"></button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div> -->\n" +
    "\n" +
    "            <form action=\"\" class=\"form\" ng-submit=\"login()\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator\">\n" +
    "                  <input type=\"text\" class=\"input input--full\"\n" +
    "                         name=\"email\"\n" +
    "                         ng-class=\"{'input--error': loginFailed}\"\n" +
    "                         ng-model=\"username\"\n" +
    "                         ng-change=\"resetError()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "                  <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_EMAIL\">Invalid email...</span>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator\">\n" +
    "                  <input type=\"password\" class=\"input input--full\"\n" +
    "                         name=\"password\"\n" +
    "                         ng-class=\"{'input--error': loginFailed}\"\n" +
    "                         ng-model=\"password\"\n" +
    "                         ng-change=\"resetError()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "                  <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_PASSWORD\">... or password</span>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-med is-center-aligned\">\n" +
    "                <a ui-sref=\"reset-password\" class=\"form__action-secondary\" translate=\"FORGOT_PASSWORD\">Forgot password?</a>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-med\">\n" +
    "                <button class=\"button button--primary button--full\" ng-disabled=\"!username || !password\" translate=\"LET_ME_IN\">Let me in</button>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"is-center-aligned\">\n" +
    "                <span translate=\"NOT_HAVE_ACCOUNT\">Do not have an account yet?</span> <a ui-sref=\"signup\" class=\"form__action-primary\" translate=\"SIGN_UP\">Sign up</a>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</main>");
}]);

angular.module("auth/views/reset-password.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/views/reset-password.html",
    "<main class=\"page-content\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"solo-form solo-form__page\">\n" +
    "          <div class=\"l-block\">\n" +
    "            <div class=\"sf-header\">\n" +
    "              <div class=\"sf-header__title\" translate=\"FORGOT_PASSWORD_2\">Forgot<br/> your password?</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"solo-form__form\">\n" +
    "\n" +
    "            <form class=\"form\" ng-submit=\"submitForm()\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator\">\n" +
    "                  <input type=\"email\" class=\"input input--full\"\n" +
    "                         name=\"email\"\n" +
    "                         ng-class=\"{ 'input--error': errors.email }\"\n" +
    "                         ng-model=\"email\"\n" +
    "                         ng-change=\"resetError()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"EMAIL\">Email</div>\n" +
    "                  <span class=\"input-decorator__errormsg\" ng-if=\"errors.email\">{{ errors.email[0] | translate }}</span>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-med is-center-aligned\">\n" +
    "                <a ui-sref=\"login\" class=\"form__action-secondary\" translate=\"SIGN_IN\">Sign in</a>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-med\">\n" +
    "                <button class=\"button button--primary button--full\" ng-disabled=\"!email\" translate=\"SEND_RESET_LINK\">Send reset link</button>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</main>\n" +
    "");
}]);

angular.module("auth/views/signup-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/views/signup-modal.html",
    "<div class=\"modal\">\n" +
    "  <div class=\"modal-window\" popup-window=\"signup\">\n" +
    "    <div class=\"mw-header\">\n" +
    "      <div class=\"l-tricol\">\n" +
    "        <div class=\"l-tricol__right\">\n" +
    "          <button class=\"mw-header__closebutton icon-cross\" popup-closer=\"signup\"></button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-tricol__mid\">\n" +
    "          <div class=\"mw-header__title\" translate=\"SIGN_UP\">Sign up</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-window__block\" ng-controller=\"SignupController\">\n" +
    "      <!-- <div class=\"l-block\">\n" +
    "        <div class=\"grid grid--narrow\">\n" +
    "          <div class=\"grid__item one-half\">\n" +
    "            <button class=\"button-social button-social--facebook\"></button>\n" +
    "          </div>\n" +
    "          <div class=\"grid__item one-half\">\n" +
    "            <button class=\"button-social button-social--twitter\"></button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div> -->\n" +
    "\n" +
    "      <!-- <div class=\"l-block\">\n" +
    "        <div class=\"grid grid--narrow\">\n" +
    "          <div class=\"grid__item one-half\">\n" +
    "            <button class=\"button-social button-social--linkedin\"></button>\n" +
    "          </div>\n" +
    "          <div class=\"grid__item one-half\">\n" +
    "            <button class=\"button-social button-social--googleplus\"></button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div> -->\n" +
    "\n" +
    "      <form action=\"\"\n" +
    "            class=\"form form--alt\"\n" +
    "            ng-submit=\"submitForm()\">\n" +
    "        <div class=\"l-block-small\">\n" +
    "          <label class=\"input-decorator input-decorator--alt\">\n" +
    "            <input type=\"text\"\n" +
    "                   class=\"input input--full input--alt\"\n" +
    "                   ng-class=\"{ 'input--error': errors.name }\"\n" +
    "                   ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                   ng-model=\"userData.name\"\n" +
    "                   ng-change=\"resetErrors()\">\n" +
    "            <div class=\"input-decorator__label\" translate=\"USERNAME\">Username</div>\n" +
    "            <div class=\"input-decorator__errormsg\" ng-if=\"errors.name\">{{ errors.name | translate }}</div>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-small\">\n" +
    "          <label class=\"input-decorator input-decorator--alt\">\n" +
    "            <input type=\"email\"\n" +
    "                   class=\"input input--full input--alt\"\n" +
    "                   ng-class=\"{ 'input--error': errors.email }\"\n" +
    "                   ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                   ng-model=\"userData.email\"\n" +
    "                   ng-change=\"resetErrors()\">\n" +
    "            <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "            <div class=\"input-decorator__errormsg\" ng-if=\"errors.email\">{{ errors.email | translate }}</div>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-small\">\n" +
    "          <label class=\"input-decorator input-decorator--alt\">\n" +
    "            <input type=\"password\"\n" +
    "                   class=\"input input--full input--alt\"\n" +
    "                   ng-class=\"{ 'input--error': errors.password }\"\n" +
    "                   ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                   ng-model=\"userData.password\"\n" +
    "                   ng-change=\"resetErrors()\">\n" +
    "            <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "            <div class=\"input-decorator__errormsg\" ng-if=\"errors.password\">{{ errors.password | translate }}</div>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-large\">\n" +
    "          <label class=\"input-decorator input-decorator--alt\">\n" +
    "            <input type=\"password\"\n" +
    "                   class=\"input input--full input--alt\"\n" +
    "                   ng-class=\"{ 'input--error': errors.passwordConfirmation }\"\n" +
    "                   ng-disabled=\"formStatus === 'waiting'\"\n" +
    "                   ng-model=\"userData.passwordConfirmation\"\n" +
    "                   ng-change=\"resetErrors()\">\n" +
    "            <div class=\"input-decorator__label\" translate=\"PASSWORD_CONFIRMATION\" ng-if=\"!errors.passwordConfirmation || 17 > errors.passwordConfirmation.length\">Password (confirmation)</div>\n" +
    "            <div class=\"input-decorator__errormsg\" ng-if=\"errors.passwordConfirmation\">{{ errors.passwordConfirmation | translate }}</div>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-med\">\n" +
    "          <button class=\"button button--primary button--full\" ng-disabled=\"formStatus == 'waiting'\">\n" +
    "            <span ng-if=\"formStatus != 'waiting'\" translate=\"CREATE_ACCOUNT\">Create an account</span>\n" +
    "            <span ng-if=\"formStatus == 'waiting'\" translate=\"PROCESSING\">Processing...</span>\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"is-center-aligned\">\n" +
    "          <span translate=\"HAVE_AN_ACCOUNT\">Already a member?</span>\n" +
    "          <a href=\"\" class=\"form__action-primary\" popup-modal-opener=\"login\" popup-closer=\"signup\" translate=\"LOG_IN\">Log in</a>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("auth/views/signup-page.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/views/signup-page.html",
    "<main class=\"page-content\">\n" +
    "  <div class=\"l-wrap\">\n" +
    "    <div class=\"grid grid--center\">\n" +
    "      <div class=\"grid__item ten-twelfths\">\n" +
    "        <div class=\"solo-form\">\n" +
    "          <div class=\"l-block-x-large\">\n" +
    "            <div class=\"sf-header\">\n" +
    "              <div class=\"sf-header__title\" translate=\"SIGN_UP\">Sign up</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"solo-form__form\">\n" +
    "            <!-- <div class=\"l-block\">\n" +
    "              <div class=\"grid grid--narrow\">\n" +
    "                <div class=\"grid__item one-half\">\n" +
    "                  <button class=\"button-social button-social--facebook\"></button>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item one-half\">\n" +
    "                  <button class=\"button-social button-social--twitter\"></button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div> -->\n" +
    "\n" +
    "            <!-- <div class=\"l-block\">\n" +
    "              <div class=\"grid grid--narrow\">\n" +
    "                <div class=\"grid__item one-half\">\n" +
    "                  <button class=\"button-social button-social--linkedin\"></button>\n" +
    "                </div>\n" +
    "                <div class=\"grid__item one-half\">\n" +
    "                  <button class=\"button-social button-social--googleplus\"></button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div> -->\n" +
    "\n" +
    "            <form action=\"\"\n" +
    "                  class=\"form\"\n" +
    "                  ng-submit=\"submitForm()\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator\">\n" +
    "                  <input type=\"text\"\n" +
    "                         class=\"input input--full\"\n" +
    "                         ng-class=\"{ 'input--error': errors.name }\"\n" +
    "                         ng-disabled=\"formStatus === 'waiting'\"\n" +
    "                         ng-model=\"userData.name\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"USERNAME\">Username</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.name\">{{ errors.name | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator\">\n" +
    "                  <input type=\"email\"\n" +
    "                         class=\"input input--full\"\n" +
    "                         ng-class=\"{ 'input--error': errors.email }\"\n" +
    "                         ng-disabled=\"formStatus === 'waiting'\"\n" +
    "                         ng-model=\"userData.email\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.email\">{{ errors.email | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator\">\n" +
    "                  <input type=\"password\"\n" +
    "                         class=\"input input--full\"\n" +
    "                         ng-class=\"{ 'input--error': errors.password }\"\n" +
    "                         ng-disabled=\"formStatus === 'waiting'\"\n" +
    "                         ng-model=\"userData.password\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.password\">{{ errors.password | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-large\">\n" +
    "                <label class=\"input-decorator\">\n" +
    "                  <input type=\"password\"\n" +
    "                         class=\"input input--full\"\n" +
    "                         ng-class=\"{ 'input--error': errors.passwordConfirmation }\"\n" +
    "                         ng-disabled=\"formStatus === 'waiting'\"\n" +
    "                         ng-model=\"userData.passwordConfirmation\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PASSWORD_CONFIRMATION\" ng-if=\"!errors.passwordConfirmation || 17 > errors.passwordConfirmation.length\">Password (confirmation)</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.passwordConfirmation\">{{ errors.passwordConfirmation | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-med\">\n" +
    "                <button class=\"button button--primary button--full\" ng-disabled=\"formStatus === 'waiting'\">\n" +
    "                  <span ng-if=\"formStatus !== 'waiting'\" translate=\"CREATE_ACCOUNT\">Create an account</span>\n" +
    "                  <span ng-if=\"formStatus === 'waiting'\" translate=\"PROCESSING\">Processing...</span>\n" +
    "                </button>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"is-center-aligned\">\n" +
    "                <span translate=\"HAVE_AN_ACCOUNT\">Already a member?</span>\n" +
    "                <a ui-sref=\"login\" class=\"form__action-primary\" translate=\"LOG_IN\">Log in</a>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</main>");
}]);

angular.module("courses/views/buy-course.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("courses/views/buy-course.html",
    "<div class=\"modal\" ng-if=\"order\">\n" +
    "  <div class=\"modal-window\">\n" +
    "    <div class=\"mw-header\">\n" +
    "      <div class=\"l-tricol\">\n" +
    "        <div class=\"l-tricol__right\">\n" +
    "          <button class=\"mw-header__closebutton icon-cross\" ng-click=\"cancel()\"></button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-tricol__mid\">\n" +
    "          <div class=\"mw-header__title\" translate=\"CONFIRM_PURCHASE\">Confirm purchase</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-window__block\">\n" +
    "      <div class=\"form-buy-course\">\n" +
    "        <div class=\"fbc-section fbc-section--first\" ng-class=\"{ 'l-block': !currentUser }\">\n" +
    "          <div class=\"l-justified\">\n" +
    "            <div class=\"l-justified__item is-middle-aligned\">\n" +
    "              <div class=\"fbc-section__entry\">{{ course.name }}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-justified__item is-middle-aligned\">\n" +
    "              <div ng-if=\"!currentUser\" class=\"fbc-section__price\">{{ order.total | currencyFormat:2 }}</div>\n" +
    "              <div ng-if=\"currentUser\" class=\"fbc-section__price\">{{ course.price | currencyFormat:2 }}</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-justified\" ng-show=\"!coupon.formState || coupon.formState == 'error'\">\n" +
    "            <div class=\"l-justified__item is-middle-aligned\">\n" +
    "              <a href=\"\" class=\"form__action-primary\" ng-click=\"coupon.formState = 'shown'\"><span translate=\"REDEEM_COUPON\">Redeem a coupon</span></a>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-justified__item is-middle-aligned\" ng-show=\"coupon.formState == 'error'\">\n" +
    "              <div class=\"fbc-section__coupon-failure\" translate=\"INVALID_CODE\">Invalid coupon code</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div ng-show=\"coupon.formState == 'shown' || coupon.formState == 'waiting'\">\n" +
    "            <form action=\"\" ng-submit=\"applyCoupon()\">\n" +
    "              <div class=\"l-justified\">\n" +
    "                <div class=\"l-justified__item is-middle-aligned\">\n" +
    "                  <input  type=\"text\"\n" +
    "                          class=\"input input--alt\"\n" +
    "                          size=\"31\"\n" +
    "                          placeholder=\"Enter your discount coupon code\"\n" +
    "                          ng-disabled=\"coupon.formState == 'waiting'\"\n" +
    "                          ng-model=\"coupon.code\">\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-justified__item is-middle-aligned\">\n" +
    "                  <button class=\"form__action-primary\"\n" +
    "                          ng-disabled=\"coupon.formState == 'waiting'\" translate=\"APPLY_CODE\">Apply code</button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"fbc-section__coupon-success\" ng-show=\"coupon.formState == 'success'\" translate=\"COUPON_ACTIVATED\">Coupon code successfully activated</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"currentUser\">\n" +
    "          <div class=\"fbc-section l-block-large\">\n" +
    "            <div ng-if=\"order.total\" class=\"l-block-small\">\n" +
    "              <div class=\"l-justified\">\n" +
    "                <div class=\"l-justified__item is-middle-aligned\">\n" +
    "                  <div class=\"fbc-section__entry\" translate=\"SUBTOTAL\">Subtotal</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-justified__item is-middle-aligned\">\n" +
    "                  <div class=\"fbc-section__price\">{{ order.total - order.vat | currencyFormat:2 }}</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"order.total\" class=\"l-block-small\">\n" +
    "              <div class=\"l-justified\">\n" +
    "                <div class=\"l-justified__item is-middle-aligned\">\n" +
    "                  <div class=\"fbc-section__entry\" translate=\"VAT\">VAT</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-justified__item is-middle-aligned\">\n" +
    "                  <div class=\"fbc-section__price\">{{ order.vat | currencyFormat:2 }}</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-justified fbc-section__highlight\">\n" +
    "              <div class=\"l-justified__item is-middle-aligned\">\n" +
    "                <div class=\"fbc-section__entry\" translate=\"TOTAL\">Total</div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-justified__item is-middle-aligned\">\n" +
    "                <div class=\"fbc-section__price\">{{ order.total | currencyFormat:2 }}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"!currentUser\">\n" +
    "          <form ng-show=\"!signUpFormIsShown\" name=\"signIn\" class=\"form form--alt  form__full form__purchase l-block\">\n" +
    "            <div class=\"fbc-legal fbc-legal__alt fbc-legal__above-text\" translate=\"LOGIN_PLEASE\">Please login to continue</div>\n" +
    "            <div class=\"l-block-small\">\n" +
    "              <label class=\"input-decorator input-decorator--alt\">\n" +
    "                <input name=\"email\"\n" +
    "                       type=\"text\" class=\"input input--full input--alt\"\n" +
    "                       ng-class=\"{'input--error': loginFailed}\"\n" +
    "                       ng-model=\"userData.email\">\n" +
    "\n" +
    "                <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "                <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_EMAIL\">Invalid email...</span>\n" +
    "              </label>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-small\">\n" +
    "              <label class=\"input-decorator input-decorator--alt\">\n" +
    "                <input name=\"password\"\n" +
    "                       type=\"password\" class=\"input input--full input--alt\"\n" +
    "                       ng-class=\"{'input--error': loginFailed}\"\n" +
    "                       ng-model=\"userData.password\">\n" +
    "\n" +
    "                <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "                <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_PASSWORD\">... or password</span>\n" +
    "              </label>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"is-center-aligned fbc-legal__under-text\">\n" +
    "              <span translate=\"NOT_HAVE_ACCOUNT\">Do not have an account yet?</span>\n" +
    "              <a href=\"\" class=\"form__action-primary\" ng-click=\"toggleSignUpForm()\" translate=\"SIGN_UP\">Sign up</a>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "\n" +
    "          <form ng-show=\"signUpFormIsShown\" name=\"signUp\" class=\"form form--alt form__full form__purchase l-block\">\n" +
    "            <div class=\"fbc-legal fbc-legal__alt fbc-legal__above-text\" translate=\"NEW_USER\">Are you a new user? Create an account</div>\n" +
    "            <div class=\"l-block-small\">\n" +
    "              <label class=\"input-decorator input-decorator--alt\">\n" +
    "                <input type=\"text\"\n" +
    "                       class=\"input input--full input--alt\"\n" +
    "                       ng-class=\"{ 'input--error': errors.name }\"\n" +
    "                       ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                       ng-model=\"userData.name\"\n" +
    "                       ng-change=\"resetErrors()\">\n" +
    "\n" +
    "                <div class=\"input-decorator__label\" translate=\"USERNAME\">Username</div>\n" +
    "                <div class=\"input-decorator__errormsg\" ng-if=\"errors.name\">{{ errors.name | translate }}</div>\n" +
    "              </label>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-small\">\n" +
    "              <label class=\"input-decorator input-decorator--alt\">\n" +
    "                <input type=\"email\"\n" +
    "                       class=\"input input--full input--alt\"\n" +
    "                       ng-class=\"{ 'input--error': errors.email }\"\n" +
    "                       ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                       ng-model=\"userData.email\"\n" +
    "                       ng-change=\"resetErrors()\">\n" +
    "\n" +
    "                <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "                <div class=\"input-decorator__errormsg\" ng-if=\"errors.email\">{{ errors.email | translate }}</div>\n" +
    "              </label>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-small\">\n" +
    "              <label class=\"input-decorator input-decorator--alt\">\n" +
    "                <input type=\"password\"\n" +
    "                       class=\"input input--full input--alt\"\n" +
    "                       ng-class=\"{ 'input--error': errors.password }\"\n" +
    "                       ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                       ng-model=\"userData.password\"\n" +
    "                       ng-change=\"resetErrors()\">\n" +
    "\n" +
    "                <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "                <div class=\"input-decorator__errormsg\" ng-if=\"errors.password\">{{ errors.password | translate }}</div>\n" +
    "              </label>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"is-center-aligned fbc-legal__under-text\">\n" +
    "              <span translate=\"HAVE_AN_ACCOUNT\">Already a member?</span>\n" +
    "              <a href=\"\" class=\"form__action-primary\" translate=\"LOG_IN\" ng-click=\"toggleSignUpForm()\">Log in</a>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "\n" +
    "        <button ng-if=\"order.total\" class=\"button button--primary button--full l-block\" ng-click=\"proceedToPayment()\" translate=\"PROCEED\">Proceed</button>\n" +
    "        <button ng-if=\"!order.total\" class=\"button button--primary button--full\" ng-click=\"addCourseWithDiscount()\" translate=\"ADD_COURSE\">Add</button>\n" +
    "        <div class=\"fbc-legal fbc-legal__alt\" ng-bind-html=\"'AGREE_TERM_PURCHASING_COURSES' | translate\"></div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("courses/views/course-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("courses/views/course-item.html",
    "<a ng-href=\"{{ courseLink }}\" class=\"course-tile\">\n" +
    "  <section>\n" +
    "    <div class=\"course-tile__coverimg\">\n" +
    "      <img ng-src=\"{{course.isAnnounced?'/images/courses-tile-comingsoon.png':course.image}}\"/>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"course-tile__block-top\">\n" +
    "      <div class=\"l-block-small\">\n" +
    "        <h1 class=\"course-tile__name\">\n" +
    "          {{ course.name }}\n" +
    "        </h1>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"course-tile__company\">{{ course.companyName }}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"course-tile__block-bottom\">\n" +
    "      <div class=\"l-split\">\n" +
    "        <div class=\"l-split__right is-middle-aligned\" ng-if=\"!course.isAnnounced\">\n" +
    "          <div class=\"course-tile__price\" ng-if=\"!alreadyBought()\">{{ course.price | currencyFormat }}</div>\n" +
    "          <div class=\"course-tile__price\" ng-if=\"alreadyBought()\">{{ progress }}%</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-split__left is-middle-aligned\" ng-if=\"course.instructors.length > 0\">\n" +
    "          <div class=\"ct-instructor\">\n" +
    "            <div class=\"ct-instructor__name\">{{ course.instructors[0].name }}</div>\n" +
    "            <div class=\"ct-instructor__role\">{{ course.instructors[0].role || 'Studytube expert' }}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</a>\n" +
    "");
}]);

angular.module("courses/views/course-preview.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("courses/views/course-preview.html",
    "<div class=\"modal\" >\n" +
    "  <div class=\"modal-window\">\n" +
    "    <div class=\"mw-header\">\n" +
    "      <div class=\"l-tricol\">\n" +
    "        <div class=\"l-tricol__right\">\n" +
    "          <button class=\"mw-header__closebutton icon-cross\" popup-closer=\"course_preview\"></button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-tricol__mid\">\n" +
    "          <div class=\"mw-header__title only-gt-p8\" translate=\"COURSE_PREVIEW\">Course preview</div>\n" +
    "          <div class=\"mw-header__title only-lt-p8\" translate=\"COURSE_PREVIEW_MOBILE\">Course preview</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-window__block\">\n" +
    "      <div class=\"l-block\">\n" +
    "        <div class=\"fbc-legal fbc-legal__alt fbc-legal__above-text preview-form__text-before\">\n" +
    "          <span style=\"display: inline;\" translate=\"PREVIEW_TEXT_P1\" translate-values=\"{{ topicToPreview }}\">We offer you the topic {{ subject }} from course </span>\n" +
    "          <span style=\"display: inline;\" translate=\"PREVIEW_TEXT_P2\" translate-values=\"{{ course }}\">{{ name }} for free! Please create an account to continue</span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"l-list-inline\">\n" +
    "        <div class=\"l-list-inline__item preview-form__item\">\n" +
    "          <div class=\"form\">\n" +
    "            <form ng-show=\"!signUpFormIsShown\" name=\"signIn\" class=\"form form--alt  form__full form__purchase l-block\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input name=\"email\"\n" +
    "                         type=\"text\" class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{'input--error': loginFailed}\"\n" +
    "                         ng-model=\"userData.email\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "                  <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_EMAIL\">Invalid email...</span>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input name=\"password\"\n" +
    "                         type=\"password\" class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{'input--error': loginFailed}\"\n" +
    "                         ng-model=\"userData.password\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "                  <span class=\"input-decorator__errormsg\" ng-if=\"loginFailed\" translate=\"INVALID_PASSWORD\">... or password</span>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"is-center-aligned fbc-legal__under-text\">\n" +
    "                <span translate=\"NOT_HAVE_ACCOUNT\">Do not have an account yet?</span>\n" +
    "                <a href=\"\" class=\"form__action-primary\" ng-click=\"toggleSignUpForm()\" translate=\"SIGN_UP\">Sign up</a>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "\n" +
    "            <form ng-show=\"signUpFormIsShown\" name=\"signUp\" class=\"form form--alt form__full form__purchase l-block\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input type=\"text\"\n" +
    "                         class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{ 'input--error': errors.name }\"\n" +
    "                         ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                         ng-model=\"userData.name\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"USERNAME\">Username</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.name\">{{ errors.name | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input type=\"email\"\n" +
    "                         class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{ 'input--error': errors.email }\"\n" +
    "                         ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                         ng-model=\"userData.email\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.email\">{{ errors.email | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <label class=\"input-decorator input-decorator--alt\">\n" +
    "                  <input type=\"password\"\n" +
    "                         class=\"input input--full input--alt\"\n" +
    "                         ng-class=\"{ 'input--error': errors.password }\"\n" +
    "                         ng-disabled=\"formStatus == 'waiting'\"\n" +
    "                         ng-model=\"userData.password\"\n" +
    "                         ng-change=\"resetErrors()\">\n" +
    "\n" +
    "                  <div class=\"input-decorator__label\" translate=\"PASSWORD\">Password</div>\n" +
    "                  <div class=\"input-decorator__errormsg\" ng-if=\"errors.password\">{{ errors.password | translate }}</div>\n" +
    "                </label>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"is-center-aligned fbc-legal__under-text\">\n" +
    "                <span translate=\"HAVE_AN_ACCOUNT\">Already a member?</span>\n" +
    "                <a href=\"\" class=\"form__action-primary\" translate=\"LOG_IN\" ng-click=\"toggleSignUpForm()\">Log in</a>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "\n" +
    "            <button class=\"button button--primary button--full l-block\" ng-click=\"proceedToPreview()\" translate=\"PREVIEW\">Preview</button>\n" +
    "          </div>\n" +
    "        </div><!--\n" +
    "        --><div class=\"l-list-inline__item preview-form__item only-gt-p8\">\n" +
    "        <a href=\"\" class=\"course-tile\">\n" +
    "          <section>\n" +
    "            <div class=\"course-tile__coverimg\">\n" +
    "              <img ng-src=\"{{course.image}}\"/>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"course-tile__block-top\">\n" +
    "              <div class=\"l-block-small\">\n" +
    "                <h1 class=\"course-tile__name\">\n" +
    "                  {{ course.name }}\n" +
    "                </h1>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"course-tile__company\">{{ course.companyName }}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"course-tile__block-bottom\">\n" +
    "              <div class=\"l-split\">\n" +
    "                <div class=\"l-split__right is-middle-aligned\">\n" +
    "                  <div class=\"course-tile__price\">{{ course.price | currencyFormat }}</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-split__left is-middle-aligned\" ng-if=\"course.instructors.length > 0\">\n" +
    "                  <div class=\"ct-instructor\">\n" +
    "                    <div class=\"ct-instructor__name\">{{ course.instructors[0].name }}</div>\n" +
    "                    <div class=\"ct-instructor__role\">{{ course.instructors[0].role || 'Studytube expert' }}</div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </section>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      </div>\n" +
    "      <div class=\"fbc-legal fbc-legal__alt preview-form__text-before\" ng-bind-html=\"'AGREE_TERM_PURCHASING_COURSES' | translate\">Door op Afrekenen te klikken ga je akkoord met de Algemene Voorwaarden.</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("courses/views/course.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("courses/views/course.html",
    "<main class=\"page-content\" ng-if=\"course\">\n" +
    "  <article>\n" +
    "    <div class=\"content-section-with-cover\">\n" +
    "      <div class=\"content-section-with-cover__coverimg\" style=\"background-image: url('{{ course.image }}');\"></div>\n" +
    "\n" +
    "      <div class=\"content-section-with-cover__content content-section-with-cover__content--small\">\n" +
    "        <div class=\"l-wrap\">\n" +
    "          <div class=\"grid grid--center\">\n" +
    "            <div class=\"grid__item ten-twelfths\">\n" +
    "              <div class=\"breadcrumbs breadcrumbs--alt\">\n" +
    "                <ul class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "                  <li class=\"l-list-inline__item\">\n" +
    "                    <a ui-sref=\"home\" class=\"breadcrumbs__item\" translate=\"HOME\">home</a>\n" +
    "                  </li><!--\n" +
    "                  --><li class=\"l-list-inline__item\">\n" +
    "                    <a ui-sref=\"courses.all\" class=\"breadcrumbs__item\" ng-class=\"{'breadcrumbs__item--last': !course.categories.length}\" translate=\"LIBRARY\">library</a>\n" +
    "                  </li><!--\n" +
    "                  --><li class=\"l-list-inline__item\" ng-if=\"course.categories.length\">\n" +
    "                    <a ui-sref=\"courses.category({ categoryId: course.categoriesInfo[0].id, categoryName:course.categoriesSlug })\" class=\"breadcrumbs__item breadcrumbs__item--last\">{{course.categoriesInfo[0].name}}</a>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block\">\n" +
    "                <div class=\"course-info\">\n" +
    "                  <div class=\"course-info__block\">\n" +
    "                    <div class=\"l-stacked\">\n" +
    "                      <div class=\"grid\">\n" +
    "                        <div class=\"grid__item p8--eight-twelfths lt-p8-center-aligned\">\n" +
    "                          <div class=\"l-stacked__item\">\n" +
    "                            <h1 class=\"title-primary\">{{ course.name }}</h1>\n" +
    "\n" +
    "                            <!--<div class=\"l-list-inline l-list-inline--small\">-->\n" +
    "                              <!--<div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>-->\n" +
    "                              <!--<div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>-->\n" +
    "                              <!--<div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>-->\n" +
    "                              <!--<div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>-->\n" +
    "                              <!--<div class=\"l-list-inline__item\"><i class=\"icon-star-small icon-star-small--inactive\"></i></div>-->\n" +
    "                            <!--</div>-->\n" +
    "                          </div>\n" +
    "                        </div><!--\n" +
    "                        --><div class=\"grid__item p8--four-twelfths is-center-aligned\" ng-if=\"course.introVideo\">\n" +
    "                          <div class=\"l-stacked__item\">\n" +
    "                            <button class=\"button course-info__videobutton button--rounded button--large\" popup-modal-opener=\"course_intro_video\"><span translate=\"PLAY_VIDEO\">Play video</span></button>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"course-info__block course-info__block--last\">\n" +
    "                    <div class=\"l-stacked l-stacked--large\">\n" +
    "                      <div class=\"grid\">\n" +
    "                        <div class=\"grid__item p6--one-half p8--eight-twelfths\">\n" +
    "                          <div class=\"l-stacked__item\">\n" +
    "                            <section class=\"content-formatting course-info__pitch\" ng-bind-html=\"course.objectives\"></section>\n" +
    "                          </div>\n" +
    "                        </div><!--\n" +
    "                        --><div class=\"grid__item p6--one-half p8--four-twelfths\">\n" +
    "                          <div class=\"l-stacked__item\">\n" +
    "                            <div class=\"course-sidebar\">\n" +
    "                              <div class=\"l-block-med\">\n" +
    "                                <ul class=\"l-list\">\n" +
    "                                  <li class=\"l-list__item\">\n" +
    "                                    <div class=\"l-list-inline\">\n" +
    "                                      <div class=\"l-list-inline__item\"><i class=\"icon-course-lock\"></i></div>\n" +
    "                                      <div class=\"l-list-inline__item\"><div class=\"course-info__stat\" translate=\"LIFETIME_ACCESS\">Lifetime access</div></div>\n" +
    "                                    </div>\n" +
    "                                  </li>\n" +
    "                                  <li class=\"l-list__item\">\n" +
    "                                    <div class=\"l-list-inline\">\n" +
    "                                      <div class=\"l-list-inline__item\"><i class=\"icon-course-clock\"></i></div>\n" +
    "                                      <div class=\"l-list-inline__item\"><div class=\"course-info__stat\">{{ course && getCourseDuration(course) }}</div></div>\n" +
    "                                    </div>\n" +
    "                                  </li>\n" +
    "                                  <li class=\"l-list__item\">\n" +
    "                                    <div class=\"l-list-inline\">\n" +
    "                                      <div class=\"l-list-inline__item\"><i class=\"icon-course-user\"></i></div>\n" +
    "                                      <div class=\"l-list-inline__item\"><div class=\"course-info__stat\">{{ course.totalUsersCount }} <span translate=\"USERS\">users</span></div></div>\n" +
    "                                    </div>\n" +
    "                                  </li>\n" +
    "                                  <!--<li class=\"l-list__item\">-->\n" +
    "                                    <!--<div class=\"l-list-inline\">-->\n" +
    "                                      <!--<div class=\"l-list-inline__item\"><i class=\"icon-course-chat\"></i></div>-->\n" +
    "                                      <!--<div class=\"l-list-inline__item\"><button class=\"course-info__stat link\">23 reviews</button></div>-->\n" +
    "                                    <!--</div>-->\n" +
    "                                  <!--</li>-->\n" +
    "                                </ul>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <button ng-if=\"isCoursePurchased()\" disabled class=\"button button--primary button--full\" translate=\"COURSE_INSTALLED\">Installed</button>\n" +
    "                              <button ng-if=\"!isCoursePurchased() && canAdd()\" class=\"button button--primary button--full\" ng-click=\"addCourse()\" translate=\"ADD_COURSE\">Add</button>\n" +
    "                              <button ng-if=\"!isCoursePurchased() && !canAdd()\" class=\"button button--primary button--full\" ng-click=\"buyCourse()\"><span translate=\"BUY_FOR\">Buy for</span> {{ course.price | currencyFormat }}</button>\n" +
    "                            </div>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"content-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"l-stacked l-stacked--large\">\n" +
    "            <div class=\"grid__item ten-twelfths\">\n" +
    "              <div class=\"grid grid--rev\">\n" +
    "                <div class=\"grid__item p8--four-twelfths\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div class=\"course-sidebar\">\n" +
    "                      <aside class=\"l-block-large\">\n" +
    "                        <div class=\"l-block\">\n" +
    "                          <div class=\"title-stroked\">\n" +
    "                            <h1 class=\"title-stroked__text\" translate=\"COURSES_ITEM_TITLE_1\">Instructors</h1>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-stacked l-stacked--large\">\n" +
    "                          <div class=\"grid grid--center\">\n" +
    "                            <div class=\"grid__item p6--one-half p8--one-whole\" ng-repeat=\"instructor in course.instructors\">\n" +
    "                              <div class=\"l-stacked__item\">\n" +
    "                                <a  ui-sref=\"instructor({ instructorId : instructor.id, instructorName: instructor.nameSlug })\"\n" +
    "                                    class=\"user-tile\">\n" +
    "                                  <section>\n" +
    "                                    <img ng-src=\"{{ instructor.avatar }}\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "                                    <div class=\"ut-content-with-cover\">\n" +
    "                                      <h1 class=\"ut-content__name\">{{ instructor.name }}</h1>\n" +
    "                                      <h1 class=\"ut-content__role\">{{ instructor.role || 'Studytube expert' }}</h1>\n" +
    "                                      <div class=\"ut-content-with-cover__coverimg\" style=\"background-image: url('{{ instructor.avatar }}');\"></div>\n" +
    "                                    </div>\n" +
    "                                  </section>\n" +
    "                                </a>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </aside>\n" +
    "\n" +
    "                      <aside>\n" +
    "                        <div class=\"l-block-large\">\n" +
    "                          <div class=\"title-stroked\">\n" +
    "                            <h1 class=\"title-stroked__text\">Support</h1>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"course-consultant\">\n" +
    "                          <div class=\"l-block\">\n" +
    "                            <div class=\"title-tertiary course-consultant__title\">Heb je een vraag?</div>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div class=\"l-block\">\n" +
    "                            Neem contact op met de verantwoordelijke elearning consultant voor deze training\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div class=\"l-block-med\">\n" +
    "                            <div class=\"cc-profile\">\n" +
    "                              <div class=\"l-block-small\">\n" +
    "                                <div class=\"l-media\">\n" +
    "                                  <div class=\"l-media__figure\">\n" +
    "                                    <img ng-src=\"{{ course.consultants[0].avatar }}\" alt=\"\" class=\"cc-profile__avatar\">\n" +
    "                                  </div>\n" +
    "\n" +
    "                                  <div class=\"l-media__body\">\n" +
    "                                    <div class=\"cc-profile__name\">{{ course.consultants[0].name }}</div>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <ul class=\"l-list l-list--collapsed\">\n" +
    "                                <!--<li class=\"l-list__item\">(060) 273-2312</li>-->\n" +
    "                                <li class=\"l-list__item\"><a href=\"\">{{ course.consultants[0].email }}</a></li>\n" +
    "                              </ul>\n" +
    "                            </div>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div class=\"l-block-small\">\n" +
    "                            <button class=\"button button--primary button--full\" ng-click=\"getCallback()\" translate=\"GET_CALLBACK\">Get a call back</button>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <button class=\"button button--secondary button--full\" ng-if=\"course.hasBrochure\" ng-click=\"getCourseBrochure()\" translate=\"GET_BROCHURE\">Get brochure</button>\n" +
    "                        </div>\n" +
    "                      </aside>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div><!--\n" +
    "                --><div class=\"grid__item p8--eight-twelfths\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <section class=\"l-block-large\">\n" +
    "                      <div class=\"l-block-large\">\n" +
    "                        <div class=\"title-stroked\">\n" +
    "                          <h1 class=\"title-stroked__text\" translate=\"COURSES_ITEM_TITLE_2\">About course</h1>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <div class=\"course-description\" ng-class=\"{'course-description--expanded': fullDescriptionIsShown}\">\n" +
    "                          <div class=\"content-formatting\" ng-bind-html=\"course.description | html\"></div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <button ng-hide=\"fullDescriptionIsShown\" class=\"button button--tertiary button--full\" ng-click=\"showFullDescription()\" translate=\"SHOW_FULL_TEXT\">Show full text</button>\n" +
    "                    </section>\n" +
    "\n" +
    "                    <section>\n" +
    "                      <div class=\"l-block-large\">\n" +
    "                        <div class=\"title-stroked\">\n" +
    "                          <h1 class=\"title-stroked__text\" translate=\"COURSES_ITEM_TITLE_3\">Curriculum</h1>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"l-list l-list--med\">\n" +
    "                        <div class=\"l-list__item\" ng-repeat=\"module in course.modules\">\n" +
    "                          <section class=\"course-module\">\n" +
    "                            <div class=\"l-block\">\n" +
    "                              <h1 class=\"course-module__name\">{{ module.name }}</h1>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <ul class=\"l-list l-list--small\">\n" +
    "                              <li class=\"l-list__item\" ng-repeat=\"topic in module.topics\">\n" +
    "                                <div class=\"cm-topic\">\n" +
    "                                  <div class=\"l-media l-media--rev\">\n" +
    "                                    <div class=\"l-media__figure\">\n" +
    "                                      <div class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "                                        <div class=\"l-list-inline__item only-gt-p6\" ng-show=\"topic.free\">\n" +
    "                                          <a href ng-click=\"previewTopic(topic)\" class=\"cm-topic__freesample\">preview</a>\n" +
    "                                        </div>\n" +
    "\n" +
    "                                        <div class=\"l-list-inline__item\">\n" +
    "                                          <div class=\"cm-topic__duration\">{{ topic.duration }}</div>\n" +
    "                                        </div>\n" +
    "                                      </div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"l-media__body\">\n" +
    "                                      <a href ng-click=\"previewTopic(topic)\" class=\"cm-topic__name link\" ng-if=\"topic.free\">{{ topic.subject }}</a>\n" +
    "                                      <div class=\"cm-topic__name\" ng-if=\"!topic.free\">{{ topic.subject }}</div>\n" +
    "                                    </div>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </li>\n" +
    "                            </ul>\n" +
    "                          </section>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </section>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked title-stroked--alt\">\n" +
    "                <h1 class=\"title-stroked__text\" translate=\"COURSES_ITEM_TITLE_4\">Similar courses</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid\">\n" +
    "                  <div  class=\"grid__item\"\n" +
    "                        ng-class=\"{ 'p6--one-half': similarCourses.length > 1,\n" +
    "                                    'p10--one-third': similarCourses.length > 2 }\"\n" +
    "                        ng-repeat=\"course in similarCourses\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <course-item course=\"course\"></course-item>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-list-inline is-center-aligned\" ng-if=\"!getCurrentUser().hasContentLicence\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"title-tertiary content-section__title-secondary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                  Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <a href=\"\" class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "  </article>\n" +
    "\n" +
    "</main>\n" +
    "\n" +
    "<div ui-view ng-cloak></div>\n" +
    "\n" +
    "<course-intro-video-modal ng-if=\"course.introVideo\" ng-show=\"isPopupVisible('course_intro_video')\" ng-cloak></course-intro-video-modal>\n" +
    "<course-preview-modal ng-show=\"isPopupVisible('course_preview')\" popup-window=\"course_preview\"></course-preview-modal>\n" +
    "");
}]);

angular.module("courses/views/courses.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("courses/views/courses.html",
    "<main class=\"page-content\">\n" +
    "  <div class=\"content-header content-header--bg-library\" ng-if=\"!getCurrentUser().hasContentLicence\">\n" +
    "    <div class=\"ch-body\">\n" +
    "      <div class=\"bow only-gt-p6\"></div>\n" +
    "      <div class=\"ch-body__text\">\n" +
    "        <div class=\"l-block-med\">\n" +
    "          <div class=\"title-tertiary\">Krijg nu tot <strong>41% korting</strong> met onze Decemberactie!</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--<div class=\"l-list-inline__item is-middle-aligned\" ng-if=\"getCurrentUser()\">-->\n" +
    "          <!--<button class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</button>-->\n" +
    "        <!--</div>-->\n" +
    "\n" +
    "        <!--<a ng-if=\"!getCurrentUser()\" href=\"\" class=\"button button--primary button--large button--rounded\"-->\n" +
    "           <!--translate=\"JOIN_STUDYTUBE_NOW\" ng-click=\"startSubscription()\">Join Studytube now</a>-->\n" +
    "        <div class=\"l-list-inline__item is-middle-aligned\" ng-if=\"getCurrentUser()\">\n" +
    "          <a class=\"button button--primary button--rounded\" ui-sref=\"december\">Bekijk de Decemberactie</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <a ng-if=\"!getCurrentUser()\" ui-sref=\"december\" class=\"button button--primary button--large button--rounded\">Bekijk de Decemberactie</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <article>\n" +
    "    <div class=\"content-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths p10--eleven-twelfths\">\n" +
    "            <div class=\"l-stacked l-stacked--large\">\n" +
    "              <div class=\"grid\">\n" +
    "                <div class=\"grid__item p8--three-tenths p10--one-quarter\">\n" +
    "                  <aside class=\"l-stacked__item\">\n" +
    "                    <div class=\"only-gt-p8\">\n" +
    "                      <div class=\"l-block-large\">\n" +
    "                        <div class=\"title-stroked\">\n" +
    "                          <h1 class=\"title-stroked__text\" translate=\"BY_CATEGORY_COURSES\">By category</h1>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"nav l-block-large\">\n" +
    "                        <ul class=\"l-list l-list--small\">\n" +
    "                          <li class=\"l-list__item\"><a ui-sref=\"courses.all\" class=\"nav__item\" ng-class=\"{'nav__item--active': !currentCategory }\" translate=\"HP_NAV_ITEM_1\">All courses</a></li>\n" +
    "                          <li class=\"l-list__item\" ng-repeat=\"category in categories\">\n" +
    "                            <a ui-sref=\".category({ categoryId: category.id, categoryName: category.nameSlug })\" class=\"nav__item\" ng-class=\"{'nav__item--active': currentCategory === category }\">{{category.name}}</a>\n" +
    "                          </li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"l-stacked__item\">\n" +
    "                        <div class=\"l-stacked l-stacked--small\">\n" +
    "                          <div class=\"grid\">\n" +
    "                            <div class=\"grid__item one-whole\">\n" +
    "                              <div class=\"l-stacked__item\">\n" +
    "                                <a ui-sref=\"become-expert\" class=\"banner banner--alt banner--alt__alt banner--alt__small\">\n" +
    "                                  <div class=\"banner__icon\"><i class=\"icon-wheel-alt icon-wheel-alt__alt\"></i></div>\n" +
    "                                  <span translate=\"BECOME_AN_INSTRUCTOR\">Become an instructor</span>\n" +
    "                                </a>\n" +
    "                              </div>\n" +
    "                            </div><!--\n" +
    "                          --><div class=\"grid__item one-whole\">\n" +
    "                            <div class=\"l-stacked__item\">\n" +
    "                              <a class=\"banner banner--alt banner--alt__alt\" ng-href=\"{{ organisationsUrl }}\">\n" +
    "                                <div class=\"banner__icon\"><i class=\"icon-case-alt icon-case-alt__alt\"></i></div>\n" +
    "                                <span translate=\"FOR_ORGANIZATIONS\">For organizations</span>\n" +
    "                              </a>\n" +
    "                            </div>\n" +
    "                          </div>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"only-lt-p8\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <select class=\"input-select input--full\" name=\"\" id=\"\"\n" +
    "                                ng-model=\"currentCategory\"\n" +
    "                                ng-options=\"category.name for category in categories\"\n" +
    "                                ng-change=\"selectCategory(currentCategory)\">\n" +
    "                          <option value=\"\" translate=\"HP_NAV_ITEM_1\">All courses</option>\n" +
    "                        </select>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <form>\n" +
    "                        <input type=\"text\" class=\"input-search\" size=\"30\" placeholder=\"{{ 'FIND_COURSE' | translate }}\"\n" +
    "                               ng-model=\"coursesSearch.query\"\n" +
    "                               on-enter=\"searchCourses()\">\n" +
    "                      </form>\n" +
    "                    </div>\n" +
    "                  </aside>\n" +
    "                </div><!--\n" +
    "                --><div class=\"grid__item p8--seven-tenths p10--three-quarters\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div ui-view></div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\" ng-if=\"!getCurrentUser().hasContentLicence\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-list-inline is-center-aligned\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"title-tertiary content-section__title-secondary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                  Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <button class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "  </article>\n" +
    "</main>\n" +
    "");
}]);

angular.module("courses/views/get-brochure.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("courses/views/get-brochure.html",
    "<div class=\"modal\">\n" +
    "  <div class=\"modal-window\">\n" +
    "    <div class=\"mw-header\">\n" +
    "      <div class=\"l-tricol\">\n" +
    "        <div class=\"l-tricol__right\">\n" +
    "          <button class=\"mw-header__closebutton icon-cross\" ng-click=\"cancel()\"></button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-tricol__mid\">\n" +
    "          <div class=\"mw-header__title\" translate=\"GET_BROCHURE\">Get brochure</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-window__block\">\n" +
    "      <div class=\"form-buy-course\">\n" +
    "\n" +
    "        <form   action=\"\"\n" +
    "                ng-submit=\"requestBrochure()\">\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"text\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.name }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.name\"\n" +
    "                      ng-change=\"resetErrors('name')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"NAME\">Name</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.name\">{{ errors.name }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"text\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.phone }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.phone\"\n" +
    "                      ng-change=\"resetErrors('phone')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"PHONE_NUMBER\">Phone number</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.phone\">{{ errors.phone }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"email\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.email }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.email\"\n" +
    "                      ng-change=\"resetErrors('email')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.email\">{{ errors.email }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"text\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.company }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.company\"\n" +
    "                      ng-change=\"resetErrors('company')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"COMPANY\">Company</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.company\">{{ errors.company }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"text\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.role }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.role\"\n" +
    "                      ng-change=\"resetErrors('role')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"YOUR_ROLE\">Role</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.role\">{{ errors.role }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <button class=\"button button--primary button--full\" ng-disabled=\"formState == 'waiting'\">\n" +
    "            <span ng-if=\"formState != 'waiting'\" translate=\"GET_FREE_BROCHURE\">Get free brochure</span>\n" +
    "            <span ng-if=\"formState == 'waiting'\" translate=\"PROCESSING\">Processing...</span>\n" +
    "          </button>\n" +
    "        </form>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("courses/views/get-callback.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("courses/views/get-callback.html",
    "<div class=\"modal\">\n" +
    "  <div class=\"modal-window\">\n" +
    "    <div class=\"mw-header\">\n" +
    "      <div class=\"l-tricol\">\n" +
    "        <div class=\"l-tricol__right\">\n" +
    "          <button class=\"mw-header__closebutton icon-cross\" ng-click=\"cancel()\"></button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-tricol__mid\">\n" +
    "          <div class=\"mw-header__title\" translate=\"GET_CALLBACK\">Get a call back</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-window__block\">\n" +
    "      <div class=\"form-buy-course\">\n" +
    "\n" +
    "        <form   action=\"\"\n" +
    "                ng-submit=\"requestCallback()\">\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"text\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.name }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.name\"\n" +
    "                      ng-change=\"resetErrors('name')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"NAME\">Name</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.name\">{{ errors.name }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"text\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.phone }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.phone\"\n" +
    "                      ng-change=\"resetErrors('phone')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"PHONE_NUMBER\">Phone number</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.phone\">{{ errors.phone }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"email\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.email }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.email\"\n" +
    "                      ng-change=\"resetErrors('email')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.email\">{{ errors.email }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"text\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.companyName }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.companyName\"\n" +
    "                      ng-change=\"resetErrors('companyName')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"COMPANY\">Company</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.companyName\">{{ errors.companyName }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <input  type=\"text\"\n" +
    "                      class=\"input input--full input--alt\"\n" +
    "                      ng-class=\"{ 'input--error': errors.role }\"\n" +
    "                      ng-disabled=\"formState == 'waiting'\"\n" +
    "                      ng-model=\"requestData.role\"\n" +
    "                      ng-change=\"resetErrors('role')\">\n" +
    "              <div class=\"input-decorator__label\" translate=\"EXPERTIZE\">Expertise</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.role\">{{ errors.role }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <label class=\"input-decorator input-decorator--alt\">\n" +
    "              <textarea id=\"\" cols=\"30\" rows=\"5\" class=\"input input--full input--alt\"\n" +
    "                        name=\"question\"\n" +
    "                        ng-class=\"{'input--error': errors.question }\"\n" +
    "                        ng-model=\"requestData.question\"\n" +
    "                        ng-change=\"resetErrors('question')\"></textarea>\n" +
    "              <div class=\"input-decorator__label\" translate=\"QUESTION\">Question</div>\n" +
    "              <div class=\"input-decorator__errormsg\" ng-if=\"errors.question\">{{ errors.question }}</div>\n" +
    "            </label>\n" +
    "          </div>\n" +
    "\n" +
    "\n" +
    "          <button class=\"button button--primary button--full\" ng-disabled=\"formState == 'waiting'\">\n" +
    "            <span ng-if=\"formState != 'waiting'\" translate=\"GET_CALLBACK\">Get callback</span>\n" +
    "            <span ng-if=\"formState == 'waiting'\" translate=\"PROCESSING\">Processing...</span>\n" +
    "          </button>\n" +
    "        </form>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("courses/views/intro-video-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("courses/views/intro-video-modal.html",
    "<div class=\"modal modal--alt\">\n" +
    "  <div class=\"modal-video\" popup-window=\"course_intro_video\">\n" +
    "    <div class=\"responsive-embed\">\n" +
    "      <iframe class=\"responsive-embed__video\" ng-src=\"{{ videoUrl }}\" width=\"800\" height=\"450\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n" +
    "    </div>\n" +
    "\n" +
    "    <button class=\"modal-video__closebutton\" popup-closer=\"course_intro_video\"><i class=\"icon-cross\"></i></button>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("courses/views/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("courses/views/list.html",
    "<div class=\"l-block-large only-gt-p8\">\n" +
    "  <div class=\"l-justified\">\n" +
    "    <div class=\"l-justified__item\">\n" +
    "      <h1 class=\"title-secondary content-section__title-primary\" ng-if=\"currentCategory\">{{ currentCategory.name }}</h1>\n" +
    "      <h1 class=\"title-secondary content-section__title-primary\" ng-if=\"!currentCategory\" translate=\"HP_NAV_ITEM_1\">All courses</h1>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-justified__item\">\n" +
    "      <form>\n" +
    "        <input type=\"text\" class=\"input-search\" size=\"30\" placeholder=\"{{ 'FIND_COURSE' | translate }}\"\n" +
    "               ng-model=\"coursesSearch.query\"\n" +
    "               on-enter=\"searchCourses()\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"l-block-large\">\n" +
    "  <div class=\"l-stacked l-stacked--normal\">\n" +
    "    <div class=\"grid grid--narrow browse-tiles\">\n" +
    "      <div class=\"grid__item p6--one-half p10--one-third\" ng-repeat=\"course in courses\">\n" +
    "        <div class=\"l-stacked__item\">\n" +
    "          <course-item course=\"course\"></course-item>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"no-courses-placeholder\" ng-if=\"!courses.length\">\n" +
    "  <div class=\"l-block-small\">\n" +
    "    <img src=\"/images/afbeelding.jpg\" alt=\"\"/>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("instructors/views/instructor-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("instructors/views/instructor-item.html",
    "<a  ui-sref=\"instructor({ instructorId : instructor.id, instructorName: instructor.nameSlug })\"\n" +
    "    class=\"user-tile\">\n" +
    "  <section>\n" +
    "    <img ng-src=\"{{ instructor.avatar }}\" alt=\"\" class=\"user-tile__avatar\">\n" +
    "\n" +
    "    <div class=\"ut-content-with-cover\">\n" +
    "      <h1 class=\"ut-content__name\">{{ instructor.name }}</h1>\n" +
    "      <div class=\"ut-content__role\">{{ instructor.role || 'Studytube expert' }}</div>\n" +
    "      <div class=\"ut-content-with-cover__coverimg\" style=\"background-image: url('{{ instructor.avatar }}');\"></div>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</a>");
}]);

angular.module("instructors/views/instructor.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("instructors/views/instructor.html",
    "<main class=\"page-content\">\n" +
    "  <article>\n" +
    "    <div class=\"content-section content-section--small\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"breadcrumbs\">\n" +
    "                <ul class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "                  <li class=\"l-list-inline__item\">\n" +
    "                    <a ui-sref=\"home\" class=\"breadcrumbs__item\" translate=\"HOME\">home</a>\n" +
    "                  </li><!--\n" +
    "                  --><li class=\"l-list-inline__item\">\n" +
    "                    <a ui-sref=\"instructors.all\" class=\"breadcrumbs__item breadcrumbs__item--last\" translate=\"FACULTY\">faculty</a>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"profile\">\n" +
    "              <aside class=\"profile__aside\">\n" +
    "                <div class=\"l-block-lt-p6 l-block-small-gt-p6\">\n" +
    "                  <div class=\"p-image\">\n" +
    "                    <img ng-src=\"{{ instructor.avatar }}\" alt=\"\" class=\"p-image__avatar\">\n" +
    "\n" +
    "                    <button class=\"p-image__videolink\" ng-if=\"instructor.introVideo\" popup-modal-opener=\"instructor_intro_video\"><i class=\"icon-play\"></i></button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </aside>\n" +
    "\n" +
    "              <div class=\"l-block profile__description profile__description--centered\">\n" +
    "                <h1 class=\"title-primary content-section__title-primary\">{{ instructor.name }}</h1>\n" +
    "              </div>\n" +
    "\n" +
    "              <aside class=\"l-block-large profile__aside\">\n" +
    "                <div class=\"l-block-lt-p6 l-block-large-gt-p6\">\n" +
    "                  <div class=\"p-contacts\">\n" +
    "                    <ul class=\"l-justified\">\n" +
    "                      <li class=\"l-justified__item\" ng-if=\"instructor.facebookUrl\"><a ng-href=\"{{ instructor.facebookUrl }}\" class=\"p-contacts__item\"><i class=\"icon-social-facebook\"></i></a></li>\n" +
    "                      <li class=\"l-justified__item\" ng-if=\"instructor.twitterUrl\"><a ng-href=\"{{ instructor.twitterUrl }}\" class=\"p-contacts__item p-contacts__item--pushed\"><i class=\"icon-social-twitter\"></i></a></li>\n" +
    "                      <li class=\"l-justified__item\" ng-if=\"instructor.linkedinUrl\"><a ng-href=\"{{ instructor.linkedinUrl }}\" class=\"p-contacts__item p-contacts__item--pushed\"><i class=\"icon-social-linkedin\"></i></a></li>\n" +
    "                      <li class=\"l-justified__item\" ng-if=\"instructor.websiteUrl\"><a ng-href=\"{{ instructor.websiteUrl }}\" class=\"p-contacts__item\"><i class=\"icon-social-website\"></i></a></li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!--<div class=\"p-reviews\">-->\n" +
    "                  <!--<div class=\"l-block-small\">-->\n" +
    "                    <!--<ul class=\"l-justified\">-->\n" +
    "                      <!--<li class=\"l-justified__item\"><i class=\"icon-star\"></i></li>-->\n" +
    "                      <!--<li class=\"l-justified__item\"><i class=\"icon-star\"></i></li>-->\n" +
    "                      <!--<li class=\"l-justified__item\"><i class=\"icon-star\"></i></li>-->\n" +
    "                      <!--<li class=\"l-justified__item\"><i class=\"icon-star\"></i></li>-->\n" +
    "                      <!--<li class=\"l-justified__item\"><i class=\"icon-star icon-star--inactive\"></i></li>-->\n" +
    "                    <!--</ul>-->\n" +
    "                  <!--</div>-->\n" +
    "\n" +
    "                  <!--<a class=\"link\">14 reviews</a>-->\n" +
    "                <!--</div>-->\n" +
    "              </aside>\n" +
    "\n" +
    "              <div class=\"l-block-large\">\n" +
    "                <div class=\"profile__description\">\n" +
    "                  <section class=\"l-block-med\">\n" +
    "                    <div class=\"l-block\">\n" +
    "                      <div class=\"title-stroked\">\n" +
    "                        <h1 class=\"title-stroked__text\" translate=\"COURSES_ITEM_TITLE_2\">About</h1>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"l-block-med\">\n" +
    "                      <div class=\"content-formatting\" ng-bind-html=\"instructor.about\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <ul class=\"l-list-inline l-list-inline--small\" ng-if=\"instructor.expertises.length\">\n" +
    "                      <li class=\"l-list-inline__item\" ng-repeat=\"expertise in instructor.expertises\"><div class=\"tag\">{{ expertise.text }}</div></li>\n" +
    "                    </ul>\n" +
    "                  </section>\n" +
    "\n" +
    "                  <section class=\"l-block-gt-p6\" ng-if=\"instructor.publications.length\">\n" +
    "                    <div class=\"l-block-med\">\n" +
    "                      <div class=\"title-stroked\">\n" +
    "                        <h1 class=\"title-stroked__text\" translate=\"INSTRUCTOR_TITLE_SECONDARY_1\">Publications</h1>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"l-stacked\">\n" +
    "                      <div class=\"grid\">\n" +
    "                        <div class=\"grid__item p10--one-half\" ng-repeat=\"publication in instructor.publications\">\n" +
    "                          <div class=\"l-stacked__item\">\n" +
    "                            <section class=\"publication\">\n" +
    "                              <div class=\"l-media\">\n" +
    "                                <div class=\"l-media__figure\">\n" +
    "                                  <div class=\"pub-cover\">\n" +
    "                                    <img ng-src=\"{{ publication.image }}\" alt=\"\" class=\"pub-cover__image\">\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"l-media__body\">\n" +
    "                                  <h1 class=\"publication__name\">{{ publication.title }}</h1>\n" +
    "                                  <a target=\"_blank\" ng-href=\"{{ publication.link }}\" class=\"publication__source\"><span class=\"link\" translate=\"SEE_SOURCE\">See source</span> &#8594;</a>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "                            </section>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </section>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\" ng-if=\"!getCurrentUser().hasContentLicence\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-list-inline is-center-aligned\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"title-tertiary content-section__title-secondary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                  Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <button class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "\n" +
    "    <div class=\"content-section\">\n" +
    "      <section class=\"l-block-large\" ng-if=\"instructor.teaching.length\">\n" +
    "        <div class=\"l-wrap\">\n" +
    "          <div class=\"grid grid--center\">\n" +
    "            <div class=\"grid__item ten-twelfths\">\n" +
    "              <div class=\"l-block-large\">\n" +
    "                <div class=\"title-stroked\">\n" +
    "                  <h1 class=\"title-stroked__text\" translate=\"INSTRUCTOR_TITLE_SECONDARY_2\">Teaching</h1>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-stacked l-stacked--large\">\n" +
    "                <div class=\"grid\">\n" +
    "                  <div  class=\"grid__item\"\n" +
    "                        ng-class=\"{ 'p6--one-half':   instructor.teaching.length > 1,\n" +
    "                                    'p10--one-third': instructor.teaching.length > 2  }\"\n" +
    "                        ng-repeat=\"course in instructor.courses\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <course-item course=\"course\"></course-item>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </section>\n" +
    "\n" +
    "      <section ng-if=\"instructor.references.length\">\n" +
    "        <div class=\"l-wrap\">\n" +
    "          <div class=\"grid grid--center\">\n" +
    "            <div class=\"grid__item ten-twelfths\">\n" +
    "              <div class=\"l-block-large\">\n" +
    "                <div class=\"title-stroked\">\n" +
    "                  <h1 class=\"title-stroked__text\" translate=\"INSTRUCTOR_TITLE_SECONDARY_3\">References</h1>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-stacked\">\n" +
    "                <div class=\"grid\">\n" +
    "                  <div class=\"grid__item is-middle-aligned one-half p2--one-third p4--one-quarter p6--one-fifth\" ng-repeat=\"reference in instructor.references\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img ng-src=\"{{ reference.image }}\" alt=\"\">\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </section>\n" +
    "    </div>\n" +
    "\n" +
    "    <section class=\"content-section content-section--alt\" ng-if=\"instructor.testimonials.length\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked\">\n" +
    "                <h1 class=\"title-stroked__text\" translate=\"INSTRUCTOR_TITLE_SECONDARY_4\">Testimonials</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-stacked l-stacked--large\">\n" +
    "              <div class=\"grid\">\n" +
    "                <div class=\"grid__item p6--one-half\" ng-repeat=\"testimonial in instructor.testimonials\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div class=\"testimonial\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <div class=\"testimonial__quote\">\n" +
    "                          {{ testimonial.text }}\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"tm-user\">\n" +
    "                        <div class=\"l-block\">\n" +
    "                          <a href=\"\" class=\"tm-user__name\">- {{ testimonial.name }},</a> {{ testimonial.function }}\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                          <div class=\"l-list-inline__item\" ng-if=\"testimonial.image\">\n" +
    "                            <img ng-src=\"{{ testimonial.image }}\" alt=\"\" class=\"tm-user__avatar\">\n" +
    "                          </div>\n" +
    "                          <div class=\"l-list-inline__item\" ng-if=\"testimonial.linkedinUrl\">\n" +
    "                            <a ng-href=\"{{ testimonial.linkedinUrl }}\"><i class=\"icon-social-linkedin\"></i></a>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"content-section\" ng-show=\"messageIsSent\">\n" +
    "      <div class=\"cs-placeholder\">\n" +
    "        <div class=\"l-block-large\">\n" +
    "          <div class=\"cs-placeholder__title\" translate=\"CONTACT_MESSAGE_SENT\">Message has been sent! Thank you!</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"content-section\" ng-show=\"!messageIsSent\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-x-large\">\n" +
    "              <div class=\"title-stroked\">\n" +
    "                <h1 class=\"title-stroked__text\" translate=\"INSTRUCTOR_TITLE_SECONDARY_5\">Want a customized learning for your organization</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <form action=\"\" name=\"contactForm\" ng-submit=\"contactForm.$valid && sendMessage(contact)\">\n" +
    "              <div class=\"l-stacked\">\n" +
    "                <div class=\"grid grid--center\">\n" +
    "                  <div class=\"grid__item p8--one-half\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"l-block-small\">\n" +
    "                        <label class=\"input-decorator\">\n" +
    "                          <input class=\"input input--full\" type=\"text\"\n" +
    "                                 name=\"companyName\" required\n" +
    "                                 ng-class=\"{'input--error': contactForm.companyName.$invalid && contactForm.companyName.$dirty }\"\n" +
    "                                 ng-model=\"contact.companyName\">\n" +
    "                          <div class=\"input-decorator__label\" translate=\"COMPANY_NAME\">Company name</div>\n" +
    "                          <div class=\"input-decorator__errormsg\" translate=\"CANNOT_EMPTY\"\n" +
    "                               ng-if=\"contactForm.companyName.$dirty && contact.companyName.length === 0\">Cannot be empty</div>\n" +
    "                        </label>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"l-block-small\">\n" +
    "                        <label class=\"input-decorator\">\n" +
    "                          <input class=\"input input--full\" type=\"text\"\n" +
    "                                 name=\"name\" required\n" +
    "                                 ng-class=\"{'input--error': contactForm.name.$invalid && contactForm.name.$dirty }\"\n" +
    "                                 ng-model=\"contact.name\">\n" +
    "                          <div class=\"input-decorator__label\" translate=\"YOUR_NAME\">Your name</div>\n" +
    "                          <div class=\"input-decorator__errormsg\" translate=\"CANNOT_EMPTY\"\n" +
    "                               ng-if=\"contactForm.name.$dirty && contact.name.length === 0\">Cannot be empty</div>\n" +
    "                        </label>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"l-block-small\">\n" +
    "                        <label class=\"input-decorator\">\n" +
    "                          <input class=\"input input--full\" type=\"text\"\n" +
    "                                 name=\"role\" required\n" +
    "                                 ng-class=\"{'input--error': contactForm.role.$invalid && contactForm.role.$dirty }\"\n" +
    "                                 ng-model=\"contact.role\">\n" +
    "                          <div class=\"input-decorator__label\" translate=\"YOUR_ROLE\">Your role</div>\n" +
    "                          <div class=\"input-decorator__errormsg\" translate=\"CANNOT_EMPTY\"\n" +
    "                               ng-if=\"contactForm.role.$dirty && contact.role.length === 0\">Cannot be empty</div>\n" +
    "                        </label>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"l-block-small\">\n" +
    "                        <label class=\"input-decorator\">\n" +
    "                          <input class=\"input input--full\" type=\"text\"\n" +
    "                                 name=\"phone\" required\n" +
    "                                 ng-class=\"{'input--error': contactForm.phone.$invalid && contactForm.phone.$dirty }\"\n" +
    "                                 ng-minlength=\"7\"\n" +
    "                                 ng-model=\"contact.phone\">\n" +
    "                          <div class=\"input-decorator__label\" translate=\"YOUR_PHONE_NUMBER\">Your phone number</div>\n" +
    "                          <div class=\"input-decorator__errormsg\" translate=\"CANNOT_EMPTY\"\n" +
    "                               ng-if=\"contactForm.phone.$invalid && contactForm.phone.$dirty\">Cannot be empty</div>\n" +
    "                        </label>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <label class=\"input-decorator\">\n" +
    "                        <input class=\"input input--full\" type=\"email\"\n" +
    "                               name=\"email\" required\n" +
    "                               ng-class=\"{'input--error': contactForm.email.$invalid && contactForm.email.$dirty }\"\n" +
    "                               ng-model=\"contact.email\">\n" +
    "                        <div class=\"input-decorator__label\" translate=\"YOUR_EMAIL\">Your email</div>\n" +
    "                        <div class=\"input-decorator__errormsg\" translate=\"CANNOT_EMPTY\"\n" +
    "                             ng-if=\"contactForm.email.$dirty && contact.email.length === 0\">Cannot be empty</div>\n" +
    "                      </label>\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item p8--one-half\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"l-block-small\">\n" +
    "                        <div class=\"input-decorator\">\n" +
    "                          <div class=\"input-decorator__label\" translate=\"I_WOULD_LIKE\">I would like...</div>\n" +
    "\n" +
    "                          <div>\n" +
    "                            <label class=\"input-decorator__label-inline\">\n" +
    "                              <span class=\"input-radio\">\n" +
    "                                <input class=\"input-radio__control\" type=\"radio\" name=\"type\" checked=\"checked\"\n" +
    "                                       value=\"{{ 'I_WOULD_LIKE_ITEM_1' | translate }}\"\n" +
    "                                       ng-model=\"contact.wouldLike\">\n" +
    "                                <span class=\"input-radio__label\"></span>\n" +
    "                              </span>\n" +
    "\n" +
    "                              <span translate=\"I_WOULD_LIKE_ITEM_1\">to get customized course for my organization</span>\n" +
    "                            </label>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div>\n" +
    "                            <label class=\"input-decorator__label-inline\">\n" +
    "                              <span class=\"input-radio\">\n" +
    "                                <input class=\"input-radio__control\" type=\"radio\" name=\"type\"\n" +
    "                                       value=\"{{ 'I_WOULD_LIKE_ITEM_2' | translate }}\"\n" +
    "                                       ng-model=\"contact.wouldLike\">\n" +
    "                                <span class=\"input-radio__label\"></span>\n" +
    "                              </span>\n" +
    "\n" +
    "                              <span translate=\"I_WOULD_LIKE_ITEM_2\">to get a call back</span>\n" +
    "                            </label>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div>\n" +
    "                            <label class=\"input-decorator__label-inline\">\n" +
    "                              <span class=\"input-radio\">\n" +
    "                                <input class=\"input-radio__control\" type=\"radio\" name=\"type\"\n" +
    "                                       value=\"{{ 'I_WOULD_LIKE_ITEM_3' | translate }}\"\n" +
    "                                       ng-model=\"contact.wouldLike\">\n" +
    "                                <span class=\"input-radio__label\"></span>\n" +
    "                              </span>\n" +
    "\n" +
    "                              <span translate=\"I_WOULD_LIKE_ITEM_3\">to make an appointment</span>\n" +
    "                            </label>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div>\n" +
    "                            <label class=\"input-decorator__label-inline\">\n" +
    "                              <span class=\"input-radio\">\n" +
    "                                <input class=\"input-radio__control\" type=\"radio\" name=\"type\"\n" +
    "                                       value=\"{{ 'I_WOULD_LIKE_ITEM_4' | translate }}\"\n" +
    "                                       ng-model=\"contact.wouldLike\">\n" +
    "                                <span class=\"input-radio__label\"></span>\n" +
    "                              </span>\n" +
    "\n" +
    "                              <span translate=\"I_WOULD_LIKE_ITEM_4\">to book an offline training</span>\n" +
    "                            </label>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div>\n" +
    "                            <label class=\"input-decorator__label-inline\">\n" +
    "                              <span class=\"input-radio\">\n" +
    "                                <input class=\"input-radio__control\" type=\"radio\" name=\"type\"\n" +
    "                                       value=\"{{ 'I_WOULD_LIKE_ITEM_5' | translate }}\"\n" +
    "                                       ng-model=\"contact.wouldLike\">\n" +
    "                                <span class=\"input-radio__label\"></span>\n" +
    "                              </span>\n" +
    "\n" +
    "                              <span translate=\"I_WOULD_LIKE_ITEM_5\">something else</span>\n" +
    "                            </label>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <label class=\"input-decorator\">\n" +
    "                        <textarea name=\"\" id=\"\" cols=\"30\" rows=\"5\" class=\"input input--full\"\n" +
    "                                  name=\"message\" required\n" +
    "                                  ng-class=\"{'input--error': contactForm.message.$invalid && contactForm.message.$dirty }\"\n" +
    "                                  ng-model=\"contact.message\"></textarea>\n" +
    "                        <span class=\"input-decorator__label\" translate=\"YOUR_MESSAGE\">Your message</span>\n" +
    "                        <div class=\"input-decorator__errormsg\" translate=\"CANNOT_EMPTY\"\n" +
    "                             ng-if=\"contactForm.message.$dirty && contact.message.length === 0\">Cannot be empty</div>\n" +
    "                      </label>\n" +
    "                    </div>\n" +
    "                  </div><!--\n" +
    "                  --><div class=\"grid__item\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <button class=\"button button--secondary button--full\" translate=\"SEND_MESSAGE\">Send message</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\" ng-if=\"!getCurrentUser().hasContentLicence\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-list-inline is-center-aligned\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"title-tertiary content-section__title-secondary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                  Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <button class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "  </article>\n" +
    "</main>\n" +
    "\n" +
    "<instructor-intro-video-modal ng-if=\"instructor.introVideo\" ng-show=\"isPopupVisible('instructor_intro_video')\"></instructor-intro-video-modal>\n" +
    "");
}]);

angular.module("instructors/views/instructors.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("instructors/views/instructors.html",
    "<main class=\"page-content\">\n" +
    "  <div class=\"content-header content-header--bg-faculty\">\n" +
    "    <div class=\"ch-body\">\n" +
    "      <div class=\"ch-body__text\">\n" +
    "        <h1 class=\"title-primary\" translate=\"INSTRUCTORS_TITLE\">Meet our faculty</h1>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <article>\n" +
    "    <div class=\"content-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths p10--eleven-twelfths\">\n" +
    "            <div class=\"l-stacked l-stacked--large\">\n" +
    "              <div class=\"grid\">\n" +
    "                <div class=\"grid__item p8--three-tenths p10--one-quarter\">\n" +
    "                  <aside class=\"l-stacked__item\">\n" +
    "                    <div class=\"only-gt-p8\">\n" +
    "                      <div class=\"l-block-large\">\n" +
    "                        <div class=\"title-stroked\">\n" +
    "                          <h1 class=\"title-stroked__text\" translate=\"BY_CATEGORY_INSTRUCTOR\">By category</h1>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"nav\">\n" +
    "                        <ul class=\"l-list l-list--small\">\n" +
    "                          <li class=\"l-list__item\"><a ui-sref=\"instructors.all\" class=\"nav__item\" ng-class=\"{'nav__item--active': currentCategory == null}\" translate=\"ALL_EXPERTS\">All experts</a></li>\n" +
    "                          <li class=\"l-list__item\" ng-repeat=\"category in categories\">\n" +
    "                            <a ui-sref=\"instructors.category({ categoryId: category.id, categoryName: category.nameSlug })\" class=\"nav__item\" ng-class=\"{'nav__item--active': currentCategory === category}\">{{category.name}}</a>\n" +
    "                          </li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"only-lt-p8\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <select class=\"input-select input--full\" name=\"\" id=\"\"\n" +
    "                                ng-options=\"category.name for category in categories\"\n" +
    "                                ng-model=\"currentCategory\"\n" +
    "                                ng-change=\"selectCategory(currentCategory)\">\n" +
    "                          <option value=\"\" translate=\"ALL_EXPERTS\">All experts</option>\n" +
    "                        </select>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <form>\n" +
    "                        <input type=\"text\" class=\"input-search\" size=\"30\" placeholder=\"{{ 'FIND_INSTRUCTOR' | translate }}\"\n" +
    "                               ng-model=\"instructorSearch.query\"\n" +
    "                               on-enter=\"searchInstructors()\">\n" +
    "                      </form>\n" +
    "                    </div>\n" +
    "                  </aside>\n" +
    "                </div><!--\n" +
    "                --><div class=\"grid__item p8--seven-tenths p10--three-quarters\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <div ui-view></div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\" ng-if=\"!getCurrentUser().hasContentLicence\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-list-inline is-center-aligned\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"title-tertiary content-section__title-secondary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                  Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <button class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "  </article>\n" +
    "</main>");
}]);

angular.module("instructors/views/intro-video-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("instructors/views/intro-video-modal.html",
    "<div class=\"modal modal--alt\">\n" +
    "  <div class=\"modal-video\" popup-window=\"instructor_intro_video\">\n" +
    "    <div class=\"responsive-embed\">\n" +
    "      <iframe class=\"responsive-embed__video\" ng-src=\"{{ videoUrl }}\" width=\"800\" height=\"450\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n" +
    "    </div>\n" +
    "\n" +
    "    <button class=\"modal-video__closebutton\" popup-closer=\"instructor_intro_video\"><i class=\"icon-cross\"></i></button>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("instructors/views/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("instructors/views/list.html",
    "<div class=\"l-block-large only-gt-p8\">\n" +
    "  <div class=\"l-justified\">\n" +
    "    <div class=\"l-justified__item\">\n" +
    "      <h1 class=\"title-secondary content-section__title-primary\" ng-if=\"currentCategory\">{{ currentCategory.name }}</h1>\n" +
    "      <h1 class=\"title-secondary content-section__title-primary\" ng-if=\"!currentCategory\" translate=\"ALL_EXPERTS\">All experts</h1>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-justified__item\">\n" +
    "      <form>\n" +
    "        <input type=\"text\" class=\"input-search\" size=\"30\" placeholder=\"{{ 'FIND_INSTRUCTOR' | translate }}\"\n" +
    "               ng-model=\"instructorSearch.query\"\n" +
    "               on-enter=\"searchInstructors()\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"l-block-large\">\n" +
    "  <div class=\"l-stacked l-stacked--med\">\n" +
    "    <div class=\"grid grid--narrow\">\n" +
    "      <div class=\"grid__item p4--one-half p10--one-third\" ng-repeat=\"instructor in instructors\">\n" +
    "        <div class=\"l-stacked__item\">\n" +
    "          <instructor-item instructor=\"instructor\"></instructor-item>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"no-courses-placeholder\" ng-if=\"!instructors.length\">\n" +
    "  <div class=\"l-block-small\">\n" +
    "    <img src=\"/images/afbeelding.jpg\" alt=\"\"/>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("legal/views/legal.conditions.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("legal/views/legal.conditions.html",
    "<section class=\"content-formatting legal-text\">\n" +
    "  <h1>Gebruiksvoorwaaeden</h1>\n" +
    "\n" +
    "  <p>Deze Gebruiksvoorwaarden hebben betrekking op elk gebruik van de Dienst dat via jouw Account wordt gemaakt. We adviseren je deze Gebruiksvoorwaarden aandachtig door te nemen zodat je weet welke rechten en verplichtingen je hebt wanneer je de Dienst gebruikt.</p>\n" +
    "  <p>Mocht je vragen hebben over deze Gebruiksvoorwaarden, dan kan je contact met ons opnemen via <a href=\"mailto:info@studytube.nl\">info@studytube.nl</a>.</p>\n" +
    "\n" +
    "  <ol class=\"legal-text__unstyled-list\">\n" +
    "    <li><h1>Artikel 1.  Definities</h1>\n" +
    "      <ol>\n" +
    "        <li>\n" +
    "          <p>In deze Gebruiksvoorwaarden worden de volgende begrippen met een beginhoofdletter gebruikt, zowel in enkelvoud als in meervoud. Onder deze begrippen wordt het volgende verstaan:</p>\n" +
    "          <dl>\n" +
    "            <dt>Account:</dt>\n" +
    "            <dd>de persoonlijke sectie die door de Gebruiker wordt gecreëerd en beheerd wanneer hij zich aanmeldt via de Website en waarmee hij gebruik kan maken van de Dienst;</dd>\n" +
    "            <dt>Gebruiker:</dt>\n" +
    "            <dd>de natuurlijke persoon die een Account heeft aangemaakt voor het gebruik van de Dienst, in deze Gebruiksvoorwaarden ook wel aangeduid als ‘je’ of ‘jij’;</dd>\n" +
    "            <dt>Gebruiksvoorwaarden:</dt>\n" +
    "            <dd>deze gebruiksvoorwaarden;</dd>\n" +
    "            <dt>Content:</dt>\n" +
    "            <dd>alle Content die via de Website aan jou ter beschikking wordt gesteld, waaronder begrepen maar niet beperkt tot de cursussen, video’s, teksten en de lay-out en look-and-feel van de Dienst;</dd>\n" +
    "            <dt>Inloggegevens:</dt>\n" +
    "            <dd>de gebruikersnaam en het wachtwoord van de Gebruiker om toegang te krijgen tot het Account;</dd>\n" +
    "            <dt>IE-rechten:</dt>\n" +
    "            <dd>alle rechten van intellectuele eigendom en daarmee verwante rechten, zoals auteursrechten, merkrechten, octrooirechten, modelrechten, handelsnaamrechten, databankrechten en naburige rechten, alsmede knowhow en eenlijnsprestaties;</dd>\n" +
    "            <dt>StudyTube:</dt>\n" +
    "            <dd>StudyTube B.V., gevestigd en kantoorhoudende te (1012 VP) Amsterdam aan de Spuistraat 239 – 4e verdieping, ingeschreven bij de Kamer van Koophandel onder nummer 51290901;</dd>\n" +
    "            <dt>Dienst:</dt>\n" +
    "            <dd>de dienst die StudyTube aan de Gebruiker verleent, zoals nader omschreven in art. 4 en op de Website;</dd>\n" +
    "            <dt>Website:</dt>\n" +
    "            <dd>het platform van StudyTube dat via de website <a href=\"\" ng-href=\"http://www.studytube.nl\">www.studytube.nl</a> en onderliggende pagina‘s bereikbaar is;</dd>\n" +
    "          </dl>\n" +
    "        </li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 2.	Toepasselijkheid</h1>\n" +
    "      <ol>\n" +
    "        <li>Deze Gebruiksvoorwaarden zijn van toepassing op elk gebruik dat je van de Dienst maakt en alle overeenkomsten die gesloten worden via de Website en de rechtshandelingen of rechtsverhoudingen tussen jou en StudyTube. </li>\n" +
    "        <li>StudyTube is te allen tijde gerechtigd deze Gebruiksvoorwaarden te wijzigen of aan te vullen. De meest actuele Gebruiksvoorwaarden zullen op de Website te vinden zijn of worden tijdens het gebruik van de Dienst onder jouw aandacht gebracht. Indien je de Website blijft gebruiken na wijziging of aanvulling van deze Gebruiksvoorwaarden, accepteer je daarmee de gewijzigde of aangevulde Gebruiksvoorwaarden onherroepelijk. Indien je niet instemt met de gewijzigde of aangevulde Gebruiksvoorwaarden, is het je niet langer toegestaan om de Website te gebruiken en dien je je Account te beëindigen.</li>\n" +
    "        <li>Toepasselijkheid van voorwaarden van Gebruiker wordt door Studytube uitdrukkelijk van de hand gewezen.</li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 3.	Toegang tot de Dienst</h1>\n" +
    "      <ol>\n" +
    "        <li>Om gebruik te kunnen maken van de Dienst, moet je een Account aanmaken op de manier zoals beschreven op de Website. Studytube kan naar eigen inzicht bepalen of aan jou al dan niet een Account zal worden verstrekt.</li>\n" +
    "        <li>Je staat er jegens StudyTube voor in dat de Content die je bij het aanmaken van je Account verstrekt compleet en juist is en dat je 16 jaar of ouder bent. Indien je jonger bent dan 16 jaar, sta je ervoor in dat je toestemming hebt van je ouders of voogd voor het aanmaken van een Account. Het is niet toegestaan een Account aan te maken op naam van iemand anders.</li>\n" +
    "        <li>De gegevens die je tijdens het registratieproces verstrekt zullen worden opgeslagen en verwerkt in overeenstemming met het Privacy Statement dat je hier <a ui-sref=\"legal.privacy\">http://www.studytube.nl/legal/privacy</a> kunt raadplegen.</li>\n" +
    "        <li>Je bent zelf verantwoordelijk voor het geheim houden van je Inloggegevens. Je mag je Inloggegevens niet aan derden verstrekken. StudyTube mag ervan uitgaan dat jij ook daadwerkelijk degene bent die zich aanmeldt met jouw Inloggegevens. Zodra je weet of reden hebt te vermoeden dat Inloggegevens in handen zijn gekomen van onbevoegden, moet je dat aan StudyTube laten weten. Verder heb je de verplichting om zelf doeltreffende maatregelen te treffen, zoals het periodiek veranderen van je Inloggegevens.</li>\n" +
    "        <li>StudyTube behoudt zich het recht voor de inlogprocedure en/of Inloggegevens te veranderen indien zij dit noodzakelijk acht in het belang van het functioneren van de Dienst.</li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 4.	Het gebruik van de Dienst</h1>\n" +
    "      <ol>\n" +
    "        <li>De Dienst bestaat eruit dat je toegang krijgt tot de Website, waarop je cursussen kan volgen met de daarop beschikbaar gestelde Content en je inzicht krijgt in je vorderingen via de beschikbaar gestelde overzichten en rapportages.</li>\n" +
    "        <li>Onder de voorwaarden zoals gesteld in deze Gebruiksvoorwaarden en voor de duur van je Account, verleent StudyTube aan jou een beperkt, persoonlijk, herroepelijk, niet-exclusief, niet-overdraagbaar recht om van de Dienst, inclusief de Website en de Content gebruik te maken voor jouw eigen persoonlijke doeleinden.</li>\n" +
    "        <li>Je bent zelf volledig verantwoordelijk en aansprakelijk voor alle handelingen die je met behulp van of in het kader van je gebruik van de Dienst verricht.</li>\n" +
    "        <li>Onverminderd de overige bepalingen van deze Gebruiksvoorwaarden mogen je activiteiten in het kader van de Dienst, waaronder mede het gebruik van de Website en je communicatie met andere Gebruikers via de Dienst niet:\n" +
    "          <ol class=\"legal-text__latin-list\">\n" +
    "            <li>op onwaarheden gebaseerd en/of misleidend zijn;</li>\n" +
    "            <li>discriminerend, gewelddadig, pornografisch, illegaal, kwetsend of anderszins ongepast zijn, ter bevinding van StudyTube;</li>\n" +
    "            <li>virussen, Trojaanse paarden, wormen, bots of andere programmatuur bevatten die een geautomatiseerd werk kunnen beschadigen, onbruikbaar of ontoegankelijk kunnen maken, kunnen wissen of zich kunnen toe-eigenen of die bedoeld zijn om technische beschermingsmaatregelen van de Website en/of de computersystemen van de Dienst te omzeilen;</li>\n" +
    "            <li>bestaan uit het gebruik van enige soft- en/of hardware matige tools en/of oplossingen (in eigen beheer of beschikbaar gesteld door derden), voor zover deze gericht zijn op het overnemen van enige via de Dienst toegankelijke gemaakte Content, dan wel om de Website op enigerlei andere wijze te spideren, scrapen, doorzoeken of op andere oneigenlijke wijze te gebruiken en/of in te zien;</li>\n" +
    "            <li>een commercieel of promotioneel karakter hebben, tenzij StudyTube hiervoor schriftelijk toestemming heeft gegeven;</li>\n" +
    "            <li>in strijd zijn met deze Gebruiksvoorwaarden, het Privacy Statement of enige geldende wet- en/of regelgeving;</li>\n" +
    "            <li>inbreuk maken op de rechten van StudyTube en/of derden, waaronder begrepen maar niet beperkt tot IE-rechten en rechten met betrekking tot de bescherming van privacy;</li>\n" +
    "            <li>op enigerlei wijze anderszins onrechtmatig zijn;</li>\n" +
    "            <li>de belangen en goede naam van StudyTube kunnen schaden.</li>\n" +
    "          </ol>\n" +
    "        </li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 5.	Beschikbaarheid</h1>\n" +
    "      <ol>\n" +
    "        <li>StudyTube levert de Dienst op basis van een inspanningsverplichting. StudyTube garandeert niet dat de Website en de Dienst te allen tijde en zonder onderbrekingen of storingen toegankelijk zijn. Storingen in de Dienst kunnen onder meer optreden als gevolg van storingen in de internet- of telefonieverbinding of door virussen of fouten/gebreken. StudyTube is tegenover jou op geen enkele wijze aansprakelijk of schadeplichtig voor enige schade die voortvloeit uit of het gevolg is van het (tijdelijk) onbeschikbaar zijn of (tussentijds) uitvallen van de Dienst.</li>\n" +
    "        <li>Je bent zelf verantwoordelijk voor de aanschaf en/of goede werking van de infrastructuur en deugdelijke telecomfaciliteiten (waaronder internetverbinding) die nodig zijn om gebruik te kunnen maken van de Dienst.</li>\n" +
    "        <li>StudyTube is te allen tijde gerechtigd om, zonder voorafgaande bekendmaking en zonder daarmee schadeplichtig te worden jegens jou (onderdelen van) de Dienst, de Website en/of de Content (tijdelijk) buiten gebruik te stellen en/of het gebruik ervan te beperken indien dat in haar opvatting noodzakelijk is, bijvoorbeeld in het kader van het redelijkerwijs benodigde onderhoud van de Website.</li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 6.	Betaling</h1>\n" +
    "      <ol>\n" +
    "        <li>De prijs voor het gebruik van de Dienst is afhankelijk van de gekozen abonnementsvorm. In sommige gevallen zal de prijs voor de Dienst betaald worden door je werkgever of (onderwijs)instelling. De abonnementsvormen en bijbehorende prijzen zijn vermeld op de Website. De prijs voor de Dienst is verschuldigd, ongeacht of je daadwerkelijk gebruik hebt gemaakt van de Dienst.</li>\n" +
    "        <li>Prijzen zijn inclusief BTW en andere heffingen van overheidswege, tenzij anders aangegeven.</li>\n" +
    "        <li>Indien sprake is van een periodieke betalingsverplichting, geldt dat StudyTube gerechtigd is op een termijn van ten minste drie maanden de geldende prijzen en tarieven aan te passen. Indien je niet akkoord wenst te gaan met een dergelijke aanpassing, is de enige mogelijkheid het beëindigen van je Account tegen de datum waarop de aanpassing in werking zou treden.</li>\n" +
    "        <li>Betaling vindt plaats op de manier zoals omschreven op de Website. Indien een periodieke betaling is overeengekomen en/of niet per automatisch incasso wordt of kan worden betaald, betaal je binnen de termijn die op de factuur is vermeld. Indien geen betalingstermijn is vermeld of anderszins schriftelijk overeengekomen, geschiedt de betaling binnen veertien (14) dagen na factuurdatum. </li>\n" +
    "        <li>Indien na het verstrijken van deze termijn door StudyTube nog geen (volledige) betaling is ontvangen, ben je direct in verzuim, zonder dat voorafgaande ingebrekestelling is vereist. Vanaf het moment van verzuim ben je over het verschuldigde bedrag de wettelijke rente verschuldigd. Indien je na aanmaning of ingebrekestelling nalatig blijft de vordering te voldoen, kan StudyTube de vordering uit handen geven. In dat geval komen alle door StudyTube gemaakte kosten in verband met te late betalingen ten laste van jou. Deze kosten bedragen 15% van het verschuldigde bedrag, met een minimum van EUR 25,-.</li>\n" +
    "        <li>In geval van niet-tijdige betaling door jou of je werkgever of (onderwijs)instelling is StudyTube gerechtigd je Account met onmiddellijke ingang te beëindigen dan wel de toegang tot het Account op te schorten of te beperken tot het moment waarop aan alle (betalings)verplichtingen is voldaan, betaling van kosten en rente daaronder begrepen.</li>\n" +
    "        <li>Klachten met betrekking tot facturen en/of de dienstverlening schorten je betalingsverplichtingen niet op.</li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 7.	IE-rechten</h1>\n" +
    "      <ol>\n" +
    "      <li>De IE-rechten met betrekking tot de Dienst en de Website alsmede de via de Website openbaar gemaakte Content, berusten bij StudyTube en/of haar licentiegevers. Niets in deze Gebruiksvoorwaarden is bedoeld om enige IE-rechten aan jou over te dragen.</li>\n" +
    "      <li>Voor zover niet expliciet toegestaan op basis van deze Gebruiksvoorwaarden mag je zonder voorafgaande schriftelijke toestemming van Studytube niet:</li>\n" +
    "        <ol class=\"legal-text__latin-list\">\n" +
    "          <li>(onderdelen van) de Dienst, de Website en/of Content op welke wijze, in welke vorm en voor welk doel dan ook (doen) downloaden, kopiëren, overdragen, verveelvoudigen, bewerken of verspreiden;</li>\n" +
    "          <li>substantiële delen van de Website en/of Content opvragen of hergebruiken of herhaald en systematisch niet-substantiële delen van de Website en/of Content opvragen of hergebruiken zoals bedoeld in de Databankenwet;</li>\n" +
    "          <li>kennisgevingen of vermeldingen met betrekking tot IE-rechten verwijderen, onleesbaar maken, verbergen of wijzigen;</li>\n" +
    "          <li>domeinnamen, merken of Google Adwords registreren die te maken hebben met de Dienst.</li>\n" +
    "        </ol>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 8.	Garanties en vrijwaringen</h1>\n" +
    "      <ol>\n" +
    "        <li>Je aanvaardt dat de Dienst alleen de functionaliteiten, Content en overige eigenschappen bevat zoals je die aantreft op het moment van gebruik (op “as is” basis). StudyTube geeft geen garanties, toezeggingen en vrijwaringen ten aanzien van de kwaliteit, veiligheid, rechtmatigheid, volledigheid, integriteit en juistheid van de Content en de Dienst, tenzij anders is bepaald in deze Gebruiksvoorwaarden. StudyTube is niet verplicht om bepaalde Content op verzoek toe te voegen.</li>\n" +
    "        <li>In het bijzonder garandeert StudyTube niet dat het gebruik van de Dienst bepaalde resultaten zal opleveren, bijvoorbeeld een vooruitgang in studieresultaten. </li>\n" +
    "        <li>Je bent jegens StudyTube aansprakelijk voor, en vrijwaart StudyTube volledig tegen, alle schade en kosten die StudyTube lijdt of maakt ten gevolge van (i) een toerekenbare tekortkoming in de nakoming van deze Gebruiksvoorwaarden door jou, (ii)  enig handelen van jou bij het gebruik van de Dienst, waaronder begrepen een inbreuk op IE-rechten of een schending van de privacy van derden of (iii)  van een onrechtmatige daad. Alle door StudyTube gemaakte kosten en geleden schade die op enige wijze verband houdt met dergelijke aanspraken zullen door jou worden vergoed.</li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 9.	Kennisgeving onrechtmatige materiaal</h1>\n" +
    "      <ol>\n" +
    "        <li>StudyTube zal kennisgevingen van inbreuken op rechten van derden door bezoekers van de Website onderzoeken en indien mogelijk daartegen stappen ondernemen. Als je van mening bent dat een andere Gebruiker inbreuk pleegt op je rechten, kan je StudyTube daarvan op de hoogte te stellen via een e-mail naar info@studytube.nl. Deze kennisgeving dient:\n" +
    "          <ol class=\"legal-text__latin-list\">\n" +
    "            <li>de URL te bevatten van waar het materiaal dat naar jouw mening inbreuk maakt is te vinden op de Website; </li>\n" +
    "            <li>een verklaring te bevatten dat er naar jouw oordeel inbreuk wordt gemaakt op jouw rechten en waarom dat zo is; </li>\n" +
    "            <li>contactgegevens te bevatten waar StudyTube contact met je kan opnemen, zoals je naam, adres, telefoonnummer en e-mail adres; </li>\n" +
    "            <li>een verklaring te bevatten, ondersteund met bewijsmiddelen, dat de Content in de kennisgeving juist en volledig is en – indien het gaat om een inbreuk op IE-rechten – dat je de eigenaar bent van de betrokken IE-rechten; </li>\n" +
    "            <li>te zijn ondertekend door de eigenaar van de IE-rechten of degene die aantoonbaar bevoegd is om te handelen namens die eigenaar; </li>\n" +
    "            <li>indien het gaat om een inbreuk op IE-rechten - een beschrijving te bevatten van het werk of de werken waarop naar jouw mening inbreuk is gemaakt met een specificatie van hetgeen inbreukmakend is.</li>\n" +
    "          </ol>\n" +
    "        </li>\n" +
    "        <li>StudyTube behoudt zich het recht voor om de kennisgeving door te sturen aan de persoon of onderneming die verantwoordelijk is voor het materiaal waarop de kennisgeving betrekking heeft. </li>\n" +
    "        <li>Indien uit de kennisgeving blijkt dat het materiaal onmiskenbaar onrechtmatig is, zal deze door StudyTube worden verwijderd of ontoegankelijk worden gemaakt. </li>\n" +
    "        <li>StudyTube behoudt zich het recht voor niet tot inwilliging van een verzoek tot verwijdering of het ontoegankelijk maken van het materiaal over te gaan indien zij gegronde redenen heeft om aan de juistheid van de kennisgeving of de rechtmatigheid van het geleverde bewijs te twijfelen of indien het materiaal waarop de kennisgeving betrekking heeft niet onmiskenbaar onrechtmatig blijkt te zijn. In dat kader kan StudyTube bijvoorbeeld een rechterlijke uitspraak verlangen van een bevoegde rechter in Nederland, welke uitspraak aantoont dat het betreffende materiaal onrechtmatig is. </li>\n" +
    "        <li>Door het doen van een kennisgeving vrijwaar je StudyTube en alle aan haar gelieerde ondernemingen alsmede haar directie, bestuurders, werknemers, vertegenwoordigers en rechtsopvolgers voor iedere aanspraak van derden in verband met het verwijderen of ontoegankelijk maken van het materiaal. De vrijwaring heeft mede betrekking op alle schade en kosten die StudyTube lijdt, nog zal kunnen lijden of die StudyTube dient te maken in verband met een dergelijke aanspraak, waaronder mede begrepen – doch niet daartoe beperkt – het vergoeden van kosten voor juridische rechtsbijstand. </li>\n" +
    "        <li>StudyTube zal op geen enkele wijze partij kunnen zijn bij een geschil tussen degene van wie de kennisgeving afkomstig is en de gebruiker waarop de kennisgeving betrekking heeft.</li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 10.	Aansprakelijkheid</h1>\n" +
    "      <ol>\n" +
    "        <li>StudyTube aanvaardt geen enkele aansprakelijkheid voor schade ten gevolge van het verlenen van de Dienst dan wel uit onrechtmatige daad of anderszins, anders dan in dit artikel bepaald.</li>\n" +
    "        <li>Indien StudyTube aansprakelijk is jegens jou voor schade uit welke hoofde dan ook, is deze aansprakelijkheid, te allen tijde per gebeurtenis (waarbij een samenhangende reeks gebeurtenissen als één gebeurtenis geldt) beperkt tot de in het lopende kalenderjaar daadwerkelijk door jou aan StudyTube betaalde vergoedingen (exclusief BTW) voor het gebruik van de Dienst waaruit de aansprakelijkheid van StudyTube is voortgevloeid.</li>\n" +
    "        <li>StudyTube is in ieder geval nimmer aansprakelijk voor gevolgschade, waaronder mede begrepen zuivere vermogensschade, gederfde omzet en winst, schade door verwisseling, verlies of beschadiging van elektronische gegevens en/of door vertraging in de transport van het dataverkeer en immateriële schade.</li>\n" +
    "        <li>Het bepaalde in dit artikel geldt ook ten gunste van alle (rechts)personen waarvan StudyTube zich bedient.</li>\n" +
    "        <li>De in dit artikel opgenomen beperking van aansprakelijkheid is niet van toepassing in geval van opzet en/of bewuste roekeloosheid van StudyTube zelf en/of haar leidinggevenden.</li>\n" +
    "        <li>Voorwaarde voor het ontstaan van enig recht op schadevergoeding is steeds dat je de schade zo spoedig mogelijk na het ontstaan daarvan schriftelijk bij StudyTube meldt. Iedere vordering tot schadevergoeding tegen StudyTube vervalt door het enkele verloop van 12 maanden na het ontstaan van de vordering.</li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 11.	Beëindiging</h1>\n" +
    "      <ol>\n" +
    "        <li>De overeenkomst tussen StudyTube en jou wordt aangegaan voor onbepaalde tijd. Je kan de overeenkomst op elk moment beëindigen door je Account te verwijderen zonder inachtneming van een opzegtermijn.</li>\n" +
    "        <li>StudyTube kan na registratie en/of betaling direct worden gebruikt waardoor de diensten van Studytube worden geleverd voordat de herroepingstermijn als bedoeld in de Wet Koop Op Afstand is verstreken. StudyTube wijst je er op dat je om die reden geen gebruik kan maken van de afkoelingstermijn zoals vermeld in artikel 7:46d lid 1 BW.</li>\n" +
    "        <li>In aanvulling op de andere (rechts)middelen die StudyTube ten dienste staan, is StudyTube te allen tijde, zonder opgave van redenen en zonder voorafgaande uitleg gerechtigd om jouw activiteiten in verband met de Dienst (tijdelijk) te beperken, op te schorten of buiten gebruik te stellen, je Account tijdelijk of blijvend te verwijderen, een waarschuwing te doen uitgaan, dienstverlening te beëindigen en te weigeren om de dienst te verlenen, in het bijzonder - maar niet daartoe beperkt - indien:\n" +
    "          <ol class=\"legal-text__latin-list\">\n" +
    "            <li>je handelt in strijd met deze Gebruiksvoorwaarden; </li>\n" +
    "            <li>StudyTube van mening is dat jouw handelingen schade of aansprakelijkheid aan jezelf, StudyTube of anderen kunnen toebrengen;</li>\n" +
    "            <li>StudyTube zal hierdoor in geen geval aansprakelijk zijn.</li>\n" +
    "          </ol>\n" +
    "        </li>\n" +
    "        <li>Indien je gebruik maakt van een versie van de Dienst die specifiek is aangepast voor je werkgever of een (onderwijs)instelling, dan eindigt je Account automatisch op het moment dat de overeenkomst tussen StudyTube en de werkgever of (onderwijs)instelling eindigt. StudyTube zal je daarover berichten en eventuele vooruitbetaalde bedragen terugbetalen.</li>\n" +
    "        <li>In geval van ontbinding van de overeenkomst, vindt geen ongedaanmaking plaats van hetgeen StudyTube reeds heeft geleverd en/of heeft verricht en de daar tegenover staande betalingsverplichting. Bedragen die StudyTube vóór de ontbinding heeft gefactureerd in verband met wat StudyTube ter uitvoering van de overeenkomst al naar behoren heeft verricht of geleverd, blijven met inachtneming van het in de vorige volzin bepaalde onverminderd verschuldigd en worden op het moment van de ontbinding direct opeisbaar.</li>\n" +
    "        <li>Bij beëindiging van de overeenkomst, om welke reden dan ook, vervalt per direct je recht om de Dienst te gebruiken en wordt de toegang tot de Dienst direct ontzegd. StudyTube verwijdert bij beëindiging, om welke reden dan ook, je Account. StudyTube is niet gehouden om na beëindiging van de overeenkomst, enige Content aan je te verstrekken en/of te converteren.</li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "\n" +
    "    <li><h1>Artikel 12.	Slotbepalingen</h1>\n" +
    "      <ol>\n" +
    "        <li>Indien enige bepaling uit deze Gebruiksvoorwaarden nietig of vernietigbaar blijkt te zijn dan wel om enige andere dan geheel of gedeeltelijk ongeldig wordt of is, blijven de overige bepalingen van de Gebruiksvoorwaarden onverminderd van kracht. StudyTube zal het ongeldige beding vervangen door een beding dat wel geldig is en waarvan de rechtsgevolgen, gelet op de inhoud en de strekking van deze Gebruiksvoorwaarden, zoveel mogelijk overeenstemt met die van het ongeldige beding.</li>\n" +
    "        <li>StudyTube mag rechten en verplichtingen die uit de Gebruiksvoorwaarden voortvloeien, overdragen aan derden en zal je daarvan op de hoogte stellen. Indien je deze overdracht van verplichtingen aan een derde niet acceptabel vindt, is je enige remedie om het gebruik van de Dienst te staken en je Account te beëindigen.</li>\n" +
    "        <li>Deze Gebruiksvoorwaarden en het gebruik van de Dienst worden beheerst door Nederlands recht. De toepasselijkheid van het Weens Koopverdrag is uitgesloten.</li>\n" +
    "        <li>Alle geschillen die voorvloeien uit en/of verband houden met deze Gebruiksvoorwaarden, worden voorgelegd aan de bevoegde rechter te Amsterdam, tenzij dwingend recht een andere bevoegde rechter aanwijst.</li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "  </ol>\n" +
    "</section>");
}]);

angular.module("legal/views/legal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("legal/views/legal.html",
    "<main class=\"page-content\">\n" +
    "  <article>\n" +
    "    <div class=\"content-section content-section--contrast content-section--large content-section--half-top\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths is-center-aligned\">\n" +
    "            <div class=\"l-block\">\n" +
    "              <h1 class=\"title-primary\">Legal Information</h1>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <aside class=\"legal-tabs\">\n" +
    "                <a ui-sref=\"legal.conditions\" class=\"legal-tabs__item\" ng-class=\"{'legal-tabs__item--active': activeTab == 'conditions'}\" translate=\"LEGAL_ITEM_1\">Terms and conditions</a>\n" +
    "                <a ui-sref=\"legal.privacy\" class=\"legal-tabs__item\" ng-class=\"{'legal-tabs__item--active': activeTab == 'privacy'}\" translate=\"LEGAL_ITEM_2\">Privacy regulations</a>\n" +
    "              </aside>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"content-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths p8--eight-twelfths\">\n" +
    "            <div ui-view></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </article>\n" +
    "</main>");
}]);

angular.module("legal/views/legal.privacy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("legal/views/legal.privacy.html",
    "<section class=\"content-formatting\">\n" +
    "  <h1>Privacyverklaring. Disclaimer persoonsgegevens.</h1>\n" +
    "\n" +
    "  <ol>\n" +
    "    <li>Studytube is gebonden aan de Wet Bescherming Persoonsgegevens. De door Gebruiker verstrekte persoonsgegevens gebruikt Studytube om Gebruiker zo goed mogelijk te kunnen informeren omtrent Aanbiedingen. Daarbij blijven onverkort de interne en wettelijke spelregels voor de uitwisseling van persoonsgegevens van toepassing. Als Gebruiker geen informatie van Studytube wilt ontvangen, dan kan Gebruiker dat bij Studytube kenbaar maken.</li>\n" +
    "    <li>Bij de verwerking van uw persoonsgegevens gaat Studytube zorgvuldig te werk. Zij gebruikt alleen díe gegevens die nodig zijn voor een optimale informatieverstrekking. Voor zover dat niet voortvloeit uit deze voorwaarden of de wet, worden zonder toestemming van Ge\n" +
    "      bruiker geen persoonsgegevens aan derden verstrekt.</li>\n" +
    "    <li>Studytube is gerechtigd examenuitslagen van Gebruiker in combinatie met zijn/haar naam op de Website te vermelden. Deze examenuitslagen worden daardoor openbaar en zijn te raadplegen door alle Gebruikers van de Website.</li>\n" +
    "    <li>Gebruiker heeft de mogelijkheid om zijn persoonsgegevens in te zien en, bij eventuele onjuistheden, te laten corrigeren. Een overzicht van de gegevens van Gebruiker kan Gebruiker schriftelijk bij Studytube aanvragen. </li>\n" +
    "    <li>Dit Privacy Statement is niet van toepassing op internetsites van derden die door middel van links met de Website van Studytube zijn verbonden.</li>\n" +
    "    <li>Studytube kan derden (waaronder adverteerders) toestaan (persoons)gegevens (waaronder het IP-adres) van Gebruiker te verzamelen omtrent het gebruik van de Website door Gebruiker. Deze derde kan gebruik maken van ‘cookies’ (tekstbestandjes die op de computer van Gebruiker worden geplaatst) teneinde te analyseren hoe Gebruiker de site gebruikt. Op basis van de verzamelde informatie omtrent het gebruik van de Website door Gebruiker kunnen gerichte advertenties worden weergegeven aan Gebruiker op de Website en ook op andere aan Studytube gelieerde websites of applicaties.</li>\n" +
    "    <li>De door Gebruiker aan Studytube verschafte persoonsgegevens worden door Studytube met toestemming van Gebruiker gebruikt voor het sturen van nieuwsbrieven. Gebruiker is in de gelegenheid hiervoor bij het aanmaken van een account toestemming te geven. Deze nieuwsbrieven kunnen ook informatie of aanbiedingen van derden bevatten.</li>\n" +
    "    <li>Om technische en operationele redenen kan het nodig zijn dat (persoons)gegevens worden doorgegeven (naar servers van) aan ons gelieerde ondernemingen en/of adverteerders in de Verenigde Staten of andere landen buiten Europa, waar de regelgeving op het gebied van de privacybescherming mogelijk niet eenzelfde bescherming biedt als in de Europese Unie. Hierbij stemt Gebruiker, voorzover nodig, er mee in dat zijn/haar (persoons)gegevens naar de Verenigde Staten of andere landen buiten Europa kunnen worden doorgegeven.</li>\n" +
    "    <li>Studytube kan de Website overdragen aan een derde. Gebruiker stemt er hierbij mee in dat zijn/haar persoonsgegevens in dat geval mede worden overgedragen aan die derde.</li>\n" +
    "    <li>Studytube behoudt zich het recht voor om wijzigingen aan te brengen in dit Privacy Statement.</li>\n" +
    "  </ol>\n" +
    "</section>");
}]);

angular.module("profile/views/change-profile-info.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/views/change-profile-info.html",
    "<div class=\"modal\">\n" +
    "  <div class=\"modal-window\" popup-window=\"profile_info\">\n" +
    "    <div class=\"mw-header\">\n" +
    "      <div class=\"l-tricol\">\n" +
    "        <div class=\"l-tricol__right\">\n" +
    "          <button class=\"mw-header__closebutton icon-cross\" popup-closer=\"profile_info\" ng-click=\"resetDefaults()\"></button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-tricol__mid\">\n" +
    "          <div class=\"mw-header__title\" translate=\"EDIT_PROFILE\">Edit profile</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <form action=\"\" class=\"form-profile\">\n" +
    "      <div class=\"modal-window__block\">\n" +
    "        <div class=\"fp-avatar\">\n" +
    "          <div class=\"grid\">\n" +
    "            <div class=\"grid__item p6--five-twelfths\">\n" +
    "              <img ng-src=\"{{ imagePreview || user.avatar || '/images/default-avatar.jpg' }}\" file-preview class=\"fp-avatar__image\">\n" +
    "            </div><!--\n" +
    "            --><div class=\"grid__item p6--seven-twelfths\">\n" +
    "              <div class=\"fp-avatar__description\">\n" +
    "                <div class=\"l-block\" translate=\"PROFILE_AVATAR_DESCRIPTION\">\n" +
    "                  Avatar should be a square image at minimum 300 x 300 px.\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"input-file\">\n" +
    "                  <input type=\"file\" class=\"input-file__control\"\n" +
    "                         ng-disabled=\"formState == 'waiting'\"\n" +
    "                         ng-click=\"thumbImageWasSelected = true\"\n" +
    "                         ng-model=\"newImage\"\n" +
    "                         file-changed>\n" +
    "\n" +
    "                  <button type=\"button\" class=\"fp-avatar__button\" translate=\"CHANGE_IMAGE\">Change image</button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "      <div class=\"modal-window__block\">\n" +
    "        <div class=\"l-block-small\">\n" +
    "          <label class=\"input-decorator input-decorator--alt\">\n" +
    "            <input type=\"text\" class=\"input input--alt input--full\"\n" +
    "                   ng-disabled=\"formState == 'waiting'\"\n" +
    "                   ng-model=\"tempUser.name\"\n" +
    "                   ng-class=\"{ 'input--error': errors.name }\"\n" +
    "                   ng-change=\"resetErrors()\">\n" +
    "            <div class=\"input-decorator__label\" translate=\"NAME\">Name</div>\n" +
    "            <div class=\"input-decorator__errormsg\" ng-if=\"errors.name\">{{ errors.name | translate }}</div>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-small\">\n" +
    "          <label class=\"input-decorator input-decorator--alt\">\n" +
    "            <input type=\"text\" class=\"input input--alt input--full\" ng-value=\"tempUser.email\" disabled>\n" +
    "            <div class=\"input-decorator__label\" translate=\"EMAIL_ADDRESS\">Email address</div>\n" +
    "            <div class=\"input-decorator__errormsg\" ng-if=\"errors.email\">{{ errors.email | translate }}</div>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-small\">\n" +
    "          <div class=\"l-stacked l-stacked--small\">\n" +
    "            <div class=\"grid grid--narrow\">\n" +
    "              <div class=\"grid__item p6--one-half\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <label class=\"input-decorator input-decorator--facebook\">\n" +
    "                    <input type=\"text\" class=\"input input--full input--facebook\"\n" +
    "                           ng-disabled=\"formState == 'waiting'\"\n" +
    "                           ng-model=\"tempUser.facebookUrl\"\n" +
    "                           ng-class=\"{ 'input--error': errors.facebookUrl }\"\n" +
    "                           ng-change=\"resetErrors()\">\n" +
    "                    <div class=\"input-decorator__label\">Facebook</div>\n" +
    "                    <div class=\"input-decorator__errormsg\" ng-if=\"errors.facebookUrl\">{{ errors.facebookUrl | translate }}</div>\n" +
    "                  </label>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p6--one-half\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <label class=\"input-decorator input-decorator--twitter\">\n" +
    "                    <input type=\"text\" class=\"input input--full input--twitter\"\n" +
    "                           ng-disabled=\"formState == 'waiting'\"\n" +
    "                           ng-model=\"tempUser.twitterUrl\"\n" +
    "                           ng-class=\"{ 'input--error': errors.twitterUrl }\"\n" +
    "                           ng-change=\"resetErrors()\">\n" +
    "                    <div class=\"input-decorator__label\">Twitter</div>\n" +
    "                    <div class=\"input-decorator__errormsg\" ng-if=\"errors.twitterUrl\">{{ errors.twitterUrl | translate }}</div>\n" +
    "                  </label>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-small\">\n" +
    "          <div class=\"l-stacked l-stacked--small\">\n" +
    "            <div class=\"grid grid--narrow\">\n" +
    "              <div class=\"grid__item p6--one-half\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <label class=\"input-decorator input-decorator--googleplus\">\n" +
    "                    <input type=\"text\" class=\"input input--full input--googleplus\"\n" +
    "                           ng-disabled=\"formState == 'waiting'\"\n" +
    "                           ng-model=\"tempUser.websiteUrl\"\n" +
    "                           ng-class=\"{ 'input--error': errors.websiteUrl }\"\n" +
    "                           ng-change=\"resetErrors()\">\n" +
    "                    <div class=\"input-decorator__label\">Website</div>\n" +
    "                    <div class=\"input-decorator__errormsg\" ng-if=\"errors.websiteUrl\">{{ errors.websiteUrl | translate }}</div>\n" +
    "                  </label>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p6--one-half\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <label class=\"input-decorator input-decorator--linkedin\">\n" +
    "                    <input type=\"text\" class=\"input input--full input--linkedin\"\n" +
    "                           ng-disabled=\"formState == 'waiting'\"\n" +
    "                           ng-model=\"tempUser.linkedinUrl\"\n" +
    "                           ng-class=\"{ 'input--error': errors.linkedinUrl }\"\n" +
    "                           ng-change=\"resetErrors()\">\n" +
    "                    <div class=\"input-decorator__label\">Linkedin</div>\n" +
    "                    <div class=\"input-decorator__errormsg\" ng-if=\"errors.linkedinUrl\">{{ errors.linkedinUrl | translate }}</div>\n" +
    "                  </label>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-block-med is-center-aligned\">\n" +
    "          <button type=\"button\" class=\"form__action-secondary\" ng-hide=\"passwordFieldsAreShown\" ng-click=\"passwordFieldsAreShown = true\"><span translate=\"CHANGE_PASSWORD\">Change password</span></button>\n" +
    "\n" +
    "          <div class=\"l-stacked l-stacked--small\" ng-show=\"passwordFieldsAreShown\">\n" +
    "            <div class=\"grid grid--narrow\">\n" +
    "              <div class=\"grid__item p6--one-half\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <label class=\"input-decorator input-decorator--alt\">\n" +
    "                    <input type=\"password\" class=\"input input--alt input--full\"\n" +
    "                           ng-disabled=\"formState == 'waiting'\"\n" +
    "                           ng-model=\"tempUser.newPassword\"\n" +
    "                           ng-class=\"{ 'input--error': errors.newPassword }\"\n" +
    "                           ng-change=\"resetErrors()\">\n" +
    "                    <div class=\"input-decorator__label\" translate=\"NEW_PASSWORD\">New password</div>\n" +
    "                    <div class=\"input-decorator__errormsg\" ng-if=\"errors.newPassword\">{{ errors.newPassword | translate }}</div>\n" +
    "                  </label>\n" +
    "                </div>\n" +
    "              </div><!--\n" +
    "              --><div class=\"grid__item p6--one-half\">\n" +
    "                <div class=\"l-stacked__item\">\n" +
    "                  <label class=\"input-decorator input-decorator--alt\">\n" +
    "                    <input type=\"password\" class=\"input input--alt input--full\"\n" +
    "                           ng-disabled=\"formState == 'waiting' || !tempUser.newPassword\"\n" +
    "                           ng-model=\"tempUser.newPasswordConfirmation\"\n" +
    "                           ng-class=\"{ 'input--error': errors.newPasswordConfirmation }\"\n" +
    "                           ng-change=\"resetErrors()\">\n" +
    "                    <div class=\"input-decorator__label\" ng-if=\"!errors.newPasswordConfirmation\" translate=\"CONFIRM_PASSWORD\">Confirm new password</div>\n" +
    "                    <div class=\"input-decorator__errormsg\" ng-if=\"errors.newPasswordConfirmation\">{{ errors.newPasswordConfirmation | translate }}</div>\n" +
    "                  </label>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-small\">\n" +
    "              <label class=\"input-decorator input-decorator--alt\">\n" +
    "                <input type=\"password\" class=\"input input--alt input--full\" placeholder=\"{{ 'CURRENT_PASSWORD' | translate }}\"\n" +
    "                       ng-disabled=\"formState == 'waiting'\"\n" +
    "                       ng-model=\"tempUser.currentPassword\"\n" +
    "                       ng-class=\"{ 'input--error': errors.currentPassword }\"\n" +
    "                       ng-change=\"resetErrors()\">\n" +
    "                <div class=\"input-decorator__errormsg\" ng-if=\"errors.currentPassword\">{{ errors.currentPassword | translate }}</div>\n" +
    "              </label>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-justified\">\n" +
    "          <div class=\"l-justified__item is-middle-aligned\">\n" +
    "            <button type=\"button\" class=\"form-profile__action-cancel\"\n" +
    "                    ng-click=\"resetDefaults()\"\n" +
    "                    ng-disabled=\"formState == 'waiting'\"><span translate=\"DISCARD\">Discard</span></button>\n" +
    "          </div>\n" +
    "          <div class=\"l-justified__item is-middle-aligned\">\n" +
    "            <button class=\"button button--primary\"\n" +
    "                    ng-click=\"submitProfileInfoForm(tempUser)\"\n" +
    "                    ng-disabled=\"formState == 'waiting'\"\n" +
    "                    translate=\"SAVE\">Save</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("profile/views/dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/views/dashboard.html",
    "<main class=\"page-content\">\n" +
    "  <article>\n" +
    "    <div class=\"content-section-with-cover\">\n" +
    "      <div class=\"content-section-with-cover__coverimg\" style=\"background-image: url({{ user.avatar || '/images/default-avatar.jpg' }});\"></div>\n" +
    "\n" +
    "      <div class=\"content-section-with-cover__content\">\n" +
    "        <div class=\"l-wrap\">\n" +
    "          <div class=\"grid grid--center\">\n" +
    "            <div class=\"grid__item ten-twelfths\">\n" +
    "              <div class=\"user-dashboard\">\n" +
    "                <div class=\"l-stacked l-stacked--large\">\n" +
    "                  <div class=\"user-dashboard__aside\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img ng-src=\"{{ user.avatar || '/images/default-avatar.jpg' }}\" alt=\"\" class=\"user-dashboard__avatar\">\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"user-dashboard__body\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <div class=\"l-supplement\">\n" +
    "                          <div class=\"l-supplement__main\">\n" +
    "                            <h1 class=\"title-primary\">\n" +
    "                              {{ user.name }}\n" +
    "                            </h1>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div class=\"l-supplement__info\">\n" +
    "                            <a href=\"\" class=\"title-supplement content-section__title-supplement link\" popup-modal-opener=\"profile_info\" translate=\"EDIT_PROFILE\">Edit profile</a>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-block-small\">\n" +
    "                          <div class=\"\" ng-if=\"user.hasContentLicence\"><span class=\"label label--primary\">content licence</span></div>\n" +
    "                          <div class=\"\" ng-if=\"user.isAdmin\"><span class=\"label label--quaternary\">admin</span></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"ud-contacts\">\n" +
    "                        <div class=\"l-block-small\">\n" +
    "                          <a href=\"mailto:{{ user.email }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-mail\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\">\n" +
    "                              <div class=\"ud-contacts__item\">{{ user.email }}</div>\n" +
    "                            </div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-block-small\" ng-if=\"user.linkedinUrl\">\n" +
    "                          <a ng-href=\"{{ user.linkedinUrl }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-social-linkedin-alt\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\"><div class=\"ud-contacts__item ud-contacts__item--linkedin\">{{ user.linkedinUrl | socialName }}</div></div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-block-small\" ng-if=\"user.facebookUrl\">\n" +
    "                          <a ng-href=\"{{ user.facebookUrl }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-social-facebook-alt\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\"><div class=\"ud-contacts__item ud-contacts__item--facebook\">{{ user.facebookUrl | socialName }}</div></div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-block-small\" ng-if=\"user.twitterUrl\">\n" +
    "                          <a ng-href=\"{{ user.twitterUrl }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-social-twitter-alt\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\"><div class=\"ud-contacts__item ud-contacts__item--twitter\">{{ user.twitterUrl | socialName }}</div></div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-if=\"user.websiteUrl\">\n" +
    "                          <a ng-href=\"{{ user.websiteUrl }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-social-website\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\"><div class=\"ud-contacts__item ud-contacts__item--twitter\">{{ user.websiteUrl }}</div></div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section class=\"content-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked\">\n" +
    "                <h1 class=\"title-stroked__text\" translate=\"CURRENT_COURSES\">Current courses</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-stacked l-stacked--large\" ng-if=\"user.currentCoursesInfo.length\">\n" +
    "              <div class=\"grid\">\n" +
    "                <div  class=\"grid__item\"\n" +
    "                      ng-class=\"{ 'p6--one-half':   user.currentCoursesInfo.length > 1,\n" +
    "                                  'p10--one-third': user.currentCoursesInfo.length > 2  }\"\n" +
    "                      ng-repeat=\"course in user.currentCoursesInfo\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <course-item course=\"course\"></course-item>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"no-courses-placeholder\">\n" +
    "              <div class=\"l-block-large\" ng-if=\"!user.currentCoursesInfo.length\">\n" +
    "                <div class=\"no-courses-placeholder__title\" translate=\"NO_COURSES_YET\">You have no courses yet</div>\n" +
    "              </div>\n" +
    "\n" +
    "              <a ui-sref=\"courses.all\" class=\"button button--secondary button--large button--rounded\" translate=\"GO_LIBRARY\">Go to library</a>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div ng-if=\"recommendedCourses.length\">\n" +
    "              <div class=\"l-block-large\">\n" +
    "                <div class=\"title-stroked title-stroked--alt\">\n" +
    "                  <h1 class=\"title-stroked__text\" translate=\"RECOMMENDED_COURSES\">Recommended courses</h1>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-large\">\n" +
    "                <div class=\"l-stacked l-stacked--large\">\n" +
    "                  <div class=\"grid\">\n" +
    "                    <div  class=\"grid__item\"\n" +
    "                          ng-class=\"{ 'p6--one-half':   recommendedCourses.length > 1,\n" +
    "                                      'p10--one-third': recommendedCourses.length > 2 }\"\n" +
    "                          ng-repeat=\"course in recommendedCourses\">\n" +
    "                      <div class=\"l-stacked__item\">\n" +
    "                        <course-item course=\"course\"></course-item>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-list-inline is-center-aligned\" ng-if=\"!user.hasContentLicence\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"title-tertiary content-section__title-secondary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                  Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <button class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "\n" +
    "    <section class=\"content-section\" ng-if=\"user.finishedCoursesInfo.length\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-large\">\n" +
    "              <div class=\"title-stroked\">\n" +
    "                <h1 class=\"title-stroked__text\" translate=\"FINISHED_COURSES\">Finished courses</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-stacked l-stacked--large\">\n" +
    "              <div class=\"grid\">\n" +
    "                <div  class=\"grid__item\"\n" +
    "                      ng-class=\"{ 'p6--one-half':   user.finishedCoursesInfo.length > 1,\n" +
    "                                  'p10--one-third': user.finishedCoursesInfo.length > 2  }\"\n" +
    "                      ng-repeat=\"course in user.finishedCoursesInfo\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <course-item course=\"course\"></course-item>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "  </article>\n" +
    "</main>\n" +
    "\n" +
    "<change-profile-info ng-show=\"isPopupVisible('profile_info')\" popup-window=\"profile_info\"></change-profile-info>");
}]);

angular.module("profile/views/profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/views/profile.html",
    "<main class=\"page-content\">\n" +
    "  <article>\n" +
    "    <div class=\"content-section\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-x-large\">\n" +
    "              <div class=\"user-dashboard\">\n" +
    "                <div class=\"l-stacked l-stacked--large\">\n" +
    "                  <div class=\"user-dashboard__aside\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <img ng-src=\"{{ user.avatar || '/images/default-avatar.jpg' }}\" alt=\"\" class=\"ud-avatar\">\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"user-dashboard__body\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <div class=\"l-block\">\n" +
    "                        <div class=\"l-supplement\">\n" +
    "                          <div class=\"l-supplement__main\">\n" +
    "                            <h1 class=\"content-section__title-primary\">{{ user.name }}</h1>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"ud-contacts\">\n" +
    "                        <div class=\"l-block\">\n" +
    "                          <a href=\"mailto:{{ user.email }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-mail\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\">\n" +
    "                              <div class=\"ud-contacts__item\">{{ user.email }}</div>\n" +
    "                            </div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-block\" ng-if=\"user.linkedinUrl\">\n" +
    "                          <a ng-href=\"{{ user.linkedinUrl }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-social-linkedin-alt\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\"><div class=\"ud-contacts__item ud-contacts__item--linkedin\">{{ user.linkedinUrl | socialName }}</div></div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-block\" ng-if=\"user.facebookUrl\">\n" +
    "                          <a ng-href=\"{{ user.facebookUrl }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-social-facebook-alt\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\"><div class=\"ud-contacts__item ud-contacts__item--facebook\">{{ user.facebookUrl | socialName }}</div></div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-block\" ng-if=\"user.twitterUrl\">\n" +
    "                          <a ng-href=\"{{ user.twitterUrl }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-social-twitter-alt\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\"><div class=\"ud-contacts__item ud-contacts__item--twitter\">{{ user.twitterUrl | socialName }}</div></div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-if=\"user.websiteUrl\">\n" +
    "                          <a ng-href=\"{{ user.websiteUrl }}\" class=\"l-list-inline\">\n" +
    "                            <div class=\"l-list-inline__item\"><i class=\"icon-social-website\"></i></div>\n" +
    "                            <div class=\"l-list-inline__item\"><div class=\"ud-contacts__item ud-contacts__item--twitter\">{{ user.websiteUrl }}</div></div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <section>\n" +
    "              <div class=\"l-block-x-large\">\n" +
    "                <div class=\"cs-title-stroked\">\n" +
    "                  <h1 class=\"cs-title-stroked__text\" translate=\"CURRENT_COURSES\">Current courses</h1>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"cs-placeholder\" ng-if=\"!user.currentCoursesInfo.length\">\n" +
    "                <div class=\"l-block-large\">\n" +
    "                  <div class=\"cs-placeholder__title\" translate=\"NO_COURSES_YET\">You have no courses yet</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <a ui-sref=\"courses.all\" class=\"button button--secondary button--large button--rounded\" translate=\"GO_LIBRARY\">Go to library</a>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-stacked l-stacked--large\" ng-if=\"user.currentCoursesInfo.length\">\n" +
    "                <div class=\"grid\">\n" +
    "                  <div class=\"grid__item p6--one-half p10--one-third\" ng-repeat=\"course in user.currentCoursesInfo\">\n" +
    "                    <div class=\"l-stacked__item\">\n" +
    "                      <a ng-href=\"/courses/{{ course.id }}\" class=\"course-tile\">\n" +
    "                        <section>\n" +
    "                          <div class=\"course-tile__coverimg\" style=\"background-image: url('{{ course.image }}')\"></div>\n" +
    "\n" +
    "                          <div class=\"course-tile__block-top\">\n" +
    "                            <div class=\"l-block-small\">\n" +
    "                              <div class=\"l-media l-media--rev\">\n" +
    "\n" +
    "                                <div class=\"l-media__body\">\n" +
    "                                  <h1 class=\"course-tile__name\">{{ course.name }}</h1>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"l-block-small\">\n" +
    "                              <div class=\"ct-info__rating\">\n" +
    "                                <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                                  <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                  <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                  <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                  <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                  <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"course-tile__company\">{{ course.companyName }}</div>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div class=\"course-tile__block-bottom\">\n" +
    "                            <div class=\"l-split\">\n" +
    "                              <div class=\"l-split__right is-middle-aligned\">\n" +
    "                                <div class=\"course-tile__price\" ng-if=\"!alreadyBought()\">{{ course.price | currencyFormat }}</div>\n" +
    "                                <div class=\"course-tile__price\" ng-if=\"alreadyBought()\">{{ progress }}%</div>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <div class=\"l-split__left is-middle-aligned\" ng-if=\"course.instructors.length > 0\">\n" +
    "                                <div class=\"ct-instructor\">\n" +
    "                                  <div class=\"ct-instructor__name\">{{course.instructors[0].name}}</div>\n" +
    "                                  <div class=\"ct-instructor__role\">{{course.instructors[0].role || 'Studytube expert'}}</div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "                          </div>\n" +
    "                        </section>\n" +
    "                      </a>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </section>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <aside class=\"content-section content-section--contrast\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <aside>\n" +
    "              <div class=\"l-block-x-large\">\n" +
    "                <div class=\"cs-title-stroked cs-title-stroked--alt\">\n" +
    "                  <h1 class=\"cs-title-stroked__text\" translate=\"RECOMMENDED_COURSES\">Recommended courses</h1>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-block-x-large\">\n" +
    "                <div class=\"l-stacked l-stacked--large\">\n" +
    "                  <div class=\"grid\">\n" +
    "                    <div class=\"grid__item p6--one-half p10--one-third\">\n" +
    "                      <div class=\"l-stacked__item\">\n" +
    "                        <a href=\"\" class=\"course-tile\">\n" +
    "                          <section>\n" +
    "                            <div class=\"course-tile__coverimg\" style=\"background-image: url('https://dl.dropboxusercontent.com/u/102253740/course3.png')\"></div>\n" +
    "\n" +
    "                            <div class=\"course-tile__block-top\">\n" +
    "                              <div class=\"l-block-small\">\n" +
    "                                <div class=\"l-media l-media--rev\">\n" +
    "\n" +
    "                                  <div class=\"l-media__body\">\n" +
    "                                    <h1 class=\"course-tile__name\">Effective Corporate Marketing</h1>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <div class=\"l-block-small\">\n" +
    "                                <div class=\"ct-info__rating\">\n" +
    "                                  <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <div class=\"course-tile__company\">HVDS</div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"course-tile__block-bottom\">\n" +
    "                              <div class=\"l-split\">\n" +
    "                                <div class=\"l-split__right is-middle-aligned\">\n" +
    "                                  <div class=\"course-tile__price\" ng-if=\"!alreadyBought()\">{{ course.price | currencyFormat }}</div>\n" +
    "                                  <div class=\"course-tile__price\" ng-if=\"alreadyBought()\">{{ progress }}%</div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"l-split__left is-middle-aligned\">\n" +
    "                                  <div class=\"ct-instructor\">\n" +
    "                                    <div class=\"ct-instructor__name\">Jennifer Boskeljon</div>\n" +
    "                                    <div class=\"ct-instructor__role\">Online marketing expert</div>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "                          </section>\n" +
    "                        </a>\n" +
    "                      </div>\n" +
    "                    </div><!--\n" +
    "                    --><div class=\"grid__item p6--one-half p10--one-third\">\n" +
    "                      <div class=\"l-stacked__item\">\n" +
    "                        <a href=\"\" class=\"course-tile\">\n" +
    "                          <section>\n" +
    "                            <div class=\"course-tile__coverimg\" style=\"background-image: url('https://dl.dropboxusercontent.com/u/102253740/course3.png')\"></div>\n" +
    "\n" +
    "                            <div class=\"course-tile__block-top\">\n" +
    "                              <div class=\"l-block-small\">\n" +
    "                                <div class=\"l-media l-media--rev\">\n" +
    "\n" +
    "                                  <div class=\"l-media__body\">\n" +
    "                                    <h1 class=\"course-tile__name\">Effective Corporate Marketing</h1>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <div class=\"l-block-small\">\n" +
    "                                <div class=\"ct-info__rating\">\n" +
    "                                  <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <div class=\"course-tile__company\">HVDS</div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"course-tile__block-bottom\">\n" +
    "                              <div class=\"l-split\">\n" +
    "                                <div class=\"l-split__right is-middle-aligned\">\n" +
    "                                  <div class=\"course-tile__price\" ng-if=\"!alreadyBought()\">{{ course.price | currencyFormat }}</div>\n" +
    "                                  <div class=\"course-tile__price\" ng-if=\"alreadyBought()\">{{ progress }}%</div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"l-split__left is-middle-aligned\">\n" +
    "                                  <div class=\"ct-instructor\">\n" +
    "                                    <div class=\"ct-instructor__name\">Jennifer Boskeljon</div>\n" +
    "                                    <div class=\"ct-instructor__role\">Online marketing expert</div>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "                          </section>\n" +
    "                        </a>\n" +
    "                      </div>\n" +
    "                    </div><!--\n" +
    "                    --><div class=\"grid__item p6--one-half p10--one-third\">\n" +
    "                      <div class=\"l-stacked__item\">\n" +
    "                        <a href=\"\" class=\"course-tile\">\n" +
    "                          <section>\n" +
    "                            <div class=\"course-tile__coverimg\" style=\"background-image: url('https://dl.dropboxusercontent.com/u/102253740/course3.png')\"></div>\n" +
    "\n" +
    "                            <div class=\"course-tile__block-top\">\n" +
    "                              <div class=\"l-block-small\">\n" +
    "                                <div class=\"l-media l-media--rev\">\n" +
    "\n" +
    "                                  <div class=\"l-media__body\">\n" +
    "                                    <h1 class=\"course-tile__name\">Effective Corporate Marketing</h1>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <div class=\"l-block-small\">\n" +
    "                                <div class=\"ct-info__rating\">\n" +
    "                                  <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                    <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <div class=\"course-tile__company\">HVDS</div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"course-tile__block-bottom\">\n" +
    "                              <div class=\"l-split\">\n" +
    "                                <div class=\"l-split__right is-middle-aligned\">\n" +
    "                                  <div class=\"course-tile__price\" ng-if=\"!alreadyBought()\">$199</div>\n" +
    "                                  <div class=\"course-tile__price\" ng-if=\"alreadyBought()\">{{ progress }}%</div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"l-split__left is-middle-aligned\">\n" +
    "                                  <div class=\"ct-instructor\">\n" +
    "                                    <div class=\"ct-instructor__name\">Jennifer Boskeljon</div>\n" +
    "                                    <div class=\"ct-instructor__role\">Online marketing expert</div>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "                          </section>\n" +
    "                        </a>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline is-center-aligned\">\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                  <div class=\"content-section__title-tertiary\" translate=\"ADV_SUBSCRIPTION\">\n" +
    "                    Master hundreds of courses only for <strong>€49</strong> per month.\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                  <button class=\"button button--primary button--rounded\" ng-click=\"startSubscription()\" translate=\"START_SUBSCRIPTION\">Start subscription</button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </aside>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </aside>\n" +
    "\n" +
    "    <section class=\"content-section\" ng-if=\"user.finishedCoursesInfo.length\">\n" +
    "      <div class=\"l-wrap\">\n" +
    "        <div class=\"grid grid--center\">\n" +
    "          <div class=\"grid__item ten-twelfths\">\n" +
    "            <div class=\"l-block-x-large\">\n" +
    "              <div class=\"cs-title-stroked\">\n" +
    "                <h1 class=\"cs-title-stroked__text\" translate=\"FINISHED_COURSES\">Finished courses</h1>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-stacked l-stacked--large\">\n" +
    "              <div class=\"grid\">\n" +
    "                <div class=\"grid__item p6--one-half p10--one-third\" ng-repeat=\"course in user.finishedCoursesInfo\">\n" +
    "                  <div class=\"l-stacked__item\">\n" +
    "                    <a ng-href=\"/courses/{{ course.id }}\" class=\"course-tile\">\n" +
    "                      <section>\n" +
    "                        <div class=\"course-tile__coverimg\" style=\"background-image: url('{{ course.image }}')\"></div>\n" +
    "\n" +
    "                        <div class=\"ct-info\">\n" +
    "                          <div class=\"l-block-small\">\n" +
    "                            <div class=\"l-media l-media--rev\">\n" +
    "                              <div class=\"l-media__figure\">\n" +
    "                                <div class=\"ct-info__price\">€{{ course.price }}</div>\n" +
    "                              </div>\n" +
    "\n" +
    "                              <div class=\"l-media__body\">\n" +
    "                                <h1 class=\"ct-info__name\">{{ course.name }}</h1>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div class=\"l-block-small\">\n" +
    "                            <div class=\"ct-info__rating\">\n" +
    "                              <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                                <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                                <div class=\"l-list-inline__item\"><i class=\"icon-star-small\"></i></div>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "                          </div>\n" +
    "\n" +
    "                          <div class=\"ct-info__company\">HVDS</div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"ct-instructor\">\n" +
    "                          <div class=\"l-list-inline l-list-inline--small\">\n" +
    "                            <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                              <img src=\"http://api.randomuser.me/portraits/women/10.jpg\" alt=\"\" class=\"ct-instructor__avatar\">\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                              <div class=\"ct-instructor__name\">Jennifer Boskeljon</div>\n" +
    "                              <div class=\"ct-instructor__role\">Online marketing expert</div>\n" +
    "                            </div>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </section>\n" +
    "                    </a>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "  </article>\n" +
    "</main>\n" +
    "");
}]);

var mocks = mocks || {};
mocks["categories"] = [
  {
    "id": 1,
    "name": "Social media",
    "coursesCount": 40
  },
  {
    "id": 2,
    "name": "Online marketing",
    "coursesCount": 13
  },
  {
    "id": 3,
    "name": "Managementvaardigheden",
    "coursesCount": 41
  },
  {
    "id": 4,
    "name": "Persoonlijke effectiviteit",
    "coursesCount": 32
  },
  {
    "id": 5,
    "name": "Mondelinge communicatie",
    "coursesCount": 23
  },
  {
    "id": 6,
    "name": "Projectmanagement",
    "coursesCount": 23
  },
  {
    "id": 7,
    "name": "Sales",
    "coursesCount": 23
  },
  {
    "id": 8,
    "name": "Schriftelijke communicatie",
    "coursesCount": 23
  },
  {
    "id": 9,
    "name": "Personeel (HR)",
    "coursesCount": 23
  },
  {
    "id": 10,
    "name": "New employees",
    "coursesCount": 23
  },
  {
    "id": 11,
    "name": "Onboarding",
    "coursesCount": 23
  }
];
mocks["courses"] = [
  {
    "id": 1,
    "name": "Studytube Front-End Conventions",
    "image": "https://coursera-course-photos.s3.amazonaws.com/45/ef62b46517da6fa6b8db0adb855655/courseraLogo1.png",
    "categories": [],
    "isImported": false,
    "isPublished": true,
    "price": 0,
    "instructors": [1]
  },
  {
    "id": 2,
    "name": "Studytube Back-End Conventions",
    "image": "https://coursera-course-photos.s3.amazonaws.com/82/ba34c07bc211e38a5859d9e672d671/coursera_course_logo.png",
    "categories": [1,2],
    "isImported": false,
    "isPublished": false,
    "price": 0,
    "instructors": [1]
  },
  {
    "id": 3,
    "name": "Constitutional Law",
    "image": "https://coursera-course-photos.s3.amazonaws.com/e0/b203dbc0f0ad61320e026e7f1e73ac/ConLaw_Coursera_1200x680.jpg",
    "categories": [1,3],
    "isImported": true,
    "isPublished": true,
    "price": 149,
    "instructors": [1,2,3]
  },
  {
    "id": 4,
    "name": "On Strategy : What Managers Can Learn from Great Philosophers",
    "image": "https://coursera-course-photos.s3.amazonaws.com/65/33227246f85534536d3356528a3a91/logo_cours_LucDB.png",
    "categories": [2,3],
    "isImported": true,
    "isPublished": true,
    "price": 99,
    "instructors": [2]
  },
  {
    "id": 5,
    "name": "Climate Change in Four Dimensions",
    "image": "https://coursera-course-photos.s3.amazonaws.com/f9/33e024a5646a18e25c24821ab65360/Earth1.jpg",
    "categories": [],
    "isImported": true,
    "isPublished": true,
    "price": 299,
    "instructors": [2]
  },
  {
    "id": 6,
    "name": "Discrete Inference and Learning in Artificial Vision",
    "image": "https://coursera-course-photos.s3.amazonaws.com/c4/92c895d16927e3a67f5a8eb9d6369e/cours-nikos-3.jpg",
    "categories": [1,5],
    "isImported": true,
    "isPublished": true,
    "price": 499,
    "instructors": [2]
  },
  {
    "id": 7,
    "name": "Practical Machine Learning",
    "image": "https://coursera-course-photos.s3.amazonaws.com/a3/816f2069b611e3af9a07984d9d273b/PredictionMachineLearning.jpg",
    "categories": [2,4],
    "isImported": true,
    "isPublished": true,
    "price": 249,
    "instructors": [2]
  },
  {
    "id": 8,
    "name": "Practical Machine Learning",
    "image": "https://coursera-course-photos.s3.amazonaws.com/a3/816f2069b611e3af9a07984d9d273b/PredictionMachineLearning.jpg",
    "categories": [3],
    "isImported": true,
    "isPublished": true,
    "price": 249,
    "instructors": [2]
  }
];
mocks["instructors"] = [
  {
    "id": 1,
    "name": "Michael Grinko",
    "teaching": []
  }
];
mocks["users"] = [
  {
    "id": 1,
    "academyId": 77,
    "name": "Susan Griffin",
    "email": "susan.griffin58@example.com",
    "avatar": "http://api.randomuser.me/portraits/women/82.jpg",
    "groups": [3, 2],
    "hasContentLicence": true,
    "isAdmin": true,
    "isPending": false
  },
  {
    "id": 2,
    "academyId": 77,
    "name": "Rene Lowe",
    "email": "rene.lowe57@example.com",
    "avatar": "http://api.randomuser.me/portraits/men/52.jpg",
    "groups": [3, 2],
    "hasContentLicence": true,
    "isAdmin": true,
    "isPending": false
  },
  {
    "id": 3,
    "academyId": 77,
    "name": "Samantha Walters",
    "email": "samantha.walters90@example.com",
    "avatar": "http://api.randomuser.me/portraits/women/75.jpg",
    "groups": [1],
    "hasContentLicence": false,
    "isAdmin": false,
    "isPending": false
  },
  {
    "id": 4,
    "academyId": 77,
    "name": "Daniel Lawson",
    "email": "daniel.lawson22@example.com",
    "avatar": "http://api.randomuser.me/portraits/men/73.jpg",
    "groups": [],
    "hasContentLicence": false,
    "isAdmin": false,
    "isPending": false
  },
  {
    "id": 5,
    "academyId": 77,
    "name": "Austin Reynolds",
    "email": "austin.reynolds29@example.com",
    "avatar": "http://api.randomuser.me/portraits/men/52.jpg",
    "groups": [3, 4],
    "hasContentLicence": false,
    "isAdmin": false,
    "isPending": false
  },
  {
    "id": 6,
    "academyId": 77,
    "name": null,
    "email": "ashley.fowler97@example.com",
    "avatar": "http://api.randomuser.me/portraits/women/33.jpg",
    "groups": [2, 5],
    "hasContentLicence": false,
    "isAdmin": false,
    "isPending": true
  }
];