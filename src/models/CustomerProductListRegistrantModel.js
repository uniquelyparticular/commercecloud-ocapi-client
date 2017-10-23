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
* The CustomerProductListRegistrantModel model module.
* @module models/CustomerProductListRegistrantModel
* @version 17.8
*/
export default class CustomerProductListRegistrantModel {
    /**
    * Constructs a new <code>CustomerProductListRegistrantModel</code>.
    * Document representing a customer product list registrant.
    * @alias module:models/CustomerProductListRegistrantModel
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>CustomerProductListRegistrantModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/CustomerProductListRegistrantModel} obj Optional instance to populate.
    * @return {module:models/CustomerProductListRegistrantModel} The populated <code>CustomerProductListRegistrantModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CustomerProductListRegistrantModel()

            
            
            

            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String')
            }
            if (data.hasOwnProperty('first_name')) {
                obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String')
            }
            if (data.hasOwnProperty('last_name')) {
                obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String')
            }
            if (data.hasOwnProperty('role')) {
                obj['role'] = ApiClient.convertToType(data['role'], 'String')
            }
        }
        return obj
    }

    /**
    * The email of the registrant.
    * @member {String} email
    */
    email = undefined
    /**
    * The first name of the registrant.
    * @member {String} first_name
    */
    first_name = undefined
    /**
    * The last name of the registrant.
    * @member {String} last_name
    */
    last_name = undefined
    /**
    * The role of the registrant.
    * @member {String} role
    */
    role = undefined








}


