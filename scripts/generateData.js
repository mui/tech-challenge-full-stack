#!/usr/bin/env node

const { faker } = require("@faker-js/faker");

const THREAD_COUNT = 100;
const MIN_POSTS_PER_THREAD = 1;
const MAX_POSTS_PER_THREAD = 10;
const START_DATE = new Date("2018-03-5");
const END_DATE = new Date("2022-03-23");

const threads = [];
const posts = [];
let nextPostId = 1;
for (let thread_id = 1; thread_id <= THREAD_COUNT; thread_id++) {
  const created_at = faker.date.between(START_DATE, END_DATE);
  const postsEndDate = faker.date.between(created_at, END_DATE);
  const postCount = faker.datatype.number({
    min: MIN_POSTS_PER_THREAD,
    max: MAX_POSTS_PER_THREAD,
  });
  const threadPosts = [];
  for (let i = 0; i < postCount; i++) {
    const id = nextPostId;
    nextPostId += 1;
    const post = {
      id,
      thread_id,
      created_at: faker.date.between(created_at, postsEndDate),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(
        faker.datatype.number({ min: 1, max: 5 }),
        "\n\n"
      ),
    };
    threadPosts.push(post);
    posts.push(post);
  }
  threads.push({
    id: thread_id,
    created_at,
    title: faker.lorem.sentence(),
    posts: threadPosts,
  });
}

const toSqlDateTime = (date) =>
  date.toISOString().slice(0, 19).replace("T", " ");

const quote = (string) => `'${string}'`;

const threadValues = threads
  .map(
    (thread) =>
      "(" +
      [
        String(thread.id),
        quote(toSqlDateTime(thread.created_at)),
        quote(thread.title),
      ].join(", ") +
      ")"
  )
  .join(",\n");

const postValues = posts
  .map(
    (post) =>
      "(" +
      [
        String(post.id),
        String(post.thread_id),
        quote(toSqlDateTime(post.created_at)),
        quote(post.title),
        quote(post.body),
      ].join(", ") +
      ")"
  )
  .join(",\n");

const threadSql = `INSERT INTO thread(id, created_at, title)\nVALUES\n${threadValues};`;
const postSql = `INSERT INTO post(id, thread_id, created_at, title, body)\nVALUES\n${postValues};`;

console.log(`${threadSql}\n\n${postSql}`);
