export interface Aio {
  key: string
  name: string
  url: string
  pcUA: boolean
  tags?: string[]
  fromChina?: boolean
  onLoad?: () => void
  sendMsg: (msg: string) => Promise<void>
  trans?: (src: string) => Promise<string>
}

export interface Xmy {
  quesBtn: boolean;
  theme: "dark" | "light"
  headerSize: 'small' | 'middle' | 'big'
  smallScreenMode: boolean
  pages: string[]
  aios: Record<string, Aio>
}
export interface XmyContext extends Xmy {
  setState: React.Dispatch<React.SetStateAction<Xmy>>
}

export const initXmy: XmyContext = {
  quesBtn: true,
  theme: "light",
  headerSize: 'big',
  smallScreenMode: true,
  pages: [],
  aios: {},
  setState: () => {}
}
