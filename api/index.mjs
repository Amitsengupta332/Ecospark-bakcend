var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express7 from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// src/middlewares/globalErrorhandler.ts
import { ZodError } from "zod";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.5.0",
  "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  USER\n  ADMIN\n}\n\nenum EventType {\n  PUBLIC\n  PRIVATE\n}\n\nenum FeeType {\n  FREE\n  PAID\n}\n\nenum ParticipationStatus {\n  PENDING\n  APPROVED\n  REJECTED\n  BANNED\n}\n\nmodel User {\n  id       String @id @default(uuid())\n  name     String\n  email    String @unique\n  password String\n  role     Role   @default(USER)\n\n  events         Event[]         @relation("UserEvents")\n  participations Participation[]\n  reviews        Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Event {\n  id          String   @id @default(uuid())\n  title       String\n  description String\n  date        DateTime\n  venue       String\n\n  eventType EventType\n  feeType   FeeType\n  fee       Float? // nullable if FREE\n\n  creatorId String\n  creator   User   @relation("UserEvents", fields: [creatorId], references: [id])\n\n  participations Participation[]\n  reviews        Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Participation {\n  id String @id @default(uuid())\n\n  userId  String\n  eventId String\n\n  status ParticipationStatus @default(PENDING)\n\n  payment Payment?\n\n  user  User  @relation(fields: [userId], references: [id])\n  event Event @relation(fields: [eventId], references: [id])\n\n  createdAt DateTime @default(now())\n\n  @@unique([userId, eventId]) // one participation per user per event\n}\n\nmodel Payment {\n  id            String  @id @default(uuid())\n  amount        Float\n  status        String // success / failed\n  transactionId String?\n\n  participationId String        @unique\n  participation   Participation @relation(fields: [participationId], references: [id])\n\n  createdAt DateTime @default(now())\n}\n\nmodel Review {\n  id      String @id @default(uuid())\n  rating  Int // 1-5\n  comment String\n\n  userId  String\n  eventId String\n\n  user  User  @relation(fields: [userId], references: [id])\n  event Event @relation(fields: [eventId], references: [id])\n\n  createdAt DateTime @default(now())\n\n  @@unique([userId, eventId]) // one review per user per event\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"events","kind":"object","type":"Event","relationName":"UserEvents"},{"name":"participations","kind":"object","type":"Participation","relationName":"ParticipationToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Event":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"venue","kind":"scalar","type":"String"},{"name":"eventType","kind":"enum","type":"EventType"},{"name":"feeType","kind":"enum","type":"FeeType"},{"name":"fee","kind":"scalar","type":"Float"},{"name":"creatorId","kind":"scalar","type":"String"},{"name":"creator","kind":"object","type":"User","relationName":"UserEvents"},{"name":"participations","kind":"object","type":"Participation","relationName":"EventToParticipation"},{"name":"reviews","kind":"object","type":"Review","relationName":"EventToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Participation":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"eventId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ParticipationStatus"},{"name":"payment","kind":"object","type":"Payment","relationName":"ParticipationToPayment"},{"name":"user","kind":"object","type":"User","relationName":"ParticipationToUser"},{"name":"event","kind":"object","type":"Event","relationName":"EventToParticipation"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"status","kind":"scalar","type":"String"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"participationId","kind":"scalar","type":"String"},{"name":"participation","kind":"object","type":"Participation","relationName":"ParticipationToPayment"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"eventId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"event","kind":"object","type":"Event","relationName":"EventToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","creator","participation","payment","user","event","participations","reviews","_count","events","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Event.findUnique","Event.findUniqueOrThrow","Event.findFirst","Event.findFirstOrThrow","Event.findMany","Event.createOne","Event.createMany","Event.createManyAndReturn","Event.updateOne","Event.updateMany","Event.updateManyAndReturn","Event.upsertOne","Event.deleteOne","Event.deleteMany","_avg","_sum","Event.groupBy","Event.aggregate","Participation.findUnique","Participation.findUniqueOrThrow","Participation.findFirst","Participation.findFirstOrThrow","Participation.findMany","Participation.createOne","Participation.createMany","Participation.createManyAndReturn","Participation.updateOne","Participation.updateMany","Participation.updateManyAndReturn","Participation.upsertOne","Participation.deleteOne","Participation.deleteMany","Participation.groupBy","Participation.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","AND","OR","NOT","id","rating","comment","userId","eventId","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","amount","status","transactionId","participationId","ParticipationStatus","title","description","date","venue","EventType","eventType","FeeType","feeType","fee","creatorId","updatedAt","name","email","password","Role","role","every","some","none","userId_eventId","is","isNot","connectOrCreate","upsert","disconnect","delete","connect","createMany","set","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "4QIxUA0IAAC2AQAgCQAAtwEAIAsAALUBACBkAACzAQAwZQAAGQAQZgAAswEAMGcBAAAAAWxAAJ8BACGHAUAAnwEAIYgBAQCdAQAhiQEBAAAAAYoBAQCdAQAhjAEAALQBjAEiAQAAAAEAIBEDAAC7AQAgCAAAtgEAIAkAALcBACBkAADBAQAwZQAAAwAQZgAAwQEAMGcBAJ0BACFsQACfAQAhfQEAnQEAIX4BAJ0BACF_QACfAQAhgAEBAJ0BACGCAQAAwgGCASKEAQAAwwGEASKFAQgAxAEAIYYBAQCdAQAhhwFAAJ8BACEEAwAAvAIAIAgAALoCACAJAAC7AgAghQEAANEBACARAwAAuwEAIAgAALYBACAJAAC3AQAgZAAAwQEAMGUAAAMAEGYAAMEBADBnAQAAAAFsQACfAQAhfQEAnQEAIX4BAJ0BACF_QACfAQAhgAEBAJ0BACGCAQAAwgGCASKEAQAAwwGEASKFAQgAxAEAIYYBAQCdAQAhhwFAAJ8BACEDAAAAAwAgAQAABAAwAgAABQAgCwUAAMABACAGAAC7AQAgBwAAvAEAIGQAAL4BADBlAAAHABBmAAC-AQAwZwEAnQEAIWoBAJ0BACFrAQCdAQAhbEAAnwEAIXkAAL8BfSIDBQAAvgIAIAYAALwCACAHAAC9AgAgDAUAAMABACAGAAC7AQAgBwAAvAEAIGQAAL4BADBlAAAHABBmAAC-AQAwZwEAAAABagEAnQEAIWsBAJ0BACFsQACfAQAheQAAvwF9IpABAAC9AQAgAwAAAAcAIAEAAAgAMAIAAAkAIAoEAACgAQAgZAAAmwEAMGUAAAsAEGYAAJsBADBnAQCdAQAhbEAAnwEAIXgIAJwBACF5AQCdAQAhegEAngEAIXsBAJ0BACEBAAAACwAgCwYAALsBACAHAAC8AQAgZAAAuQEAMGUAAA0AEGYAALkBADBnAQCdAQAhaAIAugEAIWkBAJ0BACFqAQCdAQAhawEAnQEAIWxAAJ8BACECBgAAvAIAIAcAAL0CACAMBgAAuwEAIAcAALwBACBkAAC5AQAwZQAADQAQZgAAuQEAMGcBAAAAAWgCALoBACFpAQCdAQAhagEAnQEAIWsBAJ0BACFsQACfAQAhkAEAALgBACADAAAADQAgAQAADgAwAgAADwAgAQAAAAcAIAEAAAANACADAAAABwAgAQAACAAwAgAACQAgAwAAAA0AIAEAAA4AMAIAAA8AIAEAAAADACABAAAABwAgAQAAAA0AIAEAAAABACANCAAAtgEAIAkAALcBACALAAC1AQAgZAAAswEAMGUAABkAEGYAALMBADBnAQCdAQAhbEAAnwEAIYcBQACfAQAhiAEBAJ0BACGJAQEAnQEAIYoBAQCdAQAhjAEAALQBjAEiAwgAALoCACAJAAC7AgAgCwAAuQIAIAMAAAAZACABAAAaADACAAABACADAAAAGQAgAQAAGgAwAgAAAQAgAwAAABkAIAEAABoAMAIAAAEAIAoIAAC3AgAgCQAAuAIAIAsAALYCACBnAQAAAAFsQAAAAAGHAUAAAAABiAEBAAAAAYkBAQAAAAGKAQEAAAABjAEAAACMAQIBEQAAHgAgB2cBAAAAAWxAAAAAAYcBQAAAAAGIAQEAAAABiQEBAAAAAYoBAQAAAAGMAQAAAIwBAgERAAAgADABEQAAIAAwCggAAJYCACAJAACXAgAgCwAAlQIAIGcBAMoBACFsQADMAQAhhwFAAMwBACGIAQEAygEAIYkBAQDKAQAhigEBAMoBACGMAQAAlAKMASICAAAAAQAgEQAAIwAgB2cBAMoBACFsQADMAQAhhwFAAMwBACGIAQEAygEAIYkBAQDKAQAhigEBAMoBACGMAQAAlAKMASICAAAAGQAgEQAAJQAgAgAAABkAIBEAACUAIAMAAAABACAYAAAeACAZAAAjACABAAAAAQAgAQAAABkAIAMKAACRAgAgHgAAkwIAIB8AAJICACAKZAAArwEAMGUAACwAEGYAAK8BADBnAQCKAQAhbEAAjAEAIYcBQACMAQAhiAEBAIoBACGJAQEAigEAIYoBAQCKAQAhjAEAALABjAEiAwAAABkAIAEAACsAMB0AACwAIAMAAAAZACABAAAaADACAAABACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIA4DAACOAgAgCAAAjwIAIAkAAJACACBnAQAAAAFsQAAAAAF9AQAAAAF-AQAAAAF_QAAAAAGAAQEAAAABggEAAACCAQKEAQAAAIQBAoUBCAAAAAGGAQEAAAABhwFAAAAAAQERAAA0ACALZwEAAAABbEAAAAABfQEAAAABfgEAAAABf0AAAAABgAEBAAAAAYIBAAAAggEChAEAAACEAQKFAQgAAAABhgEBAAAAAYcBQAAAAAEBEQAANgAwAREAADYAMA4DAADzAQAgCAAA9AEAIAkAAPUBACBnAQDKAQAhbEAAzAEAIX0BAMoBACF-AQDKAQAhf0AAzAEAIYABAQDKAQAhggEAAPABggEihAEAAPEBhAEihQEIAPIBACGGAQEAygEAIYcBQADMAQAhAgAAAAUAIBEAADkAIAtnAQDKAQAhbEAAzAEAIX0BAMoBACF-AQDKAQAhf0AAzAEAIYABAQDKAQAhggEAAPABggEihAEAAPEBhAEihQEIAPIBACGGAQEAygEAIYcBQADMAQAhAgAAAAMAIBEAADsAIAIAAAADACARAAA7ACADAAAABQAgGAAANAAgGQAAOQAgAQAAAAUAIAEAAAADACAGCgAA6wEAIB4AAO4BACAfAADtAQAgMAAA7AEAIDEAAO8BACCFAQAA0QEAIA5kAAClAQAwZQAAQgAQZgAApQEAMGcBAIoBACFsQACMAQAhfQEAigEAIX4BAIoBACF_QACMAQAhgAEBAIoBACGCAQAApgGCASKEAQAApwGEASKFAQgAqAEAIYYBAQCKAQAhhwFAAIwBACEDAAAAAwAgAQAAQQAwHQAAQgAgAwAAAAMAIAEAAAQAMAIAAAUAIAEAAAAJACABAAAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIAMAAAAHACABAAAIADACAAAJACADAAAABwAgAQAACAAwAgAACQAgCAUAAOgBACAGAADpAQAgBwAA6gEAIGcBAAAAAWoBAAAAAWsBAAAAAWxAAAAAAXkAAAB9AgERAABKACAFZwEAAAABagEAAAABawEAAAABbEAAAAABeQAAAH0CAREAAEwAMAERAABMADAIBQAA4AEAIAYAAOEBACAHAADiAQAgZwEAygEAIWoBAMoBACFrAQDKAQAhbEAAzAEAIXkAAN8BfSICAAAACQAgEQAATwAgBWcBAMoBACFqAQDKAQAhawEAygEAIWxAAMwBACF5AADfAX0iAgAAAAcAIBEAAFEAIAIAAAAHACARAABRACADAAAACQAgGAAASgAgGQAATwAgAQAAAAkAIAEAAAAHACADCgAA3AEAIB4AAN4BACAfAADdAQAgCGQAAKEBADBlAABYABBmAAChAQAwZwEAigEAIWoBAIoBACFrAQCKAQAhbEAAjAEAIXkAAKIBfSIDAAAABwAgAQAAVwAwHQAAWAAgAwAAAAcAIAEAAAgAMAIAAAkAIAoEAACgAQAgZAAAmwEAMGUAAAsAEGYAAJsBADBnAQAAAAFsQACfAQAheAgAnAEAIXkBAJ0BACF6AQCeAQAhewEAAAABAQAAAFsAIAEAAABbACACBAAA2wEAIHoAANEBACADAAAACwAgAQAAXgAwAgAAWwAgAwAAAAsAIAEAAF4AMAIAAFsAIAMAAAALACABAABeADACAABbACAHBAAA2gEAIGcBAAAAAWxAAAAAAXgIAAAAAXkBAAAAAXoBAAAAAXsBAAAAAQERAABiACAGZwEAAAABbEAAAAABeAgAAAABeQEAAAABegEAAAABewEAAAABAREAAGQAMAERAABkADAHBAAA2QEAIGcBAMoBACFsQADMAQAheAgA1wEAIXkBAMoBACF6AQDYAQAhewEAygEAIQIAAABbACARAABnACAGZwEAygEAIWxAAMwBACF4CADXAQAheQEAygEAIXoBANgBACF7AQDKAQAhAgAAAAsAIBEAAGkAIAIAAAALACARAABpACADAAAAWwAgGAAAYgAgGQAAZwAgAQAAAFsAIAEAAAALACAGCgAA0gEAIB4AANUBACAfAADUAQAgMAAA0wEAIDEAANYBACB6AADRAQAgCWQAAJQBADBlAABwABBmAACUAQAwZwEAigEAIWxAAIwBACF4CACVAQAheQEAigEAIXoBAJYBACF7AQCKAQAhAwAAAAsAIAEAAG8AMB0AAHAAIAMAAAALACABAABeADACAABbACABAAAADwAgAQAAAA8AIAMAAAANACABAAAOADACAAAPACADAAAADQAgAQAADgAwAgAADwAgAwAAAA0AIAEAAA4AMAIAAA8AIAgGAADPAQAgBwAA0AEAIGcBAAAAAWgCAAAAAWkBAAAAAWoBAAAAAWsBAAAAAWxAAAAAAQERAAB4ACAGZwEAAAABaAIAAAABaQEAAAABagEAAAABawEAAAABbEAAAAABAREAAHoAMAERAAB6ADAIBgAAzQEAIAcAAM4BACBnAQDKAQAhaAIAywEAIWkBAMoBACFqAQDKAQAhawEAygEAIWxAAMwBACECAAAADwAgEQAAfQAgBmcBAMoBACFoAgDLAQAhaQEAygEAIWoBAMoBACFrAQDKAQAhbEAAzAEAIQIAAAANACARAAB_ACACAAAADQAgEQAAfwAgAwAAAA8AIBgAAHgAIBkAAH0AIAEAAAAPACABAAAADQAgBQoAAMUBACAeAADIAQAgHwAAxwEAIDAAAMYBACAxAADJAQAgCWQAAIkBADBlAACGAQAQZgAAiQEAMGcBAIoBACFoAgCLAQAhaQEAigEAIWoBAIoBACFrAQCKAQAhbEAAjAEAIQMAAAANACABAACFAQAwHQAAhgEAIAMAAAANACABAAAOADACAAAPACAJZAAAiQEAMGUAAIYBABBmAACJAQAwZwEAigEAIWgCAIsBACFpAQCKAQAhagEAigEAIWsBAIoBACFsQACMAQAhDgoAAI4BACAeAACTAQAgHwAAkwEAIG0BAAAAAW4BAAAABG8BAAAABHABAAAAAXEBAAAAAXIBAAAAAXMBAAAAAXQBAJIBACF1AQAAAAF2AQAAAAF3AQAAAAENCgAAjgEAIB4AAI4BACAfAACOAQAgMAAAkQEAIDEAAI4BACBtAgAAAAFuAgAAAARvAgAAAARwAgAAAAFxAgAAAAFyAgAAAAFzAgAAAAF0AgCQAQAhCwoAAI4BACAeAACPAQAgHwAAjwEAIG1AAAAAAW5AAAAABG9AAAAABHBAAAAAAXFAAAAAAXJAAAAAAXNAAAAAAXRAAI0BACELCgAAjgEAIB4AAI8BACAfAACPAQAgbUAAAAABbkAAAAAEb0AAAAAEcEAAAAABcUAAAAABckAAAAABc0AAAAABdEAAjQEAIQhtAgAAAAFuAgAAAARvAgAAAARwAgAAAAFxAgAAAAFyAgAAAAFzAgAAAAF0AgCOAQAhCG1AAAAAAW5AAAAABG9AAAAABHBAAAAAAXFAAAAAAXJAAAAAAXNAAAAAAXRAAI8BACENCgAAjgEAIB4AAI4BACAfAACOAQAgMAAAkQEAIDEAAI4BACBtAgAAAAFuAgAAAARvAgAAAARwAgAAAAFxAgAAAAFyAgAAAAFzAgAAAAF0AgCQAQAhCG0IAAAAAW4IAAAABG8IAAAABHAIAAAAAXEIAAAAAXIIAAAAAXMIAAAAAXQIAJEBACEOCgAAjgEAIB4AAJMBACAfAACTAQAgbQEAAAABbgEAAAAEbwEAAAAEcAEAAAABcQEAAAABcgEAAAABcwEAAAABdAEAkgEAIXUBAAAAAXYBAAAAAXcBAAAAAQttAQAAAAFuAQAAAARvAQAAAARwAQAAAAFxAQAAAAFyAQAAAAFzAQAAAAF0AQCTAQAhdQEAAAABdgEAAAABdwEAAAABCWQAAJQBADBlAABwABBmAACUAQAwZwEAigEAIWxAAIwBACF4CACVAQAheQEAigEAIXoBAJYBACF7AQCKAQAhDQoAAI4BACAeAACRAQAgHwAAkQEAIDAAAJEBACAxAACRAQAgbQgAAAABbggAAAAEbwgAAAAEcAgAAAABcQgAAAABcggAAAABcwgAAAABdAgAmgEAIQ4KAACYAQAgHgAAmQEAIB8AAJkBACBtAQAAAAFuAQAAAAVvAQAAAAVwAQAAAAFxAQAAAAFyAQAAAAFzAQAAAAF0AQCXAQAhdQEAAAABdgEAAAABdwEAAAABDgoAAJgBACAeAACZAQAgHwAAmQEAIG0BAAAAAW4BAAAABW8BAAAABXABAAAAAXEBAAAAAXIBAAAAAXMBAAAAAXQBAJcBACF1AQAAAAF2AQAAAAF3AQAAAAEIbQIAAAABbgIAAAAFbwIAAAAFcAIAAAABcQIAAAABcgIAAAABcwIAAAABdAIAmAEAIQttAQAAAAFuAQAAAAVvAQAAAAVwAQAAAAFxAQAAAAFyAQAAAAFzAQAAAAF0AQCZAQAhdQEAAAABdgEAAAABdwEAAAABDQoAAI4BACAeAACRAQAgHwAAkQEAIDAAAJEBACAxAACRAQAgbQgAAAABbggAAAAEbwgAAAAEcAgAAAABcQgAAAABcggAAAABcwgAAAABdAgAmgEAIQoEAACgAQAgZAAAmwEAMGUAAAsAEGYAAJsBADBnAQCdAQAhbEAAnwEAIXgIAJwBACF5AQCdAQAhegEAngEAIXsBAJ0BACEIbQgAAAABbggAAAAEbwgAAAAEcAgAAAABcQgAAAABcggAAAABcwgAAAABdAgAkQEAIQttAQAAAAFuAQAAAARvAQAAAARwAQAAAAFxAQAAAAFyAQAAAAFzAQAAAAF0AQCTAQAhdQEAAAABdgEAAAABdwEAAAABC20BAAAAAW4BAAAABW8BAAAABXABAAAAAXEBAAAAAXIBAAAAAXMBAAAAAXQBAJkBACF1AQAAAAF2AQAAAAF3AQAAAAEIbUAAAAABbkAAAAAEb0AAAAAEcEAAAAABcUAAAAABckAAAAABc0AAAAABdEAAjwEAIQ0FAADAAQAgBgAAuwEAIAcAALwBACBkAAC-AQAwZQAABwAQZgAAvgEAMGcBAJ0BACFqAQCdAQAhawEAnQEAIWxAAJ8BACF5AAC_AX0ikQEAAAcAIJIBAAAHACAIZAAAoQEAMGUAAFgAEGYAAKEBADBnAQCKAQAhagEAigEAIWsBAIoBACFsQACMAQAheQAAogF9IgcKAACOAQAgHgAApAEAIB8AAKQBACBtAAAAfQJuAAAAfQhvAAAAfQh0AACjAX0iBwoAAI4BACAeAACkAQAgHwAApAEAIG0AAAB9Am4AAAB9CG8AAAB9CHQAAKMBfSIEbQAAAH0CbgAAAH0IbwAAAH0IdAAApAF9Ig5kAAClAQAwZQAAQgAQZgAApQEAMGcBAIoBACFsQACMAQAhfQEAigEAIX4BAIoBACF_QACMAQAhgAEBAIoBACGCAQAApgGCASKEAQAApwGEASKFAQgAqAEAIYYBAQCKAQAhhwFAAIwBACEHCgAAjgEAIB4AAK4BACAfAACuAQAgbQAAAIIBAm4AAACCAQhvAAAAggEIdAAArQGCASIHCgAAjgEAIB4AAKwBACAfAACsAQAgbQAAAIQBAm4AAACEAQhvAAAAhAEIdAAAqwGEASINCgAAmAEAIB4AAKoBACAfAACqAQAgMAAAqgEAIDEAAKoBACBtCAAAAAFuCAAAAAVvCAAAAAVwCAAAAAFxCAAAAAFyCAAAAAFzCAAAAAF0CACpAQAhDQoAAJgBACAeAACqAQAgHwAAqgEAIDAAAKoBACAxAACqAQAgbQgAAAABbggAAAAFbwgAAAAFcAgAAAABcQgAAAABcggAAAABcwgAAAABdAgAqQEAIQhtCAAAAAFuCAAAAAVvCAAAAAVwCAAAAAFxCAAAAAFyCAAAAAFzCAAAAAF0CACqAQAhBwoAAI4BACAeAACsAQAgHwAArAEAIG0AAACEAQJuAAAAhAEIbwAAAIQBCHQAAKsBhAEiBG0AAACEAQJuAAAAhAEIbwAAAIQBCHQAAKwBhAEiBwoAAI4BACAeAACuAQAgHwAArgEAIG0AAACCAQJuAAAAggEIbwAAAIIBCHQAAK0BggEiBG0AAACCAQJuAAAAggEIbwAAAIIBCHQAAK4BggEiCmQAAK8BADBlAAAsABBmAACvAQAwZwEAigEAIWxAAIwBACGHAUAAjAEAIYgBAQCKAQAhiQEBAIoBACGKAQEAigEAIYwBAACwAYwBIgcKAACOAQAgHgAAsgEAIB8AALIBACBtAAAAjAECbgAAAIwBCG8AAACMAQh0AACxAYwBIgcKAACOAQAgHgAAsgEAIB8AALIBACBtAAAAjAECbgAAAIwBCG8AAACMAQh0AACxAYwBIgRtAAAAjAECbgAAAIwBCG8AAACMAQh0AACyAYwBIg0IAAC2AQAgCQAAtwEAIAsAALUBACBkAACzAQAwZQAAGQAQZgAAswEAMGcBAJ0BACFsQACfAQAhhwFAAJ8BACGIAQEAnQEAIYkBAQCdAQAhigEBAJ0BACGMAQAAtAGMASIEbQAAAIwBAm4AAACMAQhvAAAAjAEIdAAAsgGMASIDjQEAAAMAII4BAAADACCPAQAAAwAgA40BAAAHACCOAQAABwAgjwEAAAcAIAONAQAADQAgjgEAAA0AII8BAAANACACagEAAAABawEAAAABCwYAALsBACAHAAC8AQAgZAAAuQEAMGUAAA0AEGYAALkBADBnAQCdAQAhaAIAugEAIWkBAJ0BACFqAQCdAQAhawEAnQEAIWxAAJ8BACEIbQIAAAABbgIAAAAEbwIAAAAEcAIAAAABcQIAAAABcgIAAAABcwIAAAABdAIAjgEAIQ8IAAC2AQAgCQAAtwEAIAsAALUBACBkAACzAQAwZQAAGQAQZgAAswEAMGcBAJ0BACFsQACfAQAhhwFAAJ8BACGIAQEAnQEAIYkBAQCdAQAhigEBAJ0BACGMAQAAtAGMASKRAQAAGQAgkgEAABkAIBMDAAC7AQAgCAAAtgEAIAkAALcBACBkAADBAQAwZQAAAwAQZgAAwQEAMGcBAJ0BACFsQACfAQAhfQEAnQEAIX4BAJ0BACF_QACfAQAhgAEBAJ0BACGCAQAAwgGCASKEAQAAwwGEASKFAQgAxAEAIYYBAQCdAQAhhwFAAJ8BACGRAQAAAwAgkgEAAAMAIAJqAQAAAAFrAQAAAAELBQAAwAEAIAYAALsBACAHAAC8AQAgZAAAvgEAMGUAAAcAEGYAAL4BADBnAQCdAQAhagEAnQEAIWsBAJ0BACFsQACfAQAheQAAvwF9IgRtAAAAfQJuAAAAfQhvAAAAfQh0AACkAX0iDAQAAKABACBkAACbAQAwZQAACwAQZgAAmwEAMGcBAJ0BACFsQACfAQAheAgAnAEAIXkBAJ0BACF6AQCeAQAhewEAnQEAIZEBAAALACCSAQAACwAgEQMAALsBACAIAAC2AQAgCQAAtwEAIGQAAMEBADBlAAADABBmAADBAQAwZwEAnQEAIWxAAJ8BACF9AQCdAQAhfgEAnQEAIX9AAJ8BACGAAQEAnQEAIYIBAADCAYIBIoQBAADDAYQBIoUBCADEAQAhhgEBAJ0BACGHAUAAnwEAIQRtAAAAggECbgAAAIIBCG8AAACCAQh0AACuAYIBIgRtAAAAhAECbgAAAIQBCG8AAACEAQh0AACsAYQBIghtCAAAAAFuCAAAAAVvCAAAAAVwCAAAAAFxCAAAAAFyCAAAAAFzCAAAAAF0CACqAQAhAAAAAAABmQEBAAAAAQWZAQIAAAABnAECAAAAAZ0BAgAAAAGeAQIAAAABnwECAAAAAQGZAUAAAAABBRgAANoCACAZAADgAgAgkwEAANsCACCUAQAA3wIAIJcBAAABACAFGAAA2AIAIBkAAN0CACCTAQAA2QIAIJQBAADcAgAglwEAAAUAIAMYAADaAgAgkwEAANsCACCXAQAAAQAgAxgAANgCACCTAQAA2QIAIJcBAAAFACAAAAAAAAAFmQEIAAAAAZwBCAAAAAGdAQgAAAABngEIAAAAAZ8BCAAAAAEBmQEBAAAAAQUYAADTAgAgGQAA1gIAIJMBAADUAgAglAEAANUCACCXAQAACQAgAxgAANMCACCTAQAA1AIAIJcBAAAJACADBQAAvgIAIAYAALwCACAHAAC9AgAgAAAAAZkBAAAAfQIHGAAA4wEAIBkAAOYBACCTAQAA5AEAIJQBAADlAQAglQEAAAsAIJYBAAALACCXAQAAWwAgBRgAAMsCACAZAADRAgAgkwEAAMwCACCUAQAA0AIAIJcBAAABACAFGAAAyQIAIBkAAM4CACCTAQAAygIAIJQBAADNAgAglwEAAAUAIAVnAQAAAAFsQAAAAAF4CAAAAAF5AQAAAAF6AQAAAAECAAAAWwAgGAAA4wEAIAMAAAALACAYAADjAQAgGQAA5wEAIAcAAAALACARAADnAQAgZwEAygEAIWxAAMwBACF4CADXAQAheQEAygEAIXoBANgBACEFZwEAygEAIWxAAMwBACF4CADXAQAheQEAygEAIXoBANgBACEDGAAA4wEAIJMBAADkAQAglwEAAFsAIAMYAADLAgAgkwEAAMwCACCXAQAAAQAgAxgAAMkCACCTAQAAygIAIJcBAAAFACAAAAAAAAGZAQAAAIIBAgGZAQAAAIQBAgWZAQgAAAABnAEIAAAAAZ0BCAAAAAGeAQgAAAABnwEIAAAAAQUYAADCAgAgGQAAxwIAIJMBAADDAgAglAEAAMYCACCXAQAAAQAgCxgAAIICADAZAACHAgAwkwEAAIMCADCUAQAAhAIAMJUBAACGAgAwlgEAAIYCADCXAQAAhgIAMJgBAACFAgAgmQEAAIYCADCaAQAAiAIAMJsBAACJAgAwCxgAAPYBADAZAAD7AQAwkwEAAPcBADCUAQAA-AEAMJUBAAD6AQAwlgEAAPoBADCXAQAA-gEAMJgBAAD5AQAgmQEAAPoBADCaAQAA_AEAMJsBAAD9AQAwBgYAAM8BACBnAQAAAAFoAgAAAAFpAQAAAAFqAQAAAAFsQAAAAAECAAAADwAgGAAAgQIAIAMAAAAPACAYAACBAgAgGQAAgAIAIAERAADFAgAwDAYAALsBACAHAAC8AQAgZAAAuQEAMGUAAA0AEGYAALkBADBnAQAAAAFoAgC6AQAhaQEAnQEAIWoBAJ0BACFrAQCdAQAhbEAAnwEAIZABAAC4AQAgAgAAAA8AIBEAAIACACACAAAA_gEAIBEAAP8BACAJZAAA_QEAMGUAAP4BABBmAAD9AQAwZwEAnQEAIWgCALoBACFpAQCdAQAhagEAnQEAIWsBAJ0BACFsQACfAQAhCWQAAP0BADBlAAD-AQAQZgAA_QEAMGcBAJ0BACFoAgC6AQAhaQEAnQEAIWoBAJ0BACFrAQCdAQAhbEAAnwEAIQVnAQDKAQAhaAIAywEAIWkBAMoBACFqAQDKAQAhbEAAzAEAIQYGAADNAQAgZwEAygEAIWgCAMsBACFpAQDKAQAhagEAygEAIWxAAMwBACEGBgAAzwEAIGcBAAAAAWgCAAAAAWkBAAAAAWoBAAAAAWxAAAAAAQYFAADoAQAgBgAA6QEAIGcBAAAAAWoBAAAAAWxAAAAAAXkAAAB9AgIAAAAJACAYAACNAgAgAwAAAAkAIBgAAI0CACAZAACMAgAgAREAAMQCADAMBQAAwAEAIAYAALsBACAHAAC8AQAgZAAAvgEAMGUAAAcAEGYAAL4BADBnAQAAAAFqAQCdAQAhawEAnQEAIWxAAJ8BACF5AAC_AX0ikAEAAL0BACACAAAACQAgEQAAjAIAIAIAAACKAgAgEQAAiwIAIAhkAACJAgAwZQAAigIAEGYAAIkCADBnAQCdAQAhagEAnQEAIWsBAJ0BACFsQACfAQAheQAAvwF9IghkAACJAgAwZQAAigIAEGYAAIkCADBnAQCdAQAhagEAnQEAIWsBAJ0BACFsQACfAQAheQAAvwF9IgRnAQDKAQAhagEAygEAIWxAAMwBACF5AADfAX0iBgUAAOABACAGAADhAQAgZwEAygEAIWoBAMoBACFsQADMAQAheQAA3wF9IgYFAADoAQAgBgAA6QEAIGcBAAAAAWoBAAAAAWxAAAAAAXkAAAB9AgMYAADCAgAgkwEAAMMCACCXAQAAAQAgBBgAAIICADCTAQAAgwIAMJcBAACGAgAwmAEAAIUCACAEGAAA9gEAMJMBAAD3AQAwlwEAAPoBADCYAQAA-QEAIAAAAAGZAQAAAIwBAgsYAACqAgAwGQAArwIAMJMBAACrAgAwlAEAAKwCADCVAQAArgIAMJYBAACuAgAwlwEAAK4CADCYAQAArQIAIJkBAACuAgAwmgEAALACADCbAQAAsQIAMAsYAAChAgAwGQAApQIAMJMBAACiAgAwlAEAAKMCADCVAQAAhgIAMJYBAACGAgAwlwEAAIYCADCYAQAApAIAIJkBAACGAgAwmgEAAKYCADCbAQAAiQIAMAsYAACYAgAwGQAAnAIAMJMBAACZAgAwlAEAAJoCADCVAQAA-gEAMJYBAAD6AQAwlwEAAPoBADCYAQAAmwIAIJkBAAD6AQAwmgEAAJ0CADCbAQAA_QEAMAYHAADQAQAgZwEAAAABaAIAAAABaQEAAAABawEAAAABbEAAAAABAgAAAA8AIBgAAKACACADAAAADwAgGAAAoAIAIBkAAJ8CACABEQAAwQIAMAIAAAAPACARAACfAgAgAgAAAP4BACARAACeAgAgBWcBAMoBACFoAgDLAQAhaQEAygEAIWsBAMoBACFsQADMAQAhBgcAAM4BACBnAQDKAQAhaAIAywEAIWkBAMoBACFrAQDKAQAhbEAAzAEAIQYHAADQAQAgZwEAAAABaAIAAAABaQEAAAABawEAAAABbEAAAAABBgUAAOgBACAHAADqAQAgZwEAAAABawEAAAABbEAAAAABeQAAAH0CAgAAAAkAIBgAAKkCACADAAAACQAgGAAAqQIAIBkAAKgCACABEQAAwAIAMAIAAAAJACARAACoAgAgAgAAAIoCACARAACnAgAgBGcBAMoBACFrAQDKAQAhbEAAzAEAIXkAAN8BfSIGBQAA4AEAIAcAAOIBACBnAQDKAQAhawEAygEAIWxAAMwBACF5AADfAX0iBgUAAOgBACAHAADqAQAgZwEAAAABawEAAAABbEAAAAABeQAAAH0CDAgAAI8CACAJAACQAgAgZwEAAAABbEAAAAABfQEAAAABfgEAAAABf0AAAAABgAEBAAAAAYIBAAAAggEChAEAAACEAQKFAQgAAAABhwFAAAAAAQIAAAAFACAYAAC1AgAgAwAAAAUAIBgAALUCACAZAAC0AgAgAREAAL8CADARAwAAuwEAIAgAALYBACAJAAC3AQAgZAAAwQEAMGUAAAMAEGYAAMEBADBnAQAAAAFsQACfAQAhfQEAnQEAIX4BAJ0BACF_QACfAQAhgAEBAJ0BACGCAQAAwgGCASKEAQAAwwGEASKFAQgAxAEAIYYBAQCdAQAhhwFAAJ8BACECAAAABQAgEQAAtAIAIAIAAACyAgAgEQAAswIAIA5kAACxAgAwZQAAsgIAEGYAALECADBnAQCdAQAhbEAAnwEAIX0BAJ0BACF-AQCdAQAhf0AAnwEAIYABAQCdAQAhggEAAMIBggEihAEAAMMBhAEihQEIAMQBACGGAQEAnQEAIYcBQACfAQAhDmQAALECADBlAACyAgAQZgAAsQIAMGcBAJ0BACFsQACfAQAhfQEAnQEAIX4BAJ0BACF_QACfAQAhgAEBAJ0BACGCAQAAwgGCASKEAQAAwwGEASKFAQgAxAEAIYYBAQCdAQAhhwFAAJ8BACEKZwEAygEAIWxAAMwBACF9AQDKAQAhfgEAygEAIX9AAMwBACGAAQEAygEAIYIBAADwAYIBIoQBAADxAYQBIoUBCADyAQAhhwFAAMwBACEMCAAA9AEAIAkAAPUBACBnAQDKAQAhbEAAzAEAIX0BAMoBACF-AQDKAQAhf0AAzAEAIYABAQDKAQAhggEAAPABggEihAEAAPEBhAEihQEIAPIBACGHAUAAzAEAIQwIAACPAgAgCQAAkAIAIGcBAAAAAWxAAAAAAX0BAAAAAX4BAAAAAX9AAAAAAYABAQAAAAGCAQAAAIIBAoQBAAAAhAEChQEIAAAAAYcBQAAAAAEEGAAAqgIAMJMBAACrAgAwlwEAAK4CADCYAQAArQIAIAQYAAChAgAwkwEAAKICADCXAQAAhgIAMJgBAACkAgAgBBgAAJgCADCTAQAAmQIAMJcBAAD6AQAwmAEAAJsCACAAAAADCAAAugIAIAkAALsCACALAAC5AgAgBAMAALwCACAIAAC6AgAgCQAAuwIAIIUBAADRAQAgAgQAANsBACB6AADRAQAgCmcBAAAAAWxAAAAAAX0BAAAAAX4BAAAAAX9AAAAAAYABAQAAAAGCAQAAAIIBAoQBAAAAhAEChQEIAAAAAYcBQAAAAAEEZwEAAAABawEAAAABbEAAAAABeQAAAH0CBWcBAAAAAWgCAAAAAWkBAAAAAWsBAAAAAWxAAAAAAQkIAAC3AgAgCQAAuAIAIGcBAAAAAWxAAAAAAYcBQAAAAAGIAQEAAAABiQEBAAAAAYoBAQAAAAGMAQAAAIwBAgIAAAABACAYAADCAgAgBGcBAAAAAWoBAAAAAWxAAAAAAXkAAAB9AgVnAQAAAAFoAgAAAAFpAQAAAAFqAQAAAAFsQAAAAAEDAAAAGQAgGAAAwgIAIBkAAMgCACALAAAAGQAgCAAAlgIAIAkAAJcCACARAADIAgAgZwEAygEAIWxAAMwBACGHAUAAzAEAIYgBAQDKAQAhiQEBAMoBACGKAQEAygEAIYwBAACUAowBIgkIAACWAgAgCQAAlwIAIGcBAMoBACFsQADMAQAhhwFAAMwBACGIAQEAygEAIYkBAQDKAQAhigEBAMoBACGMAQAAlAKMASINAwAAjgIAIAkAAJACACBnAQAAAAFsQAAAAAF9AQAAAAF-AQAAAAF_QAAAAAGAAQEAAAABggEAAACCAQKEAQAAAIQBAoUBCAAAAAGGAQEAAAABhwFAAAAAAQIAAAAFACAYAADJAgAgCQkAALgCACALAAC2AgAgZwEAAAABbEAAAAABhwFAAAAAAYgBAQAAAAGJAQEAAAABigEBAAAAAYwBAAAAjAECAgAAAAEAIBgAAMsCACADAAAAAwAgGAAAyQIAIBkAAM8CACAPAAAAAwAgAwAA8wEAIAkAAPUBACARAADPAgAgZwEAygEAIWxAAMwBACF9AQDKAQAhfgEAygEAIX9AAMwBACGAAQEAygEAIYIBAADwAYIBIoQBAADxAYQBIoUBCADyAQAhhgEBAMoBACGHAUAAzAEAIQ0DAADzAQAgCQAA9QEAIGcBAMoBACFsQADMAQAhfQEAygEAIX4BAMoBACF_QADMAQAhgAEBAMoBACGCAQAA8AGCASKEAQAA8QGEASKFAQgA8gEAIYYBAQDKAQAhhwFAAMwBACEDAAAAGQAgGAAAywIAIBkAANICACALAAAAGQAgCQAAlwIAIAsAAJUCACARAADSAgAgZwEAygEAIWxAAMwBACGHAUAAzAEAIYgBAQDKAQAhiQEBAMoBACGKAQEAygEAIYwBAACUAowBIgkJAACXAgAgCwAAlQIAIGcBAMoBACFsQADMAQAhhwFAAMwBACGIAQEAygEAIYkBAQDKAQAhigEBAMoBACGMAQAAlAKMASIHBgAA6QEAIAcAAOoBACBnAQAAAAFqAQAAAAFrAQAAAAFsQAAAAAF5AAAAfQICAAAACQAgGAAA0wIAIAMAAAAHACAYAADTAgAgGQAA1wIAIAkAAAAHACAGAADhAQAgBwAA4gEAIBEAANcCACBnAQDKAQAhagEAygEAIWsBAMoBACFsQADMAQAheQAA3wF9IgcGAADhAQAgBwAA4gEAIGcBAMoBACFqAQDKAQAhawEAygEAIWxAAMwBACF5AADfAX0iDQMAAI4CACAIAACPAgAgZwEAAAABbEAAAAABfQEAAAABfgEAAAABf0AAAAABgAEBAAAAAYIBAAAAggEChAEAAACEAQKFAQgAAAABhgEBAAAAAYcBQAAAAAECAAAABQAgGAAA2AIAIAkIAAC3AgAgCwAAtgIAIGcBAAAAAWxAAAAAAYcBQAAAAAGIAQEAAAABiQEBAAAAAYoBAQAAAAGMAQAAAIwBAgIAAAABACAYAADaAgAgAwAAAAMAIBgAANgCACAZAADeAgAgDwAAAAMAIAMAAPMBACAIAAD0AQAgEQAA3gIAIGcBAMoBACFsQADMAQAhfQEAygEAIX4BAMoBACF_QADMAQAhgAEBAMoBACGCAQAA8AGCASKEAQAA8QGEASKFAQgA8gEAIYYBAQDKAQAhhwFAAMwBACENAwAA8wEAIAgAAPQBACBnAQDKAQAhbEAAzAEAIX0BAMoBACF-AQDKAQAhf0AAzAEAIYABAQDKAQAhggEAAPABggEihAEAAPEBhAEihQEIAPIBACGGAQEAygEAIYcBQADMAQAhAwAAABkAIBgAANoCACAZAADhAgAgCwAAABkAIAgAAJYCACALAACVAgAgEQAA4QIAIGcBAMoBACFsQADMAQAhhwFAAMwBACGIAQEAygEAIYkBAQDKAQAhigEBAMoBACGMAQAAlAKMASIJCAAAlgIAIAsAAJUCACBnAQDKAQAhbEAAzAEAIYcBQADMAQAhiAEBAMoBACGJAQEAygEAIYoBAQDKAQAhjAEAAJQCjAEiBAgTAwkUBQoABwsGAgQDAAEICgMJEAUKAAYDBQwEBgABBwACAQQAAwIGAAEHAAICCBEACRIAAwgWAAkXAAsVAAAAAAMKAAweAA0fAA4AAAADCgAMHgANHwAOAQMAAQEDAAEFCgATHgAWHwAXMAAUMQAVAAAAAAAFCgATHgAWHwAXMAAUMQAVAgYAAQcAAgIGAAEHAAIDCgAcHgAdHwAeAAAAAwoAHB4AHR8AHgEEAAMBBAADBQoAIx4AJh8AJzAAJDEAJQAAAAAABQoAIx4AJh8AJzAAJDEAJQIGAAEHAAICBgABBwACBQoALB4ALx8AMDAALTEALgAAAAAABQoALB4ALx8AMDAALTEALgwCAQ0YAQ4bAQ8cARAdARIfARMhCBQiCRUkARYmCBcnChooARspARwqCCAtCyEuDyIvAiMwAiQxAiUyAiYzAic1Aig3CCk4ECo6Ais8CCw9ES0-Ai4_Ai9ACDJDEjNEGDRFAzVGAzZHAzdIAzhJAzlLAzpNCDtOGTxQAz1SCD5TGj9UA0BVA0FWCEJZG0NaH0RcBEVdBEZfBEdgBEhhBEljBEplCEtmIExoBE1qCE5rIU9sBFBtBFFuCFJxIlNyKFRzBVV0BVZ1BVd2BVh3BVl5BVp7CFt8KVx-BV2AAQhegQEqX4IBBWCDAQVhhAEIYocBK2OIATE"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  EventScalarFieldEnum: () => EventScalarFieldEnum,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  ParticipationScalarFieldEnum: () => ParticipationScalarFieldEnum,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.5.0",
  engine: "280c870be64f457428992c43c1f6d557fab6e29e"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Event: "Event",
  Participation: "Participation",
  Payment: "Payment",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  role: "role",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var EventScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  date: "date",
  venue: "venue",
  eventType: "eventType",
  feeType: "feeType",
  fee: "fee",
  creatorId: "creatorId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ParticipationScalarFieldEnum = {
  id: "id",
  userId: "userId",
  eventId: "eventId",
  status: "status",
  createdAt: "createdAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  amount: "amount",
  status: "status",
  transactionId: "transactionId",
  participationId: "participationId",
  createdAt: "createdAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  userId: "userId",
  eventId: "eventId",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
