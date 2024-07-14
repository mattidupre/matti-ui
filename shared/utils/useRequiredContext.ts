import { type Context, useContext } from 'react';

export const useRequiredContext = <T>(
  context: Context<T>,
  contextName?: string,
) => {
  const contextValue = useContext(context);
  if (contextValue === undefined) {
    throw new Error(
      `Context ${contextName ? `"${contextName}" ` : ''} not instantiated`,
    );
  }
  return contextValue;
};
