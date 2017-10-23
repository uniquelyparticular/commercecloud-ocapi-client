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
import ProductModel from './ProductModel'
import ProductSimpleLinkModel from './ProductSimpleLinkModel'





/**
* The PublicProductListItemModel model module.
* @module models/PublicProductListItemModel
* @version 17.8
*/
export default class PublicProductListItemModel {
    /**
    * Constructs a new <code>PublicProductListItemModel</code>.
    * Document representing a product list item.
    * @alias module:models/PublicProductListItemModel
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>PublicProductListItemModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PublicProductListItemModel} obj Optional instance to populate.
    * @return {module:models/PublicProductListItemModel} The populated <code>PublicProductListItemModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PublicProductListItemModel()

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String')
            }
            if (data.hasOwnProperty('priority')) {
                obj['priority'] = ApiClient.convertToType(data['priority'], 'Number')
            }
            if (data.hasOwnProperty('product')) {
                obj['product'] = ProductModel.constructFromObject(data['product']);
            }
            if (data.hasOwnProperty('product_details_link')) {
                obj['product_details_link'] = ProductSimpleLinkModel.constructFromObject(data['product_details_link']);
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String')
            }
        }
        return obj
    }

    /**
    * The id of this product list item.
    * @member {String} id
    */
    id = undefined
    /**
    * The priority of the item.
    * @member {Number} priority
    */
    priority = undefined
    /**
    * The product item
    * @member {module:models/ProductModel} product
    */
    product = undefined
    /**
    * A link to the product.
    * @member {module:models/ProductSimpleLinkModel} product_details_link
    */
    product_details_link = undefined
    /**
    * The type of the item.
    * @member {module:models/PublicProductListItemModel.TypeEnum} type
    */
    type = undefined






    /**
    * Allowed values for the <code>type</code> property.
    * @enum {String}
    * @readonly
    */
    static TypeEnum = {
    
        /**
         * value: "product"
         * @const
         */
        "product": "product",
    
        /**
         * value: "gift_certificate"
         * @const
         */
        "gift_certificate": "gift_certificate"    
    };



}


