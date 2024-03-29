/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "./server/context"
import { FieldAuthorizeResolver } from "@nexus/schema/dist/plugins/fieldAuthorizePlugin"


declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  PayType: "CASH" | "WIRE"
  Role: "ADMIN" | "SELLER"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Deduction: { // root type
    id: number; // Int!
    message: string; // String!
    summary: number; // Int!
  }
  IncomingGood: { // root type
    count: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    note?: string | null; // String
    price: number; // Int!
  }
  Mutation: {};
  Product: { // root type
    count: number; // Float!
    id: number; // Int!
    name: string; // String!
    price: number; // Int!
  }
  Query: {};
  Sale: { // root type
    count: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    discount: number; // Int!
    id: number; // Int!
    name: string; // String!
    note?: string | null; // String
    payType: NexusGenEnums['PayType']; // PayType!
    price: number; // Int!
    summary: number; // Int!
  }
  Store: { // root type
    balance: number; // Int!
    id: number; // Int!
    name: string; // String!
  }
  User: { // root type
    id: number; // Int!
    name: string; // String!
    role: NexusGenEnums['Role']; // Role!
  }
  WriteOff: { // root type
    count: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    note?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Deduction: { // field return type
    id: number; // Int!
    message: string; // String!
    store: NexusGenRootTypes['Store'] | null; // Store
    summary: number; // Int!
  }
  IncomingGood: { // field return type
    count: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    note: string | null; // String
    price: number; // Int!
    store: NexusGenRootTypes['Store'] | null; // Store
  }
  Mutation: { // field return type
    addDeduction: NexusGenRootTypes['Deduction'] | null; // Deduction
    addIncomingGood: NexusGenRootTypes['IncomingGood'] | null; // IncomingGood
    addProduct: NexusGenRootTypes['Product'] | null; // Product
    addSale: NexusGenRootTypes['Sale'] | null; // Sale
    addWriteOff: NexusGenRootTypes['WriteOff'] | null; // WriteOff
    deleteProduct: NexusGenRootTypes['Product'] | null; // Product
    editProduct: NexusGenRootTypes['Product'] | null; // Product
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    signup: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
  }
  Product: { // field return type
    count: number; // Float!
    id: number; // Int!
    name: string; // String!
    price: number; // Int!
    store: NexusGenRootTypes['Store'] | null; // Store
  }
  Query: { // field return type
    deductions: Array<NexusGenRootTypes['Deduction'] | null> | null; // [Deduction]
    incomingGoods: Array<NexusGenRootTypes['IncomingGood'] | null> | null; // [IncomingGood]
    me: NexusGenRootTypes['User'] | null; // User
    product: NexusGenRootTypes['Product'] | null; // Product
    products: Array<NexusGenRootTypes['Product'] | null> | null; // [Product]
    sales: Array<NexusGenRootTypes['Sale'] | null> | null; // [Sale]
    store: NexusGenRootTypes['Store'] | null; // Store
    stores: Array<NexusGenRootTypes['Store'] | null> | null; // [Store]
    writeOffs: Array<NexusGenRootTypes['WriteOff'] | null> | null; // [WriteOff]
  }
  Sale: { // field return type
    count: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    discount: number; // Int!
    id: number; // Int!
    name: string; // String!
    note: string | null; // String
    payType: NexusGenEnums['PayType']; // PayType!
    price: number; // Int!
    store: NexusGenRootTypes['Store'] | null; // Store
    summary: number; // Int!
  }
  Store: { // field return type
    balance: number; // Int!
    id: number; // Int!
    name: string; // String!
    products: Array<NexusGenRootTypes['Product'] | null> | null; // [Product]
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  User: { // field return type
    id: number; // Int!
    name: string; // String!
    role: NexusGenEnums['Role']; // Role!
    stores: Array<NexusGenRootTypes['Store'] | null> | null; // [Store]
  }
  WriteOff: { // field return type
    count: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    note: string | null; // String
    store: NexusGenRootTypes['Store'] | null; // Store
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Deduction: { // field return type name
    id: 'Int'
    message: 'String'
    store: 'Store'
    summary: 'Int'
  }
  IncomingGood: { // field return type name
    count: 'Float'
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    note: 'String'
    price: 'Int'
    store: 'Store'
  }
  Mutation: { // field return type name
    addDeduction: 'Deduction'
    addIncomingGood: 'IncomingGood'
    addProduct: 'Product'
    addSale: 'Sale'
    addWriteOff: 'WriteOff'
    deleteProduct: 'Product'
    editProduct: 'Product'
    login: 'AuthPayload'
    signup: 'AuthPayload'
  }
  Product: { // field return type name
    count: 'Float'
    id: 'Int'
    name: 'String'
    price: 'Int'
    store: 'Store'
  }
  Query: { // field return type name
    deductions: 'Deduction'
    incomingGoods: 'IncomingGood'
    me: 'User'
    product: 'Product'
    products: 'Product'
    sales: 'Sale'
    store: 'Store'
    stores: 'Store'
    writeOffs: 'WriteOff'
  }
  Sale: { // field return type name
    count: 'Int'
    createdAt: 'DateTime'
    discount: 'Int'
    id: 'Int'
    name: 'String'
    note: 'String'
    payType: 'PayType'
    price: 'Int'
    store: 'Store'
    summary: 'Int'
  }
  Store: { // field return type name
    balance: 'Int'
    id: 'Int'
    name: 'String'
    products: 'Product'
    users: 'User'
  }
  User: { // field return type name
    id: 'Int'
    name: 'String'
    role: 'Role'
    stores: 'Store'
  }
  WriteOff: { // field return type name
    count: 'Float'
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    note: 'String'
    store: 'Store'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addDeduction: { // args
      message: string; // String!
      storeId: number; // Int!
      summary: number; // Int!
    }
    addIncomingGood: { // args
      count: number; // Int!
      name?: string | null; // String
      note?: string | null; // String
      price?: number | null; // Int
      productId?: number | null; // Int
      storeId: number; // Int!
    }
    addProduct: { // args
      count?: number | null; // Int
      name: string; // String!
      price: number; // Int!
      storeId: number; // Int!
    }
    addSale: { // args
      count: number; // Int!
      discount?: number | null; // Int
      note?: string | null; // String
      payType?: NexusGenEnums['PayType'] | null; // PayType
      productId: number; // Int!
      storeId: number; // Int!
    }
    addWriteOff: { // args
      count: number; // Int!
      note?: string | null; // String
      productId: number; // Int!
      storeId: number; // Int!
    }
    deleteProduct: { // args
      productId: number; // Int!
    }
    editProduct: { // args
      count?: number | null; // Int
      name?: string | null; // String
      price?: number | null; // Int
      productId: number; // Int!
    }
    login: { // args
      name: string; // String!
      password: string; // String!
    }
    signup: { // args
      name?: string | null; // String
      password: string; // String!
    }
  }
  Query: {
    deductions: { // args
      storeId: number; // Int!
    }
    incomingGoods: { // args
      storeId: number; // Int!
    }
    product: { // args
      productId: number; // Int!
    }
    products: { // args
      storeId: number; // Int!
    }
    sales: { // args
      storeId: number; // Int!
    }
    store: { // args
      storeId: number; // Int!
    }
    writeOffs: { // args
      storeId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}