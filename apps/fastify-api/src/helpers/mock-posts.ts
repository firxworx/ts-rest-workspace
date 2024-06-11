import { faker } from '@faker-js/faker'
import { deduplicateArray } from '@workspace/common'
import type { Post } from '@workspace/data'

const MOCK_TAGS = deduplicateArray(Array.from({ length: 4 }, () => faker.lorem.word()).map((word) => word))

export const randomSlice = <T>(input: T[]): T[] => {
  const sliceEnd = Math.floor(Math.random() * (input.length + 1))
  return faker.helpers.shuffle(input).slice(0, sliceEnd)
}

export const mockPostFixtureFactory = (partial?: Partial<Post>): Post => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence({ min: 3, max: 5 }),
  content: faker.lorem.paragraph({ min: 1, max: 5 }),
  description: faker.lorem.sentence({ min: 5, max: 15 }),
  tags: randomSlice(MOCK_TAGS), // e.g. ['tag1', 'tag2'],
  ...partial,
})

type OwnedPost = Post & { ownerId: string }

export const mockOwnedResource = (_resource: 'post', partial: Partial<OwnedPost>): OwnedPost => {
  const { ownerId, ...restPost } = partial
  return {
    ownerId: ownerId ?? faker.string.uuid(),
    ...mockPostFixtureFactory(restPost),
  }
}
