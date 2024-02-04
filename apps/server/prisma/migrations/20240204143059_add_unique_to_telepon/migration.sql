/*
  Warnings:

  - A unique constraint covering the columns `[telepon]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_telepon_key` ON `User`(`telepon`);
