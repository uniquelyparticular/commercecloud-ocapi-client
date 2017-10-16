/**
 * Shop API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 17.8
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.ShopApi);
  }
}(this, function(expect, ShopApi) {
  'use strict'

  var instance;

  beforeEach(function() {
    instance = new ShopApi.PriceAdjustmentLimitModel()
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('PriceAdjustmentLimitModel', function() {
    it('should create an instance of PriceAdjustmentLimitModel', function() {
      // uncomment below and update the code to test PriceAdjustmentLimitModel
      //var instane = new ShopApi.PriceAdjustmentLimitModel()
      //expect(instance).to.be.a(ShopApi.PriceAdjustmentLimitModel);
    });

    it('should have the property amount (base name: "amount")', function() {
      // uncomment below and update the code to test the property amount
      //var instane = new ShopApi.PriceAdjustmentLimitModel()
      //expect(instance).to.be();
    });

    it('should have the property currency (base name: "currency")', function() {
      // uncomment below and update the code to test the property currency
      //var instane = new ShopApi.PriceAdjustmentLimitModel()
      //expect(instance).to.be();
    });

    it('should have the property percent (base name: "percent")', function() {
      // uncomment below and update the code to test the property percent
      //var instane = new ShopApi.PriceAdjustmentLimitModel()
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new ShopApi.PriceAdjustmentLimitModel()
      //expect(instance).to.be();
    });

  });

}));
