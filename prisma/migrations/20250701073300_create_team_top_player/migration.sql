-- CreateTable
CREATE TABLE "TeamTopPlayer" (
    "id" SERIAL NOT NULL,
    "team" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "game" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TeamTopPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamTopPlayer_team_name_type_key" ON "TeamTopPlayer"("team", "name", "type");
