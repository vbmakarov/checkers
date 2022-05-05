import { FC } from 'react'
import { Figure } from '../Figure'
import { IField } from '../../store/helper'
import { observer } from 'mobx-react-lite'

type TField = {
    field: IField
}

export const Initialize: FC<TField> = observer(({ field }) => {
    const rows: JSX.Element[] = new Array(8)
    let countRows = 1
    let colorFlag = false
    Object.keys(field.cells).reduce<JSX.Element[]>((acc, coord, index) => {
        const figure = field.cells[coord]
        colorFlag = !colorFlag
        index = index + 1
        let color = colorFlag ? "board__cell board__cell_e" : "board__cell board__cell_o"
        if (index % 8 === 0) {
            colorFlag = !colorFlag
            const step = [...acc,
            <div key={coord}
                className={color}
                data-coord={coord}>
                {
                    figure ?
                        <Figure
                            figure={figure}
                            coords={coord}
                            activeCoords={field.activeFigure}
                            actionHandler={() => field.setActive(coord, figure.player)}
                        /> : ''
                }
                {
                    field.possibleMoves.includes(coord) ?
                        <span
                            className='board__move'
                            onClick={() => field.move(coord)}
                        ></span> : ''
                }
                {
                    field.takeMoves[coord] ?
                        <span
                            className='board__move'
                            onClick={() => field.move(coord)}
                        ></span> : ''
                }
            </div>]
            rows.push(<div key={coord + countRows} className="board__row">{step}</div>)
            countRows++
            return []
        } else {
            return [...acc,
            <div key={coord}
                className={color}
                data-coord={coord}>
                {
                    figure ?
                        <Figure
                            figure={figure}
                            coords={coord}
                            activeCoords={field.activeFigure}
                            actionHandler={() => field.setActive(coord, figure.player)}
                        /> : ''
                }
                {
                    field.possibleMoves.includes(coord) ?
                        <span
                            className='board__move'
                            onClick={() => field.move(coord)}
                        >
                        </span> : ''
                }
                {
                    field.takeMoves[coord] ?
                        <span
                            className='board__move'
                            onClick={() => field.move(coord)}
                        ></span> : ''
                }
            </div>
            ]
        }
    }, [])

    return (
        <>{rows}</>
    )
})