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
* The ImageModel model module.
* @module models/ImageModel
* @version 17.8
*/
export default class ImageModel {
    /**
    * Constructs a new <code>ImageModel</code>.
    * @alias module:models/ImageModel
    * @class
    * @param link {String} 
    */

    constructor(link) {
        

        
        

        this['link'] = link;

        
    }

    /**
    * Constructs a <code>ImageModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/ImageModel} obj Optional instance to populate.
    * @return {module:models/ImageModel} The populated <code>ImageModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ImageModel()

            
            
            

            if (data.hasOwnProperty('alt')) {
                obj['alt'] = ApiClient.convertToType(data['alt'], 'String')
            }
            if (data.hasOwnProperty('dis_base_link')) {
                obj['dis_base_link'] = ApiClient.convertToType(data['dis_base_link'], 'String')
            }
            if (data.hasOwnProperty('link')) {
                obj['link'] = ApiClient.convertToType(data['link'], 'String')
            }
            if (data.hasOwnProperty('title')) {
                obj['title'] = ApiClient.convertToType(data['title'], 'String')
            }
        }
        return obj
    }

    /**
    * @member {String} alt
    */
    alt = undefined
    /**
    * @member {String} dis_base_link
    */
    dis_base_link = undefined
    /**
    * @member {String} link
    */
    link = undefined
    /**
    * @member {String} title
    */
    title = undefined








}


