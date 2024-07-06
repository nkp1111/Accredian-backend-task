-- CreateTable
CREATE TABLE "Refer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "referrer" VARCHAR(255) NOT NULL,
    "referee" VARCHAR(255) NOT NULL,
    "program" VARCHAR(255) NOT NULL,

    CONSTRAINT "Refer_pkey" PRIMARY KEY ("id")
);
