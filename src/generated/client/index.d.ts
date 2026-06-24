
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model WebUser
 * 
 */
export type WebUser = $Result.DefaultSelection<Prisma.$WebUserPayload>
/**
 * Model WebSession
 * 
 */
export type WebSession = $Result.DefaultSelection<Prisma.$WebSessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model CustomerTask
 * 
 */
export type CustomerTask = $Result.DefaultSelection<Prisma.$CustomerTaskPayload>
/**
 * Model GeneratedEmail
 * 
 */
export type GeneratedEmail = $Result.DefaultSelection<Prisma.$GeneratedEmailPayload>
/**
 * Model BotSession
 * 
 */
export type BotSession = $Result.DefaultSelection<Prisma.$BotSessionPayload>
/**
 * Model ApiAccount
 * 
 */
export type ApiAccount = $Result.DefaultSelection<Prisma.$ApiAccountPayload>
/**
 * Model ApiBooking
 * 
 */
export type ApiBooking = $Result.DefaultSelection<Prisma.$ApiBookingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const WebUserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type WebUserRole = (typeof WebUserRole)[keyof typeof WebUserRole]

}

export type WebUserRole = $Enums.WebUserRole

export const WebUserRole: typeof $Enums.WebUserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more WebUsers
 * const webUsers = await prisma.webUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more WebUsers
   * const webUsers = await prisma.webUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.webUser`: Exposes CRUD operations for the **WebUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebUsers
    * const webUsers = await prisma.webUser.findMany()
    * ```
    */
  get webUser(): Prisma.WebUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webSession`: Exposes CRUD operations for the **WebSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebSessions
    * const webSessions = await prisma.webSession.findMany()
    * ```
    */
  get webSession(): Prisma.WebSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerTask`: Exposes CRUD operations for the **CustomerTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerTasks
    * const customerTasks = await prisma.customerTask.findMany()
    * ```
    */
  get customerTask(): Prisma.CustomerTaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.generatedEmail`: Exposes CRUD operations for the **GeneratedEmail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeneratedEmails
    * const generatedEmails = await prisma.generatedEmail.findMany()
    * ```
    */
  get generatedEmail(): Prisma.GeneratedEmailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.botSession`: Exposes CRUD operations for the **BotSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BotSessions
    * const botSessions = await prisma.botSession.findMany()
    * ```
    */
  get botSession(): Prisma.BotSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiAccount`: Exposes CRUD operations for the **ApiAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiAccounts
    * const apiAccounts = await prisma.apiAccount.findMany()
    * ```
    */
  get apiAccount(): Prisma.ApiAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiBooking`: Exposes CRUD operations for the **ApiBooking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiBookings
    * const apiBookings = await prisma.apiBooking.findMany()
    * ```
    */
  get apiBooking(): Prisma.ApiBookingDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
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


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
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
      (Without<T, U> & U) | (Without<U, T> & T)
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
  : T extends BigInt
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

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
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

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
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
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
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

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
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
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
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
    WebUser: 'WebUser',
    WebSession: 'WebSession',
    Account: 'Account',
    CustomerTask: 'CustomerTask',
    GeneratedEmail: 'GeneratedEmail',
    BotSession: 'BotSession',
    ApiAccount: 'ApiAccount',
    ApiBooking: 'ApiBooking'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "webUser" | "webSession" | "account" | "customerTask" | "generatedEmail" | "botSession" | "apiAccount" | "apiBooking"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      WebUser: {
        payload: Prisma.$WebUserPayload<ExtArgs>
        fields: Prisma.WebUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload>
          }
          findFirst: {
            args: Prisma.WebUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload>
          }
          findMany: {
            args: Prisma.WebUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload>[]
          }
          create: {
            args: Prisma.WebUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload>
          }
          createMany: {
            args: Prisma.WebUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload>[]
          }
          delete: {
            args: Prisma.WebUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload>
          }
          update: {
            args: Prisma.WebUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload>
          }
          deleteMany: {
            args: Prisma.WebUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload>[]
          }
          upsert: {
            args: Prisma.WebUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebUserPayload>
          }
          aggregate: {
            args: Prisma.WebUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebUser>
          }
          groupBy: {
            args: Prisma.WebUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebUserCountArgs<ExtArgs>
            result: $Utils.Optional<WebUserCountAggregateOutputType> | number
          }
        }
      }
      WebSession: {
        payload: Prisma.$WebSessionPayload<ExtArgs>
        fields: Prisma.WebSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload>
          }
          findFirst: {
            args: Prisma.WebSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload>
          }
          findMany: {
            args: Prisma.WebSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload>[]
          }
          create: {
            args: Prisma.WebSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload>
          }
          createMany: {
            args: Prisma.WebSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload>[]
          }
          delete: {
            args: Prisma.WebSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload>
          }
          update: {
            args: Prisma.WebSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload>
          }
          deleteMany: {
            args: Prisma.WebSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload>[]
          }
          upsert: {
            args: Prisma.WebSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebSessionPayload>
          }
          aggregate: {
            args: Prisma.WebSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebSession>
          }
          groupBy: {
            args: Prisma.WebSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebSessionCountArgs<ExtArgs>
            result: $Utils.Optional<WebSessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      CustomerTask: {
        payload: Prisma.$CustomerTaskPayload<ExtArgs>
        fields: Prisma.CustomerTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload>
          }
          findFirst: {
            args: Prisma.CustomerTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload>
          }
          findMany: {
            args: Prisma.CustomerTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload>[]
          }
          create: {
            args: Prisma.CustomerTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload>
          }
          createMany: {
            args: Prisma.CustomerTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload>[]
          }
          delete: {
            args: Prisma.CustomerTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload>
          }
          update: {
            args: Prisma.CustomerTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload>
          }
          deleteMany: {
            args: Prisma.CustomerTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload>[]
          }
          upsert: {
            args: Prisma.CustomerTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTaskPayload>
          }
          aggregate: {
            args: Prisma.CustomerTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerTask>
          }
          groupBy: {
            args: Prisma.CustomerTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerTaskCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerTaskCountAggregateOutputType> | number
          }
        }
      }
      GeneratedEmail: {
        payload: Prisma.$GeneratedEmailPayload<ExtArgs>
        fields: Prisma.GeneratedEmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeneratedEmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeneratedEmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          findFirst: {
            args: Prisma.GeneratedEmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeneratedEmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          findMany: {
            args: Prisma.GeneratedEmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>[]
          }
          create: {
            args: Prisma.GeneratedEmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          createMany: {
            args: Prisma.GeneratedEmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeneratedEmailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>[]
          }
          delete: {
            args: Prisma.GeneratedEmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          update: {
            args: Prisma.GeneratedEmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          deleteMany: {
            args: Prisma.GeneratedEmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeneratedEmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GeneratedEmailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>[]
          }
          upsert: {
            args: Prisma.GeneratedEmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          aggregate: {
            args: Prisma.GeneratedEmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeneratedEmail>
          }
          groupBy: {
            args: Prisma.GeneratedEmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeneratedEmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeneratedEmailCountArgs<ExtArgs>
            result: $Utils.Optional<GeneratedEmailCountAggregateOutputType> | number
          }
        }
      }
      BotSession: {
        payload: Prisma.$BotSessionPayload<ExtArgs>
        fields: Prisma.BotSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BotSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BotSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload>
          }
          findFirst: {
            args: Prisma.BotSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BotSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload>
          }
          findMany: {
            args: Prisma.BotSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload>[]
          }
          create: {
            args: Prisma.BotSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload>
          }
          createMany: {
            args: Prisma.BotSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BotSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload>[]
          }
          delete: {
            args: Prisma.BotSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload>
          }
          update: {
            args: Prisma.BotSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload>
          }
          deleteMany: {
            args: Prisma.BotSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BotSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BotSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload>[]
          }
          upsert: {
            args: Prisma.BotSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotSessionPayload>
          }
          aggregate: {
            args: Prisma.BotSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBotSession>
          }
          groupBy: {
            args: Prisma.BotSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BotSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BotSessionCountArgs<ExtArgs>
            result: $Utils.Optional<BotSessionCountAggregateOutputType> | number
          }
        }
      }
      ApiAccount: {
        payload: Prisma.$ApiAccountPayload<ExtArgs>
        fields: Prisma.ApiAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload>
          }
          findFirst: {
            args: Prisma.ApiAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload>
          }
          findMany: {
            args: Prisma.ApiAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload>[]
          }
          create: {
            args: Prisma.ApiAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload>
          }
          createMany: {
            args: Prisma.ApiAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload>[]
          }
          delete: {
            args: Prisma.ApiAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload>
          }
          update: {
            args: Prisma.ApiAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload>
          }
          deleteMany: {
            args: Prisma.ApiAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload>[]
          }
          upsert: {
            args: Prisma.ApiAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiAccountPayload>
          }
          aggregate: {
            args: Prisma.ApiAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiAccount>
          }
          groupBy: {
            args: Prisma.ApiAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiAccountCountArgs<ExtArgs>
            result: $Utils.Optional<ApiAccountCountAggregateOutputType> | number
          }
        }
      }
      ApiBooking: {
        payload: Prisma.$ApiBookingPayload<ExtArgs>
        fields: Prisma.ApiBookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiBookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiBookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload>
          }
          findFirst: {
            args: Prisma.ApiBookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiBookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload>
          }
          findMany: {
            args: Prisma.ApiBookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload>[]
          }
          create: {
            args: Prisma.ApiBookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload>
          }
          createMany: {
            args: Prisma.ApiBookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiBookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload>[]
          }
          delete: {
            args: Prisma.ApiBookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload>
          }
          update: {
            args: Prisma.ApiBookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload>
          }
          deleteMany: {
            args: Prisma.ApiBookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiBookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiBookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload>[]
          }
          upsert: {
            args: Prisma.ApiBookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiBookingPayload>
          }
          aggregate: {
            args: Prisma.ApiBookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiBooking>
          }
          groupBy: {
            args: Prisma.ApiBookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiBookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiBookingCountArgs<ExtArgs>
            result: $Utils.Optional<ApiBookingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
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
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    webUser?: WebUserOmit
    webSession?: WebSessionOmit
    account?: AccountOmit
    customerTask?: CustomerTaskOmit
    generatedEmail?: GeneratedEmailOmit
    botSession?: BotSessionOmit
    apiAccount?: ApiAccountOmit
    apiBooking?: ApiBookingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

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
   * Count Type WebUserCountOutputType
   */

  export type WebUserCountOutputType = {
    sessions: number
  }

  export type WebUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | WebUserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * WebUserCountOutputType without action
   */
  export type WebUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUserCountOutputType
     */
    select?: WebUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WebUserCountOutputType without action
   */
  export type WebUserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebSessionWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    tasks: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | AccountCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerTaskWhereInput
  }


  /**
   * Count Type ApiAccountCountOutputType
   */

  export type ApiAccountCountOutputType = {
    bookings: number
  }

  export type ApiAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | ApiAccountCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * ApiAccountCountOutputType without action
   */
  export type ApiAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccountCountOutputType
     */
    select?: ApiAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ApiAccountCountOutputType without action
   */
  export type ApiAccountCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiBookingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model WebUser
   */

  export type AggregateWebUser = {
    _count: WebUserCountAggregateOutputType | null
    _min: WebUserMinAggregateOutputType | null
    _max: WebUserMaxAggregateOutputType | null
  }

  export type WebUserMinAggregateOutputType = {
    id: string | null
    username: string | null
    name: string | null
    passwordHash: string | null
    role: $Enums.WebUserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebUserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    name: string | null
    passwordHash: string | null
    role: $Enums.WebUserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebUserCountAggregateOutputType = {
    id: number
    username: number
    name: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WebUserMinAggregateInputType = {
    id?: true
    username?: true
    name?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebUserMaxAggregateInputType = {
    id?: true
    username?: true
    name?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebUserCountAggregateInputType = {
    id?: true
    username?: true
    name?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WebUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebUser to aggregate.
     */
    where?: WebUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebUsers to fetch.
     */
    orderBy?: WebUserOrderByWithRelationInput | WebUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebUsers
    **/
    _count?: true | WebUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebUserMaxAggregateInputType
  }

  export type GetWebUserAggregateType<T extends WebUserAggregateArgs> = {
        [P in keyof T & keyof AggregateWebUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebUser[P]>
      : GetScalarType<T[P], AggregateWebUser[P]>
  }




  export type WebUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebUserWhereInput
    orderBy?: WebUserOrderByWithAggregationInput | WebUserOrderByWithAggregationInput[]
    by: WebUserScalarFieldEnum[] | WebUserScalarFieldEnum
    having?: WebUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebUserCountAggregateInputType | true
    _min?: WebUserMinAggregateInputType
    _max?: WebUserMaxAggregateInputType
  }

  export type WebUserGroupByOutputType = {
    id: string
    username: string
    name: string
    passwordHash: string
    role: $Enums.WebUserRole
    createdAt: Date
    updatedAt: Date
    _count: WebUserCountAggregateOutputType | null
    _min: WebUserMinAggregateOutputType | null
    _max: WebUserMaxAggregateOutputType | null
  }

  type GetWebUserGroupByPayload<T extends WebUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebUserGroupByOutputType[P]>
            : GetScalarType<T[P], WebUserGroupByOutputType[P]>
        }
      >
    >


  export type WebUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | WebUser$sessionsArgs<ExtArgs>
    _count?: boolean | WebUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webUser"]>

  export type WebUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webUser"]>

  export type WebUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webUser"]>

  export type WebUserSelectScalar = {
    id?: boolean
    username?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WebUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "name" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["webUser"]>
  export type WebUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | WebUser$sessionsArgs<ExtArgs>
    _count?: boolean | WebUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WebUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WebUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WebUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebUser"
    objects: {
      sessions: Prisma.$WebSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      name: string
      passwordHash: string
      role: $Enums.WebUserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["webUser"]>
    composites: {}
  }

  type WebUserGetPayload<S extends boolean | null | undefined | WebUserDefaultArgs> = $Result.GetResult<Prisma.$WebUserPayload, S>

  type WebUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebUserCountAggregateInputType | true
    }

  export interface WebUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebUser'], meta: { name: 'WebUser' } }
    /**
     * Find zero or one WebUser that matches the filter.
     * @param {WebUserFindUniqueArgs} args - Arguments to find a WebUser
     * @example
     * // Get one WebUser
     * const webUser = await prisma.webUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebUserFindUniqueArgs>(args: SelectSubset<T, WebUserFindUniqueArgs<ExtArgs>>): Prisma__WebUserClient<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebUserFindUniqueOrThrowArgs} args - Arguments to find a WebUser
     * @example
     * // Get one WebUser
     * const webUser = await prisma.webUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebUserFindUniqueOrThrowArgs>(args: SelectSubset<T, WebUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebUserClient<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebUserFindFirstArgs} args - Arguments to find a WebUser
     * @example
     * // Get one WebUser
     * const webUser = await prisma.webUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebUserFindFirstArgs>(args?: SelectSubset<T, WebUserFindFirstArgs<ExtArgs>>): Prisma__WebUserClient<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebUserFindFirstOrThrowArgs} args - Arguments to find a WebUser
     * @example
     * // Get one WebUser
     * const webUser = await prisma.webUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebUserFindFirstOrThrowArgs>(args?: SelectSubset<T, WebUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebUserClient<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebUsers
     * const webUsers = await prisma.webUser.findMany()
     * 
     * // Get first 10 WebUsers
     * const webUsers = await prisma.webUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webUserWithIdOnly = await prisma.webUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebUserFindManyArgs>(args?: SelectSubset<T, WebUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebUser.
     * @param {WebUserCreateArgs} args - Arguments to create a WebUser.
     * @example
     * // Create one WebUser
     * const WebUser = await prisma.webUser.create({
     *   data: {
     *     // ... data to create a WebUser
     *   }
     * })
     * 
     */
    create<T extends WebUserCreateArgs>(args: SelectSubset<T, WebUserCreateArgs<ExtArgs>>): Prisma__WebUserClient<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebUsers.
     * @param {WebUserCreateManyArgs} args - Arguments to create many WebUsers.
     * @example
     * // Create many WebUsers
     * const webUser = await prisma.webUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebUserCreateManyArgs>(args?: SelectSubset<T, WebUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebUsers and returns the data saved in the database.
     * @param {WebUserCreateManyAndReturnArgs} args - Arguments to create many WebUsers.
     * @example
     * // Create many WebUsers
     * const webUser = await prisma.webUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebUsers and only return the `id`
     * const webUserWithIdOnly = await prisma.webUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebUserCreateManyAndReturnArgs>(args?: SelectSubset<T, WebUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebUser.
     * @param {WebUserDeleteArgs} args - Arguments to delete one WebUser.
     * @example
     * // Delete one WebUser
     * const WebUser = await prisma.webUser.delete({
     *   where: {
     *     // ... filter to delete one WebUser
     *   }
     * })
     * 
     */
    delete<T extends WebUserDeleteArgs>(args: SelectSubset<T, WebUserDeleteArgs<ExtArgs>>): Prisma__WebUserClient<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebUser.
     * @param {WebUserUpdateArgs} args - Arguments to update one WebUser.
     * @example
     * // Update one WebUser
     * const webUser = await prisma.webUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebUserUpdateArgs>(args: SelectSubset<T, WebUserUpdateArgs<ExtArgs>>): Prisma__WebUserClient<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebUsers.
     * @param {WebUserDeleteManyArgs} args - Arguments to filter WebUsers to delete.
     * @example
     * // Delete a few WebUsers
     * const { count } = await prisma.webUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebUserDeleteManyArgs>(args?: SelectSubset<T, WebUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebUsers
     * const webUser = await prisma.webUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebUserUpdateManyArgs>(args: SelectSubset<T, WebUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebUsers and returns the data updated in the database.
     * @param {WebUserUpdateManyAndReturnArgs} args - Arguments to update many WebUsers.
     * @example
     * // Update many WebUsers
     * const webUser = await prisma.webUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebUsers and only return the `id`
     * const webUserWithIdOnly = await prisma.webUser.updateManyAndReturn({
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
    updateManyAndReturn<T extends WebUserUpdateManyAndReturnArgs>(args: SelectSubset<T, WebUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebUser.
     * @param {WebUserUpsertArgs} args - Arguments to update or create a WebUser.
     * @example
     * // Update or create a WebUser
     * const webUser = await prisma.webUser.upsert({
     *   create: {
     *     // ... data to create a WebUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebUser we want to update
     *   }
     * })
     */
    upsert<T extends WebUserUpsertArgs>(args: SelectSubset<T, WebUserUpsertArgs<ExtArgs>>): Prisma__WebUserClient<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebUserCountArgs} args - Arguments to filter WebUsers to count.
     * @example
     * // Count the number of WebUsers
     * const count = await prisma.webUser.count({
     *   where: {
     *     // ... the filter for the WebUsers we want to count
     *   }
     * })
    **/
    count<T extends WebUserCountArgs>(
      args?: Subset<T, WebUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WebUserAggregateArgs>(args: Subset<T, WebUserAggregateArgs>): Prisma.PrismaPromise<GetWebUserAggregateType<T>>

    /**
     * Group by WebUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebUserGroupByArgs} args - Group by arguments.
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
      T extends WebUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebUserGroupByArgs['orderBy'] }
        : { orderBy?: WebUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WebUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebUser model
   */
  readonly fields: WebUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends WebUser$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, WebUser$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebUser model
   */
  interface WebUserFieldRefs {
    readonly id: FieldRef<"WebUser", 'String'>
    readonly username: FieldRef<"WebUser", 'String'>
    readonly name: FieldRef<"WebUser", 'String'>
    readonly passwordHash: FieldRef<"WebUser", 'String'>
    readonly role: FieldRef<"WebUser", 'WebUserRole'>
    readonly createdAt: FieldRef<"WebUser", 'DateTime'>
    readonly updatedAt: FieldRef<"WebUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebUser findUnique
   */
  export type WebUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
    /**
     * Filter, which WebUser to fetch.
     */
    where: WebUserWhereUniqueInput
  }

  /**
   * WebUser findUniqueOrThrow
   */
  export type WebUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
    /**
     * Filter, which WebUser to fetch.
     */
    where: WebUserWhereUniqueInput
  }

  /**
   * WebUser findFirst
   */
  export type WebUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
    /**
     * Filter, which WebUser to fetch.
     */
    where?: WebUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebUsers to fetch.
     */
    orderBy?: WebUserOrderByWithRelationInput | WebUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebUsers.
     */
    cursor?: WebUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebUsers.
     */
    distinct?: WebUserScalarFieldEnum | WebUserScalarFieldEnum[]
  }

  /**
   * WebUser findFirstOrThrow
   */
  export type WebUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
    /**
     * Filter, which WebUser to fetch.
     */
    where?: WebUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebUsers to fetch.
     */
    orderBy?: WebUserOrderByWithRelationInput | WebUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebUsers.
     */
    cursor?: WebUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebUsers.
     */
    distinct?: WebUserScalarFieldEnum | WebUserScalarFieldEnum[]
  }

  /**
   * WebUser findMany
   */
  export type WebUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
    /**
     * Filter, which WebUsers to fetch.
     */
    where?: WebUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebUsers to fetch.
     */
    orderBy?: WebUserOrderByWithRelationInput | WebUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebUsers.
     */
    cursor?: WebUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebUsers.
     */
    distinct?: WebUserScalarFieldEnum | WebUserScalarFieldEnum[]
  }

  /**
   * WebUser create
   */
  export type WebUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
    /**
     * The data needed to create a WebUser.
     */
    data: XOR<WebUserCreateInput, WebUserUncheckedCreateInput>
  }

  /**
   * WebUser createMany
   */
  export type WebUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebUsers.
     */
    data: WebUserCreateManyInput | WebUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebUser createManyAndReturn
   */
  export type WebUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * The data used to create many WebUsers.
     */
    data: WebUserCreateManyInput | WebUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebUser update
   */
  export type WebUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
    /**
     * The data needed to update a WebUser.
     */
    data: XOR<WebUserUpdateInput, WebUserUncheckedUpdateInput>
    /**
     * Choose, which WebUser to update.
     */
    where: WebUserWhereUniqueInput
  }

  /**
   * WebUser updateMany
   */
  export type WebUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebUsers.
     */
    data: XOR<WebUserUpdateManyMutationInput, WebUserUncheckedUpdateManyInput>
    /**
     * Filter which WebUsers to update
     */
    where?: WebUserWhereInput
    /**
     * Limit how many WebUsers to update.
     */
    limit?: number
  }

  /**
   * WebUser updateManyAndReturn
   */
  export type WebUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * The data used to update WebUsers.
     */
    data: XOR<WebUserUpdateManyMutationInput, WebUserUncheckedUpdateManyInput>
    /**
     * Filter which WebUsers to update
     */
    where?: WebUserWhereInput
    /**
     * Limit how many WebUsers to update.
     */
    limit?: number
  }

  /**
   * WebUser upsert
   */
  export type WebUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
    /**
     * The filter to search for the WebUser to update in case it exists.
     */
    where: WebUserWhereUniqueInput
    /**
     * In case the WebUser found by the `where` argument doesn't exist, create a new WebUser with this data.
     */
    create: XOR<WebUserCreateInput, WebUserUncheckedCreateInput>
    /**
     * In case the WebUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebUserUpdateInput, WebUserUncheckedUpdateInput>
  }

  /**
   * WebUser delete
   */
  export type WebUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
    /**
     * Filter which WebUser to delete.
     */
    where: WebUserWhereUniqueInput
  }

  /**
   * WebUser deleteMany
   */
  export type WebUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebUsers to delete
     */
    where?: WebUserWhereInput
    /**
     * Limit how many WebUsers to delete.
     */
    limit?: number
  }

  /**
   * WebUser.sessions
   */
  export type WebUser$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    where?: WebSessionWhereInput
    orderBy?: WebSessionOrderByWithRelationInput | WebSessionOrderByWithRelationInput[]
    cursor?: WebSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebSessionScalarFieldEnum | WebSessionScalarFieldEnum[]
  }

  /**
   * WebUser without action
   */
  export type WebUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebUser
     */
    select?: WebUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebUser
     */
    omit?: WebUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebUserInclude<ExtArgs> | null
  }


  /**
   * Model WebSession
   */

  export type AggregateWebSession = {
    _count: WebSessionCountAggregateOutputType | null
    _min: WebSessionMinAggregateOutputType | null
    _max: WebSessionMaxAggregateOutputType | null
  }

  export type WebSessionMinAggregateOutputType = {
    id: string | null
    tokenHash: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type WebSessionMaxAggregateOutputType = {
    id: string | null
    tokenHash: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type WebSessionCountAggregateOutputType = {
    id: number
    tokenHash: number
    userId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type WebSessionMinAggregateInputType = {
    id?: true
    tokenHash?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type WebSessionMaxAggregateInputType = {
    id?: true
    tokenHash?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type WebSessionCountAggregateInputType = {
    id?: true
    tokenHash?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type WebSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebSession to aggregate.
     */
    where?: WebSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebSessions to fetch.
     */
    orderBy?: WebSessionOrderByWithRelationInput | WebSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebSessions
    **/
    _count?: true | WebSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebSessionMaxAggregateInputType
  }

  export type GetWebSessionAggregateType<T extends WebSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateWebSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebSession[P]>
      : GetScalarType<T[P], AggregateWebSession[P]>
  }




  export type WebSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebSessionWhereInput
    orderBy?: WebSessionOrderByWithAggregationInput | WebSessionOrderByWithAggregationInput[]
    by: WebSessionScalarFieldEnum[] | WebSessionScalarFieldEnum
    having?: WebSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebSessionCountAggregateInputType | true
    _min?: WebSessionMinAggregateInputType
    _max?: WebSessionMaxAggregateInputType
  }

  export type WebSessionGroupByOutputType = {
    id: string
    tokenHash: string
    userId: string
    expiresAt: Date
    createdAt: Date
    _count: WebSessionCountAggregateOutputType | null
    _min: WebSessionMinAggregateOutputType | null
    _max: WebSessionMaxAggregateOutputType | null
  }

  type GetWebSessionGroupByPayload<T extends WebSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebSessionGroupByOutputType[P]>
            : GetScalarType<T[P], WebSessionGroupByOutputType[P]>
        }
      >
    >


  export type WebSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenHash?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | WebUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webSession"]>

  export type WebSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenHash?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | WebUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webSession"]>

  export type WebSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenHash?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | WebUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webSession"]>

  export type WebSessionSelectScalar = {
    id?: boolean
    tokenHash?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type WebSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tokenHash" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["webSession"]>
  export type WebSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | WebUserDefaultArgs<ExtArgs>
  }
  export type WebSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | WebUserDefaultArgs<ExtArgs>
  }
  export type WebSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | WebUserDefaultArgs<ExtArgs>
  }

  export type $WebSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebSession"
    objects: {
      user: Prisma.$WebUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenHash: string
      userId: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["webSession"]>
    composites: {}
  }

  type WebSessionGetPayload<S extends boolean | null | undefined | WebSessionDefaultArgs> = $Result.GetResult<Prisma.$WebSessionPayload, S>

  type WebSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebSessionCountAggregateInputType | true
    }

  export interface WebSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebSession'], meta: { name: 'WebSession' } }
    /**
     * Find zero or one WebSession that matches the filter.
     * @param {WebSessionFindUniqueArgs} args - Arguments to find a WebSession
     * @example
     * // Get one WebSession
     * const webSession = await prisma.webSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebSessionFindUniqueArgs>(args: SelectSubset<T, WebSessionFindUniqueArgs<ExtArgs>>): Prisma__WebSessionClient<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebSessionFindUniqueOrThrowArgs} args - Arguments to find a WebSession
     * @example
     * // Get one WebSession
     * const webSession = await prisma.webSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, WebSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebSessionClient<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionFindFirstArgs} args - Arguments to find a WebSession
     * @example
     * // Get one WebSession
     * const webSession = await prisma.webSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebSessionFindFirstArgs>(args?: SelectSubset<T, WebSessionFindFirstArgs<ExtArgs>>): Prisma__WebSessionClient<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionFindFirstOrThrowArgs} args - Arguments to find a WebSession
     * @example
     * // Get one WebSession
     * const webSession = await prisma.webSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, WebSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebSessionClient<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebSessions
     * const webSessions = await prisma.webSession.findMany()
     * 
     * // Get first 10 WebSessions
     * const webSessions = await prisma.webSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webSessionWithIdOnly = await prisma.webSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebSessionFindManyArgs>(args?: SelectSubset<T, WebSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebSession.
     * @param {WebSessionCreateArgs} args - Arguments to create a WebSession.
     * @example
     * // Create one WebSession
     * const WebSession = await prisma.webSession.create({
     *   data: {
     *     // ... data to create a WebSession
     *   }
     * })
     * 
     */
    create<T extends WebSessionCreateArgs>(args: SelectSubset<T, WebSessionCreateArgs<ExtArgs>>): Prisma__WebSessionClient<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebSessions.
     * @param {WebSessionCreateManyArgs} args - Arguments to create many WebSessions.
     * @example
     * // Create many WebSessions
     * const webSession = await prisma.webSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebSessionCreateManyArgs>(args?: SelectSubset<T, WebSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebSessions and returns the data saved in the database.
     * @param {WebSessionCreateManyAndReturnArgs} args - Arguments to create many WebSessions.
     * @example
     * // Create many WebSessions
     * const webSession = await prisma.webSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebSessions and only return the `id`
     * const webSessionWithIdOnly = await prisma.webSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, WebSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebSession.
     * @param {WebSessionDeleteArgs} args - Arguments to delete one WebSession.
     * @example
     * // Delete one WebSession
     * const WebSession = await prisma.webSession.delete({
     *   where: {
     *     // ... filter to delete one WebSession
     *   }
     * })
     * 
     */
    delete<T extends WebSessionDeleteArgs>(args: SelectSubset<T, WebSessionDeleteArgs<ExtArgs>>): Prisma__WebSessionClient<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebSession.
     * @param {WebSessionUpdateArgs} args - Arguments to update one WebSession.
     * @example
     * // Update one WebSession
     * const webSession = await prisma.webSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebSessionUpdateArgs>(args: SelectSubset<T, WebSessionUpdateArgs<ExtArgs>>): Prisma__WebSessionClient<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebSessions.
     * @param {WebSessionDeleteManyArgs} args - Arguments to filter WebSessions to delete.
     * @example
     * // Delete a few WebSessions
     * const { count } = await prisma.webSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebSessionDeleteManyArgs>(args?: SelectSubset<T, WebSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebSessions
     * const webSession = await prisma.webSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebSessionUpdateManyArgs>(args: SelectSubset<T, WebSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebSessions and returns the data updated in the database.
     * @param {WebSessionUpdateManyAndReturnArgs} args - Arguments to update many WebSessions.
     * @example
     * // Update many WebSessions
     * const webSession = await prisma.webSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebSessions and only return the `id`
     * const webSessionWithIdOnly = await prisma.webSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends WebSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, WebSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebSession.
     * @param {WebSessionUpsertArgs} args - Arguments to update or create a WebSession.
     * @example
     * // Update or create a WebSession
     * const webSession = await prisma.webSession.upsert({
     *   create: {
     *     // ... data to create a WebSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebSession we want to update
     *   }
     * })
     */
    upsert<T extends WebSessionUpsertArgs>(args: SelectSubset<T, WebSessionUpsertArgs<ExtArgs>>): Prisma__WebSessionClient<$Result.GetResult<Prisma.$WebSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionCountArgs} args - Arguments to filter WebSessions to count.
     * @example
     * // Count the number of WebSessions
     * const count = await prisma.webSession.count({
     *   where: {
     *     // ... the filter for the WebSessions we want to count
     *   }
     * })
    **/
    count<T extends WebSessionCountArgs>(
      args?: Subset<T, WebSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WebSessionAggregateArgs>(args: Subset<T, WebSessionAggregateArgs>): Prisma.PrismaPromise<GetWebSessionAggregateType<T>>

    /**
     * Group by WebSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebSessionGroupByArgs} args - Group by arguments.
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
      T extends WebSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebSessionGroupByArgs['orderBy'] }
        : { orderBy?: WebSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WebSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebSession model
   */
  readonly fields: WebSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends WebUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WebUserDefaultArgs<ExtArgs>>): Prisma__WebUserClient<$Result.GetResult<Prisma.$WebUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebSession model
   */
  interface WebSessionFieldRefs {
    readonly id: FieldRef<"WebSession", 'String'>
    readonly tokenHash: FieldRef<"WebSession", 'String'>
    readonly userId: FieldRef<"WebSession", 'String'>
    readonly expiresAt: FieldRef<"WebSession", 'DateTime'>
    readonly createdAt: FieldRef<"WebSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebSession findUnique
   */
  export type WebSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    /**
     * Filter, which WebSession to fetch.
     */
    where: WebSessionWhereUniqueInput
  }

  /**
   * WebSession findUniqueOrThrow
   */
  export type WebSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    /**
     * Filter, which WebSession to fetch.
     */
    where: WebSessionWhereUniqueInput
  }

  /**
   * WebSession findFirst
   */
  export type WebSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    /**
     * Filter, which WebSession to fetch.
     */
    where?: WebSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebSessions to fetch.
     */
    orderBy?: WebSessionOrderByWithRelationInput | WebSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebSessions.
     */
    cursor?: WebSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebSessions.
     */
    distinct?: WebSessionScalarFieldEnum | WebSessionScalarFieldEnum[]
  }

  /**
   * WebSession findFirstOrThrow
   */
  export type WebSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    /**
     * Filter, which WebSession to fetch.
     */
    where?: WebSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebSessions to fetch.
     */
    orderBy?: WebSessionOrderByWithRelationInput | WebSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebSessions.
     */
    cursor?: WebSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebSessions.
     */
    distinct?: WebSessionScalarFieldEnum | WebSessionScalarFieldEnum[]
  }

  /**
   * WebSession findMany
   */
  export type WebSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    /**
     * Filter, which WebSessions to fetch.
     */
    where?: WebSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebSessions to fetch.
     */
    orderBy?: WebSessionOrderByWithRelationInput | WebSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebSessions.
     */
    cursor?: WebSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebSessions.
     */
    distinct?: WebSessionScalarFieldEnum | WebSessionScalarFieldEnum[]
  }

  /**
   * WebSession create
   */
  export type WebSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a WebSession.
     */
    data: XOR<WebSessionCreateInput, WebSessionUncheckedCreateInput>
  }

  /**
   * WebSession createMany
   */
  export type WebSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebSessions.
     */
    data: WebSessionCreateManyInput | WebSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebSession createManyAndReturn
   */
  export type WebSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * The data used to create many WebSessions.
     */
    data: WebSessionCreateManyInput | WebSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebSession update
   */
  export type WebSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a WebSession.
     */
    data: XOR<WebSessionUpdateInput, WebSessionUncheckedUpdateInput>
    /**
     * Choose, which WebSession to update.
     */
    where: WebSessionWhereUniqueInput
  }

  /**
   * WebSession updateMany
   */
  export type WebSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebSessions.
     */
    data: XOR<WebSessionUpdateManyMutationInput, WebSessionUncheckedUpdateManyInput>
    /**
     * Filter which WebSessions to update
     */
    where?: WebSessionWhereInput
    /**
     * Limit how many WebSessions to update.
     */
    limit?: number
  }

  /**
   * WebSession updateManyAndReturn
   */
  export type WebSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * The data used to update WebSessions.
     */
    data: XOR<WebSessionUpdateManyMutationInput, WebSessionUncheckedUpdateManyInput>
    /**
     * Filter which WebSessions to update
     */
    where?: WebSessionWhereInput
    /**
     * Limit how many WebSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebSession upsert
   */
  export type WebSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the WebSession to update in case it exists.
     */
    where: WebSessionWhereUniqueInput
    /**
     * In case the WebSession found by the `where` argument doesn't exist, create a new WebSession with this data.
     */
    create: XOR<WebSessionCreateInput, WebSessionUncheckedCreateInput>
    /**
     * In case the WebSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebSessionUpdateInput, WebSessionUncheckedUpdateInput>
  }

  /**
   * WebSession delete
   */
  export type WebSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
    /**
     * Filter which WebSession to delete.
     */
    where: WebSessionWhereUniqueInput
  }

  /**
   * WebSession deleteMany
   */
  export type WebSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebSessions to delete
     */
    where?: WebSessionWhereInput
    /**
     * Limit how many WebSessions to delete.
     */
    limit?: number
  }

  /**
   * WebSession without action
   */
  export type WebSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebSession
     */
    select?: WebSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebSession
     */
    omit?: WebSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebSessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tasks?: boolean | Account$tasksArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | Account$tasksArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      tasks: Prisma.$CustomerTaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends Account$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Account$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly email: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.tasks
   */
  export type Account$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    where?: CustomerTaskWhereInput
    orderBy?: CustomerTaskOrderByWithRelationInput | CustomerTaskOrderByWithRelationInput[]
    cursor?: CustomerTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerTaskScalarFieldEnum | CustomerTaskScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model CustomerTask
   */

  export type AggregateCustomerTask = {
    _count: CustomerTaskCountAggregateOutputType | null
    _avg: CustomerTaskAvgAggregateOutputType | null
    _sum: CustomerTaskSumAggregateOutputType | null
    _min: CustomerTaskMinAggregateOutputType | null
    _max: CustomerTaskMaxAggregateOutputType | null
  }

  export type CustomerTaskAvgAggregateOutputType = {
    targetLat: number | null
    targetLng: number | null
  }

  export type CustomerTaskSumAggregateOutputType = {
    targetLat: number | null
    targetLng: number | null
  }

  export type CustomerTaskMinAggregateOutputType = {
    id: string | null
    customerName: string | null
    targetShopId: string | null
    targetLat: number | null
    targetLng: number | null
    status: string | null
    accountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerTaskMaxAggregateOutputType = {
    id: string | null
    customerName: string | null
    targetShopId: string | null
    targetLat: number | null
    targetLng: number | null
    status: string | null
    accountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerTaskCountAggregateOutputType = {
    id: number
    customerName: number
    targetShopId: number
    targetLat: number
    targetLng: number
    status: number
    accountId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerTaskAvgAggregateInputType = {
    targetLat?: true
    targetLng?: true
  }

  export type CustomerTaskSumAggregateInputType = {
    targetLat?: true
    targetLng?: true
  }

  export type CustomerTaskMinAggregateInputType = {
    id?: true
    customerName?: true
    targetShopId?: true
    targetLat?: true
    targetLng?: true
    status?: true
    accountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerTaskMaxAggregateInputType = {
    id?: true
    customerName?: true
    targetShopId?: true
    targetLat?: true
    targetLng?: true
    status?: true
    accountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerTaskCountAggregateInputType = {
    id?: true
    customerName?: true
    targetShopId?: true
    targetLat?: true
    targetLng?: true
    status?: true
    accountId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerTask to aggregate.
     */
    where?: CustomerTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerTasks to fetch.
     */
    orderBy?: CustomerTaskOrderByWithRelationInput | CustomerTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerTasks
    **/
    _count?: true | CustomerTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerTaskMaxAggregateInputType
  }

  export type GetCustomerTaskAggregateType<T extends CustomerTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerTask[P]>
      : GetScalarType<T[P], AggregateCustomerTask[P]>
  }




  export type CustomerTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerTaskWhereInput
    orderBy?: CustomerTaskOrderByWithAggregationInput | CustomerTaskOrderByWithAggregationInput[]
    by: CustomerTaskScalarFieldEnum[] | CustomerTaskScalarFieldEnum
    having?: CustomerTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerTaskCountAggregateInputType | true
    _avg?: CustomerTaskAvgAggregateInputType
    _sum?: CustomerTaskSumAggregateInputType
    _min?: CustomerTaskMinAggregateInputType
    _max?: CustomerTaskMaxAggregateInputType
  }

  export type CustomerTaskGroupByOutputType = {
    id: string
    customerName: string
    targetShopId: string
    targetLat: number
    targetLng: number
    status: string
    accountId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerTaskCountAggregateOutputType | null
    _avg: CustomerTaskAvgAggregateOutputType | null
    _sum: CustomerTaskSumAggregateOutputType | null
    _min: CustomerTaskMinAggregateOutputType | null
    _max: CustomerTaskMaxAggregateOutputType | null
  }

  type GetCustomerTaskGroupByPayload<T extends CustomerTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerTaskGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerTaskGroupByOutputType[P]>
        }
      >
    >


  export type CustomerTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    targetShopId?: boolean
    targetLat?: boolean
    targetLng?: boolean
    status?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    account?: boolean | CustomerTask$accountArgs<ExtArgs>
  }, ExtArgs["result"]["customerTask"]>

  export type CustomerTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    targetShopId?: boolean
    targetLat?: boolean
    targetLng?: boolean
    status?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    account?: boolean | CustomerTask$accountArgs<ExtArgs>
  }, ExtArgs["result"]["customerTask"]>

  export type CustomerTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    targetShopId?: boolean
    targetLat?: boolean
    targetLng?: boolean
    status?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    account?: boolean | CustomerTask$accountArgs<ExtArgs>
  }, ExtArgs["result"]["customerTask"]>

  export type CustomerTaskSelectScalar = {
    id?: boolean
    customerName?: boolean
    targetShopId?: boolean
    targetLat?: boolean
    targetLng?: boolean
    status?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerName" | "targetShopId" | "targetLat" | "targetLng" | "status" | "accountId" | "createdAt" | "updatedAt", ExtArgs["result"]["customerTask"]>
  export type CustomerTaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | CustomerTask$accountArgs<ExtArgs>
  }
  export type CustomerTaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | CustomerTask$accountArgs<ExtArgs>
  }
  export type CustomerTaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | CustomerTask$accountArgs<ExtArgs>
  }

  export type $CustomerTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerTask"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerName: string
      targetShopId: string
      targetLat: number
      targetLng: number
      status: string
      accountId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customerTask"]>
    composites: {}
  }

  type CustomerTaskGetPayload<S extends boolean | null | undefined | CustomerTaskDefaultArgs> = $Result.GetResult<Prisma.$CustomerTaskPayload, S>

  type CustomerTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerTaskCountAggregateInputType | true
    }

  export interface CustomerTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerTask'], meta: { name: 'CustomerTask' } }
    /**
     * Find zero or one CustomerTask that matches the filter.
     * @param {CustomerTaskFindUniqueArgs} args - Arguments to find a CustomerTask
     * @example
     * // Get one CustomerTask
     * const customerTask = await prisma.customerTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerTaskFindUniqueArgs>(args: SelectSubset<T, CustomerTaskFindUniqueArgs<ExtArgs>>): Prisma__CustomerTaskClient<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerTaskFindUniqueOrThrowArgs} args - Arguments to find a CustomerTask
     * @example
     * // Get one CustomerTask
     * const customerTask = await prisma.customerTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerTaskClient<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTaskFindFirstArgs} args - Arguments to find a CustomerTask
     * @example
     * // Get one CustomerTask
     * const customerTask = await prisma.customerTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerTaskFindFirstArgs>(args?: SelectSubset<T, CustomerTaskFindFirstArgs<ExtArgs>>): Prisma__CustomerTaskClient<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTaskFindFirstOrThrowArgs} args - Arguments to find a CustomerTask
     * @example
     * // Get one CustomerTask
     * const customerTask = await prisma.customerTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerTaskClient<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerTasks
     * const customerTasks = await prisma.customerTask.findMany()
     * 
     * // Get first 10 CustomerTasks
     * const customerTasks = await prisma.customerTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerTaskWithIdOnly = await prisma.customerTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerTaskFindManyArgs>(args?: SelectSubset<T, CustomerTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerTask.
     * @param {CustomerTaskCreateArgs} args - Arguments to create a CustomerTask.
     * @example
     * // Create one CustomerTask
     * const CustomerTask = await prisma.customerTask.create({
     *   data: {
     *     // ... data to create a CustomerTask
     *   }
     * })
     * 
     */
    create<T extends CustomerTaskCreateArgs>(args: SelectSubset<T, CustomerTaskCreateArgs<ExtArgs>>): Prisma__CustomerTaskClient<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerTasks.
     * @param {CustomerTaskCreateManyArgs} args - Arguments to create many CustomerTasks.
     * @example
     * // Create many CustomerTasks
     * const customerTask = await prisma.customerTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerTaskCreateManyArgs>(args?: SelectSubset<T, CustomerTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerTasks and returns the data saved in the database.
     * @param {CustomerTaskCreateManyAndReturnArgs} args - Arguments to create many CustomerTasks.
     * @example
     * // Create many CustomerTasks
     * const customerTask = await prisma.customerTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerTasks and only return the `id`
     * const customerTaskWithIdOnly = await prisma.customerTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerTask.
     * @param {CustomerTaskDeleteArgs} args - Arguments to delete one CustomerTask.
     * @example
     * // Delete one CustomerTask
     * const CustomerTask = await prisma.customerTask.delete({
     *   where: {
     *     // ... filter to delete one CustomerTask
     *   }
     * })
     * 
     */
    delete<T extends CustomerTaskDeleteArgs>(args: SelectSubset<T, CustomerTaskDeleteArgs<ExtArgs>>): Prisma__CustomerTaskClient<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerTask.
     * @param {CustomerTaskUpdateArgs} args - Arguments to update one CustomerTask.
     * @example
     * // Update one CustomerTask
     * const customerTask = await prisma.customerTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerTaskUpdateArgs>(args: SelectSubset<T, CustomerTaskUpdateArgs<ExtArgs>>): Prisma__CustomerTaskClient<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerTasks.
     * @param {CustomerTaskDeleteManyArgs} args - Arguments to filter CustomerTasks to delete.
     * @example
     * // Delete a few CustomerTasks
     * const { count } = await prisma.customerTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerTaskDeleteManyArgs>(args?: SelectSubset<T, CustomerTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerTasks
     * const customerTask = await prisma.customerTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerTaskUpdateManyArgs>(args: SelectSubset<T, CustomerTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerTasks and returns the data updated in the database.
     * @param {CustomerTaskUpdateManyAndReturnArgs} args - Arguments to update many CustomerTasks.
     * @example
     * // Update many CustomerTasks
     * const customerTask = await prisma.customerTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerTasks and only return the `id`
     * const customerTaskWithIdOnly = await prisma.customerTask.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerTask.
     * @param {CustomerTaskUpsertArgs} args - Arguments to update or create a CustomerTask.
     * @example
     * // Update or create a CustomerTask
     * const customerTask = await prisma.customerTask.upsert({
     *   create: {
     *     // ... data to create a CustomerTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerTask we want to update
     *   }
     * })
     */
    upsert<T extends CustomerTaskUpsertArgs>(args: SelectSubset<T, CustomerTaskUpsertArgs<ExtArgs>>): Prisma__CustomerTaskClient<$Result.GetResult<Prisma.$CustomerTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTaskCountArgs} args - Arguments to filter CustomerTasks to count.
     * @example
     * // Count the number of CustomerTasks
     * const count = await prisma.customerTask.count({
     *   where: {
     *     // ... the filter for the CustomerTasks we want to count
     *   }
     * })
    **/
    count<T extends CustomerTaskCountArgs>(
      args?: Subset<T, CustomerTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerTaskAggregateArgs>(args: Subset<T, CustomerTaskAggregateArgs>): Prisma.PrismaPromise<GetCustomerTaskAggregateType<T>>

    /**
     * Group by CustomerTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTaskGroupByArgs} args - Group by arguments.
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
      T extends CustomerTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerTaskGroupByArgs['orderBy'] }
        : { orderBy?: CustomerTaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerTask model
   */
  readonly fields: CustomerTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends CustomerTask$accountArgs<ExtArgs> = {}>(args?: Subset<T, CustomerTask$accountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomerTask model
   */
  interface CustomerTaskFieldRefs {
    readonly id: FieldRef<"CustomerTask", 'String'>
    readonly customerName: FieldRef<"CustomerTask", 'String'>
    readonly targetShopId: FieldRef<"CustomerTask", 'String'>
    readonly targetLat: FieldRef<"CustomerTask", 'Float'>
    readonly targetLng: FieldRef<"CustomerTask", 'Float'>
    readonly status: FieldRef<"CustomerTask", 'String'>
    readonly accountId: FieldRef<"CustomerTask", 'String'>
    readonly createdAt: FieldRef<"CustomerTask", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomerTask", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerTask findUnique
   */
  export type CustomerTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTask to fetch.
     */
    where: CustomerTaskWhereUniqueInput
  }

  /**
   * CustomerTask findUniqueOrThrow
   */
  export type CustomerTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTask to fetch.
     */
    where: CustomerTaskWhereUniqueInput
  }

  /**
   * CustomerTask findFirst
   */
  export type CustomerTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTask to fetch.
     */
    where?: CustomerTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerTasks to fetch.
     */
    orderBy?: CustomerTaskOrderByWithRelationInput | CustomerTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerTasks.
     */
    cursor?: CustomerTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerTasks.
     */
    distinct?: CustomerTaskScalarFieldEnum | CustomerTaskScalarFieldEnum[]
  }

  /**
   * CustomerTask findFirstOrThrow
   */
  export type CustomerTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTask to fetch.
     */
    where?: CustomerTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerTasks to fetch.
     */
    orderBy?: CustomerTaskOrderByWithRelationInput | CustomerTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerTasks.
     */
    cursor?: CustomerTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerTasks.
     */
    distinct?: CustomerTaskScalarFieldEnum | CustomerTaskScalarFieldEnum[]
  }

  /**
   * CustomerTask findMany
   */
  export type CustomerTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTasks to fetch.
     */
    where?: CustomerTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerTasks to fetch.
     */
    orderBy?: CustomerTaskOrderByWithRelationInput | CustomerTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerTasks.
     */
    cursor?: CustomerTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerTasks.
     */
    distinct?: CustomerTaskScalarFieldEnum | CustomerTaskScalarFieldEnum[]
  }

  /**
   * CustomerTask create
   */
  export type CustomerTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerTask.
     */
    data: XOR<CustomerTaskCreateInput, CustomerTaskUncheckedCreateInput>
  }

  /**
   * CustomerTask createMany
   */
  export type CustomerTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerTasks.
     */
    data: CustomerTaskCreateManyInput | CustomerTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerTask createManyAndReturn
   */
  export type CustomerTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerTasks.
     */
    data: CustomerTaskCreateManyInput | CustomerTaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerTask update
   */
  export type CustomerTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerTask.
     */
    data: XOR<CustomerTaskUpdateInput, CustomerTaskUncheckedUpdateInput>
    /**
     * Choose, which CustomerTask to update.
     */
    where: CustomerTaskWhereUniqueInput
  }

  /**
   * CustomerTask updateMany
   */
  export type CustomerTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerTasks.
     */
    data: XOR<CustomerTaskUpdateManyMutationInput, CustomerTaskUncheckedUpdateManyInput>
    /**
     * Filter which CustomerTasks to update
     */
    where?: CustomerTaskWhereInput
    /**
     * Limit how many CustomerTasks to update.
     */
    limit?: number
  }

  /**
   * CustomerTask updateManyAndReturn
   */
  export type CustomerTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * The data used to update CustomerTasks.
     */
    data: XOR<CustomerTaskUpdateManyMutationInput, CustomerTaskUncheckedUpdateManyInput>
    /**
     * Filter which CustomerTasks to update
     */
    where?: CustomerTaskWhereInput
    /**
     * Limit how many CustomerTasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerTask upsert
   */
  export type CustomerTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerTask to update in case it exists.
     */
    where: CustomerTaskWhereUniqueInput
    /**
     * In case the CustomerTask found by the `where` argument doesn't exist, create a new CustomerTask with this data.
     */
    create: XOR<CustomerTaskCreateInput, CustomerTaskUncheckedCreateInput>
    /**
     * In case the CustomerTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerTaskUpdateInput, CustomerTaskUncheckedUpdateInput>
  }

  /**
   * CustomerTask delete
   */
  export type CustomerTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
    /**
     * Filter which CustomerTask to delete.
     */
    where: CustomerTaskWhereUniqueInput
  }

  /**
   * CustomerTask deleteMany
   */
  export type CustomerTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerTasks to delete
     */
    where?: CustomerTaskWhereInput
    /**
     * Limit how many CustomerTasks to delete.
     */
    limit?: number
  }

  /**
   * CustomerTask.account
   */
  export type CustomerTask$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * CustomerTask without action
   */
  export type CustomerTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTask
     */
    select?: CustomerTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTask
     */
    omit?: CustomerTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTaskInclude<ExtArgs> | null
  }


  /**
   * Model GeneratedEmail
   */

  export type AggregateGeneratedEmail = {
    _count: GeneratedEmailCountAggregateOutputType | null
    _min: GeneratedEmailMinAggregateOutputType | null
    _max: GeneratedEmailMaxAggregateOutputType | null
  }

  export type GeneratedEmailMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    note: string | null
    createdAt: Date | null
  }

  export type GeneratedEmailMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    note: string | null
    createdAt: Date | null
  }

  export type GeneratedEmailCountAggregateOutputType = {
    id: number
    email: number
    password: number
    note: number
    createdAt: number
    _all: number
  }


  export type GeneratedEmailMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    note?: true
    createdAt?: true
  }

  export type GeneratedEmailMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    note?: true
    createdAt?: true
  }

  export type GeneratedEmailCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type GeneratedEmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedEmail to aggregate.
     */
    where?: GeneratedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedEmails to fetch.
     */
    orderBy?: GeneratedEmailOrderByWithRelationInput | GeneratedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeneratedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeneratedEmails
    **/
    _count?: true | GeneratedEmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeneratedEmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeneratedEmailMaxAggregateInputType
  }

  export type GetGeneratedEmailAggregateType<T extends GeneratedEmailAggregateArgs> = {
        [P in keyof T & keyof AggregateGeneratedEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeneratedEmail[P]>
      : GetScalarType<T[P], AggregateGeneratedEmail[P]>
  }




  export type GeneratedEmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneratedEmailWhereInput
    orderBy?: GeneratedEmailOrderByWithAggregationInput | GeneratedEmailOrderByWithAggregationInput[]
    by: GeneratedEmailScalarFieldEnum[] | GeneratedEmailScalarFieldEnum
    having?: GeneratedEmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeneratedEmailCountAggregateInputType | true
    _min?: GeneratedEmailMinAggregateInputType
    _max?: GeneratedEmailMaxAggregateInputType
  }

  export type GeneratedEmailGroupByOutputType = {
    id: string
    email: string
    password: string
    note: string | null
    createdAt: Date
    _count: GeneratedEmailCountAggregateOutputType | null
    _min: GeneratedEmailMinAggregateOutputType | null
    _max: GeneratedEmailMaxAggregateOutputType | null
  }

  type GetGeneratedEmailGroupByPayload<T extends GeneratedEmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeneratedEmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeneratedEmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeneratedEmailGroupByOutputType[P]>
            : GetScalarType<T[P], GeneratedEmailGroupByOutputType[P]>
        }
      >
    >


  export type GeneratedEmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["generatedEmail"]>

  export type GeneratedEmailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["generatedEmail"]>

  export type GeneratedEmailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["generatedEmail"]>

  export type GeneratedEmailSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type GeneratedEmailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "note" | "createdAt", ExtArgs["result"]["generatedEmail"]>

  export type $GeneratedEmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeneratedEmail"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["generatedEmail"]>
    composites: {}
  }

  type GeneratedEmailGetPayload<S extends boolean | null | undefined | GeneratedEmailDefaultArgs> = $Result.GetResult<Prisma.$GeneratedEmailPayload, S>

  type GeneratedEmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GeneratedEmailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeneratedEmailCountAggregateInputType | true
    }

  export interface GeneratedEmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeneratedEmail'], meta: { name: 'GeneratedEmail' } }
    /**
     * Find zero or one GeneratedEmail that matches the filter.
     * @param {GeneratedEmailFindUniqueArgs} args - Arguments to find a GeneratedEmail
     * @example
     * // Get one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeneratedEmailFindUniqueArgs>(args: SelectSubset<T, GeneratedEmailFindUniqueArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GeneratedEmail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GeneratedEmailFindUniqueOrThrowArgs} args - Arguments to find a GeneratedEmail
     * @example
     * // Get one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeneratedEmailFindUniqueOrThrowArgs>(args: SelectSubset<T, GeneratedEmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedEmail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailFindFirstArgs} args - Arguments to find a GeneratedEmail
     * @example
     * // Get one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeneratedEmailFindFirstArgs>(args?: SelectSubset<T, GeneratedEmailFindFirstArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedEmail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailFindFirstOrThrowArgs} args - Arguments to find a GeneratedEmail
     * @example
     * // Get one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeneratedEmailFindFirstOrThrowArgs>(args?: SelectSubset<T, GeneratedEmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GeneratedEmails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeneratedEmails
     * const generatedEmails = await prisma.generatedEmail.findMany()
     * 
     * // Get first 10 GeneratedEmails
     * const generatedEmails = await prisma.generatedEmail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const generatedEmailWithIdOnly = await prisma.generatedEmail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeneratedEmailFindManyArgs>(args?: SelectSubset<T, GeneratedEmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GeneratedEmail.
     * @param {GeneratedEmailCreateArgs} args - Arguments to create a GeneratedEmail.
     * @example
     * // Create one GeneratedEmail
     * const GeneratedEmail = await prisma.generatedEmail.create({
     *   data: {
     *     // ... data to create a GeneratedEmail
     *   }
     * })
     * 
     */
    create<T extends GeneratedEmailCreateArgs>(args: SelectSubset<T, GeneratedEmailCreateArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GeneratedEmails.
     * @param {GeneratedEmailCreateManyArgs} args - Arguments to create many GeneratedEmails.
     * @example
     * // Create many GeneratedEmails
     * const generatedEmail = await prisma.generatedEmail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeneratedEmailCreateManyArgs>(args?: SelectSubset<T, GeneratedEmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeneratedEmails and returns the data saved in the database.
     * @param {GeneratedEmailCreateManyAndReturnArgs} args - Arguments to create many GeneratedEmails.
     * @example
     * // Create many GeneratedEmails
     * const generatedEmail = await prisma.generatedEmail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeneratedEmails and only return the `id`
     * const generatedEmailWithIdOnly = await prisma.generatedEmail.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeneratedEmailCreateManyAndReturnArgs>(args?: SelectSubset<T, GeneratedEmailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GeneratedEmail.
     * @param {GeneratedEmailDeleteArgs} args - Arguments to delete one GeneratedEmail.
     * @example
     * // Delete one GeneratedEmail
     * const GeneratedEmail = await prisma.generatedEmail.delete({
     *   where: {
     *     // ... filter to delete one GeneratedEmail
     *   }
     * })
     * 
     */
    delete<T extends GeneratedEmailDeleteArgs>(args: SelectSubset<T, GeneratedEmailDeleteArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GeneratedEmail.
     * @param {GeneratedEmailUpdateArgs} args - Arguments to update one GeneratedEmail.
     * @example
     * // Update one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeneratedEmailUpdateArgs>(args: SelectSubset<T, GeneratedEmailUpdateArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GeneratedEmails.
     * @param {GeneratedEmailDeleteManyArgs} args - Arguments to filter GeneratedEmails to delete.
     * @example
     * // Delete a few GeneratedEmails
     * const { count } = await prisma.generatedEmail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeneratedEmailDeleteManyArgs>(args?: SelectSubset<T, GeneratedEmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneratedEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeneratedEmails
     * const generatedEmail = await prisma.generatedEmail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeneratedEmailUpdateManyArgs>(args: SelectSubset<T, GeneratedEmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneratedEmails and returns the data updated in the database.
     * @param {GeneratedEmailUpdateManyAndReturnArgs} args - Arguments to update many GeneratedEmails.
     * @example
     * // Update many GeneratedEmails
     * const generatedEmail = await prisma.generatedEmail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GeneratedEmails and only return the `id`
     * const generatedEmailWithIdOnly = await prisma.generatedEmail.updateManyAndReturn({
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
    updateManyAndReturn<T extends GeneratedEmailUpdateManyAndReturnArgs>(args: SelectSubset<T, GeneratedEmailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GeneratedEmail.
     * @param {GeneratedEmailUpsertArgs} args - Arguments to update or create a GeneratedEmail.
     * @example
     * // Update or create a GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.upsert({
     *   create: {
     *     // ... data to create a GeneratedEmail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeneratedEmail we want to update
     *   }
     * })
     */
    upsert<T extends GeneratedEmailUpsertArgs>(args: SelectSubset<T, GeneratedEmailUpsertArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GeneratedEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailCountArgs} args - Arguments to filter GeneratedEmails to count.
     * @example
     * // Count the number of GeneratedEmails
     * const count = await prisma.generatedEmail.count({
     *   where: {
     *     // ... the filter for the GeneratedEmails we want to count
     *   }
     * })
    **/
    count<T extends GeneratedEmailCountArgs>(
      args?: Subset<T, GeneratedEmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeneratedEmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeneratedEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GeneratedEmailAggregateArgs>(args: Subset<T, GeneratedEmailAggregateArgs>): Prisma.PrismaPromise<GetGeneratedEmailAggregateType<T>>

    /**
     * Group by GeneratedEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailGroupByArgs} args - Group by arguments.
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
      T extends GeneratedEmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeneratedEmailGroupByArgs['orderBy'] }
        : { orderBy?: GeneratedEmailGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GeneratedEmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeneratedEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeneratedEmail model
   */
  readonly fields: GeneratedEmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeneratedEmail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeneratedEmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GeneratedEmail model
   */
  interface GeneratedEmailFieldRefs {
    readonly id: FieldRef<"GeneratedEmail", 'String'>
    readonly email: FieldRef<"GeneratedEmail", 'String'>
    readonly password: FieldRef<"GeneratedEmail", 'String'>
    readonly note: FieldRef<"GeneratedEmail", 'String'>
    readonly createdAt: FieldRef<"GeneratedEmail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GeneratedEmail findUnique
   */
  export type GeneratedEmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedEmail to fetch.
     */
    where: GeneratedEmailWhereUniqueInput
  }

  /**
   * GeneratedEmail findUniqueOrThrow
   */
  export type GeneratedEmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedEmail to fetch.
     */
    where: GeneratedEmailWhereUniqueInput
  }

  /**
   * GeneratedEmail findFirst
   */
  export type GeneratedEmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedEmail to fetch.
     */
    where?: GeneratedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedEmails to fetch.
     */
    orderBy?: GeneratedEmailOrderByWithRelationInput | GeneratedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedEmails.
     */
    cursor?: GeneratedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedEmails.
     */
    distinct?: GeneratedEmailScalarFieldEnum | GeneratedEmailScalarFieldEnum[]
  }

  /**
   * GeneratedEmail findFirstOrThrow
   */
  export type GeneratedEmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedEmail to fetch.
     */
    where?: GeneratedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedEmails to fetch.
     */
    orderBy?: GeneratedEmailOrderByWithRelationInput | GeneratedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedEmails.
     */
    cursor?: GeneratedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedEmails.
     */
    distinct?: GeneratedEmailScalarFieldEnum | GeneratedEmailScalarFieldEnum[]
  }

  /**
   * GeneratedEmail findMany
   */
  export type GeneratedEmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedEmails to fetch.
     */
    where?: GeneratedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedEmails to fetch.
     */
    orderBy?: GeneratedEmailOrderByWithRelationInput | GeneratedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeneratedEmails.
     */
    cursor?: GeneratedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedEmails.
     */
    distinct?: GeneratedEmailScalarFieldEnum | GeneratedEmailScalarFieldEnum[]
  }

  /**
   * GeneratedEmail create
   */
  export type GeneratedEmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * The data needed to create a GeneratedEmail.
     */
    data: XOR<GeneratedEmailCreateInput, GeneratedEmailUncheckedCreateInput>
  }

  /**
   * GeneratedEmail createMany
   */
  export type GeneratedEmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeneratedEmails.
     */
    data: GeneratedEmailCreateManyInput | GeneratedEmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneratedEmail createManyAndReturn
   */
  export type GeneratedEmailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * The data used to create many GeneratedEmails.
     */
    data: GeneratedEmailCreateManyInput | GeneratedEmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneratedEmail update
   */
  export type GeneratedEmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * The data needed to update a GeneratedEmail.
     */
    data: XOR<GeneratedEmailUpdateInput, GeneratedEmailUncheckedUpdateInput>
    /**
     * Choose, which GeneratedEmail to update.
     */
    where: GeneratedEmailWhereUniqueInput
  }

  /**
   * GeneratedEmail updateMany
   */
  export type GeneratedEmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeneratedEmails.
     */
    data: XOR<GeneratedEmailUpdateManyMutationInput, GeneratedEmailUncheckedUpdateManyInput>
    /**
     * Filter which GeneratedEmails to update
     */
    where?: GeneratedEmailWhereInput
    /**
     * Limit how many GeneratedEmails to update.
     */
    limit?: number
  }

  /**
   * GeneratedEmail updateManyAndReturn
   */
  export type GeneratedEmailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * The data used to update GeneratedEmails.
     */
    data: XOR<GeneratedEmailUpdateManyMutationInput, GeneratedEmailUncheckedUpdateManyInput>
    /**
     * Filter which GeneratedEmails to update
     */
    where?: GeneratedEmailWhereInput
    /**
     * Limit how many GeneratedEmails to update.
     */
    limit?: number
  }

  /**
   * GeneratedEmail upsert
   */
  export type GeneratedEmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * The filter to search for the GeneratedEmail to update in case it exists.
     */
    where: GeneratedEmailWhereUniqueInput
    /**
     * In case the GeneratedEmail found by the `where` argument doesn't exist, create a new GeneratedEmail with this data.
     */
    create: XOR<GeneratedEmailCreateInput, GeneratedEmailUncheckedCreateInput>
    /**
     * In case the GeneratedEmail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeneratedEmailUpdateInput, GeneratedEmailUncheckedUpdateInput>
  }

  /**
   * GeneratedEmail delete
   */
  export type GeneratedEmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Filter which GeneratedEmail to delete.
     */
    where: GeneratedEmailWhereUniqueInput
  }

  /**
   * GeneratedEmail deleteMany
   */
  export type GeneratedEmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedEmails to delete
     */
    where?: GeneratedEmailWhereInput
    /**
     * Limit how many GeneratedEmails to delete.
     */
    limit?: number
  }

  /**
   * GeneratedEmail without action
   */
  export type GeneratedEmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
  }


  /**
   * Model BotSession
   */

  export type AggregateBotSession = {
    _count: BotSessionCountAggregateOutputType | null
    _avg: BotSessionAvgAggregateOutputType | null
    _sum: BotSessionSumAggregateOutputType | null
    _min: BotSessionMinAggregateOutputType | null
    _max: BotSessionMaxAggregateOutputType | null
  }

  export type BotSessionAvgAggregateOutputType = {
    waitCount: number | null
    partySize: number | null
    lat: number | null
    lng: number | null
  }

  export type BotSessionSumAggregateOutputType = {
    waitCount: number | null
    partySize: number | null
    lat: number | null
    lng: number | null
  }

  export type BotSessionMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    displayName: string | null
    phoneNumber: string | null
    regStatus: string | null
    queueStatus: string | null
    targetShopName: string | null
    currentQueue: string | null
    waitCount: number | null
    partySize: number | null
    cancelReason: string | null
    lat: number | null
    lng: number | null
    zoneName: string | null
    selectedBranch: string | null
    userToken: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BotSessionMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    displayName: string | null
    phoneNumber: string | null
    regStatus: string | null
    queueStatus: string | null
    targetShopName: string | null
    currentQueue: string | null
    waitCount: number | null
    partySize: number | null
    cancelReason: string | null
    lat: number | null
    lng: number | null
    zoneName: string | null
    selectedBranch: string | null
    userToken: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BotSessionCountAggregateOutputType = {
    id: number
    email: number
    password: number
    displayName: number
    phoneNumber: number
    regStatus: number
    queueStatus: number
    targetShopName: number
    currentQueue: number
    waitCount: number
    partySize: number
    cancelReason: number
    lat: number
    lng: number
    zoneName: number
    selectedBranch: number
    userToken: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BotSessionAvgAggregateInputType = {
    waitCount?: true
    partySize?: true
    lat?: true
    lng?: true
  }

  export type BotSessionSumAggregateInputType = {
    waitCount?: true
    partySize?: true
    lat?: true
    lng?: true
  }

  export type BotSessionMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    displayName?: true
    phoneNumber?: true
    regStatus?: true
    queueStatus?: true
    targetShopName?: true
    currentQueue?: true
    waitCount?: true
    partySize?: true
    cancelReason?: true
    lat?: true
    lng?: true
    zoneName?: true
    selectedBranch?: true
    userToken?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BotSessionMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    displayName?: true
    phoneNumber?: true
    regStatus?: true
    queueStatus?: true
    targetShopName?: true
    currentQueue?: true
    waitCount?: true
    partySize?: true
    cancelReason?: true
    lat?: true
    lng?: true
    zoneName?: true
    selectedBranch?: true
    userToken?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BotSessionCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    displayName?: true
    phoneNumber?: true
    regStatus?: true
    queueStatus?: true
    targetShopName?: true
    currentQueue?: true
    waitCount?: true
    partySize?: true
    cancelReason?: true
    lat?: true
    lng?: true
    zoneName?: true
    selectedBranch?: true
    userToken?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BotSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BotSession to aggregate.
     */
    where?: BotSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotSessions to fetch.
     */
    orderBy?: BotSessionOrderByWithRelationInput | BotSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BotSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BotSessions
    **/
    _count?: true | BotSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BotSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BotSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BotSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BotSessionMaxAggregateInputType
  }

  export type GetBotSessionAggregateType<T extends BotSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateBotSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBotSession[P]>
      : GetScalarType<T[P], AggregateBotSession[P]>
  }




  export type BotSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BotSessionWhereInput
    orderBy?: BotSessionOrderByWithAggregationInput | BotSessionOrderByWithAggregationInput[]
    by: BotSessionScalarFieldEnum[] | BotSessionScalarFieldEnum
    having?: BotSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BotSessionCountAggregateInputType | true
    _avg?: BotSessionAvgAggregateInputType
    _sum?: BotSessionSumAggregateInputType
    _min?: BotSessionMinAggregateInputType
    _max?: BotSessionMaxAggregateInputType
  }

  export type BotSessionGroupByOutputType = {
    id: string
    email: string
    password: string
    displayName: string
    phoneNumber: string | null
    regStatus: string
    queueStatus: string
    targetShopName: string | null
    currentQueue: string | null
    waitCount: number | null
    partySize: number | null
    cancelReason: string | null
    lat: number
    lng: number
    zoneName: string
    selectedBranch: string | null
    userToken: string | null
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: BotSessionCountAggregateOutputType | null
    _avg: BotSessionAvgAggregateOutputType | null
    _sum: BotSessionSumAggregateOutputType | null
    _min: BotSessionMinAggregateOutputType | null
    _max: BotSessionMaxAggregateOutputType | null
  }

  type GetBotSessionGroupByPayload<T extends BotSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BotSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BotSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BotSessionGroupByOutputType[P]>
            : GetScalarType<T[P], BotSessionGroupByOutputType[P]>
        }
      >
    >


  export type BotSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    phoneNumber?: boolean
    regStatus?: boolean
    queueStatus?: boolean
    targetShopName?: boolean
    currentQueue?: boolean
    waitCount?: boolean
    partySize?: boolean
    cancelReason?: boolean
    lat?: boolean
    lng?: boolean
    zoneName?: boolean
    selectedBranch?: boolean
    userToken?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["botSession"]>

  export type BotSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    phoneNumber?: boolean
    regStatus?: boolean
    queueStatus?: boolean
    targetShopName?: boolean
    currentQueue?: boolean
    waitCount?: boolean
    partySize?: boolean
    cancelReason?: boolean
    lat?: boolean
    lng?: boolean
    zoneName?: boolean
    selectedBranch?: boolean
    userToken?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["botSession"]>

  export type BotSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    phoneNumber?: boolean
    regStatus?: boolean
    queueStatus?: boolean
    targetShopName?: boolean
    currentQueue?: boolean
    waitCount?: boolean
    partySize?: boolean
    cancelReason?: boolean
    lat?: boolean
    lng?: boolean
    zoneName?: boolean
    selectedBranch?: boolean
    userToken?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["botSession"]>

  export type BotSessionSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    phoneNumber?: boolean
    regStatus?: boolean
    queueStatus?: boolean
    targetShopName?: boolean
    currentQueue?: boolean
    waitCount?: boolean
    partySize?: boolean
    cancelReason?: boolean
    lat?: boolean
    lng?: boolean
    zoneName?: boolean
    selectedBranch?: boolean
    userToken?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BotSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "displayName" | "phoneNumber" | "regStatus" | "queueStatus" | "targetShopName" | "currentQueue" | "waitCount" | "partySize" | "cancelReason" | "lat" | "lng" | "zoneName" | "selectedBranch" | "userToken" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["botSession"]>

  export type $BotSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BotSession"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      displayName: string
      phoneNumber: string | null
      regStatus: string
      queueStatus: string
      targetShopName: string | null
      currentQueue: string | null
      waitCount: number | null
      partySize: number | null
      cancelReason: string | null
      lat: number
      lng: number
      zoneName: string
      selectedBranch: string | null
      userToken: string | null
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["botSession"]>
    composites: {}
  }

  type BotSessionGetPayload<S extends boolean | null | undefined | BotSessionDefaultArgs> = $Result.GetResult<Prisma.$BotSessionPayload, S>

  type BotSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BotSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BotSessionCountAggregateInputType | true
    }

  export interface BotSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BotSession'], meta: { name: 'BotSession' } }
    /**
     * Find zero or one BotSession that matches the filter.
     * @param {BotSessionFindUniqueArgs} args - Arguments to find a BotSession
     * @example
     * // Get one BotSession
     * const botSession = await prisma.botSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BotSessionFindUniqueArgs>(args: SelectSubset<T, BotSessionFindUniqueArgs<ExtArgs>>): Prisma__BotSessionClient<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BotSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BotSessionFindUniqueOrThrowArgs} args - Arguments to find a BotSession
     * @example
     * // Get one BotSession
     * const botSession = await prisma.botSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BotSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, BotSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BotSessionClient<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BotSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotSessionFindFirstArgs} args - Arguments to find a BotSession
     * @example
     * // Get one BotSession
     * const botSession = await prisma.botSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BotSessionFindFirstArgs>(args?: SelectSubset<T, BotSessionFindFirstArgs<ExtArgs>>): Prisma__BotSessionClient<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BotSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotSessionFindFirstOrThrowArgs} args - Arguments to find a BotSession
     * @example
     * // Get one BotSession
     * const botSession = await prisma.botSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BotSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, BotSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BotSessionClient<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BotSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BotSessions
     * const botSessions = await prisma.botSession.findMany()
     * 
     * // Get first 10 BotSessions
     * const botSessions = await prisma.botSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const botSessionWithIdOnly = await prisma.botSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BotSessionFindManyArgs>(args?: SelectSubset<T, BotSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BotSession.
     * @param {BotSessionCreateArgs} args - Arguments to create a BotSession.
     * @example
     * // Create one BotSession
     * const BotSession = await prisma.botSession.create({
     *   data: {
     *     // ... data to create a BotSession
     *   }
     * })
     * 
     */
    create<T extends BotSessionCreateArgs>(args: SelectSubset<T, BotSessionCreateArgs<ExtArgs>>): Prisma__BotSessionClient<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BotSessions.
     * @param {BotSessionCreateManyArgs} args - Arguments to create many BotSessions.
     * @example
     * // Create many BotSessions
     * const botSession = await prisma.botSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BotSessionCreateManyArgs>(args?: SelectSubset<T, BotSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BotSessions and returns the data saved in the database.
     * @param {BotSessionCreateManyAndReturnArgs} args - Arguments to create many BotSessions.
     * @example
     * // Create many BotSessions
     * const botSession = await prisma.botSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BotSessions and only return the `id`
     * const botSessionWithIdOnly = await prisma.botSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BotSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, BotSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BotSession.
     * @param {BotSessionDeleteArgs} args - Arguments to delete one BotSession.
     * @example
     * // Delete one BotSession
     * const BotSession = await prisma.botSession.delete({
     *   where: {
     *     // ... filter to delete one BotSession
     *   }
     * })
     * 
     */
    delete<T extends BotSessionDeleteArgs>(args: SelectSubset<T, BotSessionDeleteArgs<ExtArgs>>): Prisma__BotSessionClient<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BotSession.
     * @param {BotSessionUpdateArgs} args - Arguments to update one BotSession.
     * @example
     * // Update one BotSession
     * const botSession = await prisma.botSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BotSessionUpdateArgs>(args: SelectSubset<T, BotSessionUpdateArgs<ExtArgs>>): Prisma__BotSessionClient<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BotSessions.
     * @param {BotSessionDeleteManyArgs} args - Arguments to filter BotSessions to delete.
     * @example
     * // Delete a few BotSessions
     * const { count } = await prisma.botSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BotSessionDeleteManyArgs>(args?: SelectSubset<T, BotSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BotSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BotSessions
     * const botSession = await prisma.botSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BotSessionUpdateManyArgs>(args: SelectSubset<T, BotSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BotSessions and returns the data updated in the database.
     * @param {BotSessionUpdateManyAndReturnArgs} args - Arguments to update many BotSessions.
     * @example
     * // Update many BotSessions
     * const botSession = await prisma.botSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BotSessions and only return the `id`
     * const botSessionWithIdOnly = await prisma.botSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends BotSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, BotSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BotSession.
     * @param {BotSessionUpsertArgs} args - Arguments to update or create a BotSession.
     * @example
     * // Update or create a BotSession
     * const botSession = await prisma.botSession.upsert({
     *   create: {
     *     // ... data to create a BotSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BotSession we want to update
     *   }
     * })
     */
    upsert<T extends BotSessionUpsertArgs>(args: SelectSubset<T, BotSessionUpsertArgs<ExtArgs>>): Prisma__BotSessionClient<$Result.GetResult<Prisma.$BotSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BotSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotSessionCountArgs} args - Arguments to filter BotSessions to count.
     * @example
     * // Count the number of BotSessions
     * const count = await prisma.botSession.count({
     *   where: {
     *     // ... the filter for the BotSessions we want to count
     *   }
     * })
    **/
    count<T extends BotSessionCountArgs>(
      args?: Subset<T, BotSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BotSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BotSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BotSessionAggregateArgs>(args: Subset<T, BotSessionAggregateArgs>): Prisma.PrismaPromise<GetBotSessionAggregateType<T>>

    /**
     * Group by BotSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotSessionGroupByArgs} args - Group by arguments.
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
      T extends BotSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BotSessionGroupByArgs['orderBy'] }
        : { orderBy?: BotSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BotSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBotSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BotSession model
   */
  readonly fields: BotSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BotSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BotSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BotSession model
   */
  interface BotSessionFieldRefs {
    readonly id: FieldRef<"BotSession", 'String'>
    readonly email: FieldRef<"BotSession", 'String'>
    readonly password: FieldRef<"BotSession", 'String'>
    readonly displayName: FieldRef<"BotSession", 'String'>
    readonly phoneNumber: FieldRef<"BotSession", 'String'>
    readonly regStatus: FieldRef<"BotSession", 'String'>
    readonly queueStatus: FieldRef<"BotSession", 'String'>
    readonly targetShopName: FieldRef<"BotSession", 'String'>
    readonly currentQueue: FieldRef<"BotSession", 'String'>
    readonly waitCount: FieldRef<"BotSession", 'Int'>
    readonly partySize: FieldRef<"BotSession", 'Int'>
    readonly cancelReason: FieldRef<"BotSession", 'String'>
    readonly lat: FieldRef<"BotSession", 'Float'>
    readonly lng: FieldRef<"BotSession", 'Float'>
    readonly zoneName: FieldRef<"BotSession", 'String'>
    readonly selectedBranch: FieldRef<"BotSession", 'String'>
    readonly userToken: FieldRef<"BotSession", 'String'>
    readonly isDeleted: FieldRef<"BotSession", 'Boolean'>
    readonly deletedAt: FieldRef<"BotSession", 'DateTime'>
    readonly createdAt: FieldRef<"BotSession", 'DateTime'>
    readonly updatedAt: FieldRef<"BotSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BotSession findUnique
   */
  export type BotSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * Filter, which BotSession to fetch.
     */
    where: BotSessionWhereUniqueInput
  }

  /**
   * BotSession findUniqueOrThrow
   */
  export type BotSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * Filter, which BotSession to fetch.
     */
    where: BotSessionWhereUniqueInput
  }

  /**
   * BotSession findFirst
   */
  export type BotSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * Filter, which BotSession to fetch.
     */
    where?: BotSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotSessions to fetch.
     */
    orderBy?: BotSessionOrderByWithRelationInput | BotSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BotSessions.
     */
    cursor?: BotSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BotSessions.
     */
    distinct?: BotSessionScalarFieldEnum | BotSessionScalarFieldEnum[]
  }

  /**
   * BotSession findFirstOrThrow
   */
  export type BotSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * Filter, which BotSession to fetch.
     */
    where?: BotSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotSessions to fetch.
     */
    orderBy?: BotSessionOrderByWithRelationInput | BotSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BotSessions.
     */
    cursor?: BotSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BotSessions.
     */
    distinct?: BotSessionScalarFieldEnum | BotSessionScalarFieldEnum[]
  }

  /**
   * BotSession findMany
   */
  export type BotSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * Filter, which BotSessions to fetch.
     */
    where?: BotSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotSessions to fetch.
     */
    orderBy?: BotSessionOrderByWithRelationInput | BotSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BotSessions.
     */
    cursor?: BotSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BotSessions.
     */
    distinct?: BotSessionScalarFieldEnum | BotSessionScalarFieldEnum[]
  }

  /**
   * BotSession create
   */
  export type BotSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * The data needed to create a BotSession.
     */
    data: XOR<BotSessionCreateInput, BotSessionUncheckedCreateInput>
  }

  /**
   * BotSession createMany
   */
  export type BotSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BotSessions.
     */
    data: BotSessionCreateManyInput | BotSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BotSession createManyAndReturn
   */
  export type BotSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * The data used to create many BotSessions.
     */
    data: BotSessionCreateManyInput | BotSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BotSession update
   */
  export type BotSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * The data needed to update a BotSession.
     */
    data: XOR<BotSessionUpdateInput, BotSessionUncheckedUpdateInput>
    /**
     * Choose, which BotSession to update.
     */
    where: BotSessionWhereUniqueInput
  }

  /**
   * BotSession updateMany
   */
  export type BotSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BotSessions.
     */
    data: XOR<BotSessionUpdateManyMutationInput, BotSessionUncheckedUpdateManyInput>
    /**
     * Filter which BotSessions to update
     */
    where?: BotSessionWhereInput
    /**
     * Limit how many BotSessions to update.
     */
    limit?: number
  }

  /**
   * BotSession updateManyAndReturn
   */
  export type BotSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * The data used to update BotSessions.
     */
    data: XOR<BotSessionUpdateManyMutationInput, BotSessionUncheckedUpdateManyInput>
    /**
     * Filter which BotSessions to update
     */
    where?: BotSessionWhereInput
    /**
     * Limit how many BotSessions to update.
     */
    limit?: number
  }

  /**
   * BotSession upsert
   */
  export type BotSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * The filter to search for the BotSession to update in case it exists.
     */
    where: BotSessionWhereUniqueInput
    /**
     * In case the BotSession found by the `where` argument doesn't exist, create a new BotSession with this data.
     */
    create: XOR<BotSessionCreateInput, BotSessionUncheckedCreateInput>
    /**
     * In case the BotSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BotSessionUpdateInput, BotSessionUncheckedUpdateInput>
  }

  /**
   * BotSession delete
   */
  export type BotSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
    /**
     * Filter which BotSession to delete.
     */
    where: BotSessionWhereUniqueInput
  }

  /**
   * BotSession deleteMany
   */
  export type BotSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BotSessions to delete
     */
    where?: BotSessionWhereInput
    /**
     * Limit how many BotSessions to delete.
     */
    limit?: number
  }

  /**
   * BotSession without action
   */
  export type BotSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotSession
     */
    select?: BotSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotSession
     */
    omit?: BotSessionOmit<ExtArgs> | null
  }


  /**
   * Model ApiAccount
   */

  export type AggregateApiAccount = {
    _count: ApiAccountCountAggregateOutputType | null
    _min: ApiAccountMinAggregateOutputType | null
    _max: ApiAccountMaxAggregateOutputType | null
  }

  export type ApiAccountMinAggregateOutputType = {
    id: string | null
    email: string | null
    displayName: string | null
    emailPassword: string | null
    otpCode: string | null
    photoURL: string | null
    accessToken: string | null
    refreshToken: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastUsedAt: Date | null
  }

  export type ApiAccountMaxAggregateOutputType = {
    id: string | null
    email: string | null
    displayName: string | null
    emailPassword: string | null
    otpCode: string | null
    photoURL: string | null
    accessToken: string | null
    refreshToken: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastUsedAt: Date | null
  }

  export type ApiAccountCountAggregateOutputType = {
    id: number
    email: number
    displayName: number
    emailPassword: number
    otpCode: number
    photoURL: number
    accessToken: number
    refreshToken: number
    active: number
    createdAt: number
    updatedAt: number
    lastUsedAt: number
    _all: number
  }


  export type ApiAccountMinAggregateInputType = {
    id?: true
    email?: true
    displayName?: true
    emailPassword?: true
    otpCode?: true
    photoURL?: true
    accessToken?: true
    refreshToken?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    lastUsedAt?: true
  }

  export type ApiAccountMaxAggregateInputType = {
    id?: true
    email?: true
    displayName?: true
    emailPassword?: true
    otpCode?: true
    photoURL?: true
    accessToken?: true
    refreshToken?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    lastUsedAt?: true
  }

  export type ApiAccountCountAggregateInputType = {
    id?: true
    email?: true
    displayName?: true
    emailPassword?: true
    otpCode?: true
    photoURL?: true
    accessToken?: true
    refreshToken?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    lastUsedAt?: true
    _all?: true
  }

  export type ApiAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiAccount to aggregate.
     */
    where?: ApiAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiAccounts to fetch.
     */
    orderBy?: ApiAccountOrderByWithRelationInput | ApiAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiAccounts
    **/
    _count?: true | ApiAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiAccountMaxAggregateInputType
  }

  export type GetApiAccountAggregateType<T extends ApiAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateApiAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiAccount[P]>
      : GetScalarType<T[P], AggregateApiAccount[P]>
  }




  export type ApiAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiAccountWhereInput
    orderBy?: ApiAccountOrderByWithAggregationInput | ApiAccountOrderByWithAggregationInput[]
    by: ApiAccountScalarFieldEnum[] | ApiAccountScalarFieldEnum
    having?: ApiAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiAccountCountAggregateInputType | true
    _min?: ApiAccountMinAggregateInputType
    _max?: ApiAccountMaxAggregateInputType
  }

  export type ApiAccountGroupByOutputType = {
    id: string
    email: string
    displayName: string
    emailPassword: string | null
    otpCode: string | null
    photoURL: string | null
    accessToken: string
    refreshToken: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    lastUsedAt: Date | null
    _count: ApiAccountCountAggregateOutputType | null
    _min: ApiAccountMinAggregateOutputType | null
    _max: ApiAccountMaxAggregateOutputType | null
  }

  type GetApiAccountGroupByPayload<T extends ApiAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiAccountGroupByOutputType[P]>
            : GetScalarType<T[P], ApiAccountGroupByOutputType[P]>
        }
      >
    >


  export type ApiAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    displayName?: boolean
    emailPassword?: boolean
    otpCode?: boolean
    photoURL?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
    bookings?: boolean | ApiAccount$bookingsArgs<ExtArgs>
    _count?: boolean | ApiAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiAccount"]>

  export type ApiAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    displayName?: boolean
    emailPassword?: boolean
    otpCode?: boolean
    photoURL?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
  }, ExtArgs["result"]["apiAccount"]>

  export type ApiAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    displayName?: boolean
    emailPassword?: boolean
    otpCode?: boolean
    photoURL?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
  }, ExtArgs["result"]["apiAccount"]>

  export type ApiAccountSelectScalar = {
    id?: boolean
    email?: boolean
    displayName?: boolean
    emailPassword?: boolean
    otpCode?: boolean
    photoURL?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
  }

  export type ApiAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "displayName" | "emailPassword" | "otpCode" | "photoURL" | "accessToken" | "refreshToken" | "active" | "createdAt" | "updatedAt" | "lastUsedAt", ExtArgs["result"]["apiAccount"]>
  export type ApiAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | ApiAccount$bookingsArgs<ExtArgs>
    _count?: boolean | ApiAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ApiAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ApiAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ApiAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiAccount"
    objects: {
      bookings: Prisma.$ApiBookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      displayName: string
      emailPassword: string | null
      otpCode: string | null
      photoURL: string | null
      accessToken: string
      refreshToken: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
      lastUsedAt: Date | null
    }, ExtArgs["result"]["apiAccount"]>
    composites: {}
  }

  type ApiAccountGetPayload<S extends boolean | null | undefined | ApiAccountDefaultArgs> = $Result.GetResult<Prisma.$ApiAccountPayload, S>

  type ApiAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiAccountCountAggregateInputType | true
    }

  export interface ApiAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiAccount'], meta: { name: 'ApiAccount' } }
    /**
     * Find zero or one ApiAccount that matches the filter.
     * @param {ApiAccountFindUniqueArgs} args - Arguments to find a ApiAccount
     * @example
     * // Get one ApiAccount
     * const apiAccount = await prisma.apiAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiAccountFindUniqueArgs>(args: SelectSubset<T, ApiAccountFindUniqueArgs<ExtArgs>>): Prisma__ApiAccountClient<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiAccountFindUniqueOrThrowArgs} args - Arguments to find a ApiAccount
     * @example
     * // Get one ApiAccount
     * const apiAccount = await prisma.apiAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiAccountClient<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiAccountFindFirstArgs} args - Arguments to find a ApiAccount
     * @example
     * // Get one ApiAccount
     * const apiAccount = await prisma.apiAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiAccountFindFirstArgs>(args?: SelectSubset<T, ApiAccountFindFirstArgs<ExtArgs>>): Prisma__ApiAccountClient<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiAccountFindFirstOrThrowArgs} args - Arguments to find a ApiAccount
     * @example
     * // Get one ApiAccount
     * const apiAccount = await prisma.apiAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiAccountClient<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiAccounts
     * const apiAccounts = await prisma.apiAccount.findMany()
     * 
     * // Get first 10 ApiAccounts
     * const apiAccounts = await prisma.apiAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiAccountWithIdOnly = await prisma.apiAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiAccountFindManyArgs>(args?: SelectSubset<T, ApiAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiAccount.
     * @param {ApiAccountCreateArgs} args - Arguments to create a ApiAccount.
     * @example
     * // Create one ApiAccount
     * const ApiAccount = await prisma.apiAccount.create({
     *   data: {
     *     // ... data to create a ApiAccount
     *   }
     * })
     * 
     */
    create<T extends ApiAccountCreateArgs>(args: SelectSubset<T, ApiAccountCreateArgs<ExtArgs>>): Prisma__ApiAccountClient<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiAccounts.
     * @param {ApiAccountCreateManyArgs} args - Arguments to create many ApiAccounts.
     * @example
     * // Create many ApiAccounts
     * const apiAccount = await prisma.apiAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiAccountCreateManyArgs>(args?: SelectSubset<T, ApiAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiAccounts and returns the data saved in the database.
     * @param {ApiAccountCreateManyAndReturnArgs} args - Arguments to create many ApiAccounts.
     * @example
     * // Create many ApiAccounts
     * const apiAccount = await prisma.apiAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiAccounts and only return the `id`
     * const apiAccountWithIdOnly = await prisma.apiAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiAccount.
     * @param {ApiAccountDeleteArgs} args - Arguments to delete one ApiAccount.
     * @example
     * // Delete one ApiAccount
     * const ApiAccount = await prisma.apiAccount.delete({
     *   where: {
     *     // ... filter to delete one ApiAccount
     *   }
     * })
     * 
     */
    delete<T extends ApiAccountDeleteArgs>(args: SelectSubset<T, ApiAccountDeleteArgs<ExtArgs>>): Prisma__ApiAccountClient<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiAccount.
     * @param {ApiAccountUpdateArgs} args - Arguments to update one ApiAccount.
     * @example
     * // Update one ApiAccount
     * const apiAccount = await prisma.apiAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiAccountUpdateArgs>(args: SelectSubset<T, ApiAccountUpdateArgs<ExtArgs>>): Prisma__ApiAccountClient<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiAccounts.
     * @param {ApiAccountDeleteManyArgs} args - Arguments to filter ApiAccounts to delete.
     * @example
     * // Delete a few ApiAccounts
     * const { count } = await prisma.apiAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiAccountDeleteManyArgs>(args?: SelectSubset<T, ApiAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiAccounts
     * const apiAccount = await prisma.apiAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiAccountUpdateManyArgs>(args: SelectSubset<T, ApiAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiAccounts and returns the data updated in the database.
     * @param {ApiAccountUpdateManyAndReturnArgs} args - Arguments to update many ApiAccounts.
     * @example
     * // Update many ApiAccounts
     * const apiAccount = await prisma.apiAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiAccounts and only return the `id`
     * const apiAccountWithIdOnly = await prisma.apiAccount.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApiAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiAccount.
     * @param {ApiAccountUpsertArgs} args - Arguments to update or create a ApiAccount.
     * @example
     * // Update or create a ApiAccount
     * const apiAccount = await prisma.apiAccount.upsert({
     *   create: {
     *     // ... data to create a ApiAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiAccount we want to update
     *   }
     * })
     */
    upsert<T extends ApiAccountUpsertArgs>(args: SelectSubset<T, ApiAccountUpsertArgs<ExtArgs>>): Prisma__ApiAccountClient<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiAccountCountArgs} args - Arguments to filter ApiAccounts to count.
     * @example
     * // Count the number of ApiAccounts
     * const count = await prisma.apiAccount.count({
     *   where: {
     *     // ... the filter for the ApiAccounts we want to count
     *   }
     * })
    **/
    count<T extends ApiAccountCountArgs>(
      args?: Subset<T, ApiAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApiAccountAggregateArgs>(args: Subset<T, ApiAccountAggregateArgs>): Prisma.PrismaPromise<GetApiAccountAggregateType<T>>

    /**
     * Group by ApiAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiAccountGroupByArgs} args - Group by arguments.
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
      T extends ApiAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiAccountGroupByArgs['orderBy'] }
        : { orderBy?: ApiAccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApiAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiAccount model
   */
  readonly fields: ApiAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends ApiAccount$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, ApiAccount$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiAccount model
   */
  interface ApiAccountFieldRefs {
    readonly id: FieldRef<"ApiAccount", 'String'>
    readonly email: FieldRef<"ApiAccount", 'String'>
    readonly displayName: FieldRef<"ApiAccount", 'String'>
    readonly emailPassword: FieldRef<"ApiAccount", 'String'>
    readonly otpCode: FieldRef<"ApiAccount", 'String'>
    readonly photoURL: FieldRef<"ApiAccount", 'String'>
    readonly accessToken: FieldRef<"ApiAccount", 'String'>
    readonly refreshToken: FieldRef<"ApiAccount", 'String'>
    readonly active: FieldRef<"ApiAccount", 'Boolean'>
    readonly createdAt: FieldRef<"ApiAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiAccount", 'DateTime'>
    readonly lastUsedAt: FieldRef<"ApiAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiAccount findUnique
   */
  export type ApiAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
    /**
     * Filter, which ApiAccount to fetch.
     */
    where: ApiAccountWhereUniqueInput
  }

  /**
   * ApiAccount findUniqueOrThrow
   */
  export type ApiAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
    /**
     * Filter, which ApiAccount to fetch.
     */
    where: ApiAccountWhereUniqueInput
  }

  /**
   * ApiAccount findFirst
   */
  export type ApiAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
    /**
     * Filter, which ApiAccount to fetch.
     */
    where?: ApiAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiAccounts to fetch.
     */
    orderBy?: ApiAccountOrderByWithRelationInput | ApiAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiAccounts.
     */
    cursor?: ApiAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiAccounts.
     */
    distinct?: ApiAccountScalarFieldEnum | ApiAccountScalarFieldEnum[]
  }

  /**
   * ApiAccount findFirstOrThrow
   */
  export type ApiAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
    /**
     * Filter, which ApiAccount to fetch.
     */
    where?: ApiAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiAccounts to fetch.
     */
    orderBy?: ApiAccountOrderByWithRelationInput | ApiAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiAccounts.
     */
    cursor?: ApiAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiAccounts.
     */
    distinct?: ApiAccountScalarFieldEnum | ApiAccountScalarFieldEnum[]
  }

  /**
   * ApiAccount findMany
   */
  export type ApiAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
    /**
     * Filter, which ApiAccounts to fetch.
     */
    where?: ApiAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiAccounts to fetch.
     */
    orderBy?: ApiAccountOrderByWithRelationInput | ApiAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiAccounts.
     */
    cursor?: ApiAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiAccounts.
     */
    distinct?: ApiAccountScalarFieldEnum | ApiAccountScalarFieldEnum[]
  }

  /**
   * ApiAccount create
   */
  export type ApiAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiAccount.
     */
    data: XOR<ApiAccountCreateInput, ApiAccountUncheckedCreateInput>
  }

  /**
   * ApiAccount createMany
   */
  export type ApiAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiAccounts.
     */
    data: ApiAccountCreateManyInput | ApiAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiAccount createManyAndReturn
   */
  export type ApiAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * The data used to create many ApiAccounts.
     */
    data: ApiAccountCreateManyInput | ApiAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiAccount update
   */
  export type ApiAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiAccount.
     */
    data: XOR<ApiAccountUpdateInput, ApiAccountUncheckedUpdateInput>
    /**
     * Choose, which ApiAccount to update.
     */
    where: ApiAccountWhereUniqueInput
  }

  /**
   * ApiAccount updateMany
   */
  export type ApiAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiAccounts.
     */
    data: XOR<ApiAccountUpdateManyMutationInput, ApiAccountUncheckedUpdateManyInput>
    /**
     * Filter which ApiAccounts to update
     */
    where?: ApiAccountWhereInput
    /**
     * Limit how many ApiAccounts to update.
     */
    limit?: number
  }

  /**
   * ApiAccount updateManyAndReturn
   */
  export type ApiAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * The data used to update ApiAccounts.
     */
    data: XOR<ApiAccountUpdateManyMutationInput, ApiAccountUncheckedUpdateManyInput>
    /**
     * Filter which ApiAccounts to update
     */
    where?: ApiAccountWhereInput
    /**
     * Limit how many ApiAccounts to update.
     */
    limit?: number
  }

  /**
   * ApiAccount upsert
   */
  export type ApiAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiAccount to update in case it exists.
     */
    where: ApiAccountWhereUniqueInput
    /**
     * In case the ApiAccount found by the `where` argument doesn't exist, create a new ApiAccount with this data.
     */
    create: XOR<ApiAccountCreateInput, ApiAccountUncheckedCreateInput>
    /**
     * In case the ApiAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiAccountUpdateInput, ApiAccountUncheckedUpdateInput>
  }

  /**
   * ApiAccount delete
   */
  export type ApiAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
    /**
     * Filter which ApiAccount to delete.
     */
    where: ApiAccountWhereUniqueInput
  }

  /**
   * ApiAccount deleteMany
   */
  export type ApiAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiAccounts to delete
     */
    where?: ApiAccountWhereInput
    /**
     * Limit how many ApiAccounts to delete.
     */
    limit?: number
  }

  /**
   * ApiAccount.bookings
   */
  export type ApiAccount$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    where?: ApiBookingWhereInput
    orderBy?: ApiBookingOrderByWithRelationInput | ApiBookingOrderByWithRelationInput[]
    cursor?: ApiBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiBookingScalarFieldEnum | ApiBookingScalarFieldEnum[]
  }

  /**
   * ApiAccount without action
   */
  export type ApiAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiAccount
     */
    select?: ApiAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiAccount
     */
    omit?: ApiAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiAccountInclude<ExtArgs> | null
  }


  /**
   * Model ApiBooking
   */

  export type AggregateApiBooking = {
    _count: ApiBookingCountAggregateOutputType | null
    _avg: ApiBookingAvgAggregateOutputType | null
    _sum: ApiBookingSumAggregateOutputType | null
    _min: ApiBookingMinAggregateOutputType | null
    _max: ApiBookingMaxAggregateOutputType | null
  }

  export type ApiBookingAvgAggregateOutputType = {
    shopId: number | null
    zoneId: number | null
    people: number | null
  }

  export type ApiBookingSumAggregateOutputType = {
    shopId: number | null
    zoneId: number | null
    people: number | null
  }

  export type ApiBookingMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    accountEmail: string | null
    emailPassword: string | null
    accountName: string | null
    otpCode: string | null
    shopId: number | null
    zoneId: number | null
    shopName: string | null
    branch: string | null
    zoneName: string | null
    queueCode: string | null
    queueNo: string | null
    currentQueueCode: string | null
    currentQueueNo: string | null
    waitingAhead: string | null
    queueId: string | null
    status: string | null
    statusText: string | null
    reserverName: string | null
    people: number | null
    reservationTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    cancelledAt: Date | null
  }

  export type ApiBookingMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    accountEmail: string | null
    emailPassword: string | null
    accountName: string | null
    otpCode: string | null
    shopId: number | null
    zoneId: number | null
    shopName: string | null
    branch: string | null
    zoneName: string | null
    queueCode: string | null
    queueNo: string | null
    currentQueueCode: string | null
    currentQueueNo: string | null
    waitingAhead: string | null
    queueId: string | null
    status: string | null
    statusText: string | null
    reserverName: string | null
    people: number | null
    reservationTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    cancelledAt: Date | null
  }

  export type ApiBookingCountAggregateOutputType = {
    id: number
    accountId: number
    accountEmail: number
    emailPassword: number
    accountName: number
    otpCode: number
    shopId: number
    zoneId: number
    shopName: number
    branch: number
    zoneName: number
    queueCode: number
    queueNo: number
    currentQueueCode: number
    currentQueueNo: number
    waitingAhead: number
    queueId: number
    status: number
    statusText: number
    reserverName: number
    people: number
    reservationTime: number
    createdAt: number
    updatedAt: number
    cancelledAt: number
    _all: number
  }


  export type ApiBookingAvgAggregateInputType = {
    shopId?: true
    zoneId?: true
    people?: true
  }

  export type ApiBookingSumAggregateInputType = {
    shopId?: true
    zoneId?: true
    people?: true
  }

  export type ApiBookingMinAggregateInputType = {
    id?: true
    accountId?: true
    accountEmail?: true
    emailPassword?: true
    accountName?: true
    otpCode?: true
    shopId?: true
    zoneId?: true
    shopName?: true
    branch?: true
    zoneName?: true
    queueCode?: true
    queueNo?: true
    currentQueueCode?: true
    currentQueueNo?: true
    waitingAhead?: true
    queueId?: true
    status?: true
    statusText?: true
    reserverName?: true
    people?: true
    reservationTime?: true
    createdAt?: true
    updatedAt?: true
    cancelledAt?: true
  }

  export type ApiBookingMaxAggregateInputType = {
    id?: true
    accountId?: true
    accountEmail?: true
    emailPassword?: true
    accountName?: true
    otpCode?: true
    shopId?: true
    zoneId?: true
    shopName?: true
    branch?: true
    zoneName?: true
    queueCode?: true
    queueNo?: true
    currentQueueCode?: true
    currentQueueNo?: true
    waitingAhead?: true
    queueId?: true
    status?: true
    statusText?: true
    reserverName?: true
    people?: true
    reservationTime?: true
    createdAt?: true
    updatedAt?: true
    cancelledAt?: true
  }

  export type ApiBookingCountAggregateInputType = {
    id?: true
    accountId?: true
    accountEmail?: true
    emailPassword?: true
    accountName?: true
    otpCode?: true
    shopId?: true
    zoneId?: true
    shopName?: true
    branch?: true
    zoneName?: true
    queueCode?: true
    queueNo?: true
    currentQueueCode?: true
    currentQueueNo?: true
    waitingAhead?: true
    queueId?: true
    status?: true
    statusText?: true
    reserverName?: true
    people?: true
    reservationTime?: true
    createdAt?: true
    updatedAt?: true
    cancelledAt?: true
    _all?: true
  }

  export type ApiBookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiBooking to aggregate.
     */
    where?: ApiBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiBookings to fetch.
     */
    orderBy?: ApiBookingOrderByWithRelationInput | ApiBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiBookings
    **/
    _count?: true | ApiBookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApiBookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApiBookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiBookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiBookingMaxAggregateInputType
  }

  export type GetApiBookingAggregateType<T extends ApiBookingAggregateArgs> = {
        [P in keyof T & keyof AggregateApiBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiBooking[P]>
      : GetScalarType<T[P], AggregateApiBooking[P]>
  }




  export type ApiBookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiBookingWhereInput
    orderBy?: ApiBookingOrderByWithAggregationInput | ApiBookingOrderByWithAggregationInput[]
    by: ApiBookingScalarFieldEnum[] | ApiBookingScalarFieldEnum
    having?: ApiBookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiBookingCountAggregateInputType | true
    _avg?: ApiBookingAvgAggregateInputType
    _sum?: ApiBookingSumAggregateInputType
    _min?: ApiBookingMinAggregateInputType
    _max?: ApiBookingMaxAggregateInputType
  }

  export type ApiBookingGroupByOutputType = {
    id: string
    accountId: string
    accountEmail: string
    emailPassword: string | null
    accountName: string
    otpCode: string | null
    shopId: number
    zoneId: number
    shopName: string
    branch: string
    zoneName: string
    queueCode: string
    queueNo: string
    currentQueueCode: string
    currentQueueNo: string
    waitingAhead: string
    queueId: string
    status: string
    statusText: string
    reserverName: string
    people: number
    reservationTime: Date
    createdAt: Date
    updatedAt: Date
    cancelledAt: Date | null
    _count: ApiBookingCountAggregateOutputType | null
    _avg: ApiBookingAvgAggregateOutputType | null
    _sum: ApiBookingSumAggregateOutputType | null
    _min: ApiBookingMinAggregateOutputType | null
    _max: ApiBookingMaxAggregateOutputType | null
  }

  type GetApiBookingGroupByPayload<T extends ApiBookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiBookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiBookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiBookingGroupByOutputType[P]>
            : GetScalarType<T[P], ApiBookingGroupByOutputType[P]>
        }
      >
    >


  export type ApiBookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    accountEmail?: boolean
    emailPassword?: boolean
    accountName?: boolean
    otpCode?: boolean
    shopId?: boolean
    zoneId?: boolean
    shopName?: boolean
    branch?: boolean
    zoneName?: boolean
    queueCode?: boolean
    queueNo?: boolean
    currentQueueCode?: boolean
    currentQueueNo?: boolean
    waitingAhead?: boolean
    queueId?: boolean
    status?: boolean
    statusText?: boolean
    reserverName?: boolean
    people?: boolean
    reservationTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cancelledAt?: boolean
    account?: boolean | ApiAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiBooking"]>

  export type ApiBookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    accountEmail?: boolean
    emailPassword?: boolean
    accountName?: boolean
    otpCode?: boolean
    shopId?: boolean
    zoneId?: boolean
    shopName?: boolean
    branch?: boolean
    zoneName?: boolean
    queueCode?: boolean
    queueNo?: boolean
    currentQueueCode?: boolean
    currentQueueNo?: boolean
    waitingAhead?: boolean
    queueId?: boolean
    status?: boolean
    statusText?: boolean
    reserverName?: boolean
    people?: boolean
    reservationTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cancelledAt?: boolean
    account?: boolean | ApiAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiBooking"]>

  export type ApiBookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    accountEmail?: boolean
    emailPassword?: boolean
    accountName?: boolean
    otpCode?: boolean
    shopId?: boolean
    zoneId?: boolean
    shopName?: boolean
    branch?: boolean
    zoneName?: boolean
    queueCode?: boolean
    queueNo?: boolean
    currentQueueCode?: boolean
    currentQueueNo?: boolean
    waitingAhead?: boolean
    queueId?: boolean
    status?: boolean
    statusText?: boolean
    reserverName?: boolean
    people?: boolean
    reservationTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cancelledAt?: boolean
    account?: boolean | ApiAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiBooking"]>

  export type ApiBookingSelectScalar = {
    id?: boolean
    accountId?: boolean
    accountEmail?: boolean
    emailPassword?: boolean
    accountName?: boolean
    otpCode?: boolean
    shopId?: boolean
    zoneId?: boolean
    shopName?: boolean
    branch?: boolean
    zoneName?: boolean
    queueCode?: boolean
    queueNo?: boolean
    currentQueueCode?: boolean
    currentQueueNo?: boolean
    waitingAhead?: boolean
    queueId?: boolean
    status?: boolean
    statusText?: boolean
    reserverName?: boolean
    people?: boolean
    reservationTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cancelledAt?: boolean
  }

  export type ApiBookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "accountEmail" | "emailPassword" | "accountName" | "otpCode" | "shopId" | "zoneId" | "shopName" | "branch" | "zoneName" | "queueCode" | "queueNo" | "currentQueueCode" | "currentQueueNo" | "waitingAhead" | "queueId" | "status" | "statusText" | "reserverName" | "people" | "reservationTime" | "createdAt" | "updatedAt" | "cancelledAt", ExtArgs["result"]["apiBooking"]>
  export type ApiBookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | ApiAccountDefaultArgs<ExtArgs>
  }
  export type ApiBookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | ApiAccountDefaultArgs<ExtArgs>
  }
  export type ApiBookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | ApiAccountDefaultArgs<ExtArgs>
  }

  export type $ApiBookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiBooking"
    objects: {
      account: Prisma.$ApiAccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      accountEmail: string
      emailPassword: string | null
      accountName: string
      otpCode: string | null
      shopId: number
      zoneId: number
      shopName: string
      branch: string
      zoneName: string
      queueCode: string
      queueNo: string
      currentQueueCode: string
      currentQueueNo: string
      waitingAhead: string
      queueId: string
      status: string
      statusText: string
      reserverName: string
      people: number
      reservationTime: Date
      createdAt: Date
      updatedAt: Date
      cancelledAt: Date | null
    }, ExtArgs["result"]["apiBooking"]>
    composites: {}
  }

  type ApiBookingGetPayload<S extends boolean | null | undefined | ApiBookingDefaultArgs> = $Result.GetResult<Prisma.$ApiBookingPayload, S>

  type ApiBookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiBookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiBookingCountAggregateInputType | true
    }

  export interface ApiBookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiBooking'], meta: { name: 'ApiBooking' } }
    /**
     * Find zero or one ApiBooking that matches the filter.
     * @param {ApiBookingFindUniqueArgs} args - Arguments to find a ApiBooking
     * @example
     * // Get one ApiBooking
     * const apiBooking = await prisma.apiBooking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiBookingFindUniqueArgs>(args: SelectSubset<T, ApiBookingFindUniqueArgs<ExtArgs>>): Prisma__ApiBookingClient<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiBooking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiBookingFindUniqueOrThrowArgs} args - Arguments to find a ApiBooking
     * @example
     * // Get one ApiBooking
     * const apiBooking = await prisma.apiBooking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiBookingFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiBookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiBookingClient<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiBooking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiBookingFindFirstArgs} args - Arguments to find a ApiBooking
     * @example
     * // Get one ApiBooking
     * const apiBooking = await prisma.apiBooking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiBookingFindFirstArgs>(args?: SelectSubset<T, ApiBookingFindFirstArgs<ExtArgs>>): Prisma__ApiBookingClient<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiBooking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiBookingFindFirstOrThrowArgs} args - Arguments to find a ApiBooking
     * @example
     * // Get one ApiBooking
     * const apiBooking = await prisma.apiBooking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiBookingFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiBookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiBookingClient<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiBookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiBookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiBookings
     * const apiBookings = await prisma.apiBooking.findMany()
     * 
     * // Get first 10 ApiBookings
     * const apiBookings = await prisma.apiBooking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiBookingWithIdOnly = await prisma.apiBooking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiBookingFindManyArgs>(args?: SelectSubset<T, ApiBookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiBooking.
     * @param {ApiBookingCreateArgs} args - Arguments to create a ApiBooking.
     * @example
     * // Create one ApiBooking
     * const ApiBooking = await prisma.apiBooking.create({
     *   data: {
     *     // ... data to create a ApiBooking
     *   }
     * })
     * 
     */
    create<T extends ApiBookingCreateArgs>(args: SelectSubset<T, ApiBookingCreateArgs<ExtArgs>>): Prisma__ApiBookingClient<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiBookings.
     * @param {ApiBookingCreateManyArgs} args - Arguments to create many ApiBookings.
     * @example
     * // Create many ApiBookings
     * const apiBooking = await prisma.apiBooking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiBookingCreateManyArgs>(args?: SelectSubset<T, ApiBookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiBookings and returns the data saved in the database.
     * @param {ApiBookingCreateManyAndReturnArgs} args - Arguments to create many ApiBookings.
     * @example
     * // Create many ApiBookings
     * const apiBooking = await prisma.apiBooking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiBookings and only return the `id`
     * const apiBookingWithIdOnly = await prisma.apiBooking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiBookingCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiBookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiBooking.
     * @param {ApiBookingDeleteArgs} args - Arguments to delete one ApiBooking.
     * @example
     * // Delete one ApiBooking
     * const ApiBooking = await prisma.apiBooking.delete({
     *   where: {
     *     // ... filter to delete one ApiBooking
     *   }
     * })
     * 
     */
    delete<T extends ApiBookingDeleteArgs>(args: SelectSubset<T, ApiBookingDeleteArgs<ExtArgs>>): Prisma__ApiBookingClient<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiBooking.
     * @param {ApiBookingUpdateArgs} args - Arguments to update one ApiBooking.
     * @example
     * // Update one ApiBooking
     * const apiBooking = await prisma.apiBooking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiBookingUpdateArgs>(args: SelectSubset<T, ApiBookingUpdateArgs<ExtArgs>>): Prisma__ApiBookingClient<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiBookings.
     * @param {ApiBookingDeleteManyArgs} args - Arguments to filter ApiBookings to delete.
     * @example
     * // Delete a few ApiBookings
     * const { count } = await prisma.apiBooking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiBookingDeleteManyArgs>(args?: SelectSubset<T, ApiBookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiBookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiBookings
     * const apiBooking = await prisma.apiBooking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiBookingUpdateManyArgs>(args: SelectSubset<T, ApiBookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiBookings and returns the data updated in the database.
     * @param {ApiBookingUpdateManyAndReturnArgs} args - Arguments to update many ApiBookings.
     * @example
     * // Update many ApiBookings
     * const apiBooking = await prisma.apiBooking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiBookings and only return the `id`
     * const apiBookingWithIdOnly = await prisma.apiBooking.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApiBookingUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiBookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiBooking.
     * @param {ApiBookingUpsertArgs} args - Arguments to update or create a ApiBooking.
     * @example
     * // Update or create a ApiBooking
     * const apiBooking = await prisma.apiBooking.upsert({
     *   create: {
     *     // ... data to create a ApiBooking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiBooking we want to update
     *   }
     * })
     */
    upsert<T extends ApiBookingUpsertArgs>(args: SelectSubset<T, ApiBookingUpsertArgs<ExtArgs>>): Prisma__ApiBookingClient<$Result.GetResult<Prisma.$ApiBookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiBookingCountArgs} args - Arguments to filter ApiBookings to count.
     * @example
     * // Count the number of ApiBookings
     * const count = await prisma.apiBooking.count({
     *   where: {
     *     // ... the filter for the ApiBookings we want to count
     *   }
     * })
    **/
    count<T extends ApiBookingCountArgs>(
      args?: Subset<T, ApiBookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiBookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiBookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApiBookingAggregateArgs>(args: Subset<T, ApiBookingAggregateArgs>): Prisma.PrismaPromise<GetApiBookingAggregateType<T>>

    /**
     * Group by ApiBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiBookingGroupByArgs} args - Group by arguments.
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
      T extends ApiBookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiBookingGroupByArgs['orderBy'] }
        : { orderBy?: ApiBookingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApiBookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiBooking model
   */
  readonly fields: ApiBookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiBooking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiBookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends ApiAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApiAccountDefaultArgs<ExtArgs>>): Prisma__ApiAccountClient<$Result.GetResult<Prisma.$ApiAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiBooking model
   */
  interface ApiBookingFieldRefs {
    readonly id: FieldRef<"ApiBooking", 'String'>
    readonly accountId: FieldRef<"ApiBooking", 'String'>
    readonly accountEmail: FieldRef<"ApiBooking", 'String'>
    readonly emailPassword: FieldRef<"ApiBooking", 'String'>
    readonly accountName: FieldRef<"ApiBooking", 'String'>
    readonly otpCode: FieldRef<"ApiBooking", 'String'>
    readonly shopId: FieldRef<"ApiBooking", 'Int'>
    readonly zoneId: FieldRef<"ApiBooking", 'Int'>
    readonly shopName: FieldRef<"ApiBooking", 'String'>
    readonly branch: FieldRef<"ApiBooking", 'String'>
    readonly zoneName: FieldRef<"ApiBooking", 'String'>
    readonly queueCode: FieldRef<"ApiBooking", 'String'>
    readonly queueNo: FieldRef<"ApiBooking", 'String'>
    readonly currentQueueCode: FieldRef<"ApiBooking", 'String'>
    readonly currentQueueNo: FieldRef<"ApiBooking", 'String'>
    readonly waitingAhead: FieldRef<"ApiBooking", 'String'>
    readonly queueId: FieldRef<"ApiBooking", 'String'>
    readonly status: FieldRef<"ApiBooking", 'String'>
    readonly statusText: FieldRef<"ApiBooking", 'String'>
    readonly reserverName: FieldRef<"ApiBooking", 'String'>
    readonly people: FieldRef<"ApiBooking", 'Int'>
    readonly reservationTime: FieldRef<"ApiBooking", 'DateTime'>
    readonly createdAt: FieldRef<"ApiBooking", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiBooking", 'DateTime'>
    readonly cancelledAt: FieldRef<"ApiBooking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiBooking findUnique
   */
  export type ApiBookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    /**
     * Filter, which ApiBooking to fetch.
     */
    where: ApiBookingWhereUniqueInput
  }

  /**
   * ApiBooking findUniqueOrThrow
   */
  export type ApiBookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    /**
     * Filter, which ApiBooking to fetch.
     */
    where: ApiBookingWhereUniqueInput
  }

  /**
   * ApiBooking findFirst
   */
  export type ApiBookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    /**
     * Filter, which ApiBooking to fetch.
     */
    where?: ApiBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiBookings to fetch.
     */
    orderBy?: ApiBookingOrderByWithRelationInput | ApiBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiBookings.
     */
    cursor?: ApiBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiBookings.
     */
    distinct?: ApiBookingScalarFieldEnum | ApiBookingScalarFieldEnum[]
  }

  /**
   * ApiBooking findFirstOrThrow
   */
  export type ApiBookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    /**
     * Filter, which ApiBooking to fetch.
     */
    where?: ApiBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiBookings to fetch.
     */
    orderBy?: ApiBookingOrderByWithRelationInput | ApiBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiBookings.
     */
    cursor?: ApiBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiBookings.
     */
    distinct?: ApiBookingScalarFieldEnum | ApiBookingScalarFieldEnum[]
  }

  /**
   * ApiBooking findMany
   */
  export type ApiBookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    /**
     * Filter, which ApiBookings to fetch.
     */
    where?: ApiBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiBookings to fetch.
     */
    orderBy?: ApiBookingOrderByWithRelationInput | ApiBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiBookings.
     */
    cursor?: ApiBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiBookings.
     */
    distinct?: ApiBookingScalarFieldEnum | ApiBookingScalarFieldEnum[]
  }

  /**
   * ApiBooking create
   */
  export type ApiBookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiBooking.
     */
    data: XOR<ApiBookingCreateInput, ApiBookingUncheckedCreateInput>
  }

  /**
   * ApiBooking createMany
   */
  export type ApiBookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiBookings.
     */
    data: ApiBookingCreateManyInput | ApiBookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiBooking createManyAndReturn
   */
  export type ApiBookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * The data used to create many ApiBookings.
     */
    data: ApiBookingCreateManyInput | ApiBookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiBooking update
   */
  export type ApiBookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiBooking.
     */
    data: XOR<ApiBookingUpdateInput, ApiBookingUncheckedUpdateInput>
    /**
     * Choose, which ApiBooking to update.
     */
    where: ApiBookingWhereUniqueInput
  }

  /**
   * ApiBooking updateMany
   */
  export type ApiBookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiBookings.
     */
    data: XOR<ApiBookingUpdateManyMutationInput, ApiBookingUncheckedUpdateManyInput>
    /**
     * Filter which ApiBookings to update
     */
    where?: ApiBookingWhereInput
    /**
     * Limit how many ApiBookings to update.
     */
    limit?: number
  }

  /**
   * ApiBooking updateManyAndReturn
   */
  export type ApiBookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * The data used to update ApiBookings.
     */
    data: XOR<ApiBookingUpdateManyMutationInput, ApiBookingUncheckedUpdateManyInput>
    /**
     * Filter which ApiBookings to update
     */
    where?: ApiBookingWhereInput
    /**
     * Limit how many ApiBookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiBooking upsert
   */
  export type ApiBookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiBooking to update in case it exists.
     */
    where: ApiBookingWhereUniqueInput
    /**
     * In case the ApiBooking found by the `where` argument doesn't exist, create a new ApiBooking with this data.
     */
    create: XOR<ApiBookingCreateInput, ApiBookingUncheckedCreateInput>
    /**
     * In case the ApiBooking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiBookingUpdateInput, ApiBookingUncheckedUpdateInput>
  }

  /**
   * ApiBooking delete
   */
  export type ApiBookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
    /**
     * Filter which ApiBooking to delete.
     */
    where: ApiBookingWhereUniqueInput
  }

  /**
   * ApiBooking deleteMany
   */
  export type ApiBookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiBookings to delete
     */
    where?: ApiBookingWhereInput
    /**
     * Limit how many ApiBookings to delete.
     */
    limit?: number
  }

  /**
   * ApiBooking without action
   */
  export type ApiBookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiBooking
     */
    select?: ApiBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiBooking
     */
    omit?: ApiBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiBookingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const WebUserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    name: 'name',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WebUserScalarFieldEnum = (typeof WebUserScalarFieldEnum)[keyof typeof WebUserScalarFieldEnum]


  export const WebSessionScalarFieldEnum: {
    id: 'id',
    tokenHash: 'tokenHash',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type WebSessionScalarFieldEnum = (typeof WebSessionScalarFieldEnum)[keyof typeof WebSessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const CustomerTaskScalarFieldEnum: {
    id: 'id',
    customerName: 'customerName',
    targetShopId: 'targetShopId',
    targetLat: 'targetLat',
    targetLng: 'targetLng',
    status: 'status',
    accountId: 'accountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerTaskScalarFieldEnum = (typeof CustomerTaskScalarFieldEnum)[keyof typeof CustomerTaskScalarFieldEnum]


  export const GeneratedEmailScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type GeneratedEmailScalarFieldEnum = (typeof GeneratedEmailScalarFieldEnum)[keyof typeof GeneratedEmailScalarFieldEnum]


  export const BotSessionScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    displayName: 'displayName',
    phoneNumber: 'phoneNumber',
    regStatus: 'regStatus',
    queueStatus: 'queueStatus',
    targetShopName: 'targetShopName',
    currentQueue: 'currentQueue',
    waitCount: 'waitCount',
    partySize: 'partySize',
    cancelReason: 'cancelReason',
    lat: 'lat',
    lng: 'lng',
    zoneName: 'zoneName',
    selectedBranch: 'selectedBranch',
    userToken: 'userToken',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BotSessionScalarFieldEnum = (typeof BotSessionScalarFieldEnum)[keyof typeof BotSessionScalarFieldEnum]


  export const ApiAccountScalarFieldEnum: {
    id: 'id',
    email: 'email',
    displayName: 'displayName',
    emailPassword: 'emailPassword',
    otpCode: 'otpCode',
    photoURL: 'photoURL',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastUsedAt: 'lastUsedAt'
  };

  export type ApiAccountScalarFieldEnum = (typeof ApiAccountScalarFieldEnum)[keyof typeof ApiAccountScalarFieldEnum]


  export const ApiBookingScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    accountEmail: 'accountEmail',
    emailPassword: 'emailPassword',
    accountName: 'accountName',
    otpCode: 'otpCode',
    shopId: 'shopId',
    zoneId: 'zoneId',
    shopName: 'shopName',
    branch: 'branch',
    zoneName: 'zoneName',
    queueCode: 'queueCode',
    queueNo: 'queueNo',
    currentQueueCode: 'currentQueueCode',
    currentQueueNo: 'currentQueueNo',
    waitingAhead: 'waitingAhead',
    queueId: 'queueId',
    status: 'status',
    statusText: 'statusText',
    reserverName: 'reserverName',
    people: 'people',
    reservationTime: 'reservationTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    cancelledAt: 'cancelledAt'
  };

  export type ApiBookingScalarFieldEnum = (typeof ApiBookingScalarFieldEnum)[keyof typeof ApiBookingScalarFieldEnum]


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
   * Reference to a field of type 'WebUserRole'
   */
  export type EnumWebUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WebUserRole'>
    


  /**
   * Reference to a field of type 'WebUserRole[]'
   */
  export type ListEnumWebUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WebUserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type WebUserWhereInput = {
    AND?: WebUserWhereInput | WebUserWhereInput[]
    OR?: WebUserWhereInput[]
    NOT?: WebUserWhereInput | WebUserWhereInput[]
    id?: StringFilter<"WebUser"> | string
    username?: StringFilter<"WebUser"> | string
    name?: StringFilter<"WebUser"> | string
    passwordHash?: StringFilter<"WebUser"> | string
    role?: EnumWebUserRoleFilter<"WebUser"> | $Enums.WebUserRole
    createdAt?: DateTimeFilter<"WebUser"> | Date | string
    updatedAt?: DateTimeFilter<"WebUser"> | Date | string
    sessions?: WebSessionListRelationFilter
  }

  export type WebUserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: WebSessionOrderByRelationAggregateInput
  }

  export type WebUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: WebUserWhereInput | WebUserWhereInput[]
    OR?: WebUserWhereInput[]
    NOT?: WebUserWhereInput | WebUserWhereInput[]
    name?: StringFilter<"WebUser"> | string
    passwordHash?: StringFilter<"WebUser"> | string
    role?: EnumWebUserRoleFilter<"WebUser"> | $Enums.WebUserRole
    createdAt?: DateTimeFilter<"WebUser"> | Date | string
    updatedAt?: DateTimeFilter<"WebUser"> | Date | string
    sessions?: WebSessionListRelationFilter
  }, "id" | "username">

  export type WebUserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WebUserCountOrderByAggregateInput
    _max?: WebUserMaxOrderByAggregateInput
    _min?: WebUserMinOrderByAggregateInput
  }

  export type WebUserScalarWhereWithAggregatesInput = {
    AND?: WebUserScalarWhereWithAggregatesInput | WebUserScalarWhereWithAggregatesInput[]
    OR?: WebUserScalarWhereWithAggregatesInput[]
    NOT?: WebUserScalarWhereWithAggregatesInput | WebUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebUser"> | string
    username?: StringWithAggregatesFilter<"WebUser"> | string
    name?: StringWithAggregatesFilter<"WebUser"> | string
    passwordHash?: StringWithAggregatesFilter<"WebUser"> | string
    role?: EnumWebUserRoleWithAggregatesFilter<"WebUser"> | $Enums.WebUserRole
    createdAt?: DateTimeWithAggregatesFilter<"WebUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WebUser"> | Date | string
  }

  export type WebSessionWhereInput = {
    AND?: WebSessionWhereInput | WebSessionWhereInput[]
    OR?: WebSessionWhereInput[]
    NOT?: WebSessionWhereInput | WebSessionWhereInput[]
    id?: StringFilter<"WebSession"> | string
    tokenHash?: StringFilter<"WebSession"> | string
    userId?: StringFilter<"WebSession"> | string
    expiresAt?: DateTimeFilter<"WebSession"> | Date | string
    createdAt?: DateTimeFilter<"WebSession"> | Date | string
    user?: XOR<WebUserScalarRelationFilter, WebUserWhereInput>
  }

  export type WebSessionOrderByWithRelationInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: WebUserOrderByWithRelationInput
  }

  export type WebSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: WebSessionWhereInput | WebSessionWhereInput[]
    OR?: WebSessionWhereInput[]
    NOT?: WebSessionWhereInput | WebSessionWhereInput[]
    userId?: StringFilter<"WebSession"> | string
    expiresAt?: DateTimeFilter<"WebSession"> | Date | string
    createdAt?: DateTimeFilter<"WebSession"> | Date | string
    user?: XOR<WebUserScalarRelationFilter, WebUserWhereInput>
  }, "id" | "tokenHash">

  export type WebSessionOrderByWithAggregationInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: WebSessionCountOrderByAggregateInput
    _max?: WebSessionMaxOrderByAggregateInput
    _min?: WebSessionMinOrderByAggregateInput
  }

  export type WebSessionScalarWhereWithAggregatesInput = {
    AND?: WebSessionScalarWhereWithAggregatesInput | WebSessionScalarWhereWithAggregatesInput[]
    OR?: WebSessionScalarWhereWithAggregatesInput[]
    NOT?: WebSessionScalarWhereWithAggregatesInput | WebSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebSession"> | string
    tokenHash?: StringWithAggregatesFilter<"WebSession"> | string
    userId?: StringWithAggregatesFilter<"WebSession"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"WebSession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"WebSession"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    email?: StringFilter<"Account"> | string
    password?: StringFilter<"Account"> | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    tasks?: CustomerTaskListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tasks?: CustomerTaskOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    password?: StringFilter<"Account"> | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    tasks?: CustomerTaskListRelationFilter
  }, "id" | "email">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    email?: StringWithAggregatesFilter<"Account"> | string
    password?: StringWithAggregatesFilter<"Account"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type CustomerTaskWhereInput = {
    AND?: CustomerTaskWhereInput | CustomerTaskWhereInput[]
    OR?: CustomerTaskWhereInput[]
    NOT?: CustomerTaskWhereInput | CustomerTaskWhereInput[]
    id?: StringFilter<"CustomerTask"> | string
    customerName?: StringFilter<"CustomerTask"> | string
    targetShopId?: StringFilter<"CustomerTask"> | string
    targetLat?: FloatFilter<"CustomerTask"> | number
    targetLng?: FloatFilter<"CustomerTask"> | number
    status?: StringFilter<"CustomerTask"> | string
    accountId?: StringNullableFilter<"CustomerTask"> | string | null
    createdAt?: DateTimeFilter<"CustomerTask"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerTask"> | Date | string
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
  }

  export type CustomerTaskOrderByWithRelationInput = {
    id?: SortOrder
    customerName?: SortOrder
    targetShopId?: SortOrder
    targetLat?: SortOrder
    targetLng?: SortOrder
    status?: SortOrder
    accountId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    account?: AccountOrderByWithRelationInput
  }

  export type CustomerTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerTaskWhereInput | CustomerTaskWhereInput[]
    OR?: CustomerTaskWhereInput[]
    NOT?: CustomerTaskWhereInput | CustomerTaskWhereInput[]
    customerName?: StringFilter<"CustomerTask"> | string
    targetShopId?: StringFilter<"CustomerTask"> | string
    targetLat?: FloatFilter<"CustomerTask"> | number
    targetLng?: FloatFilter<"CustomerTask"> | number
    status?: StringFilter<"CustomerTask"> | string
    accountId?: StringNullableFilter<"CustomerTask"> | string | null
    createdAt?: DateTimeFilter<"CustomerTask"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerTask"> | Date | string
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
  }, "id">

  export type CustomerTaskOrderByWithAggregationInput = {
    id?: SortOrder
    customerName?: SortOrder
    targetShopId?: SortOrder
    targetLat?: SortOrder
    targetLng?: SortOrder
    status?: SortOrder
    accountId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerTaskCountOrderByAggregateInput
    _avg?: CustomerTaskAvgOrderByAggregateInput
    _max?: CustomerTaskMaxOrderByAggregateInput
    _min?: CustomerTaskMinOrderByAggregateInput
    _sum?: CustomerTaskSumOrderByAggregateInput
  }

  export type CustomerTaskScalarWhereWithAggregatesInput = {
    AND?: CustomerTaskScalarWhereWithAggregatesInput | CustomerTaskScalarWhereWithAggregatesInput[]
    OR?: CustomerTaskScalarWhereWithAggregatesInput[]
    NOT?: CustomerTaskScalarWhereWithAggregatesInput | CustomerTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerTask"> | string
    customerName?: StringWithAggregatesFilter<"CustomerTask"> | string
    targetShopId?: StringWithAggregatesFilter<"CustomerTask"> | string
    targetLat?: FloatWithAggregatesFilter<"CustomerTask"> | number
    targetLng?: FloatWithAggregatesFilter<"CustomerTask"> | number
    status?: StringWithAggregatesFilter<"CustomerTask"> | string
    accountId?: StringNullableWithAggregatesFilter<"CustomerTask"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CustomerTask"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomerTask"> | Date | string
  }

  export type GeneratedEmailWhereInput = {
    AND?: GeneratedEmailWhereInput | GeneratedEmailWhereInput[]
    OR?: GeneratedEmailWhereInput[]
    NOT?: GeneratedEmailWhereInput | GeneratedEmailWhereInput[]
    id?: StringFilter<"GeneratedEmail"> | string
    email?: StringFilter<"GeneratedEmail"> | string
    password?: StringFilter<"GeneratedEmail"> | string
    note?: StringNullableFilter<"GeneratedEmail"> | string | null
    createdAt?: DateTimeFilter<"GeneratedEmail"> | Date | string
  }

  export type GeneratedEmailOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedEmailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: GeneratedEmailWhereInput | GeneratedEmailWhereInput[]
    OR?: GeneratedEmailWhereInput[]
    NOT?: GeneratedEmailWhereInput | GeneratedEmailWhereInput[]
    password?: StringFilter<"GeneratedEmail"> | string
    note?: StringNullableFilter<"GeneratedEmail"> | string | null
    createdAt?: DateTimeFilter<"GeneratedEmail"> | Date | string
  }, "id" | "email">

  export type GeneratedEmailOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GeneratedEmailCountOrderByAggregateInput
    _max?: GeneratedEmailMaxOrderByAggregateInput
    _min?: GeneratedEmailMinOrderByAggregateInput
  }

  export type GeneratedEmailScalarWhereWithAggregatesInput = {
    AND?: GeneratedEmailScalarWhereWithAggregatesInput | GeneratedEmailScalarWhereWithAggregatesInput[]
    OR?: GeneratedEmailScalarWhereWithAggregatesInput[]
    NOT?: GeneratedEmailScalarWhereWithAggregatesInput | GeneratedEmailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GeneratedEmail"> | string
    email?: StringWithAggregatesFilter<"GeneratedEmail"> | string
    password?: StringWithAggregatesFilter<"GeneratedEmail"> | string
    note?: StringNullableWithAggregatesFilter<"GeneratedEmail"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GeneratedEmail"> | Date | string
  }

  export type BotSessionWhereInput = {
    AND?: BotSessionWhereInput | BotSessionWhereInput[]
    OR?: BotSessionWhereInput[]
    NOT?: BotSessionWhereInput | BotSessionWhereInput[]
    id?: StringFilter<"BotSession"> | string
    email?: StringFilter<"BotSession"> | string
    password?: StringFilter<"BotSession"> | string
    displayName?: StringFilter<"BotSession"> | string
    phoneNumber?: StringNullableFilter<"BotSession"> | string | null
    regStatus?: StringFilter<"BotSession"> | string
    queueStatus?: StringFilter<"BotSession"> | string
    targetShopName?: StringNullableFilter<"BotSession"> | string | null
    currentQueue?: StringNullableFilter<"BotSession"> | string | null
    waitCount?: IntNullableFilter<"BotSession"> | number | null
    partySize?: IntNullableFilter<"BotSession"> | number | null
    cancelReason?: StringNullableFilter<"BotSession"> | string | null
    lat?: FloatFilter<"BotSession"> | number
    lng?: FloatFilter<"BotSession"> | number
    zoneName?: StringFilter<"BotSession"> | string
    selectedBranch?: StringNullableFilter<"BotSession"> | string | null
    userToken?: StringNullableFilter<"BotSession"> | string | null
    isDeleted?: BoolFilter<"BotSession"> | boolean
    deletedAt?: DateTimeNullableFilter<"BotSession"> | Date | string | null
    createdAt?: DateTimeFilter<"BotSession"> | Date | string
    updatedAt?: DateTimeFilter<"BotSession"> | Date | string
  }

  export type BotSessionOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    regStatus?: SortOrder
    queueStatus?: SortOrder
    targetShopName?: SortOrderInput | SortOrder
    currentQueue?: SortOrderInput | SortOrder
    waitCount?: SortOrderInput | SortOrder
    partySize?: SortOrderInput | SortOrder
    cancelReason?: SortOrderInput | SortOrder
    lat?: SortOrder
    lng?: SortOrder
    zoneName?: SortOrder
    selectedBranch?: SortOrderInput | SortOrder
    userToken?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BotSessionWhereInput | BotSessionWhereInput[]
    OR?: BotSessionWhereInput[]
    NOT?: BotSessionWhereInput | BotSessionWhereInput[]
    email?: StringFilter<"BotSession"> | string
    password?: StringFilter<"BotSession"> | string
    displayName?: StringFilter<"BotSession"> | string
    phoneNumber?: StringNullableFilter<"BotSession"> | string | null
    regStatus?: StringFilter<"BotSession"> | string
    queueStatus?: StringFilter<"BotSession"> | string
    targetShopName?: StringNullableFilter<"BotSession"> | string | null
    currentQueue?: StringNullableFilter<"BotSession"> | string | null
    waitCount?: IntNullableFilter<"BotSession"> | number | null
    partySize?: IntNullableFilter<"BotSession"> | number | null
    cancelReason?: StringNullableFilter<"BotSession"> | string | null
    lat?: FloatFilter<"BotSession"> | number
    lng?: FloatFilter<"BotSession"> | number
    zoneName?: StringFilter<"BotSession"> | string
    selectedBranch?: StringNullableFilter<"BotSession"> | string | null
    userToken?: StringNullableFilter<"BotSession"> | string | null
    isDeleted?: BoolFilter<"BotSession"> | boolean
    deletedAt?: DateTimeNullableFilter<"BotSession"> | Date | string | null
    createdAt?: DateTimeFilter<"BotSession"> | Date | string
    updatedAt?: DateTimeFilter<"BotSession"> | Date | string
  }, "id">

  export type BotSessionOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    regStatus?: SortOrder
    queueStatus?: SortOrder
    targetShopName?: SortOrderInput | SortOrder
    currentQueue?: SortOrderInput | SortOrder
    waitCount?: SortOrderInput | SortOrder
    partySize?: SortOrderInput | SortOrder
    cancelReason?: SortOrderInput | SortOrder
    lat?: SortOrder
    lng?: SortOrder
    zoneName?: SortOrder
    selectedBranch?: SortOrderInput | SortOrder
    userToken?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BotSessionCountOrderByAggregateInput
    _avg?: BotSessionAvgOrderByAggregateInput
    _max?: BotSessionMaxOrderByAggregateInput
    _min?: BotSessionMinOrderByAggregateInput
    _sum?: BotSessionSumOrderByAggregateInput
  }

  export type BotSessionScalarWhereWithAggregatesInput = {
    AND?: BotSessionScalarWhereWithAggregatesInput | BotSessionScalarWhereWithAggregatesInput[]
    OR?: BotSessionScalarWhereWithAggregatesInput[]
    NOT?: BotSessionScalarWhereWithAggregatesInput | BotSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BotSession"> | string
    email?: StringWithAggregatesFilter<"BotSession"> | string
    password?: StringWithAggregatesFilter<"BotSession"> | string
    displayName?: StringWithAggregatesFilter<"BotSession"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"BotSession"> | string | null
    regStatus?: StringWithAggregatesFilter<"BotSession"> | string
    queueStatus?: StringWithAggregatesFilter<"BotSession"> | string
    targetShopName?: StringNullableWithAggregatesFilter<"BotSession"> | string | null
    currentQueue?: StringNullableWithAggregatesFilter<"BotSession"> | string | null
    waitCount?: IntNullableWithAggregatesFilter<"BotSession"> | number | null
    partySize?: IntNullableWithAggregatesFilter<"BotSession"> | number | null
    cancelReason?: StringNullableWithAggregatesFilter<"BotSession"> | string | null
    lat?: FloatWithAggregatesFilter<"BotSession"> | number
    lng?: FloatWithAggregatesFilter<"BotSession"> | number
    zoneName?: StringWithAggregatesFilter<"BotSession"> | string
    selectedBranch?: StringNullableWithAggregatesFilter<"BotSession"> | string | null
    userToken?: StringNullableWithAggregatesFilter<"BotSession"> | string | null
    isDeleted?: BoolWithAggregatesFilter<"BotSession"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"BotSession"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BotSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BotSession"> | Date | string
  }

  export type ApiAccountWhereInput = {
    AND?: ApiAccountWhereInput | ApiAccountWhereInput[]
    OR?: ApiAccountWhereInput[]
    NOT?: ApiAccountWhereInput | ApiAccountWhereInput[]
    id?: StringFilter<"ApiAccount"> | string
    email?: StringFilter<"ApiAccount"> | string
    displayName?: StringFilter<"ApiAccount"> | string
    emailPassword?: StringNullableFilter<"ApiAccount"> | string | null
    otpCode?: StringNullableFilter<"ApiAccount"> | string | null
    photoURL?: StringNullableFilter<"ApiAccount"> | string | null
    accessToken?: StringFilter<"ApiAccount"> | string
    refreshToken?: StringNullableFilter<"ApiAccount"> | string | null
    active?: BoolFilter<"ApiAccount"> | boolean
    createdAt?: DateTimeFilter<"ApiAccount"> | Date | string
    updatedAt?: DateTimeFilter<"ApiAccount"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"ApiAccount"> | Date | string | null
    bookings?: ApiBookingListRelationFilter
  }

  export type ApiAccountOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    emailPassword?: SortOrderInput | SortOrder
    otpCode?: SortOrderInput | SortOrder
    photoURL?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    bookings?: ApiBookingOrderByRelationAggregateInput
  }

  export type ApiAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ApiAccountWhereInput | ApiAccountWhereInput[]
    OR?: ApiAccountWhereInput[]
    NOT?: ApiAccountWhereInput | ApiAccountWhereInput[]
    displayName?: StringFilter<"ApiAccount"> | string
    emailPassword?: StringNullableFilter<"ApiAccount"> | string | null
    otpCode?: StringNullableFilter<"ApiAccount"> | string | null
    photoURL?: StringNullableFilter<"ApiAccount"> | string | null
    accessToken?: StringFilter<"ApiAccount"> | string
    refreshToken?: StringNullableFilter<"ApiAccount"> | string | null
    active?: BoolFilter<"ApiAccount"> | boolean
    createdAt?: DateTimeFilter<"ApiAccount"> | Date | string
    updatedAt?: DateTimeFilter<"ApiAccount"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"ApiAccount"> | Date | string | null
    bookings?: ApiBookingListRelationFilter
  }, "id" | "email">

  export type ApiAccountOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    emailPassword?: SortOrderInput | SortOrder
    otpCode?: SortOrderInput | SortOrder
    photoURL?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    _count?: ApiAccountCountOrderByAggregateInput
    _max?: ApiAccountMaxOrderByAggregateInput
    _min?: ApiAccountMinOrderByAggregateInput
  }

  export type ApiAccountScalarWhereWithAggregatesInput = {
    AND?: ApiAccountScalarWhereWithAggregatesInput | ApiAccountScalarWhereWithAggregatesInput[]
    OR?: ApiAccountScalarWhereWithAggregatesInput[]
    NOT?: ApiAccountScalarWhereWithAggregatesInput | ApiAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiAccount"> | string
    email?: StringWithAggregatesFilter<"ApiAccount"> | string
    displayName?: StringWithAggregatesFilter<"ApiAccount"> | string
    emailPassword?: StringNullableWithAggregatesFilter<"ApiAccount"> | string | null
    otpCode?: StringNullableWithAggregatesFilter<"ApiAccount"> | string | null
    photoURL?: StringNullableWithAggregatesFilter<"ApiAccount"> | string | null
    accessToken?: StringWithAggregatesFilter<"ApiAccount"> | string
    refreshToken?: StringNullableWithAggregatesFilter<"ApiAccount"> | string | null
    active?: BoolWithAggregatesFilter<"ApiAccount"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ApiAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiAccount"> | Date | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiAccount"> | Date | string | null
  }

  export type ApiBookingWhereInput = {
    AND?: ApiBookingWhereInput | ApiBookingWhereInput[]
    OR?: ApiBookingWhereInput[]
    NOT?: ApiBookingWhereInput | ApiBookingWhereInput[]
    id?: StringFilter<"ApiBooking"> | string
    accountId?: StringFilter<"ApiBooking"> | string
    accountEmail?: StringFilter<"ApiBooking"> | string
    emailPassword?: StringNullableFilter<"ApiBooking"> | string | null
    accountName?: StringFilter<"ApiBooking"> | string
    otpCode?: StringNullableFilter<"ApiBooking"> | string | null
    shopId?: IntFilter<"ApiBooking"> | number
    zoneId?: IntFilter<"ApiBooking"> | number
    shopName?: StringFilter<"ApiBooking"> | string
    branch?: StringFilter<"ApiBooking"> | string
    zoneName?: StringFilter<"ApiBooking"> | string
    queueCode?: StringFilter<"ApiBooking"> | string
    queueNo?: StringFilter<"ApiBooking"> | string
    currentQueueCode?: StringFilter<"ApiBooking"> | string
    currentQueueNo?: StringFilter<"ApiBooking"> | string
    waitingAhead?: StringFilter<"ApiBooking"> | string
    queueId?: StringFilter<"ApiBooking"> | string
    status?: StringFilter<"ApiBooking"> | string
    statusText?: StringFilter<"ApiBooking"> | string
    reserverName?: StringFilter<"ApiBooking"> | string
    people?: IntFilter<"ApiBooking"> | number
    reservationTime?: DateTimeFilter<"ApiBooking"> | Date | string
    createdAt?: DateTimeFilter<"ApiBooking"> | Date | string
    updatedAt?: DateTimeFilter<"ApiBooking"> | Date | string
    cancelledAt?: DateTimeNullableFilter<"ApiBooking"> | Date | string | null
    account?: XOR<ApiAccountScalarRelationFilter, ApiAccountWhereInput>
  }

  export type ApiBookingOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    accountEmail?: SortOrder
    emailPassword?: SortOrderInput | SortOrder
    accountName?: SortOrder
    otpCode?: SortOrderInput | SortOrder
    shopId?: SortOrder
    zoneId?: SortOrder
    shopName?: SortOrder
    branch?: SortOrder
    zoneName?: SortOrder
    queueCode?: SortOrder
    queueNo?: SortOrder
    currentQueueCode?: SortOrder
    currentQueueNo?: SortOrder
    waitingAhead?: SortOrder
    queueId?: SortOrder
    status?: SortOrder
    statusText?: SortOrder
    reserverName?: SortOrder
    people?: SortOrder
    reservationTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    account?: ApiAccountOrderByWithRelationInput
  }

  export type ApiBookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApiBookingWhereInput | ApiBookingWhereInput[]
    OR?: ApiBookingWhereInput[]
    NOT?: ApiBookingWhereInput | ApiBookingWhereInput[]
    accountId?: StringFilter<"ApiBooking"> | string
    accountEmail?: StringFilter<"ApiBooking"> | string
    emailPassword?: StringNullableFilter<"ApiBooking"> | string | null
    accountName?: StringFilter<"ApiBooking"> | string
    otpCode?: StringNullableFilter<"ApiBooking"> | string | null
    shopId?: IntFilter<"ApiBooking"> | number
    zoneId?: IntFilter<"ApiBooking"> | number
    shopName?: StringFilter<"ApiBooking"> | string
    branch?: StringFilter<"ApiBooking"> | string
    zoneName?: StringFilter<"ApiBooking"> | string
    queueCode?: StringFilter<"ApiBooking"> | string
    queueNo?: StringFilter<"ApiBooking"> | string
    currentQueueCode?: StringFilter<"ApiBooking"> | string
    currentQueueNo?: StringFilter<"ApiBooking"> | string
    waitingAhead?: StringFilter<"ApiBooking"> | string
    queueId?: StringFilter<"ApiBooking"> | string
    status?: StringFilter<"ApiBooking"> | string
    statusText?: StringFilter<"ApiBooking"> | string
    reserverName?: StringFilter<"ApiBooking"> | string
    people?: IntFilter<"ApiBooking"> | number
    reservationTime?: DateTimeFilter<"ApiBooking"> | Date | string
    createdAt?: DateTimeFilter<"ApiBooking"> | Date | string
    updatedAt?: DateTimeFilter<"ApiBooking"> | Date | string
    cancelledAt?: DateTimeNullableFilter<"ApiBooking"> | Date | string | null
    account?: XOR<ApiAccountScalarRelationFilter, ApiAccountWhereInput>
  }, "id">

  export type ApiBookingOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    accountEmail?: SortOrder
    emailPassword?: SortOrderInput | SortOrder
    accountName?: SortOrder
    otpCode?: SortOrderInput | SortOrder
    shopId?: SortOrder
    zoneId?: SortOrder
    shopName?: SortOrder
    branch?: SortOrder
    zoneName?: SortOrder
    queueCode?: SortOrder
    queueNo?: SortOrder
    currentQueueCode?: SortOrder
    currentQueueNo?: SortOrder
    waitingAhead?: SortOrder
    queueId?: SortOrder
    status?: SortOrder
    statusText?: SortOrder
    reserverName?: SortOrder
    people?: SortOrder
    reservationTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    _count?: ApiBookingCountOrderByAggregateInput
    _avg?: ApiBookingAvgOrderByAggregateInput
    _max?: ApiBookingMaxOrderByAggregateInput
    _min?: ApiBookingMinOrderByAggregateInput
    _sum?: ApiBookingSumOrderByAggregateInput
  }

  export type ApiBookingScalarWhereWithAggregatesInput = {
    AND?: ApiBookingScalarWhereWithAggregatesInput | ApiBookingScalarWhereWithAggregatesInput[]
    OR?: ApiBookingScalarWhereWithAggregatesInput[]
    NOT?: ApiBookingScalarWhereWithAggregatesInput | ApiBookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiBooking"> | string
    accountId?: StringWithAggregatesFilter<"ApiBooking"> | string
    accountEmail?: StringWithAggregatesFilter<"ApiBooking"> | string
    emailPassword?: StringNullableWithAggregatesFilter<"ApiBooking"> | string | null
    accountName?: StringWithAggregatesFilter<"ApiBooking"> | string
    otpCode?: StringNullableWithAggregatesFilter<"ApiBooking"> | string | null
    shopId?: IntWithAggregatesFilter<"ApiBooking"> | number
    zoneId?: IntWithAggregatesFilter<"ApiBooking"> | number
    shopName?: StringWithAggregatesFilter<"ApiBooking"> | string
    branch?: StringWithAggregatesFilter<"ApiBooking"> | string
    zoneName?: StringWithAggregatesFilter<"ApiBooking"> | string
    queueCode?: StringWithAggregatesFilter<"ApiBooking"> | string
    queueNo?: StringWithAggregatesFilter<"ApiBooking"> | string
    currentQueueCode?: StringWithAggregatesFilter<"ApiBooking"> | string
    currentQueueNo?: StringWithAggregatesFilter<"ApiBooking"> | string
    waitingAhead?: StringWithAggregatesFilter<"ApiBooking"> | string
    queueId?: StringWithAggregatesFilter<"ApiBooking"> | string
    status?: StringWithAggregatesFilter<"ApiBooking"> | string
    statusText?: StringWithAggregatesFilter<"ApiBooking"> | string
    reserverName?: StringWithAggregatesFilter<"ApiBooking"> | string
    people?: IntWithAggregatesFilter<"ApiBooking"> | number
    reservationTime?: DateTimeWithAggregatesFilter<"ApiBooking"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ApiBooking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiBooking"> | Date | string
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"ApiBooking"> | Date | string | null
  }

  export type WebUserCreateInput = {
    id?: string
    username: string
    name: string
    passwordHash: string
    role?: $Enums.WebUserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: WebSessionCreateNestedManyWithoutUserInput
  }

  export type WebUserUncheckedCreateInput = {
    id?: string
    username: string
    name: string
    passwordHash: string
    role?: $Enums.WebUserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: WebSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type WebUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumWebUserRoleFieldUpdateOperationsInput | $Enums.WebUserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: WebSessionUpdateManyWithoutUserNestedInput
  }

  export type WebUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumWebUserRoleFieldUpdateOperationsInput | $Enums.WebUserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: WebSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WebUserCreateManyInput = {
    id?: string
    username: string
    name: string
    passwordHash: string
    role?: $Enums.WebUserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumWebUserRoleFieldUpdateOperationsInput | $Enums.WebUserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumWebUserRoleFieldUpdateOperationsInput | $Enums.WebUserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebSessionCreateInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: WebUserCreateNestedOneWithoutSessionsInput
  }

  export type WebSessionUncheckedCreateInput = {
    id?: string
    tokenHash: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WebSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: WebUserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type WebSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebSessionCreateManyInput = {
    id?: string
    tokenHash: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WebSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: CustomerTaskCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: CustomerTaskUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: CustomerTaskUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: CustomerTaskUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTaskCreateInput = {
    id?: string
    customerName: string
    targetShopId: string
    targetLat: number
    targetLng: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    account?: AccountCreateNestedOneWithoutTasksInput
  }

  export type CustomerTaskUncheckedCreateInput = {
    id?: string
    customerName: string
    targetShopId: string
    targetLat: number
    targetLng: number
    status?: string
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    targetShopId?: StringFieldUpdateOperationsInput | string
    targetLat?: FloatFieldUpdateOperationsInput | number
    targetLng?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneWithoutTasksNestedInput
  }

  export type CustomerTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    targetShopId?: StringFieldUpdateOperationsInput | string
    targetLat?: FloatFieldUpdateOperationsInput | number
    targetLng?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTaskCreateManyInput = {
    id?: string
    customerName: string
    targetShopId: string
    targetLat: number
    targetLng: number
    status?: string
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    targetShopId?: StringFieldUpdateOperationsInput | string
    targetLat?: FloatFieldUpdateOperationsInput | number
    targetLng?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    targetShopId?: StringFieldUpdateOperationsInput | string
    targetLat?: FloatFieldUpdateOperationsInput | number
    targetLng?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailCreateInput = {
    id?: string
    email: string
    password: string
    note?: string | null
    createdAt?: Date | string
  }

  export type GeneratedEmailUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    note?: string | null
    createdAt?: Date | string
  }

  export type GeneratedEmailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailCreateManyInput = {
    id?: string
    email: string
    password: string
    note?: string | null
    createdAt?: Date | string
  }

  export type GeneratedEmailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotSessionCreateInput = {
    id?: string
    email: string
    password: string
    displayName: string
    phoneNumber?: string | null
    regStatus?: string
    queueStatus?: string
    targetShopName?: string | null
    currentQueue?: string | null
    waitCount?: number | null
    partySize?: number | null
    cancelReason?: string | null
    lat?: number
    lng?: number
    zoneName?: string
    selectedBranch?: string | null
    userToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotSessionUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    displayName: string
    phoneNumber?: string | null
    regStatus?: string
    queueStatus?: string
    targetShopName?: string | null
    currentQueue?: string | null
    waitCount?: number | null
    partySize?: number | null
    cancelReason?: string | null
    lat?: number
    lng?: number
    zoneName?: string
    selectedBranch?: string | null
    userToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    regStatus?: StringFieldUpdateOperationsInput | string
    queueStatus?: StringFieldUpdateOperationsInput | string
    targetShopName?: NullableStringFieldUpdateOperationsInput | string | null
    currentQueue?: NullableStringFieldUpdateOperationsInput | string | null
    waitCount?: NullableIntFieldUpdateOperationsInput | number | null
    partySize?: NullableIntFieldUpdateOperationsInput | number | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    zoneName?: StringFieldUpdateOperationsInput | string
    selectedBranch?: NullableStringFieldUpdateOperationsInput | string | null
    userToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    regStatus?: StringFieldUpdateOperationsInput | string
    queueStatus?: StringFieldUpdateOperationsInput | string
    targetShopName?: NullableStringFieldUpdateOperationsInput | string | null
    currentQueue?: NullableStringFieldUpdateOperationsInput | string | null
    waitCount?: NullableIntFieldUpdateOperationsInput | number | null
    partySize?: NullableIntFieldUpdateOperationsInput | number | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    zoneName?: StringFieldUpdateOperationsInput | string
    selectedBranch?: NullableStringFieldUpdateOperationsInput | string | null
    userToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotSessionCreateManyInput = {
    id?: string
    email: string
    password: string
    displayName: string
    phoneNumber?: string | null
    regStatus?: string
    queueStatus?: string
    targetShopName?: string | null
    currentQueue?: string | null
    waitCount?: number | null
    partySize?: number | null
    cancelReason?: string | null
    lat?: number
    lng?: number
    zoneName?: string
    selectedBranch?: string | null
    userToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    regStatus?: StringFieldUpdateOperationsInput | string
    queueStatus?: StringFieldUpdateOperationsInput | string
    targetShopName?: NullableStringFieldUpdateOperationsInput | string | null
    currentQueue?: NullableStringFieldUpdateOperationsInput | string | null
    waitCount?: NullableIntFieldUpdateOperationsInput | number | null
    partySize?: NullableIntFieldUpdateOperationsInput | number | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    zoneName?: StringFieldUpdateOperationsInput | string
    selectedBranch?: NullableStringFieldUpdateOperationsInput | string | null
    userToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    regStatus?: StringFieldUpdateOperationsInput | string
    queueStatus?: StringFieldUpdateOperationsInput | string
    targetShopName?: NullableStringFieldUpdateOperationsInput | string | null
    currentQueue?: NullableStringFieldUpdateOperationsInput | string | null
    waitCount?: NullableIntFieldUpdateOperationsInput | number | null
    partySize?: NullableIntFieldUpdateOperationsInput | number | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    zoneName?: StringFieldUpdateOperationsInput | string
    selectedBranch?: NullableStringFieldUpdateOperationsInput | string | null
    userToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiAccountCreateInput = {
    id: string
    email: string
    displayName: string
    emailPassword?: string | null
    otpCode?: string | null
    photoURL?: string | null
    accessToken: string
    refreshToken?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
    bookings?: ApiBookingCreateNestedManyWithoutAccountInput
  }

  export type ApiAccountUncheckedCreateInput = {
    id: string
    email: string
    displayName: string
    emailPassword?: string | null
    otpCode?: string | null
    photoURL?: string | null
    accessToken: string
    refreshToken?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
    bookings?: ApiBookingUncheckedCreateNestedManyWithoutAccountInput
  }

  export type ApiAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: ApiBookingUpdateManyWithoutAccountNestedInput
  }

  export type ApiAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: ApiBookingUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type ApiAccountCreateManyInput = {
    id: string
    email: string
    displayName: string
    emailPassword?: string | null
    otpCode?: string | null
    photoURL?: string | null
    accessToken: string
    refreshToken?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
  }

  export type ApiAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiBookingCreateInput = {
    id: string
    accountEmail: string
    emailPassword?: string | null
    accountName: string
    otpCode?: string | null
    shopId: number
    zoneId: number
    shopName: string
    branch: string
    zoneName: string
    queueCode: string
    queueNo: string
    currentQueueCode: string
    currentQueueNo: string
    waitingAhead: string
    queueId: string
    status?: string
    statusText: string
    reserverName: string
    people: number
    reservationTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cancelledAt?: Date | string | null
    account: ApiAccountCreateNestedOneWithoutBookingsInput
  }

  export type ApiBookingUncheckedCreateInput = {
    id: string
    accountId: string
    accountEmail: string
    emailPassword?: string | null
    accountName: string
    otpCode?: string | null
    shopId: number
    zoneId: number
    shopName: string
    branch: string
    zoneName: string
    queueCode: string
    queueNo: string
    currentQueueCode: string
    currentQueueNo: string
    waitingAhead: string
    queueId: string
    status?: string
    statusText: string
    reserverName: string
    people: number
    reservationTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cancelledAt?: Date | string | null
  }

  export type ApiBookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountEmail?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: StringFieldUpdateOperationsInput | string
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    shopId?: IntFieldUpdateOperationsInput | number
    zoneId?: IntFieldUpdateOperationsInput | number
    shopName?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    zoneName?: StringFieldUpdateOperationsInput | string
    queueCode?: StringFieldUpdateOperationsInput | string
    queueNo?: StringFieldUpdateOperationsInput | string
    currentQueueCode?: StringFieldUpdateOperationsInput | string
    currentQueueNo?: StringFieldUpdateOperationsInput | string
    waitingAhead?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    statusText?: StringFieldUpdateOperationsInput | string
    reserverName?: StringFieldUpdateOperationsInput | string
    people?: IntFieldUpdateOperationsInput | number
    reservationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: ApiAccountUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type ApiBookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountEmail?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: StringFieldUpdateOperationsInput | string
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    shopId?: IntFieldUpdateOperationsInput | number
    zoneId?: IntFieldUpdateOperationsInput | number
    shopName?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    zoneName?: StringFieldUpdateOperationsInput | string
    queueCode?: StringFieldUpdateOperationsInput | string
    queueNo?: StringFieldUpdateOperationsInput | string
    currentQueueCode?: StringFieldUpdateOperationsInput | string
    currentQueueNo?: StringFieldUpdateOperationsInput | string
    waitingAhead?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    statusText?: StringFieldUpdateOperationsInput | string
    reserverName?: StringFieldUpdateOperationsInput | string
    people?: IntFieldUpdateOperationsInput | number
    reservationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiBookingCreateManyInput = {
    id: string
    accountId: string
    accountEmail: string
    emailPassword?: string | null
    accountName: string
    otpCode?: string | null
    shopId: number
    zoneId: number
    shopName: string
    branch: string
    zoneName: string
    queueCode: string
    queueNo: string
    currentQueueCode: string
    currentQueueNo: string
    waitingAhead: string
    queueId: string
    status?: string
    statusText: string
    reserverName: string
    people: number
    reservationTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cancelledAt?: Date | string | null
  }

  export type ApiBookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountEmail?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: StringFieldUpdateOperationsInput | string
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    shopId?: IntFieldUpdateOperationsInput | number
    zoneId?: IntFieldUpdateOperationsInput | number
    shopName?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    zoneName?: StringFieldUpdateOperationsInput | string
    queueCode?: StringFieldUpdateOperationsInput | string
    queueNo?: StringFieldUpdateOperationsInput | string
    currentQueueCode?: StringFieldUpdateOperationsInput | string
    currentQueueNo?: StringFieldUpdateOperationsInput | string
    waitingAhead?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    statusText?: StringFieldUpdateOperationsInput | string
    reserverName?: StringFieldUpdateOperationsInput | string
    people?: IntFieldUpdateOperationsInput | number
    reservationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiBookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountEmail?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: StringFieldUpdateOperationsInput | string
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    shopId?: IntFieldUpdateOperationsInput | number
    zoneId?: IntFieldUpdateOperationsInput | number
    shopName?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    zoneName?: StringFieldUpdateOperationsInput | string
    queueCode?: StringFieldUpdateOperationsInput | string
    queueNo?: StringFieldUpdateOperationsInput | string
    currentQueueCode?: StringFieldUpdateOperationsInput | string
    currentQueueNo?: StringFieldUpdateOperationsInput | string
    waitingAhead?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    statusText?: StringFieldUpdateOperationsInput | string
    reserverName?: StringFieldUpdateOperationsInput | string
    people?: IntFieldUpdateOperationsInput | number
    reservationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumWebUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.WebUserRole | EnumWebUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.WebUserRole[] | ListEnumWebUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebUserRole[] | ListEnumWebUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumWebUserRoleFilter<$PrismaModel> | $Enums.WebUserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WebSessionListRelationFilter = {
    every?: WebSessionWhereInput
    some?: WebSessionWhereInput
    none?: WebSessionWhereInput
  }

  export type WebSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebUserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebUserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebUserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumWebUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WebUserRole | EnumWebUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.WebUserRole[] | ListEnumWebUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebUserRole[] | ListEnumWebUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumWebUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.WebUserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWebUserRoleFilter<$PrismaModel>
    _max?: NestedEnumWebUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type WebUserScalarRelationFilter = {
    is?: WebUserWhereInput
    isNot?: WebUserWhereInput
  }

  export type WebSessionCountOrderByAggregateInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WebSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WebSessionMinOrderByAggregateInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerTaskListRelationFilter = {
    every?: CustomerTaskWhereInput
    some?: CustomerTaskWhereInput
    none?: CustomerTaskWhereInput
  }

  export type CustomerTaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AccountNullableScalarRelationFilter = {
    is?: AccountWhereInput | null
    isNot?: AccountWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CustomerTaskCountOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    targetShopId?: SortOrder
    targetLat?: SortOrder
    targetLng?: SortOrder
    status?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerTaskAvgOrderByAggregateInput = {
    targetLat?: SortOrder
    targetLng?: SortOrder
  }

  export type CustomerTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    targetShopId?: SortOrder
    targetLat?: SortOrder
    targetLng?: SortOrder
    status?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerTaskMinOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    targetShopId?: SortOrder
    targetLat?: SortOrder
    targetLng?: SortOrder
    status?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerTaskSumOrderByAggregateInput = {
    targetLat?: SortOrder
    targetLng?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type GeneratedEmailCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedEmailMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedEmailMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BotSessionCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    phoneNumber?: SortOrder
    regStatus?: SortOrder
    queueStatus?: SortOrder
    targetShopName?: SortOrder
    currentQueue?: SortOrder
    waitCount?: SortOrder
    partySize?: SortOrder
    cancelReason?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    zoneName?: SortOrder
    selectedBranch?: SortOrder
    userToken?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotSessionAvgOrderByAggregateInput = {
    waitCount?: SortOrder
    partySize?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type BotSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    phoneNumber?: SortOrder
    regStatus?: SortOrder
    queueStatus?: SortOrder
    targetShopName?: SortOrder
    currentQueue?: SortOrder
    waitCount?: SortOrder
    partySize?: SortOrder
    cancelReason?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    zoneName?: SortOrder
    selectedBranch?: SortOrder
    userToken?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotSessionMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    phoneNumber?: SortOrder
    regStatus?: SortOrder
    queueStatus?: SortOrder
    targetShopName?: SortOrder
    currentQueue?: SortOrder
    waitCount?: SortOrder
    partySize?: SortOrder
    cancelReason?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    zoneName?: SortOrder
    selectedBranch?: SortOrder
    userToken?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotSessionSumOrderByAggregateInput = {
    waitCount?: SortOrder
    partySize?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ApiBookingListRelationFilter = {
    every?: ApiBookingWhereInput
    some?: ApiBookingWhereInput
    none?: ApiBookingWhereInput
  }

  export type ApiBookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiAccountCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    emailPassword?: SortOrder
    otpCode?: SortOrder
    photoURL?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
  }

  export type ApiAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    emailPassword?: SortOrder
    otpCode?: SortOrder
    photoURL?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
  }

  export type ApiAccountMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    emailPassword?: SortOrder
    otpCode?: SortOrder
    photoURL?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ApiAccountScalarRelationFilter = {
    is?: ApiAccountWhereInput
    isNot?: ApiAccountWhereInput
  }

  export type ApiBookingCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    accountEmail?: SortOrder
    emailPassword?: SortOrder
    accountName?: SortOrder
    otpCode?: SortOrder
    shopId?: SortOrder
    zoneId?: SortOrder
    shopName?: SortOrder
    branch?: SortOrder
    zoneName?: SortOrder
    queueCode?: SortOrder
    queueNo?: SortOrder
    currentQueueCode?: SortOrder
    currentQueueNo?: SortOrder
    waitingAhead?: SortOrder
    queueId?: SortOrder
    status?: SortOrder
    statusText?: SortOrder
    reserverName?: SortOrder
    people?: SortOrder
    reservationTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cancelledAt?: SortOrder
  }

  export type ApiBookingAvgOrderByAggregateInput = {
    shopId?: SortOrder
    zoneId?: SortOrder
    people?: SortOrder
  }

  export type ApiBookingMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    accountEmail?: SortOrder
    emailPassword?: SortOrder
    accountName?: SortOrder
    otpCode?: SortOrder
    shopId?: SortOrder
    zoneId?: SortOrder
    shopName?: SortOrder
    branch?: SortOrder
    zoneName?: SortOrder
    queueCode?: SortOrder
    queueNo?: SortOrder
    currentQueueCode?: SortOrder
    currentQueueNo?: SortOrder
    waitingAhead?: SortOrder
    queueId?: SortOrder
    status?: SortOrder
    statusText?: SortOrder
    reserverName?: SortOrder
    people?: SortOrder
    reservationTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cancelledAt?: SortOrder
  }

  export type ApiBookingMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    accountEmail?: SortOrder
    emailPassword?: SortOrder
    accountName?: SortOrder
    otpCode?: SortOrder
    shopId?: SortOrder
    zoneId?: SortOrder
    shopName?: SortOrder
    branch?: SortOrder
    zoneName?: SortOrder
    queueCode?: SortOrder
    queueNo?: SortOrder
    currentQueueCode?: SortOrder
    currentQueueNo?: SortOrder
    waitingAhead?: SortOrder
    queueId?: SortOrder
    status?: SortOrder
    statusText?: SortOrder
    reserverName?: SortOrder
    people?: SortOrder
    reservationTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cancelledAt?: SortOrder
  }

  export type ApiBookingSumOrderByAggregateInput = {
    shopId?: SortOrder
    zoneId?: SortOrder
    people?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type WebSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<WebSessionCreateWithoutUserInput, WebSessionUncheckedCreateWithoutUserInput> | WebSessionCreateWithoutUserInput[] | WebSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WebSessionCreateOrConnectWithoutUserInput | WebSessionCreateOrConnectWithoutUserInput[]
    createMany?: WebSessionCreateManyUserInputEnvelope
    connect?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
  }

  export type WebSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WebSessionCreateWithoutUserInput, WebSessionUncheckedCreateWithoutUserInput> | WebSessionCreateWithoutUserInput[] | WebSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WebSessionCreateOrConnectWithoutUserInput | WebSessionCreateOrConnectWithoutUserInput[]
    createMany?: WebSessionCreateManyUserInputEnvelope
    connect?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumWebUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.WebUserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WebSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<WebSessionCreateWithoutUserInput, WebSessionUncheckedCreateWithoutUserInput> | WebSessionCreateWithoutUserInput[] | WebSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WebSessionCreateOrConnectWithoutUserInput | WebSessionCreateOrConnectWithoutUserInput[]
    upsert?: WebSessionUpsertWithWhereUniqueWithoutUserInput | WebSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WebSessionCreateManyUserInputEnvelope
    set?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
    disconnect?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
    delete?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
    connect?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
    update?: WebSessionUpdateWithWhereUniqueWithoutUserInput | WebSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WebSessionUpdateManyWithWhereWithoutUserInput | WebSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WebSessionScalarWhereInput | WebSessionScalarWhereInput[]
  }

  export type WebSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WebSessionCreateWithoutUserInput, WebSessionUncheckedCreateWithoutUserInput> | WebSessionCreateWithoutUserInput[] | WebSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WebSessionCreateOrConnectWithoutUserInput | WebSessionCreateOrConnectWithoutUserInput[]
    upsert?: WebSessionUpsertWithWhereUniqueWithoutUserInput | WebSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WebSessionCreateManyUserInputEnvelope
    set?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
    disconnect?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
    delete?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
    connect?: WebSessionWhereUniqueInput | WebSessionWhereUniqueInput[]
    update?: WebSessionUpdateWithWhereUniqueWithoutUserInput | WebSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WebSessionUpdateManyWithWhereWithoutUserInput | WebSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WebSessionScalarWhereInput | WebSessionScalarWhereInput[]
  }

  export type WebUserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<WebUserCreateWithoutSessionsInput, WebUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: WebUserCreateOrConnectWithoutSessionsInput
    connect?: WebUserWhereUniqueInput
  }

  export type WebUserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<WebUserCreateWithoutSessionsInput, WebUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: WebUserCreateOrConnectWithoutSessionsInput
    upsert?: WebUserUpsertWithoutSessionsInput
    connect?: WebUserWhereUniqueInput
    update?: XOR<XOR<WebUserUpdateToOneWithWhereWithoutSessionsInput, WebUserUpdateWithoutSessionsInput>, WebUserUncheckedUpdateWithoutSessionsInput>
  }

  export type CustomerTaskCreateNestedManyWithoutAccountInput = {
    create?: XOR<CustomerTaskCreateWithoutAccountInput, CustomerTaskUncheckedCreateWithoutAccountInput> | CustomerTaskCreateWithoutAccountInput[] | CustomerTaskUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CustomerTaskCreateOrConnectWithoutAccountInput | CustomerTaskCreateOrConnectWithoutAccountInput[]
    createMany?: CustomerTaskCreateManyAccountInputEnvelope
    connect?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
  }

  export type CustomerTaskUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<CustomerTaskCreateWithoutAccountInput, CustomerTaskUncheckedCreateWithoutAccountInput> | CustomerTaskCreateWithoutAccountInput[] | CustomerTaskUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CustomerTaskCreateOrConnectWithoutAccountInput | CustomerTaskCreateOrConnectWithoutAccountInput[]
    createMany?: CustomerTaskCreateManyAccountInputEnvelope
    connect?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
  }

  export type CustomerTaskUpdateManyWithoutAccountNestedInput = {
    create?: XOR<CustomerTaskCreateWithoutAccountInput, CustomerTaskUncheckedCreateWithoutAccountInput> | CustomerTaskCreateWithoutAccountInput[] | CustomerTaskUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CustomerTaskCreateOrConnectWithoutAccountInput | CustomerTaskCreateOrConnectWithoutAccountInput[]
    upsert?: CustomerTaskUpsertWithWhereUniqueWithoutAccountInput | CustomerTaskUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: CustomerTaskCreateManyAccountInputEnvelope
    set?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
    disconnect?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
    delete?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
    connect?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
    update?: CustomerTaskUpdateWithWhereUniqueWithoutAccountInput | CustomerTaskUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: CustomerTaskUpdateManyWithWhereWithoutAccountInput | CustomerTaskUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: CustomerTaskScalarWhereInput | CustomerTaskScalarWhereInput[]
  }

  export type CustomerTaskUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<CustomerTaskCreateWithoutAccountInput, CustomerTaskUncheckedCreateWithoutAccountInput> | CustomerTaskCreateWithoutAccountInput[] | CustomerTaskUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CustomerTaskCreateOrConnectWithoutAccountInput | CustomerTaskCreateOrConnectWithoutAccountInput[]
    upsert?: CustomerTaskUpsertWithWhereUniqueWithoutAccountInput | CustomerTaskUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: CustomerTaskCreateManyAccountInputEnvelope
    set?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
    disconnect?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
    delete?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
    connect?: CustomerTaskWhereUniqueInput | CustomerTaskWhereUniqueInput[]
    update?: CustomerTaskUpdateWithWhereUniqueWithoutAccountInput | CustomerTaskUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: CustomerTaskUpdateManyWithWhereWithoutAccountInput | CustomerTaskUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: CustomerTaskScalarWhereInput | CustomerTaskScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutTasksInput = {
    create?: XOR<AccountCreateWithoutTasksInput, AccountUncheckedCreateWithoutTasksInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTasksInput
    connect?: AccountWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AccountUpdateOneWithoutTasksNestedInput = {
    create?: XOR<AccountCreateWithoutTasksInput, AccountUncheckedCreateWithoutTasksInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTasksInput
    upsert?: AccountUpsertWithoutTasksInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutTasksInput, AccountUpdateWithoutTasksInput>, AccountUncheckedUpdateWithoutTasksInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ApiBookingCreateNestedManyWithoutAccountInput = {
    create?: XOR<ApiBookingCreateWithoutAccountInput, ApiBookingUncheckedCreateWithoutAccountInput> | ApiBookingCreateWithoutAccountInput[] | ApiBookingUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ApiBookingCreateOrConnectWithoutAccountInput | ApiBookingCreateOrConnectWithoutAccountInput[]
    createMany?: ApiBookingCreateManyAccountInputEnvelope
    connect?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
  }

  export type ApiBookingUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<ApiBookingCreateWithoutAccountInput, ApiBookingUncheckedCreateWithoutAccountInput> | ApiBookingCreateWithoutAccountInput[] | ApiBookingUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ApiBookingCreateOrConnectWithoutAccountInput | ApiBookingCreateOrConnectWithoutAccountInput[]
    createMany?: ApiBookingCreateManyAccountInputEnvelope
    connect?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
  }

  export type ApiBookingUpdateManyWithoutAccountNestedInput = {
    create?: XOR<ApiBookingCreateWithoutAccountInput, ApiBookingUncheckedCreateWithoutAccountInput> | ApiBookingCreateWithoutAccountInput[] | ApiBookingUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ApiBookingCreateOrConnectWithoutAccountInput | ApiBookingCreateOrConnectWithoutAccountInput[]
    upsert?: ApiBookingUpsertWithWhereUniqueWithoutAccountInput | ApiBookingUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: ApiBookingCreateManyAccountInputEnvelope
    set?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
    disconnect?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
    delete?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
    connect?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
    update?: ApiBookingUpdateWithWhereUniqueWithoutAccountInput | ApiBookingUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: ApiBookingUpdateManyWithWhereWithoutAccountInput | ApiBookingUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: ApiBookingScalarWhereInput | ApiBookingScalarWhereInput[]
  }

  export type ApiBookingUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<ApiBookingCreateWithoutAccountInput, ApiBookingUncheckedCreateWithoutAccountInput> | ApiBookingCreateWithoutAccountInput[] | ApiBookingUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ApiBookingCreateOrConnectWithoutAccountInput | ApiBookingCreateOrConnectWithoutAccountInput[]
    upsert?: ApiBookingUpsertWithWhereUniqueWithoutAccountInput | ApiBookingUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: ApiBookingCreateManyAccountInputEnvelope
    set?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
    disconnect?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
    delete?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
    connect?: ApiBookingWhereUniqueInput | ApiBookingWhereUniqueInput[]
    update?: ApiBookingUpdateWithWhereUniqueWithoutAccountInput | ApiBookingUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: ApiBookingUpdateManyWithWhereWithoutAccountInput | ApiBookingUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: ApiBookingScalarWhereInput | ApiBookingScalarWhereInput[]
  }

  export type ApiAccountCreateNestedOneWithoutBookingsInput = {
    create?: XOR<ApiAccountCreateWithoutBookingsInput, ApiAccountUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ApiAccountCreateOrConnectWithoutBookingsInput
    connect?: ApiAccountWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ApiAccountUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<ApiAccountCreateWithoutBookingsInput, ApiAccountUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ApiAccountCreateOrConnectWithoutBookingsInput
    upsert?: ApiAccountUpsertWithoutBookingsInput
    connect?: ApiAccountWhereUniqueInput
    update?: XOR<XOR<ApiAccountUpdateToOneWithWhereWithoutBookingsInput, ApiAccountUpdateWithoutBookingsInput>, ApiAccountUncheckedUpdateWithoutBookingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumWebUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.WebUserRole | EnumWebUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.WebUserRole[] | ListEnumWebUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebUserRole[] | ListEnumWebUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumWebUserRoleFilter<$PrismaModel> | $Enums.WebUserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumWebUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WebUserRole | EnumWebUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.WebUserRole[] | ListEnumWebUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebUserRole[] | ListEnumWebUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumWebUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.WebUserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWebUserRoleFilter<$PrismaModel>
    _max?: NestedEnumWebUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type WebSessionCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WebSessionUncheckedCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WebSessionCreateOrConnectWithoutUserInput = {
    where: WebSessionWhereUniqueInput
    create: XOR<WebSessionCreateWithoutUserInput, WebSessionUncheckedCreateWithoutUserInput>
  }

  export type WebSessionCreateManyUserInputEnvelope = {
    data: WebSessionCreateManyUserInput | WebSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WebSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: WebSessionWhereUniqueInput
    update: XOR<WebSessionUpdateWithoutUserInput, WebSessionUncheckedUpdateWithoutUserInput>
    create: XOR<WebSessionCreateWithoutUserInput, WebSessionUncheckedCreateWithoutUserInput>
  }

  export type WebSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: WebSessionWhereUniqueInput
    data: XOR<WebSessionUpdateWithoutUserInput, WebSessionUncheckedUpdateWithoutUserInput>
  }

  export type WebSessionUpdateManyWithWhereWithoutUserInput = {
    where: WebSessionScalarWhereInput
    data: XOR<WebSessionUpdateManyMutationInput, WebSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type WebSessionScalarWhereInput = {
    AND?: WebSessionScalarWhereInput | WebSessionScalarWhereInput[]
    OR?: WebSessionScalarWhereInput[]
    NOT?: WebSessionScalarWhereInput | WebSessionScalarWhereInput[]
    id?: StringFilter<"WebSession"> | string
    tokenHash?: StringFilter<"WebSession"> | string
    userId?: StringFilter<"WebSession"> | string
    expiresAt?: DateTimeFilter<"WebSession"> | Date | string
    createdAt?: DateTimeFilter<"WebSession"> | Date | string
  }

  export type WebUserCreateWithoutSessionsInput = {
    id?: string
    username: string
    name: string
    passwordHash: string
    role?: $Enums.WebUserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebUserUncheckedCreateWithoutSessionsInput = {
    id?: string
    username: string
    name: string
    passwordHash: string
    role?: $Enums.WebUserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebUserCreateOrConnectWithoutSessionsInput = {
    where: WebUserWhereUniqueInput
    create: XOR<WebUserCreateWithoutSessionsInput, WebUserUncheckedCreateWithoutSessionsInput>
  }

  export type WebUserUpsertWithoutSessionsInput = {
    update: XOR<WebUserUpdateWithoutSessionsInput, WebUserUncheckedUpdateWithoutSessionsInput>
    create: XOR<WebUserCreateWithoutSessionsInput, WebUserUncheckedCreateWithoutSessionsInput>
    where?: WebUserWhereInput
  }

  export type WebUserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: WebUserWhereInput
    data: XOR<WebUserUpdateWithoutSessionsInput, WebUserUncheckedUpdateWithoutSessionsInput>
  }

  export type WebUserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumWebUserRoleFieldUpdateOperationsInput | $Enums.WebUserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebUserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumWebUserRoleFieldUpdateOperationsInput | $Enums.WebUserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTaskCreateWithoutAccountInput = {
    id?: string
    customerName: string
    targetShopId: string
    targetLat: number
    targetLng: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerTaskUncheckedCreateWithoutAccountInput = {
    id?: string
    customerName: string
    targetShopId: string
    targetLat: number
    targetLng: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerTaskCreateOrConnectWithoutAccountInput = {
    where: CustomerTaskWhereUniqueInput
    create: XOR<CustomerTaskCreateWithoutAccountInput, CustomerTaskUncheckedCreateWithoutAccountInput>
  }

  export type CustomerTaskCreateManyAccountInputEnvelope = {
    data: CustomerTaskCreateManyAccountInput | CustomerTaskCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type CustomerTaskUpsertWithWhereUniqueWithoutAccountInput = {
    where: CustomerTaskWhereUniqueInput
    update: XOR<CustomerTaskUpdateWithoutAccountInput, CustomerTaskUncheckedUpdateWithoutAccountInput>
    create: XOR<CustomerTaskCreateWithoutAccountInput, CustomerTaskUncheckedCreateWithoutAccountInput>
  }

  export type CustomerTaskUpdateWithWhereUniqueWithoutAccountInput = {
    where: CustomerTaskWhereUniqueInput
    data: XOR<CustomerTaskUpdateWithoutAccountInput, CustomerTaskUncheckedUpdateWithoutAccountInput>
  }

  export type CustomerTaskUpdateManyWithWhereWithoutAccountInput = {
    where: CustomerTaskScalarWhereInput
    data: XOR<CustomerTaskUpdateManyMutationInput, CustomerTaskUncheckedUpdateManyWithoutAccountInput>
  }

  export type CustomerTaskScalarWhereInput = {
    AND?: CustomerTaskScalarWhereInput | CustomerTaskScalarWhereInput[]
    OR?: CustomerTaskScalarWhereInput[]
    NOT?: CustomerTaskScalarWhereInput | CustomerTaskScalarWhereInput[]
    id?: StringFilter<"CustomerTask"> | string
    customerName?: StringFilter<"CustomerTask"> | string
    targetShopId?: StringFilter<"CustomerTask"> | string
    targetLat?: FloatFilter<"CustomerTask"> | number
    targetLng?: FloatFilter<"CustomerTask"> | number
    status?: StringFilter<"CustomerTask"> | string
    accountId?: StringNullableFilter<"CustomerTask"> | string | null
    createdAt?: DateTimeFilter<"CustomerTask"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerTask"> | Date | string
  }

  export type AccountCreateWithoutTasksInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutTasksInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutTasksInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutTasksInput, AccountUncheckedCreateWithoutTasksInput>
  }

  export type AccountUpsertWithoutTasksInput = {
    update: XOR<AccountUpdateWithoutTasksInput, AccountUncheckedUpdateWithoutTasksInput>
    create: XOR<AccountCreateWithoutTasksInput, AccountUncheckedCreateWithoutTasksInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutTasksInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutTasksInput, AccountUncheckedUpdateWithoutTasksInput>
  }

  export type AccountUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiBookingCreateWithoutAccountInput = {
    id: string
    accountEmail: string
    emailPassword?: string | null
    accountName: string
    otpCode?: string | null
    shopId: number
    zoneId: number
    shopName: string
    branch: string
    zoneName: string
    queueCode: string
    queueNo: string
    currentQueueCode: string
    currentQueueNo: string
    waitingAhead: string
    queueId: string
    status?: string
    statusText: string
    reserverName: string
    people: number
    reservationTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cancelledAt?: Date | string | null
  }

  export type ApiBookingUncheckedCreateWithoutAccountInput = {
    id: string
    accountEmail: string
    emailPassword?: string | null
    accountName: string
    otpCode?: string | null
    shopId: number
    zoneId: number
    shopName: string
    branch: string
    zoneName: string
    queueCode: string
    queueNo: string
    currentQueueCode: string
    currentQueueNo: string
    waitingAhead: string
    queueId: string
    status?: string
    statusText: string
    reserverName: string
    people: number
    reservationTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cancelledAt?: Date | string | null
  }

  export type ApiBookingCreateOrConnectWithoutAccountInput = {
    where: ApiBookingWhereUniqueInput
    create: XOR<ApiBookingCreateWithoutAccountInput, ApiBookingUncheckedCreateWithoutAccountInput>
  }

  export type ApiBookingCreateManyAccountInputEnvelope = {
    data: ApiBookingCreateManyAccountInput | ApiBookingCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type ApiBookingUpsertWithWhereUniqueWithoutAccountInput = {
    where: ApiBookingWhereUniqueInput
    update: XOR<ApiBookingUpdateWithoutAccountInput, ApiBookingUncheckedUpdateWithoutAccountInput>
    create: XOR<ApiBookingCreateWithoutAccountInput, ApiBookingUncheckedCreateWithoutAccountInput>
  }

  export type ApiBookingUpdateWithWhereUniqueWithoutAccountInput = {
    where: ApiBookingWhereUniqueInput
    data: XOR<ApiBookingUpdateWithoutAccountInput, ApiBookingUncheckedUpdateWithoutAccountInput>
  }

  export type ApiBookingUpdateManyWithWhereWithoutAccountInput = {
    where: ApiBookingScalarWhereInput
    data: XOR<ApiBookingUpdateManyMutationInput, ApiBookingUncheckedUpdateManyWithoutAccountInput>
  }

  export type ApiBookingScalarWhereInput = {
    AND?: ApiBookingScalarWhereInput | ApiBookingScalarWhereInput[]
    OR?: ApiBookingScalarWhereInput[]
    NOT?: ApiBookingScalarWhereInput | ApiBookingScalarWhereInput[]
    id?: StringFilter<"ApiBooking"> | string
    accountId?: StringFilter<"ApiBooking"> | string
    accountEmail?: StringFilter<"ApiBooking"> | string
    emailPassword?: StringNullableFilter<"ApiBooking"> | string | null
    accountName?: StringFilter<"ApiBooking"> | string
    otpCode?: StringNullableFilter<"ApiBooking"> | string | null
    shopId?: IntFilter<"ApiBooking"> | number
    zoneId?: IntFilter<"ApiBooking"> | number
    shopName?: StringFilter<"ApiBooking"> | string
    branch?: StringFilter<"ApiBooking"> | string
    zoneName?: StringFilter<"ApiBooking"> | string
    queueCode?: StringFilter<"ApiBooking"> | string
    queueNo?: StringFilter<"ApiBooking"> | string
    currentQueueCode?: StringFilter<"ApiBooking"> | string
    currentQueueNo?: StringFilter<"ApiBooking"> | string
    waitingAhead?: StringFilter<"ApiBooking"> | string
    queueId?: StringFilter<"ApiBooking"> | string
    status?: StringFilter<"ApiBooking"> | string
    statusText?: StringFilter<"ApiBooking"> | string
    reserverName?: StringFilter<"ApiBooking"> | string
    people?: IntFilter<"ApiBooking"> | number
    reservationTime?: DateTimeFilter<"ApiBooking"> | Date | string
    createdAt?: DateTimeFilter<"ApiBooking"> | Date | string
    updatedAt?: DateTimeFilter<"ApiBooking"> | Date | string
    cancelledAt?: DateTimeNullableFilter<"ApiBooking"> | Date | string | null
  }

  export type ApiAccountCreateWithoutBookingsInput = {
    id: string
    email: string
    displayName: string
    emailPassword?: string | null
    otpCode?: string | null
    photoURL?: string | null
    accessToken: string
    refreshToken?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
  }

  export type ApiAccountUncheckedCreateWithoutBookingsInput = {
    id: string
    email: string
    displayName: string
    emailPassword?: string | null
    otpCode?: string | null
    photoURL?: string | null
    accessToken: string
    refreshToken?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
  }

  export type ApiAccountCreateOrConnectWithoutBookingsInput = {
    where: ApiAccountWhereUniqueInput
    create: XOR<ApiAccountCreateWithoutBookingsInput, ApiAccountUncheckedCreateWithoutBookingsInput>
  }

  export type ApiAccountUpsertWithoutBookingsInput = {
    update: XOR<ApiAccountUpdateWithoutBookingsInput, ApiAccountUncheckedUpdateWithoutBookingsInput>
    create: XOR<ApiAccountCreateWithoutBookingsInput, ApiAccountUncheckedCreateWithoutBookingsInput>
    where?: ApiAccountWhereInput
  }

  export type ApiAccountUpdateToOneWithWhereWithoutBookingsInput = {
    where?: ApiAccountWhereInput
    data: XOR<ApiAccountUpdateWithoutBookingsInput, ApiAccountUncheckedUpdateWithoutBookingsInput>
  }

  export type ApiAccountUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiAccountUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebSessionCreateManyUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WebSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTaskCreateManyAccountInput = {
    id?: string
    customerName: string
    targetShopId: string
    targetLat: number
    targetLng: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerTaskUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    targetShopId?: StringFieldUpdateOperationsInput | string
    targetLat?: FloatFieldUpdateOperationsInput | number
    targetLng?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTaskUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    targetShopId?: StringFieldUpdateOperationsInput | string
    targetLat?: FloatFieldUpdateOperationsInput | number
    targetLng?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTaskUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    targetShopId?: StringFieldUpdateOperationsInput | string
    targetLat?: FloatFieldUpdateOperationsInput | number
    targetLng?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiBookingCreateManyAccountInput = {
    id: string
    accountEmail: string
    emailPassword?: string | null
    accountName: string
    otpCode?: string | null
    shopId: number
    zoneId: number
    shopName: string
    branch: string
    zoneName: string
    queueCode: string
    queueNo: string
    currentQueueCode: string
    currentQueueNo: string
    waitingAhead: string
    queueId: string
    status?: string
    statusText: string
    reserverName: string
    people: number
    reservationTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cancelledAt?: Date | string | null
  }

  export type ApiBookingUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountEmail?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: StringFieldUpdateOperationsInput | string
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    shopId?: IntFieldUpdateOperationsInput | number
    zoneId?: IntFieldUpdateOperationsInput | number
    shopName?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    zoneName?: StringFieldUpdateOperationsInput | string
    queueCode?: StringFieldUpdateOperationsInput | string
    queueNo?: StringFieldUpdateOperationsInput | string
    currentQueueCode?: StringFieldUpdateOperationsInput | string
    currentQueueNo?: StringFieldUpdateOperationsInput | string
    waitingAhead?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    statusText?: StringFieldUpdateOperationsInput | string
    reserverName?: StringFieldUpdateOperationsInput | string
    people?: IntFieldUpdateOperationsInput | number
    reservationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiBookingUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountEmail?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: StringFieldUpdateOperationsInput | string
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    shopId?: IntFieldUpdateOperationsInput | number
    zoneId?: IntFieldUpdateOperationsInput | number
    shopName?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    zoneName?: StringFieldUpdateOperationsInput | string
    queueCode?: StringFieldUpdateOperationsInput | string
    queueNo?: StringFieldUpdateOperationsInput | string
    currentQueueCode?: StringFieldUpdateOperationsInput | string
    currentQueueNo?: StringFieldUpdateOperationsInput | string
    waitingAhead?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    statusText?: StringFieldUpdateOperationsInput | string
    reserverName?: StringFieldUpdateOperationsInput | string
    people?: IntFieldUpdateOperationsInput | number
    reservationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiBookingUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountEmail?: StringFieldUpdateOperationsInput | string
    emailPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountName?: StringFieldUpdateOperationsInput | string
    otpCode?: NullableStringFieldUpdateOperationsInput | string | null
    shopId?: IntFieldUpdateOperationsInput | number
    zoneId?: IntFieldUpdateOperationsInput | number
    shopName?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    zoneName?: StringFieldUpdateOperationsInput | string
    queueCode?: StringFieldUpdateOperationsInput | string
    queueNo?: StringFieldUpdateOperationsInput | string
    currentQueueCode?: StringFieldUpdateOperationsInput | string
    currentQueueNo?: StringFieldUpdateOperationsInput | string
    waitingAhead?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    statusText?: StringFieldUpdateOperationsInput | string
    reserverName?: StringFieldUpdateOperationsInput | string
    people?: IntFieldUpdateOperationsInput | number
    reservationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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