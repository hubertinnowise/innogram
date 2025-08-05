
/**
 * Client
**/

import * as runtime from './runtime/library.js';

import $Types = runtime.Types // general types
import $Extensions = runtime.Types.Extensions
import $Public = runtime.Types.Public
import $Result = runtime.Types.Result
import $Utils = runtime.Types.Utils

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogDefinition | Prisma.LogLevel> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>
  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: Prisma.Sql | TemplateStringsArray, ...values: any[]): Prisma.PrismaPromise<number>;

/**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: Prisma.Sql | TemplateStringsArray, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { isolationLevel?: Prisma.TransactionIsolationLevel, maxWait?: number, timeout?: number }): $Utils.JsPromise<R>


  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

      /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    include: any
    select: any
  }

  type SelectAndOmit = {
    omit: any
    select: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = Array<T> | T;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | null | undefined ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (T & Without<U, T>) | (U & Without<T, U>)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends bigint
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K] &
    Omit<O, K>

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends boolean
  > = {
    0: EitherLoose<O, K>
    1: EitherStrict<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = number | string | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends boolean = 1> = {
      0: AtLoose<O, K>;
      1: AtStrict<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
      | (K extends keyof O ? { [P in K]: O[P] } & O : O)
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> & U : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = False | True

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends boolean, B2 extends boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_count' | '_max' | '_min' | '_sum'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Session: 'Session',
    Token: 'Token'
    User: 'User',
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "session" | "token" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Session: {
        fields: Prisma.SessionFieldRefs
        operations: {
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
        }
        payload: Prisma.$SessionPayload<ExtArgs>
      }
      Token: {
        fields: Prisma.TokenFieldRefs
        operations: {
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
        }
        payload: Prisma.$TokenPayload<ExtArgs>
      }
      User: {
        fields: Prisma.UserFieldRefs
        operations: {
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
        }
        payload: Prisma.$UserPayload<ExtArgs>
      }
    }
  } & {
    other: {
      operations: {
        $executeRaw: {
          args: [query: Prisma.Sql | TemplateStringsArray, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: Prisma.Sql | TemplateStringsArray, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
      payload: any
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'colorless' | 'minimal' | 'pretty'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogDefinition | LogLevel)[]
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      isolationLevel?: Prisma.TransactionIsolationLevel
      maxWait?: number
      timeout?: number
    }
  }
  export type GlobalOmitConfig = {
    session?: SessionOmit
    token?: TokenOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'error' | 'info' | 'query' | 'warn'
  export type LogDefinition = {
    emit: 'event' | 'stdout'
    level: LogLevel
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogDefinition | LogLevel>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    duration: number
    params: string
    query: string
    target: string
    timestamp: Date
  }

  export type LogEvent = {
    message: string
    target: string
    timestamp: Date
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'aggregate'
    | 'count'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'findMany'
    | 'findRaw'
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'groupBy'
    | 'queryRaw'
    | 'runCommandRaw'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    action: PrismaAction
    args: any
    dataPath: string[]
    model?: ModelName
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogDefinition | LogLevel>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    tokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: UserCountOutputTypeCountSessionsArgs | boolean
    tokens?: UserCountOutputTypeCountTokensArgs | boolean
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    createdAt: Date | null
    email: null | string
    emailVerificationExpires: Date | null
    emailVerificationToken: null | string
    id: null | string
    passwordHash: null | string
    passwordResetExpires: Date | null
    passwordResetToken: null | string
    phoneNumber: null | string
    username: null | string
  }

  export type UserMaxAggregateOutputType = {
    createdAt: Date | null
    email: null | string
    emailVerificationExpires: Date | null
    emailVerificationToken: null | string
    id: null | string
    passwordHash: null | string
    passwordResetExpires: Date | null
    passwordResetToken: null | string
    phoneNumber: null | string
    username: null | string
  }

  export type UserCountAggregateOutputType = {
    _all: number
    createdAt: number
    email: number
    emailVerificationExpires: number
    emailVerificationToken: number
    id: number
    passwordHash: number
    passwordResetExpires: number
    passwordResetToken: number
    phoneNumber: number
    username: number
  }


  export type UserMinAggregateInputType = {
    createdAt?: true
    email?: true
    emailVerificationExpires?: true
    emailVerificationToken?: true
    id?: true
    passwordHash?: true
    passwordResetExpires?: true
    passwordResetToken?: true
    phoneNumber?: true
    username?: true
  }

  export type UserMaxAggregateInputType = {
    createdAt?: true
    email?: true
    emailVerificationExpires?: true
    emailVerificationToken?: true
    id?: true
    passwordHash?: true
    passwordResetExpires?: true
    passwordResetToken?: true
    phoneNumber?: true
    username?: true
  }

  export type UserCountAggregateInputType = {
    _all?: true
    createdAt?: true
    email?: true
    emailVerificationExpires?: true
    emailVerificationToken?: true
    id?: true
    passwordHash?: true
    passwordResetExpires?: true
    passwordResetToken?: true
    phoneNumber?: true
    username?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: UserCountAggregateInputType | true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof AggregateUser & keyof T]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _count?: UserCountAggregateInputType | true
    _max?: UserMaxAggregateInputType
    _min?: UserMinAggregateInputType
    by: UserScalarFieldEnum | UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    skip?: number
    take?: number
    where?: UserWhereInput
  }

  export type UserGroupByOutputType = {
    _count: UserCountAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    createdAt: Date
    email: string
    emailVerificationExpires: Date | null
    emailVerificationToken: null | string
    id: string
    passwordHash: string
    passwordResetExpires: Date | null
    passwordResetToken: null | string
    phoneNumber: string
    username: string
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        } &
        PickEnumerable<UserGroupByOutputType, T['by']>
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    _count?: UserCountOutputTypeDefaultArgs<ExtArgs> | boolean
    createdAt?: boolean
    email?: boolean
    emailVerificationExpires?: boolean
    emailVerificationToken?: boolean
    id?: boolean
    passwordHash?: boolean
    passwordResetExpires?: boolean
    passwordResetToken?: boolean
    phoneNumber?: boolean
    sessions?: User$sessionsArgs<ExtArgs> | boolean
    tokens?: User$tokensArgs<ExtArgs> | boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdAt?: boolean
    email?: boolean
    emailVerificationExpires?: boolean
    emailVerificationToken?: boolean
    id?: boolean
    passwordHash?: boolean
    passwordResetExpires?: boolean
    passwordResetToken?: boolean
    phoneNumber?: boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdAt?: boolean
    email?: boolean
    emailVerificationExpires?: boolean
    emailVerificationToken?: boolean
    id?: boolean
    passwordHash?: boolean
    passwordResetExpires?: boolean
    passwordResetToken?: boolean
    phoneNumber?: boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    createdAt?: boolean
    email?: boolean
    emailVerificationExpires?: boolean
    emailVerificationToken?: boolean
    id?: boolean
    passwordHash?: boolean
    passwordResetExpires?: boolean
    passwordResetToken?: boolean
    phoneNumber?: boolean
    username?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"createdAt" | "email" | "emailVerificationExpires" | "emailVerificationToken" | "id" | "passwordHash" | "passwordResetExpires" | "passwordResetToken" | "phoneNumber" | "username", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _count?: UserCountOutputTypeDefaultArgs<ExtArgs> | boolean
    sessions?: User$sessionsArgs<ExtArgs> | boolean
    tokens?: User$tokensArgs<ExtArgs> | boolean
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    composites: {}
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      tokens: Prisma.$TokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      createdAt: Date
      email: string
      emailVerificationExpires: Date | null
      emailVerificationToken: null | string
      id: string
      passwordHash: string
      passwordResetExpires: Date | null
      passwordResetToken: null | string
      phoneNumber: string
      username: string
    }, ExtArgs["result"]["user"]>
  }

  type UserGetPayload<S extends UserDefaultArgs | boolean | null | undefined> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      select?: UserCountAggregateInputType | true
    } & Omit<UserFindManyArgs, 'distinct' | 'include' | 'omit' | 'select'>

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { meta: { name: 'User' }, types: Prisma.TypeMap<ExtArgs>['model']['User'] }
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: InputErrors & SubsetIntersection<T, UserGroupByArgs, OrderByArg>): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>


    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>
  /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null | undefined): $Utils.JsPromise<T>
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined, onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined): $Utils.JsPromise<TResult1 | TResult2>
    tokens<T extends User$tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerificationExpires: FieldRef<"User", 'DateTime'>
    readonly emailVerificationToken: FieldRef<"User", 'String'>
    readonly id: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly passwordResetExpires: FieldRef<"User", 'DateTime'>
    readonly passwordResetToken: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Limit how many Users to delete.
     */
    limit?: number
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursor?: SessionWhereUniqueInput
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    skip?: number
    take?: number
    where?: SessionWhereInput
  }

  /**
   * User.tokens
   */
  export type User$tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursor?: TokenWhereUniqueInput
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    skip?: number
    take?: number
    where?: TokenWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    createdAt: Date | null
    expiresAt: Date | null
    id: null | string
    ip: null | string
    userAgent: null | string
    userId: null | string
  }

  export type SessionMaxAggregateOutputType = {
    createdAt: Date | null
    expiresAt: Date | null
    id: null | string
    ip: null | string
    userAgent: null | string
    userId: null | string
  }

  export type SessionCountAggregateOutputType = {
    _all: number
    createdAt: number
    expiresAt: number
    id: number
    ip: number
    userAgent: number
    userId: number
  }


  export type SessionMinAggregateInputType = {
    createdAt?: true
    expiresAt?: true
    id?: true
    ip?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    createdAt?: true
    expiresAt?: true
    id?: true
    ip?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    _all?: true
    createdAt?: true
    expiresAt?: true
    id?: true
    ip?: true
    userAgent?: true
    userId?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: SessionCountAggregateInputType | true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof AggregateSession & keyof T]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _count?: SessionCountAggregateInputType | true
    _max?: SessionMaxAggregateInputType
    _min?: SessionMinAggregateInputType
    by: SessionScalarFieldEnum | SessionScalarFieldEnum[]
    having?: SessionScalarWhereWithAggregatesInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    skip?: number
    take?: number
    where?: SessionWhereInput
  }

  export type SessionGroupByOutputType = {
    _count: SessionCountAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    createdAt: Date
    expiresAt: Date | null
    id: string
    ip: null | string
    userAgent: null | string
    userId: string
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      {
          [P in ((keyof SessionGroupByOutputType) & (keyof T))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        } &
        PickEnumerable<SessionGroupByOutputType, T['by']>
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdAt?: boolean
    expiresAt?: boolean
    id?: boolean
    ip?: boolean
    user?: UserDefaultArgs<ExtArgs> | boolean
    userAgent?: boolean
    userId?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdAt?: boolean
    expiresAt?: boolean
    id?: boolean
    ip?: boolean
    user?: UserDefaultArgs<ExtArgs> | boolean
    userAgent?: boolean
    userId?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdAt?: boolean
    expiresAt?: boolean
    id?: boolean
    ip?: boolean
    user?: UserDefaultArgs<ExtArgs> | boolean
    userAgent?: boolean
    userId?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    createdAt?: boolean
    expiresAt?: boolean
    id?: boolean
    ip?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"createdAt" | "expiresAt" | "id" | "ip" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: UserDefaultArgs<ExtArgs> | boolean
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: UserDefaultArgs<ExtArgs> | boolean
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: UserDefaultArgs<ExtArgs> | boolean
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    composites: {}
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      createdAt: Date
      expiresAt: Date | null
      id: string
      ip: null | string
      userAgent: null | string
      userId: string
    }, ExtArgs["result"]["session"]>
  }

  type SessionGetPayload<S extends SessionDefaultArgs | boolean | null | undefined> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      select?: SessionCountAggregateInputType | true
    } & Omit<SessionFindManyArgs, 'distinct' | 'include' | 'omit' | 'select'>

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { meta: { name: 'Session' }, types: Prisma.TypeMap<ExtArgs>['model']['Session'] }
    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: InputErrors & SubsetIntersection<T, SessionGroupByArgs, OrderByArg>): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>


    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>
  /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null | undefined): $Utils.JsPromise<T>
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined, onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined): $Utils.JsPromise<TResult1 | TResult2>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly id: FieldRef<"Session", 'String'>
    readonly ip: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
  }

  export type TokenMinAggregateOutputType = {
    accessToken: null | string
    createdAt: Date | null
    expiresAt: Date | null
    id: null | string
    refreshToken: null | string
    userId: null | string
  }

  export type TokenMaxAggregateOutputType = {
    accessToken: null | string
    createdAt: Date | null
    expiresAt: Date | null
    id: null | string
    refreshToken: null | string
    userId: null | string
  }

  export type TokenCountAggregateOutputType = {
    _all: number
    accessToken: number
    createdAt: number
    expiresAt: number
    id: number
    refreshToken: number
    userId: number
  }


  export type TokenMinAggregateInputType = {
    accessToken?: true
    createdAt?: true
    expiresAt?: true
    id?: true
    refreshToken?: true
    userId?: true
  }

  export type TokenMaxAggregateInputType = {
    accessToken?: true
    createdAt?: true
    expiresAt?: true
    id?: true
    refreshToken?: true
    userId?: true
  }

  export type TokenCountAggregateInputType = {
    _all?: true
    accessToken?: true
    createdAt?: true
    expiresAt?: true
    id?: true
    refreshToken?: true
    userId?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: TokenCountAggregateInputType | true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof AggregateToken & keyof T]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _count?: TokenCountAggregateInputType | true
    _max?: TokenMaxAggregateInputType
    _min?: TokenMinAggregateInputType
    by: TokenScalarFieldEnum | TokenScalarFieldEnum[]
    having?: TokenScalarWhereWithAggregatesInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    skip?: number
    take?: number
    where?: TokenWhereInput
  }

  export type TokenGroupByOutputType = {
    _count: TokenCountAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    accessToken: string
    createdAt: Date
    expiresAt: Date
    id: string
    refreshToken: string
    userId: string
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        } &
        PickEnumerable<TokenGroupByOutputType, T['by']>
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accessToken?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    id?: boolean
    refreshToken?: boolean
    user?: UserDefaultArgs<ExtArgs> | boolean
    userId?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accessToken?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    id?: boolean
    refreshToken?: boolean
    user?: UserDefaultArgs<ExtArgs> | boolean
    userId?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accessToken?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    id?: boolean
    refreshToken?: boolean
    user?: UserDefaultArgs<ExtArgs> | boolean
    userId?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    accessToken?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    id?: boolean
    refreshToken?: boolean
    userId?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"accessToken" | "createdAt" | "expiresAt" | "id" | "refreshToken" | "userId", ExtArgs["result"]["token"]>
  export type TokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: UserDefaultArgs<ExtArgs> | boolean
  }
  export type TokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: UserDefaultArgs<ExtArgs> | boolean
  }
  export type TokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: UserDefaultArgs<ExtArgs> | boolean
  }

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    composites: {}
    name: "Token"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      accessToken: string
      createdAt: Date
      expiresAt: Date
      id: string
      refreshToken: string
      userId: string
    }, ExtArgs["result"]["token"]>
  }

  type TokenGetPayload<S extends TokenDefaultArgs | boolean | null | undefined> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      select?: TokenCountAggregateInputType | true
    } & Omit<TokenFindManyArgs, 'distinct' | 'include' | 'omit' | 'select'>

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { meta: { name: 'Token' }, types: Prisma.TypeMap<ExtArgs>['model']['Token'] }
    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: InputErrors & SubsetIntersection<T, TokenGroupByArgs, OrderByArg>): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>


    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens and returns the data updated in the database.
     * @param {TokenUpdateManyAndReturnArgs} args - Arguments to update many Tokens.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>
  /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null | undefined): $Utils.JsPromise<T>
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined, onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined): $Utils.JsPromise<TResult1 | TResult2>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  }




  /**
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly accessToken: FieldRef<"Token", 'String'>
    readonly createdAt: FieldRef<"Token", 'DateTime'>
    readonly expiresAt: FieldRef<"Token", 'DateTime'>
    readonly id: FieldRef<"Token", 'String'>
    readonly refreshToken: FieldRef<"Token", 'String'>
    readonly userId: FieldRef<"Token", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    skipDuplicates?: boolean
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
  }

  /**
   * Token updateManyAndReturn
   */
  export type TokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeUpdateManyAndReturn<ExtArgs> | null
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadCommitted: 'ReadCommitted',
    ReadUncommitted: 'ReadUncommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    createdAt: 'createdAt',
    email: 'email',
    emailVerificationExpires: 'emailVerificationExpires'
    emailVerificationToken: 'emailVerificationToken',
    id: 'id',
    passwordHash: 'passwordHash',
    passwordResetExpires: 'passwordResetExpires',
    passwordResetToken: 'passwordResetToken',
    phoneNumber: 'phoneNumber',
    username: 'username',
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
    id: 'id',
    ip: 'ip',
    userAgent: 'userAgent',
    userId: 'userId',
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    accessToken: 'accessToken',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
    id: 'id',
    refreshToken: 'refreshToken',
    userId: 'userId',
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    createdAt?: Date | DateTimeFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerificationExpires?: Date | DateTimeNullableFilter<"User"> | null | string
    emailVerificationToken?: StringNullableFilter<"User"> | null | string
    id?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    passwordResetExpires?: Date | DateTimeNullableFilter<"User"> | null | string
    passwordResetToken?: StringNullableFilter<"User"> | null | string
    phoneNumber?: StringFilter<"User"> | string
    sessions?: SessionListRelationFilter
    tokens?: TokenListRelationFilter
    username?: StringFilter<"User"> | string
  }

  export type UserOrderByWithRelationInput = {
    createdAt?: SortOrder
    email?: SortOrder
    emailVerificationExpires?: SortOrder | SortOrderInput
    emailVerificationToken?: SortOrder | SortOrderInput
    id?: SortOrder
    passwordHash?: SortOrder
    passwordResetExpires?: SortOrder | SortOrderInput
    passwordResetToken?: SortOrder | SortOrderInput
    phoneNumber?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    tokens?: TokenOrderByRelationAggregateInput
    username?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    AND?: UserWhereInput | UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    createdAt?: Date | DateTimeFilter<"User"> | string
    email?: string
    emailVerificationExpires?: Date | DateTimeNullableFilter<"User"> | null | string
    emailVerificationToken?: StringNullableFilter<"User"> | null | string
    id?: string
    passwordHash?: StringFilter<"User"> | string
    passwordResetExpires?: Date | DateTimeNullableFilter<"User"> | null | string
    passwordResetToken?: StringNullableFilter<"User"> | null | string
    phoneNumber?: string
    sessions?: SessionListRelationFilter
    tokens?: TokenListRelationFilter
    username?: string
  }, "email" | "id" | "phoneNumber" | "username">

  export type UserOrderByWithAggregationInput = {
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    createdAt?: SortOrder
    email?: SortOrder
    emailVerificationExpires?: SortOrder | SortOrderInput
    emailVerificationToken?: SortOrder | SortOrderInput
    id?: SortOrder
    passwordHash?: SortOrder
    passwordResetExpires?: SortOrder | SortOrderInput
    passwordResetToken?: SortOrder | SortOrderInput
    phoneNumber?: SortOrder
    username?: SortOrder
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    createdAt?: Date | DateTimeWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerificationExpires?: Date | DateTimeNullableWithAggregatesFilter<"User"> | null | string
    emailVerificationToken?: StringNullableWithAggregatesFilter<"User"> | null | string
    id?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    passwordResetExpires?: Date | DateTimeNullableWithAggregatesFilter<"User"> | null | string
    passwordResetToken?: StringNullableWithAggregatesFilter<"User"> | null | string
    phoneNumber?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    createdAt?: Date | DateTimeFilter<"Session"> | string
    expiresAt?: Date | DateTimeNullableFilter<"Session"> | null | string
    id?: StringFilter<"Session"> | string
    ip?: StringNullableFilter<"Session"> | null | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    userAgent?: StringNullableFilter<"Session"> | null | string
    userId?: StringFilter<"Session"> | string
  }

  export type SessionOrderByWithRelationInput = {
    createdAt?: SortOrder
    expiresAt?: SortOrder | SortOrderInput
    id?: SortOrder
    ip?: SortOrder | SortOrderInput
    user?: UserOrderByWithRelationInput
    userAgent?: SortOrder | SortOrderInput
    userId?: SortOrder
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    AND?: SessionWhereInput | SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    createdAt?: Date | DateTimeFilter<"Session"> | string
    expiresAt?: Date | DateTimeNullableFilter<"Session"> | null | string
    id?: string
    ip?: StringNullableFilter<"Session"> | null | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    userAgent?: StringNullableFilter<"Session"> | null | string
    userId?: StringFilter<"Session"> | string
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    createdAt?: SortOrder
    expiresAt?: SortOrder | SortOrderInput
    id?: SortOrder
    ip?: SortOrder | SortOrderInput
    userAgent?: SortOrder | SortOrderInput
    userId?: SortOrder
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    createdAt?: Date | DateTimeWithAggregatesFilter<"Session"> | string
    expiresAt?: Date | DateTimeNullableWithAggregatesFilter<"Session"> | null | string
    id?: StringWithAggregatesFilter<"Session"> | string
    ip?: StringNullableWithAggregatesFilter<"Session"> | null | string
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | null | string
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    accessToken?: StringFilter<"Token"> | string
    createdAt?: Date | DateTimeFilter<"Token"> | string
    expiresAt?: Date | DateTimeFilter<"Token"> | string
    id?: StringFilter<"Token"> | string
    refreshToken?: StringFilter<"Token"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    userId?: StringFilter<"Token"> | string
  }

  export type TokenOrderByWithRelationInput = {
    accessToken?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    id?: SortOrder
    refreshToken?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    AND?: TokenWhereInput | TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    accessToken?: StringFilter<"Token"> | string
    createdAt?: Date | DateTimeFilter<"Token"> | string
    expiresAt?: Date | DateTimeFilter<"Token"> | string
    id?: string
    refreshToken?: StringFilter<"Token"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    userId?: string
  }, "id" | "userId">

  export type TokenOrderByWithAggregationInput = {
    _count?: TokenCountOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
    accessToken?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    id?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    accessToken?: StringWithAggregatesFilter<"Token"> | string
    createdAt?: Date | DateTimeWithAggregatesFilter<"Token"> | string
    expiresAt?: Date | DateTimeWithAggregatesFilter<"Token"> | string
    id?: StringWithAggregatesFilter<"Token"> | string
    refreshToken?: StringWithAggregatesFilter<"Token"> | string
    userId?: StringWithAggregatesFilter<"Token"> | string
  }

  export type UserCreateInput = {
    createdAt?: Date | string
    email: string
    emailVerificationExpires?: Date | null | string
    emailVerificationToken?: null | string
    id?: string
    passwordHash: string
    passwordResetExpires?: Date | null | string
    passwordResetToken?: null | string
    phoneNumber: string
    sessions?: SessionCreateNestedManyWithoutUserInput
    tokens?: TokenCreateNestedManyWithoutUserInput
    username: string
  }

  export type UserUncheckedCreateInput = {
    createdAt?: Date | string
    email: string
    emailVerificationExpires?: Date | null | string
    emailVerificationToken?: null | string
    id?: string
    passwordHash: string
    passwordResetExpires?: Date | null | string
    passwordResetToken?: null | string
    phoneNumber: string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    tokens?: TokenUncheckedCreateNestedManyWithoutUserInput
    username: string
  }

  export type UserUpdateInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerificationExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | null | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    tokens?: TokenUpdateManyWithoutUserNestedInput
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerificationExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | null | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    tokens?: TokenUncheckedUpdateManyWithoutUserNestedInput
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyInput = {
    createdAt?: Date | string
    email: string
    emailVerificationExpires?: Date | null | string
    emailVerificationToken?: null | string
    id?: string
    passwordHash: string
    passwordResetExpires?: Date | null | string
    passwordResetToken?: null | string
    phoneNumber: string
    username: string
  }

  export type UserUpdateManyMutationInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerificationExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | null | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerificationExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | null | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateInput = {
    createdAt?: Date | string
    expiresAt?: Date | null | string
    id?: string
    ip?: null | string
    user: UserCreateNestedOneWithoutSessionsInput
    userAgent?: null | string
  }

  export type SessionUncheckedCreateInput = {
    createdAt?: Date | string
    expiresAt?: Date | null | string
    id?: string
    ip?: null | string
    userAgent?: null | string
    userId: string
  }

  export type SessionUpdateInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | null | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
    userAgent?: NullableStringFieldUpdateOperationsInput | null | string
  }

  export type SessionUncheckedUpdateInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | null | string
    userAgent?: NullableStringFieldUpdateOperationsInput | null | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    createdAt?: Date | string
    expiresAt?: Date | null | string
    id?: string
    ip?: null | string
    userAgent?: null | string
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | null | string
    userAgent?: NullableStringFieldUpdateOperationsInput | null | string
  }

  export type SessionUncheckedUpdateManyInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | null | string
    userAgent?: NullableStringFieldUpdateOperationsInput | null | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TokenCreateInput = {
    accessToken: string
    createdAt?: Date | string
    expiresAt: Date | string
    id?: string
    refreshToken: string
    user: UserCreateNestedOneWithoutTokensInput
  }

  export type TokenUncheckedCreateInput = {
    accessToken: string
    createdAt?: Date | string
    expiresAt: Date | string
    id?: string
    refreshToken: string
    userId: string
  }

  export type TokenUpdateInput = {
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTokensNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TokenCreateManyInput = {
    accessToken: string
    createdAt?: Date | string
    expiresAt: Date | string
    id?: string
    refreshToken: string
    userId: string
  }

  export type TokenUpdateManyMutationInput = {
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
  }

  export type TokenUncheckedUpdateManyInput = {
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    contains?: StringFieldRefInput<$PrismaModel> | string
    endsWith?: StringFieldRefInput<$PrismaModel> | string
    equals?: StringFieldRefInput<$PrismaModel> | string
    gt?: StringFieldRefInput<$PrismaModel> | string
    gte?: StringFieldRefInput<$PrismaModel> | string
    in?: ListStringFieldRefInput<$PrismaModel> | string[]
    lt?: StringFieldRefInput<$PrismaModel> | string
    lte?: StringFieldRefInput<$PrismaModel> | string
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | string[]
    startsWith?: StringFieldRefInput<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeFilter<$PrismaModel> | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    contains?: StringFieldRefInput<$PrismaModel> | string
    endsWith?: StringFieldRefInput<$PrismaModel> | string
    equals?: StringFieldRefInput<$PrismaModel> | null | string
    gt?: StringFieldRefInput<$PrismaModel> | string
    gte?: StringFieldRefInput<$PrismaModel> | string
    in?: ListStringFieldRefInput<$PrismaModel> | null | string[]
    lt?: StringFieldRefInput<$PrismaModel> | string
    lte?: StringFieldRefInput<$PrismaModel> | string
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | null | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | null | string[]
    startsWith?: StringFieldRefInput<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | null | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | null | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeNullableFilter<$PrismaModel> | null | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | null | string[]
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    none?: SessionWhereInput
    some?: SessionWhereInput
  }

  export type TokenListRelationFilter = {
    every?: TokenWhereInput
    none?: TokenWhereInput
    some?: TokenWhereInput
  }

  export type SortOrderInput = {
    nulls?: NullsOrder
    sort: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    createdAt?: SortOrder
    email?: SortOrder
    emailVerificationExpires?: SortOrder
    emailVerificationToken?: SortOrder
    id?: SortOrder
    passwordHash?: SortOrder
    passwordResetExpires?: SortOrder
    passwordResetToken?: SortOrder
    phoneNumber?: SortOrder
    username?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    createdAt?: SortOrder
    email?: SortOrder
    emailVerificationExpires?: SortOrder
    emailVerificationToken?: SortOrder
    id?: SortOrder
    passwordHash?: SortOrder
    passwordResetExpires?: SortOrder
    passwordResetToken?: SortOrder
    phoneNumber?: SortOrder
    username?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    createdAt?: SortOrder
    email?: SortOrder
    emailVerificationExpires?: SortOrder
    emailVerificationToken?: SortOrder
    id?: SortOrder
    passwordHash?: SortOrder
    passwordResetExpires?: SortOrder
    passwordResetToken?: SortOrder
    phoneNumber?: SortOrder
    username?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    contains?: StringFieldRefInput<$PrismaModel> | string
    endsWith?: StringFieldRefInput<$PrismaModel> | string
    equals?: StringFieldRefInput<$PrismaModel> | string
    gt?: StringFieldRefInput<$PrismaModel> | string
    gte?: StringFieldRefInput<$PrismaModel> | string
    in?: ListStringFieldRefInput<$PrismaModel> | string[]
    lt?: StringFieldRefInput<$PrismaModel> | string
    lte?: StringFieldRefInput<$PrismaModel> | string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | string[]
    startsWith?: StringFieldRefInput<$PrismaModel> | string
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeWithAggregatesFilter<$PrismaModel> | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    contains?: StringFieldRefInput<$PrismaModel> | string
    endsWith?: StringFieldRefInput<$PrismaModel> | string
    equals?: StringFieldRefInput<$PrismaModel> | null | string
    gt?: StringFieldRefInput<$PrismaModel> | string
    gte?: StringFieldRefInput<$PrismaModel> | string
    in?: ListStringFieldRefInput<$PrismaModel> | null | string[]
    lt?: StringFieldRefInput<$PrismaModel> | string
    lte?: StringFieldRefInput<$PrismaModel> | string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | null | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | null | string[]
    startsWith?: StringFieldRefInput<$PrismaModel> | string
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | null | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | null | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | null | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | null | string[]
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    createdAt?: SortOrder
    expiresAt?: SortOrder
    id?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    createdAt?: SortOrder
    expiresAt?: SortOrder
    id?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    createdAt?: SortOrder
    expiresAt?: SortOrder
    id?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type TokenCountOrderByAggregateInput = {
    accessToken?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    id?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    accessToken?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    id?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    accessToken?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    id?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    create?: SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[] | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
  }

  export type TokenCreateNestedManyWithoutUserInput = {
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    create?: TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[] | XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    create?: SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[] | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
  }

  export type TokenUncheckedCreateNestedManyWithoutUserInput = {
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    create?: TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[] | XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: null | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | null | string
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    create?: SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[] | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
  }

  export type TokenUpdateManyWithoutUserNestedInput = {
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    create?: TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[] | XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    delete?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    deleteMany?: TokenScalarWhereInput | TokenScalarWhereInput[]
    disconnect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    set?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    update?: TokenUpdateWithWhereUniqueWithoutUserInput | TokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenUpdateManyWithWhereWithoutUserInput | TokenUpdateManyWithWhereWithoutUserInput[]
    upsert?: TokenUpsertWithWhereUniqueWithoutUserInput | TokenUpsertWithWhereUniqueWithoutUserInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    create?: SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[] | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
  }

  export type TokenUncheckedUpdateManyWithoutUserNestedInput = {
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    create?: TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[] | XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    delete?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    deleteMany?: TokenScalarWhereInput | TokenScalarWhereInput[]
    disconnect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    set?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    update?: TokenUpdateWithWhereUniqueWithoutUserInput | TokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenUpdateManyWithWhereWithoutUserInput | TokenUpdateManyWithWhereWithoutUserInput[]
    upsert?: TokenUpsertWithWhereUniqueWithoutUserInput | TokenUpsertWithWhereUniqueWithoutUserInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    connect?: UserWhereUniqueInput
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    connect?: UserWhereUniqueInput
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
    upsert?: UserUpsertWithoutSessionsInput
  }

  export type UserCreateNestedOneWithoutTokensInput = {
    connect?: UserWhereUniqueInput
    connectOrCreate?: UserCreateOrConnectWithoutTokensInput
    create?: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
  }

  export type UserUpdateOneRequiredWithoutTokensNestedInput = {
    connect?: UserWhereUniqueInput
    connectOrCreate?: UserCreateOrConnectWithoutTokensInput
    create?: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTokensInput, UserUpdateWithoutTokensInput>, UserUncheckedUpdateWithoutTokensInput>
    upsert?: UserUpsertWithoutTokensInput
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    contains?: StringFieldRefInput<$PrismaModel> | string
    endsWith?: StringFieldRefInput<$PrismaModel> | string
    equals?: StringFieldRefInput<$PrismaModel> | string
    gt?: StringFieldRefInput<$PrismaModel> | string
    gte?: StringFieldRefInput<$PrismaModel> | string
    in?: ListStringFieldRefInput<$PrismaModel> | string[]
    lt?: StringFieldRefInput<$PrismaModel> | string
    lte?: StringFieldRefInput<$PrismaModel> | string
    not?: NestedStringFilter<$PrismaModel> | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | string[]
    startsWith?: StringFieldRefInput<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeFilter<$PrismaModel> | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    contains?: StringFieldRefInput<$PrismaModel> | string
    endsWith?: StringFieldRefInput<$PrismaModel> | string
    equals?: StringFieldRefInput<$PrismaModel> | null | string
    gt?: StringFieldRefInput<$PrismaModel> | string
    gte?: StringFieldRefInput<$PrismaModel> | string
    in?: ListStringFieldRefInput<$PrismaModel> | null | string[]
    lt?: StringFieldRefInput<$PrismaModel> | string
    lte?: StringFieldRefInput<$PrismaModel> | string
    not?: NestedStringNullableFilter<$PrismaModel> | null | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | null | string[]
    startsWith?: StringFieldRefInput<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | null | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | null | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeNullableFilter<$PrismaModel> | null | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | null | string[]
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    contains?: StringFieldRefInput<$PrismaModel> | string
    endsWith?: StringFieldRefInput<$PrismaModel> | string
    equals?: StringFieldRefInput<$PrismaModel> | string
    gt?: StringFieldRefInput<$PrismaModel> | string
    gte?: StringFieldRefInput<$PrismaModel> | string
    in?: ListStringFieldRefInput<$PrismaModel> | string[]
    lt?: StringFieldRefInput<$PrismaModel> | string
    lte?: StringFieldRefInput<$PrismaModel> | string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | string[]
    startsWith?: StringFieldRefInput<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: IntFieldRefInput<$PrismaModel> | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntFilter<$PrismaModel> | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | number[]
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeWithAggregatesFilter<$PrismaModel> | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    contains?: StringFieldRefInput<$PrismaModel> | string
    endsWith?: StringFieldRefInput<$PrismaModel> | string
    equals?: StringFieldRefInput<$PrismaModel> | null | string
    gt?: StringFieldRefInput<$PrismaModel> | string
    gte?: StringFieldRefInput<$PrismaModel> | string
    in?: ListStringFieldRefInput<$PrismaModel> | null | string[]
    lt?: StringFieldRefInput<$PrismaModel> | string
    lte?: StringFieldRefInput<$PrismaModel> | string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | null | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | null | string[]
    startsWith?: StringFieldRefInput<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: IntFieldRefInput<$PrismaModel> | null | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | null | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntNullableFilter<$PrismaModel> | null | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | null | number[]
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | null | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | null | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | null | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | null | string[]
  }

  export type SessionCreateWithoutUserInput = {
    createdAt?: Date | string
    expiresAt?: Date | null | string
    id?: string
    ip?: null | string
    userAgent?: null | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    createdAt?: Date | string
    expiresAt?: Date | null | string
    id?: string
    ip?: null | string
    userAgent?: null | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
    where: SessionWhereUniqueInput
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TokenCreateWithoutUserInput = {
    accessToken: string
    createdAt?: Date | string
    expiresAt: Date | string
    id?: string
    refreshToken: string
  }

  export type TokenUncheckedCreateWithoutUserInput = {
    accessToken: string
    createdAt?: Date | string
    expiresAt: Date | string
    id?: string
    refreshToken: string
  }

  export type TokenCreateOrConnectWithoutUserInput = {
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    where: TokenWhereUniqueInput
  }

  export type TokenCreateManyUserInputEnvelope = {
    data: TokenCreateManyUserInput | TokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    where: SessionWhereUniqueInput
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    where: SessionWhereUniqueInput
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
    where: SessionScalarWhereInput
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    createdAt?: Date | DateTimeFilter<"Session"> | string
    expiresAt?: Date | DateTimeNullableFilter<"Session"> | null | string
    id?: StringFilter<"Session"> | string
    ip?: StringNullableFilter<"Session"> | null | string
    userAgent?: StringNullableFilter<"Session"> | null | string
    userId?: StringFilter<"Session"> | string
  }

  export type TokenUpsertWithWhereUniqueWithoutUserInput = {
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    update: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
    where: TokenWhereUniqueInput
  }

  export type TokenUpdateWithWhereUniqueWithoutUserInput = {
    data: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
    where: TokenWhereUniqueInput
  }

  export type TokenUpdateManyWithWhereWithoutUserInput = {
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyWithoutUserInput>
    where: TokenScalarWhereInput
  }

  export type TokenScalarWhereInput = {
    AND?: TokenScalarWhereInput | TokenScalarWhereInput[]
    NOT?: TokenScalarWhereInput | TokenScalarWhereInput[]
    OR?: TokenScalarWhereInput[]
    accessToken?: StringFilter<"Token"> | string
    createdAt?: Date | DateTimeFilter<"Token"> | string
    expiresAt?: Date | DateTimeFilter<"Token"> | string
    id?: StringFilter<"Token"> | string
    refreshToken?: StringFilter<"Token"> | string
    userId?: StringFilter<"Token"> | string
  }

  export type UserCreateWithoutSessionsInput = {
    createdAt?: Date | string
    email: string
    emailVerificationExpires?: Date | null | string
    emailVerificationToken?: null | string
    id?: string
    passwordHash: string
    passwordResetExpires?: Date | null | string
    passwordResetToken?: null | string
    phoneNumber: string
    tokens?: TokenCreateNestedManyWithoutUserInput
    username: string
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    createdAt?: Date | string
    email: string
    emailVerificationExpires?: Date | null | string
    emailVerificationToken?: null | string
    id?: string
    passwordHash: string
    passwordResetExpires?: Date | null | string
    passwordResetToken?: null | string
    phoneNumber: string
    tokens?: TokenUncheckedCreateNestedManyWithoutUserInput
    username: string
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where: UserWhereUniqueInput
  }

  export type UserUpsertWithoutSessionsInput = {
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateWithoutSessionsInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerificationExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | null | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    tokens?: TokenUpdateManyWithoutUserNestedInput
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerificationExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | null | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    tokens?: TokenUncheckedUpdateManyWithoutUserNestedInput
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutTokensInput = {
    createdAt?: Date | string
    email: string
    emailVerificationExpires?: Date | null | string
    emailVerificationToken?: null | string
    id?: string
    passwordHash: string
    passwordResetExpires?: Date | null | string
    passwordResetToken?: null | string
    phoneNumber: string
    sessions?: SessionCreateNestedManyWithoutUserInput
    username: string
  }

  export type UserUncheckedCreateWithoutTokensInput = {
    createdAt?: Date | string
    email: string
    emailVerificationExpires?: Date | null | string
    emailVerificationToken?: null | string
    id?: string
    passwordHash: string
    passwordResetExpires?: Date | null | string
    passwordResetToken?: null | string
    phoneNumber: string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    username: string
  }

  export type UserCreateOrConnectWithoutTokensInput = {
    create: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    where: UserWhereUniqueInput
  }

  export type UserUpsertWithoutTokensInput = {
    create: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    update: XOR<UserUpdateWithoutTokensInput, UserUncheckedUpdateWithoutTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTokensInput = {
    data: XOR<UserUpdateWithoutTokensInput, UserUncheckedUpdateWithoutTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateWithoutTokensInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerificationExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | null | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutTokensInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerificationExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetExpires?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | null | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    username?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyUserInput = {
    createdAt?: Date | string
    expiresAt?: Date | null | string
    id?: string
    ip?: null | string
    userAgent?: null | string
  }

  export type TokenCreateManyUserInput = {
    accessToken: string
    createdAt?: Date | string
    expiresAt: Date | string
    id?: string
    refreshToken: string
  }

  export type SessionUpdateWithoutUserInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | null | string
    userAgent?: NullableStringFieldUpdateOperationsInput | null | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | null | string
    userAgent?: NullableStringFieldUpdateOperationsInput | null | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | NullableDateTimeFieldUpdateOperationsInput | null | string
    id?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | null | string
    userAgent?: NullableStringFieldUpdateOperationsInput | null | string
  }

  export type TokenUpdateWithoutUserInput = {
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
  }

  export type TokenUncheckedUpdateWithoutUserInput = {
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
  }

  export type TokenUncheckedUpdateManyWithoutUserInput = {
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    expiresAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}