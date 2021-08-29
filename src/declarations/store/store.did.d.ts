import type { Principal } from '@dfinity/principal';
export type Id = bigint;
export type Info = string;
export type MerchantId = bigint;
export interface Store {
  'admin_count' : () => Promise<bigint>,
  'commody_count' : () => Promise<bigint>,
  'get_commodies' : (arg_0: MerchantId) => Promise<Array<bigint>>,
  'get_commody' : (arg_0: Id) => Promise<string>,
  'get_merchant_info' : (arg_0: MerchantId) => Promise<string>,
  'merchant_commody_count' : (arg_0: MerchantId) => Promise<bigint>,
  'merchant_count' : () => Promise<bigint>,
  'put' : (arg_0: Info, arg_1: MerchantId, arg_2: string) => Promise<
      [boolean, bigint]
    >,
  'put_admin' : (arg_0: string, arg_1: Array<number>) => Promise<bigint>,
  'put_merchant' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: bigint,
      arg_4: string,
    ) => Promise<bigint>,
}
export interface _SERVICE extends Store {}
