/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

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

import expect from 'expect.js'
import ShopApi from '../../src/index'

let instance

beforeEach(() => {
    instance = new ShopApi.PaymentBankAccount()
})

const getProperty = (object, getter, property) => {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function') {
        return object[getter]()
    } else {
        return object[property]
    }
}

const setProperty = (object, setter, property, value) => {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function') {
        object[setter](value)
    } else {
        object[property] = value
    }
}

describe('PaymentBankAccountModel', () => {
    it('should create an instance of PaymentBankAccountModel', () => {
        // uncomment below and update the code to test PaymentBankAccountModel
        // var instane = new ShopApi.PaymentBankAccount()
        // expect(instance).to.be.a(ShopApi.PaymentBankAccount);
    })

    it('should have the property driversLicenseLastDigits (base name: "drivers_license_last_digits")', () => {
        // uncomment below and update the code to test the property driversLicenseLastDigits
        // var instane = new ShopApi.PaymentBankAccount()
        // expect(instance).to.be();
    })

    it('should have the property driversLicenseStateCode (base name: "drivers_license_state_code")', () => {
        // uncomment below and update the code to test the property driversLicenseStateCode
        // var instane = new ShopApi.PaymentBankAccount()
        // expect(instance).to.be();
    })

    it('should have the property holder (base name: "holder")', () => {
        // uncomment below and update the code to test the property holder
        // var instane = new ShopApi.PaymentBankAccount()
        // expect(instance).to.be();
    })

    it('should have the property maskedDriversLicense (base name: "masked_drivers_license")', () => {
        // uncomment below and update the code to test the property maskedDriversLicense
        // var instane = new ShopApi.PaymentBankAccount()
        // expect(instance).to.be();
    })

    it('should have the property maskedNumber (base name: "masked_number")', () => {
        // uncomment below and update the code to test the property maskedNumber
        // var instane = new ShopApi.PaymentBankAccount()
        // expect(instance).to.be();
    })

    it('should have the property numberLastDigits (base name: "number_last_digits")', () => {
        // uncomment below and update the code to test the property numberLastDigits
        // var instane = new ShopApi.PaymentBankAccount()
        // expect(instance).to.be();
    })

})
