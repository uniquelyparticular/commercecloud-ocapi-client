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
import QueryModel from './QueryModel'





/**
* The NestedQueryModel model module.
* @module models/NestedQueryModel
* @version 17.8
*/
export default class NestedQueryModel {
    /**
    * Constructs a new <code>NestedQueryModel</code>.
    * Nested query allows to query upon nested documents that are part of a larger document. The classical example is a  product master with variants (in one big document) where you want to constraint a search to masters that have  variants that match multiple constraints (like color &#x3D; blue AND size &#x3D; M).  
    * @alias module:models/NestedQueryModel
    * @class
    * @param path {String} 
    * @param query {module:models/QueryModel} 
    */

    constructor(path, query) {
        

        
        

        this['path'] = path;this['query'] = query;

        
    }

    /**
    * Constructs a <code>NestedQueryModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/NestedQueryModel} obj Optional instance to populate.
    * @return {module:models/NestedQueryModel} The populated <code>NestedQueryModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new NestedQueryModel()

            
            
            

            if (data.hasOwnProperty('path')) {
                obj['path'] = ApiClient.convertToType(data['path'], 'String')
            }
            if (data.hasOwnProperty('query')) {
                obj['query'] = QueryModel.constructFromObject(data['query']);
            }
            if (data.hasOwnProperty('score_mode')) {
                obj['score_mode'] = ApiClient.convertToType(data['score_mode'], 'String')
            }
        }
        return obj
    }

    /**
    * 
    * @member {String} path
    */
    path = undefined
    /**
    * 
    * @member {module:models/QueryModel} query
    */
    query = undefined
    /**
    * 
    * @member {module:models/NestedQueryModel.ScoreModeEnum} score_mode
    */
    score_mode = undefined






    /**
    * Allowed values for the <code>score_mode</code> property.
    * @enum {String}
    * @readonly
    */
    static ScoreModeEnum = {
    
        /**
         * value: "avg"
         * @const
         */
        "avg": "avg",
    
        /**
         * value: "total"
         * @const
         */
        "total": "total",
    
        /**
         * value: "max"
         * @const
         */
        "max": "max",
    
        /**
         * value: "none"
         * @const
         */
        "none": "none"    
    };



}


