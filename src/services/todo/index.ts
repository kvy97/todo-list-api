import { dbClient } from "../../dbClient";
import { TodoService } from "./service";

export const todoService = new TodoService(dbClient)