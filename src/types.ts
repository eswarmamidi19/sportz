import { InferInsertModel } from "drizzle-orm";
import { matches } from "./db/schema";

export type createMatchType = InferInsertModel<typeof matches>
