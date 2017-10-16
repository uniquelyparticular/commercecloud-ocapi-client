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
* The ProductDetailsLinkModel model module.
* @module models/ProductDetailsLinkModel
* @version 17.8
*/
export default class ProductDetailsLinkModel {
    /**
    * Constructs a new <code>ProductDetailsLinkModel</code>.
    * Document representing a link to the resource for product details.
    * @alias module:models/ProductDetailsLinkModel
    * @class
    * @param productId {String} The id of the product.
    */

    constructor(productId) {
        

        
        

        this['product_id'] = productId;

        
    }

    /**
    * Constructs a <code>ProductDetailsLinkModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductDetailsLinkModel} obj Optional instance to populate.
    * @return {module:models/ProductDetailsLinkModel} The populated <code>ProductDetailsLinkModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ProductDetailsLinkModel()

            
            
            

            if (data.hasOwnProperty('link')) {
                obj['link'] = ApiClient.convertToType(data['link'], 'String')
            }
            if (data.hasOwnProperty('product_description')) {
                obj['product_description'] = ApiClient.convertToType(data['product_description'], 'String')
            }
            if (data.hasOwnProperty('product_id')) {
                obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String')
            }
            if (data.hasOwnProperty('product_name')) {
                obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String')
            }
            if (data.hasOwnProperty('title')) {
                obj['title'] = ApiClient.convertToType(data['title'], 'String')
            }
        }
        return obj;
    }

    /**
    * The target of the link.
    * @member {String} link
    */
    link = undefined
    /**
    * The description of the product.
    * @member {String} product_description
    */
    product_description = undefined
    /**
    * The id of the product.
    * @member {String} product_id
    */
    product_id = undefined
    /**
    * The name of the product.
    * @member {String} product_name
    */
    product_name = undefined
    /**
    * The link title.
    * @member {String} title
    */
    title = undefined








}