var PrismaClient = getPrismaClientClass();

// src/config/index.ts
import dotenv from "dotenv";
dotenv.config();
var config_default = {
  NODE_ENV: process.env.NODE_ENV || "development",
  port: process.env.PORT,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUND),
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY
};

// src/errors/AppError.ts
var AppError = class extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var AppError_default = AppError;

// src/errors/handlePrismaError.ts
var handlePrismaError = (err) => {
  let statusCode = 400;
  let message = "Database Error";
  let errorSources = [];
  switch (err.code) {
    // Unique constraint violation
    case "P2002": {
      const target = err.meta?.target || [];
      const field = target.join(", ");
      statusCode = 409;
      message = "Duplicate Entry";
      errorSources = [
        {
          path: field,
          message: `${field} already exists`
        }
      ];
      break;
    }
    // Foreign key constraint failed
    case "P2003": {
      const field = err.meta?.field_name || "field";
      statusCode = 400;
      message = "Foreign Key Constraint Failed";
      errorSources = [
        {
          path: field,
          message: `Invalid reference: ${field}`
        }
      ];
      break;
    }
    // Record not found
    case "P2025": {
      statusCode = 404;
      message = "Record Not Found";
      errorSources = [
        {
          path: "",
          message: err.meta?.cause || "The requested record does not exist"
        }
      ];
      break;
    }
    // Invalid ID format (e.g., invalid UUID)
    case "P2023": {
      statusCode = 400;
      message = "Invalid ID";
      errorSources = [
        {
          path: "id",
          message: "Invalid ID format provided"
        }
      ];
      break;
    }
    // Required field missing
    case "P2011": {
      const field = err.meta?.constraint || "field";
      statusCode = 400;
      message = "Required Field Missing";
      errorSources = [
        {
          path: field,
          message: `${field} is required`
        }
      ];
      break;
    }
    // Default case for other Prisma errors
    default: {
      errorSources = [
        {
          path: "",
          message: err.message
        }
      ];
    }
  }
  return {
    statusCode,
    message,
    errorSources
  };
};
var handlePrismaError_default = handlePrismaError;

