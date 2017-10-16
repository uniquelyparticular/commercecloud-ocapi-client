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
* The PromotionModel model module.
* @module models/PromotionModel
* @version 17.8
*/
export default class PromotionModel {
    /**
    * Constructs a new <code>PromotionModel</code>.
    * Document representing a promotion.
    * @alias module:models/PromotionModel
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>PromotionModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PromotionModel} obj Optional instance to populate.
    * @return {module:models/PromotionModel} The populated <code>PromotionModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PromotionModel()

            
            
            

            if (data.hasOwnProperty('callout_msg')) {
                obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String')
            }
            if (data.hasOwnProperty('currency')) {
                obj['currency'] = ApiClient.convertToType(data['currency'], 'String')
            }
            if (data.hasOwnProperty('details')) {
                obj['details'] = ApiClient.convertToType(data['details'], 'String')
            }
            if (data.hasOwnProperty('discounted_products_link')) {
                obj['discounted_products_link'] = ApiClient.convertToType(data['discounted_products_link'], 'String')
            }
            if (data.hasOwnProperty('end_date')) {
                obj['end_date'] = ApiClient.convertToType(data['end_date'], 'Date')
            }
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String')
            }
            if (data.hasOwnProperty('image')) {
                obj['image'] = ApiClient.convertToType(data['image'], 'String')
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String')
            }
            if (data.hasOwnProperty('start_date')) {
                obj['start_date'] = ApiClient.convertToType(data['start_date'], 'Date')
            }
        }
        return obj;
    }

    /**
    * The localized call-out message of the promotion.
    * @member {String} callout_msg
    */
    callout_msg = undefined
    /**
    * The currency that a promotion can be applied to. A null value means that the promotion applies to all allowed  currencies.
    * @member {String} currency
    */
    currency = undefined
    /**
    * The localized detailed description of the promotion.
    * @member {String} details
    */
    details = undefined
    /**
    * An optional product search link. Product promotions that are marked searchable provide a product search link with the promotion id as  refinement.
    * @member {String} discounted_products_link
    */
    discounted_products_link = undefined
    /**
    * The end date of the promotion. This property follows the ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ . The time  zone of the date time is always UTC.
    * @member {Date} end_date
    */
    end_date = undefined
    /**
    * The unique id of the promotion.
    * @member {String} id
    */
    id = undefined
    /**
    * The URL to the promotion image.
    * @member {String} image
    */
    image = undefined
    /**
    * The localized name of the promotion.
    * @member {String} name
    */
    name = undefined
    /**
    * The start date of the promotion. This property follows the ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ. The  time zone of the date time is always UTC.
    * @member {Date} start_date
    */
    start_date = undefined








}


