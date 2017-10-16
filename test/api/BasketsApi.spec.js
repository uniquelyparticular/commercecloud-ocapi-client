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
    instance = new ShopApi.BasketsApi();
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

  describe('BasketsApi', function() {
    describe('deleteBasketsByID', function() {
      it('should call deleteBasketsByID successfully', function(done) {
        //uncomment below and update the code to test deleteBasketsByID
        //instance.deleteBasketsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteBasketsByIDCouponsByID', function() {
      it('should call deleteBasketsByIDCouponsByID successfully', function(done) {
        //uncomment below and update the code to test deleteBasketsByIDCouponsByID
        //instance.deleteBasketsByIDCouponsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteBasketsByIDItemsByID', function() {
      it('should call deleteBasketsByIDItemsByID successfully', function(done) {
        //uncomment below and update the code to test deleteBasketsByIDItemsByID
        //instance.deleteBasketsByIDItemsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteBasketsByIDNotesByID', function() {
      it('should call deleteBasketsByIDNotesByID successfully', function(done) {
        //uncomment below and update the code to test deleteBasketsByIDNotesByID
        //instance.deleteBasketsByIDNotesByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteBasketsByIDPaymentInstrumentsByID', function() {
      it('should call deleteBasketsByIDPaymentInstrumentsByID successfully', function(done) {
        //uncomment below and update the code to test deleteBasketsByIDPaymentInstrumentsByID
        //instance.deleteBasketsByIDPaymentInstrumentsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteBasketsByIDShipmentsByID', function() {
      it('should call deleteBasketsByIDShipmentsByID successfully', function(done) {
        //uncomment below and update the code to test deleteBasketsByIDShipmentsByID
        //instance.deleteBasketsByIDShipmentsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getBasketsByID', function() {
      it('should call getBasketsByID successfully', function(done) {
        //uncomment below and update the code to test getBasketsByID
        //instance.getBasketsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getBasketsByIDNotes', function() {
      it('should call getBasketsByIDNotes successfully', function(done) {
        //uncomment below and update the code to test getBasketsByIDNotes
        //instance.getBasketsByIDNotes(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getBasketsByIDPaymentMethods', function() {
      it('should call getBasketsByIDPaymentMethods successfully', function(done) {
        //uncomment below and update the code to test getBasketsByIDPaymentMethods
        //instance.getBasketsByIDPaymentMethods(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getBasketsByIDShipmentsByIDShippingMethods', function() {
      it('should call getBasketsByIDShipmentsByIDShippingMethods successfully', function(done) {
        //uncomment below and update the code to test getBasketsByIDShipmentsByIDShippingMethods
        //instance.getBasketsByIDShipmentsByIDShippingMethods(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('patchBasketsByID', function() {
      it('should call patchBasketsByID successfully', function(done) {
        //uncomment below and update the code to test patchBasketsByID
        //instance.patchBasketsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('patchBasketsByIDItemsByID', function() {
      it('should call patchBasketsByIDItemsByID successfully', function(done) {
        //uncomment below and update the code to test patchBasketsByIDItemsByID
        //instance.patchBasketsByIDItemsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('patchBasketsByIDPaymentInstrumentsByID', function() {
      it('should call patchBasketsByIDPaymentInstrumentsByID successfully', function(done) {
        //uncomment below and update the code to test patchBasketsByIDPaymentInstrumentsByID
        //instance.patchBasketsByIDPaymentInstrumentsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('patchBasketsByIDShipmentsByID', function() {
      it('should call patchBasketsByIDShipmentsByID successfully', function(done) {
        //uncomment below and update the code to test patchBasketsByIDShipmentsByID
        //instance.patchBasketsByIDShipmentsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postBaskets', function() {
      it('should call postBaskets successfully', function(done) {
        //uncomment below and update the code to test postBaskets
        //instance.postBaskets(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postBasketsByIDCoupons', function() {
      it('should call postBasketsByIDCoupons successfully', function(done) {
        //uncomment below and update the code to test postBasketsByIDCoupons
        //instance.postBasketsByIDCoupons(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postBasketsByIDGiftCertificateItems', function() {
      it('should call postBasketsByIDGiftCertificateItems successfully', function(done) {
        //uncomment below and update the code to test postBasketsByIDGiftCertificateItems
        //instance.postBasketsByIDGiftCertificateItems(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postBasketsByIDItems', function() {
      it('should call postBasketsByIDItems successfully', function(done) {
        //uncomment below and update the code to test postBasketsByIDItems
        //instance.postBasketsByIDItems(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postBasketsByIDNotes', function() {
      it('should call postBasketsByIDNotes successfully', function(done) {
        //uncomment below and update the code to test postBasketsByIDNotes
        //instance.postBasketsByIDNotes(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postBasketsByIDPaymentInstruments', function() {
      it('should call postBasketsByIDPaymentInstruments successfully', function(done) {
        //uncomment below and update the code to test postBasketsByIDPaymentInstruments
        //instance.postBasketsByIDPaymentInstruments(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postBasketsByIDShipments', function() {
      it('should call postBasketsByIDShipments successfully', function(done) {
        //uncomment below and update the code to test postBasketsByIDShipments
        //instance.postBasketsByIDShipments(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('putBasketsByIDBillingAddress', function() {
      it('should call putBasketsByIDBillingAddress successfully', function(done) {
        //uncomment below and update the code to test putBasketsByIDBillingAddress
        //instance.putBasketsByIDBillingAddress(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('putBasketsByIDCustomer', function() {
      it('should call putBasketsByIDCustomer successfully', function(done) {
        //uncomment below and update the code to test putBasketsByIDCustomer
        //instance.putBasketsByIDCustomer(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('putBasketsByIDShipmentsByIDShippingAddress', function() {
      it('should call putBasketsByIDShipmentsByIDShippingAddress successfully', function(done) {
        //uncomment below and update the code to test putBasketsByIDShipmentsByIDShippingAddress
        //instance.putBasketsByIDShipmentsByIDShippingAddress(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('putBasketsByIDShipmentsByIDShippingMethod', function() {
      it('should call putBasketsByIDShipmentsByIDShippingMethod successfully', function(done) {
        //uncomment below and update the code to test putBasketsByIDShipmentsByIDShippingMethod
        //instance.putBasketsByIDShipmentsByIDShippingMethod(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
