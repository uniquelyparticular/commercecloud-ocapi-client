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

/**
* The Category model module.
* @module models/Category
* @version 17.8
*/
export default class Category {
    /**
    * Constructs a new <code>Category</code>.
    * Document representing a category.
    * @alias module:models/Category
    * @class
    */
    constructor() {
        /**
        * Array of subcategories. Can be empty.
        * @member {Array.<module:models/Category>} categories
        */
        this.categories = undefined

        /**
        * The localized description of the category.
        * @member {String} description
        */
        this.description = undefined

        /**
        * The id of the category.
        * @member {String} id
        */
        this.id = undefined

        /**
        * The URL to the category image.
        * @member {String} image
        */
        this.image = undefined

        /**
        * The localized name of the category.
        * @member {String} name
        */
        this.name = undefined

        /**
        * The localized page description of the category.
        * @member {String} page_description
        */
        this.page_description = undefined

        /**
        * The localized page keywords of the category.
        * @member {String} page_keywords
        */
        this.page_keywords = undefined

        /**
        * The localized page title of the category.
        * @member {String} page_title
        */
        this.page_title = undefined

        /**
        * The id of the parent category.
        * @member {String} parent_category_id
        */
        this.parent_category_id = undefined

        /**
        * The URL to the category thumbnail.
        * @member {String} thumbnail
        */
        this.thumbnail = undefined
    }

    /**
    * Constructs a <code>Category</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/Category} obj Optional instance to populate.
    * @return {module:models/Category} The populated <code>Category</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Category()

            if (data.hasOwnProperty('categories')) {
                obj['categories'] = ApiClient.convertToType(data['categories'], [Category])
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String')
            }
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String')
            }
            if (data.hasOwnProperty('image')) {
                obj['image'] = ApiClient.convertToType(data['image'], 'String')
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String')
            }
            if (data.hasOwnProperty('page_description')) {
                obj['page_description'] = ApiClient.convertToType(data['page_description'], 'String')
            }
            if (data.hasOwnProperty('page_keywords')) {
                obj['page_keywords'] = ApiClient.convertToType(data['page_keywords'], 'String')
            }
            if (data.hasOwnProperty('page_title')) {
                obj['page_title'] = ApiClient.convertToType(data['page_title'], 'String')
            }
            if (data.hasOwnProperty('parent_category_id')) {
                obj['parent_category_id'] = ApiClient.convertToType(data['parent_category_id'], 'String')
            }
            if (data.hasOwnProperty('thumbnail')) {
                obj['thumbnail'] = ApiClient.convertToType(data['thumbnail'], 'String')
            }
        }

        return obj
    }
}