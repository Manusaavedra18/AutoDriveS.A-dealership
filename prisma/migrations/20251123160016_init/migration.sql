-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `anio` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `tipo_combustible` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `disponibilidad` VARCHAR(191) NOT NULL,
    `kilometraje` INTEGER NOT NULL,
    `transmision` VARCHAR(191) NOT NULL,
    `tipo_carroceria` VARCHAR(191) NOT NULL,
    `motor` VARCHAR(191) NOT NULL,
    `patente` VARCHAR(191) NOT NULL,
    `tren_motriz` VARCHAR(191) NOT NULL,
    `eficiencia_combustible` DOUBLE NOT NULL,
    `color_interior` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
