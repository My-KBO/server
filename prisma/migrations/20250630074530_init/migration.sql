/*
  Warnings:

  - You are about to drop the `game_schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player_stat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team_rank` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "game_schedule";

-- DropTable
DROP TABLE "player_stat";

-- DropTable
DROP TABLE "team_rank";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "homeScore" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "awayScore" TEXT NOT NULL,
    "tv" TEXT NOT NULL,
    "stadium" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamRank" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "team" TEXT NOT NULL,
    "games" INTEGER NOT NULL,
    "win" INTEGER NOT NULL,
    "lose" INTEGER NOT NULL,
    "draw" INTEGER NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    "gameGap" TEXT NOT NULL,
    "streak" TEXT NOT NULL,

    CONSTRAINT "TeamRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStat" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "PlayerStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_date_time_game_key" ON "Schedule"("date", "time", "game");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRank_team_key" ON "TeamRank"("team");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStat_category_name_team_key" ON "PlayerStat"("category", "name", "team");
