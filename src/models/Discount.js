/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable dot-notation */
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
import ApiClient from '../ApiClient'

/**
* The Discount model module.
* @module models/Discount
* @version 17.8
*/
export default class Discount {
    /**
    * Constructs a new <code>Discount</code>.
    * Document representing a discount that was
    * @alias module:models/Discount
    * @class
    * @param type {module:models/Discount.TypeEnum} The type of discount.
    */
    constructor(type) {
        /**
        * The amount that is used with the amount and fixed price types.
        * @member {Number} amount
        */
        this.amount = undefined

        /**
        * The percentage that is used with percentage types.
        * @member {Number} percentage
        */
        this.percentage = undefined

        /**
        * The price book id that is used with some types.
        * @member {String} price_book_id
        */
        this.price_book_id = undefined

        /**
        * The type of discount.
        * @member {module:models/Discount.TypeEnum} type
        */
        this.type = type
    }

    /**
    * Constructs a <code>Discount</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Discount} obj Optional instance to populate.
    * @return {module:models/Discount} The populated <code>Discount</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Discount()

            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number')
            }
            if (data.hasOwnProperty('percentage')) {
                obj['percentage'] = ApiClient.convertToType(data['percentage'], 'Number')
            }
            if (data.hasOwnProperty('price_book_id')) {
                obj['price_book_id'] = ApiClient.convertToType(data['price_book_id'], 'String')
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String')
            }
        }
        return obj
    }
}

/**
* Allowed values for the <code>type</code> property.
* @enum {String}
* @readonly
*/
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
}
