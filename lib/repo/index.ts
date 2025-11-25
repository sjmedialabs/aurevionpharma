import type { IDataRepository } from "./IDataRepository"
import { MongoDBRepository } from "./MongoDBRepository"

// Force MongoDB usage in production - no more InMemory fallback
export function getRepository(): IDataRepository {
  return new MongoDBRepository()
}

export type { IDataRepository }
