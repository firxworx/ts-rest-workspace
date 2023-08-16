import { useParams } from 'react-router-dom'
import { Post } from '../components/Post'

export function PostPage(): JSX.Element {
  const { id } = useParams()

  return id?.trim().length ? <Post postId={id} /> : <div>No post found.</div>
}
