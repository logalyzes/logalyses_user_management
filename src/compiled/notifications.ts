// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               v3.19.1
// source: notifications.proto

/* eslint-disable */
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientOptions,
  type ClientUnaryCall,
  type handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  type ServiceError,
  type UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export interface User {
  id: number;
  username: string;
  email: string;
  attentionLevels: number[];
}

export interface SetNotificationRequest {
  username: string;
  email: string;
  attentionLevels: number[];
}

export interface UpdateNotificationRequest {
  userId: number;
  attentionLevels: number[];
}

export interface RemoveNotificationRequest {
  userId: number;
}

export interface ListNotificationsRequest {
}

export interface ListNotificationsResponse {
  users: User[];
  total: number;
}

function createBaseUser(): User {
  return { id: 0, username: "", email: "", attentionLevels: [] };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    writer.uint32(34).fork();
    for (const v of message.attentionLevels) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        case 4:
          if (tag === 32) {
            message.attentionLevels.push(reader.int32());

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.attentionLevels.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      attentionLevels: globalThis.Array.isArray(object?.attentionLevels)
        ? object.attentionLevels.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.attentionLevels?.length) {
      obj.attentionLevels = message.attentionLevels.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? 0;
    message.username = object.username ?? "";
    message.email = object.email ?? "";
    message.attentionLevels = object.attentionLevels?.map((e) => e) || [];
    return message;
  },
};

function createBaseSetNotificationRequest(): SetNotificationRequest {
  return { username: "", email: "", attentionLevels: [] };
}

