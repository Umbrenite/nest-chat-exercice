DROP TABLE IF EXISTS "discussions" CASCADE;
DROP TABLE IF EXISTS "discussion" CASCADE;
DROP TABLE IF EXISTS "groups" CASCADE;
DROP TABLE IF EXISTS "group" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "custom_profil_color" VARCHAR(7),
    "group_ids" TEXT[]
);

CREATE TABLE "discussion" (
    "id" SERIAL PRIMARY KEY,
    "message" VARCHAR(255),
    "user_id" INTEGER REFERENCES "user"("id") ON DELETE SET NULL
);

CREATE TABLE "group" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255),
    "description" TEXT[],
    "user_ids" TEXT[],
    "discussion_id" INTEGER REFERENCES "discussion"("id") ON DELETE SET NULL,
    "icon_url" VARCHAR(255)
);

ALTER TABLE "discussion" ADD COLUMN "group_id" INTEGER REFERENCES "group"("id") ON DELETE CASCADE;

CREATE INDEX idx_user_group_ids ON "user" USING gin("group_ids");
CREATE INDEX idx_group_user_ids ON "group" USING gin("user_ids");

INSERT INTO "user" ("id", "firstname", "lastname", "username", "password", "email", "custom_profil_color", "group_ids") 
VALUES
    (1, 'John', 'Doe', 'john_doe', 'hashed_password_1', 'john.doe@example.com', '#FF5733', ARRAY['1']),
    (2, 'Jane', 'Smith', 'jane_smith', 'hashed_password_2', 'jane.smith@example.com', '#33FF57', ARRAY['1', '2']),
    (3, 'Alice', 'Johnson', 'alice_johnson', 'hashed_password_3', 'alice.johnson@example.com', '#5733FF', ARRAY['2']);

INSERT INTO "group" ("id", "title", "description", "user_ids", "icon_url") 
VALUES
    (1, 'Group A', ARRAY['Groupe des développeurs et testeurs', 'Un groupe pour discuter des fonctionnalités techniques'], ARRAY['1', '2'], 'https://images.pexels.com/photos/1181255/pexels-photo-1181255.jpeg'),
    (2, 'Group B', ARRAY['Groupe des designers et créateurs', 'Les designers du projet collaborent ici'], ARRAY['2', '3'], 'https://images.pexels.com/photos/1630713/pexels-photo-1630713.jpeg');

INSERT INTO "discussion" ("id", "message", "group_id", "user_id") 
VALUES
    (1, 'Welcome to Group A', '1', '1'),
    (2, 'Welcome to Group B', '2', '2');

UPDATE "group" SET discussion_id = 1 WHERE id = 1;
UPDATE "group" SET discussion_id = 2 WHERE id = 2;
