import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { CountryEntity, CurrencyEntity } from "@ta/cm/src/types";
import { ServerContext } from "./types/index";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type Owner = {
  __typename?: "Owner";
  ownerId: Scalars["ID"];
  email: Scalars["String"];
  jwt: Scalars["String"];
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Country = {
  __typename?: "Country";
  id: Scalars["ID"];
  countryName: Scalars["String"];
  countryCode: Scalars["String"];
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Currency = {
  __typename?: "Currency";
  id: Scalars["ID"];
  currencyName: Scalars["String"];
  currencyCode: Scalars["String"];
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UnitOfMeasure = {
  __typename?: "UnitOfMeasure";
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  shortName: Scalars["String"];
  longName?: Maybe<Scalars["String"]>;
};

export type UnitOfMeasureTag = {
  __typename?: "UnitOfMeasureTag";
  unitOfMeasureId: Scalars["ID"];
  text: Scalars["String"];
};

export type Branch = {
  __typename?: "Branch";
  id: Scalars["ID"];
  postCode: Scalars["String"];
  street: Scalars["String"];
  city: Scalars["String"];
  branchAlias?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Brand = {
  __typename?: "Brand";
  id: Scalars["ID"];
  name: Scalars["String"];
  countryId: Scalars["ID"];
  country: Country;
  currencyId: Scalars["ID"];
  currency: Currency;
  phone?: Maybe<Scalars["String"]>;
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type ArticleInfo = {
  __typename?: "ArticleInfo";
  id: Scalars["ID"];
  branchGroupId: Scalars["ID"];
  unitPrice: Scalars["Float"];
  discount?: Maybe<Scalars["Float"]>;
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  tags: Array<Maybe<Tag>>;
  comments: Array<Maybe<Comment>>;
};

export type Article = {
  __typename?: "Article";
  id: Scalars["ID"];
  name: Scalars["String"];
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  unitOfMeasure: UnitOfMeasure;
  info: Array<Maybe<ArticleInfo>>;
  tags: Array<Maybe<Tag>>;
  comments: Array<Maybe<Comment>>;
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"];
  text: Scalars["String"];
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["ID"];
  text: Scalars["String"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
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
  edges: Array<Maybe<CountryEdge>>;
  pageInfo: PageInfo;
};

export type BranchEdge = {
  __typename?: "BranchEdge";
  node: Branch;
  cursor: Scalars["String"];
};

export type BranchConnection = {
  __typename?: "BranchConnection";
  edges: Array<Maybe<BranchEdge>>;
  pageInfo: PageInfo;
};

export type BrandEdge = {
  __typename?: "BrandEdge";
  node: Brand;
  cursor: Scalars["String"];
};

export type BrandConnection = {
  __typename?: "BrandConnection";
  edges: Array<Maybe<BrandEdge>>;
  pageInfo: PageInfo;
};

export type SignupUnion = SignupSuccess | SignupErrors;

export type SignupSuccess = {
  __typename?: "SignupSuccess";
  owner: Owner;
};

export type SignupErrors = {
  __typename?: "SignupErrors";
  errors: Array<Scalars["String"]>;
};

export type SignupInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  repeatPassword: Scalars["String"];
};

export type PaginationInput = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  listCountries: CountryConnection;
  listCurrencies: Array<Maybe<Currency>>;
  listBranches: BranchConnection;
  listBrands: BrandConnection;
};

export type QueryListCountriesArgs = {
  paginationInput: PaginationInput;
};

export type QueryListBranchesArgs = {
  paginationInput: PaginationInput;
};

export type QueryListBrandsArgs = {
  paginationInput: PaginationInput;
};

export type Mutation = {
  __typename?: "Mutation";
  signup?: Maybe<SignupUnion>;
};

export type MutationSignupArgs = {
  input: SignupInput;
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
  Owner: ResolverTypeWrapper<Owner>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Country: ResolverTypeWrapper<CountryEntity>;
  Currency: ResolverTypeWrapper<CurrencyEntity>;
  UnitOfMeasure: ResolverTypeWrapper<UnitOfMeasure>;
  UnitOfMeasureTag: ResolverTypeWrapper<UnitOfMeasureTag>;
  Branch: ResolverTypeWrapper<Branch>;
  Brand: ResolverTypeWrapper<
    Omit<Brand, "country" | "currency"> & {
      country: ResolversTypes["Country"];
      currency: ResolversTypes["Currency"];
    }
  >;
  ArticleInfo: ResolverTypeWrapper<ArticleInfo>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Article: ResolverTypeWrapper<Article>;
  Tag: ResolverTypeWrapper<Tag>;
  Comment: ResolverTypeWrapper<Comment>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CountryEdge: ResolverTypeWrapper<
    Omit<CountryEdge, "node"> & { node: ResolversTypes["Country"] }
  >;
  CountryConnection: ResolverTypeWrapper<
    Omit<CountryConnection, "edges"> & {
      edges: Array<Maybe<ResolversTypes["CountryEdge"]>>;
    }
  >;
  BranchEdge: ResolverTypeWrapper<BranchEdge>;
  BranchConnection: ResolverTypeWrapper<BranchConnection>;
  BrandEdge: ResolverTypeWrapper<
    Omit<BrandEdge, "node"> & { node: ResolversTypes["Brand"] }
  >;
  BrandConnection: ResolverTypeWrapper<
    Omit<BrandConnection, "edges"> & {
      edges: Array<Maybe<ResolversTypes["BrandEdge"]>>;
    }
  >;
  SignupUnion: ResolversTypes["SignupSuccess"] | ResolversTypes["SignupErrors"];
  SignupSuccess: ResolverTypeWrapper<SignupSuccess>;
  SignupErrors: ResolverTypeWrapper<SignupErrors>;
  SignupInput: SignupInput;
  PaginationInput: PaginationInput;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars["Date"];
  DateTime: Scalars["DateTime"];
  Owner: Owner;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Country: CountryEntity;
  Currency: CurrencyEntity;
  UnitOfMeasure: UnitOfMeasure;
  UnitOfMeasureTag: UnitOfMeasureTag;
  Branch: Branch;
  Brand: Omit<Brand, "country" | "currency"> & {
    country: ResolversParentTypes["Country"];
    currency: ResolversParentTypes["Currency"];
  };
  ArticleInfo: ArticleInfo;
  Float: Scalars["Float"];
  Article: Article;
  Tag: Tag;
  Comment: Comment;
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  CountryEdge: Omit<CountryEdge, "node"> & {
    node: ResolversParentTypes["Country"];
  };
  CountryConnection: Omit<CountryConnection, "edges"> & {
    edges: Array<Maybe<ResolversParentTypes["CountryEdge"]>>;
  };
  BranchEdge: BranchEdge;
  BranchConnection: BranchConnection;
  BrandEdge: Omit<BrandEdge, "node"> & { node: ResolversParentTypes["Brand"] };
  BrandConnection: Omit<BrandConnection, "edges"> & {
    edges: Array<Maybe<ResolversParentTypes["BrandEdge"]>>;
  };
  SignupUnion:
    | ResolversParentTypes["SignupSuccess"]
    | ResolversParentTypes["SignupErrors"];
  SignupSuccess: SignupSuccess;
  SignupErrors: SignupErrors;
  SignupInput: SignupInput;
  PaginationInput: PaginationInput;
  Int: Scalars["Int"];
  Query: {};
  Mutation: {};
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type OwnerResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Owner"] = ResolversParentTypes["Owner"]
> = {
  ownerId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  jwt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  insertedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Country"] = ResolversParentTypes["Country"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  countryName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  countryCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  insertedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Currency"] = ResolversParentTypes["Currency"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  currencyName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  currencyCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  insertedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnitOfMeasureResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["UnitOfMeasure"] = ResolversParentTypes["UnitOfMeasure"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  shortName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  longName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnitOfMeasureTagResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["UnitOfMeasureTag"] = ResolversParentTypes["UnitOfMeasureTag"]
> = {
  unitOfMeasureId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Branch"] = ResolversParentTypes["Branch"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  postCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  street?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  city?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  branchAlias?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  phone?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  insertedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Brand"] = ResolversParentTypes["Brand"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  countryId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  country?: Resolver<ResolversTypes["Country"], ParentType, ContextType>;
  currencyId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes["Currency"], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  insertedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleInfoResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["ArticleInfo"] = ResolversParentTypes["ArticleInfo"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  branchGroupId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  unitPrice?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  insertedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  tags?: Resolver<Array<Maybe<ResolversTypes["Tag"]>>, ParentType, ContextType>;
  comments?: Resolver<
    Array<Maybe<ResolversTypes["Comment"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Article"] = ResolversParentTypes["Article"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  insertedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  unitOfMeasure?: Resolver<
    ResolversTypes["UnitOfMeasure"],
    ParentType,
    ContextType
  >;
  info?: Resolver<
    Array<Maybe<ResolversTypes["ArticleInfo"]>>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<Array<Maybe<ResolversTypes["Tag"]>>, ParentType, ContextType>;
  comments?: Resolver<
    Array<Maybe<ResolversTypes["Comment"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
  startCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
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
  edges?: Resolver<
    Array<Maybe<ResolversTypes["CountryEdge"]>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchEdgeResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["BranchEdge"] = ResolversParentTypes["BranchEdge"]
> = {
  node?: Resolver<ResolversTypes["Branch"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchConnectionResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["BranchConnection"] = ResolversParentTypes["BranchConnection"]
> = {
  edges?: Resolver<
    Array<Maybe<ResolversTypes["BranchEdge"]>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandEdgeResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["BrandEdge"] = ResolversParentTypes["BrandEdge"]
> = {
  node?: Resolver<ResolversTypes["Brand"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandConnectionResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["BrandConnection"] = ResolversParentTypes["BrandConnection"]
> = {
  edges?: Resolver<
    Array<Maybe<ResolversTypes["BrandEdge"]>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignupUnionResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["SignupUnion"] = ResolversParentTypes["SignupUnion"]
> = {
  __resolveType: TypeResolveFn<
    "SignupSuccess" | "SignupErrors",
    ParentType,
    ContextType
  >;
};

export type SignupSuccessResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["SignupSuccess"] = ResolversParentTypes["SignupSuccess"]
> = {
  owner?: Resolver<ResolversTypes["Owner"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignupErrorsResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["SignupErrors"] = ResolversParentTypes["SignupErrors"]
> = {
  errors?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  listCountries?: Resolver<
    ResolversTypes["CountryConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryListCountriesArgs, "paginationInput">
  >;
  listCurrencies?: Resolver<
    Array<Maybe<ResolversTypes["Currency"]>>,
    ParentType,
    ContextType
  >;
  listBranches?: Resolver<
    ResolversTypes["BranchConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryListBranchesArgs, "paginationInput">
  >;
  listBrands?: Resolver<
    ResolversTypes["BrandConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryListBrandsArgs, "paginationInput">
  >;
};

export type MutationResolvers<
  ContextType = ServerContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  signup?: Resolver<
    Maybe<ResolversTypes["SignupUnion"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignupArgs, "input">
  >;
};

export type Resolvers<ContextType = ServerContext> = {
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Owner?: OwnerResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  Currency?: CurrencyResolvers<ContextType>;
  UnitOfMeasure?: UnitOfMeasureResolvers<ContextType>;
  UnitOfMeasureTag?: UnitOfMeasureTagResolvers<ContextType>;
  Branch?: BranchResolvers<ContextType>;
  Brand?: BrandResolvers<ContextType>;
  ArticleInfo?: ArticleInfoResolvers<ContextType>;
  Article?: ArticleResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  CountryEdge?: CountryEdgeResolvers<ContextType>;
  CountryConnection?: CountryConnectionResolvers<ContextType>;
  BranchEdge?: BranchEdgeResolvers<ContextType>;
  BranchConnection?: BranchConnectionResolvers<ContextType>;
  BrandEdge?: BrandEdgeResolvers<ContextType>;
  BrandConnection?: BrandConnectionResolvers<ContextType>;
  SignupUnion?: SignupUnionResolvers<ContextType>;
  SignupSuccess?: SignupSuccessResolvers<ContextType>;
  SignupErrors?: SignupErrorsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ServerContext> = Resolvers<ContextType>;
