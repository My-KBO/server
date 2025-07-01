/*
  Warnings:

  - You are about to drop the column `game` on the `Schedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,time,stadium]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Schedule_date_time_game_key";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "game";

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_date_time_stadium_key" ON "Schedule"("date", "time", "stadium");
