ALTER TABLE "Employee" ADD COLUMN "cnic" TEXT DEFAULT '';

-- Step 2: Update the existing rows to ensure the default value is applied
UPDATE "Employee" SET "cnic" = '';

-- Step 3: Alter the column to make it NOT NULL
ALTER TABLE "Employee" ALTER COLUMN "cnic" SET NOT NULL;