// src/errors/handlePrismaValidationError.ts
var handlePrismaValidationError = (err) => {
  const statusCode = 400;
  const errorMessage = err.message;
  const argumentMatch = errorMessage.match(/Argument `(\w+)`/);
  const fieldName = argumentMatch ? argumentMatch[1] : "unknown";
  const errorSources = [
    {
      path: fieldName,
      message: errorMessage.split("\n").pop() || "Validation failed"
    }
  ];
  return {
    statusCode,
    message: "Validation Error",
    errorSources
  };
};
var handlePrismaValidationError_default = handlePrismaValidationError;

// src/errors/handleZodError.ts
var handleZodError = (err) => {
  const errorSources = err.issues.map((issue) => {
    return {
      // Access the last element and ensure it's a string/number
      path: issue.path[issue.path.length - 1].toString(),
      message: issue.message
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources
  };
};
var handleZodError_default = handleZodError;

// src/middlewares/globalErrorhandler.ts
var globalErrorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources = [
    {
      path: "",
      message: "Something went wrong"
    }
  ];
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError_default(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    const simplifiedError = handlePrismaError_default(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    const simplifiedError = handlePrismaValidationError_default(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    statusCode = 503;
    message = "Database Connection Error";
    errorSources = [
      {
        path: "",
        message: "Unable to connect to the database"
      }
    ];
  } else if (err instanceof AppError_default) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message
      }
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message
      }
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config_default.NODE_ENV === "development" ? err?.stack : null
  });
};
var globalErrorhandler_default = globalErrorHandler;

