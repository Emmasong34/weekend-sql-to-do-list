CREATE TABLE "taskList"(
"id" serial primary key,
"task" varchar(80),
"completed" boolean default false
);
