import * as crypto from 'crypto';
import { SPECIAL_SYMBOLS } from 'libs/globals/special.symbols.regex';

export const crateUserCode = (): string => {
  const code = crypto.randomBytes(6).toString('hex');

  if (SPECIAL_SYMBOLS.test(code)) {
    return crateUserCode();
  }

  return code;
};
