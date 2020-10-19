CREATE TABLE "taskList"(
"id" serial primary key,
"task" varchar(80),
"completed" boolean default false
);
INSERT INTO "taskList" ("task")
VALUES ('pet the cat');

INSERT INTO "taskList" ("task")
VALUES ('make apple crisp');

INSERT INTO "taskList" ("task")
VALUES ('buy cat snacks');

SELECT * FROM "taskList"