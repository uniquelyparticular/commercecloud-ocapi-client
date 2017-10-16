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
* The PasswordChangeRequestModel model module.
* @module models/PasswordChangeRequestModel
* @version 17.8
*/
export default class PasswordChangeRequestModel {
    /**
    * Constructs a new <code>PasswordChangeRequestModel</code>.
    * Document representing a password change request.
    * @alias module:models/PasswordChangeRequestModel
    * @class
    * @param currentPassword {String} The customer's current password.
    * @param password {String} The customer's new password.
    */

    constructor(currentPassword, password) {
        

        
        

        this['current_password'] = currentPassword;this['password'] = password;

        
    }

    /**
    * Constructs a <code>PasswordChangeRequestModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/PasswordChangeRequestModel} obj Optional instance to populate.
    * @return {module:models/PasswordChangeRequestModel} The populated <code>PasswordChangeRequestModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PasswordChangeRequestModel()

            
            
            

            if (data.hasOwnProperty('current_password')) {
                obj['current_password'] = ApiClient.convertToType(data['current_password'], 'String')
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String')
            }
        }
        return obj;
    }

    /**
    * The customer's current password.
    * @member {String} current_password
    */
    current_password = undefined
    /**
    * The customer's new password.
    * @member {String} password
    */
    password = undefined








}


