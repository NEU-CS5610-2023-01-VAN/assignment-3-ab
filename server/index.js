import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import { Configuration, OpenAIApi } from "openai";

const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// OpenAI API  setup
const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(config);

// GET: extra endpoint added to a service for the sole purpose of expressing its availability
app.get("/ping", (req, res) => {
  res.send("pong");
});

// OPEN AI API
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: prompt,
  });

  res.send(completion.data.choices[0].text);
});

// *** POST *** //
// verify user status, if not registered in our database we will create it
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
      },
    });

    res.json(newUser);
  }
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
        body,
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
      include: { author: true },
    });

    res.status(201).json(newAnswer);
  }
});

// GET Profile information of authenticated user
app.get("/profile", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
    // include: { questions: { include: { answers } } },
  });

  res.json(user);
});

// GET User information
app.get("/users/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(401).send("Incorrect input values");
  }

  console.log(req.params.id);

  const userID = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    // include: { questions: { include: { answers } } },
  });

  res.json(user);
});

// // get logged in user posts/questions of authenticated user
// app.get("/me", requireAuth, async (req, res) => {
//   const auth0Id = req.auth.payload.sub;

//   const user = await prisma.user.findUnique({
//     where: {
//       auth0Id,
//     },
//   });

//   res.json(user);
// });

// GET list of all questions
app.get("/questions", async (req, res) => {
  const questions = await prisma.question.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true, tag: true, answers: true },
  });
  res.status(200).json(questions);
});

// GET - a question by id
app.get("/question/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Question ID is required");
  }
  const question = await prisma.question.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      answers: { include: { author: true } },
      author: true,
      tag: true,
    },
  });

  res.status(201).json(question);
});

// GET - an answer by id
app.get("/answer/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Answer ID is required");
  }
  const answer = await prisma.answer.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { question: true, author: true },
  });

  res.status(201).json(answer);
});

// // GET user-specific questions with AUTH
app.get("/questions/user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
    include: {
      questions: {
        orderBy: { createdAt: "desc" },
        include: { answers: true, tag: true, author: true },
      },
    },
  });

  res.json(user.questions);
});

// GET list of all questions under a tag
app.get("/questions/:tag", async (req, res) => {
  if (!req.params.tag) {
    res.status(401).send("Tag is required");
  }

  const tagItem = await prisma.tag.findUnique({
    where: {
      name: tag,
    },
    include: { questions: true },
  });

  if (tagItem) {
    res.status(200).json(tagItem);
  } else {
    res.status(404).json(`Tag ${req.params.tag} does not exist`);
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

  const userAnsweredQuestions = await prisma.question.findMany({
    distinct: ["authorId"],
    where: {
      answers: {
        every: { userId: user.id },
      },
    },
    include: { tag: true, author: true, answers: true },
  });

  res.json(userAnsweredQuestions);
});

// *** PUT *** //
// PUT: update an existing user with Auth
app.put("/user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const { updatedEmail, updatedName } = req.body;
  if (!updatedEmail || !updatedName) {
    res.status(400).send("Email and Name are required");
  } else {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          auth0Id,
        },
        data: {
          email: updatedEmail,
          name: updatedName,
        },
      });
    } catch (e) {
      return res.status(404).send();
    }
  }

  res.status(200).send();
});

// *** DELETE *** //

// // DELETE: delete an existing user
// app.delete("/users/:id", async (req, res) => {
//   if (!req.params.id) {
//     res.status(401).send("Incorrect input values");
//   }

//   const userID = Number(req.params.id);
//   try {
//     const deletedAnswer = await prisma.user.delete({
//       where: {
//         id: userID,
//       },
//     });
//   } catch (e) {
//     return res.status(404).send();
//   }

//   res.status(200).send();
// });

// DELETE: delete an existing question
app.delete("/questions/:id", requireAuth, async (req, res) => {
  if (!req.params.id) {
    res.status(401).send("Incorrect input values");
  }

  const questionID = Number(req.params.id);
  try {
    const deletedQuestion = await prisma.question.delete({
      where: {
        id: questionID,
      },
    });
  } catch (e) {
    return res.status(404).send();
  }

  res.status(200).send();
});

// DELETE: delete an existing answer
app.delete("/answers/:id", requireAuth, async (req, res) => {
  if (!req.params.id) {
    res.status(401).send("Incorrect input values");
  }

  const answerID = Number(req.params.id);
  try {
    const deletedAnswer = await prisma.answer.delete({
      where: {
        id: answerID,
      },
    });
  } catch (e) {
    return res.status(404).send();
  }

  res.status(200).send();
});

const PORT = parseInt(process.env.PORT) || 8000;

// Starts HTTP Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
});
