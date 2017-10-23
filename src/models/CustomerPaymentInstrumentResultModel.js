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
import CustomerPaymentInstrumentModel from './CustomerPaymentInstrumentModel'





/**
* The CustomerPaymentInstrumentResultModel model module.
* @module models/CustomerPaymentInstrumentResultModel
* @version 17.8
*/
export default class CustomerPaymentInstrumentResultModel {
    /**
    * Constructs a new <code>CustomerPaymentInstrumentResultModel</code>.
    * Document representing a customer payment instrument result. The payment data contained is masked where needed for security purposes.
    * @alias module:models/CustomerPaymentInstrumentResultModel
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>CustomerPaymentInstrumentResultModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerPaymentInstrumentResultModel} obj Optional instance to populate.
    * @return {module:models/CustomerPaymentInstrumentResultModel} The populated <code>CustomerPaymentInstrumentResultModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CustomerPaymentInstrumentResultModel()

            
            
            

            if (data.hasOwnProperty('count')) {
                obj['count'] = ApiClient.convertToType(data['count'], 'Number')
            }
            if (data.hasOwnProperty('data')) {
                obj['data'] = ApiClient.convertToType(data['data'], [CustomerPaymentInstrumentModel]);
            }
            if (data.hasOwnProperty('total')) {
                obj['total'] = ApiClient.convertToType(data['total'], 'Number')
            }
        }
        return obj
    }

    /**
    * The number of returned documents.
    * @member {Number} count
    */
    count = undefined
    /**
    * The customer payment instruments list.
    * @member {Array.<module:models/CustomerPaymentInstrumentModel>} data
    */
    data = undefined
    /**
    * The total number of documents.
    * @member {Number} total
    */
    total = undefined








}


