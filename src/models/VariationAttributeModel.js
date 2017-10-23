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
import VariationAttributeValueModel from './VariationAttributeValueModel'

/**
* The VariationAttributeModel model module.
* @module models/VariationAttributeModel
* @version 17.8
*/
export default class VariationAttributeModel {
    /**
    * Constructs a new <code>VariationAttributeModel</code>.
    * @alias module:models/VariationAttributeModel
    * @class
    * @param id {String}
    */
    constructor(id) {
        this['id'] = id
    }

    /**
    * Constructs a <code>VariationAttributeModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/VariationAttributeModel} obj Optional instance to populate.
    * @return {module:models/VariationAttributeModel} The populated <code>VariationAttributeModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new VariationAttributeModel()

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String')
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String')
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], [VariationAttributeValueModel]);
            }
        }
        return obj
    }

    /**
    * @member {String} id
    */
    id = undefined
    /**
    * @member {String} name
    */
    name = undefined
    /**
    * @member {Array.<module:models/VariationAttributeValueModel>} values
    */
    values = undefined
}
