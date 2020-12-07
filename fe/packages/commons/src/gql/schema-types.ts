import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { ServerContext } from "../types/db";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type Country = {
  __typename?: "Country";
  id: Scalars["ID"];
  country_name: Scalars["String"];
  country_code: Scalars["String"];
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Currency = {
  __typename?: "Currency";
  id: Scalars["ID"];
  currency_name: Scalars["String"];
  currency_code: Scalars["String"];
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type PaginationInput = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  startCursor: Scalars["String"];
  endCursor: Scalars["String"];
  hasPreviousPage: Scalars["Boolean"];
  hasNextPage: Scalars["Boolean"];
};

export type CountryEdge = {
  __typename?: "CountryEdge";
  node: Country;
  cursor: Scalars["String"];
};

export type CountryConnection = {
  __typename?: "CountryConnection";
  entries: Array<Maybe<CountryEdge>>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: "Query";
  listCountries: Array<Maybe<Country>>;
  listCurrencies: Array<Maybe<Currency>>;
};

export type QueryListCountriesArgs = {
  paginationInput: PaginationInput;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Country: ResolverTypeWrapper<Country>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Currency: ResolverTypeWrapper<Currency>;
  PaginationInput: PaginationInput;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CountryEdge: ResolverTypeWrapper<CountryEdge>;
  CountryConnection: ResolverTypeWrapper<CountryConnection>;
  Query: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars["Date"];
  DateTime: Scalars["DateTime"];
  Country: Country;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Currency: Currency;
  PaginationInput: PaginationInput;
  Int: Scalars["Int"];
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  CountryEdge: CountryEdge;
  CountryConnection: CountryConnection;
  Query: {};
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type CountryResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Country"] = ResolversParentTypes["Country"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  country_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  country_code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  insertedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Currency"] = ResolversParentTypes["Currency"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  currency_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  currency_code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  insertedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
  startCursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  endCursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryEdgeResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["CountryEdge"] = ResolversParentTypes["CountryEdge"]
> = {
  node?: Resolver<ResolversTypes["Country"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryConnectionResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["CountryConnection"] = ResolversParentTypes["CountryConnection"]
> = {
  entries?: Resolver<
    Array<Maybe<ResolversTypes["CountryEdge"]>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  listCountries?: Resolver<
    Array<Maybe<ResolversTypes["Country"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryListCountriesArgs, "paginationInput">
  >;
  listCurrencies?: Resolver<
    Array<Maybe<ResolversTypes["Currency"]>>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = ServerContext> = {
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Country?: CountryResolvers<ContextType>;
  Currency?: CurrencyResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  CountryEdge?: CountryEdgeResolvers<ContextType>;
  CountryConnection?: CountryConnectionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ServerContext> = Resolvers<ContextType>;
