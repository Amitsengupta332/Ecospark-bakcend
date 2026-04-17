import { ZodError } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  // Map through issues and handle the PropertyKey vs string/number mismatch
  const errorSources: TErrorSources = err.issues.map((issue) => {
    return {
      // Access the last element and ensure it's a string/number
      path: issue.path[issue.path.length - 1].toString(), 
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;