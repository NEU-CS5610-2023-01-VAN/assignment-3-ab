import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

// const requireAuth = auth({
//   audience: process.env.AUTH0_AUDIENCE,
//   issuerBaseURL: process.env.AUTH0_ISSUER,
//   tokenSigningAlg: 'RS256'
// });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// GET: extra endpoint added to a service for the sole purpose of expressing its availability
app.get("/ping", (req, res) => {
  res.send("pong");
});

// GET user-specific questions
app.get("/questions", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  const questions = await prisma.question.findMany({
    where: {
      authorId: user.id,
    },
  });

  res.json(questions);
});

// GET list of all questions
app.get("/questions", async (req, res) => {
  const reviews = await prisma.question.findMany();
  res.status(200).json(reviews);
});

// GET list of all questions under a tag
app.get("/questions/tag/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(401).send("Tag is required");
  }

  const tagID = Number(req.params.id);
  const tag = await prisma.tag.findUnique({
    where: {
      id: tagID,
    },
  });

  if (tag) {
    const taggedQuestions = await prisma.question.findMany({
      where: {
        tagID: tagID,
      },
    });

    res.status(200).json(taggedQuestions);
  } else {
    res.status(404).json(`Tag id ${req.params.id} does not exist`);
  }
});

// GET user-specific answers
app.get("/answers", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  const answers = await prisma.answer.findMany({
    where: {
      authorId: user.id,
    },
  });

  res.json(answers);
});

// POST - creates a question
app.post("/question", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const { title, body, tagID } = req.body;

  if (!title || !body || !tagID) {
    res.status(400).send("Title, body and tagID are required");
  } else {
    const newQuestion = await prisma.question.create({
      data: {
        title,
        author: { connect: { auth0Id } },
        tag: { connect: { id: parseInt(tagID) } },
      },
    });

    res.status(201).json(newQuestion);
  }
});

// POST - creates an answer
app.post("/answer", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const { content, questionID } = req.body;

  if (!content || !questionID) {
    res.status(400).send("Content and questionID are required");
  } else {
    const newAnswer = await prisma.answer.create({
      data: {
        content,
        author: { connect: { auth0Id } },
        question: { connect: { id: parseInt(questionID) } },
      },
    });

    res.status(201).json(newAnswer);
  }
});

// GET - a question by id
app.delete("/question/:id", async (req, res) => {
  const id = req.params.id;
  const deletedItem = await prisma.todoItem.delete({
    where: {
      id,
    },
  });
  res.json(deletedItem);
});

// // get a todo item by id
// app.get("/todos/:id", requireAuth, async (req, res) => {
//   const id = req.params.id;
//   const todoItem = await prisma.todoItem.findUnique({
//     where: {
//       id,
//     },
//   });
//   res.json(todoItem);
// });

// // updates a todo item by id
// app.put("/todos/:id", requireAuth, async (req, res) => {
//   const id = req.params.id;
//   const { title } = req.body;
//   const updatedItem = await prisma.todoItem.update({
//     where: {
//       id,
//     },
//     data: {
//       title,
//     },
//   });
//   res.json(updatedItem);
// });

// // get Profile information of authenticated user
// app.get("/me", requireAuth, async (req, res) => {
//   const auth0Id = req.auth.payload.sub;

//   const user = await prisma.user.findUnique({
//     where: {
//       auth0Id,
//     },
//   });

//   res.json(user);
// });

// // verify user status, if not registered in our database we will create it
// app.post("/verify-user", requireAuth, async (req, res) => {
//   const auth0Id = req.auth.payload.sub;
//   const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
//   const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

//   const user = await prisma.user.findUnique({
//     where: {
//       auth0Id,
//     },
//   });

//   if (user) {
//     res.json(user);
//   } else {
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         auth0Id,
//         name,
//       },
//     });

//     res.json(newUser);
//   }
// });

// // POST: create a new review
// app.post("/reviews", async (req, res) => {
//   if (!req.body.bookName || !req.body.reviewTitle || !req.body.reviewText) {
//     res.status(401).send("Incorrect input values");
//   }

//   const { bookName, reviewTitle, reviewText } = req.body;
//   const reviewItem = await prisma.reviewItem.create({
//     data: {
//       bookName,
//       reviewTitle,
//       reviewText,
//     },
//   });

//   // const newReview = createReview(
//   //     req.body.bookName,
//   //     req.body.reviewTitle,
//   //     req.body.reviewText
//   // );

//   res.status(201).json(reviewItem);
// });

// // GET: list of all reviews
// app.get("/reviews", async (req, res) => {
//   const reviews = await prisma.reviewItem.findMany();
//   res.status(200).json(reviews);
// });

// // GET: get review by id
// app.get("/reviews/:id", async (req, res) => {
//   if (!req.params.id) {
//     res.status(401).send("Review ID does not exist");
//   }
//   const reviewID = Number(req.params.id);
//   const review = await prisma.reviewItem.findUnique({
//     where: {
//       id: reviewID,
//     },
//   });

//   if (review) {
//     res.status(200).json(review);
//   } else {
//     res.status(404).json(`Review id ${req.params.id} does not exist`);
//   }
// });

// // PUT: update an existing review
// app.put("/reviews/:id", async (req, res) => {
//   if (!req.params.id || !req.body.reviewTitle || !req.body.reviewText) {
//     res.status(401).send("Incorrect input values");
//   }

//   const reviewID = Number(req.params.id);
//   const { reviewTitle, reviewText } = req.body;
//   try {
//     const updatedReviewItem = await prisma.reviewItem.update({
//       where: {
//         id: reviewID,
//       },
//       data: {
//         reviewTitle: `UPDATE: ${reviewTitle}`,
//         reviewText: reviewText,
//       },
//     });
//   } catch (e) {
//     return res.status(404).send();
//   }

//   res.status(200).send();
// });

// // DELETE: delete an existing review
// app.delete("/reviews/:id", async (req, res) => {
//   if (!req.params.id) {
//     res.status(401).send("Incorrect input values");
//   }

//   const reviewID = Number(req.params.id);
//   try {
//     const deletedReview = await prisma.reviewItem.delete({
//       where: {
//         id: reviewID,
//       },
//     });
//   } catch (e) {
//     return res.status(404).send();
//   }

//   res.status(200).send();
// });

// Starts HTTP Server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
