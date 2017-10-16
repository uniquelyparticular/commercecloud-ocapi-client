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
* The CustomerProductListItemLinkModel model module.
* @module models/CustomerProductListItemLinkModel
* @version 17.8
*/
export default class CustomerProductListItemLinkModel {
    /**
    * Constructs a new <code>CustomerProductListItemLinkModel</code>.
    * Document representing a customer product list item link.
    * @alias module:models/CustomerProductListItemLinkModel
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>CustomerProductListItemLinkModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerProductListItemLinkModel} obj Optional instance to populate.
    * @return {module:models/CustomerProductListItemLinkModel} The populated <code>CustomerProductListItemLinkModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CustomerProductListItemLinkModel()

            
            
            

            if (data.hasOwnProperty('link')) {
                obj['link'] = ApiClient.convertToType(data['link'], 'String')
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
    * The link title.
    * @member {String} title
    */
    title = undefined








}