export const SetNotificationRequest = {
  encode(message: SetNotificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    writer.uint32(26).fork();
    for (const v of message.attentionLevels) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetNotificationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag === 24) {
            message.attentionLevels.push(reader.int32());

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.attentionLevels.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetNotificationRequest {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      attentionLevels: globalThis.Array.isArray(object?.attentionLevels)
        ? object.attentionLevels.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: SetNotificationRequest): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.attentionLevels?.length) {
      obj.attentionLevels = message.attentionLevels.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetNotificationRequest>, I>>(base?: I): SetNotificationRequest {
    return SetNotificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetNotificationRequest>, I>>(object: I): SetNotificationRequest {
    const message = createBaseSetNotificationRequest();
    message.username = object.username ?? "";
    message.email = object.email ?? "";
    message.attentionLevels = object.attentionLevels?.map((e) => e) || [];
    return message;
  },
};

function createBaseUpdateNotificationRequest(): UpdateNotificationRequest {
  return { userId: 0, attentionLevels: [] };
}

export const UpdateNotificationRequest = {
  encode(message: UpdateNotificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    writer.uint32(18).fork();
    for (const v of message.attentionLevels) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateNotificationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.userId = reader.int32();
          continue;
        case 2:
          if (tag === 16) {
            message.attentionLevels.push(reader.int32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.attentionLevels.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateNotificationRequest {
    return {
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0,
      attentionLevels: globalThis.Array.isArray(object?.attentionLevels)
        ? object.attentionLevels.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: UpdateNotificationRequest): unknown {
    const obj: any = {};
    if (message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.attentionLevels?.length) {
      obj.attentionLevels = message.attentionLevels.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateNotificationRequest>, I>>(base?: I): UpdateNotificationRequest {
    return UpdateNotificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateNotificationRequest>, I>>(object: I): UpdateNotificationRequest {
    const message = createBaseUpdateNotificationRequest();
    message.userId = object.userId ?? 0;
    message.attentionLevels = object.attentionLevels?.map((e) => e) || [];
    return message;
  },
};

function createBaseRemoveNotificationRequest(): RemoveNotificationRequest {
  return { userId: 0 };
}

export const RemoveNotificationRequest = {
  encode(message: RemoveNotificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveNotificationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.userId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveNotificationRequest {
    return { userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0 };
  },

  toJSON(message: RemoveNotificationRequest): unknown {
    const obj: any = {};
    if (message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveNotificationRequest>, I>>(base?: I): RemoveNotificationRequest {
    return RemoveNotificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveNotificationRequest>, I>>(object: I): RemoveNotificationRequest {
    const message = createBaseRemoveNotificationRequest();
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseListNotificationsRequest(): ListNotificationsRequest {
  return {};
}

export const ListNotificationsRequest = {
  encode(_: ListNotificationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListNotificationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListNotificationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ListNotificationsRequest {
    return {};
  },

  toJSON(_: ListNotificationsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListNotificationsRequest>, I>>(base?: I): ListNotificationsRequest {
    return ListNotificationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListNotificationsRequest>, I>>(_: I): ListNotificationsRequest {
    const message = createBaseListNotificationsRequest();
    return message;
  },
};

function createBaseListNotificationsResponse(): ListNotificationsResponse {
  return { users: [], total: 0 };
}

export const ListNotificationsResponse = {
  encode(message: ListNotificationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.total !== 0) {
      writer.uint32(32).int32(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListNotificationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListNotificationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(User.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.total = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListNotificationsResponse {
    return {
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [],
      total: isSet(object.total) ? globalThis.Number(object.total) : 0,
    };
  },

  toJSON(message: ListNotificationsResponse): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => User.toJSON(e));
    }
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListNotificationsResponse>, I>>(base?: I): ListNotificationsResponse {
    return ListNotificationsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListNotificationsResponse>, I>>(object: I): ListNotificationsResponse {
    const message = createBaseListNotificationsResponse();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    message.total = object.total ?? 0;
    return message;
  },
};

export type NotificationServiceService = typeof NotificationServiceService;
export const NotificationServiceService = {
  listNotifications: {
    path: "/notification.NotificationService/ListNotifications",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListNotificationsRequest) => Buffer.from(ListNotificationsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListNotificationsRequest.decode(value),
    responseSerialize: (value: ListNotificationsResponse) =>
      Buffer.from(ListNotificationsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListNotificationsResponse.decode(value),
  },
  setNotification: {
    path: "/notification.NotificationService/SetNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SetNotificationRequest) => Buffer.from(SetNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SetNotificationRequest.decode(value),
    responseSerialize: (value: User) => Buffer.from(User.encode(value).finish()),
    responseDeserialize: (value: Buffer) => User.decode(value),
  },
  updateNotification: {
    path: "/notification.NotificationService/UpdateNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateNotificationRequest) =>
      Buffer.from(UpdateNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateNotificationRequest.decode(value),
    responseSerialize: (value: User) => Buffer.from(User.encode(value).finish()),
    responseDeserialize: (value: Buffer) => User.decode(value),
  },
  removeNotification: {
    path: "/notification.NotificationService/RemoveNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RemoveNotificationRequest) =>
      Buffer.from(RemoveNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RemoveNotificationRequest.decode(value),
    responseSerialize: (value: User) => Buffer.from(User.encode(value).finish()),
    responseDeserialize: (value: Buffer) => User.decode(value),
  },
} as const;

export interface NotificationServiceServer extends UntypedServiceImplementation {
  listNotifications: handleUnaryCall<ListNotificationsRequest, ListNotificationsResponse>;
  setNotification: handleUnaryCall<SetNotificationRequest, User>;
  updateNotification: handleUnaryCall<UpdateNotificationRequest, User>;
  removeNotification: handleUnaryCall<RemoveNotificationRequest, User>;
}

export interface NotificationServiceClient extends Client {
  listNotifications(
    request: ListNotificationsRequest,
    callback: (error: ServiceError | null, response: ListNotificationsResponse) => void,
  ): ClientUnaryCall;
  listNotifications(
    request: ListNotificationsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListNotificationsResponse) => void,
  ): ClientUnaryCall;
  listNotifications(
    request: ListNotificationsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListNotificationsResponse) => void,
  ): ClientUnaryCall;
  setNotification(
    request: SetNotificationRequest,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  setNotification(
    request: SetNotificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  setNotification(
    request: SetNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  updateNotification(
    request: UpdateNotificationRequest,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  updateNotification(
    request: UpdateNotificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  updateNotification(
    request: UpdateNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  removeNotification(
    request: RemoveNotificationRequest,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  removeNotification(
    request: RemoveNotificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  removeNotification(
    request: RemoveNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
}

export const NotificationServiceClient = makeGenericClientConstructor(
  NotificationServiceService,
  "notification.NotificationService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): NotificationServiceClient;
  service: typeof NotificationServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}