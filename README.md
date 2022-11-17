# Full-stack technical challenge @ MUI

This challenge is part of the hiring process at MUI for some of the Software Engineer positions.
The idea is to make as much progress as possible under a given time constraint (3-4 hours).

## Why are we doing this?

MUI is looking for Full-stack engineers to join the team.
We search people who are proficient in both modern React development and backend technologies.
Throughout this challenge, you are required to build a basic forum application.

## Context about MUI

The short-term objective of MUI is to become the UI toolkit for React.
We are unifying the fragmented ecosystem of dependencies into a single set of simple, beautiful, consistent, and accessible React components.

The long-term objective of MUI is to make building great React UIs and web applications quicker, simpler, and accessible to more people through a low-code platform.
It's about writing less code, e.g. https://youtu.be/GnO7D5UaDig?t=2451.

Head to [our Handbook](https://mui-org.notion.site/Why-MUI-d8b8c142a6a44e3aa963f26edf4e03db) to learn more.

## Summary

You are handed a PostgreSQL database containing some data and a starter Next.js application.
You'll have to interface with this database and visualize it in a React UI.

## Database

The database contains the following schema and is seeded with some dummy data.

```sql
CREATE TABLE thread (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT Now(),
  title TEXT NOT NULL
);

CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  thread_id INT REFERENCES thread (id) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT Now(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  starred BOOLEAN NOT NULL DEFAULT false
);
```

This is a simple forum-like application with separate threads, each thread containing a set of posts.
Your task is to build an UI on top of this data that allows viewing the threads and adding new posts.

A mockup of a potential UI:

```
+--------------------------------------------------+
| thread 1 | title: thread 2                       |
| thread 2 +---------------------------------------+
| thread 3 | Post title 1               created_at |
| thread 4 |                                       |
| thread 5 | Post body 1                           |
| thread 6 |---------------------------------------|
|    .     | Post title 1               created_at |
|    .     |                                       |
|    .     | Post body 1                           |
|          |---------------------------------------|
|          | textfield                             |
|          |                                       |
|          |---------------------------------------|
|          |                               [ send ]|
+--------------------------------------------------+
```

### Run instructions

Start the database with:

```sh
docker-compose up
```

Run the application with:

```sh
yarn
yarn dev
```

The UI is accessible at http://localhost:3002
If everything is set up well you should see the message "Database connection: succeeded"

### Requirements

- You are allowed to use any library or ORM you want, but you must use the provided PostgreSQL database and Next.js application.
- List of threads: Threads must be displayed in a list, **sorted by the thread with the most recently created post first**.
- Selecting a thread: Clicking a thread should reveal its posts sorted by least recent first
- There's a form that allows you to enter a subject and a body and a button to add a new post to the thread.

### Out of scope

- To keep the scope of the assignment small, we'll keep the system user-agnostic. No authentication is required, assume you are the only user of this application.
- No need to write documentation, unless there's extra steps involved in starting the application.

### Nice to haves:

Don't tackle these unless you have time left

- Keyboard accessibility
- Pagination
- Form validation
- Allow for creating new threads
- The database comes without indices. Propose a set of indices to optimize the usage of this db.

### Evaluation

- First of all, try to respect the time limit, it's part of the grading
- Quality over quantity: better half of the features 100% done than all of the features 50% done.

## Submission

**DO NOT** host your project on a public repository.
Please send us a zip file containing this project using the upload link that we have provided by email (**with** the _.git_ folder).
To significantly reduce the size of the archive, you can remove the `/_node_modules_/` folders.
If you don't have the upload link, you can simply send it to job@mui.com.
Thanks!
