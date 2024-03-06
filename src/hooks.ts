import interact from "interactjs";
import { CSSProperties, useEffect, useRef, useState } from "react";

type Partial<T> = {
  [P in keyof T]?: T[P];
};

const initPosition = {
  width: 100,
  height: 40,
  x: 0,
  y: 0
}


export function useInteractJS(
  position: Partial<typeof initPosition> = initPosition
) {

  // 引数で指定したpositionを初期値として、Stateを作る
  const [_position, setPosition] = useState({
    ...initPosition,
    ...position
  })

  const interactRef = useRef(null)
  let { x, y, width, height } = _position

  const enable = () => {
    interact((interactRef.current as unknown) as HTMLElement)
      // ドラッグでコンポーネントを動かすための処理を追加
      .draggable({
        inertia: false
      })
      .on('dragmove', event => {
        x += event.dx
        y += event.dy
        // ドラッグ後の座標をstateに保存する
        setPosition({
          width,
          height,
          x,
          y
        })
      })
  }

  const disable = () => {
    interact((interactRef.current as unknown) as HTMLElement).unset()
  }

  useEffect(() => {
    enable()
    return disable
  }, [])

  return {
    ref: interactRef,
    style: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      position: 'absolute' as CSSProperties['position'],
      width: _position.width + 'px', // <= 大きさを要素に適用するためにスタイルを追加
      height: _position.height + 'px', // <= 大きさを要素に適用するためにスタイルを追加
    },
  }
}
