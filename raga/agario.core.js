var Module = typeof Module != "undefined" ? Module : {};
(function(window) {
    var arguments = [];
    var cp5 = {
        contexts: [],
        images: [],
        sockets: [],
        patterns: [],
        spineAnimations: []
    };
    var cp5_destroyed = false;
    function cp5_destroy() {
        cp5_destroyed = true;
        try {
            _cp5_destroy()
        } catch (e) {}
        for (var i = 0; i < cp5.sockets.length; ++i) {
            if (cp5.sockets[i])
                cp5_destroy_ws(i)
        }
    }
    function cp5_destroy_ws(ws) {
        var w = cp5.sockets[ws];
        if (w) {
            w.onopen = w.onclose = w.onmessage = w.onerror = function() {}
            ;
            for (var i = 0; i < w.events.length; ++i)
                _free(w.events[i][1]);
            w.events = null;
            try {
                w.close()
            } catch (e) {}
            cp5.sockets[ws] = null
        } else {}
    }
    var FontDetect = function() {
        function e() {
            if (!n) {
                n = !0;
                var e = document.body
                  , t = document.body.firstChild
                  , i = document.getElementById("fontdetectHelper") || document.createElement("div");
                i.id = "fontdetectHelper",
                r = document.createElement("span"),
                r.innerText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                i.appendChild(r),
                e.insertBefore(i, t),
                i.style.position = "absolute",
                i.style.visibility = "hidden",
                i.style.top = "-200px",
                i.style.left = "-100000px",
                i.style.width = "100000px",
                i.style.height = "200px",
                i.style.fontSize = "100px"
            }
        }
        function t(e, t) {
            return e instanceof Element ? window.getComputedStyle(e).getPropertyValue(t) : window.jQuery ? $(e).css(t) : ""
        }
        var n = !1
          , i = ["serif", "sans-serif", "monospace", "cursive", "fantasy"]
          , r = null;
        return {
            onFontLoaded: function(t, i, r, o) {
                if (t) {
                    var s = o && o.msInterval ? o.msInterval : 100
                      , a = o && o.msTimeout ? o.msTimeout : 2e3;
                    if (i || r) {
                        if (n || e(),
                        this.isFontLoaded(t))
                            return void (i && i(t));
                        var l = this
                          , f = (new Date).getTime()
                          , d = setInterval(function() {
                            if (l.isFontLoaded(t))
                                return clearInterval(d),
                                void i(t);
                            var e = (new Date).getTime();
                            e - f > a && (clearInterval(d),
                            r && r(t))
                        }, s)
                    }
                }
            },
            isFontLoaded: function(t) {
                var o = 0
                  , s = 0;
                n || e();
                for (var a = 0; a < i.length; ++a) {
                    if (r.style.fontFamily = '"' + t + '",' + i[a],
                    o = r.offsetWidth,
                    a > 0 && o != s)
                        return !1;
                    s = o
                }
                return !0
            },
            whichFont: function(e) {
                for (var n = t(e, "font-family"), r = n.split(","), o = r.shift(); o; ) {
                    o = o.replace(/^\s*['"]?\s*([^'"]*)\s*['"]?\s*$/, "$1");
                    for (var s = 0; s < i.length; s++)
                        if (o == i[s])
                            return o;
                    if (this.isFontLoaded(o))
                        return o;
                    o = r.shift()
                }
                return null
            }
        }
    }();
    var haveFontsLoaded = false;
    var idleDeadline = null;
    function idleCallback(deadline) {
        if (cp5_destroyed)
            return;
        if (deadline["timeRemaining"]() < 0)
            return;
        idleDeadline = deadline;
        _cp5_idle();
        window["requestIdleCallback"](idleCallback)
    }
    if (typeof Module == "undefined")
        Module = {};
    Module["postRun"] = Module["preRun"] || [];
    Module["postRun"].push(function() {
        if ("requestIdleCallback"in window) {
            window["requestIdleCallback"](idleCallback)
        }
    });
    function allocateUTF8(str) {
        var l = str.length * 4 + 1;
        var ptr = _malloc(l);
        stringToUTF8(str, ptr, l);
        return ptr
    }
    var Module = Module || {};
    Module["postRun"] = Module["postRun"] || [];
    Module["postRun"].push(function() {
        console.log("postRun");
        window["core"] = {
            "connect": function(str) {
                var ptr = allocateUTF8(str);
                _ac_connect(ptr);
                _free(ptr)
            },
            "sendNick": function(nick) {
                var nickPtr = allocateUTF8(nick);
                _ac_set_player_name(nickPtr);
                _free(nickPtr)
            },
            "loadSkin": function(str) {
                var ptr = allocateUTF8(str);
                _ac_load_skin(ptr);
                _free(ptr)
            },
            "sendSpectate": function() {
                _ac_spectate()
            },
            "setTarget": function(x, y) {
                x = raga.onMouseX(x);
                y = raga.onMouseY(y);
                _ac_set_mouse_position(x, y)
            },
            "playerZoom": function(v) {
                v = raga.onPlayerZoom(v);
                _ac_zoom(v)
            },
            "split": function() {
                _ac_split()
            },
            "eject": function() {
                _ac_eject()
            },
            "specialOn": function() {
                _ac_special_on()
            },
            "specialOff": function() {
                _ac_special_off()
            },
            "registerSkin": function(nameTrigger, skinTrigger, imageUrl, flags, customColor) {
                raga.onRegisterSkin(nameTrigger, skinTrigger, imageUrl, flags, customColor);
                var nameTriggerPtr = nameTrigger ? allocateUTF8(nameTrigger.toLowerCase()) : 0;
                var skinTriggerPtr = skinTrigger ? allocateUTF8(skinTrigger) : 0;
                var imageUrlPtr = allocateUTF8(imageUrl);
                _ac_register_skin(nameTriggerPtr, skinTriggerPtr, imageUrlPtr, flags, customColor | 0);
                _free(nameTriggerPtr);
                _free(skinTriggerPtr);
                _free(imageUrlPtr)
            },
            "registerAnimatedSkin": function(skinTrigger, spineFileName, animationName, forAction) {
                var skinTriggerPtr = allocateUTF8(skinTrigger);
                var spineFilePtr = allocateUTF8(spineFileName);
                var animNamePtr = allocateUTF8(animationName);
                var actionPtr = allocateUTF8(forAction);
                _ac_register_animated_skin(skinTriggerPtr, spineFilePtr, animNamePtr, actionPtr);
                _free(skinTriggerPtr);
                _free(spineFilePtr);
                _free(animNamePtr);
                _free(actionPtr)
            },
            "registerGamePlaySetting": function(key, free_for_all, rush_mode, party, experimental, teams) {
                var keyPtr = allocateUTF8(key);
                _ac_register_game_play_setting(keyPtr, free_for_all, rush_mode, party, experimental, teams);
                _free(keyPtr)
            },
            "proxyMobileData": function(data) {
                var ptr = _malloc(data.length);
                HEAPU8.set(data, ptr);
                _ac_proxy_mobile_data(ptr, data.length);
                _free(ptr)
            },
            "showAnimations": function(v) {
                _ac_show_animations(v)
            },
            "setFadeout": function(v) {
                _ac_set_fadeout(v)
            },
            "setShowMass": function(v) {
                _ac_set_show_mass(v)
            },
            "setShowQuest": function(v) {
                _ac_set_show_quest(v)
            },
            "setDarkTheme": function(v) {
                _ac_set_black_theme(v)
            },
            "setNames": function(v) {
                _ac_set_names_enabled(v)
            },
            "setColors": function(v) {
                _ac_set_no_colors(!v)
            },
            "setSkins": function(v) {
                _ac_set_skins_enabled(v)
            },
            "setAcid": function(v) {
                _ac_set_acid(v)
            },
            "setQuality": function(v) {
                _ac_set_quality(v)
            },
            "setMinimap": function(v) {
                _ac_set_show_minimap(v)
            },
            "minimizeMinimap": function(v) {
                _ac_set_minimize_minimap(v)
            },
            "playersMinimap": function(v) {
                _ac_set_players_minimap(v)
            },
            "disconnect": function() {
                _ac_disconnect()
            },
            "disableIntegrityChecks": function(v) {
                _ac_set_integrity_checks(!v)
            },
            "sendFacebookData": function(str) {
                var ptr = allocateUTF8(str);
                _ac_send_facebook_data(ptr);
                _free(ptr)
            },
            "setFpsCap": function(v) {
                _ac_set_fps_cap(v)
            },
            "destroy": function() {
                delete window["core"];
                cp5_destroy()
            },
            "getGameState": function() {
                return _ac_get_game_state()
            },
            "getForCrazyGames": function() {
                return _ac_get_for_crazy_games()
            },
            "cancelEnterArena": function() {
                _ac_cancel_enter_arena()
            },
            "playerHasCells": function() {
                return !!_ac_player_has_cells()
            }
        };
        setTimeout(everySecond, 1e3);
        callOnAgarioCoreLoaded()
    });
    function callOnAgarioCoreLoaded() {
        if (window["MC"] && window["MC"]["onAgarioCoreLoaded"]) {
            window["MC"]["onAgarioCoreLoaded"]()
        } else {
            console.log("MC Not ready, delaying call...");
            setTimeout(callOnAgarioCoreLoaded, 500)
        }
    }
    function everySecond() {
        if (cp5_destroyed)
            return;
        _ac_every_second();
        setTimeout(everySecond, 1e3)
    }
    Module["noExitRuntime"] = true;
    Module["print"] = function(text, color) {
        console.log(text)
    }
    ;
    Module["printErr"] = function(text) {
        console.error(text)
    }
    ;
    Module["setStatus"] = function(text) {
        console.log(text)
    }
    ;
    Module["totalDependencies"] = 0;
    Module["monitorRunDependencies"] = function(left) {
        console.log(left + " dependencies left")
    }
    ;
    Module["setStatus"]("Downloading agario.core.js...");
    var moduleOverrides = Object.assign({}, Module);
    var arguments_ = [];
    var thisProgram = "./this.program";
    var quit_ = (status,toThrow)=>{
        throw toThrow
    }
    ;
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
    var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
    var scriptDirectory = "";
    function locateFile(path) {
        if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory)
        }
        return scriptDirectory + path
    }
    var read_, readAsync, readBinary, setWindowTitle;
    if (ENVIRONMENT_IS_NODE) {
        var fs = require("fs");
        var nodePath = require("path");
        if (ENVIRONMENT_IS_WORKER) {
            scriptDirectory = nodePath.dirname(scriptDirectory) + "/"
        } else {
            scriptDirectory = __dirname + "/"
        }
        read_ = (filename,binary)=>{
            filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
            return fs.readFileSync(filename, binary ? undefined : "utf8")
        }
        ;
        readBinary = filename=>{
            var ret = read_(filename, true);
            if (!ret.buffer) {
                ret = new Uint8Array(ret)
            }
            return ret
        }
        ;
        readAsync = (filename,onload,onerror)=>{
            filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
            fs.readFile(filename, function(err, data) {
                if (err)
                    onerror(err);
                else
                    onload(data.buffer)
            })
        }
        ;
        if (!Module["thisProgram"] && process.argv.length > 1) {
            thisProgram = process.argv[1].replace(/\\/g, "/")
        }
        arguments_ = process.argv.slice(2);
        if (typeof module != "undefined") {
            module["exports"] = Module
        }
        process.on("uncaughtException", function(ex) {
            if (ex !== "unwind" && !(ex instanceof ExitStatus) && !(ex.context instanceof ExitStatus)) {
                throw ex
            }
        });
        var nodeMajor = process.versions.node.split(".")[0];
        if (nodeMajor < 15) {
            process.on("unhandledRejection", function(reason) {
                throw reason
            })
        }
        quit_ = (status,toThrow)=>{
            process.exitCode = status;
            throw toThrow
        }
        ;
        Module["inspect"] = function() {
            return "[Emscripten Module object]"
        }
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
            scriptDirectory = self.location.href
        } else if (typeof document != "undefined" && document.currentScript) {
            scriptDirectory = document.currentScript.src
        }
        if (scriptDirectory.indexOf("blob:") !== 0) {
            scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1)
        } else {
            scriptDirectory = ""
        }
        {
            read_ = url=>{
                var xhr = new XMLHttpRequest;
                xhr.open("GET", url, false);
                xhr.send(null);
                return xhr.responseText
            }
            ;
            if (ENVIRONMENT_IS_WORKER) {
                readBinary = url=>{
                    var xhr = new XMLHttpRequest;
                    xhr.open("GET", url, false);
                    xhr.responseType = "arraybuffer";
                    xhr.send(null);
                    return new Uint8Array(xhr.response)
                }
            }
            readAsync = (url,onload,onerror)=>{
                var xhr = new XMLHttpRequest;
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = ()=>{
                    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                        onload(xhr.response);
                        return
                    }
                    onerror()
                }
                ;
                xhr.onerror = onerror;
                xhr.send(null)
            }
        }
        setWindowTitle = title=>document.title = title
    } else {}
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.warn.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    if (Module["arguments"])
        arguments_ = Module["arguments"];
    if (Module["thisProgram"])
        thisProgram = Module["thisProgram"];
    if (Module["quit"])
        quit_ = Module["quit"];
    var wasmBinary;
    if (Module["wasmBinary"])
        wasmBinary = Module["wasmBinary"];
    var noExitRuntime = Module["noExitRuntime"] || true;
    if (typeof WebAssembly != "object") {
        abort("no native wasm support detected")
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition, text) {
        if (!condition) {
            abort(text)
        }
    }
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
    function updateMemoryViews() {
        var b = wasmMemory.buffer;
        Module["HEAP8"] = HEAP8 = new Int8Array(b);
        Module["HEAP16"] = HEAP16 = new Int16Array(b);
        Module["HEAP32"] = HEAP32 = new Int32Array(b);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(b)
    }
    var wasmTable;
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATMAIN__ = [];
    var __ATEXIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    var runtimeKeepaliveCounter = 0;
    function keepRuntimeAlive() {
        return noExitRuntime || runtimeKeepaliveCounter > 0
    }
    function preRun() {
        if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
                Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift())
            }
        }
        callRuntimeCallbacks(__ATPRERUN__)
    }
    function initRuntime() {
        runtimeInitialized = true;
        callRuntimeCallbacks(__ATINIT__)
    }
    function preMain() {
        callRuntimeCallbacks(__ATMAIN__)
    }
    function postRun() {
        if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
                Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift())
            }
        }
        callRuntimeCallbacks(__ATPOSTRUN__)
    }
    function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb)
    }
    function addOnInit(cb) {
        __ATINIT__.unshift(cb)
    }
    function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb)
    }
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    function addRunDependency(id) {
        runDependencies++;
        if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies)
        }
    }
    function removeRunDependency(id) {
        runDependencies--;
        if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies)
        }
        if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null
            }
            if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled;
                dependenciesFulfilled = null;
                callback()
            }
        }
    }
    function abort(what) {
        if (Module["onAbort"]) {
            Module["onAbort"](what)
        }
        what = "Aborted(" + what + ")";
        err(what);
        ABORT = true;
        EXITSTATUS = 1;
        what += ". Build with -sASSERTIONS for more info.";
        var e = new WebAssembly.RuntimeError(what);
        throw e
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
        return filename.startsWith(dataURIPrefix)
    }
    function isFileURI(filename) {
        return filename.startsWith("file://")
    }
    var wasmBinaryFile;
    wasmBinaryFile = "agario.core.wasm";
    if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = locateFile(wasmBinaryFile)
    }
    function getBinary(file) {
        try {
            if (file == wasmBinaryFile && wasmBinary) {
                return new Uint8Array(wasmBinary)
            }
            if (readBinary) {
                return readBinary(file)
            }
            throw "both async and sync fetching of the wasm failed"
        } catch (err) {
            abort(err)
        }
    }
    function getBinaryPromise(binaryFile) {
        if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
            if (typeof fetch == "function" && !isFileURI(binaryFile)) {
                return fetch(binaryFile, {
                    credentials: "same-origin"
                }).then(function(response) {
                    if (!response["ok"]) {
                        throw "failed to load wasm binary file at '" + binaryFile + "'"
                    }
                    return response["arrayBuffer"]()
                }).catch(function() {
                    return getBinary(binaryFile)
                })
            } else {
                if (readAsync) {
                    return new Promise(function(resolve, reject) {
                        readAsync(binaryFile, function(response) {
                            resolve(new Uint8Array(response))
                        }, reject)
                    }
                    )
                }
            }
        }
        return Promise.resolve().then(function() {
            return getBinary(binaryFile)
        })
    }
    function instantiateArrayBuffer(binaryFile, imports, receiver) {
        return getBinaryPromise(binaryFile).then(function(binary) {
            const a = new Uint8Array(binary,0,19860);
            const aa = new Uint8Array([0x20, 0x00, 0x28, 0x02, 0x1c, 0x45, 0x04, 0x40, 0x0f, 0x0b]);
            const aaa = new Uint8Array(binary,19860);
            const aaaa = new Uint8Array(a.length + aa.length + aaa.length);
            aaaa.set(a);
            aaaa.set(aa, a.length);
            aaaa.set(aaa, a.length + aa.length);
            aaaa[2476] = 224;
            aaaa[19795] = 138;
            aaaa[221696] = 0;
            aaaa[221697] = 0;
            binary = aaaa.buffer;
            return WebAssembly.instantiate(binary, imports)
        }).then(function(instance) {
            return instance
        }).then(receiver, function(reason) {
            err("failed to asynchronously prepare wasm: " + reason);
            abort(reason)
        })
    }
    function instantiateAsync(binary, binaryFile, imports, callback) {
        if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && !isFileURI(binaryFile) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
            return fetch(binaryFile, {
                credentials: "same-origin"
            }).then(function(response) {
                var result = WebAssembly.instantiateStreaming(response, imports);
                return result.then(callback, function(reason) {
                    err("wasm streaming compile failed: " + reason);
                    err("falling back to ArrayBuffer instantiation");
                    return instantiateArrayBuffer(binaryFile, imports, callback)
                })
            })
        } else {
            return instantiateArrayBuffer(binaryFile, imports, callback)
        }
    }
    function createWasm() {
        var info = {
            "a": wasmImports
        };
        function receiveInstance(instance, module) {
            var exports = instance.exports;
            Module["asm"] = exports;
            wasmMemory = Module["asm"]["o"];
            updateMemoryViews();
            wasmTable = Module["asm"]["da"];
            addOnInit(Module["asm"]["p"]);
            removeRunDependency("wasm-instantiate");
            return exports
        }
        addRunDependency("wasm-instantiate");
        function receiveInstantiationResult(result) {
            receiveInstance(result["instance"])
        }
        if (Module["instantiateWasm"]) {
            try {
                return Module["instantiateWasm"](info, receiveInstance)
            } catch (e) {
                err("Module.instantiateWasm callback failed with error: " + e);
                return false
            }
        }
        instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
        return {}
    }
    var ASM_CONSTS = {
        27184: ()=>{
            return idleDeadline["timeRemaining"]() >= 2
        }
        ,
        27233: ()=>{
            return Math.random()
        }
        ,
        27259: $0=>{
            var img = new Image;
            img.src = UTF8ToString($0);
            for (var i = 0; i < cp5.images.length; ++i) {
                if (cp5.images[i] != null)
                    continue;
                cp5.images[i] = img;
                return i
            }
            cp5.images.push(img);
            return cp5.images.length - 1
        }
        ,
        27479: $0=>{
            cp5.images[$0] = null
        }
        ,
        27506: ($0,$1,$2,$3)=>{
            var i = cp5.images[$0];
            HEAPU8[$1 >> 0] = (i.complete && i.width > 0) | 0;
            HEAP32[$2 >> 2] = i.width;
            HEAP32[$3 >> 2] = i.height
        }
        ,
        27638: $0=>{
            var ws = new WebSocket(UTF8ToString($0));
            ws.binaryType = "arraybuffer";
            ws.events = [];
            ws.onopen = function() {
                raga.onConnect();
                ws.events.push([2, 0, 0]);
                _cp5_check_ws()
            }
            ;
            ws.onerror = function() {
                raga.onDisconnect(this);
                ws.events.push([3, 0, 0]);
                _cp5_check_ws()
            }
            ;
            ws.onclose = function() {
                raga.onDisconnect(this);
                ws.events.push([4, 0, 0]);
                _cp5_check_ws()
            }
            ;
            ws.onmessage = function(e) {
                var view = new Uint8Array(e.data);
                var ptr = _malloc(view.length);
                writeArrayToMemory(view, ptr);
                ws.events.push([1, ptr, view.length]);
                _cp5_check_ws()
            }
            ;
            for (var i = 0; i < cp5.sockets.length; ++i) {
                if (cp5.sockets[i] != null)
                    continue;
                cp5.sockets[i] = ws;
                return i
            }
            cp5.sockets.push(ws);
            return cp5.sockets.length - 1
        }
        ,
        28299: $0=>{
            cp5_destroy_ws($0)
        }
        ,
        28323: ($0,$1,$2)=>{
            var w = cp5.sockets[$0];
            if (w.readyState != 1)
                return 0;
            w.send(HEAP8.subarray($1, $1 + $2));
            return 1
        }
        ,
        28431: ($0,$1,$2)=>{
            var w = cp5.sockets[$0];
            console.assert(w != null, "The socket can't be null");
            if (w == null)
                return 3;
            if (w.events.length == 0)
                return 0;
            var e = w.events.shift();
            HEAPU32[$1 >> 2] = e[1];
            HEAP32[$2 >> 2] = e[2];
            return e[0]
        }
        ,
        28663: ($0,$1,$2,$3,$4)=>{
            var sp = new SpineAnimation(UTF8ToString($0),$1,$2,1,1,$3,$4);
            for (var i = 0; i < cp5.spineAnimations.length; ++i) {
                if (cp5.spineAnimations[i] != null)
                    continue;
                cp5.spineAnimations[i] = sp;
                return i
            }
            cp5.spineAnimations.push(sp);
            return cp5.spineAnimations.length - 1
        }
        ,
        28944: $0=>{
            var sp = cp5.spineAnimations[$0];
            sp.dispose()
        }
        ,
        28996: ($0,$1,$2,$3)=>{
            var sp = cp5.spineAnimations[$0];
            sp.play(UTF8ToString($1), $2 == 1, $3 == 1)
        }
        ,
        29079: $0=>{
            cp5.patterns[$0] = null
        }
        ,
        29108: ($0,$1)=>{
            var pattern = cp5.contexts[$0].createPattern(cp5.contexts[$1].canvas, null);
            for (var i = 0; i < cp5.patterns.length; ++i) {
                if (cp5.patterns[i] == null) {
                    cp5.patterns[i] = pattern;
                    return i
                }
            }
            cp5.patterns.push(pattern);
            return cp5.patterns.length - 1
        }
        ,
        29365: ($0,$1,$2,$3)=>{
            cp5.contexts[$0].fillStyle = cp5.patterns[$1];
            cp5.contexts[$0].fillRect(0, 0, $2, $3)
        }
        ,
        29457: ()=>{
            var ctx = document.createElement("canvas").getContext("2d");
            for (var i = 0; i < cp5.contexts.length; ++i) {
                if (cp5.contexts[i] != null)
                    continue;
                cp5.contexts[i] = ctx;
                return i
            }
            cp5.contexts.push(ctx);
            return cp5.contexts.length - 1
        }
        ,
        29697: $0=>{
            cp5.contexts[$0] = null
        }
        ,
        29726: ($0,$1,$2)=>{
            var canvas = cp5.contexts[$0].canvas;
            canvas.width = $1;
            canvas.height = $2
        }
        ,
        29807: ($0,$1,$2)=>{
            var canvas = cp5.contexts[$0].canvas;
            HEAP32[$1 >> 2] = canvas.width;
            HEAP32[$2 >> 2] = canvas.height
        }
        ,
        29914: $0=>{
            cp5.contexts[$0].save()
        }
        ,
        29943: $0=>{
            cp5.contexts[$0].restore()
        }
        ,
        29975: $0=>{
            cp5.contexts[$0].fill()
        }
        ,
        30004: $0=>{
            cp5.contexts[$0].stroke()
        }
        ,
        30035: $0=>{
            cp5.contexts[$0].clip()
        }
        ,
        30064: $0=>{
            cp5.contexts[$0].beginPath()
        }
        ,
        30098: $0=>{
            cp5.contexts[$0].closePath()
        }
        ,
        30132: ($0,$1,$2,$3,$4)=>{
            cp5.contexts[$0].clearRect($1, $2, $3, $4)
        }
        ,
        30180: ($0,$1,$2,$3,$4)=>{
            cp5.contexts[$0].fillRect($1, $2, $3, $4)
        }
        ,
        30227: ($0,$1,$2,$3,$4,$5)=>{
            var r = $5;
            if ($3 < 2 * r)
                r = $3 / 2;
            if ($4 < 2 * r)
                r = $4 / 2;
            cp5.contexts[$0].moveTo($1 + r, $2);
            cp5.contexts[$0].arcTo($1 + $3, $2, $1 + $3, $2 + $4, r);
            cp5.contexts[$0].arcTo($1 + $3, $2 + $4, $1, $2 + $4, r);
            cp5.contexts[$0].arcTo($1, $2 + $4, $1, $2, r);
            cp5.contexts[$0].arcTo($1, $2, $1 + $3, $2, r)
        }
        ,
        30548: ($0,$1,$2,$3)=>{
            cp5.contexts[$0].fillStyle = "rgb(" + $1 + "," + $2 + "," + $3 + ")"
        }
        ,
        30622: ($0,$1,$2,$3,$4)=>{
            cp5.contexts[$0].fillStyle = "rgba(" + $1 + "," + $2 + "," + $3 + "," + $4 + ")"
        }
        ,
        30708: ($0,$1,$2,$3)=>{
            cp5.contexts[$0].strokeStyle = "rgb(" + $1 + "," + $2 + "," + $3 + ")"
        }
        ,
        30784: ($0,$1,$2,$3,$4)=>{
            cp5.contexts[$0].strokeStyle = "rgba(" + $1 + "," + $2 + "," + $3 + "," + $4 + ")"
        }
        ,
        30872: ($0,$1)=>{
            cp5.contexts[$0].globalAlpha = $1
        }
        ,
        30911: ($0,$1,$2)=>{
            cp5.contexts[$0].moveTo($1, $2)
        }
        ,
        30948: ($0,$1,$2)=>{
            cp5.contexts[$0].lineTo($1, $2)
        }
        ,
        30985: ($0,$1,$2,$3,$4,$5,$6)=>{
            cp5.contexts[$0].arc($1, $2, $3, $4, $5, $6)
        }
        ,
        31035: ($0,$1,$2)=>{
            cp5.contexts[$0].scale($1, $2)
        }
        ,
        31071: ($0,$1)=>{
            cp5.contexts[$0].rotate($1)
        }
        ,
        31104: ($0,$1,$2)=>{
            cp5.contexts[$0].translate($1, $2)
        }
        ,
        31144: ($0,$1)=>{
            cp5.contexts[$0].lineWidth = $1
        }
        ,
        31181: ($0,$1,$2,$3)=>{
            var canvas = cp5.contexts[$1].canvas;
            try {
                cp5.contexts[$0].drawImage(canvas, $2, $3)
            } catch (err) {}
        }
        ,
        31291: ($0,$1,$2,$3,$4,$5)=>{
            try {
                var canvas = cp5.contexts[$1].canvas;
                cp5.contexts[$0].drawImage(canvas, 0, 0, canvas.width, canvas.height, $2, $3, $4, $5)
            } catch (err) {}
        }
        ,
        31444: ($0,$1,$2,$3,$4,$5)=>{
            var img = cp5.images[$1];
            if (!img.complete)
                return;
            cp5.contexts[$0].drawImage(img, 0, 0, img.width, img.height, $2, $3, $4, $5)
        }
        ,
        31578: ($0,$1,$2,$3)=>{
            cp5.contexts[$0].fillText(UTF8ToString($1), $2, $3)
        }
        ,
        31635: ($0,$1,$2,$3)=>{
            cp5.contexts[$0].strokeText(UTF8ToString($1), $2, $3)
        }
        ,
        31694: ($0,$1)=>{
            return cp5.contexts[$0].measureText(UTF8ToString($1)).width
        }
        ,
        31759: ($0,$1)=>{
            cp5.contexts[$0].font = ~~$1 + "px Ubuntu"
        }
        ,
        31809: $0=>{
            cp5.contexts[$0].lineCap = "round"
        }
        ,
        31849: $0=>{
            cp5.contexts[$0].lineJoin = "round"
        }
        ,
        31890: $0=>{
            cp5.contexts[$0].lineJoin = "miter"
        }
        ,
        31931: $0=>{
            cp5.contexts[$0].textBaseline = "middle"
        }
        ,
        31977: ($0,$1,$2)=>{
            cp5.contexts[$0].setLineDash([$1, $2])
        }
        ,
        32021: $0=>{
            cp5.contexts[$0].setLineDash([])
        }
        ,
        32059: $0=>{
            cp5.contexts[$0].globalCompositeOperation = "lighter"
        }
        ,
        32118: $0=>{
            var elem = document.getElementById(UTF8ToString($0));
            if (elem == null)
                return -1;
            var ctx = elem.getContext("2d");
            for (var i = 0; i < cp5.contexts.length; ++i) {
                if (cp5.contexts[i] != null)
                    continue;
                cp5.contexts[i] = ctx;
                return i
            }
            cp5.contexts.push(ctx);
            return cp5.contexts.length - 1
        }
        ,
        32412: ()=>{
            if (!haveFontsLoaded)
                haveFontsLoaded = FontDetect.isFontLoaded("Ubuntu");
            return haveFontsLoaded
        }
        ,
        32514: ()=>{
            return !window.location || !window.location.hostname
        }
        ,
        32572: ()=>{
            return allocateUTF8(window.location.hostname)
        }
        ,
        32623: ($0,$1)=>{
            return $0 % $1
        }
        ,
        32643: $0=>{
            if (window["MC"] && window["MC"]["getProfilePicture"]) {
                var string = window["MC"]["getProfilePicture"](UTF8ToString($0));
                return allocateUTF8(string)
            }
        }
        ,
        32800: ()=>{
            if (window["MC"] && window["MC"]["getQuestProgressLabel"]) {
                var string = window["MC"]["getQuestProgressLabel"]();
                return allocateUTF8(string)
            }
        }
        ,
        32949: ()=>{
            if (window["MC"] && window["MC"]["checkQuestComplete"]) {
                return window["MC"]["checkQuestComplete"]()
            }
            return 0
        }
        ,
        33067: $0=>{
            if (window["MC"] && window["MC"]["playSound"])
                window["MC"]["playSound"](UTF8ToString($0))
        }
        ,
        33162: ()=>{
            return window["devicePixelRatio"]
        }
        ,
        33201: $0=>{
            if (window["agarApp"] && window["agarApp"]["i18n"]) {
                var string = window["agarApp"]["i18n"]["get"](UTF8ToString($0));
                return allocateUTF8(string)
            }
        }
        ,
        33353: $0=>{
            var customEvent = document.createEvent("CustomEvent");
            customEvent.initCustomEvent("minimize_map_update", true, true, $0 === 1);
            document.dispatchEvent(customEvent)
        }
        ,
        33521: ($0,$1,$2,$3,$4,$5)=>{
            if (!window["MC"] || !window["MC"]["onPlayerStatsUpdate"])
                return;
            window["MC"]["onPlayerStatsUpdate"]($0, $1, $2, $3, $4, $5)
        }
        ,
        33652: $0=>{
            var ctx = cp5.spineAnimations[$0].getContext();
            for (var i = 0; i < cp5.contexts.length; ++i) {
                if (cp5.contexts[i] != null)
                    continue;
                cp5.contexts[i] = ctx;
                return i
            }
            cp5.contexts.push(ctx);
            return cp5.contexts.length - 1
        }
        ,
        33879: ()=>{
            if (window["MC"] && window["MC"]["onDisconnect"])
                window["MC"]["onDisconnect"]()
        }
        ,
        33964: ()=>{
            if (window["MC"] && window["MC"]["getHost"]) {
                var string = window["MC"]["getHost"]();
                return allocateUTF8(string)
            }
        }
        ,
        34085: $0=>{
            if (window["MC"] && window["MC"]["loadCustomSkin"])
                window["MC"]["loadCustomSkin"](UTF8ToString($0))
        }
        ,
        34191: ()=>{
            if (window["MC"] && window["MC"]["onPlayerSpawn"])
                window["MC"]["onPlayerSpawn"]()
        }
        ,
        34278: ($0,$1,$2,$3,$4,$5,$6,$7,$8)=>{
            if (!window["MC"] || !window["MC"]["onPlayerDeath"])
                return;
            window["MC"]["onPlayerDeath"]($0, $1, $2, $3, $4, $5, $6, $7, $8)
        }
        ,
        34409: ()=>{
            if (window["MC"] && window["MC"]["arenaInvalidState"])
                window["MC"]["arenaInvalidState"]()
        }
        ,
        34505: ($0,$1,$2,$3,$4)=>{
            if (window["MC"] && window["MC"]["onPlayerDeathBattle"])
                window["MC"]["onPlayerDeathBattle"]($0, $1, $2, UTF8ToString($3), $4)
        }
        ,
        34637: ($0,$1,$2,$3)=>{
            if (window["MC"] && window["MC"]["onTeamRushMatchEnd"])
                window["MC"]["onTeamRushMatchEnd"](getValue($2, "double"), getValue($2 + 8, "double"), $0, $1, $3)
        }
        ,
        34797: ($0,$1)=>{
            var buffer = HEAPU8.subarray($0, $0 + $1);
            buffer = raga.onPacket(buffer);
            if (window["MC"] && window["MC"]["onMobileData"])
                window["MC"]["onMobileData"](buffer)
        }
        ,
        34931: ()=>{}
        ,
        34935: $0=>{
            if (window["MC"] && window["MC"]["updateServerVersion"])
                window["MC"]["updateServerVersion"](UTF8ToString($0))
        }
        ,
        35050: ()=>{
            if (window["MC"] && window["MC"]["onConnect"])
                window["MC"]["onConnect"]()
        }
        ,
        35129: ()=>{
            if (window["MC"] && window["MC"]["showOutdatedClientDialog"])
                window["MC"]["showOutdatedClientDialog"]()
        }
        ,
        35238: $0=>{
            if (window["MC"] && window["MC"]["onVersionDeprecated"])
                window["MC"]["onVersionDeprecated"]($0)
        }
        ,
        35340: ()=>{
            if (window["MC"] && window["MC"]["fullSpectate"])
                window["MC"]["fullSpectate"]()
        }
        ,
        35425: ($0,$1)=>{
            var customEvent = document.createEvent("CustomEvent");
            var data = {};
            data["state"] = $0;
            data["players"] = $1;
            customEvent.initCustomEvent("match_state_update", true, true, data);
            document.dispatchEvent(customEvent)
        }
    };
    function ExitStatus(status) {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + status + ")";
        this.status = status
    }
    function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
            callbacks.shift()(Module)
        }
    }
    function getValue(ptr, type="i8") {
        if (type.endsWith("*"))
            type = "*";
        switch (type) {
        case "i1":
            return HEAP8[ptr >> 0];
        case "i8":
            return HEAP8[ptr >> 0];
        case "i16":
            return HEAP16[ptr >> 1];
        case "i32":
            return HEAP32[ptr >> 2];
        case "i64":
            return HEAP32[ptr >> 2];
        case "float":
            return HEAPF32[ptr >> 2];
        case "double":
            return HEAPF64[ptr >> 3];
        case "*":
            return HEAPU32[ptr >> 2];
        default:
            abort("invalid type for getValue: " + type)
        }
    }
    var nowIsMonotonic = true;
    function __emscripten_get_now_is_monotonic() {
        return nowIsMonotonic
    }
    function _abort() {
        abort("")
    }
    var readEmAsmArgsArray = [];
    function readEmAsmArgs(sigPtr, buf) {
        readEmAsmArgsArray.length = 0;
        var ch;
        buf >>= 2;
        while (ch = HEAPU8[sigPtr++]) {
            buf += ch != 105 & buf;
            readEmAsmArgsArray.push(ch == 105 ? HEAP32[buf] : HEAPF64[buf++ >> 1]);
            ++buf
        }
        return readEmAsmArgsArray
    }
    function runEmAsmFunction(code, sigPtr, argbuf) {
        var args = readEmAsmArgs(sigPtr, argbuf);
        return ASM_CONSTS[code].apply(null, args)
    }
    function _emscripten_asm_const_double(code, sigPtr, argbuf) {
        return runEmAsmFunction(code, sigPtr, argbuf)
    }
    function _emscripten_asm_const_int(code, sigPtr, argbuf) {
        return runEmAsmFunction(code, sigPtr, argbuf)
    }
    function _emscripten_exit_with_live_runtime() {
        throw "unwind"
    }
    var _emscripten_get_now;
    if (ENVIRONMENT_IS_NODE) {
        _emscripten_get_now = ()=>{
            var t = process.hrtime();
            return t[0] * 1e3 + t[1] / 1e6
        }
    } else
        _emscripten_get_now = ()=>performance.now();
    function _emscripten_memcpy_big(dest, src, num) {
        HEAPU8.copyWithin(dest, src, src + num)
    }
    function abortOnCannotGrowMemory(requestedSize) {
        abort("OOM")
    }
    function _emscripten_resize_heap(requestedSize) {
        var oldSize = HEAPU8.length;
        requestedSize = requestedSize >>> 0;
        abortOnCannotGrowMemory(requestedSize)
    }
    function handleException(e) {
        if (e instanceof ExitStatus || e == "unwind") {
            return EXITSTATUS
        }
        quit_(1, e)
    }
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
    function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (heapOrArray[endPtr] && !(endPtr >= endIdx))
            ++endPtr;
        if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
            return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr))
        }
        var str = "";
        while (idx < endPtr) {
            var u0 = heapOrArray[idx++];
            if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue
            }
            var u1 = heapOrArray[idx++] & 63;
            if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue
            }
            var u2 = heapOrArray[idx++] & 63;
            if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2
            } else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63
            }
            if (u0 < 65536) {
                str += String.fromCharCode(u0)
            } else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
            }
        }
        return str
    }
    function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
    }
    var SYSCALLS = {
        varargs: undefined,
        get: function() {
            SYSCALLS.varargs += 4;
            var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
            return ret
        },
        getStr: function(ptr) {
            var ret = UTF8ToString(ptr);
            return ret
        }
    };
    function _proc_exit(code) {
        EXITSTATUS = code;
        if (!keepRuntimeAlive()) {
            if (Module["onExit"])
                Module["onExit"](code);
            ABORT = true
        }
        quit_(code, new ExitStatus(code))
    }
    function exitJS(status, implicit) {
        EXITSTATUS = status;
        _proc_exit(status)
    }
    var _exit = exitJS;
    function maybeExit() {
        if (!keepRuntimeAlive()) {
            try {
                _exit(EXITSTATUS)
            } catch (e) {
                handleException(e)
            }
        }
    }
    function callUserCallback(func) {
        if (ABORT) {
            return
        }
        try {
            func();
            maybeExit()
        } catch (e) {
            handleException(e)
        }
    }
    function safeSetTimeout(func, timeout) {
        return setTimeout(function() {
            callUserCallback(func)
        }, timeout)
    }
    function warnOnce(text) {
        if (!warnOnce.shown)
            warnOnce.shown = {};
        if (!warnOnce.shown[text]) {
            warnOnce.shown[text] = 1;
            if (ENVIRONMENT_IS_NODE)
                text = "warning: " + text;
            err(text)
        }
    }
    var Browser = {
        mainLoop: {
            running: false,
            scheduler: null,
            method: "",
            currentlyRunningMainloop: 0,
            func: null,
            arg: 0,
            timingMode: 0,
            timingValue: 0,
            currentFrameNumber: 0,
            queue: [],
            pause: function() {
                Browser.mainLoop.scheduler = null;
                Browser.mainLoop.currentlyRunningMainloop++
            },
            resume: function() {
                Browser.mainLoop.currentlyRunningMainloop++;
                var timingMode = Browser.mainLoop.timingMode;
                var timingValue = Browser.mainLoop.timingValue;
                var func = Browser.mainLoop.func;
                Browser.mainLoop.func = null;
                setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
                _emscripten_set_main_loop_timing(timingMode, timingValue);
                Browser.mainLoop.scheduler()
            },
            updateStatus: function() {
                if (Module["setStatus"]) {
                    var message = Module["statusMessage"] || "Please wait...";
                    var remaining = Browser.mainLoop.remainingBlockers;
                    var expected = Browser.mainLoop.expectedBlockers;
                    if (remaining) {
                        if (remaining < expected) {
                            Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")")
                        } else {
                            Module["setStatus"](message)
                        }
                    } else {
                        Module["setStatus"]("")
                    }
                }
            },
            runIter: function(func) {
                if (ABORT)
                    return;
                if (Module["preMainLoop"]) {
                    var preRet = Module["preMainLoop"]();
                    if (preRet === false) {
                        return
                    }
                }
                callUserCallback(func);
                if (Module["postMainLoop"])
                    Module["postMainLoop"]()
            }
        },
        isFullscreen: false,
        pointerLock: false,
        moduleContextCreatedCallbacks: [],
        workers: [],
        init: function() {
            if (!Module["preloadPlugins"])
                Module["preloadPlugins"] = [];
            if (Browser.initted)
                return;
            Browser.initted = true;
            try {
                new Blob;
                Browser.hasBlobConstructor = true
            } catch (e) {
                Browser.hasBlobConstructor = false;
                err("warning: no blob constructor, cannot create blobs with mimetypes")
            }
            Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? err("warning: no BlobBuilder") : null;
            Browser.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;
            if (!Module.noImageDecoding && typeof Browser.URLObject == "undefined") {
                err("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
                Module.noImageDecoding = true
            }
            var imagePlugin = {};
            imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
                return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name)
            }
            ;
            imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
                var b = null;
                if (Browser.hasBlobConstructor) {
                    try {
                        b = new Blob([byteArray],{
                            type: Browser.getMimetype(name)
                        });
                        if (b.size !== byteArray.length) {
                            b = new Blob([new Uint8Array(byteArray).buffer],{
                                type: Browser.getMimetype(name)
                            })
                        }
                    } catch (e) {
                        warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder")
                    }
                }
                if (!b) {
                    var bb = new Browser.BlobBuilder;
                    bb.append(new Uint8Array(byteArray).buffer);
                    b = bb.getBlob()
                }
                var url = Browser.URLObject.createObjectURL(b);
                var img = new Image;
                img.onload = ()=>{
                    assert(img.complete, "Image " + name + " could not be decoded");
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    preloadedImages[name] = canvas;
                    Browser.URLObject.revokeObjectURL(url);
                    if (onload)
                        onload(byteArray)
                }
                ;
                img.onerror = event=>{
                    out("Image " + url + " could not be decoded");
                    if (onerror)
                        onerror()
                }
                ;
                img.src = url
            }
            ;
            Module["preloadPlugins"].push(imagePlugin);
            var audioPlugin = {};
            audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
                return !Module.noAudioDecoding && name.substr(-4)in {
                    ".ogg": 1,
                    ".wav": 1,
                    ".mp3": 1
                }
            }
            ;
            audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
                var done = false;
                function finish(audio) {
                    if (done)
                        return;
                    done = true;
                    preloadedAudios[name] = audio;
                    if (onload)
                        onload(byteArray)
                }
                function fail() {
                    if (done)
                        return;
                    done = true;
                    preloadedAudios[name] = new Audio;
                    if (onerror)
                        onerror()
                }
                if (Browser.hasBlobConstructor) {
                    try {
                        var b = new Blob([byteArray],{
                            type: Browser.getMimetype(name)
                        })
                    } catch (e) {
                        return fail()
                    }
                    var url = Browser.URLObject.createObjectURL(b);
                    var audio = new Audio;
                    audio.addEventListener("canplaythrough", ()=>finish(audio), false);
                    audio.onerror = function audio_onerror(event) {
                        if (done)
                            return;
                        err("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");
                        function encode64(data) {
                            var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                            var PAD = "=";
                            var ret = "";
                            var leftchar = 0;
                            var leftbits = 0;
                            for (var i = 0; i < data.length; i++) {
                                leftchar = leftchar << 8 | data[i];
                                leftbits += 8;
                                while (leftbits >= 6) {
                                    var curr = leftchar >> leftbits - 6 & 63;
                                    leftbits -= 6;
                                    ret += BASE[curr]
                                }
                            }
                            if (leftbits == 2) {
                                ret += BASE[(leftchar & 3) << 4];
                                ret += PAD + PAD
                            } else if (leftbits == 4) {
                                ret += BASE[(leftchar & 15) << 2];
                                ret += PAD
                            }
                            return ret
                        }
                        audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
                        finish(audio)
                    }
                    ;
                    audio.src = url;
                    safeSetTimeout(function() {
                        finish(audio)
                    }, 1e4)
                } else {
                    return fail()
                }
            }
            ;
            Module["preloadPlugins"].push(audioPlugin);
            function pointerLockChange() {
                Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"]
            }
            var canvas = Module["canvas"];
            if (canvas) {
                canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (()=>{}
                );
                canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (()=>{}
                );
                canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
                document.addEventListener("pointerlockchange", pointerLockChange, false);
                document.addEventListener("mozpointerlockchange", pointerLockChange, false);
                document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
                document.addEventListener("mspointerlockchange", pointerLockChange, false);
                if (Module["elementPointerLock"]) {
                    canvas.addEventListener("click", ev=>{
                        if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
                            Module["canvas"].requestPointerLock();
                            ev.preventDefault()
                        }
                    }
                    , false)
                }
            }
        },
        handledByPreloadPlugin: function(byteArray, fullname, finish, onerror) {
            Browser.init();
            var handled = false;
            Module["preloadPlugins"].forEach(function(plugin) {
                if (handled)
                    return;
                if (plugin["canHandle"](fullname)) {
                    plugin["handle"](byteArray, fullname, finish, onerror);
                    handled = true
                }
            });
            return handled
        },
        createContext: function(canvas, useWebGL, setInModule, webGLContextAttributes) {
            if (useWebGL && Module.ctx && canvas == Module.canvas)
                return Module.ctx;
            var ctx;
            var contextHandle;
            if (useWebGL) {
                var contextAttributes = {
                    antialias: false,
                    alpha: false,
                    majorVersion: 1
                };
                if (webGLContextAttributes) {
                    for (var attribute in webGLContextAttributes) {
                        contextAttributes[attribute] = webGLContextAttributes[attribute]
                    }
                }
                if (typeof GL != "undefined") {
                    contextHandle = GL.createContext(canvas, contextAttributes);
                    if (contextHandle) {
                        ctx = GL.getContext(contextHandle).GLctx
                    }
                }
            } else {
                ctx = canvas.getContext("2d")
            }
            if (!ctx)
                return null;
            if (setInModule) {
                if (!useWebGL)
                    assert(typeof GLctx == "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
                Module.ctx = ctx;
                if (useWebGL)
                    GL.makeContextCurrent(contextHandle);
                Module.useWebGL = useWebGL;
                Browser.moduleContextCreatedCallbacks.forEach(function(callback) {
                    callback()
                });
                Browser.init()
            }
            return ctx
        },
        destroyContext: function(canvas, useWebGL, setInModule) {},
        fullscreenHandlersInstalled: false,
        lockPointer: undefined,
        resizeCanvas: undefined,
        requestFullscreen: function(lockPointer, resizeCanvas) {
            Browser.lockPointer = lockPointer;
            Browser.resizeCanvas = resizeCanvas;
            if (typeof Browser.lockPointer == "undefined")
                Browser.lockPointer = true;
            if (typeof Browser.resizeCanvas == "undefined")
                Browser.resizeCanvas = false;
            var canvas = Module["canvas"];
            function fullscreenChange() {
                Browser.isFullscreen = false;
                var canvasContainer = canvas.parentNode;
                if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
                    canvas.exitFullscreen = Browser.exitFullscreen;
                    if (Browser.lockPointer)
                        canvas.requestPointerLock();
                    Browser.isFullscreen = true;
                    if (Browser.resizeCanvas) {
                        Browser.setFullscreenCanvasSize()
                    } else {
                        Browser.updateCanvasDimensions(canvas)
                    }
                } else {
                    canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
                    canvasContainer.parentNode.removeChild(canvasContainer);
                    if (Browser.resizeCanvas) {
                        Browser.setWindowedCanvasSize()
                    } else {
                        Browser.updateCanvasDimensions(canvas)
                    }
                }
                if (Module["onFullScreen"])
                    Module["onFullScreen"](Browser.isFullscreen);
                if (Module["onFullscreen"])
                    Module["onFullscreen"](Browser.isFullscreen)
            }
            if (!Browser.fullscreenHandlersInstalled) {
                Browser.fullscreenHandlersInstalled = true;
                document.addEventListener("fullscreenchange", fullscreenChange, false);
                document.addEventListener("mozfullscreenchange", fullscreenChange, false);
                document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
                document.addEventListener("MSFullscreenChange", fullscreenChange, false)
            }
            var canvasContainer = document.createElement("div");
            canvas.parentNode.insertBefore(canvasContainer, canvas);
            canvasContainer.appendChild(canvas);
            canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? ()=>canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? ()=>canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
            canvasContainer.requestFullscreen()
        },
        exitFullscreen: function() {
            if (!Browser.isFullscreen) {
                return false
            }
            var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function() {}
            ;
            CFS.apply(document, []);
            return true
        },
        nextRAF: 0,
        fakeRequestAnimationFrame: function(func) {
            var now = Date.now();
            if (Browser.nextRAF === 0) {
                Browser.nextRAF = now + 1e3 / 60
            } else {
                while (now + 2 >= Browser.nextRAF) {
                    Browser.nextRAF += 1e3 / 60
                }
            }
            var delay = Math.max(Browser.nextRAF - now, 0);
            setTimeout(func, delay)
        },
        requestAnimationFrame: function(func) {
            raga.renderLoop();
            if (typeof requestAnimationFrame == "function") {
                requestAnimationFrame(func);
                return
            }
            var RAF = Browser.fakeRequestAnimationFrame;
            RAF(func)
        },
        safeSetTimeout: function(func, timeout) {
            return safeSetTimeout(func, timeout)
        },
        safeRequestAnimationFrame: function(func) {
            return Browser.requestAnimationFrame(function() {
                callUserCallback(func)
            })
        },
        getMimetype: function(name) {
            return {
                "jpg": "image/jpeg",
                "jpeg": "image/jpeg",
                "png": "image/png",
                "bmp": "image/bmp",
                "ogg": "audio/ogg",
                "wav": "audio/wav",
                "mp3": "audio/mpeg"
            }[name.substr(name.lastIndexOf(".") + 1)]
        },
        getUserMedia: function(func) {
            if (!window.getUserMedia) {
                window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"]
            }
            window.getUserMedia(func)
        },
        getMovementX: function(event) {
            return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0
        },
        getMovementY: function(event) {
            return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0
        },
        getMouseWheelDelta: function(event) {
            var delta = 0;
            switch (event.type) {
            case "DOMMouseScroll":
                delta = event.detail / 3;
                break;
            case "mousewheel":
                delta = event.wheelDelta / 120;
                break;
            case "wheel":
                delta = event.deltaY;
                switch (event.deltaMode) {
                case 0:
                    delta /= 100;
                    break;
                case 1:
                    delta /= 3;
                    break;
                case 2:
                    delta *= 80;
                    break;
                default:
                    throw "unrecognized mouse wheel delta mode: " + event.deltaMode
                }
                break;
            default:
                throw "unrecognized mouse wheel event: " + event.type
            }
            return delta
        },
        mouseX: 0,
        mouseY: 0,
        mouseMovementX: 0,
        mouseMovementY: 0,
        touches: {},
        lastTouches: {},
        calculateMouseEvent: function(event) {
            if (Browser.pointerLock) {
                if (event.type != "mousemove" && "mozMovementX"in event) {
                    Browser.mouseMovementX = Browser.mouseMovementY = 0
                } else {
                    Browser.mouseMovementX = Browser.getMovementX(event);
                    Browser.mouseMovementY = Browser.getMovementY(event)
                }
                if (typeof SDL != "undefined") {
                    Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
                    Browser.mouseY = SDL.mouseY + Browser.mouseMovementY
                } else {
                    Browser.mouseX += Browser.mouseMovementX;
                    Browser.mouseY += Browser.mouseMovementY
                }
            } else {
                var rect = Module["canvas"].getBoundingClientRect();
                var cw = Module["canvas"].width;
                var ch = Module["canvas"].height;
                var scrollX = typeof window.scrollX != "undefined" ? window.scrollX : window.pageXOffset;
                var scrollY = typeof window.scrollY != "undefined" ? window.scrollY : window.pageYOffset;
                if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
                    var touch = event.touch;
                    if (touch === undefined) {
                        return
                    }
                    var adjustedX = touch.pageX - (scrollX + rect.left);
                    var adjustedY = touch.pageY - (scrollY + rect.top);
                    adjustedX = adjustedX * (cw / rect.width);
                    adjustedY = adjustedY * (ch / rect.height);
                    var coords = {
                        x: adjustedX,
                        y: adjustedY
                    };
                    if (event.type === "touchstart") {
                        Browser.lastTouches[touch.identifier] = coords;
                        Browser.touches[touch.identifier] = coords
                    } else if (event.type === "touchend" || event.type === "touchmove") {
                        var last = Browser.touches[touch.identifier];
                        if (!last)
                            last = coords;
                        Browser.lastTouches[touch.identifier] = last;
                        Browser.touches[touch.identifier] = coords
                    }
                    return
                }
                var x = event.pageX - (scrollX + rect.left);
                var y = event.pageY - (scrollY + rect.top);
                x = x * (cw / rect.width);
                y = y * (ch / rect.height);
                Browser.mouseMovementX = x - Browser.mouseX;
                Browser.mouseMovementY = y - Browser.mouseY;
                Browser.mouseX = x;
                Browser.mouseY = y
            }
        },
        resizeListeners: [],
        updateResizeListeners: function() {
            var canvas = Module["canvas"];
            Browser.resizeListeners.forEach(function(listener) {
                listener(canvas.width, canvas.height)
            })
        },
        setCanvasSize: function(width, height, noUpdates) {
            var canvas = Module["canvas"];
            Browser.updateCanvasDimensions(canvas, width, height);
            if (!noUpdates)
                Browser.updateResizeListeners()
        },
        windowedWidth: 0,
        windowedHeight: 0,
        setFullscreenCanvasSize: function() {
            if (typeof SDL != "undefined") {
                var flags = HEAPU32[SDL.screen >> 2];
                flags = flags | 8388608;
                HEAP32[SDL.screen >> 2] = flags
            }
            Browser.updateCanvasDimensions(Module["canvas"]);
            Browser.updateResizeListeners()
        },
        setWindowedCanvasSize: function() {
            if (typeof SDL != "undefined") {
                var flags = HEAPU32[SDL.screen >> 2];
                flags = flags & ~8388608;
                HEAP32[SDL.screen >> 2] = flags
            }
            Browser.updateCanvasDimensions(Module["canvas"]);
            Browser.updateResizeListeners()
        },
        updateCanvasDimensions: function(canvas, wNative, hNative) {
            if (wNative && hNative) {
                canvas.widthNative = wNative;
                canvas.heightNative = hNative
            } else {
                wNative = canvas.widthNative;
                hNative = canvas.heightNative
            }
            var w = wNative;
            var h = hNative;
            if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
                if (w / h < Module["forcedAspectRatio"]) {
                    w = Math.round(h * Module["forcedAspectRatio"])
                } else {
                    h = Math.round(w / Module["forcedAspectRatio"])
                }
            }
            if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
                var factor = Math.min(screen.width / w, screen.height / h);
                w = Math.round(w * factor);
                h = Math.round(h * factor)
            }
            if (Browser.resizeCanvas) {
                if (canvas.width != w)
                    canvas.width = w;
                if (canvas.height != h)
                    canvas.height = h;
                if (typeof canvas.style != "undefined") {
                    canvas.style.removeProperty("width");
                    canvas.style.removeProperty("height")
                }
            } else {
                if (canvas.width != wNative)
                    canvas.width = wNative;
                if (canvas.height != hNative)
                    canvas.height = hNative;
                if (typeof canvas.style != "undefined") {
                    if (w != wNative || h != hNative) {
                        canvas.style.setProperty("width", w + "px", "important");
                        canvas.style.setProperty("height", h + "px", "important")
                    } else {
                        canvas.style.removeProperty("width");
                        canvas.style.removeProperty("height")
                    }
                }
            }
        }
    };
    function _emscripten_set_main_loop_timing(mode, value) {
        Browser.mainLoop.timingMode = mode;
        Browser.mainLoop.timingValue = value;
        if (!Browser.mainLoop.func) {
            return 1
        }
        if (!Browser.mainLoop.running) {
            Browser.mainLoop.running = true
        }
        if (mode == 0) {
            Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
                var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
                setTimeout(Browser.mainLoop.runner, timeUntilNextTick)
            }
            ;
            Browser.mainLoop.method = "timeout"
        } else if (mode == 1) {
            Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
                Browser.requestAnimationFrame(Browser.mainLoop.runner)
            }
            ;
            Browser.mainLoop.method = "rAF"
        } else if (mode == 2) {
            if (typeof setImmediate == "undefined") {
                var setImmediates = [];
                var emscriptenMainLoopMessageId = "setimmediate";
                var Browser_setImmediate_messageHandler = event=>{
                    if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                        event.stopPropagation();
                        setImmediates.shift()()
                    }
                }
                ;
                addEventListener("message", Browser_setImmediate_messageHandler, true);
                setImmediate = function Browser_emulated_setImmediate(func) {
                    setImmediates.push(func);
                    if (ENVIRONMENT_IS_WORKER) {
                        if (Module["setImmediates"] === undefined)
                            Module["setImmediates"] = [];
                        Module["setImmediates"].push(func);
                        postMessage({
                            target: emscriptenMainLoopMessageId
                        })
                    } else
                        postMessage(emscriptenMainLoopMessageId, "*")
                }
            }
            Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
                setImmediate(Browser.mainLoop.runner)
            }
            ;
            Browser.mainLoop.method = "immediate"
        }
        return 0
    }
    function setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) {
        assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
        Browser.mainLoop.func = browserIterationFunc;
        Browser.mainLoop.arg = arg;
        var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
        function checkIsRunning() {
            if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
                return false
            }
            return true
        }
        Browser.mainLoop.running = false;
        Browser.mainLoop.runner = function Browser_mainLoop_runner() {
            if (ABORT)
                return;
            if (Browser.mainLoop.queue.length > 0) {
                var start = Date.now();
                var blocker = Browser.mainLoop.queue.shift();
                blocker.func(blocker.arg);
                if (Browser.mainLoop.remainingBlockers) {
                    var remaining = Browser.mainLoop.remainingBlockers;
                    var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
                    if (blocker.counted) {
                        Browser.mainLoop.remainingBlockers = next
                    } else {
                        next = next + .5;
                        Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9
                    }
                }
                out('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
                Browser.mainLoop.updateStatus();
                if (!checkIsRunning())
                    return;
                setTimeout(Browser.mainLoop.runner, 0);
                return
            }
            if (!checkIsRunning())
                return;
            Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
            if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
                Browser.mainLoop.scheduler();
                return
            } else if (Browser.mainLoop.timingMode == 0) {
                Browser.mainLoop.tickStartTime = _emscripten_get_now()
            }
            Browser.mainLoop.runIter(browserIterationFunc);
            if (!checkIsRunning())
                return;
            if (typeof SDL == "object" && SDL.audio && SDL.audio.queueNewAudioData)
                SDL.audio.queueNewAudioData();
            Browser.mainLoop.scheduler()
        }
        ;
        if (!noSetTiming) {
            if (fps && fps > 0)
                _emscripten_set_main_loop_timing(0, 1e3 / fps);
            else
                _emscripten_set_main_loop_timing(1, 1);
            Browser.mainLoop.scheduler()
        }
        if (simulateInfiniteLoop) {
            throw "unwind"
        }
    }
    var wasmTableMirror = [];
    function getWasmTableEntry(funcPtr) {
        var func = wasmTableMirror[funcPtr];
        if (!func) {
            if (funcPtr >= wasmTableMirror.length)
                wasmTableMirror.length = funcPtr + 1;
            wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr)
        }
        return func
    }
    function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
        var browserIterationFunc = getWasmTableEntry(func);
        setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop)
    }
    var JSEvents = {
        inEventHandler: 0,
        removeAllEventListeners: function() {
            for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
                JSEvents._removeHandler(i)
            }
            JSEvents.eventHandlers = [];
            JSEvents.deferredCalls = []
        },
        registerRemoveEventListeners: function() {
            if (!JSEvents.removeEventListenersRegistered) {
                __ATEXIT__.push(JSEvents.removeAllEventListeners);
                JSEvents.removeEventListenersRegistered = true
            }
        },
        deferredCalls: [],
        deferCall: function(targetFunction, precedence, argsList) {
            function arraysHaveEqualContent(arrA, arrB) {
                if (arrA.length != arrB.length)
                    return false;
                for (var i in arrA) {
                    if (arrA[i] != arrB[i])
                        return false
                }
                return true
            }
            for (var i in JSEvents.deferredCalls) {
                var call = JSEvents.deferredCalls[i];
                if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
                    return
                }
            }
            JSEvents.deferredCalls.push({
                targetFunction: targetFunction,
                precedence: precedence,
                argsList: argsList
            });
            JSEvents.deferredCalls.sort(function(x, y) {
                return x.precedence < y.precedence
            })
        },
        removeDeferredCalls: function(targetFunction) {
            for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
                if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
                    JSEvents.deferredCalls.splice(i, 1);
                    --i
                }
            }
        },
        canPerformEventHandlerRequests: function() {
            return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls
        },
        runDeferredCalls: function() {
            if (!JSEvents.canPerformEventHandlerRequests()) {
                return
            }
            for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
                var call = JSEvents.deferredCalls[i];
                JSEvents.deferredCalls.splice(i, 1);
                --i;
                call.targetFunction.apply(null, call.argsList)
            }
        },
        eventHandlers: [],
        removeAllHandlersOnTarget: function(target, eventTypeString) {
            for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
                if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
                    JSEvents._removeHandler(i--)
                }
            }
        },
        _removeHandler: function(i) {
            var h = JSEvents.eventHandlers[i];
            h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
            JSEvents.eventHandlers.splice(i, 1)
        },
        registerOrRemoveHandler: function(eventHandler) {
            var jsEventHandler = function jsEventHandler(event) {
                ++JSEvents.inEventHandler;
                JSEvents.currentEventHandler = eventHandler;
                JSEvents.runDeferredCalls();
                eventHandler.handlerFunc(event);
                JSEvents.runDeferredCalls();
                --JSEvents.inEventHandler
            };
            if (eventHandler.callbackfunc) {
                eventHandler.eventListenerFunc = jsEventHandler;
                eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
                JSEvents.eventHandlers.push(eventHandler);
                JSEvents.registerRemoveEventListeners()
            } else {
                for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
                    if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
                        JSEvents._removeHandler(i--)
                    }
                }
            }
        },
        getNodeNameForTarget: function(target) {
            if (!target)
                return "";
            if (target == window)
                return "#window";
            if (target == screen)
                return "#screen";
            return target && target.nodeName ? target.nodeName : ""
        },
        fullscreenEnabled: function() {
            return document.fullscreenEnabled || document.webkitFullscreenEnabled
        }
    };
    var specialHTMLTargets = [0, typeof document != "undefined" ? document : 0, typeof window != "undefined" ? window : 0];
    function getBoundingClientRect(e) {
        return specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {
            "left": 0,
            "top": 0
        }
    }
    function fillMouseEventData(eventStruct, e, target) {
        HEAPF64[eventStruct >> 3] = e.timeStamp;
        var idx = eventStruct >> 2;
        HEAP32[idx + 2] = e.screenX;
        HEAP32[idx + 3] = e.screenY;
        HEAP32[idx + 4] = e.clientX;
        HEAP32[idx + 5] = e.clientY;
        HEAP32[idx + 6] = e.ctrlKey;
        HEAP32[idx + 7] = e.shiftKey;
        HEAP32[idx + 8] = e.altKey;
        HEAP32[idx + 9] = e.metaKey;
        HEAP16[idx * 2 + 20] = e.button;
        HEAP16[idx * 2 + 21] = e.buttons;
        HEAP32[idx + 11] = e["movementX"];
        HEAP32[idx + 12] = e["movementY"];
        var rect = getBoundingClientRect(target);
        HEAP32[idx + 13] = e.clientX - rect.left;
        HEAP32[idx + 14] = e.clientY - rect.top
    }
    function maybeCStringToJsString(cString) {
        return cString > 2 ? UTF8ToString(cString) : cString
    }
    function findEventTarget(target) {
        target = maybeCStringToJsString(target);
        var domElement = specialHTMLTargets[target] || (typeof document != "undefined" ? document.querySelector(target) : undefined);
        return domElement
    }
    function registerMouseEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
        if (!JSEvents.mouseEvent)
            JSEvents.mouseEvent = _malloc(72);
        target = findEventTarget(target);
        var mouseEventHandlerFunc = function(e=event) {
            fillMouseEventData(JSEvents.mouseEvent, e, target);
            if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData))
                e.preventDefault()
        };
        var eventHandler = {
            target: target,
            allowsDeferredCalls: eventTypeString != "mousemove" && eventTypeString != "mouseenter" && eventTypeString != "mouseleave",
            eventTypeString: eventTypeString,
            callbackfunc: callbackfunc,
            handlerFunc: mouseEventHandlerFunc,
            useCapture: useCapture
        };
        JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_mousemove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);
        return 0
    }
    function _emscripten_set_mouseup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);
        return 0
    }
    var ENV = {};
    function getExecutableName() {
        return thisProgram || "./this.program"
    }
    function getEnvStrings() {
        if (!getEnvStrings.strings) {
            var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
            var env = {
                "USER": "web_user",
                "LOGNAME": "web_user",
                "PATH": "/",
                "PWD": "/",
                "HOME": "/home/web_user",
                "LANG": lang,
                "_": getExecutableName()
            };
            for (var x in ENV) {
                if (ENV[x] === undefined)
                    delete env[x];
                else
                    env[x] = ENV[x]
            }
            var strings = [];
            for (var x in env) {
                strings.push(x + "=" + env[x])
            }
            getEnvStrings.strings = strings
        }
        return getEnvStrings.strings
    }
    function stringToAscii(str, buffer) {
        for (var i = 0; i < str.length; ++i) {
            HEAP8[buffer++ >> 0] = str.charCodeAt(i)
        }
        HEAP8[buffer >> 0] = 0
    }
    function _environ_get(__environ, environ_buf) {
        var bufSize = 0;
        getEnvStrings().forEach(function(string, i) {
            var ptr = environ_buf + bufSize;
            HEAPU32[__environ + i * 4 >> 2] = ptr;
            stringToAscii(string, ptr);
            bufSize += string.length + 1
        });
        return 0
    }
    function _environ_sizes_get(penviron_count, penviron_buf_size) {
        var strings = getEnvStrings();
        HEAPU32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        strings.forEach(function(string) {
            bufSize += string.length + 1
        });
        HEAPU32[penviron_buf_size >> 2] = bufSize;
        return 0
    }
    function isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    }
    function arraySum(array, index) {
        var sum = 0;
        for (var i = 0; i <= index; sum += array[i++]) {}
        return sum
    }
    var MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function addDays(date, days) {
        var newDate = new Date(date.getTime());
        while (days > 0) {
            var leap = isLeapYear(newDate.getFullYear());
            var currentMonth = newDate.getMonth();
            var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
            if (days > daysInCurrentMonth - newDate.getDate()) {
                days -= daysInCurrentMonth - newDate.getDate() + 1;
                newDate.setDate(1);
                if (currentMonth < 11) {
                    newDate.setMonth(currentMonth + 1)
                } else {
                    newDate.setMonth(0);
                    newDate.setFullYear(newDate.getFullYear() + 1)
                }
            } else {
                newDate.setDate(newDate.getDate() + days);
                return newDate
            }
        }
        return newDate
    }
    function lengthBytesUTF8(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);
            if (c <= 127) {
                len++
            } else if (c <= 2047) {
                len += 2
            } else if (c >= 55296 && c <= 57343) {
                len += 4;
                ++i
            } else {
                len += 3
            }
        }
        return len
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0))
            return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
                var u1 = str.charCodeAt(++i);
                u = 65536 + ((u & 1023) << 10) | u1 & 1023
            }
            if (u <= 127) {
                if (outIdx >= endIdx)
                    break;
                heap[outIdx++] = u
            } else if (u <= 2047) {
                if (outIdx + 1 >= endIdx)
                    break;
                heap[outIdx++] = 192 | u >> 6;
                heap[outIdx++] = 128 | u & 63
            } else if (u <= 65535) {
                if (outIdx + 2 >= endIdx)
                    break;
                heap[outIdx++] = 224 | u >> 12;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63
            } else {
                if (outIdx + 3 >= endIdx)
                    break;
                heap[outIdx++] = 240 | u >> 18;
                heap[outIdx++] = 128 | u >> 12 & 63;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63
            }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx
    }
    function intArrayFromString(stringy, dontAddNull, length) {
        var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len);
        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
        if (dontAddNull)
            u8array.length = numBytesWritten;
        return u8array
    }
    function writeArrayToMemory(array, buffer) {
        HEAP8.set(array, buffer)
    }
    function _strftime(s, maxsize, format, tm) {
        var tm_zone = HEAP32[tm + 40 >> 2];
        var date = {
            tm_sec: HEAP32[tm >> 2],
            tm_min: HEAP32[tm + 4 >> 2],
            tm_hour: HEAP32[tm + 8 >> 2],
            tm_mday: HEAP32[tm + 12 >> 2],
            tm_mon: HEAP32[tm + 16 >> 2],
            tm_year: HEAP32[tm + 20 >> 2],
            tm_wday: HEAP32[tm + 24 >> 2],
            tm_yday: HEAP32[tm + 28 >> 2],
            tm_isdst: HEAP32[tm + 32 >> 2],
            tm_gmtoff: HEAP32[tm + 36 >> 2],
            tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
        };
        var pattern = UTF8ToString(format);
        var EXPANSION_RULES_1 = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y"
        };
        for (var rule in EXPANSION_RULES_1) {
            pattern = pattern.replace(new RegExp(rule,"g"), EXPANSION_RULES_1[rule])
        }
        var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        function leadingSomething(value, digits, character) {
            var str = typeof value == "number" ? value.toString() : value || "";
            while (str.length < digits) {
                str = character[0] + str
            }
            return str
        }
        function leadingNulls(value, digits) {
            return leadingSomething(value, digits, "0")
        }
        function compareByDay(date1, date2) {
            function sgn(value) {
                return value < 0 ? -1 : value > 0 ? 1 : 0
            }
            var compare;
            if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
                if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
                    compare = sgn(date1.getDate() - date2.getDate())
                }
            }
            return compare
        }
        function getFirstWeekStartDate(janFourth) {
            switch (janFourth.getDay()) {
            case 0:
                return new Date(janFourth.getFullYear() - 1,11,29);
            case 1:
                return janFourth;
            case 2:
                return new Date(janFourth.getFullYear(),0,3);
            case 3:
                return new Date(janFourth.getFullYear(),0,2);
            case 4:
                return new Date(janFourth.getFullYear(),0,1);
            case 5:
                return new Date(janFourth.getFullYear() - 1,11,31);
            case 6:
                return new Date(janFourth.getFullYear() - 1,11,30)
            }
        }
        function getWeekBasedYear(date) {
            var thisDate = addDays(new Date(date.tm_year + 1900,0,1), date.tm_yday);
            var janFourthThisYear = new Date(thisDate.getFullYear(),0,4);
            var janFourthNextYear = new Date(thisDate.getFullYear() + 1,0,4);
            var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
            var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
            if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
                if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                    return thisDate.getFullYear() + 1
                }
                return thisDate.getFullYear()
            }
            return thisDate.getFullYear() - 1
        }
        var EXPANSION_RULES_2 = {
            "%a": function(date) {
                return WEEKDAYS[date.tm_wday].substring(0, 3)
            },
            "%A": function(date) {
                return WEEKDAYS[date.tm_wday]
            },
            "%b": function(date) {
                return MONTHS[date.tm_mon].substring(0, 3)
            },
            "%B": function(date) {
                return MONTHS[date.tm_mon]
            },
            "%C": function(date) {
                var year = date.tm_year + 1900;
                return leadingNulls(year / 100 | 0, 2)
            },
            "%d": function(date) {
                return leadingNulls(date.tm_mday, 2)
            },
            "%e": function(date) {
                return leadingSomething(date.tm_mday, 2, " ")
            },
            "%g": function(date) {
                return getWeekBasedYear(date).toString().substring(2)
            },
            "%G": function(date) {
                return getWeekBasedYear(date)
            },
            "%H": function(date) {
                return leadingNulls(date.tm_hour, 2)
            },
            "%I": function(date) {
                var twelveHour = date.tm_hour;
                if (twelveHour == 0)
                    twelveHour = 12;
                else if (twelveHour > 12)
                    twelveHour -= 12;
                return leadingNulls(twelveHour, 2)
            },
            "%j": function(date) {
                return leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date.tm_mon - 1), 3)
            },
            "%m": function(date) {
                return leadingNulls(date.tm_mon + 1, 2)
            },
            "%M": function(date) {
                return leadingNulls(date.tm_min, 2)
            },
            "%n": function() {
                return "\n"
            },
            "%p": function(date) {
                if (date.tm_hour >= 0 && date.tm_hour < 12) {
                    return "AM"
                }
                return "PM"
            },
            "%S": function(date) {
                return leadingNulls(date.tm_sec, 2)
            },
            "%t": function() {
                return "\t"
            },
            "%u": function(date) {
                return date.tm_wday || 7
            },
            "%U": function(date) {
                var days = date.tm_yday + 7 - date.tm_wday;
                return leadingNulls(Math.floor(days / 7), 2)
            },
            "%V": function(date) {
                var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
                if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
                    val++
                }
                if (!val) {
                    val = 52;
                    var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
                    if (dec31 == 4 || dec31 == 5 && isLeapYear(date.tm_year % 400 - 1)) {
                        val++
                    }
                } else if (val == 53) {
                    var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
                    if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year)))
                        val = 1
                }
                return leadingNulls(val, 2)
            },
            "%w": function(date) {
                return date.tm_wday
            },
            "%W": function(date) {
                var days = date.tm_yday + 7 - (date.tm_wday + 6) % 7;
                return leadingNulls(Math.floor(days / 7), 2)
            },
            "%y": function(date) {
                return (date.tm_year + 1900).toString().substring(2)
            },
            "%Y": function(date) {
                return date.tm_year + 1900
            },
            "%z": function(date) {
                var off = date.tm_gmtoff;
                var ahead = off >= 0;
                off = Math.abs(off) / 60;
                off = off / 60 * 100 + off % 60;
                return (ahead ? "+" : "-") + String("0000" + off).slice(-4)
            },
            "%Z": function(date) {
                return date.tm_zone
            },
            "%%": function() {
                return "%"
            }
        };
        pattern = pattern.replace(/%%/g, "\0\0");
        for (var rule in EXPANSION_RULES_2) {
            if (pattern.includes(rule)) {
                pattern = pattern.replace(new RegExp(rule,"g"), EXPANSION_RULES_2[rule](date))
            }
        }
        pattern = pattern.replace(/\0\0/g, "%");
        var bytes = intArrayFromString(pattern, false);
        if (bytes.length > maxsize) {
            return 0
        }
        writeArrayToMemory(bytes, s);
        return bytes.length - 1
    }
    function _strftime_l(s, maxsize, format, tm, loc) {
        return _strftime(s, maxsize, format, tm)
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
    }
    Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas) {
        Browser.requestFullscreen(lockPointer, resizeCanvas)
    }
    ;
    Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
        Browser.requestAnimationFrame(func)
    }
    ;
    Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
        Browser.setCanvasSize(width, height, noUpdates)
    }
    ;
    Module["pauseMainLoop"] = function Module_pauseMainLoop() {
        Browser.mainLoop.pause()
    }
    ;
    Module["resumeMainLoop"] = function Module_resumeMainLoop() {
        Browser.mainLoop.resume()
    }
    ;
    Module["getUserMedia"] = function Module_getUserMedia() {
        Browser.getUserMedia()
    }
    ;
    Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
        return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes)
    }
    ;
    var preloadedImages = {};
    var preloadedAudios = {};
    var wasmImports = {
        "n": __emscripten_get_now_is_monotonic,
        "b": _abort,
        "c": _emscripten_asm_const_double,
        "a": _emscripten_asm_const_int,
        "i": _emscripten_exit_with_live_runtime,
        "d": _emscripten_get_now,
        "g": _emscripten_memcpy_big,
        "f": _emscripten_resize_heap,
        "j": _emscripten_set_main_loop,
        "h": _emscripten_set_mousemove_callback_on_thread,
        "e": _emscripten_set_mouseup_callback_on_thread,
        "l": _environ_get,
        "m": _environ_sizes_get,
        "k": _strftime_l
    };
    var asm = createWasm();
    var ___wasm_call_ctors = function() {
        return (___wasm_call_ctors = Module["asm"]["p"]).apply(null, arguments)
    };
    var _cp5_idle = Module["_cp5_idle"] = function() {
        return (_cp5_idle = Module["_cp5_idle"] = Module["asm"]["q"]).apply(null, arguments)
    }
    ;
    var _free = Module["_free"] = function() {
        return (_free = Module["_free"] = Module["asm"]["r"]).apply(null, arguments)
    }
    ;
    var _ac_set_fadeout = Module["_ac_set_fadeout"] = function() {
        return (_ac_set_fadeout = Module["_ac_set_fadeout"] = Module["asm"]["s"]).apply(null, arguments)
    }
    ;
    var _ac_register_game_play_setting = Module["_ac_register_game_play_setting"] = function() {
        return (_ac_register_game_play_setting = Module["_ac_register_game_play_setting"] = Module["asm"]["t"]).apply(null, arguments)
    }
    ;
    var _cp5_check_ws = Module["_cp5_check_ws"] = function() {
        return (_cp5_check_ws = Module["_cp5_check_ws"] = Module["asm"]["u"]).apply(null, arguments)
    }
    ;
    var _ac_set_show_mass = Module["_ac_set_show_mass"] = function() {
        return (_ac_set_show_mass = Module["_ac_set_show_mass"] = Module["asm"]["v"]).apply(null, arguments)
    }
    ;
    var _ac_set_show_quest = Module["_ac_set_show_quest"] = function() {
        return (_ac_set_show_quest = Module["_ac_set_show_quest"] = Module["asm"]["w"]).apply(null, arguments)
    }
    ;
    var _ac_set_black_theme = Module["_ac_set_black_theme"] = function() {
        return (_ac_set_black_theme = Module["_ac_set_black_theme"] = Module["asm"]["x"]).apply(null, arguments)
    }
    ;
    var _ac_set_names_enabled = Module["_ac_set_names_enabled"] = function() {
        return (_ac_set_names_enabled = Module["_ac_set_names_enabled"] = Module["asm"]["y"]).apply(null, arguments)
    }
    ;
    var _ac_set_no_colors = Module["_ac_set_no_colors"] = function() {
        return (_ac_set_no_colors = Module["_ac_set_no_colors"] = Module["asm"]["z"]).apply(null, arguments)
    }
    ;
    var _ac_set_skins_enabled = Module["_ac_set_skins_enabled"] = function() {
        return (_ac_set_skins_enabled = Module["_ac_set_skins_enabled"] = Module["asm"]["A"]).apply(null, arguments)
    }
    ;
    var _ac_set_acid = Module["_ac_set_acid"] = function() {
        return (_ac_set_acid = Module["_ac_set_acid"] = Module["asm"]["B"]).apply(null, arguments)
    }
    ;
    var _ac_set_show_online_status = Module["_ac_set_show_online_status"] = function() {
        return (_ac_set_show_online_status = Module["_ac_set_show_online_status"] = Module["asm"]["C"]).apply(null, arguments)
    }
    ;
    var _ac_set_show_minimap = Module["_ac_set_show_minimap"] = function() {
        return (_ac_set_show_minimap = Module["_ac_set_show_minimap"] = Module["asm"]["D"]).apply(null, arguments)
    }
    ;
    var _ac_set_minimize_minimap = Module["_ac_set_minimize_minimap"] = function() {
        return (_ac_set_minimize_minimap = Module["_ac_set_minimize_minimap"] = Module["asm"]["E"]).apply(null, arguments)
    }
    ;
    var _ac_set_players_minimap = Module["_ac_set_players_minimap"] = function() {
        return (_ac_set_players_minimap = Module["_ac_set_players_minimap"] = Module["asm"]["F"]).apply(null, arguments)
    }
    ;
    var _ac_register_skin = Module["_ac_register_skin"] = function() {
        return (_ac_register_skin = Module["_ac_register_skin"] = Module["asm"]["G"]).apply(null, arguments)
    }
    ;
    var _ac_register_animated_skin = Module["_ac_register_animated_skin"] = function() {
        return (_ac_register_animated_skin = Module["_ac_register_animated_skin"] = Module["asm"]["H"]).apply(null, arguments)
    }
    ;
    var _ac_show_animations = Module["_ac_show_animations"] = function() {
        return (_ac_show_animations = Module["_ac_show_animations"] = Module["asm"]["I"]).apply(null, arguments)
    }
    ;
    var _main = Module["_main"] = function() {
        return (_main = Module["_main"] = Module["asm"]["J"]).apply(null, arguments)
    }
    ;
    var _ac_connect = Module["_ac_connect"] = function() {
        return (_ac_connect = Module["_ac_connect"] = Module["asm"]["K"]).apply(null, arguments)
    }
    ;
    var _ac_set_player_name = Module["_ac_set_player_name"] = function() {
        return (_ac_set_player_name = Module["_ac_set_player_name"] = Module["asm"]["L"]).apply(null, arguments)
    }
    ;
    var _ac_load_skin = Module["_ac_load_skin"] = function() {
        return (_ac_load_skin = Module["_ac_load_skin"] = Module["asm"]["M"]).apply(null, arguments)
    }
    ;
    var _ac_set_mouse_position = Module["_ac_set_mouse_position"] = function() {
        return (_ac_set_mouse_position = Module["_ac_set_mouse_position"] = Module["asm"]["N"]).apply(null, arguments)
    }
    ;
    var _ac_split = Module["_ac_split"] = function() {
        return (_ac_split = Module["_ac_split"] = Module["asm"]["O"]).apply(null, arguments)
    }
    ;
    var _ac_eject = Module["_ac_eject"] = function() {
        return (_ac_eject = Module["_ac_eject"] = Module["asm"]["P"]).apply(null, arguments)
    }
    ;
    var _ac_special_on = Module["_ac_special_on"] = function() {
        return (_ac_special_on = Module["_ac_special_on"] = Module["asm"]["Q"]).apply(null, arguments)
    }
    ;
    var _ac_special_off = Module["_ac_special_off"] = function() {
        return (_ac_special_off = Module["_ac_special_off"] = Module["asm"]["R"]).apply(null, arguments)
    }
    ;
    var _ac_zoom = Module["_ac_zoom"] = function() {
        return (_ac_zoom = Module["_ac_zoom"] = Module["asm"]["S"]).apply(null, arguments)
    }
    ;
    var _ac_spectate = Module["_ac_spectate"] = function() {
        return (_ac_spectate = Module["_ac_spectate"] = Module["asm"]["T"]).apply(null, arguments)
    }
    ;
    var _ac_disconnect = Module["_ac_disconnect"] = function() {
        return (_ac_disconnect = Module["_ac_disconnect"] = Module["asm"]["U"]).apply(null, arguments)
    }
    ;
    var _ac_proxy_mobile_data = Module["_ac_proxy_mobile_data"] = function() {
        return (_ac_proxy_mobile_data = Module["_ac_proxy_mobile_data"] = Module["asm"]["V"]).apply(null, arguments)
    }
    ;
    var _ac_every_second = Module["_ac_every_second"] = function() {
        return (_ac_every_second = Module["_ac_every_second"] = Module["asm"]["W"]).apply(null, arguments)
    }
    ;
    var _ac_send_facebook_data = Module["_ac_send_facebook_data"] = function() {
        return (_ac_send_facebook_data = Module["_ac_send_facebook_data"] = Module["asm"]["X"]).apply(null, arguments)
    }
    ;
    var _ac_set_integrity_checks = Module["_ac_set_integrity_checks"] = function() {
        return (_ac_set_integrity_checks = Module["_ac_set_integrity_checks"] = Module["asm"]["Y"]).apply(null, arguments)
    }
    ;
    var _ac_set_quality = Module["_ac_set_quality"] = function() {
        return (_ac_set_quality = Module["_ac_set_quality"] = Module["asm"]["Z"]).apply(null, arguments)
    }
    ;
    var _ac_set_fps_cap = Module["_ac_set_fps_cap"] = function() {
        return (_ac_set_fps_cap = Module["_ac_set_fps_cap"] = Module["asm"]["_"]).apply(null, arguments)
    }
    ;
    var _ac_get_game_state = Module["_ac_get_game_state"] = function() {
        return (_ac_get_game_state = Module["_ac_get_game_state"] = Module["asm"]["$"]).apply(null, arguments)
    }
    ;
    var _ac_get_for_crazy_games = Module["_ac_get_for_crazy_games"] = function() {
        return (_ac_get_for_crazy_games = Module["_ac_get_for_crazy_games"] = Module["asm"]["aa"]).apply(null, arguments)
    }
    ;
    var _ac_cancel_enter_arena = Module["_ac_cancel_enter_arena"] = function() {
        return (_ac_cancel_enter_arena = Module["_ac_cancel_enter_arena"] = Module["asm"]["ba"]).apply(null, arguments)
    }
    ;
    var _ac_player_has_cells = Module["_ac_player_has_cells"] = function() {
        return (_ac_player_has_cells = Module["_ac_player_has_cells"] = Module["asm"]["ca"]).apply(null, arguments)
    }
    ;
    var ___errno_location = function() {
        return (___errno_location = Module["asm"]["__errno_location"]).apply(null, arguments)
    };
    var _malloc = function() {
        return (_malloc = Module["asm"]["ea"]).apply(null, arguments)
    };
    Module["stringToUTF8"] = stringToUTF8;
    var calledRun;
    dependenciesFulfilled = function runCaller() {
        if (!calledRun)
            run();
        if (!calledRun)
            dependenciesFulfilled = runCaller
    }
    ;
    function callMain() {
        var entryFunction = _main;
        var argc = 0;
        var argv = 0;
        try {
            var ret = entryFunction(argc, argv);
            exitJS(ret, true);
            return ret
        } catch (e) {
            return handleException(e)
        }
    }
    function run() {
        if (runDependencies > 0) {
            return
        }
        preRun();
        if (runDependencies > 0) {
            return
        }
        function doRun() {
            if (calledRun)
                return;
            calledRun = true;
            Module["calledRun"] = true;
            if (ABORT)
                return;
            initRuntime();
            preMain();
            if (Module["onRuntimeInitialized"])
                Module["onRuntimeInitialized"]();
            if (shouldRunNow)
                callMain();
            postRun()
        }
        if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function() {
                setTimeout(function() {
                    Module["setStatus"]("")
                }, 1);
                doRun()
            }, 1)
        } else {
            doRun()
        }
    }
    if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function")
            Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
            Module["preInit"].pop()()
        }
    }
    var shouldRunNow = true;
    if (Module["noInitialRun"])
        shouldRunNow = false;
    run()
}
)(window);
