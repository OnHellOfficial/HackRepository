
 // core:start
 (async () => {
    class _3833090 {
      constructor() {
        this.developer = "Raga Games";
        this.gameModes = [];
        this.skins = [];
        this.shops = [];
        this.agarioSkins = [];
        this.gameMode = null;
        this.pendingGameMode = null;
        this.isClean = false;
        this.isIgnoringTeams = false;
        this.isSwitchingGameMode = false;
        this.isUiRefreshed = false;
        this.isSetup = false;
        this.isLogged = false;
        this.isAuthSent = false;
        this.profileImage = null;
        this.profileName = null;
        this.ident = null;
        this.money = null;
        this.skin = null;
        this.minions = null;
        this.friends = [];
        this.ownedSkins = [];
        this.listenLoop = null;
        this.settings = [{
          'ident': "connection",
          'section': "general",
          'name': "Connection",
          'value': localStorage.getItem('connection') && JSON.parse(localStorage.getItem("connection")).value || '0',
          'toggle': false,
          'command': [{
            'value': '0',
            'name': "Europe"
          }, {
            'value': '1',
            'name': "Cloudflare"
          }, {
            'value': '2',
            'name': 'America'
          }, {
            'value': '3',
            'name': "Asia"
          }]
        }, {
          'ident': "viewport",
          'section': "general",
          'name': "Viewport",
          'value': '0',
          'toggle': false,
          'command': [{
            'value': '0',
            'name': "Max"
          }, {
            'value': '1',
            'name': "Large"
          }, {
            'value': '2',
            'name': "Medium"
          }, {
            'value': '3',
            'name': "Small"
          }]
        }, {
          'ident': "player-split",
          'section': 'player',
          'name': 'Split',
          'value': " ",
          'toggle': false,
          'command': () => {
            window.core.split();
          }
        }, {
          'ident': 'player-eject',
          'section': 'player',
          'name': "Eject Mass",
          'value': 'w',
          'toggle': false,
          'command': () => {
            window.core.eject();
          }
        }, {
          'ident': "player-macro",
          'section': "player",
          'name': "Macro Feed",
          'value': 'a',
          'toggle': true,
          'command': (_7020938 = false) => {
            if (this.gameModes.find(_4056607 => _4056607.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([!_7020938 ? 150 : 151]));
            }
          }
        }, {
          'ident': 'player-stop',
          'section': "player",
          'name': "Stop Cell",
          'value': 'd',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_2181456 => _2181456.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([144]));
            } else {
              this.isPlayerStopped = !this.isPlayerStopped;
            }
          }
        }, {
          'ident': 'player-split-2',
          'section': 'player',
          'name': "Double Split",
          'value': 'q',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_4571523 => _4571523.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([154]));
            } else {
              window.core.split();
              setTimeout(() => {
                window.core.split();
              }, 80);
            }
          }
        }, {
          'ident': "player-split-3",
          'section': "player",
          'name': "Triple Split",
          'value': 'r',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_5685324 => _5685324.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([155]));
            } else {
              window.core.split();
              setTimeout(() => {
                window.core.split();
                setTimeout(() => {
                  window.core.split();
                }, 80);
              }, 80);
            }
          }
        }, {
          'ident': 'player-split-4',
          'section': "player",
          'name': "Quadruple Split",
          'value': "tab",
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_3667964 => _3667964.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([156]));
            } else {
              window.core.split();
              setTimeout(() => {
                window.core.split();
                setTimeout(() => {
                  window.core.split();
                  setTimeout(() => {
                    window.core.split();
                  }, 80);
                }, 80);
              }, 80);
            }
          }
        }, {
          'ident': "player-split-max",
          'section': "player",
          'name': "Max Split",
          'value': 'e',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_1915269 => _1915269.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([157]));
            } else {
              window.core.split();
              setTimeout(() => {
                window.core.split();
                setTimeout(() => {
                  window.core.split();
                  setTimeout(() => {
                    window.core.split();
                    setTimeout(() => {
                      window.core.split();
                    }, 80);
                  }, 80);
                }, 80);
              }, 80);
            }
          }
        }, {
          'ident': "player-h-stop",
          'section': 'player',
          'name': "Horizontal Line Stop",
          'value': 't',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_2643042 => _2643042.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([145]));
            }
          }
        }, {
          'ident': 'player-v-stop',
          'section': "player",
          'name': "Vertical Line Stop",
          'value': 'y',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_7575788 => _7575788.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([146]));
            }
          }
        }, {
          'ident': 'minion-split',
          'section': "minion",
          'name': "Split",
          'value': 'x',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_3027331 => _3027331.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([147]));
            }
          }
        }, {
          'ident': "minion-eject",
          'section': "minion",
          'name': "Eject Mass",
          'value': 'c',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_3492027 => _3492027.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([148]));
            }
          }
        }, {
          'ident': "minion-macro",
          'section': "minion",
          'name': "Macro Feed",
          'value': 'z',
          'toggle': true,
          'command': (_1772617 = false) => {
            if (this.gameModes.find(_1775717 => _1775717.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([!_1772617 ? 152 : 153]));
            }
          }
        }, {
          'ident': "minion-invert",
          'section': "minion",
          'name': "Invert",
          'value': 's',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_4936346 => _4936346.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([149]));
            }
          }
        }, {
          'ident': "minion-split-2",
          'section': 'minion',
          'name': "Double Split",
          'value': 'v',
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_4574711 => _4574711.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([158]));
            }
          }
        }, {
          'ident': "minion-split-max",
          'section': 'minion',
          'name': "Max Split",
          'value': "shift",
          'toggle': false,
          'command': () => {
            if (this.gameModes.find(_6204083 => _6204083.type === this.gameMode)) {
              window.core.proxyMobileData(new Uint8Array([159]));
            }
          }
        }];
        this.changingSettings = null;
        this.isPlayerStopped = false;
        this.tournamentMode = null;
        this.tournament = {};
        this.survivorCoins = null;
        this.serverFatMinions = null;
        this.defaultProfile = RegExp().constructor.name[5] + "true"[1] + ("" + [][[]])[3] + "false"[1] + "object"[4] + "true"[0];
        this.canvas = document.getElementById('canvas').getContext('2d');
        this.hud = {
          'counter': document.createElement("canvas").getContext('2d'),
          'tournamentCounter': document.createElement("canvas").getContext('2d'),
          'images': {
            'gameMode': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOElEQVQ4jYWTPU7DYAyGMyAqNiYIBcRQqczd4ACMbGz0AB1YmLgB6iXo1gvAASgM7cLCr5jK1AlBmQH1QS+yJTfJB5YsJbbf5/tsJxkwZd5egBzICp5bLtp7RrUNgVoALALXVZUR0AZG4b0XAL0QH1ltCaDEZoDMgBZwHGpugK14kADjBKQL7AFfiQNkYx/OsABZBxrAa+pk06x5jxrYmSWegQ3g/g9xH1iStriqI2AbOE+Iv4GTqInihrVzmuj5zWaSW20JsA9MbPpF8SPQtMFOrLYEWLD9fgK7QXxhM9mxXNtq5wArwC1wGCAza2cZeAriA+ABqDtAYgV8SA7RVdWvXM8u9u9C26oLcBXWI7uzK6pPDUuuZ8WUizYQ4CNEdNXVij/RXTnVuE0V7Bjk8h9xhAx+NdD5Aav6iVHfXkoVAAAAAElFTkSuQmCC",
            'logo': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAjCAYAAACD1LrRAAAB4klEQVRYhe2Yr0sEQRTHn4pgOeFQUcQgWBUMgj+CwT9ABE0mu0nUcu0MFoNFMBqtilw40Go1GOQODlGD4cIFixj8yMhbWO52Z+etJxa/MLA3+77fzw07O/e4HkByaFJELtW2JiKP5ggHNoxe4JhOubk+S1ZoYQEoAa0EaKSW1hS6CZ4DPj3QSJ9a+yPwOFCMfXb74cgDPdKaqL6oGSbwjoa9Agtt9yaA6xjwRufiNfPqRbMywcvAU8JqLoHhttotHfG5IeAiwf+k2R3gMaAa8AwPgZGEFYzovax9UFXWN3g/ABjXSQL4xJix70z1wOImsOHZjOtaE6K6MzwEFB4YDoeDgLyHLHAFGDWebqKeSl5wKQewfZTSwL2eY7yW59cjNMMHHugCODXDB/5V/YP/wX8Cfu9CfmqGD7zYBXB6RsZZfQ/M5jgqZ9WbelZnPeNpEbkTkXMRGQxYYUFr79SbLqDm+WZxue5iz7PK3cBO1KnmDJvAR6DB6QVYiQHd9bPB71ibkbkfODWYnc50WHSqrI4ucwq4NYaF6FazM/vqVUP/5FNTs4Ib+miUfwAt+7JD3knXM18ZgFcpvbcZHI0loOEBNrQmKC9PA7fd9vq5azdnysn7j4A7oWb0+l5E3kxuEfkCKdARvF9Gsr4AAAAASUVORK5CYII=",
            'minions': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4jc1RQQ6AIAzbPPgA/bRHvXvzfewLNRggc044aKJNliwtNNDSPwCgB7AACAAk7ZGjNK5eHg9gxhWTMnB1bRCcA0EZuHq82z3NMBtsjraqva6rkKQRotyFaKfVyjE1g1YrxYCzgUFMeDCcENGoCWZ+rwWLVitnVEK8a8X79hcgoh0uZVrRbeA4UAAAAABJRU5ErkJggg=='
          },
          'utils': {
            'roundedRectangle': (_2434571, _5054930, _3433151, _12338455, _6930641, _3103270) => {
              _2434571.beginPath();
              _2434571.moveTo(_5054930 + _3103270, _3433151);
              _2434571.arcTo(_5054930 + _12338455, _3433151, _5054930 + _12338455, _3433151 + _6930641, _3103270);
              _2434571.arcTo(_5054930 + _12338455, _3433151 + _6930641, _5054930, _3433151 + _6930641, _3103270);
              _2434571.arcTo(_5054930, _3433151 + _6930641, _5054930, _3433151, _3103270);
              _2434571.arcTo(_5054930, _3433151, _5054930 + _12338455, _3433151, _3103270);
              _2434571.closePath();
              return _2434571;
            },
            'getGameMode': () => {
              if (this.gameMode === "ffa") {
                return "FFA";
              }
              if (this.gameMode === "battleroyale") {
                return "Battle Royale";
              }
              if (this.gameMode === "teams") {
                return "Teams";
              }
              if (this.gameMode === "experimental") {
                return "Experimental";
              }
              if (this.gameMode === 'party') {
                return "Party";
              }
              const _5404028 = this.gameModes.find(_3793626 => _3793626.type === this.gameMode);
              if (_5404028) {
                return _5404028.shortName;
              }
              return "Loading...";
            },
            'getMinions': () => {
              if (this.isLogged) {
                return this.minions.loaded + this.minions.fatAmount + " / " + (this.minions.amount + this.minions.fatAmount);
              }
              return "Sign in";
            },
            'getSurvivorCoins': () => {
              if (this.survivorCoins) {
                return this.survivorCoins + " RC";
              }
              return "0 RC";
            }
          }
        };
        this.loadConfig().then(() => {
          this.updateCss();
          this.hookListeners();
          this.startObserver();
        })["catch"](() => {});
      }
      async ["loadConfig"]() {
        const _7766612 = await fetch("https://minions.raga.pw/ragamode/config", {
          'cache': "no-store"
        }).then(_1545159 => _1545159.json())["catch"](() => {});
        if (!_7766612) {
          return Promise.reject();
        }
        this.gameModes = _7766612.gameModes;
        this.skins = _7766612.skins;
        this.shops = _7766612.shops;
        return Promise.resolve();
      }
      ['updateCss']() {
        let _3488522 = '';
        _3488522 += "#adsTop, #adsBottom, #adsLeft, #adsRight, #adsGameOver, #captchaWindowV3, .discord { visibility: hidden; }";
        _3488522 += "#new-skinButton { position: relative; left: 25px; cursor: pointer; }";
        _3488522 += "#new-skinButton>.skinWrapper { position: absolute; width: 46px; height: 46px; border: 3px solid rgb(131, 131, 131); -webkit-mask-image: -webkit-radial-gradient(white, black); overflow: hidden; }";
        _3488522 += ".raga-coins { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZTVmOWZjNi1iZDUzLTkzNDktODQ1My0zODRkYmJhZTczZjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjMwOUIyOTAxQjY2MTFFQkJEM0JBOEE4Nzc1NDVBMjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjMwOUIyOEYxQjY2MTFFQkJEM0JBOEE4Nzc1NDVBMjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFkOWU5YTc1LTU4OTctYTE0ZS1hMmE1LWNmZjBmY2I4Y2U5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjUyMWI4N2UxLWVmYzAtZTQ0Ni04NDU1LTM5NDVkMDRjNGQ4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psqsbw4AAAM9SURBVHjaXFRNSFRRFP7efc8ZdX511ETFNFJMxYVSRoRtSyKkyFXUIqGV0bIWQpsIWgtBq0KCWhRGJLUpNwWJuMn8SVFL08bxZ5z/0Zl5fXfeHXjMhY/33r3nfuec75zztMziBMyjJIy/n4CjOLEDwFGGbPISEuEB5Mw2HMUAwwXoYhVl7nE4vB+QSUZQWkNbHQh0ASUeGGZiF6YQQDoCZEkW27iG2PYDaLs98OUAL+2dxBERwWnsYRC56jmUVz6BKH0BaDxLAodxGNCM/DeEriG89hSxpTtoPAROca+S4HH+3CQyxAGxEGrH6u5zhtMPf8staCIFaappOWmtIb75DLEfQ+jlZ6u6nFUE9iUdnCfqee/b7CAiDgOBnkEGkxV6eAHGn4kb2JkcwlkatSmCrIrIsEFX+zLlE4o0OnMVoel7yMRoEp51ITg9gibTiuhQRSCJqDtCtqjKiRr1Lu2aiCDx6/t9CIwZSIUo6HoLOriZs12UkawQMxWAf99KO062kwnkMyhoKDNZ2apCInhTIJUaQIAbfpVCYZlKbB+JrvB5nWgm0bKHqcmCKeduoppIJfoFktsd+fLrRUJnVJoOgnzYVM+yqNUqprITKpD0bouBTMSLkiIiqVdKQYr9hUiyaSvYh32q7+ySyPvZqFugxHeQv2Bf0ltCasSU2vm8LCOKW21RX0QE5VD3RAVKq2cRLtJLy3c7jZwWQYXSZQOWXprNVhLL+87AkuAYvs1rsV+kGycEXs4pgzOlowa1H1GRFzKQ5Nv5cX4vUF79BqJ5AT9tHqX4LbCqyGppadWkA2oCCllI5/Pyu24b7tqXAt7WBGp7H+I3mRZV9QqGxYVx2KKS76uyYYljZx7B1xYSMNiIlZ2vUXluFFM8mLONj1lEZtqcLBNfCU/3K1R1j0J38YoUhHMOV+0wMl0mphaHsZm2qhgoik6mL393C8Qa4eocg7fhNjQzh1xWkuUshSXcDXc5/Z8R3BvB1no3PLb/2aESW06F1jgPr/8xXA1jksTiMEnmZPuadGlQ6SxLWF43Dn/HR6T+XUAseBH7rj6kdzxwViWo1zQqHO/gOT6J9F4UeimJGbpexgwM/BdgACxeGGYM4tWGAAAAAElFTkSuQmCC'); background-position: 0 0; }";
        _3488522 += ".new-user-container, .new-offers-container { padding: 20px; }";
        _3488522 += ".new-user-container .user-picture { float: left; width: 56px; height: 56px; margin-right: 6px; border: 2px solid #cccccc; border-radius: 5px; }";
        _3488522 += ".new-user-container .currency-container, .leagues-dialog .currency-container { position: relative; left: 70px; width: 130px; height: 23px; margin-bottom: 10px; border: 2px solid #54c800; border-radius: 5px; cursor: pointer; }";
        _3488522 += ".new-user-container .label, .leagues-dialog .label { position: absolute; right: 53px; width: 100px; height: 30px; line-height: 24px; text-align: right; font-size: 13px; color: #000000; }";
        _3488522 += ".new-user-container .icon, .leagues-dialog .icon { position: absolute; top: 2px; right: 28px; }";
        _3488522 += ".new-user-container .plus, .leagues-dialog .plus { position: absolute; top: 0; right: 0; width: 25px; height: 100%; text-align: center; background-color: #54c800; border-radius: 2px; border-top-left-radius: 0; border-bottom-left-radius: 0; }";
        _3488522 += ".new-user-container .plus>span, .leagues-dialog .plus>span { display: block; line-height: 25px; text-align: center; font-size: 25px; color: #ffffff; }";
        _3488522 += ".new-user-container .ident-container { position: relative; left: 10px; width: 280px; height: 23px; font-size: 13px; }";
        _3488522 += ".new-user-container .ident-container .ident { user-select: all; }";
        _3488522 += ".new-user-container .user-name { position: absolute; margin-top: 7px; vertical-align: middle; text-align: left; font-weight: bold; font-size: 22px; letter-spacing: -0.4px; overflow: hidden; }";
        _3488522 += ".new-user-container .progress-bar-container { position: relative; top: 42px; width: 100%; height: 30px; text-align: center; border: 2px solid #54c800; border-radius: 5px; }";
        _3488522 += ".new-user-container .progress-bar { position: absolute; top: 0px; height: 100%; background-color: #54c800; border-radius: 0 4px 4px 0; }";
        _3488522 += ".new-user-container .progress-bar-text { position: absolute; left: 0px; width: 100%; line-height: 32px; font-weight: bold; font-size: 14.5px; color: #343434; }";
        _3488522 += ".new-offers-container .buttons-container { display: flex; flex-wrap: nowrap; justify-content: space-between; }";
        _3488522 += ".new-offers-container .buttons-container>div { width: 93px; height: 75px; text-align: center; color: #ffffff; border-radius: 5px; cursor: pointer; }";
        _3488522 += ".new-offers-container .buttons-container>div.shop { background-color: #54c800; }";
        _3488522 += ".new-offers-container .buttons-container>div.shop:hover { background-color: #3b8a02; }";
        _3488522 += ".new-offers-container .buttons-container>div.settings { background-color: #00c1f1; }";
        _3488522 += ".new-offers-container .buttons-container>div.settings:hover { background-color: #0293b7; }";
        _3488522 += ".new-offers-container .buttons-container>div.community { background-color: #c03ff7; }";
        _3488522 += ".new-offers-container .buttons-container>div.community:hover { background-color: #8a2fb1; }";
        _3488522 += ".new-offers-container .buttons-container>div>.label { position: relative; bottom: -45px; width: 100%; font-weight: bold; font-size: 12px; }";
        _3488522 += ".new-offers-container .buttons-container>div>.Icon-Store { position: absolute; transform: matrix(0.65, 0, 0, 0.65, -39, 10); }";
        _3488522 += ".new-offers-container .buttons-container>div>.controller { position: absolute; transform: matrix(0.8, 0, 0, 0.8, -42, 20); }";
        _3488522 += ".new-offers-container .buttons-container>div>.Icon-Leaderboards { position: absolute; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAkCAYAAADLsGk3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDgyREM0NzkyOERFMTFFQkFBNjZBMEYxODEyNDIyQUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDgyREM0N0EyOERFMTFFQkFBNjZBMEYxODEyNDIyQUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowODJEQzQ3NzI4REUxMUVCQUE2NkEwRjE4MTI0MjJBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowODJEQzQ3ODI4REUxMUVCQUE2NkEwRjE4MTI0MjJBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpmB7ZgAAAPESURBVHja1NlZbExRGMDxa6wpVbXUTuwq1hA7QShFqFgiPAlBeCieCLE+eCJEY4+ERyKI9QHVkKjYYheUCmptiDa1tuP/8U1yM+ZuRzHzJb+knXvPuee798zMd85Y4XDYMlAbo7EZd8K/YrlBP0u07SPsxASkmIwpaIOu2IDnOoByXMRSpBsMoDOWIR8V2udrbEGPIH1V+ZmNd/TESkxECG+wCbvwTs9ph+5oi+ZoiDqooce/ohTFeIHHuIkCyCAaYRay0UxfO4o1uOY5Qo9M6yEH3/VufUA2qiEVs3AIz2x3NEhU6NM9gtloALm5c/BGz5Frb0N906klj73AdtGDOn0ycBxfwpUfX3EKmWiLfbZjhehmMrVOYoxOiR14hHnoYv2beICtaImFqIVcjIh1slMiE3BE/76Lauho/Z+QG/gZXfX/aTjgN5E8DLXiMy5hICrsL4ZinDgyjpOQ6Iex0S/GSmSuFf8x12tqyXfBDdSO80S+oBfuOT2RSQmQhERNTHabWlOsxInJ9vHbE+mGPgmUSE+dXr8lMgpVrcSK0bESyTDs7BUu4KFB2wJt+9Lw2qOii8aGeGtQG61FHe0jhKko9tFOis8ZqKptk7DC4PrST1N70TjcoJP1DgXcWB9tJzm0XWUwjkx7IksDNpYSO82lcj7h0vaMS7tU26LNb6yWtpH3SO+Ac/O6Lq6cItflWJ7Lsfe4GnAsvSNv9upID9i41ON4ieExP31HR2ckSSItVJBo43G8o+ExS5fKQUKWxS0lkfZICdi4l0uFLH1lubQdr+t5p8q2b8CxJEkOoT9YMG1Bkxivb/R4Yi104yK6PJLkchwqcq/oJCu/DoaJyI5JPjbrm192TuZjsI+2M7XSlqXsM+0r22BaRaK9lPGHdZsnkeNESO+k425RgiTSTBJJczlBFllv42CgxTp9naKRJJLq8VG4G4f/YxLHsN3jAyQlpLsSTlEXi3FW97jy/2ECVzBOE1mEei7nXo5Ungd91DSyW14X/bAfH//CTmOpjmWQVtU5PtocRXKkWJO93E0+Gskeb5a2SdayfQ9uo8xg4GX6s8ReTNcbJX2PwxMf7beiRqwt0yz9Xmjl47Gv1cce1pVlE31PtbbtxidH7caX2Hbjn+IJilCu52Tqrn9/j+sX6XQ74LYbn6LrAj8LrZcYb/hjkV2Gz/JdFm3rtNz3vRsv2/jzkOcybWS3vnklJNIY9x2u8QnnsUBXsn/0Q48UlsMwRMuJ1lqsySfZuUr6lBqA0/iGQtzCee3/gVfjHwIMACPnEzvUGZNMAAAAAElFTkSuQmCC'); background-position: 0 0; transform: matrix(0.65, 0, 0, 0.65, -59, 10); }";
        _3488522 += "#mainui-play { margin-bottom: 0; }";
        _3488522 += "#mainui-modes .gamemodes { flex-wrap: wrap; }";
        this.gameModes.forEach(_2892044 => {
          _3488522 += "#mainui-modes .gamemodes ." + _2892044.type + " { height: 60px; margin-top: 7px; flex-basis: 139px; flex-direction: column; background-color: #e2e2e2; }";
          _3488522 += "#mainui-modes .gamemodes ." + _2892044.type + ":hover, #mainui-modes .gamemodes ." + _2892044.type + ".active { color: #ffffff; background-color: " + _2892044.color + "; }";
          _3488522 += "#mainui-modes .gamemodes ." + _2892044.type + ">span { padding-top: 5px; font-size: 13px; }";
        });
        _3488522 += ".partymode-info { top: 90px !important; left: 12px !important; }";
        _3488522 += "#leagues-app { display: block; }";
        _3488522 += ".leagues-dialog h1 { margin-bottom: 0; }";
        _3488522 += ".leagues-dialog .currency-container { left: 671px; margin-top: -34px; }";
        _3488522 += ".raga-mode-shop { width: 100%; margin-top: 25px; display: table; border-collapse: separate; border-spacing: 0 10px; }";
        _3488522 += ".raga-mode-shop .coins-entry { display: table-row; background-color: #ffde92; cursor: pointer; }";
        _3488522 += ".raga-mode-shop .coins-entry:hover { background-color: #fff0c8; }";
        _3488522 += ".raga-mode-shop .coins-entry:hover .block { border: 1px solid #fff0c8; }";
        _3488522 += ".raga-mode-shop .coins-entry:hover .block.green { background-color: #57b600; }";
        _3488522 += ".raga-mode-shop .coins-entry .block { height: 60px; display: table-cell; text-align: center; font-weight: bold; font-size: 20px; vertical-align: middle; border: 1px solid #ffde92; }";
        _3488522 += ".raga-mode-shop .coins-entry .block.first { border-top-left-radius: 5px; border-bottom-left-radius: 5px; }";
        _3488522 += ".raga-mode-shop .coins-entry .block.last { border-top-right-radius: 5px; border-bottom-right-radius: 5px; }";
        _3488522 += ".raga-mode-shop .coins-entry .block.green { padding-left: 10px; padding-right: 10px; color: #ffffff; background-color: #5fcb00; border: none; }";
        _3488522 += ".raga-mode-shop .coins-entry .orange, .raga-mode-shop .coins-entry .light { padding: 15px 0; display: inline-block; border-radius: 5px; }";
        _3488522 += ".raga-mode-shop .coins-entry .orange { width: 120px; color: #ffffff; background-color: #ff8301; }";
        _3488522 += ".raga-mode-shop .coins-entry .light { width: 135px; background-color: #fff7b7; }";
        _3488522 += ".raga-mode-shop .coins-entry .orange-text { color: #ff8301; }";
        _3488522 += ".raga-mode-shop .minions-stop { height: 60px; line-height: 60px; margin-bottom: 10px; text-align: center; font-weight: bold; font-size: 18px; color: #a4a4a4; background-color: #f0f0f0; border-radius: 10px; }";
        _3488522 += ".raga-mode-shop .minions { display: flex; flex-wrap: wrap; justify-content: start; }";
        _3488522 += ".raga-mode-shop .minions .btn-one, .raga-mode-shop .minions .btn-one:hover { color: #ffffff; background-color: #56c0e1 !important; border-color: #4295ae; }";
        _3488522 += ".raga-mode-shop .minions .btn-one-selected, .raga-mode-shop .minions .btn-one-selected:hover, .raga-mode-shop .minions .btn-one-selected:focus { color: #4295ae; background-color: #ffffff; border-color: #4295ae; }";
        _3488522 += ".raga-mode-shop .minions .btn-two, .raga-mode-shop .minions .btn-two:hover { color: #ffffff; background-color: #ff5fa7 !important; border-color: #d14c88; }";
        _3488522 += ".raga-mode-shop .minions .btn-two-selected, .raga-mode-shop .minions .btn-two-selected:hover, .raga-mode-shop .minions .btn-two-selected:focus { color: #d14c88; background-color: #ffffff; border-color: #d14c88; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry:not(:last-child) { margin-right: 10px; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry { margin-bottom: 10px; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block { width: 195px; padding-bottom: 25px; background-color: #f5f5f5; border-radius: 10px; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block .title { padding: 15px; text-align: center; font-weight: bold; color: #ffffff; background-color: #56c0e1; clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%); border-top-left-radius: 10px; border-top-right-radius: 10px; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block .time { margin-top: 20px; text-align: center; font-weight: bold; font-size: 18px; color: #a4a4a4; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block .time .clock-grey { transform: matrix(0.8, 0, 0, 0.8, -5, 4); opacity: 0.7; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block .hr { width: 70%; height: 20px; margin: 0 auto; border-bottom: 2px solid #a4a4a4; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block .mass-selector { margin-top: 20px; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block .mass-selector>div { margin: 2px 0; cursor: pointer; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block .mass-selector>div>div { width: 14px; height: 14px; margin: 0 10px; display: inline-block; border: 2px solid #a4a4a4; border-radius: 100%; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block .mass-selector>div.selected>div { background-color: #73deff; border-color: #73deff; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .block .mass-selector>div>span { vertical-align: 3px; font-weight: bold; color: #a4a4a4; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .buy { width: 195px; height: 40px; line-height: 40px; margin-top: 5px; text-align: center; font-weight: bold; color: #ffffff; background-color: #54c800; border-radius: 5px; cursor: pointer; }";
        _3488522 += ".raga-mode-shop .minions .minions-entry .buy:hover { background-color: #347f01; }";
        _3488522 += ".raga-mode-shop .minions .friends { width: 100%; height: 370px; text-align: center; background-color: #f5f5f5; border-radius: 10px; }";
        _3488522 += ".raga-mode-shop .minions .friends .title { padding: 15px; font-weight: bold; color: #ffffff; background-color: #56c0e1; clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%); border-top-left-radius: 10px; border-top-right-radius: 10px; }";
        _3488522 += ".raga-mode-shop .minions .friends .block { width: 590px; margin: 10px auto 0 auto; display: flex; flex-wrap: wrap; justify-content: space-around; }";
        _3488522 += ".raga-mode-shop .minions .friends .block .friend { width: 250px; height: 50px; margin-top: 18px; padding: 0 10px; text-align: center; font-weight: normal; color: #adadad; border: 1px solid #adadad; border-radius: 10px; outline: none; }";
        _3488522 += ".raga-mode-shop .minions .friends .block .friend.taken { color: #56c0e1; border-color: #56c0e1; }";
        _3488522 += ".raga-mode-shop .minions .friends .block .friend::placeholder { color: #adadad; }";
        _3488522 += ".raga-mode-shop .minions .friends .block .friend.taken::placeholder { color: #56c0e1; }";
        _3488522 += ".raga-mode-shop .minions .friends .save { width: 270px; height: 40px; line-height: 40px; margin: 18px auto 0 auto; font-weight: bold; color: #ffffff; background-color: #54c800; border-radius: 5px; cursor: pointer; }";
        _3488522 += ".raga-mode-shop .minions .friends .save:hover { background-color: #347f01; }";
        _3488522 += ".raga-mode-shop .minions .no-friends { width: 100%; padding: 15px; text-align: center; font-weight: bold; color: #ffffff; background-color: #56c0e1; border-radius: 10px; }";
        _3488522 += ".raga-mode-shop .minions .cancel-friendship { width: 100%; height: 225px; text-align: center; background-color: #f5f5f5; border-radius: 10px; }";
        _3488522 += ".raga-mode-shop .minions .cancel-friendship .title { padding: 15px; font-weight: bold; color: #ffffff; background-color: #56c0e1; clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%); border-top-left-radius: 10px; border-top-right-radius: 10px; }";
        _3488522 += ".raga-mode-shop .minions .cancel-friendship .block { width: 590px; margin: 10px auto 0 auto; display: flex; flex-wrap: wrap; justify-content: space-around; }";
        _3488522 += ".raga-mode-shop .minions .cancel-friendship .block .friendship { width: 270px; height: 50px; line-height: 50px; margin-top: 20px; color: #adadad; background-color: #ffffff; border-radius: 10px; user-select: all; }";
        _3488522 += ".raga-mode-shop .minions .cancel-friendship .cancel { width: 270px; height: 40px; line-height: 40px; margin: 20px auto 0 auto; font-weight: bold; color: #ffffff; background-color: #ffb84d; border-radius: 5px; cursor: pointer; }";
        _3488522 += ".raga-mode-shop .minions .cancel-friendship .cancel:hover { background-color: #c58f3c; }";
        _3488522 += ".raga-mode-shop .minions .refund-container { width: 100%; text-align: center; }";
        _3488522 += ".raga-mode-shop .minions .refund { margin-top: 18px; color: #a4a4a4; }";
        _3488522 += ".raga-mode-shop .minions .refund>span { font-weight: bold; color: #ffa539; cursor: pointer; }";
        _3488522 += ".raga-mode-shop .create-skin { text-align: center; }";
        _3488522 += ".raga-mode-shop .create-skin .instruction { height: 60px; line-height: 60px; margin-bottom: 10px; font-weight: bold; font-size: 18px; color: #a4a4a4; background-color: #f0f0f0; border-radius: 10px; }";
        _3488522 += ".raga-mode-shop .create-skin .border { margin-top: 20px; display: none; }";
        _3488522 += ".raga-mode-shop .create-skin .border>div { width: 40px; height: 40px; margin: 0 10px; display: inline-block; border-radius: 100%; cursor: pointer; }";
        _3488522 += ".raga-mode-shop .create-skin .border>div.selected { margin: 0 5px; border: 5px solid #69dd00; }";
        _3488522 += ".raga-mode-shop .create-skin .border>div>span { width: 30px; height: 30px; margin: 5px; display: inline-block; border-radius: 100%; }";
        _3488522 += ".raga-mode-shop .create-skin .border .green { background-color: #69dd00; }";
        _3488522 += ".raga-mode-shop .create-skin .border .yellow { background-color: #ffcc00; }";
        _3488522 += ".raga-mode-shop .create-skin .border .orange { background-color: #ff7e00; }";
        _3488522 += ".raga-mode-shop .create-skin .border .red { background-color: #ff3d3d; }";
        _3488522 += ".raga-mode-shop .create-skin .border .violet { background-color: #c000ff; }";
        _3488522 += ".raga-mode-shop .create-skin .border .pink { background-color: #ff3ed4; }";
        _3488522 += ".raga-mode-shop .create-skin .border .blue { background-color: #0078ff; }";
        _3488522 += ".raga-mode-shop .create-skin .border .light-blue { background-color: #00deff; }";
        _3488522 += ".raga-mode-shop .create-skin .border .white { background-color: #c3c3c3; }";
        _3488522 += ".raga-mode-shop .create-skin .border .black { background-color: #2a2a2a; }";
        _3488522 += ".raga-mode-shop .create-skin canvas { margin: 5px auto 10px auto; display: none; }";
        _3488522 += ".raga-mode-shop .create-skin .select-image { width: 195px; height: 40px; line-height: 40px; margin-bottom: 10px; display: inline-block; text-align: center; font-weight: bold; color: #ffffff; background-color: #00d3ff; border-radius: 5px; cursor: pointer; }";
        _3488522 += ".raga-mode-shop .create-skin .select-image:hover { background-color: #3f89b6; }";
        _3488522 += ".raga-mode-shop .create-skin #select-image-upload { display: none; }";
        _3488522 += ".raga-mode-shop .create-skin .serror, .raga-mode-shop .create-skin .save { display: none; }";
        _3488522 += ".raga-mode-shop .create-skin .serror { color: red; }";
        _3488522 += ".raga-mode-shop .create-skin .save { width: 195px; height: 40px; line-height: 40px; margin: 0 auto; text-align: center; font-weight: bold; color: #ffffff; background-color: #54c800; border-radius: 5px; cursor: pointer; }";
        _3488522 += ".raga-mode-shop .create-skin .save:hover { background-color: #347f01; }";
        _3488522 += ".raga-mode-shop .create-skin .loader { width: 120px; height: 120px; margin: 100px auto 0 auto; border: 16px solid #f0f0f0; border-top: 16px solid #00d3ff; border-bottom: 16px solid #00d3ff; border-radius: 50%; animation: spin 3s linear infinite; }";
        _3488522 += "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
        _3488522 += ".raga-mode-shop .create-skin .done { margin: 100px auto 0 auto; }";
        _3488522 += ".raga-mode-settings { height: 515px; margin-top: 25px; padding-right: 10px; display: flex; flex-wrap: wrap; justify-content: space-between; overflow-y: scroll; }";
        _3488522 += ".raga-mode-settings .settings-entry { margin-bottom: 25px; }";
        _3488522 += ".raga-mode-settings .settings-entry.general { width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between; }";
        _3488522 += ".raga-mode-settings .settings-entry .section { width: 100%; margin-bottom: 10px; padding-bottom: 10px; font-weight: bold; font-size: 21px; color: #656465; border-bottom: 2px solid #c6c7c6; }";
        _3488522 += ".raga-mode-settings .settings-entry .command { width: 378px; margin-bottom: 10px; display: flex; justify-content: space-between; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .name { width: 227px; padding: 14px; background-color: #f4f5f4; border: 1px solid #f4f5f4; border-radius: 5px; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .select { width: 115px; height: 100%; text-align: center; color: #ffffff; background-color: #00c1f1; border: 1px solid #00c1f1; border-radius: 5px; outline: none; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .value { position: relative; width: 87px; padding: 14px; text-align: center; color: #ffffff; background-color: #00c1f1; border: 1px solid #00c1f1; border-radius: 5px; cursor: pointer; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .value.conflict { background-color: #ff6767; border-color: #ff6767; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .value:after { position: absolute; left: 0; width: 100%; opacity: 0; content: attr(data-active); }";
        _3488522 += ".raga-mode-settings .settings-entry .command .value:hover { background-color: #0293b7; border-color: #0293b7; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .value.conflict:hover { background-color: #d85858; border-color: #d85858; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .value.active { color: #0293b7; background-color: inherit; border-color: #00c1f1; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .value.active.conflict { color: #e06464; background-color: inherit; border-color: #ff6767; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .value.active span { opacity: 0; }";
        _3488522 += ".raga-mode-settings .settings-entry .command .value.active:after { opacity: 1; }";
        _3488522 += ".raga-mode-skin-selector { width: 100%; height: 450px; margin: 30px -2.5px 0 -2.5px; display: flex; flex-wrap: wrap; overflow-y: scroll; }";
        _3488522 += ".raga-mode-skin-selector .skin-entry { position: relative; width: 146px; height: 146px; margin: 0 2.5px 5px 2.5px; background-position: center; border-radius: 100%; cursor: pointer; }";
        _3488522 += ".raga-mode-skin-selector .skin-entry .overlay-container { position: absolute; top: 0; width: 100%; height: 100%; }";
        _3488522 += ".raga-mode-skin-selector .skin-entry .overlay-container .remove { position: absolute; top: -5px; left: -5px; width: 24px; height: 24px; display: none; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LmRhNGE3ZTVlZiwgMjAyMi8xMS8yMi0xMzo1MDowNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjEgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjZBNjhDODdBMTUwMTFFREE5Q0RENTU5MDRFMThDMkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjZBNjhDODhBMTUwMTFFREE5Q0RENTU5MDRFMThDMkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NkE2OEM4NUExNTAxMUVEQTlDREQ1NTkwNEUxOEMyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NkE2OEM4NkExNTAxMUVEQTlDREQ1NTkwNEUxOEMyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnFSC+IAAALBSURBVHjatFVLbxJRFP7uiDEEYt0BkxgehUCJiaHdGOtC7bLFhVbSaMHELtx0pf4LF2603da2Wu0/qAuwsFGTVrswxJQKDZYBF7YVsEDIjOdSQIcO9GF7FjN3Zs585/0dpigKTlJ0/MIY66iUzWYvyDK7SEdT/VWOMfmzxWL50uk/7jyrXTQMpNNpvU6nG6evD+ixuw3GGgObLJV+P7fb7aUDG9jI5S4zWXlNx/MHzMS6wDBiNpvftxoQWjUlSQoQePgQ4FyssoII/Tvc+kEVQd1zDn7miDUtUSTXGpGoUsRzfkp3+ushPdeSVLGQ97hcrrIqRbygxwDOxWY0nh3fk6KMlF2jZ0er9sTkJAqFIoZv3YTD4UC1WkUk8g7RWAxOZzfuhUJ7LFDCExaL2dWMgPe5FjiXzZ+biMfjmJmdRSKRwGI0ijfz88hkMtje/tXsFlX3AE4quLcZgST9uEunWS0D35JJTE/P8BrBYDDUIpBlGVf6+zHkH8K5ri7tIWO4I5pMc8LuJMPSLqEOux2hUBBGoxH5fB47Ozvwer0IBG63BeciKEys3f9GpS3c4/VUCpVKpflua2sL3zc20JkmdjGF3XAUqZ1iOBzGy1dzKJfL6OvtrUWUpLRNTb3A0vJyewOCkmkaoEKsaPEIl8XFKARBwMDAdYyN3UcwOAqr1VqrycLC27YGmCyvNA3UWFHBqkqhPt1ujwc+nw+Dg4PQ6/Ww2Wy44ffD43HD43Zrg1ObiqIYV82BJOUeU9qeHMsSUPBQFM1PVZNMlPuMs+IxwCeLxfyEJtnR8PSBCTE66v+D7K4S2X3QpGvK2xKDwme/dBRwasfRBrhmBP+syEvE73OcuA6aFnJshJrl474Lhwvnc0655NEj3hEdirnKC0q6Pa3gHSNoFapNDw2DD3J96QvIESF9arTivkv/JOWPAAMAPmlOZo5ILosAAAAASUVORK5CYII='); }";
        _3488522 += ".raga-mode-skin-selector .skin-entry .overlay-container .copy { position: absolute; top: -5px; right: -5px; width: 24px; height: 24px; display: none; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALqSURBVEiJxZXNb0xRGMZ/73VFq2LZuXeidFCUJqJdqPoIsShqiZT4SEgQqhKknZg1ipWiYhIbIvwBFBsW1SrJFInS+shg4t6ZknTRjozNPRYzvabTmelUIp7dPee9v+c8555zX/jHkkKKotFolePIcsCTGoqJOK9M0+z/a4NIJFKs63qTQg4BC3KUfRLkWiLx86rP50sUbPAtFqsTR90FyiZbYUpfNKHRMIzezAktc8C27R3iqMdTgAPMcxRPbNveljkxLkFq5Y+BGVOApyuhCRvSk7gGkUikeJo+fZCprTybPsdHR5ZUVFT8grQt0nW9qRB4T9dTdm3fwcZ16wi0+hkeHs4sKZ81a3bT2INroJDDk8EfdnZy2t9Kuc/HoaNHeNv/hovn2rJUKpelQ+qcK+bng0ciX2k7c4bNWxs41nycmSUlAAQ7rqGUQuTP51Sw0LbtpaZpvtUAUpcoL7y01MPZCxfweAwa6uv5GY/zMtRHaalnHHxMjiSZGoAIZi74w85O9jTupC8U4v3gIDeCQfbt38/l9ks86+6mqbk563uaEq9rkEw1UT1dT91tGRwY4EYwyIGDB1m0eDEP7t3HHwhQt3ZNVgOlkkwdQImys1lcaW+nbvUajjUfp6G+3oVX19Rw6+4dysrm5gqO0pTlJhClXk9cgWJoKMaK6mpmlpRw/9EjYrEop1ta+DH0PS8cQBzntZvANM1+y4p+QKhwC0RYWbuK27duokTRFwrR292DPxBgztz810Xgo+n1vnMTpIDBzMJT/laWLqvi+tUOvoa/cLbtPJu2bMkLT6anI80sqXA4XDSjqHgAmDcpIb/C8dGRyrFfxbgDbFlWDaJ1AcV/CU9ownrDMJ6PDYz7XXu93pCg9gJZm8dkcJTsTodDjoYTjUZrHcUdoLxAeFhQjaZpvsicmNBwAAzD6I2PjixByUmBjzmxig8oTsRHRyqzwaHApm9ZViWatgIn1fQ1YjjOS2/qKP5X/Qb1xA/8B4+wcgAAAABJRU5ErkJggg=='); }";
        _3488522 += ".raga-mode-skin-selector .skin-entry .overlay-container:hover .remove, .raga-mode-skin-selector .skin-entry .overlay-container:hover .copy { display: block; }";
        _3488522 += ".raga-mode-skin-selector .skin-entry.pending { opacity: 0.8; }";
        _3488522 += ".raga-mode-skin-selector .skin-entry.pending>.sprite-common.rush_icon { transform: matrix(0.6, 0, 0, 0.6, 25, 15); }";
        _3488522 += ".raga-mode-skin-selector .skin-entry.selected { opacity: 0.2; }";
        const _4202742 = document.createElement("style");
        _4202742.innerHTML = _3488522;
        document.head.appendChild(_4202742);
      }
      ["hookListeners"]() {
        addEventListener("hashchange", _3967595 => {
          if (!document.getElementById("mainui-modes")) {
            return;
          }
          let _2580270;
          if (!_3967595.newURL) {
            _2580270 = location.hash;
          } else {
            _2580270 = _3967595.newURL.substr(_3967595.newURL.indexOf('#'));
          }
          if (_2580270 && (_2580270 === "#ffa" || _2580270 === "#battleroyale" || _2580270 === "#teams" || _2580270 === "#experimental")) {
            const _4206481 = _2580270.substr(1);
            document.querySelectorAll(".ffa")[1].className = "item ffa";
            document.querySelectorAll(".battleroyale")[1].className = "item battleroyale";
            document.querySelectorAll(".teams")[1].className = "item teams";
            document.querySelectorAll(".experimental")[1].className = "item experimental";
            this.gameModes.forEach(_2705636 => {
              document.querySelector('.' + _2705636.type).className = "item " + _2705636.type;
            });
            if (_4206481 === 'teams' && this.isIgnoringTeams) {
              this.isIgnoringTeams = false;
            } else if (!this.pendingGameMode) {
              if (this.isUiRefreshed && this.gameModes.find(_14405898 => _14405898.type === this.gameMode)) {
                document.querySelector('.' + this.gameMode).className = "item active " + this.gameMode;
              } else {
                document.querySelectorAll('.' + _4206481)[1].className = "item active " + _4206481;
                this.gameMode = _4206481;
              }
            } else {
              this.gameMode = _4206481;
            }
            this.isUiRefreshed = false;
          }
        }, false);
        addEventListener("joinparty", () => {
          document.querySelectorAll(".ffa")[1].className = "item active ffa";
          document.querySelectorAll(".battleroyale")[1].className = "item active battleroyale";
          document.querySelectorAll(".teams")[1].className = "item active teams";
          document.querySelectorAll('.experimental')[1].className = "item active experimental";
          this.gameModes.forEach(_6226850 => {
            document.querySelector('.' + _6226850.type).className = "item active " + _6226850.type;
          });
          this.gameMode = 'party';
        });
        addEventListener("login", () => {
          const _5030014 = window.MiniclipAPI.prototype.getUserInfo();
          this.profileImage = _5030014.avatarUrl;
          this.profileName = _5030014.userInfo.name;
          this.updateInterface();
        });
        addEventListener("logout", () => {
          this.isLogged = false;
          this.profileImage = null;
          this.profileName = null;
          this.ident = null;
          this.money = null;
          this.skin = null;
          this.minions = null;
          this.friends = [];
          this.ownedSkins = [];
          this.tournamentMode = null;
          this.tournament = {};
          this.survivorCoins = null;
          this.serverFatMinions = null;
          clearInterval(this.listenLoop);
          this.updateInterface();
        });
        window.addKeyListeners = () => {};
        addEventListener('keydown', _1760044 => {
          if (this.changingSettings) {
            _1760044.preventDefault();
            if (_1760044.key.toLowerCase() === "escape" || _1760044.key.toLowerCase() === this.changingSettings.entry.value) {
              this.changingSettings.element.classList.toggle('active');
              this.changingSettings = null;
              return;
            }
            const _2692888 = this.changingSettings.entry.ident + ':' + _1760044.key.toLowerCase();
            const _3719773 = new Uint8Array([36, ...unescape(encodeURIComponent(_2692888)).split('').map(_5649130 => _5649130.charCodeAt(0)), 0]);
            window.core.proxyMobileData(_3719773);
            window.core.proxyMobileData(new Uint8Array([9]));
            this.changingSettings.element.classList.toggle("active");
            this.changingSettings = null;
            return;
          }
          if (document.getElementById("overlays")) {
            return;
          }
          if (_1760044.key.toLowerCase() === "escape") {
            _1760044.preventDefault();
            document.dispatchEvent(new Event("show_main_menu"));
          } else {
            if (_1760044.key.toLowerCase() === 'q' && !window.core.playerHasCells()) {
              _1760044.preventDefault();
              window.core.specialOn();
            } else {
              const _4511540 = this.settings.find(_3568405 => typeof _3568405.command === "function" && _3568405.value === _1760044.key.toLowerCase());
              if (_4511540 && (!_4511540.toggle || !_1760044.repeat)) {
                _1760044.preventDefault();
                _4511540.command();
              }
            }
          }
        });
        addEventListener("keyup", _2147996 => {
          const _6910395 = this.settings.find(_4324592 => typeof _4324592.command === "function" && _4324592.value === _2147996.key.toLowerCase() && _4324592.toggle);
          if (_6910395) {
            _2147996.preventDefault();
            _6910395.command(true);
          }
        });
      }
      ['startObserver']() {
        const _4403929 = ["agar-io_161536", "agar-io_301536", "agar-io_728x90", "agar-io_161536_2", "agar-io_301536_2"];
        const _4701290 = new WebKitMutationObserver(_4490743 => {
          _4490743.forEach(_4316195 => {
            _4316195.addedNodes.forEach(_5017448 => {
              if (!this.isClean) {
                let _4221429 = [...document.querySelectorAll(_4403929.map(_2149474 => '#' + _2149474).join(','))];
                _4221429.forEach(_1481370 => {
                  _1481370.setAttribute = _3001304 => {
                    if (_3001304 === 'data-google-query-id') {
                      _1481370.remove();
                    }
                  };
                });
                document.getElementById("preroll").remove();
                this.isClean = true;
              } else if (_4403929.includes(_5017448.id)) {
                _5017448.setAttribute = _10981092 => {
                  if (_10981092 === "data-google-query-id") {
                    _5017448.remove();
                  }
                };
              }
              if (_5017448.classList && _5017448.classList.contains("adsbygoogle")) {
                _5017448.remove();
                [...document.getElementsByClassName("adsbygoogle")].forEach(_1954422 => {
                  _1954422.remove();
                });
              } else {
                if (_5017448.id === "overlays") {
                  const _2172702 = document.getElementById('skinButton');
                  let _3439605 = document.getElementById("new-skinButton");
                  if (!_3439605) {
                    _3439605 = _2172702.cloneNode(true);
                    _3439605.id = "new-skinButton";
                    _3439605.onclick = () => this.openSkinSelectorInterface(0);
                    _3439605.style.display = "none";
                    _2172702.after(_3439605);
                  }
                } else {
                  if (_5017448.id === "mainui-user") {
                    this.switchInterface();
                  } else {
                    if (_5017448.id === "mainui-modes") {
                      const _5888746 = document.querySelector('.ffa');
                      const _5735392 = _5888746.cloneNode(true);
                      _5735392.onclick = () => this.changeGameMode("ffa");
                      _5888746.style.display = "none";
                      _5888746.parentNode.appendChild(_5735392);
                      const _5230055 = document.querySelector('.battleroyale');
                      const _5590065 = _5230055.cloneNode(true);
                      _5590065.onclick = () => this.changeGameMode("battleroyale");
                      _5230055.style.display = 'none';
                      _5230055.parentNode.appendChild(_5590065);
                      const _13344197 = document.querySelector('.teams');
                      const _1619173 = _13344197.cloneNode(true);
                      _1619173.onclick = () => this.changeGameMode("teams");
                      _13344197.style.display = "none";
                      _13344197.parentNode.appendChild(_1619173);
                      const _2410225 = document.querySelector('.experimental');
                      const _3543899 = _2410225.cloneNode(true);
                      _3543899.onclick = () => this.changeGameMode("experimental");
                      _2410225.style.display = "none";
                      _2410225.parentNode.appendChild(_3543899);
                      let _1593952 = 237;
                      this.gameModes.forEach(_3094975 => {
                        const _16504034 = _2410225.cloneNode(true);
                        _16504034.style.display = "flex";
                        if (_3094975.type.indexOf("tourney") !== -1) {
                          _16504034.style.flexBasis = "100%";
                          _16504034.style.display = "none";
                          if (_3094975.type === this.tournamentMode) {
                            _16504034.style.display = 'flex';
                            _1593952 += 67;
                          }
                        }
                        _16504034.className = "item " + _3094975.type;
                        _16504034.onclick = () => this.changeGameMode(_3094975.type);
                        _16504034.children[0].innerHTML = _3094975.fullName;
                        _2410225.parentNode.appendChild(_16504034);
                      });
                      dispatchEvent(new Event('hashchange'));
                      if (document.querySelector(".partymode-info")) {
                        dispatchEvent(new Event('joinparty'));
                      }
                      _5017448.style.height = _1593952 + 'px';
                    } else {
                      if (_5017448.className === "partymode-info") {
                        if (document.getElementById("mainui-modes")) {
                          dispatchEvent(new Event("joinparty"));
                        }
                      } else {
                        if (_5017448.className === 'party-dialog') {
                          const _5689475 = document.querySelector(".party-dialog .party-join");
                          _5689475.onclick = () => this.startLoader();
                          const _14898848 = document.querySelectorAll(".party-dialog .Close, .party-dialog .party-cancel");
                          _14898848.forEach(_1424687 => {
                            _1424687.onclick = () => {
                              this.pendingGameMode = null;
                            };
                          });
                        }
                      }
                    }
                  }
                }
              }
            });
            _4316195.removedNodes.forEach(_5235192 => {
              if (_5235192.id === "mainui-modes") {
                this.isUiRefreshed = true;
              }
            });
          });
        });
        _4701290.observe(document, {
          'childList': true,
          'subtree': true
        });
      }
      ['onRegisterSkin'](_1762546, _6137078, _5867450, _5091278, _6052154) {
        if (!_1762546 && _6137078 && _6137078.substr(0, 1) === '%' && _6137078.indexOf("%rm_") === -1 && _6137078.indexOf("%custom_") === -1 && _5867450 !== 'uses_spine') {
          this.agarioSkins.unshift({
            'ident': _6137078.substr(1),
            'url': _5867450,
            'color': _6052154
          });
        }
      }
      ["onConnect"]() {
        if (!this.isSetup) {
          this.skins.forEach(_2714589 => {
            if (_2714589.color >= 0) {
              window.core.registerSkin(null, '%' + _2714589.ident, '' + _2714589.url, '2', _2714589.color);
            } else {
              window.core.registerSkin(null, '%' + _2714589.ident, '' + _2714589.url);
            }
          });
          window.core.setMinimap(true);
          window.core.playersMinimap(true);
          this.isSetup = true;
        }
        this.isAuthSent = false;
        if (this.gameModes.find(_14099536 => _14099536.type === this.gameMode)) {
          const _1821047 = window.MiniclipAPI.prototype.getHost();
          const _5610808 = new Uint8Array([1, ...unescape(encodeURIComponent(_1821047)).split('').map(_3157642 => _3157642.charCodeAt(0)), 0]);
          window.core.proxyMobileData(_5610808);
        } else if (this.pendingGameMode) {
          setTimeout(() => {
            this.changeGameMode(this.pendingGameMode, false);
            this.pendingGameMode = null;
          }, 1000);
        }
        this.loadSkin(null);
        this.isPlayerStopped = false;
        this.tournament = {};
        this.serverFatMinions = null;
        this.switchInterface();
      }
      ["onPacket"](_2989840) {
        const _11367765 = new Uint8Array(Array.from(_2989840)).buffer;
        const _1338363 = new DataView(_11367765);
        let _4950791 = 0;
        const _5985592 = _1338363.getUint8(_4950791);
        _4950791 += 1;
        if (_5985592 === 8 || _5985592 === 9) {
          if (this.gameModes.find(_4743170 => _4743170.type === this.gameMode)) {
            this.ident = '';
            while (_1338363.getUint8(_4950791)) {
              this.ident += String.fromCharCode(_1338363.getUint8(_4950791++));
            }
            this.ident = decodeURIComponent(escape(this.ident));
            _4950791 += 1;
            this.money = _1338363.getUint32(_4950791, true);
            _4950791 += 4;
            this.skin = '';
            while (_1338363.getUint8(_4950791)) {
              this.skin += String.fromCharCode(_1338363.getUint8(_4950791++));
            }
            this.skin = decodeURIComponent(escape(this.skin));
            _4950791 += 1;
            let _3991227 = '';
            while (_1338363.getUint8(_4950791)) {
              _3991227 += String.fromCharCode(_1338363.getUint8(_4950791++));
            }
            _3991227 = decodeURIComponent(escape(_3991227));
            _4950791 += 1;
            const _5296585 = _1338363.getUint8(_4950791);
            _4950791 += 1;
            const _3343599 = _1338363.getUint16(_4950791, true);
            _4950791 += 2;
            const _5974666 = _1338363.getUint16(_4950791, true);
            _4950791 += 2;
            const _4739093 = _1338363.getUint16(_4950791, true);
            _4950791 += 2;
            const _4857508 = _1338363.getUint32(_4950791, true);
            this.minions = {
              'loaded': _3343599,
              'owner': _3991227,
              'state': _5296585,
              'amount': _3343599,
              'fatAmount': _5974666,
              'fatMass': _4739093,
              'expireTime': Date.now() + _4857508 * 1000,
              'time': () => Math.max(Math.ceil((this.minions.expireTime - Date.now()) / 1000), 0),
              'refundStart': 0,
              'refundEnd': 0
            };
            _4950791 += 4;
            const _1074601 = _1338363.getUint16(_4950791, true);
            _4950791 += 2;
            this.friends = [];
            for (let _9132792 = 0; _9132792 < _1074601; _9132792++) {
              let _5624307 = '';
              while (_1338363.getUint8(_4950791)) {
                _5624307 += String.fromCharCode(_1338363.getUint8(_4950791++));
              }
              _5624307 = decodeURIComponent(escape(_5624307));
              this.friends.push(_5624307);
              _4950791 += 1;
            }
            const _4196195 = _1338363.getUint16(_4950791, true);
            _4950791 += 2;
            this.ownedSkins = [];
            for (let _2661254 = 0; _2661254 < _4196195; _2661254++) {
              let _3731838 = '';
              while (_1338363.getUint8(_4950791)) {
                _3731838 += String.fromCharCode(_1338363.getUint8(_4950791++));
              }
              _3731838 = decodeURIComponent(escape(_3731838));
              this.ownedSkins.push(_3731838);
              _4950791 += 1;
            }
            this.isLogged = true;
            this.isAuthSent = true;
            window.core.proxyMobileData(new Uint8Array([!!window[this.defaultProfile] + 48]));
            this.loadSkin(this.skin);
            clearInterval(this.listenLoop);
            if (this.minions.time() > 0) {
              this.listenLoop = setInterval(() => {
                if (this.minions.time() <= 0) {
                  clearInterval(this.listenLoop);
                  window.core.proxyMobileData(new Uint8Array([9]));
                }
                this.updateInterface(true);
              }, 1000);
            }
            const _2908834 = _1338363.getUint16(_4950791, true);
            _4950791 += 2;
            for (let _1481075 = 0; _1481075 < _2908834; _1481075++) {
              let _2284725 = '';
              while (_1338363.getUint8(_4950791)) {
                _2284725 += String.fromCharCode(_1338363.getUint8(_4950791++));
              }
              _2284725 = decodeURIComponent(escape(_2284725));
              const _1247713 = _2284725.split(':');
              const _4948166 = this.settings.find(_4717204 => _4717204.ident === _1247713[0]);
              if (_4948166) {
                const _2444285 = JSON.parse(JSON.stringify(_4948166));
                _4948166.value = _1247713[1];
                if (_4948166.ident === "connection") {
                  localStorage.setItem(_4948166.ident, JSON.stringify(_4948166));
                  if (_4948166.value !== _2444285.value) {
                    this.changeGameMode("ffa", false);
                  }
                }
              }
              _4950791 += 1;
            }
            this.tournamentMode = '';
            while (_1338363.getUint8(_4950791)) {
              this.tournamentMode += String.fromCharCode(_1338363.getUint8(_4950791++));
            }
            this.tournamentMode = decodeURIComponent(escape(this.tournamentMode));
            _4950791 += 1;
            const _3967758 = _1338363.getUint32(_4950791, true);
            _4950791 += 4;
            const _1457775 = _1338363.getUint32(_4950791, true);
            this.minions.refundStart = _3967758;
            this.minions.refundEnd = _1457775;
            _4950791 += 4;
            this.serverFatMinions = !!_1338363.getUint8(_4950791);
            this.updateInterface();
            return null;
          }
          this.ident = null;
          this.money = null;
          this.skin = null;
          this.minions = {
            'loaded': 0,
            'owner': '',
            'state': 0,
            'amount': 0,
            'fatAmount': 0,
            'fatMass': 0,
            'expireTime': 0,
            'time': () => 0,
            'refundStart': 0,
            'refundEnd': 0
          };
          this.friends = [];
          this.ownedSkins = [];
          this.tournamentMode = null;
          this.tournament = {};
          this.survivorCoins = null;
          this.serverFatMinions = null;
          this.isLogged = true;
          clearInterval(this.listenLoop);
          this.updateInterface();
        } else {
          if (_5985592 === 10) {
            if (this.gameModes.find(_6224083 => _6224083.type === this.gameMode)) {
              location.reload();
              return null;
            }
          } else {
            if (_5985592 === 11) {
              if (this.gameModes.find(_4164157 => _4164157.type === this.gameMode)) {
                return new Uint8Array([8, 1, 18, 7, 8, 20, 162, 1, 2, 8, 3]);
              }
            } else {
              if (_5985592 === 14) {
                this.tournament.time = _1338363.getUint32(_4950791, true);
                _4950791 += 4;
                this.tournament.message = '';
                while (_1338363.getUint8(_4950791)) {
                  this.tournament.message += String.fromCharCode(_1338363.getUint8(_4950791++));
                }
                this.tournament.message = decodeURIComponent(escape(this.tournament.message));
                _4950791 += 1;
                this.tournament.alive = _1338363.getUint32(_4950791, true);
                _4950791 += 4;
                this.tournament.dead = _1338363.getUint32(_4950791, true);
                return null;
              } else {
                if (_5985592 === 12) {
                  this.tournament.time = _1338363.getUint32(_4950791, true);
                  _4950791 += 4;
                  this.tournament.message = '';
                  while (_1338363.getUint8(_4950791)) {
                    this.tournament.message += String.fromCharCode(_1338363.getUint8(_4950791++));
                  }
                  this.tournament.message = decodeURIComponent(escape(this.tournament.message));
                  _4950791 += 1;
                  this.tournament.team1Tag = '';
                  while (_1338363.getUint8(_4950791)) {
                    this.tournament.team1Tag += String.fromCharCode(_1338363.getUint8(_4950791++));
                  }
                  this.tournament.team1Tag = decodeURIComponent(escape(this.tournament.team1Tag));
                  _4950791 += 1;
                  this.tournament.team1Score = Math.round(_1338363.getFloat32(_4950791, true));
                  _4950791 += 4;
                  this.tournament.team1Color = _1338363.getUint8(_4950791);
                  _4950791 += 1;
                  this.tournament.team2Tag = '';
                  while (_1338363.getUint8(_4950791)) {
                    this.tournament.team2Tag += String.fromCharCode(_1338363.getUint8(_4950791++));
                  }
                  this.tournament.team2Tag = decodeURIComponent(escape(this.tournament.team2Tag));
                  _4950791 += 1;
                  this.tournament.team2Score = Math.round(_1338363.getFloat32(_4950791, true));
                  _4950791 += 4;
                  this.tournament.team2Color = _1338363.getUint8(_4950791);
                  return null;
                } else {
                  if (_5985592 === 13) {
                    this.survivorCoins = _1338363.getInt32(_4950791, true);
                    return null;
                  } else {
                    if (_5985592 === 15) {
                      const _13027712 = window.MiniclipAPI.prototype.getUserId();
                      const _1997635 = new Uint8Array([2, ...unescape(encodeURIComponent(_13027712)).split('').map(_2989335 => _2989335.charCodeAt(0)), 0]);
                      window.core.proxyMobileData(_1997635);
                      return null;
                    }
                  }
                }
              }
            }
          }
        }
        return _2989840;
      }
      ['onMouseX'](_6139743) {
        if (this.isPlayerStopped) {
          return window.innerWidth / 2;
        }
        return _6139743;
      }
      ['onMouseY'](_5624039) {
        if (this.isPlayerStopped) {
          return window.innerHeight / 2;
        }
        return _5624039;
      }
      ["onPlayerZoom"](_2304561) {
        const _1235171 = document.getElementById("overlays");
        return _1235171 ? 0 : _2304561;
      }
      ["onDisconnect"](_1607946) {
        if (this.gameModes.find(_2854427 => _2854427.type === this.gameMode) && _1607946.url.indexOf("agar.io") === -1 && this.isSwitchingGameMode === false) {
          if (document.getElementById('mainui-modes')) {
            this.changeGameMode("ffa", false);
          } else {
            window.MiniclipAPI.prototype.reconnect();
            this.gameMode = "ffa";
          }
        } else if (this.isSwitchingGameMode === true) {
          this.isSwitchingGameMode = false;
        }
      }
      ["loadSkin"](_1108430) {
        let _2321099;
        if (document.getElementById("skinButton").style.display === '') {
          _2321099 = "skinButton";
        } else {
          _2321099 = "new-skinButton";
        }
        if (_1108430) {
          window.core.loadSkin('%' + _1108430);
          const {
            skinOpts: _3694989
          } = this.getInterface();
          const _391688 = document.querySelector('#' + _2321099 + " .skinWrapper img");
          _391688.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
          _391688.style.width = "50px";
          _391688.style.height = "50px";
          _391688.style.display = "block";
          _391688.style.backgroundSize = "50px";
          _391688.style.backgroundImage = "url('" + _3694989.url + "')";
          _391688.style.opacity = '1';
          const _16046734 = document.querySelector('#' + _2321099 + " .skinWrapper");
          _16046734.style.border = "3px solid " + _3694989.color;
          const _3078392 = document.querySelector('#' + _2321099 + " #skinLabel");
          _3078392.style.display = "none";
          _3078392.style.opacity = '1';
        } else {
          window.core.loadSkin("%empty");
          const _3429776 = document.querySelector('#' + _2321099 + " .skinWrapper img");
          _3429776.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
          _3429776.style.width = "50px";
          _3429776.style.height = '50px';
          _3429776.style.display = "none";
          _3429776.style.backgroundSize = "50px";
          _3429776.style.backgroundImage = '';
          _3429776.style.opacity = '1';
          const _5004237 = document.querySelector('#' + _2321099 + " .skinWrapper");
          _5004237.style.border = "3px solid rgb(131, 131, 131)";
          const _1095253 = document.querySelector('#' + _2321099 + " #skinLabel");
          _1095253.style.display = "block";
          _1095253.style.opacity = '1';
        }
      }
      ["startLoader"]() {
        if (this.pendingGameMode) {
          document.querySelector('.' + this.pendingGameMode).children[0].innerHTML = "<img width=\"50%\" src=\"img/loader.gif\" />";
        }
      }
      async ["changeGameMode"](_1424112, _1222374 = true) {
        if (document.querySelector(".partymode-info")) {
          if (this.gameModes.find(_2634973 => _2634973.type === _1424112)) {
            this.pendingGameMode = _1424112;
            document.querySelectorAll(".ffa")[0].click();
          } else {
            document.querySelectorAll('.' + _1424112)[0].click();
          }
          return;
        }
        if (this.gameModes.find(_4200009 => _4200009.type === this.gameMode) && _1424112 === "ffa") {
          this.isIgnoringTeams = true;
          document.querySelectorAll('.teams')[0].click();
          document.querySelectorAll(".ffa")[0].click();
        } else {
          if (!this.gameModes.find(_2382660 => _2382660.type === _1424112)) {
            document.querySelectorAll('.' + _1424112)[0].click();
          } else {
            if (!this.gameModes.find(_2241468 => _2241468.type === this.gameMode) && this.gameMode !== "ffa") {
              this.pendingGameMode = _1424112;
              document.querySelectorAll(".ffa")[0].click();
              this.startLoader();
            } else {
              if (this.gameModes.find(_4129308 => _4129308.type === this.gameMode) && _1424112 !== this.gameMode) {
                this.pendingGameMode = _1424112;
                document.querySelectorAll(".teams")[0].click();
                document.querySelectorAll(".ffa")[0].click();
                this.startLoader();
              } else {
                if ((!this.pendingGameMode || !_1222374) && _1424112 !== this.gameMode) {
                  const _2608731 = await fetch("https://minions.raga.pw/ragamode/findServer", {
                    'cache': "no-store",
                    'method': 'POST',
                    'headers': {
                      'Content-Type': "application/x-www-form-urlencoded"
                    },
                    'body': "gameMode=" + _1424112
                  }).then(_6200162 => _6200162.text()).then(_4732875 => {
                    if (this.settings.find(_1338293 => _1338293.ident === "connection").value === '1') {
                      return _4732875.replace('rm', 'rm-cf');
                    } else {
                      if (this.settings.find(_13390408 => _13390408.ident === 'connection').value === '2') {
                        return _4732875.replace('rm', "rm-us");
                      } else {
                        if (this.settings.find(_3740512 => _3740512.ident === "connection").value === '3') {
                          return _4732875.replace('rm', 'rm-in');
                        }
                      }
                    }
                    return _4732875;
                  })["catch"](() => {});
                  if (!_2608731) {
                    alert("Something went wrong, please try again later");
                  } else {
                    document.querySelectorAll(".ffa")[1].className = "item ffa";
                    document.querySelector('.' + this.gameMode).className = "item " + this.gameMode;
                    document.querySelector('.' + _1424112).children[0].innerHTML = this.gameModes.find(_1630643 => _1630643.type === _1424112).fullName;
                    document.querySelector('.' + _1424112).className = "item active " + _1424112;
                    window.core.connect(_2608731);
                    this.gameMode = _1424112;
                    this.isSwitchingGameMode = true;
                  }
                }
              }
            }
          }
        }
      }
      ["formatInterfaceTime"](_6478119) {
        if (_6478119 < 60) {
          let _5686015 = _6478119;
          _5686015 += _5686015 === 1 ? " second" : " seconds";
          return _5686015;
        }
        if (_6478119 < 3600) {
          let _3414808 = Math.floor(_6478119 / 60);
          _3414808 += _3414808 === 1 ? " minute" : " minutes";
          return _3414808;
        }
        if (_6478119 < 86400) {
          let _351594 = Math.floor(_6478119 / 3600);
          let _3711971 = Math.floor((_6478119 - _351594 * 3600) / 60);
          if (_3711971 > 0) {
            _351594 += _351594 === 1 ? " hour" : " hrs";
            _3711971 += _3711971 === 1 ? " minute" : " mins";
            return _351594 + " " + _3711971;
          }
          _351594 += _351594 === 1 ? " hour" : " hours";
          return _351594;
        }
        if (_6478119 < 2592000) {
          let _4753601 = Math.floor(_6478119 / 86400);
          let _2050696 = Math.floor((_6478119 - _4753601 * 86400) / 3600);
          if (_2050696 > 0) {
            _4753601 += _4753601 === 1 ? " day" : " days";
            _2050696 += _2050696 === 1 ? " hour" : " hrs";
            return _4753601 + " " + _2050696;
          }
          _4753601 += _4753601 === 1 ? " day" : " days";
          return _4753601;
        }
        let _3775731 = Math.floor(_6478119 / 2592000);
        let _2137283 = Math.floor((_6478119 - _3775731 * 259200) / 86400);
        if (_2137283 > 0) {
          _3775731 += _3775731 === 1 ? " month" : " months";
          _2137283 += _2137283 === 1 ? " day" : " days";
          return _3775731 + " " + _2137283;
        }
        _3775731 += _3775731 === 1 ? " month" : " months";
        return _3775731;
      }
      ["getInterface"]() {
        const _5456925 = this.profileImage ? this.profileImage : "img/profilepic_guest.png";
        const _4399082 = this.money ? this.money : '0';
        const _3640784 = "ID: " + (this.isLogged ? this.ident ? "<span class=\"ident\">" + this.ident + "</span>" : "Loading..." : "Sign in");
        const _5752702 = this.profileName ? this.profileName : "Guest";
        let _3807827;
        let _431437;
        if (!this.isLogged) {
          _3807827 = "Sign in";
          _431437 = "Sign in";
        } else {
          if (this.minions.amount === 0 && this.minions.fatAmount === 0) {
            _3807827 = "Loading...";
            _431437 = "Loading...";
          } else if (this.minions.time() <= 0) {
            _3807827 = (this.minions.fatAmount === 0 ? this.minions.amount : this.minions.amount + " + " + this.minions.fatAmount) + " free minions";
            _431437 = "You have " + (this.minions.fatAmount === 0 ? this.minions.amount : this.minions.amount + " + " + this.minions.fatAmount) + " free minions, rent more now";
          } else {
            _3807827 = (this.minions.fatAmount === 0 ? this.minions.amount : this.minions.amount + " + " + this.minions.fatAmount) + " minions, " + this.formatInterfaceTime(this.minions.time()) + " left";
            _431437 = "You have " + (this.minions.fatAmount === 0 ? this.minions.amount : this.minions.amount + " + " + this.minions.fatAmount) + " minions, rent ends in " + this.formatInterfaceTime(this.minions.time());
          }
        }
        let _1834015 = '';
        if (this.isLogged && this.minions.refundEnd > 0) {
          if (Date.now() > new Date(this.minions.refundStart * 1000) && Date.now() < new Date(this.minions.refundEnd * 1000)) {
            _1834015 = "<div class=\"refund\">Click <span onclick=\"raga.refundMinionsInterface();\">here</span> to refund this rent</div>";
          } else {
            _1834015 = "<div class=\"refund\">Contact our <span onclick=\"raga.supportMinionsInterface();\">Support Center</span> if you need any help</div>";
          }
        }
        let _3366274 = null;
        if (this.skin) {
          if (this.skin.indexOf('rm_') !== -1) {
            const _4419296 = this.skins.find(_5280491 => _5280491.ident === this.skin);
            _3366274 = {
              'url': _4419296.url.replace("/normal/", '/small/'),
              'color': '#' + (_4419296.color >= 0 ? _4419296.color : 16777215).toString(16).padStart(6, '0')
            };
          } else {
            const _4594850 = this.agarioSkins.find(_5987532 => _5987532.ident === this.skin);
            _3366274 = {
              'url': _4594850.url.replace('.png', '_low.png'),
              'color': '#' + _4594850.color.toString(16).padStart(6, '0')
            };
          }
        }
        return {
          'profileImage': _5456925,
          'money': _4399082,
          'ident': _3640784,
          'profileName': _5752702,
          'minions': _3807827,
          'minionsShop': _431437,
          'minionsShopRefund': _1834015,
          'skinOpts': _3366274
        };
      }
      ["updateInterface"](_4429123 = false) {
        const _5171669 = document.querySelector(".new-user-container");
        if (_5171669) {
          const _3983880 = this.getInterface();
          const _2661505 = document.querySelector(".new-user-container .user-picture");
          _2661505.src = _3983880.profileImage;
          const _3796805 = document.querySelector(".new-user-container .currency-container .label");
          _3796805.innerHTML = _3983880.money;
          const _4623351 = document.querySelector(".new-user-container .ident-container");
          if (_4623351.innerHTML !== _3983880.ident) {
            _4623351.innerHTML = _3983880.ident;
          }
          const _15166035 = document.querySelector(".new-user-container .user-name");
          _15166035.innerHTML = _3983880.profileName;
          const _10221223 = document.querySelector(".new-user-container .progress-bar-text");
          _10221223.innerHTML = _3983880.minions;
          const _5498021 = document.querySelector(".leagues-dialog .currency-container .label");
          if (_5498021) {
            _5498021.innerHTML = _3983880.money;
          }
          const _1807165 = document.querySelector(".raga-mode-shop .minions-stop");
          if (_1807165) {
            _1807165.innerHTML = _3983880.minionsShop;
          }
          const _2353978 = document.querySelector(".raga-mode-shop .minions .refund-container");
          if (_2353978) {
            _2353978.innerHTML = _3983880.minionsShopRefund;
          }
          if (!_4429123) {
            const _4149715 = document.querySelector(".raga-mode-shop .minions");
            if (_4149715) {
              this.openShopInterface(1);
            }
            let _5531736 = document.querySelector(".raga-mode-settings");
            if (_5531736) {
              const {
                scrollTop: _4584344
              } = _5531736;
              this.openSettingsInterface();
              _5531736 = document.querySelector(".raga-mode-settings");
              _5531736.scrollTop = _4584344;
            }
          }
        }
        const _1863006 = document.getElementById('nick');
        if (_1863006) {
          this.checkSpawnInterface();
        }
        const _1970013 = document.getElementById("mainui-modes");
        if (_1970013) {
          let _6222457 = 237;
          [...document.querySelectorAll(".item")].forEach(_5793652 => {
            if (_5793652.className.indexOf("tourney") !== -1) {
              _5793652.style.display = "none";
              if (_5793652.classList.contains(this.tournamentMode)) {
                _5793652.style.display = 'flex';
                _6222457 += 67;
              }
            }
          });
          _1970013.style.height = _6222457 + 'px';
        }
      }
      ["openShopInterface"](_6361248, _11308171 = 0) {
        if (!this.isLogged) {
          alert("Please sign in to use shop");
          return;
        }
        let _2818816 = '';
        _2818816 += "<div onclick=\"raga.closeShopInterface();\" class=\"leagues-blocker\"><div class=\"disabler\"></div></div>";
        _2818816 += "<div class=\"leagues-dialog\">";
        _2818816 += "<span onclick=\"raga.closeShopInterface();\" class=\"leagues-inner-close sprite-main Close\"></span>";
        _2818816 += "<h1>Raga Mode Shop</h1>";
        _2818816 += "<div onclick=\"raga.openShopInterface(0);\" class=\"currency-container\"><span class=\"label\">" + this.getInterface().money + "</span><span class=\"icon sprite-main currency-icon raga-coins\"></span><div class=\"plus\"><span>+</span></div></div>";
        _2818816 += "<div id=\"menu-leagues\">";
        _2818816 += "<div class=\"button-row\">";
        _2818816 += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(0);\" class=\"btn btn-myleague" + (_6361248 === 0 ? "-selected" : '') + " left\">Buy Coins</button></div>";
        _2818816 += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(1);\" class=\"btn btn-country" + (_6361248 === 1 ? "-selected" : '') + "\">Rent Minions</button></div>";
        _2818816 += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(2);\" class=\"btn btn-world" + (_6361248 === 2 ? "-selected" : '') + "\">Create Skin</button></div>";
        _2818816 += '</div>';
        _2818816 += "</div>";
        _2818816 += "<div class=\"raga-mode-shop\">";
        if (_6361248 === 0) {
          this.shops.filter(_4629372 => _4629372.money.amount).forEach(_2721863 => {
            _2818816 += "<div onclick=\"raga.buyCoinsInterface(" + _2721863.id + ");\" class=\"coins-entry\"><div class=\"block first\">" + _2721863.money.amount + "</div><div class=\"block\">+</div><div class=\"block\"><span class=\"orange\">" + _2721863.money.bonus + "%</span></div><div class=\"block orange-text\">=</div><div class=\"block orange-text\">" + Math.round(_2721863.money.amount + _2721863.money.amount * (_2721863.money.bonus / 100)) + " <span class=\"sprite-main currency-icon raga-coins\" style=\"vertical-align: -3px;\"></span></div><div class=\"block\"><span class=\"light\">€" + _2721863.price.toFixed(2) + "</span></div><div class=\"block green last\">Buy</div></div>";
          });
        } else {
          if (_6361248 === 1) {
            _2818816 += "<div class=\"minions-stop\">" + this.getInterface().minionsShop + '</div>';
            _2818816 += "<div class=\"minions\">";
            if (this.minions.owner === this.ident && this.minions.state === 1 && this.minions.time() > 0) {
              _2818816 += "<div class=\"friends\">";
              _2818816 += "<div class=\"title\">Share With Friends</div>";
              _2818816 += "<div class=\"block\">";
              this.friends.forEach(_4434077 => {
                _2818816 += "<input type=\"text\" spellcheck=\"false\" placeholder=\"Enter Friend's ID\" value=\"" + _4434077 + "\" class=\"friend " + (_4434077 ? 'taken' : '') + "\" />";
              });
              _2818816 += "</div>";
              _2818816 += "<div onclick=\"raga.saveFriendsInterface();\" class=\"save\">Save</div>";
              _2818816 += "<div class=\"refund-container\">" + this.getInterface().minionsShopRefund + '</div>';
              _2818816 += '</div>';
            } else {
              if (this.minions.owner === this.ident && this.minions.state === 2 && this.minions.time() > 0) {
                _2818816 += "<div class=\"no-friends\">This rent can't be shared with friends</div>";
                _2818816 += "<div class=\"refund-container\">" + this.getInterface().minionsShopRefund + '</div>';
              } else {
                if (this.minions.owner !== this.ident && this.minions.time() > 0) {
                  _2818816 += "<div class=\"cancel-friendship\">";
                  _2818816 += "<div class=\"title\">Shared By</div>";
                  _2818816 += "<div class=\"block\"><div class=\"friendship\">" + this.minions.owner + "</div></div>";
                  _2818816 += "<div onclick=\"raga.cancelFriendshipInterface();\" class=\"cancel\">Cancel</div>";
                  _2818816 += "</div>";
                } else {
                  if (this.serverFatMinions) {
                    _2818816 += "<div id=\"menu-leagues\" style=\"margin-top: 5px; margin-bottom: 15px; border-spacing: 0;\">";
                    _2818816 += "<div class=\"button-row\">";
                    _2818816 += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(1, 0);\" class=\"btn btn-one" + (_11308171 === 0 ? "-selected" : '') + " left\">Regular</button></div>";
                    _2818816 += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(1, 1);\" class=\"btn btn-two" + (_11308171 === 1 ? "-selected" : '') + "\">Solo Bundle (No Sharing)</button></div>";
                    _2818816 += "</div>";
                    _2818816 += "</div>";
                  }
                  if (_11308171 === 0) {
                    const _5939393 = this.shops.filter(_5305013 => _5305013.minions.state === 1);
                    _5939393.filter(_4665721 => _4665721.minions.fatAmount === 0).forEach(_4080782 => {
                      _2818816 += "<div class=\"minions-entry\">";
                      _2818816 += "<div class=\"block\">";
                      _2818816 += "<div class=\"btn-one title\">" + _4080782.minions.amount + " Minions</div>";
                      _2818816 += "<div class=\"time\"><span class=\"clock-grey sprite-main\"></span>" + this.formatInterfaceTime(_4080782.minions.time) + "</div>";
                      _2818816 += "<div class=\"hr\"></div>";
                      _2818816 += "<div class=\"mass-selector\">";
                      _2818816 += "<div onclick=\"raga.prepareMinionsInterface(this, " + _4080782.id + ", " + _4080782.price + ");\" class=\"selected\"><div></div><span>None</span></div>";
                      _5939393.filter(_3449187 => _3449187.minions.amount === _4080782.minions.amount && _3449187.minions.time === _4080782.minions.time && _3449187.minions.fatAmount > 0).forEach(_2294775 => {
                        _2818816 += "<div onclick=\"raga.prepareMinionsInterface(this, " + _2294775.id + ", " + _2294775.price + ");\"><div></div><span>" + _2294775.minions.fatAmount + " Mass Minions</span></div>";
                      });
                      _2818816 += '</div>';
                      _2818816 += '</div>';
                      _2818816 += "<div onclick=\"raga.buyMinionsInterface(this, " + _4080782.id + ");\" class=\"buy\">" + _4080782.price + " <span class=\"sprite-main currency-icon raga-coins\" style=\"vertical-align: -4px;\"></span></div>";
                      _2818816 += "</div>";
                    });
                  } else if (_11308171 === 1) {
                    this.shops.filter(_9444741 => _9444741.minions.state === 2).forEach(_2200030 => {
                      _2818816 += "<div class=\"minions-entry\"><div class=\"block\"><div class=\"btn-two title\">" + _2200030.minions.amount + " + " + _2200030.minions.fatAmount + " Minions</div><div class=\"time\">" + _2200030.minions.fatMass + " mass</div><div class=\"time\"><span class=\"clock-grey sprite-main\"></span>" + this.formatInterfaceTime(_2200030.minions.time) + "</div></div><div onclick=\"raga.buyMinionsInterface(this, " + _2200030.id + ");\" class=\"buy\">" + _2200030.price + " <span class=\"sprite-main currency-icon raga-coins\" style=\"vertical-align: -4px;\"></span></div></div>";
                    });
                  }
                }
              }
            }
            _2818816 += "</div>";
          } else {
            if (_6361248 === 2) {
              if (_11308171 === 0) {
                _2818816 += "<div class=\"create-skin\">";
                _2818816 += "<div class=\"instruction\">Recommended image size is 512 x 512 pixels</div>";
                _2818816 += "<div class=\"border\">";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\" class=\"selected\"><span class=\"green\"></span></div>";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"yellow\"></span></div>";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"orange\"></span></div>";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"red\"></span></div>";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"violet\"></span></div>";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"pink\"></span></div>";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"blue\"></span></div>";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"light-blue\"></span></div>";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"white\"></span></div>";
                _2818816 += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"black\"></span></div>";
                _2818816 += "</div>";
                _2818816 += "<canvas width=\"208\" height=\"208\"></canvas>";
                _2818816 += "<label for=\"select-image-upload\" class=\"select-image\">Select image</label><input id=\"select-image-upload\" type=\"file\" accept=\"image/*\" onchange=\"raga.selectSkinImageInterface(this);\" />";
                _2818816 += "<div class=\"serror\"></div>";
                _2818816 += "<div onclick=\"raga.saveSkinInterface(this);\" class=\"save\">" + this.shops.find(_2648505 => _2648505.skin).price + " <span class=\"sprite-main currency-icon raga-coins\" style=\"vertical-align: -4px;\"></span></div>";
                _2818816 += "</div>";
              } else {
                if (_11308171 === 1) {
                  _2818816 += "<div class=\"create-skin\">";
                  _2818816 += "<div class=\"instruction\">Please wait while your skin is being created</div>";
                  _2818816 += "<div class=\"loader\"></div>";
                  _2818816 += "</div>";
                } else if (_11308171 === 2) {
                  _2818816 += "<div class=\"create-skin\">";
                  _2818816 += "<div class=\"instruction\">Your skin is created and will be approved in 24 hours</div>";
                  _2818816 += "<div class=\"done sprite-common rush_icon\"></div>";
                  _2818816 += "</div>";
                }
              }
            }
          }
        }
        _2818816 += '</div>';
        _2818816 += "</div>";
        const _4473803 = document.createElement("div");
        _4473803.innerHTML = _2818816;
        const _2367080 = document.getElementById("leagues-app");
        if (_2367080.lastChild.nodeType === 1) {
          _2367080.removeChild(_2367080.lastChild);
        }
        _2367080.appendChild(_4473803);
      }
      ['buyCoinsInterface'](_2445893) {
        open("https://minions.raga.pw/ragamode/coins/" + this.ident + '/' + _2445893, '_blank');
      }
      ["prepareMinionsInterface"](_4011443, _3543860, _6001918) {
        const _3826815 = _4011443.parentNode.parentNode.parentNode;
        const _16421343 = _3826815.querySelector('.buy');
        _16421343.innerHTML = _16421343.innerHTML.replace(/\d+/, _6001918);
        _16421343.setAttribute('onclick', "raga.buyMinionsInterface(this, " + _3543860 + ');');
        const _1498202 = _3826815.querySelector(".block .mass-selector>div.selected");
        _1498202.className = '';
        _4011443.className = "selected";
      }
      ["buyMinionsInterface"](_11002281, _3545532) {
        if (!confirm("Are you sure you want to rent this package?")) {
          return;
        }
        if (parseInt(_11002281.innerHTML, 10) > this.money) {
          alert("You do not have enough Raga Coins");
          return;
        }
        const _3598268 = new DataView(new ArrayBuffer(3));
        let _2332734 = 0;
        _3598268.setUint8(_2332734, 32);
        _2332734 += 1;
        _3598268.setUint16(_2332734, _3545532, true);
        const _5311103 = new Uint8Array(_3598268.buffer);
        window.core.proxyMobileData(_5311103);
        window.core.proxyMobileData(new Uint8Array([9]));
      }
      ['saveFriendsInterface']() {
        const _12268992 = Array.prototype.slice.call(document.querySelectorAll(".raga-mode-shop .minions .friends .block .friend"));
        const _2058495 = 3 + _12268992.reduce((_10962145, _4292087) => _10962145 + unescape(encodeURIComponent(_4292087.value)).length + 1, 0);
        const _3196148 = new DataView(new ArrayBuffer(_2058495));
        let _2836364 = 0;
        _3196148.setUint8(_2836364, 33);
        _2836364 += 1;
        _3196148.setUint16(_2836364, _12268992.length, true);
        _2836364 += 2;
        _12268992.forEach(_5085577 => {
          unescape(encodeURIComponent(_5085577.value)).split('').forEach(_4349176 => {
            _3196148.setUint8(_2836364++, _4349176.charCodeAt(0));
          });
          _3196148.setUint8(_2836364, 0);
          _2836364 += 1;
        });
        const _2218760 = new Uint8Array(_3196148.buffer);
        window.core.proxyMobileData(_2218760);
        window.core.proxyMobileData(new Uint8Array([9]));
      }
      ['refundMinionsInterface']() {
        if (!confirm("Are you sure you want to stop this rent and get your coins back?")) {
          return;
        }
        window.core.proxyMobileData(new Uint8Array([161]));
        window.core.proxyMobileData(new Uint8Array([9]));
      }
      ['supportMinionsInterface']() {
        this.openCommunityInterface();
      }
      ["cancelFriendshipInterface"]() {
        if (!confirm("Are you sure you want to cancel this rent?")) {
          return;
        }
        window.core.proxyMobileData(new Uint8Array([34]));
        window.core.proxyMobileData(new Uint8Array([9]));
      }
      ['selectSkinImageInterface'](_2955003) {
        const _2682399 = _2955003.files[0];
        const _2504643 = document.querySelector(".raga-mode-shop .create-skin .border>div.selected>span");
        const _3879241 = getComputedStyle(_2504643).backgroundColor;
        this.drawSkinInterface(_2682399, _3879241);
      }
      ['selectSkinBorderInterface'](_2117218) {
        const _5036346 = document.getElementById("select-image-upload");
        const _5767647 = _5036346.files[0];
        const _1448410 = getComputedStyle(_2117218.firstChild).backgroundColor;
        this.drawSkinInterface(_5767647, _1448410);
        const _5371439 = document.querySelector(".raga-mode-shop .create-skin .border>div.selected");
        _5371439.className = '';
        _2117218.className = "selected";
        _2117218.style.borderColor = _1448410;
      }
      ["drawSkinInterface"](_4492291, _2276783) {
        const _1607326 = document.querySelector(".raga-mode-shop .create-skin canvas").getContext('2d');
        const _6353422 = new Image();
        _6353422.onload = () => {
          _1607326.clearRect(0, 0, _1607326.canvas.width, _1607326.canvas.height);
          _1607326.save();
          _1607326.beginPath();
          _1607326.arc(_1607326.canvas.width / 2, _1607326.canvas.height / 2, 100, 0, Math.PI * 2, true);
          _1607326.closePath();
          _1607326.clip();
          _1607326.drawImage(_6353422, _6353422.naturalWidth / 2 - 256, _6353422.naturalHeight / 2 - 256, 512, 512, _1607326.canvas.width / 2 - 100, _1607326.canvas.width / 2 - 100, 200, 200);
          _1607326.restore();
          _1607326.strokeStyle = _2276783;
          _1607326.lineWidth = 4;
          _1607326.beginPath();
          _1607326.arc(_1607326.canvas.width / 2, _1607326.canvas.height / 2, 100, 0, Math.PI * 2, true);
          _1607326.closePath();
          _1607326.stroke();
          const _4072603 = document.querySelector(".raga-mode-shop .create-skin .border");
          _4072603.style.display = "block";
          _1607326.canvas.style.display = "block";
          const _6169734 = document.querySelector(".raga-mode-shop .create-skin .serror");
          const _4500626 = document.querySelector(".raga-mode-shop .create-skin .save");
          if (_4492291.size > 1048576) {
            _6169734.innerHTML = "Maximum file size is 1 MB";
            _6169734.style.display = "block";
            _4500626.style.display = "none";
          } else if (_6353422.naturalWidth < 512 || _6353422.naturalHeight < 512) {
            _6169734.innerHTML = "Selected image is too small";
            _6169734.style.display = 'block';
            _4500626.style.display = "none";
          } else {
            _6169734.style.display = 'none';
            _4500626.style.display = "block";
          }
        };
        const _4512158 = new FileReader();
        _4512158.onloadend = () => {
          _6353422.src = _4512158.result;
        };
        _4512158.readAsDataURL(_4492291);
      }
      async ['saveSkinInterface'](_3613349) {
        if (!confirm("Are you sure you want to create this skin?")) {
          return;
        }
        if (parseInt(_3613349.innerHTML, 10) > this.money) {
          alert("You do not have enough Raga Coins");
          return;
        }
        const _9011042 = document.getElementById("select-image-upload");
        const _5877800 = _9011042.files[0];
        const _5518803 = document.querySelector(".raga-mode-shop .create-skin .border>div.selected>span");
        const _6024586 = getComputedStyle(_5518803).backgroundColor;
        const _3835320 = _6024586.match(/\d+/g).map(_13041887 => parseInt(_13041887, 10));
        const _3611364 = (_3835320[0] << 16) + (_3835320[1] << 8) + _3835320[2];
        const _5160935 = new FormData();
        _5160935.append("skin", _5877800);
        _5160935.append('color', _3611364.toString());
        this.openShopInterface(2, 1);
        const _2916929 = await fetch("https://minions.raga.pw/ragamode/skins", {
          'cache': "no-store",
          'method': "POST",
          'body': _5160935
        }).then(_4865654 => _4865654.json())["catch"](() => {});
        if (_2916929 && _2916929.status === 'OK') {
          const _3327754 = new Uint8Array([35, ...unescape(encodeURIComponent(_2916929.claim)).split('').map(_6243651 => _6243651.charCodeAt(0)), 0]);
          window.core.proxyMobileData(_3327754);
          window.core.proxyMobileData(new Uint8Array([9]));
          this.openShopInterface(2, 2);
        }
      }
      ["closeShopInterface"]() {
        const _2873123 = document.getElementById("leagues-app");
        if (_2873123.lastChild.nodeType === 1) {
          _2873123.removeChild(_2873123.lastChild);
        }
      }
      ['openSettingsInterface']() {
        if (!this.isLogged) {
          alert("Please sign in to use settings");
          return;
        }
        let _13085756 = '';
        _13085756 += "<div onclick=\"raga.closeSettingsInterface();\" class=\"leagues-blocker\"><div class=\"disabler\"></div></div>";
        _13085756 += "<div class=\"leagues-dialog\">";
        _13085756 += "<span onclick=\"raga.closeSettingsInterface();\" class=\"leagues-inner-close sprite-main Close\"></span>";
        _13085756 += "<h1>Raga Mode Settings</h1>";
        _13085756 += "<div class=\"raga-mode-settings\">";
        _13085756 += "<div class=\"settings-entry general\">";
        _13085756 += "<div class=\"section\">General</div>";
        this.settings.filter(_10233044 => _10233044.section === "general").forEach(_4494201 => {
          _13085756 += "<div class=\"command\"><div class=\"name\">" + _4494201.name + "</div><select onfocus=\"this.oldValue = this.value;\" onchange=\"raga.changeSettingsInterface(this);\" data-ident=\"" + _4494201.ident + "\" class=\"select\">" + _4494201.command.map(_5078339 => "<option value=\"" + _5078339.value + "\" " + (_5078339.value === _4494201.value ? "selected" : '') + '>' + _5078339.name + "</option>").join() + "</select></div>";
        });
        _13085756 += "</div>";
        _13085756 += "<div class=\"settings-entry\">";
        _13085756 += "<div class=\"section\">Player</div>";
        this.settings.filter(_5477762 => _5477762.section === "player").forEach(_5790543 => {
          _13085756 += "<div class=\"command\"><div class=\"name\">" + _5790543.name + "</div><div onclick=\"raga.changeSettingsInterface(this);\" data-ident=\"" + _5790543.ident + "\" data-active=\"Press a key\" class=\"value " + (this.settings.filter(_4019067 => typeof _4019067.command === 'function' && _4019067.value === _5790543.value).length > 1 ? "conflict" : '') + "\"><span>" + _5790543.value.replace(" ", "space").toUpperCase() + "</span></div></div>";
        });
        _13085756 += "</div>";
        _13085756 += "<div class=\"settings-entry\">";
        _13085756 += "<div class=\"section\">Minion</div>";
        this.settings.filter(_6173305 => _6173305.section === "minion").forEach(_2576868 => {
          _13085756 += "<div class=\"command\"><div class=\"name\">" + _2576868.name + "</div><div onclick=\"raga.changeSettingsInterface(this);\" data-ident=\"" + _2576868.ident + "\" data-active=\"Press a key\" class=\"value " + (this.settings.filter(_3829462 => typeof _3829462.command === "function" && _3829462.value === _2576868.value).length > 1 ? "conflict" : '') + "\"><span>" + _2576868.value.replace(" ", "space").toUpperCase() + '</span></div></div>';
        });
        _13085756 += "</div>";
        _13085756 += "</div>";
        _13085756 += "</div>";
        const _4466431 = document.createElement('div');
        _4466431.innerHTML = _13085756;
        const _2576995 = document.getElementById("leagues-app");
        if (_2576995.lastChild.nodeType === 1) {
          _2576995.removeChild(_2576995.lastChild);
        }
        _2576995.appendChild(_4466431);
      }
      ["changeSettingsInterface"](_13041388) {
        const _1568515 = this.settings.find(_3993182 => _3993182.ident === _13041388.getAttribute("data-ident"));
        if (_1568515.section === "general") {
          if (_1568515.ident === "connection") {
            if (!confirm("The game will restart now to apply the changes")) {
              _13041388.value = _13041388.oldValue;
              return;
            }
          }
          const _1994834 = _1568515.ident + ':' + _13041388.value;
          const _3600182 = new Uint8Array([36, ...unescape(encodeURIComponent(_1994834)).split('').map(_5482420 => _5482420.charCodeAt(0)), 0]);
          window.core.proxyMobileData(_3600182);
          window.core.proxyMobileData(new Uint8Array([9]));
        } else {
          if (!this.changingSettings) {
            this.changingSettings = {
              'element': _13041388,
              'entry': _1568515
            };
            _13041388.classList.toggle("active");
          } else if (_1568515.ident === this.changingSettings.entry.ident) {
            this.changingSettings = null;
            _13041388.classList.toggle("active");
          }
        }
      }
      ['closeSettingsInterface']() {
        this.changingSettings = null;
        const _2818259 = document.getElementById('leagues-app');
        if (_2818259.lastChild.nodeType === 1) {
          _2818259.removeChild(_2818259.lastChild);
        }
      }
      ["openCommunityInterface"]() {
        open("https://discord.com/invite/UK4R9fg", "_blank");
      }
      ['openSkinSelectorInterface'](_11308803) {
        if (!this.isLogged) {
          alert("Please sign in to use skins");
          return;
        }
        let _14928707 = '';
        _14928707 += "<div onclick=\"raga.closeSkinSelectorInterface();\" class=\"leagues-blocker\"><div class=\"disabler\"></div></div>";
        _14928707 += "<div class=\"leagues-dialog\">";
        _14928707 += "<span onclick=\"raga.closeSkinSelectorInterface();\" class=\"leagues-inner-close sprite-main Close\"></span>";
        _14928707 += "<h1>Raga Mode Skins</h1>";
        _14928707 += "<div id=\"menu-leagues\" style=\"margin-top: 15px;\">";
        _14928707 += "<div class=\"button-row\">";
        _14928707 += "<div class=\"button-cell\"><button onclick=\"raga.openSkinSelectorInterface(0);\" class=\"btn btn-world" + (_11308803 === 0 ? '-selected' : '') + " left\">Normal</button></div>";
        _14928707 += "<div class=\"button-cell\"><button onclick=\"raga.openSkinSelectorInterface(1);\" class=\"btn btn-world" + (_11308803 === 1 ? '-selected' : '') + "\">Custom</button></div>";
        _14928707 += "</div>";
        _14928707 += '</div>';
        _14928707 += "<div class=\"raga-mode-skin-selector\">";
        if (_11308803 === 0) {
          this.agarioSkins.forEach(_3820596 => {
            _14928707 += "<div onclick=\"raga.setSkinInterface(this, '" + _3820596.ident + "');\" class=\"skin-entry " + (_3820596.ident === this.skin ? "selected" : '') + "\" style=\"background-image: url('" + _3820596.url.replace(".png", "_low.png") + "'); border: 3px solid #" + _3820596.color.toString(16).padStart(6, '0') + ";\"></div>";
          });
        } else if (_11308803 === 1) {
          this.ownedSkins.forEach(_2222475 => {
            const _5434209 = this.skins.find(_3960401 => _3960401.ident === _2222475);
            if (!_5434209) {
              _14928707 += "<div onclick=\"raga.setSkinInterface(this);\" class=\"skin-entry pending\" style=\"background-image: url('https://minions.raga.pw/ragamode/skins/small/" + _2222475 + "'); border: 3px solid #ffffff;\">";
              _14928707 += "<div class=\"sprite-common rush_icon\"></div>";
              _14928707 += "<div class=\"overlay-container\">";
              _14928707 += "<div onclick=\"raga.copySkinInterface('" + _2222475 + "', event);\" class=\"copy\"></div>";
              _14928707 += '</div>';
              _14928707 += "</div>";
            } else {
              _14928707 += "<div onclick=\"raga.setSkinInterface(this, '" + _5434209.ident + "');\" class=\"skin-entry " + (_5434209.ident === this.skin ? "selected" : '') + "\" style=\"background-image: url('" + _5434209.url.replace("/normal/", "/small/") + "'); border: 3px solid #" + (_5434209.color >= 0 ? _5434209.color : 16777215).toString(16).padStart(6, '0') + ";\">";
              _14928707 += "<div class=\"overlay-container\">";
              _14928707 += "<div onclick=\"raga.removeSkinInterface(this, '" + _5434209.ident + "', event);\" class=\"remove\" style=\"visibility: " + (_5434209.ident !== this.skin ? 'visible' : "hidden") + ";\"></div>";
              _14928707 += "<div onclick=\"raga.copySkinInterface('" + _5434209.ident + "', event);\" class=\"copy\"></div>";
              _14928707 += "</div>";
              _14928707 += "</div>";
            }
          });
        }
        _14928707 += "</div>";
        _14928707 += "</div>";
        const _11773222 = document.createElement('div');
        _11773222.innerHTML = _14928707;
        const _4810682 = document.getElementById("leagues-app");
        if (_4810682.lastChild.nodeType === 1) {
          _4810682.removeChild(_4810682.lastChild);
        }
        _4810682.appendChild(_11773222);
      }
      ["setSkinInterface"](_1462970, _5926077 = null) {
        if (window.core.playerHasCells()) {
          alert("You can't change skin while playing");
          return;
        }
        if (!_5926077) {
          alert("This skin is not approved yet");
          return;
        }
        const _6155566 = _1462970.classList.contains("selected") ? '' : _5926077;
        const _3424058 = new Uint8Array([37, ...unescape(encodeURIComponent(_6155566)).split('').map(_1571354 => _1571354.charCodeAt(0)), 0]);
        window.core.proxyMobileData(_3424058);
        window.core.proxyMobileData(new Uint8Array([9]));
        const _13084801 = document.querySelector(".raga-mode-skin-selector .skin-entry.selected");
        if (_13084801) {
          _13084801.classList.toggle('selected');
          if (_13084801.children.length) {
            _13084801.children[0].children[0].style.visibility = "visible";
          }
        }
        if (_1462970 !== _13084801) {
          _1462970.classList.toggle("selected");
          if (_1462970.children.length) {
            _1462970.children[0].children[0].style.visibility = "hidden";
          }
        }
      }
      ["removeSkinInterface"](_4021392, _3447230, _5218886) {
        if (confirm("Are you sure you want to remove this skin, coins will not be refunded?")) {
          const _13371872 = new Uint8Array([160, ...unescape(encodeURIComponent(_3447230)).split('').map(_15718560 => _15718560.charCodeAt(0)), 0]);
          window.core.proxyMobileData(_13371872);
          window.core.proxyMobileData(new Uint8Array([9]));
          _4021392.parentNode.parentNode.remove();
        }
        _5218886.stopPropagation();
      }
      ["copySkinInterface"](_7531813, _3413969) {
        navigator.clipboard.writeText(_7531813).then(() => alert("Skin ID is copied to clipboard"));
        _3413969.stopPropagation();
      }
      ["closeSkinSelectorInterface"]() {
        const _3882827 = document.getElementById("leagues-app");
        if (_3882827.lastChild.nodeType === 1) {
          _3882827.removeChild(_3882827.lastChild);
        }
      }
      ["checkSpawnInterface"]() {
        const _13167045 = document.getElementById('nick');
        const _2917093 = document.getElementById("play");
        if (this.gameMode && this.tournamentMode && this.gameMode === this.tournamentMode && !this.isAuthSent) {
          _13167045.disabled = true;
          _2917093.innerHTML = "Please Wait";
          _2917093.disabled = true;
        } else {
          _13167045.disabled = false;
          _2917093.innerHTML = "Play";
          _2917093.disabled = false;
        }
      }
      ["switchInterface"]() {
        if (document.getElementById("mainui-user") && this.gameMode) {
          if (this.gameModes.find(_5495173 => _5495173.type === this.gameMode)) {
            const _4427187 = document.querySelector(".user-container");
            _4427187.style.display = "none";
            let _5089385 = document.querySelector(".new-user-container");
            if (!_5089385) {
              let _8482488 = '';
              _8482488 += "<img src=\"" + this.getInterface().profileImage + "\" class=\"user-picture\" />";
              _8482488 += "<div onclick=\"raga.openShopInterface(0);\" class=\"currency-container\"><span class=\"label\">" + this.getInterface().money + "</span><span class=\"icon sprite-main currency-icon raga-coins\"></span><div class=\"plus\"><span>+</span></div></div>";
              _8482488 += "<div class=\"ident-container\">" + this.getInterface().ident + '</div>';
              _8482488 += "<div class=\"user-name\">" + this.getInterface().profileName + "</div>";
              _8482488 += "<div class=\"progress-bar-container\"><div class=\"progress-bar\" style=\"width: 0%;\"></div><span class=\"progress-bar-text\">" + this.getInterface().minions + "</span></div>";
              _5089385 = document.createElement("div");
              _5089385.className = "new-user-container";
              _5089385.innerHTML = _8482488;
              _4427187.parentNode.appendChild(_5089385);
            }
            _5089385.style.display = "block";
            const _2902539 = document.querySelector('.offers-container');
            _2902539.style.display = "none";
            let _4871308 = document.querySelector(".new-offers-container");
            if (!_4871308) {
              let _2858454 = '';
              _2858454 += "<div class=\"buttons-container\">";
              _2858454 += "<div onclick=\"raga.openShopInterface(0);\" class=\"shop\"><span class=\"label\">Shop</span><span class=\"sprite-main Icon-Store\"></span></div>";
              _2858454 += "<div onclick=\"raga.openSettingsInterface();\" class=\"settings\"><span class=\"label\">Settings</span><span class=\"sprite-main controller\"></span></div>";
              _2858454 += "<div onclick=\"raga.openCommunityInterface();\" class=\"community\"><span class=\"label\">Community</span><span class=\"sprite-main Icon-Leaderboards\"></span></div>";
              _2858454 += "</div>";
              _4871308 = document.createElement('div');
              _4871308.className = "new-offers-container";
              _4871308.innerHTML = _2858454;
              _2902539.parentNode.appendChild(_4871308);
            }
            _4871308.style.display = "block";
            const _3314861 = document.getElementById("mainui-features");
            _3314861.style.display = "none";
            const _6127221 = document.querySelector('.bubble');
            if (_6127221) {
              _6127221.style.display = "none";
            }
            const _4574130 = document.getElementById("skinButton");
            _4574130.style.display = 'none';
            const _4735649 = document.getElementById("new-skinButton");
            _4735649.style.display = '';
          } else {
            const _2070633 = document.querySelector(".user-container");
            _2070633.style.display = 'block';
            const _3419198 = document.querySelector(".new-user-container");
            if (_3419198) {
              _3419198.style.display = "none";
            }
            const _3856058 = document.querySelector('.offers-container');
            _3856058.style.display = "block";
            const _4563529 = document.querySelector('.new-offers-container');
            if (_4563529) {
              _4563529.style.display = "none";
            }
            const _10791051 = document.getElementById("mainui-features");
            _10791051.style.display = "block";
            const _4910570 = document.querySelector(".bubble");
            if (_4910570) {
              _4910570.style.display = "block";
            }
            const _4452104 = document.getElementById("skinButton");
            _4452104.style.display = '';
            const _9979918 = document.getElementById('new-skinButton');
            _9979918.style.display = "none";
          }
          this.checkSpawnInterface();
          this.closeShopInterface();
        }
      }
      ["renderCounter"](_2646270) {
        const _2542884 = 13 * _2646270;
        const _13332588 = 14 * _2646270;
        this.hud.counter.font = _2542884 + "px Ubuntu";
        const _5086998 = this.hud.counter.measureText(this.developer).width;
        const _5238832 = this.hud.counter.measureText('M').width;
        const _2134515 = _5086998 + 60 * _2646270;
        const _4168848 = _5238832 + 10 * _2646270;
        this.hud.counter.font = _13332588 + "px Ubuntu";
        const _3170156 = this.hud.counter.measureText(this.hud.utils.getSurvivorCoins()).width;
        const _4030577 = this.hud.counter.measureText('M').width;
        this.hud.counter.font = _2542884 + "px Ubuntu";
        const _5636661 = _3170156 + 50 * _2646270;
        const _1998261 = _4030577 + 15 * _2646270;
        const _4855484 = 60 * _2646270;
        const _3142163 = 8 * _2646270;
        const _1877121 = 16 * _2646270;
        const _5377898 = 16 * _2646270;
        const _3524071 = this.hud.counter.measureText(this.hud.utils.getGameMode()).width;
        const _1696047 = 30 * _2646270;
        const _5865598 = 35 * _2646270;
        const _2869346 = 16 * _2646270;
        const _5728353 = 16 * _2646270;
        const _6981895 = this.hud.counter.measureText(this.hud.utils.getMinions()).width;
        const _619044 = 300 * _2646270;
        const _3746660 = _4168848 / 2 + _4855484 + _1998261;
        this.hud.counter.canvas.width = _619044;
        this.hud.counter.canvas.height = _3746660;
        this.hud.counter.clearRect(0, 0, this.hud.counter.canvas.width, this.hud.counter.canvas.height);
        this.hud.counter.font = _2542884 + "px Ubuntu";
        this.hud.counter.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.hud.utils.roundedRectangle(this.hud.counter, 0, _4168848 / 2, _619044, _4855484, _4855484 / 1.8).fill();
        this.hud.counter.fillStyle = '#21b8fa';
        this.hud.utils.roundedRectangle(this.hud.counter, this.hud.counter.canvas.width / 2 - _2134515 / 2, 0, _2134515, _4168848, _4168848 / 1.8).fill();
        this.hud.counter.fillStyle = '#ffffff';
        this.hud.counter.fillText(this.developer, this.hud.counter.canvas.width / 2 - _5086998 / 2, _4168848 / 2 + _5238832 / 2.5);
        const _8067738 = new Image();
        _8067738.src = this.hud.images.gameMode;
        this.hud.counter.drawImage(_8067738, _4855484 / 1.8 / 2 + (this.hud.counter.canvas.width / 2 - _4855484 / 1.8 / 2 - _1696047 / 2 - (_1877121 + _3142163 + _3524071)) / 2, this.hud.counter.canvas.height / 2 - _5377898 / 2 + _4168848 / 4 - _1998261 / 2, _1877121, _5377898);
        this.hud.counter.fillText(this.hud.utils.getGameMode(), _4855484 / 1.8 / 2 + (this.hud.counter.canvas.width / 2 - _4855484 / 1.8 / 2 - _1696047 / 2 - (_1877121 + _3142163 + _3524071)) / 2 + _1877121 + _3142163, this.hud.counter.canvas.height / 2 + this.hud.counter.measureText('M').width / 2.5 + _4168848 / 4 - _1998261 / 2);
        const _5717148 = new Image();
        _5717148.src = this.hud.images.logo;
        this.hud.counter.drawImage(_5717148, this.hud.counter.canvas.width / 2 - _1696047 / 2, this.hud.counter.canvas.height / 2 - _5865598 / 2 + _4168848 / 2 - _1998261 / 1.6, _1696047, _5865598);
        const _1295959 = new Image();
        _1295959.src = this.hud.images.minions;
        this.hud.counter.drawImage(_1295959, this.hud.counter.canvas.width / 2 + _1696047 / 2 + (this.hud.counter.canvas.width / 2 - _1696047 / 2 - _4855484 / 1.8 / 2 - (_2869346 + _3142163 + _6981895)) / 2, this.hud.counter.canvas.height / 2 - _5728353 / 2 + _4168848 / 4 - _1998261 / 2, _2869346, _5728353);
        this.hud.counter.fillText(this.hud.utils.getMinions(), this.hud.counter.canvas.width / 2 + _1696047 / 2 + (this.hud.counter.canvas.width / 2 - _1696047 / 2 - _4855484 / 1.8 / 2 - (_2869346 + _3142163 + _6981895)) / 2 + _2869346 + _3142163, this.hud.counter.canvas.height / 2 + this.hud.counter.measureText('M').width / 2.5 + _4168848 / 4 - _1998261 / 2);
        this.hud.counter.fillStyle = "#21b8fa";
        this.hud.utils.roundedRectangle(this.hud.counter, this.hud.counter.canvas.width / 2 - _5636661 / 2, this.hud.counter.canvas.height - _1998261 - _1998261 / 4, _5636661, _1998261, _1998261 / 2).fill();
        this.hud.counter.fillStyle = '#ffffff';
        this.hud.counter.fillText(this.hud.utils.getSurvivorCoins(), this.hud.counter.canvas.width / 2 - _3170156 / 2, this.hud.counter.canvas.height - _1998261 / 2 - _4030577 / 3.5);
        return this.hud.counter.canvas;
      }
      ["renderTournamentCounterSolo"](_13109016) {
        const _5342158 = 13 * _13109016;
        const _5459389 = 16 * _13109016;
        this.hud.tournamentCounter.font = _5342158 + "px Ubuntu";
        const _1729035 = this.hud.tournamentCounter.measureText("Raga Tournament").width;
        const _1842784 = this.hud.tournamentCounter.measureText('M').width;
        const _5729483 = _1729035 + 60 * _13109016;
        const _5900965 = _1842784 + 10 * _13109016;
        this.hud.tournamentCounter.font = _5459389 + "px Ubuntu";
        let _1830064 = '';
        let _4674224 = [];
        let _1595440 = 0;
        if (this.tournament.message) {
          _1830064 = this.tournament.message;
          const _2505555 = _1830064.split(',');
          if (_2505555.length === 3) {
            _4674224 = _2505555;
            _1595440 = 50 * _13109016;
          }
        } else {
          _1830064 = new Date(this.tournament.time * 1000).toISOString().substr(14, 5);
        }
        let _2089582 = this.hud.tournamentCounter.measureText(_1830064).width;
        if (_4674224.length === 3) {
          _4674224.forEach((_7991766, _5004807) => {
            while (this.hud.tournamentCounter.measureText(_7991766).width > Math.round(this.hud.tournamentCounter.canvas.width * 0.6)) {
              _7991766 = _7991766.slice(0, -1);
            }
            _4674224[_5004807] = _7991766;
          });
          _2089582 = this.hud.tournamentCounter.measureText(_4674224.reduce((_3673809, _4841922) => this.hud.tournamentCounter.measureText(_3673809).width > this.hud.tournamentCounter.measureText(_4841922).width ? _3673809 : _4841922)).width + 10 * _13109016;
        }
        const _3278466 = this.hud.tournamentCounter.measureText('M').width;
        this.hud.tournamentCounter.font = _5342158 + "px Ubuntu";
        const _6236946 = _2089582 + 60 * _13109016;
        const _1723231 = _3278466 + 20 * _13109016;
        const _1344148 = 70 * _13109016;
        const _8387766 = 8 * _13109016;
        this.hud.tournamentCounter.font = _5459389 + "px Ubuntu";
        const _3049740 = this.hud.tournamentCounter.measureText('Alive').width;
        const _1840650 = this.hud.tournamentCounter.measureText(this.tournament.alive).width;
        this.hud.tournamentCounter.font = _5342158 + "px Ubuntu";
        const _3991827 = 30 * _13109016;
        const _2703110 = 35 * _13109016;
        this.hud.tournamentCounter.font = _5459389 + "px Ubuntu";
        const _1685738 = this.hud.tournamentCounter.measureText("Dead").width;
        const _4506259 = this.hud.tournamentCounter.measureText(this.tournament.dead).width;
        this.hud.tournamentCounter.font = _5342158 + "px Ubuntu";
        const _4217596 = 400 * _13109016;
        const _5008008 = _5900965 / 2 + _1344148 + _1723231 + _1595440;
        this.hud.tournamentCounter.canvas.width = _4217596;
        this.hud.tournamentCounter.canvas.height = _5008008;
        this.hud.tournamentCounter.clearRect(0, 0, this.hud.tournamentCounter.canvas.width, this.hud.tournamentCounter.canvas.height);
        this.hud.tournamentCounter.font = _5342158 + "px Ubuntu";
        this.hud.tournamentCounter.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.hud.utils.roundedRectangle(this.hud.tournamentCounter, 0, _5900965 / 2, _4217596, _1344148, _1344148 / 1.8).fill();
        this.hud.tournamentCounter.fillStyle = "#21b8fa";
        this.hud.utils.roundedRectangle(this.hud.tournamentCounter, this.hud.tournamentCounter.canvas.width / 2 - _5729483 / 2, 0, _5729483, _5900965, _5900965 / 1.8).fill();
        this.hud.tournamentCounter.fillStyle = '#ffffff';
        this.hud.tournamentCounter.fillText("Raga Tournament", this.hud.tournamentCounter.canvas.width / 2 - _1729035 / 2, _5900965 / 2 + _1842784 / 2.5);
        this.hud.tournamentCounter.font = _5459389 + "px Ubuntu";
        this.hud.tournamentCounter.fillStyle = '#ffffff';
        this.hud.tournamentCounter.fillText("Alive", _1344148 / 1.8 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - _1344148 / 1.8 / 2 - _3991827 / 2 - (_3049740 + _8387766 + _1840650)) / 2, (this.hud.tournamentCounter.canvas.height - _1595440) / 2 + this.hud.tournamentCounter.measureText('M').width / 2.5 - _1723231 / 3);
        this.hud.tournamentCounter.fillText(this.tournament.alive, _1344148 / 1.8 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - _1344148 / 1.8 / 2 - _3991827 / 2 - (_3049740 + _8387766 + _1840650)) / 2 + _3049740 + _8387766, (this.hud.tournamentCounter.canvas.height - _1595440) / 2 + this.hud.tournamentCounter.measureText('M').width / 2.5 - _1723231 / 3);
        this.hud.tournamentCounter.fillStyle = "#ffffff";
        const _1378717 = new Image();
        _1378717.src = this.hud.images.logo;
        this.hud.tournamentCounter.drawImage(_1378717, this.hud.tournamentCounter.canvas.width / 2 - _3991827 / 2, (this.hud.tournamentCounter.canvas.height - _1595440) / 2 - _2703110 / 2 - _1723231 / 4, _3991827, _2703110);
        this.hud.tournamentCounter.fillStyle = '#ffffff';
        this.hud.tournamentCounter.fillText('Dead', this.hud.tournamentCounter.canvas.width / 2 + _3991827 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - _3991827 / 2 - _1344148 / 1.8 / 2 - (_1685738 + _8387766 + _4506259)) / 2, (this.hud.tournamentCounter.canvas.height - _1595440) / 2 + this.hud.tournamentCounter.measureText('M').width / 2.5 - _1723231 / 3);
        this.hud.tournamentCounter.fillText(this.tournament.dead, this.hud.tournamentCounter.canvas.width / 2 + _3991827 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - _3991827 / 2 - _1344148 / 1.8 / 2 - (_1685738 + _8387766 + _4506259)) / 2 + _1685738 + _8387766, (this.hud.tournamentCounter.canvas.height - _1595440) / 2 + this.hud.tournamentCounter.measureText('M').width / 2.5 - _1723231 / 3);
        this.hud.tournamentCounter.fillStyle = "#21b8fa";
        this.hud.utils.roundedRectangle(this.hud.tournamentCounter, this.hud.tournamentCounter.canvas.width / 2 - _6236946 / 2, this.hud.tournamentCounter.canvas.height - _1595440 - _1723231 - _1723231 / 4, _6236946, _1723231 + _1595440, _1723231 / 2).fill();
        if (_4674224.length === 3) {
          let _4775255 = 0;
          let _3248779 = 1;
          _4674224.forEach(_1821339 => {
            if (_3248779 === 1) {
              this.hud.tournamentCounter.fillStyle = '#e9e077';
            } else {
              if (_3248779 === 2) {
                this.hud.tournamentCounter.fillStyle = "#d4d4d4";
              } else if (_3248779 === 3) {
                this.hud.tournamentCounter.fillStyle = "#f8c48c";
              }
            }
            this.hud.tournamentCounter.fillText(_3248779++ + ". " + _1821339, this.hud.tournamentCounter.canvas.width / 2 - _2089582 / 2, this.hud.tournamentCounter.canvas.height - _1595440 - _1723231 / 2 - _3278466 / 3 + _4775255);
            _4775255 += 25 * _13109016;
          });
        } else {
          this.hud.tournamentCounter.fillStyle = "#ffffff";
          this.hud.tournamentCounter.fillText(_1830064, this.hud.tournamentCounter.canvas.width / 2 - _2089582 / 2, this.hud.tournamentCounter.canvas.height - _1595440 - _1723231 / 2 - _3278466 / 3);
        }
        return this.hud.tournamentCounter.canvas;
      }
      ["renderTournamentCounterTeams"](_5826669) {
        const _6150997 = 13 * _5826669;
        const _5490785 = 16 * _5826669;
        this.hud.tournamentCounter.font = _6150997 + "px Ubuntu";
        const _5457783 = this.hud.tournamentCounter.measureText("Raga Tournament").width;
        const _5972816 = this.hud.tournamentCounter.measureText('M').width;
        const _3846600 = _5457783 + 60 * _5826669;
        const _15757009 = _5972816 + 10 * _5826669;
        this.hud.tournamentCounter.font = _5490785 + "px Ubuntu";
        let _5536106 = '';
        if (this.tournament.message && this.tournament.time > 0) {
          _5536106 = "Draw in " + this.tournament.time + '!';
        } else if (this.tournament.message) {
          _5536106 = this.tournament.message;
        } else {
          _5536106 = new Date(this.tournament.time * 1000).toISOString().substr(14, 5);
        }
        const _1727298 = this.hud.tournamentCounter.measureText(_5536106).width;
        const _2346353 = this.hud.tournamentCounter.measureText('M').width;
        this.hud.tournamentCounter.font = _6150997 + "px Ubuntu";
        const _9499910 = _1727298 + 60 * _5826669;
        const _10687190 = _2346353 + 20 * _5826669;
        const _4692400 = 70 * _5826669;
        const _4121940 = 8 * _5826669;
        this.hud.tournamentCounter.font = _5490785 + "px Ubuntu";
        const _4858727 = this.hud.tournamentCounter.measureText(this.tournament.team1Tag).width;
        const _1634175 = this.hud.tournamentCounter.measureText(this.tournament.team1Score).width;
        this.hud.tournamentCounter.font = _6150997 + "px Ubuntu";
        const _6994209 = 30 * _5826669;
        const _2001935 = 35 * _5826669;
        this.hud.tournamentCounter.font = _5490785 + "px Ubuntu";
        const _1446309 = this.hud.tournamentCounter.measureText(this.tournament.team2Tag).width;
        const _5856607 = this.hud.tournamentCounter.measureText(this.tournament.team2Score).width;
        this.hud.tournamentCounter.font = _6150997 + "px Ubuntu";
        const _5218151 = 400 * _5826669;
        const _1576192 = _15757009 / 2 + _4692400 + _10687190;
        this.hud.tournamentCounter.canvas.width = _5218151;
        this.hud.tournamentCounter.canvas.height = _1576192;
        this.hud.tournamentCounter.clearRect(0, 0, this.hud.tournamentCounter.canvas.width, this.hud.tournamentCounter.canvas.height);
        this.hud.tournamentCounter.font = _6150997 + "px Ubuntu";
        this.hud.tournamentCounter.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.hud.utils.roundedRectangle(this.hud.tournamentCounter, 0, _15757009 / 2, _5218151, _4692400, _4692400 / 1.8).fill();
        this.hud.tournamentCounter.fillStyle = "#21b8fa";
        this.hud.utils.roundedRectangle(this.hud.tournamentCounter, this.hud.tournamentCounter.canvas.width / 2 - _3846600 / 2, 0, _3846600, _15757009, _15757009 / 1.8).fill();
        this.hud.tournamentCounter.fillStyle = "#ffffff";
        this.hud.tournamentCounter.fillText("Raga Tournament", this.hud.tournamentCounter.canvas.width / 2 - _5457783 / 2, _15757009 / 2 + _5972816 / 2.5);
        this.hud.tournamentCounter.font = _5490785 + "px Ubuntu";
        this.hud.tournamentCounter.fillStyle = "#cccccc";
        if (this.tournament.team1Color === 1) {
          this.hud.tournamentCounter.fillStyle = "#bff3b0";
        } else if (this.tournament.team1Color === 2) {
          this.hud.tournamentCounter.fillStyle = '#f3b0b0';
        }
        this.hud.tournamentCounter.fillText(this.tournament.team1Tag, _4692400 / 1.8 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - _4692400 / 1.8 / 2 - _6994209 / 2 - (_4858727 + _4121940 + _1634175)) / 2, this.hud.tournamentCounter.canvas.height / 2 + this.hud.tournamentCounter.measureText('M').width / 2.5 - _10687190 / 3);
        this.hud.tournamentCounter.fillText(this.tournament.team1Score, _4692400 / 1.8 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - _4692400 / 1.8 / 2 - _6994209 / 2 - (_4858727 + _4121940 + _1634175)) / 2 + _4858727 + _4121940, this.hud.tournamentCounter.canvas.height / 2 + this.hud.tournamentCounter.measureText('M').width / 2.5 - _10687190 / 3);
        this.hud.tournamentCounter.fillStyle = "#ffffff";
        const _2282173 = new Image();
        _2282173.src = this.hud.images.logo;
        this.hud.tournamentCounter.drawImage(_2282173, this.hud.tournamentCounter.canvas.width / 2 - _6994209 / 2, this.hud.tournamentCounter.canvas.height / 2 - _2001935 / 2 - _10687190 / 4, _6994209, _2001935);
        this.hud.tournamentCounter.fillStyle = "#cccccc";
        if (this.tournament.team2Color === 1) {
          this.hud.tournamentCounter.fillStyle = "#bff3b0";
        } else if (this.tournament.team2Color === 2) {
          this.hud.tournamentCounter.fillStyle = "#f3b0b0";
        }
        this.hud.tournamentCounter.fillText(this.tournament.team2Tag, this.hud.tournamentCounter.canvas.width / 2 + _6994209 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - _6994209 / 2 - _4692400 / 1.8 / 2 - (_1446309 + _4121940 + _5856607)) / 2, this.hud.tournamentCounter.canvas.height / 2 + this.hud.tournamentCounter.measureText('M').width / 2.5 - _10687190 / 3);
        this.hud.tournamentCounter.fillText(this.tournament.team2Score, this.hud.tournamentCounter.canvas.width / 2 + _6994209 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - _6994209 / 2 - _4692400 / 1.8 / 2 - (_1446309 + _4121940 + _5856607)) / 2 + _1446309 + _4121940, this.hud.tournamentCounter.canvas.height / 2 + this.hud.tournamentCounter.measureText('M').width / 2.5 - _10687190 / 3);
        this.hud.tournamentCounter.fillStyle = "#21b8fa";
        this.hud.utils.roundedRectangle(this.hud.tournamentCounter, this.hud.tournamentCounter.canvas.width / 2 - _9499910 / 2, this.hud.tournamentCounter.canvas.height - _10687190 - _10687190 / 4, _9499910, _10687190, _10687190 / 2).fill();
        this.hud.tournamentCounter.fillStyle = "#ffffff";
        this.hud.tournamentCounter.fillText(_5536106, this.hud.tournamentCounter.canvas.width / 2 - _1727298 / 2, this.hud.tournamentCounter.canvas.height - _10687190 / 2 - _2346353 / 3);
        return this.hud.tournamentCounter.canvas;
      }
      ["renderLoop"]() {
        if (!this.isSetup || document.getElementById("mainui-play").style.display === '') {
          return;
        }
        const _3497705 = Math.min(this.canvas.canvas.width / 1920, this.canvas.canvas.height / 1080) * 1.1;
        if (this.gameMode !== 'ragatourney-solo' && this.gameMode !== "ragatourney-teams") {
          this.canvas.drawImage(this.renderCounter(2), 12 * _3497705, 12 * _3497705, this.hud.counter.canvas.width / 2 * _3497705, this.hud.counter.canvas.height / 2 * _3497705);
        } else {
          if (this.gameMode === "ragatourney-solo" && (this.tournament.alive || this.tournament.dead)) {
            this.canvas.drawImage(this.renderTournamentCounterSolo(2), 12 * _3497705, 12 * _3497705, this.hud.tournamentCounter.canvas.width / 2 * _3497705, this.hud.tournamentCounter.canvas.height / 2 * _3497705);
          } else if (this.gameMode === 'ragatourney-teams' && this.tournament.team1Tag && this.tournament.team2Tag) {
            this.canvas.drawImage(this.renderTournamentCounterTeams(2), 12 * _3497705, 12 * _3497705, this.hud.tournamentCounter.canvas.width / 2 * _3497705, this.hud.tournamentCounter.canvas.height / 2 * _3497705);
          }
        }
      }
    }
    window.raga = new _3833090();
    
    const _6611132 = await fetch(document.getElementById("agario.core.js").getAttribute("path")).then(_326296 => _326296.text()).then(_5015593 => {
      _5015593 = _5015593.replace(/("\s?registerSkin\s?"\s?:\s?function\s?\(\s?(.+?)\s?,\s?(.+?)\s?,\s?(.+?)\s?,\s?(.+?)\s?,\s?(.+?)\s?\)\s?\{\s?)/i, '$1raga.onRegisterSkin($2,$3,$4,$5,$6);');
      _5015593 = _5015593.replace(/(;..?\s?\.\s?onopen\s?=\s?function\s?\(\s?\)\s?\{\s?)/i, "$1raga.onConnect();");
      _5015593 = _5015593.replace(/(\s?if\s?\(\s?window\s?\[\s?"\s?MC\s?"\s?]\s?&&\s?window\s?\[\s?"\s?MC\s?"\s?]\s?\[\s?"\s?onMobileData\s?"\s?]\s?\)\s?window\s?\[\s?"\s?MC\s?"\s?]\s?\[\s?"\s?onMobileData\s?"\s?]\s?\(\s?(.+?)\s?\))/i, "$2=raga.onPacket($2);$1");
      _5015593 = _5015593.replace(/("\s?setTarget\s?"\s?:\s?function\s?\(\s?(.+?)\s?,\s?(.+?)\s?\)\s?\{\s?)/i, "$1$2=raga.onMouseX($2);$3=raga.onMouseY($3);");
      _5015593 = _5015593.replace(/("\s?playerZoom\s?"\s?:\s?function\s?\(\s?(.+?)\s?\)\s?\{\s?)/i, "$1$2=raga.onPlayerZoom($2);");
      _5015593 = _5015593.replace(/(;..?\s?\.\s?onclose\s?=\s?function\s?\(\s?\)\s?\{\s?)/i, '$1raga.onDisconnect(this);');
      _5015593 = _5015593.replace(/(;..?\s?\.\s?onerror\s?=\s?function\s?\(\s?\)\s?\{\s?)/i, "$1raga.onDisconnect(this);");
      _5015593 = _5015593.replace(/(,\s?requestAnimationFrame\s?:\s?function\s?\(\s?.+?\s?\)\s?\{\s?)/i, '$1raga.renderLoop();');
      _5015593 = _5015593.replace(/(\(\s?[a-z|A-Z]{10}\s?\)\s?\.\s?then\s?\(\s?[a-z]{8}\s?\(\s?([a-z]{6})\s?\)\s?\{\s?)/i, "$1const a=new Uint8Array($2,0,19860);const aa=new Uint8Array([32,0,40,2,28,69,4,64,15,11]);const aaa=new Uint8Array($2,19860);const aaaa=new Uint8Array(a.length+aa.length+aaa.length);aaaa.set(a);aaaa.set(aa,a.length);aaaa.set(aaa,a.length+aa.length);aaaa[2476]=224;aaaa[19795]=138;aaaa[221696]=0;aaaa[221697]=0;binary=aaaa.buffer;");
      return _5015593;
    });
    eval(_6611132);
  })();
  
  // core:end
  
  
