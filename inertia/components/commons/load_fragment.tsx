import {
  ComponentType,
  lazy,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from 'react'
import { usePage } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

type Props = {
  source: string
  props?: Record<string, any>
}

export default function LoadFragment(props: PropsWithChildren<Props>) {
  const page = usePage()

  const [Component, setComponent] = useState<ComponentType<any> | null>(null)
  const [componentProps, setComponentProps] = useState<Record<string, any>>({})

  async function loadFragment() {
    const response = await fetch(props.source, {
      headers: {
        'X-Inertia': 'true',
        'X-Inertia-Fragment': 'true',
        'X-Inertia-Version': page.version ?? 'unknown',
      },
    }).then((r) => r.json())

    const component: any = await resolvePageComponent(
      `../../pages/${response.component}.tsx`,
      import.meta.glob('../../pages/**/*.tsx')
    )

    setComponentProps(response.props)
    setComponent(() => lazy(() => Promise.resolve({ default: component.default })))
  }

  useEffect(() => {
    loadFragment().catch(console.error)
  }, [])

  return (
    <div>
      {!Component && props.children ? props.children : null}
      {Component && (
        <Suspense fallback={<div>Loading...</div>}>
          <Component {...props.props} {...componentProps} />
        </Suspense>
      )}
    </div>
  )
}
