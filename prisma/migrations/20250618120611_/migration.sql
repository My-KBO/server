-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('GENERAL', 'FREE', 'LG', 'KIA', 'SSG', 'NC', 'DOOSAN', 'LOTTE', 'SAMSUNG', 'HANHWA', 'KT', 'KIWOOM');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "PostCategory" NOT NULL DEFAULT 'GENERAL';
