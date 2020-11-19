# Migration `20201119210827-remove`

This migration has been generated by dannying at 11/20/2020, 12:08:27 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_productId_fkey"

ALTER TABLE "Sale" DROP COLUMN "productId",
ADD COLUMN     "name" TEXT NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201119200017-add..20201119210827-remove
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
@@ -32,9 +32,8 @@
   count   Float  @default(1)
   store   Store  @relation(fields: [storeId], references: [id])
   storeId Int
   price   Int
-  sale    Sale[]
 }
 model IncomingGood {
   id        Int      @id @default(autoincrement())
@@ -47,13 +46,12 @@
 }
 model Sale {
   id        Int      @id @default(autoincrement())
-  product   Product  @relation(fields: [productId], references: [id])
-  productId Int
   store     Store    @relation(fields: [storeId], references: [id])
   storeId   Int
   count     Int
+  name      String
   summary   Int
   discount  Int      @default(0)
   note      String?
   payType   PayType  @default(CASH)
```

