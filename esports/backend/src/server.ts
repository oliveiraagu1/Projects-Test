import express, { Request, Response } from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convertHourStringToMinutes";
import { convertMinutesStringToHour } from "./utils/convertMinutesStringToHour";

const app = express();
app.use(express.json());
app.use(cors());


const prisma = new PrismaClient();

app.get("/games", async (req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

app.get("/games/:id/ads", async (req: Request, res: Response) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    where: {
      gameId,
    },
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesStringToHour(ad.hourStart),
        hourEnd:  convertMinutesStringToHour(ad.hourEnd)
      };
    })
  );
});

app.get("/ads/:id/discord", async (req: Request, res: Response) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId,
    },
    select: {
      discord: true,
    },
  });

  return res.json(ad);
});

app.post("/games/:id/ads", async (req: Request, res: Response) => {
  const gameId = req.params.id;

  const { name, weekDays, useVoiceChannel, yearsPlaying, hourStart, hourEnd, discord } =
    req.body;

    

  const ads = await prisma.ad.create({
    data: {
        gameId,
        name,
        weekDays: weekDays.join(','),
        useVoiceChannel,
        yearsPlaying,
        hourStart: convertHourStringToMinutes(hourStart),
        hourEnd: convertHourStringToMinutes(hourEnd),
        discord
    },
  });

  return res.status(201).json(ads);
});

app.listen(8080, () => console.log("Server On"));
