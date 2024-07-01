/*
  Warnings:

  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY,
    MODIFY `postId` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`postId`);
