import './style.scss'
import { setFigure, TFigure } from './utils'


export function Figure({ figure, coords, actionHandler, activeCoords }: TFigure) {
    let src = setFigure(figure)
    return (
        <img
            src={src}
            alt="фигура"
            className={coords === activeCoords ? "board__figure active" : 'board__figure'}
            data-coord={coords}
            onClick={() => actionHandler()}
        />
    )
}