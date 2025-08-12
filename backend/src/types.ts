import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateNoteInput = {
  /** who made this */
  author: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  /** the text in the note */
  note: Scalars['String']['input'];
  /** what is the title */
  title: Scalars['String']['input'];
};

export type CreateNoteResponse = {
  __typename?: 'CreateNoteResponse';
  code: Scalars['Int']['output'];
  /** What message do we have for client in case of error */
  message: Scalars['String']['output'];
  /** what was the applied changes */
  note?: Maybe<Array<Maybe<Note>>>;
  /** was the mutation successful */
  success: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  /** email of the user */
  email: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  /** what is the name of the user */
  name: Scalars['String']['input'];
  /** security */
  password: Scalars['String']['input'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  /** What message do we have for client in case of error */
  message: Scalars['String']['output'];
  /** was the mutation successful */
  success: Scalars['Boolean']['output'];
  /** what was the applied changes */
  user?: Maybe<User>;
};

export type GetUserInput = {
  /** email of the user */
  email: Scalars['String']['input'];
  /** password of the user */
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: CreateNoteResponse;
  createUser: CreateUserResponse;
  updateNote: UpdateNoteResponse;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateNoteArgs = {
  input: UpdateNoteInput;
};

export type Note = {
  __typename?: 'Note';
  /** who made this note */
  author: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  /** notes ankasa */
  note: Scalars['String']['output'];
  /** title */
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getNote: Array<Maybe<Note>>;
  getUser?: Maybe<User>;
};


export type QueryGetNoteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  input: GetUserInput;
};

export type UpdateNoteInput = {
  /** who made this note */
  author: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  /** note  */
  note: Scalars['String']['input'];
  /** title of the note */
  title: Scalars['String']['input'];
};

export type UpdateNoteResponse = {
  __typename?: 'UpdateNoteResponse';
  code: Scalars['Int']['output'];
  /** What message do we have for client in case of error */
  message: Scalars['String']['output'];
  /** was the mutation successful */
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  /** email */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** user name */
  name: Scalars['String']['output'];
  /** password */
  password: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateNoteInput: CreateNoteInput;
  CreateNoteResponse: ResolverTypeWrapper<CreateNoteResponse>;
  CreateUserInput: CreateUserInput;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  GetUserInput: GetUserInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Note: ResolverTypeWrapper<Note>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateNoteInput: UpdateNoteInput;
  UpdateNoteResponse: ResolverTypeWrapper<UpdateNoteResponse>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateNoteInput: CreateNoteInput;
  CreateNoteResponse: CreateNoteResponse;
  CreateUserInput: CreateUserInput;
  CreateUserResponse: CreateUserResponse;
  GetUserInput: GetUserInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Note: Note;
  Query: {};
  String: Scalars['String']['output'];
  UpdateNoteInput: UpdateNoteInput;
  UpdateNoteResponse: UpdateNoteResponse;
  User: User;
};

export type CreateNoteResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CreateNoteResponse'] = ResolversParentTypes['CreateNoteResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<Array<Maybe<ResolversTypes['Note']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createNote?: Resolver<ResolversTypes['CreateNoteResponse'], ParentType, ContextType, RequireFields<MutationCreateNoteArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResponse'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  updateNote?: Resolver<ResolversTypes['UpdateNoteResponse'], ParentType, ContextType, RequireFields<MutationUpdateNoteArgs, 'input'>>;
};

export type NoteResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']> = {
  author?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getNote?: Resolver<Array<Maybe<ResolversTypes['Note']>>, ParentType, ContextType, RequireFields<QueryGetNoteArgs, 'id'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'input'>>;
};

export type UpdateNoteResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['UpdateNoteResponse'] = ResolversParentTypes['UpdateNoteResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  CreateNoteResponse?: CreateNoteResponseResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Note?: NoteResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateNoteResponse?: UpdateNoteResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

