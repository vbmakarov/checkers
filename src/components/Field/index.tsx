import { FC } from 'react'
import { Initialize } from './Initialize'
import './style.scss'
import { field } from '../../store/field'
import { observer } from 'mobx-react-lite'
import { Modal } from '../Modal'

export const Field: FC = observer(() => {
    return (
        <div className="board__field">
            <div className="board__container">
                <Initialize field={field} />
                <div className='board__nums'>
                    <div>8</div>
                    <div>7</div>
                    <div>6</div>
                    <div>5</div>
                    <div>4</div>
                    <div>3</div>
                    <div>2</div>
                    <div>1</div>
                </div>
                <div className='board__letters'>
                    <div>a</div>
                    <div>b</div>
                    <div>c</div>
                    <div>d</div>
                    <div>e</div>
                    <div>f</div>
                    <div>g</div>
                    <div>h</div>
                </div>
            </div>
            <div className='board__score'>
                <h2>счет игры</h2>
                <div className="score">
                    <div className='score__white'>Белые: {field.whiteScore.length}
                        {field.whiteScore.map((_, __) => {
                            return (
                                <div className="score__elem score__elem_w"></div>
                            )
                        })}
                    </div>
                    <div className='score__red'>Красные: {field.redScore.length}
                        {field.redScore.map((_, __) => {
                            return (
                                <div className="score__elem score__elem_r"></div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="switch__player">
                <h2>право первого<br /> хода</h2>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" onClick={() => field.changePlayer()}></span>
                </label>
            </div>
            {
                field.winner ? <Modal field={field} /> : ''
            }
        </div>
    )
})