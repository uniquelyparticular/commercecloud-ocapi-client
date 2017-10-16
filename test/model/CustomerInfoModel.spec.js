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
    instance = new ShopApi.CustomerInfoModel()
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

  describe('CustomerInfoModel', function() {
    it('should create an instance of CustomerInfoModel', function() {
      // uncomment below and update the code to test CustomerInfoModel
      //var instane = new ShopApi.CustomerInfoModel()
      //expect(instance).to.be.a(ShopApi.CustomerInfoModel);
    });

    it('should have the property cFamilyStatus (base name: "c_familyStatus")', function() {
      // uncomment below and update the code to test the property cFamilyStatus
      //var instane = new ShopApi.CustomerInfoModel()
      //expect(instance).to.be();
    });

    it('should have the property customerId (base name: "customer_id")', function() {
      // uncomment below and update the code to test the property customerId
      //var instane = new ShopApi.CustomerInfoModel()
      //expect(instance).to.be();
    });

    it('should have the property customerName (base name: "customer_name")', function() {
      // uncomment below and update the code to test the property customerName
      //var instane = new ShopApi.CustomerInfoModel()
      //expect(instance).to.be();
    });

    it('should have the property customerNo (base name: "customer_no")', function() {
      // uncomment below and update the code to test the property customerNo
      //var instane = new ShopApi.CustomerInfoModel()
      //expect(instance).to.be();
    });

    it('should have the property email (base name: "email")', function() {
      // uncomment below and update the code to test the property email
      //var instane = new ShopApi.CustomerInfoModel()
      //expect(instance).to.be();
    });

  });

}));
