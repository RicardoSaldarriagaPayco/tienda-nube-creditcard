-- CreateTable
CREATE TABLE "sessions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token_type" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tiendanube_tdc_credentials" (
    "user_id" INTEGER NOT NULL,
    "pCustId" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "pKey" TEXT NOT NULL,
    CONSTRAINT "tiendanube_tdc_credentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "sessions" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_id_key" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tiendanube_tdc_credentials_user_id_key" ON "tiendanube_tdc_credentials"("user_id");
