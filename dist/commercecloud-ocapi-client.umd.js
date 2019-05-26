(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['ocapi-client'] = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var componentEmitter = createCommonjsModule(function (module) {
  /**
   * Expose `Emitter`.
   */

  {
    module.exports = Emitter;
  }

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on =
  Emitter.prototype.addEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
      .push(fn);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.once = function(event, fn){
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off =
  Emitter.prototype.removeListener =
  Emitter.prototype.removeAllListeners =
  Emitter.prototype.removeEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    }

    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }

    // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.
    if (callbacks.length === 0) {
      delete this._callbacks['$' + event];
    }

    return this;
  };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};

    var args = new Array(arguments.length - 1)
      , callbacks = this._callbacks['$' + event];

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };
  });

  function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

  /**
   * Check if `obj` is an object.
   *
   * @param {Object} obj
   * @return {Boolean}
   * @api private
   */
  function isObject(obj) {
    return obj !== null && _typeof$1(obj) === 'object';
  }

  var isObject_1 = isObject;

  function _typeof$2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

  /**
   * Module of mixed-in functions shared between node and client code
   */

  /**
   * Expose `RequestBase`.
   */


  var requestBase = RequestBase;
  /**
   * Initialize a new `RequestBase`.
   *
   * @api public
   */

  function RequestBase(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the prototype properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */


  function mixin(obj) {
    for (var key in RequestBase.prototype) {
      if (Object.prototype.hasOwnProperty.call(RequestBase.prototype, key)) obj[key] = RequestBase.prototype[key];
    }

    return obj;
  }
  /**
   * Clear previous timeout.
   *
   * @return {Request} for chaining
   * @api public
   */


  RequestBase.prototype.clearTimeout = function () {
    clearTimeout(this._timer);
    clearTimeout(this._responseTimeoutTimer);
    clearTimeout(this._uploadTimeoutTimer);
    delete this._timer;
    delete this._responseTimeoutTimer;
    delete this._uploadTimeoutTimer;
    return this;
  };
  /**
   * Override default response body parser
   *
   * This function will be called to convert incoming data into request.body
   *
   * @param {Function}
   * @api public
   */


  RequestBase.prototype.parse = function (fn) {
    this._parser = fn;
    return this;
  };
  /**
   * Set format of binary response body.
   * In browser valid formats are 'blob' and 'arraybuffer',
   * which return Blob and ArrayBuffer, respectively.
   *
   * In Node all values result in Buffer.
   *
   * Examples:
   *
   *      req.get('/')
   *        .responseType('blob')
   *        .end(callback);
   *
   * @param {String} val
   * @return {Request} for chaining
   * @api public
   */


  RequestBase.prototype.responseType = function (val) {
    this._responseType = val;
    return this;
  };
  /**
   * Override default request body serializer
   *
   * This function will be called to convert data set via .send or .attach into payload to send
   *
   * @param {Function}
   * @api public
   */


  RequestBase.prototype.serialize = function (fn) {
    this._serializer = fn;
    return this;
  };
  /**
   * Set timeouts.
   *
   * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
   * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
   * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
   *
   * Value of 0 or false means no timeout.
   *
   * @param {Number|Object} ms or {response, deadline}
   * @return {Request} for chaining
   * @api public
   */


  RequestBase.prototype.timeout = function (options) {
    if (!options || _typeof$2(options) !== 'object') {
      this._timeout = options;
      this._responseTimeout = 0;
      this._uploadTimeout = 0;
      return this;
    }

    for (var option in options) {
      if (Object.prototype.hasOwnProperty.call(options, option)) {
        switch (option) {
          case 'deadline':
            this._timeout = options.deadline;
            break;

          case 'response':
            this._responseTimeout = options.response;
            break;

          case 'upload':
            this._uploadTimeout = options.upload;
            break;

          default:
            console.warn('Unknown timeout option', option);
        }
      }
    }

    return this;
  };
  /**
   * Set number of retry attempts on error.
   *
   * Failed requests will be retried 'count' times if timeout or err.code >= 500.
   *
   * @param {Number} count
   * @param {Function} [fn]
   * @return {Request} for chaining
   * @api public
   */


  RequestBase.prototype.retry = function (count, fn) {
    // Default to 1 if no count passed or true
    if (arguments.length === 0 || count === true) count = 1;
    if (count <= 0) count = 0;
    this._maxRetries = count;
    this._retries = 0;
    this._retryCallback = fn;
    return this;
  };

  var ERROR_CODES = ['ECONNRESET', 'ETIMEDOUT', 'EADDRINFO', 'ESOCKETTIMEDOUT'];
  /**
   * Determine if a request should be retried.
   * (Borrowed from segmentio/superagent-retry)
   *
   * @param {Error} err an error
   * @param {Response} [res] response
   * @returns {Boolean} if segment should be retried
   */

  RequestBase.prototype._shouldRetry = function (err, res) {
    if (!this._maxRetries || this._retries++ >= this._maxRetries) {
      return false;
    }

    if (this._retryCallback) {
      try {
        var override = this._retryCallback(err, res);

        if (override === true) return true;
        if (override === false) return false; // undefined falls back to defaults
      } catch (err2) {
        console.error(err2);
      }
    }

    if (res && res.status && res.status >= 500 && res.status !== 501) return true;

    if (err) {
      if (err.code && ERROR_CODES.indexOf(err.code) !== -1) return true; // Superagent timeout

      if (err.timeout && err.code === 'ECONNABORTED') return true;
      if (err.crossDomain) return true;
    }

    return false;
  };
  /**
   * Retry request
   *
   * @return {Request} for chaining
   * @api private
   */


  RequestBase.prototype._retry = function () {
    this.clearTimeout(); // node

    if (this.req) {
      this.req = null;
      this.req = this.request();
    }

    this._aborted = false;
    this.timedout = false;
    return this._end();
  };
  /**
   * Promise support
   *
   * @param {Function} resolve
   * @param {Function} [reject]
   * @return {Request}
   */


  RequestBase.prototype.then = function (resolve, reject) {
    var _this = this;

    if (!this._fullfilledPromise) {
      var self = this;

      if (this._endCalled) {
        console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
      }

      this._fullfilledPromise = new Promise(function (resolve, reject) {
        self.on('abort', function () {
          var err = new Error('Aborted');
          err.code = 'ABORTED';
          err.status = _this.status;
          err.method = _this.method;
          err.url = _this.url;
          reject(err);
        });
        self.end(function (err, res) {
          if (err) reject(err);else resolve(res);
        });
      });
    }

    return this._fullfilledPromise.then(resolve, reject);
  };

  RequestBase.prototype.catch = function (cb) {
    return this.then(undefined, cb);
  };
  /**
   * Allow for extension
   */


  RequestBase.prototype.use = function (fn) {
    fn(this);
    return this;
  };

  RequestBase.prototype.ok = function (cb) {
    if (typeof cb !== 'function') throw new Error('Callback required');
    this._okCallback = cb;
    return this;
  };

  RequestBase.prototype._isResponseOK = function (res) {
    if (!res) {
      return false;
    }

    if (this._okCallback) {
      return this._okCallback(res);
    }

    return res.status >= 200 && res.status < 300;
  };
  /**
   * Get request header `field`.
   * Case-insensitive.
   *
   * @param {String} field
   * @return {String}
   * @api public
   */


  RequestBase.prototype.get = function (field) {
    return this._header[field.toLowerCase()];
  };
  /**
   * Get case-insensitive header `field` value.
   * This is a deprecated internal API. Use `.get(field)` instead.
   *
   * (getHeader is no longer used internally by the superagent code base)
   *
   * @param {String} field
   * @return {String}
   * @api private
   * @deprecated
   */


  RequestBase.prototype.getHeader = RequestBase.prototype.get;
  /**
   * Set header `field` to `val`, or multiple fields with one object.
   * Case-insensitive.
   *
   * Examples:
   *
   *      req.get('/')
   *        .set('Accept', 'application/json')
   *        .set('X-API-Key', 'foobar')
   *        .end(callback);
   *
   *      req.get('/')
   *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
   *        .end(callback);
   *
   * @param {String|Object} field
   * @param {String} val
   * @return {Request} for chaining
   * @api public
   */

  RequestBase.prototype.set = function (field, val) {
    if (isObject_1(field)) {
      for (var key in field) {
        if (Object.prototype.hasOwnProperty.call(field, key)) this.set(key, field[key]);
      }

      return this;
    }

    this._header[field.toLowerCase()] = val;
    this.header[field] = val;
    return this;
  }; // eslint-disable-next-line valid-jsdoc

  /**
   * Remove header `field`.
   * Case-insensitive.
   *
   * Example:
   *
   *      req.get('/')
   *        .unset('User-Agent')
   *        .end(callback);
   *
   * @param {String} field field name
   */


  RequestBase.prototype.unset = function (field) {
    delete this._header[field.toLowerCase()];
    delete this.header[field];
    return this;
  };
  /**
   * Write the field `name` and `val`, or multiple fields with one object
   * for "multipart/form-data" request bodies.
   *
   * ``` js
   * request.post('/upload')
   *   .field('foo', 'bar')
   *   .end(callback);
   *
   * request.post('/upload')
   *   .field({ foo: 'bar', baz: 'qux' })
   *   .end(callback);
   * ```
   *
   * @param {String|Object} name name of field
   * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
   * @return {Request} for chaining
   * @api public
   */


  RequestBase.prototype.field = function (name, val) {
    // name should be either a string or an object.
    if (name === null || undefined === name) {
      throw new Error('.field(name, val) name can not be empty');
    }

    if (this._data) {
      throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
    }

    if (isObject_1(name)) {
      for (var key in name) {
        if (Object.prototype.hasOwnProperty.call(name, key)) this.field(key, name[key]);
      }

      return this;
    }

    if (Array.isArray(val)) {
      for (var i in val) {
        if (Object.prototype.hasOwnProperty.call(val, i)) this.field(name, val[i]);
      }

      return this;
    } // val should be defined now


    if (val === null || undefined === val) {
      throw new Error('.field(name, val) val can not be empty');
    }

    if (typeof val === 'boolean') {
      val = String(val);
    }

    this._getFormData().append(name, val);

    return this;
  };
  /**
   * Abort the request, and clear potential timeout.
   *
   * @return {Request} request
   * @api public
   */


  RequestBase.prototype.abort = function () {
    if (this._aborted) {
      return this;
    }

    this._aborted = true;
    if (this.xhr) this.xhr.abort(); // browser

    if (this.req) this.req.abort(); // node

    this.clearTimeout();
    this.emit('abort');
    return this;
  };

  RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
    switch (options.type) {
      case 'basic':
        this.set('Authorization', "Basic ".concat(base64Encoder("".concat(user, ":").concat(pass))));
        break;

      case 'auto':
        this.username = user;
        this.password = pass;
        break;

      case 'bearer':
        // usage would be .auth(accessToken, { type: 'bearer' })
        this.set('Authorization', "Bearer ".concat(user));
        break;

      default:
        break;
    }

    return this;
  };
  /**
   * Enable transmission of cookies with x-domain requests.
   *
   * Note that for this to work the origin must not be
   * using "Access-Control-Allow-Origin" with a wildcard,
   * and also must set "Access-Control-Allow-Credentials"
   * to "true".
   *
   * @api public
   */


  RequestBase.prototype.withCredentials = function (on) {
    // This is browser-only functionality. Node side is no-op.
    if (on === undefined) on = true;
    this._withCredentials = on;
    return this;
  };
  /**
   * Set the max redirects to `n`. Does nothing in browser XHR implementation.
   *
   * @param {Number} n
   * @return {Request} for chaining
   * @api public
   */


  RequestBase.prototype.redirects = function (n) {
    this._maxRedirects = n;
    return this;
  };
  /**
   * Maximum size of buffered response body, in bytes. Counts uncompressed size.
   * Default 200MB.
   *
   * @param {Number} n number of bytes
   * @return {Request} for chaining
   */


  RequestBase.prototype.maxResponseSize = function (n) {
    if (typeof n !== 'number') {
      throw new TypeError('Invalid argument');
    }

    this._maxResponseSize = n;
    return this;
  };
  /**
   * Convert to a plain javascript object (not JSON string) of scalar properties.
   * Note as this method is designed to return a useful non-this value,
   * it cannot be chained.
   *
   * @return {Object} describing method, url, and data of this request
   * @api public
   */


  RequestBase.prototype.toJSON = function () {
    return {
      method: this.method,
      url: this.url,
      data: this._data,
      headers: this._header
    };
  };
  /**
   * Send `data` as the request body, defaulting the `.type()` to "json" when
   * an object is given.
   *
   * Examples:
   *
   *       // manual json
   *       request.post('/user')
   *         .type('json')
   *         .send('{"name":"tj"}')
   *         .end(callback)
   *
   *       // auto json
   *       request.post('/user')
   *         .send({ name: 'tj' })
   *         .end(callback)
   *
   *       // manual x-www-form-urlencoded
   *       request.post('/user')
   *         .type('form')
   *         .send('name=tj')
   *         .end(callback)
   *
   *       // auto x-www-form-urlencoded
   *       request.post('/user')
   *         .type('form')
   *         .send({ name: 'tj' })
   *         .end(callback)
   *
   *       // defaults to x-www-form-urlencoded
   *      request.post('/user')
   *        .send('name=tobi')
   *        .send('species=ferret')
   *        .end(callback)
   *
   * @param {String|Object} data
   * @return {Request} for chaining
   * @api public
   */
  // eslint-disable-next-line complexity


  RequestBase.prototype.send = function (data) {
    var isObj = isObject_1(data);
    var type = this._header['content-type'];

    if (this._formData) {
      throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
    }

    if (isObj && !this._data) {
      if (Array.isArray(data)) {
        this._data = [];
      } else if (!this._isHost(data)) {
        this._data = {};
      }
    } else if (data && this._data && this._isHost(this._data)) {
      throw new Error("Can't merge these send calls");
    } // merge


    if (isObj && isObject_1(this._data)) {
      for (var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) this._data[key] = data[key];
      }
    } else if (typeof data === 'string') {
      // default to x-www-form-urlencoded
      if (!type) this.type('form');
      type = this._header['content-type'];

      if (type === 'application/x-www-form-urlencoded') {
        this._data = this._data ? "".concat(this._data, "&").concat(data) : data;
      } else {
        this._data = (this._data || '') + data;
      }
    } else {
      this._data = data;
    }

    if (!isObj || this._isHost(data)) {
      return this;
    } // default to json


    if (!type) this.type('json');
    return this;
  };
  /**
   * Sort `querystring` by the sort function
   *
   *
   * Examples:
   *
   *       // default order
   *       request.get('/user')
   *         .query('name=Nick')
   *         .query('search=Manny')
   *         .sortQuery()
   *         .end(callback)
   *
   *       // customized sort function
   *       request.get('/user')
   *         .query('name=Nick')
   *         .query('search=Manny')
   *         .sortQuery(function(a, b){
   *           return a.length - b.length;
   *         })
   *         .end(callback)
   *
   *
   * @param {Function} sort
   * @return {Request} for chaining
   * @api public
   */


  RequestBase.prototype.sortQuery = function (sort) {
    // _sort default to true but otherwise can be a function or boolean
    this._sort = typeof sort === 'undefined' ? true : sort;
    return this;
  };
  /**
   * Compose querystring to append to req.url
   *
   * @api private
   */


  RequestBase.prototype._finalizeQueryString = function () {
    var query = this._query.join('&');

    if (query) {
      this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
    }

    this._query.length = 0; // Makes the call idempotent

    if (this._sort) {
      var index = this.url.indexOf('?');

      if (index >= 0) {
        var queryArr = this.url.substring(index + 1).split('&');

        if (typeof this._sort === 'function') {
          queryArr.sort(this._sort);
        } else {
          queryArr.sort();
        }

        this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
      }
    }
  }; // For backwards compat only


  RequestBase.prototype._appendQueryString = function () {
    console.warn('Unsupported');
  };
  /**
   * Invoke callback with timeout error.
   *
   * @api private
   */


  RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
    if (this._aborted) {
      return;
    }

    var err = new Error("".concat(reason + timeout, "ms exceeded"));
    err.timeout = timeout;
    err.code = 'ECONNABORTED';
    err.errno = errno;
    this.timedout = true;
    this.abort();
    this.callback(err);
  };

  RequestBase.prototype._setTimeouts = function () {
    var self = this; // deadline

    if (this._timeout && !this._timer) {
      this._timer = setTimeout(function () {
        self._timeoutError('Timeout of ', self._timeout, 'ETIME');
      }, this._timeout);
    } // response timeout


    if (this._responseTimeout && !this._responseTimeoutTimer) {
      this._responseTimeoutTimer = setTimeout(function () {
        self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
      }, this._responseTimeout);
    }
  };

  /**
   * Return the mime type for the given `str`.
   *
   * @param {String} str
   * @return {String}
   * @api private
   */
  var type = function (str) {
    return str.split(/ *; */).shift();
  };
  /**
   * Return header field parameters.
   *
   * @param {String} str
   * @return {Object}
   * @api private
   */


  var params = function (str) {
    return str.split(/ *; */).reduce(function (obj, str) {
      var parts = str.split(/ *= */);
      var key = parts.shift();
      var val = parts.shift();
      if (key && val) obj[key] = val;
      return obj;
    }, {});
  };
  /**
   * Parse Link header fields.
   *
   * @param {String} str
   * @return {Object}
   * @api private
   */


  var parseLinks = function (str) {
    return str.split(/ *, */).reduce(function (obj, str) {
      var parts = str.split(/ *; */);
      var url = parts[0].slice(1, -1);
      var rel = parts[1].split(/ *= */)[1].slice(1, -1);
      obj[rel] = url;
      return obj;
    }, {});
  };
  /**
   * Strip content related fields from `header`.
   *
   * @param {Object} header
   * @return {Object} header
   * @api private
   */


  var cleanHeader = function (header, changesOrigin) {
    delete header['content-type'];
    delete header['content-length'];
    delete header['transfer-encoding'];
    delete header.host; // secuirty

    if (changesOrigin) {
      delete header.authorization;
      delete header.cookie;
    }

    return header;
  };

  var utils = {
  	type: type,
  	params: params,
  	parseLinks: parseLinks,
  	cleanHeader: cleanHeader
  };

  /**
   * Module dependencies.
   */

  /**
   * Expose `ResponseBase`.
   */


  var responseBase = ResponseBase;
  /**
   * Initialize a new `ResponseBase`.
   *
   * @api public
   */

  function ResponseBase(obj) {
    if (obj) return mixin$1(obj);
  }
  /**
   * Mixin the prototype properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */


  function mixin$1(obj) {
    for (var key in ResponseBase.prototype) {
      if (Object.prototype.hasOwnProperty.call(ResponseBase.prototype, key)) obj[key] = ResponseBase.prototype[key];
    }

    return obj;
  }
  /**
   * Get case-insensitive `field` value.
   *
   * @param {String} field
   * @return {String}
   * @api public
   */


  ResponseBase.prototype.get = function (field) {
    return this.header[field.toLowerCase()];
  };
  /**
   * Set header related properties:
   *
   *   - `.type` the content type without params
   *
   * A response of "Content-Type: text/plain; charset=utf-8"
   * will provide you with a `.type` of "text/plain".
   *
   * @param {Object} header
   * @api private
   */


  ResponseBase.prototype._setHeaderProperties = function (header) {
    // TODO: moar!
    // TODO: make this a util
    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct); // params

    var params = utils.params(ct);

    for (var key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) this[key] = params[key];
    }

    this.links = {}; // links

    try {
      if (header.link) {
        this.links = utils.parseLinks(header.link);
      }
    } catch (err) {// ignore
    }
  };
  /**
   * Set flags such as `.ok` based on `status`.
   *
   * For example a 2xx response will give you a `.ok` of __true__
   * whereas 5xx will be __false__ and `.error` will be __true__. The
   * `.clientError` and `.serverError` are also available to be more
   * specific, and `.statusType` is the class of error ranging from 1..5
   * sometimes useful for mapping respond colors etc.
   *
   * "sugar" properties are also defined for common cases. Currently providing:
   *
   *   - .noContent
   *   - .badRequest
   *   - .unauthorized
   *   - .notAcceptable
   *   - .notFound
   *
   * @param {Number} status
   * @api private
   */


  ResponseBase.prototype._setStatusProperties = function (status) {
    var type = status / 100 | 0; // status / class

    this.statusCode = status;
    this.status = this.statusCode;
    this.statusType = type; // basics

    this.info = type === 1;
    this.ok = type === 2;
    this.redirect = type === 3;
    this.clientError = type === 4;
    this.serverError = type === 5;
    this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

    this.created = status === 201;
    this.accepted = status === 202;
    this.noContent = status === 204;
    this.badRequest = status === 400;
    this.unauthorized = status === 401;
    this.notAcceptable = status === 406;
    this.forbidden = status === 403;
    this.notFound = status === 404;
    this.unprocessableEntity = status === 422;
  };

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

  function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

  function Agent() {
    this._defaults = [];
  }

  ['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert'].forEach(function (fn) {
    // Default setting for all requests from this agent
    Agent.prototype[fn] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._defaults.push({
        fn: fn,
        args: args
      });

      return this;
    };
  });

  Agent.prototype._setDefaults = function (req) {
    this._defaults.forEach(function (def) {
      req[def.fn].apply(req, _toConsumableArray(def.args));
    });
  };

  var agentBase = Agent;

  var client = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  /**
   * Root reference for iframes.
   */
  var root;

  if (typeof window !== 'undefined') {
    // Browser window
    root = window;
  } else if (typeof self === 'undefined') {
    // Other environments
    console.warn('Using browser-only version of superagent in non-browser environment');
    root = void 0;
  } else {
    // Web Worker
    root = self;
  }










  /**
   * Noop.
   */


  function noop() {}
  /**
   * Expose `request`.
   */


  module.exports = function (method, url) {
    // callback
    if (typeof url === 'function') {
      return new exports.Request('GET', method).end(url);
    } // url first


    if (arguments.length === 1) {
      return new exports.Request('GET', method);
    }

    return new exports.Request(method, url);
  };

  exports = module.exports;
  var request = exports;
  exports.Request = Request;
  /**
   * Determine XHR.
   */

  request.getXHR = function () {
    if (root.XMLHttpRequest && (!root.location || root.location.protocol !== 'file:' || !root.ActiveXObject)) {
      return new XMLHttpRequest();
    }

    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch (err) {}

    try {
      return new ActiveXObject('Msxml2.XMLHTTP.6.0');
    } catch (err) {}

    try {
      return new ActiveXObject('Msxml2.XMLHTTP.3.0');
    } catch (err) {}

    try {
      return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (err) {}

    throw new Error('Browser-only version of superagent could not find XHR');
  };
  /**
   * Removes leading and trailing whitespace, added to support IE.
   *
   * @param {String} s
   * @return {String}
   * @api private
   */


  var trim = ''.trim ? function (s) {
    return s.trim();
  } : function (s) {
    return s.replace(/(^\s*|\s*$)/g, '');
  };
  /**
   * Serialize the given `obj`.
   *
   * @param {Object} obj
   * @return {String}
   * @api private
   */

  function serialize(obj) {
    if (!isObject_1(obj)) return obj;
    var pairs = [];

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) pushEncodedKeyValuePair(pairs, key, obj[key]);
    }

    return pairs.join('&');
  }
  /**
   * Helps 'serialize' with serializing arrays.
   * Mutates the pairs array.
   *
   * @param {Array} pairs
   * @param {String} key
   * @param {Mixed} val
   */


  function pushEncodedKeyValuePair(pairs, key, val) {
    if (val !== null) {
      if (Array.isArray(val)) {
        val.forEach(function (v) {
          pushEncodedKeyValuePair(pairs, key, v);
        });
      } else if (isObject_1(val)) {
        for (var subkey in val) {
          if (Object.prototype.hasOwnProperty.call(val, subkey)) pushEncodedKeyValuePair(pairs, "".concat(key, "[").concat(subkey, "]"), val[subkey]);
        }
      } else {
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
      }
    } else if (val === null) {
      pairs.push(encodeURIComponent(key));
    }
  }
  /**
   * Expose serialization method.
   */


  request.serializeObject = serialize;
  /**
   * Parse the given x-www-form-urlencoded `str`.
   *
   * @param {String} str
   * @return {Object}
   * @api private
   */

  function parseString(str) {
    var obj = {};
    var pairs = str.split('&');
    var pair;
    var pos;

    for (var i = 0, len = pairs.length; i < len; ++i) {
      pair = pairs[i];
      pos = pair.indexOf('=');

      if (pos === -1) {
        obj[decodeURIComponent(pair)] = '';
      } else {
        obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
      }
    }

    return obj;
  }
  /**
   * Expose parser.
   */


  request.parseString = parseString;
  /**
   * Default MIME type map.
   *
   *     superagent.types.xml = 'application/xml';
   *
   */

  request.types = {
    html: 'text/html',
    json: 'application/json',
    xml: 'text/xml',
    urlencoded: 'application/x-www-form-urlencoded',
    form: 'application/x-www-form-urlencoded',
    'form-data': 'application/x-www-form-urlencoded'
  };
  /**
   * Default serialization map.
   *
   *     superagent.serialize['application/xml'] = function(obj){
   *       return 'generated xml here';
   *     };
   *
   */

  request.serialize = {
    'application/x-www-form-urlencoded': serialize,
    'application/json': JSON.stringify
  };
  /**
   * Default parsers.
   *
   *     superagent.parse['application/xml'] = function(str){
   *       return { object parsed from str };
   *     };
   *
   */

  request.parse = {
    'application/x-www-form-urlencoded': parseString,
    'application/json': JSON.parse
  };
  /**
   * Parse the given header `str` into
   * an object containing the mapped fields.
   *
   * @param {String} str
   * @return {Object}
   * @api private
   */

  function parseHeader(str) {
    var lines = str.split(/\r?\n/);
    var fields = {};
    var index;
    var line;
    var field;
    var val;

    for (var i = 0, len = lines.length; i < len; ++i) {
      line = lines[i];
      index = line.indexOf(':');

      if (index === -1) {
        // could be empty line, just skip it
        continue;
      }

      field = line.slice(0, index).toLowerCase();
      val = trim(line.slice(index + 1));
      fields[field] = val;
    }

    return fields;
  }
  /**
   * Check if `mime` is json or has +json structured syntax suffix.
   *
   * @param {String} mime
   * @return {Boolean}
   * @api private
   */


  function isJSON(mime) {
    // should match /json or +json
    // but not /json-seq
    return /[/+]json($|[^-\w])/.test(mime);
  }
  /**
   * Initialize a new `Response` with the given `xhr`.
   *
   *  - set flags (.ok, .error, etc)
   *  - parse header
   *
   * Examples:
   *
   *  Aliasing `superagent` as `request` is nice:
   *
   *      request = superagent;
   *
   *  We can use the promise-like API, or pass callbacks:
   *
   *      request.get('/').end(function(res){});
   *      request.get('/', function(res){});
   *
   *  Sending data can be chained:
   *
   *      request
   *        .post('/user')
   *        .send({ name: 'tj' })
   *        .end(function(res){});
   *
   *  Or passed to `.send()`:
   *
   *      request
   *        .post('/user')
   *        .send({ name: 'tj' }, function(res){});
   *
   *  Or passed to `.post()`:
   *
   *      request
   *        .post('/user', { name: 'tj' })
   *        .end(function(res){});
   *
   * Or further reduced to a single call for simple cases:
   *
   *      request
   *        .post('/user', { name: 'tj' }, function(res){});
   *
   * @param {XMLHTTPRequest} xhr
   * @param {Object} options
   * @api private
   */


  function Response(req) {
    this.req = req;
    this.xhr = this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers

    this.text = this.req.method !== 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
    this.statusText = this.req.xhr.statusText;
    var status = this.xhr.status; // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request

    if (status === 1223) {
      status = 204;
    }

    this._setStatusProperties(status);

    this.headers = parseHeader(this.xhr.getAllResponseHeaders());
    this.header = this.headers; // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
    // getResponseHeader still works. so we get content-type even if getting
    // other headers fails.

    this.header['content-type'] = this.xhr.getResponseHeader('content-type');

    this._setHeaderProperties(this.header);

    if (this.text === null && req._responseType) {
      this.body = this.xhr.response;
    } else {
      this.body = this.req.method === 'HEAD' ? null : this._parseBody(this.text ? this.text : this.xhr.response);
    }
  } // eslint-disable-next-line new-cap


  responseBase(Response.prototype);
  /**
   * Parse the given body `str`.
   *
   * Used for auto-parsing of bodies. Parsers
   * are defined on the `superagent.parse` object.
   *
   * @param {String} str
   * @return {Mixed}
   * @api private
   */

  Response.prototype._parseBody = function (str) {
    var parse = request.parse[this.type];

    if (this.req._parser) {
      return this.req._parser(this, str);
    }

    if (!parse && isJSON(this.type)) {
      parse = request.parse['application/json'];
    }

    return parse && str && (str.length > 0 || str instanceof Object) ? parse(str) : null;
  };
  /**
   * Return an `Error` representative of this response.
   *
   * @return {Error}
   * @api public
   */


  Response.prototype.toError = function () {
    var req = this.req;
    var method = req.method;
    var url = req.url;
    var msg = "cannot ".concat(method, " ").concat(url, " (").concat(this.status, ")");
    var err = new Error(msg);
    err.status = this.status;
    err.method = method;
    err.url = url;
    return err;
  };
  /**
   * Expose `Response`.
   */


  request.Response = Response;
  /**
   * Initialize a new `Request` with the given `method` and `url`.
   *
   * @param {String} method
   * @param {String} url
   * @api public
   */

  function Request(method, url) {
    var self = this;
    this._query = this._query || [];
    this.method = method;
    this.url = url;
    this.header = {}; // preserves header name case

    this._header = {}; // coerces header names to lowercase

    this.on('end', function () {
      var err = null;
      var res = null;

      try {
        res = new Response(self);
      } catch (err2) {
        err = new Error('Parser is unable to parse the response');
        err.parse = true;
        err.original = err2; // issue #675: return the raw response if the response parsing fails

        if (self.xhr) {
          // ie9 doesn't have 'response' property
          err.rawResponse = typeof self.xhr.responseType === 'undefined' ? self.xhr.responseText : self.xhr.response; // issue #876: return the http status code if the response parsing fails

          err.status = self.xhr.status ? self.xhr.status : null;
          err.statusCode = err.status; // backwards-compat only
        } else {
          err.rawResponse = null;
          err.status = null;
        }

        return self.callback(err);
      }

      self.emit('response', res);
      var new_err;

      try {
        if (!self._isResponseOK(res)) {
          new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        }
      } catch (err2) {
        new_err = err2; // ok() callback can throw
      } // #1000 don't catch errors from the callback to avoid double calling it


      if (new_err) {
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
        self.callback(new_err, res);
      } else {
        self.callback(null, res);
      }
    });
  }
  /**
   * Mixin `Emitter` and `RequestBase`.
   */
  // eslint-disable-next-line new-cap


  componentEmitter(Request.prototype); // eslint-disable-next-line new-cap

  requestBase(Request.prototype);
  /**
   * Set Content-Type to `type`, mapping values from `request.types`.
   *
   * Examples:
   *
   *      superagent.types.xml = 'application/xml';
   *
   *      request.post('/')
   *        .type('xml')
   *        .send(xmlstring)
   *        .end(callback);
   *
   *      request.post('/')
   *        .type('application/xml')
   *        .send(xmlstring)
   *        .end(callback);
   *
   * @param {String} type
   * @return {Request} for chaining
   * @api public
   */

  Request.prototype.type = function (type) {
    this.set('Content-Type', request.types[type] || type);
    return this;
  };
  /**
   * Set Accept to `type`, mapping values from `request.types`.
   *
   * Examples:
   *
   *      superagent.types.json = 'application/json';
   *
   *      request.get('/agent')
   *        .accept('json')
   *        .end(callback);
   *
   *      request.get('/agent')
   *        .accept('application/json')
   *        .end(callback);
   *
   * @param {String} accept
   * @return {Request} for chaining
   * @api public
   */


  Request.prototype.accept = function (type) {
    this.set('Accept', request.types[type] || type);
    return this;
  };
  /**
   * Set Authorization field value with `user` and `pass`.
   *
   * @param {String} user
   * @param {String} [pass] optional in case of using 'bearer' as type
   * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
   * @return {Request} for chaining
   * @api public
   */


  Request.prototype.auth = function (user, pass, options) {
    if (arguments.length === 1) pass = '';

    if (_typeof(pass) === 'object' && pass !== null) {
      // pass is optional and can be replaced with options
      options = pass;
      pass = '';
    }

    if (!options) {
      options = {
        type: typeof btoa === 'function' ? 'basic' : 'auto'
      };
    }

    var encoder = function encoder(string) {
      if (typeof btoa === 'function') {
        return btoa(string);
      }

      throw new Error('Cannot use basic auth, btoa is not a function');
    };

    return this._auth(user, pass, options, encoder);
  };
  /**
   * Add query-string `val`.
   *
   * Examples:
   *
   *   request.get('/shoes')
   *     .query('size=10')
   *     .query({ color: 'blue' })
   *
   * @param {Object|String} val
   * @return {Request} for chaining
   * @api public
   */


  Request.prototype.query = function (val) {
    if (typeof val !== 'string') val = serialize(val);
    if (val) this._query.push(val);
    return this;
  };
  /**
   * Queue the given `file` as an attachment to the specified `field`,
   * with optional `options` (or filename).
   *
   * ``` js
   * request.post('/upload')
   *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
   *   .end(callback);
   * ```
   *
   * @param {String} field
   * @param {Blob|File} file
   * @param {String|Object} options
   * @return {Request} for chaining
   * @api public
   */


  Request.prototype.attach = function (field, file, options) {
    if (file) {
      if (this._data) {
        throw new Error("superagent can't mix .send() and .attach()");
      }

      this._getFormData().append(field, file, options || file.name);
    }

    return this;
  };

  Request.prototype._getFormData = function () {
    if (!this._formData) {
      this._formData = new root.FormData();
    }

    return this._formData;
  };
  /**
   * Invoke the callback with `err` and `res`
   * and handle arity check.
   *
   * @param {Error} err
   * @param {Response} res
   * @api private
   */


  Request.prototype.callback = function (err, res) {
    if (this._shouldRetry(err, res)) {
      return this._retry();
    }

    var fn = this._callback;
    this.clearTimeout();

    if (err) {
      if (this._maxRetries) err.retries = this._retries - 1;
      this.emit('error', err);
    }

    fn(err, res);
  };
  /**
   * Invoke callback with x-domain error.
   *
   * @api private
   */


  Request.prototype.crossDomainError = function () {
    var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
    err.crossDomain = true;
    err.status = this.status;
    err.method = this.method;
    err.url = this.url;
    this.callback(err);
  }; // This only warns, because the request is still likely to work


  Request.prototype.agent = function () {
    console.warn('This is not supported in browser version of superagent');
    return this;
  };

  Request.prototype.buffer = Request.prototype.ca;
  Request.prototype.ca = Request.prototype.agent; // This throws, because it can't send/receive data as expected

  Request.prototype.write = function () {
    throw new Error('Streaming is not supported in browser version of superagent');
  };

  Request.prototype.pipe = Request.prototype.write;
  /**
   * Check if `obj` is a host object,
   * we don't want to serialize these :)
   *
   * @param {Object} obj host object
   * @return {Boolean} is a host object
   * @api private
   */

  Request.prototype._isHost = function (obj) {
    // Native objects stringify to [object File], [object Blob], [object FormData], etc.
    return obj && _typeof(obj) === 'object' && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
  };
  /**
   * Initiate request, invoking callback `fn(res)`
   * with an instanceof `Response`.
   *
   * @param {Function} fn
   * @return {Request} for chaining
   * @api public
   */


  Request.prototype.end = function (fn) {
    if (this._endCalled) {
      console.warn('Warning: .end() was called twice. This is not supported in superagent');
    }

    this._endCalled = true; // store callback

    this._callback = fn || noop; // querystring

    this._finalizeQueryString();

    this._end();
  };

  Request.prototype._setUploadTimeout = function () {
    var self = this; // upload timeout it's wokrs only if deadline timeout is off

    if (this._uploadTimeout && !this._uploadTimeoutTimer) {
      this._uploadTimeoutTimer = setTimeout(function () {
        self._timeoutError('Upload timeout of ', self._uploadTimeout, 'ETIMEDOUT');
      }, this._uploadTimeout);
    }
  }; // eslint-disable-next-line complexity


  Request.prototype._end = function () {
    if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
    var self = this;
    this.xhr = request.getXHR();
    var xhr = this.xhr;
    var data = this._formData || this._data;

    this._setTimeouts(); // state change


    xhr.onreadystatechange = function () {
      var readyState = xhr.readyState;

      if (readyState >= 2 && self._responseTimeoutTimer) {
        clearTimeout(self._responseTimeoutTimer);
      }

      if (readyState !== 4) {
        return;
      } // In IE9, reads to any property (e.g. status) off of an aborted XHR will
      // result in the error "Could not complete the operation due to error c00c023f"


      var status;

      try {
        status = xhr.status;
      } catch (err) {
        status = 0;
      }

      if (!status) {
        if (self.timedout || self._aborted) return;
        return self.crossDomainError();
      }

      self.emit('end');
    }; // progress


    var handleProgress = function handleProgress(direction, e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;

        if (e.percent === 100) {
          clearTimeout(self._uploadTimeoutTimer);
        }
      }

      e.direction = direction;
      self.emit('progress', e);
    };

    if (this.hasListeners('progress')) {
      try {
        xhr.addEventListener('progress', handleProgress.bind(null, 'download'));

        if (xhr.upload) {
          xhr.upload.addEventListener('progress', handleProgress.bind(null, 'upload'));
        }
      } catch (err) {// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
        // Reported here:
        // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
      }
    }

    if (xhr.upload) {
      this._setUploadTimeout();
    } // initiate request


    try {
      if (this.username && this.password) {
        xhr.open(this.method, this.url, true, this.username, this.password);
      } else {
        xhr.open(this.method, this.url, true);
      }
    } catch (err) {
      // see #1149
      return this.callback(err);
    } // CORS


    if (this._withCredentials) xhr.withCredentials = true; // body

    if (!this._formData && this.method !== 'GET' && this.method !== 'HEAD' && typeof data !== 'string' && !this._isHost(data)) {
      // serialize stuff
      var contentType = this._header['content-type'];

      var _serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];

      if (!_serialize && isJSON(contentType)) {
        _serialize = request.serialize['application/json'];
      }

      if (_serialize) data = _serialize(data);
    } // set header fields


    for (var field in this.header) {
      if (this.header[field] === null) continue;
      if (Object.prototype.hasOwnProperty.call(this.header, field)) xhr.setRequestHeader(field, this.header[field]);
    }

    if (this._responseType) {
      xhr.responseType = this._responseType;
    } // send stuff


    this.emit('request', this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
    // We need null here if data is undefined

    xhr.send(typeof data === 'undefined' ? null : data);
  };

  request.agent = function () {
    return new agentBase();
  };

  ['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(function (method) {
    agentBase.prototype[method.toLowerCase()] = function (url, fn) {
      var req = new request.Request(method, url);

      this._setDefaults(req);

      if (fn) {
        req.end(fn);
      }

      return req;
    };
  });
  agentBase.prototype.del = agentBase.prototype.delete;
  /**
   * GET `url` with optional callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed|Function} [data] or fn
   * @param {Function} [fn]
   * @return {Request}
   * @api public
   */

  request.get = function (url, data, fn) {
    var req = request('GET', url);

    if (typeof data === 'function') {
      fn = data;
      data = null;
    }

    if (data) req.query(data);
    if (fn) req.end(fn);
    return req;
  };
  /**
   * HEAD `url` with optional callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed|Function} [data] or fn
   * @param {Function} [fn]
   * @return {Request}
   * @api public
   */


  request.head = function (url, data, fn) {
    var req = request('HEAD', url);

    if (typeof data === 'function') {
      fn = data;
      data = null;
    }

    if (data) req.query(data);
    if (fn) req.end(fn);
    return req;
  };
  /**
   * OPTIONS query to `url` with optional callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed|Function} [data] or fn
   * @param {Function} [fn]
   * @return {Request}
   * @api public
   */


  request.options = function (url, data, fn) {
    var req = request('OPTIONS', url);

    if (typeof data === 'function') {
      fn = data;
      data = null;
    }

    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
  };
  /**
   * DELETE `url` with optional `data` and callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed} [data]
   * @param {Function} [fn]
   * @return {Request}
   * @api public
   */


  function del(url, data, fn) {
    var req = request('DELETE', url);

    if (typeof data === 'function') {
      fn = data;
      data = null;
    }

    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
  }

  request.del = del;
  request.delete = del;
  /**
   * PATCH `url` with optional `data` and callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed} [data]
   * @param {Function} [fn]
   * @return {Request}
   * @api public
   */

  request.patch = function (url, data, fn) {
    var req = request('PATCH', url);

    if (typeof data === 'function') {
      fn = data;
      data = null;
    }

    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
  };
  /**
   * POST `url` with optional `data` and callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed} [data]
   * @param {Function} [fn]
   * @return {Request}
   * @api public
   */


  request.post = function (url, data, fn) {
    var req = request('POST', url);

    if (typeof data === 'function') {
      fn = data;
      data = null;
    }

    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
  };
  /**
   * PUT `url` with optional `data` and callback `fn(res)`.
   *
   * @param {String} url
   * @param {Mixed|Function} [data] or fn
   * @param {Function} [fn]
   * @return {Request}
   * @api public
   */


  request.put = function (url, data, fn) {
    var req = request('PUT', url);

    if (typeof data === 'function') {
      fn = data;
      data = null;
    }

    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
  };
  });
  var client_1 = client.Request;

  // Copyright Joyent, Inc. and other Node contributors.

  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var decode = function(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr, vstr, k, v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  };

  // Copyright Joyent, Inc. and other Node contributors.

  var stringifyPrimitive = function(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  };

  var encode = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return Object.keys(obj).map(function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k].map(function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);

    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
           encodeURIComponent(stringifyPrimitive(obj));
  };

  var querystring = createCommonjsModule(function (module, exports) {

  exports.decode = exports.parse = decode;
  exports.encode = exports.stringify = encode;
  });
  var querystring_1 = querystring.decode;
  var querystring_2 = querystring.parse;
  var querystring_3 = querystring.encode;
  var querystring_4 = querystring.stringify;

  /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

  /* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */

  /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
  var StorageFactory =
  /*#__PURE__*/
  function () {
    function StorageFactory(instance) {
      _classCallCheck(this, StorageFactory);

      this.storage = instance;
    }

    _createClass(StorageFactory, [{
      key: "set",
      value: function set(key, value) {
        return this._set(key, value);
      }
    }, {
      key: "_set",
      value: function _set() {
        throw new Error('StorageFactory._set undefined');
      }
    }, {
      key: "get",
      value: function get(key) {
        return this._get(key);
      }
    }, {
      key: "_get",
      value: function _get() {
        throw new Error('StorageFactory._get undefined');
      }
    }, {
      key: "delete",
      value: function _delete(key) {
        return this._delete(key);
      }
    }, {
      key: "_delete",
      value: function _delete() {
        throw new Error('StorageFactory._delete undefined');
      }
    }]);

    return StorageFactory;
  }();

  var LocalStorageFactory =
  /*#__PURE__*/
  function (_StorageFactory) {
    _inherits(LocalStorageFactory, _StorageFactory);

    function LocalStorageFactory() {
      var _this;

      _classCallCheck(this, LocalStorageFactory);

      if (typeof localStorage === 'undefined' || localStorage === null) {
        var _require = require('node-localstorage'),
            LocalStorage = _require.LocalStorage;

        _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalStorageFactory).call(this, new LocalStorage('./localStorage')));
      } else {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalStorageFactory).call(this, window.localStorage));
      }

      return _possibleConstructorReturn(_this);
    }

    _createClass(LocalStorageFactory, [{
      key: "_set",
      value: function _set(key, value) {
        return this.storage.setItem(key, value);
      }
    }, {
      key: "_get",
      value: function _get(key) {
        return this.storage.getItem(key);
      }
    }, {
      key: "_delete",
      value: function _delete(key) {
        return this.storage.removeItem(key);
      }
    }]);

    return LocalStorageFactory;
  }(StorageFactory);

  /**
  * The Fault model module.
  * @module models/Fault
  * @version 17.8
  */

  var Fault =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Fault</code>.
    * Document representing a fault.
    * @alias module:models/Fault
    * @class
    */
    function Fault() {
      _classCallCheck(this, Fault);

      /**
      * The message of the fault.
      * @member {String} message
      */
      this.message = undefined;
      /**
      * The type of the fault.
      * @member {String} type
      */

      this.type = undefined;
      /**
      * These are optional arguments returned with fault
      * @member {Object} arguments
      */

      this.arguments = undefined;
    }
    /**
    * Constructs a <code>Fault</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Fault} obj Optional instance to populate.
    * @return {module:models/Fault} The populated <code>Fault</code> instance.
    */


    _createClass(Fault, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Fault();

          if (data.hasOwnProperty('message')) {
            obj['message'] = ApiClient.convertToType(data['message'], 'String');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }

          if (data.hasOwnProperty('arguments')) {
            obj['arguments'] = ApiClient.convertToType(data['arguments'], {
              String: Object
            });
          }
        }

        return obj;
      }
    }]);

    return Fault;
  }();

  /**
   * @module ApiClient
   * @version 17.8
   */

  var defaultConfig = {
    basePath: 'https://localhost/s/siteId/dw/shop/v17_8',
    cache: true,
    defaultHeaders: {},
    storage: new LocalStorageFactory(),
    enableCookies: false,
    overrideHttpPut: true,
    timeout: 60000
  };

  var transformToken = function transformToken(accessCredentials, token) {
    // input {"access_token":"XXX-YYYY-YYYY-YYYY-ZZZZYYYYZZZZ","expires_in":111,"token_type":"Bearer"}
    // output {"client_id": accessCredentials.clientId, "access_token":"XXX-YYYY-YYYY-YYYY-ZZZZYYYYZZZZ","expires":now + 111,"token_type":"Bearer"}
    var now = Date.now() / 1000;
    return {
      client_id: accessCredentials.clientId,
      access_token: token.access_token,
      created: now,
      expires: now + token.expires_in,
      token_type: token.token_type
    };
  };
  /**
   * Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
   * application to use this class directly - the *Api and model classes provide the public API for the service. The
   * contents of this file should be regarded as internal but are documented for completeness.
   * @alias module:ApiClient
   * @class
   */


  var ApiClient =
  /*#__PURE__*/
  function () {
    function ApiClient() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig;

      _classCallCheck(this, ApiClient);

      var _Object$assign = Object.assign(defaultConfig, config),
          basePath = _Object$assign.basePath,
          defaultHeaders = _Object$assign.defaultHeaders,
          timeout = _Object$assign.timeout,
          cache = _Object$assign.cache,
          enableCookies = _Object$assign.enableCookies,
          clientUsername = _Object$assign.clientUsername,
          clientPassword = _Object$assign.clientPassword,
          clientId = _Object$assign.clientId,
          clientSecret = _Object$assign.clientSecret,
          oauth2AccessToken = _Object$assign.oauth2AccessToken,
          storage = _Object$assign.storage,
          overrideHttpPut = _Object$assign.overrideHttpPut; // verify the required parameter 'basepath' is set


      if (basePath === undefined || basePath === null || basePath === '') {
        throw new Error('Missing the required parameter \'basePath\' when calling constructing ApiClient');
      }
      /**
       * The base URL against which to resolve every API call's (relative) path.
       * @type {String}
       * @default https://localhost/s/siteId/dw/shop/v17_8
       */


      this.basePath = basePath.replace(/\/+$/, '');
      this.authBasePath = this.basePath.match('^(https?://[^:/?#]*(?::[0-9]+)?).*$')[1];
      /**
       * The storage mechanism used for oAuth credentials (in browser user window.localstorage but also falls back to node-localstorage and supports alternative InMemoryStorage temporary)
       * @type {StorageFactory}
       * @default LocalStorageFactory
       */

      this.storage = storage;
      /**
       * The authentication methods to be included for all API calls.
       * @type {Array.<String>}
       */

      this.authentications = {
        client_id: {
          type: 'apiKey',
          "in": 'header',
          name: 'x-dw-client-id'
        },
        customers_auth: {
          type: 'basic'
        },
        oauth2_application: {
          type: 'oauth2'
        }
      };

      if (oauth2AccessToken) {
        this.authentications.oauth2_application.accessToken = oauth2AccessToken;
      }

      if (clientId && clientSecret && clientUsername && clientPassword) {
        this.authentications.oauth2_application.accessCredentials = {
          clientId: clientId,
          clientSecret: clientSecret,
          clientUsername: clientUsername,
          clientPassword: clientPassword,
          storage: storage
        };
      }

      if (clientUsername && clientPassword) {
        var customers_auth = this.authentications.customers_auth;
        customers_auth.username = clientUsername;
        customers_auth.password = clientPassword;
      }
      /**
       * If set to true, endpoints that normally use HTTP `PUT` will
       * be sent using `POST` with an aditional header (x-dw-http-method-override: `PUT`).
       * Please refer to the following Salesforce documentation {@link https://documentation.demandware.com/DOC1/topic/com.demandware.dochelp/OCAPI/18.8/usage/HttpMethods.html}
       * for more information.
       * @type {Boolean}
       * @default true
       */


      this.overrideHttpPut = overrideHttpPut;
      /**
       * The default HTTP headers to be included for all API calls.
       * @type {Array.<String>}
       * @default {}
       */

      this.defaultHeaders = defaultHeaders;
      /**
       * The default HTTP timeout for all API calls.
       * @type {Number}
       * @default 60000
       */

      this.timeout = timeout;
      /**
       * If set to false an additional timestamp parameter is added to all API GET calls to
       * prevent browser caching
       * @type {Boolean}
       * @default true
       */

      this.cache = cache;
      /**
       * If set to true, the client will save the cookies from each server
       * response, and return them in the next request.
       * @default false
       */

      this.enableCookies = enableCookies;
      /*
       * Used to save and return cookies in a node.js (non-browser) setting,
       * if this.enableCookies is set to true.
       */

      if (typeof window === 'undefined') {
        this.agent = new client.agent();
      }
    }
    /**
     * Returns a string representation for an actual parameter.
     * @param param The actual parameter.
     * @returns {String} The string representation of <code>param</code>.
     */


    _createClass(ApiClient, [{
      key: "paramToString",
      value: function paramToString(param) {
        if (param === undefined || param === null) {
          return '';
        }

        if (param instanceof Date) {
          return param.toJSON();
        }

        return param.toString();
      }
      /**
       * Returns a encoded string representation for an actual parameter.
       * @param param The actual parameter.
       * @returns {String} The string representation of <code>param</code>.
       */

    }, {
      key: "paramToEncodedString",
      value: function paramToEncodedString(param) {
        var value = '';

        if (param === undefined || param === null) {
          return value;
        }

        if (param instanceof Date) {
          value = encodeURIComponent(param.toJSON());
        } else if (param instanceof Array) {
          value = param.map(function (value) {
            return encodeURIComponent(value);
          }).join(',');
        } else {
          value = encodeURIComponent(param.toString());
        }

        return value;
      }
      /**
       * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
       * NOTE: query parameters are not handled here.
       * @param {String} path The path to append to the base URL.
       * @param {Object} pathParams The parameter values to append.
       * @param {String} basePath The base URL path to prepend with.
       * @default this.basePath
       * @returns {String} The encoded path with parameter values substituted.
       */

    }, {
      key: "buildUrl",
      value: function buildUrl(path) {
        var _this = this;

        var pathParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var basePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.basePath;

        if (!path.match(/^\//)) {
          path = "/".concat(path);
        }

        var url = basePath + path;
        url = url.replace(/\{([\w-]+)\}/g, function (fullMatch, key) {
          var value;

          if (pathParams.hasOwnProperty(key)) {
            value = _this.paramToEncodedString(pathParams[key]);
          } else {
            value = encodeURIComponent(fullMatch);
          }

          return value;
        });
        return url;
      }
      /**
       * Checks whether the given content type represents JSON.<br>
       * JSON content type examples:<br>
       * <ul>
       * <li>application/json</li>
       * <li>application/json; charset=UTF8</li>
       * <li>APPLICATION/JSON</li>
       * </ul>
       * @param {String} contentType The MIME content type to check.
       * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
       */

    }, {
      key: "isJsonMime",
      value: function isJsonMime(contentType) {
        return Boolean(contentType !== null && contentType.match(/^application\/json(;.*)?$/i));
      }
      /**
       * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
       * @param {Array.<String>} contentTypes
       * @returns {String} The chosen content type, preferring JSON.
       */

    }, {
      key: "jsonPreferredMime",
      value: function jsonPreferredMime(contentTypes) {
        for (var i = 0; i < contentTypes.length; i++) {
          if (this.isJsonMime(contentTypes[i])) {
            return contentTypes[i];
          }
        }

        return contentTypes[0];
      }
      /**
       * Checks whether the given parameter value represents file-like content.
       * @param param The parameter to check.
       * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
       */

    }, {
      key: "isFileParam",
      value: function isFileParam(param) {
        // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
        if (typeof require === 'function') {
          var fs;

          try {
            fs = require('fs');
          } catch (err) {}

          if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
            return true;
          }
        } // Buffer in Node.js


        if (typeof Buffer === 'function' && param instanceof Buffer) {
          // eslint-disable-line no-undef
          return true;
        } // Blob in browser


        if (typeof Blob === 'function' && param instanceof Blob) {
          return true;
        } // File in browser (it seems File object is also instance of Blob, but keep this for safe)


        if (typeof File === 'function' && param instanceof File) {
          return true;
        }

        return false;
      }
      /**
       * Normalizes parameter values:
       * <ul>
       * <li>remove nils</li>
       * <li>keep files and arrays</li>
       * <li>format to string with `paramToString` for other cases</li>
       * </ul>
       * @param {Object.<String, Object>} params The parameters as object properties.
       * @returns {Object.<String, Object>} normalized parameters.
       */

    }, {
      key: "normalizeParams",
      value: function normalizeParams(params) {
        var newParams = {};

        for (var key in params) {
          if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
            var value = params[key];

            if (this.isFileParam(value) || Array.isArray(value)) {
              newParams[key] = value;
            } else {
              newParams[key] = this.paramToString(value);
            }
          }
        }

        return newParams;
      }
      /**
       * Builds a string representation of an array-type actual parameter, according to the given collection format.
       * @param {Array} param An array parameter.
       * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
       * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
       * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
       */

    }, {
      key: "buildCollectionParam",
      value: function buildCollectionParam(param, collectionFormat) {
        if (param === null || param === undefined) {
          return null;
        }

        switch (collectionFormat) {
          case 'csv':
            return param.map(this.paramToString).join(',');

          case 'ssv':
            return param.map(this.paramToString).join(' ');

          case 'tsv':
            return param.map(this.paramToString).join('\t');

          case 'pipes':
            return param.map(this.paramToString).join('|');

          case 'multi':
            // return the array directly as SuperAgent will handle it as expected
            return param.map(this.paramToString);

          default:
            throw new Error("Unknown collection format: ".concat(collectionFormat));
        }
      }
      /**
       * Applies authentication headers to the request.
       * @param {Object} request The request object created by a <code>superagent()</code> call.
       * @param {Array.<String>} authNames An array of authentication method names.
       */

    }, {
      key: "applyAuthToRequest",
      value: function applyAuthToRequest(request, authNames) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          var authorizations = [];
          authNames.forEach(function (authName) {
            var auth = _this2.authentications[authName];

            switch (auth.type) {
              case 'basic':
                {
                  if (auth.username || auth.password) {
                    request.auth(auth.username || '', auth.password || '');
                    authorizations.push(Promise.resolve(auth.type));
                  }

                  break;
                }

              case 'apiKey':
                {
                  if (auth.apiKey) {
                    var data = {};

                    if (auth.apiKeyPrefix) {
                      data[auth.name] = "".concat(auth.apiKeyPrefix, " ").concat(auth.apiKey);
                    } else {
                      data[auth.name] = auth.apiKey;
                    }

                    if (auth["in"] === 'header') {
                      request.set(data);
                    } else {
                      request.query(data);
                    }

                    authorizations.push(Promise.resolve(auth.type));
                  }

                  break;
                }

              case 'oauth2':
                {
                  authorizations.push(_this2.setToken(request, auth.accessToken, auth.accessCredentials));
                  break;
                }

              default:
                {
                  throw new Error("Unknown authentication type: ".concat(auth.type));
                }
            }
          });
          return Promise.all(authorizations).then(resolve)["catch"](reject);
        });
      }
      /**
       * Deserializes an HTTP response body into a value of the specified type.
       * @param {Object} response A SuperAgent response object.
       * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
       * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
       * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
       * all properties on <code>data<code> will be converted to this type.
       * @returns A value of the specified type.
       */

    }, {
      key: "deserialize",
      value: function deserialize(response, returnType) {
        if (response === null || returnType === null || response.status === 204) {
          return null;
        } // Rely on SuperAgent for parsing response body.
        // See http://visionmedia.github.io/superagent/#parsing-response-bodies


        var data = response.body;

        if (data === null || _typeof(data) === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length) {
          // SuperAgent does not always produce a body; use the unparsed response as a fallback
          data = response.text;
        }

        return ApiClient.convertToType(data, returnType);
      }
    }, {
      key: "authenticate",
      value: function authenticate(accessCredentials) {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          var authURL = _this3.buildUrl('/dw/oauth2/access_token', null, _this3.authBasePath);

          var request = client('POST', authURL); // set request timeout

          request.timeout(_this3.timeout); // set header parameters

          var authorization = Buffer // eslint-disable-line no-undef
          .from("".concat(accessCredentials.clientUsername, ":").concat(accessCredentials.clientPassword, ":").concat(accessCredentials.clientSecret, "\n")).toString('base64');
          request.set({
            'Content-Type': 'application/x-www-form-urlencoded'
          }).set({
            Authorization: "Basic ".concat(authorization)
          });
          var data = querystring.stringify({
            client_id: accessCredentials.clientId,
            grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
          });
          var returnType = 'String';
          request.responseType(returnType);
          request.send(data);
          request.end(function (error, response) {
            if (error) {
              // Looks like there was an fault returned from the API
              var hasErrorMessage = error.response && error.response.text;

              if (hasErrorMessage) {
                var errorObj = JSON.parse(error.response.text);

                if (errorObj.fault) {
                  errorObj = Fault.constructFromObject(errorObj.fault);
                }

                reject(errorObj);
              } // Most likely a network error has happened here so include entire error.


              reject(error);
            } else {
              try {
                var _data = JSON.parse(_this3.deserialize(response, returnType));

                if (_this3.enableCookies && typeof window === 'undefined') {
                  _this3.agent._saveCookies(response);
                }

                resolve({
                  data: _data,
                  response: response
                });
              } catch (err) {
                reject(err);
              }
            }
          });
        });
      }
    }, {
      key: "setToken",
      value: function setToken(request, accessToken, accessCredentials) {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          // eslint-disable-line consistent-return
          if (accessToken) {
            request.set({
              Authorization: "Bearer ".concat(accessToken)
            });
            resolve(accessToken);
          } else if (accessCredentials) {
            var storedCredentials = JSON.parse(_this4.storage.get('sfccOAuth'));

            if (!storedCredentials || !storedCredentials.access_token || storedCredentials.client_id !== accessCredentials.clientId || Math.floor(Date.now() / 1000) >= storedCredentials.expires) {
              return _this4.authenticate(accessCredentials).then(function (oAuthToken) {
                storedCredentials = transformToken(accessCredentials, oAuthToken.data);

                _this4.storage.set('sfccOAuth', JSON.stringify(storedCredentials));

                request.set({
                  Authorization: "".concat(storedCredentials.token_type, " ").concat(storedCredentials.access_token)
                });
                resolve(storedCredentials.access_token);
              })["catch"](function (error) {
                return reject(error);
              });
            } else {
              request.set({
                Authorization: "".concat(storedCredentials.token_type, " ").concat(storedCredentials.access_token)
              });
              resolve(storedCredentials.access_token);
            }
          }

          resolve(null);
        });
      }
      /**
       * Invokes the REST service using the supplied settings and parameters.
       * @param {String} path The base URL to invoke.
       * @param {String} httpMethod The HTTP method to use.
       * @param {Object.<String, String>} pathParams A map of path parameters and their values.
       * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
       * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
       * @param {Object.<String, Object>} formParams A map of form parameters and their values.
       * @param {Object} bodyParam The value to pass as the request body.
       * @param {Array.<String>} authNames An array of authentication type names.
       * @param {Array.<String>} contentTypes An array of request MIME types.
       * @param {Array.<String>} accepts An array of acceptable response MIME types.
       * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
       * constructor for a complex type.
       * @returns {Promise} A {@link https://www.promisejs.org/|Promise} object.
       */

    }, {
      key: "callApi",
      value: function callApi(path, httpMethod, pathParams, queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts, returnType) {
        var _this5 = this;

        // emulate PUT method because they are not allowed on staging and production environments
        if (this.overrideHttpPut && httpMethod.toUpperCase() === 'PUT') {
          httpMethod = 'POST';
          headerParams = Object.assign(headerParams || {}, {
            'x-dw-http-method-override': 'PUT'
          });
        }

        var url = this.buildUrl(path, pathParams);
        var request = client(httpMethod, url); // apply authentications
        // this.applyAuthToRequest(request, authNames)

        return this.applyAuthToRequest(request, authNames).then(function () {
          // set query parameters
          if (httpMethod.toUpperCase() === 'GET' && _this5.cache === false) {
            queryParams._ = new Date().getTime();
          }

          request.query(_this5.normalizeParams(queryParams)); // set header parameters

          request.set(_this5.defaultHeaders).set(_this5.normalizeParams(headerParams)); // set request timeout

          request.timeout(_this5.timeout);

          var contentType = _this5.jsonPreferredMime(contentTypes);

          if (contentType) {
            // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
            if (contentType !== 'multipart/form-data') {
              request.type(contentType);
            }
          } else if (!request.header['Content-Type']) {
            request.type('application/json');
          }

          if (contentType === 'application/x-www-form-urlencoded') {
            request.send(querystring.stringify(_this5.normalizeParams(formParams)));
          } else if (contentType === 'multipart/form-data') {
            var _formParams = _this5.normalizeParams(formParams);

            for (var key in _formParams) {
              if (_formParams.hasOwnProperty(key)) {
                if (_this5.isFileParam(_formParams[key])) {
                  // file field
                  request.attach(key, _formParams[key]);
                } else {
                  request.field(key, _formParams[key]);
                }
              }
            }
          } else if (bodyParam) {
            request.send(bodyParam);
          }

          var accept = _this5.jsonPreferredMime(accepts);

          if (accept) {
            request.accept(accept);
          }

          if (returnType === 'Blob') {
            request.responseType('blob');
          } else if (returnType === 'String') {
            request.responseType('string');
          } // Attach previously saved cookies, if enabled


          if (_this5.enableCookies) {
            if (typeof window === 'undefined') {
              _this5.agent._attachCookies(request);
            } else {
              request.withCredentials();
            }
          }

          return new Promise(function (resolve, reject) {
            request.end(function (error, response) {
              if (error) {
                // Looks like there was an fault returned from the API
                var hasErrorMessage = error.response && error.response.text;

                if (hasErrorMessage) {
                  var fault = Fault.constructFromObject(JSON.parse(error.response.text).fault);
                  reject(fault);
                } // Most likely a network error has happened here so include entire error.


                reject(error);
              } else {
                try {
                  var data = _this5.deserialize(response, returnType);

                  if (_this5.enableCookies && typeof window === 'undefined') {
                    _this5.agent._saveCookies(response);
                  }

                  resolve({
                    data: data,
                    response: response
                  });
                } catch (err) {
                  reject(err);
                }
              }
            });
          });
        });
      }
      /**
       * Parses an ISO-8601 string representation of a date value.
       * @param {String} str The date value as a string.
       * @returns {Date} The parsed date object.
       */

    }], [{
      key: "parseDate",
      value: function parseDate(str) {
        return new Date(str.replace(/T/i, ' '));
      }
      /**
       * Converts a value to the specified type.
       * @param {(String|Object)} data The data to convert, as a string or object.
       * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
       * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
       * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
       * all properties on <code>data<code> will be converted to this type.
       * @returns An instance of the specified type or null or undefined if data is null or undefined.
       */

    }, {
      key: "convertToType",
      value: function convertToType(data, type) {
        if (data === null || data === undefined) {
          return data;
        }

        switch (type) {
          case 'Boolean':
            return Boolean(data);

          case 'Integer':
            return parseInt(data, 10);

          case 'Number':
            return parseFloat(data);

          case 'String':
            return String(data);

          case 'Date':
            return ApiClient.parseDate(String(data));

          case 'Blob':
            return data;

          default:
            if (type === Object) {
              // generic object, return directly
              return data;
            } else if (typeof type === 'function') {
              // for model type like: User
              var model = type.constructFromObject(data); // add support for custom properties
              // NOTE: We'll have to expand on this further as this only suports
              // simple typed values

              for (var k in data) {
                if (data.hasOwnProperty(k) && /^c_/.test(k)) {
                  model[k] = data[k];
                }
              }

              return model;
            } else if (Array.isArray(type)) {
              // for array type like: ['String']
              var itemType = type[0];
              return data.map(function (item) {
                return ApiClient.convertToType(item, itemType);
              });
            } else if (_typeof(type) === 'object') {
              // for plain object type like: {'String': 'Integer'}
              var keyType;
              var valueType;

              for (var _k in type) {
                if (type.hasOwnProperty(_k)) {
                  keyType = _k;
                  valueType = type[_k];
                  break;
                }
              }

              var result = {};

              for (var _k2 in data) {
                if (data.hasOwnProperty(_k2)) {
                  var key = ApiClient.convertToType(_k2, keyType);
                  var value = ApiClient.convertToType(data[_k2], valueType);
                  result[key] = value;
                }
              }

              return result;
            } else {
              // for unknown type, return the data directly
              return data;
            }

        }
      }
      /**
       * Constructs a new map or array model from REST data.
       * @param data {Object|Array} The REST data.
       * @param obj {Object|Array} The target object or array.
       */

    }, {
      key: "constructFromObject",
      value: function constructFromObject(data, obj, itemType) {
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            if (data.hasOwnProperty(i)) {
              obj[i] = ApiClient.convertToType(data[i], itemType);
            }
          }
        } else {
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              obj[k] = ApiClient.convertToType(data[k], itemType);
            }
          }
        }
      }
    }]);

    return ApiClient;
  }();
  ApiClient.CollectionFormatEnum = {
    /**
     * Comma-separated values. Value: <code>csv</code>
     * @const
     */
    CSV: ',',

    /**
     * Space-separated values. Value: <code>ssv</code>
     * @const
     */
    SSV: ' ',

    /**
     * Tab-separated values. Value: <code>tsv</code>
     * @const
     */
    TSV: '\t',

    /**
     * Pipe(|)-separated values. Value: <code>pipes</code>
     * @const
     */
    PIPES: '|',

    /**
     * Native array. Value: <code>multi</code>
     * @const
     */
    MULTI: 'multi'
    /**
     * The default API client implementation.
     * @type {module:ApiClient}
     */

  };
  ApiClient.instance = new ApiClient(defaultConfig);

  /**
  * The AuthRequest model module.
  * @module models/AuthRequest
  * @version 17.8
  */

  var AuthRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>AuthRequest</code>.
    * Document representing the authentication request type.
    * @alias module:models/AuthRequest
    * @class
    * @param type {module:models/AuthRequest.TypeEnum} Type of authentication request: guest, login (credentials), refresh or session.
    */
    function AuthRequest(type) {
      _classCallCheck(this, AuthRequest);

      /**
      * Type of authentication request: guest, login (credentials), refresh or session.
      * @member {module:models/AuthRequest.TypeEnum} type
      */
      this.type = type;
    }
    /**
    * Constructs a <code>AuthRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/AuthRequest} obj Optional instance to populate.
    * @return {module:models/AuthRequest} The populated <code>AuthRequest</code> instance.
    */


    _createClass(AuthRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new AuthRequest();

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return AuthRequest;
  }();
  AuthRequest.TypeEnum = {
    /**
     * value: "guest"
     * @const
     */
    guest: 'guest',

    /**
     * value: "credentials"
     * @const
     */
    credentials: 'credentials',

    /**
     * value: "refresh"
     * @const
     */
    refresh: 'refresh',

    /**
     * value: "session"
     * @const
     */
    session: 'session'
  };

  /**
  * The ProductDetailsLink model module.
  * @module models/ProductDetailsLink
  * @version 17.8
  */

  var ProductDetailsLink =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductDetailsLink</code>.
    * Document representing a link to the resource for product details.
    * @alias module:models/ProductDetailsLink
    * @class
    * @param productId {String} The id of the product.
    */
    function ProductDetailsLink(productId) {
      _classCallCheck(this, ProductDetailsLink);

      /**
      * The target of the link.
      * @member {String} link
      */
      this.link = undefined;
      /**
      * The description of the product.
      * @member {String} product_description
      */

      this.product_description = undefined;
      /**
      * The id of the product.
      * @member {String} product_id
      */

      this.product_id = productId;
      /**
      * The name of the product.
      * @member {String} product_name
      */

      this.product_name = undefined;
      /**
      * The link title.
      * @member {String} title
      */

      this.title = undefined;
    }
    /**
    * Constructs a <code>ProductDetailsLink</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductDetailsLink} obj Optional instance to populate.
    * @return {module:models/ProductDetailsLink} The populated <code>ProductDetailsLink</code> instance.
    */


    _createClass(ProductDetailsLink, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductDetailsLink();

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('product_description')) {
            obj['product_description'] = ApiClient.convertToType(data['product_description'], 'String');
          }

          if (data.hasOwnProperty('product_id')) {
            obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
          }

          if (data.hasOwnProperty('product_name')) {
            obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductDetailsLink;
  }();

  /**
  * The BonusDiscountLineItem model module.
  * @module models/BonusDiscountLineItem
  * @version 17.8
  */

  var BonusDiscountLineItem =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>BonusDiscountLineItem</code>.
    * Document representing a bonus discount line item
    * @alias module:models/BonusDiscountLineItem
    * @class
    */
    function BonusDiscountLineItem() {
      _classCallCheck(this, BonusDiscountLineItem);

      /**
      * The list of links to the bonus products the customer can choose from.
      * @member {Array.<module:models/ProductDetailsLink>} bonus_products
      */
      this.bonus_products = undefined;
      /**
      * The coupon code that triggered the promotion, if applicable.
      * @member {String} coupon_code
      */

      this.coupon_code = undefined;
      /**
      * The ID of the line item.
      * @member {String} id
      */

      this.id = undefined;
      /**
      * The maximum number of bonus items the user can select for this promotion.
      * @member {Number} max_bonus_items
      */

      this.max_bonus_items = undefined;
      /**
      * The ID of the promotion which triggered the creation of the line item.
      * @member {String} promotion_id
      */

      this.promotion_id = undefined;
    }
    /**
    * Constructs a <code>BonusDiscountLineItem</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/BonusDiscountLineItem} obj Optional instance to populate.
    * @return {module:models/BonusDiscountLineItem} The populated <code>BonusDiscountLineItem</code> instance.
    */


    _createClass(BonusDiscountLineItem, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new BonusDiscountLineItem();

          if (data.hasOwnProperty('bonus_products')) {
            obj['bonus_products'] = ApiClient.convertToType(data['bonus_products'], [ProductDetailsLink]);
          }

          if (data.hasOwnProperty('coupon_code')) {
            obj['coupon_code'] = ApiClient.convertToType(data['coupon_code'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('max_bonus_items')) {
            obj['max_bonus_items'] = ApiClient.convertToType(data['max_bonus_items'], 'Number');
          }

          if (data.hasOwnProperty('promotion_id')) {
            obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
          }
        }

        return obj;
      }
    }]);

    return BonusDiscountLineItem;
  }();

  /**
  * The CouponItem model module.
  * @module models/CouponItem
  * @version 17.8
  */

  var CouponItem =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CouponItem</code>.
    * Document representing a coupon item.
    * @alias module:models/CouponItem
    * @class
    * @param code {String} The coupon code.
    */
    function CouponItem(code) {
      _classCallCheck(this, CouponItem);

      /**
      * The coupon code.
      * @member {String} code
      */
      this.code = code;
      /**
      * The coupon item id.
      * @member {String} coupon_item_id
      */

      this.coupon_item_id = undefined;
      /**
      * The status of the coupon item.
      * @member {module:models/CouponItem.StatusCodeEnum} status_code
      */

      this.status_code = undefined;
      /**
      * A flag indicating whether the coupon item is valid. A coupon line item is valid if  the status code is 'applied' or 'no_applicable_promotion'.
      * @member {Boolean} valid
      */

      this.valid = undefined;
    }
    /**
    * Constructs a <code>CouponItem</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CouponItem} obj Optional instance to populate.
    * @return {module:models/CouponItem} The populated <code>CouponItem</code> instance.
    */


    _createClass(CouponItem, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CouponItem();

          if (data.hasOwnProperty('code')) {
            obj['code'] = ApiClient.convertToType(data['code'], 'String');
          }

          if (data.hasOwnProperty('coupon_item_id')) {
            obj['coupon_item_id'] = ApiClient.convertToType(data['coupon_item_id'], 'String');
          }

          if (data.hasOwnProperty('status_code')) {
            obj['status_code'] = ApiClient.convertToType(data['status_code'], 'String');
          }

          if (data.hasOwnProperty('valid')) {
            obj['valid'] = ApiClient.convertToType(data['valid'], 'Boolean');
          }
        }

        return obj;
      }
    }]);

    return CouponItem;
  }();
  CouponItem.StatusCodeEnum = {
    /**
     * value: "coupon_code_already_in_basket"
     * @const
     */
    coupon_code_already_in_basket: 'coupon_code_already_in_basket',

    /**
     * value: "coupon_code_already_redeemed"
     * @const
     */
    coupon_code_already_redeemed: 'coupon_code_already_redeemed',

    /**
     * value: "coupon_code_unknown"
     * @const
     */
    coupon_code_unknown: 'coupon_code_unknown',

    /**
     * value: "coupon_disabled"
     * @const
     */
    coupon_disabled: 'coupon_disabled',

    /**
     * value: "redemption_limit_exceeded"
     * @const
     */
    redemption_limit_exceeded: 'redemption_limit_exceeded',

    /**
     * value: "customer_redemption_limit_exceeded"
     * @const
     */
    customer_redemption_limit_exceeded: 'customer_redemption_limit_exceeded',

    /**
     * value: "timeframe_redemption_limit_exceeded"
     * @const
     */
    timeframe_redemption_limit_exceeded: 'timeframe_redemption_limit_exceeded',

    /**
     * value: "no_active_promotion"
     * @const
     */
    no_active_promotion: 'no_active_promotion',

    /**
     * value: "coupon_already_in_basket"
     * @const
     */
    coupon_already_in_basket: 'coupon_already_in_basket',

    /**
     * value: "no_applicable_promotion"
     * @const
     */
    no_applicable_promotion: 'no_applicable_promotion',

    /**
     * value: "applied"
     * @const
     */
    applied: 'applied',

    /**
     * value: "adhoc"
     * @const
     */
    adhoc: 'adhoc'
  };

  /**
  * The CustomerInfo model module.
  * @module models/CustomerInfo
  * @version 17.8
  */

  var CustomerInfo =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerInfo</code>.
    * Document representing information used to identify a customer.
    * @alias module:models/CustomerInfo
    * @class
    * @param email {String} The customer's email address.
    */
    function CustomerInfo(email) {
      _classCallCheck(this, CustomerInfo);

      /**
      * The customer's number (id).
      * @member {String} customer_id
      */
      this.customer_id = undefined;
      /**
      *
      * @member {String} customer_name
      */

      this.customer_name = undefined;
      /**
      * The customer's number (id).
      * @member {String} customer_no
      */

      this.customer_no = undefined;
      /**
      * The customer's email address.
      * @member {String} email
      */

      this.email = email;
    }
    /**
    * Constructs a <code>CustomerInfo</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerInfo} obj Optional instance to populate.
    * @return {module:models/CustomerInfo} The populated <code>CustomerInfo</code> instance.
    */


    _createClass(CustomerInfo, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerInfo();

          if (data.hasOwnProperty('customer_id')) {
            obj['customer_id'] = ApiClient.convertToType(data['customer_id'], 'String');
          }

          if (data.hasOwnProperty('customer_name')) {
            obj['customer_name'] = ApiClient.convertToType(data['customer_name'], 'String');
          }

          if (data.hasOwnProperty('customer_no')) {
            obj['customer_no'] = ApiClient.convertToType(data['customer_no'], 'String');
          }

          if (data.hasOwnProperty('email')) {
            obj['email'] = ApiClient.convertToType(data['email'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerInfo;
  }();

  /**
  * The GiftCertificateItem model module.
  * @module models/GiftCertificateItem
  * @version 17.8
  */

  var GiftCertificateItem =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>GiftCertificateItem</code>.
    * A gift certificate item.
    * @alias module:models/GiftCertificateItem
    * @class
    * @param amount {Number} The certificate item amount.
    * @param recipientEmail {String} The recipient's email.
    */
    function GiftCertificateItem(amount, recipientEmail) {
      _classCallCheck(this, GiftCertificateItem);

      /**
      * The certificate item amount.
      * @member {Number} amount
      */
      this.amount = amount;
      /**
      * Id used to identify this item
      * @member {String} gift_certificate_item_id
      */

      this.gift_certificate_item_id = undefined;
      /**
      * The certificate's message.
      * @member {String} message
      */

      this.message = undefined;
      /**
      * The recipient's email.
      * @member {String} recipient_email
      */

      this.recipient_email = recipientEmail;
      /**
      * The recipient's name.
      * @member {String} recipient_name
      */

      this.recipient_name = undefined;
      /**
      * The sender's name.
      * @member {String} sender_name
      */

      this.sender_name = undefined;
      /**
      * The shipment id.
      * @member {String} shipment_id
      */

      this.shipment_id = undefined;
    }
    /**
    * Constructs a <code>GiftCertificateItem</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/GiftCertificateItem} obj Optional instance to populate.
    * @return {module:models/GiftCertificateItem} The populated <code>GiftCertificateItem</code> instance.
    */


    _createClass(GiftCertificateItem, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new GiftCertificateItem();

          if (data.hasOwnProperty('amount')) {
            obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
          }

          if (data.hasOwnProperty('gift_certificate_item_id')) {
            obj['gift_certificate_item_id'] = ApiClient.convertToType(data['gift_certificate_item_id'], 'String');
          }

          if (data.hasOwnProperty('message')) {
            obj['message'] = ApiClient.convertToType(data['message'], 'String');
          }

          if (data.hasOwnProperty('recipient_email')) {
            obj['recipient_email'] = ApiClient.convertToType(data['recipient_email'], 'String');
          }

          if (data.hasOwnProperty('recipient_name')) {
            obj['recipient_name'] = ApiClient.convertToType(data['recipient_name'], 'String');
          }

          if (data.hasOwnProperty('sender_name')) {
            obj['sender_name'] = ApiClient.convertToType(data['sender_name'], 'String');
          }

          if (data.hasOwnProperty('shipment_id')) {
            obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
          }
        }

        return obj;
      }
    }]);

    return GiftCertificateItem;
  }();

  /**
  * The OrderAddress model module.
  * @module models/OrderAddress
  * @version 17.8
  */

  var OrderAddress =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>OrderAddress</code>.
    * Document representing an order address.
    * @alias module:models/OrderAddress
    * @class
    */
    function OrderAddress() {
      _classCallCheck(this, OrderAddress);

      /**
      * The first address.
      * @member {String} address1
      */
      this.address1 = undefined;
      /**
      * The second address.
      * @member {String} address2
      */

      this.address2 = undefined;
      /**
      * The city.
      * @member {String} city
      */

      this.city = undefined;
      /**
      * The company name.
      * @member {String} company_name
      */

      this.company_name = undefined;
      /**
      * The two-letter ISO 3166-1 (Alpha-2) country code.
      * @member {module:models/OrderAddress.CountryCodeEnum} country_code
      */

      this.country_code = undefined;
      /**
      * The first name.
      * @member {String} first_name
      */

      this.first_name = undefined;
      /**
      * The full name.
      * @member {String} full_name
      */

      this.full_name = undefined;
      /**
      * Id used to identify this address
      * @member {String} id
      */

      this.id = undefined;
      /**
      * The job title.
      * @member {String} job_title
      */

      this.job_title = undefined;
      /**
      * The last name.
      * @member {String} last_name
      */

      this.last_name = undefined;
      /**
      * The phone number.
      * @member {String} phone
      */

      this.phone = undefined;
      /**
      * The post box.
      * @member {String} post_box
      */

      this.post_box = undefined;
      /**
      * The postal code.
      * @member {String} postal_code
      */

      this.postal_code = undefined;
      /**
      * The salutation.
      * @member {String} salutation
      */

      this.salutation = undefined;
      /**
      * The second name.
      * @member {String} second_name
      */

      this.second_name = undefined;
      /**
      * The state code.
      * @member {String} state_code
      */

      this.state_code = undefined;
      /**
      * The suffix.
      * @member {String} suffix
      */

      this.suffix = undefined;
      /**
      * The suite.
      * @member {String} suite
      */

      this.suite = undefined;
      /**
      * The title.
      * @member {String} title
      */

      this.title = undefined;
    }
    /**
    * Constructs a <code>OrderAddress</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/OrderAddress} obj Optional instance to populate.
    * @return {module:models/OrderAddress} The populated <code>OrderAddress</code> instance.
    */


    _createClass(OrderAddress, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new OrderAddress();

          if (data.hasOwnProperty('address1')) {
            obj['address1'] = ApiClient.convertToType(data['address1'], 'String');
          }

          if (data.hasOwnProperty('address2')) {
            obj['address2'] = ApiClient.convertToType(data['address2'], 'String');
          }

          if (data.hasOwnProperty('city')) {
            obj['city'] = ApiClient.convertToType(data['city'], 'String');
          }

          if (data.hasOwnProperty('company_name')) {
            obj['company_name'] = ApiClient.convertToType(data['company_name'], 'String');
          }

          if (data.hasOwnProperty('country_code')) {
            obj['country_code'] = ApiClient.convertToType(data['country_code'], 'String');
          }

          if (data.hasOwnProperty('first_name')) {
            obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
          }

          if (data.hasOwnProperty('full_name')) {
            obj['full_name'] = ApiClient.convertToType(data['full_name'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('job_title')) {
            obj['job_title'] = ApiClient.convertToType(data['job_title'], 'String');
          }

          if (data.hasOwnProperty('last_name')) {
            obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
          }

          if (data.hasOwnProperty('phone')) {
            obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
          }

          if (data.hasOwnProperty('post_box')) {
            obj['post_box'] = ApiClient.convertToType(data['post_box'], 'String');
          }

          if (data.hasOwnProperty('postal_code')) {
            obj['postal_code'] = ApiClient.convertToType(data['postal_code'], 'String');
          }

          if (data.hasOwnProperty('salutation')) {
            obj['salutation'] = ApiClient.convertToType(data['salutation'], 'String');
          }

          if (data.hasOwnProperty('second_name')) {
            obj['second_name'] = ApiClient.convertToType(data['second_name'], 'String');
          }

          if (data.hasOwnProperty('state_code')) {
            obj['state_code'] = ApiClient.convertToType(data['state_code'], 'String');
          }

          if (data.hasOwnProperty('suffix')) {
            obj['suffix'] = ApiClient.convertToType(data['suffix'], 'String');
          }

          if (data.hasOwnProperty('suite')) {
            obj['suite'] = ApiClient.convertToType(data['suite'], 'String');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }
        }

        return obj;
      }
    }]);

    return OrderAddress;
  }();
  OrderAddress.CountryCodeEnum = {
    /**
     * value: "US"
     * @const
     */
    US: 'US',

    /**
     * value: "FR"
     * @const
     */
    FR: 'FR',

    /**
     * value: "IT"
     * @const
     */
    IT: 'IT',

    /**
     * value: "JP"
     * @const
     */
    JP: 'JP',

    /**
     * value: "CN"
     * @const
     */
    CN: 'CN',

    /**
     * value: "GB"
     * @const
     */
    GB: 'GB'
  };

  /**
  * The PaymentBankAccount model module.
  * @module models/PaymentBankAccount
  * @version 17.8
  */

  var PaymentBankAccount =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PaymentBankAccount</code>.
    * Document representing a payment bank account.
    * @alias module:models/PaymentBankAccount
    * @class
    */
    function PaymentBankAccount() {
      _classCallCheck(this, PaymentBankAccount);

      /**
      * The last 4 characters of the decrypted driver's license number of the bank account associated with this payment  instrument.
      * @member {String} drivers_license_last_digits
      */
      this.drivers_license_last_digits = undefined;
      /**
      * The driver license state code.
      * @member {String} drivers_license_state_code
      */

      this.drivers_license_state_code = undefined;
      /**
      * The holder of the bank account.
      * @member {String} holder
      */

      this.holder = undefined;
      /**
      * The decrypted driver's license number of the bank account with all but the last 4 characters replaced with a '*'  character.
      * @member {String} masked_drivers_license
      */

      this.masked_drivers_license = undefined;
      /**
      * The bank account masked number.
      * @member {String} masked_number
      */

      this.masked_number = undefined;
      /**
      * The last digits of the bank account number.
      * @member {String} number_last_digits
      */

      this.number_last_digits = undefined;
    }
    /**
    * Constructs a <code>PaymentBankAccount</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PaymentBankAccount} obj Optional instance to populate.
    * @return {module:models/PaymentBankAccount} The populated <code>PaymentBankAccount</code> instance.
    */


    _createClass(PaymentBankAccount, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PaymentBankAccount();

          if (data.hasOwnProperty('drivers_license_last_digits')) {
            obj['drivers_license_last_digits'] = ApiClient.convertToType(data['drivers_license_last_digits'], 'String');
          }

          if (data.hasOwnProperty('drivers_license_state_code')) {
            obj['drivers_license_state_code'] = ApiClient.convertToType(data['drivers_license_state_code'], 'String');
          }

          if (data.hasOwnProperty('holder')) {
            obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
          }

          if (data.hasOwnProperty('masked_drivers_license')) {
            obj['masked_drivers_license'] = ApiClient.convertToType(data['masked_drivers_license'], 'String');
          }

          if (data.hasOwnProperty('masked_number')) {
            obj['masked_number'] = ApiClient.convertToType(data['masked_number'], 'String');
          }

          if (data.hasOwnProperty('number_last_digits')) {
            obj['number_last_digits'] = ApiClient.convertToType(data['number_last_digits'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PaymentBankAccount;
  }();

  /**
  * The PaymentCard model module.
  * @module models/PaymentCard
  * @version 17.8
  */

  var PaymentCard =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PaymentCard</code>.
    * Document representing a payment card.
    * @alias module:models/PaymentCard
    * @class
    */
    function PaymentCard() {
      _classCallCheck(this, PaymentCard);

      /**
      * The payment card type (for example, 'Visa').
      * @member {String} card_type
      */
      this.card_type = undefined;
      /**
      * A flag indicating if the credit card is expired.
      * @member {Boolean} credit_card_expired
      */

      this.credit_card_expired = undefined;
      /**
      * A credit card token. If a credit card is tokenized, the token can be used to look up the credit card data at the  token store.
      * @member {String} credit_card_token
      */

      this.credit_card_token = undefined;
      /**
      * The month when the payment card expires.
      * @member {Number} expiration_month
      */

      this.expiration_month = undefined;
      /**
      * The year when the payment card expires.
      * @member {Number} expiration_year
      */

      this.expiration_year = undefined;
      /**
      * The payment card holder.
      * @member {String} holder
      */

      this.holder = undefined;
      /**
      * The payment card issue number.
      * @member {String} issue_number
      */

      this.issue_number = undefined;
      /**
      * The masked credit card number.
      * @member {String} masked_number
      */

      this.masked_number = undefined;
      /**
      * The last digits of credit card number.
      * @member {String} number_last_digits
      */

      this.number_last_digits = undefined;
      /**
      * The payment card valid from month.
      * @member {Number} valid_from_month
      */

      this.valid_from_month = undefined;
      /**
      * The payment card valid from year.
      * @member {Number} valid_from_year
      */

      this.valid_from_year = undefined;
    }
    /**
    * Constructs a <code>PaymentCard</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PaymentCard} obj Optional instance to populate.
    * @return {module:models/PaymentCard} The populated <code>PaymentCard</code> instance.
    */


    _createClass(PaymentCard, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PaymentCard();

          if (data.hasOwnProperty('card_type')) {
            obj['card_type'] = ApiClient.convertToType(data['card_type'], 'String');
          }

          if (data.hasOwnProperty('credit_card_expired')) {
            obj['credit_card_expired'] = ApiClient.convertToType(data['credit_card_expired'], 'Boolean');
          }

          if (data.hasOwnProperty('credit_card_token')) {
            obj['credit_card_token'] = ApiClient.convertToType(data['credit_card_token'], 'String');
          }

          if (data.hasOwnProperty('expiration_month')) {
            obj['expiration_month'] = ApiClient.convertToType(data['expiration_month'], 'Number');
          }

          if (data.hasOwnProperty('expiration_year')) {
            obj['expiration_year'] = ApiClient.convertToType(data['expiration_year'], 'Number');
          }

          if (data.hasOwnProperty('holder')) {
            obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
          }

          if (data.hasOwnProperty('issue_number')) {
            obj['issue_number'] = ApiClient.convertToType(data['issue_number'], 'String');
          }

          if (data.hasOwnProperty('masked_number')) {
            obj['masked_number'] = ApiClient.convertToType(data['masked_number'], 'String');
          }

          if (data.hasOwnProperty('number_last_digits')) {
            obj['number_last_digits'] = ApiClient.convertToType(data['number_last_digits'], 'String');
          }

          if (data.hasOwnProperty('valid_from_month')) {
            obj['valid_from_month'] = ApiClient.convertToType(data['valid_from_month'], 'Number');
          }

          if (data.hasOwnProperty('valid_from_year')) {
            obj['valid_from_year'] = ApiClient.convertToType(data['valid_from_year'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return PaymentCard;
  }();

  /**
  * The Status model module.
  * @module models/Status
  * @version 17.8
  */

  var Status =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Status</code>.
    * Document representing a status of an object.
    * @alias module:models/Status
    * @class
    */
    function Status() {
      _classCallCheck(this, Status);

      /**
      * The status code.
      * @member {String} code
      */
      this.code = undefined;
      /**
      * The status message.
      * @member {String} message
      */

      this.message = undefined;
      /**
      * The status.    For more information on the status values see dw.system.Status.OK and  dw.system.Status.ERROR.
      * @member {Number} status
      */

      this.status = undefined;
    }
    /**
    * Constructs a <code>Status</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Status} obj Optional instance to populate.
    * @return {module:models/Status} The populated <code>Status</code> instance.
    */


    _createClass(Status, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Status();

          if (data.hasOwnProperty('code')) {
            obj['code'] = ApiClient.convertToType(data['code'], 'String');
          }

          if (data.hasOwnProperty('message')) {
            obj['message'] = ApiClient.convertToType(data['message'], 'String');
          }

          if (data.hasOwnProperty('status')) {
            obj['status'] = ApiClient.convertToType(data['status'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return Status;
  }();

  /**
  * The OrderPaymentInstrument model module.
  * @module models/OrderPaymentInstrument
  * @version 17.8
  */

  var OrderPaymentInstrument =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>OrderPaymentInstrument</code>.
    * Document representing an order payment instrument.
    * @alias module:models/OrderPaymentInstrument
    * @class
    */
    function OrderPaymentInstrument() {
      _classCallCheck(this, OrderPaymentInstrument);

      /**
      * The payment transaction amount.
      * @member {Number} amount
      */
      this.amount = undefined;
      /**
      * The authorization status of the payment transaction.
      * @member {module:models/Status} authorization_status
      */

      this.authorization_status = undefined;
      /**
      * The bank routing number.
      * @member {String} bank_routing_number
      */

      this.bank_routing_number = undefined;
      /**
      * The masked gift certificate code.
      * @member {String} masked_gift_certificate_code
      */

      this.masked_gift_certificate_code = undefined;
      /**
      * The payment bank account.
      * @member {module:models/PaymentBankAccount} payment_bank_account
      */

      this.payment_bank_account = undefined;
      /**
      * The payment card.
      * @member {module:models/PaymentCard} payment_card
      */

      this.payment_card = undefined;
      /**
      * The payment instrument ID.
      * @member {String} payment_instrument_id
      */

      this.payment_instrument_id = undefined;
      /**
      * The payment method id. Optional if a customer payment instrument id is specified.
      * @member {String} payment_method_id
      */

      this.payment_method_id = undefined;
    }
    /**
    * Constructs a <code>OrderPaymentInstrument</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/OrderPaymentInstrument} obj Optional instance to populate.
    * @return {module:models/OrderPaymentInstrument} The populated <code>OrderPaymentInstrument</code> instance.
    */


    _createClass(OrderPaymentInstrument, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new OrderPaymentInstrument();

          if (data.hasOwnProperty('amount')) {
            obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
          }

          if (data.hasOwnProperty('authorization_status')) {
            obj['authorization_status'] = Status.constructFromObject(data['authorization_status']);
          }

          if (data.hasOwnProperty('bank_routing_number')) {
            obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
          }

          if (data.hasOwnProperty('masked_gift_certificate_code')) {
            obj['masked_gift_certificate_code'] = ApiClient.convertToType(data['masked_gift_certificate_code'], 'String');
          }

          if (data.hasOwnProperty('payment_bank_account')) {
            obj['payment_bank_account'] = PaymentBankAccount.constructFromObject(data['payment_bank_account']);
          }

          if (data.hasOwnProperty('payment_card')) {
            obj['payment_card'] = PaymentCard.constructFromObject(data['payment_card']);
          }

          if (data.hasOwnProperty('payment_instrument_id')) {
            obj['payment_instrument_id'] = ApiClient.convertToType(data['payment_instrument_id'], 'String');
          }

          if (data.hasOwnProperty('payment_method_id')) {
            obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
          }
        }

        return obj;
      }
    }]);

    return OrderPaymentInstrument;
  }();

  /**
  * The Discount model module.
  * @module models/Discount
  * @version 17.8
  */

  var Discount =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Discount</code>.
    * Document representing a discount that was
    * @alias module:models/Discount
    * @class
    * @param type {module:models/Discount.TypeEnum} The type of discount.
    */
    function Discount(type) {
      _classCallCheck(this, Discount);

      /**
      * The amount that is used with the amount and fixed price types.
      * @member {Number} amount
      */
      this.amount = undefined;
      /**
      * The percentage that is used with percentage types.
      * @member {Number} percentage
      */

      this.percentage = undefined;
      /**
      * The price book id that is used with some types.
      * @member {String} price_book_id
      */

      this.price_book_id = undefined;
      /**
      * The type of discount.
      * @member {module:models/Discount.TypeEnum} type
      */

      this.type = type;
    }
    /**
    * Constructs a <code>Discount</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Discount} obj Optional instance to populate.
    * @return {module:models/Discount} The populated <code>Discount</code> instance.
    */


    _createClass(Discount, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Discount();

          if (data.hasOwnProperty('amount')) {
            obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
          }

          if (data.hasOwnProperty('percentage')) {
            obj['percentage'] = ApiClient.convertToType(data['percentage'], 'Number');
          }

          if (data.hasOwnProperty('price_book_id')) {
            obj['price_book_id'] = ApiClient.convertToType(data['price_book_id'], 'String');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Discount;
  }();
  Discount.TypeEnum = {
    /**
     * value: "percentage"
     * @const
     */
    percentage: 'percentage',

    /**
     * value: "fixed_price"
     * @const
     */
    fixed_price: 'fixed_price',

    /**
     * value: "amount"
     * @const
     */
    amount: 'amount',

    /**
     * value: "free"
     * @const
     */
    free: 'free',

    /**
     * value: "price_book_price"
     * @const
     */
    price_book_price: 'price_book_price',

    /**
     * value: "bonus"
     * @const
     */
    bonus: 'bonus',

    /**
     * value: "total_fixed_price"
     * @const
     */
    total_fixed_price: 'total_fixed_price',

    /**
     * value: "bonus_choice"
     * @const
     */
    bonus_choice: 'bonus_choice',

    /**
     * value: "percentage_off_options"
     * @const
     */
    percentage_off_options: 'percentage_off_options'
  };

  /**
  * The PriceAdjustment model module.
  * @module models/PriceAdjustment
  * @version 17.8
  */

  var PriceAdjustment =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PriceAdjustment</code>.
    * Document representing a price adjustment within a basket or order. Price adjustments  can be assigned
    * at the order, product, or shipping level. They can be created by the  promotion engine (if the custom
    * flag is set to false) or can be added by custom logic (if the custom  flag is set to true). For custom
    * price adjustments created by a user, the manual flag should be  set to true; this is always
    * the case for price adjustments created using OCAPI.
    * @alias module:models/PriceAdjustment
    * @class
    */
    function PriceAdjustment() {
      _classCallCheck(this, PriceAdjustment);

      /**
      * A price adjustment that provides details of the discount that was applied.  This is null for custom
      * price adjustments created  without discount details.
      * @member {module:models/Discount} applied_discount
      */
      this.applied_discount = undefined;
      /**
      * The coupon code that triggered the promotion, provided  the price adjustment was created as
      * the result of a promotion  being triggered by a coupon.
      * @member {String} coupon_code
      */

      this.coupon_code = undefined;
      /**
      * The user who created the price adjustment.
      * @member {String} created_by
      */

      this.created_by = undefined;
      /**
      * Returns the value of attribute 'creationDate'.
      * @member {Date} creation_date
      */

      this.creation_date = undefined;
      /**
      * A flag indicating whether this price adjustment was created by custom logic. This flag is  set
      * to true unless the price adjustment was created by the promotion engine.
      * @member {Boolean} custom
      */

      this.custom = undefined;
      /**
      * The text describing the item in more detail.
      * @member {String} item_text
      */

      this.item_text = undefined;
      /**
      * Returns the value of attribute 'lastModified'.
      * @member {Date} last_modified
      */

      this.last_modified = undefined;
      /**
      * A flag indicating whether this price adjustment was created in a manual process.    For custom price
      * adjustments created using the shop API, this always  returns true. Using the scripting API,
      * however, it is possible to set this to true  or false, according to the use case.
      * @member {Boolean} manual
      */

      this.manual = undefined;
      /**
      * The adjustment price.
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * The price adjustment id (uuid).
      * @member {String} price_adjustment_id
      */

      this.price_adjustment_id = undefined;
      /**
      * The id of the related promotion. Custom price adjustments  can be assigned any promotion
      * id so long it is not  used by a price adjustment belonging to the same item  and is not used
      * by promotion defined in the promotion engine.  If not specified, a promotion id is generated.
      * @member {String} promotion_id
      */

      this.promotion_id = undefined;
      /**
      * The URL addressing the related promotion.
      * @member {String} promotion_link
      */

      this.promotion_link = undefined;
      /**
      * The reason why this price adjustment was made.
      * @member {module:models/PriceAdjustment.ReasonCodeEnum} reason_code
      */

      this.reason_code = undefined;
    }
    /**
    * Constructs a <code>PriceAdjustment</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PriceAdjustment} obj Optional instance to populate.
    * @return {module:models/PriceAdjustment} The populated <code>PriceAdjustment</code> instance.
    */


    _createClass(PriceAdjustment, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PriceAdjustment();

          if (data.hasOwnProperty('applied_discount')) {
            obj['applied_discount'] = Discount.constructFromObject(data['applied_discount']);
          }

          if (data.hasOwnProperty('coupon_code')) {
            obj['coupon_code'] = ApiClient.convertToType(data['coupon_code'], 'String');
          }

          if (data.hasOwnProperty('created_by')) {
            obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
          }

          if (data.hasOwnProperty('creation_date')) {
            obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
          }

          if (data.hasOwnProperty('custom')) {
            obj['custom'] = ApiClient.convertToType(data['custom'], 'Boolean');
          }

          if (data.hasOwnProperty('item_text')) {
            obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
          }

          if (data.hasOwnProperty('last_modified')) {
            obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
          }

          if (data.hasOwnProperty('manual')) {
            obj['manual'] = ApiClient.convertToType(data['manual'], 'Boolean');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('price_adjustment_id')) {
            obj['price_adjustment_id'] = ApiClient.convertToType(data['price_adjustment_id'], 'String');
          }

          if (data.hasOwnProperty('promotion_id')) {
            obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
          }

          if (data.hasOwnProperty('promotion_link')) {
            obj['promotion_link'] = ApiClient.convertToType(data['promotion_link'], 'String');
          }

          if (data.hasOwnProperty('reason_code')) {
            obj['reason_code'] = ApiClient.convertToType(data['reason_code'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PriceAdjustment;
  }();
  PriceAdjustment.ReasonCodeEnum = {
    /**
     * value: "PRICE_MATCH"
     * @const
     */
    PRICE_MATCH: 'PRICE_MATCH',

    /**
     * value: "BACKORDER"
     * @const
     */
    BACKORDER: 'BACKORDER',

    /**
     * value: "EVEN_EXCHANGE"
     * @const
     */
    EVEN_EXCHANGE: 'EVEN_EXCHANGE'
  };

  /**
  * The ProductListLink model module.
  * @module models/ProductListLink
  * @version 17.8
  */

  var ProductListLink =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductListLink</code>.
    * Document representing a link to a product list.
    * @alias module:models/ProductListLink
    * @class
    */
    function ProductListLink() {
      _classCallCheck(this, ProductListLink);

      /**
      * The description of this product list.
      * @member {String} description
      */
      this.description = undefined;
      /**
      * The target of the link.
      * @member {String} link
      */

      this.link = undefined;
      /**
      * The name of this product list.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * A flag indicating whether the owner made this product list available for access  by other customers.
      * @member {Boolean} public
      */

      this["public"] = undefined;
      /**
      * The link title.
      * @member {String} title
      */

      this.title = undefined;
      /**
      * The type of the product list.
      * @member {module:models/ProductListLink.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>ProductListLink</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductListLink} obj Optional instance to populate.
    * @return {module:models/ProductListLink} The populated <code>ProductListLink</code> instance.
    */


    _createClass(ProductListLink, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductListLink();

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('public')) {
            obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductListLink;
  }();
  ProductListLink.TypeEnum = {
    /**
     * value: "wish_list"
     * @const
     */
    wish_list: 'wish_list',

    /**
     * value: "gift_registry"
     * @const
     */
    gift_registry: 'gift_registry',

    /**
     * value: "shopping_list"
     * @const
     */
    shopping_list: 'shopping_list',

    /**
     * value: "custom_1"
     * @const
     */
    custom_1: 'custom_1',

    /**
     * value: "custom_2"
     * @const
     */
    custom_2: 'custom_2',

    /**
     * value: "custom_3"
     * @const
     */
    custom_3: 'custom_3'
  };

  /**
  * The ProductListItemReference model module.
  * @module models/ProductListItemReference
  * @version 17.8
  */

  var ProductListItemReference =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductListItemReference</code>.
    * @alias module:models/ProductListItemReference
    * @class
    * @param id {String} The id of the product list item.
    */
    function ProductListItemReference(id) {
      _classCallCheck(this, ProductListItemReference);

      /**
      * The id of the product list item.
      * @member {String} id
      */
      this.id = id;
      /**
      * @member {Number} priority
      */

      this.priority = undefined;
      /**
      * @member {module:models/ProductDetailsLink} product_details_link
      */

      this.product_details_link = undefined;
      /**
      * The link of the product list, the item is assigned
      * @member {module:models/ProductListLink} product_list
      */

      this.product_list = undefined;
      /**
      * @member {Boolean} public
      */

      this["public"] = undefined;
      /**
      * @member {Number} purchased_quantity
      */

      this.purchased_quantity = undefined;
      /**
      * @member {Number} quantity
      */

      this.quantity = undefined;
      /**
      * @member {module:models/ProductListItemReference.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>ProductListItemReference</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductListItemReference} obj Optional instance to populate.
    * @return {module:models/ProductListItemReference} The populated <code>ProductListItemReference</code> instance.
    */


    _createClass(ProductListItemReference, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductListItemReference();

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('priority')) {
            obj['priority'] = ApiClient.convertToType(data['priority'], 'Number');
          }

          if (data.hasOwnProperty('product_details_link')) {
            obj['product_details_link'] = ProductDetailsLink.constructFromObject(data['product_details_link']);
          }

          if (data.hasOwnProperty('product_list')) {
            obj['product_list'] = ProductListLink.constructFromObject(data['product_list']);
          }

          if (data.hasOwnProperty('public')) {
            obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
          }

          if (data.hasOwnProperty('purchased_quantity')) {
            obj['purchased_quantity'] = ApiClient.convertToType(data['purchased_quantity'], 'Number');
          }

          if (data.hasOwnProperty('quantity')) {
            obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductListItemReference;
  }();
  ProductListItemReference.TypeEnum = {
    /**
     * value: "product"
     * @const
     */
    product: 'product',

    /**
     * value: "gift_certificate"
     * @const
     */
    gift_certificate: 'gift_certificate'
  };

  /**
  * The OptionItem model module.
  * @module models/OptionItem
  * @version 17.8
  */

  var OptionItem =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>OptionItem</code>.
    * Document representing an option item.
    * @alias module:models/OptionItem
    * @class
    * @param optionId {String} The id of the option.
    * @param optionValueId {String} The id of the option value.
    */
    function OptionItem(optionId, optionValueId) {
      _classCallCheck(this, OptionItem);

      /**
      * The tax of the product item after adjustments applying.
      * @member {Number} adjusted_tax
      */
      this.adjusted_tax = undefined;
      /**
      * The base price for the line item, which is the  price of the unit before
      * applying adjustments, in the purchase  currency. The base price may be
      * net or gross of tax depending  on the configured taxation policy.
      * @member {Number} base_price
      */

      this.base_price = undefined;
      /**
      * The id of the bonus discount line item this bonus product relates to.
      * @member {String} bonus_discount_line_item_id
      */

      this.bonus_discount_line_item_id = undefined;
      /**
      * A flag indicating whether the product item is a bonus.
      * @member {Boolean} bonus_product_line_item
      */

      this.bonus_product_line_item = undefined;
      /**
      * The array of bundled product items. Can be empty.
      * @member {Array.<module:models/ProductItem>} bundled_product_items
      */

      this.bundled_product_items = undefined;
      /**
      * Returns true if the item is a gift.
      * @member {Boolean} gift
      */

      this.gift = undefined;
      /**
      * The gift message.
      * @member {String} gift_message
      */

      this.gift_message = undefined;
      /**
      * The inventory list id associated with this item.
      * @member {String} inventory_id
      */

      this.inventory_id = undefined;
      /**
      * The item identifier. Use this to identify an item when updating the item
      * quantity or creating a custom price  adjustment for an item.
      * @member {String} item_id
      */

      this.item_id = undefined;
      /**
      * The text describing the item in more detail.
      * @member {String} item_text
      */

      this.item_text = undefined;
      /**
      * The id of the option.
      * @member {String} option_id
      */

      this.option_id = optionId;
      /**
      * The array of option items. This array can be empty.
      * @member {Array.<module:models/OptionItem>} option_items
      */

      this.option_items = undefined;
      /**
      * The id of the option value.
      * @member {String} option_value_id
      */

      this.option_value_id = optionValueId;
      /**
      * The price of the line item before applying any adjustments. If the line
      * item is based on net pricing  then the net price is returned. If the
      * line item is based on gross  pricing then the gross price is returned.
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * Array of price adjustments. Can be empty.
      * @member {Array.<module:models/PriceAdjustment>} price_adjustments
      */

      this.price_adjustments = undefined;
      /**
      * The price of the product line item after applying all product-level
      * adjustments. For net pricing the adjusted net price is returned. For
      * gross pricing, the adjusted  gross price is returned.
      * @member {Number} price_after_item_discount
      */

      this.price_after_item_discount = undefined;
      /**
      * The price of this product line item after considering all  dependent
      * price adjustments and prorating all order-level  price adjustments. For
      * net pricing the net price is returned. For gross  pricing, the gross price
      * is returned.
      * @member {Number} price_after_order_discount
      */

      this.price_after_order_discount = undefined;
      /**
      *
      * @member {String} product_id
      */

      this.product_id = undefined;
      /**
      *
      * @member {module:models/ProductListItemReference} product_list_item
      */

      this.product_list_item = undefined;
      /**
      * The name of the product.
      * @member {String} product_name
      */

      this.product_name = undefined;
      /**
      * The quantity of the products represented by this item.
      * @member {Number} quantity
      */

      this.quantity = undefined;
      /**
      * The id of the shipment which includes the product item.
      * @member {String} shipment_id
      */

      this.shipment_id = undefined;
      /**
      * The reference to the related shipping item if it exists. This is the
      * case if for example when a surcharge is  defined for individual products
      * using a particular a shipping method.
      * @member {String} shipping_item_id
      */

      this.shipping_item_id = undefined;
      /**
      * The tax of the product item before adjustments applying.
      * @member {Number} tax
      */

      this.tax = undefined;
      /**
      * The price used to calculate the tax for this product item.
      * @member {Number} tax_basis
      */

      this.tax_basis = undefined;
      /**
      * The tax class ID for the product item or null  if no tax class ID is
      * associated with the product item.
      * @member {String} tax_class_id
      */

      this.tax_class_id = undefined;
      /**
      * The tax rate, which is the decimal tax rate to be applied  to the product
      * represented by this item.
      * @member {Number} tax_rate
      */

      this.tax_rate = undefined;
    }
    /**
    * Constructs a <code>OptionItem</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/OptionItem} obj Optional instance to populate.
    * @return {module:models/OptionItem} The populated <code>OptionItem</code> instance.
    */


    _createClass(OptionItem, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new OptionItem();

          if (data.hasOwnProperty('adjusted_tax')) {
            obj['adjusted_tax'] = ApiClient.convertToType(data['adjusted_tax'], 'Number');
          }

          if (data.hasOwnProperty('base_price')) {
            obj['base_price'] = ApiClient.convertToType(data['base_price'], 'Number');
          }

          if (data.hasOwnProperty('bonus_discount_line_item_id')) {
            obj['bonus_discount_line_item_id'] = ApiClient.convertToType(data['bonus_discount_line_item_id'], 'String');
          }

          if (data.hasOwnProperty('bonus_product_line_item')) {
            obj['bonus_product_line_item'] = ApiClient.convertToType(data['bonus_product_line_item'], 'Boolean');
          }

          if (data.hasOwnProperty('bundled_product_items')) {
            obj['bundled_product_items'] = ApiClient.convertToType(data['bundled_product_items'], [ProductItem]);
          }

          if (data.hasOwnProperty('gift')) {
            obj['gift'] = ApiClient.convertToType(data['gift'], 'Boolean');
          }

          if (data.hasOwnProperty('gift_message')) {
            obj['gift_message'] = ApiClient.convertToType(data['gift_message'], 'String');
          }

          if (data.hasOwnProperty('inventory_id')) {
            obj['inventory_id'] = ApiClient.convertToType(data['inventory_id'], 'String');
          }

          if (data.hasOwnProperty('item_id')) {
            obj['item_id'] = ApiClient.convertToType(data['item_id'], 'String');
          }

          if (data.hasOwnProperty('item_text')) {
            obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
          }

          if (data.hasOwnProperty('option_id')) {
            obj['option_id'] = ApiClient.convertToType(data['option_id'], 'String');
          }

          if (data.hasOwnProperty('option_items')) {
            obj['option_items'] = ApiClient.convertToType(data['option_items'], [OptionItem]);
          }

          if (data.hasOwnProperty('option_value_id')) {
            obj['option_value_id'] = ApiClient.convertToType(data['option_value_id'], 'String');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('price_adjustments')) {
            obj['price_adjustments'] = ApiClient.convertToType(data['price_adjustments'], [PriceAdjustment]);
          }

          if (data.hasOwnProperty('price_after_item_discount')) {
            obj['price_after_item_discount'] = ApiClient.convertToType(data['price_after_item_discount'], 'Number');
          }

          if (data.hasOwnProperty('price_after_order_discount')) {
            obj['price_after_order_discount'] = ApiClient.convertToType(data['price_after_order_discount'], 'Number');
          }

          if (data.hasOwnProperty('product_id')) {
            obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
          }

          if (data.hasOwnProperty('product_list_item')) {
            obj['product_list_item'] = ProductListItemReference.constructFromObject(data['product_list_item']);
          }

          if (data.hasOwnProperty('product_name')) {
            obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
          }

          if (data.hasOwnProperty('quantity')) {
            obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
          }

          if (data.hasOwnProperty('shipment_id')) {
            obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
          }

          if (data.hasOwnProperty('shipping_item_id')) {
            obj['shipping_item_id'] = ApiClient.convertToType(data['shipping_item_id'], 'String');
          }

          if (data.hasOwnProperty('tax')) {
            obj['tax'] = ApiClient.convertToType(data['tax'], 'Number');
          }

          if (data.hasOwnProperty('tax_basis')) {
            obj['tax_basis'] = ApiClient.convertToType(data['tax_basis'], 'Number');
          }

          if (data.hasOwnProperty('tax_class_id')) {
            obj['tax_class_id'] = ApiClient.convertToType(data['tax_class_id'], 'String');
          }

          if (data.hasOwnProperty('tax_rate')) {
            obj['tax_rate'] = ApiClient.convertToType(data['tax_rate'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return OptionItem;
  }();

  /**
   * The ProductItem model module.
   * @module models/ProductItem
   * @version 17.8
   */

  var ProductItem =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new <code>ProductItem</code>.
     * Document representing a product item.
     * @alias module:models/ProductItem
     * @class
     * @param quantity {Number} The quantity of the products represented by this item.
     */
    function ProductItem(quantity) {
      _classCallCheck(this, ProductItem);

      /**
       * The tax of the product item after adjustments applying.
       * @member {Number} adjusted_tax
       */
      this.adjusted_tax = undefined;
      /**
       * The base price for the line item, which is the  price of the unit before applying adjustments,
       * in the purchase  currency. The base price may be net or gross of tax depending  on the
       * configured taxation policy.
       * @member {Number} base_price
       */

      this.base_price = undefined;
      /**
       * The id of the bonus discount line item this bonus product relates to.
       * @member {String} bonus_discount_line_item_id
       */

      this.bonus_discount_line_item_id = undefined;
      /**
       * A flag indicating whether the product item is a bonus.
       * @member {Boolean} bonus_product_line_item
       */

      this.bonus_product_line_item = undefined;
      /**
       * The array of bundled product items. Can be empty.
       * @member {Array.<module:models/ProductItem>} bundled_product_items
       */

      this.bundled_product_items = undefined;
      /**
       * Returns true if the item is a gift.
       * @member {Boolean} gift
       */

      this.gift = undefined;
      /**
       * The gift message.
       * @member {String} gift_message
       */

      this.gift_message = undefined;
      /**
       * The inventory list id associated with this item.
       * @member {String} inventory_id
       */

      this.inventory_id = undefined;
      /**
       * The item identifier. Use this to identify an item when updating the item quantity or
       * creating a custom price  adjustment for an item.
       * @member {String} item_id
       */

      this.item_id = undefined;
      /**
       * The text describing the item in more detail.
       * @member {String} item_text
       */

      this.item_text = undefined;
      /**
       * The array of option items. This array can be empty.
       * @member {Array.<module:models/OptionItem>} option_items
       */

      this.option_items = undefined;
      /**
       * The price of the line item before applying any adjustments. If the line item is based
       * on net pricing  then the net price is returned. If the line item is based on gross
       * pricing then the gross price is returned.
       * @member {Number} price
       */

      this.price = undefined;
      /**
       * Array of price adjustments. Can be empty.
       * @member {Array.<module:models/PriceAdjustment>} price_adjustments
       */

      this.price_adjustments = undefined;
      /**
       * The price of the product line item after applying all product-level  adjustments. For
       * net pricing the adjusted net price is returned. For gross pricing, the adjusted  gross
       * price is returned.
       * @member {Number} price_after_item_discount
       */

      this.price_after_item_discount = undefined;
      /**
       * The price of this product line item after considering all  dependent price adjustments
       * and prorating all order-level  price adjustments. For net pricing the net price is
       * returned. For gross  pricing, the gross price is returned.
       * @member {Number} price_after_order_discount
       */

      this.price_after_order_discount = undefined;
      /**
       *
       * @member {String} product_id
       */

      this.product_id = undefined;
      /**
       *
       * @member {module:models/ProductListItemReference} product_list_item
       */

      this.product_list_item = undefined;
      /**
       * The name of the product.
       * @member {String} product_name
       */

      this.product_name = undefined;
      /**
       * The quantity of the products represented by this item.
       * @member {Number} quantity
       */

      this.quantity = quantity;
      /**
       * The id of the shipment which includes the product item.
       * @member {String} shipment_id
       */

      this.shipment_id = undefined;
      /**
       * The reference to the related shipping item if it exists. This is the case if for example
       * when a surcharge is  defined for individual products using a particular a shipping method.
       * @member {String} shipping_item_id
       */

      this.shipping_item_id = undefined;
      /**
       * The tax of the product item before adjustments applying.
       * @member {Number} tax
       */

      this.tax = undefined;
      /**
       * The price used to calculate the tax for this product item.
       * @member {Number} tax_basis
       */

      this.tax_basis = undefined;
      /**
       * The tax class ID for the product item or null  if no tax class ID is associated with the product item.
       * @member {String} tax_class_id
       */

      this.tax_class_id = undefined;
      /**
       * The tax rate, which is the decimal tax rate to be applied  to the product represented by this item.
       * @member {Number} tax_rate
       */

      this.tax_rate = undefined;
    }
    /**
     * Constructs a <code>ProductItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:models/ProductItem} obj Optional instance to populate.
     * @return {module:models/ProductItem} The populated <code>ProductItem</code> instance.
     */


    _createClass(ProductItem, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductItem();

          if (data.hasOwnProperty('adjusted_tax')) {
            obj['adjusted_tax'] = ApiClient.convertToType(data['adjusted_tax'], 'Number');
          }

          if (data.hasOwnProperty('base_price')) {
            obj['base_price'] = ApiClient.convertToType(data['base_price'], 'Number');
          }

          if (data.hasOwnProperty('bonus_discount_line_item_id')) {
            obj['bonus_discount_line_item_id'] = ApiClient.convertToType(data['bonus_discount_line_item_id'], 'String');
          }

          if (data.hasOwnProperty('bonus_product_line_item')) {
            obj['bonus_product_line_item'] = ApiClient.convertToType(data['bonus_product_line_item'], 'Boolean');
          }

          if (data.hasOwnProperty('bundled_product_items')) {
            obj['bundled_product_items'] = ApiClient.convertToType(data['bundled_product_items'], [ProductItem]);
          }

          if (data.hasOwnProperty('gift')) {
            obj['gift'] = ApiClient.convertToType(data['gift'], 'Boolean');
          }

          if (data.hasOwnProperty('gift_message')) {
            obj['gift_message'] = ApiClient.convertToType(data['gift_message'], 'String');
          }

          if (data.hasOwnProperty('inventory_id')) {
            obj['inventory_id'] = ApiClient.convertToType(data['inventory_id'], 'String');
          }

          if (data.hasOwnProperty('item_id')) {
            obj['item_id'] = ApiClient.convertToType(data['item_id'], 'String');
          }

          if (data.hasOwnProperty('item_text')) {
            obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
          }

          if (data.hasOwnProperty('option_items')) {
            obj['option_items'] = ApiClient.convertToType(data['option_items'], [OptionItem]);
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('price_adjustments')) {
            obj['price_adjustments'] = ApiClient.convertToType(data['price_adjustments'], [PriceAdjustment]);
          }

          if (data.hasOwnProperty('price_after_item_discount')) {
            obj['price_after_item_discount'] = ApiClient.convertToType(data['price_after_item_discount'], 'Number');
          }

          if (data.hasOwnProperty('price_after_order_discount')) {
            obj['price_after_order_discount'] = ApiClient.convertToType(data['price_after_order_discount'], 'Number');
          }

          if (data.hasOwnProperty('product_id')) {
            obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
          }

          if (data.hasOwnProperty('product_list_item')) {
            obj['product_list_item'] = ProductListItemReference.constructFromObject(data['product_list_item']);
          }

          if (data.hasOwnProperty('product_name')) {
            obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
          }

          if (data.hasOwnProperty('quantity')) {
            obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
          }

          if (data.hasOwnProperty('shipment_id')) {
            obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
          }

          if (data.hasOwnProperty('shipping_item_id')) {
            obj['shipping_item_id'] = ApiClient.convertToType(data['shipping_item_id'], 'String');
          }

          if (data.hasOwnProperty('tax')) {
            obj['tax'] = ApiClient.convertToType(data['tax'], 'Number');
          }

          if (data.hasOwnProperty('tax_basis')) {
            obj['tax_basis'] = ApiClient.convertToType(data['tax_basis'], 'Number');
          }

          if (data.hasOwnProperty('tax_class_id')) {
            obj['tax_class_id'] = ApiClient.convertToType(data['tax_class_id'], 'String');
          }

          if (data.hasOwnProperty('tax_rate')) {
            obj['tax_rate'] = ApiClient.convertToType(data['tax_rate'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return ProductItem;
  }();

  /**
  * The ShippingPromotion model module.
  * @module models/ShippingPromotion
  * @version 17.8
  */

  var ShippingPromotion =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ShippingPromotion</code>.
    * Document representing a shipping promotion.
    * @alias module:models/ShippingPromotion
    * @class
    */
    function ShippingPromotion() {
      _classCallCheck(this, ShippingPromotion);

      /**
      * The localized call-out message of the promotion.
      * @member {String} callout_msg
      */
      this.callout_msg = undefined;
      /**
      * The URL addressing the promotion.
      * @member {String} link
      */

      this.link = undefined;
      /**
      * The unique id of the promotion.
      * @member {String} promotion_id
      */

      this.promotion_id = undefined;
      /**
      * The localized promotion name.
      * @member {String} promotion_name
      */

      this.promotion_name = undefined;
    }
    /**
    * Constructs a <code>ShippingPromotion</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ShippingPromotion} obj Optional instance to populate.
    * @return {module:models/ShippingPromotion} The populated <code>ShippingPromotion</code> instance.
    */


    _createClass(ShippingPromotion, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ShippingPromotion();

          if (data.hasOwnProperty('callout_msg')) {
            obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String');
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('promotion_id')) {
            obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
          }

          if (data.hasOwnProperty('promotion_name')) {
            obj['promotion_name'] = ApiClient.convertToType(data['promotion_name'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ShippingPromotion;
  }();

  /**
  * The ShippingMethod model module.
  * @module models/ShippingMethod
  * @version 17.8
  */

  var ShippingMethod =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ShippingMethod</code>.
    * Document representing a shipping method.
    * @alias module:models/ShippingMethod
    * @class
    * @param cStorePickupEnabled {Boolean}
    * @param id {String} The shipping method id.
    */
    function ShippingMethod(id) {
      _classCallCheck(this, ShippingMethod);

      /**
      * The localized description of the shipping method.
      * @member {String} description
      */
      this.description = undefined;
      /**
      * The external shipping method.
      * @member {String} external_shipping_method
      */

      this.external_shipping_method = undefined;
      /**
      * The shipping method id.
      * @member {String} id
      */

      this.id = id;
      /**
      * The localized name of the shipping method.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The shipping cost total, including shipment level costs and  product level fix and surcharge costs.
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * The array of active customer shipping promotions for this shipping  method. This array can be empty.
      * @member {Array.<module:models/ShippingPromotion>} shipping_promotions
      */

      this.shipping_promotions = undefined;
    }
    /**
    * Constructs a <code>ShippingMethod</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ShippingMethod} obj Optional instance to populate.
    * @return {module:models/ShippingMethod} The populated <code>ShippingMethod</code> instance.
    */


    _createClass(ShippingMethod, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ShippingMethod();

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('external_shipping_method')) {
            obj['external_shipping_method'] = ApiClient.convertToType(data['external_shipping_method'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('shipping_promotions')) {
            obj['shipping_promotions'] = ApiClient.convertToType(data['shipping_promotions'], [ShippingPromotion]);
          }
        }

        return obj;
      }
    }]);

    return ShippingMethod;
  }();

  /**
  * The Shipment model module.
  * @module models/Shipment
  * @version 17.8
  */

  var Shipment =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Shipment</code>.
    * Document representing a shipment.
    * @alias module:models/Shipment
    * @class
    */
    function Shipment() {
      _classCallCheck(this, Shipment);

      /**
      * The products tax after discounts applying in purchase currency. Adjusted merchandize prices
      * represent the sum of  product prices before services such as shipping have been added, but after
      * adjustment from promotions have been  added.   Note that order level adjustments are considered
      * if Discount Taxation preference is set to  \"Tax Products and Shipping Only Based on Adjusted Price\".
      * @member {Number} adjusted_merchandize_total_tax
      */
      this.adjusted_merchandize_total_tax = undefined;
      /**
      * The tax of all shipping line items of the line item container after shipping adjustments have been applied.
      * @member {Number} adjusted_shipping_total_tax
      */

      this.adjusted_shipping_total_tax = undefined;
      /**
      * A flag indicating whether the shipment is a gift.
      * @member {Boolean} gift
      */

      this.gift = undefined;
      /**
      * The gift message.
      * @member {String} gift_message
      */

      this.gift_message = undefined;
      /**
      * The products total tax in purchase currency. Merchandize total prices represent the sum of
      * product prices before  services such as shipping or adjustment from promotions have been added.
      * @member {Number} merchandize_total_tax
      */

      this.merchandize_total_tax = undefined;
      /**
      * The total price of all product items after all product discounts. Depending on taxation
      * policy the returned price  is net or gross.
      * @member {Number} product_sub_total
      */

      this.product_sub_total = undefined;
      /**
      * The total price of all product items after all product and order discounts. Depending on
      * taxation policy the  returned price is net or gross.
      * @member {Number} product_total
      */

      this.product_total = undefined;
      /**
      * The order specific id to identify the shipment.
      * @member {String} shipment_id
      */

      this.shipment_id = undefined;
      /**
      * Returns the shipment number for this shipment.   This number is automatically generated.
      * @member {String} shipment_no
      */

      this.shipment_no = undefined;
      /**
      * The total price of the shipment, including products, shipping and tax.   Note that order
      * level adjustments are not considered.
      * @member {Number} shipment_total
      */

      this.shipment_total = undefined;
      /**
      * The shipping address.
      * @member {module:models/OrderAddress} shipping_address
      */

      this.shipping_address = undefined;
      /**
      * The shipping method.
      * @member {module:models/ShippingMethod} shipping_method
      */

      this.shipping_method = undefined;
      /**
      * The shipping status of the shipment.
      * @member {module:models/Shipment.ShippingStatusEnum} shipping_status
      */

      this.shipping_status = undefined;
      /**
      * The total shipping price of the shipment after all shipping discounts. Excludes tax if
      * taxation policy is net.  Includes tax if taxation policy is gross.
      * @member {Number} shipping_total
      */

      this.shipping_total = undefined;
      /**
      * The tax of all shipping line items of the line item container before shipping adjustments
      * have been applied.
      * @member {Number} shipping_total_tax
      */

      this.shipping_total_tax = undefined;
      /**
      * The total tax amount of the shipment.   Note that order level adjustments are
      * considered if Discount Taxation preference is set to  \"Tax Products and Shipping Only
      * Based on Adjusted Price\".
      * @member {Number} tax_total
      */

      this.tax_total = undefined;
      /**
      * The tracking number of the shipment.
      * @member {String} tracking_number
      */

      this.tracking_number = undefined;
    }
    /**
    * Constructs a <code>Shipment</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Shipment} obj Optional instance to populate.
    * @return {module:models/Shipment} The populated <code>Shipment</code> instance.
    */


    _createClass(Shipment, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Shipment();

          if (data.hasOwnProperty('adjusted_merchandize_total_tax')) {
            obj['adjusted_merchandize_total_tax'] = ApiClient.convertToType(data['adjusted_merchandize_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('adjusted_shipping_total_tax')) {
            obj['adjusted_shipping_total_tax'] = ApiClient.convertToType(data['adjusted_shipping_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('gift')) {
            obj['gift'] = ApiClient.convertToType(data['gift'], 'Boolean');
          }

          if (data.hasOwnProperty('gift_message')) {
            obj['gift_message'] = ApiClient.convertToType(data['gift_message'], 'String');
          }

          if (data.hasOwnProperty('merchandize_total_tax')) {
            obj['merchandize_total_tax'] = ApiClient.convertToType(data['merchandize_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('product_sub_total')) {
            obj['product_sub_total'] = ApiClient.convertToType(data['product_sub_total'], 'Number');
          }

          if (data.hasOwnProperty('product_total')) {
            obj['product_total'] = ApiClient.convertToType(data['product_total'], 'Number');
          }

          if (data.hasOwnProperty('shipment_id')) {
            obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
          }

          if (data.hasOwnProperty('shipment_no')) {
            obj['shipment_no'] = ApiClient.convertToType(data['shipment_no'], 'String');
          }

          if (data.hasOwnProperty('shipment_total')) {
            obj['shipment_total'] = ApiClient.convertToType(data['shipment_total'], 'Number');
          }

          if (data.hasOwnProperty('shipping_address')) {
            obj['shipping_address'] = OrderAddress.constructFromObject(data['shipping_address']);
          }

          if (data.hasOwnProperty('shipping_method')) {
            obj['shipping_method'] = ShippingMethod.constructFromObject(data['shipping_method']);
          }

          if (data.hasOwnProperty('shipping_status')) {
            obj['shipping_status'] = ApiClient.convertToType(data['shipping_status'], 'String');
          }

          if (data.hasOwnProperty('shipping_total')) {
            obj['shipping_total'] = ApiClient.convertToType(data['shipping_total'], 'Number');
          }

          if (data.hasOwnProperty('shipping_total_tax')) {
            obj['shipping_total_tax'] = ApiClient.convertToType(data['shipping_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('tax_total')) {
            obj['tax_total'] = ApiClient.convertToType(data['tax_total'], 'Number');
          }

          if (data.hasOwnProperty('tracking_number')) {
            obj['tracking_number'] = ApiClient.convertToType(data['tracking_number'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Shipment;
  }();
  Shipment.ShippingStatusEnum = {
    /**
     * value: "not_shipped"
     * @const
     */
    not_shipped: 'not_shipped',

    /**
     * value: "shipped"
     * @const
     */
    shipped: 'shipped'
  };

  /**
  * The ShippingItem model module.
  * @module models/ShippingItem
  * @version 17.8
  */

  var ShippingItem =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ShippingItem</code>.
    * Document representing a shipping item.
    * @alias module:models/ShippingItem
    * @class
    */
    function ShippingItem() {
      _classCallCheck(this, ShippingItem);

      /**
      * The tax of the product item after adjustments applying.
      * @member {Number} adjusted_tax
      */
      this.adjusted_tax = undefined;
      /**
      * The base price for the line item, which is the  price of the unit before applying
      * adjustments, in the purchase  currency. The base price may be net or gross of
      * tax depending  on the configured taxation policy.
      * @member {Number} base_price
      */

      this.base_price = undefined;
      /**
      * The item identifier. Use this to identify an item when  updating the item
      * quantity or creating a custom price adjustment for an  item.
      * @member {String} item_id
      */

      this.item_id = undefined;
      /**
      * The text describing the item in more detail.
      * @member {String} item_text
      */

      this.item_text = undefined;
      /**
      * The price of the line item before applying any adjustments. If the line item is
      * based on net pricing  then the net price is returned. If the line item is
      * based on gross  pricing then the gross price is returned.
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * Array of price adjustments. Can be empty.
      * @member {Array.<module:models/PriceAdjustment>} price_adjustments
      */

      this.price_adjustments = undefined;
      /**
      * The price of the product line item after applying all product-level  adjustments.
      * For net pricing the adjusted net price is returned. For gross pricing,
      * the adjusted  gross price is returned.
      * @member {Number} price_after_item_discount
      */

      this.price_after_item_discount = undefined;
      /**
      * The identifier of the shipment to which this item belongs.
      * @member {String} shipment_id
      */

      this.shipment_id = undefined;
      /**
      * The tax of the product item before adjustments applying.
      * @member {Number} tax
      */

      this.tax = undefined;
      /**
      * The price used to calculate the tax for this product item.
      * @member {Number} tax_basis
      */

      this.tax_basis = undefined;
      /**
      * The tax class ID for the product item or null  if no tax class ID is associated with the product item.
      * @member {String} tax_class_id
      */

      this.tax_class_id = undefined;
      /**
      * The tax rate, which is the decimal tax rate to be applied  to the product represented by this item.
      * @member {Number} tax_rate
      */

      this.tax_rate = undefined;
    }
    /**
    * Constructs a <code>ShippingItem</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ShippingItem} obj Optional instance to populate.
    * @return {module:models/ShippingItem} The populated <code>ShippingItem</code> instance.
    */


    _createClass(ShippingItem, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ShippingItem();

          if (data.hasOwnProperty('adjusted_tax')) {
            obj['adjusted_tax'] = ApiClient.convertToType(data['adjusted_tax'], 'Number');
          }

          if (data.hasOwnProperty('base_price')) {
            obj['base_price'] = ApiClient.convertToType(data['base_price'], 'Number');
          }

          if (data.hasOwnProperty('item_id')) {
            obj['item_id'] = ApiClient.convertToType(data['item_id'], 'String');
          }

          if (data.hasOwnProperty('item_text')) {
            obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('price_adjustments')) {
            obj['price_adjustments'] = ApiClient.convertToType(data['price_adjustments'], [PriceAdjustment]);
          }

          if (data.hasOwnProperty('price_after_item_discount')) {
            obj['price_after_item_discount'] = ApiClient.convertToType(data['price_after_item_discount'], 'Number');
          }

          if (data.hasOwnProperty('shipment_id')) {
            obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
          }

          if (data.hasOwnProperty('tax')) {
            obj['tax'] = ApiClient.convertToType(data['tax'], 'Number');
          }

          if (data.hasOwnProperty('tax_basis')) {
            obj['tax_basis'] = ApiClient.convertToType(data['tax_basis'], 'Number');
          }

          if (data.hasOwnProperty('tax_class_id')) {
            obj['tax_class_id'] = ApiClient.convertToType(data['tax_class_id'], 'String');
          }

          if (data.hasOwnProperty('tax_rate')) {
            obj['tax_rate'] = ApiClient.convertToType(data['tax_rate'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return ShippingItem;
  }();

  /**
  * The SimpleLink model module.
  * @module models/SimpleLink
  * @version 17.8
  */

  var SimpleLink =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>SimpleLink</code>.
    * Document representing a link to another resource.
    * @alias module:models/SimpleLink
    * @class
    */
    function SimpleLink() {
      _classCallCheck(this, SimpleLink);

      /**
      * The link to the resource.
      * @member {String} link
      */
      this.link = undefined;
    }
    /**
    * Constructs a <code>SimpleLink</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/SimpleLink} obj Optional instance to populate.
    * @return {module:models/SimpleLink} The populated <code>SimpleLink</code> instance.
    */


    _createClass(SimpleLink, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new SimpleLink();

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }
        }

        return obj;
      }
    }]);

    return SimpleLink;
  }();

  /**
  * The Basket model module.
  * @module models/Basket
  * @version 17.8
  */

  var Basket =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Basket</code>.
    * Document representing a basket.
    * @alias module:models/Basket
    * @class
    */
    function Basket() {
      _classCallCheck(this, Basket);

      /**
      * The products tax after discounts applying in purchase currency.   Adjusted merchandize prices
      * represent the sum of product prices before  services such as shipping have been added, but after
      * adjustment from  promotions have been added.
      * @member {Number} adjusted_merchandize_total_tax
      */
      this.adjusted_merchandize_total_tax = undefined;
      /**
      * The tax of all shipping line items of the line item container after  shipping adjustments have been applied.
      * @member {Number} adjusted_shipping_total_tax
      */

      this.adjusted_shipping_total_tax = undefined;
      /**
      * Is the basket created by an agent?
      * @member {Boolean} agent_basket
      */

      this.agent_basket = undefined;
      /**
      * The unique identifier for the basket.
      * @member {String} basket_id
      */

      this.basket_id = undefined;
      /**
      * The billing address. This property is part of basket checkout information only.
      * @member {module:models/OrderAddress} billing_address
      */

      this.billing_address = undefined;
      /**
      * The bonus discount line items of the line item container.
      * @member {Array.<module:models/BonusDiscountLineItem>} bonus_discount_line_items
      */

      this.bonus_discount_line_items = undefined;
      /**
      * The sales channel for the order.
      * @member {module:models/Basket.ChannelTypeEnum} channel_type
      */

      this.channel_type = undefined;
      /**
      * The sorted array of coupon items. This array can be empty.
      * @member {Array.<module:models/CouponItem>} coupon_items
      */

      this.coupon_items = undefined;
      /**
      * Returns the value of attribute 'creationDate'.
      * @member {Date} creation_date
      */

      this.creation_date = undefined;
      /**
      * The ISO 4217 mnemonic code of the currency.
      * @member {String} currency
      */

      this.currency = undefined;
      /**
      * The customer information for logged in customers. This property is part of basket checkout information only.
      * @member {module:models/CustomerInfo} customer_info
      */

      this.customer_info = undefined;
      /**
      * The sorted array of gift certificate line items. This array can be empty.
      * @member {Array.<module:models/GiftCertificateItem>} gift_certificate_items
      */

      this.gift_certificate_items = undefined;
      /**
      *
      * @member {Date} inventory_reservation_expiry
      */

      this.inventory_reservation_expiry = undefined;
      /**
      * Returns the value of attribute 'lastModified'.
      * @member {Date} last_modified
      */

      this.last_modified = undefined;
      /**
      * The products total tax in purchase currency.   Merchandize total prices represent the sum of
      * product prices before  services such as shipping or adjustment from promotions have  been added.
      * @member {Number} merchandize_total_tax
      */

      this.merchandize_total_tax = undefined;
      /**
      * The notes for the line item container.
      * @member {module:models/SimpleLink} notes
      */

      this.notes = undefined;
      /**
      * The array of order level price adjustments. This array can be empty.
      * @member {Array.<module:models/PriceAdjustment>} order_price_adjustments
      */

      this.order_price_adjustments = undefined;
      /**
      * The total price of the order, including products, shipping and tax. This property is part of basket checkout  information only.
      * @member {Number} order_total
      */

      this.order_total = undefined;
      /**
      * The payment instruments list for the order.
      * @member {Array.<module:models/OrderPaymentInstrument>} payment_instruments
      */

      this.payment_instruments = undefined;
      /**
      * The sorted array of product items (up to a maximum of 50 items). This array can be empty.
      * @member {Array.<module:models/ProductItem>} product_items
      */

      this.product_items = undefined;
      /**
      * The total price of all product items after all product discounts.  Depending on taxation
      * policy the returned price is net or gross.
      * @member {Number} product_sub_total
      */

      this.product_sub_total = undefined;
      /**
      * The total price of all product items after all product and order discounts.  Depending on taxation
      * policy the returned price is net or gross.
      * @member {Number} product_total
      */

      this.product_total = undefined;
      /**
      * The array of shipments. This property is part of basket checkout information only.
      * @member {Array.<module:models/Shipment>} shipments
      */

      this.shipments = undefined;
      /**
      * The sorted array of shipping items. This array can be empty.
      * @member {Array.<module:models/ShippingItem>} shipping_items
      */

      this.shipping_items = undefined;
      /**
      * The total shipping price of the order after all shipping discounts. Excludes tax if taxation policy
      * is net. Includes  tax if taxation policy is gross. This property is part of basket checkout information only.
      * @member {Number} shipping_total
      */

      this.shipping_total = undefined;
      /**
      * The tax of all shipping line items of the line item container before  shipping adjustments have been applied.
      * @member {Number} shipping_total_tax
      */

      this.shipping_total_tax = undefined;
      /**
      * Gets the source code assigned to this basket.
      * @member {String} source_code
      */

      this.source_code = undefined;
      /**
      * The total tax amount of the order. This property is part of basket checkout information only.
      * @member {Number} tax_total
      */

      this.tax_total = undefined;
      /**
      * The taxation the line item container is based on.
      * @member {module:models/Basket.TaxationEnum} taxation
      */

      this.taxation = undefined;
    }
    /**
    * Constructs a <code>Basket</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Basket} obj Optional instance to populate.
    * @return {module:models/Basket} The populated <code>Basket</code> instance.
    */


    _createClass(Basket, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Basket();

          if (data.hasOwnProperty('adjusted_merchandize_total_tax')) {
            obj['adjusted_merchandize_total_tax'] = ApiClient.convertToType(data['adjusted_merchandize_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('adjusted_shipping_total_tax')) {
            obj['adjusted_shipping_total_tax'] = ApiClient.convertToType(data['adjusted_shipping_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('agent_basket')) {
            obj['agent_basket'] = ApiClient.convertToType(data['agent_basket'], 'Boolean');
          }

          if (data.hasOwnProperty('basket_id')) {
            obj['basket_id'] = ApiClient.convertToType(data['basket_id'], 'String');
          }

          if (data.hasOwnProperty('billing_address')) {
            obj['billing_address'] = OrderAddress.constructFromObject(data['billing_address']);
          }

          if (data.hasOwnProperty('bonus_discount_line_items')) {
            obj['bonus_discount_line_items'] = ApiClient.convertToType(data['bonus_discount_line_items'], [BonusDiscountLineItem]);
          }

          if (data.hasOwnProperty('channel_type')) {
            obj['channel_type'] = ApiClient.convertToType(data['channel_type'], 'String');
          }

          if (data.hasOwnProperty('coupon_items')) {
            obj['coupon_items'] = ApiClient.convertToType(data['coupon_items'], [CouponItem]);
          }

          if (data.hasOwnProperty('creation_date')) {
            obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
          }

          if (data.hasOwnProperty('currency')) {
            obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
          }

          if (data.hasOwnProperty('customer_info')) {
            obj['customer_info'] = CustomerInfo.constructFromObject(data['customer_info']);
          }

          if (data.hasOwnProperty('gift_certificate_items')) {
            obj['gift_certificate_items'] = ApiClient.convertToType(data['gift_certificate_items'], [GiftCertificateItem]);
          }

          if (data.hasOwnProperty('inventory_reservation_expiry')) {
            obj['inventory_reservation_expiry'] = ApiClient.convertToType(data['inventory_reservation_expiry'], 'Date');
          }

          if (data.hasOwnProperty('last_modified')) {
            obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
          }

          if (data.hasOwnProperty('merchandize_total_tax')) {
            obj['merchandize_total_tax'] = ApiClient.convertToType(data['merchandize_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('notes')) {
            obj['notes'] = SimpleLink.constructFromObject(data['notes']);
          }

          if (data.hasOwnProperty('order_price_adjustments')) {
            obj['order_price_adjustments'] = ApiClient.convertToType(data['order_price_adjustments'], [PriceAdjustment]);
          }

          if (data.hasOwnProperty('order_total')) {
            obj['order_total'] = ApiClient.convertToType(data['order_total'], 'Number');
          }

          if (data.hasOwnProperty('payment_instruments')) {
            obj['payment_instruments'] = ApiClient.convertToType(data['payment_instruments'], [OrderPaymentInstrument]);
          }

          if (data.hasOwnProperty('product_items')) {
            obj['product_items'] = ApiClient.convertToType(data['product_items'], [ProductItem]);
          }

          if (data.hasOwnProperty('product_sub_total')) {
            obj['product_sub_total'] = ApiClient.convertToType(data['product_sub_total'], 'Number');
          }

          if (data.hasOwnProperty('product_total')) {
            obj['product_total'] = ApiClient.convertToType(data['product_total'], 'Number');
          }

          if (data.hasOwnProperty('shipments')) {
            obj['shipments'] = ApiClient.convertToType(data['shipments'], [Shipment]);
          }

          if (data.hasOwnProperty('shipping_items')) {
            obj['shipping_items'] = ApiClient.convertToType(data['shipping_items'], [ShippingItem]);
          }

          if (data.hasOwnProperty('shipping_total')) {
            obj['shipping_total'] = ApiClient.convertToType(data['shipping_total'], 'Number');
          }

          if (data.hasOwnProperty('shipping_total_tax')) {
            obj['shipping_total_tax'] = ApiClient.convertToType(data['shipping_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('source_code')) {
            obj['source_code'] = ApiClient.convertToType(data['source_code'], 'String');
          }

          if (data.hasOwnProperty('tax_total')) {
            obj['tax_total'] = ApiClient.convertToType(data['tax_total'], 'Number');
          }

          if (data.hasOwnProperty('taxation')) {
            obj['taxation'] = ApiClient.convertToType(data['taxation'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Basket;
  }();
  Basket.ChannelTypeEnum = {
    /**
     * value: "storefront"
     * @const
     */
    storefront: 'storefront',

    /**
     * value: "callcenter"
     * @const
     */
    callcenter: 'callcenter',

    /**
     * value: "marketplace"
     * @const
     */
    marketplace: 'marketplace',

    /**
     * value: "dss"
     * @const
     */
    dss: 'dss',

    /**
     * value: "store"
     * @const
     */
    store: 'store',

    /**
     * value: "pinterest"
     * @const
     */
    pinterest: 'pinterest',

    /**
     * value: "twitter"
     * @const
     */
    twitter: 'twitter',

    /**
     * value: "facebookads"
     * @const
     */
    facebookads: 'facebookads',

    /**
     * value: "subscriptions"
     * @const
     */
    subscriptions: 'subscriptions',

    /**
     * value: "onlinereservation"
     * @const
     */
    onlinereservation: 'onlinereservation',

    /**
     * value: "customerservicecenter"
     * @const
     */
    customerservicecenter: 'customerservicecenter',

    /**
     * value: "instagramcommerce"
     * @const
     */
    instagramcommerce: 'instagramcommerce'
    /**
    * Allowed values for the <code>taxation</code> property.
    * @enum {String}
    * @readonly
    */

  };
  Basket.TaxationEnum = {
    /**
     * value: "gross"
     * @const
     */
    gross: 'gross',

    /**
     * value: "net"
     * @const
     */
    net: 'net'
  };

  /**
  * The OrderPaymentCardRequest model module.
  * @module models/OrderPaymentCardRequest
  * @version 17.8
  */

  var OrderPaymentCardRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>OrderPaymentCardRequest</code>.
    * Document representing an order payment card request.
    * @alias module:models/OrderPaymentCardRequest
    * @class
    */
    function OrderPaymentCardRequest() {
      _classCallCheck(this, OrderPaymentCardRequest);

      /**
      *
      * @member {String} card_type
      */
      this.card_type = undefined;
      /**
      *
      * @member {String} credit_card_token
      */

      this.credit_card_token = undefined;
      /**
      *
      * @member {Number} expiration_month
      */

      this.expiration_month = undefined;
      /**
      *
      * @member {Number} expiration_year
      */

      this.expiration_year = undefined;
      /**
      *
      * @member {String} holder
      */

      this.holder = undefined;
      /**
      *
      * @member {String} issue_number
      */

      this.issue_number = undefined;
      /**
      *
      * @member {String} number
      */

      this.number = undefined;
      /**
      * The security code for the payment card.
      * @member {String} security_code
      */

      this.security_code = undefined;
      /**
      *
      * @member {Number} valid_from_month
      */

      this.valid_from_month = undefined;
      /**
      *
      * @member {Number} valid_from_year
      */

      this.valid_from_year = undefined;
    }
    /**
    * Constructs a <code>OrderPaymentCardRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/OrderPaymentCardRequest} obj Optional instance to populate.
    * @return {module:models/OrderPaymentCardRequest} The populated <code>OrderPaymentCardRequest</code> instance.
    */


    _createClass(OrderPaymentCardRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new OrderPaymentCardRequest();

          if (data.hasOwnProperty('card_type')) {
            obj['card_type'] = ApiClient.convertToType(data['card_type'], 'String');
          }

          if (data.hasOwnProperty('credit_card_token')) {
            obj['credit_card_token'] = ApiClient.convertToType(data['credit_card_token'], 'String');
          }

          if (data.hasOwnProperty('expiration_month')) {
            obj['expiration_month'] = ApiClient.convertToType(data['expiration_month'], 'Number');
          }

          if (data.hasOwnProperty('expiration_year')) {
            obj['expiration_year'] = ApiClient.convertToType(data['expiration_year'], 'Number');
          }

          if (data.hasOwnProperty('holder')) {
            obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
          }

          if (data.hasOwnProperty('issue_number')) {
            obj['issue_number'] = ApiClient.convertToType(data['issue_number'], 'String');
          }

          if (data.hasOwnProperty('number')) {
            obj['number'] = ApiClient.convertToType(data['number'], 'String');
          }

          if (data.hasOwnProperty('security_code')) {
            obj['security_code'] = ApiClient.convertToType(data['security_code'], 'String');
          }

          if (data.hasOwnProperty('valid_from_month')) {
            obj['valid_from_month'] = ApiClient.convertToType(data['valid_from_month'], 'Number');
          }

          if (data.hasOwnProperty('valid_from_year')) {
            obj['valid_from_year'] = ApiClient.convertToType(data['valid_from_year'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return OrderPaymentCardRequest;
  }();

  /**
  * The PaymentBankAccountRequest model module.
  * @module models/PaymentBankAccountRequest
  * @version 17.8
  */

  var PaymentBankAccountRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PaymentBankAccountRequest</code>.
    * Document representing a payment bank account request.
    * @alias module:models/PaymentBankAccountRequest
    * @class
    */
    function PaymentBankAccountRequest() {
      _classCallCheck(this, PaymentBankAccountRequest);

      /**
      * The drivers license.
      * @member {String} drivers_license
      */
      this.drivers_license = undefined;
      /**
      * The driver license state code.
      * @member {String} drivers_license_state_code
      */

      this.drivers_license_state_code = undefined;
      /**
      * The holder of the bank account.
      * @member {String} holder
      */

      this.holder = undefined;
      /**
      * The payment bank account number.
      * @member {String} number
      */

      this.number = undefined;
    }
    /**
    * Constructs a <code>PaymentBankAccountRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PaymentBankAccountRequest} obj Optional instance to populate.
    * @return {module:models/PaymentBankAccountRequest} The populated <code>PaymentBankAccountRequest</code> instance.
    */


    _createClass(PaymentBankAccountRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PaymentBankAccountRequest();

          if (data.hasOwnProperty('drivers_license')) {
            obj['drivers_license'] = ApiClient.convertToType(data['drivers_license'], 'String');
          }

          if (data.hasOwnProperty('drivers_license_state_code')) {
            obj['drivers_license_state_code'] = ApiClient.convertToType(data['drivers_license_state_code'], 'String');
          }

          if (data.hasOwnProperty('holder')) {
            obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
          }

          if (data.hasOwnProperty('number')) {
            obj['number'] = ApiClient.convertToType(data['number'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PaymentBankAccountRequest;
  }();

  /**
  * The BasketPaymentInstrumentRequest model module.
  * @module models/BasketPaymentInstrumentRequest
  * @version 17.8
  */

  var BasketPaymentInstrumentRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>BasketPaymentInstrumentRequest</code>.
    * Document representing a basket payment instrument request.
    * @alias module:models/BasketPaymentInstrumentRequest
    * @class
    */
    function BasketPaymentInstrumentRequest() {
      _classCallCheck(this, BasketPaymentInstrumentRequest);

      /**
      * The payment transaction amount.
      * @member {Number} amount
      */
      this.amount = undefined;
      /**
      * The bank routing number.
      * @member {String} bank_routing_number
      */

      this.bank_routing_number = undefined;
      /**
      * The id of a customer payment instrument.
      * @member {String} customer_payment_instrument_id
      */

      this.customer_payment_instrument_id = undefined;
      /**
      * The gift certificate code.
      * @member {String} gift_certificate_code
      */

      this.gift_certificate_code = undefined;
      /**
      * The payment bank account request data.
      * @member {module:models/PaymentBankAccountRequest} payment_bank_account
      */

      this.payment_bank_account = undefined;
      /**
      * The payment card.
      * @member {module:models/OrderPaymentCardRequest} payment_card
      */

      this.payment_card = undefined;
      /**
      * The payment method id. Optional if a customer payment instrument id is specified.
      * @member {String} payment_method_id
      */

      this.payment_method_id = undefined;
    }
    /**
    * Constructs a <code>BasketPaymentInstrumentRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/BasketPaymentInstrumentRequest} obj Optional instance to populate.
    * @return {module:models/BasketPaymentInstrumentRequest} The populated <code>BasketPaymentInstrumentRequest</code> instance.
    */


    _createClass(BasketPaymentInstrumentRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new BasketPaymentInstrumentRequest();

          if (data.hasOwnProperty('amount')) {
            obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
          }

          if (data.hasOwnProperty('bank_routing_number')) {
            obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
          }

          if (data.hasOwnProperty('customer_payment_instrument_id')) {
            obj['customer_payment_instrument_id'] = ApiClient.convertToType(data['customer_payment_instrument_id'], 'String');
          }

          if (data.hasOwnProperty('gift_certificate_code')) {
            obj['gift_certificate_code'] = ApiClient.convertToType(data['gift_certificate_code'], 'String');
          }

          if (data.hasOwnProperty('payment_bank_account')) {
            obj['payment_bank_account'] = PaymentBankAccountRequest.constructFromObject(data['payment_bank_account']);
          }

          if (data.hasOwnProperty('payment_card')) {
            obj['payment_card'] = OrderPaymentCardRequest.constructFromObject(data['payment_card']);
          }

          if (data.hasOwnProperty('payment_method_id')) {
            obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
          }
        }

        return obj;
      }
    }]);

    return BasketPaymentInstrumentRequest;
  }();

  /**
  * The BasketsResult model module.
  * @module models/BasketsResult
  * @version 17.8
  */

  var BasketsResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>BasketsResult</code>.
    * Result document containing an array of baskets.
    * @alias module:models/BasketsResult
    * @class
    */
    function BasketsResult() {
      _classCallCheck(this, BasketsResult);

      /**
      * The list of baskets for a customer.
      * @member {Array.<module:models/Basket>} baskets
      */
      this.baskets = undefined;
      /**
      * The total number of baskets.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>BasketsResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/BasketsResult} obj Optional instance to populate.
    * @return {module:models/BasketsResult} The populated <code>BasketsResult</code> instance.
    */


    _createClass(BasketsResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new BasketsResult();

          if (data.hasOwnProperty('baskets')) {
            obj['baskets'] = ApiClient.convertToType(data['baskets'], [Basket]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return BasketsResult;
  }();

  /**
  * The Filter model module.
  * @module models/Filter
  * @version 17.8
  */

  var Filter =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Filter</code>.
    * Document representing a boolean filter.
    * @alias module:models/Filter
    * @class
    * @param operator {module:models/Filter.OperatorEnum} The logical operator the filters are combined with.
    */
    function Filter(operator) {
      _classCallCheck(this, Filter);

      /**
      * The logical operator the filters are combined with.
      * @member {module:models/Filter.OperatorEnum} operator
      */
      this.operator = operator;
    }
    /**
    * Constructs a <code>Filter</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Filter} obj Optional instance to populate.
    * @return {module:models/Filter} The populated <code>Filter</code> instance.
    */


    _createClass(Filter, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Filter();

          if (data.hasOwnProperty('operator')) {
            obj['operator'] = ApiClient.convertToType(data['operator'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Filter;
  }();
  Filter.OperatorEnum = {
    /**
     * value: "and"
     * @const
     */
    and: 'and',

    /**
     * value: "or"
     * @const
     */
    or: 'or',

    /**
     * value: "not"
     * @const
     */
    not: 'not'
  };

  /**
  * The BoolFilter model module.
  * @module models/BoolFilter
  * @version 17.8
  */

  var BoolFilter =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>BoolFilter</code>.
    * Document representing a boolean filter.
    * @alias module:models/BoolFilter
    * @class
    * @param operator {module:models/BoolFilter.OperatorEnum} The logical operator the filters are combined with.
    */
    function BoolFilter(operator) {
      _classCallCheck(this, BoolFilter);

      /**
      * A list of filters, which are logically combined by an operator.
      * @member {Array.<module:models/Filter>} filters
      */
      this.filters = undefined;
      /**
      * The logical operator the filters are combined with.
      * @member {module:models/BoolFilter.OperatorEnum} operator
      */

      this.operator = operator;
    }
    /**
    * Constructs a <code>BoolFilter</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/BoolFilter} obj Optional instance to populate.
    * @return {module:models/BoolFilter} The populated <code>BoolFilter</code> instance.
    */


    _createClass(BoolFilter, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new BoolFilter();

          if (data.hasOwnProperty('filters')) {
            obj['filters'] = ApiClient.convertToType(data['filters'], [Filter]);
          }

          if (data.hasOwnProperty('operator')) {
            obj['operator'] = ApiClient.convertToType(data['operator'], 'String');
          }
        }

        return obj;
      }
    }]);

    return BoolFilter;
  }();
  BoolFilter.OperatorEnum = {
    /**
     * value: "and"
     * @const
     */
    and: 'and',

    /**
     * value: "or"
     * @const
     */
    or: 'or',

    /**
     * value: "not"
     * @const
     */
    not: 'not'
  };

  /**
  * The Query model module.
  * @module models/Query
  * @version 17.8
  */

  var Query =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Query</code>.
    * A boolean query allows to construct full logical expression trees consisting of other queries
    * (usually term and text  queries). A boolean query basically has 3 sets of clauses
    * that &#39;must&#39;, &#39;should&#39; and / or &#39;must not&#39; match.  If &#39;must&#39;,  &#39;must_not&#39;, or &#39;should&#39;
    * appear in the same boolean query, they are combined logically using the AND operator.
    * @alias module:models/Query
    * @class
    */
    function Query() {
      _classCallCheck(this, Query);

      /**
      * List of queries, which must match.
      * @member {Array.<module:models/Query>} must
      */
      this.must = undefined;
      /**
      * List of queries, which must not match.
      * @member {Array.<module:models/Query>} must_not
      */

      this.must_not = undefined;
      /**
      * List of queries, which should match.
      * @member {Array.<module:models/Query>} should
      */

      this.should = undefined;
    }
    /**
    * Constructs a <code>Query</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Query} obj Optional instance to populate.
    * @return {module:models/Query} The populated <code>Query</code> instance.
    */


    _createClass(Query, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Query();

          if (data.hasOwnProperty('must')) {
            obj['must'] = ApiClient.convertToType(data['must'], [Query]);
          }

          if (data.hasOwnProperty('must_not')) {
            obj['must_not'] = ApiClient.convertToType(data['must_not'], [Query]);
          }

          if (data.hasOwnProperty('should')) {
            obj['should'] = ApiClient.convertToType(data['should'], [Query]);
          }
        }

        return obj;
      }
    }]);

    return Query;
  }();

  /**
  * The BoolQuery model module.
  * @module models/BoolQuery
  * @version 17.8
  */

  var BoolQuery =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>BoolQuery</code>.
    * A boolean query allows to construct full logical expression trees consisting of other queries
    * (usually term and text  queries). A boolean query basically has 3 sets of clauses that
    * &#39;must&#39;, &#39;should&#39; and / or &#39;must not&#39; match.  If &#39;must&#39;,  &#39;must_not&#39;,
    * or &#39;should&#39; appear in the same boolean query, they are combined logically using the AND operator.
    * @alias module:models/BoolQuery
    * @class
    */
    function BoolQuery() {
      _classCallCheck(this, BoolQuery);

      /**
      * List of queries, which must match.
      * @member {Array.<module:models/Query>} must
      */
      this.must = undefined;
      /**
      * List of queries, which must not match.
      * @member {Array.<module:models/Query>} must_not
      */

      this.must_not = undefined;
      /**
      * List of queries, which should match.
      * @member {Array.<module:models/Query>} should
      */

      this.should = undefined;
    }
    /**
    * Constructs a <code>BoolQuery</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/BoolQuery} obj Optional instance to populate.
    * @return {module:models/BoolQuery} The populated <code>BoolQuery</code> instance.
    */


    _createClass(BoolQuery, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new BoolQuery();

          if (data.hasOwnProperty('must')) {
            obj['must'] = ApiClient.convertToType(data['must'], [Query]);
          }

          if (data.hasOwnProperty('must_not')) {
            obj['must_not'] = ApiClient.convertToType(data['must_not'], [Query]);
          }

          if (data.hasOwnProperty('should')) {
            obj['should'] = ApiClient.convertToType(data['should'], [Query]);
          }
        }

        return obj;
      }
    }]);

    return BoolQuery;
  }();

  /**
  * The Image model module.
  * @module models/Image
  * @version 17.8
  */

  var Image =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Image</code>.
    * @alias module:models/Image
    * @class
    * @param link {String}
    */
    function Image(link) {
      _classCallCheck(this, Image);

      /**
      * @member {String} alt
      */
      this.alt = undefined;
      /**
      * @member {String} dis_base_link
      */

      this.dis_base_link = undefined;
      /**
      * @member {String} link
      */

      this.link = link;
      /**
      * @member {String} title
      */

      this.title = undefined;
    }
    /**
    * Constructs a <code>Image</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Image} obj Optional instance to populate.
    * @return {module:models/Image} The populated <code>Image</code> instance.
    */


    _createClass(Image, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Image();

          if (data.hasOwnProperty('alt')) {
            obj['alt'] = ApiClient.convertToType(data['alt'], 'String');
          }

          if (data.hasOwnProperty('dis_base_link')) {
            obj['dis_base_link'] = ApiClient.convertToType(data['dis_base_link'], 'String');
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Image;
  }();

  /**
  * The VariationAttributeValue model module.
  * @module models/VariationAttributeValue
  * @version 17.8
  */

  var VariationAttributeValue =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>VariationAttributeValue</code>.
    * @alias module:models/VariationAttributeValue
    * @class
    * @param value {String}
    */
    function VariationAttributeValue(value) {
      _classCallCheck(this, VariationAttributeValue);

      /**
      * @member {String} description
      */
      this.description = undefined;
      /**
      * @member {module:models/Image} image
      */

      this.image = undefined;
      /**
      * @member {module:models/Image} image_swatch
      */

      this.image_swatch = undefined;
      /**
      * @member {String} name
      */

      this.name = undefined;
      /**
      * @member {Boolean} orderable
      */

      this.orderable = undefined;
      /**
      * @member {String} value
      */

      this.value = value;
    }
    /**
    * Constructs a <code>VariationAttributeValue</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/VariationAttributeValue} obj Optional instance to populate.
    * @return {module:models/VariationAttributeValue} The populated <code>VariationAttributeValue</code> instance.
    */


    _createClass(VariationAttributeValue, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new VariationAttributeValue();

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = Image.constructFromObject(data['image']);
          }

          if (data.hasOwnProperty('image_swatch')) {
            obj['image_swatch'] = Image.constructFromObject(data['image_swatch']);
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('orderable')) {
            obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
          }

          if (data.hasOwnProperty('value')) {
            obj['value'] = ApiClient.convertToType(data['value'], 'String');
          }
        }

        return obj;
      }
    }]);

    return VariationAttributeValue;
  }();

  /**
  * The VariationAttribute model module.
  * @module models/VariationAttribute
  * @version 17.8
  */

  var VariationAttribute =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>VariationAttribute</code>.
    * @alias module:models/VariationAttribute
    * @class
    * @param id {String}
    */
    function VariationAttribute(id) {
      _classCallCheck(this, VariationAttribute);

      /**
      * @member {String} id
      */
      this.id = id;
      /**
      * @member {String} name
      */

      this.name = undefined;
      /**
      * @member {Array.<module:models/VariationAttributeValue>} values
      */

      this.values = undefined;
    }
    /**
    * Constructs a <code>VariationAttribute</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/VariationAttribute} obj Optional instance to populate.
    * @return {module:models/VariationAttribute} The populated <code>VariationAttribute</code> instance.
    */


    _createClass(VariationAttribute, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new VariationAttribute();

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('values')) {
            obj['values'] = ApiClient.convertToType(data['values'], [VariationAttributeValue]);
          }
        }

        return obj;
      }
    }]);

    return VariationAttribute;
  }();

  /**
  * The ImageGroup model module.
  * @module models/ImageGroup
  * @version 17.8
  */

  var ImageGroup =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ImageGroup</code>.
    * Document representing an image group containing a list of images for a particular view type and an optional variation value.
    * @alias module:models/ImageGroup
    * @class
    */
    function ImageGroup() {
      _classCallCheck(this, ImageGroup);

      /**
      * The images of the image group.
      * @member {Array.<module:models/Image>} images
      */
      this.images = undefined;
      /**
      * Returns a list of variation attributes applying to this image group.
      * @member {Array.<module:models/VariationAttribute>} variation_attributes
      */

      this.variation_attributes = undefined;
      /**
      * The image view type.
      * @member {String} view_type
      */

      this.view_type = undefined;
    }
    /**
    * Constructs a <code>ImageGroup</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ImageGroup} obj Optional instance to populate.
    * @return {module:models/ImageGroup} The populated <code>ImageGroup</code> instance.
    */


    _createClass(ImageGroup, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ImageGroup();

          if (data.hasOwnProperty('images')) {
            obj['images'] = ApiClient.convertToType(data['images'], [Image]);
          }

          if (data.hasOwnProperty('variation_attributes')) {
            obj['variation_attributes'] = ApiClient.convertToType(data['variation_attributes'], [VariationAttribute]);
          }

          if (data.hasOwnProperty('view_type')) {
            obj['view_type'] = ApiClient.convertToType(data['view_type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ImageGroup;
  }();

  /**
  * The Inventory model module.
  * @module models/Inventory
  * @version 17.8
  */

  var Inventory =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Inventory</code>.
    * Document representing inventory information of the current product for a particular inventory list.
    * @alias module:models/Inventory
    * @class
    * @param id {String} The inventory id.
    */
    function Inventory(id) {
      _classCallCheck(this, Inventory);

      /**
      * The ats of the product. If it is infinity, the return value is 999999. The value can be overwritten by the  OCAPI setting 'product.inventory.ats.max_threshold'.
      * @member {Number} ats
      */
      this.ats = undefined;
      /**
      * A flag indicating whether the product is back orderable.
      * @member {Boolean} backorderable
      */

      this.backorderable = undefined;
      /**
      * The inventory id.
      * @member {String} id
      */

      this.id = id;
      /**
      * A flag indicating the date when the product will be in stock.
      * @member {Date} in_stock_date
      */

      this.in_stock_date = undefined;
      /**
      * A flag indicating whether at least one of products is available to sell.
      * @member {Boolean} orderable
      */

      this.orderable = undefined;
      /**
      * A flag indicating whether the product is pre orderable.
      * @member {Boolean} preorderable
      */

      this.preorderable = undefined;
      /**
      * The stock level of the product. If it is infinity, the return value is 999999. The value can be overwritten by the  OCAPI setting 'product.inventory.stock_level.max_threshold'.
      * @member {Number} stock_level
      */

      this.stock_level = undefined;
    }
    /**
    * Constructs a <code>Inventory</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Inventory} obj Optional instance to populate.
    * @return {module:models/Inventory} The populated <code>Inventory</code> instance.
    */


    _createClass(Inventory, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Inventory();

          if (data.hasOwnProperty('ats')) {
            obj['ats'] = ApiClient.convertToType(data['ats'], 'Number');
          }

          if (data.hasOwnProperty('backorderable')) {
            obj['backorderable'] = ApiClient.convertToType(data['backorderable'], 'Boolean');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('in_stock_date')) {
            obj['in_stock_date'] = ApiClient.convertToType(data['in_stock_date'], 'Date');
          }

          if (data.hasOwnProperty('orderable')) {
            obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
          }

          if (data.hasOwnProperty('preorderable')) {
            obj['preorderable'] = ApiClient.convertToType(data['preorderable'], 'Boolean');
          }

          if (data.hasOwnProperty('stock_level')) {
            obj['stock_level'] = ApiClient.convertToType(data['stock_level'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return Inventory;
  }();

  /**
  * The Master model module.
  * @module models/Master
  * @version 17.8
  */

  var Master =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Master</code>.
    * @alias module:models/Master
    * @class
    * @param link {String}
    * @param masterId {String}
    */
    function Master(link, masterId) {
      _classCallCheck(this, Master);

      /**
      * @member {String} link
      */
      this.link = link;
      /**
      * @member {String} master_id
      */

      this.master_id = masterId;
      /**
      * @member {Boolean} orderable
      */

      this.orderable = undefined;
      /**
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * @member {Number} price_max
      */

      this.price_max = undefined;
      /**
      * @member {Object.<String, Number>} prices
      */

      this.prices = undefined;
    }
    /**
    * Constructs a <code>Master</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Master} obj Optional instance to populate.
    * @return {module:models/Master} The populated <code>Master</code> instance.
    */


    _createClass(Master, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Master();

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('master_id')) {
            obj['master_id'] = ApiClient.convertToType(data['master_id'], 'String');
          }

          if (data.hasOwnProperty('orderable')) {
            obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('price_max')) {
            obj['price_max'] = ApiClient.convertToType(data['price_max'], 'Number');
          }

          if (data.hasOwnProperty('prices')) {
            obj['prices'] = ApiClient.convertToType(data['prices'], {
              String: 'Number'
            });
          }
        }

        return obj;
      }
    }]);

    return Master;
  }();

  /**
  * The OptionValue model module.
  * @module models/OptionValue
  * @version 17.8
  */

  var OptionValue =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>OptionValue</code>.
    * Document representing an option value.
    * @alias module:models/OptionValue
    * @class
    * @param id {String} The id of the option value.
    */
    function OptionValue(id) {
      _classCallCheck(this, OptionValue);

      /**
      * A flag indicating whether this option value is the default one.
      * @member {Boolean} default
      */
      this["default"] = undefined;
      /**
      * The id of the option value.
      * @member {String} id
      */

      this.id = id;
      /**
      * The localized name of the option value.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The effective price of this option value.
      * @member {Number} price
      */

      this.price = undefined;
    }
    /**
    * Constructs a <code>OptionValue</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/OptionValue} obj Optional instance to populate.
    * @return {module:models/OptionValue} The populated <code>OptionValue</code> instance.
    */


    _createClass(OptionValue, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new OptionValue();

          if (data.hasOwnProperty('default')) {
            obj['default'] = ApiClient.convertToType(data['default'], 'Boolean');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return OptionValue;
  }();

  /**
  * The Option model module.
  * @module models/Option
  * @version 17.8
  */

  var Option =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Option</code>.
    * Document representing a product option.
    * @alias module:models/Option
    * @class
    * @param id {String} The id of the option.
    */
    function Option(id) {
      _classCallCheck(this, Option);

      /**
      * The localized description of the option.
      * @member {String} description
      */
      this.description = undefined;
      /**
      * The id of the option.
      * @member {String} id
      */

      this.id = id;
      /**
      * The URL to the option image.
      * @member {String} image
      */

      this.image = undefined;
      /**
      * The localized name of the option.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The array of option values. This array can be empty.
      * @member {Array.<module:models/OptionValue>} values
      */

      this.values = undefined;
    }
    /**
    * Constructs a <code>Option</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Option} obj Optional instance to populate.
    * @return {module:models/Option} The populated <code>Option</code> instance.
    */


    _createClass(Option, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Option();

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = ApiClient.convertToType(data['image'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('values')) {
            obj['values'] = ApiClient.convertToType(data['values'], [OptionValue]);
          }
        }

        return obj;
      }
    }]);

    return Option;
  }();

  /**
  * The ProductLink model module.
  * @module models/ProductLink
  * @version 17.8
  */

  var ProductLink =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductLink</code>.
    * Document representing a link between two products. It contains the id of the source and target products, the type of  product link, and URLs to retrieve product data.
    * @alias module:models/ProductLink
    * @class
    */
    function ProductLink() {
      _classCallCheck(this, ProductLink);

      /**
      * The semantic id of the product from which this product link is coming.
      * @member {String} source_product_id
      */
      this.source_product_id = undefined;
      /**
      * The URL addressing the product from which this product link is coming.
      * @member {String} source_product_link
      */

      this.source_product_link = undefined;
      /**
      * The semantic id of the product to which this product link is pointing.
      * @member {String} target_product_id
      */

      this.target_product_id = undefined;
      /**
      * The URL addressing the product to which this product link is pointing.
      * @member {String} target_product_link
      */

      this.target_product_link = undefined;
      /**
      * The type of this product link.
      * @member {module:models/ProductLink.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>ProductLink</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductLink} obj Optional instance to populate.
    * @return {module:models/ProductLink} The populated <code>ProductLink</code> instance.
    */


    _createClass(ProductLink, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductLink();

          if (data.hasOwnProperty('source_product_id')) {
            obj['source_product_id'] = ApiClient.convertToType(data['source_product_id'], 'String');
          }

          if (data.hasOwnProperty('source_product_link')) {
            obj['source_product_link'] = ApiClient.convertToType(data['source_product_link'], 'String');
          }

          if (data.hasOwnProperty('target_product_id')) {
            obj['target_product_id'] = ApiClient.convertToType(data['target_product_id'], 'String');
          }

          if (data.hasOwnProperty('target_product_link')) {
            obj['target_product_link'] = ApiClient.convertToType(data['target_product_link'], 'String');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductLink;
  }();
  ProductLink.TypeEnum = {
    /**
     * value: "cross_sell"
     * @const
     */
    cross_sell: 'cross_sell',

    /**
     * value: "replacement"
     * @const
     */
    replacement: 'replacement',

    /**
     * value: "up_sell"
     * @const
     */
    up_sell: 'up_sell',

    /**
     * value: "accessory"
     * @const
     */
    accessory: 'accessory',

    /**
     * value: "newer_version"
     * @const
     */
    newer_version: 'newer_version',

    /**
     * value: "alt_orderunit"
     * @const
     */
    alt_orderunit: 'alt_orderunit',

    /**
     * value: "spare_part"
     * @const
     */
    spare_part: 'spare_part',

    /**
     * value: "other"
     * @const
     */
    other: 'other'
  };

  /**
  * The ProductPromotion model module.
  * @module models/ProductPromotion
  * @version 17.8
  */

  var ProductPromotion =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductPromotion</code>.
    * Document representing a product promotion.
    * @alias module:models/ProductPromotion
    * @class
    */
    function ProductPromotion() {
      _classCallCheck(this, ProductPromotion);

      /**
      * The localized call-out message of the promotion.
      * @member {String} callout_msg
      */
      this.callout_msg = undefined;
      /**
      * The URL addressing the promotion.
      * @member {String} link
      */

      this.link = undefined;
      /**
      * The unique id of the promotion.
      * @member {String} promotion_id
      */

      this.promotion_id = undefined;
      /**
      * The promotional price for this product.
      * @member {Number} promotional_price
      */

      this.promotional_price = undefined;
    }
    /**
    * Constructs a <code>ProductPromotion</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductPromotion} obj Optional instance to populate.
    * @return {module:models/ProductPromotion} The populated <code>ProductPromotion</code> instance.
    */


    _createClass(ProductPromotion, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductPromotion();

          if (data.hasOwnProperty('callout_msg')) {
            obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String');
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('promotion_id')) {
            obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
          }

          if (data.hasOwnProperty('promotional_price')) {
            obj['promotional_price'] = ApiClient.convertToType(data['promotional_price'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return ProductPromotion;
  }();

  /**
  * The ProductType model module.
  * @module models/ProductType
  * @version 17.8
  */

  var ProductType =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductType</code>.
    * Document representing a product type.
    * @alias module:models/ProductType
    * @class
    */
    function ProductType() {
      _classCallCheck(this, ProductType);

      /**
      * A flag indicating whether the product is a bundle.
      * @member {Boolean} bundle
      */
      this.bundle = undefined;
      /**
      * A flag indicating whether the product is a standard item.
      * @member {Boolean} item
      */

      this.item = undefined;
      /**
      * A flag indicating whether the product is a master.
      * @member {Boolean} master
      */

      this.master = undefined;
      /**
      * A flag indicating whether the product is an option.
      * @member {Boolean} option
      */

      this.option = undefined;
      /**
      * A flag indicating whether the product is a set.
      * @member {Boolean} set
      */

      this.set = undefined;
      /**
      * A flag indicating whether the product is a variant.
      * @member {Boolean} variant
      */

      this.variant = undefined;
      /**
      * A flag indicating whether the product is a variation group.
      * @member {Boolean} variation_group
      */

      this.variation_group = undefined;
    }
    /**
    * Constructs a <code>ProductType</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductType} obj Optional instance to populate.
    * @return {module:models/ProductType} The populated <code>ProductType</code> instance.
    */


    _createClass(ProductType, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductType();

          if (data.hasOwnProperty('bundle')) {
            obj['bundle'] = ApiClient.convertToType(data['bundle'], 'Boolean');
          }

          if (data.hasOwnProperty('item')) {
            obj['item'] = ApiClient.convertToType(data['item'], 'Boolean');
          }

          if (data.hasOwnProperty('master')) {
            obj['master'] = ApiClient.convertToType(data['master'], 'Boolean');
          }

          if (data.hasOwnProperty('option')) {
            obj['option'] = ApiClient.convertToType(data['option'], 'Boolean');
          }

          if (data.hasOwnProperty('set')) {
            obj['set'] = ApiClient.convertToType(data['set'], 'Boolean');
          }

          if (data.hasOwnProperty('variant')) {
            obj['variant'] = ApiClient.convertToType(data['variant'], 'Boolean');
          }

          if (data.hasOwnProperty('variation_group')) {
            obj['variation_group'] = ApiClient.convertToType(data['variation_group'], 'Boolean');
          }
        }

        return obj;
      }
    }]);

    return ProductType;
  }();

  /**
  * The RecommendationType model module.
  * @module models/RecommendationType
  * @version 17.8
  */

  var RecommendationType =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>RecommendationType</code>.
    * Document representing a recommendation type.
    * @alias module:models/RecommendationType
    * @class
    */
    function RecommendationType() {
      _classCallCheck(this, RecommendationType);

      /**
      * The localized display value of the recommendation type.
      * @member {String} display_value
      */
      this.display_value = undefined;
      /**
      * The value of the recommendation type.
      * @member {Number} value
      */

      this.value = undefined;
    }
    /**
    * Constructs a <code>RecommendationType</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/RecommendationType} obj Optional instance to populate.
    * @return {module:models/RecommendationType} The populated <code>RecommendationType</code> instance.
    */


    _createClass(RecommendationType, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new RecommendationType();

          if (data.hasOwnProperty('display_value')) {
            obj['display_value'] = ApiClient.convertToType(data['display_value'], 'String');
          }

          if (data.hasOwnProperty('value')) {
            obj['value'] = ApiClient.convertToType(data['value'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return RecommendationType;
  }();

  /**
  * The Recommendation model module.
  * @module models/Recommendation
  * @version 17.8
  */

  var Recommendation =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Recommendation</code>.
    * Document representing a product recommendation.
    * @alias module:models/Recommendation
    * @class
    */
    function Recommendation() {
      _classCallCheck(this, Recommendation);

      /**
      * The localized callout message of the recommendation.
      * @member {String} callout_msg
      */
      this.callout_msg = undefined;
      /**
      * The image of the recommendation.
      * @member {module:models/Image} image
      */

      this.image = undefined;
      /**
      * The localized long description of the recommendation.
      * @member {String} long_description
      */

      this.long_description = undefined;
      /**
      * The localized name of the recommendation.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The recommendation type of the recommendation.
      * @member {module:models/RecommendationType} recommendation_type
      */

      this.recommendation_type = undefined;
      /**
      * The recommended item id of the recommendation.
      * @member {String} recommended_item_id
      */

      this.recommended_item_id = undefined;
      /**
      * The recommended item link of the recommendation.
      * @member {String} recommended_item_link
      */

      this.recommended_item_link = undefined;
      /**
      * The localized short description of the recommendation.
      * @member {String} short_description
      */

      this.short_description = undefined;
    }
    /**
    * Constructs a <code>Recommendation</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Recommendation} obj Optional instance to populate.
    * @return {module:models/Recommendation} The populated <code>Recommendation</code> instance.
    */


    _createClass(Recommendation, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Recommendation();

          if (data.hasOwnProperty('callout_msg')) {
            obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = Image.constructFromObject(data['image']);
          }

          if (data.hasOwnProperty('long_description')) {
            obj['long_description'] = ApiClient.convertToType(data['long_description'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('recommendation_type')) {
            obj['recommendation_type'] = RecommendationType.constructFromObject(data['recommendation_type']);
          }

          if (data.hasOwnProperty('recommended_item_id')) {
            obj['recommended_item_id'] = ApiClient.convertToType(data['recommended_item_id'], 'String');
          }

          if (data.hasOwnProperty('recommended_item_link')) {
            obj['recommended_item_link'] = ApiClient.convertToType(data['recommended_item_link'], 'String');
          }

          if (data.hasOwnProperty('short_description')) {
            obj['short_description'] = ApiClient.convertToType(data['short_description'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Recommendation;
  }();

  /**
  * The Variant model module.
  * @module models/Variant
  * @version 17.8
  */

  var Variant =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Variant</code>.
    * Document representing a product variation.
    * @alias module:models/Variant
    * @class
    * @param link {String} The URL addressing the product.
    * @param productId {String} The id (SKU) of the variant.
    */
    function Variant(link, productId) {
      _classCallCheck(this, Variant);

      /**
      * The URL addressing the product.
      * @member {String} link
      */
      this.link = link;
      /**
      * A flag indicating whether the variant is orderable.
      * @member {Boolean} orderable
      */

      this.orderable = undefined;
      /**
      * The sales price of the variant.
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * The id (SKU) of the variant.
      * @member {String} product_id
      */

      this.product_id = productId;
      /**
      * The actual variation attribute id - value pairs.
      * @member {Object.<String, String>} variation_values
      */

      this.variation_values = undefined;
    }
    /**
    * Constructs a <code>Variant</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Variant} obj Optional instance to populate.
    * @return {module:models/Variant} The populated <code>Variant</code> instance.
    */


    _createClass(Variant, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Variant();

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('orderable')) {
            obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('product_id')) {
            obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
          }

          if (data.hasOwnProperty('variation_values')) {
            obj['variation_values'] = ApiClient.convertToType(data['variation_values'], {
              String: 'String'
            });
          }
        }

        return obj;
      }
    }]);

    return Variant;
  }();

  /**
  * The VariationGroup model module.
  * @module models/VariationGroup
  * @version 17.8
  */

  var VariationGroup =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>VariationGroup</code>.
    * Document representing a variation group.
    * @alias module:models/VariationGroup
    * @class
    */
    function VariationGroup() {
      _classCallCheck(this, VariationGroup);

      /**
      * The URL addressing the product.
      * @member {String} link
      */
      this.link = undefined;
      /**
      * A flag indicating whether the variation group is orderable.
      * @member {Boolean} orderable
      */

      this.orderable = undefined;
      /**
      * The sales price of the variation group.
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * The id (SKU) of the variation group.
      * @member {String} product_id
      */

      this.product_id = undefined;
      /**
      * The actual variation attribute id - value pairs.
      * @member {Object.<String, String>} variation_values
      */

      this.variation_values = undefined;
    }
    /**
    * Constructs a <code>VariationGroup</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/VariationGroup} obj Optional instance to populate.
    * @return {module:models/VariationGroup} The populated <code>VariationGroup</code> instance.
    */


    _createClass(VariationGroup, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new VariationGroup();

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('orderable')) {
            obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('product_id')) {
            obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
          }

          if (data.hasOwnProperty('variation_values')) {
            obj['variation_values'] = ApiClient.convertToType(data['variation_values'], {
              String: 'String'
            });
          }
        }

        return obj;
      }
    }]);

    return VariationGroup;
  }();

  /**
  * The Product model module.
  * @module models/Product
  * @version 17.8
  */

  var Product =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Product</code>.
    * Document representing a product.
    * @alias module:models/Product
    * @class
    * @param id {String} The id (SKU) of the product.
    */
    function Product(id) {
      _classCallCheck(this, Product);

      /**
      * The product's brand.
      * @member {String} brand
      */
      this.brand = undefined;
      /**
      * The array of all bundled products of this product.
      * @member {Array.<module:models/BundledProduct>} bundled_products
      */

      this.bundled_products = undefined;
      /**
      * The ISO 4217 mnemonic code of the currency.
      * @member {String} currency
      */

      this.currency = undefined;
      /**
      * The European Article Number.
      * @member {String} ean
      */

      this.ean = undefined;
      /**
      * @member {Number} fetch_date
      */

      this.fetch_date = undefined;
      /**
      * The id (SKU) of the product.
      * @member {String} id
      */

      this.id = id;
      /**
      * The array of product image groups.
      * @member {Array.<module:models/ImageGroup>} image_groups
      */

      this.image_groups = undefined;
      /**
      * The array of product inventories explicitly requested via 'inventory_ids' query parameter. This property  is only returned in context of the 'availability' expansion.
      * @member {Array.<module:models/Inventory>} inventories
      */

      this.inventories = undefined;
      /**
      * The site default inventory information. This property is only  returned in context of the 'availability' expansion.
      * @member {module:models/Inventory} inventory
      */

      this.inventory = undefined;
      /**
      * The localized product long description.
      * @member {String} long_description
      */

      this.long_description = undefined;
      /**
      * The products manufacturer name.
      * @member {String} manufacturer_name
      */

      this.manufacturer_name = undefined;
      /**
      * The products manufacturer sku.
      * @member {String} manufacturer_sku
      */

      this.manufacturer_sku = undefined;
      /**
      * The master product information. Only for types master, variation group and variant.
      * @member {module:models/Master} master
      */

      this.master = undefined;
      /**
      * The minimum order quantity for this product.
      * @member {Number} min_order_quantity
      */

      this.min_order_quantity = undefined;
      /**
      * The localized product name.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The array of product options. This array can be empty. Only for type option.
      * @member {Array.<module:models/Option>} options
      */

      this.options = undefined;
      /**
      * The localized products page description.
      * @member {String} page_description
      */

      this.page_description = undefined;
      /**
      * The localized products page description.
      * @member {String} page_keywords
      */

      this.page_keywords = undefined;
      /**
      * The localized products page title.
      * @member {String} page_title
      */

      this.page_title = undefined;
      /**
      * The sales price of the product. In case of complex products like master or set this is the minimum price of  related child products.
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * The maximum sales of related child products in case of complex products like master or set.
      * @member {Number} price_max
      */

      this.price_max = undefined;
      /**
      * The prices map with price book ids and their values.
      * @member {Object.<String, Number>} prices
      */

      this.prices = undefined;
      /**
      * The id of the products primary category.
      * @member {String} primary_category_id
      */

      this.primary_category_id = undefined;
      /**
      * The array of source and target products links information.
      * @member {Array.<module:models/ProductLink>} product_links
      */

      this.product_links = undefined;
      /**
      * The array of active customer product promotions for this product. This array can be empty.  Coupon promotions are not returned in this array.
      * @member {Array.<module:models/ProductPromotion>} product_promotions
      */

      this.product_promotions = undefined;
      /**
      * Returns a list of recommendations.
      * @member {Array.<module:models/Recommendation>} recommendations
      */

      this.recommendations = undefined;
      /**
      * The array of set products of this product.
      * @member {Array.<module:models/Product>} set_products
      */

      this.set_products = undefined;
      /**
      * The localized product short description.
      * @member {String} short_description
      */

      this.short_description = undefined;
      /**
      * The steps in which the order amount of the product can be  increased.
      * @member {Number} step_quantity
      */

      this.step_quantity = undefined;
      /**
      * The product type information. Can be one or multiple of the following values: item,master,variation_group,variant,bundle,set.
      * @member {module:models/ProductType} type
      */

      this.type = undefined;
      /**
      * The sales unit of the product.
      * @member {String} unit
      */

      this.unit = undefined;
      /**
      * The Universal Product Code.
      * @member {String} upc
      */

      this.upc = undefined;
      /**
      * The array of actual variants. This array can be empty. Only for types master, variation group and variant.
      * @member {Array.<module:models/Variant>} variants
      */

      this.variants = undefined;
      /**
      * Sorted array of variation attributes information. This array can be empty. Only for types master,  variation group and variant.
      * @member {Array.<module:models/VariationAttribute>} variation_attributes
      */

      this.variation_attributes = undefined;
      /**
      * The array of actual variation groups. This array can be empty. Only for types master, variation group and variant.
      * @member {Array.<module:models/VariationGroup>} variation_groups
      */

      this.variation_groups = undefined;
      /**
      * The actual variation attribute id - value pairs. Only for type variant and  variation group.
      * @member {Object.<String, String>} variation_values
      */

      this.variation_values = undefined;
    }
    /**
    * Constructs a <code>Product</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Product} obj Optional instance to populate.
    * @return {module:models/Product} The populated <code>Product</code> instance.
    */


    _createClass(Product, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Product();

          if (data.hasOwnProperty('brand')) {
            obj['brand'] = ApiClient.convertToType(data['brand'], 'String');
          }

          if (data.hasOwnProperty('bundled_products')) {
            obj['bundled_products'] = ApiClient.convertToType(data['bundled_products'], [BundledProduct]);
          }

          if (data.hasOwnProperty('currency')) {
            obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
          }

          if (data.hasOwnProperty('ean')) {
            obj['ean'] = ApiClient.convertToType(data['ean'], 'String');
          }

          if (data.hasOwnProperty('fetch_date')) {
            obj['fetch_date'] = ApiClient.convertToType(data['fetch_date'], 'Number');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('image_groups')) {
            obj['image_groups'] = ApiClient.convertToType(data['image_groups'], [ImageGroup]);
          }

          if (data.hasOwnProperty('inventories')) {
            obj['inventories'] = ApiClient.convertToType(data['inventories'], [Inventory]);
          }

          if (data.hasOwnProperty('inventory')) {
            obj['inventory'] = Inventory.constructFromObject(data['inventory']);
          }

          if (data.hasOwnProperty('long_description')) {
            obj['long_description'] = ApiClient.convertToType(data['long_description'], 'String');
          }

          if (data.hasOwnProperty('manufacturer_name')) {
            obj['manufacturer_name'] = ApiClient.convertToType(data['manufacturer_name'], 'String');
          }

          if (data.hasOwnProperty('manufacturer_sku')) {
            obj['manufacturer_sku'] = ApiClient.convertToType(data['manufacturer_sku'], 'String');
          }

          if (data.hasOwnProperty('master')) {
            obj['master'] = Master.constructFromObject(data['master']);
          }

          if (data.hasOwnProperty('min_order_quantity')) {
            obj['min_order_quantity'] = ApiClient.convertToType(data['min_order_quantity'], 'Number');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('options')) {
            obj['options'] = ApiClient.convertToType(data['options'], [Option]);
          }

          if (data.hasOwnProperty('page_description')) {
            obj['page_description'] = ApiClient.convertToType(data['page_description'], 'String');
          }

          if (data.hasOwnProperty('page_keywords')) {
            obj['page_keywords'] = ApiClient.convertToType(data['page_keywords'], 'String');
          }

          if (data.hasOwnProperty('page_title')) {
            obj['page_title'] = ApiClient.convertToType(data['page_title'], 'String');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('price_max')) {
            obj['price_max'] = ApiClient.convertToType(data['price_max'], 'Number');
          }

          if (data.hasOwnProperty('prices')) {
            obj['prices'] = ApiClient.convertToType(data['prices'], {
              String: 'Number'
            });
          }

          if (data.hasOwnProperty('primary_category_id')) {
            obj['primary_category_id'] = ApiClient.convertToType(data['primary_category_id'], 'String');
          }

          if (data.hasOwnProperty('product_links')) {
            obj['product_links'] = ApiClient.convertToType(data['product_links'], [ProductLink]);
          }

          if (data.hasOwnProperty('product_promotions')) {
            obj['product_promotions'] = ApiClient.convertToType(data['product_promotions'], [ProductPromotion]);
          }

          if (data.hasOwnProperty('recommendations')) {
            obj['recommendations'] = ApiClient.convertToType(data['recommendations'], [Recommendation]);
          }

          if (data.hasOwnProperty('set_products')) {
            obj['set_products'] = ApiClient.convertToType(data['set_products'], [Product]);
          }

          if (data.hasOwnProperty('short_description')) {
            obj['short_description'] = ApiClient.convertToType(data['short_description'], 'String');
          }

          if (data.hasOwnProperty('step_quantity')) {
            obj['step_quantity'] = ApiClient.convertToType(data['step_quantity'], 'Number');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ProductType.constructFromObject(data['type']);
          }

          if (data.hasOwnProperty('unit')) {
            obj['unit'] = ApiClient.convertToType(data['unit'], 'String');
          }

          if (data.hasOwnProperty('upc')) {
            obj['upc'] = ApiClient.convertToType(data['upc'], 'String');
          }

          if (data.hasOwnProperty('variants')) {
            obj['variants'] = ApiClient.convertToType(data['variants'], [Variant]);
          }

          if (data.hasOwnProperty('variation_attributes')) {
            obj['variation_attributes'] = ApiClient.convertToType(data['variation_attributes'], [VariationAttribute]);
          }

          if (data.hasOwnProperty('variation_groups')) {
            obj['variation_groups'] = ApiClient.convertToType(data['variation_groups'], [VariationGroup]);
          }

          if (data.hasOwnProperty('variation_values')) {
            obj['variation_values'] = ApiClient.convertToType(data['variation_values'], {
              String: 'String'
            });
          }
        }

        return obj;
      }
    }]);

    return Product;
  }();

  /**
  * The BundledProduct model module.
  * @module models/BundledProduct
  * @version 17.8
  */

  var BundledProduct =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>BundledProduct</code>.
    * Document representing a bundled product within a product bundle.
    * @alias module:models/BundledProduct
    * @class
    */
    function BundledProduct() {
      _classCallCheck(this, BundledProduct);

      /**
      * @member {String} id
      */
      this.id = undefined;
      /**
      * The product being bundled.
      * @member {module:models/Product} product
      */

      this.product = undefined;
      /**
      * For the product being bundled, the quantity added to the bundle.
      * @member {Number} quantity
      */

      this.quantity = undefined;
    }
    /**
    * Constructs a <code>BundledProduct</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/BundledProduct} obj Optional instance to populate.
    * @return {module:models/BundledProduct} The populated <code>BundledProduct</code> instance.
    */


    _createClass(BundledProduct, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new BundledProduct();

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('product')) {
            obj['product'] = Product.constructFromObject(data['product']);
          }

          if (data.hasOwnProperty('quantity')) {
            obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return BundledProduct;
  }();

  /**
  * The Category model module.
  * @module models/Category
  * @version 17.8
  */

  var Category =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Category</code>.
    * Document representing a category.
    * @alias module:models/Category
    * @class
    */
    function Category() {
      _classCallCheck(this, Category);

      /**
      * Array of subcategories. Can be empty.
      * @member {Array.<module:models/Category>} categories
      */
      this.categories = undefined;
      /**
      * The localized description of the category.
      * @member {String} description
      */

      this.description = undefined;
      /**
      * The id of the category.
      * @member {String} id
      */

      this.id = undefined;
      /**
      * The URL to the category image.
      * @member {String} image
      */

      this.image = undefined;
      /**
      * The localized name of the category.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The localized page description of the category.
      * @member {String} page_description
      */

      this.page_description = undefined;
      /**
      * The localized page keywords of the category.
      * @member {String} page_keywords
      */

      this.page_keywords = undefined;
      /**
      * The localized page title of the category.
      * @member {String} page_title
      */

      this.page_title = undefined;
      /**
      * The id of the parent category.
      * @member {String} parent_category_id
      */

      this.parent_category_id = undefined;
      /**
      * The URL to the category thumbnail.
      * @member {String} thumbnail
      */

      this.thumbnail = undefined;
    }
    /**
    * Constructs a <code>Category</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Category} obj Optional instance to populate.
    * @return {module:models/Category} The populated <code>Category</code> instance.
    */


    _createClass(Category, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Category();

          if (data.hasOwnProperty('categories')) {
            obj['categories'] = ApiClient.convertToType(data['categories'], [Category]);
          }

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = ApiClient.convertToType(data['image'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('page_description')) {
            obj['page_description'] = ApiClient.convertToType(data['page_description'], 'String');
          }

          if (data.hasOwnProperty('page_keywords')) {
            obj['page_keywords'] = ApiClient.convertToType(data['page_keywords'], 'String');
          }

          if (data.hasOwnProperty('page_title')) {
            obj['page_title'] = ApiClient.convertToType(data['page_title'], 'String');
          }

          if (data.hasOwnProperty('parent_category_id')) {
            obj['parent_category_id'] = ApiClient.convertToType(data['parent_category_id'], 'String');
          }

          if (data.hasOwnProperty('thumbnail')) {
            obj['thumbnail'] = ApiClient.convertToType(data['thumbnail'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Category;
  }();

  /**
  * The CategoryResult model module.
  * @module models/CategoryResult
  * @version 17.8
  */

  var CategoryResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CategoryResult</code>.
    * Result document containing an array of categories.
    * @alias module:models/CategoryResult
    * @class
    */
    function CategoryResult() {
      _classCallCheck(this, CategoryResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of category documents.
      * @member {Array.<module:models/Category>} data
      */

      this.data = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>CategoryResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CategoryResult} obj Optional instance to populate.
    * @return {module:models/CategoryResult} The populated <code>CategoryResult</code> instance.
    */


    _createClass(CategoryResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CategoryResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [Category]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return CategoryResult;
  }();

  /**
  * The ContentFolder model module.
  * @module models/ContentFolder
  * @version 17.8
  */

  var ContentFolder =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ContentFolder</code>.
    * Document representing a content folder.
    * @alias module:models/ContentFolder
    * @class
    * @param id {String} The id of the content folder.
    */
    function ContentFolder(id) {
      _classCallCheck(this, ContentFolder);

      /**
      * The localized content folder description.
      * @member {String} description
      */
      this.description = undefined;
      /**
      * The array of content subfolders. This array can be empty.
      * @member {Array.<module:models/ContentFolder>} folders
      */

      this.folders = undefined;
      /**
      * The id of the content folder.
      * @member {String} id
      */

      this.id = id;
      /**
      * The localized content folder name.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The localized content folder page description.
      * @member {String} page_description
      */

      this.page_description = undefined;
      /**
      * The localized content folder page description.
      * @member {String} page_keywords
      */

      this.page_keywords = undefined;
      /**
      * The localized content folder page title.
      * @member {String} page_title
      */

      this.page_title = undefined;
      /**
      * The id of the parent content folder.
      * @member {String} parent_folder_id
      */

      this.parent_folder_id = undefined;
    }
    /**
    * Constructs a <code>ContentFolder</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ContentFolder} obj Optional instance to populate.
    * @return {module:models/ContentFolder} The populated <code>ContentFolder</code> instance.
    */


    _createClass(ContentFolder, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ContentFolder();

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('folders')) {
            obj['folders'] = ApiClient.convertToType(data['folders'], [ContentFolder]);
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('page_description')) {
            obj['page_description'] = ApiClient.convertToType(data['page_description'], 'String');
          }

          if (data.hasOwnProperty('page_keywords')) {
            obj['page_keywords'] = ApiClient.convertToType(data['page_keywords'], 'String');
          }

          if (data.hasOwnProperty('page_title')) {
            obj['page_title'] = ApiClient.convertToType(data['page_title'], 'String');
          }

          if (data.hasOwnProperty('parent_folder_id')) {
            obj['parent_folder_id'] = ApiClient.convertToType(data['parent_folder_id'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ContentFolder;
  }();

  /**
  * The ContentFolderResult model module.
  * @module models/ContentFolderResult
  * @version 17.8
  */

  var ContentFolderResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ContentFolderResult</code>.
    * Result document containing an array of content folders.
    * @alias module:models/ContentFolderResult
    * @class
    */
    function ContentFolderResult() {
      _classCallCheck(this, ContentFolderResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of content folder documents.
      * @member {Array.<module:models/ContentFolder>} data
      */

      this.data = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>ContentFolderResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ContentFolderResult} obj Optional instance to populate.
    * @return {module:models/ContentFolderResult} The populated <code>ContentFolderResult</code> instance.
    */


    _createClass(ContentFolderResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ContentFolderResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [ContentFolder]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return ContentFolderResult;
  }();

  /**
  * The Content model module.
  * @module models/Content
  * @version 17.8
  */

  var Content =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Content</code>.
    * Document representing a content asset.
    * @alias module:models/Content
    * @class
    * @param id {String} The id of the content asset.
    */
    function Content(id) {
      _classCallCheck(this, Content);

      /**
      * The localized content asset description.
      * @member {String} description
      */
      this.description = undefined;
      /**
      * The id of the content asset.
      * @member {String} id
      */

      this.id = id;
      /**
      * The localized content asset name.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The localized content asset page description.
      * @member {String} page_description
      */

      this.page_description = undefined;
      /**
      * The localized content asset page description.
      * @member {String} page_keywords
      */

      this.page_keywords = undefined;
      /**
      * The localized content asset page title.
      * @member {String} page_title
      */

      this.page_title = undefined;
    }
    /**
    * Constructs a <code>Content</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Content} obj Optional instance to populate.
    * @return {module:models/Content} The populated <code>Content</code> instance.
    */


    _createClass(Content, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Content();

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('page_description')) {
            obj['page_description'] = ApiClient.convertToType(data['page_description'], 'String');
          }

          if (data.hasOwnProperty('page_keywords')) {
            obj['page_keywords'] = ApiClient.convertToType(data['page_keywords'], 'String');
          }

          if (data.hasOwnProperty('page_title')) {
            obj['page_title'] = ApiClient.convertToType(data['page_title'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Content;
  }();

  /**
  * The ContentResult model module.
  * @module models/ContentResult
  * @version 17.8
  */

  var ContentResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ContentResult</code>.
    * Result document containing an array of content assets.
    * @alias module:models/ContentResult
    * @class
    */
    function ContentResult() {
      _classCallCheck(this, ContentResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of content assets.
      * @member {Array.<module:models/Content>} data
      */

      this.data = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>ContentResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ContentResult} obj Optional instance to populate.
    * @return {module:models/ContentResult} The populated <code>ContentResult</code> instance.
    */


    _createClass(ContentResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ContentResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [Content]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return ContentResult;
  }();

  /**
  * The ContentSearchRefinementValue model module.
  * @module models/ContentSearchRefinementValue
  * @version 17.8
  */

  var ContentSearchRefinementValue =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ContentSearchRefinementValue</code>.
    * Document representing a search refinement value.
    * @alias module:models/ContentSearchRefinementValue
    * @class
    */
    function ContentSearchRefinementValue() {
      _classCallCheck(this, ContentSearchRefinementValue);

      /**
      * The localized description of the refinement value.
      * @member {String} description
      */
      this.description = undefined;
      /**
      * The number of search hits (0 or more) when selecting the refinement value.
      * @member {Number} hit_count
      */

      this.hit_count = undefined;
      /**
      * The localized label of the refinement value.
      * @member {String} label
      */

      this.label = undefined;
      /**
      * The optional presentation id associated with the refinement value.  The presentation id can be used, for example, to associate an id with  an HTML widget.
      * @member {String} presentation_id
      */

      this.presentation_id = undefined;
      /**
      * The refinement value. In the case of an attribute refinement, this is the bucket,  the attribute value, or a value range. In the case of a content folder refinement,  this is the folder id.
      * @member {String} value
      */

      this.value = undefined;
      /**
      * The array of hierarchical refinement values. This array can be empty.
      * @member {Array.<module:models/ContentSearchRefinementValue>} values
      */

      this.values = undefined;
    }
    /**
    * Constructs a <code>ContentSearchRefinementValue</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ContentSearchRefinementValue} obj Optional instance to populate.
    * @return {module:models/ContentSearchRefinementValue} The populated <code>ContentSearchRefinementValue</code> instance.
    */


    _createClass(ContentSearchRefinementValue, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ContentSearchRefinementValue();

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('hit_count')) {
            obj['hit_count'] = ApiClient.convertToType(data['hit_count'], 'Number');
          }

          if (data.hasOwnProperty('label')) {
            obj['label'] = ApiClient.convertToType(data['label'], 'String');
          }

          if (data.hasOwnProperty('presentation_id')) {
            obj['presentation_id'] = ApiClient.convertToType(data['presentation_id'], 'String');
          }

          if (data.hasOwnProperty('value')) {
            obj['value'] = ApiClient.convertToType(data['value'], 'String');
          }

          if (data.hasOwnProperty('values')) {
            obj['values'] = ApiClient.convertToType(data['values'], [ContentSearchRefinementValue]);
          }
        }

        return obj;
      }
    }]);

    return ContentSearchRefinementValue;
  }();

  /**
  * The ContentSearchRefinement model module.
  * @module models/ContentSearchRefinement
  * @version 17.8
  */

  var ContentSearchRefinement =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ContentSearchRefinement</code>.
    * Document representing a search refinement attribute.
    * @alias module:models/ContentSearchRefinement
    * @class
    * @param attributeId {String} The id of the search refinement attribute. In the case of an attribute refinement, this is the  attribute id. Custom attributes are marked by the prefix \"c_\".
    */
    function ContentSearchRefinement(attributeId) {
      _classCallCheck(this, ContentSearchRefinement);

      /**
      * The id of the search refinement attribute. In the case of an attribute refinement, this is the  attribute id. Custom attributes are marked by the prefix \"c_\".
      * @member {String} attribute_id
      */
      this.attribute_id = attributeId;
      /**
      * The localized label of the refinement.
      * @member {String} label
      */

      this.label = undefined;
      /**
      * The sorted array of refinement values. The array can be empty.
      * @member {Array.<module:models/ContentSearchRefinementValue>} values
      */

      this.values = undefined;
    }
    /**
    * Constructs a <code>ContentSearchRefinement</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ContentSearchRefinement} obj Optional instance to populate.
    * @return {module:models/ContentSearchRefinement} The populated <code>ContentSearchRefinement</code> instance.
    */


    _createClass(ContentSearchRefinement, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ContentSearchRefinement();

          if (data.hasOwnProperty('attribute_id')) {
            obj['attribute_id'] = ApiClient.convertToType(data['attribute_id'], 'String');
          }

          if (data.hasOwnProperty('label')) {
            obj['label'] = ApiClient.convertToType(data['label'], 'String');
          }

          if (data.hasOwnProperty('values')) {
            obj['values'] = ApiClient.convertToType(data['values'], [ContentSearchRefinementValue]);
          }
        }

        return obj;
      }
    }]);

    return ContentSearchRefinement;
  }();

  /**
  * The ContentSearchResult model module.
  * @module models/ContentSearchResult
  * @version 17.8
  */

  var ContentSearchResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ContentSearchResult</code>.
    * Document representing a content search result.
    * @alias module:models/ContentSearchResult
    * @class
    */
    function ContentSearchResult() {
      _classCallCheck(this, ContentSearchResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * @member {Array.<Object>} data
      */

      this.data = undefined;
      /**
      * The sorted array of search hits. Can be empty.
      * @member {Array.<module:models/Content>} hits
      */

      this.hits = undefined;
      /**
      * The URL of the next result page.
      * @member {String} next
      */

      this.next = undefined;
      /**
      * The URL of the previous result page.
      * @member {String} previous
      */

      this.previous = undefined;
      /**
      * The query String that was searched for.
      * @member {String} query
      */

      this.query = undefined;
      /**
      * The sorted array of search refinements. Can be empty.
      * @member {Array.<module:models/ContentSearchRefinement>} refinements
      */

      this.refinements = undefined;
      /**
      * Map of selected refinement attribute id/value(s) pairs. The sorting order is the same like in request URL.
      * @member {Object.<String, String>} selected_refinements
      */

      this.selected_refinements = undefined;
      /**
      * The zero-based index of the first search hit to include in the result.
      * @member {Number} start
      */

      this.start = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>ContentSearchResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ContentSearchResult} obj Optional instance to populate.
    * @return {module:models/ContentSearchResult} The populated <code>ContentSearchResult</code> instance.
    */


    _createClass(ContentSearchResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ContentSearchResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [Object]);
          }

          if (data.hasOwnProperty('hits')) {
            obj['hits'] = ApiClient.convertToType(data['hits'], [Content]);
          }

          if (data.hasOwnProperty('next')) {
            obj['next'] = ApiClient.convertToType(data['next'], 'String');
          }

          if (data.hasOwnProperty('previous')) {
            obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
          }

          if (data.hasOwnProperty('query')) {
            obj['query'] = ApiClient.convertToType(data['query'], 'String');
          }

          if (data.hasOwnProperty('refinements')) {
            obj['refinements'] = ApiClient.convertToType(data['refinements'], [ContentSearchRefinement]);
          }

          if (data.hasOwnProperty('selected_refinements')) {
            obj['selected_refinements'] = ApiClient.convertToType(data['selected_refinements'], {
              String: 'String'
            });
          }

          if (data.hasOwnProperty('start')) {
            obj['start'] = ApiClient.convertToType(data['start'], 'Number');
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return ContentSearchResult;
  }();

  /**
  * The CustomObject model module.
  * @module models/CustomObject
  * @version 17.8
  */

  var CustomObject =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomObject</code>.
    * Document representing a custom object that contains all defined custom attributes for its  object type.
    * @alias module:models/CustomObject
    * @class
    */
    function CustomObject() {
      _classCallCheck(this, CustomObject);

      /**
      * The name of the key property for the custom object.
      * @member {String} key_property
      */
      this.key_property = undefined;
      /**
      * The id of the custom object when the type of the key is Integer.
      * @member {Number} key_value_integer
      */

      this.key_value_integer = undefined;
      /**
      * The id of the custom object when the type of the key is String.
      * @member {String} key_value_string
      */

      this.key_value_string = undefined;
      /**
      * The id of the object type.
      * @member {String} object_type
      */

      this.object_type = undefined;
    }
    /**
    * Constructs a <code>CustomObject</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomObject} obj Optional instance to populate.
    * @return {module:models/CustomObject} The populated <code>CustomObject</code> instance.
    */


    _createClass(CustomObject, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomObject();

          if (data.hasOwnProperty('key_property')) {
            obj['key_property'] = ApiClient.convertToType(data['key_property'], 'String');
          }

          if (data.hasOwnProperty('key_value_integer')) {
            obj['key_value_integer'] = ApiClient.convertToType(data['key_value_integer'], 'Number');
          }

          if (data.hasOwnProperty('key_value_string')) {
            obj['key_value_string'] = ApiClient.convertToType(data['key_value_string'], 'String');
          }

          if (data.hasOwnProperty('object_type')) {
            obj['object_type'] = ApiClient.convertToType(data['object_type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomObject;
  }();

  /**
  * The CustomerAddressLink model module.
  * @module models/CustomerAddressLink
  * @version 17.8
  */

  var CustomerAddressLink =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerAddressLink</code>.
    * * Result document of product list addresses.
    * @alias module:models/CustomerAddressLink
    * @class
    */
    function CustomerAddressLink() {
      _classCallCheck(this, CustomerAddressLink);

      /**
      * The id of the address.
      * @member {String} address_id
      */
      this.address_id = undefined;
      /**
      * The target of the link.
      * @member {String} link
      */

      this.link = undefined;
      /**
      * The link title.
      * @member {String} title
      */

      this.title = undefined;
    }
    /**
    * Constructs a <code>CustomerAddressLink</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerAddressLink} obj Optional instance to populate.
    * @return {module:models/CustomerAddressLink} The populated <code>CustomerAddressLink</code> instance.
    */


    _createClass(CustomerAddressLink, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerAddressLink();

          if (data.hasOwnProperty('address_id')) {
            obj['address_id'] = ApiClient.convertToType(data['address_id'], 'String');
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerAddressLink;
  }();

  /**
  * The CustomerAddress model module.
  * @module models/CustomerAddress
  * @version 17.8
  */

  var CustomerAddress =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerAddress</code>.
    * Document representing a customer address.
    * @alias module:models/CustomerAddress
    * @class
    */
    function CustomerAddress() {
      _classCallCheck(this, CustomerAddress);

      /**
      * The first address.
      * @member {String} address1
      */
      this.address1 = undefined;
      /**
      * The second address.
      * @member {String} address2
      */

      this.address2 = undefined;
      /**
      * The id of the address as specified by account owner.
      * @member {String} address_id
      */

      this.address_id = undefined;
      /**
      * The city.
      * @member {String} city
      */

      this.city = undefined;
      /**
      * The company name.
      * @member {String} company_name
      */

      this.company_name = undefined;
      /**
      * The two-letter ISO 3166-1 (Alpha-2) country code.
      * @member {module:models/CustomerAddress.CountryCodeEnum} country_code
      */

      this.country_code = undefined;
      /**
      * Returns the value of attribute 'creationDate'.
      * @member {Date} creation_date
      */

      this.creation_date = undefined;
      /**
      * The first name.
      * @member {String} first_name
      */

      this.first_name = undefined;
      /**
      * The full name.
      * @member {String} full_name
      */

      this.full_name = undefined;
      /**
      * The job title.
      * @member {String} job_title
      */

      this.job_title = undefined;
      /**
      * Returns the value of attribute 'lastModified'.
      * @member {Date} last_modified
      */

      this.last_modified = undefined;
      /**
      * The last name.
      * @member {String} last_name
      */

      this.last_name = undefined;
      /**
      * The phone number.
      * @member {String} phone
      */

      this.phone = undefined;
      /**
      * The post box.
      * @member {String} post_box
      */

      this.post_box = undefined;
      /**
      * The postal code.
      * @member {String} postal_code
      */

      this.postal_code = undefined;
      /**
      * The preferred attribute.
      * @member {Boolean} preferred
      */

      this.preferred = undefined;
      /**
      * The salutation.
      * @member {String} salutation
      */

      this.salutation = undefined;
      /**
      * The second name.
      * @member {String} second_name
      */

      this.second_name = undefined;
      /**
      * The state code.
      * @member {String} state_code
      */

      this.state_code = undefined;
      /**
      * The suffix.
      * @member {String} suffix
      */

      this.suffix = undefined;
      /**
      * The suite.
      * @member {String} suite
      */

      this.suite = undefined;
      /**
      * The title.
      * @member {String} title
      */

      this.title = undefined;
    }
    /**
    * Constructs a <code>CustomerAddress</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerAddress} obj Optional instance to populate.
    * @return {module:models/CustomerAddress} The populated <code>CustomerAddress</code> instance.
    */


    _createClass(CustomerAddress, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerAddress();

          if (data.hasOwnProperty('address1')) {
            obj['address1'] = ApiClient.convertToType(data['address1'], 'String');
          }

          if (data.hasOwnProperty('address2')) {
            obj['address2'] = ApiClient.convertToType(data['address2'], 'String');
          }

          if (data.hasOwnProperty('address_id')) {
            obj['address_id'] = ApiClient.convertToType(data['address_id'], 'String');
          }

          if (data.hasOwnProperty('city')) {
            obj['city'] = ApiClient.convertToType(data['city'], 'String');
          }

          if (data.hasOwnProperty('company_name')) {
            obj['company_name'] = ApiClient.convertToType(data['company_name'], 'String');
          }

          if (data.hasOwnProperty('country_code')) {
            obj['country_code'] = ApiClient.convertToType(data['country_code'], 'String');
          }

          if (data.hasOwnProperty('creation_date')) {
            obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
          }

          if (data.hasOwnProperty('first_name')) {
            obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
          }

          if (data.hasOwnProperty('full_name')) {
            obj['full_name'] = ApiClient.convertToType(data['full_name'], 'String');
          }

          if (data.hasOwnProperty('job_title')) {
            obj['job_title'] = ApiClient.convertToType(data['job_title'], 'String');
          }

          if (data.hasOwnProperty('last_modified')) {
            obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
          }

          if (data.hasOwnProperty('last_name')) {
            obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
          }

          if (data.hasOwnProperty('phone')) {
            obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
          }

          if (data.hasOwnProperty('post_box')) {
            obj['post_box'] = ApiClient.convertToType(data['post_box'], 'String');
          }

          if (data.hasOwnProperty('postal_code')) {
            obj['postal_code'] = ApiClient.convertToType(data['postal_code'], 'String');
          }

          if (data.hasOwnProperty('preferred')) {
            obj['preferred'] = ApiClient.convertToType(data['preferred'], 'Boolean');
          }

          if (data.hasOwnProperty('salutation')) {
            obj['salutation'] = ApiClient.convertToType(data['salutation'], 'String');
          }

          if (data.hasOwnProperty('second_name')) {
            obj['second_name'] = ApiClient.convertToType(data['second_name'], 'String');
          }

          if (data.hasOwnProperty('state_code')) {
            obj['state_code'] = ApiClient.convertToType(data['state_code'], 'String');
          }

          if (data.hasOwnProperty('suffix')) {
            obj['suffix'] = ApiClient.convertToType(data['suffix'], 'String');
          }

          if (data.hasOwnProperty('suite')) {
            obj['suite'] = ApiClient.convertToType(data['suite'], 'String');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerAddress;
  }();
  CustomerAddress.CountryCodeEnum = {
    /**
     * value: "US"
     * @const
     */
    US: 'US',

    /**
     * value: "FR"
     * @const
     */
    FR: 'FR',

    /**
     * value: "IT"
     * @const
     */
    IT: 'IT',

    /**
     * value: "JP"
     * @const
     */
    JP: 'JP',

    /**
     * value: "CN"
     * @const
     */
    CN: 'CN',

    /**
     * value: "GB"
     * @const
     */
    GB: 'GB'
  };

  /**
  * The CustomerAddressResult model module.
  * @module models/CustomerAddressResult
  * @version 17.8
  */

  var CustomerAddressResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerAddressResult</code>.
    * Result document containing an array of customer addresses.
    * @alias module:models/CustomerAddressResult
    * @class
    */
    function CustomerAddressResult() {
      _classCallCheck(this, CustomerAddressResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of customer address documents.
      * @member {Array.<module:models/CustomerAddress>} data
      */

      this.data = undefined;
      /**
      * The URL of the next result page.
      * @member {String} next
      */

      this.next = undefined;
      /**
      * The URL of the previous result page.
      * @member {String} previous
      */

      this.previous = undefined;
      /**
      *
      * @member {String} select
      */

      this.select = undefined;
      /**
      * The zero-based index of the first search hit to include in the result.
      * @member {Number} start
      */

      this.start = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>CustomerAddressResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerAddressResult} obj Optional instance to populate.
    * @return {module:models/CustomerAddressResult} The populated <code>CustomerAddressResult</code> instance.
    */


    _createClass(CustomerAddressResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerAddressResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [CustomerAddress]);
          }

          if (data.hasOwnProperty('next')) {
            obj['next'] = ApiClient.convertToType(data['next'], 'String');
          }

          if (data.hasOwnProperty('previous')) {
            obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
          }

          if (data.hasOwnProperty('select')) {
            obj['select'] = ApiClient.convertToType(data['select'], 'String');
          }

          if (data.hasOwnProperty('start')) {
            obj['start'] = ApiClient.convertToType(data['start'], 'Number');
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return CustomerAddressResult;
  }();

  /**
  * The CustomerPaymentInstrument model module.
  * @module models/CustomerPaymentInstrument
  * @version 17.8
  */

  var CustomerPaymentInstrument =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerPaymentInstrument</code>.
    * Document representing a customer payment instrument.
    * @alias module:models/CustomerPaymentInstrument
    * @class
    */
    function CustomerPaymentInstrument() {
      _classCallCheck(this, CustomerPaymentInstrument);

      /**
      * The bank routing number.
      * @member {String} bank_routing_number
      */
      this.bank_routing_number = undefined;
      /**
      * Returns the value of attribute 'creationDate'.
      * @member {Date} creation_date
      */

      this.creation_date = undefined;
      /**
      * Returns the value of attribute 'lastModified'.
      * @member {Date} last_modified
      */

      this.last_modified = undefined;
      /**
      * The masked gift certificate code.
      * @member {String} masked_gift_certificate_code
      */

      this.masked_gift_certificate_code = undefined;
      /**
      * The payment bank account.
      * @member {module:models/PaymentBankAccount} payment_bank_account
      */

      this.payment_bank_account = undefined;
      /**
      * The payment card.
      * @member {module:models/PaymentCard} payment_card
      */

      this.payment_card = undefined;
      /**
      * The payment instrument ID.
      * @member {String} payment_instrument_id
      */

      this.payment_instrument_id = undefined;
      /**
      * The payment method id. Optional if a customer payment instrument id is specified.
      * @member {String} payment_method_id
      */

      this.payment_method_id = undefined;
    }
    /**
    * Constructs a <code>CustomerPaymentInstrument</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerPaymentInstrument} obj Optional instance to populate.
    * @return {module:models/CustomerPaymentInstrument} The populated <code>CustomerPaymentInstrument</code> instance.
    */


    _createClass(CustomerPaymentInstrument, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerPaymentInstrument();

          if (data.hasOwnProperty('bank_routing_number')) {
            obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
          }

          if (data.hasOwnProperty('creation_date')) {
            obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
          }

          if (data.hasOwnProperty('last_modified')) {
            obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
          }

          if (data.hasOwnProperty('masked_gift_certificate_code')) {
            obj['masked_gift_certificate_code'] = ApiClient.convertToType(data['masked_gift_certificate_code'], 'String');
          }

          if (data.hasOwnProperty('payment_bank_account')) {
            obj['payment_bank_account'] = PaymentBankAccount.constructFromObject(data['payment_bank_account']);
          }

          if (data.hasOwnProperty('payment_card')) {
            obj['payment_card'] = PaymentCard.constructFromObject(data['payment_card']);
          }

          if (data.hasOwnProperty('payment_instrument_id')) {
            obj['payment_instrument_id'] = ApiClient.convertToType(data['payment_instrument_id'], 'String');
          }

          if (data.hasOwnProperty('payment_method_id')) {
            obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerPaymentInstrument;
  }();

  /**
  * The Customer model module.
  * @module models/Customer
  * @version 17.8
  */

  var Customer =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Customer</code>.
    * Document representing a customer.
    * @alias module:models/Customer
    * @class
    */
    function Customer() {
      _classCallCheck(this, Customer);

      /**
      * The customer's addresses.
      * @member {Array.<module:models/CustomerAddress>} addresses
      */
      this.addresses = undefined;
      /**
      * The customer's authorization type (indicates if the customer is a guest  or a registered customer).
      * @member {module:models/Customer.AuthTypeEnum} auth_type
      */

      this.auth_type = undefined;
      /**
      * The customer's birthday.
      * @member {Date} birthday
      */

      this.birthday = undefined;
      /**
      * The customer's company name.
      * @member {String} company_name
      */

      this.company_name = undefined;
      /**
      * Returns the value of attribute 'creationDate'.
      * @member {Date} creation_date
      */

      this.creation_date = undefined;
      /**
      * The customer's number (id). Both registered and guest customers have a  customer id.
      * @member {String} customer_id
      */

      this.customer_id = undefined;
      /**
      * The customer's number (id). Only a registered customer has a customer  number.
      * @member {String} customer_no
      */

      this.customer_no = undefined;
      /**
      * The customer's email address.
      * @member {String} email
      */

      this.email = undefined;
      /**
      * A flag indicating whether this customer is is enabled and can log in.
      * @member {Boolean} enabled
      */

      this.enabled = undefined;
      /**
      * The customer's fax number. The length is restricted to 32 characters.
      * @member {String} fax
      */

      this.fax = undefined;
      /**
      * The customer's first name.
      * @member {String} first_name
      */

      this.first_name = undefined;
      /**
      * The customer's gender.
      * @member {module:models/Customer.GenderEnum} gender
      */

      this.gender = undefined;
      /**
      * The customer's job title.
      * @member {String} job_title
      */

      this.job_title = undefined;
      /**
      * The time when the customer last logged in.
      * @member {Date} last_login_time
      */

      this.last_login_time = undefined;
      /**
      * Returns the value of attribute 'lastModified'.
      * @member {Date} last_modified
      */

      this.last_modified = undefined;
      /**
      * The customer's last name.
      * @member {String} last_name
      */

      this.last_name = undefined;
      /**
      * The time when the customer last visited.
      * @member {Date} last_visit_time
      */

      this.last_visit_time = undefined;
      /**
      * The customer's login.
      * @member {String} login
      */

      this.login = undefined;
      /**
      * The customer's note.
      * @member {String} note
      */

      this.note = undefined;
      /**
      * The customer's payment instruments.
      * @member {Array.<module:models/CustomerPaymentInstrument>} payment_instruments
      */

      this.payment_instruments = undefined;
      /**
      * The customer's business phone number.
      * @member {String} phone_business
      */

      this.phone_business = undefined;
      /**
      * The customer's home phone number.
      * @member {String} phone_home
      */

      this.phone_home = undefined;
      /**
      * The customer's mobile phone number.
      * @member {String} phone_mobile
      */

      this.phone_mobile = undefined;
      /**
      * The customer's preferred locale.
      * @member {String} preferred_locale
      */

      this.preferred_locale = undefined;
      /**
      * The time when the customer logged in previously.
      * @member {Date} previous_login_time
      */

      this.previous_login_time = undefined;
      /**
      * The time when the customer last visited the store.
      * @member {Date} previous_visit_time
      */

      this.previous_visit_time = undefined;
      /**
      * The salutation to use for the customer.
      * @member {String} salutation
      */

      this.salutation = undefined;
      /**
      * The customer's second name.
      * @member {String} second_name
      */

      this.second_name = undefined;
      /**
      * The customer's suffix (for example, \"Jr.\" or \"Sr.\").
      * @member {String} suffix
      */

      this.suffix = undefined;
      /**
      * The customer's title (for example, \"Mrs\" or \"Mr\").
      * @member {String} title
      */

      this.title = undefined;
    }
    /**
    * Constructs a <code>Customer</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Customer} obj Optional instance to populate.
    * @return {module:models/Customer} The populated <code>Customer</code> instance.
    */


    _createClass(Customer, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Customer();

          if (data.hasOwnProperty('addresses')) {
            obj['addresses'] = ApiClient.convertToType(data['addresses'], [CustomerAddress]);
          }

          if (data.hasOwnProperty('auth_type')) {
            obj['auth_type'] = ApiClient.convertToType(data['auth_type'], 'String');
          }

          if (data.hasOwnProperty('birthday')) {
            obj['birthday'] = ApiClient.convertToType(data['birthday'], 'Date');
          }

          if (data.hasOwnProperty('company_name')) {
            obj['company_name'] = ApiClient.convertToType(data['company_name'], 'String');
          }

          if (data.hasOwnProperty('creation_date')) {
            obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
          }

          if (data.hasOwnProperty('customer_id')) {
            obj['customer_id'] = ApiClient.convertToType(data['customer_id'], 'String');
          }

          if (data.hasOwnProperty('customer_no')) {
            obj['customer_no'] = ApiClient.convertToType(data['customer_no'], 'String');
          }

          if (data.hasOwnProperty('email')) {
            obj['email'] = ApiClient.convertToType(data['email'], 'String');
          }

          if (data.hasOwnProperty('enabled')) {
            obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Boolean');
          }

          if (data.hasOwnProperty('fax')) {
            obj['fax'] = ApiClient.convertToType(data['fax'], 'String');
          }

          if (data.hasOwnProperty('first_name')) {
            obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
          }

          if (data.hasOwnProperty('gender')) {
            obj['gender'] = ApiClient.convertToType(data['gender'], 'Number');
          }

          if (data.hasOwnProperty('job_title')) {
            obj['job_title'] = ApiClient.convertToType(data['job_title'], 'String');
          }

          if (data.hasOwnProperty('last_login_time')) {
            obj['last_login_time'] = ApiClient.convertToType(data['last_login_time'], 'Date');
          }

          if (data.hasOwnProperty('last_modified')) {
            obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
          }

          if (data.hasOwnProperty('last_name')) {
            obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
          }

          if (data.hasOwnProperty('last_visit_time')) {
            obj['last_visit_time'] = ApiClient.convertToType(data['last_visit_time'], 'Date');
          }

          if (data.hasOwnProperty('login')) {
            obj['login'] = ApiClient.convertToType(data['login'], 'String');
          }

          if (data.hasOwnProperty('note')) {
            obj['note'] = ApiClient.convertToType(data['note'], 'String');
          }

          if (data.hasOwnProperty('payment_instruments')) {
            obj['payment_instruments'] = ApiClient.convertToType(data['payment_instruments'], [CustomerPaymentInstrument]);
          }

          if (data.hasOwnProperty('phone_business')) {
            obj['phone_business'] = ApiClient.convertToType(data['phone_business'], 'String');
          }

          if (data.hasOwnProperty('phone_home')) {
            obj['phone_home'] = ApiClient.convertToType(data['phone_home'], 'String');
          }

          if (data.hasOwnProperty('phone_mobile')) {
            obj['phone_mobile'] = ApiClient.convertToType(data['phone_mobile'], 'String');
          }

          if (data.hasOwnProperty('preferred_locale')) {
            obj['preferred_locale'] = ApiClient.convertToType(data['preferred_locale'], 'String');
          }

          if (data.hasOwnProperty('previous_login_time')) {
            obj['previous_login_time'] = ApiClient.convertToType(data['previous_login_time'], 'Date');
          }

          if (data.hasOwnProperty('previous_visit_time')) {
            obj['previous_visit_time'] = ApiClient.convertToType(data['previous_visit_time'], 'Date');
          }

          if (data.hasOwnProperty('salutation')) {
            obj['salutation'] = ApiClient.convertToType(data['salutation'], 'String');
          }

          if (data.hasOwnProperty('second_name')) {
            obj['second_name'] = ApiClient.convertToType(data['second_name'], 'String');
          }

          if (data.hasOwnProperty('suffix')) {
            obj['suffix'] = ApiClient.convertToType(data['suffix'], 'String');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Customer;
  }();
  Customer.AuthTypeEnum = {
    /**
     * value: "guest"
     * @const
     */
    guest: 'guest',

    /**
     * value: "registered"
     * @const
     */
    registered: 'registered'
    /**
    * Allowed values for the <code>gender</code> property.
    * @enum {Number}
    * @readonly
    */

  };
  Customer.GenderEnum = {
    /**
     * value: 1
     * @const
     */
    1: 1,

    /**
     * value: 2
     * @const
     */
    2: 2
  };

  /**
  * The Order model module.
  * @module models/Order
  * @version 17.8
  */

  var Order =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Order</code>.
    * Document representing an order.
    * @alias module:models/Order
    * @class
    */
    function Order() {
      _classCallCheck(this, Order);

      /**
      * The products tax after discounts applying in purchase currency.   Adjusted merchandize prices
      * represent the sum of product prices before  services such as shipping have been added, but after adjustment from  promotions have been added.
      * @member {Number} adjusted_merchandize_total_tax
      */
      this.adjusted_merchandize_total_tax = undefined;
      /**
      * The tax of all shipping line items of the line item container after  shipping adjustments have been applied.
      * @member {Number} adjusted_shipping_total_tax
      */

      this.adjusted_shipping_total_tax = undefined;
      /**
      * The billing address. This property is part of basket checkout information only.
      * @member {module:models/OrderAddress} billing_address
      */

      this.billing_address = undefined;
      /**
      * The bonus discount line items of the line item container.
      * @member {Array.<module:models/BonusDiscountLineItem>} bonus_discount_line_items
      */

      this.bonus_discount_line_items = undefined;
      /**
      * The sales channel for the order.
      * @member {module:models/Order.ChannelTypeEnum} channel_type
      */

      this.channel_type = undefined;
      /**
      * The confirmation status of the order.
      * @member {module:models/Order.ConfirmationStatusEnum} confirmation_status
      */

      this.confirmation_status = undefined;
      /**
      * The sorted array of coupon items. This array can be empty.
      * @member {Array.<module:models/CouponItem>} coupon_items
      */

      this.coupon_items = undefined;
      /**
      * The name of the user who created the order.
      * @member {String} created_by
      */

      this.created_by = undefined;
      /**
      * Returns the value of attribute 'creationDate'.
      * @member {Date} creation_date
      */

      this.creation_date = undefined;
      /**
      * The ISO 4217 mnemonic code of the currency.
      * @member {String} currency
      */

      this.currency = undefined;
      /**
      * The customer information for logged in customers. This property is part of basket checkout information only.
      * @member {module:models/CustomerInfo} customer_info
      */

      this.customer_info = undefined;
      /**
      * The name of the customer associated with this order.
      * @member {String} customer_name
      */

      this.customer_name = undefined;
      /**
      * The export status of the order.
      * @member {module:models/Order.ExportStatusEnum} export_status
      */

      this.export_status = undefined;
      /**
      * The external status of the order.
      * @member {String} external_order_status
      */

      this.external_order_status = undefined;
      /**
      * The sorted array of gift certificate line items. This array can be empty.
      * @member {Array.<module:models/GiftCertificateItem>} gift_certificate_items
      */

      this.gift_certificate_items = undefined;
      /**
      * Returns the value of attribute 'lastModified'.
      * @member {Date} last_modified
      */

      this.last_modified = undefined;
      /**
      * The products total tax in purchase currency.   Merchandize total prices represent the sum of
      * product prices before  services such as shipping or adjustment from promotions have  been added.
      * @member {Number} merchandize_total_tax
      */

      this.merchandize_total_tax = undefined;
      /**
      * The notes for the line item container.
      * @member {module:models/SimpleLink} notes
      */

      this.notes = undefined;
      /**
      * The order number of the order.
      * @member {String} order_no
      */

      this.order_no = undefined;
      /**
      * The array of order level price adjustments. This array can be empty.
      * @member {Array.<module:models/PriceAdjustment>} order_price_adjustments
      */

      this.order_price_adjustments = undefined;
      /**
      * The order token used to secure the lookup of an order on base of the  plain order number. The order token contains only URL safe characters.
      * @member {String} order_token
      */

      this.order_token = undefined;
      /**
      * The total price of the order, including products, shipping and tax. This property is part of basket checkout  information only.
      * @member {Number} order_total
      */

      this.order_total = undefined;
      /**
      * The payment instruments list for the order.
      * @member {Array.<module:models/OrderPaymentInstrument>} payment_instruments
      */

      this.payment_instruments = undefined;
      /**
      * The payment status of the order.
      * @member {module:models/Order.PaymentStatusEnum} payment_status
      */

      this.payment_status = undefined;
      /**
      * The sorted array of product items (up to a maximum of 50 items). This array can be empty.
      * @member {Array.<module:models/ProductItem>} product_items
      */

      this.product_items = undefined;
      /**
      * The total price of all product items after all product discounts.  Depending on taxation policy the returned price is net or gross.
      * @member {Number} product_sub_total
      */

      this.product_sub_total = undefined;
      /**
      * The total price of all product items after all product and order discounts.  Depending on taxation policy the returned price is net or gross.
      * @member {Number} product_total
      */

      this.product_total = undefined;
      /**
      * The array of shipments. This property is part of basket checkout information only.
      * @member {Array.<module:models/Shipment>} shipments
      */

      this.shipments = undefined;
      /**
      * The sorted array of shipping items. This array can be empty.
      * @member {Array.<module:models/ShippingItem>} shipping_items
      */

      this.shipping_items = undefined;
      /**
      * The shipping status of the order.
      * @member {module:models/Order.ShippingStatusEnum} shipping_status
      */

      this.shipping_status = undefined;
      /**
      * The total shipping price of the order after all shipping discounts. Excludes tax if
      * taxation policy is net. Includes  tax if taxation policy is gross. This property is part
      * of basket checkout information only.
      * @member {Number} shipping_total
      */

      this.shipping_total = undefined;
      /**
      * The tax of all shipping line items of the line item container before  shipping adjustments
      * have been applied.
      * @member {Number} shipping_total_tax
      */

      this.shipping_total_tax = undefined;
      /**
      * The site where the order resides.
      * @member {String} site_id
      */

      this.site_id = undefined;
      /**
      * Gets the source code assigned to this basket.
      * @member {String} source_code
      */

      this.source_code = undefined;
      /**
      * The status of the order.
      * @member {module:models/Order.StatusEnum} status
      */

      this.status = undefined;
      /**
      * The total tax amount of the order. This property is part of basket checkout information only.
      * @member {Number} tax_total
      */

      this.tax_total = undefined;
      /**
      * The taxation the line item container is based on.
      * @member {module:models/Order.TaxationEnum} taxation
      */

      this.taxation = undefined;
    }
    /**
    * Constructs a <code>Order</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Order} obj Optional instance to populate.
    * @return {module:models/Order} The populated <code>Order</code> instance.
    */


    _createClass(Order, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Order();

          if (data.hasOwnProperty('adjusted_merchandize_total_tax')) {
            obj['adjusted_merchandize_total_tax'] = ApiClient.convertToType(data['adjusted_merchandize_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('adjusted_shipping_total_tax')) {
            obj['adjusted_shipping_total_tax'] = ApiClient.convertToType(data['adjusted_shipping_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('billing_address')) {
            obj['billing_address'] = OrderAddress.constructFromObject(data['billing_address']);
          }

          if (data.hasOwnProperty('bonus_discount_line_items')) {
            obj['bonus_discount_line_items'] = ApiClient.convertToType(data['bonus_discount_line_items'], [BonusDiscountLineItem]);
          }

          if (data.hasOwnProperty('channel_type')) {
            obj['channel_type'] = ApiClient.convertToType(data['channel_type'], 'String');
          }

          if (data.hasOwnProperty('confirmation_status')) {
            obj['confirmation_status'] = ApiClient.convertToType(data['confirmation_status'], 'String');
          }

          if (data.hasOwnProperty('coupon_items')) {
            obj['coupon_items'] = ApiClient.convertToType(data['coupon_items'], [CouponItem]);
          }

          if (data.hasOwnProperty('created_by')) {
            obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
          }

          if (data.hasOwnProperty('creation_date')) {
            obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
          }

          if (data.hasOwnProperty('currency')) {
            obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
          }

          if (data.hasOwnProperty('customer_info')) {
            obj['customer_info'] = CustomerInfo.constructFromObject(data['customer_info']);
          }

          if (data.hasOwnProperty('customer_name')) {
            obj['customer_name'] = ApiClient.convertToType(data['customer_name'], 'String');
          }

          if (data.hasOwnProperty('export_status')) {
            obj['export_status'] = ApiClient.convertToType(data['export_status'], 'String');
          }

          if (data.hasOwnProperty('external_order_status')) {
            obj['external_order_status'] = ApiClient.convertToType(data['external_order_status'], 'String');
          }

          if (data.hasOwnProperty('gift_certificate_items')) {
            obj['gift_certificate_items'] = ApiClient.convertToType(data['gift_certificate_items'], [GiftCertificateItem]);
          }

          if (data.hasOwnProperty('last_modified')) {
            obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
          }

          if (data.hasOwnProperty('merchandize_total_tax')) {
            obj['merchandize_total_tax'] = ApiClient.convertToType(data['merchandize_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('notes')) {
            obj['notes'] = SimpleLink.constructFromObject(data['notes']);
          }

          if (data.hasOwnProperty('order_no')) {
            obj['order_no'] = ApiClient.convertToType(data['order_no'], 'String');
          }

          if (data.hasOwnProperty('order_price_adjustments')) {
            obj['order_price_adjustments'] = ApiClient.convertToType(data['order_price_adjustments'], [PriceAdjustment]);
          }

          if (data.hasOwnProperty('order_token')) {
            obj['order_token'] = ApiClient.convertToType(data['order_token'], 'String');
          }

          if (data.hasOwnProperty('order_total')) {
            obj['order_total'] = ApiClient.convertToType(data['order_total'], 'Number');
          }

          if (data.hasOwnProperty('payment_instruments')) {
            obj['payment_instruments'] = ApiClient.convertToType(data['payment_instruments'], [OrderPaymentInstrument]);
          }

          if (data.hasOwnProperty('payment_status')) {
            obj['payment_status'] = ApiClient.convertToType(data['payment_status'], 'String');
          }

          if (data.hasOwnProperty('product_items')) {
            obj['product_items'] = ApiClient.convertToType(data['product_items'], [ProductItem]);
          }

          if (data.hasOwnProperty('product_sub_total')) {
            obj['product_sub_total'] = ApiClient.convertToType(data['product_sub_total'], 'Number');
          }

          if (data.hasOwnProperty('product_total')) {
            obj['product_total'] = ApiClient.convertToType(data['product_total'], 'Number');
          }

          if (data.hasOwnProperty('shipments')) {
            obj['shipments'] = ApiClient.convertToType(data['shipments'], [Shipment]);
          }

          if (data.hasOwnProperty('shipping_items')) {
            obj['shipping_items'] = ApiClient.convertToType(data['shipping_items'], [ShippingItem]);
          }

          if (data.hasOwnProperty('shipping_status')) {
            obj['shipping_status'] = ApiClient.convertToType(data['shipping_status'], 'String');
          }

          if (data.hasOwnProperty('shipping_total')) {
            obj['shipping_total'] = ApiClient.convertToType(data['shipping_total'], 'Number');
          }

          if (data.hasOwnProperty('shipping_total_tax')) {
            obj['shipping_total_tax'] = ApiClient.convertToType(data['shipping_total_tax'], 'Number');
          }

          if (data.hasOwnProperty('site_id')) {
            obj['site_id'] = ApiClient.convertToType(data['site_id'], 'String');
          }

          if (data.hasOwnProperty('source_code')) {
            obj['source_code'] = ApiClient.convertToType(data['source_code'], 'String');
          }

          if (data.hasOwnProperty('status')) {
            obj['status'] = ApiClient.convertToType(data['status'], 'String');
          }

          if (data.hasOwnProperty('tax_total')) {
            obj['tax_total'] = ApiClient.convertToType(data['tax_total'], 'Number');
          }

          if (data.hasOwnProperty('taxation')) {
            obj['taxation'] = ApiClient.convertToType(data['taxation'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Order;
  }();
  Order.ChannelTypeEnum = {
    /**
     * value: "storefront"
     * @const
     */
    storefront: 'storefront',

    /**
     * value: "callcenter"
     * @const
     */
    callcenter: 'callcenter',

    /**
     * value: "marketplace"
     * @const
     */
    marketplace: 'marketplace',

    /**
     * value: "dss"
     * @const
     */
    dss: 'dss',

    /**
     * value: "store"
     * @const
     */
    store: 'store',

    /**
     * value: "pinterest"
     * @const
     */
    pinterest: 'pinterest',

    /**
     * value: "twitter"
     * @const
     */
    twitter: 'twitter',

    /**
     * value: "facebookads"
     * @const
     */
    facebookads: 'facebookads',

    /**
     * value: "subscriptions"
     * @const
     */
    subscriptions: 'subscriptions',

    /**
     * value: "onlinereservation"
     * @const
     */
    onlinereservation: 'onlinereservation',

    /**
     * value: "customerservicecenter"
     * @const
     */
    customerservicecenter: 'customerservicecenter',

    /**
     * value: "instagramcommerce"
     * @const
     */
    instagramcommerce: 'instagramcommerce'
    /**
    * Allowed values for the <code>confirmation_status</code> property.
    * @enum {String}
    * @readonly
    */

  };
  Order.ConfirmationStatusEnum = {
    /**
     * value: "not_confirmed"
     * @const
     */
    not_confirmed: 'not_confirmed',

    /**
     * value: "confirmed"
     * @const
     */
    confirmed: 'confirmed'
    /**
    * Allowed values for the <code>export_status</code> property.
    * @enum {String}
    * @readonly
    */

  };
  Order.ExportStatusEnum = {
    /**
     * value: "not_exported"
     * @const
     */
    not_exported: 'not_exported',

    /**
     * value: "exported"
     * @const
     */
    exported: 'exported',

    /**
     * value: "ready"
     * @const
     */
    ready: 'ready',

    /**
     * value: "failed"
     * @const
     */
    failed: 'failed'
    /**
    * Allowed values for the <code>payment_status</code> property.
    * @enum {String}
    * @readonly
    */

  };
  Order.PaymentStatusEnum = {
    /**
     * value: "not_paid"
     * @const
     */
    not_paid: 'not_paid',

    /**
     * value: "part_paid"
     * @const
     */
    part_paid: 'part_paid',

    /**
     * value: "paid"
     * @const
     */
    paid: 'paid'
    /**
    * Allowed values for the <code>shipping_status</code> property.
    * @enum {String}
    * @readonly
    */

  };
  Order.ShippingStatusEnum = {
    /**
     * value: "not_shipped"
     * @const
     */
    not_shipped: 'not_shipped',

    /**
     * value: "part_shipped"
     * @const
     */
    part_shipped: 'part_shipped',

    /**
     * value: "shipped"
     * @const
     */
    shipped: 'shipped'
    /**
    * Allowed values for the <code>status</code> property.
    * @enum {String}
    * @readonly
    */

  };
  Order.StatusEnum = {
    /**
     * value: "created"
     * @const
     */
    created: 'created',

    /**
     * value: "new"
     * @const
     */
    "new": 'new',

    /**
     * value: "open"
     * @const
     */
    open: 'open',

    /**
     * value: "completed"
     * @const
     */
    completed: 'completed',

    /**
     * value: "cancelled"
     * @const
     */
    cancelled: 'cancelled',

    /**
     * value: "replaced"
     * @const
     */
    replaced: 'replaced',

    /**
     * value: "failed"
     * @const
     */
    failed: 'failed'
    /**
    * Allowed values for the <code>taxation</code> property.
    * @enum {String}
    * @readonly
    */

  };
  Order.TaxationEnum = {
    /**
     * value: "gross"
     * @const
     */
    gross: 'gross',

    /**
     * value: "net"
     * @const
     */
    net: 'net'
  };

  /**
  * The CustomerOrderResult model module.
  * @module models/CustomerOrderResult
  * @version 17.8
  */

  var CustomerOrderResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerOrderResult</code>.
    * Result document containing an array of customer orders.
    * @alias module:models/CustomerOrderResult
    * @class
    */
    function CustomerOrderResult() {
      _classCallCheck(this, CustomerOrderResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of customer order documents.
      * @member {Array.<module:models/Order>} data
      */

      this.data = undefined;
      /**
      * The URL of the next result page.
      * @member {String} next
      */

      this.next = undefined;
      /**
      * The URL of the previous result page.
      * @member {String} previous
      */

      this.previous = undefined;
      /**
      * The fields that you want to select.
      * @member {String} select
      */

      this.select = undefined;
      /**
      * The zero-based index of the first search hit to include in the result.
      * @member {Number} start
      */

      this.start = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>CustomerOrderResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerOrderResult} obj Optional instance to populate.
    * @return {module:models/CustomerOrderResult} The populated <code>CustomerOrderResult</code> instance.
    */


    _createClass(CustomerOrderResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerOrderResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [Order]);
          }

          if (data.hasOwnProperty('next')) {
            obj['next'] = ApiClient.convertToType(data['next'], 'String');
          }

          if (data.hasOwnProperty('previous')) {
            obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
          }

          if (data.hasOwnProperty('select')) {
            obj['select'] = ApiClient.convertToType(data['select'], 'String');
          }

          if (data.hasOwnProperty('start')) {
            obj['start'] = ApiClient.convertToType(data['start'], 'Number');
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return CustomerOrderResult;
  }();

  /**
  * The CustomerPaymentCardRequest model module.
  * @module models/CustomerPaymentCardRequest
  * @version 17.8
  */

  var CustomerPaymentCardRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerPaymentCardRequest</code>.
    * Document representing a customer payment card request.
    * @alias module:models/CustomerPaymentCardRequest
    * @class
    */
    function CustomerPaymentCardRequest() {
      _classCallCheck(this, CustomerPaymentCardRequest);

      /**
      * The payment card type (for example, 'Visa').
      * @member {String} card_type
      */
      this.card_type = undefined;
      /**
      * A credit card token. If a credit card is tokenized, the token can be used to look up the credit card data at the  token store.
      * @member {String} credit_card_token
      */

      this.credit_card_token = undefined;
      /**
      * The month when the payment card expires.
      * @member {Number} expiration_month
      */

      this.expiration_month = undefined;
      /**
      * The year when the payment card expires.
      * @member {Number} expiration_year
      */

      this.expiration_year = undefined;
      /**
      * The payment card holder.
      * @member {String} holder
      */

      this.holder = undefined;
      /**
      * The payment card issue number.
      * @member {String} issue_number
      */

      this.issue_number = undefined;
      /**
      * The payment card number.
      * @member {String} number
      */

      this.number = undefined;
      /**
      * The payment card valid from month.
      * @member {Number} valid_from_month
      */

      this.valid_from_month = undefined;
      /**
      * The payment card valid from year.
      * @member {Number} valid_from_year
      */

      this.valid_from_year = undefined;
    }
    /**
    * Constructs a <code>CustomerPaymentCardRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerPaymentCardRequest} obj Optional instance to populate.
    * @return {module:models/CustomerPaymentCardRequest} The populated <code>CustomerPaymentCardRequest</code> instance.
    */


    _createClass(CustomerPaymentCardRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerPaymentCardRequest();

          if (data.hasOwnProperty('card_type')) {
            obj['card_type'] = ApiClient.convertToType(data['card_type'], 'String');
          }

          if (data.hasOwnProperty('credit_card_token')) {
            obj['credit_card_token'] = ApiClient.convertToType(data['credit_card_token'], 'String');
          }

          if (data.hasOwnProperty('expiration_month')) {
            obj['expiration_month'] = ApiClient.convertToType(data['expiration_month'], 'Number');
          }

          if (data.hasOwnProperty('expiration_year')) {
            obj['expiration_year'] = ApiClient.convertToType(data['expiration_year'], 'Number');
          }

          if (data.hasOwnProperty('holder')) {
            obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
          }

          if (data.hasOwnProperty('issue_number')) {
            obj['issue_number'] = ApiClient.convertToType(data['issue_number'], 'String');
          }

          if (data.hasOwnProperty('number')) {
            obj['number'] = ApiClient.convertToType(data['number'], 'String');
          }

          if (data.hasOwnProperty('valid_from_month')) {
            obj['valid_from_month'] = ApiClient.convertToType(data['valid_from_month'], 'Number');
          }

          if (data.hasOwnProperty('valid_from_year')) {
            obj['valid_from_year'] = ApiClient.convertToType(data['valid_from_year'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return CustomerPaymentCardRequest;
  }();

  /**
  * The CustomerPaymentInstrumentRequest model module.
  * @module models/CustomerPaymentInstrumentRequest
  * @version 17.8
  */

  var CustomerPaymentInstrumentRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerPaymentInstrumentRequest</code>.
    * Document representing a customer payment instrument request.
    * @alias module:models/CustomerPaymentInstrumentRequest
    * @class
    */
    function CustomerPaymentInstrumentRequest() {
      _classCallCheck(this, CustomerPaymentInstrumentRequest);

      /**
      * The bank routing number.
      * @member {String} bank_routing_number
      */
      this.bank_routing_number = undefined;
      /**
      * The gift certificate code.
      * @member {String} gift_certificate_code
      */

      this.gift_certificate_code = undefined;
      /**
      * The payment bank account request data.
      * @member {module:models/PaymentBankAccountRequest} payment_bank_account
      */

      this.payment_bank_account = undefined;
      /**
      * The customer payment card.
      * @member {module:models/CustomerPaymentCardRequest} payment_card
      */

      this.payment_card = undefined;
      /**
      * The payment method id. Optional if a customer payment instrument id is specified.
      * @member {String} payment_method_id
      */

      this.payment_method_id = undefined;
    }
    /**
    * Constructs a <code>CustomerPaymentInstrumentRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerPaymentInstrumentRequest} obj Optional instance to populate.
    * @return {module:models/CustomerPaymentInstrumentRequest} The populated <code>CustomerPaymentInstrumentRequest</code> instance.
    */


    _createClass(CustomerPaymentInstrumentRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerPaymentInstrumentRequest();

          if (data.hasOwnProperty('bank_routing_number')) {
            obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
          }

          if (data.hasOwnProperty('gift_certificate_code')) {
            obj['gift_certificate_code'] = ApiClient.convertToType(data['gift_certificate_code'], 'String');
          }

          if (data.hasOwnProperty('payment_bank_account')) {
            obj['payment_bank_account'] = PaymentBankAccountRequest.constructFromObject(data['payment_bank_account']);
          }

          if (data.hasOwnProperty('payment_card')) {
            obj['payment_card'] = CustomerPaymentCardRequest.constructFromObject(data['payment_card']);
          }

          if (data.hasOwnProperty('payment_method_id')) {
            obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerPaymentInstrumentRequest;
  }();

  /**
  * The CustomerPaymentInstrumentResult model module.
  * @module models/CustomerPaymentInstrumentResult
  * @version 17.8
  */

  var CustomerPaymentInstrumentResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerPaymentInstrumentResult</code>.
    * Document representing a customer payment instrument result. The payment data contained is masked where needed for security purposes.
    * @alias module:models/CustomerPaymentInstrumentResult
    * @class
    */
    function CustomerPaymentInstrumentResult() {
      _classCallCheck(this, CustomerPaymentInstrumentResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The customer payment instruments list.
      * @member {Array.<module:models/CustomerPaymentInstrument>} data
      */

      this.data = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>CustomerPaymentInstrumentResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerPaymentInstrumentResult} obj Optional instance to populate.
    * @return {module:models/CustomerPaymentInstrumentResult} The populated <code>CustomerPaymentInstrumentResult</code> instance.
    */


    _createClass(CustomerPaymentInstrumentResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerPaymentInstrumentResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [CustomerPaymentInstrument]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return CustomerPaymentInstrumentResult;
  }();

  /**
  * The CustomerProductListItemLink model module.
  * @module models/CustomerProductListItemLink
  * @version 17.8
  */

  var CustomerProductListItemLink =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerProductListItemLink</code>.
    * Document representing a customer product list item link.
    * @alias module:models/CustomerProductListItemLink
    * @class
    */
    function CustomerProductListItemLink() {
      _classCallCheck(this, CustomerProductListItemLink);

      /**
      * The target of the link.
      * @member {String} link
      */
      this.link = undefined;
      /**
      * The link title.
      * @member {String} title
      */

      this.title = undefined;
    }
    /**
    * Constructs a <code>CustomerProductListItemLink</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerProductListItemLink} obj Optional instance to populate.
    * @return {module:models/CustomerProductListItemLink} The populated <code>CustomerProductListItemLink</code> instance.
    */


    _createClass(CustomerProductListItemLink, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerProductListItemLink();

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerProductListItemLink;
  }();

  /**
  * The ProductSimpleLink model module.
  * @module models/ProductSimpleLink
  * @version 17.8
  */

  var ProductSimpleLink =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductSimpleLink</code>.
    * Document representing a link to a product.
    * @alias module:models/ProductSimpleLink
    * @class
    */
    function ProductSimpleLink() {
      _classCallCheck(this, ProductSimpleLink);

      /**
      * The target of the link.
      * @member {String} link
      */
      this.link = undefined;
      /**
      * The link title.
      * @member {String} title
      */

      this.title = undefined;
    }
    /**
    * Constructs a <code>ProductSimpleLink</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductSimpleLink} obj Optional instance to populate.
    * @return {module:models/ProductSimpleLink} The populated <code>ProductSimpleLink</code> instance.
    */


    _createClass(ProductSimpleLink, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductSimpleLink();

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductSimpleLink;
  }();

  /**
  * The CustomerProductListItem model module.
  * @module models/CustomerProductListItem
  * @version 17.8
  */

  var CustomerProductListItem =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerProductListItem</code>.
    * Document representing a customer product list item.
    * @alias module:models/CustomerProductListItem
    * @class
    */
    function CustomerProductListItem() {
      _classCallCheck(this, CustomerProductListItem);

      /**
      * The id of this product list item.
      * @member {String} id
      */
      this.id = undefined;
      /**
      * The priority of the item.
      * @member {Number} priority
      */

      this.priority = undefined;
      /**
      * The product item
      * @member {module:models/Product} product
      */

      this.product = undefined;
      /**
      * A link to the product.
      * @member {module:models/ProductSimpleLink} product_details_link
      */

      this.product_details_link = undefined;
      /**
      * The id of the product.
      * @member {String} product_id
      */

      this.product_id = undefined;
      /**
      * Is this product list item available for access by other customers?
      * @member {Boolean} public
      */

      this["public"] = undefined;
      /**
      * The quantity of products already purchased.
      * @member {Number} purchased_quantity
      */

      this.purchased_quantity = undefined;
      /**
      * The quantity of this product list item.
      * @member {Number} quantity
      */

      this.quantity = undefined;
      /**
      * The type of the item.
      * @member {module:models/CustomerProductListItem.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>CustomerProductListItem</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerProductListItem} obj Optional instance to populate.
    * @return {module:models/CustomerProductListItem} The populated <code>CustomerProductListItem</code> instance.
    */


    _createClass(CustomerProductListItem, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerProductListItem();

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('priority')) {
            obj['priority'] = ApiClient.convertToType(data['priority'], 'Number');
          }

          if (data.hasOwnProperty('product')) {
            obj['product'] = Product.constructFromObject(data['product']);
          }

          if (data.hasOwnProperty('product_details_link')) {
            obj['product_details_link'] = ProductSimpleLink.constructFromObject(data['product_details_link']);
          }

          if (data.hasOwnProperty('product_id')) {
            obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
          }

          if (data.hasOwnProperty('public')) {
            obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
          }

          if (data.hasOwnProperty('purchased_quantity')) {
            obj['purchased_quantity'] = ApiClient.convertToType(data['purchased_quantity'], 'Number');
          }

          if (data.hasOwnProperty('quantity')) {
            obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerProductListItem;
  }();
  CustomerProductListItem.TypeEnum = {
    /**
     * value: "product"
     * @const
     */
    product: 'product',

    /**
     * value: "gift_certificate"
     * @const
     */
    gift_certificate: 'gift_certificate'
  };

  /**
  * The CustomerProductListItemResult model module.
  * @module models/CustomerProductListItemResult
  * @version 17.8
  */

  var CustomerProductListItemResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerProductListItemResult</code>.
    * Document representing a customer product list items result.
    * @alias module:models/CustomerProductListItemResult
    * @class
    */
    function CustomerProductListItemResult() {
      _classCallCheck(this, CustomerProductListItemResult);

      /**
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The customer product list items.
      * @member {Array.<module:models/CustomerProductListItem>} data
      */

      this.data = undefined;
      /**
      * The URL of the next result page.
      * @member {String} next
      */

      this.next = undefined;
      /**
      * The URL of the previous result page.
      * @member {String} previous
      */

      this.previous = undefined;
      /**
      * The zero-based index of the first search hit to include in the result.
      * @member {Number} start
      */

      this.start = undefined;
      /**
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>CustomerProductListItemResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerProductListItemResult} obj Optional instance to populate.
    * @return {module:models/CustomerProductListItemResult} The populated <code>CustomerProductListItemResult</code> instance.
    */


    _createClass(CustomerProductListItemResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerProductListItemResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [CustomerProductListItem]);
          }

          if (data.hasOwnProperty('next')) {
            obj['next'] = ApiClient.convertToType(data['next'], 'String');
          }

          if (data.hasOwnProperty('previous')) {
            obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
          }

          if (data.hasOwnProperty('start')) {
            obj['start'] = ApiClient.convertToType(data['start'], 'Number');
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return CustomerProductListItemResult;
  }();

  /**
  * The CustomerProductListRegistrant model module.
  * @module models/CustomerProductListRegistrant
  * @version 17.8
  */

  var CustomerProductListRegistrant =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerProductListRegistrant</code>.
    * Document representing a customer product list registrant.
    * @alias module:models/CustomerProductListRegistrant
    * @class
    */
    function CustomerProductListRegistrant() {
      _classCallCheck(this, CustomerProductListRegistrant);

      /**
      * The email of the registrant.
      * @member {String} email
      */
      this.email = undefined;
      /**
      * The first name of the registrant.
      * @member {String} first_name
      */

      this.first_name = undefined;
      /**
      * The last name of the registrant.
      * @member {String} last_name
      */

      this.last_name = undefined;
      /**
      * The role of the registrant.
      * @member {String} role
      */

      this.role = undefined;
    }
    /**
    * Constructs a <code>CustomerProductListRegistrant</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerProductListRegistrant} obj Optional instance to populate.
    * @return {module:models/CustomerProductListRegistrant} The populated <code>CustomerProductListRegistrant</code> instance.
    */


    _createClass(CustomerProductListRegistrant, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerProductListRegistrant();

          if (data.hasOwnProperty('email')) {
            obj['email'] = ApiClient.convertToType(data['email'], 'String');
          }

          if (data.hasOwnProperty('first_name')) {
            obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
          }

          if (data.hasOwnProperty('last_name')) {
            obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
          }

          if (data.hasOwnProperty('role')) {
            obj['role'] = ApiClient.convertToType(data['role'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerProductListRegistrant;
  }();

  /**
  * The ProductListEvent model module.
  * @module models/ProductListEvent
  * @version 17.8
  */

  var ProductListEvent =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductListEvent</code>.
    * Document representing a product list event.
    * @alias module:models/ProductListEvent
    * @class
    */
    function ProductListEvent() {
      _classCallCheck(this, ProductListEvent);

      /**
      * The city where the event takes place.
      * @member {String} city
      */
      this.city = undefined;
      /**
      * The country where the event takes place.
      * @member {String} country
      */

      this.country = undefined;
      /**
      * The date when the event takes place.
      * @member {Date} date
      */

      this.date = undefined;
      /**
      * The federal state where the event takes place.
      * @member {String} state
      */

      this.state = undefined;
      /**
      * Type of the event to celebrate.
      * @member {String} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>ProductListEvent</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductListEvent} obj Optional instance to populate.
    * @return {module:models/ProductListEvent} The populated <code>ProductListEvent</code> instance.
    */


    _createClass(ProductListEvent, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductListEvent();

          if (data.hasOwnProperty('city')) {
            obj['city'] = ApiClient.convertToType(data['city'], 'String');
          }

          if (data.hasOwnProperty('country')) {
            obj['country'] = ApiClient.convertToType(data['country'], 'String');
          }

          if (data.hasOwnProperty('date')) {
            obj['date'] = ApiClient.convertToType(data['date'], 'Date');
          }

          if (data.hasOwnProperty('state')) {
            obj['state'] = ApiClient.convertToType(data['state'], 'String');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductListEvent;
  }();

  /**
  * The ProductListShippingAddress model module.
  * @module models/ProductListShippingAddress
  * @version 17.8
  */

  var ProductListShippingAddress =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductListShippingAddress</code>.
    * Document representing a product list shipping address.
    * @alias module:models/ProductListShippingAddress
    * @class
    * @param addressId {String} The id of this address.
    */
    function ProductListShippingAddress(addressId) {
      _classCallCheck(this, ProductListShippingAddress);

      /**
      * The id of this address.
      * @member {String} address_id
      */
      this.address_id = addressId;
      /**
      * The city of this address.
      * @member {String} city
      */

      this.city = undefined;
      /**
      * The first name of this address.
      * @member {String} first_name
      */

      this.first_name = undefined;
      /**
      * The last name of this address.
      * @member {String} last_name
      */

      this.last_name = undefined;
    }
    /**
    * Constructs a <code>ProductListShippingAddress</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductListShippingAddress} obj Optional instance to populate.
    * @return {module:models/ProductListShippingAddress} The populated <code>ProductListShippingAddress</code> instance.
    */


    _createClass(ProductListShippingAddress, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductListShippingAddress();

          if (data.hasOwnProperty('address_id')) {
            obj['address_id'] = ApiClient.convertToType(data['address_id'], 'String');
          }

          if (data.hasOwnProperty('city')) {
            obj['city'] = ApiClient.convertToType(data['city'], 'String');
          }

          if (data.hasOwnProperty('first_name')) {
            obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
          }

          if (data.hasOwnProperty('last_name')) {
            obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductListShippingAddress;
  }();

  /**
  * The CustomerProductList model module.
  * @module models/CustomerProductList
  * @version 17.8
  */

  var CustomerProductList =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerProductList</code>.
    * Document representing a customer product List.
    * @alias module:models/CustomerProductList
    * @class
    */
    function CustomerProductList() {
      _classCallCheck(this, CustomerProductList);

      /**
      * The coRegistrant of this product list.
      * @member {module:models/CustomerProductListRegistrant} co_registrant
      */
      this.co_registrant = undefined;
      /**
      * Returns the value of attribute 'creationDate'.
      * @member {Date} creation_date
      */

      this.creation_date = undefined;
      /**
      * The resource link to the current shipping address of this customer product list.
      * @member {module:models/CustomerAddressLink} current_shipping_address_link
      */

      this.current_shipping_address_link = undefined;
      /**
      * The list of customer product list items.
      * @member {Array.<module:models/CustomerProductListItem>} customer_product_list_items
      */

      this.customer_product_list_items = undefined;
      /**
      * The description of this product list.
      * @member {String} description
      */

      this.description = undefined;
      /**
      * The event of this product list.
      * @member {module:models/ProductListEvent} event
      */

      this.event = undefined;
      /**
      * The id of this product list.
      * @member {String} id
      */

      this.id = undefined;
      /**
      * The resource link to the items of this customer product list.
      * @member {module:models/CustomerProductListItemLink} items_link
      */

      this.items_link = undefined;
      /**
      * Returns the value of attribute 'lastModified'.
      * @member {Date} last_modified
      */

      this.last_modified = undefined;
      /**
      * The name of this product list.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The resource link to the post event shipping address of this customer product list.
      * @member {module:models/CustomerAddressLink} post_event_shipping_address_link
      */

      this.post_event_shipping_address_link = undefined;
      /**
      * The abbreviated shipping address of this product list representing what anonymous user can see.
      * @member {module:models/ProductListShippingAddress} product_list_shipping_address
      */

      this.product_list_shipping_address = undefined;
      /**
      * Indicates whether the owner made this product list available for access by other customers.
      * @member {Boolean} public
      */

      this["public"] = undefined;
      /**
      * The registrant of this product list.
      * @member {module:models/CustomerProductListRegistrant} registrant
      */

      this.registrant = undefined;
      /**
      * The resource link to the shipping address of this customer product list.
      * @member {module:models/CustomerAddressLink} shipping_address_link
      */

      this.shipping_address_link = undefined;
      /**
      * The type of the product list.
      * @member {module:models/CustomerProductList.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>CustomerProductList</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerProductList} obj Optional instance to populate.
    * @return {module:models/CustomerProductList} The populated <code>CustomerProductList</code> instance.
    */


    _createClass(CustomerProductList, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerProductList();

          if (data.hasOwnProperty('co_registrant')) {
            obj['co_registrant'] = CustomerProductListRegistrant.constructFromObject(data['co_registrant']);
          }

          if (data.hasOwnProperty('creation_date')) {
            obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
          }

          if (data.hasOwnProperty('current_shipping_address_link')) {
            obj['current_shipping_address_link'] = CustomerAddressLink.constructFromObject(data['current_shipping_address_link']);
          }

          if (data.hasOwnProperty('customer_product_list_items')) {
            obj['customer_product_list_items'] = ApiClient.convertToType(data['customer_product_list_items'], [CustomerProductListItem]);
          }

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('event')) {
            obj['event'] = ProductListEvent.constructFromObject(data['event']);
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('items_link')) {
            obj['items_link'] = CustomerProductListItemLink.constructFromObject(data['items_link']);
          }

          if (data.hasOwnProperty('last_modified')) {
            obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('post_event_shipping_address_link')) {
            obj['post_event_shipping_address_link'] = CustomerAddressLink.constructFromObject(data['post_event_shipping_address_link']);
          }

          if (data.hasOwnProperty('product_list_shipping_address')) {
            obj['product_list_shipping_address'] = ProductListShippingAddress.constructFromObject(data['product_list_shipping_address']);
          }

          if (data.hasOwnProperty('public')) {
            obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
          }

          if (data.hasOwnProperty('registrant')) {
            obj['registrant'] = CustomerProductListRegistrant.constructFromObject(data['registrant']);
          }

          if (data.hasOwnProperty('shipping_address_link')) {
            obj['shipping_address_link'] = CustomerAddressLink.constructFromObject(data['shipping_address_link']);
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerProductList;
  }();
  CustomerProductList.TypeEnum = {
    /**
     * value: "wish_list"
     * @const
     */
    wish_list: 'wish_list',

    /**
     * value: "gift_registry"
     * @const
     */
    gift_registry: 'gift_registry',

    /**
     * value: "shopping_list"
     * @const
     */
    shopping_list: 'shopping_list',

    /**
     * value: "custom_1"
     * @const
     */
    custom_1: 'custom_1',

    /**
     * value: "custom_2"
     * @const
     */
    custom_2: 'custom_2',

    /**
     * value: "custom_3"
     * @const
     */
    custom_3: 'custom_3'
  };

  /**
  * The CustomerProductListResult model module.
  * @module models/CustomerProductListResult
  * @version 17.8
  */

  var CustomerProductListResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerProductListResult</code>.
    * Document representing a customer product lists result.
    * @alias module:models/CustomerProductListResult
    * @class
    */
    function CustomerProductListResult() {
      _classCallCheck(this, CustomerProductListResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The customer product lists.
      * @member {Array.<module:models/CustomerProductList>} data
      */

      this.data = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>CustomerProductListResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerProductListResult} obj Optional instance to populate.
    * @return {module:models/CustomerProductListResult} The populated <code>CustomerProductListResult</code> instance.
    */


    _createClass(CustomerProductListResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerProductListResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [CustomerProductList]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return CustomerProductListResult;
  }();

  /**
  * The CustomerRegistration model module.
  * @module models/CustomerRegistration
  * @version 17.8
  */

  var CustomerRegistration =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>CustomerRegistration</code>.
    * Document representing the registration information for a customer.
    * @alias module:models/CustomerRegistration
    * @class
    * @param customer {module:models/Customer} The customer registration information.  The mandatory properties for registration are login, last name and email.
    */
    function CustomerRegistration(customer) {
      _classCallCheck(this, CustomerRegistration);

      /**
      * The customer registration information.  The mandatory properties for registration are login, last name and email.
      * @member {module:models/Customer} customer
      */
      this.customer = customer;
      /**
      * The password to authorize.
      * @member {String} password
      */

      this.password = undefined;
    }
    /**
    * Constructs a <code>CustomerRegistration</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerRegistration} obj Optional instance to populate.
    * @return {module:models/CustomerRegistration} The populated <code>CustomerRegistration</code> instance.
    */


    _createClass(CustomerRegistration, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new CustomerRegistration();

          if (data.hasOwnProperty('customer')) {
            obj['customer'] = Customer.constructFromObject(data['customer']);
          }

          if (data.hasOwnProperty('password')) {
            obj['password'] = ApiClient.convertToType(data['password'], 'String');
          }
        }

        return obj;
      }
    }]);

    return CustomerRegistration;
  }();

  /**
  * The FilteredQuery model module.
  * @module models/FilteredQuery
  * @version 17.8
  */

  var FilteredQuery =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>FilteredQuery</code>.
    * A filtered query allows to filter the result of a (possibly complex) query using a (possibly complex) filter.
    * @alias module:models/FilteredQuery
    * @class
    * @param filter {module:models/Filter} The (possibly complex) filter object.
    * @param query {module:models/Query} The query object.
    */
    function FilteredQuery(filter, query) {
      _classCallCheck(this, FilteredQuery);

      /**
      * The (possibly complex) filter object.
      * @member {module:models/Filter} filter
      */
      this.filter = filter;
      /**
      * The query object.
      * @member {module:models/Query} query
      */

      this.query = query;
    }
    /**
    * Constructs a <code>FilteredQuery</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/FilteredQuery} obj Optional instance to populate.
    * @return {module:models/FilteredQuery} The populated <code>FilteredQuery</code> instance.
    */


    _createClass(FilteredQuery, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new FilteredQuery();

          if (data.hasOwnProperty('filter')) {
            obj['filter'] = Filter.constructFromObject(data['filter']);
          }

          if (data.hasOwnProperty('query')) {
            obj['query'] = Query.constructFromObject(data['query']);
          }
        }

        return obj;
      }
    }]);

    return FilteredQuery;
  }();

  /**
  * The GiftCertificate model module.
  * @module models/GiftCertificate
  * @version 17.8
  */

  var GiftCertificate =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>GiftCertificate</code>.
    * Document representing a gift certificate.
    * @alias module:models/GiftCertificate
    * @class
    */
    function GiftCertificate() {
      _classCallCheck(this, GiftCertificate);

      /**
      * The gift certificate original amount.
      * @member {Number} amount
      */
      this.amount = undefined;
      /**
      * The gift certificate balance.
      * @member {Number} balance
      */

      this.balance = undefined;
      /**
      * The gift certificate description.
      * @member {String} description
      */

      this.description = undefined;
      /**
      * Is the gift certificate is enabled?
      * @member {Boolean} enabled
      */

      this.enabled = undefined;
      /**
      * The masked gift certificate code.
      * @member {String} masked_gift_certificate_code
      */

      this.masked_gift_certificate_code = undefined;
      /**
      * The merchant ID.
      * @member {String} merchant_id
      */

      this.merchant_id = undefined;
      /**
      * The message.
      * @member {String} message
      */

      this.message = undefined;
      /**
      * The recipient email.
      * @member {String} recipient_email
      */

      this.recipient_email = undefined;
      /**
      * The recipient name.
      * @member {String} recipient_name
      */

      this.recipient_name = undefined;
      /**
      * The sender name.
      * @member {String} sender_name
      */

      this.sender_name = undefined;
      /**
      * The gift certificate status.
      * @member {module:models/GiftCertificate.StatusEnum} status
      */

      this.status = undefined;
    }
    /**
    * Constructs a <code>GiftCertificate</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/GiftCertificate} obj Optional instance to populate.
    * @return {module:models/GiftCertificate} The populated <code>GiftCertificate</code> instance.
    */


    _createClass(GiftCertificate, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new GiftCertificate();

          if (data.hasOwnProperty('amount')) {
            obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
          }

          if (data.hasOwnProperty('balance')) {
            obj['balance'] = ApiClient.convertToType(data['balance'], 'Number');
          }

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('enabled')) {
            obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Boolean');
          }

          if (data.hasOwnProperty('masked_gift_certificate_code')) {
            obj['masked_gift_certificate_code'] = ApiClient.convertToType(data['masked_gift_certificate_code'], 'String');
          }

          if (data.hasOwnProperty('merchant_id')) {
            obj['merchant_id'] = ApiClient.convertToType(data['merchant_id'], 'String');
          }

          if (data.hasOwnProperty('message')) {
            obj['message'] = ApiClient.convertToType(data['message'], 'String');
          }

          if (data.hasOwnProperty('recipient_email')) {
            obj['recipient_email'] = ApiClient.convertToType(data['recipient_email'], 'String');
          }

          if (data.hasOwnProperty('recipient_name')) {
            obj['recipient_name'] = ApiClient.convertToType(data['recipient_name'], 'String');
          }

          if (data.hasOwnProperty('sender_name')) {
            obj['sender_name'] = ApiClient.convertToType(data['sender_name'], 'String');
          }

          if (data.hasOwnProperty('status')) {
            obj['status'] = ApiClient.convertToType(data['status'], 'String');
          }
        }

        return obj;
      }
    }]);

    return GiftCertificate;
  }();
  GiftCertificate.StatusEnum = {
    /**
     * value: "pending"
     * @const
     */
    pending: 'pending',

    /**
     * value: "issued"
     * @const
     */
    issued: 'issued',

    /**
     * value: "partially_redeemed"
     * @const
     */
    partially_redeemed: 'partially_redeemed',

    /**
     * value: "redeemed"
     * @const
     */
    redeemed: 'redeemed'
  };

  /**
  * The GiftCertificateRequest model module.
  * @module models/GiftCertificateRequest
  * @version 17.8
  */

  var GiftCertificateRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>GiftCertificateRequest</code>.
    * Document representing a gift certificate request data.
    * @alias module:models/GiftCertificateRequest
    * @class
    */
    function GiftCertificateRequest() {
      _classCallCheck(this, GiftCertificateRequest);

      /**
      * The gift certificate code.
      * @member {String} gift_certificate_code
      */
      this.gift_certificate_code = undefined;
    }
    /**
    * Constructs a <code>GiftCertificateRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/GiftCertificateRequest} obj Optional instance to populate.
    * @return {module:models/GiftCertificateRequest} The populated <code>GiftCertificateRequest</code> instance.
    */


    _createClass(GiftCertificateRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new GiftCertificateRequest();

          if (data.hasOwnProperty('gift_certificate_code')) {
            obj['gift_certificate_code'] = ApiClient.convertToType(data['gift_certificate_code'], 'String');
          }
        }

        return obj;
      }
    }]);

    return GiftCertificateRequest;
  }();

  /**
  * The Locale model module.
  * @module models/Locale
  * @version 17.8
  */

  var Locale =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Locale</code>.
    * Document that describes a single locale.
    * @alias module:models/Locale
    * @class
    */
    function Locale() {
      _classCallCheck(this, Locale);

      /**
      * The country/region code for this Locale, which will  either be the empty string or an upercase ISO 3166 2-letter code.
      * @member {String} country
      */
      this.country = undefined;
      /**
      * Flag that is true if the locale is the default one to use if an explicit locale is not specified.
      * @member {Boolean} default
      */

      this["default"] = undefined;
      /**
      * The name for the Locale's country that is appropriate for  display to the user, or an empty
      * string if no country has been specified  for the Locale.  The display country is returned
      * in the language defined for this locale,  and not in the language of the session locale.
      * @member {String} display_country
      */

      this.display_country = undefined;
      /**
      * The name for the Locale's language that is appropriate for  display to the user, or an
      * empty string if no language has been specified  for the Locale.  The display language is
      * returned in the language defined for this locale,  and not in the language of the session locale.
      * @member {String} display_language
      */

      this.display_language = undefined;
      /**
      * The name for the Locale that is appropriate for  display to the user, or an empty string if
      * no display name has been  specified for the Locale.  The display name is returned in the
      * language defined for this locale,  and not in the language of the session locale.
      * @member {String} display_name
      */

      this.display_name = undefined;
      /**
      * The identifier of the Locale. Contains a combination of the  language and the country key,
      * concatenated by \"-\", e.g. \"en-US\". This  attribute is the primary key of the class.
      * @member {String} id
      */

      this.id = undefined;
      /**
      * The three-letter abbreviation for this Locale's country, or an  empty string if no country
      * has been specified for the Locale.
      * @member {String} iso3_country
      */

      this.iso3_country = undefined;
      /**
      * The three-letter abbreviation for this Locale's language, or an  empty string if no
      * language has been specified for the  Locale.
      * @member {String} iso3_language
      */

      this.iso3_language = undefined;
      /**
      * The language code for this Locale, which will either  be the empty string or a lowercase ISO 639 code.
      * @member {String} language
      */

      this.language = undefined;
      /**
      * The display name of the Locale. This uses the current  request locale to localize the value.
      * @member {String} name
      */

      this.name = undefined;
    }
    /**
    * Constructs a <code>Locale</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Locale} obj Optional instance to populate.
    * @return {module:models/Locale} The populated <code>Locale</code> instance.
    */


    _createClass(Locale, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Locale();

          if (data.hasOwnProperty('country')) {
            obj['country'] = ApiClient.convertToType(data['country'], 'String');
          }

          if (data.hasOwnProperty('default')) {
            obj['default'] = ApiClient.convertToType(data['default'], 'Boolean');
          }

          if (data.hasOwnProperty('display_country')) {
            obj['display_country'] = ApiClient.convertToType(data['display_country'], 'String');
          }

          if (data.hasOwnProperty('display_language')) {
            obj['display_language'] = ApiClient.convertToType(data['display_language'], 'String');
          }

          if (data.hasOwnProperty('display_name')) {
            obj['display_name'] = ApiClient.convertToType(data['display_name'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('iso3_country')) {
            obj['iso3_country'] = ApiClient.convertToType(data['iso3_country'], 'String');
          }

          if (data.hasOwnProperty('iso3_language')) {
            obj['iso3_language'] = ApiClient.convertToType(data['iso3_language'], 'String');
          }

          if (data.hasOwnProperty('language')) {
            obj['language'] = ApiClient.convertToType(data['language'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Locale;
  }();

  /**
  * The NestedQuery model module.
  * @module models/NestedQuery
  * @version 17.8
  */

  var NestedQuery =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>NestedQuery</code>.
    * Nested query allows to query upon nested documents that are part of a larger document. The classical
    * example is a  product master with variants (in one big document) where you want to constraint a search
    * to masters that have  variants that match multiple constraints (like color &#x3D; blue AND size &#x3D; M).
    * @alias module:models/NestedQuery
    * @class
    * @param path {String}
    * @param query {module:models/Query}
    */
    function NestedQuery(path, query) {
      _classCallCheck(this, NestedQuery);

      /**
      *
      * @member {String} path
      */
      this.path = path;
      /**
      *
      * @member {module:models/Query} query
      */

      this.query = query;
      /**
      *
      * @member {module:models/NestedQuery.ScoreModeEnum} score_mode
      */

      this.score_mode = undefined;
    }
    /**
    * Constructs a <code>NestedQuery</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/NestedQuery} obj Optional instance to populate.
    * @return {module:models/NestedQuery} The populated <code>NestedQuery</code> instance.
    */


    _createClass(NestedQuery, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new NestedQuery();

          if (data.hasOwnProperty('path')) {
            obj['path'] = ApiClient.convertToType(data['path'], 'String');
          }

          if (data.hasOwnProperty('query')) {
            obj['query'] = Query.constructFromObject(data['query']);
          }

          if (data.hasOwnProperty('score_mode')) {
            obj['score_mode'] = ApiClient.convertToType(data['score_mode'], 'String');
          }
        }

        return obj;
      }
    }]);

    return NestedQuery;
  }();
  NestedQuery.ScoreModeEnum = {
    /**
     * value: "avg"
     * @const
     */
    avg: 'avg',

    /**
     * value: "total"
     * @const
     */
    total: 'total',

    /**
     * value: "max"
     * @const
     */
    max: 'max',

    /**
     * value: "none"
     * @const
     */
    none: 'none'
  };

  /**
  * The Note model module.
  * @module models/Note
  * @version 17.8
  */

  var Note =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Note</code>.
    * Document representing a note to an object.
    * @alias module:models/Note
    * @class
    */
    function Note() {
      _classCallCheck(this, Note);

      /**
      * The author of the note.
      * @member {String} created_by
      */
      this.created_by = undefined;
      /**
      * The creation date of the note.
      * @member {Date} creation_date
      */

      this.creation_date = undefined;
      /**
      * The ID of the note.
      * @member {String} id
      */

      this.id = undefined;
      /**
      * The note's subject.
      * @member {String} subject
      */

      this.subject = undefined;
      /**
      * The note's text.
      * @member {String} text
      */

      this.text = undefined;
    }
    /**
    * Constructs a <code>Note</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Note} obj Optional instance to populate.
    * @return {module:models/Note} The populated <code>Note</code> instance.
    */


    _createClass(Note, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Note();

          if (data.hasOwnProperty('created_by')) {
            obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
          }

          if (data.hasOwnProperty('creation_date')) {
            obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('subject')) {
            obj['subject'] = ApiClient.convertToType(data['subject'], 'String');
          }

          if (data.hasOwnProperty('text')) {
            obj['text'] = ApiClient.convertToType(data['text'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Note;
  }();

  /**
  * The NotesResult model module.
  * @module models/NotesResult
  * @version 17.8
  */

  var NotesResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>NotesResult</code>.
    * A result of a note request.   Contains notes for an object - for example, for a basket.
    * @alias module:models/NotesResult
    * @class
    */
    function NotesResult() {
      _classCallCheck(this, NotesResult);

      /**
      * The notes for an object.
      * @member {Array.<module:models/Note>} notes
      */
      this.notes = undefined;
    }
    /**
    * Constructs a <code>NotesResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/NotesResult} obj Optional instance to populate.
    * @return {module:models/NotesResult} The populated <code>NotesResult</code> instance.
    */


    _createClass(NotesResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new NotesResult();

          if (data.hasOwnProperty('notes')) {
            obj['notes'] = ApiClient.convertToType(data['notes'], [Note]);
          }
        }

        return obj;
      }
    }]);

    return NotesResult;
  }();

  /**
  * The OrderPaymentInstrumentRequest model module.
  * @module models/OrderPaymentInstrumentRequest
  * @version 17.8
  */

  var OrderPaymentInstrumentRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>OrderPaymentInstrumentRequest</code>.
    * Document representing an order payment instrument request.
    * @alias module:models/OrderPaymentInstrumentRequest
    * @class
    */
    function OrderPaymentInstrumentRequest() {
      _classCallCheck(this, OrderPaymentInstrumentRequest);

      /**
      * The payment transaction amount.
      * @member {Number} amount
      */
      this.amount = undefined;
      /**
      * The bank routing number.
      * @member {String} bank_routing_number
      */

      this.bank_routing_number = undefined;
      /**
      * A flag indicating whether a related customer payment instrument should be created. The CustomerPaymentInstrument  is only created when the OrderPaymentInstrument was authorized successfully.
      * @member {Boolean} create_customer_payment_instrument
      */

      this.create_customer_payment_instrument = undefined;
      /**
      * The id of a customer payment instrument.
      * @member {String} customer_payment_instrument_id
      */

      this.customer_payment_instrument_id = undefined;
      /**
      * The gift certificate code.
      * @member {String} gift_certificate_code
      */

      this.gift_certificate_code = undefined;
      /**
      * The payment bank account request data.
      * @member {module:models/PaymentBankAccountRequest} payment_bank_account
      */

      this.payment_bank_account = undefined;
      /**
      * The payment card.
      * @member {module:models/OrderPaymentCardRequest} payment_card
      */

      this.payment_card = undefined;
      /**
      * The payment method id. Optional if a customer payment instrument id is specified.
      * @member {String} payment_method_id
      */

      this.payment_method_id = undefined;
    }
    /**
    * Constructs a <code>OrderPaymentInstrumentRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/OrderPaymentInstrumentRequest} obj Optional instance to populate.
    * @return {module:models/OrderPaymentInstrumentRequest} The populated <code>OrderPaymentInstrumentRequest</code> instance.
    */


    _createClass(OrderPaymentInstrumentRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new OrderPaymentInstrumentRequest();

          if (data.hasOwnProperty('amount')) {
            obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
          }

          if (data.hasOwnProperty('bank_routing_number')) {
            obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
          }

          if (data.hasOwnProperty('create_customer_payment_instrument')) {
            obj['create_customer_payment_instrument'] = ApiClient.convertToType(data['create_customer_payment_instrument'], 'Boolean');
          }

          if (data.hasOwnProperty('customer_payment_instrument_id')) {
            obj['customer_payment_instrument_id'] = ApiClient.convertToType(data['customer_payment_instrument_id'], 'String');
          }

          if (data.hasOwnProperty('gift_certificate_code')) {
            obj['gift_certificate_code'] = ApiClient.convertToType(data['gift_certificate_code'], 'String');
          }

          if (data.hasOwnProperty('payment_bank_account')) {
            obj['payment_bank_account'] = PaymentBankAccountRequest.constructFromObject(data['payment_bank_account']);
          }

          if (data.hasOwnProperty('payment_card')) {
            obj['payment_card'] = OrderPaymentCardRequest.constructFromObject(data['payment_card']);
          }

          if (data.hasOwnProperty('payment_method_id')) {
            obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
          }
        }

        return obj;
      }
    }]);

    return OrderPaymentInstrumentRequest;
  }();

  /**
  * The OrderSearchHit model module.
  * @module models/OrderSearchHit
  * @version 17.8
  */

  var OrderSearchHit =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>OrderSearchHit</code>.
    * Document representing an order search hit.
    * @alias module:models/OrderSearchHit
    * @class
    */
    function OrderSearchHit() {
      _classCallCheck(this, OrderSearchHit);

      /**
      *
      * @member {module:models/Order} data
      */
      this.data = undefined;
      /**
      * The hit's relevance score.
      * @member {Number} relevance
      */

      this.relevance = undefined;
    }
    /**
    * Constructs a <code>OrderSearchHit</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/OrderSearchHit} obj Optional instance to populate.
    * @return {module:models/OrderSearchHit} The populated <code>OrderSearchHit</code> instance.
    */


    _createClass(OrderSearchHit, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new OrderSearchHit();

          if (data.hasOwnProperty('data')) {
            obj['data'] = Order.constructFromObject(data['data']);
          }

          if (data.hasOwnProperty('relevance')) {
            obj['relevance'] = ApiClient.convertToType(data['relevance'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return OrderSearchHit;
  }();

  /**
  * The Sort model module.
  * @module models/Sort
  * @version 17.8
  */

  var Sort =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Sort</code>.
    * Document representing a sort request.
    * @alias module:models/Sort
    * @class
    */
    function Sort() {
      _classCallCheck(this, Sort);

      /**
      * The name of the field to sort on.
      * @member {String} field
      */
      this.field = undefined;
      /**
      * The sort order to be applied when sorting. When omitted, the default sort order (ASC) is used.
      * @member {module:models/Sort.SortOrderEnum} sort_order
      */

      this.sort_order = undefined;
    }
    /**
    * Constructs a <code>Sort</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Sort} obj Optional instance to populate.
    * @return {module:models/Sort} The populated <code>Sort</code> instance.
    */


    _createClass(Sort, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Sort();

          if (data.hasOwnProperty('field')) {
            obj['field'] = ApiClient.convertToType(data['field'], 'String');
          }

          if (data.hasOwnProperty('sort_order')) {
            obj['sort_order'] = ApiClient.convertToType(data['sort_order'], 'String');
          }
        }

        return obj;
      }
    }]);

    return Sort;
  }();
  Sort.SortOrderEnum = {
    /**
     * value: "asc"
     * @const
     */
    asc: 'asc',

    /**
     * value: "desc"
     * @const
     */
    desc: 'desc'
  };

  /**
  * The OrderSearchRequest model module.
  * @module models/OrderSearchRequest
  * @version 17.8
  */

  var OrderSearchRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>OrderSearchRequest</code>.
    * Document representing an order search request.
    * @alias module:models/OrderSearchRequest
    * @class
    * @param query {module:models/Query} The query to apply
    */
    function OrderSearchRequest(query) {
      _classCallCheck(this, OrderSearchRequest);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * List of expansions to be applied to each search results. Expands are optional.
      * @member {Array.<String>} expand
      */

      this.expand = undefined;
      /**
      * The query to apply
      * @member {module:models/Query} query
      */

      this.query = query;
      /**
      * The field to be selected.
      * @member {String} select
      */

      this.select = undefined;
      /**
      * The list of sort clauses configured for the search request. Sort clauses are optional.
      * @member {Array.<module:models/Sort>} sorts
      */

      this.sorts = undefined;
      /**
      * The zero-based index of the first search hit to include in the result.
      * @member {Number} start
      */

      this.start = undefined;
    }
    /**
    * Constructs a <code>OrderSearchRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/OrderSearchRequest} obj Optional instance to populate.
    * @return {module:models/OrderSearchRequest} The populated <code>OrderSearchRequest</code> instance.
    */


    _createClass(OrderSearchRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new OrderSearchRequest();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('expand')) {
            obj['expand'] = ApiClient.convertToType(data['expand'], ['String']);
          }

          if (data.hasOwnProperty('query')) {
            obj['query'] = Query.constructFromObject(data['query']);
          }

          if (data.hasOwnProperty('select')) {
            obj['select'] = ApiClient.convertToType(data['select'], 'String');
          }

          if (data.hasOwnProperty('sorts')) {
            obj['sorts'] = ApiClient.convertToType(data['sorts'], [Sort]);
          }

          if (data.hasOwnProperty('start')) {
            obj['start'] = ApiClient.convertToType(data['start'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return OrderSearchRequest;
  }();

  /**
  * The ResultPage model module.
  * @module models/ResultPage
  * @version 17.8
  */

  var ResultPage =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ResultPage</code>.
    * Data that can be used to get the next and previous page of a Data API results object.
    * @alias module:models/ResultPage
    * @class
    */
    function ResultPage() {
      _classCallCheck(this, ResultPage);

      /**
      * Returns the count of search hits to include in the page.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * Returns the zero-based index of the first search hit in the page.
      * @member {Number} start
      */

      this.start = undefined;
    }
    /**
    * Constructs a <code>ResultPage</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ResultPage} obj Optional instance to populate.
    * @return {module:models/ResultPage} The populated <code>ResultPage</code> instance.
    */


    _createClass(ResultPage, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ResultPage();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('start')) {
            obj['start'] = ApiClient.convertToType(data['start'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return ResultPage;
  }();

  /**
  * The OrderSearchResult model module.
  * @module models/OrderSearchResult
  * @version 17.8
  */

  var OrderSearchResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>OrderSearchResult</code>.
    * Document representing an order search result.
    * @alias module:models/OrderSearchResult
    * @class
    */
    function OrderSearchResult() {
      _classCallCheck(this, OrderSearchResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * @member {Array.<Object>} data
      */

      this.data = undefined;
      /**
      * The list of expands set for the search request. Expands are optional.
      * @member {Array.<String>} expand
      */

      this.expand = undefined;
      /**
      * The sorted array of search hits. This array can be empty.
      * @member {Array.<module:models/OrderSearchHit>} hits
      */

      this.hits = undefined;
      /**
      * The data that can be used (as parameters on the search request) to retrieve the next result page.
      * @member {module:models/ResultPage} next
      */

      this.next = undefined;
      /**
      * The data that can be used to retrieve the previous result page (as parameters on the search request).
      * @member {module:models/ResultPage} previous
      */

      this.previous = undefined;
      /**
      * The query passed into the search
      * @member {module:models/Query} query
      */

      this.query = undefined;
      /**
      * The fields that you want to select.
      * @member {String} select
      */

      this.select = undefined;
      /**
      * The list of sort clauses configured for the search request. Sort clauses are optional.
      * @member {Array.<module:models/Sort>} sorts
      */

      this.sorts = undefined;
      /**
      * The zero-based index of the first search hit to include in the result.
      * @member {Number} start
      */

      this.start = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>OrderSearchResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/OrderSearchResult} obj Optional instance to populate.
    * @return {module:models/OrderSearchResult} The populated <code>OrderSearchResult</code> instance.
    */


    _createClass(OrderSearchResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new OrderSearchResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [Object]);
          }

          if (data.hasOwnProperty('expand')) {
            obj['expand'] = ApiClient.convertToType(data['expand'], ['String']);
          }

          if (data.hasOwnProperty('hits')) {
            obj['hits'] = ApiClient.convertToType(data['hits'], [OrderSearchHit]);
          }

          if (data.hasOwnProperty('next')) {
            obj['next'] = ResultPage.constructFromObject(data['next']);
          }

          if (data.hasOwnProperty('previous')) {
            obj['previous'] = ResultPage.constructFromObject(data['previous']);
          }

          if (data.hasOwnProperty('query')) {
            obj['query'] = Query.constructFromObject(data['query']);
          }

          if (data.hasOwnProperty('select')) {
            obj['select'] = ApiClient.convertToType(data['select'], 'String');
          }

          if (data.hasOwnProperty('sorts')) {
            obj['sorts'] = ApiClient.convertToType(data['sorts'], [Sort]);
          }

          if (data.hasOwnProperty('start')) {
            obj['start'] = ApiClient.convertToType(data['start'], 'Number');
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return OrderSearchResult;
  }();

  /**
  * The PasswordChangeRequest model module.
  * @module models/PasswordChangeRequest
  * @version 17.8
  */

  var PasswordChangeRequest =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PasswordChangeRequest</code>.
    * Document representing a password change request.
    * @alias module:models/PasswordChangeRequest
    * @class
    * @param currentPassword {String} The customer's current password.
    * @param password {String} The customer's new password.
    */
    function PasswordChangeRequest(currentPassword, password) {
      _classCallCheck(this, PasswordChangeRequest);

      /**
      * The customer's current password.
      * @member {String} current_password
      */
      this.current_password = currentPassword;
      /**
      * The customer's new password.
      * @member {String} password
      */

      this.password = password;
    }
    /**
    * Constructs a <code>PasswordChangeRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PasswordChangeRequest} obj Optional instance to populate.
    * @return {module:models/PasswordChangeRequest} The populated <code>PasswordChangeRequest</code> instance.
    */


    _createClass(PasswordChangeRequest, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PasswordChangeRequest();

          if (data.hasOwnProperty('current_password')) {
            obj['current_password'] = ApiClient.convertToType(data['current_password'], 'String');
          }

          if (data.hasOwnProperty('password')) {
            obj['password'] = ApiClient.convertToType(data['password'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PasswordChangeRequest;
  }();

  /**
  * The PasswordReset model module.
  * @module models/PasswordReset
  * @version 17.8
  */

  var PasswordReset =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PasswordReset</code>.
    * Document representing a password reset request.
    * @alias module:models/PasswordReset
    * @class
    */
    function PasswordReset() {
      _classCallCheck(this, PasswordReset);

      /**
      * The customer's login or the customer's email depending on the type value.
      * @member {String} identification
      */
      this.identification = undefined;
      /**
      * The type of customer identification.
      * @member {module:models/PasswordReset.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>PasswordReset</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PasswordReset} obj Optional instance to populate.
    * @return {module:models/PasswordReset} The populated <code>PasswordReset</code> instance.
    */


    _createClass(PasswordReset, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PasswordReset();

          if (data.hasOwnProperty('identification')) {
            obj['identification'] = ApiClient.convertToType(data['identification'], 'String');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PasswordReset;
  }();
  PasswordReset.TypeEnum = {
    /**
     * value: "email"
     * @const
     */
    email: 'email',

    /**
     * value: "login"
     * @const
     */
    login: 'login'
  };

  /**
  * The PaymentCardSpec model module.
  * @module models/PaymentCardSpec
  * @version 17.8
  */

  var PaymentCardSpec =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PaymentCardSpec</code>.
    * Document representing the specification for a payment card.
    * @alias module:models/PaymentCardSpec
    * @class
    */
    function PaymentCardSpec() {
      _classCallCheck(this, PaymentCardSpec);

      /**
      * The type of the payment card.
      * @member {String} card_type
      */
      this.card_type = undefined;
      /**
      * A flag indicating whether the card number is verified using the Luhn checksum algorithm.
      * @member {Boolean} checksum_verification_enabled
      */

      this.checksum_verification_enabled = undefined;
      /**
      * The localized description of the payment card.
      * @member {String} description
      */

      this.description = undefined;
      /**
      * The URL to the image that represents the payment card.
      * @member {String} image
      */

      this.image = undefined;
      /**
      * The localized name of the payment card.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The sorted list of number lengths (individual lengths as well as  length ranges).
      * @member {Array.<String>} number_lengths
      */

      this.number_lengths = undefined;
      /**
      * The sorted list of number prefixes (individual prefixes as well  as prefix ranges).
      * @member {Array.<String>} number_prefixes
      */

      this.number_prefixes = undefined;
      /**
      * The length of the security code for this card.
      * @member {Number} security_code_length
      */

      this.security_code_length = undefined;
    }
    /**
    * Constructs a <code>PaymentCardSpec</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PaymentCardSpec} obj Optional instance to populate.
    * @return {module:models/PaymentCardSpec} The populated <code>PaymentCardSpec</code> instance.
    */


    _createClass(PaymentCardSpec, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PaymentCardSpec();

          if (data.hasOwnProperty('card_type')) {
            obj['card_type'] = ApiClient.convertToType(data['card_type'], 'String');
          }

          if (data.hasOwnProperty('checksum_verification_enabled')) {
            obj['checksum_verification_enabled'] = ApiClient.convertToType(data['checksum_verification_enabled'], 'Boolean');
          }

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = ApiClient.convertToType(data['image'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('number_lengths')) {
            obj['number_lengths'] = ApiClient.convertToType(data['number_lengths'], ['String']);
          }

          if (data.hasOwnProperty('number_prefixes')) {
            obj['number_prefixes'] = ApiClient.convertToType(data['number_prefixes'], ['String']);
          }

          if (data.hasOwnProperty('security_code_length')) {
            obj['security_code_length'] = ApiClient.convertToType(data['security_code_length'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return PaymentCardSpec;
  }();

  /**
  * The PaymentMethod model module.
  * @module models/PaymentMethod
  * @version 17.8
  */

  var PaymentMethod =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PaymentMethod</code>.
    * Document representing a payment method.
    * @alias module:models/PaymentMethod
    * @class
    * @param id {String} The id of the payment method or card.
    */
    function PaymentMethod(id) {
      _classCallCheck(this, PaymentMethod);

      /**
      * The sorted array of payment cards (included only when the system payment method is CREDIT_CARD).
      * @member {Array.<module:models/PaymentCardSpec>} cards
      */
      this.cards = undefined;
      /**
      * The localized description of the payment method or card.
      * @member {String} description
      */

      this.description = undefined;
      /**
      * The id of the payment method or card.
      * @member {String} id
      */

      this.id = id;
      /**
      * The URL to the image that represents the payment method or card.
      * @member {String} image
      */

      this.image = undefined;
      /**
      * The localized name of the payment method or card.
      * @member {String} name
      */

      this.name = undefined;
    }
    /**
    * Constructs a <code>PaymentMethod</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PaymentMethod} obj Optional instance to populate.
    * @return {module:models/PaymentMethod} The populated <code>PaymentMethod</code> instance.
    */


    _createClass(PaymentMethod, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PaymentMethod();

          if (data.hasOwnProperty('cards')) {
            obj['cards'] = ApiClient.convertToType(data['cards'], [PaymentCardSpec]);
          }

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = ApiClient.convertToType(data['image'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PaymentMethod;
  }();

  /**
  * The PaymentMethodResult model module.
  * @module models/PaymentMethodResult
  * @version 17.8
  */

  var PaymentMethodResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PaymentMethodResult</code>.
    * Result document of payment methods applicable for a basket.
    * @alias module:models/PaymentMethodResult
    * @class
    */
    function PaymentMethodResult() {
      _classCallCheck(this, PaymentMethodResult);

      /**
      * The applicable payment methods.
      * @member {Array.<module:models/PaymentMethod>} applicable_payment_methods
      */
      this.applicable_payment_methods = undefined;
    }
    /**
    * Constructs a <code>PaymentMethodResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PaymentMethodResult} obj Optional instance to populate.
    * @return {module:models/PaymentMethodResult} The populated <code>PaymentMethodResult</code> instance.
    */


    _createClass(PaymentMethodResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PaymentMethodResult();

          if (data.hasOwnProperty('applicable_payment_methods')) {
            obj['applicable_payment_methods'] = ApiClient.convertToType(data['applicable_payment_methods'], [PaymentMethod]);
          }
        }

        return obj;
      }
    }]);

    return PaymentMethodResult;
  }();

  /**
  * The PriceAdjustmentLimit model module.
  * @module models/PriceAdjustmentLimit
  * @version 17.8
  */

  var PriceAdjustmentLimit =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PriceAdjustmentLimit</code>.
    *   A price adjustment limit specifies the amount of manual adjustment that can be applied by a user at
    *  the specified  level.
    * @alias module:models/PriceAdjustmentLimit
    * @class
    */
    function PriceAdjustmentLimit() {
      _classCallCheck(this, PriceAdjustmentLimit);

      /**
      * The value for the currency or null if no currency value is specified.
      * @member {Number} amount
      */
      this.amount = undefined;
      /**
      * Returns the currency of the Price Adjustment Limit or null if not applicable.    Will be null if this
      * is a percent limit only.    Price adjustment limits can be given up to a fixed amount (unit=a currency unit).
      * @member {String} currency
      */

      this.currency = undefined;
      /**
      * Returns percentage value of the Price Adjustment Limit or null if not applicable.    Will be null
      * if this is a currency limit only.
      * @member {Number} percent
      */

      this.percent = undefined;
      /**
      * The Price Adjustment Limit type - ITEM, SHIPPING or ORDER. It identifies the level at which the
      * Price Adjustment  is applicable.
      * @member {module:models/PriceAdjustmentLimit.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>PriceAdjustmentLimit</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PriceAdjustmentLimit} obj Optional instance to populate.
    * @return {module:models/PriceAdjustmentLimit} The populated <code>PriceAdjustmentLimit</code> instance.
    */


    _createClass(PriceAdjustmentLimit, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PriceAdjustmentLimit();

          if (data.hasOwnProperty('amount')) {
            obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
          }

          if (data.hasOwnProperty('currency')) {
            obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
          }

          if (data.hasOwnProperty('percent')) {
            obj['percent'] = ApiClient.convertToType(data['percent'], 'Number');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PriceAdjustmentLimit;
  }();
  PriceAdjustmentLimit.TypeEnum = {
    /**
     * value: "item"
     * @const
     */
    item: 'item',

    /**
     * value: "shipping"
     * @const
     */
    shipping: 'shipping',

    /**
     * value: "order"
     * @const
     */
    order: 'order'
  };

  /**
  * The PriceAdjustmentLimits model module.
  * @module models/PriceAdjustmentLimits
  * @version 17.8
  */

  var PriceAdjustmentLimits =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PriceAdjustmentLimits</code>.
    * Document representing a list of PriceAdjustmentLimit items.  It returns all the price adjustment limits for a particular user  across various Access Roles.
    * @alias module:models/PriceAdjustmentLimits
    * @class
    */
    function PriceAdjustmentLimits() {
      _classCallCheck(this, PriceAdjustmentLimits);

      /**
      * The list of price adjustment limits applicable for a user across all roles.
      * @member {Array.<module:models/PriceAdjustmentLimit>} limits
      */
      this.limits = undefined;
    }
    /**
    * Constructs a <code>PriceAdjustmentLimits</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PriceAdjustmentLimits} obj Optional instance to populate.
    * @return {module:models/PriceAdjustmentLimits} The populated <code>PriceAdjustmentLimits</code> instance.
    */


    _createClass(PriceAdjustmentLimits, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PriceAdjustmentLimits();

          if (data.hasOwnProperty('limits')) {
            obj['limits'] = ApiClient.convertToType(data['limits'], [PriceAdjustmentLimit]);
          }
        }

        return obj;
      }
    }]);

    return PriceAdjustmentLimits;
  }();

  /**
  * The ProductListRegistrant model module.
  * @module models/ProductListRegistrant
  * @version 17.8
  */

  var ProductListRegistrant =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductListRegistrant</code>.
    *   A ProductListRegistrant is typically associated with an event related product list such as a gift registry.
    * It holds  information about a person associated with the event such as a bride or groom.
    * @alias module:models/ProductListRegistrant
    * @class
    */
    function ProductListRegistrant() {
      _classCallCheck(this, ProductListRegistrant);

      /**
      * The first name of the registrant.
      * @member {String} first_name
      */
      this.first_name = undefined;
      /**
      * The last name of the registrant.
      * @member {String} last_name
      */

      this.last_name = undefined;
      /**
      * The role of the registrant.
      * @member {String} role
      */

      this.role = undefined;
    }
    /**
    * Constructs a <code>ProductListRegistrant</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductListRegistrant} obj Optional instance to populate.
    * @return {module:models/ProductListRegistrant} The populated <code>ProductListRegistrant</code> instance.
    */


    _createClass(ProductListRegistrant, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductListRegistrant();

          if (data.hasOwnProperty('first_name')) {
            obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
          }

          if (data.hasOwnProperty('last_name')) {
            obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
          }

          if (data.hasOwnProperty('role')) {
            obj['role'] = ApiClient.convertToType(data['role'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductListRegistrant;
  }();

  /**
  * The ProductResult model module.
  * @module models/ProductResult
  * @version 17.8
  */

  var ProductResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductResult</code>.
    * Result document containing an array of products.
    * @alias module:models/ProductResult
    * @class
    */
    function ProductResult() {
      _classCallCheck(this, ProductResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of product documents.
      * @member {Array.<module:models/Product>} data
      */

      this.data = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>ProductResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductResult} obj Optional instance to populate.
    * @return {module:models/ProductResult} The populated <code>ProductResult</code> instance.
    */


    _createClass(ProductResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [Product]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return ProductResult;
  }();

  /**
  * The ProductRef model module.
  * @module models/ProductRef
  * @version 17.8
  */

  var ProductRef =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductRef</code>.
    * Document representing a product reference.
    * @alias module:models/ProductRef
    * @class
    * @param id {String} The ID of the product reference.
    */
    function ProductRef(id) {
      _classCallCheck(this, ProductRef);

      /**
      * The ID of the product reference.
      * @member {String} id
      */
      this.id = id;
      /**
      * The link to the product reference.
      * @member {String} link
      */

      this.link = undefined;
    }
    /**
    * Constructs a <code>ProductRef</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductRef} obj Optional instance to populate.
    * @return {module:models/ProductRef} The populated <code>ProductRef</code> instance.
    */


    _createClass(ProductRef, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductRef();

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductRef;
  }();

  /**
  * The ProductSearchHit model module.
  * @module models/ProductSearchHit
  * @version 17.8
  */

  var ProductSearchHit =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductSearchHit</code>.
    * Document representing a product search hit.
    * @alias module:models/ProductSearchHit
    * @class
    */
    function ProductSearchHit() {
      _classCallCheck(this, ProductSearchHit);

      /**
      * The ISO 4217 mnemonic code of the currency.
      * @member {String} currency
      */
      this.currency = undefined;
      /**
      * The first image of the product hit for the configured viewtype.
      * @member {module:models/Image} image
      */

      this.image = undefined;
      /**
      * The URL addressing the product.
      * @member {String} link
      */

      this.link = undefined;
      /**
      * A flag indicating whether the product is orderable.
      * @member {Boolean} orderable
      */

      this.orderable = undefined;
      /**
      * The sales price of the product. In case of complex products like master or set this is the minimum price of  related child products.
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * The maximum sales of related child products in case of complex products like master or set.
      * @member {Number} price_max
      */

      this.price_max = undefined;
      /**
      * The prices map with price book ids and their values.
      * @member {Object.<String, Number>} prices
      */

      this.prices = undefined;
      /**
      * The id (SKU) of the product.
      * @member {String} product_id
      */

      this.product_id = undefined;
      /**
      * The localized name of the product.
      * @member {String} product_name
      */

      this.product_name = undefined;
      /**
      * The type information for the product.
      * @member {module:models/ProductType} product_type
      */

      this.product_type = undefined;
      /**
      * The first represented product.
      * @member {module:models/ProductRef} represented_product
      */

      this.represented_product = undefined;
      /**
      * All the represented products.
      * @member {Array.<module:models/ProductRef>} represented_products
      */

      this.represented_products = undefined;
      /**
      * The array of represented variation attributes (for the master product only). This array can be empty.
      * @member {Array.<module:models/VariationAttribute>} variation_attributes
      */

      this.variation_attributes = undefined;
    }
    /**
    * Constructs a <code>ProductSearchHit</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductSearchHit} obj Optional instance to populate.
    * @return {module:models/ProductSearchHit} The populated <code>ProductSearchHit</code> instance.
    */


    _createClass(ProductSearchHit, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductSearchHit();

          if (data.hasOwnProperty('currency')) {
            obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = Image.constructFromObject(data['image']);
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('orderable')) {
            obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('price_max')) {
            obj['price_max'] = ApiClient.convertToType(data['price_max'], 'Number');
          }

          if (data.hasOwnProperty('prices')) {
            obj['prices'] = ApiClient.convertToType(data['prices'], {
              String: 'Number'
            });
          }

          if (data.hasOwnProperty('product_id')) {
            obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
          }

          if (data.hasOwnProperty('product_name')) {
            obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
          }

          if (data.hasOwnProperty('product_type')) {
            obj['product_type'] = ProductType.constructFromObject(data['product_type']);
          }

          if (data.hasOwnProperty('represented_product')) {
            obj['represented_product'] = ProductRef.constructFromObject(data['represented_product']);
          }

          if (data.hasOwnProperty('represented_products')) {
            obj['represented_products'] = ApiClient.convertToType(data['represented_products'], [ProductRef]);
          }

          if (data.hasOwnProperty('variation_attributes')) {
            obj['variation_attributes'] = ApiClient.convertToType(data['variation_attributes'], [VariationAttribute]);
          }
        }

        return obj;
      }
    }]);

    return ProductSearchHit;
  }();

  /**
  * The ProductSearchRefinementValue model module.
  * @module models/ProductSearchRefinementValue
  * @version 17.8
  */

  var ProductSearchRefinementValue =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductSearchRefinementValue</code>.
    * Document representing a product search refinement value.
    * @alias module:models/ProductSearchRefinementValue
    * @class
    */
    function ProductSearchRefinementValue() {
      _classCallCheck(this, ProductSearchRefinementValue);

      /**
      * The localized description of the refinement value.
      * @member {String} description
      */
      this.description = undefined;
      /**
      * The number of search hits when selecting the refinement value. Can be 0.
      * @member {Number} hit_count
      */

      this.hit_count = undefined;
      /**
      * The localized label of the refinement value.
      * @member {String} label
      */

      this.label = undefined;
      /**
      * The optional presentation id associated with the refinement value.  The presentation id can be used,
      * for example, to associate an id with  an HTML widget.
      * @member {String} presentation_id
      */

      this.presentation_id = undefined;
      /**
      * The refinement value. In the case of an attribute refinement, this is the bucket,  the attribute value,
      * or a value range. In the case of a category refinement, this is the  category id. In the case of a
      * price refinement,k this is the price range. Ranges are  enclosed by parentheses and separated
      * by \"..\"; for example, \"(100..999)\" and \"(Aa..Fa)\"  are valid ranges.
      * @member {String} value
      */

      this.value = undefined;
      /**
      * The array of hierarchical refinement values. This array can be empty.
      * @member {Array.<module:models/ProductSearchRefinementValue>} values
      */

      this.values = undefined;
    }
    /**
    * Constructs a <code>ProductSearchRefinementValue</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductSearchRefinementValue} obj Optional instance to populate.
    * @return {module:models/ProductSearchRefinementValue} The populated <code>ProductSearchRefinementValue</code> instance.
    */


    _createClass(ProductSearchRefinementValue, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductSearchRefinementValue();

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('hit_count')) {
            obj['hit_count'] = ApiClient.convertToType(data['hit_count'], 'Number');
          }

          if (data.hasOwnProperty('label')) {
            obj['label'] = ApiClient.convertToType(data['label'], 'String');
          }

          if (data.hasOwnProperty('presentation_id')) {
            obj['presentation_id'] = ApiClient.convertToType(data['presentation_id'], 'String');
          }

          if (data.hasOwnProperty('value')) {
            obj['value'] = ApiClient.convertToType(data['value'], 'String');
          }

          if (data.hasOwnProperty('values')) {
            obj['values'] = ApiClient.convertToType(data['values'], [ProductSearchRefinementValue]);
          }
        }

        return obj;
      }
    }]);

    return ProductSearchRefinementValue;
  }();

  /**
  * The ProductSearchRefinement model module.
  * @module models/ProductSearchRefinement
  * @version 17.8
  */

  var ProductSearchRefinement =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductSearchRefinement</code>.
    * Document representing a product search refinement attribute.
    * @alias module:models/ProductSearchRefinement
    * @class
    * @param attributeId {String} The id of the search refinement attribute. In the case of an attribute
    * refinement, this is the attribute id.  Custom attributes are marked by the
    * prefix \"c_\" (for example, \"c_refinementColor\"). In the case of a  category refinement,
    * the id must be \"cgid\". In the case of a price refinement, the id must be \"price\".
    */
    function ProductSearchRefinement(attributeId) {
      _classCallCheck(this, ProductSearchRefinement);

      /**
      * The id of the search refinement attribute. In the case of an attribute refinement, this is
      * the attribute id.  Custom attributes are marked by the prefix \"c_\" (for example, \"c_refinementColor\").
      * In the case of a  category refinement, the id must be \"cgid\". In the case of a price refinement,
      * the id must be \"price\".
      * @member {String} attribute_id
      */
      this.attribute_id = attributeId;
      /**
      * The localized label of the refinement.
      * @member {String} label
      */

      this.label = undefined;
      /**
      * The sorted array of refinement values. This array can be empty.
      * @member {Array.<module:models/ProductSearchRefinementValue>} values
      */

      this.values = undefined;
    }
    /**
    * Constructs a <code>ProductSearchRefinement</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductSearchRefinement} obj Optional instance to populate.
    * @return {module:models/ProductSearchRefinement} The populated <code>ProductSearchRefinement</code> instance.
    */


    _createClass(ProductSearchRefinement, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductSearchRefinement();

          if (data.hasOwnProperty('attribute_id')) {
            obj['attribute_id'] = ApiClient.convertToType(data['attribute_id'], 'String');
          }

          if (data.hasOwnProperty('label')) {
            obj['label'] = ApiClient.convertToType(data['label'], 'String');
          }

          if (data.hasOwnProperty('values')) {
            obj['values'] = ApiClient.convertToType(data['values'], [ProductSearchRefinementValue]);
          }
        }

        return obj;
      }
    }]);

    return ProductSearchRefinement;
  }();

  /**
  * The ProductSearchSortingOption model module.
  * @module models/ProductSearchSortingOption
  * @version 17.8
  */

  var ProductSearchSortingOption =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductSearchSortingOption</code>.
    * Document representing a product search sorting option.
    * @alias module:models/ProductSearchSortingOption
    * @class
    */
    function ProductSearchSortingOption() {
      _classCallCheck(this, ProductSearchSortingOption);

      /**
      * The id of the sorting option.
      * @member {String} id
      */
      this.id = undefined;
      /**
      * The localized label of the sorting option.
      * @member {String} label
      */

      this.label = undefined;
    }
    /**
    * Constructs a <code>ProductSearchSortingOption</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductSearchSortingOption} obj Optional instance to populate.
    * @return {module:models/ProductSearchSortingOption} The populated <code>ProductSearchSortingOption</code> instance.
    */


    _createClass(ProductSearchSortingOption, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductSearchSortingOption();

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('label')) {
            obj['label'] = ApiClient.convertToType(data['label'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ProductSearchSortingOption;
  }();

  /**
  * The SuggestedCategory model module.
  * @module models/SuggestedCategory
  * @version 17.8
  */

  var SuggestedCategory =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>SuggestedCategory</code>.
    * @alias module:models/SuggestedCategory
    * @class
    */
    function SuggestedCategory() {
      _classCallCheck(this, SuggestedCategory);

      /**
      * The id of the category.
      * @member {String} id
      */
      this.id = undefined;
      /**
      * The URL addressing the category.
      * @member {String} link
      */

      this.link = undefined;
      /**
      * The localized name of the category.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The name of the parent category.
      * @member {String} parent_category_name
      */

      this.parent_category_name = undefined;
    }
    /**
    * Constructs a <code>SuggestedCategory</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/SuggestedCategory} obj Optional instance to populate.
    * @return {module:models/SuggestedCategory} The populated <code>SuggestedCategory</code> instance.
    */


    _createClass(SuggestedCategory, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new SuggestedCategory();

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('parent_category_name')) {
            obj['parent_category_name'] = ApiClient.convertToType(data['parent_category_name'], 'String');
          }
        }

        return obj;
      }
    }]);

    return SuggestedCategory;
  }();

  /**
  * The SuggestedContent model module.
  * @module models/SuggestedContent
  * @version 17.8
  */

  var SuggestedContent =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>SuggestedContent</code>.
    * @alias module:models/SuggestedContent
    * @class
    */
    function SuggestedContent() {
      _classCallCheck(this, SuggestedContent);

      /**
      * The id of the content.
      * @member {String} id
      */
      this.id = undefined;
      /**
      * The URL addressing the content.
      * @member {String} link
      */

      this.link = undefined;
      /**
      * The localized name of the content.
      * @member {String} name
      */

      this.name = undefined;
    }
    /**
    * Constructs a <code>SuggestedContent</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/SuggestedContent} obj Optional instance to populate.
    * @return {module:models/SuggestedContent} The populated <code>SuggestedContent</code> instance.
    */


    _createClass(SuggestedContent, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new SuggestedContent();

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }
        }
      }
    }]);

    return SuggestedContent;
  }();

  /**
  * The SuggestedPhrase model module.
  * @module models/SuggestedPhrase
  * @version 17.8
  */

  var SuggestedPhrase =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>SuggestedPhrase</code>.
    * Document representing a suggested search phrase.
    * @alias module:models/SuggestedPhrase
    * @class
    */
    function SuggestedPhrase() {
      _classCallCheck(this, SuggestedPhrase);

      /**
      * Returns whether this suggested phrase exactly matches the user input search phrase.
      * @member {Boolean} exact_match
      */
      this.exact_match = undefined;
      /**
      * Returns the suggested search phrase.
      * @member {String} phrase
      */

      this.phrase = undefined;
    }
    /**
    * Constructs a <code>SuggestedPhrase</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/SuggestedPhrase} obj Optional instance to populate.
    * @return {module:models/SuggestedPhrase} The populated <code>SuggestedPhrase</code> instance.
    */


    _createClass(SuggestedPhrase, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new SuggestedPhrase();

          if (data.hasOwnProperty('exact_match')) {
            obj['exact_match'] = ApiClient.convertToType(data['exact_match'], 'Boolean');
          }

          if (data.hasOwnProperty('phrase')) {
            obj['phrase'] = ApiClient.convertToType(data['phrase'], 'String');
          }
        }

        return obj;
      }
    }]);

    return SuggestedPhrase;
  }();

  /**
  * The SuggestedProduct model module.
  * @module models/SuggestedProduct
  * @version 17.8
  */

  var SuggestedProduct =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>SuggestedProduct</code>.
    * Document representing a product search hit.
    * @alias module:models/SuggestedProduct
    * @class
    */
    function SuggestedProduct() {
      _classCallCheck(this, SuggestedProduct);

      /**
      * The ISO 4217 mnemonic code of the currency.
      * @member {String} currency
      */
      this.currency = undefined;
      /**
      * The first image of the product hit for the configured viewtype.
      * @member {module:models/Image} image
      */

      this.image = undefined;
      /**
      * The URL addressing the product.
      * @member {String} link
      */

      this.link = undefined;
      /**
      * The sales price of the product. In the case of complex products like a master or a set,
      * this is the minimum price of  related child products.
      * @member {Number} price
      */

      this.price = undefined;
      /**
      * The id (SKU) of the product.
      * @member {String} product_id
      */

      this.product_id = undefined;
      /**
      * The localized name of the product.
      * @member {String} product_name
      */

      this.product_name = undefined;
    }
    /**
    * Constructs a <code>SuggestedProduct</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/SuggestedProduct} obj Optional instance to populate.
    * @return {module:models/SuggestedProduct} The populated <code>SuggestedProduct</code> instance.
    */


    _createClass(SuggestedProduct, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new SuggestedProduct();

          if (data.hasOwnProperty('currency')) {
            obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = Image.constructFromObject(data['image']);
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('price')) {
            obj['price'] = ApiClient.convertToType(data['price'], 'Number');
          }

          if (data.hasOwnProperty('product_id')) {
            obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
          }

          if (data.hasOwnProperty('product_name')) {
            obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
          }
        }

        return obj;
      }
    }]);

    return SuggestedProduct;
  }();

  /**
  * The SuggestedTerm model module.
  * @module models/SuggestedTerm
  * @version 17.8
  */

  var SuggestedTerm =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>SuggestedTerm</code>.
    * Document representing a suggested term.
    * @alias module:models/SuggestedTerm
    * @class
    */
    function SuggestedTerm() {
      _classCallCheck(this, SuggestedTerm);

      /**
      * Returns whether this term value is a completion match.
      * @member {Boolean} completed
      */
      this.completed = undefined;
      /**
      * Returns whether this term value is a correction match.
      * @member {Boolean} corrected
      */

      this.corrected = undefined;
      /**
      * Returns whether this term value is a exact match.
      * @member {Boolean} exact_match
      */

      this.exact_match = undefined;
      /**
      * Returns the term value.
      * @member {String} value
      */

      this.value = undefined;
    }
    /**
    * Constructs a <code>SuggestedTerm</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/SuggestedTerm} obj Optional instance to populate.
    * @return {module:models/SuggestedTerm} The populated <code>SuggestedTerm</code> instance.
    */


    _createClass(SuggestedTerm, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new SuggestedTerm();

          if (data.hasOwnProperty('completed')) {
            obj['completed'] = ApiClient.convertToType(data['completed'], 'Boolean');
          }

          if (data.hasOwnProperty('corrected')) {
            obj['corrected'] = ApiClient.convertToType(data['corrected'], 'Boolean');
          }

          if (data.hasOwnProperty('exact_match')) {
            obj['exact_match'] = ApiClient.convertToType(data['exact_match'], 'Boolean');
          }

          if (data.hasOwnProperty('value')) {
            obj['value'] = ApiClient.convertToType(data['value'], 'String');
          }
        }

        return obj;
      }
    }]);

    return SuggestedTerm;
  }();

  /**
  * The SuggestedTerms model module.
  * @module models/SuggestedTerms
  * @version 17.8
  */

  var SuggestedTerms =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>SuggestedTerms</code>.
    * Document representing a list of suggested terms for each term of a search phrase.
    * @alias module:models/SuggestedTerms
    * @class
    */
    function SuggestedTerms() {
      _classCallCheck(this, SuggestedTerms);

      /**
      * Returns the original term that the suggested terms relates to.
      * @member {String} original_term
      */
      this.original_term = undefined;
      /**
      * Returns the suggested terms.
      * @member {Array.<module:models/SuggestedTerm>} terms
      */

      this.terms = undefined;
    }
    /**
    * Constructs a <code>SuggestedTerms</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/SuggestedTerms} obj Optional instance to populate.
    * @return {module:models/SuggestedTerms} The populated <code>SuggestedTerms</code> instance.
    */


    _createClass(SuggestedTerms, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new SuggestedTerms();

          if (data.hasOwnProperty('original_term')) {
            obj['original_term'] = ApiClient.convertToType(data['original_term'], 'String');
          }

          if (data.hasOwnProperty('terms')) {
            obj['terms'] = ApiClient.convertToType(data['terms'], [SuggestedTerm]);
          }
        }

        return obj;
      }
    }]);

    return SuggestedTerms;
  }();

  /**
  * The Suggestion model module.
  * @module models/Suggestion
  * @version 17.8
  */

  var Suggestion =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Suggestion</code>.
    * Document representing a suggestion.
    * @alias module:models/Suggestion
    * @class
    */
    function Suggestion() {
      _classCallCheck(this, Suggestion);

      /**
      * The sorted list of suggested brands. This list can be empty.
      * @member {Array.<String>} brands
      */
      this.brands = undefined;
      /**
      * The sorted list of suggested categories. This list can be empty.
      * @member {Array.<module:models/SuggestedCategory>} categories
      */

      this.categories = undefined;
      /**
      * The sorted list of suggested content. This list can be empty.
      * @member {Array.<module:models/SuggestedContent>} content
      */

      this.content = undefined;
      /**
      * The sorted list of suggested custom suggestions. This list can be empty.
      * @member {Array.<String>} custom_suggestions
      */

      this.custom_suggestions = undefined;
      /**
      * The sorted list of suggested products. This list can be empty.
      * @member {Array.<module:models/SuggestedProduct>} products
      */

      this.products = undefined;
      /**
      * A list of suggested phrases. This list can be empty.
      * @member {Array.<module:models/SuggestedPhrase>} suggested_phrases
      */

      this.suggested_phrases = undefined;
      /**
      * A list of suggested terms. This list can be empty.
      * @member {Array.<module:models/SuggestedTerms>} suggested_terms
      */

      this.suggested_terms = undefined;
    }
    /**
    * Constructs a <code>Suggestion</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Suggestion} obj Optional instance to populate.
    * @return {module:models/Suggestion} The populated <code>Suggestion</code> instance.
    */


    _createClass(Suggestion, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Suggestion();

          if (data.hasOwnProperty('brands')) {
            obj['brands'] = ApiClient.convertToType(data['brands'], ['String']);
          }

          if (data.hasOwnProperty('categories')) {
            obj['categories'] = ApiClient.convertToType(data['categories'], [SuggestedCategory]);
          }

          if (data.hasOwnProperty('content')) {
            obj['content'] = ApiClient.convertToType(data['content'], [SuggestedContent]);
          }

          if (data.hasOwnProperty('custom_suggestions')) {
            obj['custom_suggestions'] = ApiClient.convertToType(data['custom_suggestions'], ['String']);
          }

          if (data.hasOwnProperty('products')) {
            obj['products'] = ApiClient.convertToType(data['products'], [SuggestedProduct]);
          }

          if (data.hasOwnProperty('suggested_phrases')) {
            obj['suggested_phrases'] = ApiClient.convertToType(data['suggested_phrases'], [SuggestedPhrase]);
          }

          if (data.hasOwnProperty('suggested_terms')) {
            obj['suggested_terms'] = ApiClient.convertToType(data['suggested_terms'], [SuggestedTerms]);
          }
        }

        return obj;
      }
    }]);

    return Suggestion;
  }();

  /**
  * The ProductSearchResult model module.
  * @module models/ProductSearchResult
  * @version 17.8
  */

  var ProductSearchResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ProductSearchResult</code>.
    * Document representing a product search result.
    * @alias module:models/ProductSearchResult
    * @class
    */
    function ProductSearchResult() {
      _classCallCheck(this, ProductSearchResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * @member {Array.<Object>} data
      */

      this.data = undefined;
      /**
      * @member {Number} fetch_date
      */

      this.fetch_date = undefined;
      /**
      * The sorted array of search hits. This array can be empty.
      * @member {Array.<module:models/ProductSearchHit>} hits
      */

      this.hits = undefined;
      /**
      * The URL of the next result page.
      * @member {String} next
      */

      this.next = undefined;
      /**
      * The URL of the previous result page.
      * @member {String} previous
      */

      this.previous = undefined;
      /**
      * The query String that was searched for.
      * @member {String} query
      */

      this.query = undefined;
      /**
      * The sorted array of search refinements. This array can be empty.
      * @member {Array.<module:models/ProductSearchRefinement>} refinements
      */

      this.refinements = undefined;
      /**
      * The suggestion given by the system for the submitted search phrase.
      * @member {module:models/Suggestion} search_phrase_suggestions
      */

      this.search_phrase_suggestions = undefined;
      /**
      * A map of selected refinement attribute id/value(s) pairs. The sorting order is the same as in request URL.
      * @member {Object.<String, String>} selected_refinements
      */

      this.selected_refinements = undefined;
      /**
      * The id of the applied sorting option.
      * @member {String} selected_sorting_option
      */

      this.selected_sorting_option = undefined;
      /**
      * The sorted array of search sorting options. This array can be empty.
      * @member {Array.<module:models/ProductSearchSortingOption>} sorting_options
      */

      this.sorting_options = undefined;
      /**
      * The zero-based index of the first search hit to include in the result.
      * @member {Number} start
      */

      this.start = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>ProductSearchResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductSearchResult} obj Optional instance to populate.
    * @return {module:models/ProductSearchResult} The populated <code>ProductSearchResult</code> instance.
    */


    _createClass(ProductSearchResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ProductSearchResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [Object]);
          }

          if (data.hasOwnProperty('fetch_date')) {
            obj['fetch_date'] = ApiClient.convertToType(data['fetch_date'], 'Number');
          }

          if (data.hasOwnProperty('hits')) {
            obj['hits'] = ApiClient.convertToType(data['hits'], [ProductSearchHit]);
          }

          if (data.hasOwnProperty('next')) {
            obj['next'] = ApiClient.convertToType(data['next'], 'String');
          }

          if (data.hasOwnProperty('previous')) {
            obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
          }

          if (data.hasOwnProperty('query')) {
            obj['query'] = ApiClient.convertToType(data['query'], 'String');
          }

          if (data.hasOwnProperty('refinements')) {
            obj['refinements'] = ApiClient.convertToType(data['refinements'], [ProductSearchRefinement]);
          }

          if (data.hasOwnProperty('search_phrase_suggestions')) {
            obj['search_phrase_suggestions'] = Suggestion.constructFromObject(data['search_phrase_suggestions']);
          }

          if (data.hasOwnProperty('selected_refinements')) {
            obj['selected_refinements'] = ApiClient.convertToType(data['selected_refinements'], {
              String: 'String'
            });
          }

          if (data.hasOwnProperty('selected_sorting_option')) {
            obj['selected_sorting_option'] = ApiClient.convertToType(data['selected_sorting_option'], 'String');
          }

          if (data.hasOwnProperty('sorting_options')) {
            obj['sorting_options'] = ApiClient.convertToType(data['sorting_options'], [ProductSearchSortingOption]);
          }

          if (data.hasOwnProperty('start')) {
            obj['start'] = ApiClient.convertToType(data['start'], 'Number');
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return ProductSearchResult;
  }();

  /**
  * The Promotion model module.
  * @module models/Promotion
  * @version 17.8
  */

  var Promotion =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Promotion</code>.
    * Document representing a promotion.
    * @alias module:models/Promotion
    * @class
    */
    function Promotion() {
      _classCallCheck(this, Promotion);

      /**
      * The localized call-out message of the promotion.
      * @member {String} callout_msg
      */
      this.callout_msg = undefined;
      /**
      * The currency that a promotion can be applied to. A null value means that the promotion applies to all allowed  currencies.
      * @member {String} currency
      */

      this.currency = undefined;
      /**
      * The localized detailed description of the promotion.
      * @member {String} details
      */

      this.details = undefined;
      /**
      * An optional product search link. Product promotions that are marked searchable provide a product search link with the promotion id as  refinement.
      * @member {String} discounted_products_link
      */

      this.discounted_products_link = undefined;
      /**
      * The end date of the promotion. This property follows the ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ . The time  zone of the date time is always UTC.
      * @member {Date} end_date
      */

      this.end_date = undefined;
      /**
      * The unique id of the promotion.
      * @member {String} id
      */

      this.id = undefined;
      /**
      * The URL to the promotion image.
      * @member {String} image
      */

      this.image = undefined;
      /**
      * The localized name of the promotion.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The start date of the promotion. This property follows the ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ. The  time zone of the date time is always UTC.
      * @member {Date} start_date
      */

      this.start_date = undefined;
    }
    /**
    * Constructs a <code>Promotion</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Promotion} obj Optional instance to populate.
    * @return {module:models/Promotion} The populated <code>Promotion</code> instance.
    */


    _createClass(Promotion, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Promotion();

          if (data.hasOwnProperty('callout_msg')) {
            obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String');
          }

          if (data.hasOwnProperty('currency')) {
            obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
          }

          if (data.hasOwnProperty('details')) {
            obj['details'] = ApiClient.convertToType(data['details'], 'String');
          }

          if (data.hasOwnProperty('discounted_products_link')) {
            obj['discounted_products_link'] = ApiClient.convertToType(data['discounted_products_link'], 'String');
          }

          if (data.hasOwnProperty('end_date')) {
            obj['end_date'] = ApiClient.convertToType(data['end_date'], 'Date');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = ApiClient.convertToType(data['image'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('start_date')) {
            obj['start_date'] = ApiClient.convertToType(data['start_date'], 'Date');
          }
        }

        return obj;
      }
    }]);

    return Promotion;
  }();

  /**
  * The PromotionResult model module.
  * @module models/PromotionResult
  * @version 17.8
  */

  var PromotionResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PromotionResult</code>.
    * Result document containing an array of promotions.
    * @alias module:models/PromotionResult
    * @class
    */
    function PromotionResult() {
      _classCallCheck(this, PromotionResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of promotion documents.
      * @member {Array.<module:models/Promotion>} data
      */

      this.data = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>PromotionResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PromotionResult} obj Optional instance to populate.
    * @return {module:models/PromotionResult} The populated <code>PromotionResult</code> instance.
    */


    _createClass(PromotionResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PromotionResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [Promotion]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return PromotionResult;
  }();

  /**
  * The PublicProductListItem model module.
  * @module models/PublicProductListItem
  * @version 17.8
  */

  var PublicProductListItem =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PublicProductListItem</code>.
    * Document representing a product list item.
    * @alias module:models/PublicProductListItem
    * @class
    */
    function PublicProductListItem() {
      _classCallCheck(this, PublicProductListItem);

      /**
      * The id of this product list item.
      * @member {String} id
      */
      this.id = undefined;
      /**
      * The priority of the item.
      * @member {Number} priority
      */

      this.priority = undefined;
      /**
      * The product item
      * @member {module:models/Product} product
      */

      this.product = undefined;
      /**
      * A link to the product.
      * @member {module:models/ProductSimpleLink} product_details_link
      */

      this.product_details_link = undefined;
      /**
      * The type of the item.
      * @member {module:models/PublicProductListItem.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>PublicProductListItem</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PublicProductListItem} obj Optional instance to populate.
    * @return {module:models/PublicProductListItem} The populated <code>PublicProductListItem</code> instance.
    */


    _createClass(PublicProductListItem, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PublicProductListItem();

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('priority')) {
            obj['priority'] = ApiClient.convertToType(data['priority'], 'Number');
          }

          if (data.hasOwnProperty('product')) {
            obj['product'] = Product.constructFromObject(data['product']);
          }

          if (data.hasOwnProperty('product_details_link')) {
            obj['product_details_link'] = ProductSimpleLink.constructFromObject(data['product_details_link']);
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PublicProductListItem;
  }();
  PublicProductListItem.TypeEnum = {
    /**
     * value: "product"
     * @const
     */
    product: 'product',

    /**
     * value: "gift_certificate"
     * @const
     */
    gift_certificate: 'gift_certificate'
  };

  /**
  * The PublicProductListItemResult model module.
  * @module models/PublicProductListItemResult
  * @version 17.8
  */

  var PublicProductListItemResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PublicProductListItemResult</code>.
    * Result document containing an array of product list items.
    * @alias module:models/PublicProductListItemResult
    * @class
    */
    function PublicProductListItemResult() {
      _classCallCheck(this, PublicProductListItemResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of product list item documents.
      * @member {Array.<module:models/PublicProductListItem>} data
      */

      this.data = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>PublicProductListItemResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PublicProductListItemResult} obj Optional instance to populate.
    * @return {module:models/PublicProductListItemResult} The populated <code>PublicProductListItemResult</code> instance.
    */


    _createClass(PublicProductListItemResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PublicProductListItemResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [PublicProductListItem]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return PublicProductListItemResult;
  }();

  /**
  * The PublicProductListLink model module.
  * @module models/PublicProductListLink
  * @version 17.8
  */

  var PublicProductListLink =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PublicProductListLink</code>.
    * Document representing a link to a public product list.
    * @alias module:models/PublicProductListLink
    * @class
    */
    function PublicProductListLink() {
      _classCallCheck(this, PublicProductListLink);

      /**
      * The description of this product list.
      * @member {String} description
      */
      this.description = undefined;
      /**
      * The target of the link.
      * @member {String} link
      */

      this.link = undefined;
      /**
      * The name of this product list.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The link title.
      * @member {String} title
      */

      this.title = undefined;
      /**
      * The type of the product list.
      * @member {module:models/PublicProductListLink.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>PublicProductListLink</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PublicProductListLink} obj Optional instance to populate.
    * @return {module:models/PublicProductListLink} The populated <code>PublicProductListLink</code> instance.
    */


    _createClass(PublicProductListLink, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PublicProductListLink();

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('link')) {
            obj['link'] = ApiClient.convertToType(data['link'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('title')) {
            obj['title'] = ApiClient.convertToType(data['title'], 'String');
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PublicProductListLink;
  }();
  PublicProductListLink.TypeEnum = {
    /**
     * value: "wish_list"
     * @const
     */
    wish_list: 'wish_list',

    /**
     * value: "gift_registry"
     * @const
     */
    gift_registry: 'gift_registry',

    /**
     * value: "shopping_list"
     * @const
     */
    shopping_list: 'shopping_list',

    /**
     * value: "custom_1"
     * @const
     */
    custom_1: 'custom_1',

    /**
     * value: "custom_2"
     * @const
     */
    custom_2: 'custom_2',

    /**
     * value: "custom_3"
     * @const
     */
    custom_3: 'custom_3'
  };

  /**
  * The PublicProductList model module.
  * @module models/PublicProductList
  * @version 17.8
  */

  var PublicProductList =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PublicProductList</code>.
    * @alias module:models/PublicProductList
    * @class
    */
    function PublicProductList() {
      _classCallCheck(this, PublicProductList);

      /**
      * The coRegistrant of this product list.
      * @member {module:models/ProductListRegistrant} co_registrant
      */
      this.co_registrant = undefined;
      /**
      * Returns the value of attribute 'creationDate'.
      * @member {Date} creation_date
      */

      this.creation_date = undefined;
      /**
      * The description of this product list.
      * @member {String} description
      */

      this.description = undefined;
      /**
      * The event of this product list.
      * @member {module:models/ProductListEvent} event
      */

      this.event = undefined;
      /**
      * The id of this product list.
      * @member {String} id
      */

      this.id = undefined;
      /**
      * The resource link to the items of this product list.
      * @member {module:models/ProductSimpleLink} items_link
      */

      this.items_link = undefined;
      /**
      * Returns the value of attribute 'lastModified'.
      * @member {Date} last_modified
      */

      this.last_modified = undefined;
      /**
      * The name of this product list.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The product list items
      * @member {Array.<module:models/PublicProductListItem>} product_list_items
      */

      this.product_list_items = undefined;
      /**
      * The abbreviated shipping address of this product list representing what anonymous user can see.
      * @member {module:models/ProductListShippingAddress} product_list_shipping_address
      */

      this.product_list_shipping_address = undefined;
      /**
      * Indicates whether the owner made this product list available for access by other customers.
      * @member {Boolean} public
      */

      this["public"] = undefined;
      /**
      * The registrant of this product list.
      * @member {module:models/ProductListRegistrant} registrant
      */

      this.registrant = undefined;
      /**
      * The type of the product list.
      * @member {module:models/PublicProductList.TypeEnum} type
      */

      this.type = undefined;
    }
    /**
    * Constructs a <code>PublicProductList</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PublicProductList} obj Optional instance to populate.
    * @return {module:models/PublicProductList} The populated <code>PublicProductList</code> instance.
    */


    _createClass(PublicProductList, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PublicProductList();

          if (data.hasOwnProperty('co_registrant')) {
            obj['co_registrant'] = ProductListRegistrant.constructFromObject(data['co_registrant']);
          }

          if (data.hasOwnProperty('creation_date')) {
            obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
          }

          if (data.hasOwnProperty('description')) {
            obj['description'] = ApiClient.convertToType(data['description'], 'String');
          }

          if (data.hasOwnProperty('event')) {
            obj['event'] = ProductListEvent.constructFromObject(data['event']);
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('items_link')) {
            obj['items_link'] = ProductSimpleLink.constructFromObject(data['items_link']);
          }

          if (data.hasOwnProperty('last_modified')) {
            obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('product_list_items')) {
            obj['product_list_items'] = ApiClient.convertToType(data['product_list_items'], [PublicProductListItem]);
          }

          if (data.hasOwnProperty('product_list_shipping_address')) {
            obj['product_list_shipping_address'] = ProductListShippingAddress.constructFromObject(data['product_list_shipping_address']);
          }

          if (data.hasOwnProperty('public')) {
            obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
          }

          if (data.hasOwnProperty('registrant')) {
            obj['registrant'] = ProductListRegistrant.constructFromObject(data['registrant']);
          }

          if (data.hasOwnProperty('type')) {
            obj['type'] = ApiClient.convertToType(data['type'], 'String');
          }
        }

        return obj;
      }
    }]);

    return PublicProductList;
  }();
  PublicProductList.TypeEnum = {
    /**
     * value: "wish_list"
     * @const
     */
    wish_list: 'wish_list',

    /**
     * value: "gift_registry"
     * @const
     */
    gift_registry: 'gift_registry',

    /**
     * value: "shopping_list"
     * @const
     */
    shopping_list: 'shopping_list',

    /**
     * value: "custom_1"
     * @const
     */
    custom_1: 'custom_1',

    /**
     * value: "custom_2"
     * @const
     */
    custom_2: 'custom_2',

    /**
     * value: "custom_3"
     * @const
     */
    custom_3: 'custom_3'
  };

  /**
  * The PublicProductListResult model module.
  * @module models/PublicProductListResult
  * @version 17.8
  */

  var PublicProductListResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>PublicProductListResult</code>.
    * Result document containing an array of public product list links.
    * @alias module:models/PublicProductListResult
    * @class
    */
    function PublicProductListResult() {
      _classCallCheck(this, PublicProductListResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of product list link documents.
      * @member {Array.<module:models/PublicProductListLink>} data
      */

      this.data = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>PublicProductListResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PublicProductListResult} obj Optional instance to populate.
    * @return {module:models/PublicProductListResult} The populated <code>PublicProductListResult</code> instance.
    */


    _createClass(PublicProductListResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new PublicProductListResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [PublicProductListLink]);
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return PublicProductListResult;
  }();

  /**
  * The QueryFilter model module.
  * @module models/QueryFilter
  * @version 17.8
  */

  var QueryFilter =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>QueryFilter</code>.
    * Document representing a query filter. A query filter wraps any query and allows it to be used as a filter.
    * @alias module:models/QueryFilter
    * @class
    * @param query {module:models/Query} The query, which should be used as a filter.
    */
    function QueryFilter(query) {
      _classCallCheck(this, QueryFilter);

      /**
      * The query, which should be used as a filter.
      * @member {module:models/Query} query
      */
      this.query = query;
    }
    /**
    * Constructs a <code>QueryFilter</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/QueryFilter} obj Optional instance to populate.
    * @return {module:models/QueryFilter} The populated <code>QueryFilter</code> instance.
    */


    _createClass(QueryFilter, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new QueryFilter();

          if (data.hasOwnProperty('query')) {
            obj['query'] = Query.constructFromObject(data['query']);
          }
        }

        return obj;
      }
    }]);

    return QueryFilter;
  }();

  /**
  * The Range2Filter model module.
  * @module models/Range2Filter
  * @version 17.8
  */

  var Range2Filter =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Range2Filter</code>.
    * Document representing a range compare with range filter, named Range2Filter.
    * @alias module:models/Range2Filter
    * @class
    * @param fromField {String} The field name of the field that start the range 1.
    * @param toField {String} The field name of the field that end the range 1.
    */
    function Range2Filter(fromField, toField) {
      _classCallCheck(this, Range2Filter);

      /**
      * compare mode: overlap, containing, contained (default to \"overlap\"). It is optional.
      * @member {module:models/Range2Filter.FilterModeEnum} filter_mode
      */
      this.filter_mode = undefined;
      /**
      * The field name of the field that start the range 1.
      * @member {String} from_field
      */

      this.from_field = fromField;
      /**
      * A flag indicating whether the lower bound of the range is inclusive (or exclusive). The default is true (which means that the given  lower bound is inclusive).
      * @member {Boolean} from_inclusive
      */

      this.from_inclusive = undefined;
      /**
      * The configured lower bound of the filter range. The lower bound is optional. If not given, the range is  open ended with respect to the lower bound.
      * @member {Object} from_value
      */

      this.from_value = undefined;
      /**
      * The field name of the field that end the range 1.
      * @member {String} to_field
      */

      this.to_field = toField;
      /**
      * A flag indicating whether the upper bound of the range is inclusive (or exclusive). The default is true (which means that the given  upper bound is inclusive).
      * @member {Boolean} to_inclusive
      */

      this.to_inclusive = undefined;
      /**
      * The configured upper bound of the filter range. The upper bound is optional. If not given, the range is  open ended with respect to the upper bound.
      * @member {Object} to_value
      */

      this.to_value = undefined;
    }
    /**
    * Constructs a <code>Range2Filter</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Range2Filter} obj Optional instance to populate.
    * @return {module:models/Range2Filter} The populated <code>Range2Filter</code> instance.
    */


    _createClass(Range2Filter, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Range2Filter();

          if (data.hasOwnProperty('filter_mode')) {
            obj['filter_mode'] = ApiClient.convertToType(data['filter_mode'], 'String');
          }

          if (data.hasOwnProperty('from_field')) {
            obj['from_field'] = ApiClient.convertToType(data['from_field'], 'String');
          }

          if (data.hasOwnProperty('from_inclusive')) {
            obj['from_inclusive'] = ApiClient.convertToType(data['from_inclusive'], 'Boolean');
          }

          if (data.hasOwnProperty('from_value')) {
            obj['from_value'] = ApiClient.convertToType(data['from_value'], Object);
          }

          if (data.hasOwnProperty('to_field')) {
            obj['to_field'] = ApiClient.convertToType(data['to_field'], 'String');
          }

          if (data.hasOwnProperty('to_inclusive')) {
            obj['to_inclusive'] = ApiClient.convertToType(data['to_inclusive'], 'Boolean');
          }

          if (data.hasOwnProperty('to_value')) {
            obj['to_value'] = ApiClient.convertToType(data['to_value'], Object);
          }
        }

        return obj;
      }
    }]);

    return Range2Filter;
  }();
  Range2Filter.FilterModeEnum = {
    /**
     * value: "overlap"
     * @const
     */
    overlap: 'overlap',

    /**
     * value: "containing"
     * @const
     */
    containing: 'containing',

    /**
     * value: "contained"
     * @const
     */
    contained: 'contained'
  };

  /**
  * The RangeFilter model module.
  * @module models/RangeFilter
  * @version 17.8
  */

  var RangeFilter =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>RangeFilter</code>.
    * Document representing a range filter.
    * @alias module:models/RangeFilter
    * @class
    * @param field {String} The search field.
    */
    function RangeFilter(field) {
      _classCallCheck(this, RangeFilter);

      /**
      * The search field.
      * @member {String} field
      */
      this.field = field;
      /**
      * The configured lower bound of the filter range. The lower bound is optional. If not given, the range is  open ended with respect to the lower bound.
      * @member {Object} from
      */

      this.from = undefined;
      /**
      * A flag indicating whether the lower bound of the range is inclusive (or exclusive). The default is true (which means that the given  lower bound is inclusive).
      * @member {Boolean} from_inclusive
      */

      this.from_inclusive = undefined;
      /**
      * The configured upper bound of the filter range. The upper bound is optional. If not given, the range is  open ended with respect to the upper bound.
      * @member {Object} to
      */

      this.to = undefined;
      /**
      * A flag indicating whether the upper bound of the range is inclusive (or exclusive). The default is true (which means that the given  upper bound is inclusive).
      * @member {Boolean} to_inclusive
      */

      this.to_inclusive = undefined;
    }
    /**
    * Constructs a <code>RangeFilter</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/RangeFilter} obj Optional instance to populate.
    * @return {module:models/RangeFilter} The populated <code>RangeFilter</code> instance.
    */


    _createClass(RangeFilter, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new RangeFilter();

          if (data.hasOwnProperty('field')) {
            obj['field'] = ApiClient.convertToType(data['field'], 'String');
          }

          if (data.hasOwnProperty('from')) {
            obj['from'] = ApiClient.convertToType(data['from'], Object);
          }

          if (data.hasOwnProperty('from_inclusive')) {
            obj['from_inclusive'] = ApiClient.convertToType(data['from_inclusive'], 'Boolean');
          }

          if (data.hasOwnProperty('to')) {
            obj['to'] = ApiClient.convertToType(data['to'], Object);
          }

          if (data.hasOwnProperty('to_inclusive')) {
            obj['to_inclusive'] = ApiClient.convertToType(data['to_inclusive'], 'Boolean');
          }
        }

        return obj;
      }
    }]);

    return RangeFilter;
  }();

  /**
  * The ShippingMethodResult model module.
  * @module models/ShippingMethodResult
  * @version 17.8
  */

  var ShippingMethodResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>ShippingMethodResult</code>.
    * Result document containing shipping methods.
    * @alias module:models/ShippingMethodResult
    * @class
    */
    function ShippingMethodResult() {
      _classCallCheck(this, ShippingMethodResult);

      /**
      * The applicable shipping method documents.
      * @member {Array.<module:models/ShippingMethod>} applicable_shipping_methods
      */
      this.applicable_shipping_methods = undefined;
      /**
      * The default shipping method.
      * @member {String} default_shipping_method_id
      */

      this.default_shipping_method_id = undefined;
    }
    /**
    * Constructs a <code>ShippingMethodResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ShippingMethodResult} obj Optional instance to populate.
    * @return {module:models/ShippingMethodResult} The populated <code>ShippingMethodResult</code> instance.
    */


    _createClass(ShippingMethodResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new ShippingMethodResult();

          if (data.hasOwnProperty('applicable_shipping_methods')) {
            obj['applicable_shipping_methods'] = ApiClient.convertToType(data['applicable_shipping_methods'], [ShippingMethod]);
          }

          if (data.hasOwnProperty('default_shipping_method_id')) {
            obj['default_shipping_method_id'] = ApiClient.convertToType(data['default_shipping_method_id'], 'String');
          }
        }

        return obj;
      }
    }]);

    return ShippingMethodResult;
  }();

  /**
  * The Site model module.
  * @module models/Site
  * @version 17.8
  */

  var Site =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Site</code>.
    * Document representing a site.
    * @alias module:models/Site
    * @class
    */
    function Site() {
      _classCallCheck(this, Site);

      /**
      * The list of allowed currencies.
      * @member {Array.<String>} allowed_currencies
      */
      this.allowed_currencies = undefined;
      /**
      * A list of all allowed site locales.
      * @member {Array.<module:models/Locale>} allowed_locales
      */

      this.allowed_locales = undefined;
      /**
      * The currency mnemonic of the site.
      * @member {String} default_currency
      */

      this.default_currency = undefined;
      /**
      * The default locale of the site.
      * @member {String} default_locale
      */

      this.default_locale = undefined;
      /**
      * The HTTP DIS base URL.
      * @member {String} http_dis_base_url
      */

      this.http_dis_base_url = undefined;
      /**
      * The configured HTTP host name. If no host name is configured the instance host name is returned.
      * @member {String} http_hostname
      */

      this.http_hostname = undefined;
      /**
      * The HTTP URL to the library content location of the site.
      * @member {String} http_library_content_url
      */

      this.http_library_content_url = undefined;
      /**
      * The HTTP URL to the site content location.
      * @member {String} http_site_content_url
      */

      this.http_site_content_url = undefined;
      /**
      * The HTTPS DIS base URL.
      * @member {String} https_dis_base_url
      */

      this.https_dis_base_url = undefined;
      /**
      * The configured HTTPS host name. If no host name is configured the instance host name is returned.
      * @member {String} https_hostname
      */

      this.https_hostname = undefined;
      /**
      * The HTTPS URL to the library content location of the site.
      * @member {String} https_library_content_url
      */

      this.https_library_content_url = undefined;
      /**
      * The HTTPS URL to the site content location.
      * @member {String} https_site_content_url
      */

      this.https_site_content_url = undefined;
      /**
      * The id of the site.
      * @member {String} id
      */

      this.id = undefined;
      /**
      * The descriptive name for the site.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The site status online/offline.
      * @member {module:models/Site.StatusEnum} status
      */

      this.status = undefined;
      /**
      * The time zone of the site (for example, USA/Eastern).
      * @member {String} timezone
      */

      this.timezone = undefined;
      /**
      * The time zone offset from UTC for the current time in milliseconds (for example, -14400000).
      * @member {Number} timezone_offset
      */

      this.timezone_offset = undefined;
    }
    /**
    * Constructs a <code>Site</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Site} obj Optional instance to populate.
    * @return {module:models/Site} The populated <code>Site</code> instance.
    */


    _createClass(Site, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Site();

          if (data.hasOwnProperty('allowed_currencies')) {
            obj['allowed_currencies'] = ApiClient.convertToType(data['allowed_currencies'], ['String']);
          }

          if (data.hasOwnProperty('allowed_locales')) {
            obj['allowed_locales'] = ApiClient.convertToType(data['allowed_locales'], [Locale]);
          }

          if (data.hasOwnProperty('default_currency')) {
            obj['default_currency'] = ApiClient.convertToType(data['default_currency'], 'String');
          }

          if (data.hasOwnProperty('default_locale')) {
            obj['default_locale'] = ApiClient.convertToType(data['default_locale'], 'String');
          }

          if (data.hasOwnProperty('http_dis_base_url')) {
            obj['http_dis_base_url'] = ApiClient.convertToType(data['http_dis_base_url'], 'String');
          }

          if (data.hasOwnProperty('http_hostname')) {
            obj['http_hostname'] = ApiClient.convertToType(data['http_hostname'], 'String');
          }

          if (data.hasOwnProperty('http_library_content_url')) {
            obj['http_library_content_url'] = ApiClient.convertToType(data['http_library_content_url'], 'String');
          }

          if (data.hasOwnProperty('http_site_content_url')) {
            obj['http_site_content_url'] = ApiClient.convertToType(data['http_site_content_url'], 'String');
          }

          if (data.hasOwnProperty('https_dis_base_url')) {
            obj['https_dis_base_url'] = ApiClient.convertToType(data['https_dis_base_url'], 'String');
          }

          if (data.hasOwnProperty('https_hostname')) {
            obj['https_hostname'] = ApiClient.convertToType(data['https_hostname'], 'String');
          }

          if (data.hasOwnProperty('https_library_content_url')) {
            obj['https_library_content_url'] = ApiClient.convertToType(data['https_library_content_url'], 'String');
          }

          if (data.hasOwnProperty('https_site_content_url')) {
            obj['https_site_content_url'] = ApiClient.convertToType(data['https_site_content_url'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('status')) {
            obj['status'] = ApiClient.convertToType(data['status'], 'String');
          }

          if (data.hasOwnProperty('timezone')) {
            obj['timezone'] = ApiClient.convertToType(data['timezone'], 'String');
          }

          if (data.hasOwnProperty('timezone_offset')) {
            obj['timezone_offset'] = ApiClient.convertToType(data['timezone_offset'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return Site;
  }();
  Site.StatusEnum = {
    /**
     * value: "online"
     * @const
     */
    online: 'online',

    /**
     * value: "offline"
     * @const
     */
    offline: 'offline'
  };

  /**
  * The Store model module.
  * @module models/Store
  * @version 17.8
  */

  var Store =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>Store</code>.
    * Document representing a store.
    * @alias module:models/Store
    * @class
    * @param id {String} The id of the store.
    */
    function Store(id) {
      _classCallCheck(this, Store);

      /**
      * The first address of the store.
      * @member {String} address1
      */
      this.address1 = undefined;
      /**
      * The second address of the store.
      * @member {String} address2
      */

      this.address2 = undefined;
      /**
      * The city of the store.
      * @member {String} city
      */

      this.city = undefined;
      /**
      * The country code of the store.
      * @member {module:models/Store.CountryCodeEnum} country_code
      */

      this.country_code = undefined;
      /**
      * The distance to the given geo location in the unit of attribute distance (miles or kilometers).
      * @member {Number} distance
      */

      this.distance = undefined;
      /**
      * The distance unit the distance attribute is measured in (either in miles or kilometers).
      * @member {String} distance_unit
      */

      this.distance_unit = undefined;
      /**
      * The email address of the store.
      * @member {String} email
      */

      this.email = undefined;
      /**
      * The fax number of the store.
      * @member {String} fax
      */

      this.fax = undefined;
      /**
      * The id of the store.
      * @member {String} id
      */

      this.id = id;
      /**
      * The store image.
      * @member {String} image
      */

      this.image = undefined;
      /**
      * The inventory list id associated with this store.
      * @member {String} inventory_id
      */

      this.inventory_id = undefined;
      /**
      * The latitude of the store.
      * @member {Number} latitude
      */

      this.latitude = undefined;
      /**
      * The longitude of the store.
      * @member {Number} longitude
      */

      this.longitude = undefined;
      /**
      * The store name.
      * @member {String} name
      */

      this.name = undefined;
      /**
      * The phone number of the store.
      * @member {String} phone
      */

      this.phone = undefined;
      /**
      * Whether this store uses Store Point-of-Sale.
      * @member {Boolean} pos_enabled
      */

      this.pos_enabled = undefined;
      /**
      * The postal code of the store.
      * @member {String} postal_code
      */

      this.postal_code = undefined;
      /**
      * The state code of the store.
      * @member {String} state_code
      */

      this.state_code = undefined;
      /**
      * The store events.
      * @member {String} store_events
      */

      this.store_events = undefined;
      /**
      * The store opening hours.
      * @member {String} store_hours
      */

      this.store_hours = undefined;
      /**
      * Whether this store should show up in store locator results.
      * @member {Boolean} store_locator_enabled
      */

      this.store_locator_enabled = undefined;
    }
    /**
    * Constructs a <code>Store</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Store} obj Optional instance to populate.
    * @return {module:models/Store} The populated <code>Store</code> instance.
    */


    _createClass(Store, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new Store();

          if (data.hasOwnProperty('address1')) {
            obj['address1'] = ApiClient.convertToType(data['address1'], 'String');
          }

          if (data.hasOwnProperty('address2')) {
            obj['address2'] = ApiClient.convertToType(data['address2'], 'String');
          }

          if (data.hasOwnProperty('city')) {
            obj['city'] = ApiClient.convertToType(data['city'], 'String');
          }

          if (data.hasOwnProperty('country_code')) {
            obj['country_code'] = ApiClient.convertToType(data['country_code'], 'String');
          }

          if (data.hasOwnProperty('distance')) {
            obj['distance'] = ApiClient.convertToType(data['distance'], 'Number');
          }

          if (data.hasOwnProperty('distance_unit')) {
            obj['distance_unit'] = ApiClient.convertToType(data['distance_unit'], 'String');
          }

          if (data.hasOwnProperty('email')) {
            obj['email'] = ApiClient.convertToType(data['email'], 'String');
          }

          if (data.hasOwnProperty('fax')) {
            obj['fax'] = ApiClient.convertToType(data['fax'], 'String');
          }

          if (data.hasOwnProperty('id')) {
            obj['id'] = ApiClient.convertToType(data['id'], 'String');
          }

          if (data.hasOwnProperty('image')) {
            obj['image'] = ApiClient.convertToType(data['image'], 'String');
          }

          if (data.hasOwnProperty('inventory_id')) {
            obj['inventory_id'] = ApiClient.convertToType(data['inventory_id'], 'String');
          }

          if (data.hasOwnProperty('latitude')) {
            obj['latitude'] = ApiClient.convertToType(data['latitude'], 'Number');
          }

          if (data.hasOwnProperty('longitude')) {
            obj['longitude'] = ApiClient.convertToType(data['longitude'], 'Number');
          }

          if (data.hasOwnProperty('name')) {
            obj['name'] = ApiClient.convertToType(data['name'], 'String');
          }

          if (data.hasOwnProperty('phone')) {
            obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
          }

          if (data.hasOwnProperty('pos_enabled')) {
            obj['pos_enabled'] = ApiClient.convertToType(data['pos_enabled'], 'Boolean');
          }

          if (data.hasOwnProperty('postal_code')) {
            obj['postal_code'] = ApiClient.convertToType(data['postal_code'], 'String');
          }

          if (data.hasOwnProperty('state_code')) {
            obj['state_code'] = ApiClient.convertToType(data['state_code'], 'String');
          }

          if (data.hasOwnProperty('store_events')) {
            obj['store_events'] = ApiClient.convertToType(data['store_events'], 'String');
          }

          if (data.hasOwnProperty('store_hours')) {
            obj['store_hours'] = ApiClient.convertToType(data['store_hours'], 'String');
          }

          if (data.hasOwnProperty('store_locator_enabled')) {
            obj['store_locator_enabled'] = ApiClient.convertToType(data['store_locator_enabled'], 'Boolean');
          }
        }

        return obj;
      }
    }]);

    return Store;
  }();
  Store.CountryCodeEnum = {
    /**
     * value: "US"
     * @const
     */
    US: 'US',

    /**
     * value: "CA"
     * @const
     */
    CA: 'CA',

    /**
     * value: "DE"
     * @const
     */
    DE: 'DE'
  };

  /**
  * The StoreResult model module.
  * @module models/StoreResult
  * @version 17.8
  */

  var StoreResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>StoreResult</code>.
    * Result document containing an array of stores.
    * @alias module:models/StoreResult
    * @class
    */
    function StoreResult() {
      _classCallCheck(this, StoreResult);

      /**
      * The number of returned documents.
      * @member {Number} count
      */
      this.count = undefined;
      /**
      * The array of store documents.
      * @member {Array.<module:models/Store>} data
      */

      this.data = undefined;
      /**
      * The URL of the next result page.
      * @member {String} next
      */

      this.next = undefined;
      /**
      * The URL of the previous result page.
      * @member {String} previous
      */

      this.previous = undefined;
      /**
      * The zero-based index of the first search hit to include in the result.
      * @member {Number} start
      */

      this.start = undefined;
      /**
      * The total number of documents.
      * @member {Number} total
      */

      this.total = undefined;
    }
    /**
    * Constructs a <code>StoreResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/StoreResult} obj Optional instance to populate.
    * @return {module:models/StoreResult} The populated <code>StoreResult</code> instance.
    */


    _createClass(StoreResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new StoreResult();

          if (data.hasOwnProperty('count')) {
            obj['count'] = ApiClient.convertToType(data['count'], 'Number');
          }

          if (data.hasOwnProperty('data')) {
            obj['data'] = ApiClient.convertToType(data['data'], [Store]);
          }

          if (data.hasOwnProperty('next')) {
            obj['next'] = ApiClient.convertToType(data['next'], 'String');
          }

          if (data.hasOwnProperty('previous')) {
            obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
          }

          if (data.hasOwnProperty('start')) {
            obj['start'] = ApiClient.convertToType(data['start'], 'Number');
          }

          if (data.hasOwnProperty('total')) {
            obj['total'] = ApiClient.convertToType(data['total'], 'Number');
          }
        }

        return obj;
      }
    }]);

    return StoreResult;
  }();

  /**
  * The SuggestionResult model module.
  * @module models/SuggestionResult
  * @version 17.8
  */

  var SuggestionResult =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>SuggestionResult</code>.
    * Document representing a search suggestion result.
    * @alias module:models/SuggestionResult
    * @class
    */
    function SuggestionResult() {
      _classCallCheck(this, SuggestionResult);

      /**
      * Returns the suggested brands.
      * @member {module:models/Suggestion} brand_suggestions
      */
      this.brand_suggestions = undefined;
      /**
      * Returns the suggested categories.
      * @member {module:models/Suggestion} category_suggestions
      */

      this.category_suggestions = undefined;
      /**
      * Returns the suggested content.
      * @member {module:models/Suggestion} content_suggestions
      */

      this.content_suggestions = undefined;
      /**
      * Returns the suggested custom suggestions.
      * @member {module:models/Suggestion} custom_suggestions
      */

      this.custom_suggestions = undefined;
      /**
      * Returns the suggested products.
      * @member {module:models/Suggestion} product_suggestions
      */

      this.product_suggestions = undefined;
      /**
      * The query phrase to search for.
      * @member {String} query
      */

      this.query = undefined;
    }
    /**
    * Constructs a <code>SuggestionResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/SuggestionResult} obj Optional instance to populate.
    * @return {module:models/SuggestionResult} The populated <code>SuggestionResult</code> instance.
    */


    _createClass(SuggestionResult, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new SuggestionResult();

          if (data.hasOwnProperty('brand_suggestions')) {
            obj['brand_suggestions'] = Suggestion.constructFromObject(data['brand_suggestions']);
          }

          if (data.hasOwnProperty('category_suggestions')) {
            obj['category_suggestions'] = Suggestion.constructFromObject(data['category_suggestions']);
          }

          if (data.hasOwnProperty('content_suggestions')) {
            obj['content_suggestions'] = Suggestion.constructFromObject(data['content_suggestions']);
          }

          if (data.hasOwnProperty('custom_suggestions')) {
            obj['custom_suggestions'] = Suggestion.constructFromObject(data['custom_suggestions']);
          }

          if (data.hasOwnProperty('product_suggestions')) {
            obj['product_suggestions'] = Suggestion.constructFromObject(data['product_suggestions']);
          }

          if (data.hasOwnProperty('query')) {
            obj['query'] = ApiClient.convertToType(data['query'], 'String');
          }
        }

        return obj;
      }
    }]);

    return SuggestionResult;
  }();

  /**
  * The TermFilter model module.
  * @module models/TermFilter
  * @version 17.8
  */

  var TermFilter =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>TermFilter</code>.
    * Document representing a term filter.
    * @alias module:models/TermFilter
    * @class
    * @param field {String} The filter field.
    * @param operator {module:models/TermFilter.OperatorEnum} The operator to compare
    * the field's values with the given ones.
    */
    function TermFilter(field, operator) {
      _classCallCheck(this, TermFilter);

      /**
      * The filter field.
      * @member {String} field
      */
      this.field = field;
      /**
      * The operator to compare the field's values with the given ones.
      * @member {module:models/TermFilter.OperatorEnum} operator
      */

      this.operator = operator;
      /**
      * The filter values.
      * @member {Array.<Object>} values
      */

      this.values = undefined;
    }
    /**
    * Constructs a <code>TermFilter</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/TermFilter} obj Optional instance to populate.
    * @return {module:models/TermFilter} The populated <code>TermFilter</code> instance.
    */


    _createClass(TermFilter, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new TermFilter();

          if (data.hasOwnProperty('field')) {
            obj['field'] = ApiClient.convertToType(data['field'], 'String');
          }

          if (data.hasOwnProperty('operator')) {
            obj['operator'] = ApiClient.convertToType(data['operator'], 'String');
          }

          if (data.hasOwnProperty('values')) {
            obj['values'] = ApiClient.convertToType(data['values'], [Object]);
          }
        }

        return obj;
      }
    }]);

    return TermFilter;
  }();
  TermFilter.OperatorEnum = {
    /**
     * value: "is"
     * @const
     */
    is: 'is',

    /**
     * value: "one_of"
     * @const
     */
    one_of: 'one_of',

    /**
     * value: "is_null"
     * @const
     */
    is_null: 'is_null',

    /**
     * value: "is_not_null"
     * @const
     */
    is_not_null: 'is_not_null',

    /**
     * value: "less"
     * @const
     */
    less: 'less',

    /**
     * value: "greater"
     * @const
     */
    greater: 'greater',

    /**
     * value: "not_in"
     * @const
     */
    not_in: 'not_in',

    /**
     * value: "neq"
     * @const
     */
    neq: 'neq'
  };

  /**
  * The TermQuery model module.
  * @module models/TermQuery
  * @version 17.8
  */

  var TermQuery =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>TermQuery</code>.
    * A term query matches one (or more) value(s) against one (or more) document
    * field(s). A document is considered a hit  if one of the values matches (exactly)
    * with at least one of the given fields.  The operator \&quot;is\&quot; can only
    * take  one value, while \&quot;one_of\&quot; can take multiple. If multiple
    * fields are specified, they are combined using the OR operator.
    * @alias module:models/TermQuery
    * @class
    * @param fields {Array.<String>} The document field(s), the value(s) are matched against, combined with the operator.
    * @param operator {module:models/TermQuery.OperatorEnum} Returns the operator to use for the term query.
    */
    function TermQuery(fields, operator) {
      _classCallCheck(this, TermQuery);

      /**
      * The document field(s), the value(s) are matched against, combined with the operator.
      * @member {Array.<String>} fields
      */
      this.fields = fields;
      /**
      * Returns the operator to use for the term query.
      * @member {module:models/TermQuery.OperatorEnum} operator
      */

      this.operator = operator;
      /**
      * The values, the field(s) are compared against, combined with the operator.
      * @member {Array.<Object>} values
      */

      this.values = undefined;
    }
    /**
    * Constructs a <code>TermQuery</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/TermQuery} obj Optional instance to populate.
    * @return {module:models/TermQuery} The populated <code>TermQuery</code> instance.
    */


    _createClass(TermQuery, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new TermQuery();

          if (data.hasOwnProperty('fields')) {
            obj['fields'] = ApiClient.convertToType(data['fields'], ['String']);
          }

          if (data.hasOwnProperty('operator')) {
            obj['operator'] = ApiClient.convertToType(data['operator'], 'String');
          }

          if (data.hasOwnProperty('values')) {
            obj['values'] = ApiClient.convertToType(data['values'], [Object]);
          }
        }

        return obj;
      }
    }]);

    return TermQuery;
  }();
  TermQuery.OperatorEnum = {
    /**
     * value: "is"
     * @const
     */
    is: 'is',

    /**
     * value: "one_of"
     * @const
     */
    one_of: 'one_of',

    /**
     * value: "is_null"
     * @const
     */
    is_null: 'is_null',

    /**
     * value: "is_not_null"
     * @const
     */
    is_not_null: 'is_not_null',

    /**
     * value: "less"
     * @const
     */
    less: 'less',

    /**
     * value: "greater"
     * @const
     */
    greater: 'greater',

    /**
     * value: "not_in"
     * @const
     */
    not_in: 'not_in',

    /**
     * value: "neq"
     * @const
     */
    neq: 'neq'
  };

  /**
  * The TextQuery model module.
  * @module models/TextQuery
  * @version 17.8
  */

  var TextQuery =
  /*#__PURE__*/
  function () {
    /**
    * Constructs a new <code>TextQuery</code>.
    * A text query is used to match some text (i.e. a search phrase possibly consisting of
    * multiple terms) against one or  multiple fields. In case multiple fields are provided,
    * the phrase conceptually forms a logical OR over the fields. In  this case, the terms
    * of the phrase basically have to match within the text, that would result in
    * concatenating all  given fields.
    * @alias module:models/TextQuery
    * @class
    * @param fields {Array.<String>} The document fields the search phrase has to match against.
    * @param searchPhrase {String} A search phrase, which may consist of multiple terms.
    */
    function TextQuery(fields, searchPhrase) {
      _classCallCheck(this, TextQuery);

      /**
      * The document fields the search phrase has to match against.
      * @member {Array.<String>} fields
      */
      this.fields = fields;
      /**
      * A search phrase, which may consist of multiple terms.
      * @member {String} search_phrase
      */

      this.search_phrase = searchPhrase;
    }
    /**
    * Constructs a <code>TextQuery</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/TextQuery} obj Optional instance to populate.
    * @return {module:models/TextQuery} The populated <code>TextQuery</code> instance.
    */


    _createClass(TextQuery, null, [{
      key: "constructFromObject",
      value: function constructFromObject(data, obj) {
        if (data) {
          obj = obj || new TextQuery();

          if (data.hasOwnProperty('fields')) {
            obj['fields'] = ApiClient.convertToType(data['fields'], ['String']);
          }

          if (data.hasOwnProperty('search_phrase')) {
            obj['search_phrase'] = ApiClient.convertToType(data['search_phrase'], 'String');
          }
        }

        return obj;
      }
    }]);

    return TextQuery;
  }();

  /**
   * Baskets service.
   * @module api/BasketsApi
   * @version 17.8
   */

  var BasketsApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new BasketsApi.
     * @alias module:api/BasketsApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function BasketsApi(apiClient) {
      _classCallCheck(this, BasketsApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Removes a basket.
     * @param {String} basketId the id of the basket to be retrieved
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */


    _createClass(BasketsApi, [{
      key: "deleteBasketsByIDWithHttpInfo",
      value: function deleteBasketsByIDWithHttpInfo(basketId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling deleteBasketsByID');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/baskets/{basket_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Removes a basket.
       * @param {String} basketId the id of the basket to be retrieved
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "deleteBasketsByID",
      value: function deleteBasketsByID(basketId) {
        return this.deleteBasketsByIDWithHttpInfo(basketId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Removes a coupon from the basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} couponItemId the id of the coupon item to be removed
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "deleteBasketsByIDCouponsByIDWithHttpInfo",
      value: function deleteBasketsByIDCouponsByIDWithHttpInfo(basketId, couponItemId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling deleteBasketsByIDCouponsByID');
        } // verify the required parameter 'couponItemId' is set


        if (couponItemId === undefined || couponItemId === null) {
          throw new Error('Missing the required parameter \'couponItemId\' when calling deleteBasketsByIDCouponsByID');
        }

        var pathParams = {
          basket_id: basketId,
          coupon_item_id: couponItemId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/coupons/{coupon_item_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Removes a coupon from the basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} couponItemId the id of the coupon item to be removed
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "deleteBasketsByIDCouponsByID",
      value: function deleteBasketsByIDCouponsByID(basketId, couponItemId) {
        return this.deleteBasketsByIDCouponsByIDWithHttpInfo(basketId, couponItemId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Removes a product item from the basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} itemId the id of the product item to be removed
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "deleteBasketsByIDItemsByIDWithHttpInfo",
      value: function deleteBasketsByIDItemsByIDWithHttpInfo(basketId, itemId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling deleteBasketsByIDItemsByID');
        } // verify the required parameter 'itemId' is set


        if (itemId === undefined || itemId === null) {
          throw new Error('Missing the required parameter \'itemId\' when calling deleteBasketsByIDItemsByID');
        }

        var pathParams = {
          basket_id: basketId,
          item_id: itemId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/items/{item_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Removes a product item from the basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} itemId the id of the product item to be removed
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "deleteBasketsByIDItemsByID",
      value: function deleteBasketsByIDItemsByID(basketId, itemId) {
        return this.deleteBasketsByIDItemsByIDWithHttpInfo(basketId, itemId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Removes a basket note.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} noteId the id of the note to be removed
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "deleteBasketsByIDNotesByIDWithHttpInfo",
      value: function deleteBasketsByIDNotesByIDWithHttpInfo(basketId, noteId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling deleteBasketsByIDNotesByID');
        } // verify the required parameter 'noteId' is set


        if (noteId === undefined || noteId === null) {
          throw new Error('Missing the required parameter \'noteId\' when calling deleteBasketsByIDNotesByID');
        }

        var pathParams = {
          basket_id: basketId,
          note_id: noteId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/notes/{note_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Removes a basket note.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} noteId the id of the note to be removed
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "deleteBasketsByIDNotesByID",
      value: function deleteBasketsByIDNotesByID(basketId, noteId) {
        return this.deleteBasketsByIDNotesByIDWithHttpInfo(basketId, noteId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Removes a payment instrument of a basket.
       * @param {String} basketId the basket id
       * @param {String} paymentInstrumentId the id of the payment instrument to be removed
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "deleteBasketsByIDPaymentInstrumentsByIDWithHttpInfo",
      value: function deleteBasketsByIDPaymentInstrumentsByIDWithHttpInfo(basketId, paymentInstrumentId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling deleteBasketsByIDPaymentInstrumentsByID');
        } // verify the required parameter 'paymentInstrumentId' is set


        if (paymentInstrumentId === undefined || paymentInstrumentId === null) {
          throw new Error('Missing the required parameter \'paymentInstrumentId\' when calling deleteBasketsByIDPaymentInstrumentsByID');
        }

        var pathParams = {
          basket_id: basketId,
          payment_instrument_id: paymentInstrumentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/payment_instruments/{payment_instrument_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Removes a payment instrument of a basket.
       * @param {String} basketId the basket id
       * @param {String} paymentInstrumentId the id of the payment instrument to be removed
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "deleteBasketsByIDPaymentInstrumentsByID",
      value: function deleteBasketsByIDPaymentInstrumentsByID(basketId, paymentInstrumentId) {
        return this.deleteBasketsByIDPaymentInstrumentsByIDWithHttpInfo(basketId, paymentInstrumentId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Removes a specified shipment and all associated product, gift certificate,  shipping and price adjustment line items from a basket.  It is not permissible to remove the default shipment.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} shipmentId the id of the shipment to be deleted
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "deleteBasketsByIDShipmentsByIDWithHttpInfo",
      value: function deleteBasketsByIDShipmentsByIDWithHttpInfo(basketId, shipmentId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling deleteBasketsByIDShipmentsByID');
        } // verify the required parameter 'shipmentId' is set


        if (shipmentId === undefined || shipmentId === null) {
          throw new Error('Missing the required parameter \'shipmentId\' when calling deleteBasketsByIDShipmentsByID');
        }

        var pathParams = {
          basket_id: basketId,
          shipment_id: shipmentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/shipments/{shipment_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Removes a specified shipment and all associated product, gift certificate,  shipping and price adjustment line items from a basket.  It is not permissible to remove the default shipment.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} shipmentId the id of the shipment to be deleted
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "deleteBasketsByIDShipmentsByID",
      value: function deleteBasketsByIDShipmentsByID(basketId, shipmentId) {
        return this.deleteBasketsByIDShipmentsByIDWithHttpInfo(basketId, shipmentId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Gets a basket.
       * @param {String} basketId the id of the basket to be retrieved
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "getBasketsByIDWithHttpInfo",
      value: function getBasketsByIDWithHttpInfo(basketId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling getBasketsByID');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Gets a basket.
       * @param {String} basketId the id of the basket to be retrieved
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "getBasketsByID",
      value: function getBasketsByID(basketId) {
        return this.getBasketsByIDWithHttpInfo(basketId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Retrieves notes for a basket.
       * @param {String} basketId The id of the basket for which you want to retrieve the notes.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/NotesResult} and HTTP response
       */

    }, {
      key: "getBasketsByIDNotesWithHttpInfo",
      value: function getBasketsByIDNotesWithHttpInfo(basketId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling getBasketsByIDNotes');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = NotesResult;
        return this.apiClient.callApi('/baskets/{basket_id}/notes', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Retrieves notes for a basket.
       * @param {String} basketId The id of the basket for which you want to retrieve the notes.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/NotesResult}
       */

    }, {
      key: "getBasketsByIDNotes",
      value: function getBasketsByIDNotes(basketId) {
        return this.getBasketsByIDNotesWithHttpInfo(basketId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Gets applicable payment methods for an existing basket considering the open payment amount only.
       * @param {String} basketId the basket id
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PaymentMethodResult} and HTTP response
       */

    }, {
      key: "getBasketsByIDPaymentMethodsWithHttpInfo",
      value: function getBasketsByIDPaymentMethodsWithHttpInfo(basketId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling getBasketsByIDPaymentMethods');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = PaymentMethodResult;
        return this.apiClient.callApi('/baskets/{basket_id}/payment_methods', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Gets applicable payment methods for an existing basket considering the open payment amount only.
       * @param {String} basketId the basket id
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PaymentMethodResult}
       */

    }, {
      key: "getBasketsByIDPaymentMethods",
      value: function getBasketsByIDPaymentMethods(basketId) {
        return this.getBasketsByIDPaymentMethodsWithHttpInfo(basketId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Gets the applicable shipping methods for a certain shipment of a  basket.
       * @param {String} basketId the id of the basket
       * @param {String} shipmentId the id of the shipment
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ShippingMethodResult} and HTTP response
       */

    }, {
      key: "getBasketsByIDShipmentsByIDShippingMethodsWithHttpInfo",
      value: function getBasketsByIDShipmentsByIDShippingMethodsWithHttpInfo(basketId, shipmentId) {
        var postBody = null; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling getBasketsByIDShipmentsByIDShippingMethods');
        } // verify the required parameter 'shipmentId' is set


        if (shipmentId === undefined || shipmentId === null) {
          throw new Error('Missing the required parameter \'shipmentId\' when calling getBasketsByIDShipmentsByIDShippingMethods');
        }

        var pathParams = {
          basket_id: basketId,
          shipment_id: shipmentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ShippingMethodResult;
        return this.apiClient.callApi('/baskets/{basket_id}/shipments/{shipment_id}/shipping_methods', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Gets the applicable shipping methods for a certain shipment of a  basket.
       * @param {String} basketId the id of the basket
       * @param {String} shipmentId the id of the shipment
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ShippingMethodResult}
       */

    }, {
      key: "getBasketsByIDShipmentsByIDShippingMethods",
      value: function getBasketsByIDShipmentsByIDShippingMethods(basketId, shipmentId) {
        return this.getBasketsByIDShipmentsByIDShippingMethodsWithHttpInfo(basketId, shipmentId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Updates a basket. Only the currency of the basket, source code, and the custom  properties of the basket and of the shipping items will be considered.
       * @param {String} basketId the id of the basket to be modified
       * @param {module:models/Basket} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "patchBasketsByIDWithHttpInfo",
      value: function patchBasketsByIDWithHttpInfo(basketId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling patchBasketsByID');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchBasketsByID');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Updates a basket. Only the currency of the basket, source code, and the custom  properties of the basket and of the shipping items will be considered.
       * @param {String} basketId the id of the basket to be modified
       * @param {module:models/Basket} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "patchBasketsByID",
      value: function patchBasketsByID(basketId, body) {
        return this.patchBasketsByIDWithHttpInfo(basketId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Updates an item in a basket.
       * The  following values in the request body are considered by the server:
       * product_id: a valid product id. The purpose of this  value is to exchange a variation of a variation product.
       * shipment_id: a valid shipment id. The purpose of  this value is to move a product item to another shipment.
       * quantity: a number between 0 and 999. The purpose of  this value is to change quantity of the product item. If quantity is 0,
       * the product item is removed.
       * option_items/option_value_id: a valid option value  id. The purpose of this value is to exchange an option value for an  option item of an option product.
       * This is only possible if the product item is an option product.
       * To change  option values a collection of option items to be changed need to be
       * provided in property option_items. Those  option_items need to contain option_id
       * and option_value_id. The provided values must be valid  for the option product that
       * this product item represents. Otherwise  InvalidProductOptionItemException or
       * InvalidProductOptionValueItemException will be thrown.  custom properties c_&lt;CUSTOM_NAME&gt;: a
       * value corresponding to the type defined for custom attribute  &lt;CUSTOM_NAME&gt; of ProductLineItem.
       * The purpose of this value is to  add or change the value of a custom attribute defined for  ProductLineItem.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} itemId the it of the item to be updated
       * @param {module:models/ProductItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "patchBasketsByIDItemsByIDWithHttpInfo",
      value: function patchBasketsByIDItemsByIDWithHttpInfo(basketId, itemId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling patchBasketsByIDItemsByID');
        } // verify the required parameter 'itemId' is set


        if (itemId === undefined || itemId === null) {
          throw new Error('Missing the required parameter \'itemId\' when calling patchBasketsByIDItemsByID');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchBasketsByIDItemsByID');
        }

        var pathParams = {
          basket_id: basketId,
          item_id: itemId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/items/{item_id}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Updates an item in a basket.
       * The  following values in the request body are considered by the server:
       * product_id: a valid product id. The purpose of this  value is to exchange a variation of a variation product.
       * shipment_id: a valid shipment id. The purpose of  this value is to move a product item to another shipment.
       * quantity: a number between 0 and 999. The purpose of  this value is to change quantity of the product item. If quantity is 0,  the product item is removed.
       * option_items/option_value_id: a valid option value  id. The purpose of this value is to exchange an option value for an  option item of an option product.
       * This is only possible if the product item is an option product. To change
       * option values a collection of option items to be changed need to be
       * provided in property option_items. Those  option_items need to contain option_id  and option_value_id.
       * The provided values must be valid  for the option product that this product item represents. Otherwise
       * InvalidProductOptionItemException or  InvalidProductOptionValueItemException will be thrown.
       * custom properties c_&lt;CUSTOM_NAME&gt;: a  value corresponding to the type defined for custom attribute
       * &lt;CUSTOM_NAME&gt; of ProductLineItem. The purpose of this value is to
       * add or change the value of a custom attribute defined for  ProductLineItem.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} itemId the it of the item to be updated
       * @param {module:models/ProductItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "patchBasketsByIDItemsByID",
      value: function patchBasketsByIDItemsByID(basketId, itemId, body) {
        return this.patchBasketsByIDItemsByIDWithHttpInfo(basketId, itemId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Updates a payment instrument of a basket.
       * Payment instruments are usually authorized after order creation, for example in a custom hook. The default
       * payment authorization process executes an authorization when a payment instrument is added to an order or
       * updated.
       * See POST /orders/{order_no}/payment_instruments and PATCH  /orders/{order_no}/payment_instruments/{payment_instrument_id}
       * @param {String} basketId the basket id
       * @param {String} paymentInstrumentId the id of the payment instrument to be updated
       * @param {module:models/BasketPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "patchBasketsByIDPaymentInstrumentsByIDWithHttpInfo",
      value: function patchBasketsByIDPaymentInstrumentsByIDWithHttpInfo(basketId, paymentInstrumentId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling patchBasketsByIDPaymentInstrumentsByID');
        } // verify the required parameter 'paymentInstrumentId' is set


        if (paymentInstrumentId === undefined || paymentInstrumentId === null) {
          throw new Error('Missing the required parameter \'paymentInstrumentId\' when calling patchBasketsByIDPaymentInstrumentsByID');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchBasketsByIDPaymentInstrumentsByID');
        }

        var pathParams = {
          basket_id: basketId,
          payment_instrument_id: paymentInstrumentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/payment_instruments/{payment_instrument_id}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Updates a payment instrument of a basket.
       * Payment instruments are usually authorized after order creation, for example in a custom hook. The default
       * payment authorization process executes an authorization when a payment instrument is added to an order or
       * updated. See POST /orders/{order_no}/payment_instruments and PATCH  /orders/{order_no}/payment_instruments/{payment_instrument_id}
       * @param {String} basketId the basket id
       * @param {String} paymentInstrumentId the id of the payment instrument to be updated
       * @param {module:models/BasketPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "patchBasketsByIDPaymentInstrumentsByID",
      value: function patchBasketsByIDPaymentInstrumentsByID(basketId, paymentInstrumentId, body) {
        return this.patchBasketsByIDPaymentInstrumentsByIDWithHttpInfo(basketId, paymentInstrumentId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Updates a shipment for a basket.
       * The shipment is initialized with values provided in the body
       * document and can be updated with further data API calls. Considered from
       * the body are the following properties if specified
       * the id  the shipping address  the shipping method  gift boolean flag  gift message  custom properties
       * @param {String} basketId the id of the basket to be modified
       * @param {String} shipmentId the id of the shipment to be modified
       * @param {module:models/Shipment} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "patchBasketsByIDShipmentsByIDWithHttpInfo",
      value: function patchBasketsByIDShipmentsByIDWithHttpInfo(basketId, shipmentId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling patchBasketsByIDShipmentsByID');
        } // verify the required parameter 'shipmentId' is set


        if (shipmentId === undefined || shipmentId === null) {
          throw new Error('Missing the required parameter \'shipmentId\' when calling patchBasketsByIDShipmentsByID');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchBasketsByIDShipmentsByID');
        }

        var pathParams = {
          basket_id: basketId,
          shipment_id: shipmentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/shipments/{shipment_id}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Updates a shipment for a basket.
       * The shipment is initialized with values provided in the body
       * document and can be updated with further data API calls. Considered from
       * the body are the following properties if specified    the id  the shipping address
       * the shipping method  gift boolean flag  gift message  custom properties
       * @param {String} basketId the id of the basket to be modified
       * @param {String} shipmentId the id of the shipment to be modified
       * @param {module:models/Shipment} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "patchBasketsByIDShipmentsByID",
      value: function patchBasketsByIDShipmentsByID(basketId, shipmentId, body) {
        return this.patchBasketsByIDShipmentsByIDWithHttpInfo(basketId, shipmentId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Creates a new basket. The created basket is initialized with default values. Data provided in the body document
       * will be populated into the created basket. It can be updated with further Shop API calls.
       * Considered values from the request body are:
       * customer information: PUT /baskets/{basket_id}/customer
       * billing address: PUT /baskets/{basket_id}/billing_address
       * shipments including shipping address and shipping method: POST /baskets/{basket_id}/shipments
       * product items: POST /baskets/{basket_id}/items
       * coupon items: POST /baskets/{basket_id}/coupons
       * gift certificate items: POST /baskets/{basket_id}/gift_certificates
       * payment method and card type: POST /baskets/{basket_id}/payment_instruments
       * custom properties: PATCH /baskets/{basket_id}
       * Related resource means with which resource you can specify the same data after the basket creation.
       * Identify the basket using the basket_id property, which
       * should be integrated into the path of an update request, for example a POST to  /baskets/{basket_id}/items.
       * The resource supports JWT or  OAuth tokens for authentication:
       * A customer must provide a JWT, which specifies exactly one customer (it may be a guest or a registered  customer). In this case the resource creates a basket for this customer.
       * An agent must provide an OAuth token. The agent can use this resource to create a basket for a new created  guest customer, and can later update the customer if desired.
       * The number of baskets which can be created per customer is limited. When a
       * basket is created it is said to be open. It remains open until either an order is created from it
       * using a POST to resource /orders or it is deleted using a DELETE to resource  /baskets/{basket_id}. The number of open baskets allowed depends on the authentication  method used:
       * When using JWT each customer can have just one open basket  When using OAuth each customer can have up to 4 open baskets (this is a quota setting which can be
       * updated by support)
       * @param {Object} opts Optional parameters
       * @param {module:models/Basket} opts.body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "postBasketsWithHttpInfo",
      value: function postBasketsWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = opts.body;
        var pathParams = {};
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Creates a new basket. The created basket is initialized with default values. Data provided in the body document
       * will be populated into the created basket. It can be updated with further Shop API calls.
       * Considered values from the request body are:
       * customer information: PUT /baskets/{basket_id}/customer  billing address: PUT /baskets/{basket_id}/billing_address
       * shipments including shipping address and shipping method: POST /baskets/{basket_id}/shipments  product items: POST /baskets/{basket_id}/items
       * coupon items: POST /baskets/{basket_id}/coupons  gift certificate items: POST /baskets/{basket_id}/gift_certificates
       * payment method and card type: POST /baskets/{basket_id}/payment_instruments  custom properties: PATCH /baskets/{basket_id}
       * Related resource means with which resource you can specify the same data after the basket creation.
       * Identify the basket using the basket_id property, which  should be integrated into the path of an update request, for example a POST to
       * /baskets/{basket_id}/items.
       * The resource supports JWT or  OAuth tokens for authentication:
       * A customer must provide a JWT, which specifies exactly one customer (it may be a guest or a registered
       * customer). In this case the resource creates a basket for this customer.
       * An agent must provide an OAuth token. The agent can use this resource to create a basket for a new created
       * guest customer, and can later update the customer if desired.
       * The number of baskets which can be created per customer is limited. When a
       * basket is created it is said to be open. It remains open until either an order is created from it
       * using a POST to resource /orders or it is deleted using a DELETE to resource  /baskets/{basket_id}. The number of open baskets allowed depends on the authentication
       * method used:
       * When using JWT each customer can have just one open basket  When using OAuth each customer can have up to 4 open baskets (this is a quota setting which can be
       * updated by support)
       * @param {Object} opts Optional parameters
       * @param {module:models/Basket} opts.body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "postBaskets",
      value: function postBaskets(opts) {
        return this.postBasketsWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Adds a coupon to an existing basket.
       * @param {String} basketId The id of the basket to be modified.
       * @param {module:models/CouponItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "postBasketsByIDCouponsWithHttpInfo",
      value: function postBasketsByIDCouponsWithHttpInfo(basketId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling postBasketsByIDCoupons');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postBasketsByIDCoupons');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/coupons', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Adds a coupon to an existing basket.
       * @param {String} basketId The id of the basket to be modified.
       * @param {module:models/CouponItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "postBasketsByIDCoupons",
      value: function postBasketsByIDCoupons(basketId, body) {
        return this.postBasketsByIDCouponsWithHttpInfo(basketId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Adds a gift certificate item to an existing basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {module:models/GiftCertificateItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "postBasketsByIDGiftCertificateItemsWithHttpInfo",
      value: function postBasketsByIDGiftCertificateItemsWithHttpInfo(basketId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling postBasketsByIDGiftCertificateItems');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postBasketsByIDGiftCertificateItems');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/gift_certificate_items', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Adds a gift certificate item to an existing basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {module:models/GiftCertificateItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "postBasketsByIDGiftCertificateItems",
      value: function postBasketsByIDGiftCertificateItems(basketId, body) {
        return this.postBasketsByIDGiftCertificateItemsWithHttpInfo(basketId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Adds new items to a basket.
       * The added items are associated with the  specified shipment. If no shipment id is specified, the added items are associated with the default shipment.
       * Considered values from the request body, for each item are:
       * product_id: a valid product id. This is the id of the product to be added to the basket. If the
       * product is already in the basket, the API either increments the quantity of the existing product line item or
       * creates a new product line item, based on the site preference &#39;Add Product Behavior&#39;. For option products and
       * product bundles containing variation masters, the API creates a new product line item regardless of the site
       * preference.  shipment_id: a valid shipment id (optional). This is the id of the shipment in which the product item  is created.
       * quantity: a number between 0.01 and 999. This is the quantity of the product to order.
       * inventory_id: a valid inventory id (optional). This is the id of the inventory from which the item is
       * allocated.
       * bonus_discount_line_item_id: a valid bonus discount line item id (optional). This is the id of the
       * bonus discount line item for which the added product is a selected bonus product.
       * option_items/option_value_id: a valid option value id. This is an option value for an option item of  an option product.
       * This is only possible if the product item is an option
       * product. To set option values, you must specify a collection of option items in the option_items
       * property. These option items must contain option_id and option_value_id. Also,
       * the values you specify must be valid for the option product that this product item represents. Otherwise, the
       * server throws an InvalidProductOptionItemException or an  InvalidProductOptionValueItemException.
       * custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property must correspond to a custom
       * attribute (&lt;CUSTOM_NAME&gt;) defined for ProductLineItem. The value of this property must be valid for the
       * type of custom attribute defined for ProductLineItem.
       * @param {String} basketId The id of the basket to be modified.
       * @param {module:models/ProductItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "postBasketsByIDItemsWithHttpInfo",
      value: function postBasketsByIDItemsWithHttpInfo(basketId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling postBasketsByIDItems');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postBasketsByIDItems');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/items', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Adds new items to a basket.
       * The added items are associated with the  specified shipment. If no shipment id is specified, the added items are associated with the default shipment.
       * Considered values from the request body, for each item are:
       * product_id: a valid product id. This is the id of the product to be added to the basket. If the
       * product is already in the basket, the API either increments the quantity of the existing product line item or
       * creates a new product line item, based on the site preference &#39;Add Product Behavior&#39;. For option products and
       * product bundles containing variation masters, the API creates a new product line item regardless of the site  preference.
       * shipment_id: a valid shipment id (optional). This is the id of the shipment in which the product item  is created.
       * quantity: a number between 0.01 and 999. This is the quantity of the product to order.
       * inventory_id: a valid inventory id (optional). This is the id of the inventory from which the item is  allocated.
       * bonus_discount_line_item_id: a valid bonus discount line item id (optional). This is the id of the
       * bonus discount line item for which the added product is a selected bonus product.
       * option_items/option_value_id: a valid option value id. This is an option value for an option item of  an option product.
       * This is only possible if the product item is an option
       * product. To set option values, you must specify a collection of option items in the option_items
       * property. These option items must contain option_id and option_value_id. Also,
       * the values you specify must be valid for the option product that this product item represents.
       * Otherwise, the  server throws an InvalidProductOptionItemException or an  InvalidProductOptionValueItemException.
       * custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property must correspond to a custom
       * attribute (&lt;CUSTOM_NAME&gt;) defined for ProductLineItem. The value of this property must be valid for the
       * type of custom attribute defined for ProductLineItem.
       * @param {String} basketId The id of the basket to be modified.
       * @param {module:models/ProductItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "postBasketsByIDItems",
      value: function postBasketsByIDItems(basketId, body) {
        return this.postBasketsByIDItemsWithHttpInfo(basketId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Adds a note to an existing basket.
       * @param {String} basketId The id of the basket to be modified.
       * @param {module:models/Note} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "postBasketsByIDNotesWithHttpInfo",
      value: function postBasketsByIDNotesWithHttpInfo(basketId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling postBasketsByIDNotes');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postBasketsByIDNotes');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/notes', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Adds a note to an existing basket.
       * @param {String} basketId The id of the basket to be modified.
       * @param {module:models/Note} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "postBasketsByIDNotes",
      value: function postBasketsByIDNotes(basketId, body) {
        return this.postBasketsByIDNotesWithHttpInfo(basketId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Adds a payment instrument to a basket.
       * Payment instruments are usually authorized after order creation, for example in a custom hook. The default
       * payment authorization process executes an authorization when a payment instrument is added to an order or
       * updated. See POST /orders/{order_no}/payment_instruments and PATCH  /orders/{order_no}/payment_instruments/{payment_instrument_id}.
       * NOTE: If CREDIT_CARD is selected as the payment_method_id, it is mandatory to provide the property card_type.
       * @param {String} basketId the basket id
       * @param {module:models/BasketPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "postBasketsByIDPaymentInstrumentsWithHttpInfo",
      value: function postBasketsByIDPaymentInstrumentsWithHttpInfo(basketId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling postBasketsByIDPaymentInstruments');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postBasketsByIDPaymentInstruments');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/payment_instruments', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Adds a payment instrument to a basket.
       * Payment instruments are usually authorized after order creation, for example in a custom hook. The default
       * payment authorization process executes an authorization when a payment instrument is added to an order or
       * updated.
       * See POST /orders/{order_no}/payment_instruments and PATCH  /orders/{order_no}/payment_instruments/{payment_instrument_id}.
       * NOTE: If CREDIT_CARD is selected as the payment_method_id, it is mandatory to provide the property card_type.
       * @param {String} basketId the basket id
       * @param {module:models/BasketPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "postBasketsByIDPaymentInstruments",
      value: function postBasketsByIDPaymentInstruments(basketId, body) {
        return this.postBasketsByIDPaymentInstrumentsWithHttpInfo(basketId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Creates a new shipment for a basket.
       * The created shipment is initialized with values provided in the body
       * document and can be updated with further data API calls. Considered from
       * the body are the following properties if specified:
       * the id
       * the shipping address
       * the shipping method
       * gift boolean flag
       * gift message
       * custom properties
       * @param {String} basketId the id of the basket to be modified
       * @param {module:models/Shipment} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "postBasketsByIDShipmentsWithHttpInfo",
      value: function postBasketsByIDShipmentsWithHttpInfo(basketId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling postBasketsByIDShipments');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postBasketsByIDShipments');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/shipments', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Creates a new shipment for a basket.
       * The created shipment is initialized with values provided in the body
       * document and can be updated with further data API calls. Considered from
       * the body are the following properties if specified:
       * the id
       * the shipping address
       * the shipping method
       * gift boolean flag
       * gift message
       * custom properties
       * @param {String} basketId the id of the basket to be modified
       * @param {module:models/Shipment} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "postBasketsByIDShipments",
      value: function postBasketsByIDShipments(basketId, body) {
        return this.postBasketsByIDShipmentsWithHttpInfo(basketId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Sets the billing address of a basket.
       * @param {String} basketId The id of the basket to be modified.
       * @param {Object} opts Optional parameters
       * @param {Boolean} opts.useAsShipping
       * @param {String} opts.customerAddressId
       * @param {module:models/OrderAddress} opts.body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "putBasketsByIDBillingAddressWithHttpInfo",
      value: function putBasketsByIDBillingAddressWithHttpInfo(basketId, opts) {
        opts = opts || {};
        var postBody = opts.body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling putBasketsByIDBillingAddress');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {
          use_as_shipping: opts.useAsShipping,
          customer_address_id: opts.customerAddressId
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/billing_address', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Sets the billing address of a basket.
       * @param {String} basketId The id of the basket to be modified.
       * @param {Object} opts Optional parameters
       * @param {Boolean} opts.useAsShipping
       * @param {String} opts.customerAddressId
       * @param {module:models/OrderAddress} opts.body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "putBasketsByIDBillingAddress",
      value: function putBasketsByIDBillingAddress(basketId, opts) {
        return this.putBasketsByIDBillingAddressWithHttpInfo(basketId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Sets customer information for an existing basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {module:models/CustomerInfo} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "putBasketsByIDCustomerWithHttpInfo",
      value: function putBasketsByIDCustomerWithHttpInfo(basketId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling putBasketsByIDCustomer');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling putBasketsByIDCustomer');
        }

        var pathParams = {
          basket_id: basketId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/customer', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Sets customer information for an existing basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {module:models/CustomerInfo} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "putBasketsByIDCustomer",
      value: function putBasketsByIDCustomer(basketId, body) {
        return this.putBasketsByIDCustomerWithHttpInfo(basketId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Sets a shipping address of a specific shipment of a basket.
       * @param {String} basketId The id of the basket to be modified.
       * @param {String} shipmentId The id of the shipment to be modified.
       * @param {module:models/OrderAddress} body
       * @param {Object} opts Optional parameters
       * @param {Boolean} opts.useAsBilling
       * @param {String} opts.customerAddressId
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "putBasketsByIDShipmentsByIDShippingAddressWithHttpInfo",
      value: function putBasketsByIDShipmentsByIDShippingAddressWithHttpInfo(basketId, shipmentId, body, opts) {
        opts = opts || {};
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling putBasketsByIDShipmentsByIDShippingAddress');
        } // verify the required parameter 'shipmentId' is set


        if (shipmentId === undefined || shipmentId === null) {
          throw new Error('Missing the required parameter \'shipmentId\' when calling putBasketsByIDShipmentsByIDShippingAddress');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling putBasketsByIDShipmentsByIDShippingAddress');
        }

        var pathParams = {
          basket_id: basketId,
          shipment_id: shipmentId
        };
        var queryParams = {
          use_as_billing: opts.useAsBilling,
          customer_address_id: opts.customerAddressId
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/shipments/{shipment_id}/shipping_address', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Sets a shipping address of a specific shipment of a basket.
       * @param {String} basketId The id of the basket to be modified.
       * @param {String} shipmentId The id of the shipment to be modified.
       * @param {module:models/OrderAddress} body
       * @param {Object} opts Optional parameters
       * @param {Boolean} opts.useAsBilling
       * @param {String} opts.customerAddressId
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "putBasketsByIDShipmentsByIDShippingAddress",
      value: function putBasketsByIDShipmentsByIDShippingAddress(basketId, shipmentId, body, opts) {
        return this.putBasketsByIDShipmentsByIDShippingAddressWithHttpInfo(basketId, shipmentId, body, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Sets a shipping method to a specific shipment of a basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} shipmentId the id of the shipment to be modified
       * @param {module:models/ShippingMethod} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Basket} and HTTP response
       */

    }, {
      key: "putBasketsByIDShipmentsByIDShippingMethodWithHttpInfo",
      value: function putBasketsByIDShipmentsByIDShippingMethodWithHttpInfo(basketId, shipmentId, body) {
        var postBody = body; // verify the required parameter 'basketId' is set

        if (basketId === undefined || basketId === null) {
          throw new Error('Missing the required parameter \'basketId\' when calling putBasketsByIDShipmentsByIDShippingMethod');
        } // verify the required parameter 'shipmentId' is set


        if (shipmentId === undefined || shipmentId === null) {
          throw new Error('Missing the required parameter \'shipmentId\' when calling putBasketsByIDShipmentsByIDShippingMethod');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling putBasketsByIDShipmentsByIDShippingMethod');
        }

        var pathParams = {
          basket_id: basketId,
          shipment_id: shipmentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Basket;
        return this.apiClient.callApi('/baskets/{basket_id}/shipments/{shipment_id}/shipping_method', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Sets a shipping method to a specific shipment of a basket.
       * @param {String} basketId the id of the basket to be modified
       * @param {String} shipmentId the id of the shipment to be modified
       * @param {module:models/ShippingMethod} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Basket}
       */

    }, {
      key: "putBasketsByIDShipmentsByIDShippingMethod",
      value: function putBasketsByIDShipmentsByIDShippingMethod(basketId, shipmentId, body) {
        return this.putBasketsByIDShipmentsByIDShippingMethodWithHttpInfo(basketId, shipmentId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return BasketsApi;
  }();

  /**
   * Categories service.
   * @module api/CategoriesApi
   * @version 17.8
   */

  var CategoriesApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new CategoriesApi.
     * @alias module:api/CategoriesApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function CategoriesApi(apiClient) {
      _classCallCheck(this, CategoriesApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * When you use the URL template below, the server returns a category identified by its id; by default, the server
     * also returns the first level of subcategories, but you can specify another level by setting the levels
     * parameter. The server only returns online categories.
     * @param {String} id The id of the requested category.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.levels
     * @param {String} opts.locale
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Category} and HTTP response
     */


    _createClass(CategoriesApi, [{
      key: "getCategoriesByIDWithHttpInfo",
      value: function getCategoriesByIDWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getCategoriesByID');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          levels: opts.levels,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Category;
        return this.apiClient.callApi('/categories/{id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * When you use the URL template below, the server returns a category identified by its id; by default, the server
       * also returns the first level of subcategories, but you can specify another level by setting the levels
       * parameter. The server only returns online categories.
       * @param {String} id The id of the requested category.
       * @param {Object} opts Optional parameters
       * @param {Number} opts.levels
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Category}
       */

    }, {
      key: "getCategoriesByID",
      value: function getCategoriesByID(id, opts) {
        return this.getCategoriesByIDWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {Number} opts.levels
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CategoryResult} and HTTP response
       */

    }, {
      key: "getCategoriesByIDsWithHttpInfo",
      value: function getCategoriesByIDsWithHttpInfo(ids, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'ids' is set

        if (ids === undefined || ids === null) {
          throw new Error('Missing the required parameter \'ids\' when calling getCategoriesByIDs');
        }

        var pathParams = {
          ids: ids
        };
        var queryParams = {
          levels: opts.levels,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CategoryResult;
        return this.apiClient.callApi('/categories/({ids})', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {Number} opts.levels
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CategoryResult}
       */

    }, {
      key: "getCategoriesByIDs",
      value: function getCategoriesByIDs(ids, opts) {
        return this.getCategoriesByIDsWithHttpInfo(ids, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return CategoriesApi;
  }();

  /**
   * Content service.
   * @module api/ContentApi
   * @version 17.8
   */

  var ContentApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new ContentApi.
     * @alias module:api/ContentApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function ContentApi(apiClient) {
      _classCallCheck(this, ContentApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * To access a content asset, you construct a URL using the template shown below. This template requires you to
     * specify a content asset id. In response, the server returns a corresponding content asset document. Only content
     * assets, which are marked as online are returned. An assignment to a folder is not necessary.
     * @param {String} id The id of the requested content asset.
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Content} and HTTP response
     */


    _createClass(ContentApi, [{
      key: "getContentByIDWithHttpInfo",
      value: function getContentByIDWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getContentByID');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Content;
        return this.apiClient.callApi('/content/{id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * To access a content asset, you construct a URL using the template shown below. This template requires you to
       * specify a content asset id. In response, the server returns a corresponding content asset document. Only content
       * assets, which are marked as online are returned. An assignment to a folder is not necessary.
       * @param {String} id The id of the requested content asset.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Content}
       */

    }, {
      key: "getContentByID",
      value: function getContentByID(id, opts) {
        return this.getContentByIDWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ContentResult} and HTTP response
       */

    }, {
      key: "getContentByIDsWithHttpInfo",
      value: function getContentByIDsWithHttpInfo(ids, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'ids' is set

        if (ids === undefined || ids === null) {
          throw new Error('Missing the required parameter \'ids\' when calling getContentByIDs');
        }

        var pathParams = {
          ids: ids
        };
        var queryParams = {
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ContentResult;
        return this.apiClient.callApi('/content/({ids})', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ContentResult}
       */

    }, {
      key: "getContentByIDs",
      value: function getContentByIDs(ids, opts) {
        return this.getContentByIDsWithHttpInfo(ids, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return ContentApi;
  }();

  /**
   * Content_search service.
   * @module api/ContentSearchApi
   * @version 17.8
   */

  var ContentSearchApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new ContentSearchApi.
     * @alias module:api/ContentSearchApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function ContentSearchApi(apiClient) {
      _classCallCheck(this, ContentSearchApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Provides keyword and refinement search functionality for content assets. The search result contains only content  that is online and assigned to a folder.
     * @param {Object} opts Optional parameters
     * @param {String} opts.q The query phrase to search for.
     * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
     * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
     * can be provided by separating them using a pipe (URL
     * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;foo&#x3D;(100..500) Multiple refine
     * parameters can be provided by adding an underscore in combination with an integer counter right behind
     * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementType&#x3D;type1|type2|type3. The
     * following system refinement attribute ids are supported:
     * fdid: Allows to refine per single content folder id. Multiple folder ids are not supported.
     * @param {Array.<String>} opts.sort Parameter that represents a sorting attribute/value(s) pair. Sorting attribute id and value are
     * separated by &#39;&#x3D;&#39;. The value describes the sort direction. Possible values are &#39;asc&#39; and &#39;desc&#39;, for
     * ascending or descending sort direction. I.e. sort&#x3D;c_myAttribute&#x3D;desc. Precondition: You have to select
     * your sorting attributes in Business Manager &gt; YourSite &gt; Search Indexes &gt; Content Index &gt; Sorting
     * Attributes.
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @param {String} opts.locale The locale context.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ContentSearchResult} and HTTP response
     */


    _createClass(ContentSearchApi, [{
      key: "getContentSearchWithHttpInfo",
      value: function getContentSearchWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = null;
        var pathParams = {};
        var queryParams = {
          q: opts.q,
          refine: this.apiClient.buildCollectionParam(opts.refine, 'csv'),
          sort: this.apiClient.buildCollectionParam(opts.sort, 'csv'),
          start: opts.start,
          count: opts.count,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ContentSearchResult;
        return this.apiClient.callApi('/content_search', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Provides keyword and refinement search functionality for content assets. The search result contains only content  that is online and assigned to a folder.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;foo&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementType&#x3D;type1|type2|type3. The
       * following system refinement attribute ids are supported:
       * fdid: Allows to refine per single content folder id. Multiple folder ids are not supported.
       * @param {Array.<String>} opts.sort Parameter that represents a sorting attribute/value(s) pair. Sorting attribute id and value are
       * separated by &#39;&#x3D;&#39;. The value describes the sort direction. Possible values are &#39;asc&#39; and &#39;desc&#39;, for
       * ascending or descending sort direction. I.e. sort&#x3D;c_myAttribute&#x3D;desc. Precondition: You have to select
       * your sorting attributes in Business Manager &gt; YourSite &gt; Search Indexes &gt; Content Index &gt; Sorting
       * Attributes.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ContentSearchResult}
       */

    }, {
      key: "getContentSearch",
      value: function getContentSearch(opts) {
        return this.getContentSearchWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return ContentSearchApi;
  }();

  /**
   * Custom_objects service.
   * @module api/CustomObjectsApi
   * @version 17.8
   */

  var CustomObjectsApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new CustomObjectsApi.
     * @alias module:api/CustomObjectsApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function CustomObjectsApi(apiClient) {
      _classCallCheck(this, CustomObjectsApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Reads a custom object with a given object type ID and a value for the  key attribute of the object which represents its unique identifier.
     * @param {String} objectType the ID of the object type
     * @param {String} key the key attribute value of the custom object
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomObject} and HTTP response
     */


    _createClass(CustomObjectsApi, [{
      key: "getCustomObjectsByIDByIDWithHttpInfo",
      value: function getCustomObjectsByIDByIDWithHttpInfo(objectType, key) {
        var postBody = null; // verify the required parameter 'objectType' is set

        if (objectType === undefined || objectType === null) {
          throw new Error('Missing the required parameter \'objectType\' when calling getCustomObjectsByIDByID');
        } // verify the required parameter 'key' is set


        if (key === undefined || key === null) {
          throw new Error('Missing the required parameter \'key\' when calling getCustomObjectsByIDByID');
        }

        var pathParams = {
          object_type: objectType,
          key: key
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomObject;
        return this.apiClient.callApi('/custom_objects/{object_type}/{key}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Reads a custom object with a given object type ID and a value for the  key attribute of the object which represents its unique identifier.
       * @param {String} objectType the ID of the object type
       * @param {String} key the key attribute value of the custom object
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomObject}
       */

    }, {
      key: "getCustomObjectsByIDByID",
      value: function getCustomObjectsByIDByID(objectType, key) {
        return this.getCustomObjectsByIDByIDWithHttpInfo(objectType, key).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return CustomObjectsApi;
  }();

  /**
   * Customers service.
   * @module api/CustomersApi
   * @version 17.8
   */

  var CustomersApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new CustomersApi.
     * @alias module:api/CustomersApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function CustomersApi(apiClient) {
      _classCallCheck(this, CustomersApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Invalidates the JWT provided in the header.
     * @param {Object} opts Optional parameters
     * @param {String} opts.authorization the JWT token
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */


    _createClass(CustomersApi, [{
      key: "deleteCustomersAuthWithHttpInfo",
      value: function deleteCustomersAuthWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = null;
        var pathParams = {};
        var queryParams = {};
        var headerParams = {
          Authorization: opts.authorization
        };
        var formParams = {};
        var authNames = ['customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/customers/auth', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Invalidates the JWT provided in the header.
       * @param {Object} opts Optional parameters
       * @param {String} opts.authorization the JWT token
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "deleteCustomersAuth",
      value: function deleteCustomersAuth(opts) {
        return this.deleteCustomersAuthWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Deletes a customer&#39;s address by address name.
       * @param {String} customerId the id of the customer to delete the address for
       * @param {String} addressName the name of the address to delete
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
       */

    }, {
      key: "deleteCustomersByIDAddressesByIDWithHttpInfo",
      value: function deleteCustomersByIDAddressesByIDWithHttpInfo(customerId, addressName) {
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling deleteCustomersByIDAddressesByID');
        } // verify the required parameter 'addressName' is set


        if (addressName === undefined || addressName === null) {
          throw new Error('Missing the required parameter \'addressName\' when calling deleteCustomersByIDAddressesByID');
        }

        var pathParams = {
          customer_id: customerId,
          address_name: addressName
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/customers/{customer_id}/addresses/{address_name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Deletes a customer&#39;s address by address name.
       * @param {String} customerId the id of the customer to delete the address for
       * @param {String} addressName the name of the address to delete
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "deleteCustomersByIDAddressesByID",
      value: function deleteCustomersByIDAddressesByID(customerId, addressName) {
        return this.deleteCustomersByIDAddressesByIDWithHttpInfo(customerId, addressName).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Deletes a customer&#39;s payment instrument.
       * @param {String} customerId the id of the customer to delete the payment instrument for
       * @param {String} paymentInstrumentId the id of the payment instrument to be deleted
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
       */

    }, {
      key: "deleteCustomersByIDPaymentInstrumentsByIDWithHttpInfo",
      value: function deleteCustomersByIDPaymentInstrumentsByIDWithHttpInfo(customerId, paymentInstrumentId) {
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling deleteCustomersByIDPaymentInstrumentsByID');
        } // verify the required parameter 'paymentInstrumentId' is set


        if (paymentInstrumentId === undefined || paymentInstrumentId === null) {
          throw new Error('Missing the required parameter \'paymentInstrumentId\' when calling deleteCustomersByIDPaymentInstrumentsByID');
        }

        var pathParams = {
          customer_id: customerId,
          payment_instrument_id: paymentInstrumentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/customers/{customer_id}/payment_instruments/{payment_instrument_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Deletes a customer&#39;s payment instrument.
       * @param {String} customerId the id of the customer to delete the payment instrument for
       * @param {String} paymentInstrumentId the id of the payment instrument to be deleted
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "deleteCustomersByIDPaymentInstrumentsByID",
      value: function deleteCustomersByIDPaymentInstrumentsByID(customerId, paymentInstrumentId) {
        return this.deleteCustomersByIDPaymentInstrumentsByIDWithHttpInfo(customerId, paymentInstrumentId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Deletes a customer product list.
       * @param {String} customerId The customer id.
       * @param {String} listId The product list id.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
       */

    }, {
      key: "deleteCustomersByIDProductListsByIDWithHttpInfo",
      value: function deleteCustomersByIDProductListsByIDWithHttpInfo(customerId, listId) {
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling deleteCustomersByIDProductListsByID');
        } // verify the required parameter 'listId' is set


        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling deleteCustomersByIDProductListsByID');
        }

        var pathParams = {
          customer_id: customerId,
          list_id: listId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists/{list_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Deletes a customer product list.
       * @param {String} customerId The customer id.
       * @param {String} listId The product list id.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "deleteCustomersByIDProductListsByID",
      value: function deleteCustomersByIDProductListsByID(customerId, listId) {
        return this.deleteCustomersByIDProductListsByIDWithHttpInfo(customerId, listId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Removes an item from a customer product list.
       * @param {String} customerId The id of the owner of the product list
       * @param {String} listId The id of the product list.
       * @param {String} itemId The id of the product list item to delete.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
       */

    }, {
      key: "deleteCustomersByIDProductListsByIDItemsByIDWithHttpInfo",
      value: function deleteCustomersByIDProductListsByIDItemsByIDWithHttpInfo(customerId, listId, itemId) {
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling deleteCustomersByIDProductListsByIDItemsByID');
        } // verify the required parameter 'listId' is set


        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling deleteCustomersByIDProductListsByIDItemsByID');
        } // verify the required parameter 'itemId' is set


        if (itemId === undefined || itemId === null) {
          throw new Error('Missing the required parameter \'itemId\' when calling deleteCustomersByIDProductListsByIDItemsByID');
        }

        var pathParams = {
          customer_id: customerId,
          list_id: listId,
          item_id: itemId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists/{list_id}/items/{item_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Removes an item from a customer product list.
       * @param {String} customerId The id of the owner of the product list
       * @param {String} listId The id of the product list.
       * @param {String} itemId The id of the product list item to delete.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "deleteCustomersByIDProductListsByIDItemsByID",
      value: function deleteCustomersByIDProductListsByIDItemsByID(customerId, listId, itemId) {
        return this.deleteCustomersByIDProductListsByIDItemsByIDWithHttpInfo(customerId, listId, itemId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Gets a customer.
       * @param {String} customerId The customer id
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Customer} and HTTP response
       */

    }, {
      key: "getCustomersByIDWithHttpInfo",
      value: function getCustomersByIDWithHttpInfo(customerId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByID');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv')
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Customer;
        return this.apiClient.callApi('/customers/{customer_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Gets a customer.
       * @param {String} customerId The customer id
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Customer}
       */

    }, {
      key: "getCustomersByID",
      value: function getCustomersByID(customerId, opts) {
        return this.getCustomersByIDWithHttpInfo(customerId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Returns a sorted pageable list of all customer addresses in the address book. The default page
       * size is 10  customer addresses. The addresses are sorted so that the preferred address is
       * always sorted first. The remaining  addresses are sorted alphabetically by ID.
       * When the customer cannot be found CustomerNotFoundException  is thrown in a case of an agent
       * but an empty result list is returned in a case of JWT.
       * @param {String} customerId The customer uuid
       * @param {Object} opts Optional parameters
       * @param {Number} opts.start
       * @param {Number} opts.count
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerAddressResult} and HTTP response
       */

    }, {
      key: "getCustomersByIDAddressesWithHttpInfo",
      value: function getCustomersByIDAddressesWithHttpInfo(customerId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDAddresses');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {
          start: opts.start,
          count: opts.count
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerAddressResult;
        return this.apiClient.callApi('/customers/{customer_id}/addresses', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Returns a sorted pageable list of all customer addresses in the address book. The default
       * page size is 10  customer addresses. The addresses are sorted so that the preferred
       * address is always sorted first. The remaining  addresses are sorted alphabetically by ID.
       * When the customer cannot be found CustomerNotFoundException  is thrown in a case of an
       * agent but an empty result list is returned in a case of JWT.
       * @param {String} customerId The customer uuid
       * @param {Object} opts Optional parameters
       * @param {Number} opts.start
       * @param {Number} opts.count
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerAddressResult}
       */

    }, {
      key: "getCustomersByIDAddresses",
      value: function getCustomersByIDAddresses(customerId, opts) {
        return this.getCustomersByIDAddressesWithHttpInfo(customerId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Retrieves a customer&#39;s address by address name.
       * @param {String} customerId the id of the customer to retrieve the address for
       * @param {String} addressName the name of the address to retrieve
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerAddress} and HTTP response
       */

    }, {
      key: "getCustomersByIDAddressesByIDWithHttpInfo",
      value: function getCustomersByIDAddressesByIDWithHttpInfo(customerId, addressName) {
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDAddressesByID');
        } // verify the required parameter 'addressName' is set


        if (addressName === undefined || addressName === null) {
          throw new Error('Missing the required parameter \'addressName\' when calling getCustomersByIDAddressesByID');
        }

        var pathParams = {
          customer_id: customerId,
          address_name: addressName
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerAddress;
        return this.apiClient.callApi('/customers/{customer_id}/addresses/{address_name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Retrieves a customer&#39;s address by address name.
       * @param {String} customerId the id of the customer to retrieve the address for
       * @param {String} addressName the name of the address to retrieve
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerAddress}
       */

    }, {
      key: "getCustomersByIDAddressesByID",
      value: function getCustomersByIDAddressesByID(customerId, addressName) {
        return this.getCustomersByIDAddressesByIDWithHttpInfo(customerId, addressName).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Gets the baskets of a customer.
       * @param {String} customerId the id of the customer to retrieve the baskets for
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/BasketsResult} and HTTP response
       */

    }, {
      key: "getCustomersByIDBasketsWithHttpInfo",
      value: function getCustomersByIDBasketsWithHttpInfo(customerId) {
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDBaskets');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = BasketsResult;
        return this.apiClient.callApi('/customers/{customer_id}/baskets', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Gets the baskets of a customer.
       * @param {String} customerId the id of the customer to retrieve the baskets for
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/BasketsResult}
       */

    }, {
      key: "getCustomersByIDBaskets",
      value: function getCustomersByIDBaskets(customerId) {
        return this.getCustomersByIDBasketsWithHttpInfo(customerId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Returns a pageable list of all customer&#39;s orders. The default page size is 10.
       * @param {String} customerId the customer uuid
       * @param {Object} opts Optional parameters
       * @param {Number} opts.start
       * @param {Number} opts.count
       * @param {Boolean} opts.crossSites
       * @param {String} opts.from
       * @param {String} opts.until
       * @param {String} opts.status
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerOrderResult} and HTTP response
       */

    }, {
      key: "getCustomersByIDOrdersWithHttpInfo",
      value: function getCustomersByIDOrdersWithHttpInfo(customerId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDOrders');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {
          start: opts.start,
          count: opts.count,
          'cross-sites': opts.crossSites,
          from: opts.from,
          until: opts.until,
          status: opts.status
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerOrderResult;
        return this.apiClient.callApi('/customers/{customer_id}/orders', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Returns a pageable list of all customer&#39;s orders. The default page size is 10.
       * @param {String} customerId the customer uuid
       * @param {Object} opts Optional parameters
       * @param {Number} opts.start
       * @param {Number} opts.count
       * @param {Boolean} opts.crossSites
       * @param {String} opts.from
       * @param {String} opts.until
       * @param {String} opts.status
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerOrderResult}
       */

    }, {
      key: "getCustomersByIDOrders",
      value: function getCustomersByIDOrders(customerId, opts) {
        return this.getCustomersByIDOrdersWithHttpInfo(customerId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Gets customer payment instruments for an customer.  Can be limited to a specific payment
       * method by providing query parameter payment_method_id.
       * When the customer cannot be found CustomerNotFoundException  is thrown in a case of an
       * agent but an empty result list is returned in a case of JWT.
       * @param {String} customerId the id of the customer to retrieve the payment instruments for
       * @param {Object} opts Optional parameters
       * @param {String} opts.paymentMethodId
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerPaymentInstrumentResult} and HTTP response
       */

    }, {
      key: "getCustomersByIDPaymentInstrumentsWithHttpInfo",
      value: function getCustomersByIDPaymentInstrumentsWithHttpInfo(customerId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDPaymentInstruments');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {
          payment_method_id: opts.paymentMethodId
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerPaymentInstrumentResult;
        return this.apiClient.callApi('/customers/{customer_id}/payment_instruments', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Gets customer payment instruments for an customer.  Can be limited to a specific payment
       * method by providing query parameter payment_method_id.
       * When the customer cannot be found CustomerNotFoundException  is thrown in a case of an
       * agent but an empty result list is returned in a case of JWT.
       * @param {String} customerId the id of the customer to retrieve the payment instruments for
       * @param {Object} opts Optional parameters
       * @param {String} opts.paymentMethodId
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerPaymentInstrumentResult}
       */

    }, {
      key: "getCustomersByIDPaymentInstruments",
      value: function getCustomersByIDPaymentInstruments(customerId, opts) {
        return this.getCustomersByIDPaymentInstrumentsWithHttpInfo(customerId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Retrieves a customer&#39;s payment instrument by its id.
       * @param {String} customerId the id of the customer to retrieve the payment instrument for
       * @param {String} paymentInstrumentId the id of the payment instrument to be retrievedCustomer
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerPaymentInstrument} and HTTP response
       */

    }, {
      key: "getCustomersByIDPaymentInstrumentsByIDWithHttpInfo",
      value: function getCustomersByIDPaymentInstrumentsByIDWithHttpInfo(customerId, paymentInstrumentId) {
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDPaymentInstrumentsByID');
        } // verify the required parameter 'paymentInstrumentId' is set


        if (paymentInstrumentId === undefined || paymentInstrumentId === null) {
          throw new Error('Missing the required parameter \'paymentInstrumentId\' when calling getCustomersByIDPaymentInstrumentsByID');
        }

        var pathParams = {
          customer_id: customerId,
          payment_instrument_id: paymentInstrumentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerPaymentInstrument;
        return this.apiClient.callApi('/customers/{customer_id}/payment_instruments/{payment_instrument_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Retrieves a customer&#39;s payment instrument by its id.
       * @param {String} customerId the id of the customer to retrieve the payment instrument for
       * @param {String} paymentInstrumentId the id of the payment instrument to be retrievedCustomer
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerPaymentInstrument}
       */

    }, {
      key: "getCustomersByIDPaymentInstrumentsByID",
      value: function getCustomersByIDPaymentInstrumentsByID(customerId, paymentInstrumentId) {
        return this.getCustomersByIDPaymentInstrumentsByIDWithHttpInfo(customerId, paymentInstrumentId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Returns all customer product lists.
       * @param {String} customerId The customer id.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerProductListResult} and HTTP response
       */

    }, {
      key: "getCustomersByIDProductListsWithHttpInfo",
      value: function getCustomersByIDProductListsWithHttpInfo(customerId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDProductLists');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv')
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerProductListResult;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Returns all customer product lists.
       * @param {String} customerId The customer id.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerProductListResult}
       */

    }, {
      key: "getCustomersByIDProductLists",
      value: function getCustomersByIDProductLists(customerId, opts) {
        return this.getCustomersByIDProductListsWithHttpInfo(customerId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Returns a customer product list of the given customer.
       * @param {String} customerId The customer id.
       * @param {String} listId The product list id.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerProductList} and HTTP response
       */

    }, {
      key: "getCustomersByIDProductListsByIDWithHttpInfo",
      value: function getCustomersByIDProductListsByIDWithHttpInfo(customerId, listId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDProductListsByID');
        } // verify the required parameter 'listId' is set


        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling getCustomersByIDProductListsByID');
        }

        var pathParams = {
          customer_id: customerId,
          list_id: listId
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv')
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerProductList;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists/{list_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Returns a customer product list of the given customer.
       * @param {String} customerId The customer id.
       * @param {String} listId The product list id.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerProductList}
       */

    }, {
      key: "getCustomersByIDProductListsByID",
      value: function getCustomersByIDProductListsByID(customerId, listId, opts) {
        return this.getCustomersByIDProductListsByIDWithHttpInfo(customerId, listId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Returns a pageable list of all items of a customer&#39;s product list. The default page size is 10.
       * @param {String} customerId The id of the customer to retrieve the product list items for.
       * @param {String} listId The id of the product list.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @param {Number} opts.start
       * @param {Number} opts.count
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerProductListItemResult} and HTTP response
       */

    }, {
      key: "getCustomersByIDProductListsByIDItemsWithHttpInfo",
      value: function getCustomersByIDProductListsByIDItemsWithHttpInfo(customerId, listId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDProductListsByIDItems');
        } // verify the required parameter 'listId' is set


        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling getCustomersByIDProductListsByIDItems');
        }

        var pathParams = {
          customer_id: customerId,
          list_id: listId
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv'),
          start: opts.start,
          count: opts.count
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerProductListItemResult;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists/{list_id}/items', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Returns a pageable list of all items of a customer&#39;s product list. The default page size is 10.
       * @param {String} customerId The id of the customer to retrieve the product list items for.
       * @param {String} listId The id of the product list.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @param {Number} opts.start
       * @param {Number} opts.count
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerProductListItemResult}
       */

    }, {
      key: "getCustomersByIDProductListsByIDItems",
      value: function getCustomersByIDProductListsByIDItems(customerId, listId, opts) {
        return this.getCustomersByIDProductListsByIDItemsWithHttpInfo(customerId, listId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Returns an item of a customer product list.
       * @param {String} customerId The id of the customer to retrieve the product list items for.
       * @param {String} listId The id of the product list.
       * @param {String} itemId The id of the product list item to retrieve.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerProductListItem} and HTTP response
       */

    }, {
      key: "getCustomersByIDProductListsByIDItemsByIDWithHttpInfo",
      value: function getCustomersByIDProductListsByIDItemsByIDWithHttpInfo(customerId, listId, itemId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling getCustomersByIDProductListsByIDItemsByID');
        } // verify the required parameter 'listId' is set


        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling getCustomersByIDProductListsByIDItemsByID');
        } // verify the required parameter 'itemId' is set


        if (itemId === undefined || itemId === null) {
          throw new Error('Missing the required parameter \'itemId\' when calling getCustomersByIDProductListsByIDItemsByID');
        }

        var pathParams = {
          customer_id: customerId,
          list_id: listId,
          item_id: itemId
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv')
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerProductListItem;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists/{list_id}/items/{item_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Returns an item of a customer product list.
       * @param {String} customerId The id of the customer to retrieve the product list items for.
       * @param {String} listId The id of the product list.
       * @param {String} itemId The id of the product list item to retrieve.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerProductListItem}
       */

    }, {
      key: "getCustomersByIDProductListsByIDItemsByID",
      value: function getCustomersByIDProductListsByIDItemsByID(customerId, listId, itemId, opts) {
        return this.getCustomersByIDProductListsByIDItemsByIDWithHttpInfo(customerId, listId, itemId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Updates a customer.
       * @param {String} customerId the customer id
       * @param {module:models/Customer} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Customer} and HTTP response
       */

    }, {
      key: "patchCustomersByIDWithHttpInfo",
      value: function patchCustomersByIDWithHttpInfo(customerId, body) {
        var postBody = body; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling patchCustomersByID');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchCustomersByID');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Customer;
        return this.apiClient.callApi('/customers/{customer_id}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Updates a customer.
       * @param {String} customerId the customer id
       * @param {module:models/Customer} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Customer}
       */

    }, {
      key: "patchCustomersByID",
      value: function patchCustomersByID(customerId, body) {
        return this.patchCustomersByIDWithHttpInfo(customerId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Updates a customer&#39;s address by address name.
       * @param {String} customerId the id of the customer to update the address for
       * @param {String} addressName the name of the address to update
       * @param {module:models/CustomerAddress} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerAddress} and HTTP response
       */

    }, {
      key: "patchCustomersByIDAddressesByIDWithHttpInfo",
      value: function patchCustomersByIDAddressesByIDWithHttpInfo(customerId, addressName, body) {
        var postBody = body; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling patchCustomersByIDAddressesByID');
        } // verify the required parameter 'addressName' is set


        if (addressName === undefined || addressName === null) {
          throw new Error('Missing the required parameter \'addressName\' when calling patchCustomersByIDAddressesByID');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchCustomersByIDAddressesByID');
        }

        var pathParams = {
          customer_id: customerId,
          address_name: addressName
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerAddress;
        return this.apiClient.callApi('/customers/{customer_id}/addresses/{address_name}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Updates a customer&#39;s address by address name.
       * @param {String} customerId the id of the customer to update the address for
       * @param {String} addressName the name of the address to update
       * @param {module:models/CustomerAddress} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerAddress}
       */

    }, {
      key: "patchCustomersByIDAddressesByID",
      value: function patchCustomersByIDAddressesByID(customerId, addressName, body) {
        return this.patchCustomersByIDAddressesByIDWithHttpInfo(customerId, addressName, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Changes a product list. Changeable properties are the name, description and if the list is public.
       * @param {module:models/CustomerProductList} body
       * @param {String} customerId The customer id.
       * @param {String} listId The product list id.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerProductList} and HTTP response
       */

    }, {
      key: "patchCustomersByIDProductListsByIDWithHttpInfo",
      value: function patchCustomersByIDProductListsByIDWithHttpInfo(body, customerId, listId) {
        var postBody = body; // verify the required parameter 'body' is set

        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchCustomersByIDProductListsByID');
        } // verify the required parameter 'customerId' is set


        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling patchCustomersByIDProductListsByID');
        } // verify the required parameter 'listId' is set


        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling patchCustomersByIDProductListsByID');
        }

        var pathParams = {
          customer_id: customerId,
          list_id: listId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerProductList;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists/{list_id}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Changes a product list. Changeable properties are the name, description and if the list is public.
       * @param {module:models/CustomerProductList} body
       * @param {String} customerId The customer id.
       * @param {String} listId The product list id.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerProductList}
       */

    }, {
      key: "patchCustomersByIDProductListsByID",
      value: function patchCustomersByIDProductListsByID(body, customerId, listId) {
        return this.patchCustomersByIDProductListsByIDWithHttpInfo(body, customerId, listId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Updates an item of a customer&#39;s product list.  Considered values from the request body are:
       * priority: This is the priority of the customer&#39;s product list item.
       * public: This is the flag whether the customer&#39;s product list item is public.
       * quantity: used for product item type only. This is the quantity of  the customer&#39;s product list item.
       * custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property  must correspond to a
       * custom attribute (&lt;CUSTOM_NAME&gt;) defined for ProductListItem.
       * The value of this property must be valid for the type of custom attribute defined for ProductListItem.
       * @param {String} customerId The id of the owner of the product list.
       * @param {String} listId The id of the product list.
       * @param {String} itemId The id of the product list item to update.
       * @param {module:models/CustomerProductListItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerProductListItem} and HTTP response
       */

    }, {
      key: "patchCustomersByIDProductListsByIDItemsByIDWithHttpInfo",
      value: function patchCustomersByIDProductListsByIDItemsByIDWithHttpInfo(customerId, listId, itemId, body) {
        var postBody = body; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling patchCustomersByIDProductListsByIDItemsByID');
        } // verify the required parameter 'listId' is set


        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling patchCustomersByIDProductListsByIDItemsByID');
        } // verify the required parameter 'itemId' is set


        if (itemId === undefined || itemId === null) {
          throw new Error('Missing the required parameter \'itemId\' when calling patchCustomersByIDProductListsByIDItemsByID');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchCustomersByIDProductListsByIDItemsByID');
        }

        var pathParams = {
          customer_id: customerId,
          list_id: listId,
          item_id: itemId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerProductListItem;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists/{list_id}/items/{item_id}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Updates an item of a customer&#39;s product list.  Considered values from the request body are:
       * priority: This is the priority of the customer&#39;s product list item.
       * public: This is the flag whether the customer&#39;s product list item is public.
       * quantity: used for product item type only. This is the quantity of  the customer&#39;s product list item.
       * custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property  must correspond to a
       * custom attribute (&lt;CUSTOM_NAME&gt;) defined for ProductListItem.
       * The value of this property must be valid for the type of custom attribute defined for ProductListItem.
       * @param {String} customerId The id of the owner of the product list.
       * @param {String} listId The id of the product list.
       * @param {String} itemId The id of the product list item to update.
       * @param {module:models/CustomerProductListItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerProductListItem}
       */

    }, {
      key: "patchCustomersByIDProductListsByIDItemsByID",
      value: function patchCustomersByIDProductListsByIDItemsByID(customerId, listId, itemId, body) {
        return this.patchCustomersByIDProductListsByIDItemsByIDWithHttpInfo(customerId, listId, itemId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Registers a customer.  The mandatory data are the credentials and profile last name and email.
       * When using OAuth the password in the request must not be set, otherwise an InvalidPasswordException
       * will be thrown.  When using JWT the password is required.
       * @param {module:models/CustomerRegistration} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Customer} and HTTP response
       */

    }, {
      key: "postCustomersWithHttpInfo",
      value: function postCustomersWithHttpInfo(body) {
        var postBody = body; // verify the required parameter 'body' is set

        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postCustomers');
        }

        var pathParams = {};
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Customer;
        return this.apiClient.callApi('/customers', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Registers a customer.  The mandatory data are the credentials and profile last name and email.
       * When using OAuth the password in the request must not be set, otherwise an InvalidPasswordException
       * will be thrown.  When using JWT the password is required.
       * @param {module:models/CustomerRegistration} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Customer}
       */

    }, {
      key: "postCustomers",
      value: function postCustomers(body) {
        return this.postCustomersWithHttpInfo(body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Obtains a new JWT (JSON Web Token) for a guest or registered  customer.
       * Tokens are returned as a HTTP Authorization:Bearer response  header entry. These kinds of request are supported, as specified by the  type:
       * Type guest - creates a new guest (non-authenticated) customer  and returns a token for the customer.
       * Type credentials - authenticates credentials passed in the  HTTP Authorization:Basic request header, returning a token for a  successfully authenticated customer otherwise results in an
       * AuthenticationFailedException.
       * Type session - authenticates the customer (anonymous or registered)  on base of dwsid and dwsecuretoken cookies. It returns
       * a token for a  successfully authenticated customer, otherwise results in an
       * AuthenticationFailedException.
       * Type refresh - examines the token passed in the HTTP  Authorization:Bearer request header and when valid returns a new token  with an updated expiry time.
       * For a request of type credentials:
       * Updates profile attributes for the customer (for example,  \&quot;last-visited\&quot;).  Handles the maximum number of failed login attempts.
       * For a request of type session:
       * Does not touch profile attributes for the registered customer (for example,  \&quot;last-visited\&quot;), since this is not a real login.  Returns different tokens for multiple
       * requests with the same session id. Means, there should be  only one call per session.
       * About JWT The token contains 3 sections:
       * the header section (specifies token type and algorithm used)
       * the payload section (contains customer information, client id,  issue and expiration time)  finally the signature section records the token signature.
       * A token is created and returned to the client whenever a registered  customer logs in (type \&quot;credentials\&quot;) or a guest customer requests it (type  \&quot;guest\&quot;).
       * The token is returned in the response header as   Authorization: Bearer --token--
       * The client has to include the token in the request header as
       * Authorization: Bearer --token--   in any follow up request. The server declines any follow up requests  without a token or
       * which cannot be verified based on the token signature  or expiration time. A token nearing its expiration time should be  exchanged for a new one (type \&quot;refresh\&quot;).
       * See \&quot;API Usage &gt; JWT\&quot; for more details on using JWT as an authentication  mechanism.
       * @param {module:models/AuthRequest} body
       * @param {Object} opts Optional parameters
       * @param {String} opts.authorization              Authorization:Basic for type credentials             Authorization:Bearer for type refresh
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Customer} and HTTP response
       */

    }, {
      key: "postCustomersAuthWithHttpInfo",
      value: function postCustomersAuthWithHttpInfo(body, opts) {
        var _this = this;

        opts = opts || {};
        var postBody = body; // verify the required parameter 'body' is set

        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postCustomersAuth');
        }

        var pathParams = {};
        var queryParams = {};
        var headerParams = {
          Authorization: opts.authorization
        };
        var formParams = {};
        var authNames = ['client_id'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Customer;
        return this.apiClient.callApi('/customers/auth', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType).then(function (response) {
          _this.apiClient.defaultHeaders.authorization = response.response.header.authorization;
          return response;
        });
      }
      /**
       * Obtains a new JWT (JSON Web Token) for a guest or registered  customer. Tokens are returned as a HTTP Authorization:Bearer response
       * header entry. These kinds of request are supported, as specified by the  type:
       * Type guest - creates a new guest (non-authenticated) customer  and returns a token for the customer.
       * Type credentials - authenticates credentials passed in the  HTTP Authorization:Basic request header, returning a token for a  successfully authenticated customer otherwise results in an
       * AuthenticationFailedException.
       * Type session - authenticates the customer (anonymous or registered)
       * on base of dwsid and dwsecuretoken cookies. It returns a token for a
       * successfully authenticated customer, otherwise results in an
       * AuthenticationFailedException.
       * Type refresh - examines the token passed in the HTTP  Authorization:Bearer request header and when valid returns a new token  with an updated expiry time.
       * For a request of type credentials:
       * Updates profile attributes for the customer (for example,  \&quot;last-visited\&quot;).
       * Handles the maximum number of failed login attempts.
       * For a request of type session:
       * Does not touch profile attributes for the registered customer (for example,  \&quot;last-visited\&quot;), since this is not a real login.
       * Returns different tokens for multiple requests with the same session id. Means, there should be
       * only one call per session.
       * About JWT The token contains 3 sections:
       * the header section (specifies token type and algorithm used)
       * the payload section (contains customer information, client id,  issue and expiration time)
       * finally the signature section records the token signature.
       * A token is created and returned to the client whenever a registered
       * customer logs in (type \&quot;credentials\&quot;) or a guest customer requests it (type  \&quot;guest\&quot;). The token is returned in the response header as   Authorization: Bearer --token--
       * The client has to include the token in the request header as
       * Authorization: Bearer --token--   in any follow up request. The server declines any follow up requests
       * without a token or which cannot be verified based on the token signature
       * or expiration time. A token nearing its expiration time should be  exchanged for a new one (type \&quot;refresh\&quot;).
       * See \&quot;API Usage &gt; JWT\&quot; for more details on using JWT as an authentication  mechanism.
       * @param {module:models/AuthRequest} body
       * @param {Object} opts Optional parameters
       * @param {String} opts.authorization              Authorization:Basic for type credentials             Authorization:Bearer for type refresh
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Customer}
       */

    }, {
      key: "postCustomersAuth",
      value: function postCustomersAuth(body, opts) {
        return this.postCustomersAuthWithHttpInfo(body, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Creates a new address with the given name for the given customer.
       * @param {String} customerId the id of the customer to create the address for
       * @param {module:models/CustomerAddress} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerAddress} and HTTP response
       */

    }, {
      key: "postCustomersByIDAddressesWithHttpInfo",
      value: function postCustomersByIDAddressesWithHttpInfo(customerId, body) {
        var postBody = body; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling postCustomersByIDAddresses');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postCustomersByIDAddresses');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerAddress;
        return this.apiClient.callApi('/customers/{customer_id}/addresses', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Creates a new address with the given name for the given customer.
       * @param {String} customerId the id of the customer to create the address for
       * @param {module:models/CustomerAddress} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerAddress}
       */

    }, {
      key: "postCustomersByIDAddresses",
      value: function postCustomersByIDAddresses(customerId, body) {
        return this.postCustomersByIDAddressesWithHttpInfo(customerId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       *   Obtains a new agent on behalf token for a registered customer. Token is returned as a HTTP Authorization:Bearer
       * response header entry.
       * A token is created and returned to the client whenever an agent with Create_Order_On_Behalf_Of  permission calls the resource for a registered customer.
       * The token is returned in the response header as Authorization: Bearer --token--.
       * The client has to include the token in the request header as Authorization: Bearer --token--
       * in any follow up request, the agent will do on behalf of the customer.
       * About the order on behalf token
       * The token contains 3 sections:
       * the header section (specifies token type and algorithm used)  the payload section (contains customer information, client id, issue and expiration time)
       * finally the signature section records the token signature.
       * A token nearing its expiration time should be exchanged for a new one by calling this resource once more.
       * @param {String} customerId specifies the customer to act on behalf of
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Customer} and HTTP response
       */

    }, {
      key: "postCustomersByIDAuthWithHttpInfo",
      value: function postCustomersByIDAuthWithHttpInfo(customerId) {
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling postCustomersByIDAuth');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Customer;
        return this.apiClient.callApi('/customers/{customer_id}/auth', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       *   Obtains a new agent on behalf token for a registered customer. Token is returned as a HTTP Authorization:Bearer  response header entry.
       * A token is created and returned to the client whenever an agent with Create_Order_On_Behalf_Of  permission calls the resource for a registered customer.
       * The token is returned in the response header as Authorization: Bearer --token--.
       * The client has to include the token in the request header as Authorization: Bearer --token--
       * in any follow up request, the agent will do on behalf of the customer.
       * About the order on behalf token
       * The token contains 3 sections:
       * the header section (specifies token type and algorithm used)
       * the payload section (contains customer information, client id, issue and expiration time)
       * finally the signature section records the token signature.
       * A token nearing its expiration time should be exchanged for a new one by calling this resource once more.
       * @param {String} customerId specifies the customer to act on behalf of
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Customer}
       */

    }, {
      key: "postCustomersByIDAuth",
      value: function postCustomersByIDAuth(customerId) {
        return this.postCustomersByIDAuthWithHttpInfo(customerId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Starts a password reset process. A password reset token is generated and passed together with the customer
       * resolved by the id provided as path parameter to a afterPOST hook. The hook
       * dw.ocapi.shop.customer.password_reset.afterPOST can utilize the provided reset token, for example to
       * send a reset email.
       * @param {String} customerId the id of the customer
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
       */

    }, {
      key: "postCustomersByIDPasswordResetWithHttpInfo",
      value: function postCustomersByIDPasswordResetWithHttpInfo(customerId) {
        var postBody = null; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling postCustomersByIDPasswordReset');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/customers/{customer_id}/password_reset', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Starts a password reset process. A password reset token is generated and passed together with the customer
       * resolved by the id provided as path parameter to a afterPOST hook.
       * The hook  dw.ocapi.shop.customer.password_reset.afterPOST can utilize the provided reset token,
       * for example to send a reset email.
       * @param {String} customerId the id of the customer
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "postCustomersByIDPasswordReset",
      value: function postCustomersByIDPasswordReset(customerId) {
        return this.postCustomersByIDPasswordResetWithHttpInfo(customerId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Adds a payment instrument to a customer information.
       * @param {String} customerId the id of the customer
       * @param {module:models/CustomerPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerPaymentInstrument} and HTTP response
       */

    }, {
      key: "postCustomersByIDPaymentInstrumentsWithHttpInfo",
      value: function postCustomersByIDPaymentInstrumentsWithHttpInfo(customerId, body) {
        var postBody = body; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling postCustomersByIDPaymentInstruments');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postCustomersByIDPaymentInstruments');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerPaymentInstrument;
        return this.apiClient.callApi('/customers/{customer_id}/payment_instruments', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Adds a payment instrument to a customer information.
       * @param {String} customerId the id of the customer
       * @param {module:models/CustomerPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerPaymentInstrument}
       */

    }, {
      key: "postCustomersByIDPaymentInstruments",
      value: function postCustomersByIDPaymentInstruments(customerId, body) {
        return this.postCustomersByIDPaymentInstrumentsWithHttpInfo(customerId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Creates a customer product list.
       * @param {module:models/CustomerProductList} body
       * @param {String} customerId The customer id.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerProductList} and HTTP response
       */

    }, {
      key: "postCustomersByIDProductListsWithHttpInfo",
      value: function postCustomersByIDProductListsWithHttpInfo(body, customerId) {
        var postBody = body; // verify the required parameter 'body' is set

        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postCustomersByIDProductLists');
        } // verify the required parameter 'customerId' is set


        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling postCustomersByIDProductLists');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerProductList;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Creates a customer product list.
       * @param {String} customerId The customer id.
       * @param {module:models/CustomerProductList} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerProductList}
       */

    }, {
      key: "postCustomersByIDProductLists",
      value: function postCustomersByIDProductLists(customerId, body) {
        return this.postCustomersByIDProductListsWithHttpInfo(body, customerId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Adds an item to the customer&#39;s product list.
       * Considered values from the request body are:
       * type: a valid type, mandatory. This is the type of the item to be added to the customer&#39;s product  list.
       * priority: This is the priority of the item to be added to the customer&#39;s product list.
       * public: This is the flag whether the item to be added to the customer&#39;s product list is public.
       * product_id: a valid product id, used for product item type only. This is the id (sku)
       * of the product related to the item to be added to the customer&#39;s product list. It is mandatory for
       * product item type and it must be a valid product id, otherwise  ProductListProductIdMissingException or ProductListProductNotFoundException  will be thrown.
       * quantity: used for product item type only. This is the quantity of the item to be
       * added to the customer&#39;s product list.
       * custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property must correspond to a custom
       * attribute (&lt;CUSTOM_NAME&gt;) defined for ProductListItem. The value of this property must be valid for the  type of custom attribute defined for ProductListItem.
       * @param {String} customerId The id of the customer - owner of the product list.
       * @param {String} listId The id of the product list
       * @param {module:models/CustomerProductListItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/CustomerProductListItem} and HTTP response
       */

    }, {
      key: "postCustomersByIDProductListsByIDItemsWithHttpInfo",
      value: function postCustomersByIDProductListsByIDItemsWithHttpInfo(customerId, listId, body) {
        var postBody = body; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling postCustomersByIDProductListsByIDItems');
        } // verify the required parameter 'listId' is set


        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling postCustomersByIDProductListsByIDItems');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postCustomersByIDProductListsByIDItems');
        }

        var pathParams = {
          customer_id: customerId,
          list_id: listId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = CustomerProductListItem;
        return this.apiClient.callApi('/customers/{customer_id}/product_lists/{list_id}/items', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Adds an item to the customer&#39;s product list. Considered values from the request body are:
       * type: a valid type, mandatory. This is the type of the item to be added to the customer&#39;s product  list.
       * priority: This is the priority of the item to be added to the customer&#39;s product list.
       * public: This is the flag whether the item to be added to the customer&#39;s product list is public.
       * product_id: a valid product id, used for product item type only. This is the id (sku)  of the product
       * related to the item to be added to the customer&#39;s product list. It is mandatory for  product item type and it must
       * be a valid product id, otherwise  ProductListProductIdMissingException or ProductListProductNotFoundException  will be thrown.
       * quantity: used for product item type only. This is the quantity of the item to be  added to the customer&#39;s product list.
       * custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property must correspond to a custom
       * attribute (&lt;CUSTOM_NAME&gt;) defined for ProductListItem. The value of this property must be valid
       * for the  type of custom attribute defined for ProductListItem.
       * @param {String} customerId The id of the customer - owner of the product list.
       * @param {String} listId The id of the product list
       * @param {module:models/CustomerProductListItem} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/CustomerProductListItem}
       */

    }, {
      key: "postCustomersByIDProductListsByIDItems",
      value: function postCustomersByIDProductListsByIDItems(customerId, listId, body) {
        return this.postCustomersByIDProductListsByIDItemsWithHttpInfo(customerId, listId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * First the beforePOST hook is called. After that the validation of the
       * customer information provided in the the password reset document is performed.
       * Then a password reset token is generated and together with the resolved
       * customer is passed to a afterPOST hook. The customer resolution is based
       * on the password reset request type. Both hooks are performed in a single  transaction.
       * Currently the resolution can be done by email or login. In case of  an email the password reset
       * hook is only executed if one and only one  customer has been identified for that email.
       * In the case that more than  one customers have been identified for the provided email the
       * resource  does nothing.
       * @param {module:models/PasswordReset} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
       */

    }, {
      key: "postCustomersPasswordResetWithHttpInfo",
      value: function postCustomersPasswordResetWithHttpInfo(body) {
        var postBody = body; // verify the required parameter 'body' is set

        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postCustomersPasswordReset');
        }

        var pathParams = {};
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/customers/password_reset', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * First the beforePOST hook is called. After that the validation of the
       * customer information provided in the the password reset document is performed.
       * Then a password reset token is generated and together with the resolved
       * customer is passed to a afterPOST hook. The customer resolution is based
       * on the password reset request type. Both hooks are performed in a single  transaction.
       * Currently the resolution can be done by email or login. In case of  an email the password reset hook is only executed if one and only one
       * customer has been identified for that email. In the case that more than  one
       * customers have been identified for the provided email the resource  does nothing.
       * @param {module:models/PasswordReset} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "postCustomersPasswordReset",
      value: function postCustomersPasswordReset(body) {
        return this.postCustomersPasswordResetWithHttpInfo(body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Updates the customer&#39;s password.
       * @param {String} customerId the customer id
       * @param {module:models/PasswordChangeRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
       */

    }, {
      key: "putCustomersByIDPasswordWithHttpInfo",
      value: function putCustomersByIDPasswordWithHttpInfo(customerId, body) {
        var postBody = body; // verify the required parameter 'customerId' is set

        if (customerId === undefined || customerId === null) {
          throw new Error('Missing the required parameter \'customerId\' when calling putCustomersByIDPassword');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling putCustomersByIDPassword');
        }

        var pathParams = {
          customer_id: customerId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/customers/{customer_id}/password', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Updates the customer&#39;s password.
       * @param {String} customerId the customer id
       * @param {module:models/PasswordChangeRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "putCustomersByIDPassword",
      value: function putCustomersByIDPassword(customerId, body) {
        return this.putCustomersByIDPasswordWithHttpInfo(customerId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return CustomersApi;
  }();

  /**
   * Folders service.
   * @module api/FoldersApi
   * @version 17.8
   */

  var FoldersApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new FoldersApi.
     * @alias module:api/FoldersApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function FoldersApi(apiClient) {
      _classCallCheck(this, FoldersApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * To access a content folder, you construct a URL using the template shown below. This
     * template requires you to  specify a content folder id and a subfolder level. In response,
     * the server returns a corresponding content  folder document. Only content folder,
     * which are marked as online are returned.
     * @param {String} id The id of the requested content folder.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.levels
     * @param {String} opts.locale
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ContentFolder} and HTTP response
     */


    _createClass(FoldersApi, [{
      key: "getFoldersByIDWithHttpInfo",
      value: function getFoldersByIDWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getFoldersByID');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          levels: opts.levels,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ContentFolder;
        return this.apiClient.callApi('/folders/{id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * To access a content folder, you construct a URL using the template shown below.
       * This template requires you to  specify a content folder id and a subfolder level.
       * In response, the server returns a corresponding content  folder document. Only content
       * folder, which are marked as online are returned.
       * @param {String} id The id of the requested content folder.
       * @param {Object} opts Optional parameters
       * @param {Number} opts.levels
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ContentFolder}
       */

    }, {
      key: "getFoldersByID",
      value: function getFoldersByID(id, opts) {
        return this.getFoldersByIDWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {Number} opts.levels
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ContentFolderResult} and HTTP response
       */

    }, {
      key: "getFoldersByIDsWithHttpInfo",
      value: function getFoldersByIDsWithHttpInfo(ids, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'ids' is set

        if (ids === undefined || ids === null) {
          throw new Error('Missing the required parameter \'ids\' when calling getFoldersByIDs');
        }

        var pathParams = {
          ids: ids
        };
        var queryParams = {
          levels: opts.levels,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ContentFolderResult;
        return this.apiClient.callApi('/folders/({ids})', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {Number} opts.levels
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ContentFolderResult}
       */

    }, {
      key: "getFoldersByIDs",
      value: function getFoldersByIDs(ids, opts) {
        return this.getFoldersByIDsWithHttpInfo(ids, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return FoldersApi;
  }();

  /**
   * Gift_certificate service.
   * @module api/GiftCertificateApi
   * @version 17.8
   */

  var GiftCertificateApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new GiftCertificateApi.
     * @alias module:api/GiftCertificateApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function GiftCertificateApi(apiClient) {
      _classCallCheck(this, GiftCertificateApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Action to retrieve an existing gift certificate.
     * @param {Object} opts Optional parameters
     * @param {module:models/GiftCertificateRequest} opts.body
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/GiftCertificate} and HTTP response
     */


    _createClass(GiftCertificateApi, [{
      key: "postGiftCertificateWithHttpInfo",
      value: function postGiftCertificateWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = opts.body;
        var pathParams = {};
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = GiftCertificate;
        return this.apiClient.callApi('/gift_certificate', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Action to retrieve an existing gift certificate.
       * @param {Object} opts Optional parameters
       * @param {module:models/GiftCertificateRequest} opts.body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/GiftCertificate}
       */

    }, {
      key: "postGiftCertificate",
      value: function postGiftCertificate(opts) {
        return this.postGiftCertificateWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return GiftCertificateApi;
  }();

  /**
   * Order_search service.
   * @module api/OrderSearchApi
   * @version 17.8
   */

  var OrderSearchApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new OrderSearchApi.
     * @alias module:api/OrderSearchApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function OrderSearchApi(apiClient) {
      _classCallCheck(this, OrderSearchApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Searches for orders.
     * The query attribute specifies a complex query that can be used to narrow down the search.
     * Note that search fields are mandatory now and no default ones are supported.
     * As the old order search version, the new one always uses Search Service too and the for that reason Order
     * Incremental Indexing should be enabled. Otherwise HTTP 500 response will occur.
     * The supported search fields are:
     * affiliate_partner_i_d  affiliate_partner_name  business_type  channel_type  confirmation_status (String)
     * created_by  creation_date  currency_code  customer_email  customer_name  customer_no  export_after
     * export_status (String)  external_order_no  external_order_status  last_modified  order_no  original_order_no
     * payment_status (String)  replaced_order_no  replacement_order_no  shipping_status (String)
     * status (String)  total_gross_price  total_net_price  order.has_holds  coupon_line_items.coupon_code
     * coupon_line_items.coupon_id  holds.type  invoices.status  order_items.status  payment_instruments.credit_card_type
     * payment_instruments.payment_method_id  product_items.product_id  return_cases.return_case_number
     * shipments.shipping_method_id  shipping_orders.shipping_order_number
     * The sort order of the retrieved orders could be specified by the \&quot;sorts\&quot; parameter. It is a list of objects
     * presenting field name and sort direction (\&quot;asc\&quot; or \&quot;desc\&quot;).
     * Custom attributes could be used as search fields and as sort fields too. A prefix \&quot;c_\&quot; has to be added to them.
     * @param {module:models/OrderSearchRequest} body
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/OrderSearchResult} and HTTP response
     */


    _createClass(OrderSearchApi, [{
      key: "postOrderSearchWithHttpInfo",
      value: function postOrderSearchWithHttpInfo(body) {
        var postBody = body; // verify the required parameter 'body' is set

        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postOrderSearch');
        }

        var pathParams = {};
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = OrderSearchResult;
        return this.apiClient.callApi('/order_search', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Searches for orders.
       * The query attribute specifies a complex query that can be used to narrow down the search.
       * Note that search fields are mandatory now and no default ones are supported.
       * As the old order search version, the new one always uses Search Service too and the for that reason Order
       * Incremental Indexing should be enabled. Otherwise HTTP 500 response will occur.
       * The supported search fields are:
       * affiliate_partner_i_d  affiliate_partner_name  business_type  channel_type  confirmation_status (String)
       * created_by  creation_date  currency_code  customer_email  customer_name  customer_no  export_after
       * export_status (String)  external_order_no  external_order_status  last_modified  order_no  original_order_no
       * payment_status (String)  replaced_order_no  replacement_order_no  shipping_status (String)  status (String)
       * total_gross_price  total_net_price  order.has_holds  coupon_line_items.coupon_code  coupon_line_items.coupon_id
       * holds.type  invoices.status  order_items.status  payment_instruments.credit_card_type
       * payment_instruments.payment_method_id  product_items.product_id  return_cases.return_case_number
       * shipments.shipping_method_id  shipping_orders.shipping_order_number
       * The sort order of the retrieved orders could be specified by the \&quot;sorts\&quot; parameter. It is a list of objects
       * presenting field name and sort direction (\&quot;asc\&quot; or \&quot;desc\&quot;).
       * Custom attributes could be used as search fields and as sort fields too. A prefix \&quot;c_\&quot; has to be added to them.
       * @param {module:models/OrderSearchRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/OrderSearchResult}
       */

    }, {
      key: "postOrderSearch",
      value: function postOrderSearch(body) {
        return this.postOrderSearchWithHttpInfo(body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return OrderSearchApi;
  }();

  /**
   * Orders service.
   * @module api/OrdersApi
   * @version 17.8
   */

  var OrdersApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new OrdersApi.
     * @alias module:api/OrdersApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function OrdersApi(apiClient) {
      _classCallCheck(this, OrdersApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Removes an order note.
     * @param {String} orderNo the id of the order to be modified
     * @param {String} noteId the id of the note to be removed
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Order} and HTTP response
     */


    _createClass(OrdersApi, [{
      key: "deleteOrdersByIDNotesByIDWithHttpInfo",
      value: function deleteOrdersByIDNotesByIDWithHttpInfo(orderNo, noteId) {
        var postBody = null; // verify the required parameter 'orderNo' is set

        if (orderNo === undefined || orderNo === null) {
          throw new Error('Missing the required parameter \'orderNo\' when calling deleteOrdersByIDNotesByID');
        } // verify the required parameter 'noteId' is set


        if (noteId === undefined || noteId === null) {
          throw new Error('Missing the required parameter \'noteId\' when calling deleteOrdersByIDNotesByID');
        }

        var pathParams = {
          order_no: orderNo,
          note_id: noteId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Order;
        return this.apiClient.callApi('/orders/{order_no}/notes/{note_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Removes an order note.
       * @param {String} orderNo the id of the order to be modified
       * @param {String} noteId the id of the note to be removed
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Order}
       */

    }, {
      key: "deleteOrdersByIDNotesByID",
      value: function deleteOrdersByIDNotesByID(orderNo, noteId) {
        return this.deleteOrdersByIDNotesByIDWithHttpInfo(orderNo, noteId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Removes a payment instrument of an order.
       * @param {String} orderNo the order number
       * @param {String} paymentInstrumentId the id of the payment instrument to be updated
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Order} and HTTP response
       */

    }, {
      key: "deleteOrdersByIDPaymentInstrumentsByIDWithHttpInfo",
      value: function deleteOrdersByIDPaymentInstrumentsByIDWithHttpInfo(orderNo, paymentInstrumentId) {
        var postBody = null; // verify the required parameter 'orderNo' is set

        if (orderNo === undefined || orderNo === null) {
          throw new Error('Missing the required parameter \'orderNo\' when calling deleteOrdersByIDPaymentInstrumentsByID');
        } // verify the required parameter 'paymentInstrumentId' is set


        if (paymentInstrumentId === undefined || paymentInstrumentId === null) {
          throw new Error('Missing the required parameter \'paymentInstrumentId\' when calling deleteOrdersByIDPaymentInstrumentsByID');
        }

        var pathParams = {
          order_no: orderNo,
          payment_instrument_id: paymentInstrumentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Order;
        return this.apiClient.callApi('/orders/{order_no}/payment_instruments/{payment_instrument_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Removes a payment instrument of an order.
       * @param {String} orderNo the order number
       * @param {String} paymentInstrumentId the id of the payment instrument to be updated
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Order}
       */

    }, {
      key: "deleteOrdersByIDPaymentInstrumentsByID",
      value: function deleteOrdersByIDPaymentInstrumentsByID(orderNo, paymentInstrumentId) {
        return this.deleteOrdersByIDPaymentInstrumentsByIDWithHttpInfo(orderNo, paymentInstrumentId).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Gets information for an order.
       * @param {String} orderNo the order number
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Order} and HTTP response
       */

    }, {
      key: "getOrdersByIDWithHttpInfo",
      value: function getOrdersByIDWithHttpInfo(orderNo) {
        var postBody = null; // verify the required parameter 'orderNo' is set

        if (orderNo === undefined || orderNo === null) {
          throw new Error('Missing the required parameter \'orderNo\' when calling getOrdersByID');
        }

        var pathParams = {
          order_no: orderNo
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Order;
        return this.apiClient.callApi('/orders/{order_no}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Gets information for an order.
       * @param {String} orderNo the order number
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Order}
       */

    }, {
      key: "getOrdersByID",
      value: function getOrdersByID(orderNo) {
        return this.getOrdersByIDWithHttpInfo(orderNo).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Retrieves notes for an order.
       * @param {String} orderNo The id of the order from which you want to retrieve notes.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/NotesResult} and HTTP response
       */

    }, {
      key: "getOrdersByIDNotesWithHttpInfo",
      value: function getOrdersByIDNotesWithHttpInfo(orderNo) {
        var postBody = null; // verify the required parameter 'orderNo' is set

        if (orderNo === undefined || orderNo === null) {
          throw new Error('Missing the required parameter \'orderNo\' when calling getOrdersByIDNotes');
        }

        var pathParams = {
          order_no: orderNo
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = NotesResult;
        return this.apiClient.callApi('/orders/{order_no}/notes', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Retrieves notes for an order.
       * @param {String} orderNo The id of the order from which you want to retrieve notes.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/NotesResult}
       */

    }, {
      key: "getOrdersByIDNotes",
      value: function getOrdersByIDNotes(orderNo) {
        return this.getOrdersByIDNotesWithHttpInfo(orderNo).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Gets the applicable payment methods for an existing order considering the open payment amount only.
       * @param {String} orderNo the order number
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PaymentMethodResult} and HTTP response
       */

    }, {
      key: "getOrdersByIDPaymentMethodsWithHttpInfo",
      value: function getOrdersByIDPaymentMethodsWithHttpInfo(orderNo) {
        var postBody = null; // verify the required parameter 'orderNo' is set

        if (orderNo === undefined || orderNo === null) {
          throw new Error('Missing the required parameter \'orderNo\' when calling getOrdersByIDPaymentMethods');
        }

        var pathParams = {
          order_no: orderNo
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = PaymentMethodResult;
        return this.apiClient.callApi('/orders/{order_no}/payment_methods', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Gets the applicable payment methods for an existing order considering the open payment amount only.
       * @param {String} orderNo the order number
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PaymentMethodResult}
       */

    }, {
      key: "getOrdersByIDPaymentMethods",
      value: function getOrdersByIDPaymentMethods(orderNo) {
        return this.getOrdersByIDPaymentMethodsWithHttpInfo(orderNo).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Update an order.
       * Considered fields for update are status (same status transitions are possible as for dw.order.Order.setStatus(int  status)
       * plus CREATED to FAILED) and custom properties. During the call the correct channel type will be assured to be set for the order  in a
       * successful call. Without agent context the channel type will be storefront otherwise callcenter.
       * @param {String} orderNo the order number
       * @param {module:models/Order} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Order} and HTTP response
       */

    }, {
      key: "patchOrdersByIDWithHttpInfo",
      value: function patchOrdersByIDWithHttpInfo(orderNo, body) {
        var postBody = body; // verify the required parameter 'orderNo' is set

        if (orderNo === undefined || orderNo === null) {
          throw new Error('Missing the required parameter \'orderNo\' when calling patchOrdersByID');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchOrdersByID');
        }

        var pathParams = {
          order_no: orderNo
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Order;
        return this.apiClient.callApi('/orders/{order_no}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Update an order.
       * Considered fields for update are status (same status transitions are possible as for
       * dw.order.Order.setStatus(int  status) plus CREATED to FAILED) and custom properties. During
       * the call the correct channel type will be assured to be set for the order  in a successful call.
       * Without agent context the channel type will be storefront otherwise callcenter.
       * @param {String} orderNo the order number
       * @param {module:models/Order} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Order}
       */

    }, {
      key: "patchOrdersByID",
      value: function patchOrdersByID(orderNo, body) {
        return this.patchOrdersByIDWithHttpInfo(orderNo, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Updates a payment instrument of an order and passes the order and updated payment instrument to the correct  payment authorizeCreditcard or authorize hook.
       * Details:
       * The payment instrument is updated with the provided details. The payment method must be applicable for the
       * order see GET /baskets/{basket_id}/payment_methods, if the payment method is &#39;CREDIT_CARD&#39; a
       * payment_card must be specified in the request.
       * Order authorization:
       * To authorize the order one of two possible customization hooks is called and an  dw.order.OrderPaymentInstrument
       * is passed as an input argument.
       * Which hook is called?
       * If the request includes a payment_card or the dw.order.OrderPaymentInstrument  contains a creditCardType
       * the customization hook dw.order.payment.authorizeCreditCard is called.
       * See dw.order.hooks.PaymentHooks.authorizeCreditCard(order : Order, paymentDetails : OrderPaymentInstrument, cvn : String) : Status.  Otherwise dw.order.payment.authorize is called.
       * See dw.order.hooks.PaymentHooks.authorize(order : Order, paymentDetails : OrderPaymentInstrument) : Status.
       * What is the dw.order.OrderPaymentInstrument input argument passed to the hook?
       * If the request contains a customer_payment_instrument_id the  dw.order.OrderPaymentInstrument is copied from the customer payment
       * instrument (An exception is thrown  if none was found).  Otherwise the data from the request document
       * is passed (payment_card or  payment_bank_account etc. information).
       * Note: the amount and the security_code (cvn) contained in the  payment_card data will be propagated if available
       * to  dw.order.payment.authorizeCreditCard even if the dw.order.OrderPaymentInstrument is
       * resolved from a customer payment instrument.
       * Customization hook dw.ocapi.shop.order.afterPatchPaymentInstrument is called. The default
       * implementation places the order if the order status is CREATED and the authorization amount equals or exceeds the  order total.
       * Placing the order (equivalent to calling dw.order.OrderMgr.placeOrder(order : Order)
       * in the scripting API) results in the order being changed to status NEW and prepared for export.
       * @param {String} orderNo the order number
       * @param {String} paymentInstrumentId the id of the payment instrument to be updated
       * @param {module:models/OrderPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Order} and HTTP response
       */

    }, {
      key: "patchOrdersByIDPaymentInstrumentsByIDWithHttpInfo",
      value: function patchOrdersByIDPaymentInstrumentsByIDWithHttpInfo(orderNo, paymentInstrumentId, body) {
        var postBody = body; // verify the required parameter 'orderNo' is set

        if (orderNo === undefined || orderNo === null) {
          throw new Error('Missing the required parameter \'orderNo\' when calling patchOrdersByIDPaymentInstrumentsByID');
        } // verify the required parameter 'paymentInstrumentId' is set


        if (paymentInstrumentId === undefined || paymentInstrumentId === null) {
          throw new Error('Missing the required parameter \'paymentInstrumentId\' when calling patchOrdersByIDPaymentInstrumentsByID');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling patchOrdersByIDPaymentInstrumentsByID');
        }

        var pathParams = {
          order_no: orderNo,
          payment_instrument_id: paymentInstrumentId
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Order;
        return this.apiClient.callApi('/orders/{order_no}/payment_instruments/{payment_instrument_id}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Updates a payment instrument of an order and passes the order and updated payment instrument to the correct  payment authorizeCreditcard or authorize hook.
       * Details:
       * The payment instrument is updated with the provided details. The payment method must be applicable
       * for the  order see GET /baskets/{basket_id}/payment_methods, if the payment method is &#39;CREDIT_CARD&#39; a
       * payment_card must be specified in the request.
       * Order authorization:
       * To authorize the order one of two possible customization hooks is called and an  dw.order.OrderPaymentInstrument
       * is passed as an input argument.
       * Which hook is called?
       * If the request includes a payment_card or the dw.order.OrderPaymentInstrument  contains a creditCardType the
       * customization hook dw.order.payment.authorizeCreditCard is called.
       * See dw.order.hooks.PaymentHooks.authorizeCreditCard(order : Order, paymentDetails : OrderPaymentInstrument, cvn : String) : Status.
       * Otherwise dw.order.payment.authorize is called.
       * See dw.order.hooks.PaymentHooks.authorize(order : Order, paymentDetails : OrderPaymentInstrument) : Status.
       * What is the dw.order.OrderPaymentInstrument input argument passed to the hook?
       * If the request contains a customer_payment_instrument_id the  dw.order.OrderPaymentInstrument is copied
       * from the customer payment instrument (An exception is thrown  if none was found).
       * Otherwise the data from the request document is passed (payment_card or  payment_bank_account etc. information).
       * Note: the amount and the security_code (cvn) contained in the  payment_card data will be propagated if
       * available to  dw.order.payment.authorizeCreditCard even if the dw.order.OrderPaymentInstrument is  resolved
       * from a customer payment instrument.
       * Customization hook dw.ocapi.shop.order.afterPatchPaymentInstrument is called. The default
       * implementation places the order if the order status is CREATED and the authorization amount equals or
       * exceeds the  order total. Placing the order (equivalent to calling dw.order.OrderMgr.placeOrder(order : Order)  in the scripting API) results in
       * the order being changed to status NEW and prepared for export.
       * @param {String} orderNo the order number
       * @param {String} paymentInstrumentId the id of the payment instrument to be updated
       * @param {module:models/OrderPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Order}
       */

    }, {
      key: "patchOrdersByIDPaymentInstrumentsByID",
      value: function patchOrdersByIDPaymentInstrumentsByID(orderNo, paymentInstrumentId, body) {
        return this.patchOrdersByIDPaymentInstrumentsByIDWithHttpInfo(orderNo, paymentInstrumentId, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Submits an order based on a prepared basket.
       * Note: If the basket has been submitted  using Order Center (considered by it&#39;s client id) the channel
       * type will  be set to \&quot;Call Center\&quot;. In case another channel type was set by a script
       * before submitting the basket, the channel type will be reset to  \&quot;Call Center\&quot; and a warning
       * will be logged.  The only considered value from the request body is basket_id.
       * @param {module:models/Basket} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Order} and HTTP response
       */

    }, {
      key: "postOrdersWithHttpInfo",
      value: function postOrdersWithHttpInfo(body) {
        var postBody = body; // verify the required parameter 'body' is set

        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postOrders');
        }

        var pathParams = {};
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Order;
        return this.apiClient.callApi('/orders', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Submits an order based on a prepared basket.
       * Note: If the basket has been submitted  using Order Center (considered by it&#39;s client id) the
       * channel type will  be set to \&quot;Call Center\&quot;. In case another channel type was set by
       * a script  before submitting the basket, the channel type will be reset to  \&quot;Call Center\&quot;
       * and a warning will be logged.  The only considered value from the request body is basket_id.
       * @param {module:models/Basket} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Order}
       */

    }, {
      key: "postOrders",
      value: function postOrders(body) {
        return this.postOrdersWithHttpInfo(body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Adds a note to an existing order.
       * @param {String} orderNo The id of the order to be modified.
       * @param {module:models/Note} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Order} and HTTP response
       */

    }, {
      key: "postOrdersByIDNotesWithHttpInfo",
      value: function postOrdersByIDNotesWithHttpInfo(orderNo, body) {
        var postBody = body; // verify the required parameter 'orderNo' is set

        if (orderNo === undefined || orderNo === null) {
          throw new Error('Missing the required parameter \'orderNo\' when calling postOrdersByIDNotes');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postOrdersByIDNotes');
        }

        var pathParams = {
          order_no: orderNo
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Order;
        return this.apiClient.callApi('/orders/{order_no}/notes', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Adds a note to an existing order.
       * @param {String} orderNo The id of the order to be modified.
       * @param {module:models/Note} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Order}
       */

    }, {
      key: "postOrdersByIDNotes",
      value: function postOrdersByIDNotes(orderNo, body) {
        return this.postOrdersByIDNotesWithHttpInfo(orderNo, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Adds a payment instrument to an order. It is possible either to supply the full payment information
       * or only a  customer payment instrument id and amount. In case the customer payment instrument
       * id was set all the other  properties (except amount) are ignored and the payment data is
       * resolved from the stored customer payment  information. An attempt is made to authorize the order
       * by passing it to the authorize or authorizeCreditCard  hook.
       * Details:
       * The payment instrument is added with the provided details or the details from the customer payment
       * instrument. The payment method must be applicable for the order see GET  /baskets/{basket_id}/payment_methods, if the
       * payment method is &#39;CREDIT_CARD&#39; a  payment_card must be specified in the request.
       * Order authorization:
       * To authorize the order one of two possible customization hooks is called and an
       * dw.order.OrderPaymentInstrument is passed as an input argument.
       * Which hook is called?
       * If the request includes a payment_card or the dw.order.OrderPaymentInstrument
       * contains a creditCardType the customization hook dw.order.payment.authorizeCreditCard is called.
       * See dw.order.hooks.PaymentHooks.authorizeCreditCard(order : Order, paymentDetails : OrderPaymentInstrument, cvn : String) : Status.
       * Otherwise dw.order.payment.authorize is called. See dw.order.hooks.PaymentHooks.authorize(order : Order, paymentDetails : OrderPaymentInstrument) : Status.
       * What is the dw.order.OrderPaymentInstrument input argument passed to the hook?
       * If the request contains a customer_payment_instrument_id the  dw.order.OrderPaymentInstrument is copied from the customer
       * payment instrument (An exception is thrown  if none was found).
       * Otherwise the data from the request document is passed (payment_card or  payment_bank_account etc. information).
       * Note: the amount and the security_code (cvn) contained in the  payment_card data will be propagated if available to
       * dw.order.payment.authorizeCreditCard even if the dw.order.OrderPaymentInstrument is
       * resolved from a customer payment instrument.
       * Customization hook dw.ocapi.shop.order.afterPostPaymentInstrument is called. The default
       * implementation places the order if the order status is CREATED and the authorization amount equals or exceeds the  order total.
       * Placing the order (equivalent to calling dw.order.OrderMgr.placeOrder(order : Order) in the  scripting API) results
       * in the order being changed to status NEW and prepared for export.
       * @param {String} orderNo the order number
       * @param {module:models/OrderPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Order} and HTTP response
       */

    }, {
      key: "postOrdersByIDPaymentInstrumentsWithHttpInfo",
      value: function postOrdersByIDPaymentInstrumentsWithHttpInfo(orderNo, body) {
        var postBody = body; // verify the required parameter 'orderNo' is set

        if (orderNo === undefined || orderNo === null) {
          throw new Error('Missing the required parameter \'orderNo\' when calling postOrdersByIDPaymentInstruments');
        } // verify the required parameter 'body' is set


        if (body === undefined || body === null) {
          throw new Error('Missing the required parameter \'body\' when calling postOrdersByIDPaymentInstruments');
        }

        var pathParams = {
          order_no: orderNo
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Order;
        return this.apiClient.callApi('/orders/{order_no}/payment_instruments', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Adds a payment instrument to an order. It is possible either to supply the full payment information
       * or only a  customer payment instrument id and amount. In case the customer payment instrument id
       * was set all the other  properties (except amount) are ignored and the payment data is resolved
       * from the stored customer payment  information. An attempt is made to authorize the order by passing
       * it to the authorize or authorizeCreditCard  hook.
       * Details:
       * The payment instrument is added with the provided details or the details from the customer payment
       * instrument. The payment method must be applicable for the order see GET  /baskets/{basket_id}/payment_methods, if the
       * payment method is &#39;CREDIT_CARD&#39; a  payment_card must be specified in the request.
       * Order authorization:
       * To authorize the order one of two possible customization hooks is called and an
       * dw.order.OrderPaymentInstrument is passed as an input argument.
       * Which hook is called?
       * If the request includes a payment_card or the dw.order.OrderPaymentInstrument
       * contains a creditCardType the customization hook dw.order.payment.authorizeCreditCard is called.
       * See dw.order.hooks.PaymentHooks.authorizeCreditCard(order : Order, paymentDetails : OrderPaymentInstrument, cvn : String) : Status.
       * Otherwise dw.order.payment.authorize is called. See dw.order.hooks.PaymentHooks.authorize(order : Order, paymentDetails : OrderPaymentInstrument) : Status.
       * What is the dw.order.OrderPaymentInstrument input argument passed to the hook?
       * If the request contains a customer_payment_instrument_id the  dw.order.OrderPaymentInstrument is copied from
       * the customer payment instrument (An exception is thrown  if none was found).  Otherwise the data from the request
       * document is passed (payment_card or  payment_bank_account etc. information).
       * Note: the amount and the security_code (cvn) contained in the  payment_card data will be
       * propagated if available to  dw.order.payment.authorizeCreditCard even if the
       * dw.order.OrderPaymentInstrument is  resolved from a customer payment instrument.
       * Customization hook dw.ocapi.shop.order.afterPostPaymentInstrument is called. The default
       * implementation places the order if the order status is CREATED and the authorization amount
       * equals or exceeds the  order total. Placing the order (equivalent to calling dw.order.OrderMgr.placeOrder(order : Order) in the  scripting API)
       * results in the order being changed to status NEW and prepared for export.
       * @param {String} orderNo the order number
       * @param {module:models/OrderPaymentInstrumentRequest} body
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Order}
       */

    }, {
      key: "postOrdersByIDPaymentInstruments",
      value: function postOrdersByIDPaymentInstruments(orderNo, body) {
        return this.postOrdersByIDPaymentInstrumentsWithHttpInfo(orderNo, body).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return OrdersApi;
  }();

  /**
   * Price_adjustment_limits service.
   * @module api/PriceAdjustmentLimitsApi
   * @version 17.8
   */

  var PriceAdjustmentLimitsApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new PriceAdjustmentLimitsApi.
     * @alias module:api/PriceAdjustmentLimitsApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function PriceAdjustmentLimitsApi(apiClient) {
      _classCallCheck(this, PriceAdjustmentLimitsApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Returns a list of price adjustment limits for the authenticated user and the site defined in the URL.
     * At least one of the following functional permissions must be assigned to the user to be able to access it:
     * Adjust_Item_Price or Adjust_Shipping_Price or Adjust_Order_Price.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PriceAdjustmentLimits} and HTTP response
     */


    _createClass(PriceAdjustmentLimitsApi, [{
      key: "getPriceAdjustmentLimitsWithHttpInfo",
      value: function getPriceAdjustmentLimitsWithHttpInfo() {
        var postBody = null;
        var pathParams = {};
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = PriceAdjustmentLimits;
        return this.apiClient.callApi('/price_adjustment_limits', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Returns a list of price adjustment limits for the authenticated user and the site defined in the URL.
       * At least one of the following functional permissions must be assigned to the user to be able to access it:
       * Adjust_Item_Price or Adjust_Shipping_Price or Adjust_Order_Price.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PriceAdjustmentLimits}
       */

    }, {
      key: "getPriceAdjustmentLimits",
      value: function getPriceAdjustmentLimits() {
        return this.getPriceAdjustmentLimitsWithHttpInfo().then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return PriceAdjustmentLimitsApi;
  }();

  /**
   * Product_lists service.
   * @module api/ProductListsApi
   * @version 17.8
   */

  var ProductListsApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new ProductListsApi.
     * @alias module:api/ProductListsApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function ProductListsApi(apiClient) {
      _classCallCheck(this, ProductListsApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Retrieves all public product lists as defined by the given search term (email, first name, last name).
     * @param {Object} opts Optional parameters
     * @param {String} opts.email The email address of the customer, the product lists belong to.
     * @param {String} opts.firstname The first name of the customer, the product lists belong to.
     * @param {String} opts.lastname The last name of the customer, the product lists belong to.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PublicProductListResult} and HTTP response
     */


    _createClass(ProductListsApi, [{
      key: "getProductListsWithHttpInfo",
      value: function getProductListsWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = null;
        var pathParams = {};
        var queryParams = {
          email: opts.email,
          firstname: opts.firstname,
          lastname: opts.lastname
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = PublicProductListResult;
        return this.apiClient.callApi('/product_lists', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Retrieves all public product lists as defined by the given search term (email, first name, last name).
       * @param {Object} opts Optional parameters
       * @param {String} opts.email The email address of the customer, the product lists belong to.
       * @param {String} opts.firstname The first name of the customer, the product lists belong to.
       * @param {String} opts.lastname The last name of the customer, the product lists belong to.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PublicProductListResult}
       */

    }, {
      key: "getProductLists",
      value: function getProductLists(opts) {
        return this.getProductListsWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Retrieves a public product list by id.
       * @param {String} listId The id of the list.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PublicProductList} and HTTP response
       */

    }, {
      key: "getProductListsByIDWithHttpInfo",
      value: function getProductListsByIDWithHttpInfo(listId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'listId' is set

        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling getProductListsByID');
        }

        var pathParams = {
          list_id: listId
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv')
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = PublicProductList;
        return this.apiClient.callApi('/product_lists/{list_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Retrieves a public product list by id.
       * @param {String} listId The id of the list.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PublicProductList}
       */

    }, {
      key: "getProductListsByID",
      value: function getProductListsByID(listId, opts) {
        return this.getProductListsByIDWithHttpInfo(listId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Retrieves the items of a public product list.
       * @param {String} listId The id of the list.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PublicProductListItemResult} and HTTP response
       */

    }, {
      key: "getProductListsByIDItemsWithHttpInfo",
      value: function getProductListsByIDItemsWithHttpInfo(listId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'listId' is set

        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling getProductListsByIDItems');
        }

        var pathParams = {
          list_id: listId
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv')
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = PublicProductListItemResult;
        return this.apiClient.callApi('/product_lists/{list_id}/items', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Retrieves the items of a public product list.
       * @param {String} listId The id of the list.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PublicProductListItemResult}
       */

    }, {
      key: "getProductListsByIDItems",
      value: function getProductListsByIDItems(listId, opts) {
        return this.getProductListsByIDItemsWithHttpInfo(listId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Retrieves an item from a public product list.
       * @param {String} listId The id of the list.
       * @param {String} itemId The id of the item.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PublicProductListItem} and HTTP response
       */

    }, {
      key: "getProductListsByIDItemsByIDWithHttpInfo",
      value: function getProductListsByIDItemsByIDWithHttpInfo(listId, itemId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'listId' is set

        if (listId === undefined || listId === null) {
          throw new Error('Missing the required parameter \'listId\' when calling getProductListsByIDItemsByID');
        } // verify the required parameter 'itemId' is set


        if (itemId === undefined || itemId === null) {
          throw new Error('Missing the required parameter \'itemId\' when calling getProductListsByIDItemsByID');
        }

        var pathParams = {
          list_id: listId,
          item_id: itemId
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv')
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = PublicProductListItem;
        return this.apiClient.callApi('/product_lists/{list_id}/items/{item_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Retrieves an item from a public product list.
       * @param {String} listId The id of the list.
       * @param {String} itemId The id of the item.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PublicProductListItem}
       */

    }, {
      key: "getProductListsByIDItemsByID",
      value: function getProductListsByIDItemsByID(listId, itemId, opts) {
        return this.getProductListsByIDItemsByIDWithHttpInfo(listId, itemId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return ProductListsApi;
  }();

  /**
   * Product_search service.
   * @module api/ProductSearchApi
   * @version 17.8
   */

  var ProductSearchApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new ProductSearchApi.
     * @alias module:api/ProductSearchApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function ProductSearchApi(apiClient) {
      _classCallCheck(this, ProductSearchApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Provides keyword and refinement search functionality for products. Only returns the product id,
     * link and name in  the product search hit. Other search hit properties can be added by using
     * the expand parameter. The search result  contains only products that are online and assigned to site catalog.
     * @param {Object} opts Optional parameters
     * @param {String} opts.q The query phrase to search for.
     * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
     * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
     * can be provided by separating them using a pipe (URL
     * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
     * parameters can be provided by adding an underscore in combination with an integer counter right behind
     * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
     * following system refinement attribute ids are supported:
     * cgid: Allows to refine per single category id. Multiple category ids are not supported.
     * price: Allows to refine per single price range. Multiple price ranges are not supported.
     * pmid: Allows to refine per promotion id(s).
     * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple             refinement values are not supported.
     * @param {String} opts.sort The id of the sorting option to sort the search hits.
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @param {Array.<String>} opts.expand The expand parameter. A comma separated list with the allowed values (availability, images,             prices, variations)
     * @param {String} opts.currency The currency mnemonic specified for price. This parameter is effective only if specified expand parameter value contains prices.
     * @param {String} opts.locale The locale context.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ProductSearchResult} and HTTP response
     */


    _createClass(ProductSearchApi, [{
      key: "getProductSearchWithHttpInfo",
      value: function getProductSearchWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = null;
        var pathParams = {};
        var queryParams = {
          q: opts.q,
          refine: this.apiClient.buildCollectionParam(opts.refine, 'csv'),
          sort: opts.sort,
          start: opts.start,
          count: opts.count,
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv'),
          currency: opts.currency,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ProductSearchResult;
        return this.apiClient.callApi('/product_search', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Provides keyword and refinement search functionality for products. Only returns the
       * product id, link and name in  the product search hit. Other search hit properties can be
       * added by using the expand parameter. The search result  contains only products that are online
       * and assigned to site catalog.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
       * following system refinement attribute ids are supported:
       * cgid: Allows to refine per single category id. Multiple category ids are not supported.
       * price: Allows to refine per single price range. Multiple price ranges are not supported.
       * pmid: Allows to refine per promotion id(s).
       * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple
       * refinement values are not supported.
       * @param {String} opts.sort The id of the sorting option to sort the search hits.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {Array.<String>} opts.expand The expand parameter. A comma separated list with the allowed values (availability, images,
       * prices, variations)
       * @param {String} opts.currency The currency mnemonic specified for price. This parameter is effective only if specified expand parameter value contains prices.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ProductSearchResult}
       */

    }, {
      key: "getProductSearch",
      value: function getProductSearch(opts) {
        return this.getProductSearchWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Provides keyword and refinement search functionality for products. Only returns the product id,
       * link, name and  availability information in the product search hit.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
       * following system refinement attribute ids are supported:
       * cgid: Allows to refine per single category id. Multiple category ids are not supported.
       * price: Allows to refine per single price range. Multiple price ranges are not supported.
       * pmid: Allows to refine per promotion id(s).
       * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple
       * refinement values are not supported.
       * @param {String} opts.sort The id of the sorting option to sort the search hits.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ProductSearchResult} and HTTP response
       */

    }, {
      key: "getProductSearchAvailabilityWithHttpInfo",
      value: function getProductSearchAvailabilityWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = null;
        var pathParams = {};
        var queryParams = {
          q: opts.q,
          refine: this.apiClient.buildCollectionParam(opts.refine, 'csv'),
          sort: opts.sort,
          start: opts.start,
          count: opts.count,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ProductSearchResult;
        return this.apiClient.callApi('/product_search/availability', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Provides keyword and refinement search functionality for products. Only returns the
       * product id, link, name and  availability information in the product search hit.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
       * following system refinement attribute ids are supported:
       * cgid: Allows to refine per single category id. Multiple category ids are not supported.
       * price: Allows to refine per single price range. Multiple price ranges are not supported.
       * pmid: Allows to refine per promotion id(s).
       * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple
       * refinement values are not supported.
       * @param {String} opts.sort The id of the sorting option to sort the search hits.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ProductSearchResult}
       */

    }, {
      key: "getProductSearchAvailability",
      value: function getProductSearchAvailability(opts) {
        return this.getProductSearchAvailabilityWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Provides keyword and refinement search functionality for products. Only returns the
       * product id, link, name and  image information in the product search hit.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
       * following system refinement attribute ids are supported:
       * cgid: Allows to refine per single category id. Multiple category ids are not supported.
       * price: Allows to refine per single price range. Multiple price ranges are not supported.
       * pmid: Allows to refine per promotion id(s).
       * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple
       * refinement values are not supported.
       * @param {String} opts.sort The id of the sorting option to sort the search hits.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ProductSearchResult} and HTTP response
       */

    }, {
      key: "getProductSearchImagesWithHttpInfo",
      value: function getProductSearchImagesWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = null;
        var pathParams = {};
        var queryParams = {
          q: opts.q,
          refine: this.apiClient.buildCollectionParam(opts.refine, 'csv'),
          sort: opts.sort,
          start: opts.start,
          count: opts.count,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ProductSearchResult;
        return this.apiClient.callApi('/product_search/images', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Provides keyword and refinement search functionality for products. Only returns the
       * product id, link, name and  image information in the product search hit.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
       * following system refinement attribute ids are supported:
       * cgid: Allows to refine per single category id. Multiple category ids are not supported.
       * price: Allows to refine per single price range. Multiple price ranges are not supported.
       * pmid: Allows to refine per promotion id(s).
       * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple
       * refinement values are not supported.
       * @param {String} opts.sort The id of the sorting option to sort the search hits.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ProductSearchResult}
       */

    }, {
      key: "getProductSearchImages",
      value: function getProductSearchImages(opts) {
        return this.getProductSearchImagesWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Provides keyword and refinement search functionality for products. Only returns the
       * product id, link, name and  price information in the product search hit.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
       * following system refinement attribute ids are supported:
       * cgid: Allows to refine per single category id. Multiple category ids are not supported.
       * price: Allows to refine per single price range. Multiple price ranges are not supported.
       * pmid: Allows to refine per promotion id(s).
       * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple
       * refinement values are not supported.
       * @param {String} opts.sort The id of the sorting option to sort the search hits.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {String} opts.currency The currency mnemonic specified for price.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ProductSearchResult} and HTTP response
       */

    }, {
      key: "getProductSearchPricesWithHttpInfo",
      value: function getProductSearchPricesWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = null;
        var pathParams = {};
        var queryParams = {
          q: opts.q,
          refine: this.apiClient.buildCollectionParam(opts.refine, 'csv'),
          sort: opts.sort,
          start: opts.start,
          count: opts.count,
          currency: opts.currency,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ProductSearchResult;
        return this.apiClient.callApi('/product_search/prices', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Provides keyword and refinement search functionality for products. Only returns the product id, link, name and  price information in the product search hit.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
       * following system refinement attribute ids are supported:
       * cgid: Allows to refine per single category id. Multiple category ids are not supported.
       * price: Allows to refine per single price range. Multiple price ranges are not supported.
       * pmid: Allows to refine per promotion id(s).
       * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple
       * refinement values are not supported.
       * @param {String} opts.sort The id of the sorting option to sort the search hits.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {String} opts.currency The currency mnemonic specified for price.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ProductSearchResult}
       */

    }, {
      key: "getProductSearchPrices",
      value: function getProductSearchPrices(opts) {
        return this.getProductSearchPricesWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Provides keyword and refinement search functionality for products. Only returns the product id, name and  variation information in the product search hit.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
       * following system refinement attribute ids are supported:
       * cgid: Allows to refine per single category id. Multiple category ids are not supported.
       * price: Allows to refine per single price range. Multiple price ranges are not supported.
       * pmid: Allows to refine per promotion id(s).
       * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple
       * refinement values are not supported.
       * @param {String} opts.sort The id of the sorting option to sort the search hits.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ProductSearchResult} and HTTP response
       */

    }, {
      key: "getProductSearchVariationsWithHttpInfo",
      value: function getProductSearchVariationsWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = null;
        var pathParams = {};
        var queryParams = {
          q: opts.q,
          refine: this.apiClient.buildCollectionParam(opts.refine, 'csv'),
          sort: opts.sort,
          start: opts.start,
          count: opts.count,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ProductSearchResult;
        return this.apiClient.callApi('/product_search/variations', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Provides keyword and refinement search functionality for products. Only returns the product id, name and  variation information in the product search hit.
       * @param {Object} opts Optional parameters
       * @param {String} opts.q The query phrase to search for.
       * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and
       * value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and
       * can be provided by separating them using a pipe (URL
       * encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine
       * parameters can be provided by adding an underscore in combination with an integer counter right behind
       * the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The
       * following system refinement attribute ids are supported:
       * cgid: Allows to refine per single category id. Multiple category ids are not supported.
       * price: Allows to refine per single price range. Multiple price ranges are not supported.
       * pmid: Allows to refine per promotion id(s).
       * orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple
       * refinement values are not supported.
       * @param {String} opts.sort The id of the sorting option to sort the search hits.
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @param {String} opts.locale The locale context.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ProductSearchResult}
       */

    }, {
      key: "getProductSearchVariations",
      value: function getProductSearchVariations(opts) {
        return this.getProductSearchVariationsWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return ProductSearchApi;
  }();

  /**
   * Products service.
   * @module api/ProductsApi
   * @version 17.8
   */

  var ProductsApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new ProductsApi.
     * @alias module:api/ProductsApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function ProductsApi(apiClient) {
      _classCallCheck(this, ProductsApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * To access single products resource, you construct a URL using the template shown below.
     * This template requires  you to specify an Id (typically a SKU) for a product. In response, the
     * server returns a corresponding Product  document, provided the product is online and assigned
     * to site catalog. The document contains variation attributes  (including values) and the variant
     * matrix; this data is provided for both the master and for the variant.
     * @param {String} id The id of the requested product.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand
     * @param {Array.<String>} opts.inventoryIds
     * @param {String} opts.currency
     * @param {String} opts.locale
     * @param {Boolean} opts.allImages
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Product} and HTTP response
     */


    _createClass(ProductsApi, [{
      key: "getProductsByIDWithHttpInfo",
      value: function getProductsByIDWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByID');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv'),
          inventory_ids: this.apiClient.buildCollectionParam(opts.inventoryIds, 'csv'),
          currency: opts.currency,
          locale: opts.locale,
          all_images: opts.allImages
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Product;
        return this.apiClient.callApi('/products/{id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * To access single products resource, you construct a URL using the template shown below.
       * This template requires  you to specify an Id (typically a SKU) for a product. In response,
       * the server returns a corresponding Product  document, provided the product is online and
       * assigned to site catalog. The document contains variation attributes  (including values)
       * and the variant matrix; this data is provided for both the master and for the variant.
       * @param {String} id The id of the requested product.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @param {Array.<String>} opts.inventoryIds
       * @param {String} opts.currency
       * @param {String} opts.locale
       * @param {Boolean} opts.allImages
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Product}
       */

    }, {
      key: "getProductsByID",
      value: function getProductsByID(id, opts) {
        return this.getProductsByIDWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Access product availability information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.inventoryIds
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Product} and HTTP response
       */

    }, {
      key: "getProductsByIDAvailabilityWithHttpInfo",
      value: function getProductsByIDAvailabilityWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByIDAvailability');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          inventory_ids: this.apiClient.buildCollectionParam(opts.inventoryIds, 'csv'),
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Product;
        return this.apiClient.callApi('/products/{id}/availability', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Access product availability information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.inventoryIds
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Product}
       */

    }, {
      key: "getProductsByIDAvailability",
      value: function getProductsByIDAvailability(id, opts) {
        return this.getProductsByIDAvailabilityWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Access bundled product information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Product} and HTTP response
       */

    }, {
      key: "getProductsByIDBundledProductsWithHttpInfo",
      value: function getProductsByIDBundledProductsWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByIDBundledProducts');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Product;
        return this.apiClient.callApi('/products/{id}/bundled_products', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Access bundled product information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Product}
       */

    }, {
      key: "getProductsByIDBundledProducts",
      value: function getProductsByIDBundledProducts(id, opts) {
        return this.getProductsByIDBundledProductsWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Access product image information of products that are online and assigned to site catalog. Filter the result by  view type and variation values.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.viewType
       * @param {Boolean} opts.allImages
       * @param {String} opts.variationAttribute
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Product} and HTTP response
       */

    }, {
      key: "getProductsByIDImagesWithHttpInfo",
      value: function getProductsByIDImagesWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByIDImages');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          view_type: this.apiClient.buildCollectionParam(opts.viewType, 'csv'),
          all_images: opts.allImages,
          variation_attribute: opts.variationAttribute,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Product;
        return this.apiClient.callApi('/products/{id}/images', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Access product image information of products that are online and assigned to site catalog. Filter the result by  view type and variation values.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.viewType
       * @param {Boolean} opts.allImages
       * @param {String} opts.variationAttribute
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Product}
       */

    }, {
      key: "getProductsByIDImages",
      value: function getProductsByIDImages(id, opts) {
        return this.getProductsByIDImagesWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Access product link information of products that are online and assigned to site catalog. Filter the result by  link type and link direction.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.type
       * @param {String} opts.direction
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Product} and HTTP response
       */

    }, {
      key: "getProductsByIDLinksWithHttpInfo",
      value: function getProductsByIDLinksWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByIDLinks');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          type: opts.type,
          direction: opts.direction,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Product;
        return this.apiClient.callApi('/products/{id}/links', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Access product link information of products that are online and assigned to site catalog. Filter the result by  link type and link direction.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.type
       * @param {String} opts.direction
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Product}
       */

    }, {
      key: "getProductsByIDLinks",
      value: function getProductsByIDLinks(id, opts) {
        return this.getProductsByIDLinksWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Access product option information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Product} and HTTP response
       */

    }, {
      key: "getProductsByIDOptionsWithHttpInfo",
      value: function getProductsByIDOptionsWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByIDOptions');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Product;
        return this.apiClient.callApi('/products/{id}/options', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Access product option information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Product}
       */

    }, {
      key: "getProductsByIDOptions",
      value: function getProductsByIDOptions(id, opts) {
        return this.getProductsByIDOptionsWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Access product price information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Product} and HTTP response
       */

    }, {
      key: "getProductsByIDPricesWithHttpInfo",
      value: function getProductsByIDPricesWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByIDPrices');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Product;
        return this.apiClient.callApi('/products/{id}/prices', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Access product price information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Product}
       */

    }, {
      key: "getProductsByIDPrices",
      value: function getProductsByIDPrices(id, opts) {
        return this.getProductsByIDPricesWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Access product promotion information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.currency
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Product} and HTTP response
       */

    }, {
      key: "getProductsByIDPromotionsWithHttpInfo",
      value: function getProductsByIDPromotionsWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByIDPromotions');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          currency: opts.currency,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Product;
        return this.apiClient.callApi('/products/{id}/promotions', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Access product promotion information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.currency
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Product}
       */

    }, {
      key: "getProductsByIDPromotions",
      value: function getProductsByIDPromotions(id, opts) {
        return this.getProductsByIDPromotionsWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Retrieves the applicable shipping methods for a certain product.
       * @param {String} id the requested product id
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ShippingMethodResult} and HTTP response
       */

    }, {
      key: "getProductsByIDShippingMethodsWithHttpInfo",
      value: function getProductsByIDShippingMethodsWithHttpInfo(id) {
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByIDShippingMethods');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth', 'oauth2_application'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ShippingMethodResult;
        return this.apiClient.callApi('/products/{id}/shipping_methods', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Retrieves the applicable shipping methods for a certain product.
       * @param {String} id the requested product id
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ShippingMethodResult}
       */

    }, {
      key: "getProductsByIDShippingMethods",
      value: function getProductsByIDShippingMethods(id) {
        return this.getProductsByIDShippingMethodsWithHttpInfo(id).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Access product variation information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Product} and HTTP response
       */

    }, {
      key: "getProductsByIDVariationsWithHttpInfo",
      value: function getProductsByIDVariationsWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getProductsByIDVariations');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Product;
        return this.apiClient.callApi('/products/{id}/variations', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Access product variation information of products that are online and assigned to site catalog.
       * @param {String} id The requested product id.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Product}
       */

    }, {
      key: "getProductsByIDVariations",
      value: function getProductsByIDVariations(id, opts) {
        return this.getProductsByIDVariationsWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @param {Array.<String>} opts.inventoryIds
       * @param {String} opts.currency
       * @param {String} opts.locale
       * @param {Boolean} opts.allImages
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/ProductResult} and HTTP response
       */

    }, {
      key: "getProductsByIDsWithHttpInfo",
      value: function getProductsByIDsWithHttpInfo(ids, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'ids' is set

        if (ids === undefined || ids === null) {
          throw new Error('Missing the required parameter \'ids\' when calling getProductsByIDs');
        }

        var pathParams = {
          ids: ids
        };
        var queryParams = {
          expand: this.apiClient.buildCollectionParam(opts.expand, 'csv'),
          inventory_ids: this.apiClient.buildCollectionParam(opts.inventoryIds, 'csv'),
          currency: opts.currency,
          locale: opts.locale,
          all_images: opts.allImages
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = ProductResult;
        return this.apiClient.callApi('/products/({ids})', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {Array.<String>} opts.expand
       * @param {Array.<String>} opts.inventoryIds
       * @param {String} opts.currency
       * @param {String} opts.locale
       * @param {Boolean} opts.allImages
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/ProductResult}
       */

    }, {
      key: "getProductsByIDs",
      value: function getProductsByIDs(ids, opts) {
        return this.getProductsByIDsWithHttpInfo(ids, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return ProductsApi;
  }();

  /**
   * Promotions service.
   * @module api/PromotionsApi
   * @version 17.8
   */

  var PromotionsApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new PromotionsApi.
     * @alias module:api/PromotionsApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function PromotionsApi(apiClient) {
      _classCallCheck(this, PromotionsApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Handles get promotion by filter criteria Returns an array of enabled promotions matching specified
     * filter  criteria. In the request URL, you must provide a campaign_id parameter, and you can
     * optionally specify a date  range by providing start_date and end_date parameters. Both parameters
     * are required to specify a date range:  omitting one causes the server to return a
     * MissingParameterException fault. Each request returns only enabled  promotions; the
     * server does not consider promotion qualifiers or schedules.
     * @param {String} campaignId Find the promotions assigned to this campaign (mandatory)
     * @param {Object} opts Optional parameters
     * @param {String} opts.startDate The start date of the promotion in ISO8601 date time format: yyyy-MM-dd&#39;T&#39;HH:mmZ
     * @param {String} opts.endDate The end date of the promotion in ISO8601 date time format: yyyy-MM-dd&#39;T&#39;HH:mmZ
     * @param {String} opts.currency The currency mnemonic specified for price
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PromotionResult} and HTTP response
     */


    _createClass(PromotionsApi, [{
      key: "getPromotionsWithHttpInfo",
      value: function getPromotionsWithHttpInfo(campaignId, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'campaignId' is set

        if (campaignId === undefined || campaignId === null) {
          throw new Error('Missing the required parameter \'campaignId\' when calling getPromotions');
        }

        var pathParams = {};
        var queryParams = {
          campaign_id: campaignId,
          start_date: opts.startDate,
          end_date: opts.endDate,
          currency: opts.currency
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = PromotionResult;
        return this.apiClient.callApi('/promotions', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Handles get promotion by filter criteria Returns an array of enabled promotions matching
       * specified filter  criteria. In the request URL, you must provide a campaign_id parameter,
       * and you can optionally specify a date  range by providing start_date and end_date parameters.
       * Both parameters are required to specify a date range:  omitting one causes the server
       * to return a MissingParameterException fault. Each request returns only enabled  promotions;
       * the server does not consider promotion qualifiers or schedules.
       * @param {String} campaignId Find the promotions assigned to this campaign (mandatory)
       * @param {Object} opts Optional parameters
       * @param {String} opts.startDate The start date of the promotion in ISO8601 date time format: yyyy-MM-dd&#39;T&#39;HH:mmZ
       * @param {String} opts.endDate The end date of the promotion in ISO8601 date time format: yyyy-MM-dd&#39;T&#39;HH:mmZ
       * @param {String} opts.currency The currency mnemonic specified for price
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PromotionResult}
       */

    }, {
      key: "getPromotions",
      value: function getPromotions(campaignId, opts) {
        return this.getPromotionsWithHttpInfo(campaignId, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * Returns an enabled promotion using a specified id. Each request returns a response only
       * for an enabled promotion;  the server does not consider promotion qualifiers or schedules.
       * @param {String} id The id of the requested promotion.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Promotion} and HTTP response
       */

    }, {
      key: "getPromotionsByIDWithHttpInfo",
      value: function getPromotionsByIDWithHttpInfo(id, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getPromotionsByID');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Promotion;
        return this.apiClient.callApi('/promotions/{id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Returns an enabled promotion using a specified id. Each request returns a response
       * only for an enabled promotion;  the server does not consider promotion qualifiers or schedules.
       * @param {String} id The id of the requested promotion.
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Promotion}
       */

    }, {
      key: "getPromotionsByID",
      value: function getPromotionsByID(id, opts) {
        return this.getPromotionsByIDWithHttpInfo(id, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PromotionResult} and HTTP response
       */

    }, {
      key: "getPromotionsByIDsWithHttpInfo",
      value: function getPromotionsByIDsWithHttpInfo(ids, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'ids' is set

        if (ids === undefined || ids === null) {
          throw new Error('Missing the required parameter \'ids\' when calling getPromotionsByIDs');
        }

        var pathParams = {
          ids: ids
        };
        var queryParams = {
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = PromotionResult;
        return this.apiClient.callApi('/promotions/({ids})', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * @param {Array.<String>} ids
       * @param {Object} opts Optional parameters
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PromotionResult}
       */

    }, {
      key: "getPromotionsByIDs",
      value: function getPromotionsByIDs(ids, opts) {
        return this.getPromotionsByIDsWithHttpInfo(ids, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return PromotionsApi;
  }();

  /**
   * Search_suggestion service.
   * @module api/SearchSuggestionApi
   * @version 17.8
   */

  var SearchSuggestionApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new SearchSuggestionApi.
     * @alias module:api/SearchSuggestionApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function SearchSuggestionApi(apiClient) {
      _classCallCheck(this, SearchSuggestionApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Provides keyword search functionality for products, categories, content, brands and custom
     * suggestions.  Returns suggested products, suggested categories, suggested content, suggested
     * brands and custom suggestions  for the given search phrase.
     * @param {String} q The query phrase to search for.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.count The maximum number of suggestions per request. Default value is 5. This affects all types of suggestions (category, product, content, brand, custom suggestions).
     * @param {String} opts.currency The currency mnemonic specified for price. This parameter is effective only for product suggestions.
     * @param {String} opts.locale
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/SuggestionResult} and HTTP response
     */


    _createClass(SearchSuggestionApi, [{
      key: "getSearchSuggestionWithHttpInfo",
      value: function getSearchSuggestionWithHttpInfo(q, opts) {
        opts = opts || {};
        var postBody = null; // verify the required parameter 'q' is set

        if (q === undefined || q === null) {
          throw new Error('Missing the required parameter \'q\' when calling getSearchSuggestion');
        }

        var pathParams = {};
        var queryParams = {
          q: q,
          count: opts.count,
          currency: opts.currency,
          locale: opts.locale
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = SuggestionResult;
        return this.apiClient.callApi('/search_suggestion', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Provides keyword search functionality for products, categories, content, brands and custom
       * suggestions.  Returns suggested products, suggested categories, suggested content, suggested
       * brands and custom suggestions  for the given search phrase.
       * @param {String} q The query phrase to search for.
       * @param {Object} opts Optional parameters
       * @param {Number} opts.count The maximum number of suggestions per request. Default value is 5. This affects all types of suggestions (category, product, content, brand, custom suggestions).
       * @param {String} opts.currency The currency mnemonic specified for price. This parameter is effective only for product suggestions.
       * @param {String} opts.locale
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/SuggestionResult}
       */

    }, {
      key: "getSearchSuggestion",
      value: function getSearchSuggestion(q, opts) {
        return this.getSearchSuggestionWithHttpInfo(q, opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return SearchSuggestionApi;
  }();

  /**
   * Sessions service.
   * @module api/SessionsApi
   * @version 17.8
   */

  var SessionsApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new SessionsApi.
     * @alias module:api/SessionsApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function SessionsApi(apiClient) {
      _classCallCheck(this, SessionsApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Exchanges a JWT token into a new session. If the given token is valid, creates a new session,
     * which is associated  with the authenticated or anonymous customer. All Set-Cookie headers for
     * handling the session are applied  on the response.    Please note that this resource always
     * creates a new session with the consequence that you have no session basket  after you do that.
     * Once you created a session from a JWT token you can use this session and stateless OCAPI calls
     * using the JWT in parallel. There is no additional need to call the bridging resources again.
     * When a session ID is sent in with the request, the specified session is ignored. Only the
     * incoming JWT token is  used to create a new session.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */


    _createClass(SessionsApi, [{
      key: "postSessionsWithHttpInfo",
      value: function postSessionsWithHttpInfo() {
        var postBody = null;
        var pathParams = {};
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = null;
        return this.apiClient.callApi('/sessions', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Exchanges a JWT token into a new session. If the given token is valid, creates a new session,
       * which is associated  with the authenticated or anonymous customer. All Set-Cookie headers
       * for handling the session are applied  on the response.    Please note that this resource
       * always creates a new session with the consequence that you have no session basket  after you
       * do that. Once you created a session from a JWT token you can use this session and stateless
       * OCAPI calls  using the JWT in parallel. There is no additional need to call the bridging
       * resources again.    When a session ID is sent in with the request, the specified session is
       * ignored. Only the incoming JWT token is  used to create a new session.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}
       */

    }, {
      key: "postSessions",
      value: function postSessions() {
        return this.postSessionsWithHttpInfo().then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return SessionsApi;
  }();

  /**
   * Site service.
   * @module api/SiteApi
   * @version 17.8
   */

  var SiteApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new SiteApi.
     * @alias module:api/SiteApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function SiteApi(apiClient) {
      _classCallCheck(this, SiteApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * Access site information, like site status and site content URLs.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Site} and HTTP response
     */


    _createClass(SiteApi, [{
      key: "getSiteWithHttpInfo",
      value: function getSiteWithHttpInfo() {
        var postBody = null;
        var pathParams = {};
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Site;
        return this.apiClient.callApi('/site', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * Access site information, like site status and site content URLs.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Site}
       */

    }, {
      key: "getSite",
      value: function getSite() {
        return this.getSiteWithHttpInfo().then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return SiteApi;
  }();

  /**
   * Stores service.
   * @module api/StoresApi
   * @version 17.8
   */

  var StoresApi =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new StoresApi.
     * @alias module:api/StoresApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use,
     * default to {@link module:ApiClient#instance} if unspecified.
     */
    function StoresApi(apiClient) {
      _classCallCheck(this, StoresApi);

      this.apiClient = apiClient || ApiClient.instance;
    }
    /**
     * This resource retrieves a list of stores, for the given site, that are within a configured
     * distance of a location  on the earth. The stores and their distance from the specified location are returned
     * as a result set of Store  objects. The distance is interpreted either in miles or kilometers depending
     * on the \&quot;distance_unit\&quot; input  parameter.   The location can be specified by either directly
     * providing a latitude/longitude coordinate pair or by providing a  country and a postal code:
     * If a postal code is passed, the resource looks in the system&#39;s geolocation mappings to find
     * the coordinates  for this postal code. If no matching geolocation is found, the resource will
     * return an empty list of stores.  If coordinates are passed, the values for country and postal
     * code are ignored.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.latitude The geo coordinate latitude to search for stores
     * (value range -90.00 .. 90.00).
     * @param {Number} opts.longitude The geo coordinate longitude to search for stores
     * (value range -180.00 .. 180.00).
     * @param {String} opts.countryCode The two letter ISO country code e.g. \&quot;US\&quot;.
     * @param {String} opts.postalCode The postal code e.g. \&quot;01801\&quot;.
     * @param {String} opts.distanceUnit The distance unit. Supported values are \&quot;mi\&quot; and \&quot;km\&quot;
     * (for miles and kilometers respectively, default is \&quot;km\&quot;).
     * @param {Number} opts.maxDistance The area (radius) in distancUnit where stores will be
     * searched for (default is half of the earth&#39;s perimeter).
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/StoreResult} and HTTP response
     */


    _createClass(StoresApi, [{
      key: "getStoresWithHttpInfo",
      value: function getStoresWithHttpInfo(opts) {
        opts = opts || {};
        var postBody = null;
        var pathParams = {};
        var queryParams = {
          latitude: opts.latitude,
          longitude: opts.longitude,
          country_code: opts.countryCode,
          postal_code: opts.postalCode,
          distance_unit: opts.distanceUnit,
          max_distance: opts.maxDistance,
          start: opts.start,
          count: opts.count
        };
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = StoreResult;
        return this.apiClient.callApi('/stores', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * This resource retrieves a list of stores, for the given site, that are within a configured distance
       * of a location  on the earth. The stores and their distance from the specified location are
       * returned as a result set of Store  objects. The distance is interpreted either in miles or
       * kilometers depending on the \&quot;distance_unit\&quot; input  parameter.   The location can
       * be specified by either directly providing a latitude/longitude coordinate pair or by providing
       * a  country and a postal code:    If a postal code is passed, the resource looks in the
       * system&#39;s geolocation mappings to find the coordinates  for this postal code. If no
       * matching geolocation is found, the resource will return an empty list of stores.  If coordinates
       * are passed, the values for country and postal code are ignored.
       * @param {Object} opts Optional parameters
       * @param {Number} opts.latitude The geo coordinate latitude to search for stores
       * (value range -90.00 .. 90.00).
       * @param {Number} opts.longitude The geo coordinate longitude to search for stores
       * (value range -180.00 .. 180.00).
       * @param {String} opts.countryCode The two letter ISO country code e.g. \&quot;US\&quot;.
       * @param {String} opts.postalCode The postal code e.g. \&quot;01801\&quot;.
       * @param {String} opts.distanceUnit The distance unit. Supported values are \&quot;mi\&quot; and \&quot;km\&quot;
       * (for miles and kilometers respectively, default is \&quot;km\&quot;).
       * @param {Number} opts.maxDistance The area (radius) in distancUnit where stores will be
       * searched for (default is half of the earth&#39;s perimeter).
       * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
       * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/StoreResult}
       */

    }, {
      key: "getStores",
      value: function getStores(opts) {
        return this.getStoresWithHttpInfo(opts).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * To access a store, you construct a URL using the template shown below. This template requires you to specify a  store id. In the response, the server returns a corresponding store document.
       * @param {String} id The id of the requested store.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/Store} and HTTP response
       */

    }, {
      key: "getStoresByIDWithHttpInfo",
      value: function getStoresByIDWithHttpInfo(id) {
        var postBody = null; // verify the required parameter 'id' is set

        if (id === undefined || id === null) {
          throw new Error('Missing the required parameter \'id\' when calling getStoresByID');
        }

        var pathParams = {
          id: id
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = Store;
        return this.apiClient.callApi('/stores/{id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * To access a store, you construct a URL using the template shown below. This template requires you to specify a  store id. In the response, the server returns a corresponding store document.
       * @param {String} id The id of the requested store.
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/Store}
       */

    }, {
      key: "getStoresByID",
      value: function getStoresByID(id) {
        return this.getStoresByIDWithHttpInfo(id).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
      /**
       * @param {Array.<String>} ids
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/StoreResult} and HTTP response
       */

    }, {
      key: "getStoresByIDsWithHttpInfo",
      value: function getStoresByIDsWithHttpInfo(ids) {
        var postBody = null; // verify the required parameter 'ids' is set

        if (ids === undefined || ids === null) {
          throw new Error('Missing the required parameter \'ids\' when calling getStoresByIDs');
        }

        var pathParams = {
          ids: ids
        };
        var queryParams = {};
        var headerParams = {};
        var formParams = {};
        var authNames = ['client_id', 'customers_auth'];
        var contentTypes = ['application/json', 'text/xml', 'application/xml'];
        var accepts = ['application/json', 'text/xml', 'application/xml'];
        var returnType = StoreResult;
        return this.apiClient.callApi('/stores/({ids})', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
      }
      /**
       * @param {Array.<String>} ids
       * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/StoreResult}
       */

    }, {
      key: "getStoresByIDs",
      value: function getStoresByIDs(ids) {
        return this.getStoresByIDsWithHttpInfo(ids).then(function (response_and_data) {
          return response_and_data.data;
        });
      }
    }]);

    return StoresApi;
  }();

  /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
  /**
  * ERROR_UNKNOWN.<br>
  * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
  * <p>
  * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
  * <pre>
  * var ShopApi = require('index') // See note below*.
  * var xxxSvc = new ShopApi.XxxApi(); // Allocate the API class we're going to use.
  * var yyyModel = new ShopApi.Yyy(); // Construct a model instance.
  * yyyModel.someProperty = 'someValue'
  * ...
  * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
  * ...
  * </pre>
  * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
  * and put the application logic within the callback function.</em>
  * </p>
  * <p>
  * A non-AMD browser application (discouraged) might do something like this:
  * <pre>
  * var xxxSvc = new ShopApi.XxxApi(); // Allocate the API class we're going to use.
  * var yyy = new ShopApi.Yyy(); // Construct a model instance.
  * yyyModel.someProperty = 'someValue'
  * ...
  * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
  * ...
  * </pre>
  * </p>
  * @module index
  * @version 17.8
  */

  var index = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,

    /**
     * The AuthRequest model constructor.
     * @property {module:models/AuthRequestModel}
     */
    AuthRequest: AuthRequest,

    /**
     * The Basket model constructor.
     * @property {module:models/BasketModel}
     */
    Basket: Basket,

    /**
     * The BasketPaymentInstrumentRequest model constructor.
     * @property {module:models/BasketPaymentInstrumentRequestModel}
     */
    BasketPaymentInstrumentRequest: BasketPaymentInstrumentRequest,

    /**
     * The BasketsResult model constructor.
     * @property {module:models/BasketsResultModel}
     */
    BasketsResult: BasketsResult,

    /**
     * The BonusDiscountLineItem model constructor.
     * @property {module:models/BonusDiscountLineItemModel}
     */
    BonusDiscountLineItem: BonusDiscountLineItem,

    /**
     * The BoolFilter model constructor.
     * @property {module:models/BoolFilterModel}
     */
    BoolFilter: BoolFilter,

    /**
     * The BoolQuery model constructor.
     * @property {module:models/BoolQueryModel}
     */
    BoolQuery: BoolQuery,

    /**
     * The BundledProduct model constructor.
     * @property {module:models/BundledProductModel}
     */
    BundledProduct: BundledProduct,

    /**
     * The Category model constructor.
     * @property {module:models/CategoryModel}
     */
    Category: Category,

    /**
     * The CategoryResult model constructor.
     * @property {module:models/CategoryResultModel}
     */
    CategoryResult: CategoryResult,

    /**
     * The ContentFolder model constructor.
     * @property {module:models/ContentFolderModel}
     */
    ContentFolder: ContentFolder,

    /**
     * The ContentFolderResult model constructor.
     * @property {module:models/ContentFolderResultModel}
     */
    ContentFolderResult: ContentFolderResult,

    /**
     * The Content model constructor.
     * @property {module:models/ContentModel}
     */
    Content: Content,

    /**
     * The ContentResult model constructor.
     * @property {module:models/ContentResultModel}
     */
    ContentResult: ContentResult,

    /**
     * The ContentSearchRefinement model constructor.
     * @property {module:models/ContentSearchRefinementModel}
     */
    ContentSearchRefinement: ContentSearchRefinement,

    /**
     * The ContentSearchRefinementValue model constructor.
     * @property {module:models/ContentSearchRefinementValueModel}
     */
    ContentSearchRefinementValue: ContentSearchRefinementValue,

    /**
     * The ContentSearchResult model constructor.
     * @property {module:models/ContentSearchResultModel}
     */
    ContentSearchResult: ContentSearchResult,

    /**
     * The CouponItem model constructor.
     * @property {module:models/CouponItemModel}
     */
    CouponItem: CouponItem,

    /**
     * The CustomObject model constructor.
     * @property {module:models/CustomObjectModel}
     */
    CustomObject: CustomObject,

    /**
     * The CustomerAddressLink model constructor.
     * @property {module:models/CustomerAddressLinkModel}
     */
    CustomerAddressLink: CustomerAddressLink,

    /**
     * The CustomerAddress model constructor.
     * @property {module:models/CustomerAddressModel}
     */
    CustomerAddress: CustomerAddress,

    /**
     * The CustomerAddressResult model constructor.
     * @property {module:models/CustomerAddressResultModel}
     */
    CustomerAddressResult: CustomerAddressResult,

    /**
     * The CustomerInfo model constructor.
     * @property {module:models/CustomerInfoModel}
     */
    CustomerInfo: CustomerInfo,

    /**
     * The Customer model constructor.
     * @property {module:models/CustomerModel}
     */
    Customer: Customer,

    /**
     * The CustomerOrderResult model constructor.
     * @property {module:models/CustomerOrderResultModel}
     */
    CustomerOrderResult: CustomerOrderResult,

    /**
     * The CustomerPaymentCardRequest model constructor.
     * @property {module:models/CustomerPaymentCardRequestModel}
     */
    CustomerPaymentCardRequest: CustomerPaymentCardRequest,

    /**
     * The CustomerPaymentInstrument model constructor.
     * @property {module:models/CustomerPaymentInstrumentModel}
     */
    CustomerPaymentInstrument: CustomerPaymentInstrument,

    /**
     * The CustomerPaymentInstrumentRequest model constructor.
     * @property {module:models/CustomerPaymentInstrumentRequestModel}
     */
    CustomerPaymentInstrumentRequest: CustomerPaymentInstrumentRequest,

    /**
     * The CustomerPaymentInstrumentResult model constructor.
     * @property {module:models/CustomerPaymentInstrumentResultModel}
     */
    CustomerPaymentInstrumentResult: CustomerPaymentInstrumentResult,

    /**
     * The CustomerProductListItemLink model constructor.
     * @property {module:models/CustomerProductListItemLinkModel}
     */
    CustomerProductListItemLink: CustomerProductListItemLink,

    /**
     * The CustomerProductListItem model constructor.
     * @property {module:models/CustomerProductListItemModel}
     */
    CustomerProductListItem: CustomerProductListItem,

    /**
     * The CustomerProductListItemResult model constructor.
     * @property {module:models/CustomerProductListItemResultModel}
     */
    CustomerProductListItemResult: CustomerProductListItemResult,

    /**
     * The CustomerProductList model constructor.
     * @property {module:models/CustomerProductListModel}
     */
    CustomerProductList: CustomerProductList,

    /**
     * The CustomerProductListRegistrant model constructor.
     * @property {module:models/CustomerProductListRegistrantModel}
     */
    CustomerProductListRegistrant: CustomerProductListRegistrant,

    /**
     * The CustomerProductListResult model constructor.
     * @property {module:models/CustomerProductListResultModel}
     */
    CustomerProductListResult: CustomerProductListResult,

    /**
     * The CustomerRegistration model constructor.
     * @property {module:models/CustomerRegistrationModel}
     */
    CustomerRegistration: CustomerRegistration,

    /**
     * The Discount model constructor.
     * @property {module:models/DiscountModel}
     */
    Discount: Discount,

    /**
     * The Fault model constructor.
     * @property {module:models/FaultModel}
     */
    Fault: Fault,

    /**
     * The FilteredQuery model constructor.
     * @property {module:models/FilteredQueryModel}
     */
    FilteredQuery: FilteredQuery,

    /**
     * The GiftCertificateItem model constructor.
     * @property {module:models/GiftCertificateItemModel}
     */
    GiftCertificateItem: GiftCertificateItem,

    /**
     * The GiftCertificate model constructor.
     * @property {module:models/GiftCertificateModel}
     */
    GiftCertificate: GiftCertificate,

    /**
     * The GiftCertificateRequest model constructor.
     * @property {module:models/GiftCertificateRequestModel}
     */
    GiftCertificateRequest: GiftCertificateRequest,

    /**
     * The ImageGroup model constructor.
     * @property {module:models/ImageGroupModel}
     */
    ImageGroup: ImageGroup,

    /**
     * The Image model constructor.
     * @property {module:models/ImageModel}
     */
    Image: Image,

    /**
     * The Inventory model constructor.
     * @property {module:models/InventoryModel}
     */
    Inventory: Inventory,

    /**
     * The Locale model constructor.
     * @property {module:models/LocaleModel}
     */
    Locale: Locale,

    /**
     * The Master model constructor.
     * @property {module:models/MasterModel}
     */
    Master: Master,

    /**
     * The NestedQuery model constructor.
     * @property {module:models/NestedQueryModel}
     */
    NestedQuery: NestedQuery,

    /**
     * The Note model constructor.
     * @property {module:models/NoteModel}
     */
    Note: Note,

    /**
     * The NotesResult model constructor.
     * @property {module:models/NotesResultModel}
     */
    NotesResult: NotesResult,

    /**
     * The OptionItem model constructor.
     * @property {module:models/OptionItemModel}
     */
    OptionItem: OptionItem,

    /**
     * The Option model constructor.
     * @property {module:models/OptionModel}
     */
    Option: Option,

    /**
     * The OptionValue model constructor.
     * @property {module:models/OptionValueModel}
     */
    OptionValue: OptionValue,

    /**
     * The OrderAddress model constructor.
     * @property {module:models/OrderAddressModel}
     */
    OrderAddress: OrderAddress,

    /**
     * The Order model constructor.
     * @property {module:models/OrderModel}
     */
    Order: Order,

    /**
     * The OrderPaymentCardRequest model constructor.
     * @property {module:models/OrderPaymentCardRequestModel}
     */
    OrderPaymentCardRequest: OrderPaymentCardRequest,

    /**
     * The OrderPaymentInstrument model constructor.
     * @property {module:models/OrderPaymentInstrumentModel}
     */
    OrderPaymentInstrument: OrderPaymentInstrument,

    /**
     * The OrderPaymentInstrumentRequest model constructor.
     * @property {module:models/OrderPaymentInstrumentRequestModel}
     */
    OrderPaymentInstrumentRequest: OrderPaymentInstrumentRequest,

    /**
     * The OrderSearchHit model constructor.
     * @property {module:models/OrderSearchHitModel}
     */
    OrderSearchHit: OrderSearchHit,

    /**
     * The OrderSearchRequest model constructor.
     * @property {module:models/OrderSearchRequestModel}
     */
    OrderSearchRequest: OrderSearchRequest,

    /**
     * The OrderSearchResult model constructor.
     * @property {module:models/OrderSearchResultModel}
     */
    OrderSearchResult: OrderSearchResult,

    /**
     * The PasswordChangeRequest model constructor.
     * @property {module:models/PasswordChangeRequestModel}
     */
    PasswordChangeRequest: PasswordChangeRequest,

    /**
     * The PasswordReset model constructor.
     * @property {module:models/PasswordResetModel}
     */
    PasswordReset: PasswordReset,

    /**
     * The PaymentBankAccount model constructor.
     * @property {module:models/PaymentBankAccountModel}
     */
    PaymentBankAccount: PaymentBankAccount,

    /**
     * The PaymentBankAccountRequest model constructor.
     * @property {module:models/PaymentBankAccountRequestModel}
     */
    PaymentBankAccountRequest: PaymentBankAccountRequest,

    /**
     * The PaymentCard model constructor.
     * @property {module:models/PaymentCardModel}
     */
    PaymentCard: PaymentCard,

    /**
     * The PaymentCardSpec model constructor.
     * @property {module:models/PaymentCardSpecModel}
     */
    PaymentCardSpec: PaymentCardSpec,

    /**
     * The PaymentMethod model constructor.
     * @property {module:models/PaymentMethodModel}
     */
    PaymentMethod: PaymentMethod,

    /**
     * The PaymentMethodResult model constructor.
     * @property {module:models/PaymentMethodResultModel}
     */
    PaymentMethodResult: PaymentMethodResult,

    /**
     * The PriceAdjustmentLimit model constructor.
     * @property {module:models/PriceAdjustmentLimitModel}
     */
    PriceAdjustmentLimit: PriceAdjustmentLimit,

    /**
     * The PriceAdjustmentLimits model constructor.
     * @property {module:models/PriceAdjustmentLimitsModel}
     */
    PriceAdjustmentLimits: PriceAdjustmentLimits,

    /**
     * The PriceAdjustment model constructor.
     * @property {module:models/PriceAdjustmentModel}
     */
    PriceAdjustment: PriceAdjustment,

    /**
     * The ProductDetailsLink model constructor.
     * @property {module:models/ProductDetailsLinkModel}
     */
    ProductDetailsLink: ProductDetailsLink,

    /**
     * The ProductItem model constructor.
     * @property {module:models/ProductItemModel}
     */
    ProductItem: ProductItem,

    /**
     * The ProductLink model constructor.
     * @property {module:models/ProductLinkModel}
     */
    ProductLink: ProductLink,

    /**
     * The ProductListEvent model constructor.
     * @property {module:models/ProductListEventModel}
     */
    ProductListEvent: ProductListEvent,

    /**
     * The ProductListItemReference model constructor.
     * @property {module:models/ProductListItemReferenceModel}
     */
    ProductListItemReference: ProductListItemReference,

    /**
     * The ProductListLink model constructor.
     * @property {module:models/ProductListLinkModel}
     */
    ProductListLink: ProductListLink,

    /**
     * The ProductListRegistrant model constructor.
     * @property {module:models/ProductListRegistrantModel}
     */
    ProductListRegistrant: ProductListRegistrant,

    /**
     * The ProductListShippingAddress model constructor.
     * @property {module:models/ProductListShippingAddressModel}
     */
    ProductListShippingAddress: ProductListShippingAddress,

    /**
     * The Product model constructor.
     * @property {module:models/ProductModel}
     */
    Product: Product,

    /**
     * The ProductPromotion model constructor.
     * @property {module:models/ProductPromotionModel}
     */
    ProductPromotion: ProductPromotion,

    /**
     * The ProductResult model constructor.
     * @property {module:models/ProductResultModel}
     */
    ProductResult: ProductResult,

    /**
     * The ProductSearchHit model constructor.
     * @property {module:models/ProductSearchHitModel}
     */
    ProductSearchHit: ProductSearchHit,

    /**
     * The ProductSearchRefinement model constructor.
     * @property {module:models/ProductSearchRefinementModel}
     */
    ProductSearchRefinement: ProductSearchRefinement,

    /**
     * The ProductSearchRefinementValue model constructor.
     * @property {module:models/ProductSearchRefinementValueModel}
     */
    ProductSearchRefinementValue: ProductSearchRefinementValue,

    /**
     * The ProductSearchResult model constructor.
     * @property {module:models/ProductSearchResultModel}
     */
    ProductSearchResult: ProductSearchResult,

    /**
     * The ProductSearchSortingOption model constructor.
     * @property {module:models/ProductSearchSortingOptionModel}
     */
    ProductSearchSortingOption: ProductSearchSortingOption,

    /**
     * The ProductSimpleLink model constructor.
     * @property {module:models/ProductSimpleLinkModel}
     */
    ProductSimpleLink: ProductSimpleLink,

    /**
     * The ProductType model constructor.
     * @property {module:models/ProductTypeModel}
     */
    ProductType: ProductType,

    /**
     * The Promotion model constructor.
     * @property {module:models/PromotionModel}
     */
    Promotion: Promotion,

    /**
     * The PromotionResult model constructor.
     * @property {module:models/PromotionResultModel}
     */
    PromotionResult: PromotionResult,

    /**
     * The PublicProductListItem model constructor.
     * @property {module:models/PublicProductListItemModel}
     */
    PublicProductListItem: PublicProductListItem,

    /**
     * The PublicProductListItemResult model constructor.
     * @property {module:models/PublicProductListItemResultModel}
     */
    PublicProductListItemResult: PublicProductListItemResult,

    /**
     * The PublicProductListLink model constructor.
     * @property {module:models/PublicProductListLinkModel}
     */
    PublicProductListLink: PublicProductListLink,

    /**
     * The PublicProductList model constructor.
     * @property {module:models/PublicProductListModel}
     */
    PublicProductList: PublicProductList,

    /**
     * The PublicProductListResult model constructor.
     * @property {module:models/PublicProductListResultModel}
     */
    PublicProductListResult: PublicProductListResult,

    /**
     * The QueryFilter model constructor.
     * @property {module:models/QueryFilterModel}
     */
    QueryFilter: QueryFilter,

    /**
     * The Range2Filter model constructor.
     * @property {module:models/Range2FilterModel}
     */
    Range2Filter: Range2Filter,

    /**
     * The RangeFilter model constructor.
     * @property {module:models/RangeFilterModel}
     */
    RangeFilter: RangeFilter,

    /**
     * The Recommendation model constructor.
     * @property {module:models/RecommendationModel}
     */
    Recommendation: Recommendation,

    /**
     * The RecommendationType model constructor.
     * @property {module:models/RecommendationTypeModel}
     */
    RecommendationType: RecommendationType,

    /**
     * The ResultPage model constructor.
     * @property {module:models/ResultPageModel}
     */
    ResultPage: ResultPage,

    /**
     * The Shipment model constructor.
     * @property {module:models/ShipmentModel}
     */
    Shipment: Shipment,

    /**
     * The ShippingItem model constructor.
     * @property {module:models/ShippingItemModel}
     */
    ShippingItem: ShippingItem,

    /**
     * The ShippingMethod model constructor.
     * @property {module:models/ShippingMethodModel}
     */
    ShippingMethod: ShippingMethod,

    /**
     * The ShippingMethodResult model constructor.
     * @property {module:models/ShippingMethodResultModel}
     */
    ShippingMethodResult: ShippingMethodResult,

    /**
     * The ShippingPromotion model constructor.
     * @property {module:models/ShippingPromotionModel}
     */
    ShippingPromotion: ShippingPromotion,

    /**
     * The SimpleLink model constructor.
     * @property {module:models/SimpleLinkModel}
     */
    SimpleLink: SimpleLink,

    /**
     * The Site model constructor.
     * @property {module:models/SiteModel}
     */
    Site: Site,

    /**
     * The Sort model constructor.
     * @property {module:models/SortModel}
     */
    Sort: Sort,

    /**
     * The Status model constructor.
     * @property {module:models/StatusModel}
     */
    Status: Status,

    /**
     * The Store model constructor.
     * @property {module:models/StoreModel}
     */
    Store: Store,

    /**
     * The StoreResult model constructor.
     * @property {module:models/StoreResultModel}
     */
    StoreResult: StoreResult,

    /**
     * The SuggestedCategory model constructor.
     * @property {module:models/SuggestedCategoryModel}
     */
    SuggestedCategory: SuggestedCategory,

    /**
     * The SuggestedContent model constructor.
     * @property {module:models/SuggestedContentModel}
     */
    SuggestedContent: SuggestedContent,

    /**
     * The SuggestedPhrase model constructor.
     * @property {module:models/SuggestedPhraseModel}
     */
    SuggestedPhrase: SuggestedPhrase,

    /**
     * The SuggestedProduct model constructor.
     * @property {module:models/SuggestedProductModel}
     */
    SuggestedProduct: SuggestedProduct,

    /**
     * The SuggestedTerm model constructor.
     * @property {module:models/SuggestedTermModel}
     */
    SuggestedTerm: SuggestedTerm,

    /**
     * The SuggestedTerms model constructor.
     * @property {module:models/SuggestedTermsModel}
     */
    SuggestedTerms: SuggestedTerms,

    /**
     * The Suggestion model constructor.
     * @property {module:models/SuggestionModel}
     */
    Suggestion: Suggestion,

    /**
     * The SuggestionResult model constructor.
     * @property {module:models/SuggestionResultModel}
     */
    SuggestionResult: SuggestionResult,

    /**
     * The TermFilter model constructor.
     * @property {module:models/TermFilterModel}
     */
    TermFilter: TermFilter,

    /**
     * The TermQuery model constructor.
     * @property {module:models/TermQueryModel}
     */
    TermQuery: TermQuery,

    /**
     * The TextQuery model constructor.
     * @property {module:models/TextQueryModel}
     */
    TextQuery: TextQuery,

    /**
     * The Variant model constructor.
     * @property {module:models/VariantModel}
     */
    Variant: Variant,

    /**
     * The VariationAttribute model constructor.
     * @property {module:models/VariationAttributeModel}
     */
    VariationAttribute: VariationAttribute,

    /**
     * The VariationAttributeValue model constructor.
     * @property {module:models/VariationAttributeValueModel}
     */
    VariationAttributeValue: VariationAttributeValue,

    /**
     * The VariationGroup model constructor.
     * @property {module:models/VariationGroupModel}
     */
    VariationGroup: VariationGroup,

    /**
    * The BasketsApi service constructor.
    * @property {module:api/BasketsApi}
    */
    BasketsApi: BasketsApi,

    /**
    * The CategoriesApi service constructor.
    * @property {module:api/CategoriesApi}
    */
    CategoriesApi: CategoriesApi,

    /**
    * The ContentApi service constructor.
    * @property {module:api/ContentApi}
    */
    ContentApi: ContentApi,

    /**
    * The ContentSearchApi service constructor.
    * @property {module:api/ContentSearchApi}
    */
    ContentSearchApi: ContentSearchApi,

    /**
    * The CustomObjectsApi service constructor.
    * @property {module:api/CustomObjectsApi}
    */
    CustomObjectsApi: CustomObjectsApi,

    /**
    * The CustomersApi service constructor.
    * @property {module:api/CustomersApi}
    */
    CustomersApi: CustomersApi,

    /**
    * The FoldersApi service constructor.
    * @property {module:api/FoldersApi}
    */
    FoldersApi: FoldersApi,

    /**
    * The GiftCertificateApi service constructor.
    * @property {module:api/GiftCertificateApi}
    */
    GiftCertificateApi: GiftCertificateApi,

    /**
    * The OrderSearchApi service constructor.
    * @property {module:api/OrderSearchApi}
    */
    OrderSearchApi: OrderSearchApi,

    /**
    * The OrdersApi service constructor.
    * @property {module:api/OrdersApi}
    */
    OrdersApi: OrdersApi,

    /**
    * The PriceAdjustmentLimitsApi service constructor.
    * @property {module:api/PriceAdjustmentLimitsApi}
    */
    PriceAdjustmentLimitsApi: PriceAdjustmentLimitsApi,

    /**
    * The ProductListsApi service constructor.
    * @property {module:api/ProductListsApi}
    */
    ProductListsApi: ProductListsApi,

    /**
    * The ProductSearchApi service constructor.
    * @property {module:api/ProductSearchApi}
    */
    ProductSearchApi: ProductSearchApi,

    /**
    * The ProductsApi service constructor.
    * @property {module:api/ProductsApi}
    */
    ProductsApi: ProductsApi,

    /**
    * The PromotionsApi service constructor.
    * @property {module:api/PromotionsApi}
    */
    PromotionsApi: PromotionsApi,

    /**
    * The SearchSuggestionApi service constructor.
    * @property {module:api/SearchSuggestionApi}
    */
    SearchSuggestionApi: SearchSuggestionApi,

    /**
    * The SessionsApi service constructor.
    * @property {module:api/SessionsApi}
    */
    SessionsApi: SessionsApi,

    /**
    * The SiteApi service constructor.
    * @property {module:api/SiteApi}
    */
    SiteApi: SiteApi,

    /**
    * The StoresApi service constructor.
    * @property {module:api/StoresApi}
    */
    StoresApi: StoresApi
  };

  return index;

}));
