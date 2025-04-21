-- CreateTable
CREATE TABLE "Internship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "pay" INTEGER NOT NULL,
    "major" TEXT NOT NULL,
    "gpa" REAL NOT NULL,
    "experience" TEXT NOT NULL
);
