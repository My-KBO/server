/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_away_team_id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_home_team_id_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_related_team_id_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_team_id_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "News";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "Team";

-- CreateTable
CREATE TABLE "team_rank" (
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

    CONSTRAINT "team_rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_stat" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "player_stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_schedule" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "homeScore" TEXT,
    "awayTeam" TEXT NOT NULL,
    "awayScore" TEXT,
    "tv" TEXT NOT NULL,
    "stadium" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "game_schedule_pkey" PRIMARY KEY ("id")
);
