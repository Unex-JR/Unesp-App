import type { NewUser, User } from "@/db/schema";
import { insertUser } from "@/repositories/users.repository";

export async function completeProfile(data: NewUser): Promise<User> {
  return insertUser(data);
}

export function isOnBoardingComplete(user: User | undefined): boolean {
  return user !== undefined;
}