// src/middlewares/notfound.ts
import httpStatus from "http-status";
var notFound = (req, res, next) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!",
    error: ""
  });
};
var notfound_default = notFound;

// src/routes/index.ts
import { Router } from "express";

// src/modules/Auth/auth.route.ts
import express from "express";

// src/middlewares/validateRequest.ts
var validateRequest = (zodSchema) => {
  return (req, res, next) => {
    if (req.body?.data) {
      req.body = JSON.parse(req.body.data);
    }
    const parsedResult = zodSchema.safeParse({
      body: req.body,
      cookies: req.cookies,
      params: req.params,
      query: req.query
    });
    if (!parsedResult.success) {
      return next(parsedResult.error);
    }
    if (parsedResult.data.body) {
      req.body = parsedResult.data.body;
    }
    return next();
  };
};

// src/modules/Auth/auth.validation.ts
import { z } from "zod";
var loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(1, { message: "Password is required." })
  })
});
var refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().min(1, { message: "Refresh token is required!" })
  })
});
var registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(1, { message: "Password is required." }),
    img: z.string().optional()
  })
});
var AuthValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  registerUserValidationSchema
};

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
var catchAsync_default = catchAsync;

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta && data.meta
  });
};
var sendResponse_default = sendResponse;

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/Auth/auth.service.ts
import httpStatus2 from "http-status";
import bcryptJs from "bcryptjs";

