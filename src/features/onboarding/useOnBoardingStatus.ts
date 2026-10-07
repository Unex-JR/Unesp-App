import { db } from "@/db";
import { users } from "@/db/schema/users";
import type { AuthUser } from "@/features/auth/types";
import { isOnBoardingComplete } from "@/services/onboarding.service";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite"; // Query que roda novamente toda vez que a tabela alvo muda

export function useOnBoardingStatus(user: AuthUser | null) {
  const emailFilter = user?.email ?? "__no_user__";

  const { data, updatedAt } = useLiveQuery(
    db.select().from(users).where(eq(users.email, emailFilter)),
  );

  if (!user) {
    return { hasCompleteOnBoarding: false, loading: false };
  }

  return {
    hasCompleteOnBoarding: isOnBoardingComplete(data?.[0]),
    loading: updatedAt === undefined,
  };
}
