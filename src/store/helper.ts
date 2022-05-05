export const RightDown = 'rightDown'
export const LeftDown = 'leftDown'
export const RightTop = 'rightTop'
export const LeftTop = 'leftTop'

export const initialState = {
    '1:1': null, '1:2': { isQueen: false, player: 'r' }, '1:3': null, '1:4': { isQueen: false, player: 'r' }, '1:5': null, '1:6': { isQueen: false, player: 'r' }, '1:7': null, '1:8': { isQueen: false, player: 'r' },
    '2:1': { isQueen: false, player: 'r' }, '2:2': null, '2:3': { isQueen: false, player: 'r' }, '2:4': null, '2:5': { isQueen: false, player: 'r' }, '2:6': null, '2:7': { isQueen: false, player: 'r' }, '2:8': null,
    '3:1': null, '3:2': { isQueen: false, player: 'r' }, '3:3': null, '3:4': { isQueen: false, player: 'r' }, '3:5': null, '3:6': { isQueen: false, player: 'r' }, '3:7': null, '3:8': { isQueen: false, player: 'r' },
    '4:1': null, '4:2': null, '4:3': null, '4:4': null, '4:5': null, '4:6': null, '4:7': null, '4:8': null,
    '5:1': null, '5:2': null, '5:3': null, '5:4': null, '5:5': null, '5:6': null, '5:7': null, '5:8': null,
    '6:1': { isQueen: false, player: 'w' }, '6:2': null, '6:3': { isQueen: false, player: 'w' }, '6:4': null, '6:5': { isQueen: false, player: 'w' }, '6:6': null, '6:7': { isQueen: false, player: 'w' }, '6:8': null,
    '7:1': null, '7:2': { isQueen: false, player: 'w' }, '7:3': null, '7:4': { isQueen: false, player: 'w' }, '7:5': null, '7:6': { isQueen: false, player: 'w' }, '7:7': null, '7:8': { isQueen: false, player: 'w' },
    '8:1': { isQueen: false, player: 'w' }, '8:2': null, '8:3': { isQueen: false, player: 'w' }, '8:4': null, '8:5': { isQueen: false, player: 'w' }, '8:6': null, '8:7': { isQueen: false, player: 'w' }, '8:8': null,
}

export type TCells = {
    [key: string]: { isQueen: boolean, player: string } | null
}

export interface IField {
    activePlayer: string,
    activeFigure: string,
    whiteScore: number[],
    redScore: number[],
    cells: TCells,
    takeMoves: ITakeMoves,
    possibleMoves: string[],
    winner: string,
    setActive: (coords: string, player: string) => void,
    fetchSteps: (player: string, coords: string, step: number) => void,
    fetchQueenSteps: (coords: string) => void,
    addMoves: (coords: string, take: string) => void,
    move: (coords: string) => void,
    addTakeMoves: (coords: string, nextStepHandler: ((coords: string) => string) | undefined) => void,
    nextRightDown: (coords: string) => string,
    nextLeftDown: (coords: string) => string,
    nextRightTop: (coords: string) => string,
    nextLeftTop: (coords: string) => string,
    isEmptyCell: (coords: string) => boolean,
    isRivalFigure: (coords: string, player: string) => void,
    addStep: (coords: string, take: string) => void,
    getDirectionHandler: (directionType: string) => ((coords: string) => string) | undefined,
    changePlayer: () => void,
    checkWinner: () => void,
    reset: () => void,
    isQueen: (coords: string) => void
}
export interface ITakeMoves {
    [key: string]: string
}
