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


import ApiClient from "../ApiClient";
import PublicProductListItemModel from '../models/PublicProductListItemModel'
import PublicProductListItemResultModel from '../models/PublicProductListItemResultModel'
import PublicProductListModel from '../models/PublicProductListModel'
import PublicProductListResultModel from '../models/PublicProductListResultModel'

/**
* Product_lists service.
* @module api/ProductListsApi
* @version 17.8
*/
export default class ProductListsApi {

    /**
    * Constructs a new ProductListsApi. 
    * @alias module:api/ProductListsApi
    * @class
    * @param {module:ApiClient} apiClient Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance
    }



    /**
     * Retrieves all public product lists as defined by the given search term (email, first name, last name).
     * @param {Object} opts Optional parameters
     * @param {String} opts.email The email address of the customer, the product lists belong to.
     * @param {String} opts.firstname The first name of the customer, the product lists belong to.
     * @param {String} opts.lastname The last name of the customer, the product lists belong to.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PublicProductListResultModel} and HTTP response
     */
    getProductListsWithHttpInfo(opts) {
      opts = opts || {}
      let postBody = null


      let pathParams = {
      }
      let queryParams = {
        'email': opts['email'],
        'firstname': opts['firstname'],
        'lastname': opts['lastname']
      }
      let headerParams = {
      }
      let formParams = {
      }

      let authNames = ['client_id', 'customers_auth']
      let contentTypes = ['application/json', 'text/xml', 'application/xml']
      let accepts = ['application/json', 'text/xml', 'application/xml']
      let returnType = PublicProductListResultModel

      return this.apiClient.callApi(
        '/product_lists', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      )
    }

    /**
     * Retrieves all public product lists as defined by the given search term (email, first name, last name).
     * @param {Object} opts Optional parameters
     * @param {String} opts.email The email address of the customer, the product lists belong to.
     * @param {String} opts.firstname The first name of the customer, the product lists belong to.
     * @param {String} opts.lastname The last name of the customer, the product lists belong to.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PublicProductListResultModel}
     */
    getProductLists(opts) {
      return this.getProductListsWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data
        })
    }


    /**
     * Retrieves a public product list by id.
     * @param {String} listId The id of the list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PublicProductListModel} and HTTP response
     */
    getProductListsByIDWithHttpInfo(listId, opts) {
      opts = opts || {}
      let postBody = null

      // verify the required parameter 'listId' is set
      if (listId === undefined || listId === null) {
        throw new Error("Missing the required parameter 'listId' when calling getProductListsByID")
      }


      let pathParams = {
        'list_id': listId
      }
      let queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      }
      let headerParams = {
      }
      let formParams = {
      }

      let authNames = ['client_id', 'customers_auth']
      let contentTypes = ['application/json', 'text/xml', 'application/xml']
      let accepts = ['application/json', 'text/xml', 'application/xml']
      let returnType = PublicProductListModel

      return this.apiClient.callApi(
        '/product_lists/{list_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      )
    }

    /**
     * Retrieves a public product list by id.
     * @param {String} listId The id of the list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PublicProductListModel}
     */
    getProductListsByID(listId, opts) {
      return this.getProductListsByIDWithHttpInfo(listId, opts)
        .then(function(response_and_data) {
          return response_and_data.data
        })
    }


    /**
     * Retrieves the items of a public product list.
     * @param {String} listId The id of the list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PublicProductListItemResultModel} and HTTP response
     */
    getProductListsByIDItemsWithHttpInfo(listId, opts) {
      opts = opts || {}
      let postBody = null

      // verify the required parameter 'listId' is set
      if (listId === undefined || listId === null) {
        throw new Error("Missing the required parameter 'listId' when calling getProductListsByIDItems")
      }


      let pathParams = {
        'list_id': listId
      }
      let queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      }
      let headerParams = {
      }
      let formParams = {
      }

      let authNames = ['client_id', 'customers_auth']
      let contentTypes = ['application/json', 'text/xml', 'application/xml']
      let accepts = ['application/json', 'text/xml', 'application/xml']
      let returnType = PublicProductListItemResultModel

      return this.apiClient.callApi(
        '/product_lists/{list_id}/items', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      )
    }

    /**
     * Retrieves the items of a public product list.
     * @param {String} listId The id of the list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PublicProductListItemResultModel}
     */
    getProductListsByIDItems(listId, opts) {
      return this.getProductListsByIDItemsWithHttpInfo(listId, opts)
        .then(function(response_and_data) {
          return response_and_data.data
        })
    }


    /**
     * Retrieves an item from a public product list.
     * @param {String} listId The id of the list.
     * @param {String} itemId The id of the item.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:models/PublicProductListItemModel} and HTTP response
     */
    getProductListsByIDItemsByIDWithHttpInfo(listId, itemId, opts) {
      opts = opts || {}
      let postBody = null

      // verify the required parameter 'listId' is set
      if (listId === undefined || listId === null) {
        throw new Error("Missing the required parameter 'listId' when calling getProductListsByIDItemsByID")
      }

      // verify the required parameter 'itemId' is set
      if (itemId === undefined || itemId === null) {
        throw new Error("Missing the required parameter 'itemId' when calling getProductListsByIDItemsByID")
      }


      let pathParams = {
        'list_id': listId,
        'item_id': itemId
      }
      let queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      }
      let headerParams = {
      }
      let formParams = {
      }

      let authNames = ['client_id', 'customers_auth']
      let contentTypes = ['application/json', 'text/xml', 'application/xml']
      let accepts = ['application/json', 'text/xml', 'application/xml']
      let returnType = PublicProductListItemModel

      return this.apiClient.callApi(
        '/product_lists/{list_id}/items/{item_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      )
    }

    /**
     * Retrieves an item from a public product list.
     * @param {String} listId The id of the list.
     * @param {String} itemId The id of the item.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:models/PublicProductListItemModel}
     */
    getProductListsByIDItemsByID(listId, itemId, opts) {
      return this.getProductListsByIDItemsByIDWithHttpInfo(listId, itemId, opts)
        .then(function(response_and_data) {
          return response_and_data.data
        })
    }


}
