import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Map "mo:base/RBTree";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";

actor class Store() {
    class Admins() {
        type Id = Int;
        type Passwd = Text;
        type Hash = Nat32;

        // this one is gen by motoko library which is the hash of the root key
        let root : Hash = 3942938295;

        // all password is gen by blake3 hash function
        var admins = Map.RBTree<Id, Passwd>(Int.compare);
        var incre : Int = 0;

        public func put(passwd : Passwd, rootPasswd : [Nat32]) : Int {
            let passHash : Hash = Hash.hashNat8(rootPasswd);
            if (Hash.equal(passHash, root)) {
                admins.put(incre, passwd);
                incre += 1;
                incre - 1
            } else {
                -1
            }
        };

        public func verify(id: Id, passwd : Passwd) : Bool {
            var res : Bool = false;
            switch(admins.get(id)) {
                case (?passwd_db) {
                    if (passwd == passwd_db) res := true;
                };
                case _ { res := false };
            };
            res
        };

        public func count() : Int {
            incre
        }
    };

    class Merchant(merchant_name: Text, merchant_info: Text, merchant_key: Text) {
        type Id = Int;

        let name = merchant_name;
        let key = merchant_key;
        let roll_in_time = Time.now();
        let info = merchant_info;


        var commodies : [Nat] = [];
        var count : Nat = 0;
        
        public func put_commody(id: Nat, manage_key: Text) : Bool {
            if(key != manage_key)  return false;
            commodies := Array.append<Nat>(commodies, [id]);
            count += 1;
            true
        };

        public func get_info() : Text {
            return info;
        };

        public func get_commodies() : [Nat] {
            commodies
        };

        public func commody_count() : Nat {
            count
        };
    };


    class Merchants() {
        type Id = Int;

        var incre : Int = 0;
        var merchants = Map.RBTree<Id, Merchant>(Int.compare);

        public func put(merchant: Merchant) : Id {
            merchants.put(incre, merchant);
            incre += 1;
            incre - 1
        };

        public func update(id: Id, merchant: Merchant) : ?Merchant {
            merchants.replace(id, merchant)
        };

        public func get(id: Id) : ?Merchant {
            merchants.get(id)
        };

        public func count() : Int {
            incre
        };
    };

    type Id = Nat;
    type Info = Text;
    type MerchantId = Nat;

    var incre : Nat = 0;
    var store = Map.RBTree<Id, Info>(Nat.compare);

    let merchants : Merchants = Merchants();
    let admins : Admins = Admins(); 

    public query func commody_count() : async Nat {
        incre
    };

    public query func merchant_count() : async Int {
        merchants.count()
    };

    public query func admin_count() : async Int {
        admins.count()
    };

    public func put(info: Info, merchant_id: MerchantId, key: Text) : async (Bool, Nat) {
        // check merchant's existance
        var merchant : Merchant = Merchant("", "", "");
        switch(merchants.get(merchant_id)) {
            case (?mer) {
                merchant := mer;
            };
            case _ return (false, 0);
        };

        // verify key and put commody id
        if(merchant.put_commody(incre, key) == false) {
            return (false, 1);
        };

        // update merchant
        ignore(merchants.update(merchant_id, merchant));
        store.put(incre, info);
        incre += 1;
        (true, incre-1)
    };

    public query func get_commodies(merchant_id: MerchantId) : async [Nat] {
        var merchant : Merchant = Merchant("", "", "");
        switch(merchants.get(merchant_id)) {
            case (?mer) {
                merchant := mer;
            };
            case _ return [];
        };

        merchant.get_commodies()
    };

    public query func get_commody(id: Id) : async Text {
        switch(store.get(id)) {
            case(?info) info;
            case _ "";
        }
    };

    public func put_merchant(name: Text, info: Text, key: Text, admin_id: Int, admin_key: Text) : async Int {
        if(admins.verify(admin_id, admin_key) == false) return -1;

        // put merchant then return id of it
        let merchant : Merchant = Merchant(name, info, key);
        merchants.put(merchant)
    };

    public func put_admin(amdin_key: Text, root_key: [Nat32]) : async Int {
        let res = admins.put(amdin_key, root_key);
        return res;
    };

    public query func get_merchant_info(id: MerchantId) : async Text {
        var merchant : (Bool, Merchant) = get_merchant(id);

        merchant.1.get_info()
    };

    private func get_merchant(id: MerchantId) : (Bool, Merchant) {
        var merchant : Merchant = Merchant("", "", "");
        switch(merchants.get(id)) {
            case (?mer) return (true, mer);
            case _ return (false, merchant);
        }
    };

    public query func merchant_commody_count(id: MerchantId) : async Nat {
        let mer : (Bool, Merchant) = get_merchant(id);
        if (mer.0 == false) return 0;

        mer.1.commody_count()
    };
};