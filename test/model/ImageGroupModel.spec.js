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
    instance = new ShopApi.ImageGroupModel()
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

  describe('ImageGroupModel', function() {
    it('should create an instance of ImageGroupModel', function() {
      // uncomment below and update the code to test ImageGroupModel
      //var instane = new ShopApi.ImageGroupModel()
      //expect(instance).to.be.a(ShopApi.ImageGroupModel);
    });

    it('should have the property images (base name: "images")', function() {
      // uncomment below and update the code to test the property images
      //var instane = new ShopApi.ImageGroupModel()
      //expect(instance).to.be();
    });

    it('should have the property variationAttributes (base name: "variation_attributes")', function() {
      // uncomment below and update the code to test the property variationAttributes
      //var instane = new ShopApi.ImageGroupModel()
      //expect(instance).to.be();
    });

    it('should have the property viewType (base name: "view_type")', function() {
      // uncomment below and update the code to test the property viewType
      //var instane = new ShopApi.ImageGroupModel()
      //expect(instance).to.be();
    });

  });

}));
