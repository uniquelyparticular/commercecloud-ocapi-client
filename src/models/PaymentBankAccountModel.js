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
* The PaymentBankAccountModel model module.
* @module models/PaymentBankAccountModel
* @version 17.8
*/
export default class PaymentBankAccountModel {
    /**
    * Constructs a new <code>PaymentBankAccountModel</code>.
    * Document representing a payment bank account.
    * @alias module:models/PaymentBankAccountModel
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>PaymentBankAccountModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PaymentBankAccountModel} obj Optional instance to populate.
    * @return {module:models/PaymentBankAccountModel} The populated <code>PaymentBankAccountModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PaymentBankAccountModel()

            
            
            

            if (data.hasOwnProperty('drivers_license_last_digits')) {
                obj['drivers_license_last_digits'] = ApiClient.convertToType(data['drivers_license_last_digits'], 'String')
            }
            if (data.hasOwnProperty('drivers_license_state_code')) {
                obj['drivers_license_state_code'] = ApiClient.convertToType(data['drivers_license_state_code'], 'String')
            }
            if (data.hasOwnProperty('holder')) {
                obj['holder'] = ApiClient.convertToType(data['holder'], 'String')
            }
            if (data.hasOwnProperty('masked_drivers_license')) {
                obj['masked_drivers_license'] = ApiClient.convertToType(data['masked_drivers_license'], 'String')
            }
            if (data.hasOwnProperty('masked_number')) {
                obj['masked_number'] = ApiClient.convertToType(data['masked_number'], 'String')
            }
            if (data.hasOwnProperty('number_last_digits')) {
                obj['number_last_digits'] = ApiClient.convertToType(data['number_last_digits'], 'String')
            }
        }
        return obj
    }

    /**
    * The last 4 characters of the decrypted driver's license number of the bank account associated with this payment  instrument.
    * @member {String} drivers_license_last_digits
    */
    drivers_license_last_digits = undefined
    /**
    * The driver license state code.
    * @member {String} drivers_license_state_code
    */
    drivers_license_state_code = undefined
    /**
    * The holder of the bank account.
    * @member {String} holder
    */
    holder = undefined
    /**
    * The decrypted driver's license number of the bank account with all but the last 4 characters replaced with a '*'  character.
    * @member {String} masked_drivers_license
    */
    masked_drivers_license = undefined
    /**
    * The bank account masked number.
    * @member {String} masked_number
    */
    masked_number = undefined
    /**
    * The last digits of the bank account number.
    * @member {String} number_last_digits
    */
    number_last_digits = undefined








}


