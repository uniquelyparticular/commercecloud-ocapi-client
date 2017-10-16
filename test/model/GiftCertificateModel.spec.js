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
    instance = new ShopApi.GiftCertificateModel()
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

  describe('GiftCertificateModel', function() {
    it('should create an instance of GiftCertificateModel', function() {
      // uncomment below and update the code to test GiftCertificateModel
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be.a(ShopApi.GiftCertificateModel);
    });

    it('should have the property amount (base name: "amount")', function() {
      // uncomment below and update the code to test the property amount
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property balance (base name: "balance")', function() {
      // uncomment below and update the code to test the property balance
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property enabled (base name: "enabled")', function() {
      // uncomment below and update the code to test the property enabled
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property maskedGiftCertificateCode (base name: "masked_gift_certificate_code")', function() {
      // uncomment below and update the code to test the property maskedGiftCertificateCode
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property merchantId (base name: "merchant_id")', function() {
      // uncomment below and update the code to test the property merchantId
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property message (base name: "message")', function() {
      // uncomment below and update the code to test the property message
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property recipientEmail (base name: "recipient_email")', function() {
      // uncomment below and update the code to test the property recipientEmail
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property recipientName (base name: "recipient_name")', function() {
      // uncomment below and update the code to test the property recipientName
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property senderName (base name: "sender_name")', function() {
      // uncomment below and update the code to test the property senderName
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

    it('should have the property status (base name: "status")', function() {
      // uncomment below and update the code to test the property status
      //var instane = new ShopApi.GiftCertificateModel()
      //expect(instance).to.be();
    });

  });

}));
