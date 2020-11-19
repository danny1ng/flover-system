# Migration `20201114161523-add-price`

This migration has been generated by dannying at 11/14/2020, 7:15:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "IncomingGood" ADD COLUMN     "price" INTEGER NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201114160400-incoming-goods..20201114161523-add-price
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Store {
   id           Int            @id @default(autoincrement())
@@ -42,8 +42,9 @@
   count     Float    @default(1)
   store     Store    @relation(fields: [storeId], references: [id])
   storeId   Int
   createdAt DateTime
+  price     Int
 }
 model Sale {
   id        Int      @id @default(autoincrement())
```

