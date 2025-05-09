import { type HTMLAttributes, type RefObject, useEffect, useRef } from 'react'
import Tempus from 'tempus' // Import default export as Tempus
import Orchestra from './orchestra'

type OrchestraToggleProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'id' | 'children'
> & {
  children: string
  id: string
  buttonRef?: RefObject<HTMLButtonElement | null>
}

export function OrchestraToggle({
  id,
  children,
  buttonRef,
  ...props
}: OrchestraToggleProps) {
  const elementRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (!Orchestra) return
    Orchestra.add(id, children)
    const toggle = Orchestra.toggles.find((toggle) => toggle.id === id)

    Tempus.add(() => { // Use Tempus.add() to schedule the callback
      if (toggle?.domElement) {
        elementRef.current.appendChild(toggle.domElement)
        if (buttonRef?.current) {
          buttonRef.current = toggle.domElement
        }
      }
    })

    return () => {
      Orchestra?.remove(id)
      Tempus.add(() => { // Use Tempus.add() to schedule the callback
        toggle?.domElement.remove()
        if (buttonRef?.current) {
          buttonRef.current = null
        }
      })
    }
  }, [id, children])

  return <div ref={elementRef} {...props} />
}
