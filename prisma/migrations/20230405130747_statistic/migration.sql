-- CreateTable
CREATE TABLE "Statistic" (
    "id" TEXT NOT NULL,
    "wpm" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Statistic" ADD CONSTRAINT "Statistic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
