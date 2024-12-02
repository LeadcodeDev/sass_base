import { Authenticated } from '@/commons/types'

type Props = Authenticated

export default function HomePage(props: Props) {
  console.log(props.currentUser?.email)
  return <div>Hello {props.currentUser?.email}</div>
}
