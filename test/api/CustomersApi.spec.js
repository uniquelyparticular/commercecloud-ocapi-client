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
    instance = new ShopApi.CustomersApi();
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

  describe('CustomersApi', function() {
    describe('deleteCustomersAuth', function() {
      it('should call deleteCustomersAuth successfully', function(done) {
        //uncomment below and update the code to test deleteCustomersAuth
        //instance.deleteCustomersAuth(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteCustomersByIDAddressesByID', function() {
      it('should call deleteCustomersByIDAddressesByID successfully', function(done) {
        //uncomment below and update the code to test deleteCustomersByIDAddressesByID
        //instance.deleteCustomersByIDAddressesByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteCustomersByIDPaymentInstrumentsByID', function() {
      it('should call deleteCustomersByIDPaymentInstrumentsByID successfully', function(done) {
        //uncomment below and update the code to test deleteCustomersByIDPaymentInstrumentsByID
        //instance.deleteCustomersByIDPaymentInstrumentsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteCustomersByIDProductListsByID', function() {
      it('should call deleteCustomersByIDProductListsByID successfully', function(done) {
        //uncomment below and update the code to test deleteCustomersByIDProductListsByID
        //instance.deleteCustomersByIDProductListsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteCustomersByIDProductListsByIDItemsByID', function() {
      it('should call deleteCustomersByIDProductListsByIDItemsByID successfully', function(done) {
        //uncomment below and update the code to test deleteCustomersByIDProductListsByIDItemsByID
        //instance.deleteCustomersByIDProductListsByIDItemsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByID', function() {
      it('should call getCustomersByID successfully', function(done) {
        //uncomment below and update the code to test getCustomersByID
        //instance.getCustomersByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDAddresses', function() {
      it('should call getCustomersByIDAddresses successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDAddresses
        //instance.getCustomersByIDAddresses(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDAddressesByID', function() {
      it('should call getCustomersByIDAddressesByID successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDAddressesByID
        //instance.getCustomersByIDAddressesByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDBaskets', function() {
      it('should call getCustomersByIDBaskets successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDBaskets
        //instance.getCustomersByIDBaskets(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDOrders', function() {
      it('should call getCustomersByIDOrders successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDOrders
        //instance.getCustomersByIDOrders(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDPaymentInstruments', function() {
      it('should call getCustomersByIDPaymentInstruments successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDPaymentInstruments
        //instance.getCustomersByIDPaymentInstruments(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDPaymentInstrumentsByID', function() {
      it('should call getCustomersByIDPaymentInstrumentsByID successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDPaymentInstrumentsByID
        //instance.getCustomersByIDPaymentInstrumentsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDProductLists', function() {
      it('should call getCustomersByIDProductLists successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDProductLists
        //instance.getCustomersByIDProductLists(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDProductListsByID', function() {
      it('should call getCustomersByIDProductListsByID successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDProductListsByID
        //instance.getCustomersByIDProductListsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDProductListsByIDItems', function() {
      it('should call getCustomersByIDProductListsByIDItems successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDProductListsByIDItems
        //instance.getCustomersByIDProductListsByIDItems(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCustomersByIDProductListsByIDItemsByID', function() {
      it('should call getCustomersByIDProductListsByIDItemsByID successfully', function(done) {
        //uncomment below and update the code to test getCustomersByIDProductListsByIDItemsByID
        //instance.getCustomersByIDProductListsByIDItemsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('patchCustomersByID', function() {
      it('should call patchCustomersByID successfully', function(done) {
        //uncomment below and update the code to test patchCustomersByID
        //instance.patchCustomersByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('patchCustomersByIDAddressesByID', function() {
      it('should call patchCustomersByIDAddressesByID successfully', function(done) {
        //uncomment below and update the code to test patchCustomersByIDAddressesByID
        //instance.patchCustomersByIDAddressesByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('patchCustomersByIDProductListsByID', function() {
      it('should call patchCustomersByIDProductListsByID successfully', function(done) {
        //uncomment below and update the code to test patchCustomersByIDProductListsByID
        //instance.patchCustomersByIDProductListsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('patchCustomersByIDProductListsByIDItemsByID', function() {
      it('should call patchCustomersByIDProductListsByIDItemsByID successfully', function(done) {
        //uncomment below and update the code to test patchCustomersByIDProductListsByIDItemsByID
        //instance.patchCustomersByIDProductListsByIDItemsByID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postCustomers', function() {
      it('should call postCustomers successfully', function(done) {
        //uncomment below and update the code to test postCustomers
        //instance.postCustomers(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postCustomersAuth', function() {
      it('should call postCustomersAuth successfully', function(done) {
        //uncomment below and update the code to test postCustomersAuth
        //instance.postCustomersAuth(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postCustomersByIDAddresses', function() {
      it('should call postCustomersByIDAddresses successfully', function(done) {
        //uncomment below and update the code to test postCustomersByIDAddresses
        //instance.postCustomersByIDAddresses(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postCustomersByIDAuth', function() {
      it('should call postCustomersByIDAuth successfully', function(done) {
        //uncomment below and update the code to test postCustomersByIDAuth
        //instance.postCustomersByIDAuth(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postCustomersByIDPasswordReset', function() {
      it('should call postCustomersByIDPasswordReset successfully', function(done) {
        //uncomment below and update the code to test postCustomersByIDPasswordReset
        //instance.postCustomersByIDPasswordReset(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postCustomersByIDPaymentInstruments', function() {
      it('should call postCustomersByIDPaymentInstruments successfully', function(done) {
        //uncomment below and update the code to test postCustomersByIDPaymentInstruments
        //instance.postCustomersByIDPaymentInstruments(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postCustomersByIDProductLists', function() {
      it('should call postCustomersByIDProductLists successfully', function(done) {
        //uncomment below and update the code to test postCustomersByIDProductLists
        //instance.postCustomersByIDProductLists(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postCustomersByIDProductListsByIDItems', function() {
      it('should call postCustomersByIDProductListsByIDItems successfully', function(done) {
        //uncomment below and update the code to test postCustomersByIDProductListsByIDItems
        //instance.postCustomersByIDProductListsByIDItems(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postCustomersPasswordReset', function() {
      it('should call postCustomersPasswordReset successfully', function(done) {
        //uncomment below and update the code to test postCustomersPasswordReset
        //instance.postCustomersPasswordReset(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('putCustomersByIDPassword', function() {
      it('should call putCustomersByIDPassword successfully', function(done) {
        //uncomment below and update the code to test putCustomersByIDPassword
        //instance.putCustomersByIDPassword(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
