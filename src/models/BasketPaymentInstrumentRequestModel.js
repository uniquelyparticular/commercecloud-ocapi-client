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
import OrderPaymentCardRequestModel from './OrderPaymentCardRequestModel'
import PaymentBankAccountRequestModel from './PaymentBankAccountRequestModel'

/**
* The BasketPaymentInstrumentRequestModel model module.
* @module models/BasketPaymentInstrumentRequestModel
* @version 17.8
*/
export default class BasketPaymentInstrumentRequestModel {
    /**
    * Constructs a new <code>BasketPaymentInstrumentRequestModel</code>.
    * Document representing a basket payment instrument request.
    * @alias module:models/BasketPaymentInstrumentRequestModel
    * @class
    */
    constructor() {}

    /**
    * Constructs a <code>BasketPaymentInstrumentRequestModel</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:models/BasketPaymentInstrumentRequestModel} obj Optional instance to populate.
    * @return {module:models/BasketPaymentInstrumentRequestModel} The populated <code>BasketPaymentInstrumentRequestModel</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new BasketPaymentInstrumentRequestModel()

            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number')
            }
            if (data.hasOwnProperty('bank_routing_number')) {
                obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String')
            }
            if (data.hasOwnProperty('customer_payment_instrument_id')) {
                obj['customer_payment_instrument_id'] = ApiClient.convertToType(data['customer_payment_instrument_id'], 'String')
            }
            if (data.hasOwnProperty('gift_certificate_code')) {
                obj['gift_certificate_code'] = ApiClient.convertToType(data['gift_certificate_code'], 'String')
            }
            if (data.hasOwnProperty('payment_bank_account')) {
                obj['payment_bank_account'] = PaymentBankAccountRequestModel.constructFromObject(data['payment_bank_account']);
            }
            if (data.hasOwnProperty('payment_card')) {
                obj['payment_card'] = OrderPaymentCardRequestModel.constructFromObject(data['payment_card']);
            }
            if (data.hasOwnProperty('payment_method_id')) {
                obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String')
            }
        }

        return obj;
    }

    /**
    * The payment transaction amount.
    * @member {Number} amount
    */
    amount = undefined
    /**
    * The bank routing number.
    * @member {String} bank_routing_number
    */
    bank_routing_number = undefined
    /**
    * The id of a customer payment instrument.
    * @member {String} customer_payment_instrument_id
    */
    customer_payment_instrument_id = undefined
    /**
    * The gift certificate code.
    * @member {String} gift_certificate_code
    */
    gift_certificate_code = undefined
    /**
    * The payment bank account request data.
    * @member {module:models/PaymentBankAccountRequestModel} payment_bank_account
    */
    payment_bank_account = undefined
    /**
    * The payment card.
    * @member {module:models/OrderPaymentCardRequestModel} payment_card
    */
    payment_card = undefined
    /**
    * The payment method id. Optional if a customer payment instrument id is specified.
    * @member {String} payment_method_id
    */
    payment_method_id = undefined
}
