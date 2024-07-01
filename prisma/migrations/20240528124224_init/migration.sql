-- CreateTable
CREATE TABLE `post` (
    `postId` VARCHAR(10) NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `thumbnail` VARCHAR(300) NOT NULL,
    `writerId` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `category` VARCHAR(300) NOT NULL,
    `estimate` INTEGER NOT NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('ADMIN', 'WRITER') NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