// src/modules/Auth/auth.utils.ts
import jwt from "jsonwebtoken";
var createToken = (jwtPayload, secret, expiresIn) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
var verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

// src/modules/User/user.utils.ts
var USER_ROLE = {
  //  
  USER: "USER",
  ADMIN: "ADMIN"
};

// src/modules/Auth/auth.service.ts
var loginUser = async (payload) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email }
  });
  if (!user || !payload.password || !user.password) {
    throw new AppError_default(httpStatus2.UNAUTHORIZED, "Invalid email or password");
  }
  const isPasswordMatched = await bcryptJs.compare(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError_default(httpStatus2.UNAUTHORIZED, "Invalid email or password");
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
    id: user.id
  };
  const accessToken = createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var refreshToken = async (token) => {
  if (!token) {
    throw new AppError_default(httpStatus2.UNAUTHORIZED, "Refresh token is required!");
  }
  const decoded = verifyToken(token, config_default.jwt_refresh_secret);
  const { email } = decoded;
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new AppError_default(httpStatus2.NOT_FOUND, "This user is not found!");
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
    id: user.id
  };
  const accessToken = createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  return {
    accessToken
  };
};
var registerUser = async (userData) => {
  const isUserExists = await prisma.user.findUnique({
    where: { email: userData.email }
  });
  if (isUserExists) {
    throw new AppError_default(httpStatus2.CONFLICT, "User already exists!");
  }
  const hashedPassword = await bcryptJs.hash(
    userData.password,
    Number(config_default.bcrypt_salt_rounds)
  );
  const user = await prisma.user.create({
    data: {
      name: userData.name || "",
      email: userData.email,
      password: hashedPassword,
      role: USER_ROLE.USER
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
  return user;
};
var AuthServices = {
  loginUser,
  refreshToken,
  registerUser
};

// src/modules/Auth/auth.controller.ts
import httpStatus3 from "http-status";
var loginUser2 = catchAsync_default(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken: refreshToken3, accessToken } = result;
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });
  sendResponse_default(res, {
    statusCode: httpStatus3.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken
    }
  });
});
var refreshToken2 = catchAsync_default(async (req, res) => {
  const { refreshToken: refreshToken3 } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken3);
  sendResponse_default(res, {
    statusCode: httpStatus3.OK,
    success: true,
    message: "Access token is retrieved successfully!",
    data: result
  });
});
var registerUser2 = catchAsync_default(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  sendResponse_default(res, {
    statusCode: httpStatus3.OK,
    success: true,
    message: "User registered successfully",
    data: result
  });
});
var AuthControllers = {
  loginUser: loginUser2,
  refreshToken: refreshToken2,
  registerUser: registerUser2
};

