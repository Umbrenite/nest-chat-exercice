TRUNCATE "discussion", "user", "group" RESTART IDENTITY CASCADE;


INSERT INTO "group" ("id", "title", "description", "icon_url") VALUES 
  (1, 'Développeurs Backend', 'Espace dédié aux discussions sur l’architecture, les APIs et la base de données.', 'https://images.pexels.com/photos/1181255/pexels-photo-1181255.jpeg'), 
  (2, 'Design & UX', 'Les membres de l’équipe design partagent ici les maquettes, palettes de couleurs et retours utilisateurs.', 'https://images.pexels.com/photos/1630713/pexels-photo-1630713.jpeg'), 
  (3, 'Marketing Digital', 'Brainstormings, campagnes de communication et suivi des performances publicitaires.', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'), 
  (4, 'Support Client', 'Canal d’échange pour gérer les retours clients, tickets de support et FAQ.', 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg'), 
  (5, 'QA & Tests', 'Discussions sur les plans de test, les bugs et la validation des livrables.', 'https://images.pexels.com/photos/3861955/pexels-photo-3861955.jpeg'), 
  (6, 'Admins & Sécurité', 'Espace privé pour les administrateurs du système et les responsables sécurité.', 'https://images.pexels.com/photos/5380644/pexels-photo-5380644.jpeg');
