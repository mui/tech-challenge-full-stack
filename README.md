# Full-stack technical challenge @ MUI

This challenge is part of the hiring process at MUI for the React Engineer position. The idea is to make as much progress as possible under a given time constraint (3-4 hours).

## Context

MUI is looking for fullstack engineers to join the Toolpad team. We search people who are proficient in both modern react development and backend technologies. Throughout this challenge you are required to build a simple forum application.

You are handed a Postgresql database containing some data and a starter Next.js application. You'll have to interface with this database and visualize it in a React UI.

## Starting point

- docker-compose to start the db.
- empty next.js application with Material UI starter.
- database schema + seed with init data.

```sql
create table thread (
  id SERIAL primary key
  created_at timestamp not null default now()
  title text not null
)

create table post (
  id SERIAL primary key
  thread_id int references thread(id) not null
  created_at timestamp not null default now()
  title text not null
  body text not null
  starred boolean not null default false
)
```

This database contains the schema for a simple forum-like application. Your task is to build an UI on top of this data that allows viewing the threads and add new posts. an example mockup of a potential UI will also be provided:

```
+--------------------------------------------------+
| thread 1 | thread 2                              |
| thread 2 +---------------------------------------+
| thread 3 | Post title 1               created_at |
| thread 4 |                                       |
| thread 5 | Post body 1                           |
| thread 6 |---------------------------------------|
|    .     | Post title 1               created_at |
|    .     |                                       |
|    .     | Post body 1                           |
|          |---------------------------------------|
|          | textbox                               |
|          |                                       |
|          |---------------------------------------|
|          |                               [ send ]|
+--------------------------------------------------+
```

### Run instructions

Start the database with

```sh
docker-compose up -d
```

Run the application with

```
yarn
yarn dev
```

The UI is accessible at http://localhost:3000

### Requirements

- You are allowed to use any library you want, but you must use the provided postgres database and Next.js application. ORMs are allowed.
- List of threads: Threads must be displayed in a list, sorted by the thread with most the recently created post first.
- Selecting a thread: CLicking a thread should reveal its posts sorted by least recent first
- At the bottom of the list of posts there's a form that allows you to enter a subject and a body and hit "post" to add a new post to this thread.

### Nice to haves:

Don't tackle these unless you have time left

- Keyboard accessibility
- Pagination
- Form validation
- Allow the user to create new threads
- The database comes without indices. Propose a set of indices to optimize the usage of this db.

### Out of scope

- To keep the scope of the assignment small, we'll keep the system is user-agnostic. No authentication is required, assume you are the only user of this application.

### Evaluation

- First of all, try to respect the time limit
