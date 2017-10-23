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
* The FilterModel model module.
* @module models/FilterModel
* @version 17.8
*/
export default class FilterModel {
    /**
    * Constructs a new <code>FilterModel</code>.
    * Document representing a boolean filter.
    * @alias module:models/FilterModel
    * @class
    * @param operator {module:models/FilterModel.OperatorEnum} The logical operator the filters are combined with.
    */

    constructor(operator) {
        this['operator'] = operator;
    }

    /**
    * Constructs a <code>FilterModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/FilterModel} obj Optional instance to populate.
    * @return {module:models/FilterModel} The populated <code>FilterModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new FilterModel()

            if (data.hasOwnProperty('operator')) {
                obj['operator'] = ApiClient.convertToType(data['operator'], 'String')
            }
        }

        return obj
    }

    /**
    * The logical operator the filters are combined with.
    * @member {module:models/FilterModel.OperatorEnum} operator
    */
    operator = undefined

    /**
    * Allowed values for the <code>operator</code> property.
    * @enum {String}
    * @readonly
    */
    static OperatorEnum = {

        /**
         * value: "and"
         * @const
         */
        "and": "and",

        /**
         * value: "or"
         * @const
         */
        "or": "or",

        /**
         * value: "not"
         * @const
         */
        "not": "not"
    };
}
