/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable dot-notation */
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
import SuggestedTerm from './SuggestedTerm'

/**
* The SuggestedTerms model module.
* @module models/SuggestedTerms
* @version 17.8
*/
export default class SuggestedTerms {
    /**
    * Constructs a new <code>SuggestedTerms</code>.
    * Document representing a list of suggested terms for each term of a search phrase.
    * @alias module:models/SuggestedTerms
    * @class
    */
    constructor() {
        /**
        * Returns the original term that the suggested terms relates to.
        * @member {String} original_term
        */
        this.original_term = undefined

        /**
        * Returns the suggested terms.
        * @member {Array.<module:models/SuggestedTerm>} terms
        */
        this.terms = undefined
    }

    /**
    * Constructs a <code>SuggestedTerms</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/SuggestedTerms} obj Optional instance to populate.
    * @return {module:models/SuggestedTerms} The populated <code>SuggestedTerms</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SuggestedTerms()

            if (data.hasOwnProperty('original_term')) {
                obj['original_term'] = ApiClient.convertToType(data['original_term'], 'String')
            }
            if (data.hasOwnProperty('terms')) {
                obj['terms'] = ApiClient.convertToType(data['terms'], [SuggestedTerm])
            }
        }

        return obj
    }
}
