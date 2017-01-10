/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}

/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}

/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}


/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}

/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "a957d1ebcb520424d6e5"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars

/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}

/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}

/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],

/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},

/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},

/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}

/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";

/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}

/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;

/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;

/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}

/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}

/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;

/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}

/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}

/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}

/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}

/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}

/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};

/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}

/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}

/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}

/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}

/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;

/******/ 			var data = {};

/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;

/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;

/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];

/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");

/******/ 		hotCurrentHash = hotUpdateNewHash;

/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}

/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}

/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}

/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		10:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"accordion","1":"autocomplete","2":"dialog","3":"dropdown","4":"index","6":"tab","7":"table","8":"tooltip","9":"tree"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	//avalon
	__webpack_require__(14);
	//组件基础库
	__webpack_require__(15);
	//各种组件
	__webpack_require__(19);
	__webpack_require__(23);
	__webpack_require__(25);
	__webpack_require__(29);
	__webpack_require__(32);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(37);
	//ajax
	__webpack_require__(41);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	built in 2016-12-23:22:35 version 2.2.3 by 司徒正美
	https://github.com/RubyLouvre/avalon/tree/2.2.3


	fix VElement hackIE BUG
	avalon.bind 在绑定非元素节点也要修正事件对象 
	处理expr的null undefined情况     
	修正error函数参数顺序导致的错误
	支持组件继承(对象形式与函数形式皆可)

	*/(function (global, factory) {
	     true ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.avalon = factory();
	})(this, function () {
	    'use strict';

	    var win = typeof window === 'object' ? window : typeof global === 'object' ? global : {};

	    var inBrowser = !!win.location && win.navigator;
	    /* istanbul ignore if  */

	    var document$1 = inBrowser ? win.document : {
	        createElement: Object,
	        createElementNS: Object,
	        documentElement: 'xx',
	        contains: Boolean
	    };
	    var root = inBrowser ? document$1.documentElement : {
	        outerHTML: 'x'
	    };

	    var versions = {
	        objectobject: 7, //IE7-8
	        objectundefined: 6, //IE6
	        undefinedfunction: NaN, // other modern browsers
	        undefinedobject: NaN };
	    /* istanbul ignore next  */
	    var msie = document$1.documentMode || versions[typeof document$1.all + typeof XMLHttpRequest];

	    var modern = /NaN|undefined/.test(msie) || msie > 8;

	    /*
	     https://github.com/rsms/js-lru
	     entry             entry             entry             entry        
	     ______            ______            ______            ______       
	     | head |.newer => |      |.newer => |      |.newer => | tail |      
	     |  A   |          |  B   |          |  C   |          |  D   |      
	     |______| <= older.|______| <= older.|______| <= older.|______|      
	     
	     removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added 
	     */
	    function Cache(maxLength) {
	        // 标识当前缓存数组的大小
	        this.size = 0;
	        // 标识缓存数组能达到的最大长度
	        this.limit = maxLength;
	        //  head（最不常用的项），tail（最常用的项）全部初始化为undefined

	        this.head = this.tail = void 0;
	        this._keymap = {};
	    }

	    Cache.prototype = {
	        put: function put(key, value) {
	            var entry = {
	                key: key,
	                value: value
	            };
	            this._keymap[key] = entry;
	            if (this.tail) {
	                // 如果存在tail（缓存数组的长度不为0），将tail指向新的 entry
	                this.tail.newer = entry;
	                entry.older = this.tail;
	            } else {
	                // 如果缓存数组的长度为0，将head指向新的entry
	                this.head = entry;
	            }
	            this.tail = entry;
	            // 如果缓存数组达到上限，则先删除 head 指向的缓存对象
	            /* istanbul ignore if */
	            if (this.size === this.limit) {
	                this.shift();
	            } else {
	                this.size++;
	            }
	            return value;
	        },
	        shift: function shift() {
	            /* istanbul ignore next */
	            var entry = this.head;
	            /* istanbul ignore if */
	            if (entry) {
	                // 删除 head ，并改变指向
	                this.head = this.head.newer;
	                // 同步更新 _keymap 里面的属性值
	                this.head.older = entry.newer = entry.older = this._keymap[entry.key] = void 0;
	                delete this._keymap[entry.key]; //#1029
	                // 同步更新 缓存数组的长度
	                this.size--;
	            }
	        },
	        get: function get(key) {
	            var entry = this._keymap[key];
	            // 如果查找不到含有`key`这个属性的缓存对象
	            if (entry === void 0) return;
	            // 如果查找到的缓存对象已经是 tail (最近使用过的)
	            /* istanbul ignore if */
	            if (entry === this.tail) {
	                return entry.value;
	            }
	            // HEAD--------------TAIL
	            //   <.older   .newer>
	            //  <--- add direction --
	            //   A  B  C  <D>  E
	            if (entry.newer) {
	                // 处理 newer 指向
	                if (entry === this.head) {
	                    // 如果查找到的缓存对象是 head (最近最少使用过的)
	                    // 则将 head 指向原 head 的 newer 所指向的缓存对象
	                    this.head = entry.newer;
	                }
	                // 将所查找的缓存对象的下一级的 older 指向所查找的缓存对象的older所指向的值
	                // 例如：A B C D E
	                // 如果查找到的是D，那么将E指向C，不再指向D
	                entry.newer.older = entry.older; // C <-- E.
	            }
	            if (entry.older) {
	                // 处理 older 指向
	                // 如果查找到的是D，那么C指向E，不再指向D
	                entry.older.newer = entry.newer; // C. --> E
	            }
	            // 处理所查找到的对象的 newer 以及 older 指向
	            entry.newer = void 0; // D --x
	            // older指向之前使用过的变量，即D指向E
	            entry.older = this.tail; // D. --> E
	            if (this.tail) {
	                // 将E的newer指向D
	                this.tail.newer = entry; // E. <-- D
	            }
	            // 改变 tail 为D 
	            this.tail = entry;
	            return entry.value;
	        }
	    };

	    var delayCompile = {};

	    var directives = {};

	    function directive(name, opts) {
	        if (directives[name]) {
	            avalon.warn(name, 'directive have defined! ');
	        }
	        directives[name] = opts;
	        if (!opts.update) {
	            opts.update = function () {};
	        }
	        if (opts.delay) {
	            delayCompile[name] = 1;
	        }
	        return opts;
	    }

	    function delayCompileNodes(dirs) {
	        for (var i in delayCompile) {
	            if ('ms-' + i in dirs) {
	                return true;
	            }
	        }
	    }

	    var window$1 = win;
	    function avalon(el) {
	        return new avalon.init(el);
	    }

	    avalon.init = function (el) {
	        this[0] = this.element = el;
	    };

	    avalon.fn = avalon.prototype = avalon.init.prototype;

	    function shadowCopy(destination, source) {
	        for (var property in source) {
	            destination[property] = source[property];
	        }
	        return destination;
	    }
	    var rword = /[^, ]+/g;
	    var rnowhite = /\S+/g; //存在非空字符
	    var platform = {}; //用于放置平台差异的方法与属性


	    function oneObject(array, val) {
	        if (typeof array === 'string') {
	            array = array.match(rword) || [];
	        }
	        var result = {},
	            value = val !== void 0 ? val : 1;
	        for (var i = 0, n = array.length; i < n; i++) {
	            result[array[i]] = value;
	        }
	        return result;
	    }

	    var op = Object.prototype;
	    function quote(str) {
	        return avalon._quote(str);
	    }
	    var inspect = op.toString;
	    var ohasOwn = op.hasOwnProperty;
	    var ap = Array.prototype;

	    var hasConsole = typeof console === 'object';
	    avalon.config = { debug: true };
	    function log() {
	        if (hasConsole && avalon.config.debug) {
	            Function.apply.call(console.log, console, arguments);
	        }
	    }
	    function warn() {
	        if (hasConsole && avalon.config.debug) {
	            var method = console.warn || console.log;
	            // http://qiang106.iteye.com/blog/1721425
	            Function.apply.call(method, console, arguments);
	        }
	    }
	    function error(str, e) {
	        throw (e || Error)(str);
	    }
	    function noop() {}
	    function isObject(a) {
	        return a !== null && typeof a === 'object';
	    }

	    function range(start, end, step) {
	        // 用于生成整数数组
	        step || (step = 1);
	        if (end == null) {
	            end = start || 0;
	            start = 0;
	        }
	        var index = -1,
	            length = Math.max(0, Math.ceil((end - start) / step)),
	            result = new Array(length);
	        while (++index < length) {
	            result[index] = start;
	            start += step;
	        }
	        return result;
	    }

	    var rhyphen = /([a-z\d])([A-Z]+)/g;
	    function hyphen(target) {
	        //转换为连字符线风格
	        return target.replace(rhyphen, '$1-$2').toLowerCase();
	    }

	    var rcamelize = /[-_][^-_]/g;
	    function camelize(target) {
	        //提前判断，提高getStyle等的效率
	        if (!target || target.indexOf('-') < 0 && target.indexOf('_') < 0) {
	            return target;
	        }
	        //转换为驼峰风格
	        return target.replace(rcamelize, function (match) {
	            return match.charAt(1).toUpperCase();
	        });
	    }

	    var _slice = ap.slice;
	    function slice(nodes, start, end) {
	        return _slice.call(nodes, start, end);
	    }

	    var rhashcode = /\d\.\d{4}/;
	    //生成UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	    function makeHashCode(prefix) {
	        /* istanbul ignore next*/
	        prefix = prefix || 'avalon';
	        /* istanbul ignore next*/
	        return String(Math.random() + Math.random()).replace(rhashcode, prefix);
	    }
	    //生成事件回调的UUID(用户通过ms-on指令)
	    function getLongID(fn) {
	        /* istanbul ignore next */
	        return fn.uuid || (fn.uuid = makeHashCode('e'));
	    }
	    var UUID = 1;
	    //生成事件回调的UUID(用户通过avalon.bind)
	    function getShortID(fn) {
	        /* istanbul ignore next */
	        return fn.uuid || (fn.uuid = '_' + ++UUID);
	    }

	    var rescape = /[-.*+?^${}()|[\]\/\\]/g;
	    function escapeRegExp(target) {
	        //http://stevenlevithan.com/regex/xregexp/
	        //将字符串安全格式化为正则表达式的源码
	        return (target + '').replace(rescape, '\\$&');
	    }

	    var eventHooks = {};
	    var eventListeners = {};
	    var validators = {};
	    var cssHooks = {};

	    window$1.avalon = avalon;

	    function createFragment() {
	        /* istanbul ignore next  */
	        return document$1.createDocumentFragment();
	    }

	    var rentities = /&[a-z0-9#]{2,10};/;
	    var temp = document$1.createElement('div');
	    shadowCopy(avalon, {
	        Array: {
	            merge: function merge(target, other) {
	                //合并两个数组 avalon2新增
	                target.push.apply(target, other);
	            },
	            ensure: function ensure(target, item) {
	                //只有当前数组不存在此元素时只添加它
	                if (target.indexOf(item) === -1) {
	                    return target.push(item);
	                }
	            },
	            removeAt: function removeAt(target, index) {
	                //移除数组中指定位置的元素，返回布尔表示成功与否
	                return !!target.splice(index, 1).length;
	            },
	            remove: function remove(target, item) {
	                //移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否
	                var index = target.indexOf(item);
	                if (~index) return avalon.Array.removeAt(target, index);
	                return false;
	            }
	        },
	        evaluatorPool: new Cache(888),
	        parsers: {
	            number: function number(a) {
	                return a === '' ? '' : parseFloat(a) || 0;
	            },
	            string: function string(a) {
	                return a === null || a === void 0 ? '' : a + '';
	            },
	            "boolean": function boolean(a) {
	                if (a === '') return a;
	                return a === 'true' || a === '1';
	            }
	        },
	        _decode: function _decode(str) {
	            if (rentities.test(str)) {
	                temp.innerHTML = str;
	                return temp.innerText || temp.textContent;
	            }
	            return str;
	        }
	    });

	    //============== config ============
	    function config(settings) {
	        for (var p in settings) {
	            var val = settings[p];
	            if (typeof config.plugins[p] === 'function') {
	                config.plugins[p](val);
	            } else {
	                config[p] = val;
	            }
	        }
	        return this;
	    }

	    var plugins = {
	        interpolate: function interpolate(array) {
	            var openTag = array[0];
	            var closeTag = array[1];
	            if (openTag === closeTag) {
	                throw new SyntaxError('interpolate openTag cannot equal to closeTag');
	            }
	            var str = openTag + 'test' + closeTag;

	            if (/[<>]/.test(str)) {
	                throw new SyntaxError('interpolate cannot contains "<" or ">"');
	            }

	            config.openTag = openTag;
	            config.closeTag = closeTag;
	            var o = escapeRegExp(openTag);
	            var c = escapeRegExp(closeTag);

	            config.rtext = new RegExp(o + '(.+?)' + c, 'g');
	            config.rexpr = new RegExp(o + '([\\s\\S]*)' + c);
	        }
	    };
	    function createAnchor(nodeValue) {
	        return document$1.createComment(nodeValue);
	    }
	    config.plugins = plugins;
	    config({
	        interpolate: ['{{', '}}'],
	        debug: true
	    });
	    //============  config ============

	    shadowCopy(avalon, {
	        shadowCopy: shadowCopy,

	        oneObject: oneObject,
	        inspect: inspect,
	        ohasOwn: ohasOwn,
	        rword: rword,
	        version: "2.2.3",
	        vmodels: {},

	        directives: directives,
	        directive: directive,

	        eventHooks: eventHooks,
	        eventListeners: eventListeners,
	        validators: validators,
	        cssHooks: cssHooks,

	        log: log,
	        noop: noop,
	        warn: warn,
	        error: error,
	        config: config,

	        modern: modern,
	        msie: msie,
	        root: root,
	        document: document$1,
	        window: window$1,
	        inBrowser: inBrowser,

	        isObject: isObject,
	        range: range,
	        slice: slice,
	        hyphen: hyphen,
	        camelize: camelize,
	        escapeRegExp: escapeRegExp,
	        quote: quote,

	        makeHashCode: makeHashCode

	    });

	    /**
	     * 此模块用于修复语言的底层缺陷
	     */
	    function isNative(fn) {
	        return (/\[native code\]/.test(fn)
	        );
	    }

	    /* istanbul ignore if*/
	    if (!isNative('司徒正美'.trim)) {
	        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	        String.prototype.trim = function () {
	            return this.replace(rtrim, '');
	        };
	    }
	    var hasDontEnumBug = !{
	        'toString': null
	    }.propertyIsEnumerable('toString');
	    var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
	    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
	    var dontEnumsLength = dontEnums.length;
	    /* istanbul ignore if*/
	    if (!isNative(Object.keys)) {
	        Object.keys = function (object) {
	            //ecma262v5 15.2.3.14
	            var theKeys = [];
	            var skipProto = hasProtoEnumBug && typeof object === 'function';
	            if (typeof object === 'string' || object && object.callee) {
	                for (var i = 0; i < object.length; ++i) {
	                    theKeys.push(String(i));
	                }
	            } else {
	                for (var name in object) {
	                    if (!(skipProto && name === 'prototype') && ohasOwn.call(object, name)) {
	                        theKeys.push(String(name));
	                    }
	                }
	            }

	            if (hasDontEnumBug) {
	                var ctor = object.constructor,
	                    skipConstructor = ctor && ctor.prototype === object;
	                for (var j = 0; j < dontEnumsLength; j++) {
	                    var dontEnum = dontEnums[j];
	                    if (!(skipConstructor && dontEnum === 'constructor') && ohasOwn.call(object, dontEnum)) {
	                        theKeys.push(dontEnum);
	                    }
	                }
	            }
	            return theKeys;
	        };
	    }
	    /* istanbul ignore if*/
	    if (!isNative(Array.isArray)) {
	        Array.isArray = function (a) {
	            return Object.prototype.toString.call(a) === '[object Array]';
	        };
	    }

	    /* istanbul ignore if*/
	    if (!isNative(isNative.bind)) {
	        /* istanbul ignore next*/
	        Function.prototype.bind = function (scope) {
	            if (arguments.length < 2 && scope === void 0) return this;
	            var fn = this,
	                argv = arguments;
	            return function () {
	                var args = [],
	                    i;
	                for (i = 1; i < argv.length; i++) {
	                    args.push(argv[i]);
	                }for (i = 0; i < arguments.length; i++) {
	                    args.push(arguments[i]);
	                }return fn.apply(scope, args);
	            };
	        };
	    }
	    //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
	    /**
	     * Shim for "fixing" IE's lack of support (IE < 9) for applying slice
	     * on host objects like NamedNodeMap, NodeList, and HTMLCollection
	     * (technically, since host objects have been implementation-dependent,
	     * at least before ES6, IE hasn't needed to work this way).
	     * Also works on strings, fixes IE < 9 to allow an explicit undefined
	     * for the 2nd argument (as in Firefox), and prevents errors when
	     * called on other DOM objects.
	     */

	    try {
	        // Can't be used with DOM elements in IE < 9
	        _slice.call(avalon.document.documentElement);
	    } catch (e) {
	        // Fails in IE < 9
	        // This will work for genuine arrays, array-like objects,
	        // NamedNodeMap (attributes, entities, notations),
	        // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
	        // and will not fail on other DOM objects (as do DOM elements in IE < 9)
	        /* istanbul ignore next*/
	        ap.slice = function (begin, end) {
	            // IE < 9 gets unhappy with an undefined end argument
	            end = typeof end !== 'undefined' ? end : this.length;

	            // For native Array objects, we use the native slice function
	            if (Array.isArray(this)) {
	                return _slice.call(this, begin, end);
	            }

	            // For array like object we handle it ourselves.
	            var i,
	                cloned = [],
	                size,
	                len = this.length;

	            // Handle negative value for "begin"
	            var start = begin || 0;
	            start = start >= 0 ? start : len + start;

	            // Handle negative value for "end"
	            var upTo = end ? end : len;
	            if (end < 0) {
	                upTo = len + end;
	            }

	            // Actual expected size of the slice
	            size = upTo - start;

	            if (size > 0) {
	                cloned = new Array(size);
	                if (this.charAt) {
	                    for (i = 0; i < size; i++) {
	                        cloned[i] = this.charAt(start + i);
	                    }
	                } else {
	                    for (i = 0; i < size; i++) {
	                        cloned[i] = this[start + i];
	                    }
	                }
	            }

	            return cloned;
	        };
	    }
	    /* istanbul ignore next*/
	    function iterator(vars, body, ret) {
	        var fun = 'for(var ' + vars + 'i=0,n = this.length; i < n; i++){' + body.replace('_', '((i in this) && fn.call(scope,this[i],i,this))') + '}' + ret;
	        /* jshint ignore:start */
	        return Function('fn,scope', fun);
	        /* jshint ignore:end */
	    }
	    /* istanbul ignore if*/
	    if (!isNative(ap.map)) {
	        avalon.shadowCopy(ap, {
	            //定位操作，返回数组中第一个等于给定参数的元素的索引值。
	            indexOf: function indexOf(item, index) {
	                var n = this.length,
	                    i = ~~index;
	                if (i < 0) i += n;
	                for (; i < n; i++) {
	                    if (this[i] === item) return i;
	                }return -1;
	            },
	            //定位操作，同上，不过是从后遍历。
	            lastIndexOf: function lastIndexOf(item, index) {
	                var n = this.length,
	                    i = index == null ? n - 1 : index;
	                if (i < 0) i = Math.max(0, n + i);
	                for (; i >= 0; i--) {
	                    if (this[i] === item) return i;
	                }return -1;
	            },
	            //迭代操作，将数组的元素挨个儿传入一个函数中执行。Prototype.js的对应名字为each。
	            forEach: iterator('', '_', ''),
	            //迭代类 在数组中的每个项上运行一个函数，如果此函数的值为真，则此元素作为新数组的元素收集起来，并返回新数组
	            filter: iterator('r=[],j=0,', 'if(_)r[j++]=this[i]', 'return r'),
	            //收集操作，将数组的元素挨个儿传入一个函数中执行，然后把它们的返回值组成一个新数组返回。Prototype.js的对应名字为collect。
	            map: iterator('r=[],', 'r[i]=_', 'return r'),
	            //只要数组中有一个元素满足条件（放进给定函数返回true），那么它就返回true。Prototype.js的对应名字为any。
	            some: iterator('', 'if(_)return true', 'return false'),
	            //只有数组中的元素都满足条件（放进给定函数返回true），它才返回true。Prototype.js的对应名字为all。
	            every: iterator('', 'if(!_)return false', 'return true')
	        });
	    }

	    //这里放置存在异议的方法
	    var compaceQuote = function () {
	        //https://github.com/bestiejs/json3/blob/master/lib/json3.js
	        var Escapes = {
	            92: "\\\\",
	            34: '\\"',
	            8: "\\b",
	            12: "\\f",
	            10: "\\n",
	            13: "\\r",
	            9: "\\t"
	        };

	        var leadingZeroes = '000000';
	        var toPaddedString = function toPaddedString(width, value) {
	            return (leadingZeroes + (value || 0)).slice(-width);
	        };
	        var unicodePrefix = '\\u00';
	        var escapeChar = function escapeChar(character) {
	            var charCode = character.charCodeAt(0),
	                escaped = Escapes[charCode];
	            if (escaped) {
	                return escaped;
	            }
	            return unicodePrefix + toPaddedString(2, charCode.toString(16));
	        };
	        var reEscape = /[\x00-\x1f\x22\x5c]/g;
	        return function (value) {
	            /* istanbul ignore next */
	            reEscape.lastIndex = 0;
	            /* istanbul ignore next */
	            return '"' + (reEscape.test(value) ? String(value).replace(reEscape, escapeChar) : value) + '"';
	        };
	    }();
	    try {
	        avalon._quote = JSON.stringify;
	    } catch (e) {
	        /* istanbul ignore next  */
	        avalon._quote = compaceQuote;
	    }

	    var class2type = {};
	    'Boolean Number String Function Array Date RegExp Object Error'.replace(avalon.rword, function (name) {
	        class2type['[object ' + name + ']'] = name.toLowerCase();
	    });

	    avalon.type = function (obj) {
	        //取得目标的类型
	        if (obj == null) {
	            return String(obj);
	        }
	        // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
	        return typeof obj === 'object' || typeof obj === 'function' ? class2type[inspect.call(obj)] || 'object' : typeof obj;
	    };

	    var rfunction = /^\s*\bfunction\b/;

	    avalon.isFunction = /* istanbul ignore if */typeof alert === 'object' ? function (fn) {
	        /* istanbul ignore next */
	        try {
	            /* istanbul ignore next */
	            return rfunction.test(fn + '');
	        } catch (e) {
	            /* istanbul ignore next */
	            return false;
	        }
	    } : function (fn) {
	        return inspect.call(fn) === '[object Function]';
	    };

	    // 利用IE678 window == document为true,document == window竟然为false的神奇特性
	    // 标准浏览器及IE9，IE10等使用 正则检测
	    /* istanbul ignore next */
	    function isWindowCompact(obj) {
	        if (!obj) {
	            return false;
	        }
	        return obj == obj.document && obj.document != obj; //jshint ignore:line
	    }

	    var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/;

	    function isWindowModern(obj) {
	        return rwindow.test(inspect.call(obj));
	    }

	    avalon.isWindow = isWindowModern(avalon.window) ? isWindowModern : isWindowCompact;

	    var enu;
	    var enumerateBUG;
	    for (enu in avalon({})) {
	        break;
	    }

	    enumerateBUG = enu !== '0'; //IE6下为true, 其他为false

	    /*判定是否是一个朴素的javascript对象（Object），不是DOM对象，不是BOM对象，不是自定义类的实例*/
	    /* istanbul ignore next */
	    function isPlainObjectCompact(obj, key) {
	        if (!obj || avalon.type(obj) !== 'object' || obj.nodeType || avalon.isWindow(obj)) {
	            return false;
	        }
	        try {
	            //IE内置对象没有constructor
	            if (obj.constructor && !ohasOwn.call(obj, 'constructor') && !ohasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
	                return false;
	            }
	            var isVBscript = obj.$vbthis;
	        } catch (e) {
	            //IE8 9会在这里抛错
	            return false;
	        }
	        /* istanbul ignore if */
	        if (enumerateBUG) {
	            for (key in obj) {
	                return ohasOwn.call(obj, key);
	            }
	        }
	        for (key in obj) {}
	        return key === undefined$1 || ohasOwn.call(obj, key);
	    }

	    /* istanbul ignore next */
	    function isPlainObjectModern(obj) {
	        // 简单的 typeof obj === 'object'检测，会致使用isPlainObject(window)在opera下通不过
	        return inspect.call(obj) === '[object Object]' && Object.getPrototypeOf(obj) === Object.prototype;
	    }
	    /* istanbul ignore next */
	    avalon.isPlainObject = /\[native code\]/.test(Object.getPrototypeOf) ? isPlainObjectModern : isPlainObjectCompact;

	    var rcanMix = /object|function/;

	    //与jQuery.extend方法，可用于浅拷贝，深拷贝
	    /* istanbul ignore next */
	    avalon.mix = avalon.fn.mix = function () {
	        var n = arguments.length,
	            isDeep = false,
	            i = 0,
	            array = [];
	        if (arguments[0] === true) {
	            isDeep = true;
	            i = 1;
	        }
	        //将所有非空对象变成空对象
	        for (; i < n; i++) {
	            var el = arguments[i];
	            el = el && rcanMix.test(typeof el) ? el : {};
	            array.push(el);
	        }
	        if (array.length === 1) {
	            array.unshift(this);
	        }
	        return innerExtend(isDeep, array);
	    };
	    var undefined$1;

	    function innerExtend(isDeep, array) {
	        var target = array[0],
	            copyIsArray,
	            clone,
	            name;
	        for (var i = 1, length = array.length; i < length; i++) {
	            //只处理非空参数
	            var options = array[i];
	            var noCloneArrayMethod = Array.isArray(options);
	            for (name in options) {
	                if (noCloneArrayMethod && !options.hasOwnProperty(name)) {
	                    continue;
	                }
	                try {
	                    var src = target[name];
	                    var copy = options[name]; //当options为VBS对象时报错
	                } catch (e) {
	                    continue;
	                }

	                // 防止环引用
	                if (target === copy) {
	                    continue;
	                }
	                if (isDeep && copy && (avalon.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

	                    if (copyIsArray) {
	                        copyIsArray = false;
	                        clone = src && Array.isArray(src) ? src : [];
	                    } else {
	                        clone = src && avalon.isPlainObject(src) ? src : {};
	                    }

	                    target[name] = innerExtend(isDeep, [clone, copy]);
	                } else if (copy !== undefined$1) {
	                    target[name] = copy;
	                }
	            }
	        }
	        return target;
	    }

	    var rarraylike = /(Array|List|Collection|Map|Arguments)\]$/;
	    /*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	    /* istanbul ignore next */
	    function isArrayLike(obj) {
	        if (!obj) return false;
	        var n = obj.length;
	        if (n === n >>> 0) {
	            //检测length属性是否为非负整数
	            var type = inspect.call(obj);
	            if (rarraylike.test(type)) return true;
	            if (type !== '[object Object]') return false;
	            try {
	                if ({}.propertyIsEnumerable.call(obj, 'length') === false) {
	                    //如果是原生对象
	                    return rfunction.test(obj.item || obj.callee);
	                }
	                return true;
	            } catch (e) {
	                //IE的NodeList直接抛错
	                return !obj.window; //IE6-8 window
	            }
	        }
	        return false;
	    }

	    avalon.each = function (obj, fn) {
	        if (obj) {
	            //排除null, undefined
	            var i = 0;
	            if (isArrayLike(obj)) {
	                for (var n = obj.length; i < n; i++) {
	                    if (fn(i, obj[i]) === false) break;
	                }
	            } else {
	                for (i in obj) {
	                    if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
	                        break;
	                    }
	                }
	            }
	        }
	    };
	    (function () {
	        var welcomeIntro = ["%cavalon.js %c" + avalon.version + " %cin debug mode, %cmore...", "color: rgb(114, 157, 52); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;"];
	        var welcomeMessage = "You're running avalon in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\n" + 'To disable debug mode, add this line at the start of your app:\n\n  avalon.config({debug: false});\n\n' + 'Debug mode also automatically shut down amicably when your app is minified.\n\n' + "Get help and support:\n  https://segmentfault.com/t/avalon\n  http://avalonjs.coding.me/\n  http://www.baidu-x.com/?q=avalonjs\n  http://www.avalon.org.cn/\n\nFound a bug? Raise an issue:\n  https://github.com/RubyLouvre/avalon/issues\n\n";
	        if (typeof console === 'object') {
	            var con = console;
	            var method = con.groupCollapsed || con.log;
	            Function.apply.call(method, con, welcomeIntro);
	            con.log(welcomeMessage);
	            if (method !== console.log) {
	                con.groupEnd(welcomeIntro);
	            }
	        }
	    })();

	    function toFixedFix(n, prec) {
	        var k = Math.pow(10, prec);
	        return '' + (Math.round(n * k) / k).toFixed(prec);
	    }
	    function numberFilter(number, decimals, point, thousands) {
	        //https://github.com/txgruppi/number_format
	        //form http://phpjs.org/functions/number_format/
	        //number 必需，要格式化的数字
	        //decimals 可选，规定多少个小数位。
	        //point 可选，规定用作小数点的字符串（默认为 . ）。
	        //thousands 可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
	        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	        var n = !isFinite(+number) ? 0 : +number,
	            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
	            sep = typeof thousands === 'string' ? thousands : ",",
	            dec = point || ".",
	            s = '';

	        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	        if (s[0].length > 3) {
	            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	        }
	        /** //好像没有用
	         var s1 = s[1] || ''
	        
	          if (s1.length < prec) {
	                  s1 += new Array(prec - s[1].length + 1).join('0')
	                  s[1] = s1
	          }
	          **/
	        return s.join(dec);
	    }

	    var rscripts = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim;
	    var ron = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g;
	    var ropen = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig;
	    var rsanitize = {
	        a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
	        img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
	        form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
	    };

	    //https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	    //    <a href="javasc&NewLine;ript&colon;alert('XSS')">chrome</a> 
	    //    <a href="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg==">chrome</a>
	    //    <a href="jav	ascript:alert('XSS');">IE67chrome</a>
	    //    <a href="jav&#x09;ascript:alert('XSS');">IE67chrome</a>
	    //    <a href="jav&#x0A;ascript:alert('XSS');">IE67chrome</a>
	    function sanitizeFilter(str) {
	        return str.replace(rscripts, "").replace(ropen, function (a, b) {
	            var match = a.toLowerCase().match(/<(\w+)\s/);
	            if (match) {
	                //处理a标签的href属性，img标签的src属性，form标签的action属性
	                var reg = rsanitize[match[1]];
	                if (reg) {
	                    a = a.replace(reg, function (s, name, value) {
	                        var quote = value.charAt(0);
	                        return name + "=" + quote + "javascript:void(0)" + quote; // jshint ignore:line
	                    });
	                }
	            }
	            return a.replace(ron, " ").replace(/\s+/g, " "); //移除onXXX事件
	        });
	    }

	    /*
	     'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
	     'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
	     'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
	     'MMMM': Month in year (January-December)
	     'MMM': Month in year (Jan-Dec)
	     'MM': Month in year, padded (01-12)
	     'M': Month in year (1-12)
	     'dd': Day in month, padded (01-31)
	     'd': Day in month (1-31)
	     'EEEE': Day in Week,(Sunday-Saturday)
	     'EEE': Day in Week, (Sun-Sat)
	     'HH': Hour in day, padded (00-23)
	     'H': Hour in day (0-23)
	     'hh': Hour in am/pm, padded (01-12)
	     'h': Hour in am/pm, (1-12)
	     'mm': Minute in hour, padded (00-59)
	     'm': Minute in hour (0-59)
	     'ss': Second in minute, padded (00-59)
	     's': Second in minute (0-59)
	     'a': am/pm marker
	     'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)
	     format string can also be one of the following predefined localizable formats:
	     
	     'medium': equivalent to 'MMM d, y h:mm:ss a' for en_US locale (e.g. Sep 3, 2010 12:05:08 pm)
	     'short': equivalent to 'M/d/yy h:mm a' for en_US locale (e.g. 9/3/10 12:05 pm)
	     'fullDate': equivalent to 'EEEE, MMMM d,y' for en_US locale (e.g. Friday, September 3, 2010)
	     'longDate': equivalent to 'MMMM d, y' for en_US locale (e.g. September 3, 2010
	     'mediumDate': equivalent to 'MMM d, y' for en_US locale (e.g. Sep 3, 2010)
	     'shortDate': equivalent to 'M/d/yy' for en_US locale (e.g. 9/3/10)
	     'mediumTime': equivalent to 'h:mm:ss a' for en_US locale (e.g. 12:05:08 pm)
	     'shortTime': equivalent to 'h:mm a' for en_US locale (e.g. 12:05 pm)
	     */

	    function toInt(str) {
	        return parseInt(str, 10) || 0;
	    }

	    function padNumber(num, digits, trim) {
	        var neg = '';
	        /* istanbul ignore if*/
	        if (num < 0) {
	            neg = '-';
	            num = -num;
	        }
	        num = '' + num;
	        while (num.length < digits) {
	            num = '0' + num;
	        }if (trim) num = num.substr(num.length - digits);
	        return neg + num;
	    }

	    function dateGetter(name, size, offset, trim) {
	        return function (date) {
	            var value = date["get" + name]();
	            if (offset > 0 || value > -offset) value += offset;
	            if (value === 0 && offset === -12) {
	                /* istanbul ignore next*/
	                value = 12;
	            }
	            return padNumber(value, size, trim);
	        };
	    }

	    function dateStrGetter(name, shortForm) {
	        return function (date, formats) {
	            var value = date["get" + name]();
	            var get = (shortForm ? "SHORT" + name : name).toUpperCase();
	            return formats[get][value];
	        };
	    }

	    function timeZoneGetter(date) {
	        var zone = -1 * date.getTimezoneOffset();
	        var paddedZone = zone >= 0 ? "+" : "";
	        paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
	        return paddedZone;
	    }
	    //取得上午下午
	    function ampmGetter(date, formats) {
	        return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
	    }
	    var DATE_FORMATS = {
	        yyyy: dateGetter("FullYear", 4),
	        yy: dateGetter("FullYear", 2, 0, true),
	        y: dateGetter("FullYear", 1),
	        MMMM: dateStrGetter("Month"),
	        MMM: dateStrGetter("Month", true),
	        MM: dateGetter("Month", 2, 1),
	        M: dateGetter("Month", 1, 1),
	        dd: dateGetter("Date", 2),
	        d: dateGetter("Date", 1),
	        HH: dateGetter("Hours", 2),
	        H: dateGetter("Hours", 1),
	        hh: dateGetter("Hours", 2, -12),
	        h: dateGetter("Hours", 1, -12),
	        mm: dateGetter("Minutes", 2),
	        m: dateGetter("Minutes", 1),
	        ss: dateGetter("Seconds", 2),
	        s: dateGetter("Seconds", 1),
	        sss: dateGetter("Milliseconds", 3),
	        EEEE: dateStrGetter("Day"),
	        EEE: dateStrGetter("Day", true),
	        a: ampmGetter,
	        Z: timeZoneGetter
	    };
	    var rdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/;
	    var raspnetjson = /^\/Date\((\d+)\)\/$/;
	    function dateFilter(date, format) {
	        var locate = dateFilter.locate,
	            text = "",
	            parts = [],
	            fn,
	            match;
	        format = format || "mediumDate";
	        format = locate[format] || format;
	        if (typeof date === "string") {
	            if (/^\d+$/.test(date)) {
	                date = toInt(date);
	            } else if (raspnetjson.test(date)) {
	                date = +RegExp.$1;
	            } else {
	                var trimDate = date.trim();
	                var dateArray = [0, 0, 0, 0, 0, 0, 0];
	                var oDate = new Date(0);
	                //取得年月日
	                trimDate = trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/, function (_, a, b, c) {
	                    var array = c.length === 4 ? [c, a, b] : [a, b, c];
	                    dateArray[0] = toInt(array[0]); //年
	                    dateArray[1] = toInt(array[1]) - 1; //月
	                    dateArray[2] = toInt(array[2]); //日
	                    return "";
	                });
	                var dateSetter = oDate.setFullYear;
	                var timeSetter = oDate.setHours;
	                trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (_, a, b, c, d) {
	                    dateArray[3] = toInt(a); //小时
	                    dateArray[4] = toInt(b); //分钟
	                    dateArray[5] = toInt(c); //秒
	                    if (d) {
	                        //毫秒
	                        dateArray[6] = Math.round(parseFloat("0." + d) * 1000);
	                    }
	                    return "";
	                });
	                var tzHour = 0;
	                var tzMin = 0;
	                trimDate = trimDate.replace(/Z|([+-])(\d\d):?(\d\d)/, function (z, symbol, c, d) {
	                    dateSetter = oDate.setUTCFullYear;
	                    timeSetter = oDate.setUTCHours;
	                    if (symbol) {
	                        tzHour = toInt(symbol + c);
	                        tzMin = toInt(symbol + d);
	                    }
	                    return '';
	                });

	                dateArray[3] -= tzHour;
	                dateArray[4] -= tzMin;
	                dateSetter.apply(oDate, dateArray.slice(0, 3));
	                timeSetter.apply(oDate, dateArray.slice(3));
	                date = oDate;
	            }
	        }
	        if (typeof date === 'number') {
	            date = new Date(date);
	        }

	        while (format) {
	            match = rdateFormat.exec(format);
	            /* istanbul ignore else */
	            if (match) {
	                parts = parts.concat(match.slice(1));
	                format = parts.pop();
	            } else {
	                parts.push(format);
	                format = null;
	            }
	        }
	        parts.forEach(function (value) {
	            fn = DATE_FORMATS[value];
	            text += fn ? fn(date, locate) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'");
	        });
	        return text;
	    }

	    var locate = {
	        AMPMS: {
	            0: '上午',
	            1: '下午'
	        },
	        DAY: {
	            0: '星期日',
	            1: '星期一',
	            2: '星期二',
	            3: '星期三',
	            4: '星期四',
	            5: '星期五',
	            6: '星期六'
	        },
	        MONTH: {
	            0: '1月',
	            1: '2月',
	            2: '3月',
	            3: '4月',
	            4: '5月',
	            5: '6月',
	            6: '7月',
	            7: '8月',
	            8: '9月',
	            9: '10月',
	            10: '11月',
	            11: '12月'
	        },
	        SHORTDAY: {
	            '0': '周日',
	            '1': '周一',
	            '2': '周二',
	            '3': '周三',
	            '4': '周四',
	            '5': '周五',
	            '6': '周六'
	        },
	        fullDate: 'y年M月d日EEEE',
	        longDate: 'y年M月d日',
	        medium: 'yyyy-M-d H:mm:ss',
	        mediumDate: 'yyyy-M-d',
	        mediumTime: 'H:mm:ss',
	        'short': 'yy-M-d ah:mm',
	        shortDate: 'yy-M-d',
	        shortTime: 'ah:mm'
	    };
	    locate.SHORTMONTH = locate.MONTH;
	    dateFilter.locate = locate;

	    /*
	    https://github.com/hufyhang/orderBy/blob/master/index.js
	    */

	    function orderBy(array, by, decend) {
	        var type = avalon.type(array);
	        if (type !== 'array' && type !== 'object') throw 'orderBy只能处理对象或数组';
	        var criteria = typeof by == 'string' ? function (el) {
	            return el && el[by];
	        } : typeof by === 'function' ? by : function (el) {
	            return el;
	        };
	        var mapping = {};
	        var temp = [];
	        var index = 0;
	        for (var key in array) {
	            if (array.hasOwnProperty(key)) {
	                var val = array[key];
	                var k = criteria(val, key);
	                if (k in mapping) {
	                    mapping[k].push(key);
	                } else {
	                    mapping[k] = [key];
	                }

	                temp.push(k);
	            }
	        }

	        temp.sort();
	        if (decend < 0) {
	            temp.reverse();
	        }
	        var _array = type === 'array';
	        var target = _array ? [] : {};
	        return recovery(target, temp, function (k) {
	            var key = mapping[k].shift();
	            if (_array) {
	                target.push(array[key]);
	            } else {
	                target[key] = array[key];
	            }
	        });
	    }
	    function filterBy(array, search) {
	        var type = avalon.type(array);
	        if (type !== 'array' && type !== 'object') throw 'filterBy只能处理对象或数组';
	        var args = avalon.slice(arguments, 2);
	        var stype = avalon.type(search);
	        if (stype === 'function') {
	            var criteria = search;
	        } else if (stype === 'string' || stype === 'number') {
	            if (search === '') {
	                return array;
	            } else {
	                var reg = new RegExp(avalon.escapeRegExp(search), 'i');
	                criteria = function criteria(el) {
	                    return reg.test(el);
	                };
	            }
	        } else {
	            return array;
	        }

	        array = convertArray(array).filter(function (el, i) {
	            return !!criteria.apply(el, [el.value, i].concat(args));
	        });

	        var isArray$$1 = type === 'array';
	        var target = isArray$$1 ? [] : {};
	        return recovery(target, array, function (el) {
	            if (isArray$$1) {
	                target.push(el.value);
	            } else {
	                target[el.key] = el.value;
	            }
	        });
	    }

	    function selectBy(data, array, defaults) {
	        if (avalon.isObject(data) && !Array.isArray(data)) {
	            var target = [];
	            return recovery(target, array, function (name) {
	                target.push(data.hasOwnProperty(name) ? data[name] : defaults ? defaults[name] : '');
	            });
	        } else {
	            return data;
	        }
	    }

	    function limitBy(input, limit, begin) {
	        var type = avalon.type(input);
	        if (type !== 'array' && type !== 'object') throw 'limitBy只能处理对象或数组';
	        //必须是数值
	        if (typeof limit !== 'number') {
	            return input;
	        }
	        //不能为NaN
	        if (limit !== limit) {
	            return input;
	        }
	        //将目标转换为数组
	        if (type === 'object') {
	            input = convertArray(input);
	        }
	        var n = input.length;
	        limit = Math.floor(Math.min(n, limit));
	        begin = typeof begin === 'number' ? begin : 0;
	        if (begin < 0) {
	            begin = Math.max(0, n + begin);
	        }
	        var data = [];
	        for (var i = begin; i < n; i++) {
	            if (data.length === limit) {
	                break;
	            }
	            data.push(input[i]);
	        }
	        var isArray$$1 = type === 'array';
	        if (isArray$$1) {
	            return data;
	        }
	        var target = {};
	        return recovery(target, data, function (el) {
	            target[el.key] = el.value;
	        });
	    }

	    function recovery(ret, array, callback) {
	        for (var i = 0, n = array.length; i < n; i++) {
	            callback(array[i]);
	        }
	        return ret;
	    }

	    //Chrome谷歌浏览器中js代码Array.sort排序的bug乱序解决办法
	    //http://www.cnblogs.com/yzeng/p/3949182.html
	    function convertArray(array) {
	        var ret = [],
	            i = 0;
	        for (var key in array) {
	            if (array.hasOwnProperty(key)) {
	                ret[i] = {
	                    oldIndex: i,
	                    value: array[key],
	                    key: key
	                };
	                i++;
	            }
	        }
	        return ret;
	    }

	    var eventFilters = {
	        stop: function stop(e) {
	            e.stopPropagation();
	            return e;
	        },
	        prevent: function prevent(e) {
	            e.preventDefault();
	            return e;
	        }
	    };
	    var keys = {
	        esc: 27,
	        tab: 9,
	        enter: 13,
	        space: 32,
	        del: 46,
	        up: 38,
	        left: 37,
	        right: 39,
	        down: 40
	    };
	    for (var name$1 in keys) {
	        (function (filter, key) {
	            eventFilters[filter] = function (e) {
	                if (e.which !== key) {
	                    e.$return = true;
	                }
	                return e;
	            };
	        })(name$1, keys[name$1]);
	    }

	    //https://github.com/teppeis/htmlspecialchars
	    function escapeFilter(str) {
	        if (str == null) return '';

	        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	    }

	    var filters = avalon.filters = {};

	    avalon.composeFilters = function () {
	        var args = arguments;
	        return function (value) {
	            for (var i = 0, arr; arr = args[i++];) {
	                var name = arr[0];
	                var filter = avalon.filters[name];
	                if (typeof filter === 'function') {
	                    arr[0] = value;
	                    try {
	                        value = filter.apply(0, arr);
	                    } catch (e) {}
	                }
	            }
	            return value;
	        };
	    };

	    avalon.escapeHtml = escapeFilter;

	    avalon.mix(filters, {
	        uppercase: function uppercase(str) {
	            return String(str).toUpperCase();
	        },
	        lowercase: function lowercase(str) {
	            return String(str).toLowerCase();
	        },
	        truncate: function truncate(str, length, end) {
	            //length，新字符串长度，truncation，新字符串的结尾的字段,返回新字符串
	            if (!str) {
	                return '';
	            }
	            str = String(str);
	            if (isNaN(length)) {
	                length = 30;
	            }
	            end = typeof end === "string" ? end : "...";
	            return str.length > length ? str.slice(0, length - end.length) + end : /* istanbul ignore else*/
	            str;
	        },

	        camelize: avalon.camelize,
	        date: dateFilter,
	        escape: escapeFilter,
	        sanitize: sanitizeFilter,
	        number: numberFilter,
	        currency: function currency(amount, symbol, fractionSize) {
	            return (symbol || '\xA5') + numberFilter(amount, isFinite(fractionSize) ? /* istanbul ignore else*/fractionSize : 2);
	        }
	    }, { filterBy: filterBy, orderBy: orderBy, selectBy: selectBy, limitBy: limitBy }, eventFilters);

	    var rcheckedType = /^(?:checkbox|radio)$/;

	    /* istanbul ignore next */
	    function fixElement(dest, src) {
	        if (dest.nodeType !== 1) {
	            return;
	        }
	        var nodeName = dest.nodeName.toLowerCase();

	        if (nodeName === "script") {
	            if (dest.text !== src.text) {
	                dest.type = "noexec";
	                dest.text = src.text;
	                dest.type = src.type || "";
	            }
	        } else if (nodeName === 'object') {
	            var params = src.childNodes;
	            if (dest.childNodes.length !== params.length) {
	                avalon.clearHTML(dest);
	                for (var i = 0, el; el = params[i++];) {
	                    dest.appendChild(el.cloneNode(true));
	                }
	            }
	        } else if (nodeName === 'input' && rcheckedType.test(src.nodeName)) {

	            dest.defaultChecked = dest.checked = src.checked;
	            if (dest.value !== src.value) {
	                dest.value = src.value;
	            }
	        } else if (nodeName === 'option') {
	            dest.defaultSelected = dest.selected = src.defaultSelected;
	        } else if (nodeName === 'input' || nodeName === 'textarea') {
	            dest.defaultValue = src.defaultValue;
	        }
	    }

	    /* istanbul ignore next */
	    function getAll(context) {
	        return typeof context.getElementsByTagName !== 'undefined' ? context.getElementsByTagName('*') : typeof context.querySelectorAll !== 'undefined' ? context.querySelectorAll('*') : [];
	    }

	    /* istanbul ignore next */
	    function fixClone(src) {
	        var target = src.cloneNode(true);
	        //http://www.myexception.cn/web/665613.html
	        // target.expando = null
	        var t = getAll(target);
	        var s = getAll(src);
	        for (var i = 0; i < s.length; i++) {
	            fixElement(t[i], s[i]);
	        }
	        return target;
	    }

	    /* istanbul ignore next */
	    function fixContains(root, el) {
	        try {
	            //IE6-8,游离于DOM树外的文本节点，访问parentNode有时会抛错
	            while (el = el.parentNode) {
	                if (el === root) return true;
	            }
	        } catch (e) {}
	        return false;
	    }

	    avalon.contains = fixContains;

	    avalon.cloneNode = function (a) {
	        return a.cloneNode(true);
	    };

	    //IE6-11的文档对象没有contains
	    /* istanbul ignore next */
	    function shimHack() {
	        if (msie < 10) {
	            avalon.cloneNode = fixClone;
	        }
	        if (!document$1.contains) {
	            document$1.contains = function (b) {
	                return fixContains(document$1, b);
	            };
	        }
	        if (avalon.modern) {
	            if (!document$1.createTextNode('x').contains) {
	                Node.prototype.contains = function (child) {
	                    //IE6-8没有Node对象
	                    return fixContains(this, child);
	                };
	            }
	        }
	        //firefox 到11时才有outerHTML
	        function fixFF(prop, cb) {
	            if (!(prop in root) && HTMLElement.prototype.__defineGetter__) {
	                HTMLElement.prototype.__defineGetter__(prop, cb);
	            }
	        }
	        fixFF('outerHTML', function () {
	            var div = document$1.createElement('div');
	            div.appendChild(this);
	            return div.innerHTML;
	        });
	        fixFF('children', function () {
	            var children = [];
	            for (var i = 0, el; el = this.childNodes[i++];) {
	                if (el.nodeType === 1) {
	                    children.push(el);
	                }
	            }
	            return children;
	        });
	        fixFF('innerText', function () {
	            //firefox45+, chrome4+ http://caniuse.com/#feat=innertext
	            return this.textContent;
	        });
	    }

	    if (inBrowser) {
	        shimHack();
	    }

	    function ClassList(node) {
	        this.node = node;
	    }

	    ClassList.prototype = {
	        toString: function toString() {
	            var node = this.node;
	            var cls = node.className;
	            var str = typeof cls === 'string' ? cls : cls.baseVal;
	            var match = str.match(rnowhite);
	            return match ? match.join(' ') : '';
	        },
	        contains: function contains(cls) {
	            return (' ' + this + ' ').indexOf(' ' + cls + ' ') > -1;
	        },
	        add: function add(cls) {
	            if (!this.contains(cls)) {
	                this.set(this + ' ' + cls);
	            }
	        },
	        remove: function remove(cls) {
	            this.set((' ' + this + ' ').replace(' ' + cls + ' ', ' '));
	        },
	        set: function set(cls) {
	            cls = cls.trim();
	            var node = this.node;
	            if (typeof node.className === 'object') {
	                //SVG元素的className是一个对象 SVGAnimatedString { baseVal='', animVal=''}，只能通过set/getAttribute操作
	                node.setAttribute('class', cls);
	            } else {
	                node.className = cls;
	            }
	            if (!cls) {
	                node.removeAttribute('class');
	            }
	            //toggle存在版本差异，因此不使用它
	        }
	    };

	    function classListFactory(node) {
	        if (!('classList' in node)) {
	            node.classList = new ClassList(node);
	        }
	        return node.classList;
	    }

	    'add,remove'.replace(rword, function (method) {
	        avalon.fn[method + 'Class'] = function (cls) {
	            var el = this[0] || {};
	            //https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/26
	            if (cls && typeof cls === 'string' && el.nodeType === 1) {
	                cls.replace(rnowhite, function (c) {
	                    classListFactory(el)[method](c);
	                });
	            }
	            return this;
	        };
	    });

	    avalon.shadowCopy(avalon.fn, {
	        hasClass: function hasClass(cls) {
	            var el = this[0] || {};
	            return el.nodeType === 1 && classListFactory(el).contains(cls);
	        },
	        toggleClass: function toggleClass(value, stateVal) {
	            var isBool = typeof stateVal === 'boolean';
	            var me = this;
	            String(value).replace(rnowhite, function (c) {
	                var state = isBool ? stateVal : !me.hasClass(c);
	                me[state ? 'addClass' : 'removeClass'](c);
	            });
	            return this;
	        }
	    });

	    var propMap = { //不规则的属性名映射
	        'accept-charset': 'acceptCharset',
	        'char': 'ch',
	        charoff: 'chOff',
	        'class': 'className',
	        'for': 'htmlFor',
	        'http-equiv': 'httpEquiv'
	    };
	    /*
	    contenteditable不是布尔属性
	    http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/
	    contenteditable=''
	    contenteditable='events'
	    contenteditable='caret'
	    contenteditable='plaintext-only'
	    contenteditable='true'
	    contenteditable='false'
	     */
	    var bools = ['autofocus,autoplay,async,allowTransparency,checked,controls', 'declare,disabled,defer,defaultChecked,defaultSelected,', 'isMap,loop,multiple,noHref,noResize,noShade', 'open,readOnly,selected'].join(',');

	    bools.replace(/\w+/g, function (name) {
	        propMap[name.toLowerCase()] = name;
	    });

	    var anomaly = ['accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan', 'dateTime,defaultValue,contentEditable,frameBorder,longDesc,maxLength,' + 'marginWidth,marginHeight,rowSpan,tabIndex,useMap,vSpace,valueType,vAlign'].join(',');

	    anomaly.replace(/\w+/g, function (name) {
	        propMap[name.toLowerCase()] = name;
	    });

	    //module.exports = propMap

	    function isVML(src) {
	        var nodeName = src.nodeName;
	        return nodeName.toLowerCase() === nodeName && !!src.scopeName && src.outerText === '';
	    }

	    var rvalidchars = /^[\],:{}\s]*$/;
	    var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
	    var rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g;
	    var rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;

	    function compactParseJSON(data) {
	        if (typeof data === 'string') {
	            data = data.trim();
	            if (data) {
	                if (rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
	                    return new Function('return ' + data)(); // jshint ignore:line
	                }
	            }
	            throw TypeError('Invalid JSON: [' + data + ']');
	        }
	        return data;
	    }

	    var rsvg = /^\[object SVG\w*Element\]$/;
	    var ramp = /&amp;/g;
	    function updateAttrs(node, attrs) {
	        for (var attrName in attrs) {
	            try {
	                var val = attrs[attrName];
	                // 处理路径属性
	                /* istanbul ignore if*/

	                //处理HTML5 data-*属性 SVG
	                if (attrName.indexOf('data-') === 0 || rsvg.test(node)) {
	                    node.setAttribute(attrName, val);
	                } else {
	                    var propName = propMap[attrName] || attrName;
	                    /* istanbul ignore if */
	                    if (typeof node[propName] === 'boolean') {
	                        if (propName === 'checked') {
	                            node.defaultChecked = !!val;
	                        }
	                        node[propName] = !!val;
	                        //布尔属性必须使用el.xxx = true|false方式设值
	                        //如果为false, IE全系列下相当于setAttribute(xxx,''),
	                        //会影响到样式,需要进一步处理
	                    }

	                    if (val === false) {
	                        //移除属性
	                        node.removeAttribute(propName);
	                        continue;
	                    }
	                    //IE6中classNamme, htmlFor等无法检测它们为内建属性　
	                    if (avalon.msie < 8 && /[A-Z]/.test(propName)) {
	                        node[propName] = val + '';
	                        continue;
	                    }
	                    //SVG只能使用setAttribute(xxx, yyy), VML只能使用node.xxx = yyy ,
	                    //HTML的固有属性必须node.xxx = yyy
	                    /* istanbul ignore next */
	                    var isInnate = !avalon.modern && isVML(node) ? true : isInnateProps(node.nodeName, attrName);
	                    if (isInnate) {
	                        if (attrName === 'href' || attrName === 'src') {
	                            /* istanbul ignore if */
	                            if (avalon.msie < 8) {
	                                val = String(val).replace(ramp, '&'); //处理IE67自动转义的问题
	                            }
	                        }
	                        node[propName] = val + '';
	                    } else {
	                        node.setAttribute(attrName, val);
	                    }
	                }
	            } catch (e) {
	                // 对象不支持此属性或方法 src https://github.com/ecomfe/zrender 
	                // 未知名称。\/n
	                // e.message大概这样,需要trim
	                //IE6-8,元素节点不支持其他元素节点的内置属性,如src, href, for
	                /* istanbul ignore next */
	                avalon.log(String(e.message).trim(), attrName, val);
	            }
	        }
	    }
	    var innateMap = {};

	    function isInnateProps(nodeName, attrName) {
	        var key = nodeName + ":" + attrName;
	        if (key in innateMap) {
	            return innateMap[key];
	        }
	        return innateMap[key] = attrName in document$1.createElement(nodeName);
	    }
	    try {
	        avalon.parseJSON = JSON.parse;
	    } catch (e) {
	        /* istanbul ignore next */
	        avalon.parseJSON = compactParseJSON;
	    }

	    avalon.fn.attr = function (name, value) {
	        if (arguments.length === 2) {
	            this[0].setAttribute(name, value);
	            return this;
	        } else {
	            return this[0].getAttribute(name);
	        }
	    };

	    var cssMap = {
	        'float': 'cssFloat'
	    };
	    avalon.cssNumber = oneObject('animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom');
	    var prefixes = ['', '-webkit-', '-o-', '-moz-', '-ms-'];
	    /* istanbul ignore next */
	    avalon.cssName = function (name, host, camelCase) {
	        if (cssMap[name]) {
	            return cssMap[name];
	        }
	        host = host || avalon.root.style || {};
	        for (var i = 0, n = prefixes.length; i < n; i++) {
	            camelCase = avalon.camelize(prefixes[i] + name);
	            if (camelCase in host) {
	                return cssMap[name] = camelCase;
	            }
	        }
	        return null;
	    };
	    /* istanbul ignore next */
	    avalon.css = function (node, name, value, fn) {
	        //读写删除元素节点的样式
	        if (node instanceof avalon) {
	            node = node[0];
	        }
	        if (node.nodeType !== 1) {
	            return;
	        }
	        var prop = avalon.camelize(name);
	        name = avalon.cssName(prop) || /* istanbul ignore next*/prop;
	        if (value === void 0 || typeof value === 'boolean') {
	            //获取样式
	            fn = cssHooks[prop + ':get'] || cssHooks['@:get'];
	            if (name === 'background') {
	                name = 'backgroundColor';
	            }
	            var val = fn(node, name);
	            return value === true ? parseFloat(val) || 0 : val;
	        } else if (value === '') {
	            //请除样式
	            node.style[name] = '';
	        } else {
	            //设置样式
	            if (value == null || value !== value) {
	                return;
	            }
	            if (isFinite(value) && !avalon.cssNumber[prop]) {
	                value += 'px';
	            }
	            fn = cssHooks[prop + ':set'] || cssHooks['@:set'];
	            fn(node, name, value);
	        }
	    };
	    /* istanbul ignore next */
	    avalon.fn.css = function (name, value) {
	        if (avalon.isPlainObject(name)) {
	            for (var i in name) {
	                avalon.css(this, i, name[i]);
	            }
	        } else {
	            var ret = avalon.css(this, name, value);
	        }
	        return ret !== void 0 ? ret : this;
	    };
	    /* istanbul ignore next */
	    avalon.fn.position = function () {
	        var offsetParent,
	            offset,
	            elem = this[0],
	            parentOffset = {
	            top: 0,
	            left: 0
	        };
	        if (!elem) {
	            return parentOffset;
	        }
	        if (this.css('position') === 'fixed') {
	            offset = elem.getBoundingClientRect();
	        } else {
	            offsetParent = this.offsetParent(); //得到真正的offsetParent
	            offset = this.offset(); // 得到正确的offsetParent
	            if (offsetParent[0].tagName !== 'HTML') {
	                parentOffset = offsetParent.offset();
	            }
	            parentOffset.top += avalon.css(offsetParent[0], 'borderTopWidth', true);
	            parentOffset.left += avalon.css(offsetParent[0], 'borderLeftWidth', true);

	            // Subtract offsetParent scroll positions
	            parentOffset.top -= offsetParent.scrollTop();
	            parentOffset.left -= offsetParent.scrollLeft();
	        }
	        return {
	            top: offset.top - parentOffset.top - avalon.css(elem, 'marginTop', true),
	            left: offset.left - parentOffset.left - avalon.css(elem, 'marginLeft', true)
	        };
	    };
	    /* istanbul ignore next */
	    avalon.fn.offsetParent = function () {
	        var offsetParent = this[0].offsetParent;
	        while (offsetParent && avalon.css(offsetParent, 'position') === 'static') {
	            offsetParent = offsetParent.offsetParent;
	        }
	        return avalon(offsetParent || avalon.root);
	    };

	    /* istanbul ignore next */
	    cssHooks['@:set'] = function (node, name, value) {
	        try {
	            //node.style.width = NaN;node.style.width = 'xxxxxxx';
	            //node.style.width = undefine 在旧式IE下会抛异常
	            node.style[name] = value;
	        } catch (e) {}
	    };
	    /* istanbul ignore next */
	    cssHooks['@:get'] = function (node, name) {
	        if (!node || !node.style) {
	            throw new Error('getComputedStyle要求传入一个节点 ' + node);
	        }
	        var ret,
	            styles = window$1.getComputedStyle(node, null);
	        if (styles) {
	            ret = name === 'filter' ? styles.getPropertyValue(name) : styles[name];
	            if (ret === '') {
	                ret = node.style[name]; //其他浏览器需要我们手动取内联样式
	            }
	        }
	        return ret;
	    };

	    cssHooks['opacity:get'] = function (node) {
	        var ret = cssHooks['@:get'](node, 'opacity');
	        return ret === '' ? '1' : ret;
	    };

	    'top,left'.replace(avalon.rword, function (name) {
	        cssHooks[name + ':get'] = function (node) {
	            var computed = cssHooks['@:get'](node, name);
	            return (/px$/.test(computed) ? computed : avalon(node).position()[name] + 'px'
	            );
	        };
	    });

	    var cssShow = {
	        position: 'absolute',
	        visibility: 'hidden',
	        display: 'block'
	    };

	    var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
	    /* istanbul ignore next */
	    function showHidden(node, array) {
	        //http://www.cnblogs.com/rubylouvre/archive/2012/10/27/2742529.html
	        if (node.offsetWidth <= 0) {
	            //opera.offsetWidth可能小于0
	            if (rdisplayswap.test(cssHooks['@:get'](node, 'display'))) {
	                var obj = {
	                    node: node
	                };
	                for (var name in cssShow) {
	                    obj[name] = node.style[name];
	                    node.style[name] = cssShow[name];
	                }
	                array.push(obj);
	            }
	            var parent = node.parentNode;
	            if (parent && parent.nodeType === 1) {
	                showHidden(parent, array);
	            }
	        }
	    }
	    /* istanbul ignore next*/
	    avalon.each({
	        Width: 'width',
	        Height: 'height'
	    }, function (name, method) {
	        var clientProp = 'client' + name,
	            scrollProp = 'scroll' + name,
	            offsetProp = 'offset' + name;
	        cssHooks[method + ':get'] = function (node, which, override) {
	            var boxSizing = -4;
	            if (typeof override === 'number') {
	                boxSizing = override;
	            }
	            which = name === 'Width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	            var ret = node[offsetProp]; // border-box 0
	            if (boxSizing === 2) {
	                // margin-box 2
	                return ret + avalon.css(node, 'margin' + which[0], true) + avalon.css(node, 'margin' + which[1], true);
	            }
	            if (boxSizing < 0) {
	                // padding-box  -2
	                ret = ret - avalon.css(node, 'border' + which[0] + 'Width', true) - avalon.css(node, 'border' + which[1] + 'Width', true);
	            }
	            if (boxSizing === -4) {
	                // content-box -4
	                ret = ret - avalon.css(node, 'padding' + which[0], true) - avalon.css(node, 'padding' + which[1], true);
	            }
	            return ret;
	        };
	        cssHooks[method + '&get'] = function (node) {
	            var hidden = [];
	            showHidden(node, hidden);
	            var val = cssHooks[method + ':get'](node);
	            for (var i = 0, obj; obj = hidden[i++];) {
	                node = obj.node;
	                for (var n in obj) {
	                    if (typeof obj[n] === 'string') {
	                        node.style[n] = obj[n];
	                    }
	                }
	            }
	            return val;
	        };
	        avalon.fn[method] = function (value) {
	            //会忽视其display
	            var node = this[0];
	            if (arguments.length === 0) {
	                if (node.setTimeout) {
	                    //取得窗口尺寸
	                    return node['inner' + name] || node.document.documentElement[clientProp] || node.document.body[clientProp]; //IE6下前两个分别为undefined,0
	                }
	                if (node.nodeType === 9) {
	                    //取得页面尺寸
	                    var doc = node.documentElement;
	                    //FF chrome    html.scrollHeight< body.scrollHeight
	                    //IE 标准模式 : html.scrollHeight> body.scrollHeight
	                    //IE 怪异模式 : html.scrollHeight 最大等于可视窗口多一点？
	                    return Math.max(node.body[scrollProp], doc[scrollProp], node.body[offsetProp], doc[offsetProp], doc[clientProp]);
	                }
	                return cssHooks[method + '&get'](node);
	            } else {
	                return this.css(method, value);
	            }
	        };
	        avalon.fn['inner' + name] = function () {
	            return cssHooks[method + ':get'](this[0], void 0, -2);
	        };
	        avalon.fn['outer' + name] = function (includeMargin) {
	            return cssHooks[method + ':get'](this[0], void 0, includeMargin === true ? 2 : 0);
	        };
	    });

	    function getWindow(node) {
	        return node.window || node.defaultView || node.parentWindow || false;
	    }

	    /* istanbul ignore if */
	    if (msie < 9) {
	        cssMap['float'] = 'styleFloat';
	        var rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i;
	        var rposition = /^(top|right|bottom|left)$/;
	        var ralpha = /alpha\([^)]+\)/i;
	        var ropactiy = /(opacity|\d(\d|\.)*)/g;
	        var ie8 = msie === 8;
	        var salpha = 'DXImageTransform.Microsoft.Alpha';
	        var border = {
	            thin: ie8 ? '1px' : '2px',
	            medium: ie8 ? '3px' : '4px',
	            thick: ie8 ? '5px' : '6px'
	        };
	        cssHooks['@:get'] = function (node, name) {
	            //取得精确值，不过它有可能是带em,pc,mm,pt,%等单位
	            var currentStyle = node.currentStyle;
	            var ret = currentStyle[name];
	            if (rnumnonpx.test(ret) && !rposition.test(ret)) {
	                //①，保存原有的style.left, runtimeStyle.left,
	                var style = node.style,
	                    left = style.left,
	                    rsLeft = node.runtimeStyle.left;
	                //②由于③处的style.left = xxx会影响到currentStyle.left，
	                //因此把它currentStyle.left放到runtimeStyle.left，
	                //runtimeStyle.left拥有最高优先级，不会style.left影响
	                node.runtimeStyle.left = currentStyle.left;
	                //③将精确值赋给到style.left，然后通过IE的另一个私有属性 style.pixelLeft
	                //得到单位为px的结果；fontSize的分支见http://bugs.jquery.com/ticket/760
	                style.left = name === 'fontSize' ? '1em' : ret || 0;
	                ret = style.pixelLeft + 'px';
	                //④还原 style.left，runtimeStyle.left
	                style.left = left;
	                node.runtimeStyle.left = rsLeft;
	            }
	            if (ret === 'medium') {
	                name = name.replace('Width', 'Style');
	                //border width 默认值为medium，即使其为0'
	                if (currentStyle[name] === 'none') {
	                    ret = '0px';
	                }
	            }
	            return ret === '' ? 'auto' : border[ret] || ret;
	        };
	        cssHooks['opacity:set'] = function (node, name, value) {
	            var style = node.style;

	            var opacity = Number(value) <= 1 ? 'alpha(opacity=' + value * 100 + ')' : '';
	            var filter = style.filter || '';
	            style.zoom = 1;
	            //不能使用以下方式设置透明度
	            //node.filters.alpha.opacity = value * 100
	            style.filter = (ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + ' ' + opacity).trim();

	            if (!style.filter) {
	                style.removeAttribute('filter');
	            }
	        };
	        cssHooks['opacity:get'] = function (node) {
	            var match = node.style.filter.match(ropactiy) || [];
	            var ret = false;
	            for (var i = 0, el; el = match[i++];) {
	                if (el === 'opacity') {
	                    ret = true;
	                } else if (ret) {
	                    return el / 100 + '';
	                }
	            }
	            return '1'; //确保返回的是字符串
	        };
	    }

	    /* istanbul ignore next */
	    avalon.fn.offset = function () {
	        //取得距离页面左右角的坐标
	        var node = this[0],
	            box = {
	            left: 0,
	            top: 0
	        };
	        if (!node || !node.tagName || !node.ownerDocument) {
	            return box;
	        }
	        var doc = node.ownerDocument;
	        var body = doc.body;
	        var root$$1 = doc.documentElement;
	        var win = doc.defaultView || doc.parentWindow;
	        if (!avalon.contains(root$$1, node)) {
	            return box;
	        }
	        //http://hkom.blog1.fc2.com/?mode=m&no=750 body的偏移量是不包含margin的
	        //我们可以通过getBoundingClientRect来获得元素相对于client的rect.
	        //http://msdn.microsoft.com/en-us/library/ms536433.aspx
	        if (node.getBoundingClientRect) {
	            box = node.getBoundingClientRect(); // BlackBerry 5, iOS 3 (original iPhone)
	        }
	        //chrome/IE6: body.scrollTop, firefox/other: root.scrollTop
	        var clientTop = root$$1.clientTop || body.clientTop,
	            clientLeft = root$$1.clientLeft || body.clientLeft,
	            scrollTop = Math.max(win.pageYOffset || 0, root$$1.scrollTop, body.scrollTop),
	            scrollLeft = Math.max(win.pageXOffset || 0, root$$1.scrollLeft, body.scrollLeft);
	        // 把滚动距离加到left,top中去。
	        // IE一些版本中会自动为HTML元素加上2px的border，我们需要去掉它
	        // http://msdn.microsoft.com/en-us/library/ms533564(VS.85).aspx
	        return {
	            top: box.top + scrollTop - clientTop,
	            left: box.left + scrollLeft - clientLeft
	        };
	    };

	    //生成avalon.fn.scrollLeft, avalon.fn.scrollTop方法
	    /* istanbul ignore next */
	    avalon.each({
	        scrollLeft: 'pageXOffset',
	        scrollTop: 'pageYOffset'
	    }, function (method, prop) {
	        avalon.fn[method] = function (val) {
	            var node = this[0] || {};
	            var win = getWindow(node);
	            var root$$1 = avalon.root;
	            var top = method === 'scrollTop';
	            if (!arguments.length) {
	                return win ? prop in win ? win[prop] : root$$1[method] : node[method];
	            } else {
	                if (win) {
	                    win.scrollTo(!top ? val : avalon(win).scrollLeft(), top ? val : avalon(win).scrollTop());
	                } else {
	                    node[method] = val;
	                }
	            }
	        };
	    });

	    function getDuplexType(elem) {
	        var ret = elem.tagName.toLowerCase();
	        if (ret === 'input') {
	            return rcheckedType.test(elem.type) ? 'checked' : elem.type;
	        }
	        return ret;
	    }

	    /**
	     * IE6/7/8中，如果option没有value值，那么将返回空字符串。
	     * IE9/Firefox/Safari/Chrome/Opera 中先取option的value值，如果没有value属性，则取option的innerText值。
	     * IE11及W3C，如果没有指定value，那么node.value默认为node.text（存在trim作），但IE9-10则是取innerHTML(没trim操作)
	     */

	    function getOption(node) {
	        if (node.hasAttribute && node.hasAttribute('value')) {
	            return node.getAttribute('value');
	        }
	        var attr = node.getAttributeNode('value');
	        if (attr && attr.specified) {
	            return attr.value;
	        }
	        return node.innerHTML.trim();
	    }

	    var valHooks = {
	        'option:get': msie ? getOption : function (node) {
	            return node.value;
	        },
	        'select:get': function selectGet(node, value) {
	            var option,
	                options = node.options,
	                index = node.selectedIndex,
	                getter = valHooks['option:get'],
	                one = node.type === 'select-one' || index < 0,
	                values = one ? null : [],
	                max = one ? index + 1 : options.length,
	                i = index < 0 ? max : one ? index : 0;
	            for (; i < max; i++) {
	                option = options[i];
	                //IE6-9在reset后不会改变selected，需要改用i === index判定
	                //我们过滤所有disabled的option元素，但在safari5下，
	                //如果设置optgroup为disable，那么其所有孩子都disable
	                //因此当一个元素为disable，需要检测其是否显式设置了disable及其父节点的disable情况
	                if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || option.parentNode.tagName !== 'OPTGROUP')) {
	                    value = getter(option);
	                    if (one) {
	                        return value;
	                    }
	                    //收集所有selected值组成数组返回
	                    values.push(value);
	                }
	            }
	            return values;
	        },
	        'select:set': function selectSet(node, values, optionSet) {
	            values = [].concat(values); //强制转换为数组
	            var getter = valHooks['option:get'];
	            for (var i = 0, el; el = node.options[i++];) {
	                if (el.selected = values.indexOf(getter(el)) > -1) {
	                    optionSet = true;
	                }
	            }
	            if (!optionSet) {
	                node.selectedIndex = -1;
	            }
	        }
	    };

	    avalon.fn.val = function (value) {
	        var node = this[0];
	        if (node && node.nodeType === 1) {
	            var get = arguments.length === 0;
	            var access = get ? ':get' : ':set';
	            var fn = valHooks[getDuplexType(node) + access];
	            if (fn) {
	                var val = fn(node, value);
	            } else if (get) {
	                return (node.value || '').replace(/\r/g, '');
	            } else {
	                node.value = value;
	            }
	        }
	        return get ? val : this;
	    };

	    /* 
	     * 将要检测的字符串的字符串替换成??123这样的格式
	     */
	    var stringNum = 0;
	    var stringPool = {
	        map: {}
	    };
	    var rfill = /\?\?\d+/g;
	    function dig(a) {
	        var key = '??' + stringNum++;
	        stringPool.map[key] = a;
	        return key + ' ';
	    }
	    function fill(a) {
	        var val = stringPool.map[a];
	        return val;
	    }
	    function clearString(str) {
	        var array = readString(str);
	        for (var i = 0, n = array.length; i < n; i++) {
	            str = str.replace(array[i], dig);
	        }
	        return str;
	    }

	    function readString(str) {
	        var end,
	            s = 0;
	        var ret = [];
	        for (var i = 0, n = str.length; i < n; i++) {
	            var c = str.charAt(i);
	            if (!end) {
	                if (c === "'") {
	                    end = "'";
	                    s = i;
	                } else if (c === '"') {
	                    end = '"';
	                    s = i;
	                }
	            } else {
	                if (c === end) {
	                    ret.push(str.slice(s, i + 1));
	                    end = false;
	                }
	            }
	        }
	        return ret;
	    }

	    var voidTag = {
	        area: 1,
	        base: 1,
	        basefont: 1,
	        bgsound: 1,
	        br: 1,
	        col: 1,
	        command: 1,
	        embed: 1,
	        frame: 1,
	        hr: 1,
	        img: 1,
	        input: 1,
	        keygen: 1,
	        link: 1,
	        meta: 1,
	        param: 1,
	        source: 1,
	        track: 1,
	        wbr: 1
	    };

	    var orphanTag = {
	        script: 1,
	        style: 1,
	        textarea: 1,
	        xmp: 1,
	        noscript: 1,
	        template: 1
	    };

	    /* 
	     *  此模块只用于文本转虚拟DOM, 
	     *  因为在真实浏览器会对我们的HTML做更多处理,
	     *  如, 添加额外属性, 改变结构
	     *  此模块就是用于模拟这些行为
	     */
	    function makeOrphan(node, nodeName, innerHTML) {
	        switch (nodeName) {
	            case 'style':
	            case 'script':
	            case 'noscript':
	            case 'template':
	            case 'xmp':
	                node.children = [{
	                    nodeName: '#text',
	                    nodeValue: innerHTML
	                }];
	                break;
	            case 'textarea':
	                var props = node.props;
	                props.type = nodeName;
	                props.value = innerHTML;
	                node.children = [{
	                    nodeName: '#text',
	                    nodeValue: innerHTML
	                }];
	                break;
	            case 'option':
	                node.children = [{
	                    nodeName: '#text',
	                    nodeValue: trimHTML(innerHTML)
	                }];
	                break;
	        }
	    }

	    //专门用于处理option标签里面的标签
	    var rtrimHTML = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi;
	    function trimHTML(v) {
	        return String(v).replace(rtrimHTML, '').trim();
	    }

	    //widget rule duplex validate

	    //如果直接将tr元素写table下面,那么浏览器将将它们(相邻的那几个),放到一个动态创建的tbody底下
	    function makeTbody(nodes) {
	        var tbody,
	            needAddTbody = false,
	            count = 0,
	            start = 0,
	            n = nodes.length;
	        for (var i = 0; i < n; i++) {
	            var node = nodes[i];
	            if (!tbody) {
	                if (node.nodeName === 'tr') {
	                    //收集tr及tr两旁的注释节点
	                    tbody = {
	                        nodeName: 'tbody',
	                        props: {},
	                        children: []
	                    };
	                    tbody.children.push(node);
	                    needAddTbody = true;
	                    if (start === 0) start = i;
	                    nodes[i] = tbody;
	                }
	            } else {
	                if (node.nodeName !== 'tr' && node.children) {
	                    tbody = false;
	                } else {
	                    tbody.children.push(node);
	                    count++;
	                    nodes[i] = 0;
	                }
	            }
	        }

	        if (needAddTbody) {
	            for (i = start; i < n; i++) {
	                if (nodes[i] === 0) {
	                    nodes.splice(i, 1);
	                    i--;
	                    count--;
	                    if (count === 0) {
	                        break;
	                    }
	                }
	            }
	        }
	    }

	    function validateDOMNesting(parent, child) {

	        var parentTag = parent.nodeName;
	        var tag = child.nodeName;
	        var parentChild = nestObject[parentTag];
	        if (parentChild) {
	            if (parentTag === 'p') {
	                if (pNestChild[tag]) {
	                    avalon.warn('P element can not  add these childlren:\n' + Object.keys(pNestChild));
	                    return false;
	                }
	            } else if (!parentChild[tag]) {
	                avalon.warn(parentTag.toUpperCase() + 'element only add these children:\n' + Object.keys(parentChild) + '\nbut you add ' + tag.toUpperCase() + ' !!');
	                return false;
	            }
	        }
	        return true;
	    }

	    function makeObject(str) {
	        return oneObject(str + ',template,#document-fragment,#comment');
	    }
	    var pNestChild = oneObject('div,ul,ol,dl,table,h1,h2,h3,h4,h5,h6,form,fieldset');
	    var tNestChild = makeObject('tr,style,script');
	    var nestObject = {
	        p: pNestChild,
	        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
	        select: makeObject('option,optgroup,#text'),
	        optgroup: makeObject('option,#text'),
	        option: makeObject('#text'),
	        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
	        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
	        // No special behavior since these rules fall back to "in body" mode for
	        // all except special table nodes which cause bad parsing behavior anyway.

	        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
	        tr: makeObject('th,td,style,script'),

	        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
	        tbody: tNestChild,
	        tfoot: tNestChild,
	        thead: tNestChild,
	        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
	        colgroup: makeObject('col'),
	        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
	        // table: oneObject('caption,colgroup,tbody,thead,tfoot,style,script,template,#document-fragment'),
	        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
	        head: makeObject('base,basefont,bgsound,link,style,script,meta,title,noscript,noframes'),
	        // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
	        html: oneObject('head,body')
	    };

	    /**
	     * ------------------------------------------------------------
	     * avalon2.1.1的新式lexer
	     * 将字符串变成一个虚拟DOM树,方便以后进一步变成模板函数
	     * 此阶段只会生成VElement,VText,VComment
	     * ------------------------------------------------------------
	     */
	    function nomalString(str) {
	        return avalon.unescapeHTML(str.replace(rfill, fill));
	    }
	    //https://github.com/rviscomi/trunk8/blob/master/trunk8.js

	    var ropenTag = /^<([-A-Za-z0-9_]+)\s*([^>]*?)(\/?)>/;
	    var rendTag = /^<\/([^>]+)>/;
	    var rtagStart = /[\!\/a-z]/i; //闭标签的第一个字符,开标签的第一个英文,注释节点的!
	    var rlineSp = /\\n\s*/g;
	    var rattrs = /([^=\s]+)(?:\s*=\s*(\S+))?/;

	    var rcontent = /\S/; //判定里面有没有内容
	    function fromString(str) {
	        return from(str);
	    }
	    avalon.lexer = fromString;

	    var strCache = new Cache(100);

	    function AST() {}
	    AST.prototype = {
	        init: function init(str) {
	            this.ret = [];
	            var stack = [];
	            stack.last = function () {
	                return stack[stack.length - 1];
	            };
	            this.stack = stack;
	            this.str = str;
	        },
	        gen: function gen() {
	            var breakIndex = 999999;
	            do {
	                this.tryGenText();
	                this.tryGenComment();
	                this.tryGenOpenTag();
	                this.tryGenCloseTag();
	                var node = this.node;
	                this.node = 0;
	                if (!node || --breakIndex === 0) {
	                    break;
	                }
	                if (node.end) {
	                    if (node.nodeName === 'table') {
	                        makeTbody(node.children);
	                    }
	                    delete node.end;
	                }
	            } while (this.str.length);
	            return this.ret;
	        },

	        fixPos: function fixPos(str, i) {
	            var tryCount = str.length - i;
	            while (tryCount--) {
	                if (!rtagStart.test(str.charAt(i + 1))) {
	                    i = str.indexOf('<', i + 1);
	                } else {
	                    break;
	                }
	            }
	            if (tryCount === 0) {
	                i = str.length;
	            }
	            return i;
	        },
	        tryGenText: function tryGenText() {
	            var str = this.str;
	            if (str.charAt(0) !== '<') {
	                //处理文本节点
	                var i = str.indexOf('<');
	                if (i === -1) {
	                    i = str.length;
	                } else if (!rtagStart.test(str.charAt(i + 1))) {
	                    //处理`内容2 {{ (idx1 < < <  1 ? 'red' : 'blue' ) + a }} ` 的情况 
	                    i = this.fixPos(str, i);
	                }
	                var nodeValue = str.slice(0, i).replace(rfill, fill);
	                this.str = str.slice(i);
	                this.node = {
	                    nodeName: '#text',
	                    nodeValue: nodeValue
	                };
	                if (rcontent.test(nodeValue)) {
	                    this.tryGenChildren(); //不收集空白节点
	                }
	            }
	        },
	        tryGenComment: function tryGenComment() {
	            if (!this.node) {
	                var str = this.str;
	                var i = str.indexOf('<!--'); //处理注释节点
	                /* istanbul ignore if*/
	                if (i === 0) {
	                    var l = str.indexOf('-->');
	                    if (l === -1) {
	                        avalon.error('注释节点没有闭合' + str);
	                    }
	                    var nodeValue = str.slice(4, l).replace(rfill, fill);
	                    this.str = str.slice(l + 3);
	                    this.node = {
	                        nodeName: '#comment',
	                        nodeValue: nodeValue
	                    };
	                    this.tryGenChildren();
	                }
	            }
	        },
	        tryGenOpenTag: function tryGenOpenTag() {
	            if (!this.node) {
	                var str = this.str;
	                var match = str.match(ropenTag); //处理元素节点开始部分
	                if (match) {
	                    var nodeName = match[1];
	                    var props = {};
	                    if (/^[A-Z]/.test(nodeName) && avalon.components[nodeName]) {
	                        props.is = nodeName;
	                    }
	                    nodeName = nodeName.toLowerCase();
	                    var isVoidTag = !!voidTag[nodeName] || match[3] === '\/';
	                    var node = this.node = {
	                        nodeName: nodeName,
	                        props: {},
	                        children: [],
	                        isVoidTag: isVoidTag
	                    };
	                    var attrs = match[2];
	                    if (attrs) {
	                        this.genProps(attrs, node.props);
	                    }
	                    this.tryGenChildren();
	                    str = str.slice(match[0].length);
	                    if (isVoidTag) {
	                        node.end = true;
	                    } else {
	                        this.stack.push(node);
	                        if (orphanTag[nodeName] || nodeName === 'option') {
	                            var index = str.indexOf('</' + nodeName + '>');
	                            var innerHTML = str.slice(0, index).trim();
	                            str = str.slice(index);
	                            makeOrphan(node, nodeName, nomalString(innerHTML));
	                        }
	                    }
	                    this.str = str;
	                }
	            }
	        },
	        tryGenCloseTag: function tryGenCloseTag() {
	            if (!this.node) {
	                var str = this.str;
	                var match = str.match(rendTag); //处理元素节点结束部分
	                if (match) {
	                    var nodeName = match[1].toLowerCase();
	                    var last = this.stack.last();
	                    /* istanbul ignore if*/
	                    if (!last) {
	                        avalon.error(match[0] + '前面缺少<' + nodeName + '>');
	                        /* istanbul ignore else*/
	                    } else if (last.nodeName !== nodeName) {
	                        var errMsg = last.nodeName + '没有闭合,请注意属性的引号';
	                        avalon.warn(errMsg);
	                        avalon.error(errMsg);
	                    }
	                    var node = this.stack.pop();
	                    node.end = true;
	                    this.node = node;
	                    this.str = str.slice(match[0].length);
	                }
	            }
	        },
	        tryGenChildren: function tryGenChildren() {
	            var node = this.node;
	            var p = this.stack.last();
	            if (p) {
	                validateDOMNesting(p, node);
	                p.children.push(node);
	            } else {
	                this.ret.push(node);
	            }
	        },
	        genProps: function genProps(attrs, props) {

	            while (attrs) {
	                var arr = rattrs.exec(attrs);

	                if (arr) {
	                    var name = arr[1];
	                    var value = arr[2] || '';
	                    attrs = attrs.replace(arr[0], '');
	                    if (value) {
	                        //https://github.com/RubyLouvre/avalon/issues/1844
	                        if (value.indexOf('??') === 0) {
	                            value = nomalString(value).replace(rlineSp, '').slice(1, -1);
	                        }
	                    }
	                    if (!(name in props)) {
	                        props[name] = value;
	                    }
	                } else {
	                    break;
	                }
	            }
	        }
	    };

	    var vdomAst = new AST();

	    function from(str) {
	        var cacheKey = str;
	        var cached = strCache.get(cacheKey);
	        if (cached) {
	            return avalon.mix(true, [], cached);
	        }
	        stringPool.map = {};
	        str = clearString(str);

	        vdomAst.init(str);
	        var ret = vdomAst.gen();
	        strCache.put(cacheKey, avalon.mix(true, [], ret));
	        return ret;
	    }

	    var rhtml = /<|&#?\w+;/;
	    var htmlCache = new Cache(128);
	    var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;

	    avalon.parseHTML = function (html) {
	        var fragment = createFragment();
	        //处理非字符串
	        if (typeof html !== 'string') {
	            return fragment;
	        }
	        //处理非HTML字符串
	        if (!rhtml.test(html)) {
	            return document$1.createTextNode(html);
	        }

	        html = html.replace(rxhtml, '<$1></$2>').trim();
	        var hasCache = htmlCache.get(html);
	        if (hasCache) {
	            return avalon.cloneNode(hasCache);
	        }
	        var vnodes = fromString(html);
	        for (var i = 0, el; el = vnodes[i++];) {
	            var child = avalon.vdom(el, 'toDOM');
	            fragment.appendChild(child);
	        }
	        if (html.length < 1024) {
	            htmlCache.put(html, fragment);
	        }
	        return fragment;
	    };

	    avalon.innerHTML = function (node, html) {
	        var parsed = avalon.parseHTML(html);
	        this.clearHTML(node);
	        node.appendChild(parsed);
	    };

	    //https://github.com/karloespiritu/escapehtmlent/blob/master/index.js
	    avalon.unescapeHTML = function (html) {
	        return String(html).replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
	    };

	    avalon.clearHTML = function (node) {
	        /* istanbul ignore next */
	        while (node.lastChild) {
	            node.removeChild(node.lastChild);
	        }
	        return node;
	    };

	    //http://www.feiesoft.com/html/events.html
	    //http://segmentfault.com/q/1010000000687977/a-1020000000688757
	    var canBubbleUp = {
	        click: true,
	        dblclick: true,
	        keydown: true,
	        keypress: true,
	        keyup: true,
	        mousedown: true,
	        mousemove: true,
	        mouseup: true,
	        mouseover: true,
	        mouseout: true,
	        wheel: true,
	        mousewheel: true,
	        input: true,
	        change: true,
	        beforeinput: true,
	        compositionstart: true,
	        compositionupdate: true,
	        compositionend: true,
	        select: true,
	        //http://blog.csdn.net/lee_magnum/article/details/17761441
	        cut: true,
	        copy: true,
	        paste: true,
	        beforecut: true,
	        beforecopy: true,
	        beforepaste: true,
	        focusin: true,
	        focusout: true,
	        DOMFocusIn: true,
	        DOMFocusOut: true,
	        DOMActivate: true,
	        dragend: true,
	        datasetchanged: true
	    };

	    /* istanbul ignore if */
	    var hackSafari = avalon.modern && document$1.ontouchstart;

	    //添加fn.bind, fn.unbind, bind, unbind
	    avalon.fn.bind = function (type, fn, phase) {
	        if (this[0]) {
	            //此方法不会链
	            return avalon.bind(this[0], type, fn, phase);
	        }
	    };

	    avalon.fn.unbind = function (type, fn, phase) {
	        if (this[0]) {
	            var args = _slice.call(arguments);
	            args.unshift(this[0]);
	            avalon.unbind.apply(0, args);
	        }
	        return this;
	    };

	    /*绑定事件*/
	    avalon.bind = function (elem, type, fn) {
	        if (elem.nodeType === 1) {
	            var value = elem.getAttribute('avalon-events') || '';
	            //如果是使用ms-on-*绑定的回调,其uuid格式为e12122324,
	            //如果是使用bind方法绑定的回调,其uuid格式为_12
	            var uuid = getShortID(fn);
	            var hook = eventHooks[type];
	            /* istanbul ignore if */
	            if (type === 'click' && hackSafari) {
	                elem.addEventListener('click', avalon.noop);
	            }
	            /* istanbul ignore if */
	            if (hook) {
	                type = hook.type || type;
	                if (hook.fix) {
	                    fn = hook.fix(elem, fn);
	                    fn.uuid = uuid;
	                }
	            }
	            var key = type + ':' + uuid;
	            avalon.eventListeners[fn.uuid] = fn;
	            /* istanbul ignore if */
	            if (value.indexOf(type + ':') === -1) {
	                //同一种事件只绑定一次
	                if (canBubbleUp[type] || avalon.modern && focusBlur[type]) {
	                    delegateEvent(type);
	                } else {
	                    avalon._nativeBind(elem, type, dispatch);
	                }
	            }
	            var keys = value.split(',');
	            /* istanbul ignore if */
	            if (keys[0] === '') {
	                keys.shift();
	            }
	            if (keys.indexOf(key) === -1) {
	                keys.push(key);
	                setEventId(elem, keys.join(','));
	                //将令牌放进avalon-events属性中
	            }
	            return fn;
	        } else {
	            /* istanbul ignore next */
	            var cb = function cb(e) {
	                fn.call(elem, new avEvent(e));
	            };

	            avalon._nativeBind(elem, type, cb);
	            return cb;
	        }
	    };

	    function setEventId(node, value) {
	        node.setAttribute('avalon-events', value);
	    }
	    /* istanbul ignore next */
	    avalon.unbind = function (elem, type, fn) {
	        if (elem.nodeType === 1) {
	            var value = elem.getAttribute('avalon-events') || '';
	            switch (arguments.length) {
	                case 1:
	                    avalon._nativeUnBind(elem, type, dispatch);
	                    elem.removeAttribute('avalon-events');
	                    break;
	                case 2:
	                    value = value.split(',').filter(function (str) {
	                        return str.indexOf(type + ':') === -1;
	                    }).join(',');
	                    setEventId(elem, value);
	                    break;
	                default:
	                    var search = type + ':' + fn.uuid;
	                    value = value.split(',').filter(function (str) {
	                        return str !== search;
	                    }).join(',');
	                    setEventId(elem, value);
	                    delete avalon.eventListeners[fn.uuid];
	                    break;
	            }
	        } else {
	            avalon._nativeUnBind(elem, type, fn);
	        }
	    };

	    var typeRegExp = {};

	    function collectHandlers(elem, type, handlers) {
	        var value = elem.getAttribute('avalon-events');
	        if (value && (elem.disabled !== true || type !== 'click')) {
	            var uuids = [];
	            var reg = typeRegExp[type] || (typeRegExp[type] = new RegExp("\\b" + type + '\\:([^,\\s]+)', 'g'));
	            value.replace(reg, function (a, b) {
	                uuids.push(b);
	                return a;
	            });
	            if (uuids.length) {
	                handlers.push({
	                    elem: elem,
	                    uuids: uuids
	                });
	            }
	        }
	        elem = elem.parentNode;
	        var g = avalon.gestureEvents || {};
	        if (elem && elem.getAttribute && (canBubbleUp[type] || g[type])) {
	            collectHandlers(elem, type, handlers);
	        }
	    }

	    var rhandleHasVm = /^e/;

	    function dispatch(event) {
	        event = new avEvent(event);
	        var type = event.type;
	        var elem = event.target;
	        var handlers = [];
	        collectHandlers(elem, type, handlers);
	        var i = 0,
	            j,
	            uuid,
	            handler;
	        while ((handler = handlers[i++]) && !event.cancelBubble) {
	            var host = event.currentTarget = handler.elem;
	            j = 0;
	            while (uuid = handler.uuids[j++]) {
	                if (event.stopImmediate) {
	                    break;
	                }
	                var fn = avalon.eventListeners[uuid];
	                if (fn) {
	                    var vm = rhandleHasVm.test(uuid) ? handler.elem._ms_context_ : 0;
	                    if (vm && vm.$hashcode === false) {
	                        return avalon.unbind(elem, type, fn);
	                    }
	                    var ret = fn.call(vm || elem, event);

	                    if (ret === false) {
	                        event.preventDefault();
	                        event.stopPropagation();
	                    }
	                }
	            }
	        }
	    }

	    var focusBlur = {
	        focus: true,
	        blur: true
	    };

	    function delegateEvent(type) {
	        var value = root.getAttribute('delegate-events') || '';
	        if (value.indexOf(type) === -1) {
	            //IE6-8会多次绑定同种类型的同一个函数,其他游览器不会
	            var arr = value.match(avalon.rword) || [];
	            arr.push(type);
	            root.setAttribute('delegate-events', arr.join(','));
	            avalon._nativeBind(root, type, dispatch, !!focusBlur[type]);
	        }
	    }

	    var eventProto = {
	        webkitMovementY: 1,
	        webkitMovementX: 1,
	        keyLocation: 1,
	        fixEvent: function fixEvent() {},
	        preventDefault: function preventDefault() {
	            var e = this.originalEvent || {};
	            e.returnValue = this.returnValue = false;
	            if (modern && e.preventDefault) {
	                e.preventDefault();
	            }
	        },
	        stopPropagation: function stopPropagation() {
	            var e = this.originalEvent || {};
	            e.cancelBubble = this.cancelBubble = true;
	            if (modern && e.stopPropagation) {
	                e.stopPropagation();
	            }
	        },
	        stopImmediatePropagation: function stopImmediatePropagation() {
	            this.stopPropagation();
	            this.stopImmediate = true;
	        },
	        toString: function toString() {
	            return '[object Event]'; //#1619
	        }
	    };

	    function avEvent(event) {
	        if (event.originalEvent) {
	            return event;
	        }
	        for (var i in event) {
	            if (!eventProto[i]) {
	                this[i] = event[i];
	            }
	        }
	        if (!this.target) {
	            this.target = event.srcElement;
	        }
	        var target = this.target;
	        this.fixEvent();
	        this.timeStamp = new Date() - 0;
	        this.originalEvent = event;
	    }
	    avEvent.prototype = eventProto;
	    //针对firefox, chrome修正mouseenter, mouseleave
	    /* istanbul ignore if */
	    if (!('onmouseenter' in root)) {
	        avalon.each({
	            mouseenter: 'mouseover',
	            mouseleave: 'mouseout'
	        }, function (origType, fixType) {
	            eventHooks[origType] = {
	                type: fixType,
	                fix: function fix(elem, fn) {
	                    return function (e) {
	                        var t = e.relatedTarget;
	                        if (!t || t !== elem && !(elem.compareDocumentPosition(t) & 16)) {
	                            delete e.type;
	                            e.type = origType;
	                            return fn.apply(this, arguments);
	                        }
	                    };
	                }
	            };
	        });
	    }
	    //针对IE9+, w3c修正animationend
	    avalon.each({
	        AnimationEvent: 'animationend',
	        WebKitAnimationEvent: 'webkitAnimationEnd'
	    }, function (construct, fixType) {
	        if (window$1[construct] && !eventHooks.animationend) {
	            eventHooks.animationend = {
	                type: fixType
	            };
	        }
	    });

	    /* istanbul ignore if */
	    if (!("onmousewheel" in document$1)) {
	        /* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
	         firefox DOMMouseScroll detail 下3 上-3
	         firefox wheel detlaY 下3 上-3
	         IE9-11 wheel deltaY 下40 上-40
	         chrome wheel deltaY 下100 上-100 */
	        var fixWheelType = document$1.onwheel !== void 0 ? 'wheel' : 'DOMMouseScroll';
	        var fixWheelDelta = fixWheelType === 'wheel' ? 'deltaY' : 'detail';
	        eventHooks.mousewheel = {
	            type: fixWheelType,
	            fix: function fix(elem, fn) {
	                return function (e) {
	                    var delta = e[fixWheelDelta] > 0 ? -120 : 120;
	                    e.wheelDelta = ~~elem._ms_wheel_ + delta;
	                    elem._ms_wheel_ = e.wheelDeltaY = e.wheelDelta;
	                    e.wheelDeltaX = 0;
	                    if (Object.defineProperty) {
	                        Object.defineProperty(e, 'type', {
	                            value: 'mousewheel'
	                        });
	                    }
	                    return fn.apply(this, arguments);
	                };
	            }
	        };
	    }

	    /* istanbul ignore if */
	    if (!modern) {
	        delete canBubbleUp.change;
	        delete canBubbleUp.select;
	    }
	    /* istanbul ignore next */
	    avalon._nativeBind = modern ? function (el, type, fn, capture) {
	        el.addEventListener(type, fn, !!capture);
	    } : function (el, type, fn) {
	        el.attachEvent('on' + type, fn);
	    };
	    /* istanbul ignore next */
	    avalon._nativeUnBind = modern ? function (el, type, fn, a) {
	        el.removeEventListener(type, fn, !!a);
	    } : function (el, type, fn) {
	        el.detachEvent('on' + type, fn);
	    };
	    /* istanbul ignore next */
	    avalon.fireDom = function (elem, type, opts) {
	        if (document$1.createEvent) {
	            var hackEvent = document$1.createEvent('Events');
	            hackEvent.initEvent(type, true, true, opts);
	            avalon.shadowCopy(hackEvent, opts);
	            elem.dispatchEvent(hackEvent);
	        } else if (root.contains(elem)) {
	            //IE6-8触发事件必须保证在DOM树中,否则报'SCRIPT16389: 未指明的错误'
	            hackEvent = document$1.createEventObject();
	            if (opts) avalon.shadowCopy(hackEvent, opts);
	            try {
	                elem.fireEvent('on' + type, hackEvent);
	            } catch (e) {
	                avalon.log('fireDom', type, 'args error');
	            }
	        }
	    };

	    var rmouseEvent = /^(?:mouse|contextmenu|drag)|click/;
	    /* istanbul ignore next */
	    avEvent.prototype.fixEvent = function () {
	        var event = this;
	        if (event.which == null && event.type.indexOf('key') === 0) {
	            event.which = event.charCode != null ? event.charCode : event.keyCode;
	        }
	        if (rmouseEvent.test(event.type) && !('pageX' in event)) {
	            var DOC = event.target.ownerDocument || document$1;
	            var box = DOC.compatMode === 'BackCompat' ? DOC.body : DOC.documentElement;
	            event.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0);
	            event.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0);
	            event.wheelDeltaY = ~~event.wheelDelta;
	            event.wheelDeltaX = 0;
	        }
	    };

	    //针对IE6-8修正input
	    /* istanbul ignore if */
	    if (!('oninput' in document$1.createElement('input'))) {
	        eventHooks.input = {
	            type: 'propertychange',
	            fix: function fix(elem, fn) {
	                return function (e) {
	                    if (e.propertyName === 'value') {
	                        e.type = 'input';
	                        return fn.apply(this, arguments);
	                    }
	                };
	            }
	        };
	    }

	    var readyList = [];

	    function fireReady(fn) {
	        avalon.isReady = true;
	        while (fn = readyList.shift()) {
	            fn(avalon);
	        }
	    }

	    avalon.ready = function (fn) {
	        readyList.push(fn);
	        if (avalon.isReady) {
	            fireReady();
	        }
	    };

	    avalon.ready(function () {
	        avalon.scan && avalon.scan(document$1.body);
	    });

	    /* istanbul ignore next */
	    function bootstrap() {
	        function doScrollCheck() {
	            try {
	                //IE下通过doScrollCheck检测DOM树是否建完
	                root.doScroll('left');
	                fireReady();
	            } catch (e) {
	                setTimeout(doScrollCheck);
	            }
	        }
	        if (document$1.readyState === 'complete') {
	            setTimeout(fireReady); //如果在domReady之外加载
	        } else if (document$1.addEventListener) {
	            document$1.addEventListener('DOMContentLoaded', fireReady, false);
	        } else if (document$1.attachEvent) {
	            //必须传入三个参数，否则在firefox4-26中报错
	            //caught exception: [Exception... "Not enough arguments"  nsresult: "0x
	            document$1.attachEvent('onreadystatechange', function () {
	                if (document$1.readyState === 'complete') {
	                    fireReady();
	                }
	            });
	            try {
	                var isTop = window$1.frameElement === null;
	            } catch (e) {}
	            if (root.doScroll && isTop && window$1.external) {
	                //fix IE iframe BUG
	                doScrollCheck();
	            }
	        }

	        avalon.bind(window$1, 'load', fireReady);
	    }
	    if (inBrowser) {
	        bootstrap();
	    }

	    /**
	     * ------------------------------------------------------------
	     *                          DOM Api
	     * shim,class,data,css,val,html,event,ready  
	     * ------------------------------------------------------------
	     */

	    function fromDOM(dom) {
	        return [from$1(dom)];
	    }

	    function from$1(node) {
	        var type = node.nodeName.toLowerCase();
	        switch (type) {
	            case '#text':
	            case '#comment':
	                return {
	                    nodeName: type,
	                    dom: node,
	                    nodeValue: node.nodeValue
	                };
	            default:
	                var props = markProps(node, node.attributes || []);
	                var vnode = {
	                    nodeName: type,
	                    dom: node,
	                    isVoidTag: !!voidTag[type],
	                    props: props
	                };
	                if (type === 'option') {
	                    //即便你设置了option.selected = true,
	                    //option.attributes也找不到selected属性
	                    props.selected = node.selected;
	                }
	                if (orphanTag[type] || type === 'option') {
	                    makeOrphan(vnode, type, node.text || node.innerHTML);
	                    if (node.childNodes.length === 1) {
	                        vnode.children[0].dom = node.firstChild;
	                    }
	                } else if (!vnode.isVoidTag) {
	                    vnode.children = [];
	                    for (var i = 0, el; el = node.childNodes[i++];) {
	                        var child = from$1(el);
	                        if (/\S/.test(child.nodeValue)) {
	                            vnode.children.push(child);
	                        }
	                    }
	                }
	                return vnode;
	        }
	    }

	    var rformElement = /input|textarea|select/i;

	    function markProps(node, attrs) {
	        var ret = {};
	        for (var i = 0, n = attrs.length; i < n; i++) {
	            var attr = attrs[i];
	            if (attr.specified) {
	                //IE6-9不会将属性名变小写,比如它会将用户的contenteditable变成contentEditable
	                ret[attr.name.toLowerCase()] = attr.value;
	            }
	        }
	        if (rformElement.test(node.nodeName)) {
	            ret.type = node.type;
	            var a = node.getAttributeNode('value');
	            if (a && /\S/.test(a.value)) {
	                //IE6,7中无法取得checkbox,radio的value
	                ret.value = a.value;
	            }
	        }
	        var style = node.style.cssText;
	        if (style) {
	            ret.style = style;
	        }
	        //类名 = 去重(静态类名+动态类名+ hover类名? + active类名)
	        if (ret.type === 'select-one') {
	            ret.selectedIndex = node.selectedIndex;
	        }
	        return ret;
	    }

	    function VText(text) {
	        this.nodeName = '#text';
	        this.nodeValue = text;
	    }

	    VText.prototype = {
	        constructor: VText,
	        toDOM: function toDOM() {
	            /* istanbul ignore if*/
	            if (this.dom) return this.dom;
	            var v = avalon._decode(this.nodeValue);
	            return this.dom = document$1.createTextNode(v);
	        },
	        toHTML: function toHTML() {
	            return this.nodeValue;
	        }
	    };

	    function VComment(text) {
	        this.nodeName = '#comment';
	        this.nodeValue = text;
	    }
	    VComment.prototype = {
	        constructor: VComment,
	        toDOM: function toDOM() {
	            if (this.dom) return this.dom;
	            return this.dom = document$1.createComment(this.nodeValue);
	        },
	        toHTML: function toHTML() {
	            return '<!--' + this.nodeValue + '-->';
	        }
	    };

	    function VElement(type, props, children, isVoidTag) {
	        this.nodeName = type;
	        this.props = props;
	        this.children = children;
	        this.isVoidTag = isVoidTag;
	    }
	    VElement.prototype = {
	        constructor: VElement,
	        toDOM: function toDOM() {
	            if (this.dom) return this.dom;
	            var dom,
	                tagName = this.nodeName;
	            if (avalon.modern && svgTags[tagName]) {
	                dom = createSVG(tagName);
	                /* istanbul ignore next*/
	            } else if (!avalon.modern && (VMLTags[tagName] || rvml.test(tagName))) {
	                dom = createVML(tagName);
	            } else {
	                dom = document$1.createElement(tagName);
	            }

	            var props = this.props || {};

	            for (var i in props) {
	                var val = props[i];
	                if (skipFalseAndFunction(val)) {
	                    /* istanbul ignore if*/
	                    if (specalAttrs[i] && avalon.msie < 8) {
	                        specalAttrs[i](dom, val);
	                    } else {
	                        dom.setAttribute(i, val + '');
	                    }
	                }
	            }
	            var c = this.children || [];
	            var template = c[0] ? c[0].nodeValue : '';
	            switch (this.nodeName) {
	                case 'script':
	                    dom.type = 'noexec';
	                    dom.text = template;
	                    try {
	                        dom.innerHTML = template;
	                    } catch (e) {}
	                    dom.type = props.type || '';
	                    break;
	                case 'noscript':
	                    dom.textContent = template;
	                case 'style':
	                case 'xmp':
	                case 'template':
	                    try {
	                        dom.innerHTML = template;
	                    } catch (e) {
	                        /* istanbul ignore next*/
	                        hackIE(dom, this.nodeName, template);
	                    }
	                    break;
	                case 'option':
	                    //IE6-8,为option添加文本子节点,不会同步到text属性中
	                    /* istanbul ignore next */
	                    if (msie < 9) dom.text = template;
	                default:
	                    /* istanbul ignore next */
	                    if (!this.isVoidTag && this.children) {
	                        this.children.forEach(function (el) {
	                            return c && dom.appendChild(avalon.vdom(c, 'toDOM'));
	                        });
	                    }
	                    break;
	            }
	            return this.dom = dom;
	        },

	        /* istanbul ignore next */

	        toHTML: function toHTML() {
	            var arr = [];
	            var props = this.props || {};
	            for (var i in props) {
	                var val = props[i];
	                if (skipFalseAndFunction(val)) {
	                    arr.push(i + '=' + avalon.quote(props[i] + ''));
	                }
	            }
	            arr = arr.length ? ' ' + arr.join(' ') : '';
	            var str = '<' + this.nodeName + arr;
	            if (this.isVoidTag) {
	                return str + '/>';
	            }
	            str += '>';
	            if (this.children) {
	                str += this.children.map(function (el) {
	                    return el ? avalon.vdom(el, 'toHTML') : '';
	                }).join('');
	            }
	            return str + '</' + this.nodeName + '>';
	        }
	    };
	    function hackIE(dom, nodeName, template) {
	        switch (nodeName) {
	            case 'style':
	                dom.setAttribute('type', 'text/css');
	                dom.styleSheet.cssText = template;
	                break;
	            case 'xmp': //IE6-8,XMP元素里面只能有文本节点,不能使用innerHTML
	            case 'noscript':
	                dom.textContent = template;
	                break;
	        }
	    }
	    function skipFalseAndFunction(a) {
	        return a !== false && Object(a) !== a;
	    }
	    /* istanbul ignore next */
	    var specalAttrs = {
	        "class": function _class(dom, val) {
	            dom.className = val;
	        },
	        style: function style(dom, val) {
	            dom.style.cssText = val;
	        },
	        type: function type(dom, val) {
	            try {
	                //textarea,button 元素在IE6,7设置 type 属性会抛错
	                dom.type = val;
	            } catch (e) {}
	        },
	        'for': function _for(dom, val) {
	            dom.setAttribute('for', val);
	            dom.htmlFor = val;
	        }
	    };

	    function createSVG(type) {
	        return document$1.createElementNS('http://www.w3.org/2000/svg', type);
	    }
	    var svgTags = avalon.oneObject('circle,defs,ellipse,image,line,' + 'path,polygon,polyline,rect,symbol,text,use,g,svg');

	    var rvml = /^\w+\:\w+/;
	    /* istanbul ignore next*/
	    function createVML(type) {
	        if (document$1.styleSheets.length < 31) {
	            document$1.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
	        } else {
	            // no more room, add to the existing one
	            // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx
	            document$1.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
	        }
	        var arr = type.split(':');
	        if (arr.length === 1) {
	            arr.unshift('v');
	        }
	        var tag = arr[1];
	        var ns = arr[0];
	        if (!document$1.namespaces[ns]) {
	            document$1.namespaces.add(ns, "urn:schemas-microsoft-com:vml");
	        }
	        return document$1.createElement('<' + ns + ':' + tag + ' class="rvml">');
	    }

	    var VMLTags = avalon.oneObject('shape,line,polyline,rect,roundrect,oval,arc,' + 'curve,background,image,shapetype,group,fill,' + 'stroke,shadow, extrusion, textbox, imagedata, textpath');

	    function VFragment(children, key, val, index) {
	        this.nodeName = '#document-fragment';
	        this.children = children;
	        this.key = key;
	        this.val = val;
	        this.index = index;
	        this.props = {};
	    }
	    VFragment.prototype = {
	        constructor: VFragment,
	        toDOM: function toDOM() {
	            if (this.dom) return this.dom;
	            var f = this.toFragment();
	            //IE6-11 docment-fragment都没有children属性 
	            this.split = f.lastChild;
	            return this.dom = f;
	        },
	        dispose: function dispose() {
	            this.toFragment();
	            this.innerRender && this.innerRender.dispose();
	            for (var i in this) {
	                this[i] = null;
	            }
	        },
	        toFragment: function toFragment() {
	            var f = createFragment();
	            this.children.forEach(function (el) {
	                return f.appendChild(avalon.vdom(el, 'toDOM'));
	            });
	            return f;
	        },
	        toHTML: function toHTML() {
	            var c = this.children;
	            return c.map(function (el) {
	                return avalon.vdom(el, 'toHTML');
	            }).join('');
	        }
	    };

	    /**
	     * 虚拟DOM的4大构造器
	     */
	    avalon.mix(avalon, {
	        VText: VText,
	        VComment: VComment,
	        VElement: VElement,
	        VFragment: VFragment
	    });

	    var constNameMap = {
	        '#text': 'VText',
	        '#document-fragment': 'VFragment',
	        '#comment': 'VComment'
	    };

	    var vdom = avalon.vdomAdaptor = avalon.vdom = function (obj, method) {
	        if (!obj) {
	            //obj在ms-for循环里面可能是null
	            return method === "toHTML" ? '' : createFragment();
	        }
	        var nodeName = obj.nodeName;
	        if (!nodeName) {
	            return new avalon.VFragment(obj)[method]();
	        }
	        var constName = constNameMap[nodeName] || 'VElement';
	        return avalon[constName].prototype[method].call(obj);
	    };

	    avalon.domize = function (a) {
	        return avalon.vdom(a, 'toDOM');
	    };

	    /**
	    $$skipArray:是系统级通用的不可监听属性
	    $skipArray: 是当前对象特有的不可监听属性
	    
	     不同点是
	     $$skipArray被hasOwnProperty后返回false
	     $skipArray被hasOwnProperty后返回true
	     */
	    var falsy;
	    var $$skipArray = {
	        $id: falsy,
	        $render: falsy,
	        $track: falsy,
	        $element: falsy,
	        $watch: falsy,
	        $fire: falsy,
	        $events: falsy,
	        $accessors: falsy,
	        $hashcode: falsy,
	        $mutations: falsy,
	        $vbthis: falsy,
	        $vbsetter: falsy
	    };

	    avalon.pendingActions = [];
	    avalon.uniqActions = {};
	    avalon.inTransaction = 0;
	    config.trackDeps = false;
	    avalon.track = function () {
	        if (config.trackDeps) {
	            avalon.log.apply(avalon, arguments);
	        }
	    };

	    /**
	     * Batch is a pseudotransaction, just for purposes of memoizing ComputedValues when nothing else does.
	     * During a batch `onBecomeUnobserved` will be called at most once per observable.
	     * Avoids unnecessary recalculations.
	     */

	    function runActions() {
	        if (avalon.isRunningActions === true || avalon.inTransaction > 0) return;
	        avalon.isRunningActions = true;
	        var tasks = avalon.pendingActions.splice(0, avalon.pendingActions.length);
	        for (var i = 0, task; task = tasks[i++];) {
	            task.update();
	            delete avalon.uniqActions[task.uuid];
	        }
	        avalon.isRunningActions = false;
	    }

	    function propagateChanged(target) {
	        var list = target.observers;
	        for (var i = 0, el; el = list[i++];) {
	            el.schedule(); //通知action, computed做它们该做的事
	        }
	    }

	    //将自己抛到市场上卖
	    function reportObserved(target) {
	        var action = avalon.trackingAction || null;
	        if (action !== null) {

	            avalon.track('征收到', target.expr);
	            action.mapIDs[target.uuid] = target;
	        }
	    }

	    var targetStack = [];

	    function collectDeps(action, getter) {
	        if (!action.observers) return;
	        var preAction = avalon.trackingAction;
	        if (preAction) {
	            targetStack.push(preAction);
	        }
	        avalon.trackingAction = action;
	        avalon.track('【action】', action.type, action.expr, '开始征收依赖项');
	        //多个observe持有同一个action
	        action.mapIDs = {}; //重新收集依赖
	        var hasError = true,
	            result;
	        try {
	            result = getter.call(action);
	            hasError = false;
	        } finally {
	            if (hasError) {
	                avalon.warn('collectDeps fail', getter + '');
	                action.mapIDs = {};
	                avalon.trackingAction = preAction;
	            } else {
	                // 确保它总是为null
	                avalon.trackingAction = targetStack.pop();
	                try {
	                    resetDeps(action);
	                } catch (e) {
	                    avalon.warn(e);
	                }
	            }
	            return result;
	        }
	    }

	    function resetDeps(action) {
	        var prev = action.observers,
	            curr = [],
	            checked = {},
	            ids = [];
	        for (var i in action.mapIDs) {
	            var dep = action.mapIDs[i];
	            if (!dep.isAction) {
	                if (!dep.observers) {
	                    //如果它已经被销毁
	                    delete action.mapIDs[i];
	                    continue;
	                }
	                ids.push(dep.uuid);
	                curr.push(dep);
	                checked[dep.uuid] = 1;
	                if (dep.lastAccessedBy === action.uuid) {
	                    continue;
	                }
	                dep.lastAccessedBy = action.uuid;
	                avalon.Array.ensure(dep.observers, action);
	            }
	        }
	        var ids = ids.sort().join(',');
	        if (ids === action.ids) {
	            return;
	        }
	        action.ids = ids;
	        if (!action.isComputed) {
	            action.observers = curr;
	        } else {
	            action.depsCount = curr.length;
	            action.deps = avalon.mix({}, action.mapIDs);
	            action.depsVersion = {};
	            for (var _i in action.mapIDs) {
	                var _dep = action.mapIDs[_i];
	                action.depsVersion[_dep.uuid] = _dep.version;
	            }
	        }

	        for (var _i2 = 0, _dep2; _dep2 = prev[_i2++];) {
	            if (!checked[_dep2.uuid]) {
	                avalon.Array.remove(_dep2.observers, action);
	            }
	        }
	    }

	    function transaction(action, thisArg, args) {
	        args = args || [];
	        var name = 'transaction ' + (action.name || action.displayName || 'noop');
	        transactionStart(name);
	        var res = action.apply(thisArg, args);
	        transactionEnd(name);
	        return res;
	    }
	    avalon.transaction = transaction;

	    function transactionStart(name) {
	        avalon.inTransaction += 1;
	    }

	    function transactionEnd(name) {
	        if (--avalon.inTransaction === 0) {
	            avalon.isRunningActions = false;
	            runActions();
	        }
	    }

	    var keyMap = avalon.oneObject("break,case,catch,continue,debugger,default,delete,do,else,false," + "finally,for,function,if,in,instanceof,new,null,return,switch,this," + "throw,true,try,typeof,var,void,while,with," + /* 关键字*/
	    "abstract,boolean,byte,char,class,const,double,enum,export,extends," + "final,float,goto,implements,import,int,interface,long,native," + "package,private,protected,public,short,static,super,synchronized," + "throws,transient,volatile");

	    var skipMap = avalon.mix({
	        Math: 1,
	        Date: 1,
	        $event: 1,
	        window: 1,
	        __vmodel__: 1,
	        avalon: 1
	    }, keyMap);

	    var rvmKey = /(^|[^\w\u00c0-\uFFFF_])(@|##)(?=[$\w])/g;
	    var ruselessSp = /\s*(\.|\|)\s*/g;
	    var rshortCircuit = /\|\|/g;
	    var brackets = /\(([^)]*)\)/;
	    var rpipeline = /\|(?=\?\?)/;
	    var rregexp = /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/g;
	    var robjectProp = /\.[\w\.\$]+/g; //对象的属性 el.xxx 中的xxx
	    var robjectKey = /(\{|\,)\s*([\$\w]+)\s*:/g; //对象的键名与冒号 {xxx:1,yyy: 2}中的xxx, yyy
	    var rfilterName = /\|(\w+)/g;
	    var rlocalVar = /[$a-zA-Z_][$a-zA-Z0-9_]*/g;

	    var exprCache = new Cache(300);

	    function addScopeForLocal(str) {
	        return str.replace(robjectProp, dig).replace(rlocalVar, function (el) {
	            if (!skipMap[el]) {
	                return "__vmodel__." + el;
	            }
	            return el;
	        });
	    }

	    function addScope(expr, type) {
	        var cacheKey = expr + ':' + type;
	        var cache = exprCache.get(cacheKey);
	        if (cache) {
	            return cache.slice(0);
	        }

	        stringPool.map = {};
	        //https://github.com/RubyLouvre/avalon/issues/1849
	        var input = expr.replace(rregexp, function (a, b) {
	            return b + dig(a.slice(b.length));
	        }); //移除所有正则
	        input = clearString(input); //移除所有字符串
	        input = input.replace(rshortCircuit, dig). //移除所有短路运算符
	        replace(ruselessSp, '$1'). //移除.|两端空白

	        replace(robjectKey, function (_, a, b) {
	            //移除所有键名
	            return a + dig(b) + ':'; //比如 ms-widget="[{is:'ms-address-wrap', $id:'address'}]"这样极端的情况 
	        }).replace(rvmKey, '$1__vmodel__.'). //转换@与##为__vmodel__
	        replace(rfilterName, function (a, b) {
	            //移除所有过滤器的名字
	            return '|' + dig(b);
	        });
	        input = addScopeForLocal(input); //在本地变量前添加__vmodel__

	        var filters = input.split(rpipeline); //根据管道符切割表达式
	        var body = filters.shift().replace(rfill, fill).trim();
	        if (/\?\?\d/.test(body)) {
	            body = body.replace(rfill, fill);
	        }
	        if (filters.length) {
	            filters = filters.map(function (filter) {
	                var bracketArgs = '';
	                filter = filter.replace(brackets, function (a, b) {
	                    if (/\S/.test(b)) {
	                        bracketArgs += ',' + b; //还原字符串,正则,短路运算符
	                    }
	                    return '';
	                });
	                var arg = '[' + avalon.quote(filter.trim()) + bracketArgs + ']';
	                return arg;
	            });
	            filters = 'avalon.composeFilters(' + filters + ')(__value__)';
	            filters = filters.replace(rfill, fill);
	        } else {
	            filters = '';
	        }
	        return exprCache.put(cacheKey, [body, filters]);
	    }
	    var rhandleName = /^__vmodel__\.[$\w\.]+$/;
	    var rfixIE678 = /__vmodel__\.([^(]+)\(([^)]*)\)/;
	    function makeHandle(body) {
	        if (rhandleName.test(body)) {
	            body = body + '($event)';
	        }
	        /* istanbul ignore if */
	        if (msie < 9) {
	            body = body.replace(rfixIE678, function (a, b, c) {
	                return '__vmodel__.' + b + '.call(__vmodel__' + (/\S/.test(c) ? ',' + c : '') + ')';
	            });
	        }
	        return body;
	    }
	    function createGetter(expr, type) {
	        var arr = addScope(expr, type),
	            body;
	        if (!arr[1]) {
	            body = arr[0];
	        } else {
	            body = arr[1].replace(/__value__\)$/, arr[0] + ')');
	        }
	        try {
	            return new Function('__vmodel__', 'return ' + body + ';');
	            /* istanbul ignore next */
	        } catch (e) {
	            avalon.log('parse getter: [', expr, body, ']error');
	            return avalon.noop;
	        }
	    }

	    /**
	     * 生成表达式设值函数
	     * @param  {String}  expr
	     */
	    function createSetter(expr, type) {
	        var arr = addScope(expr, type);
	        var body = 'try{ ' + arr[0] + ' = __value__}catch(e){}';
	        try {
	            return new Function('__vmodel__', '__value__', body + ';');
	            /* istanbul ignore next */
	        } catch (e) {
	            avalon.log('parse setter: ', expr, ' error');
	            return avalon.noop;
	        }
	    }

	    var actionUUID = 1;
	    //需要重构
	    function Action(vm, options, callback) {
	        for (var i in options) {
	            if (protectedMenbers[i] !== 1) {
	                this[i] = options[i];
	            }
	        }

	        this.vm = vm;
	        this.observers = [];
	        this.callback = callback;
	        this.uuid = ++actionUUID;
	        this.ids = '';
	        this.mapIDs = {}; //这个用于去重
	        this.isAction = true;
	        var expr = this.expr;
	        // 缓存取值函数
	        if (typeof this.getter !== 'function') {
	            this.getter = createGetter(expr, this.type);
	        }
	        // 缓存设值函数（双向数据绑定）
	        if (this.type === 'duplex') {
	            this.setter = createSetter(expr, this.type);
	        }
	        // 缓存表达式旧值
	        this.value = NaN;
	        // 表达式初始值 & 提取依赖
	        if (!this.node) {
	            this.value = this.get();
	        }
	    }

	    Action.prototype = {
	        getValue: function getValue() {
	            var scope = this.vm;
	            try {
	                return this.getter.call(scope, scope);
	            } catch (e) {
	                avalon.log(this.getter + ' exec error');
	            }
	        },
	        setValue: function setValue(value) {
	            var scope = this.vm;
	            if (this.setter) {
	                this.setter.call(scope, scope, value);
	            }
	        },


	        // get --> getValue --> getter
	        get: function get(fn) {
	            var name = 'action track ' + this.type;

	            if (this.deep) {
	                avalon.deepCollect = true;
	            }

	            var value = collectDeps(this, this.getValue);
	            if (this.deep && avalon.deepCollect) {
	                avalon.deepCollect = false;
	            }

	            return value;
	        },


	        /**
	         * 在更新视图前保存原有的value
	         */
	        beforeUpdate: function beforeUpdate() {
	            var v = this.value;
	            return this.oldValue = v && v.$events ? v.$model : v;
	        },
	        update: function update(args, uuid) {
	            var oldVal = this.beforeUpdate();
	            var newVal = this.value = this.get();
	            var callback = this.callback;
	            if (callback && this.diff(newVal, oldVal, args)) {
	                callback.call(this.vm, this.value, oldVal, this.expr);
	            }
	            this._isScheduled = false;
	        },
	        schedule: function schedule() {
	            if (!this._isScheduled) {
	                this._isScheduled = true;
	                if (!avalon.uniqActions[this.uuid]) {
	                    avalon.uniqActions[this.uuid] = 1;
	                    avalon.pendingActions.push(this);
	                }

	                runActions(); //这里会还原_isScheduled

	            }
	        },
	        removeDepends: function removeDepends() {
	            var self = this;
	            this.observers.forEach(function (depend) {
	                avalon.Array.remove(depend.observers, self);
	            });
	        },


	        /**
	         * 比较两个计算值是否,一致,在for, class等能复杂数据类型的指令中,它们会重写diff复法
	         */
	        diff: function diff(a, b) {
	            return a !== b;
	        },


	        /**
	         * 销毁指令
	         */
	        dispose: function dispose() {
	            this.value = null;
	            this.removeDepends();
	            if (this.beforeDispose) {
	                this.beforeDispose();
	            }
	            for (var i in this) {
	                delete this[i];
	            }
	        }
	    };

	    var protectedMenbers = {
	        vm: 1,
	        callback: 1,

	        observers: 1,
	        oldValue: 1,
	        value: 1,
	        getValue: 1,
	        setValue: 1,
	        get: 1,

	        removeDepends: 1,
	        beforeUpdate: 1,
	        update: 1,
	        //diff
	        //getter
	        //setter
	        //expr
	        //vdom
	        //type: "for"
	        //name: "ms-for"
	        //attrName: ":for"
	        //param: "click"
	        //beforeDispose
	        dispose: 1
	    };

	    /**
	    * 
	     与Computed等共享UUID
	    */
	    var obid = 1;
	    function Mutation(expr, value, vm) {
	        //构造函数
	        this.expr = expr;
	        if (value) {
	            var childVm = platform.createProxy(value, this);
	            if (childVm) {
	                value = childVm;
	            }
	        }
	        this.value = value;
	        this.vm = vm;
	        try {
	            vm.$mutations[expr] = this;
	        } catch (ignoreIE) {}
	        this.uuid = ++obid;
	        this.updateVersion();
	        this.mapIDs = {};
	        this.observers = [];
	    }

	    Mutation.prototype = {
	        get: function get() {
	            if (avalon.trackingAction) {
	                this.collect(); //被收集
	                var childOb = this.value;
	                if (childOb && childOb.$events) {
	                    if (Array.isArray(childOb)) {
	                        childOb.forEach(function (item) {
	                            if (item && item.$events) {
	                                item.$events.__dep__.collect();
	                            }
	                        });
	                    } else if (avalon.deepCollect) {
	                        for (var key in childOb) {
	                            if (childOb.hasOwnProperty(key)) {
	                                var collectIt = childOb[key];
	                            }
	                        }
	                    }
	                }
	            }
	            return this.value;
	        },
	        collect: function collect() {
	            avalon.track(name, '被收集');
	            reportObserved(this);
	        },
	        updateVersion: function updateVersion() {
	            this.version = Math.random() + Math.random();
	        },
	        notify: function notify() {
	            transactionStart();
	            propagateChanged(this);
	            transactionEnd();
	        },
	        set: function set(newValue) {
	            var oldValue = this.value;
	            if (newValue !== oldValue) {
	                if (avalon.isObject(newValue)) {
	                    var hash = oldValue && oldValue.$hashcode;
	                    var childVM = platform.createProxy(newValue, this);
	                    if (childVM) {
	                        if (hash) {
	                            childVM.$hashcode = hash;
	                        }
	                        newValue = childVM;
	                    }
	                }
	                this.value = newValue;
	                this.updateVersion();
	                this.notify();
	            }
	        }
	    };

	    function getBody(fn) {
	        var entire = fn.toString();
	        return entire.substring(entire.indexOf('{}') + 1, entire.lastIndexOf('}'));
	    }
	    //如果不存在三目,if,方法
	    var instability = /(\?|if\b|\(.+\))/;

	    function __create(o) {
	        var __ = function __() {};
	        __.prototype = o;
	        return new __();
	    }

	    function __extends(child, parent) {
	        if (typeof parent === 'function') {
	            var proto = child.prototype = __create(parent.prototype);
	            proto.constructor = child;
	        }
	    }
	    var Computed = function (_super) {
	        __extends(Computed, _super);

	        function Computed(name, options, vm) {
	            //构造函数
	            _super.call(this, name, undefined, vm);
	            delete options.get;
	            delete options.set;

	            avalon.mix(this, options);
	            this.deps = {};
	            this.type = 'computed';
	            this.depsVersion = {};
	            this.isComputed = true;
	            this.trackAndCompute();
	            if (!('isStable' in this)) {
	                this.isStable = !instability.test(getBody(this.getter));
	            }
	        }
	        var cp = Computed.prototype;
	        cp.trackAndCompute = function () {
	            if (this.isStable && this.depsCount > 0) {
	                this.getValue();
	            } else {
	                collectDeps(this, this.getValue.bind(this));
	            }
	        };

	        cp.getValue = function () {
	            return this.value = this.getter.call(this.vm);
	        };

	        cp.schedule = function () {
	            var observers = this.observers;
	            var i = observers.length;
	            while (i--) {
	                var d = observers[i];
	                if (d.schedule) {
	                    d.schedule();
	                }
	            }
	        };

	        cp.shouldCompute = function () {
	            if (this.isStable) {
	                //如果变动因子确定,那么只比较变动因子的版本
	                var toComputed = false;
	                for (var i in this.deps) {
	                    if (this.deps[i].version !== this.depsVersion[i]) {
	                        toComputed = true;
	                        this.deps[i].version = this.depsVersion[i];
	                    }
	                }
	                return toComputed;
	            }
	            return true;
	        };
	        cp.set = function () {
	            if (this.setter) {
	                avalon.transaction(this.setter, this.vm, arguments);
	            }
	        };
	        cp.get = function () {

	            //当被设置了就不稳定,当它被访问了一次就是稳定
	            this.collect();

	            if (this.shouldCompute()) {
	                this.trackAndCompute();
	                // console.log('computed 2 分支')
	                this.updateVersion();
	                //  this.reportChanged()
	            }

	            //下面这一行好像没用
	            return this.value;
	        };
	        return Computed;
	    }(Mutation);

	    /**
	     * 这里放置ViewModel模块的共用方法
	     * avalon.define: 全框架最重要的方法,生成用户VM
	     * IProxy, 基本用户数据产生的一个数据对象,基于$model与vmodel之间的形态
	     * modelFactory: 生成用户VM
	     * canHijack: 判定此属性是否该被劫持,加入数据监听与分发的的逻辑
	     * createProxy: listFactory与modelFactory的封装
	     * createAccessor: 实现数据监听与分发的重要对象
	     * itemFactory: ms-for循环中产生的代理VM的生成工厂
	     * fuseFactory: 两个ms-controller间产生的代理VM的生成工厂
	     */

	    avalon.define = function (definition) {
	        var $id = definition.$id;
	        if (!$id) {
	            avalon.error('vm.$id must be specified');
	        }
	        if (avalon.vmodels[$id]) {
	            avalon.warn('error:[' + $id + '] had defined!');
	        }
	        var vm = platform.modelFactory(definition);
	        return avalon.vmodels[$id] = vm;
	    };

	    /**
	     * 在末来的版本,avalon改用Proxy来创建VM,因此
	     */

	    function IProxy(definition, dd) {
	        avalon.mix(this, definition);
	        avalon.mix(this, $$skipArray);
	        this.$hashcode = avalon.makeHashCode('$');
	        this.$id = this.$id || this.$hashcode;
	        this.$events = {
	            __dep__: dd || new Mutation(this.$id)
	        };
	        if (avalon.config.inProxyMode) {
	            delete this.$mutations;
	            this.$accessors = {};
	            this.$computed = {};
	            this.$track = '';
	        } else {
	            this.$accessors = {
	                $model: modelAccessor
	            };
	        }
	        if (dd === void 0) {
	            this.$watch = platform.watchFactory(this.$events);
	            this.$fire = platform.fireFactory(this.$events);
	        } else {
	            delete this.$watch;
	            delete this.$fire;
	        }
	    }

	    platform.modelFactory = function modelFactory(definition, dd) {
	        var $computed = definition.$computed || {};
	        delete definition.$computed;
	        var core = new IProxy(definition, dd);
	        var $accessors = core.$accessors;
	        var keys = [];

	        platform.hideProperty(core, '$mutations', {});

	        for (var key in definition) {
	            if (key in $$skipArray) continue;
	            var val = definition[key];
	            keys.push(key);
	            if (canHijack(key, val)) {
	                $accessors[key] = createAccessor(key, val);
	            }
	        }
	        for (var _key in $computed) {
	            if (_key in $$skipArray) continue;
	            var val = $computed[_key];
	            if (typeof val === 'function') {
	                val = {
	                    get: val
	                };
	            }
	            if (val && val.get) {
	                val.getter = val.get;
	                val.setter = val.set;
	                avalon.Array.ensure(keys, _key);
	                $accessors[_key] = createAccessor(_key, val, true);
	            }
	        }
	        //将系统API以unenumerable形式加入vm,
	        //添加用户的其他不可监听属性或方法
	        //重写$track
	        //并在IE6-8中增添加不存在的hasOwnPropert方法
	        var vm = platform.createViewModel(core, $accessors, core);
	        platform.afterCreate(vm, core, keys, !dd);
	        return vm;
	    };
	    var $proxyItemBackdoorMap = {};

	    function canHijack(key, val, $proxyItemBackdoor) {
	        if (key in $$skipArray) return false;
	        if (key.charAt(0) === '$') {
	            if ($proxyItemBackdoor) {
	                if (!$proxyItemBackdoorMap[key]) {
	                    $proxyItemBackdoorMap[key] = 1;
	                    avalon.warn('ms-for\u4E2D\u7684\u53D8\u91CF' + key + '\u4E0D\u518D\u5EFA\u8BAE\u4EE5$\u4E3A\u524D\u7F00');
	                }
	                return true;
	            }
	            return false;
	        }
	        if (val == null) {
	            avalon.warn('定义vmodel时' + key + '的属性值不能为null undefine');
	            return true;
	        }
	        if (/error|date|function|regexp/.test(avalon.type(val))) {
	            return false;
	        }
	        return !(val && val.nodeName && val.nodeType);
	    }

	    function createProxy(target, dd) {
	        if (target && target.$events) {
	            return target;
	        }
	        var vm;
	        if (Array.isArray(target)) {
	            vm = platform.listFactory(target, false, dd);
	        } else if (isObject(target)) {
	            vm = platform.modelFactory(target, dd);
	        }
	        return vm;
	    }

	    platform.createProxy = createProxy;

	    platform.itemFactory = function itemFactory(before, after) {
	        var keyMap = before.$model;
	        var core = new IProxy(keyMap);
	        var state = avalon.shadowCopy(core.$accessors, before.$accessors); //防止互相污染
	        var data = after.data;
	        //core是包含系统属性的对象
	        //keyMap是不包含系统属性的对象, keys
	        for (var key in data) {
	            var val = keyMap[key] = core[key] = data[key];
	            state[key] = createAccessor(key, val);
	        }
	        var keys = Object.keys(keyMap);
	        var vm = platform.createViewModel(core, state, core);
	        platform.afterCreate(vm, core, keys);
	        return vm;
	    };

	    function createAccessor(key, val, isComputed) {
	        var mutation = null;
	        var Accessor = isComputed ? Computed : Mutation;
	        return {
	            get: function Getter() {
	                if (!mutation) {
	                    mutation = new Accessor(key, val, this);
	                }
	                return mutation.get();
	            },
	            set: function Setter(newValue) {
	                if (!mutation) {
	                    mutation = new Accessor(key, val, this);
	                }
	                mutation.set(newValue);
	            },
	            enumerable: true,
	            configurable: true
	        };
	    }

	    platform.fuseFactory = function fuseFactory(before, after) {
	        var keyMap = avalon.mix(before.$model, after.$model);
	        var core = new IProxy(avalon.mix(keyMap, {
	            $id: before.$id + after.$id
	        }));
	        var state = avalon.mix(core.$accessors, before.$accessors, after.$accessors); //防止互相污染

	        var keys = Object.keys(keyMap);
	        //将系统API以unenumerable形式加入vm,并在IE6-8中添加hasOwnPropert方法
	        var vm = platform.createViewModel(core, state, core);
	        platform.afterCreate(vm, core, keys, false);
	        return vm;
	    };

	    function toJson(val) {
	        var xtype = avalon.type(val);
	        if (xtype === 'array') {
	            var array = [];
	            for (var i = 0; i < val.length; i++) {
	                array[i] = toJson(val[i]);
	            }
	            return array;
	        } else if (xtype === 'object') {
	            if (typeof val.$track === 'string') {
	                var obj = {};
	                var arr = val.$track.match(/[^☥]+/g) || [];
	                arr.forEach(function (i) {
	                    var value = val[i];
	                    obj[i] = value && value.$events ? toJson(value) : value;
	                });
	                return obj;
	            }
	        }
	        return val;
	    }

	    var modelAccessor = {
	        get: function get() {
	            return toJson(this);
	        },
	        set: avalon.noop,
	        enumerable: false,
	        configurable: true
	    };

	    platform.toJson = toJson;
	    platform.modelAccessor = modelAccessor;

	    var _splice = ap.splice;
	    var __array__ = {
	        set: function set(index, val) {
	            if (index >>> 0 === index && this[index] !== val) {
	                if (index > this.length) {
	                    throw Error(index + 'set方法的第一个参数不能大于原数组长度');
	                }
	                this.splice(index, 1, val);
	            }
	        },
	        toJSON: function toJSON() {
	            //为了解决IE6-8的解决,通过此方法显式地求取数组的$model
	            return this.$model = platform.toJson(this);
	        },
	        contains: function contains(el) {
	            //判定是否包含
	            return this.indexOf(el) !== -1;
	        },
	        ensure: function ensure(el) {
	            if (!this.contains(el)) {
	                //只有不存在才push
	                this.push(el);
	                return true;
	            }
	            return false;
	        },
	        pushArray: function pushArray(arr) {
	            return this.push.apply(this, arr);
	        },
	        remove: function remove(el) {
	            //移除第一个等于给定值的元素
	            return this.removeAt(this.indexOf(el));
	        },
	        removeAt: function removeAt(index) {
	            //移除指定索引上的元素
	            if (index >>> 0 === index) {
	                return this.splice(index, 1);
	            }
	            return [];
	        },
	        clear: function clear() {
	            this.removeAll();
	            return this;
	        },
	        removeAll: function removeAll(all) {
	            //移除N个元素
	            var size = this.length;
	            var eliminate = Array.isArray(all) ? function (el) {
	                return all.indexOf(el) !== -1;
	            } : typeof all === 'function' ? all : false;

	            if (eliminate) {
	                for (var i = this.length - 1; i >= 0; i--) {
	                    if (eliminate(this[i], i)) {
	                        _splice.call(this, i, 1);
	                    }
	                }
	            } else {
	                _splice.call(this, 0, this.length);
	            }
	            this.toJSON();
	            this.$events.__dep__.notify();
	        }
	    };
	    function hijackMethods(array) {
	        for (var i in __array__) {
	            platform.hideProperty(array, i, __array__[i]);
	        }
	    }
	    var __method__ = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

	    __method__.forEach(function (method) {
	        var original = ap[method];
	        __array__[method] = function () {
	            // 继续尝试劫持数组元素的属性
	            var core = this.$events;

	            var args = platform.listFactory(arguments, true, core.__dep__);
	            var result = original.apply(this, args);

	            this.toJSON();
	            core.__dep__.notify(method);
	            return result;
	        };
	    });

	    function listFactory(array, stop, dd) {
	        if (!stop) {
	            hijackMethods(array);
	            if (modern) {
	                Object.defineProperty(array, '$model', platform.modelAccessor);
	            }
	            platform.hideProperty(array, '$hashcode', avalon.makeHashCode('$'));
	            platform.hideProperty(array, '$events', { __dep__: dd || new Mutation() });
	        }
	        var _dd = array.$events && array.$events.__dep__;
	        for (var i = 0, n = array.length; i < n; i++) {
	            var item = array[i];
	            if (isObject(item)) {
	                array[i] = platform.createProxy(item, _dd);
	            }
	        }
	        return array;
	    }

	    platform.listFactory = listFactory;

	    //如果浏览器不支持ecma262v5的Object.defineProperties或者存在BUG，比如IE8
	    //标准浏览器使用__defineGetter__, __defineSetter__实现
	    var canHideProperty = true;
	    try {
	        Object.defineProperty({}, '_', {
	            value: 'x'
	        });
	        delete $$skipArray.$vbsetter;
	        delete $$skipArray.$vbthis;
	    } catch (e) {
	        /* istanbul ignore next*/
	        canHideProperty = false;
	    }

	    var protectedVB = { $vbthis: 1, $vbsetter: 1 };
	    /* istanbul ignore next */
	    function hideProperty(host, name, value) {
	        if (canHideProperty) {
	            Object.defineProperty(host, name, {
	                value: value,
	                writable: true,
	                enumerable: false,
	                configurable: true
	            });
	        } else if (!protectedVB[name]) {
	            /* istanbul ignore next */
	            host[name] = value;
	        }
	    }

	    function watchFactory(core) {
	        return function $watch(expr, callback, deep) {
	            var w = new Action(core.__proxy__, {
	                deep: deep,
	                type: 'user',
	                expr: expr
	            }, callback);
	            if (!core[expr]) {
	                core[expr] = [w];
	            } else {
	                core[expr].push(w);
	            }

	            return function () {
	                w.dispose();
	                avalon.Array.remove(core[expr], w);
	                if (core[expr].length === 0) {
	                    delete core[expr];
	                }
	            };
	        };
	    }

	    function fireFactory(core) {
	        return function $fire(expr, a) {
	            var list = core[expr];
	            if (Array.isArray(list)) {
	                for (var i = 0, w; w = list[i++];) {
	                    w.callback.call(w.vm, a, w.value, w.expr);
	                }
	            }
	        };
	    }

	    function wrapIt(str) {
	        return '☥' + str + '☥';
	    }

	    function afterCreate(vm, core, keys, bindThis) {
	        var ac = vm.$accessors;
	        //隐藏系统属性
	        for (var key in $$skipArray) {
	            if (avalon.msie < 9 && core[key] === void 0) continue;
	            hideProperty(vm, key, core[key]);
	        }
	        //为不可监听的属性或方法赋值
	        for (var i = 0; i < keys.length; i++) {
	            var _key2 = keys[i];
	            if (!(_key2 in ac)) {
	                if (bindThis && typeof core[_key2] === 'function') {
	                    vm[_key2] = core[_key2].bind(vm);
	                    continue;
	                }
	                vm[_key2] = core[_key2];
	            }
	        }
	        vm.$track = keys.join('☥');

	        function hasOwnKey(key) {
	            return wrapIt(vm.$track).indexOf(wrapIt(key)) > -1;
	        }
	        if (avalon.msie < 9) {
	            vm.hasOwnProperty = hasOwnKey;
	        }
	        vm.$events.__proxy__ = vm;
	    }

	    platform.hideProperty = hideProperty;
	    platform.fireFactory = fireFactory;
	    platform.watchFactory = watchFactory;
	    platform.afterCreate = afterCreate;

	    var createViewModel = Object.defineProperties;
	    var defineProperty;

	    var timeBucket = new Date() - 0;
	    /* istanbul ignore if*/
	    if (!canHideProperty) {
	        if ('__defineGetter__' in avalon) {
	            defineProperty = function defineProperty(obj, prop, desc) {
	                if ('value' in desc) {
	                    obj[prop] = desc.value;
	                }
	                if ('get' in desc) {
	                    obj.__defineGetter__(prop, desc.get);
	                }
	                if ('set' in desc) {
	                    obj.__defineSetter__(prop, desc.set);
	                }
	                return obj;
	            };
	            createViewModel = function createViewModel(obj, descs) {
	                for (var prop in descs) {
	                    if (descs.hasOwnProperty(prop)) {
	                        defineProperty(obj, prop, descs[prop]);
	                    }
	                }
	                return obj;
	            };
	        }
	        /* istanbul ignore if*/
	        if (msie < 9) {
	            var VBClassPool = {};
	            window.execScript([// jshint ignore:line
	            'Function parseVB(code)', '\tExecuteGlobal(code)', 'End Function' //转换一段文本为VB代码
	            ].join('\n'), 'VBScript');

	            var VBMediator = function VBMediator(instance, accessors, name, value) {
	                // jshint ignore:line
	                var accessor = accessors[name];
	                if (arguments.length === 4) {
	                    accessor.set.call(instance, value);
	                } else {
	                    return accessor.get.call(instance);
	                }
	            };
	            createViewModel = function createViewModel(name, accessors, properties) {
	                // jshint ignore:line
	                var buffer = [];
	                buffer.push('\tPrivate [$vbsetter]', '\tPublic  [$accessors]', '\tPublic Default Function [$vbthis](ac' + timeBucket + ', s' + timeBucket + ')', '\t\tSet  [$accessors] = ac' + timeBucket + ': set [$vbsetter] = s' + timeBucket, '\t\tSet  [$vbthis]    = Me', //链式调用
	                '\tEnd Function');
	                //添加普通属性,因为VBScript对象不能像JS那样随意增删属性，必须在这里预先定义好
	                var uniq = {
	                    $vbthis: true,
	                    $vbsetter: true,
	                    $accessors: true
	                };
	                for (name in $$skipArray) {
	                    if (!uniq[name]) {
	                        buffer.push('\tPublic [' + name + ']');
	                        uniq[name] = true;
	                    }
	                }
	                //添加访问器属性 
	                for (name in accessors) {
	                    if (uniq[name]) {
	                        continue;
	                    }
	                    uniq[name] = true;
	                    buffer.push(
	                    //由于不知对方会传入什么,因此set, let都用上
	                    '\tPublic Property Let [' + name + '](val' + timeBucket + ')', //setter
	                    '\t\tCall [$vbsetter](Me, [$accessors], "' + name + '", val' + timeBucket + ')', '\tEnd Property', '\tPublic Property Set [' + name + '](val' + timeBucket + ')', //setter
	                    '\t\tCall [$vbsetter](Me, [$accessors], "' + name + '", val' + timeBucket + ')', '\tEnd Property', '\tPublic Property Get [' + name + ']', //getter
	                    '\tOn Error Resume Next', //必须优先使用set语句,否则它会误将数组当字符串返回
	                    '\t\tSet[' + name + '] = [$vbsetter](Me, [$accessors],"' + name + '")', '\tIf Err.Number <> 0 Then', '\t\t[' + name + '] = [$vbsetter](Me, [$accessors],"' + name + '")', '\tEnd If', '\tOn Error Goto 0', '\tEnd Property');
	                }

	                for (name in properties) {
	                    if (!uniq[name]) {
	                        uniq[name] = true;
	                        buffer.push('\tPublic [' + name + ']');
	                    }
	                }

	                buffer.push('\tPublic [hasOwnProperty]');
	                buffer.push('End Class');
	                var body = buffer.join('\r\n');
	                var className = VBClassPool[body];
	                if (!className) {
	                    className = avalon.makeHashCode('VBClass');
	                    window.parseVB('Class ' + className + body);
	                    window.parseVB(['Function ' + className + 'Factory(acc, vbm)', //创建实例并传入两个关键的参数
	                    '\tDim o', '\tSet o = (New ' + className + ')(acc, vbm)', '\tSet ' + className + 'Factory = o', 'End Function'].join('\r\n'));
	                    VBClassPool[body] = className;
	                }
	                var ret = window[className + 'Factory'](accessors, VBMediator); //得到其产品
	                return ret; //得到其产品
	            };
	        }
	    }

	    platform.createViewModel = createViewModel;

	    var impDir = avalon.directive('important', {
	        priority: 1,
	        getScope: function getScope(name, scope) {
	            var v = avalon.vmodels[name];
	            if (v) return v;
	            throw 'error! no vmodel called ' + name;
	        },
	        update: function update(node, attrName, $id) {
	            if (!avalon.inBrowser) return;
	            var dom = avalon.vdom(node, 'toDOM');
	            if (dom.nodeType === 1) {
	                dom.removeAttribute(attrName);
	                avalon(dom).removeClass('ms-controller');
	            }
	            var vm = avalon.vmodels[$id];
	            if (vm) {
	                vm.$element = dom;
	                vm.$render = this;
	                vm.$fire('onReady');
	                delete vm.$events.onReady;
	            }
	        }
	    });

	    var impCb = impDir.update;

	    avalon.directive('controller', {
	        priority: 2,
	        getScope: function getScope(name, scope) {
	            var v = avalon.vmodels[name];
	            if (v) {
	                v.$render = this;
	                if (scope && scope !== v) {
	                    return platform.fuseFactory(scope, v);
	                }
	                return v;
	            }
	            return scope;
	        },
	        update: impCb
	    });

	    avalon.directive('skip', {
	        delay: true
	    });

	    var arrayWarn = {};
	    var cssDir = avalon.directive('css', {
	        diff: function diff(newVal, oldVal) {
	            if (Object(newVal) === newVal) {
	                newVal = platform.toJson(newVal); //安全的遍历VBscript
	                if (Array.isArray(newVal)) {
	                    //转换成对象
	                    var b = {};
	                    newVal.forEach(function (el) {
	                        el && avalon.shadowCopy(b, el);
	                    });
	                    newVal = b;
	                    if (!arrayWarn[this.type]) {
	                        avalon.warn('ms-' + this.type + '指令的值不建议使用数组形式了！');
	                        arrayWarn[this.type] = 1;
	                    }
	                }

	                var hasChange = false;
	                var patch = {};
	                if (!oldVal) {
	                    //如果一开始为空
	                    patch = newVal;
	                    hasChange = true;
	                } else {
	                    if (this.deep) {
	                        var deep = typeof this.deep === 'number' ? this.deep : 6;
	                        for (var i in newVal) {
	                            //diff差异点  
	                            if (!deepEquals(newVal[i], oldVal[i], 4)) {
	                                this.value = newVal;
	                                return true;
	                            }
	                            patch[i] = newVal[i];
	                        }
	                    } else {
	                        for (var _i3 in newVal) {
	                            //diff差异点
	                            if (newVal[_i3] !== oldVal[_i3]) {
	                                hasChange = true;
	                            }
	                            patch[_i3] = newVal[_i3];
	                        }
	                    }

	                    for (var _i4 in oldVal) {
	                        if (!(_i4 in patch)) {
	                            hasChange = true;
	                            patch[_i4] = '';
	                        }
	                    }
	                }
	                if (hasChange) {
	                    this.value = patch;
	                    return true;
	                }
	            }
	            return false;
	        },
	        update: function update(vdom, value) {

	            var dom = vdom.dom;
	            if (dom && dom.nodeType === 1) {
	                var wrap = avalon(dom);
	                for (var name in value) {
	                    wrap.css(name, value[name]);
	                }
	            }
	        }
	    });

	    var cssDiff = cssDir.diff;

	    function getEnumerableKeys(obj) {
	        var res = [];
	        for (var key in obj) {
	            res.push(key);
	        }return res;
	    }

	    function deepEquals(a, b, level) {
	        if (level === 0) return a === b;
	        if (a === null && b === null) return true;
	        if (a === undefined && b === undefined) return true;
	        var aIsArray = Array.isArray(a);
	        if (aIsArray !== Array.isArray(b)) {
	            return false;
	        }
	        if (aIsArray) {
	            return equalArray(a, b, level);
	        } else if (typeof a === "object" && typeof b === "object") {
	            return equalObject(a, b, level);
	        }
	        return a === b;
	    }

	    function equalArray(a, b, level) {
	        if (a.length !== b.length) {
	            return false;
	        }
	        for (var i = a.length - 1; i >= 0; i--) {
	            try {
	                if (!deepEquals(a[i], b[i], level - 1)) {
	                    return false;
	                }
	            } catch (noThisPropError) {
	                return false;
	            }
	        }
	        return true;
	    }

	    function equalObject(a, b, level) {
	        if (a === null || b === null) return false;
	        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length) return false;
	        for (var prop in a) {
	            if (!(prop in b)) return false;
	            try {
	                if (!deepEquals(a[prop], b[prop], level - 1)) {
	                    return false;
	                }
	            } catch (noThisPropError) {
	                return false;
	            }
	        }
	        return true;
	    }

	    /**
	     * ------------------------------------------------------------
	     * 检测浏览器对CSS动画的支持与API名
	     * ------------------------------------------------------------
	     */

	    var checker = {
	        TransitionEvent: 'transitionend',
	        WebKitTransitionEvent: 'webkitTransitionEnd',
	        OTransitionEvent: 'oTransitionEnd',
	        otransitionEvent: 'otransitionEnd'
	    };
	    var css3 = void 0;
	    var tran = void 0;
	    var ani = void 0;
	    var name$2 = void 0;
	    var animationEndEvent = void 0;
	    var transitionEndEvent = void 0;
	    var transition = false;
	    var animation = false;
	    //有的浏览器同时支持私有实现与标准写法，比如webkit支持前两种，Opera支持1、3、4
	    for (name$2 in checker) {
	        if (window$1[name$2]) {
	            tran = checker[name$2];
	            break;
	        }
	        /* istanbul ignore next */
	        try {
	            var a = document.createEvent(name$2);
	            tran = checker[name$2];
	            break;
	        } catch (e) {}
	    }
	    if (typeof tran === 'string') {
	        transition = css3 = true;
	        transitionEndEvent = tran;
	    }

	    //animationend有两个可用形态
	    //IE10+, Firefox 16+ & Opera 12.1+: animationend
	    //Chrome/Safari: webkitAnimationEnd
	    //http://blogs.msdn.com/b/davrous/archive/2011/12/06/introduction-to-css3-animat ions.aspx
	    //IE10也可以使用MSAnimationEnd监听，但是回调里的事件 type依然为animationend
	    //  el.addEventListener('MSAnimationEnd', function(e) {
	    //     alert(e.type)// animationend！！！
	    // })
	    checker = {
	        'AnimationEvent': 'animationend',
	        'WebKitAnimationEvent': 'webkitAnimationEnd'
	    };
	    for (name$2 in checker) {
	        if (window$1[name$2]) {
	            ani = checker[name$2];
	            break;
	        }
	    }
	    if (typeof ani === 'string') {
	        animation = css3 = true;
	        animationEndEvent = ani;
	    }

	    var effectDir = avalon.directive('effect', {
	        priority: 5,
	        diff: function diff(effect) {
	            var vdom = this.node;
	            if (typeof effect === 'string') {
	                this.value = effect = {
	                    is: effect
	                };
	                avalon.warn('ms-effect的指令值不再支持字符串,必须是一个对象');
	            }
	            this.value = vdom.effect = effect;
	            var ok = cssDiff.call(this, effect, this.oldValue);
	            var me = this;
	            if (ok) {
	                setTimeout(function () {
	                    vdom.animating = true;
	                    effectDir.update.call(me, vdom, vdom.effect);
	                });
	                vdom.animating = false;
	                return true;
	            }
	            return false;
	        },

	        update: function update(vdom, change, opts) {
	            var dom = vdom.dom;
	            if (dom && dom.nodeType === 1) {
	                //要求配置对象必须指定is属性，action必须是布尔或enter,leave,move
	                var option = change || opts;
	                var is = option.is;

	                var globalOption = avalon.effects[is];
	                if (!globalOption) {
	                    //如果没有定义特效
	                    avalon.warn(is + ' effect is undefined');
	                    return;
	                }
	                var finalOption = {};
	                var action = actionMaps[option.action];
	                if (typeof Effect.prototype[action] !== 'function') {
	                    avalon.warn('action is undefined');
	                    return;
	                }
	                //必须预定义特效

	                var effect = new avalon.Effect(dom);
	                avalon.mix(finalOption, globalOption, option, { action: action });

	                if (finalOption.queue) {
	                    animationQueue.push(function () {
	                        effect[action](finalOption);
	                    });
	                    callNextAnimation();
	                } else {

	                    effect[action](finalOption);
	                }
	                return true;
	            }
	        }
	    });

	    var move = 'move';
	    var leave = 'leave';
	    var enter = 'enter';
	    var actionMaps = {
	        'true': enter,
	        'false': leave,
	        enter: enter,
	        leave: leave,
	        move: move,
	        'undefined': enter
	    };

	    var animationQueue = [];
	    function callNextAnimation() {
	        var fn = animationQueue[0];
	        if (fn) {
	            fn();
	        }
	    }

	    avalon.effects = {};
	    avalon.effect = function (name, opts) {
	        var definition = avalon.effects[name] = opts || {};
	        if (css3 && definition.css !== false) {
	            patchObject(definition, 'enterClass', name + '-enter');
	            patchObject(definition, 'enterActiveClass', definition.enterClass + '-active');
	            patchObject(definition, 'leaveClass', name + '-leave');
	            patchObject(definition, 'leaveActiveClass', definition.leaveClass + '-active');
	        }
	        return definition;
	    };

	    function patchObject(obj, name, value) {
	        if (!obj[name]) {
	            obj[name] = value;
	        }
	    }

	    var Effect = function Effect(dom) {
	        this.dom = dom;
	    };

	    avalon.Effect = Effect;

	    Effect.prototype = {
	        enter: createAction('Enter'),
	        leave: createAction('Leave'),
	        move: createAction('Move')
	    };

	    function execHooks(options, name, el) {
	        var fns = [].concat(options[name]);
	        for (var i = 0, fn; fn = fns[i++];) {
	            if (typeof fn === 'function') {
	                fn(el);
	            }
	        }
	    }
	    var staggerCache = new Cache(128);

	    function createAction(action) {
	        var lower = action.toLowerCase();
	        return function (option) {
	            var dom = this.dom;
	            var elem = avalon(dom);
	            //处理与ms-for指令相关的stagger
	            //========BEGIN=====
	            var staggerTime = isFinite(option.stagger) ? option.stagger * 1000 : 0;
	            if (staggerTime) {
	                if (option.staggerKey) {
	                    var stagger = staggerCache.get(option.staggerKey) || staggerCache.put(option.staggerKey, {
	                        count: 0,
	                        items: 0
	                    });
	                    stagger.count++;
	                    stagger.items++;
	                }
	            }
	            var staggerIndex = stagger && stagger.count || 0;
	            //=======END==========
	            var stopAnimationID;
	            var animationDone = function animationDone(e) {
	                var isOk = e !== false;
	                if (--dom.__ms_effect_ === 0) {
	                    avalon.unbind(dom, transitionEndEvent);
	                    avalon.unbind(dom, animationEndEvent);
	                }
	                clearTimeout(stopAnimationID);
	                var dirWord = isOk ? 'Done' : 'Abort';
	                execHooks(option, 'on' + action + dirWord, dom);
	                if (stagger) {
	                    if (--stagger.items === 0) {
	                        stagger.count = 0;
	                    }
	                }
	                if (option.queue) {
	                    animationQueue.shift();
	                    callNextAnimation();
	                }
	            };
	            //执行开始前的钩子
	            execHooks(option, 'onBefore' + action, dom);

	            if (option[lower]) {
	                //使用JS方式执行动画
	                option[lower](dom, function (ok) {
	                    animationDone(ok !== false);
	                });
	            } else if (css3) {
	                //使用CSS3方式执行动画
	                elem.addClass(option[lower + 'Class']);
	                elem.removeClass(getNeedRemoved(option, lower));

	                if (!dom.__ms_effect_) {
	                    //绑定动画结束事件
	                    elem.bind(transitionEndEvent, animationDone);
	                    elem.bind(animationEndEvent, animationDone);
	                    dom.__ms_effect_ = 1;
	                } else {
	                    dom.__ms_effect_++;
	                }
	                setTimeout(function () {
	                    //用xxx-active代替xxx类名的方式 触发CSS3动画
	                    var time = avalon.root.offsetWidth === NaN;
	                    elem.addClass(option[lower + 'ActiveClass']);
	                    //计算动画时长
	                    time = getAnimationTime(dom);
	                    if (!time === 0) {
	                        //立即结束动画
	                        animationDone(false);
	                    } else if (!staggerTime) {
	                        //如果动画超出时长还没有调用结束事件,这可能是元素被移除了
	                        //如果强制结束动画
	                        stopAnimationID = setTimeout(function () {
	                            animationDone(false);
	                        }, time + 32);
	                    }
	                }, 17 + staggerTime * staggerIndex); // = 1000/60
	            }
	        };
	    }

	    avalon.applyEffect = function (dom, vdom, opts) {
	        var cb = opts.cb;
	        var curEffect = vdom.effect;
	        if (curEffect && dom && dom.nodeType === 1) {
	            var hook = opts.hook;
	            var old = curEffect[hook];
	            if (cb) {
	                if (Array.isArray(old)) {
	                    old.push(cb);
	                } else if (old) {
	                    curEffect[hook] = [old, cb];
	                } else {
	                    curEffect[hook] = [cb];
	                }
	            }
	            getAction(opts);
	            avalon.directives.effect.update(vdom, curEffect, avalon.shadowCopy({}, opts));
	        } else if (cb) {
	            cb(dom);
	        }
	    };
	    /**
	     * 获取方向
	     */
	    function getAction(opts) {
	        if (!opts.action) {
	            return opts.action = opts.hook.replace(/^on/, '').replace(/Done$/, '').toLowerCase();
	        }
	    }
	    /**
	     * 需要移除的类名
	     */
	    function getNeedRemoved(options, name) {
	        var name = name === 'leave' ? 'enter' : 'leave';
	        return Array(name + 'Class', name + 'ActiveClass').map(function (cls) {
	            return options[cls];
	        }).join(' ');
	    }
	    /**
	     * 计算动画长度
	     */
	    var transitionDuration = avalon.cssName('transition-duration');
	    var animationDuration = avalon.cssName('animation-duration');
	    var rsecond = /\d+s$/;
	    function toMillisecond(str) {
	        var ratio = rsecond.test(str) ? 1000 : 1;
	        return parseFloat(str) * ratio;
	    }

	    function getAnimationTime(dom) {
	        var computedStyles = window$1.getComputedStyle(dom, null);
	        var tranDuration = computedStyles[transitionDuration];
	        var animDuration = computedStyles[animationDuration];
	        return toMillisecond(tranDuration) || toMillisecond(animDuration);
	    }
	    /**
	     * 
	    <!DOCTYPE html>
	    <html>
	        <head>
	            <meta charset="UTF-8">
	            <meta name="viewport" content="width=device-width, initial-scale=1.0">
	            <script src="dist/avalon.js"></script>
	            <script>
	                avalon.effect('animate')
	                var vm = avalon.define({
	                    $id: 'ani',
	                    a: true
	                })
	            </script>
	            <style>
	                .animate-enter, .animate-leave{
	                    width:100px;
	                    height:100px;
	                    background: #29b6f6;
	                    transition:all 2s;
	                    -moz-transition: all 2s; 
	                    -webkit-transition: all 2s;
	                    -o-transition:all 2s;
	                }  
	                .animate-enter-active, .animate-leave{
	                    width:300px;
	                    height:300px;
	                }
	                .animate-leave-active{
	                    width:100px;
	                    height:100px;
	                }
	            </style>
	        </head>
	        <body>
	            <div :controller='ani' >
	                <p><input type='button' value='click' :click='@a =!@a'></p>
	                <div :effect="{is:'animate',action:@a}"></div>
	            </div>
	    </body>
	    </html>
	     * 
	     */

	    var none = 'none';
	    function parseDisplay(elem, val) {
	        //用于取得此类标签的默认display值
	        var doc = elem.ownerDocument;
	        var nodeName = elem.nodeName;
	        var key = '_' + nodeName;
	        if (!parseDisplay[key]) {
	            var temp = doc.body.appendChild(doc.createElement(nodeName));
	            val = avalon.css(temp, 'display');
	            doc.body.removeChild(temp);
	            if (val === none) {
	                val = 'block';
	            }
	            parseDisplay[key] = val;
	        }
	        return parseDisplay[key];
	    }

	    avalon.parseDisplay = parseDisplay;
	    avalon.directive('visible', {
	        diff: function diff(newVal, oldVal) {
	            var n = !!newVal;
	            if (oldVal === void 0 || n !== oldVal) {
	                this.value = n;
	                return true;
	            }
	        },
	        ready: true,
	        update: function update(vdom, show) {
	            var dom = vdom.dom;
	            if (dom && dom.nodeType === 1) {
	                var display = dom.style.display;
	                var value;
	                if (show) {
	                    if (display === none) {
	                        value = vdom.displayValue;
	                        if (!value) {
	                            dom.style.display = '';
	                            if (dom.style.cssText === '') {
	                                dom.removeAttribute('style');
	                            }
	                        }
	                    }
	                    if (dom.style.display === '' && avalon(dom).css('display') === none &&
	                    // fix firefox BUG,必须挂到页面上
	                    avalon.contains(dom.ownerDocument, dom)) {
	                        value = parseDisplay(dom);
	                    }
	                } else {

	                    if (display !== none) {
	                        value = none;
	                        vdom.displayValue = display;
	                    }
	                }
	                var cb = function cb() {
	                    if (value !== void 0) {
	                        dom.style.display = value;
	                    }
	                };

	                avalon.applyEffect(dom, vdom, {
	                    hook: show ? 'onEnterDone' : 'onLeaveDone',
	                    cb: cb
	                });
	            }
	        }
	    });

	    avalon.directive('text', {
	        delay: true,
	        init: function init() {

	            var node = this.node;
	            if (node.isVoidTag) {
	                avalon.error('自闭合元素不能使用ms-text');
	            }
	            var child = { nodeName: '#text', nodeValue: this.getValue() };
	            node.children.splice(0, node.children.length, child);
	            if (inBrowser) {
	                avalon.clearHTML(node.dom);
	                node.dom.appendChild(avalon.vdom(child, 'toDOM'));
	            }
	            this.node = child;
	            var type = 'expr';
	            this.type = this.name = type;
	            var directive$$1 = avalon.directives[type];
	            var me = this;
	            this.callback = function (value) {
	                directive$$1.update.call(me, me.node, value);
	            };
	        }
	    });

	    avalon.directive('expr', {
	        update: function update(vdom, value) {
	            value = value == null || value === '' ? '\u200B' : value;
	            vdom.nodeValue = value;
	            //https://github.com/RubyLouvre/avalon/issues/1834
	            if (vdom.dom) vdom.dom.data = value;
	        }
	    });

	    avalon.directive('attr', {
	        diff: cssDiff,
	        update: function update(vdom, value) {
	            var props = vdom.props;
	            for (var i in value) {
	                if (!!value[i] === false) {
	                    delete props[i];
	                } else {
	                    props[i] = value[i];
	                }
	            }
	            var dom = vdom.dom;
	            if (dom && dom.nodeType === 1) {
	                updateAttrs(dom, value);
	            }
	        }
	    });

	    avalon.directive('html', {

	        update: function update(vdom, value) {
	            this.beforeDispose();

	            this.innerRender = avalon.scan('<div class="ms-html-container">' + value + '</div>', this.vm, function () {
	                var oldRoot = this.root;
	                if (vdom.children) vdom.children.length = 0;
	                vdom.children = oldRoot.children;
	                this.root = vdom;
	                if (vdom.dom) avalon.clearHTML(vdom.dom);
	            });
	        },
	        beforeDispose: function beforeDispose() {
	            if (this.innerRender) {
	                this.innerRender.dispose();
	            }
	        },
	        delay: true
	    });

	    avalon.directive('if', {
	        delay: true,
	        priority: 5,
	        init: function init() {
	            this.placeholder = createAnchor('if');
	            var props = this.node.props;
	            delete props['ms-if'];
	            delete props[':if'];
	            this.fragment = avalon.vdom(this.node, 'toHTML');
	        },
	        diff: function diff(newVal, oldVal) {
	            var n = !!newVal;
	            if (oldVal === void 0 || n !== oldVal) {
	                this.value = n;
	                return true;
	            }
	        },
	        update: function update(vdom, value) {
	            if (this.isShow === void 0 && value) {
	                continueScan(this, vdom);
	                return;
	            }
	            this.isShow = value;
	            var placeholder = this.placeholder;

	            if (value) {
	                var p = placeholder.parentNode;
	                continueScan(this, vdom);
	                p && p.replaceChild(vdom.dom, placeholder);
	            } else {
	                //移除DOM
	                this.beforeDispose();
	                vdom.nodeValue = 'if';
	                vdom.nodeName = '#comment';
	                delete vdom.children;
	                var dom = vdom.dom;
	                var p = dom && dom.parentNode;
	                vdom.dom = placeholder;
	                if (p) {
	                    p.replaceChild(placeholder, dom);
	                }
	            }
	        },
	        beforeDispose: function beforeDispose() {
	            if (this.innerRender) {
	                this.innerRender.dispose();
	            }
	        }
	    });

	    function continueScan(instance, vdom) {
	        var innerRender = instance.innerRender = avalon.scan(instance.fragment, instance.vm);
	        avalon.shadowCopy(vdom, innerRender.root);
	        delete vdom.nodeValue;
	    }

	    avalon.directive('on', {
	        beforeInit: function beforeInit() {
	            this.getter = avalon.noop;
	        },
	        init: function init() {
	            var vdom = this.node;
	            var underline = this.name.replace('ms-on-', 'e').replace('-', '_');
	            var uuid = underline + '_' + this.expr.replace(/\s/g, '').replace(/[^$a-z]/ig, function (e) {
	                return e.charCodeAt(0);
	            });
	            var fn = avalon.eventListeners[uuid];
	            if (!fn) {
	                var arr = addScope(this.expr);
	                var body = arr[0],
	                    filters = arr[1];
	                body = makeHandle(body);

	                if (filters) {
	                    filters = filters.replace(/__value__/g, '$event');
	                    filters += '\nif($event.$return){\n\treturn;\n}';
	                }
	                var ret = ['try{', '\tvar __vmodel__ = this;', '\t' + filters, '\treturn ' + body, '}catch(e){avalon.log(e, "in on dir")}'].filter(function (el) {
	                    return (/\S/.test(el)
	                    );
	                });
	                fn = new Function('$event', ret.join('\n'));
	                fn.uuid = uuid;
	                avalon.eventListeners[uuid] = fn;
	            }

	            var dom = avalon.vdom(vdom, 'toDOM');
	            dom._ms_context_ = this.vm;

	            this.eventType = this.param.replace(/\-(\d)$/, '');
	            delete this.param;
	            avalon(dom).bind(this.eventType, fn);
	        },

	        beforeDispose: function beforeDispose() {
	            avalon(this.node.dom).unbind(this.eventType);
	        }
	    });

	    var rforAs = /\s+as\s+([$\w]+)/;
	    var rident = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/;
	    var rinvalid = /^(null|undefined|NaN|window|this|\$index|\$id)$/;
	    var rargs = /[$\w_]+/g;
	    avalon.directive('for', {
	        delay: true,
	        priority: 3,
	        beforeInit: function beforeInit() {
	            var str = this.expr,
	                asName;
	            str = str.replace(rforAs, function (a, b) {
	                /* istanbul ignore if */
	                if (!rident.test(b) || rinvalid.test(b)) {
	                    avalon.error('alias ' + b + ' is invalid --- must be a valid JS identifier which is not a reserved name.');
	                } else {
	                    asName = b;
	                }
	                return '';
	            });

	            var arr = str.split(' in ');
	            var kv = arr[0].match(rargs);
	            if (kv.length === 1) {
	                //确保avalon._each的回调有三个参数
	                kv.unshift('$key');
	            }
	            this.expr = arr[1];
	            this.keyName = kv[0];
	            this.valName = kv[1];
	            this.signature = avalon.makeHashCode('for');
	            if (asName) {
	                this.asName = asName;
	            }

	            delete this.param;
	        },
	        init: function init() {
	            var cb = this.userCb;
	            if (typeof cb === 'string' && cb) {
	                var arr = addScope(cb, 'for');
	                var body = makeHandle(arr[0]);
	                this.userCb = new Function('$event', 'var __vmodel__ = this\nreturn ' + body);
	            }
	            this.node.forDir = this; //暴露给component/index.js中的resetParentChildren方法使用
	            this.fragment = ['<div>', this.fragment, '<!--', this.signature, '--></div>'].join('');
	            this.cache = {};
	        },
	        diff: function diff(newVal, oldVal) {
	            /* istanbul ignore if */
	            if (this.updating) {
	                return;
	            }

	            this.updating = true;
	            var traceIds = createFragments(this, newVal);

	            if (this.oldTrackIds === void 0) return true;

	            if (this.oldTrackIds !== traceIds) {
	                this.oldTrackIds = traceIds;
	                return true;
	            }
	        },
	        update: function update() {

	            if (!this.preFragments) {
	                this.fragments = this.fragments || [];
	                mountList(this);
	            } else {
	                diffList(this);
	                updateList(this);
	            }

	            if (this.userCb) {
	                var me = this;
	                setTimeout(function () {
	                    me.userCb.call(me.vm, {
	                        type: 'rendered',
	                        target: me.begin.dom,
	                        signature: me.signature
	                    });
	                }, 0);
	            }
	            delete this.updating;
	        },
	        beforeDispose: function beforeDispose() {
	            this.fragments.forEach(function (el) {
	                el.dispose();
	            });
	        }
	    });

	    function getTraceKey(item) {
	        var type = typeof item;
	        return item && type === 'object' ? item.$hashcode : type + ':' + item;
	    }

	    //创建一组fragment的虚拟DOM
	    function createFragments(instance, obj) {
	        if (isObject(obj)) {
	            var array = Array.isArray(obj);
	            var ids = [];
	            var fragments = [],
	                i = 0;

	            instance.isArray = array;
	            if (instance.fragments) {
	                instance.preFragments = instance.fragments;
	                avalon.each(obj, function (key, value) {
	                    var k = array ? getTraceKey(value) : key;

	                    fragments.push({
	                        key: k,
	                        val: value,
	                        index: i++
	                    });
	                    ids.push(k);
	                });
	                instance.fragments = fragments;
	            } else {
	                avalon.each(obj, function (key, value) {
	                    var k = array ? getTraceKey(value) : key;
	                    fragments.push(new VFragment([], k, value, i++));
	                    ids.push(k);
	                });
	                instance.fragments = fragments;
	            }
	            return ids.join(';;');
	        } else {
	            return NaN;
	        }
	    }

	    function mountList(instance) {
	        var args = instance.fragments.map(function (fragment, index) {
	            FragmentDecorator(fragment, instance, index);
	            saveInCache(instance.cache, fragment);
	            return fragment;
	        });
	        var list = instance.parentChildren;
	        var i = list.indexOf(instance.begin);
	        list.splice.apply(list, [i + 1, 0].concat(args));
	    }

	    function diffList(instance) {
	        var cache = instance.cache;
	        var newCache = {};
	        var fuzzy = [];
	        var list = instance.preFragments;

	        list.forEach(function (el) {
	            el._dispose = true;
	        });

	        instance.fragments.forEach(function (c, index) {
	            var fragment = isInCache(cache, c.key);
	            //取出之前的文档碎片
	            if (fragment) {
	                delete fragment._dispose;
	                fragment.oldIndex = fragment.index;
	                fragment.index = index; // 相当于 c.index
	                resetVM(fragment.vm, instance.keyName);
	                fragment.vm[instance.keyName] = instance.isArray ? index : fragment.key;
	                saveInCache(newCache, fragment);
	            } else {
	                //如果找不到就进行模糊搜索
	                fuzzy.push(c);
	            }
	        });
	        fuzzy.forEach(function (c) {
	            var fragment = fuzzyMatchCache(cache, c.key);
	            if (fragment) {
	                //重复利用
	                fragment.oldIndex = fragment.index;
	                fragment.key = c.key;
	                var val = fragment.val = c.val;
	                var index = fragment.index = c.index;

	                fragment.vm[instance.valName] = val;
	                fragment.vm[instance.keyName] = instance.isArray ? index : fragment.key;
	                delete fragment._dispose;
	            } else {

	                c = new VFragment([], c.key, c.val, c.index);
	                fragment = FragmentDecorator(c, instance, c.index);
	                list.push(fragment);
	            }
	            saveInCache(newCache, fragment);
	        });

	        instance.fragments = list;
	        list.sort(function (a, b) {
	            return a.index - b.index;
	        });
	        instance.cache = newCache;
	    }

	    function resetVM(vm, a, b) {
	        vm.$accessors[a].value = NaN;
	    }

	    function updateList(instance) {
	        var before = instance.begin.dom;
	        var parent = before.parentNode;
	        var list = instance.fragments;
	        var end = instance.end.dom;
	        for (var i = 0, item; item = list[i]; i++) {
	            if (item._dispose) {
	                list.splice(i, 1);
	                i--;
	                item.dispose();
	                continue;
	            }
	            if (item.oldIndex !== item.index) {
	                var f = item.toFragment();
	                var isEnd = before.nextSibling === null;
	                parent.insertBefore(f, before.nextSibling);
	                if (isEnd && !parent.contains(end)) {
	                    parent.insertBefore(end, before.nextSibling);
	                }
	            }
	            before = item.split;
	        }
	        var ch = instance.parentChildren;
	        var startIndex = ch.indexOf(instance.begin);
	        var endIndex = ch.indexOf(instance.end);

	        list.splice.apply(ch, [startIndex + 1, endIndex - startIndex].concat(list));
	    }

	    /**
	     * 
	     * @param {type} fragment
	     * @param {type} this
	     * @param {type} index
	     * @returns { key, val, index, oldIndex, this, dom, split, vm}
	     */
	    function FragmentDecorator(fragment, instance, index) {
	        var data = {};
	        data[instance.keyName] = instance.isArray ? index : fragment.key;
	        data[instance.valName] = fragment.val;
	        if (instance.asName) {
	            data[instance.asName] = instance.value;
	        }
	        var vm = fragment.vm = platform.itemFactory(instance.vm, {
	            data: data
	        });

	        if (instance.isArray) {
	            vm.$watch(instance.valName, function (a) {
	                if (instance.value && instance.value.set) {
	                    instance.value.set(vm[instance.keyName], a);
	                }
	            });
	        } else {
	            vm.$watch(instance.valName, function (a) {
	                instance.value[fragment.key] = a;
	            });
	        }
	        fragment.index = index;
	        fragment.innerRender = avalon.scan(instance.fragment, vm, function () {
	            var oldRoot = this.root;
	            ap.push.apply(fragment.children, oldRoot.children);
	            this.root = fragment;
	        });
	        return fragment;
	    }
	    // 新位置: 旧位置
	    function isInCache(cache, id) {
	        var c = cache[id];
	        if (c) {
	            var arr = c.arr;
	            /* istanbul ignore if*/
	            if (arr) {
	                var r = arr.pop();
	                if (!arr.length) {
	                    c.arr = 0;
	                }
	                return r;
	            }
	            delete cache[id];
	            return c;
	        }
	    }
	    //[1,1,1] number1 number1_ number1__
	    function saveInCache(cache, component) {
	        var trackId = component.key;
	        if (!cache[trackId]) {
	            cache[trackId] = component;
	        } else {
	            var c = cache[trackId];
	            var arr = c.arr || (c.arr = []);
	            arr.push(component);
	        }
	    }

	    function fuzzyMatchCache(cache) {
	        var key;
	        for (var id in cache) {
	            var key = id;
	            break;
	        }
	        if (key) {
	            return isInCache(cache, key);
	        }
	    }

	    //根据VM的属性值或表达式的值切换类名，ms-class='xxx yyy zzz:flag'
	    //http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
	    function classNames() {
	        var classes = [];
	        for (var i = 0; i < arguments.length; i++) {
	            var arg = arguments[i];
	            var argType = typeof arg;
	            if (argType === 'string' || argType === 'number' || arg === true) {
	                classes.push(arg);
	            } else if (Array.isArray(arg)) {
	                classes.push(classNames.apply(null, arg));
	            } else if (argType === 'object') {
	                for (var key in arg) {
	                    if (arg.hasOwnProperty(key) && arg[key]) {
	                        classes.push(key);
	                    }
	                }
	            }
	        }

	        return classes.join(' ');
	    }

	    avalon.directive('class', {
	        diff: function diff(newVal, oldVal) {
	            var type = this.type;
	            var vdom = this.node;
	            var classEvent = vdom.classEvent || {};
	            if (type === 'hover') {
	                //在移出移入时切换类名
	                classEvent.mouseenter = activateClass;
	                classEvent.mouseleave = abandonClass;
	            } else if (type === 'active') {
	                //在获得焦点时切换类名
	                classEvent.tabIndex = vdom.props.tabindex || -1;
	                classEvent.mousedown = activateClass;
	                classEvent.mouseup = abandonClass;
	                classEvent.mouseleave = abandonClass;
	            }
	            vdom.classEvent = classEvent;

	            var className = classNames(newVal);

	            if (typeof oldVal === void 0 || oldVal !== className) {
	                this.value = className;

	                vdom['change-' + type] = className;
	                return true;
	            }
	        },
	        update: function update(vdom, value) {
	            var dom = vdom.dom;
	            if (dom && dom.nodeType == 1) {

	                var dirType = this.type;
	                var change = 'change-' + dirType;
	                var classEvent = vdom.classEvent;
	                if (classEvent) {
	                    for (var i in classEvent) {
	                        if (i === 'tabIndex') {
	                            dom[i] = classEvent[i];
	                        } else {
	                            avalon.bind(dom, i, classEvent[i]);
	                        }
	                    }
	                    vdom.classEvent = {};
	                }
	                var names = ['class', 'hover', 'active'];
	                names.forEach(function (type) {
	                    if (dirType !== type) return;
	                    if (type === 'class') {
	                        dom && setClass(dom, value);
	                    } else {
	                        var oldClass = dom.getAttribute(change);
	                        if (oldClass) {
	                            avalon(dom).removeClass(oldClass);
	                        }
	                        var name = 'change-' + type;
	                        dom.setAttribute(name, value);
	                    }
	                });
	            }
	        }
	    });

	    directives.active = directives.hover = directives['class'];

	    var classMap = {
	        mouseenter: 'change-hover',
	        mouseleave: 'change-hover',
	        mousedown: 'change-active',
	        mouseup: 'change-active'
	    };

	    function activateClass(e) {
	        var elem = e.target;
	        avalon(elem).addClass(elem.getAttribute(classMap[e.type]) || '');
	    }

	    function abandonClass(e) {
	        var elem = e.target;
	        var name = classMap[e.type];
	        avalon(elem).removeClass(elem.getAttribute(name) || '');
	        if (name !== 'change-active') {
	            avalon(elem).removeClass(elem.getAttribute('change-active') || '');
	        }
	    }

	    function setClass(dom, neo) {
	        var old = dom.getAttribute('change-class');
	        if (old !== neo) {
	            avalon(dom).removeClass(old).addClass(neo);
	            dom.setAttribute('change-class', neo);
	        }
	    }

	    getLongID(activateClass);
	    getLongID(abandonClass);

	    function lookupOption(vdom, values) {
	        vdom.children && vdom.children.forEach(function (el) {
	            if (el.nodeName === 'option') {
	                setOption(el, values);
	            } else {
	                lookupOption(el, values);
	            }
	        });
	    }

	    function setOption(vdom, values) {
	        var props = vdom.props;
	        if (!('disabled' in props)) {
	            var value = getOptionValue(vdom, props).trim();
	            props.selected = values.indexOf(value) !== -1;

	            if (vdom.dom) {
	                vdom.dom.selected = props.selected;
	                var v = vdom.dom.selected; //必须加上这个,防止移出节点selected失效
	            }
	        }
	    }

	    function getOptionValue(vdom, props) {
	        if (props && 'value' in props) {
	            return props.value + '';
	        }
	        var arr = [];
	        vdom.children.forEach(function (el) {
	            if (el.nodeName === '#text') {
	                arr.push(el.nodeValue);
	            } else if (el.nodeName === '#document-fragment') {
	                arr.push(getOptionValue(el));
	            }
	        });
	        return arr.join('');
	    }

	    function getSelectedValue(vdom, arr) {
	        vdom.children.forEach(function (el) {
	            if (el.nodeName === 'option') {
	                if (el.props.selected === true) arr.push(getOptionValue(el, el.props));
	            } else if (el.children) {
	                getSelectedValue(el, arr);
	            }
	        });
	        return arr;
	    }

	    var updateDataActions = {
	        input: function input(prop) {
	            //处理单个value值处理
	            var field = this;
	            prop = prop || 'value';
	            var dom = field.dom;
	            var rawValue = dom[prop];
	            var parsedValue = field.parseValue(rawValue);

	            //有时候parse后一致,vm不会改变,但input里面的值
	            field.value = rawValue;
	            field.setValue(parsedValue);
	            duplexCb(field);
	            var pos = field.pos;
	            /* istanbul ignore if */
	            if (dom.caret) {
	                field.setCaret(dom, pos);
	            }
	            //vm.aaa = '1234567890'
	            //处理 <input ms-duplex='@aaa|limitBy(8)'/>{{@aaa}} 这种格式化同步不一致的情况 
	        },
	        radio: function radio() {
	            var field = this;
	            if (field.isChecked) {
	                var val = !field.value;
	                field.setValue(val);
	                duplexCb(field);
	            } else {
	                updateDataActions.input.call(field);
	                field.value = NaN;
	            }
	        },
	        checkbox: function checkbox() {
	            var field = this;
	            var array = field.value;
	            if (!Array.isArray(array)) {
	                avalon.warn('ms-duplex应用于checkbox上要对应一个数组');
	                array = [array];
	            }
	            var method = field.dom.checked ? 'ensure' : 'remove';
	            if (array[method]) {
	                var val = field.parseValue(field.dom.value);
	                array[method](val);
	                duplexCb(field);
	            }
	            this.__test__ = array;
	        },
	        select: function select() {
	            var field = this;
	            var val = avalon(field.dom).val(); //字符串或字符串数组
	            if (val + '' !== this.value + '') {
	                if (Array.isArray(val)) {
	                    //转换布尔数组或其他
	                    val = val.map(function (v) {
	                        return field.parseValue(v);
	                    });
	                } else {
	                    val = field.parseValue(val);
	                }
	                field.setValue(val);
	                duplexCb(field);
	            }
	        },
	        contenteditable: function contenteditable() {
	            updateDataActions.input.call(this, 'innerHTML');
	        }
	    };

	    function duplexCb(field) {
	        if (field.userCb) {
	            field.userCb.call(field.vm, {
	                type: 'changed',
	                target: field.dom
	            });
	        }
	    }

	    function updateDataHandle(event) {
	        var elem = this;
	        var field = elem._ms_duplex_;
	        if (elem.composing) {
	            //防止onpropertychange引发爆栈
	            return;
	        }
	        if (elem.value === field.value) {
	            return;
	        }
	        /* istanbul ignore if*/
	        if (elem.caret) {
	            try {
	                var pos = field.getCaret(elem);
	                field.pos = pos;
	            } catch (e) {}
	        }
	        /* istanbul ignore if*/
	        if (field.debounceTime > 4) {
	            var timestamp = new Date();
	            var left = timestamp - field.time || 0;
	            field.time = timestamp;
	            /* istanbul ignore if*/
	            if (left >= field.debounceTime) {
	                updateDataActions[field.dtype].call(field);
	                /* istanbul ignore else*/
	            } else {
	                clearTimeout(field.debounceID);
	                field.debounceID = setTimeout(function () {
	                    updateDataActions[field.dtype].call(field);
	                }, left);
	            }
	        } else {
	            updateDataActions[field.dtype].call(field);
	        }
	    }

	    var rchangeFilter = /\|\s*change\b/;
	    var rdebounceFilter = /\|\s*debounce(?:\(([^)]+)\))?/;
	    function duplexBeforeInit() {
	        var expr = this.expr;
	        if (rchangeFilter.test(expr)) {
	            this.isChanged = true;
	            expr = expr.replace(rchangeFilter, '');
	        }
	        var match = expr.match(rdebounceFilter);
	        if (match) {
	            expr = expr.replace(rdebounceFilter, '');
	            if (!this.isChanged) {
	                this.debounceTime = parseInt(match[1], 10) || 300;
	            }
	        }
	        this.expr = expr;
	    }
	    function duplexInit() {
	        var expr = this.expr;
	        var node = this.node;
	        var etype = node.props.type;
	        this.parseValue = parseValue;
	        //处理数据转换器
	        var parsers = this.param,
	            dtype;
	        var isChecked = false;
	        parsers = parsers ? parsers.split('-').map(function (a) {
	            if (a === 'checked') {
	                isChecked = true;
	            }
	            return a;
	        }) : [];
	        node.duplex = this;
	        if (rcheckedType.test(etype) && isChecked) {
	            //如果是radio, checkbox,判定用户使用了checked格式函数没有
	            parsers = [];
	            dtype = 'radio';
	            this.isChecked = isChecked;
	        }
	        this.parsers = parsers;
	        if (!/input|textarea|select/.test(node.nodeName)) {
	            if ('contenteditable' in node.props) {
	                dtype = 'contenteditable';
	            }
	        } else if (!dtype) {
	            dtype = node.nodeName === 'select' ? 'select' : etype === 'checkbox' ? 'checkbox' : etype === 'radio' ? 'radio' : 'input';
	        }
	        this.dtype = dtype;

	        //判定是否使用了 change debounce 过滤器
	        // this.isChecked = /boolean/.test(parsers)
	        if (dtype !== 'input' && dtype !== 'contenteditable') {
	            delete this.isChange;
	            delete this.debounceTime;
	        } else if (!this.isChecked) {
	            this.isString = true;
	        }

	        var cb = node.props['data-duplex-changed'];
	        if (cb) {
	            var arr = addScope(cb, 'xx');
	            var body = makeHandle(arr[0]);
	            this.userCb = new Function('$event', 'var __vmodel__ = this\nreturn ' + body);
	        }
	    }
	    function duplexDiff(newVal, oldVal) {
	        if (Array.isArray(newVal)) {
	            if (newVal + '' !== this.compareVal) {
	                this.compareVal = newVal + '';
	                return true;
	            }
	        } else {
	            newVal = this.parseValue(newVal);
	            if (!this.isChecked) {
	                this.value = newVal += '';
	            }
	            if (newVal !== this.compareVal) {
	                this.compareVal = newVal;
	                return true;
	            }
	        }
	    }

	    function duplexBind(vdom, addEvent) {
	        var dom = vdom.dom;
	        this.dom = dom;
	        this.duplexCb = updateDataHandle;
	        dom._ms_duplex_ = this;
	        //绑定事件
	        addEvent(dom, this);
	        //添加验证

	        var rules = vdom.rules;
	        //将当前虚拟DOM的duplex添加到它上面的表单元素的validate指令的fields数组中

	        if (rules && !this.validator) {
	            while (dom && dom.nodeType === 1) {
	                var validator = dom._ms_validate_;
	                if (validator) {
	                    this.rules = rules;
	                    this.validator = validator;

	                    if (avalon.Array.ensure(validator.fields, this)) {
	                        validator.addField(this);
	                    }
	                    break;
	                }
	                dom = dom.parentNode;
	            }
	        }
	    }

	    var valueHijack = true;
	    try {
	        //#272 IE9-IE11, firefox
	        var setters = {};
	        var aproto = HTMLInputElement.prototype;
	        var bproto = HTMLTextAreaElement.prototype;
	        var newSetter = function newSetter(value) {
	            // jshint ignore:line
	            setters[this.tagName].call(this, value);
	            var data = this._ms_duplex_;
	            if (!this.caret && data && data.isString) {
	                data.duplexCb.call(this, { type: 'setter' });
	            }
	        };
	        var inputProto = HTMLInputElement.prototype;
	        Object.getOwnPropertyNames(inputProto); //故意引发IE6-8等浏览器报错
	        setters['INPUT'] = Object.getOwnPropertyDescriptor(aproto, 'value').set;

	        Object.defineProperty(aproto, 'value', {
	            set: newSetter
	        });
	        setters['TEXTAREA'] = Object.getOwnPropertyDescriptor(bproto, 'value').set;
	        Object.defineProperty(bproto, 'value', {
	            set: newSetter
	        });
	        valueHijack = false;
	    } catch (e) {
	        //在chrome 43中 ms-duplex终于不需要使用定时器实现双向绑定了
	        // http://updates.html5rocks.com/2015/04/DOM-attributes-now-on-the-prototype
	        // https://docs.google.com/document/d/1jwA8mtClwxI-QJuHT7872Z0pxpZz8PBkf2bGAbsUtqs/edit?pli=1
	    }

	    function parseValue(val) {
	        for (var i = 0, k; k = this.parsers[i++];) {
	            var fn = avalon.parsers[k];
	            if (fn) {
	                val = fn.call(this, val);
	            }
	        }
	        return val;
	    }

	    var updateView = {
	        input: function input() {
	            //处理单个value值处理
	            var vdom = this.node;
	            var value = this.value + '';
	            vdom.dom.value = vdom.props.value = value;
	        },
	        updateChecked: function updateChecked(vdom, checked) {
	            if (vdom.dom) {
	                vdom.dom.defaultChecked = vdom.dom.checked = checked;
	            }
	        },
	        radio: function radio() {
	            //处理单个checked属性
	            var node = this.node;
	            var nodeValue = node.props.value;
	            var checked;
	            if (this.isChecked) {
	                checked = !!this.value;
	            } else {
	                checked = this.value + '' === nodeValue;
	            }
	            node.props.checked = checked;
	            updateView.updateChecked(node, checked);
	        },
	        checkbox: function checkbox() {
	            //处理多个checked属性
	            var node = this.node;
	            var props = node.props;
	            var value = props.value + '';
	            var values = [].concat(this.value);
	            var checked = values.some(function (el) {
	                return el + '' === value;
	            });

	            props.defaultChecked = props.checked = checked;
	            updateView.updateChecked(node, checked);
	        },
	        select: function select() {
	            //处理子级的selected属性
	            var a = Array.isArray(this.value) ? this.value.map(String) : this.value + '';
	            lookupOption(this.node, a);
	        },
	        contenteditable: function contenteditable() {
	            //处理单个innerHTML 

	            var vnodes = fromString(this.value);
	            var fragment = createFragment();
	            for (var i = 0, el; el = vnodes[i++];) {
	                var child = avalon.vdom(el, 'toDOM');
	                fragment.appendChild(child);
	            }
	            avalon.clearHTML(this.dom).appendChild(fragment);
	            var list = this.node.children;
	            list.length = 0;
	            Array.prototype.push.apply(list, vnodes);

	            this.duplexCb.call(this.dom);
	        }
	    };

	    /* 
	     * 通过绑定事件同步vmodel
	     * 总共有三种方式同步视图
	     * 1. 各种事件 input, change, click, propertychange, keydown...
	     * 2. value属性重写
	     * 3. 定时器轮询
	     */

	    function updateDataEvents(dom, data) {
	        var events = {};
	        //添加需要监听的事件
	        switch (data.dtype) {
	            case 'radio':
	            case 'checkbox':
	                events.click = updateDataHandle;
	                break;
	            case 'select':
	                events.change = updateDataHandle;
	                break;
	            case 'contenteditable':
	                /* istanbul ignore if */
	                if (data.isChanged) {
	                    events.blur = updateDataHandle;
	                    /* istanbul ignore else */
	                } else {
	                    /* istanbul ignore if*/

	                    if (avalon.modern) {
	                        if (window$1.webkitURL) {
	                            // http://code.metager.de/source/xref/WebKit/LayoutTests/fast/events/
	                            // https://bugs.webkit.org/show_bug.cgi?id=110742
	                            events.webkitEditableContentChanged = updateDataHandle;
	                        } else if (window$1.MutationEvent) {
	                            events.DOMCharacterDataModified = updateDataHandle;
	                        }
	                        events.input = updateDataHandle;
	                        /* istanbul ignore else */
	                    } else {
	                        events.keydown = updateModelKeyDown;
	                        events.paste = updateModelDelay;
	                        events.cut = updateModelDelay;
	                        events.focus = closeComposition;
	                        events.blur = openComposition;
	                    }
	                }
	                break;
	            case 'input':
	                /* istanbul ignore if */
	                if (data.isChanged) {
	                    events.change = updateDataHandle;
	                    /* istanbul ignore else */
	                } else {
	                    //http://www.cnblogs.com/rubylouvre/archive/2013/02/17/2914604.html
	                    //http://www.matts411.com/post/internet-explorer-9-oninput/
	                    if (msie < 10) {
	                        //IE6-8的propertychange有问题,第一次用JS修改值时不会触发,而且你是全部清空value也不会触发
	                        //IE9的propertychange不支持自动完成,退格,删除,复制,贴粘,剪切或点击右边的小X的清空操作
	                        events.propertychange = updateModelHack;
	                        events.paste = updateModelDelay;
	                        events.cut = updateModelDelay;
	                        //IE9在第一次删除字符时不会触发oninput
	                        events.keyup = updateModelKeyDown;
	                    } else {
	                        events.input = updateDataHandle;
	                        events.compositionstart = openComposition;
	                        //微软拼音输入法的问题需要在compositionend事件中处理
	                        events.compositionend = closeComposition;
	                        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
	                        //处理低版本的标准浏览器,通过Int8Array进行区分
	                        if (!/\[native code\]/.test(window$1.Int8Array)) {
	                            events.keydown = updateModelKeyDown; //safari < 5 opera < 11
	                            events.paste = updateModelDelay; //safari < 5
	                            events.cut = updateModelDelay; //safari < 5 
	                            if (window$1.netscape) {
	                                // Firefox <= 3.6 doesn't fire the 'input' event when text is filled in through autocomplete
	                                events.DOMAutoComplete = updateDataHandle;
	                            }
	                        }
	                    }
	                }
	                break;
	        }

	        if (/password|text/.test(dom.type)) {
	            events.focus = openCaret; //判定是否使用光标修正功能 
	            events.blur = closeCaret;
	            data.getCaret = getCaret;
	            data.setCaret = setCaret;
	        }

	        for (var name in events) {
	            avalon.bind(dom, name, events[name]);
	        }
	    }

	    function updateModelHack(e) {
	        if (e.propertyName === 'value') {
	            updateDataHandle.call(this, e);
	        }
	    }

	    function updateModelDelay(e) {
	        var elem = this;
	        setTimeout(function () {
	            updateDataHandle.call(elem, e);
	        }, 0);
	    }

	    function openCaret() {
	        this.caret = true;
	    }
	    /* istanbul ignore next */
	    function closeCaret() {
	        this.caret = false;
	    }
	    /* istanbul ignore next */
	    function openComposition() {
	        this.composing = true;
	    }
	    /* istanbul ignore next */
	    function closeComposition(e) {
	        this.composing = false;
	        updateModelDelay.call(this, e);
	    }
	    /* istanbul ignore next */
	    function updateModelKeyDown(e) {
	        var key = e.keyCode;
	        // ignore
	        //    command            modifiers                   arrows
	        if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40) return;
	        updateDataHandle.call(this, e);
	    }

	    getShortID(openCaret);
	    getShortID(closeCaret);
	    getShortID(openComposition);
	    getShortID(closeComposition);
	    getShortID(updateDataHandle);
	    getShortID(updateModelHack);
	    getShortID(updateModelDelay);
	    getShortID(updateModelKeyDown);

	    //IE6-8要处理光标时需要异步
	    var mayBeAsync = function mayBeAsync(fn) {
	        setTimeout(fn, 0);
	    };
	    /* istanbul ignore next */
	    function setCaret(target, cursorPosition) {
	        var range$$1;
	        if (target.createTextRange) {
	            mayBeAsync(function () {
	                target.focus();
	                range$$1 = target.createTextRange();
	                range$$1.collapse(true);
	                range$$1.moveEnd('character', cursorPosition);
	                range$$1.moveStart('character', cursorPosition);
	                range$$1.select();
	            });
	        } else {
	            target.focus();
	            if (target.selectionStart !== undefined) {
	                target.setSelectionRange(cursorPosition, cursorPosition);
	            }
	        }
	    }
	    /* istanbul ignore next*/
	    function getCaret(target) {
	        var start = 0;
	        var normalizedValue;
	        var range$$1;
	        var textInputRange;
	        var len;
	        var endRange;

	        if (target.selectionStart + target.selectionEnd > -1) {
	            start = target.selectionStart;
	        } else {
	            range$$1 = document$1.selection.createRange();

	            if (range$$1 && range$$1.parentElement() === target) {
	                len = target.value.length;
	                normalizedValue = target.value.replace(/\r\n/g, '\n');

	                textInputRange = target.createTextRange();
	                textInputRange.moveToBookmark(range$$1.getBookmark());

	                endRange = target.createTextRange();
	                endRange.collapse(false);

	                if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
	                    start = len;
	                } else {
	                    start = -textInputRange.moveStart('character', -len);
	                    start += normalizedValue.slice(0, start).split('\n').length - 1;
	                }
	            }
	        }

	        return start;
	    }

	    avalon.directive('duplex', {
	        priority: 9999999,
	        beforeInit: duplexBeforeInit,
	        init: duplexInit,
	        diff: duplexDiff,
	        update: function update(vdom, value) {
	            // var dom = vdom.dom
	            if (!this.dom) {
	                duplexBind.call(this, vdom, updateDataEvents);
	            }
	            //如果不支持input.value的Object.defineProperty的属性支持,
	            //需要通过轮询同步, chrome 42及以下版本需要这个hack
	            pollValue.call(this, avalon.msie, valueHijack);
	            //更新视图

	            updateView[this.dtype].call(this);
	        }
	    });

	    function pollValue(isIE, valueHijack$$1) {
	        var dom = this.dom;
	        if (this.isString && valueHijack$$1 && !isIE && !dom.valueHijack) {
	            dom.valueHijack = updateDataHandle;
	            var intervalID = setInterval(function () {
	                if (!avalon.contains(avalon.root, dom)) {
	                    clearInterval(intervalID);
	                } else {
	                    dom.valueHijack({ type: 'poll' });
	                }
	            }, 30);
	            return intervalID;
	        }
	    }
	    avalon.__pollValue = pollValue; //export to test
	    /* istanbul ignore if */
	    if (avalon.msie < 8) {
	        var oldUpdate = updateView.updateChecked;
	        updateView.updateChecked = function (vdom, checked) {
	            var dom = vdom.dom;
	            if (dom) {
	                setTimeout(function () {
	                    oldUpdate(vdom, checked);
	                    dom.firstCheckedIt = 1;
	                }, dom.firstCheckedIt ? 31 : 16);
	                //IE6,7 checkbox, radio是使用defaultChecked控制选中状态，
	                //并且要先设置defaultChecked后设置checked
	                //并且必须设置延迟(因为必须插入DOM树才生效)
	            }
	        };
	    }

	    avalon.directive('rules', {
	        diff: function diff(rules) {
	            if (isObject(rules)) {
	                var vdom = this.node;
	                vdom.rules = platform.toJson(rules);
	                if (vdom.duplex) {
	                    vdom.duplex.rules = vdom.rules;
	                }
	                return true;
	            }
	        }
	    });
	    function isRegExp(value) {
	        return avalon.type(value) === 'regexp';
	    }
	    var rmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
	    var rurl = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
	    function isCorrectDate(value) {
	        if (typeof value === "string" && value) {
	            //是字符串但不能是空字符
	            var arr = value.split("-"); //可以被-切成3份，并且第1个是4个字符
	            if (arr.length === 3 && arr[0].length === 4) {
	                var year = ~~arr[0]; //全部转换为非负整数
	                var month = ~~arr[1] - 1;
	                var date = ~~arr[2];
	                var d = new Date(year, month, date);
	                return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date;
	            }
	        }
	        return false;
	    }
	    //https://github.com/adform/validator.js/blob/master/validator.js
	    avalon.shadowCopy(avalon.validators, {
	        pattern: {
	            message: '必须匹配{{pattern}}这样的格式',
	            get: function get(value, field, next) {
	                var elem = field.dom;
	                var data = field.data;
	                if (!isRegExp(data.pattern)) {
	                    var h5pattern = elem.getAttribute("pattern");
	                    data.pattern = new RegExp('^(?:' + h5pattern + ')$');
	                }
	                next(data.pattern.test(value));
	                return value;
	            }
	        },
	        digits: {
	            message: '必须整数',
	            get: function get(value, field, next) {
	                //整数
	                next(/^\-?\d+$/.test(value));
	                return value;
	            }
	        },
	        number: {
	            message: '必须数字',
	            get: function get(value, field, next) {
	                //数值
	                next(!!value && isFinite(value)); // isFinite('') --> true
	                return value;
	            }
	        },
	        norequired: {
	            message: '',
	            get: function get(value, field, next) {
	                next(true);
	                return value;
	            }
	        },
	        required: {
	            message: '必须填写',
	            get: function get(value, field, next) {
	                next(value !== '');
	                return value;
	            }
	        },
	        equalto: {
	            message: '密码输入不一致',
	            get: function get(value, field, next) {
	                var id = String(field.data.equalto);
	                var other = avalon(document.getElementById(id)).val() || "";
	                next(value === other);
	                return value;
	            }
	        },
	        date: {
	            message: '日期格式不正确',
	            get: function get(value, field, next) {
	                var data = field.data;
	                if (isRegExp(data.date)) {
	                    next(data.date.test(value));
	                } else {
	                    next(isCorrectDate(value));
	                }
	                return value;
	            }
	        },
	        url: {
	            message: 'URL格式不正确',
	            get: function get(value, field, next) {
	                next(rurl.test(value));
	                return value;
	            }
	        },
	        email: {
	            message: 'email格式不正确',
	            get: function get(value, field, next) {
	                next(rmail.test(value));
	                return value;
	            }
	        },
	        minlength: {
	            message: '最少输入{{minlength}}个字',
	            get: function get(value, field, next) {
	                var num = parseInt(field.data.minlength, 10);
	                next(value.length >= num);
	                return value;
	            }
	        },
	        maxlength: {
	            message: '最多输入{{maxlength}}个字',
	            get: function get(value, field, next) {
	                var num = parseInt(field.data.maxlength, 10);
	                next(value.length <= num);
	                return value;
	            }
	        },
	        min: {
	            message: '输入值不能小于{{min}}',
	            get: function get(value, field, next) {
	                var num = parseInt(field.data.min, 10);
	                next(parseFloat(value) >= num);
	                return value;
	            }
	        },
	        max: {
	            message: '输入值不能大于{{max}}',
	            get: function get(value, field, next) {
	                var num = parseInt(field.data.max, 10);
	                next(parseFloat(value) <= num);
	                return value;
	            }
	        },
	        chs: {
	            message: '必须是中文字符',
	            get: function get(value, field, next) {
	                next(/^[\u4e00-\u9fa5]+$/.test(value));
	                return value;
	            }
	        }
	    });

	    var valiDir = avalon.directive('validate', {
	        diff: function diff(validator) {
	            var vdom = this.node;
	            if (vdom.validator) {
	                return;
	            }
	            if (isObject(validator)) {
	                //注意，这个Form标签的虚拟DOM有两个验证对象
	                //一个是vmValidator，它是用户VM上的那个原始子对象，也是一个VM
	                //一个是validator，它是vmValidator.$model， 这是为了防止IE6－8添加子属性时添加的hack
	                //也可以称之为safeValidate
	                vdom.vmValidator = validator;
	                validator = platform.toJson(validator);

	                vdom.validator = validator;
	                for (var name in valiDir.defaults) {
	                    if (!validator.hasOwnProperty(name)) {
	                        validator[name] = valiDir.defaults[name];
	                    }
	                }
	                validator.fields = validator.fields || [];
	                return true;
	            }
	        },
	        update: function update(vdom) {
	            var validator = vdom.validator;
	            var dom = vdom.dom;
	            validator.dom = dom;
	            dom._ms_validate_ = validator;

	            //为了方便用户手动执行验证，我们需要为原始vmValidate上添加一个onManual方法
	            var v = vdom.vmValidator;
	            try {
	                v.onManual = onManual;
	            } catch (e) {}
	            delete vdom.vmValidator;

	            dom.setAttribute('novalidate', 'novalidate');
	            function onManual() {
	                valiDir.validateAll.call(validator, validator.onValidateAll);
	            }
	            /* istanbul ignore if */
	            if (validator.validateAllInSubmit) {
	                avalon.bind(dom, 'submit', function (e) {
	                    e.preventDefault();
	                    onManual();
	                });
	            }
	            /* istanbul ignore if */
	            if (typeof validator.onInit === 'function') {
	                //vmodels是不包括vmodel的
	                validator.onInit.call(dom, {
	                    type: 'init',
	                    target: dom,
	                    validator: validator
	                });
	            }
	        },
	        validateAll: function validateAll(callback) {
	            var validator = this;
	            var fn = typeof callback === 'function' ? callback : validator.onValidateAll;
	            var promises = validator.fields.filter(function (field) {
	                var el = field.dom;
	                return el && !el.disabled && validator.dom.contains(el);
	            }).map(function (field) {
	                return valiDir.validate(field, true);
	            });
	            var uniq = {};
	            return Promise.all(promises).then(function (array) {
	                var reasons = array.concat.apply([], array);
	                if (validator.deduplicateInValidateAll) {

	                    reasons = reasons.filter(function (reason) {
	                        var el = reason.element;
	                        var uuid = el.uniqueID || (el.uniqueID = setTimeout('1'));

	                        if (uniq[uuid]) {
	                            return false;
	                        } else {
	                            return uniq[uuid] = true;
	                        }
	                    });
	                }
	                fn.call(validator.dom, reasons); //这里只放置未通过验证的组件
	            });
	        },
	        addField: function addField(field) {
	            var validator = this;
	            var node = field.dom;
	            /* istanbul ignore if */
	            if (validator.validateInKeyup && !field.isChanged && !field.debounceTime) {
	                avalon.bind(node, 'keyup', function (e) {
	                    validator.validate(field, 0, e);
	                });
	            }
	            /* istanbul ignore if */
	            if (validator.validateInBlur) {
	                avalon.bind(node, 'blur', function (e) {
	                    validator.validate(field, 0, e);
	                });
	            }
	            /* istanbul ignore if */
	            if (validator.resetInFocus) {
	                avalon.bind(node, 'focus', function (e) {
	                    validator.onReset.call(node, e, field);
	                });
	            }
	        },
	        validate: function validate(field, isValidateAll, event) {
	            var promises = [];
	            var value = field.value;
	            var elem = field.dom;

	            /* istanbul ignore if */
	            if (typeof Promise !== 'function') {
	                //avalon-promise不支持phantomjs
	                avalon.warn('please npm install es6-promise or bluebird');
	            }
	            /* istanbul ignore if */
	            if (elem.disabled) return;
	            var rules = field.rules;
	            var ngs = [],
	                isOk = true;
	            if (!(rules.norequired && value === '')) {
	                for (var ruleName in rules) {
	                    var ruleValue = rules[ruleName];
	                    if (ruleValue === false) continue;
	                    var hook = avalon.validators[ruleName];
	                    var resolve;
	                    promises.push(new Promise(function (a, b) {
	                        resolve = a;
	                    }));
	                    var next = function next(a) {
	                        var reason = {
	                            element: elem,
	                            data: field.data,
	                            message: elem.getAttribute('data-' + ruleName + '-message') || elem.getAttribute('data-message') || hook.message,
	                            validateRule: ruleName,
	                            getMessage: getMessage
	                        };
	                        if (a) {
	                            resolve(true);
	                        } else {
	                            isOk = false;
	                            ngs.push(reason);
	                            resolve(false);
	                        }
	                    };
	                    field.data = {};
	                    field.data[ruleName] = ruleValue;
	                    hook.get(value, field, next);
	                }
	            }

	            //如果promises不为空，说明经过验证拦截器
	            return Promise.all(promises).then(function (array) {
	                if (!isValidateAll) {
	                    var validator = field.validator;
	                    if (isOk) {
	                        validator.onSuccess.call(elem, [{
	                            data: field.data,
	                            element: elem
	                        }], event);
	                    } else {
	                        validator.onError.call(elem, ngs, event);
	                    }
	                    validator.onComplete.call(elem, ngs, event);
	                }
	                return ngs;
	            });
	        }
	    });

	    var rformat = /\\?{{([^{}]+)\}}/gm;

	    function getMessage() {
	        var data = this.data || {};
	        return this.message.replace(rformat, function (_, name) {
	            return data[name] == null ? '' : data[name];
	        });
	    }
	    valiDir.defaults = {
	        validate: valiDir.validate,
	        addField: valiDir.addField, //供内部使用,收集此元素底下的所有ms-duplex的域对象
	        onError: avalon.noop,
	        onSuccess: avalon.noop,
	        onComplete: avalon.noop,
	        onManual: avalon.noop,
	        onReset: avalon.noop,
	        onValidateAll: avalon.noop,
	        validateInBlur: true, //@config {Boolean} true，在blur事件中进行验证,触发onSuccess, onError, onComplete回调
	        validateInKeyup: true, //@config {Boolean} true，在keyup事件中进行验证,触发onSuccess, onError, onComplete回调
	        validateAllInSubmit: true, //@config {Boolean} true，在submit事件中执行onValidateAll回调
	        resetInFocus: true, //@config {Boolean} true，在focus事件中执行onReset回调,
	        deduplicateInValidateAll: false //@config {Boolean} false，在validateAll回调中对reason数组根据元素节点进行去重
	    };

	    /**
	     * 一个directive装饰器
	     * @returns {directive}
	     */
	    // DirectiveDecorator(scope, binding, vdom, this)
	    // Decorator(vm, options, callback)
	    function Directive(vm, binding, vdom, render) {
	        var type = binding.type;
	        var decorator = avalon.directives[type];
	        if (inBrowser) {
	            var dom = avalon.vdom(vdom, 'toDOM');
	            if (dom.nodeType === 1) {
	                dom.removeAttribute(binding.attrName);
	            }
	            vdom.dom = dom;
	        }
	        var callback = decorator.update ? function (value) {
	            if (!render.mount && /css|visible|duplex/.test(type)) {
	                render.callbacks.push(function () {
	                    decorator.update.call(directive$$1, directive$$1.node, value);
	                });
	            } else {
	                decorator.update.call(directive$$1, directive$$1.node, value);
	            }
	        } : avalon.noop;
	        for (var key in decorator) {
	            binding[key] = decorator[key];
	        }
	        binding.node = vdom;
	        var directive$$1 = new Action(vm, binding, callback);
	        if (directive$$1.init) {
	            //这里可能会重写node, callback, type, name
	            directive$$1.init();
	        }
	        directive$$1.update();
	        return directive$$1;
	    }

	    var eventMap = avalon.oneObject('animationend,blur,change,input,' + 'click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,' + 'mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit', 'on');
	    function parseAttributes(dirs, tuple) {
	        var node = tuple[0],
	            uniq = {},
	            bindings = [];
	        var hasIf = false;
	        for (var name in dirs) {
	            var value = dirs[name];
	            var arr = name.split('-');
	            // ms-click
	            if (name in node.props) {
	                var attrName = name;
	            } else {
	                attrName = ':' + name.slice(3);
	            }
	            if (eventMap[arr[1]]) {
	                arr.splice(1, 0, 'on');
	            }
	            //ms-on-click
	            if (arr[1] === 'on') {
	                arr[3] = parseFloat(arr[3]) || 0;
	            }

	            var type = arr[1];
	            if (type === 'controller' || type === 'important') continue;
	            if (directives[type]) {

	                var binding = {
	                    type: type,
	                    param: arr[2],
	                    attrName: attrName,
	                    name: arr.join('-'),
	                    expr: value,
	                    priority: directives[type].priority || type.charCodeAt(0) * 100
	                };
	                if (type === 'if') {
	                    hasIf = true;
	                }
	                if (type === 'on') {
	                    binding.priority += arr[3];
	                }
	                if (!uniq[binding.name]) {
	                    uniq[binding.name] = value;
	                    bindings.push(binding);
	                    if (type === 'for') {
	                        return [avalon.mix(binding, tuple[3])];
	                    }
	                }
	            }
	        }
	        bindings.sort(byPriority);

	        if (hasIf) {
	            var ret = [];
	            for (var i = 0, el; el = bindings[i++];) {
	                ret.push(el);
	                if (el.type === 'if') {
	                    return ret;
	                }
	            }
	        }
	        return bindings;
	    }
	    function byPriority(a, b) {
	        return a.priority - b.priority;
	    }

	    var rimprovePriority = /[+-\?]/;
	    var rinnerValue = /__value__\)$/;
	    function parseInterpolate(dir) {
	        var rlineSp = /\n\r?/g;
	        var str = dir.nodeValue.trim().replace(rlineSp, '');
	        var tokens = [];
	        do {
	            //aaa{{@bbb}}ccc
	            var index = str.indexOf(config.openTag);
	            index = index === -1 ? str.length : index;
	            var value = str.slice(0, index);
	            if (/\S/.test(value)) {
	                tokens.push(avalon.quote(avalon._decode(value)));
	            }
	            str = str.slice(index + config.openTag.length);
	            if (str) {
	                index = str.indexOf(config.closeTag);
	                var value = str.slice(0, index);
	                var expr = avalon.unescapeHTML(value);
	                if (/\|\s*\w/.test(expr)) {
	                    //如果存在过滤器，优化干掉
	                    var arr = addScope(expr, 'expr');
	                    if (arr[1]) {
	                        expr = arr[1].replace(rinnerValue, arr[0] + ')');
	                    }
	                }
	                if (rimprovePriority) {
	                    expr = '(' + expr + ')';
	                }
	                tokens.push(expr);

	                str = str.slice(index + config.closeTag.length);
	            }
	        } while (str.length);
	        return [{
	            expr: tokens.join('+'),
	            name: 'expr',
	            type: 'expr'
	        }];
	    }

	    function getChildren(arr) {
	        var count = 0;
	        for (var i = 0, el; el = arr[i++];) {
	            if (el.nodeName === '#document-fragment') {
	                count += getChildren(el.children);
	            } else {
	                count += 1;
	            }
	        }
	        return count;
	    }
	    function groupTree(parent, children) {
	        children && children.forEach(function (vdom) {
	            if (!vdom) return;
	            var vlength = vdom.children && getChildren(vdom.children);
	            if (vdom.nodeName === '#document-fragment') {
	                var dom = createFragment();
	            } else {
	                dom = avalon.vdom(vdom, 'toDOM');
	                var domlength = dom.childNodes && dom.childNodes.length;
	                if (domlength && vlength && domlength > vlength) {
	                    if (!appendChildMayThrowError[dom.nodeName]) {
	                        avalon.clearHTML(dom);
	                    }
	                }
	            }
	            if (vlength) {
	                groupTree(dom, vdom.children);
	                if (vdom.nodeName === 'select') {
	                    var values = [];
	                    getSelectedValue(vdom, values);
	                    lookupOption(vdom, values);
	                }
	            }
	            //高级版本可以尝试 querySelectorAll

	            try {
	                if (!appendChildMayThrowError[parent.nodeName]) {
	                    parent.appendChild(dom);
	                }
	            } catch (e) {}
	        });
	    }

	    function dumpTree(elem) {
	        var firstChild;
	        while (firstChild = elem.firstChild) {
	            if (firstChild.nodeType === 1) {
	                dumpTree(firstChild);
	            }
	            elem.removeChild(firstChild);
	        }
	    }

	    function getRange(childNodes, node) {
	        var i = childNodes.indexOf(node) + 1;
	        var deep = 1,
	            nodes = [],
	            end;
	        nodes.start = i;
	        while (node = childNodes[i++]) {
	            nodes.push(node);
	            if (node.nodeName === '#comment') {
	                if (startWith(node.nodeValue, 'ms-for:')) {
	                    deep++;
	                } else if (node.nodeValue === 'ms-for-end:') {
	                    deep--;
	                    if (deep === 0) {
	                        end = node;
	                        nodes.pop();
	                        break;
	                    }
	                }
	            }
	        }
	        nodes.end = end;
	        return nodes;
	    }

	    function startWith(long, short) {
	        return long.indexOf(short) === 0;
	    }

	    var appendChildMayThrowError = {
	        '#text': 1,
	        '#comment': 1,
	        script: 1,
	        style: 1,
	        noscript: 1
	    };

	    /**
	     * 生成一个渲染器,并作为它第一个遇到的ms-controller对应的VM的$render属性
	     * @param {String|DOM} node
	     * @param {ViewModel|Undefined} vm
	     * @param {Function|Undefined} beforeReady
	     * @returns {Render}
	     */
	    avalon.scan = function (node, vm, beforeReady) {
	        return new Render(node, vm, beforeReady || avalon.noop);
	    };

	    /**
	     * avalon.scan 的内部实现
	     */
	    function Render(node, vm, beforeReady) {
	        this.root = node; //如果传入的字符串,确保只有一个标签作为根节点
	        this.vm = vm;
	        this.beforeReady = beforeReady;
	        this.bindings = []; //收集待加工的绑定属性
	        this.callbacks = [];
	        this.directives = [];
	        this.init();
	    }

	    Render.prototype = {
	        /**
	         * 开始扫描指定区域
	         * 收集绑定属性
	         * 生成指令并建立与VM的关联
	         */
	        init: function init() {
	            var vnodes;
	            if (this.root && this.root.nodeType > 0) {
	                vnodes = fromDOM(this.root); //转换虚拟DOM
	                //将扫描区域的每一个节点与其父节点分离,更少指令对DOM操作时,对首屏输出造成的频繁重绘
	                dumpTree(this.root);
	            } else if (typeof this.root === 'string') {
	                vnodes = fromString(this.root); //转换虚拟DOM
	            } else {
	                return avalon.warn('avalon.scan first argument must element or HTML string');
	            }

	            this.root = vnodes[0];
	            this.vnodes = vnodes;
	            this.scanChildren(vnodes, this.vm, true);
	        },
	        scanChildren: function scanChildren(children, scope, isRoot) {
	            for (var i = 0; i < children.length; i++) {
	                var vdom = children[i];
	                switch (vdom.nodeName) {
	                    case '#text':
	                        scope && this.scanText(vdom, scope);
	                        break;
	                    case '#comment':
	                        scope && this.scanComment(vdom, scope, children);
	                        break;
	                    case '#document-fragment':
	                        this.scanChildren(vdom.children, scope, false);
	                        break;
	                    default:
	                        this.scanTag(vdom, scope, children, false);
	                        break;
	                }
	            }
	            if (isRoot) {
	                this.complete();
	            }
	        },


	        /**
	         * 从文本节点获取指令
	         * @param {type} vdom 
	         * @param {type} scope
	         * @returns {undefined}
	         */
	        scanText: function scanText(vdom, scope) {
	            if (config.rexpr.test(vdom.nodeValue)) {
	                this.bindings.push([vdom, scope, {
	                    nodeValue: vdom.nodeValue
	                }]);
	            }
	        },


	        /**
	         * 从注释节点获取指令
	         * @param {type} vdom 
	         * @param {type} scope
	         * @param {type} parentChildren
	         * @returns {undefined}
	         */
	        scanComment: function scanComment(vdom, scope, parentChildren) {
	            if (startWith(vdom.nodeValue, 'ms-for:')) {
	                this.getForBinding(vdom, scope, parentChildren);
	            }
	        },


	        /**
	         * 从元素节点的nodeName与属性中获取指令
	         * @param {type} vdom 
	         * @param {type} scope
	         * @param {type} parentChildren
	         * @param {type} isRoot 用于执行complete方法
	         * @returns {undefined}
	         */
	        scanTag: function scanTag(vdom, scope, parentChildren, isRoot) {
	            var dirs = {},
	                attrs = vdom.props,
	                hasDir,
	                hasFor;
	            for (var attr in attrs) {
	                var value = attrs[attr];
	                var oldName = attr;
	                if (attr.charAt(0) === ':') {
	                    attr = 'ms-' + attr.slice(1);
	                }
	                if (startWith(attr, 'ms-')) {
	                    dirs[attr] = value;
	                    var type = attr.match(/\w+/g)[1];
	                    type = eventMap[type] || type;
	                    if (!directives[type]) {
	                        avalon.warn(attr + ' has not registered!');
	                    }
	                    hasDir = true;
	                }
	                if (attr === 'ms-for') {
	                    hasFor = value;
	                    delete attrs[oldName];
	                }
	            }
	            var $id = dirs['ms-important'] || dirs['ms-controller'];
	            if ($id) {
	                /**
	                 * 后端渲染
	                 * serverTemplates后端给avalon添加的对象,里面都是模板,
	                 * 将原来后端渲染好的区域再还原成原始样子,再被扫描
	                 */
	                var templateCaches = avalon.serverTemplates;
	                var temp = templateCaches && templateCaches[$id];
	                if (temp) {
	                    avalon.log('前端再次渲染后端传过来的模板');
	                    var node = fromString(tmpl)[0];
	                    for (var i in node) {
	                        vdom[i] = node[i];
	                    }
	                    delete templateCaches[$id];
	                    this.scanTag(vdom, scope, parentChildren, isRoot);
	                    return;
	                }
	                //推算出指令类型
	                var type = dirs['ms-important'] === $id ? 'important' : 'controller';
	                //推算出用户定义时属性名,是使用ms-属性还是:属性
	                var attrName = 'ms-' + type in attrs ? 'ms-' + type : ':' + type;

	                if (inBrowser) {
	                    delete attrs[attrName];
	                }
	                var dir = directives[type];
	                scope = dir.getScope.call(this, $id, scope);
	                if (!scope) {
	                    return;
	                } else {
	                    var clazz = attrs['class'];
	                    if (clazz) {
	                        attrs['class'] = (' ' + clazz + ' ').replace(' ms-controller ', '').trim();
	                    }
	                }
	                var render = this;
	                scope.$render = render;
	                this.callbacks.push(function () {
	                    //用于删除ms-controller
	                    dir.update.call(render, vdom, attrName, $id);
	                });
	            }
	            if (hasFor) {
	                if (vdom.dom) {
	                    vdom.dom.removeAttribute(oldName);
	                }
	                return this.getForBindingByElement(vdom, scope, parentChildren, hasFor);
	            }

	            if (/^ms\-/.test(vdom.nodeName)) {
	                attrs.is = vdom.nodeName;
	            }

	            if (attrs['is']) {
	                if (!dirs['ms-widget']) {
	                    dirs['ms-widget'] = '{}';
	                }
	                hasDir = true;
	            }
	            if (hasDir) {
	                this.bindings.push([vdom, scope, dirs]);
	            }
	            var children = vdom.children;
	            //如果存在子节点,并且不是容器元素(script, stype, textarea, xmp...)
	            if (!orphanTag[vdom.nodeName] && children && children.length && !delayCompileNodes(dirs)) {
	                this.scanChildren(children, scope, false);
	            }
	        },


	        /**
	         * 将绑定属性转换为指令
	         * 执行各种回调与优化指令
	         * @returns {undefined}
	         */
	        complete: function complete() {
	            this.yieldDirectives();
	            this.beforeReady();
	            if (inBrowser) {
	                var root$$1 = this.root;
	                if (inBrowser) {
	                    var rootDom = avalon.vdom(root$$1, 'toDOM');
	                    groupTree(rootDom, root$$1.children);
	                }
	            }

	            this.mount = true;
	            var fn;
	            while (fn = this.callbacks.pop()) {
	                fn();
	            }
	            this.optimizeDirectives();
	        },


	        /**
	         * 将收集到的绑定属性进行深加工,最后转换指令
	         * @returns {Array<tuple>}
	         */
	        yieldDirectives: function yieldDirectives() {
	            var tuple;
	            while (tuple = this.bindings.shift()) {
	                var vdom = tuple[0],
	                    scope = tuple[1],
	                    dirs = tuple[2],
	                    bindings = [];
	                if ('nodeValue' in dirs) {
	                    bindings = parseInterpolate(dirs);
	                } else if (!('ms-skip' in dirs)) {
	                    bindings = parseAttributes(dirs, tuple);
	                }
	                for (var i = 0, binding; binding = bindings[i++];) {
	                    var dir = directives[binding.type];
	                    if (!inBrowser && /on|duplex|active|hover/.test(binding.type)) {
	                        continue;
	                    }
	                    if (dir.beforeInit) {
	                        dir.beforeInit.call(binding);
	                    }

	                    var directive$$1 = new Directive(scope, binding, vdom, this);
	                    this.directives.push(directive$$1);
	                }
	            }
	        },


	        /**
	         * 修改指令的update与callback方法,让它们以后执行时更加高效
	         * @returns {undefined}
	         */
	        optimizeDirectives: function optimizeDirectives() {
	            for (var i = 0, el; el = this.directives[i++];) {
	                el.callback = directives[el.type].update;
	                el.update = newUpdate;
	                el._isScheduled = false;
	            }
	        },

	        update: function update() {
	            for (var i = 0, el; el = this.directives[i++];) {
	                el.update();
	            }
	        },

	        /**
	         * 销毁所有指令
	         * @returns {undefined}
	         */
	        dispose: function dispose() {
	            var list = this.directives || [];
	            for (var i = 0, el; el = list[i++];) {
	                el.dispose();
	            }
	            //防止其他地方的this.innerRender && this.innerRender.dispose报错
	            for (var _i5 in this) {
	                if (_i5 !== 'dispose') delete this[_i5];
	            }
	        },


	        /**
	         * 将循环区域转换为for指令
	         * @param {type} begin 注释节点
	         * @param {type} scope
	         * @param {type} parentChildren
	         * @param {type} userCb 循环结束回调
	         * @returns {undefined}
	         */
	        getForBinding: function getForBinding(begin, scope, parentChildren, userCb) {
	            var expr = begin.nodeValue.replace('ms-for:', '').trim();
	            begin.nodeValue = 'ms-for:' + expr;
	            var nodes = getRange(parentChildren, begin);
	            var end = nodes.end;
	            var fragment = avalon.vdom(nodes, 'toHTML');
	            parentChildren.splice(nodes.start, nodes.length);
	            begin.props = {};
	            this.bindings.push([begin, scope, {
	                'ms-for': expr
	            }, {
	                begin: begin,
	                end: end,
	                expr: expr,
	                userCb: userCb,
	                fragment: fragment,
	                parentChildren: parentChildren
	            }]);
	        },


	        /**
	         * 在带ms-for元素节点旁添加两个注释节点,组成循环区域
	         * @param {type} vdom
	         * @param {type} scope
	         * @param {type} parentChildren
	         * @param {type} expr
	         * @returns {undefined}
	         */
	        getForBindingByElement: function getForBindingByElement(vdom, scope, parentChildren, expr) {
	            var index = parentChildren.indexOf(vdom); //原来带ms-for的元素节点
	            var props = vdom.props;
	            var begin = {
	                nodeName: '#comment',
	                nodeValue: 'ms-for:' + expr
	            };
	            if (props.slot) {
	                begin.slot = props.slot;
	                delete props.slot;
	            }
	            var end = {
	                nodeName: '#comment',
	                nodeValue: 'ms-for-end:'
	            };
	            parentChildren.splice(index, 1, begin, vdom, end);
	            this.getForBinding(begin, scope, parentChildren, props['data-for-rendered']);
	        }
	    };
	    var viewID;

	    function newUpdate() {
	        var oldVal = this.beforeUpdate();
	        var newVal = this.value = this.get();
	        if (this.callback && this.diff(newVal, oldVal)) {
	            this.callback(this.node, this.value);
	            var vm = this.vm;
	            var $render = vm.$render;
	            var list = vm.$events['onViewChange'];
	            /* istanbul ignore if */
	            if (list && $render && $render.root && !avalon.viewChanging) {
	                if (viewID) {
	                    clearTimeout(viewID);
	                    viewID = null;
	                }
	                viewID = setTimeout(function () {
	                    list.forEach(function (el) {
	                        el.callback.call(vm, {
	                            type: 'viewchange',
	                            target: $render.root,
	                            vmodel: vm
	                        });
	                    });
	                });
	            }
	        }
	        this._isScheduled = false;
	    }

	    var events = 'onInit,onReady,onViewChange,onDispose,onEnter,onLeave';
	    var componentEvents = avalon.oneObject(events);

	    function toObject(value) {
	        var value = platform.toJson(value);
	        if (Array.isArray(value)) {
	            var v = {};
	            value.forEach(function (el) {
	                el && avalon.shadowCopy(v, el);
	            });
	            return v;
	        }
	        return value;
	    }
	    var componentQueue = [];
	    avalon.directive('widget', {
	        delay: true,
	        priority: 4,
	        deep: true,
	        init: function init() {
	            //cached属性必须定义在组件容器里面,不是template中
	            var vdom = this.node;
	            this.cacheVm = !!vdom.props.cached;
	            if (vdom.dom && vdom.nodeName === '#comment') {
	                var comment = vdom.dom;
	            }
	            var oldValue = this.getValue();
	            var value = toObject(oldValue);
	            //外部VM与内部VM
	            // ＝＝＝创建组件的VM＝＝BEGIN＝＝＝
	            var is = vdom.props.is || value.is;
	            this.is = is;
	            var component = avalon.components[is];
	            //外部传入的总大于内部
	            if (!('fragment' in this)) {
	                if (!vdom.isVoidTag) {
	                    //提取组件容器内部的东西作为模板
	                    var text = vdom.children[0];
	                    if (text && text.nodeValue) {
	                        this.fragment = text.nodeValue;
	                    } else {
	                        this.fragment = avalon.vdom(vdom.children, 'toHTML');
	                    }
	                } else {
	                    this.fragment = false;
	                }
	            }
	            //如果组件还没有注册，那么将原元素变成一个占位用的注释节点
	            if (!component) {
	                this.readyState = 0;
	                vdom.nodeName = '#comment';
	                vdom.nodeValue = 'unresolved component placeholder';
	                delete vdom.dom;
	                avalon.Array.ensure(componentQueue, this);
	                return;
	            }
	            this.readyState = 1;
	            //如果是非空元素，比如说xmp, ms-*, template
	            var id = value.id || value.$id;
	            var hasCache = avalon.vmodels[id];
	            var fromCache = false;

	            if (hasCache) {
	                comVm = hasCache;
	                this.comVm = comVm;
	                replaceRoot(this, comVm.$render);
	                fromCache = true;
	            } else {
	                if (typeof component === 'function') {
	                    component = new component(value);
	                }
	                var comVm = createComponentVm(component, value, is, this.fragment);
	                fireComponentHook(comVm, vdom, 'Init');
	                this.comVm = comVm;

	                // ＝＝＝创建组件的VM＝＝END＝＝＝
	                var innerRender = avalon.scan(component.template, comVm);
	                comVm.$render = innerRender;
	                replaceRoot(this, innerRender);
	                var nodesWithSlot = [];
	                var directives$$1 = [];
	                if (this.fragment || component.soleSlot) {
	                    var curVM = this.fragment ? this.vm : comVm;
	                    var curText = this.fragment || '{{##' + component.soleSlot + '}}';
	                    var childBoss = avalon.scan('<div>' + curText + '</div>', curVM, function () {
	                        nodesWithSlot = this.root.children;
	                    });
	                    directives$$1 = childBoss.directives;
	                    this.childBoss = childBoss;
	                    for (var i in childBoss) {
	                        delete childBoss[i];
	                    }
	                }
	                Array.prototype.push.apply(innerRender.directives, directives$$1);

	                var arraySlot = [],
	                    objectSlot = {};
	                //从用户写的元素内部 收集要移动到 新创建的组件内部的元素
	                if (component.soleSlot) {
	                    arraySlot = nodesWithSlot;
	                } else {
	                    nodesWithSlot.forEach(function (el, i) {
	                        //要求带slot属性
	                        if (el.slot) {
	                            var nodes = getRange(nodesWithSlot, el);
	                            nodes.push(nodes.end);
	                            nodes.unshift(el);
	                            objectSlot[el.slot] = nodes;
	                        } else if (el.props) {
	                            var name = el.props.slot;
	                            if (name) {
	                                delete el.props.slot;
	                                if (Array.isArray(objectSlot[name])) {
	                                    objectSlot[name].push(el);
	                                } else {
	                                    objectSlot[name] = [el];
	                                }
	                            }
	                        }
	                    });
	                }
	                //将原来元素的所有孩子，全部移动新的元素的第一个slot的位置上
	                if (component.soleSlot) {
	                    insertArraySlot(innerRender.vnodes, arraySlot);
	                } else {
	                    insertObjectSlot(innerRender.vnodes, objectSlot);
	                }
	            }

	            if (comment) {
	                var dom = avalon.vdom(vdom, 'toDOM');
	                comment.parentNode.replaceChild(dom, comment);
	                comVm.$element = innerRender.root.dom = dom;
	                delete this.reInit;
	            }

	            //处理DOM节点

	            dumpTree(vdom.dom);
	            comVm.$element = vdom.dom;
	            groupTree(vdom.dom, vdom.children);
	            if (fromCache) {
	                fireComponentHook(comVm, vdom, 'Enter');
	            } else {
	                fireComponentHook(comVm, vdom, 'Ready');
	            }
	        },
	        diff: function diff(newVal, oldVal) {
	            if (cssDiff.call(this, newVal, oldVal)) {
	                return true;
	            }
	        },

	        update: function update(vdom, value) {
	            //this.oldValue = value //★★防止递归

	            switch (this.readyState) {
	                case 0:
	                    if (this.reInit) {
	                        this.init();
	                    }
	                    break;
	                case 1:
	                    this.readyState++;
	                    break;
	                default:
	                    this.readyState++;
	                    var comVm = this.comVm;
	                    avalon.viewChanging = true;
	                    avalon.transaction(function () {
	                        for (var i in value) {
	                            if (comVm.hasOwnProperty(i)) {
	                                if (Array.isArray(value[i])) {
	                                    comVm[i] = value[i].concat();
	                                } else {
	                                    comVm[i] = value[i];
	                                }
	                            }
	                        }
	                    });

	                    //要保证要先触发孩子的ViewChange 然后再到它自己的ViewChange
	                    fireComponentHook(comVm, vdom, 'ViewChange');
	                    delete avalon.viewChanging;
	                    break;
	            }
	            this.value = avalon.mix(true, {}, value);
	        },
	        beforeDispose: function beforeDispose() {
	            var comVm = this.comVm;
	            if (!this.cacheVm) {
	                fireComponentHook(comVm, this.node, 'Dispose');
	                comVm.$hashcode = false;
	                delete avalon.vmodels[comVm.$id];
	                this.innerRender && this.innerRender.dispose();
	            } else {
	                fireComponentHook(comVm, this.node, 'Leave');
	            }
	        }
	    });

	    function replaceRoot(instance, innerRender) {
	        instance.innerRender = innerRender;
	        var root$$1 = innerRender.root;
	        var vdom = instance.node;
	        var slot = vdom.props.slot;
	        for (var i in root$$1) {
	            vdom[i] = root$$1[i];
	        }
	        if (vdom.props && slot) {
	            vdom.props.slot = slot;
	        }
	        innerRender.root = vdom;
	        innerRender.vnodes[0] = vdom;
	    }

	    function fireComponentHook(vm, vdom, name) {
	        var list = vm.$events['on' + name];
	        if (list) {
	            list.forEach(function (el) {
	                setTimeout(function () {
	                    el.callback.call(vm, {
	                        type: name.toLowerCase(),
	                        target: vdom.dom,
	                        vmodel: vm
	                    });
	                }, 0);
	            });
	        }
	    }

	    function createComponentVm(component, value, is, fragment) {
	        var hooks = [];
	        var defaults = component.defaults;
	        collectHooks(defaults, hooks);
	        collectHooks(value, hooks);
	        var obj = {};
	        for (var i in defaults) {
	            var val = value[i];
	            if (val == null) {
	                obj[i] = defaults[i];
	            } else {
	                obj[i] = val;
	            }
	        }
	        obj.$id = value.id || value.$id || avalon.makeHashCode(is);
	        delete obj.id;
	        var def = avalon.mix(true, {}, obj);
	        AB.preHandleComVm(is,def,fragment);
	        var vm = avalon.define(def);
	        hooks.forEach(function (el) {
	            vm.$watch(el.type, el.cb);
	        });
	        return vm;
	    }

	    function collectHooks(a, list) {
	        for (var i in a) {
	            if (componentEvents[i]) {
	                if (typeof a[i] === 'function' && i.indexOf('on') === 0) {
	                    list.unshift({
	                        type: i,
	                        cb: a[i]
	                    });
	                }
	                //delete a[i] 这里不能删除,会导致再次切换时没有onReady
	            }
	        }
	    }

	    function resetParentChildren(nodes, arr) {
	        var dir = arr && arr[0] && arr[0].forDir;
	        if (dir) {
	            dir.parentChildren = nodes;
	        }
	    }

	    function insertArraySlot(nodes, arr) {
	        for (var i = 0, el; el = nodes[i]; i++) {
	            if (el.nodeName === 'slot') {
	                resetParentChildren(nodes, arr);
	                nodes.splice.apply(nodes, [i, 1].concat(arr));
	                break;
	            } else if (el.children) {
	                insertArraySlot(el.children, arr);
	            }
	        }
	    }

	    function insertObjectSlot(nodes, obj) {
	        for (var i = 0, el; el = nodes[i]; i++) {
	            if (el.nodeName === 'slot') {
	                var name = el.props.name;
	                resetParentChildren(nodes, obj[name]);
	                nodes.splice.apply(nodes, [i, 1].concat(obj[name]));
	                continue;
	            } else if (el.children) {
	                insertObjectSlot(el.children, obj);
	            }
	        }
	    }

	    avalon.components = {};
	    avalon.component = function (name, component) {

	        component.extend = componentExtend;
	        return addToQueue(name, component);
	    };
	    function addToQueue(name, component) {
	        avalon.components[name] = component;
	        for (var el, i = 0; el = componentQueue[i]; i++) {
	            if (el.is === name) {
	                componentQueue.splice(i, 1);
	                el.reInit = true;
	                delete el.value;
	                el.update();
	                i--;
	            }
	        }
	        return component;
	    }

	    function componentExtend(child) {
	        var name = child.displayName;
	        delete child.displayName;
	        var obj = { defaults: avalon.mix(true, {}, this.defaults, child.defaults) };
	        if (child.soleSlot) {
	            obj.soleSlot = child.soleSlot;
	        }
	        obj.template = child.template || this.template;
	        return avalon.component(name, obj);
	    }

	    return avalon;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	//基本样式
	var debug = true;
	avalon.config({
		debug : debug
	});
	__webpack_require__(16);
	//avalonbootstrap基础库
	var AB = window.AB = {
		isSubNode : function(target,pCls){
			if(avalon(target).hasClass(pCls)) return true;
			if(target.tagName && target.tagName.toLowerCase() === "body") return false;
			var p = target.parentNode;
			while(p && p.tagName && p.tagName.toLowerCase() !== "body"){
				if(avalon(p).hasClass(pCls)) return true;
				p = p.parentNode;
			}
			return false;
		},
		support : {
			transitionend : (function(){
				var el = document.createElement('div');
				var transEndEventNames = {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition: 'transitionend',
					OTransition: 'oTransitionEnd otransitionend',
					transition: 'transitionend'
				};
				for (var name in transEndEventNames) {
					if (el.style[name] !== undefined) {
						return transEndEventNames[name];
					}
				}
				return false;
			})()
		},
		preHandleComVm : function(is,vm,fragment){
			var handler = AB.preHandlers[is];
			if(handler){
				handler(vm,fragment);
			}
		},
		getUUID : function(prefix){
			return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, prefix || "");
		}
	};
	AB.preHandlers = {};
	//获取所有子元素，非文本节点
	avalon.fn.children = function(index){
		var children = [];
		avalon.each(this[0].childNodes,function(i,node){
			node.nodeType === 1 && children.push(node);
		});
		if(index === undefined){
			return children;
		}else{
			return children[index];
		}
	};
	avalon.fn.appendHTML = function(htmlStr){
		var div = document.createElement("div");
		var fragment = document.createDocumentFragment();
		div.innerHTML = htmlStr;
		var nodes = div.childNodes;
		var first;
	  for (var i=0, length=nodes.length; i<length; i++) {
	  	var node = nodes[i].cloneNode(true);
	  	if(!first){
	  		first = node;
	  	}
	    fragment.appendChild(node);
	  }
	  this[0].appendChild(fragment);
	  return first;
	  //el.insertBefore(fragment, el.firstChild);
	  
	};
	/*loading*/
	avalon.fn.loading = function(isloading){
		var el = this[0];
		var loadingNum = +el.getAttribute("data-loading-num") || 0;
		if(!isloading){
			if(loadingNum === 1){
				avalon.each(this.children(),function(i,node){
					var cls = node.className;
					if(cls === 'loading-mask' || cls === 'loading-main'){
						el.removeChild(node);
					}
				});
			}
			loadingNum > 0 && el.setAttribute("data-loading-num",--loadingNum);
		}else{
			if(loadingNum === 0){
				var mask = document.createElement("div");
				mask.className = 'loading-mask';
				var loading = document.createElement("div");
				loading.className = 'loading-main';
				loading.innerHTML = '<span class="loading"></span>';
				el.appendChild(mask);
				el.appendChild(loading);
			}
			el.setAttribute("data-loading-num",++loadingNum);
		}
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(17, function() {
				var newContent = __webpack_require__(17);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".loading{display: inline-block;width: 32px;height: 32px;background: url(" + __webpack_require__(18) + ") no-repeat 0 0;}\r\n.loading-mask{\r\n\tposition: absolute;left: 0;top: 0;right: 0;bottom: 0;background-color: #eee;\r\n\topacity: 0.3;filter:alpha(opacity=30);z-index: 1000;\r\n}\r\n.loading-main{\r\n\tposition: absolute;left: 50%;top: 50%;width: 32px;height: 32px;margin-left: -16px;margin-top: -16px;\r\n\tz-index: 1001;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "image/loading.gif";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(20);
	var tpl = __webpack_require__(22);
	function findItem(vm,func){
		for(var i=0,ii;ii=vm.data[i++];){
			if(!ii.children) continue;
			for(var j=0,jj;jj=ii.children[j++];){
				if(func.call(vm,jj,i - 1)){
					return jj;
				}
			}
		}
		return null;
	}
	function getObj(obj){
		return avalon.mix({
			title : '',
			content : '',
			iconCls : '',
			children : [],
			_selected : false
		},obj);
	}
	AB.preHandlers["ms-accordion"] = function(vm,fragment){
		var accordionData = [];
		var data = vm.data;
		if(!data || data.length === 0){
			if(fragment){
				var div = document.createElement('div');
				div.innerHTML = fragment;
				var chs = avalon(div).children();
				avalon.each(chs,function(i,v){
					var obj = getObj({});
					obj.title = v.title;
					obj.content = v.innerHTML;
					accordionData.push(obj);
				});
			}
		}else{
			avalon.each(data,function(i,v){
				var obj = getObj(v);
				if(obj.children && obj.children.length){
					//只允许一个select
					var hasSel = false;
					avalon.each(obj.children,function(j,v){
						if(hasSel){
							v.selected = false;
							return;
						}
						if(v.selected){
							hasSel = true;
						}else if(v.selected === undefined){
							v.selected = false;
						}
					});
				}
				accordionData.push(obj);
			});
		}
		vm.data = accordionData;
	};
	avalon.component('ms-accordion', {
	  template: tpl,
	  defaults: {
	  	$lastSel : null,
	  	onReady : function(){
	  		if(this.$multipleSel) return;
	  		var me = this;
	  		avalon.each(this.data,function(i,v){
	  			if(v._selected){
	  				me.$lastSel = v;
	  				return false;
	  			}
	  		});
	  	},
			clickHeader : function(el){
				if(this.$multipleSel){
					el._selected = !el._selected;
				}else{
					if(this.$lastSel){
						this.$lastSel._selected = false;
					}
					if(this.$lastSel === el) {
						this.$lastSel = null;
						return;
					}
					el._selected = true;
					this.$lastSel = el;
				}
			},
			//属性
			$multipleSel : false,
	    data : [/*{
				title : panel标题,
				content : panel body html,
				iconCls : panel标题左边的图标,
				children : 若content为空，则取children为body内容
					selected : 是否选中
					title : 显示文字
					iconCls : 文字左边图标
			}*/],
			//方法
			//选中item
			selectItem : function(ch){
				if(ch.selected) return;
				var sel = this.getSelectedItem();
				sel && (sel.selected = false);
				ch.selected = true;
				this.onSelectItem(ch);
			},
			findItem : function(func){
				return findItem(this,func);
			},
			//获取所选的panel下的子item
			getSelectedItem : function(){
				return findItem(this,function(jj){
					return jj.selected;
				});
			},
			//根据text选取item
			selectItemByText : function(text){
				return findItem(this,function(jj,i){
					if(jj.title === text){
						this.curIndex = i;
						this.selectItem(jj);
						return true;
					}
				});
			},
			onSelectItem : avalon.noop
	  }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(21, function() {
				var newContent = __webpack_require__(21);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".maccordion{border-bottom: 1px solid #ddd}\r\n.maccordion .panel{\r\n\tborder: 0;\r\n\tmargin-top: 0!important;border-radius: 0!important;\r\n}\r\n.maccordion .panel-heading{cursor: pointer;border-radius: 0;border:1px solid #ddd;}\r\n.maccordion .panel-heading:hover,\r\n.maccordion .panel.selected .panel-heading{background-color: #337AB7;color: #fff;border-color:#337AB7;}\r\n.maccordion .panel.selected .panel-body{border-bottom:0;}\r\n.maccordion .panel-body{border:1px solid #ddd;}\r\n.maccordion-collapse{\r\n\t-webkit-transition-duration: .35s;\r\n   \t-o-transition-duration: .35s;\r\n    transition-duration: .35s;\r\n}\r\n.maccordion .list-group{border-top: 0!important;border-left:1px solid #ddd;border-right: 1px solid #ddd}\r\n.maccordion .list-group-item{font-size: 16px;border-radius: 0!important;position: relative;}\r\n.maccordion .list-group-item.selected{background-color: #3E98EA;color: #fff}\r\n.maccordion .list-group-item .marrow{\r\n\tposition: absolute;\r\n\tdisplay: inline-block;\r\n\tborder-style: solid;\r\n\tborder-width: 10px 10px 10px 0;\r\n\tborder-color: transparent #fff transparent transparent;\r\n\tright: -1px;top: 50%;margin-top: -10px;\r\n}\r\n.maccordion-i{margin-right: 5px}", ""]);

	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div class='panel-group maccordion'>\r\n\t<div class=\"panel panel-default\" ms-for='(i,el) in @data' ms-class='{selected:@el._selected,last:i === @data.length - 1}'>\r\n\t\t<div class=\"panel-heading\" ms-click='@clickHeader(el)'>\r\n\t\t\t<h4 class=\"panel-title\">\r\n\t\t\t\t<i ms-if='el.iconCls' class=\"glyphicon maccordion-i\" ms-class='el.iconCls'></i> \r\n\t\t\t\t{{el.title}}\r\n\t\t\t\t<span class='pull-right glyphicon' ms-class=\"[@el._selected ? 'glyphicon-menu-down' : 'glyphicon-menu-right']\"></span>\r\n\t\t\t</h4>\r\n\t\t</div>\r\n\t\t<div class=\"panel-collapse maccordion-collapse\" ms-visible='el._selected'>\r\n\t\t\t<div ms-if='el.children && el.children.length > 0' class=\"list-group\">\r\n\t\t\t\t<a ms-for='(j,el,a) in el.children' href=\"javascript:void(0)\" class=\"list-group-item\" ms-class='{selected:el.selected}' ms-click='@selectItem(el)'>\r\n\t\t\t\t\t<i style='visibility:hidden'>空</i>\r\n\t\t\t\t\t<i ms-if='el.iconCls' class='glyphicon maccordion-i' ms-class='el.iconCls'></i>\r\n\t\t\t\t\t{{el.title}}\r\n\t\t\t\t\t<span class='marrow' ms-visible='el.selected'></span>\r\n\t\t\t\t</a>\r\n\t\t\t</div>\r\n\t\t\t<div ms-if='!el.children || el.children.length === 0' class=\"panel-body\" ms-html=\"el.content\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<!--  ms-effect=\"accordion-collapse\" -->\r\n</div>";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(24);
	function initButtons(buttons){
		avalon.each(buttons,function(i,el){
			var obj = {
				close : false,
				theme : 'default',
				handler : avalon.noop,
				text : "",
				iconCls : ''
			};
			for(var i in obj){
				if(el[i] === undefined){
					el[i] = obj[i];
				}
			}
		});
	}
	AB.preHandlers["ms-dialog"] = function(vm){
		initButtons(vm.buttons);
	};
	// var modalBackDrop;
	avalon.component("ms-dialog",{
		template: tpl,
		soleSlot: 'content',
		defaults : {
			//窗口正在关闭中标志，以防重复关闭
			$isClosing : false,
			//属性
			buttons : [],
			title : null,
			content : '',
			isOpen : false,
			isIn : false,
			zIndex : 1050,
			paddingBottom : "",
			btnAlign : "",
			//事件
			onBeforeOpen : avalon.noop,
			onOpen : avalon.noop,
			onBeforeClose : avalon.noop,
			onClose : avalon.noop,
			clickBtn : function(el){
				if(el.close){
					this.close();
				}else{
					el.handler && el.handler.call(this,this);
				}
			},
			close : function(e){
				if(this.onBeforeClose() === false || this.$isClosing) return;
				if(e && !avalon(e.target).hasClass("modal")){
					return;
				}
				this.isIn = false;
				if(AB.support.transitionend){
					this.$isClosing = true;
				}else{
					this.isOpen = false;
				}
				var modalBackDrop = avalon.vmodels.modalBackDrop;
				var dgs = modalBackDrop.$curDialogs;
				dgs.pop();
				var len = dgs.length;
				if(len > 0){
					dgs[len - 1].zIndex = 1050;
				}else{
					avalon(document.body).removeClass("modal-open");
					modalBackDrop.isIn = false;
					// avalon(modalBackDrop).removeClass("in");
					if(!AB.support.transitionend){
						modalBackDrop.visible = false;
						// modalBackDrop.style.display = 'none';
					}
				}
				this.onClose();
			},
			open : function(isInit){
				if(this.onBeforeOpen() === false) return;
				avalon(document.body).addClass("modal-open");
				this.isOpen = true;
				var modalBackDrop = avalon.vmodels.modalBackDrop;
				modalBackDrop.visible = true;
				// modalBackDrop.style.display = 'block';
				var vm = this;
				setTimeout(function(){
					vm.isIn = true;
					modalBackDrop.isIn = true;
					// avalon(modalBackDrop).addClass("in");
					if(!AB.support.transitionend){
						vm.onOpen();
					}
					//处理重叠窗口
					var dgs = modalBackDrop.$curDialogs;
					var len = dgs.length;
					if(len > 0){
						var last = dgs[len - 1];
						last.zIndex = 1000;
					}
					dgs.push(vm);
				},100);
			},
			transitionend : function(e){
				//窗口打开或结束后事件
				if(this.isIn){
					this.onOpen();
				}else{
					this.isOpen = false;
					this.$isClosing = false;
				}
			}
		}
	});
	avalon(document.body).appendHTML("<div :controller='modalBackDrop' class='modal-backdrop fade' "+
		":class='{in : @isIn}' :on-transitionend='@transitionend' :click='@click' :visible='@visible'></div>");
	avalon.define({
		$id : "modalBackDrop",
		isIn : false,
		visible : false,
		transitionend : function(){
			if(!this.isIn){
				this.visible = false;
			}
		},
		click : function(){
			this.$curDialogs[this.$curDialogs.length - 1].close();
		},
		$curDialogs : []
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div class='modal fade' :visible='@isOpen' :class=\"{'in' : @isIn}\" :css=\"{zIndex : @zIndex}\" :click='@close'>\r\n  <div class=\"modal-dialog\" :on-transitionend=\"@transitionend\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\" :if='@title'>\r\n        <button type=\"button\" class=\"close\" :click='@close(null)'><span>&times;</span></button>\r\n        <h4 class=\"modal-title\" :html=\"@title\"></h4>\r\n      </div>\r\n      <div class=\"modal-body\" :if=\"!@content\" :css-padding-bottom='@paddingBottom'>\r\n        <slot />\r\n      </div>\r\n      <div class=\"modal-body\" :if=\"@content\" :css-padding-bottom='@paddingBottom' :html=\"@content\">\r\n      </div>\r\n      <div class=\"modal-footer\" :if='@buttons && @buttons.length > 0' :css-text-align='@btnAlign'>\r\n        <button :for='(i,btn) in @buttons' type=\"button\" class=\"btn\" :class=\"'btn-' + btn.theme\" :click='@clickBtn(btn)'>\r\n          <i :if='btn.iconCls' class='glyphicon ' :class='btn.iconCls'></i> {{btn.text}}\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(26);
	__webpack_require__(27);
	AB.preHandlers["ms-table"] = function(vm){
		initFrontPageData(vm);
		initColumns(vm.columns);
	};
	function initColumns(columns){
		for(var j=0,column;column=columns[j++];){
			var obj = {
				//column基本属性
				//字段名
				field : "",
				//格式化函数
				formatter : avalon.noop,
				//标题
				title : "",
				//列宽度
				width : '',
				//排序
				sort : false,
				sortOrder : ''
			};
			for(var i in obj){
				if(column[i] === undefined){
					column[i] = obj[i];
				}else{
					if(i === 'formatter'){
						if(column.formatter === 'datetime'){
							column.formatter = function(v){
								return avalon.filters.date(v,"yyyy-MM-dd HH:mm:ss");
							};
						}else if(column.formatter === 'date'){
							column.formatter = function(v){
								return avalon.filters.date(v,"yyyy-MM-dd");
							};
						}
					}
				}
			}
		}
	}
	//初始化每一行数据
	function initRowsData(data){
		var obj = {
			_selected : false
		};
		for(var i=0,ii;ii=data[i++];){
			for(var j in obj){
				if(ii[j] === undefined){
					ii[j] = obj[j];
				}
			}
		}
	}
	//初始化前台分页数据
	function initFrontPageData(opts){
		if(opts.url) return;
		var frontPageData = opts.$frontPageData;
		if(!frontPageData) return;
		initRowsData(frontPageData);
		opts.data[opts.$totalKey] = frontPageData.length;
		opts.data[opts.$rowsKey] = [];
	}
	function setEmptyData(opts){
		var data = opts.data = {};
		data[opts.$totalKey] = 0;
		data[opts.$rowsKey] = [];
	}
	function getSelect(vmodel,isFirst){
		var data = vmodel.data[vmodel.$rowsKey];
		var re = [];
		for(var i=0,ii;ii=data[i++];){
			if(ii._selected){
				if(isFirst){
					return ii;
				}
				re.push(ii);
			}
		}
		return isFirst ? null : re;
	}
	function loadDataByPage(vmodel,page,func){
		if(!vmodel.url){
			dealFrontPageData(vmodel,page,func);
		}else{
			ajaxLoad(vmodel,page);
		}
	}
	function dealFrontPageData(vmodel,page,func){
		if(!vmodel.$frontPageData){
			avalon.error("若不定义url，则请将数据源赋值给frontPageData属性");
		}
		vmodel.curPage = vmodel.changeCurPage = page;
		updatePagination(vmodel);
		var start = (page - 1) * vmodel.pageSize;
		var total = vmodel.data[vmodel.$totalKey];
		if(start >= total){
			start = (vmodel.sumPage - 1) * vmodel.pageSize;
		}
		var end = start + vmodel.pageSize;
		var re = [];
		for(;start < end;start++){
			var item = vmodel.$frontPageData[start];
			if(!item) break;
			re.push(item);
		}
		vmodel.data[vmodel.$rowsKey] = re;
		func && func();
	}
	function ajaxLoad(vmodel,page,obj){
		var param = {};
		param[vmodel.$pageNoKey] = page;
		param[vmodel.$pageSizeKey] = vmodel.pageSize;
		avalon.mix(vmodel.$queryParams,param,obj);
		avalon.ajaxGet(vmodel.url,vmodel.$queryParams,function(data,errorInfo){
			if(!data){
				//错误
				setEmptyData(vmodel);
				vmodel.changeCurPage = vmodel.curPage = 1;
				updatePagination(vmodel);
				vmodel.onLoadError(errorInfo);
				return;
			}
			if(avalon.type(data) === 'array'){
				//前台分页
				vmodel.loadFrontPageData(data);
			}else{
				//后台分页
				if(vmodel.loadFilter){
					var result = vmodel.loadFilter(data,vmodel.$rowsKey,vmodel.$totalKey);
					if(result){
						data = result;
					}
				}
				initRowsData(data[vmodel.$rowsKey]);
				vmodel.data[vmodel.$rowsKey] = data[vmodel.$rowsKey];
				vmodel.data[vmodel.$totalKey] = data[vmodel.$totalKey];
				vmodel.changeCurPage = vmodel.curPage = page;
				updatePagination(vmodel);
				vmodel.onLoadSuccess(data);
			}
		},vmodel.$element);
	}
	//更新分页信息
	function updatePagination(vmodel){
		var total = vmodel.data[vmodel.$totalKey];
		if(total === 0){
			avalon.each(['sumPage','total','curPage','start','end'],function(i,v){
				vmodel[v] = 0;
			});
		}else{
			vmodel.sumPage = parseInt(total / vmodel.pageSize,10) + (total % vmodel.pageSize > 0 ? 1 : 0);
			if(vmodel.curPage === 0){
				vmodel.changeCurPage = vmodel.curPage = 1;
			}else if(vmodel.curPage > vmodel.sumPage){
				vmodel.changeCurPage = vmodel.curPage = vmodel.sumPage;
			}
			vmodel.start = 1 + vmodel.pageSize * (vmodel.curPage - 1);
			if(vmodel.start + vmodel.pageSize > total){
				vmodel.end = total;
			}else{
				vmodel.end = vmodel.start + vmodel.pageSize - 1;
			}
		}
	}
	avalon.component("ms-table",{
		template: tpl,
		defaults : {
			onReady : function(){
				this.$watch('pageSize',function(val){
					loadDataByPage(this,1);
				});
				loadDataByPage(this,1);
			},
			// $skipArray : ['totalKey','rowsKey','loadData','frontPageData','queryParams',
			// 		'singleSelect','loadFilter',"pageNoKey","pageSizeKey"],
			dealValue : function(item,el,rowIndex){
				var value = item[el.field];
				if(el.formatter && el.formatter !== avalon.noop){
					return el.formatter(value,item,rowIndex);
				}
				if(value === null || value === undefined){
					return "";
				}
				return value;
			},
			//属性
			$queryParams : {},
			title : '',
			striped : true,
			border : true,
			url : '',
			$totalKey : 'total',
			$rowsKey : 'rows',
			columns : [],
			$frontPageData : [],
			data : {
				total : 0,
				rows : []
			},
			$singleSelect : true,
			pagination : true,
			sumPage : 0,
			curPage : 0,
			changeCurPage : 1,
			start : 0,
			end : 0,
			pageSize : 20,
			pageSizeArr : [20,40,60,80,100],
			nowrap : false,
			showColumnTitle : true,
			loadFilter : avalon.noop,
			$pageNoKey : "pageNo",
			$pageSizeKey : "pageSize",
			$lastSelect : null,
			//方法
			$toThePage : function(e){
				if(e.keyCode === 13){
					loadDataByPage(this,this.changeCurPage || 1);
				}
			},
			$toPage : function(e,p){
				if(e.currentTarget.disabled) return;
				if(typeof p == 'number'){
					var page = this.curPage + p;
				}else if(p == 'first'){
					page = 1;
				}else if(p == 'last'){
					page = this.sumPage;
				}
				loadDataByPage(this,page);
			},
			toggleSelect : function(item){
				if(this.$singleSelect){
					if(item._selected){
						item._selected = false;
						this.$lastSelect = null;
					}else{
						if(this.$lastSelect){
							this.$lastSelect._selected = false;
						}

						item._selected = true;
						this.$lastSelect = item;
					}
				}else{
					item._selected = !item._selected;
					if(item._selected){
						this.onSelect(item);
					}
				}
			},
			sort : function(item){
				if(item.sort){
					if(item.sortOrder === 'bottom'){
						item.sortOrder = 'top';
					}else{
						item.sortOrder = 'bottom';
					}
				}
			},
			load : function(param){
				ajaxLoad(this,1,param || {});
			},
			reload : function(){
				ajaxLoad(this,this.curPage);
			},
			loadFrontPageData : function(data,page){
				initRowsData(data);
				this.$frontPageData = data;
				this.data[this.$totalKey] = data.length;
				dealFrontPageData(this,page || 1);
			},
			getSelected : function(){
				//获取所选的第一个行对象
				return getSelect(this,true);
			},
			getSelections : function(){
				//获取所选的所有行对象
				return getSelect(this,false);
			},
			//事件
			onLoadSuccess : avalon.noop,
			onLoadError : avalon.noop,
			onSelect : avalon.noop
		}
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<div class='panel panel-default mgrid'>\r\n\t<div class=\"panel-heading\" :if='@title'>\r\n\t\t<h3 class=\"panel-title\" :html=\"@title\"></h3>\r\n\t</div>\r\n\t<div class=\"panel-body mtable\">\r\n\t\t<div class='table-responsive' :class='{\"mtable-nowrap\":@nowrap}'>\r\n\t\t\t<table class=\"table\" :class='{\"table-striped\":@striped,\"table-bordered\":@border}'>\r\n\t\t\t\t<thead>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th :for=\"el in @columns\" :css=\"{width:el.width}\" :click='@sort(el)' :hover=\"['mtable-th-hover']\">\r\n\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t{{el.title}}\r\n\t\t\t\t\t\t\t\t<span class='pull-right' :if='el.sort' :visible='el.sortOrder'>\r\n\t\t\t\t\t\t\t\t\t<i class='glyphicon' :class=\"['glyphicon-triangle-' + el.sortOrder]\"></i>\r\n\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</thead>\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t<tr :for=\"(rowIndex,item) in @data[@$rowsKey]\" :hover=\"['mtable-tr-hover']\" :class=\"{'mtable-tr-selected':item._selected}\" :click='@toggleSelect(item)'>\r\n\t\t\t\t\t\t<td :for=\"el in @columns\" :css='{width : el.width}' :attr=\"{title : @showColumnTitle ? el.title : ''}\">\r\n\t\t\t\t\t\t\t<div :html=\"@dealValue(item,el,rowIndex)\"></div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<h2 :visible='!@data || @data[@$totalKey] === 0 || @data[@$rowsKey].length === 0' class=\"text-muted text-center\">暂无数据</h2>\r\n\t</div>\r\n\t<div :if='@pagination' class='mpagination clearfix'>\r\n\t\t<div class='pull-left' onselectstart='return false'>\r\n\t\t\t<button class='btn btn-default mpagination-first' type='button' :attr=\"{disabled : @curPage <= 1 ? 'disabled' : ''}\" :click=\"@$toPage($event,'first')\">\r\n\t\t\t\t<i class='glyphicon glyphicon-backward'></i>\r\n\t\t\t</button>\r\n\t\t\t<button class='btn btn-default' type='button' :attr=\"{disabled : @curPage <= 1 ? 'disabled' : ''}\" :click='@$toPage($event,-1)'>\r\n\t\t\t\t<i class='glyphicon glyphicon-chevron-left'></i>\r\n\t\t\t</button>\r\n\t\t\t<input class='form-control page' placeholder='页数' \r\n\t\t\t\t:duplex-number='@changeCurPage' :on-keydown='@$toThePage()'>\r\n\t\t\t<span>共{{@sumPage}}页</span>\r\n\t\t\t<button class='btn btn-default' type='button' :attr=\"{disabled : @curPage >= @sumPage ? 'disabled' : ''}\" :click='@$toPage($event,1)'>\r\n\t\t\t\t<i class='glyphicon glyphicon-chevron-right'></i>\r\n\t\t\t</button>\r\n\t\t\t<button class='btn btn-default mpagination-last' type='button' :attr=\"{disabled : @curPage >= @sumPage ? 'disabled' : ''}\" :click=\"@$toPage($event,'last')\">\r\n\t\t\t\t<i class='glyphicon glyphicon-forward'></i>\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t\t<div class='pull-right'>\r\n\t\t\t<span>当前第{{@curPage}}页,{{@start}}~{{@end}}条,共{{@data[@$totalKey]}}条</span>\r\n\t\t\t<select class='form-control' :duplex='@pageSize'>\r\n\t\t\t\t<option :for='el in @pageSizeArr' :attr='{value : el}'>{{el}}</option>\r\n\t\t\t</select>\r\n\t\t<div>\r\n\t</div>\r\n</div>";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(28, function() {
				var newContent = __webpack_require__(28);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".mgrid.panel{\r\n\tborder: 0;position: relative;\r\n\tbox-shadow:none;margin-bottom: 0;\r\n\t-moz-box-shadow: none;\r\n\t-webkit-box-shadow:none;\r\n}\r\n.mgrid.panel .panel-heading{border-width:1px 1px 0 1px;border-style: solid;}\r\n.mtable.panel-body{padding:0;}\r\n.mtable .table{margin-bottom:0}\r\n.mtable .thead{background-color: #fff;}\r\n.mtable .table-responsive{margin-bottom: 0;position: relative;}\r\n.mtable .table-responsive th{padding: 0;}\r\n.mtable .table-responsive th>div{padding: 8px;position: relative;}\r\n.mtable .table-responsive.mtable-nowrap{white-space: nowrap;}\r\n.mtable h2{margin:0;padding:20px 0;border:1px solid #ddd;border-top:0}\r\n.mtable .table-responsive .mtable-tr-hover{background-color: #eee}\r\n.mtable .table-responsive .mtable-th-hover{background-color: #e2e2e2}\r\n.mtable .table-responsive .mtable-tr-selected{background-color: #FAF5B4}\r\n.mpagination{margin-top: 5px;}\r\n.mpagination>div>span{display: inline-block;}\r\n.mpagination .form-control{display: inline-block;width: auto;}\r\n.mpagination input.form-control{vertical-align: middle;}\r\n.mpagination .glyphicon:hover{background-color: #e2e2e2}\r\n.mpagination .page{width: 80px}\r\n@media (max-width: 570px) {\r\n\t.mpagination .pull-right{display: none;}\r\n}\r\n@media (max-width: 340px) {\r\n\t.mpagination .mpagination-first,.mpagination .mpagination-last{display: none;}\r\n}\r\n.thead-fix{position: fixed;top: 0;}", ""]);

	// exports


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(30);
	var dataTpl = __webpack_require__(31);
	var hideEventHandle;
	avalon.component('ms-autocomplete', {
	  template: tpl,
	  defaults: {
	  	placeholder : "",
	  	$inter : null,
	  	//如果有值，则data或者source返回的数据必须为对象obj组成的数组，input将由obj[inputValueKey]显示
			//如果没值，则data或者source返回的数据必须为非对象组成的数组
			$inputValueKey : "text",
			//当前的搜索关键字
			value : "",
			//后台返回数据项的text键值，取其数据值到列表上显示
			$textKey : "text",
			$source : null,
			//所选的项的具体数据
			$selectItem : null,
			loadingText : "加载中...",
			nonDataText : "暂无数据",
			onSelect : avalon.noop,
	  	focus : function(){
	  		var $this = avalon(this.$element);
				var offset = $this.offset();
				var autocompleteData = avalon.vmodels.autocompleteData;
				autocompleteData.isShow = false;
				autocompleteData.left = offset.left;
				autocompleteData.top = offset.top + $this.outerHeight();
				//将当前的input配置设置到autocomplete中
				autocompleteData.$curVmodel = this;
				autocompleteData.$textKey = this.$textKey;
				if(hideEventHandle){
					avalon.unbind(document.body,"click",hideEventHandle);
				}
				var me = this;
				hideEventHandle = avalon.bind(document.body,"click",function(e){
					if(e.target === me.$element) return false;
					if(AB.isSubNode(e.target,"autocomplete-dropdown")) return;
					autocompleteData.isShow = false;
					avalon.unbind(document.body,"click",hideEventHandle);
					hideEventHandle = null;
				});
	  	},
	  	keyup : function(e){
	  		var keyCode = e.keyCode;
	  		var autocompleteData = avalon.vmodels.autocompleteData;
	  		var me = this;
				if(keyCode >= 9 && keyCode <= 47){
					return;
				}
				if(this.value === ''){
					//搜索关键字为空 则不操作
					me.$inter && clearTimeout(me.$inter);
					me.$inter = null;
					autocompleteData.isShow = false;
					return;
				}
				autocompleteData.data = [];
				autocompleteData.mes = autocompleteData.$curVmodel.loadingText;
				if(me.$inter){
					clearTimeout(me.$inter);
					me.$inter = null;
				}
				me.$inter = setTimeout(function(){
					var source = autocompleteData.$curVmodel.$source;
					var type = avalon.type(source);
					var value = autocompleteData.$curVmodel.value;
					if(type == 'function'){
						var cb = function(data){
							if(cb.t === me.$inter){
								setResult(data,value,autocompleteData);
							}
						};
						cb.t = me.$inter;
						source.call(autocompleteData,value,cb);
					}else if(type == 'array'){
						var data = [];
						var inputValueKey = autocompleteData.$curVmodel.$inputValueKey;
						for(var i=0,ii;ii=source[i++];){
							if((inputValueKey ? ii[autocompleteData.$textKey] : (ii + '')).indexOf(value) !== -1){
								if(inputValueKey){
									data.push(avalon.mix({},ii));
								}else{
									data.push(ii);
								}
							}
						}
						setResult(data,value,autocompleteData);
					}
				},200);
				autocompleteData.isShow = true;
	  	},
	  	keydown : function(e){
	  		var keyCode = e.keyCode;
				var m = avalon.vmodels.autocompleteData;
				if(keyCode >= 9 && keyCode <= 47){
					var len = m.data.length;
					if(/^(13|40|38)$/.test(keyCode) && m.isShow && len > 0){
						e.preventDefault();
						if(keyCode === 40){
							if(m.curSelect === len - 1){
								m.curSelect = 0;
							}else{
								m.curSelect++;
							}
						}else if(keyCode === 38){
							if(m.curSelect === -1 || m.curSelect === 0){
								m.curSelect = len - 1;
							}else{
								m.curSelect--;
							}
						}else if(keyCode === 13){
							m.chooseItem(m.data[m.curSelect]);
							m.isShow = false;
						}
					}
				}else{
					m.curSelect = -1;
				}
	  	}
	  }
	});
	avalon(document.body).appendHTML(dataTpl);
	avalon.define({
		$id : "autocompleteData",
		$textKey : "text",
		$curVmodel : null,
		isShow : false,
		left : -1000,
		top : -1000,
		hideUl : function(){
			if(this.mes !== this.$curVmodel.loadingText){
				this.isShow = false;
			}
		},
		mes : "",
		curSelect : -1,
		data : [],
		value : '',
		chooseItem : function(el){
			var vm = this.$curVmodel;
			vm.selectItem = el;
			vm.value = vm.$inputValueKey ?  el[vm.$inputValueKey] : el;
			vm.onSelect(el);
			this.isShow = false;
		},
		getText : function(el){
			if(typeof el == 'object'){
				var text = el[this.$textKey];
			}else{
				text = el + '';
			}
			var reg = new RegExp(this.value,"g");
			return text.replace(reg,"<strong>" + this.value + "</strong>");
		}
	});
	function setResult(data,value,m){
		/*if(!m.$curVmodel.inputValueKey){
			var arr = [];
			for(var i=0,ii;ii=data[i++];){
				var obj = {};
				obj[m.textKey] = ii + '';
				arr.push(obj);
			}
			data = arr;
		}*/
		m.value = value;
		m.data = data;
		m.mes = m.$curVmodel.nonDataText;
	}

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<input type='text' :duplex='@value' :attr='{placeholder : @placeholder}' class='form-control' :on-focus=\"@focus\"\r\n\t:on-keyup=\"@keyup\" :on-keydown=\"@keydown\"/>";

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<ul class='dropdown-menu autocomplete-dropdown' :controller=\"autocompleteData\" :visible=\"@isShow\" \r\n\t:css=\"{left:@left,top:@top}\">\r\n\t<li :visible='!@data || @data.length === 0'><a href='javascript:void(0)' :click='@hideUl'>{{@mes}}</a></li>\r\n\t<li :for='($index,el) in @data' :css=\"{backgrouncColor : $index === @curSelect ? '#f5f5f5' : ''}\">\r\n\t\t<a href='javascript:void(0)' :click='@chooseItem(el)' :html='@getText(el)'></a>\r\n\t</li>\r\n</ul>";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(33);
	var hideEventHandle;
	AB.preHandlers["ms-dropdown"] = function(vm){
		var obj = {
			//数据项默认配置
			divider : false,
			handler : avalon.noop,
			$clickedHide : true,
			text : ''
		};
		var data = vm.data;
		avalon.each(data,function(i,v){
			for(var j in obj){
				if(v[j] === undefined){
					v[j] = obj[j];
				}
			}
		});
	};
	avalon.component("ms-dropdown",{
		template: tpl,
		defaults : {
			isOpen : false,
			theme : "default",
			size : "",
			data : [],
			text : "testtest",
			clickItem : function(el){
				el.handler();
				if(el.$clickedHide){
					this.close();
				}
			},
			close : function(){
				this.isOpen = false;
				if(hideEventHandle){
					avalon.unbind(document.body,"click",hideEventHandle);
					hideEventHandle = null;
				}
			},
			clickBtn : function(){
				if(hideEventHandle){
					avalon.unbind(document.body,"click",hideEventHandle);
				}
				this.isOpen = !this.isOpen;
				if(this.isOpen){
					var me = this;
					hideEventHandle = avalon.bind(document.body,"click",function(e){
						if(e.target === me.$element) return false;
						if(AB.isSubNode(e.target,"dropdown-menu")) return;
						me.close();
					});
				}
			}
		}
	});

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<div class=\"btn-group\" :class=\"{open : @isOpen}\">\r\n  <button class=\"btn dropdown-toggle\" :class=\"['btn-' + @theme,@size ? ('btn-' + @size) : '']\" type=\"button\" :click=\"@clickBtn\">\r\n    {{@text}}<span class=\"caret\" style='margin-left:5px'></span>\r\n  </button>\r\n  <ul class=\"dropdown-menu\">\r\n  \t<li :for=\"el in @data\" :class=\"{divider : el.divider}\" :click=\"@clickItem(el)\">\r\n  \t\t<a href=\"javascript:void(0)\">{{el.text}}</a>\r\n  \t</li>\r\n  </ul>\r\n</div>";

/***/ },
/* 34 */
/***/ function(module, exports) {

	//工具提示组件 一次性
	var Defaults = {
		triggerOn : "hover",
		position  : "right",
		content : "",
		template : null,
		container : document.body,
		//tooltip popover
		type : "tooltip",
		//popover options
		title : ""
	};
	var hideEventHandle;
	avalon.directive('tooltip', {
		init : function () {
			var oldValue = this.getValue();
			var value = avalon.shadowCopy({},Defaults);
			if(avalon.type(oldValue) === 'array'){
				avalon.each(oldValue,function(i,v){
					avalon.shadowCopy(value,v);
				});
			}else{
				avalon.shadowCopy(value,oldValue);
			}
			var tip;
			var element = this.node.dom;
			if(value.triggerOn === 'hover'){
				var mouseenter = avalon.bind(element,"mouseenter",show);
				var mouseleave = avalon.bind(element,"mouseleave",hide);
			}else if(value.triggerOn === 'click'){
				var click = function(){
					if(hideEventHandle){
						avalon.unbind(document.body,"click",hideEventHandle);
						hideEventHandle = null;
					}
					if(tip){
						hide();
					}else{
						show();
						hideEventHandle = avalon.bind(document.body,"click",function(e){
							if(e.target === element) return false;
							if(AB.isSubNode(e.target,"popover")) return;
							click();
						});
					}
				};
				avalon.bind(element,"click",click);
			}
			function outTip(){
				value.container.removeChild(tip);
				tip = null;
			}
			function show(){
				if(!tip){
					tip = document.createElement("div");
					tip.className = value.type + " fade " + value.position;
					if(value.type === 'tooltip'){
						tip.innerHTML = "<div class='tooltip-arrow'></div><div class='tooltip-inner'>" + value.content + "</div>";
					}else if(value.type === 'popover'){
						var title = '';
						if(value.title){
							title = '<h3 class="popover-title">' + value.title + '</h3>';
						}
						tip.innerHTML = '<div class="arrow"></div>' + title + 
							'<div class="popover-content">' + value.content + '</div>';
					}
					value.container.appendChild(tip);
					avalon.scan(tip);
					AB.support.transitionend && tip.addEventListener(AB.support.transitionend,function(){
						if(!avalon(this).hasClass("in") && tip){
							outTip();
						}
					});
				}
				if(value.type === 'popover'){
					tip.style.display = 'block';
				}
				var $tip = avalon(tip);
				$tip.addClass("in");
				var $target = avalon(element);
				var offset = value.container === document.body ? $target.offset() : $target.position();
				switch(value.position){
					case "top":
						var top = offset.top - $tip.outerHeight();
						var left = offset.left + ($target.outerWidth() - $tip.outerWidth()) / 2;
						break;
					case "left":
						top = offset.top + ($target.outerHeight() - $tip.outerHeight()) / 2;
						left = offset.left - $tip.outerWidth();
						break;
					case "right":
						top = offset.top - ($tip.outerHeight() - $target.outerHeight()) / 2;
						left = offset.left + $target.outerWidth();
						break;
					case "bottom":
						top = offset.top + $target.outerHeight();
						left = offset.left + ($target.outerWidth() - $tip.outerWidth()) / 2;
						break;
				}
				tip.style.left = left + "px";
				tip.style.top = top + "px";
			}
			function hide(){
				avalon(tip).removeClass("in");
				if(!AB.support.transitionend){
					outTip();
				}
			}
		}
	});


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(36);
	function getHeadDefaults(){
		return {
			closeable : false,
			iconCls : '',
			title : '',
			icons : []
		};
	}
	function getContentDefaults(){
		return {
			html : '',
			$init : false
		};
	}
	AB.preHandlers["ms-tab"] = function(vm,fag){
		if(fag){
			var div = document.createElement("div");
			div.innerHTML = fag;
			var children = avalon(div).children();
			var headerData = [];
			var contentData = [];
			avalon.each(children,function(i,v){
				var obj = {
					title : v.title,
					icons : []
				};
				obj.iconCls = v.getAttribute("data-iconCls") || '';
				obj.closeable = v.getAttribute("data-closeable") !== null;
				headerData.push(obj);
				contentData.push({
					html : v.innerHTML,
					$init : false
				});
			});
			vm.contentData = contentData;
			vm.headerData = headerData;
		}else{
			var head = getHeadDefaults();
			var content = getContentDefaults();
			avalon.each(vm.headerData,function(i,v){
				for(var i in head){
					if(v[i] === undefined){
						v[i] = head[i];
					}
				}
			});
			avalon.each(vm.contentData,function(i,v){
				for(var i in content){
					if(v[i] === undefined){
						v[i] = content[i];
					}
				}
			});
		}
	};
	// var modalBackDrop;
	avalon.component("ms-tab",{
		template: tpl,
		defaults : {
			//属性
			border : true,
			curIndex : 0,
			/*
			title : 标题,
			iconCls : 标题左边的图标,
			icons : [],
			closeable : 是否可关闭
			*/
			headerData : [],
			/*
			html : 内容html,$init : 若为false则是第一次打开
			*/
			contentData : [],
			noContentTip : "暂无数据",
			add : function(obj){
				this.headerData.push(avalon.mix(getHeadDefaults(),obj.header));
				this.contentData.push(avalon.mix(getContentDefaults(),obj.content));
				if(obj.selected){
					this.curIndex = this.headerData.length - 1;
				}
			},
			closeTab : function(e,i){
				e.stopPropagation();
				this.headerData.removeAt(i);
				this.contentData.removeAt(i);
				var len = this.headerData.length;
				if(i === this.curIndex){
					if(i === len){
						var sel = len - 1;
					}else{
						sel = i;
					}
					if(this.curIndex === sel){
						this.$fire("curIndex",sel);
					}else{
						this.curIndex = sel;
					}
				}else if(i < this.curIndex){
					this.curIndex--;
				}
				this.onClose.call(element,this);
			},
			getTab : function(p){
				var headerData = this.headerData;
				if(typeof p == 'string'){
					//根据标题获取tab
					for(var i=0,ii=headerData.length;i<ii;i++){
						if(headerData[i].title === p){
							return {
								index : i,
								header : headerData[i],
								content : this.contentData[i]
							};
						}
					}
					return null;
				}else{
					//根据索引获取tab
					var header = headerData[p];
					return header ? {
						header : header,
						content : this.contentData[p]
					} : null;
				}
			},
			//事件
			onSelect : avalon.noop,
			onClose : avalon.noop
		}
	});
	// define(["avalon","text!./avalon.tab.html"],function(avalon,template){
	// 	avalon.component("ab:tab",{
	// 		$template: template,
	// 		$replace : true,
	// 		$construct : function(opts,vmOpts,elemOpts){
	// 			var children = avalon(this).children();
	// 			if(children.length > 0){
	// 				var headerData = vmOpts.headerData = [];
	// 				var contentData = vmOpts.contentData = [];
	// 				avalon.each(children,function(i,v){
	// 					var obj = {
	// 						title : v.title,
	// 						icons : []
	// 					};
	// 					obj.iconCls = v.getAttribute("data-iconCls");
	// 					obj.closeable = v.getAttribute("data-closeable") !== null;
	// 					headerData.push(obj);
	// 					contentData.push({
	// 						html : v.innerHTML,
	// 						$init : false
	// 					});
	// 				});
	// 			}
	// 			return avalon.mix(opts,vmOpts,elemOpts);
	// 		},
	// 		$ready : function(vmodel,element){
	// 			vmodel.curIndex = 0;
	// 			vmodel.$clickHeader = function(i){
	// 				vmodel.curIndex = i;
	// 			};
	// 			vmodel.add = function(obj){
	// 				vmodel.headerData.push(avalon.mix({
	// 					closeable : false,
	// 					iconCls : null,
	// 					title : '',
	// 					icons : []
	// 				},obj.header));
	// 				vmodel.contentData.push(avalon.mix({
	// 					html : null,
	// 					$init : false
	// 				},obj.content));
	// 				if(obj.selected){
	// 					vmodel.curIndex = vmodel.headerData.length - 1;
	// 				}
	// 			};
	// 			vmodel.$closeTab = function(e,i){
	// 				e.stopPropagation();
	// 				vmodel.headerData.removeAt(i);
	// 				vmodel.contentData.removeAt(i);
	// 				var len = vmodel.headerData.length;
	// 				if(i === vmodel.curIndex){
	// 					if(i === len){
	// 						var sel = len - 1;
	// 					}else{
	// 						sel = i;
	// 					}
	// 					if(vmodel.curIndex === sel){
	// 						vmodel.$fire("curIndex",sel);
	// 					}else{
	// 						vmodel.curIndex = sel;
	// 					}
	// 				}else if(i < vmodel.curIndex){
	// 					vmodel.curIndex--;
	// 				}
	// 				vmodel.onClose.call(element,vmodel);
	// 			};
	// 			vmodel.getTab = function(p){
	// 				var headerData = vmodel.headerData;
	// 				if(typeof p == 'string'){
	// 					//根据标题获取tab
	// 					for(var i=0,ii=headerData.length;i<ii;i++){
	// 						if(headerData[i].title === p){
	// 							return {
	// 								index : i,
	// 								header : headerData[i],
	// 								content : vmodel.contentData[i]
	// 							};
	// 						}
	// 					}
	// 					return null;
	// 				}else{
	// 					//根据索引获取tab
	// 					var header = headerData[p];
	// 					return header ? {
	// 						header : header,
	// 						content : vmodel.contentData[p]
	// 					} : null;
	// 				}
	// 			};
	// 		},
	// 		$skipArray : [],
	// 		//属性
	// 		curIndex : -1,
	// 		/*
	// 		title : 标题,
	// 		iconCls : 标题左边的图标,
	// 		icons : [],
	// 		closeable : 是否可关闭
	// 		*/
	// 		headerData : [],
	// 		/*
	// 		html : 内容html,$init : 若为false则是第一次打开
	// 		*/
	// 		contentData : [],
	// 		noContentTip : "暂无数据",
	// 		//方法
	// 		$clickHeader : avalon.noop,
	// 		add : avalon.noop,
	// 		$closeTab : avalon.noop,
	// 		getTab : avalon.noop,
	// 		//事件
	// 		onSelect : avalon.noop,
	// 		onClose : avalon.noop
	// 	});
	// });

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n\t<ul class='nav nav-tabs'>\r\n\t\t<li :for='($index,el) in @headerData' :class=\"{active : $index === @curIndex}\" :click=\"@curIndex = $index\">\r\n\t\t\t<a href='javascript:void(0)'>\r\n\t\t\t\t<span :if='el.iconCls' class=\"glyphicon\" :class='el.iconCls'></span>\r\n\t\t\t\t{{el.title}}\r\n\t\t\t\t<span :for='icon in el.icons' class='glyphicon' :class='glyphicon glyphicon-{{icon.cls}}' :click='icon.handler($outer.$index,icon)' style='cursor:pointer'></span>\r\n\t\t\t\t<span :if='el.closeable' class='glyphicon glyphicon-remove' :click='@closeTab($event,$index)' style='cursor:pointer'></span>\r\n\t\t\t</a>\r\n\t\t</li>\r\n\t</ul>\r\n\t<div class='tab-content' style='border:1px solid #ccc;border-top:0;padding-top:1px;' :css=\"{'border-width':@border ? '1px' : '0px'}\">\r\n\t\t<div class='tab-pane' :for='($index,el) in @contentData' :class='{active : $index === curIndex}' :html=\"el.html\">\r\n\t\t</div>\r\n\t\t<div :if=\"!@contentData || @contentData.length === 0\" class='tab-pane active'>\r\n\t\t\t<h1 class='text-center'>{{@noContentTip}}</h1>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	var tpl = __webpack_require__(40);
	var rootTpl = tpl.replace("MS_OPTIONS_NODELIST",":for=\"($index,el) in @treeList\"");
	var childrenTpl = tpl.replace("MS_OPTIONS_NODELIST",":for=\"($index,el) in el.children\"");
	var nodeAttr = {
		id : "",
		iconCls : "",
		openIconCls : "",
		text : "",
		loading : false,
		selected : false,
		checked : 0,
		chLoaded : false,
		state : '',
		children : []
	};
	//初始化节点属性
	function initNodeAttr(item){
		if(!item.children){
			item.children = [];
		}
		//是否已加载子节点标志
		item.chLoaded = item.state === 'open';
		if(item.children.length){
			if(item.state !== 'open'){
				item.state = 'closed';
			}
		}else{
			if(item.state !== 'closed'){
				item.state = '';
			}
		}
		for(var j in nodeAttr){
			if(item[j] === undefined){
				item[j] = nodeAttr[j];
			}
		}
	}
	//遍历list中的所有节点，若传入回调则执行回调，否则初始化节点属性
	function eachNode(list,func){
		for(var i=0,ii=list.length;i<ii;i++){
			var item = list[i];
			if(!item) continue;
			if(func){
				if(func(item,i,list) === false){
					return false;
				}
			}else{
				initNodeAttr(item);
			}
			var ch = item.children;
			if(ch && ch.length > 0 && eachNode(ch,func) === false){
				return false;
			}
		}
	}
	//查找指定节点并执行回调
	function findNode(list,target,func){
		for(var i=0,ii=list.length;i<ii;i++){
			var item = list[i];
			if((typeof target == 'object' && target === item) || item.id === target){
				func(item,i,list);
				return false;
			}
			if(item.children && findNode(item.children,target,func) === false){
				return false;
			}
		}
	}
	//获取target的所有父节点
	function getParents(list,target,pArr){
		for(var i=0,ii=list.length;i<ii;i++){
			var item = list[i];
			if((typeof target == 'object' && target === item) || item.id === target){
				return false;
			}
			var ch = item.children;
			if(ch.length > 0){
				pArr.push(item);
				if(getParents(ch,target,pArr) === false){
					return false;
				}
			}
		}
		pArr.pop();
	}
	//遍历所有父节点 查看其下所有子节点是否都没有勾选，若是则置为反选
	function eachParentsUncheck(pArr){
		for(var i=pArr.length - 1;i>=0;i--){
			var p = pArr[i];
			var flag = 0;
			eachNode(p.children,function(el){
				if(el.checked === 1){
					flag = 2;
					return false;
				}
			});
			p.checked = flag;
		}
	}
	function ajaxLoad(el,vmodel,func){
		var callBackEl = el;
		if(!el){
			//如果节点为空 则说明树节点还没创建加载根数据
			callBackEl = null;
			el = {
				id : null
			};
		}
		var param = {id : el.id};
		avalon.mix(param,vmodel.$queryParams);
		if(vmodel.onBeforeLoad(param,callBackEl) === false){
			return;
		}
		el.loading = true;
		vmodel.loader(param,function(resp){
			el.loading = false;
			resp = vmodel.loadFilter(resp,callBackEl);
			if(!resp || resp.code === undefined){
				return avalon.warn("获取树数据的接口必须返回带有code属性的对象，树数据放在data中");
			}
			vmodel.onLoadComplete(resp,callBackEl);
			if(resp.code === 1){
				var ch = resp.data;
				if(callBackEl){
					el.state = 'open';
					if(vmodel.checkbox && vmodel.$cascadeCheck){
						//如果存在勾选框且有级联检查
						eachNode(ch,function(item){
							initNodeAttr(item);
							item.checked = el.checked === 2 ? 0 : el.checked;
						},el);
					}else{
						eachNode(ch);
					}
					el.children = ch;
					if(!el.chLoaded){
						el.chLoaded = true;
					}
				}else{
					eachNode(ch);
					vmodel.treeList = ch
					func && func();
				}
				vmodel.onLoadSuccess(ch,callBackEl);
			}else{
				vmodel.onLoadError(resp.msg,callBackEl);
			}
		});
	}
	function expandNode(vmodel,el){
		if(vmodel.onBeforeExpand(el) === false){
			return;
		}
		if(el.children && el.children.length){
			if(el.state === 'closed'){
				el.state = 'open';
			}
			if(!el.chLoaded){
				el.chLoaded = true;
			}
		}else if(vmodel.$url){
			ajaxLoad(el,vmodel);
		}
		vmodel.onExpand(el);
	}
	function collapseNode(vmodel,el){
		if(vmodel.onBeforeCollapse(el) === false){
			return;
		}
		el.state = 'closed';
		vmodel.onCollapse(el);
	}
	function toggleElState(vmodel,el,state){
		if(!el.state) return;
		if(state === 'open'){
			el.state === 'closed' && expandNode(vmodel,el);
		}else{
			el.state === 'open' && collapseNode(vmodel,el);
		}
	}
	/*
	展开节点 如果节点的子节点数>0则直接展开，否则根据url异步加载数据
	*/
	function toggleOpenExpand(vmodel,el){
		if(!el.state) return;
		if(el.loading) return;
		if(el.state === 'closed'){
			expandNode(vmodel,el);
		}else{
			collapseNode(vmodel,el);
		}
	}
	//勾选或反选节点
	function toggleCheck(vmodel,el,checked){
		if(checked === undefined){
			var _checked = el.checked;
			if(_checked === 1){
				checked = el.checked = 0;
			}else{
				checked = el.checked = 1;
			}
		}else{
			el.checked = checked;
		}
		if(vmodel.$cascadeCheck){
			if(el.children.length){
				//勾选或反选所有子节点
				eachNode(el.children,function(item){
					item.checked = checked;
				});
			}
			var pArr = [];
			getParents(vmodel.treeList,el,pArr);
			if(checked === 1){
				//如果是勾选 则将所有父节点置为预选状态
				avalon.each(pArr,function(i,p){
					p.checked = 2;
				});
			}else{
				eachParentsUncheck(pArr);
			}
		}
	}
	//往上查找节点 直到找到nodecontent 执行回调
	function findNodeContent(target,func){
		if(target.getAttribute("data-type") === "nodeContent"){
			func(target.parentNode["data-el"]);
		}else{
			var pNode = target.parentNode;
			while(pNode.tagName.toUpperCase() !== 'BODY'){
				if(pNode.getAttribute("data-type") === "nodeContent"){
					func(pNode.parentNode["data-el"]);
					return;
				}
				pNode = pNode.parentNode;
			}
		}
	}
	function selectNode(el,vmodel){
		var curSelEl = selectNode.curSelEl;
		if(vmodel.onBeforeSelect(el) === false){
			return;
		}
		if(curSelEl){
			curSelEl.selected = false;
		}
		if(curSelEl === el) return;
		el.selected = true;
		vmodel.onSelect(selectNode.curSelEl = el);
	}
	AB.preHandlers["ms-tree"] = function(vm){
		eachNode(vm.treeList);
	};
	avalon.component('ms-tree', {
	  template: "<ul class='tree'>" + rootTpl + "</ul>",
	  defaults: {
	  	getChildrenTpl : function(el){
	  		if(el.chLoaded && el.children && el.children.length){
	  			return childrenTpl;
	  		}
	  	},
			toggleOpenExpand : function(el){
				if(!el.state) return;
				if(el.loading) return;
				if(el.state === 'closed'){
					expandNode(this,el);
				}else{
					collapseNode(this,el);
				}
			},
			clickContent : function(el){
				selectNode(el,this);
			},
			/****************************方法****************************/
			toggleCheck : function(el,checked){
				toggleCheck(this,el,checked);
			},
			loadData : function(data){
				eachNode(data);
				this.treeList = data;
			},
			getNode : function(target){
				var result = null;
				findNode(this.treeList,target,function(item,i,list){
					result = {
						node : item,
						index : i,
						list : list
					};
				});
				return result;
			},
			reload : function(target){
				var vmodel = this;
				if(!vmodel.$url) return;
				if(target !== null && target !== undefined){
					findNode(vmodel.treeList,target,function(item){
						ajaxLoad(item,vmodel);
					});
				}else{
					ajaxLoad(null,vmodel);
				}
			},
			getParents : function(target){
				var pArr = [];
				getParents(this.treeList,target,pArr);
				return pArr;
			},
			//展开或收缩
			toggleState : function(state,el){
				var vmodel = this;
				if(el){
					toggleElState(vmodel,el,state);
				}else{
					eachNode(vmodel.treeList,function(el){
						toggleElState(vmodel,el,state);
					});
				}
			},
			//展开到指定节点
			expandTo : function(target){
				var vmodel = this;
				var pArr = [];
				getParents(vmodel.treeList,target,pArr);
				avalon.each(pArr,function(i,el){
					expandNode(vmodel,el);
				});
			},
			//获取当前选中的节点
			getSelected : function(){
				return selectNode.curSelEl;
			},
			/*
			移除指定节点
			target : 节点id或节点监控对象
			*/
			removeNode : function(target){
				var vmodel = this;
				findNode(vmodel.treeList,target,function(item,i,list){
					if(item.loading) return;
					var pArr = [];
					getParents(vmodel.treeList,item,pArr);
					if(item === selectNode.curSelEl){
						selectNode.curSelEl = null;
					}
					list.removeAt(i);
					eachParentsUncheck(pArr);
				});
			},
			/*
			增加节点
			data : 节点数据数组
			parent : 若不指定则默认添加到根节点，若为string或number则是节点id，若为object则是节点的监控对象
			*/
			appendNodes : function(data,parent){
				var target,el;
				if(parent){
					if(typeof parent == 'object'){
						el = parent;
					}else{
						findNode(this.treeList,parent,function(item){
							el = item;
						});
					}
					if(!el){
						return avalon.log("找不到目标节点,appendNodes失败");
					}
					el.state = 'open';
					target = el.children;
				}else{
					target = this.treeList;
				}
				if(target){
					eachNode(data,null);
					target.pushArray(data);
					if(el && !el.chLoaded){
						el.chLoaded = true;
					}
				}
			},
			treeList : [],
			//节点是否带图标
			icon : true,
			//节点是否带checkbox
			checkbox : false,
			//是否级联检查
			$cascadeCheck : true,
			//要求返回的数据必须有code data,code为1表示成功，其它失败
			loadFilter : function(resp){
				return resp;
			},
			//异步获取数据的url
			$url : '',
			$method : 'GET',
			$queryParams : {},
			loader : function(param,func){
				avalon[this.$method === 'GET' ? "ajaxGet" : "ajaxPost"](this.$url,param,func,null);
			},
			//事件
			onContextMenu : avalon.noop,
			onBeforeSelect : avalon.noop,
			onSelect : avalon.noop,
			onBeforeExpand : avalon.noop,
			onExpand : avalon.noop,
			onBeforeCollapse : avalon.noop,
			onCollapse : avalon.noop,
			onBeforeCollapse : avalon.noop,
			onBeforeLoad : avalon.noop,
			onLoadSuccess : avalon.noop,
			onLoadError : avalon.noop,
			onLoadComplete : avalon.noop,
			onDbClick : avalon.noop
	  }
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(39);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(39, function() {
				var newContent = __webpack_require__(39);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".tree{white-space: nowrap;}\r\n.tree,.tree ul{margin:0;padding:0;list-style: none;font-size:16px;}\r\n.tree ul>li{padding-left:1.2em;}\r\n.tree-hidden{visibility: hidden;}\r\n.tree-toggle{font-size:0.8em;vertical-align: middle;cursor: pointer;padding:0.1em;}\r\n.tree-toggle:hover{color:#888}\r\n.tree-checkbox{vertical-align: middle;cursor: pointer;}\r\n.tree-checkbox0 {color:#ccc}\r\n.tree-checkbox1 {color:#000}\r\n.tree-checkbox2 {color:#888}\r\n.tree-node-content{display: inline-block;padding:0 2px;cursor: pointer;}\r\n.tree-node-content:hover{background-color: #e2e2e2;}\r\n.tree-node-content>.glyphicon{vertical-align: middle;position: static;}\r\n.tree-node-select{background-color: #3385FF;color: #fff;}\r\n.tree-node-select:hover{background-color: #3385FF;}\r\n.tree-title{vertical-align: middle;display:inline-block;padding-left:0.2em}\r\n", ""]);

	// exports


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<li MS_OPTIONS_NODELIST class='tree-node'>\r\n\t<i :click='@toggleOpenExpand(el)' class='glyphicon tree-toggle'\r\n\t:class=\"{'glyphicon-menu-right':el.state === 'closed','glyphicon-menu-down':el.state === 'open' || !el.state,'tree-hidden':!el.state}\"></i>\r\n\t<i :click='@toggleCheck(el)' :if='@checkbox' class='glyphicon glyphicon-ok-circle tree-checkbox' :class=\"['tree-checkbox' + el.checked]\"></i>\r\n\t<span :click='@clickContent(el)' class='tree-node-content' :class=\"{'tree-node-select':el.selected}\">\r\n\t\t<i :if='icon && el.iconCls !== false' \r\n\t\tclass='glyphicon'\r\n\t\t:class=\"[(el.iconCls && (!el.state || el.state === 'closed' || (el.state === 'open' && !el.openIconCls))) ? el.iconCls : '',(el.openIconCls && el.state === 'open') ? el.openIconCls : '',{'glyphicon-folder-close':!el.loading && !el.iconCls && el.state==='closed','glyphicon-folder-open':!el.loading && !el.iconCls && el.state==='open','glyphicon-th-list':(!el.state && !el.iconCls) || el.iconCls === 'glyphicon-th-list','glyphicon-refresh':el.loading}]\"></i>\r\n\t\t<span class='tree-title'>{{el.text}}</span>\r\n\t</span>\r\n\t<ul :if='el.chLoaded && el.children && el.children.length' :visible=\"el.state==='open'\" :html=\"@getChildrenTpl(el)\"></ul>\r\n</li>\r\n";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var reqwest = __webpack_require__(42);
	var defaultSetting = {
		crossOrigin : true,
		withCredentials : false
	};
	function doAjax(url,param,callback,loadingArea,setting,method){
		param = param || {};
		if(loadingArea !== null){
			var $loadingArea = avalon(loadingArea || document.body);
		}
		$loadingArea && $loadingArea.loading(true);
		avalon.log("发送参数",url,param);
		setting = avalon.mix({
			url : url,
			data : param,
			type : 'json',
			error : function(){
				$loadingArea && $loadingArea.loading();
				avalon.log('接收错误',url,arguments);
				callback && callback({
					code : -1,
					desc : "服务器错误"
				});
			},
			success : function(resp){
				$loadingArea && $loadingArea.loading();
				avalon.log("接收数据",url,resp);
				try{
					if(callback){
						callback(resp);
					}
				}catch(ex){
					avalon.log(ex);
				}
			}
		},defaultSetting,setting);
		setting.method = method;
		reqwest(setting);
	}
	avalon.ajaxPost = function(url,param,callback,loadingArea,setting){
		doAjax(url,param,callback,loadingArea,setting,"POST");
	};
	avalon.ajaxGet = function(url,param,callback,loadingArea,setting){
		doAjax(url,param,callback,loadingArea,setting,"GET");
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  * Reqwest! A general purpose XHR connection manager
	  * license MIT (c) Dustin Diaz 2015
	  * https://github.com/ded/reqwest
	  */

	!function (name, context, definition) {
	  if(typeof seajs != 'undefined') {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){
	      module.exports = definition()
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  }else if (typeof module != 'undefined' && module.exports) module.exports = definition()
	  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else context[name] = definition()
	}('reqwest', this, function () {

	  var context = this

	  if ('window' in context) {
	    var doc = document
	      , byTag = 'getElementsByTagName'
	      , head = doc[byTag]('head')[0]
	  } else {
	    var XHR2
	    try {
	      XHR2 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"xhr2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	    } catch (ex) {
	      throw new Error('Peer dependency `xhr2` required! Please npm install xhr2')
	    }
	  }


	  var httpsRe = /^http/
	    , protocolRe = /(^\w+):\/\//
	    , twoHundo = /^(20\d|1223)$/ //http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	    , readyState = 'readyState'
	    , contentType = 'Content-Type'
	    , requestedWith = 'X-Requested-With'
	    , uniqid = 0
	    , callbackPrefix = 'reqwest_' + (+new Date())
	    , lastValue // data stored by the most recent JSONP callback
	    , xmlHttpRequest = 'XMLHttpRequest'
	    , xDomainRequest = 'XDomainRequest'
	    , noop = function () {}

	    , isArray = typeof Array.isArray == 'function'
	        ? Array.isArray
	        : function (a) {
	            return a instanceof Array
	          }

	    , defaultHeaders = {
	          'contentType': 'application/x-www-form-urlencoded'
	        , 'requestedWith': xmlHttpRequest
	        , 'accept': {
	              '*':  'text/javascript, text/html, application/xml, text/xml, */*'
	            , 'xml':  'application/xml, text/xml'
	            , 'html': 'text/html'
	            , 'text': 'text/plain'
	            , 'json': 'application/json, text/javascript'
	            , 'js':   'application/javascript, text/javascript'
	          }
	      }

	    , xhr = function(o) {
	        // is it x-domain
	        if (o['crossOrigin'] === true) {
	          var xhr = context[xmlHttpRequest] ? new XMLHttpRequest() : null
	          if (xhr && 'withCredentials' in xhr) {
	            return xhr
	          } else if (context[xDomainRequest]) {
	            return new XDomainRequest()
	          } else {
	            throw new Error('Browser does not support cross-origin requests')
	          }
	        } else if (context[xmlHttpRequest]) {
	          return new XMLHttpRequest()
	        } else if (XHR2) {
	          return new XHR2()
	        } else {
	          return new ActiveXObject('Microsoft.XMLHTTP')
	        }
	      }
	    , globalSetupOptions = {
	        dataFilter: function (data) {
	          return data
	        }
	      }

	  function succeed(r) {
	    var protocol = protocolRe.exec(r.url)
	    protocol = (protocol && protocol[1]) || context.location.protocol
	    return httpsRe.test(protocol) ? twoHundo.test(r.request.status) : !!r.request.response
	  }

	  function handleReadyState(r, success, error) {
	    return function () {
	      // use _aborted to mitigate against IE err c00c023f
	      // (can't read props on aborted request objects)
	      if (r._aborted) return error(r.request)
	      if (r._timedOut) return error(r.request, 'Request is aborted: timeout')
	      if (r.request && r.request[readyState] == 4) {
	        r.request.onreadystatechange = noop
	        if (succeed(r)) success(r.request)
	        else
	          error(r.request)
	      }
	    }
	  }

	  function setHeaders(http, o) {
	    var headers = o['headers'] || {}
	      , h

	    headers['Accept'] = headers['Accept']
	      || defaultHeaders['accept'][o['type']]
	      || defaultHeaders['accept']['*']

	    var isAFormData = typeof FormData !== 'undefined' && (o['data'] instanceof FormData);
	    // breaks cross-origin requests with legacy browsers
	    if (!o['crossOrigin'] && !headers[requestedWith]) headers[requestedWith] = defaultHeaders['requestedWith']
	    if (!headers[contentType] && !isAFormData) headers[contentType] = o['contentType'] || defaultHeaders['contentType']
	    for (h in headers)
	      headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h])
	  }

	  function setCredentials(http, o) {
	    if (typeof o['withCredentials'] !== 'undefined' && typeof http.withCredentials !== 'undefined') {
	      http.withCredentials = !!o['withCredentials']
	    }
	  }

	  function generalCallback(data) {
	    lastValue = data
	  }

	  function urlappend (url, s) {
	    return url + (/\?/.test(url) ? '&' : '?') + s
	  }

	  function handleJsonp(o, fn, err, url) {
	    var reqId = uniqid++
	      , cbkey = o['jsonpCallback'] || 'callback' // the 'callback' key
	      , cbval = o['jsonpCallbackName'] || reqwest.getcallbackPrefix(reqId)
	      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
	      , match = url.match(cbreg)
	      , script = doc.createElement('script')
	      , loaded = 0
	      , isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1

	    if (match) {
	      if (match[3] === '?') {
	        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
	      } else {
	        cbval = match[3] // provided callback func name
	      }
	    } else {
	      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
	    }

	    context[cbval] = generalCallback

	    script.type = 'text/javascript'
	    script.src = url
	    script.async = true
	    if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
	      // need this for IE due to out-of-order onreadystatechange(), binding script
	      // execution to an event listener gives us control over when the script
	      // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
	      script.htmlFor = script.id = '_reqwest_' + reqId
	    }

	    script.onload = script.onreadystatechange = function () {
	      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
	        return false
	      }
	      script.onload = script.onreadystatechange = null
	      script.onclick && script.onclick()
	      // Call the user callback with the last value stored and clean up values and scripts.
	      fn(lastValue)
	      lastValue = undefined
	      head.removeChild(script)
	      loaded = 1
	    }

	    // Add the script to the DOM head
	    head.appendChild(script)

	    // Enable JSONP timeout
	    return {
	      abort: function () {
	        script.onload = script.onreadystatechange = null
	        err({}, 'Request is aborted: timeout', {})
	        lastValue = undefined
	        head.removeChild(script)
	        loaded = 1
	      }
	    }
	  }

	  function getRequest(fn, err) {
	    var o = this.o
	      , method = (o['method'] || 'GET').toUpperCase()
	      , url = typeof o === 'string' ? o : o['url']
	      // convert non-string objects to query-string form unless o['processData'] is false
	      , data = (o['processData'] !== false && o['data'] && typeof o['data'] !== 'string')
	        ? reqwest.toQueryString(o['data'])
	        : (o['data'] || null)
	      , http
	      , sendWait = false

	    // if we're working on a GET request and we have data then we should append
	    // query string to end of URL and not post data
	    if ((o['type'] == 'jsonp' || method == 'GET') && data) {
	      url = urlappend(url, data)
	      data = null
	    }

	    if (o['type'] == 'jsonp') return handleJsonp(o, fn, err, url)

	    // get the xhr from the factory if passed
	    // if the factory returns null, fall-back to ours
	    http = (o.xhr && o.xhr(o)) || xhr(o)

	    http.open(method, url, o['async'] === false ? false : true)
	    setHeaders(http, o)
	    setCredentials(http, o)
	    if (context[xDomainRequest] && http instanceof context[xDomainRequest]) {
	        http.onload = fn
	        http.onerror = err
	        // NOTE: see
	        // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
	        http.onprogress = function() {}
	        sendWait = true
	    } else {
	      http.onreadystatechange = handleReadyState(this, fn, err)
	    }
	    o['before'] && o['before'](http)
	    if (sendWait) {
	      setTimeout(function () {
	        http.send(data)
	      }, 200)
	    } else {
	      http.send(data)
	    }
	    return http
	  }

	  function Reqwest(o, fn) {
	    this.o = o
	    this.fn = fn

	    init.apply(this, arguments)
	  }

	  function setType(header) {
	    // json, javascript, text/plain, text/html, xml
	    if (header === null) return undefined; //In case of no content-type.
	    if (header.match('json')) return 'json'
	    if (header.match('javascript')) return 'js'
	    if (header.match('text')) return 'html'
	    if (header.match('xml')) return 'xml'
	  }

	  function init(o, fn) {

	    this.url = typeof o == 'string' ? o : o['url']
	    this.timeout = null

	    // whether request has been fulfilled for purpose
	    // of tracking the Promises
	    this._fulfilled = false
	    // success handlers
	    this._successHandler = function(){}
	    this._fulfillmentHandlers = []
	    // error handlers
	    this._errorHandlers = []
	    // complete (both success and fail) handlers
	    this._completeHandlers = []
	    this._erred = false
	    this._responseArgs = {}

	    var self = this

	    fn = fn || function () {}

	    if (o['timeout']) {
	      this.timeout = setTimeout(function () {
	        timedOut()
	      }, o['timeout'])
	    }

	    if (o['success']) {
	      this._successHandler = function () {
	        o['success'].apply(o, arguments)
	      }
	    }

	    if (o['error']) {
	      this._errorHandlers.push(function () {
	        o['error'].apply(o, arguments)
	      })
	    }

	    if (o['complete']) {
	      this._completeHandlers.push(function () {
	        o['complete'].apply(o, arguments)
	      })
	    }

	    function complete (resp) {
	      o['timeout'] && clearTimeout(self.timeout)
	      self.timeout = null
	      while (self._completeHandlers.length > 0) {
	        self._completeHandlers.shift()(resp)
	      }
	    }

	    function success (resp) {
	      var type = o['type'] || resp && setType(resp.getResponseHeader('Content-Type')) // resp can be undefined in IE
	      resp = (type !== 'jsonp') ? self.request : resp
	      // use global data filter on response text
	      var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
	        , r = filteredResponse
	      try {
	        resp.responseText = r
	      } catch (e) {
	        // can't assign this in IE<=8, just ignore
	      }
	      if (r) {
	        switch (type) {
	        case 'json':
	          try {
	            resp = context.JSON ? context.JSON.parse(r) : eval('(' + r + ')')
	          } catch (err) {
	            return error(resp, 'Could not parse JSON in response', err)
	          }
	          break
	        case 'js':
	          resp = eval(r)
	          break
	        case 'html':
	          resp = r
	          break
	        case 'xml':
	          resp = resp.responseXML
	              && resp.responseXML.parseError // IE trololo
	              && resp.responseXML.parseError.errorCode
	              && resp.responseXML.parseError.reason
	            ? null
	            : resp.responseXML
	          break
	        }
	      }

	      self._responseArgs.resp = resp
	      self._fulfilled = true
	      fn(resp)
	      self._successHandler(resp)
	      while (self._fulfillmentHandlers.length > 0) {
	        resp = self._fulfillmentHandlers.shift()(resp)
	      }

	      complete(resp)
	    }

	    function timedOut() {
	      self._timedOut = true
	      self.request.abort()
	    }

	    function error(resp, msg, t) {
	      resp = self.request
	      self._responseArgs.resp = resp
	      self._responseArgs.msg = msg
	      self._responseArgs.t = t
	      self._erred = true
	      while (self._errorHandlers.length > 0) {
	        self._errorHandlers.shift()(resp, msg, t)
	      }
	      complete(resp)
	    }

	    this.request = getRequest.call(this, success, error)
	  }

	  Reqwest.prototype = {
	    abort: function () {
	      this._aborted = true
	      this.request.abort()
	    }

	  , retry: function () {
	      init.call(this, this.o, this.fn)
	    }

	    /**
	     * Small deviation from the Promises A CommonJs specification
	     * http://wiki.commonjs.org/wiki/Promises/A
	     */

	    /**
	     * `then` will execute upon successful requests
	     */
	  , then: function (success, fail) {
	      success = success || function () {}
	      fail = fail || function () {}
	      if (this._fulfilled) {
	        this._responseArgs.resp = success(this._responseArgs.resp)
	      } else if (this._erred) {
	        fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
	      } else {
	        this._fulfillmentHandlers.push(success)
	        this._errorHandlers.push(fail)
	      }
	      return this
	    }

	    /**
	     * `always` will execute whether the request succeeds or fails
	     */
	  , always: function (fn) {
	      if (this._fulfilled || this._erred) {
	        fn(this._responseArgs.resp)
	      } else {
	        this._completeHandlers.push(fn)
	      }
	      return this
	    }

	    /**
	     * `fail` will execute when the request fails
	     */
	  , fail: function (fn) {
	      if (this._erred) {
	        fn(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
	      } else {
	        this._errorHandlers.push(fn)
	      }
	      return this
	    }
	  , 'catch': function (fn) {
	      return this.fail(fn)
	    }
	  }

	  function reqwest(o, fn) {
	    return new Reqwest(o, fn)
	  }

	  // normalize newline variants according to spec -> CRLF
	  function normalize(s) {
	    return s ? s.replace(/\r?\n/g, '\r\n') : ''
	  }

	  function serial(el, cb) {
	    var n = el.name
	      , t = el.tagName.toLowerCase()
	      , optCb = function (o) {
	          // IE gives value="" even where there is no value attribute
	          // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
	          if (o && !o['disabled'])
	            cb(n, normalize(o['attributes']['value'] && o['attributes']['value']['specified'] ? o['value'] : o['text']))
	        }
	      , ch, ra, val, i

	    // don't serialize elements that are disabled or without a name
	    if (el.disabled || !n) return

	    switch (t) {
	    case 'input':
	      if (!/reset|button|image|file/i.test(el.type)) {
	        ch = /checkbox/i.test(el.type)
	        ra = /radio/i.test(el.type)
	        val = el.value
	        // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
	        ;(!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
	      }
	      break
	    case 'textarea':
	      cb(n, normalize(el.value))
	      break
	    case 'select':
	      if (el.type.toLowerCase() === 'select-one') {
	        optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
	      } else {
	        for (i = 0; el.length && i < el.length; i++) {
	          el.options[i].selected && optCb(el.options[i])
	        }
	      }
	      break
	    }
	  }

	  // collect up all form elements found from the passed argument elements all
	  // the way down to child elements; pass a '<form>' or form fields.
	  // called with 'this'=callback to use for serial() on each element
	  function eachFormElement() {
	    var cb = this
	      , e, i
	      , serializeSubtags = function (e, tags) {
	          var i, j, fa
	          for (i = 0; i < tags.length; i++) {
	            fa = e[byTag](tags[i])
	            for (j = 0; j < fa.length; j++) serial(fa[j], cb)
	          }
	        }

	    for (i = 0; i < arguments.length; i++) {
	      e = arguments[i]
	      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
	      serializeSubtags(e, [ 'input', 'select', 'textarea' ])
	    }
	  }

	  // standard query string style serialization
	  function serializeQueryString() {
	    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
	  }

	  // { 'name': 'value', ... } style serialization
	  function serializeHash() {
	    var hash = {}
	    eachFormElement.apply(function (name, value) {
	      if (name in hash) {
	        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
	        hash[name].push(value)
	      } else hash[name] = value
	    }, arguments)
	    return hash
	  }

	  // [ { name: 'name', value: 'value' }, ... ] style serialization
	  reqwest.serializeArray = function () {
	    var arr = []
	    eachFormElement.apply(function (name, value) {
	      arr.push({name: name, value: value})
	    }, arguments)
	    return arr
	  }

	  reqwest.serialize = function () {
	    if (arguments.length === 0) return ''
	    var opt, fn
	      , args = Array.prototype.slice.call(arguments, 0)

	    opt = args.pop()
	    opt && opt.nodeType && args.push(opt) && (opt = null)
	    opt && (opt = opt.type)

	    if (opt == 'map') fn = serializeHash
	    else if (opt == 'array') fn = reqwest.serializeArray
	    else fn = serializeQueryString

	    return fn.apply(null, args)
	  }

	  reqwest.toQueryString = function (o, trad) {
	    var prefix, i
	      , traditional = trad || false
	      , s = []
	      , enc = encodeURIComponent
	      , add = function (key, value) {
	          // If value is a function, invoke it and return its value
	          value = ('function' === typeof value) ? value() : (value == null ? '' : value)
	          s[s.length] = enc(key) + '=' + enc(value)
	        }
	    // If an array was passed in, assume that it is an array of form elements.
	    if (isArray(o)) {
	      for (i = 0; o && i < o.length; i++) add(o[i]['name'], o[i]['value'])
	    } else {
	      // If traditional, encode the "old" way (the way 1.3.2 or older
	      // did it), otherwise encode params recursively.
	      for (prefix in o) {
	        if (o.hasOwnProperty(prefix)) buildParams(prefix, o[prefix], traditional, add)
	      }
	    }

	    // spaces should be + according to spec
	    return s.join('&').replace(/%20/g, '+')
	  }

	  function buildParams(prefix, obj, traditional, add) {
	    var name, i, v
	      , rbracket = /\[\]$/

	    if (isArray(obj)) {
	      // Serialize array item.
	      for (i = 0; obj && i < obj.length; i++) {
	        v = obj[i]
	        if (traditional || rbracket.test(prefix)) {
	          // Treat each array item as a scalar.
	          add(prefix, v)
	        } else {
	          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add)
	        }
	      }
	    } else if (obj && obj.toString() === '[object Object]') {
	      // Serialize object item.
	      for (name in obj) {
	        buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
	      }

	    } else {
	      // Serialize scalar item.
	      add(prefix, obj)
	    }
	  }

	  reqwest.getcallbackPrefix = function () {
	    return callbackPrefix
	  }

	  // jQuery and Zepto compatibility, differences can be remapped here so you can call
	  // .ajax.compat(options, callback)
	  reqwest.compat = function (o, fn) {
	    if (o) {
	      o['type'] && (o['method'] = o['type']) && delete o['type']
	      o['dataType'] && (o['type'] = o['dataType'])
	      o['jsonpCallback'] && (o['jsonpCallbackName'] = o['jsonpCallback']) && delete o['jsonpCallback']
	      o['jsonp'] && (o['jsonpCallback'] = o['jsonp'])
	    }
	    return new Reqwest(o, fn)
	  }

	  reqwest.ajaxSetup = function (options) {
	    options = options || {}
	    for (var k in options) {
	      globalSetupOptions[k] = options[k]
	    }
	  }

	  return reqwest
	});


/***/ }
/******/ ]);