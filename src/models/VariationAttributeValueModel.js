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
* The VariationAttributeValueModel model module.
* @module models/VariationAttributeValueModel
* @version 17.8
*/
export default class VariationAttributeValueModel {
    /**
    * Constructs a new <code>VariationAttributeValueModel</code>.
    * @alias module:models/VariationAttributeValueModel
    * @class
    * @param value {String} 
    */

    constructor(value) {
        

        
        

        this['value'] = value;

        
    }

    /**
    * Constructs a <code>VariationAttributeValueModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/VariationAttributeValueModel} obj Optional instance to populate.
    * @return {module:models/VariationAttributeValueModel} The populated <code>VariationAttributeValueModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new VariationAttributeValueModel()

            
            
            

            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String')
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String')
            }
            if (data.hasOwnProperty('orderable')) {
                obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean')
            }
            if (data.hasOwnProperty('value')) {
                obj['value'] = ApiClient.convertToType(data['value'], 'String')
            }
        }
        return obj;
    }

    /**
    * @member {String} description
    */
    description = undefined
    /**
    * @member {String} name
    */
    name = undefined
    /**
    * @member {Boolean} orderable
    */
    orderable = undefined
    /**
    * @member {String} value
    */
    value = undefined








}


