# Migration `20201119211736-add-default-value`

This migration has been generated by dannying at 11/20/2020, 12:17:36 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_productId_fkey"

ALTER TABLE "Sale" DROP COLUMN "productId",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT E''
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201119210827-remove..20201119211736-add-default-value
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
@@ -49,9 +49,9 @@
   id        Int      @id @default(autoincrement())
   store     Store    @relation(fields: [storeId], references: [id])
   storeId   Int
   count     Int
-  name      String
+  name      String   @default("")
   summary   Int
   discount  Int      @default(0)
   note      String?
   payType   PayType  @default(CASH)
```


