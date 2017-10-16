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
import CustomerProductListModel from './CustomerProductListModel'





/**
* The CustomerProductListResultModel model module.
* @module models/CustomerProductListResultModel
* @version 17.8
*/
export default class CustomerProductListResultModel {
    /**
    * Constructs a new <code>CustomerProductListResultModel</code>.
    * Document representing a customer product lists result.
    * @alias module:models/CustomerProductListResultModel
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>CustomerProductListResultModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerProductListResultModel} obj Optional instance to populate.
    * @return {module:models/CustomerProductListResultModel} The populated <code>CustomerProductListResultModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CustomerProductListResultModel()

            
            
            

            if (data.hasOwnProperty('count')) {
                obj['count'] = ApiClient.convertToType(data['count'], 'Number')
            }
            if (data.hasOwnProperty('data')) {
                obj['data'] = ApiClient.convertToType(data['data'], [CustomerProductListModel]);
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
    * The customer product lists.
    * @member {Array.<module:models/CustomerProductListModel>} data
    */
    data = undefined
    /**
    * The total number of documents.
    * @member {Number} total
    */
    total = undefined








}


