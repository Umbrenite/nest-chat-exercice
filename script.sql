SET session_replication_role = replica;

TRUNCATE "discussion", "user", "group" RESTART IDENTITY CASCADE;

SET session_replication_role = origin;

ALTER TABLE "user" ALTER COLUMN "group_ids" TYPE text[] USING group_ids::text[];
ALTER TABLE "group" ALTER COLUMN "user_ids" TYPE text[] USING user_ids::text[];

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'discussion' AND column_name = 'group_id'
  ) THEN
    ALTER TABLE "discussion"
    ADD COLUMN "group_id" INTEGER REFERENCES "group"("id") ON DELETE CASCADE;
  END IF;
END$$;

INSERT INTO "user" ("id", "firstname", "lastname", "username", "password", "email", "custom_profil_color", "group_ids") 
VALUES
    (1, 'John', 'Doe', 'john_doe', 'hashed_password_1', 'john.doe@example.com', '#FF5733', ARRAY['1']),
    (2, 'Jane', 'Smith', 'jane_smith', 'hashed_password_2', 'jane.smith@example.com', '#33FF57', ARRAY['1', '2']),
    (3, 'Alice', 'Johnson', 'alice_johnson', 'hashed_password_3', 'alice.johnson@example.com', '#5733FF', ARRAY['2']);

INSERT INTO "group" ("id", "title", "description", "user_ids", "icon_url", "discussion_id") 
VALUES
    (1, 'Group A', ARRAY['Groupe des développeurs et testeurs', 'Un groupe pour discuter des fonctionnalités techniques'], ARRAY['1', '2'], 'https://images.pexels.com/photos/1181255/pexels-photo-1181255.jpeg', 1),
    (2, 'Group B', ARRAY['Groupe des designers et créateurs', 'Les designers du projet collaborent ici'], ARRAY['2', '3'], 'https://images.pexels.com/photos/1630713/pexels-photo-1630713.jpeg', 2);

INSERT INTO "discussion" ("id", "message", "group_id", "user_id", "timestamp") 
VALUES
    (1, 'Salut ! Tu as pu avancer sur la partie frontend ?', 1, '1', '2025-05-13 09:00:00'),
    (2, 'Oui, j’ai bossé sur la maquette hier soir.', 1, '2', '2025-05-13 09:01:10'),
    (3, 'Parfait ! Tu peux me montrer un aperçu ?', 1, '1', '2025-05-13 09:01:55'),
    (4, 'Je te l’envoie sur le drive dans 5 min.', 1, '2', '2025-05-13 09:03:00'),
    (5, 'Nickel, je check ça dès que possible.', 1, '1', '2025-05-13 09:03:40'),
    (6, 'Tu penses pouvoir terminer la page d’accueil d’ici demain ?', 1, '1', '2025-05-13 09:04:30'),
    (7, 'Oui, c’est jouable. Je te redis ce soir au pire.', 1, '2', '2025-05-13 09:05:15'),
    (8, 'Hey, on doit valider le design du dashboard aujourd’hui.', 2, '2', '2025-05-13 10:00:00'),
    (9, 'Exact, je pensais partir sur une version sombre par défaut.', 2, '3', '2025-05-13 10:01:30'),
    (10, 'Bonne idée, c’est tendance en ce moment.', 2, '2', '2025-05-13 10:02:45'),
    (11, 'Tu peux me partager les composants que tu as déjà faits ?', 2, '2', '2025-05-13 10:03:20'),
    (12, 'Je les mets dans le repo Git d’ici 15 minutes.', 2, '3', '2025-05-13 10:04:10'),
    (13, 'Super, je vais les intégrer dans la maquette dès réception.', 2, '2', '2025-05-13 10:05:00'),
    (14, 'Pense à valider avec le client aussi.', 2, '3', '2025-05-13 10:05:45');

UPDATE "group" SET discussion_id = 1 WHERE id = 1;
UPDATE "group" SET discussion_id = 2 WHERE id = 2;