// src/modules/Auth/auth.route.ts
var router = express.Router();
router.post(
  "/login",
  //   validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);
router.post(
  "/register",
  //   validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser
);
var AuthRoutes = router;

// src/modules/User/user.route.ts
import express2 from "express";

// src/modules/User/user.service.ts
import bcryptJs2 from "bcryptjs";

// src/modules/User/user.constant.ts
var UserSearchableFields = ["name", "email"];

// src/modules/User/user.service.ts
import httpStatus4 from "http-status";
var userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true
};
var createUser = async (user) => {
  const isUserExists = await prisma.user.findUnique({
    where: { email: user.email }
  });
  if (isUserExists) {
    throw new AppError_default(httpStatus4.CONFLICT, "User already exists");
  }
  const hashedPassword = await bcryptJs2.hash(
    user.password,
    Number(config_default.bcrypt_salt_rounds)
  );
  return await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role || "USER"
    },
    select: userSelect
  });
};
var findUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: userSelect
  });
};
var getAllUsers = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = query.searchTerm;
  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder || "desc";
  const whereConditions = [];
  if (searchTerm) {
    whereConditions.push({
      OR: UserSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive"
        }
      }))
    });
  }
  const filterableFields = ["role", "email", "name"];
  const filterData = Object.fromEntries(
    Object.entries(query).filter(([key]) => filterableFields.includes(key))
  );
  if (Object.keys(filterData).length > 0) {
    whereConditions.push(filterData);
  }
  const whereClause = whereConditions.length > 0 ? { AND: whereConditions } : {};
  const [result, total] = await Promise.all([
    prisma.user.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: userSelect
    }),
    prisma.user.count({ where: whereClause })
  ]);
  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit)
    },
    data: result
  };
};
var updateUserById = async (userId, payload) => {
  const updateData = { ...payload };
  if (payload.password) {
    updateData.password = await bcryptJs2.hash(
      payload.password,
      Number(config_default.bcrypt_salt_rounds)
    );
  }
  const result = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: userSelect
  });
  return result;
};
var deleteUserById = async (userId) => {
  await prisma.user.delete({
    where: { id: userId }
  });
  return null;
};
var UserService = {
  createUser,
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById
};

// src/modules/User/user.controller.ts
import httpStatus5 from "http-status";
var createUser2 = catchAsync_default(async (req, res) => {
  const result = await UserService.createUser(req.body);
  sendResponse_default(res, {
    statusCode: httpStatus5.CREATED,
    success: true,
    message: "User is created succesfully",
    data: result
  });
});
var findUserById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.findUserById(id);
  sendResponse_default(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "User is retrieved succesfully",
    data: result
  });
});
var getAllUsers2 = catchAsync_default(async (req, res) => {
  const result = await UserService.getAllUsers(req.query);
  sendResponse_default(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "Users are retrieved succesfully",
    meta: result.meta,
    data: result.data
  });
});
var updateUserById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateUserById(id, req.body);
  sendResponse_default(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "User is updated succesfully",
    data: result
  });
});
var deleteUserById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  await UserService.deleteUserById(id);
  sendResponse_default(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "User deleted successfully",
    data: null
  });
});
var UserController = {
  createUser: createUser2,
  findUserById: findUserById2,
  getAllUsers: getAllUsers2,
  updateUserById: updateUserById2,
  deleteUserById: deleteUserById2
};

// src/modules/User/user.validation.ts
import { z as z2 } from "zod";
var createUserValidationSchema = z2.object({
  body: z2.object({
    name: z2.string().min(1, "Name is required"),
    email: z2.string().email("Invalid email"),
    password: z2.string().min(6, "Password must be at least 6 characters"),
    role: z2.enum(["ADMIN", "USER"]).optional()
  })
});
var updateUserValidationSchema = z2.object({
  body: z2.object({
    name: z2.string().min(1).optional(),
    email: z2.string().email().optional(),
    password: z2.string().min(6).optional(),
    role: z2.enum(["ADMIN", "USER"]).optional()
  })
});

// src/middlewares/auth.ts
import httpStatus6 from "http-status";
import jwt2 from "jsonwebtoken";
var auth = (...requiredRoles) => {
  return catchAsync_default(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError_default(httpStatus6.UNAUTHORIZED, "You are not authorized!");
    }
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    const decoded = jwt2.verify(
      token,
      config_default.jwt_access_secret
    );
    const { role, email } = decoded;
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      throw new AppError_default(httpStatus6.NOT_FOUND, "This user is not found!");
    }
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError_default(httpStatus6.UNAUTHORIZED, "You are not authorized!");
    }
    req.user = decoded;
    next();
  });
};
var auth_default = auth;

// src/modules/User/user.route.ts
var router2 = express2.Router();
router2.post(
  "/",
  auth_default(USER_ROLE.ADMIN),
  validateRequest(createUserValidationSchema),
  UserController.createUser
);
router2.get("/", auth_default(USER_ROLE.ADMIN), UserController.getAllUsers);
router2.get(
  "/:id",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserController.findUserById
);
router2.patch(
  "/:id",
  auth_default(USER_ROLE.ADMIN),
  validateRequest(updateUserValidationSchema),
  UserController.updateUserById
);
router2.delete("/:id", auth_default(USER_ROLE.ADMIN), UserController.deleteUserById);
var UserRoutes = router2;

// src/modules/Event/event.route.ts
import express3 from "express";

// src/modules/Event/event.service.ts
import httpStatus7 from "http-status";

// src/modules/Event/event.constant.ts
var EventSearchableFields = ["title", "description", "venue"];

// src/modules/Event/event.service.ts
var eventSelect = {
  id: true,
  title: true,
  description: true,
  date: true,
  venue: true,
  eventType: true,
  feeType: true,
  fee: true,
  creatorId: true,
  createdAt: true,
  updatedAt: true,
  creator: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  }
};
var createEvent = async (userId, payload) => {
  if (payload.feeType === "FREE" && payload.fee && payload.fee > 0) {
    throw new AppError_default(httpStatus7.BAD_REQUEST, "Free event cannot have fee");
  }
  if (payload.feeType === "PAID" && (!payload.fee || payload.fee <= 0)) {
    throw new AppError_default(httpStatus7.BAD_REQUEST, "Paid event must have a valid fee");
  }
  const result = await prisma.event.create({
    data: {
      title: payload.title,
      description: payload.description,
      date: new Date(payload.date),
      venue: payload.venue,
      eventType: payload.eventType,
      feeType: payload.feeType,
      fee: payload.feeType === "FREE" ? 0 : payload.fee,
      creatorId: userId
    },
    select: eventSelect
  });
  return result;
};
var getAllEvents = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = query.searchTerm;
  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder || "desc";
  const whereConditions = [];
  if (searchTerm) {
    whereConditions.push({
      OR: EventSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive"
        }
      }))
    });
  }
  const filterableFields = ["eventType", "feeType", "creatorId"];
  const filterData = Object.fromEntries(
    Object.entries(query).filter(([key]) => filterableFields.includes(key))
  );
  if (Object.keys(filterData).length > 0) {
    whereConditions.push(filterData);
  }
  const whereClause = whereConditions.length > 0 ? { AND: whereConditions } : {};
  const [result, total] = await Promise.all([
    prisma.event.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: eventSelect
    }),
    prisma.event.count({ where: whereClause })
  ]);
  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit)
    },
    data: result
  };
};
var getEventById = async (eventId) => {
  const result = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      ...eventSelect,
      participations: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });
  if (!result) {
    throw new AppError_default(httpStatus7.NOT_FOUND, "Event not found");
  }
  return result;
};
var updateEventById = async (eventId, userId, userRole, payload) => {
  const existingEvent = await prisma.event.findUnique({
    where: { id: eventId }
  });
  if (!existingEvent) {
    throw new AppError_default(httpStatus7.NOT_FOUND, "Event not found");
  }
  if (userRole !== "ADMIN" && existingEvent.creatorId !== userId) {
    throw new AppError_default(httpStatus7.FORBIDDEN, "You are not authorized to update this event");
  }
  const updatedPayload = { ...payload };
  if (payload.date) {
    updatedPayload.date = new Date(payload.date);
  }
  const finalFeeType = payload.feeType || existingEvent.feeType;
  const finalFee = payload.fee !== void 0 ? payload.fee : existingEvent.fee;
  if (finalFeeType === "FREE" && finalFee && finalFee > 0) {
    throw new AppError_default(httpStatus7.BAD_REQUEST, "Free event cannot have fee");
  }
  if (finalFeeType === "PAID" && (!finalFee || finalFee <= 0)) {
    throw new AppError_default(httpStatus7.BAD_REQUEST, "Paid event must have a valid fee");
  }
  if (finalFeeType === "FREE") {
    updatedPayload.fee = 0;
  }
  const result = await prisma.event.update({
    where: { id: eventId },
    data: updatedPayload,
    select: eventSelect
  });
  return result;
};
var deleteEventById = async (eventId, userId, userRole) => {
  const existingEvent = await prisma.event.findUnique({
    where: { id: eventId }
  });
  if (!existingEvent) {
    throw new AppError_default(httpStatus7.NOT_FOUND, "Event not found");
  }
  if (userRole !== "ADMIN" && existingEvent.creatorId !== userId) {
    throw new AppError_default(httpStatus7.FORBIDDEN, "You are not authorized to delete this event");
  }
  await prisma.event.delete({
    where: { id: eventId }
  });
  return null;
};
var EventService = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById
};

