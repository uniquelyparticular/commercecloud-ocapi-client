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
* The TermQueryModel model module.
* @module models/TermQueryModel
* @version 17.8
*/
export default class TermQueryModel {
    /**
    * Constructs a new <code>TermQueryModel</code>.
    * A term query matches one (or more) value(s) against one (or more) document field(s). A document is considered a hit  if one of the values matches (exactly) with at least one of the given fields.  The operator \&quot;is\&quot; can only take  one value, while \&quot;one_of\&quot; can take multiple. If multiple fields are specified, they are combined using the OR operator.  
    * @alias module:models/TermQueryModel
    * @class
    * @param fields {Array.<String>} The document field(s), the value(s) are matched against, combined with the operator.
    * @param operator {module:models/TermQueryModel.OperatorEnum} Returns the operator to use for the term query.
    */

    constructor(fields, operator) {
        

        
        

        this['fields'] = fields;this['operator'] = operator;

        
    }

    /**
    * Constructs a <code>TermQueryModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/TermQueryModel} obj Optional instance to populate.
    * @return {module:models/TermQueryModel} The populated <code>TermQueryModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TermQueryModel()

            
            
            

            if (data.hasOwnProperty('fields')) {
                obj['fields'] = ApiClient.convertToType(data['fields'], ['String']);
            }
            if (data.hasOwnProperty('operator')) {
                obj['operator'] = ApiClient.convertToType(data['operator'], 'String')
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], [Object]);
            }
        }
        return obj;
    }

    /**
    * The document field(s), the value(s) are matched against, combined with the operator.
    * @member {Array.<String>} fields
    */
    fields = undefined
    /**
    * Returns the operator to use for the term query.
    * @member {module:models/TermQueryModel.OperatorEnum} operator
    */
    operator = undefined
    /**
    * The values, the field(s) are compared against, combined with the operator.
    * @member {Array.<Object>} values
    */
    values = undefined






    /**
    * Allowed values for the <code>operator</code> property.
    * @enum {String}
    * @readonly
    */
    static OperatorEnum = {
    
        /**
         * value: "is"
         * @const
         */
        "is": "is",
    
        /**
         * value: "one_of"
         * @const
         */
        "one_of": "one_of",
    
        /**
         * value: "is_null"
         * @const
         */
        "is_null": "is_null",
    
        /**
         * value: "is_not_null"
         * @const
         */
        "is_not_null": "is_not_null",
    
        /**
         * value: "less"
         * @const
         */
        "less": "less",
    
        /**
         * value: "greater"
         * @const
         */
        "greater": "greater",
    
        /**
         * value: "not_in"
         * @const
         */
        "not_in": "not_in",
    
        /**
         * value: "neq"
         * @const
         */
        "neq": "neq"    
    };



}


