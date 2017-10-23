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
* The QueryModel model module.
* @module models/QueryModel
* @version 17.8
*/
export default class QueryModel {
    /**
    * Constructs a new <code>QueryModel</code>.
    * A boolean query allows to construct full logical expression trees consisting of other queries (usually term and text  queries). A boolean query basically has 3 sets of clauses that &#39;must&#39;, &#39;should&#39; and / or &#39;must not&#39; match.  If &#39;must&#39;,  &#39;must_not&#39;, or &#39;should&#39; appear in the same boolean query, they are combined logically using the AND operator.
    * @alias module:models/QueryModel
    * @class
    */

    constructor() {
    }

    /**
    * Constructs a <code>QueryModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/QueryModel} obj Optional instance to populate.
    * @return {module:models/QueryModel} The populated <code>QueryModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new QueryModel()

            if (data.hasOwnProperty('must')) {
                obj['must'] = ApiClient.convertToType(data['must'], [QueryModel]);
            }
            if (data.hasOwnProperty('must_not')) {
                obj['must_not'] = ApiClient.convertToType(data['must_not'], [QueryModel]);
            }
            if (data.hasOwnProperty('should')) {
                obj['should'] = ApiClient.convertToType(data['should'], [QueryModel]);
            }
        }

        return obj
    }

    /**
    * List of queries, which must match.
    * @member {Array.<module:models/QueryModel>} must
    */
    must = undefined

    /**
    * List of queries, which must not match.
    * @member {Array.<module:models/QueryModel>} must_not
    */
    must_not = undefined

    /**
    * List of queries, which should match.
    * @member {Array.<module:models/QueryModel>} should
    */
    should = undefined
}
