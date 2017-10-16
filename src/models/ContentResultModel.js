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
import ContentModel from './ContentModel'

/**
* The ContentResultModel model module.
* @module models/ContentResultModel
* @version 17.8
*/
export default class ContentResultModel {
    /**
    * Constructs a new <code>ContentResultModel</code>.
    * Result document containing an array of content assets.
    * @alias module:models/ContentResultModel
    * @class
    */
    constructor() {}

    /**
    * Constructs a <code>ContentResultModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ContentResultModel} obj Optional instance to populate.
    * @return {module:models/ContentResultModel} The populated <code>ContentResultModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ContentResultModel()

            if (data.hasOwnProperty('count')) {
                obj['count'] = ApiClient.convertToType(data['count'], 'Number')
            }
            if (data.hasOwnProperty('data')) {
                obj['data'] = ApiClient.convertToType(data['data'], [ContentModel]);
            }
            if (data.hasOwnProperty('total')) {
                obj['total'] = ApiClient.convertToType(data['total'], 'Number')
            }
        }
        return obj;
    }

    /**
    * The number of returned documents.
    * @member {Number} count
    */
    count = undefined
    /**
    * The array of content assets.
    * @member {Array.<module:models/ContentModel>} data
    */
    data = undefined
    /**
    * The total number of documents.
    * @member {Number} total
    */
    total = undefined
}
