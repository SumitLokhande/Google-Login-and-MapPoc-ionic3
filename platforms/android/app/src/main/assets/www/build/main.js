webpackJsonp([1],{

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		273,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 152;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_google_plus__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_open_native_settings__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var map;
var infowindow;
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
var HomePage = /** @class */ (function () {
    function HomePage(openNativeSettings, diagnostic, platform, navCtrl, googlePlus, alertCtrl, toastCtrl, geolocation) {
        var _this = this;
        this.openNativeSettings = openNativeSettings;
        this.diagnostic = diagnostic;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.googlePlus = googlePlus;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.geolocation = geolocation;
        this.diagnostic.isGpsLocationEnabled().then(function (res) {
            console.log(res, "diagnostics");
            if (res) {
                console.log("1 achived ");
                _this.initMap();
            }
            else {
                var confirm_1 = _this.alertCtrl.create({
                    title: 'Use this lightsaber?',
                    message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
                    buttons: [
                        {
                            text: 'Disagree',
                            handler: function () {
                                console.log('Disagree clicked');
                            }
                        },
                        {
                            text: 'Agree',
                            handler: function () {
                                _this.openNativeSettings.open('location');
                            }
                        }
                    ]
                });
                confirm_1.present();
            }
        });
        this.onResumeSubscription = platform.resume.subscribe(function () {
            _this.initMap();
            // do something meaningful when the app is put in the foreground
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.initMap = function () {
        var _this = this;
        console.log("2 achived ");
        navigator.geolocation.getCurrentPosition(function (location) {
            console.log(location);
            map = new google.maps.Map(_this.mapElement.nativeElement, {
                center: { lat: location.coords.latitude, lng: location.coords.longitude },
                zoom: 15
            });
            console.log("map object ", map);
            infowindow = new google.maps.InfoWindow();
            console.log("infowidnow ", infowindow);
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: { lat: location.coords.latitude, lng: location.coords.longitude },
                radius: 1000,
                type: ['hospital']
            }, function (results, status) {
                console.log(" result ", results);
                console.log(" status ", status);
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(" stattus condition  ", status);
                    for (var i = 0; i < results.length; i++) {
                        console.log(" Creating marker ");
                        _this.createMarker(results[i]);
                    }
                }
            });
        }, function (error) {
            console.log(error);
        }, options);
    };
    HomePage.prototype.createMarker = function (place) {
        var placeLoc = place.geometry.location;
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        var marker = new google.maps.Marker({
            map: map,
            position: placeLoc,
            icon: image
        });
        var marker = new google.maps.Marker({
            map: map,
            position: placeLoc
        });
        google.maps.event.addListener(marker, 'click', function () {
            // infowindow.setContent(place.name);
            // infowindow.open(map, this);
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<br>' +
                place.vicinity + '</div>');
            infowindow.open(map, this);
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Logout?',
            message: 'Do you want to Logout?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        _this.googlePlus.logout().then(function (res) {
                            var toast = _this.toastCtrl.create({
                                message: 'Logout Successful',
                                duration: 3000
                            });
                            toast.present();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\code\ExaDatumProject\Google-Login-and-MapPoc-ionic3\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Ionic Blank\n\n    </ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only color="royal" (click)=\'logout()\'>\n\n        <ion-icon name="md-log-out" ></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div #map id="map"></div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\code\ExaDatumProject\Google-Login-and-MapPoc-ionic3\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_native_open_native_settings__["a" /* OpenNativeSettings */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_open_native_settings__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\code\ExaDatumProject\Google-Login-and-MapPoc-ionic3\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\code\ExaDatumProject\Google-Login-and-MapPoc-ionic3\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, googlePlus, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.googlePlus = googlePlus;
        this.toastCtrl = toastCtrl;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.googlePlus.login({})
            .then(function (res) {
            var toast = _this.toastCtrl.create({
                message: 'Login Successful',
                duration: 3000
            });
            toast.present();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        })
            .catch(function (err) { return console.error(err); });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\code\ExaDatumProject\Google-Login-and-MapPoc-ionic3\src\pages\login\login.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>login</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-card >\n\n\n\n        <ion-card-header text-center>\n\n         Welcome To Google Maps App\n\n        </ion-card-header>\n\n      \n\n        <ion-card-content >\n\n          <button ion-button full color="Primary" (click)=\'login()\'>Login with Google Plus</button><!-- Add card content here! -->\n\n        </ion-card-content>\n\n      \n\n      </ion-card>\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"C:\code\ExaDatumProject\Google-Login-and-MapPoc-ionic3\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map