// src/modules/Event/event.controller.ts
import httpStatus8 from "http-status";
var createEvent2 = catchAsync_default(async (req, res) => {
  const userId = req.user.id;
  const result = await EventService.createEvent(userId, req.body);
  sendResponse_default(res, {
    statusCode: httpStatus8.CREATED,
    success: true,
    message: "Event created successfully",
    data: result
  });
});
var getAllEvents2 = catchAsync_default(async (req, res) => {
  const result = await EventService.getAllEvents(req.query);
  sendResponse_default(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "Events retrieved successfully",
    meta: result.meta,
    data: result.data
  });
});
var getEventById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const result = await EventService.getEventById(id);
  sendResponse_default(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "Event retrieved successfully",
    data: result
  });
});
var updateEventById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;
  const result = await EventService.updateEventById(id, userId, userRole, req.body);
  sendResponse_default(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "Event updated successfully",
    data: result
  });
});
var deleteEventById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;
  await EventService.deleteEventById(id, userId, userRole);
  sendResponse_default(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "Event deleted successfully",
    data: null
  });
});
var EventController = {
  createEvent: createEvent2,
  getAllEvents: getAllEvents2,
  getEventById: getEventById2,
  updateEventById: updateEventById2,
  deleteEventById: deleteEventById2
};

// src/modules/Event/event.validation.ts
import { z as z3 } from "zod";
var createEventValidationSchema = z3.object({
  body: z3.object({
    title: z3.string().min(1, "Title is required"),
    description: z3.string().min(1, "Description is required"),
    date: z3.string().datetime({ message: "Date must be a valid ISO datetime string" }),
    venue: z3.string().min(1, "Venue is required"),
    eventType: z3.enum(["PUBLIC", "PRIVATE"]),
    feeType: z3.enum(["FREE", "PAID"]),
    fee: z3.number().optional()
  })
});
var updateEventValidationSchema = z3.object({
  body: z3.object({
    title: z3.string().min(1).optional(),
    description: z3.string().min(1).optional(),
    date: z3.string().datetime().optional(),
    venue: z3.string().min(1).optional(),
    eventType: z3.enum(["PUBLIC", "PRIVATE"]).optional(),
    feeType: z3.enum(["FREE", "PAID"]).optional(),
    fee: z3.number().optional()
  })
});
var EventValidations = {
  createEventValidationSchema,
  updateEventValidationSchema
};

// src/modules/Event/event.route.ts
var router3 = express3.Router();
router3.post(
  "/",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(EventValidations.createEventValidationSchema),
  EventController.createEvent
);
router3.get("/", EventController.getAllEvents);
router3.get("/:id", EventController.getEventById);
router3.patch(
  "/:id",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(EventValidations.updateEventValidationSchema),
  EventController.updateEventById
);
router3.delete(
  "/:id",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  EventController.deleteEventById
);
var EventRoutes = router3;

// src/modules/Participation/participation.route.ts
import express4 from "express";

// src/modules/Participation/participation.service.ts
import httpStatus9 from "http-status";
var joinEvent = async (userId, eventId) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });
  if (!event) {
    throw new AppError_default(httpStatus9.NOT_FOUND, "Event not found");
  }
  if (event.creatorId === userId) {
    throw new AppError_default(
      httpStatus9.BAD_REQUEST,
      "You cannot join your own event"
    );
  }
  const existingParticipation = await prisma.participation.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId
      }
    }
  });
  if (existingParticipation) {
    throw new AppError_default(
      httpStatus9.BAD_REQUEST,
      "You have already joined/requested this event"
    );
  }
  let status = "PENDING";
  if (event.eventType === "PUBLIC" && event.feeType === "FREE") {
    status = "APPROVED";
  }
  const result = await prisma.participation.create({
    data: {
      userId,
      eventId,
      status
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      event: {
        select: {
          id: true,
          title: true,
          eventType: true,
          feeType: true,
          fee: true,
          creatorId: true
        }
      }
    }
  });
  return result;
};
var getMyParticipations = async (userId) => {
  const result = await prisma.participation.findMany({
    where: {
      userId
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          date: true,
          venue: true,
          eventType: true,
          feeType: true,
          fee: true,
          creator: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      },
      payment: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getParticipantsByEvent = async (eventId, userId, userRole) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });
  if (!event) {
    throw new AppError_default(httpStatus9.NOT_FOUND, "Event not found");
  }
  if (userRole !== "ADMIN" && event.creatorId !== userId) {
    throw new AppError_default(
      httpStatus9.FORBIDDEN,
      "You are not authorized to view participants of this event"
    );
  }
  const result = await prisma.participation.findMany({
    where: {
      eventId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      payment: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var updateParticipationStatus = async (participationId, userId, userRole, status) => {
  const participation = await prisma.participation.findUnique({
    where: { id: participationId },
    include: {
      event: true,
      payment: true
    }
  });
  if (!participation) {
    throw new AppError_default(httpStatus9.NOT_FOUND, "Participation not found");
  }
  if (userRole !== "ADMIN" && participation.event.creatorId !== userId) {
    throw new AppError_default(
      httpStatus9.FORBIDDEN,
      "You are not authorized to update participation status"
    );
  }
  if (status === "APPROVED" && participation.event.feeType === "PAID") {
    if (!participation.payment || participation.payment.status !== "success") {
      throw new AppError_default(
        httpStatus9.BAD_REQUEST,
        "Payment required before approval"
      );
    }
  }
  const result = await prisma.participation.update({
    where: { id: participationId },
    data: { status },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      event: {
        select: {
          id: true,
          title: true,
          creatorId: true
        }
      },
      payment: true
    }
  });
  return result;
};
var approveParticipation = async (participationId, userId, userRole) => {
  return updateParticipationStatus(
    participationId,
    userId,
    userRole,
    "APPROVED"
  );
};
var rejectParticipation = async (participationId, userId, userRole) => {
  return updateParticipationStatus(
    participationId,
    userId,
    userRole,
    "REJECTED"
  );
};
var banParticipant = async (participationId, userId, userRole) => {
  return updateParticipationStatus(participationId, userId, userRole, "BANNED");
};
var ParticipationService = {
  joinEvent,
  getMyParticipations,
  getParticipantsByEvent,
  approveParticipation,
  rejectParticipation,
  banParticipant
};

// src/modules/Participation/participation.controller.ts
import httpStatus10 from "http-status";
var joinEvent2 = catchAsync_default(async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.params;
  const result = await ParticipationService.joinEvent(userId, eventId);
  sendResponse_default(res, {
    statusCode: httpStatus10.CREATED,
    success: true,
    message: "Participation request created successfully",
    data: result
  });
});
var getMyParticipations2 = catchAsync_default(async (req, res) => {
  const userId = req.user.id;
  const result = await ParticipationService.getMyParticipations(userId);
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "My participations retrieved successfully",
    data: result
  });
});
var getParticipantsByEvent2 = catchAsync_default(async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;
  const result = await ParticipationService.getParticipantsByEvent(
    eventId,
    userId,
    userRole
  );
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Participants retrieved successfully",
    data: result
  });
});
var approveParticipation2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;
  const result = await ParticipationService.approveParticipation(
    id,
    userId,
    userRole
  );
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Participation approved successfully",
    data: result
  });
});
var rejectParticipation2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;
  const result = await ParticipationService.rejectParticipation(
    id,
    userId,
    userRole
  );
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Participation rejected successfully",
    data: result
  });
});
var banParticipant2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;
  const result = await ParticipationService.banParticipant(
    id,
    userId,
    userRole
  );
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Participant banned successfully",
    data: result
  });
});
var ParticipationController = {
  joinEvent: joinEvent2,
  getMyParticipations: getMyParticipations2,
  getParticipantsByEvent: getParticipantsByEvent2,
  approveParticipation: approveParticipation2,
  rejectParticipation: rejectParticipation2,
  banParticipant: banParticipant2
};

// src/modules/Participation/participation.route.ts
var router4 = express4.Router();
router4.post(
  "/join/:eventId",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  ParticipationController.joinEvent
);
router4.get(
  "/my-participations",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  ParticipationController.getMyParticipations
);
router4.get(
  "/event/:eventId",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  ParticipationController.getParticipantsByEvent
);
router4.patch(
  "/:id/approve",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  ParticipationController.approveParticipation
);
router4.patch(
  "/:id/reject",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  ParticipationController.rejectParticipation
);
router4.patch(
  "/:id/ban",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  ParticipationController.banParticipant
);
var ParticipationRoutes = router4;

// src/modules/Review/review.route.ts
import express5 from "express";

// src/modules/Review/review.validation.ts
import { z as z4 } from "zod";
var createReviewValidationSchema = z4.object({
  body: z4.object({
    eventId: z4.string().min(1, "Event id is required"),
    rating: z4.number({
      error: (issue) => issue.input === void 0 ? "Rating is required" : "Rating must be a number"
    }).int("Rating must be an integer").min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
    comment: z4.string({
      error: (issue) => issue.input === void 0 ? "Comment is required" : "Comment must be a string"
    }).min(1, "Comment is required")
  })
});
var updateReviewValidationSchema = z4.object({
  body: z4.object({
    rating: z4.number({
      error: "Rating must be a number"
    }).int("Rating must be an integer").min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
    comment: z4.string({
      error: "Comment must be a string"
    }).min(1, "Comment cannot be empty").optional()
  })
});
var ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema
};

