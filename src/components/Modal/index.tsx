import { IField } from '../../store/helper'
import './style.scss'

export function Modal({ field }: { field: IField }) {
    return (
        <div className="modal__container">
            <div>
                <span>{field.winner}</span><br />
                <button onClick={() => field.reset()}>Начать заново</button>
            </div>
        </div>
    )
}