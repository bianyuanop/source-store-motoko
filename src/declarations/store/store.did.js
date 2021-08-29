export const idlFactory = ({ IDL }) => {
  const MerchantId = IDL.Nat;
  const Id = IDL.Nat;
  const Info = IDL.Text;
  const Store = IDL.Service({
    'admin_count' : IDL.Func([], [IDL.Int], ['query']),
    'commody_count' : IDL.Func([], [IDL.Nat], ['query']),
    'get_commodies' : IDL.Func([MerchantId], [IDL.Vec(IDL.Nat)], ['query']),
    'get_commody' : IDL.Func([Id], [IDL.Text], ['query']),
    'get_merchant_info' : IDL.Func([MerchantId], [IDL.Text], ['query']),
    'merchant_commody_count' : IDL.Func([MerchantId], [IDL.Nat], ['query']),
    'merchant_count' : IDL.Func([], [IDL.Int], ['query']),
    'put' : IDL.Func([Info, MerchantId, IDL.Text], [IDL.Bool, IDL.Nat], []),
    'put_admin' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat32)], [IDL.Int], []),
    'put_merchant' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [IDL.Int],
        [],
      ),
  });
  return Store;
};
export const init = ({ IDL }) => { return []; };