// src/modules/Review/review.service.ts
import httpStatus11 from "http-status";
var reviewSelect = {
  id: true,
  rating: true,
  comment: true,
  userId: true,
  eventId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true
    }
  },
  event: {
    select: {
      id: true,
      title: true,
      date: true,
      venue: true,
      eventType: true,
      feeType: true
    }
  }
};
var createReview = async (userId, payload) => {
  const event = await prisma.event.findUnique({
    where: { id: payload.eventId }
  });
  if (!event) {
    throw new AppError_default(httpStatus11.NOT_FOUND, "Event not found");
  }
  const existingReview = await prisma.review.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId: payload.eventId
      }
    }
  });
  if (existingReview) {
    throw new AppError_default(
      httpStatus11.BAD_REQUEST,
      "You have already reviewed this event"
    );
  }
  const participation = await prisma.participation.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId: payload.eventId
      }
    }
  });
  if (!participation || participation.status !== "APPROVED") {
    throw new AppError_default(
      httpStatus11.FORBIDDEN,
      "Only approved participants can review this event"
    );
  }
  if (new Date(event.date) > /* @__PURE__ */ new Date()) {
    throw new AppError_default(
      httpStatus11.BAD_REQUEST,
      "You can review only after the event date has passed"
    );
  }
  const result = await prisma.review.create({
    data: {
      userId,
      eventId: payload.eventId,
      rating: payload.rating,
      comment: payload.comment
    },
    select: reviewSelect
  });
  return result;
};
var getAllReviews = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder || "desc";
  const eventId = query.eventId;
  const userId = query.userId;
  const whereClause = {};
  if (eventId) {
    whereClause.eventId = eventId;
  }
  if (userId) {
    whereClause.userId = userId;
  }
  const [result, total] = await Promise.all([
    prisma.review.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder
      },
      select: reviewSelect
    }),
    prisma.review.count({
      where: whereClause
    })
  ]);
  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit)
    },
    data: result
  };
};
var getReviewById = async (reviewId) => {
  const result = await prisma.review.findUnique({
    where: { id: reviewId },
    select: reviewSelect
  });
  if (!result) {
    throw new AppError_default(httpStatus11.NOT_FOUND, "Review not found");
  }
  return result;
};
var updateReviewById = async (reviewId, userId, userRole, payload) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      event: true
    }
  });
  if (!review) {
    throw new AppError_default(httpStatus11.NOT_FOUND, "Review not found");
  }
  if (userRole !== "ADMIN" && review.userId !== userId) {
    throw new AppError_default(
      httpStatus11.FORBIDDEN,
      "You are not authorized to update this review"
    );
  }
  if (new Date(review.event.date) < /* @__PURE__ */ new Date()) {
  }
  const result = await prisma.review.update({
    where: { id: reviewId },
    data: payload,
    select: reviewSelect
  });
  return result;
};
var deleteReviewById = async (reviewId, userId, userRole) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId }
  });
  if (!review) {
    throw new AppError_default(httpStatus11.NOT_FOUND, "Review not found");
  }
  if (userRole !== "ADMIN" && review.userId !== userId) {
    throw new AppError_default(
      httpStatus11.FORBIDDEN,
      "You are not authorized to delete this review"
    );
  }
  await prisma.review.delete({
    where: { id: reviewId }
  });
  return null;
};
var getMyReviews = async (userId) => {
  const result = await prisma.review.findMany({
    where: {
      userId
    },
    select: reviewSelect,
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var ReviewService = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  getMyReviews
};

// src/modules/Review/review.controller.ts
import httpStatus12 from "http-status";
var createReview2 = catchAsync_default(async (req, res) => {
  const userId = req.user.id;
  const result = await ReviewService.createReview(userId, req.body);
  sendResponse_default(res, {
    statusCode: httpStatus12.CREATED,
    success: true,
    message: "Review created successfully",
    data: result
  });
});
var getAllReviews2 = catchAsync_default(async (req, res) => {
  const result = await ReviewService.getAllReviews(req.query);
  sendResponse_default(res, {
    statusCode: httpStatus12.OK,
    success: true,
    message: "Reviews retrieved successfully",
    meta: result.meta,
    data: result.data
  });
});
var getReviewById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewService.getReviewById(id);
  sendResponse_default(res, {
    statusCode: httpStatus12.OK,
    success: true,
    message: "Review retrieved successfully",
    data: result
  });
});
var updateReviewById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;
  const result = await ReviewService.updateReviewById(
    id,
    userId,
    userRole,
    req.body
  );
  sendResponse_default(res, {
    statusCode: httpStatus12.OK,
    success: true,
    message: "Review updated successfully",
    data: result
  });
});
var deleteReviewById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;
  await ReviewService.deleteReviewById(id, userId, userRole);
  sendResponse_default(res, {
    statusCode: httpStatus12.OK,
    success: true,
    message: "Review deleted successfully",
    data: null
  });
});
var getMyReviews2 = catchAsync_default(async (req, res) => {
  const userId = req.user.id;
  const result = await ReviewService.getMyReviews(userId);
  sendResponse_default(res, {
    statusCode: httpStatus12.OK,
    success: true,
    message: "My reviews retrieved successfully",
    data: result
  });
});
var ReviewController = {
  createReview: createReview2,
  getAllReviews: getAllReviews2,
  getReviewById: getReviewById2,
  updateReviewById: updateReviewById2,
  deleteReviewById: deleteReviewById2,
  getMyReviews: getMyReviews2
};

// src/modules/Review/review.route.ts
var router5 = express5.Router();
router5.post(
  "/",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewController.createReview
);
router5.get(
  "/",
  ReviewController.getAllReviews
);
router5.get(
  "/my-reviews",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  ReviewController.getMyReviews
);
router5.get(
  "/:id",
  ReviewController.getReviewById
);
router5.patch(
  "/:id",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewController.updateReviewById
);
router5.delete(
  "/:id",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  ReviewController.deleteReviewById
);
var ReviewRoutes = router5;

// src/modules/Payment/payment.route.ts
import express6 from "express";

// src/modules/Payment/payment.validation.ts
import { z as z5 } from "zod";
var createPaymentIntentValidationSchema = z5.object({
  body: z5.object({
    participationId: z5.string().min(1, "Participation id is required")
  })
});
var confirmPaymentValidationSchema = z5.object({
  body: z5.object({
    participationId: z5.string().min(1, "Participation id is required"),
    transactionId: z5.string().min(1, "Transaction id is required")
  })
});
var PaymentValidations = {
  createPaymentIntentValidationSchema,
  confirmPaymentValidationSchema
};

// src/modules/Payment/payment.controller.ts
import httpStatus14 from "http-status";

// src/modules/Payment/payment.service.ts
import Stripe from "stripe";
import httpStatus13 from "http-status";
var stripe = new Stripe(config_default.stripe_secret_key, {
  apiVersion: "2023-10-16"
});
var createPaymentIntent = async (payload) => {
  const { participationId } = payload;
  const participation = await prisma.participation.findUnique({
    where: { id: participationId },
    include: {
      event: true,
      payment: true,
      user: true
    }
  });
  if (!participation) {
    throw new AppError_default(httpStatus13.NOT_FOUND, "Participation not found");
  }
  if (participation.event.feeType !== "PAID") {
    throw new AppError_default(
      httpStatus13.BAD_REQUEST,
      "This event does not require payment"
    );
  }
  if (!participation.event.fee || participation.event.fee <= 0) {
    throw new AppError_default(
      httpStatus13.BAD_REQUEST,
      "Invalid event fee"
    );
  }
  if (participation.payment && participation.payment.status === "success") {
    throw new AppError_default(
      httpStatus13.BAD_REQUEST,
      "This participation is already paid"
    );
  }
  const amount = participation.event.fee;
  const amountInCents = Math.round(amount * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    metadata: {
      participationId: participation.id,
      userId: participation.userId,
      eventId: participation.eventId
    },
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "always"
    }
  });
  return {
    clientSecret: paymentIntent.client_secret,
    amount,
    transactionId: paymentIntent.id
  };
};
var savePaymentRecord = async (payload) => {
  const result = await prisma.$transaction(async (tx) => {
    const existingPayment = await tx.payment.findUnique({
      where: {
        participationId: payload.participationId
      }
    });
    if (existingPayment) {
      return await tx.payment.update({
        where: {
          participationId: payload.participationId
        },
        data: {
          transactionId: payload.transactionId,
          amount: payload.amount,
          status: payload.status
        }
      });
    }
    const payment = await tx.payment.create({
      data: {
        participationId: payload.participationId,
        transactionId: payload.transactionId,
        amount: payload.amount,
        status: payload.status
      }
    });
    return payment;
  });
  return result;
};
var confirmPayment = async (participationId, transactionId) => {
  const participation = await prisma.participation.findUnique({
    where: { id: participationId },
    include: {
      event: true,
      payment: true
    }
  });
  if (!participation) {
    throw new AppError_default(httpStatus13.NOT_FOUND, "Participation not found");
  }
  let paymentIntent = await stripe.paymentIntents.retrieve(transactionId);
  if (paymentIntent.status === "requires_payment_method") {
    paymentIntent = await stripe.paymentIntents.confirm(transactionId, {
      payment_method: "pm_card_visa"
    });
  }
  if (paymentIntent.status === "succeeded") {
    const amount = paymentIntent.amount / 100;
    const existingPayment = await prisma.payment.findFirst({
      where: { transactionId }
    });
    if (existingPayment) {
      return existingPayment;
    }
    return await savePaymentRecord({
      participationId,
      transactionId,
      amount,
      status: "success",
      gatewayData: paymentIntent
    });
  } else {
    await savePaymentRecord({
      participationId,
      transactionId,
      amount: participation.event.fee || 0,
      status: "failed",
      gatewayData: paymentIntent
    });
    throw new AppError_default(
      httpStatus13.BAD_REQUEST,
      `Payment status is ${paymentIntent.status}`
    );
  }
};
var PaymentService = {
  createPaymentIntent,
  confirmPayment
};

// src/modules/Payment/payment.controller.ts
var createPaymentIntent2 = catchAsync_default(async (req, res) => {
  const result = await PaymentService.createPaymentIntent(req.body);
  sendResponse_default(res, {
    statusCode: httpStatus14.CREATED,
    success: true,
    message: "Payment intent created successfully",
    data: result
  });
});
var confirmPayment2 = catchAsync_default(async (req, res) => {
  const { participationId, transactionId } = req.body;
  const result = await PaymentService.confirmPayment(
    participationId,
    transactionId
  );
  sendResponse_default(res, {
    statusCode: httpStatus14.OK,
    success: true,
    message: "Payment confirmed successfully",
    data: result
  });
});
var PaymentController = {
  createPaymentIntent: createPaymentIntent2,
  confirmPayment: confirmPayment2
};

// src/modules/Payment/payment.route.ts
var router6 = express6.Router();
router6.post(
  "/create-payment-intent",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(PaymentValidations.createPaymentIntentValidationSchema),
  PaymentController.createPaymentIntent
);
router6.post(
  "/confirm",
  auth_default(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(PaymentValidations.confirmPaymentValidationSchema),
  PaymentController.confirmPayment
);
var PaymentRoutes = router6;

// src/routes/index.ts
var router7 = Router();
var moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes
  },
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/events",
    route: EventRoutes
  },
  {
    path: "/participations",
    route: ParticipationRoutes
  },
  {
    path: "/reviews",
    route: ReviewRoutes
  },
  {
    path: "/payments",
    route: PaymentRoutes
  }
];
moduleRoutes.forEach((route) => router7.use(route.path, route.route));
var routes_default = router7;

// src/app.ts
var app = express7();
app.use(express7.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);
app.use(cookieParser());
app.use("/api/v1", routes_default);
app.get("/", (req, res) => {
  res.send("Hello from Apollo Gears World!");
});
app.use(notfound_default);
app.use(globalErrorhandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
