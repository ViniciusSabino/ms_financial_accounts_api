import moment from 'moment';

import validSchema from './schemas/account-schema';
import dictionary from '../utils/dictionaries';

const validAccount = (account) => {
    const currentDate = moment();

    const errors = [];

    if (!account.id) errors.push(dictionary.accountIdIsEmpty);

    if (moment(account.dueDate) < currentDate) errors.push(dictionary.accountExpired);

    if (account.amountPaid > account.value) errors.push(dictionary.amountPaidIsInvalid);

    return errors;
};

const validEdit = (context, next) => {
    const { body: account } = context.request;

    const validatedAccount = validSchema(account);

    if (Array.isArray(validatedAccount)) return context.badRequest(validatedAccount);

    const invalidAccountErrors = validAccount(account);

    if (invalidAccountErrors.length) return context.badRequest(invalidAccountErrors);

    return next();
};

export default validEdit;
