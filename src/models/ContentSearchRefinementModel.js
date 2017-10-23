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
import ContentSearchRefinementValueModel from './ContentSearchRefinementValueModel'

/**
* The ContentSearchRefinementModel model module.
* @module models/ContentSearchRefinementModel
* @version 17.8
*/
export default class ContentSearchRefinementModel {
    /**
    * Constructs a new <code>ContentSearchRefinementModel</code>.
    * Document representing a search refinement attribute.
    * @alias module:models/ContentSearchRefinementModel
    * @class
    * @param attributeId {String} The id of the search refinement attribute. In the case of an attribute refinement, this is the  attribute id. Custom attributes are marked by the prefix \"c_\".
    */
    constructor(attributeId) {
        this['attribute_id'] = attributeId;
    }

    /**
    * Constructs a <code>ContentSearchRefinementModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ContentSearchRefinementModel} obj Optional instance to populate.
    * @return {module:models/ContentSearchRefinementModel} The populated <code>ContentSearchRefinementModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ContentSearchRefinementModel()

            if (data.hasOwnProperty('attribute_id')) {
                obj['attribute_id'] = ApiClient.convertToType(data['attribute_id'], 'String')
            }
            if (data.hasOwnProperty('label')) {
                obj['label'] = ApiClient.convertToType(data['label'], 'String')
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], [ContentSearchRefinementValueModel]);
            }
        }
        return obj
    }

    /**
    * The id of the search refinement attribute. In the case of an attribute refinement, this is the  attribute id. Custom attributes are marked by the prefix \"c_\".
    * @member {String} attribute_id
    */
    attribute_id = undefined
    /**
    * The localized label of the refinement.
    * @member {String} label
    */
    label = undefined
    /**
    * The sorted array of refinement values. The array can be empty.
    * @member {Array.<module:models/ContentSearchRefinementValueModel>} values
    */
    values = undefined
}
