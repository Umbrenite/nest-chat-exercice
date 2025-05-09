DROP TABLE IF EXISTS "discussions" CASCADE;
DROP TABLE IF EXISTS "groups" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "custom_profil_color" VARCHAR(7),
    "group_ids" TEXT[]
);

CREATE TABLE "discussions" (
    "id" SERIAL PRIMARY KEY,
    "message" VARCHAR(255)
);

CREATE TABLE "groups" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255),
    "description" TEXT[],
    "user_ids" TEXT[],
    "discussion_id" INTEGER REFERENCES "discussions"("id") ON DELETE SET NULL,
    "icon_url" VARCHAR(255)
);

ALTER TABLE "discussions" ADD COLUMN "group_id" INTEGER REFERENCES "groups"("id") ON DELETE CASCADE;

CREATE INDEX idx_users_group_ids ON "users" USING gin("group_ids");
CREATE INDEX idx_groups_user_ids ON "groups" USING gin("user_ids");

INSERT INTO "users" ("firstname", "lastname", "username", "password", "email", "custom_profil_color", "group_ids") 
VALUES
    ('John', 'Doe', 'john_doe', 'hashed_password_1', 'john.doe@example.com', '#FF5733', ARRAY['1']),
    ('Jane', 'Smith', 'jane_smith', 'hashed_password_2', 'jane.smith@example.com', '#33FF57', ARRAY['1', '2']),
    ('Alice', 'Johnson', 'alice_johnson', 'hashed_password_3', 'alice.johnson@example.com', '#5733FF', ARRAY['2']);

INSERT INTO "discussions" ("id", "message") 
VALUES
    (1, 'Welcome to Group A'),
    (2, 'Welcome to Group B');

INSERT INTO "groups" ("title", "description", "user_ids", "discussion_id", "icon_url") 
VALUES
    ('Group A', ARRAY['Groupe des développeurs et testeurs', 'Un groupe pour discuter des fonctionnalités techniques'], ARRAY['1', '2'], 1, 'https://images.pexels.com/photos/1181255/pexels-photo-1181255.jpeg'),
    ('Group B', ARRAY['Groupe des designers et créateurs', 'Les designers du projet collaborent ici'], ARRAY['2', '3'], 2, 'https://images.pexels.com/photos/1630713/pexels-photo-1630713.jpeg');
