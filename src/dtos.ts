import z from "zod";
import { createMatchType } from "./types";
import { CreateMatchDtoSchema } from "./validation/matches";

export type createMatchDto = z.infer<typeof CreateMatchDtoSchema> 