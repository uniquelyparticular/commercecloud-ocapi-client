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
* The ProductListLinkModel model module.
* @module models/ProductListLinkModel
* @version 17.8
*/
export default class ProductListLinkModel {
    /**
    * Constructs a new <code>ProductListLinkModel</code>.
    * Document representing a link to a product list.
    * @alias module:models/ProductListLinkModel
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>ProductListLinkModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ProductListLinkModel} obj Optional instance to populate.
    * @return {module:models/ProductListLinkModel} The populated <code>ProductListLinkModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ProductListLinkModel()

            
            
            

            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String')
            }
            if (data.hasOwnProperty('link')) {
                obj['link'] = ApiClient.convertToType(data['link'], 'String')
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String')
            }
            if (data.hasOwnProperty('public')) {
                obj['public'] = ApiClient.convertToType(data['public'], 'Boolean')
            }
            if (data.hasOwnProperty('title')) {
                obj['title'] = ApiClient.convertToType(data['title'], 'String')
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String')
            }
        }
        return obj
    }

    /**
    * The description of this product list.
    * @member {String} description
    */
    description = undefined
    /**
    * The target of the link.
    * @member {String} link
    */
    link = undefined
    /**
    * The name of this product list.
    * @member {String} name
    */
    name = undefined
    /**
    * A flag indicating whether the owner made this product list available for access  by other customers.
    * @member {Boolean} public
    */
    public = undefined
    /**
    * The link title.
    * @member {String} title
    */
    title = undefined
    /**
    * The type of the product list.
    * @member {module:models/ProductListLinkModel.TypeEnum} type
    */
    type = undefined






    /**
    * Allowed values for the <code>type</code> property.
    * @enum {String}
    * @readonly
    */
    static TypeEnum = {
    
        /**
         * value: "wish_list"
         * @const
         */
        "wish_list": "wish_list",
    
        /**
         * value: "gift_registry"
         * @const
         */
        "gift_registry": "gift_registry",
    
        /**
         * value: "shopping_list"
         * @const
         */
        "shopping_list": "shopping_list",
    
        /**
         * value: "custom_1"
         * @const
         */
        "custom_1": "custom_1",
    
        /**
         * value: "custom_2"
         * @const
         */
        "custom_2": "custom_2",
    
        /**
         * value: "custom_3"
         * @const
         */
        "custom_3": "custom_3"    
    };



}


