export type TFigureParams = { isQueen: boolean, player: string } | null


export type TFigure = {
    figure: TFigureParams
    coords: string,
    actionHandler: () => void,
    activeCoords: string
}


export function setFigure(figure: TFigureParams) {
    let src = ''
    if (figure) {
        if (figure.player === 'w' && !figure.isQueen) src = require('../../images/white.png')
        if (figure.player === 'w' && figure.isQueen) src = require('../../images/white_d.png')
        if (figure.player === 'r' && !figure.isQueen) src = require('../../images/red.png')
        if (figure.player === 'r' && figure.isQueen) src = require('../../images/red_d.png')
    }
    return src
}