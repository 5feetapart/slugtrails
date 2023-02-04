export default async function loadScript(src: string) {
  let scriptElement: HTMLScriptElement | null = document.querySelector(`script[src='${src}']`)
  await new Promise<void>((resolve) => {
    if (scriptElement === null) {
      scriptElement = document.createElement('script')
      scriptElement.src = src
      document.head.appendChild(scriptElement)
    }
    scriptElement.onload = () => {
      resolve()
    }
  })
}