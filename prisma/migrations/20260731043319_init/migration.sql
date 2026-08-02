-- CreateTable
CREATE TABLE `comics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(100) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `alternativeTitle` VARCHAR(255) NULL,
    `author` VARCHAR(255) NOT NULL,
    `artist` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `cover` VARCHAR(500) NOT NULL,
    `banner` VARCHAR(500) NULL,
    `status` VARCHAR(50) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `followers` INTEGER NOT NULL DEFAULT 0,
    `rating` DECIMAL(2, 1) NOT NULL DEFAULT 0,
    `publishedYear` INTEGER NOT NULL,

    UNIQUE INDEX `comics_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chapters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comicId` INTEGER NOT NULL,
    `chapterNumber` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `chapters_comicId_chapterNumber_key`(`comicId`, `chapterNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chapter_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapterId` INTEGER NOT NULL,
    `imageUrl` VARCHAR(500) NOT NULL,
    `pageNumber` INTEGER NOT NULL,

    UNIQUE INDEX `chapter_images_chapterId_pageNumber_key`(`chapterId`, `pageNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chapters` ADD CONSTRAINT `chapters_comicId_fkey` FOREIGN KEY (`comicId`) REFERENCES `comics`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chapter_images` ADD CONSTRAINT `chapter_images_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `chapters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
