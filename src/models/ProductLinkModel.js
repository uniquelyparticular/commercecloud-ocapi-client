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
* The ProductLinkModel model module.
* @module models/ProductLinkModel
* @version 17.8
*/
export default class ProductLinkModel {
    /**
    * Constructs a new <code>ProductLinkModel</code>.
    * Document representing a link between two products. It contains the id of the source and target products, the type of  product link, and URLs to retrieve product data.
    * @alias module:models/ProductLinkModel
    * @class
    */

    constructor() {}

    /**
    * Constructs a <code>ProductLinkModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductLinkModel} obj Optional instance to populate.
    * @return {module:models/ProductLinkModel} The populated <code>ProductLinkModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ProductLinkModel()





            if (data.hasOwnProperty('source_product_id')) {
                obj['source_product_id'] = ApiClient.convertToType(data['source_product_id'], 'String')
            }
            if (data.hasOwnProperty('source_product_link')) {
                obj['source_product_link'] = ApiClient.convertToType(data['source_product_link'], 'String')
            }
            if (data.hasOwnProperty('target_product_id')) {
                obj['target_product_id'] = ApiClient.convertToType(data['target_product_id'], 'String')
            }
            if (data.hasOwnProperty('target_product_link')) {
                obj['target_product_link'] = ApiClient.convertToType(data['target_product_link'], 'String')
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String')
            }
        }
        return obj;
    }

    /**
    * The semantic id of the product from which this product link is coming.
    * @member {String} source_product_id
    */
    source_product_id = undefined
    /**
    * The URL addressing the product from which this product link is coming.
    * @member {String} source_product_link
    */
    source_product_link = undefined
    /**
    * The semantic id of the product to which this product link is pointing.
    * @member {String} target_product_id
    */
    target_product_id = undefined
    /**
    * The URL addressing the product to which this product link is pointing.
    * @member {String} target_product_link
    */
    target_product_link = undefined
    /**
    * The type of this product link.
    * @member {module:models/ProductLinkModel.TypeEnum} type
    */
    type = undefined






    /**
    * Allowed values for the <code>type</code> property.
    * @enum {String}
    * @readonly
    */
    static TypeEnum = {

        /**
         * value: "cross_sell"
         * @const
         */
        "cross_sell": "cross_sell",

        /**
         * value: "replacement"
         * @const
         */
        "replacement": "replacement",

        /**
         * value: "up_sell"
         * @const
         */
        "up_sell": "up_sell",

        /**
         * value: "accessory"
         * @const
         */
        "accessory": "accessory",

        /**
         * value: "newer_version"
         * @const
         */
        "newer_version": "newer_version",

        /**
         * value: "alt_orderunit"
         * @const
         */
        "alt_orderunit": "alt_orderunit",

        /**
         * value: "spare_part"
         * @const
         */
        "spare_part": "spare_part",

        /**
         * value: "other"
         * @const
         */
        "other": "other"
    };



}
