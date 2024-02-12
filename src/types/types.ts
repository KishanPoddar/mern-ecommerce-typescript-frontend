export type User = {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
};

export type Product = {
    _id: string;
    name: string;
    category: string;
    photo: string;
    price: number;
    stock: number;
};

export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
};

export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {
        name: string;
        _id: string;
    };
    _id: string;
};

type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
};

type LatestTransation = {
    _id: string;
    amount: number;
    discount: number;
    quantity: number;
    status: string;
};

export type Stats = {
    categoryCount: Record<string, number>[];
    percentChange: CountAndChange;
    count: CountAndChange;
    chart: {
        order: number[];
        revenue: number[];
    };
    userRatio: {
        male: number;
        female: number;
    };
    latestTransation: LatestTransation[];
};

type OrderFulfillment = {
    processing: number;
    shipped: number;
    delivered: number;
};

type RevenueDistribution = {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
};

type UsersAgeGroup = {
    teen: number;
    adult: number;
    old: number;
};

export type Pie = {
    orderFullfillment: OrderFulfillment;
    productCategories: Record<string, number>[];
    stockAvailability: {
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution: RevenueDistribution;
    usersAgeGroup: UsersAgeGroup;
    adminCustomer: {
        admin: number;
        customer: number;
    };
};

export type Bar = {
    products: number[];
    users: number[];
    orders: number[];
};

export type Line = {
    products: number[];
    users: number[];
    discount: number[];
    revenue: number[];
};
