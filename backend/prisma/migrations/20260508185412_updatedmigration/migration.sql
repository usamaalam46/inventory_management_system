/*
  Warnings:

  - You are about to alter the column `quantity` on the `StockTransaction` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `new_stock` on the `StockTransaction` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `previous_stock` on the `StockTransaction` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "StockTransaction" ADD COLUMN     "reference_id" TEXT,
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "new_stock" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "previous_stock" SET DATA TYPE DECIMAL(10,2);
