import { makeAutoObservable } from "mobx"
import { RightDown, LeftDown, RightTop, LeftTop, initialState, TCells, ITakeMoves } from './helper'

export class Field {

    activePlayer = 'w'
    winner = ''
    activeFigure = '' //координаты активной фигуры
    whiteScore: number[] = [] // очки белых
    redScore: number[] = [] // очки красных
    possibleMoves: string[] = [] //теоретические ходы
    takeMoves: ITakeMoves = {} // ходы где можно съесть противника
    cells: TCells = initialState //игровое поле
    constructor() {
        makeAutoObservable(this)
        this.nextRightDown = this.nextRightDown.bind(this)
        this.nextLeftDown = this.nextLeftDown.bind(this)
        this.nextRightTop = this.nextRightTop.bind(this)
        this.nextLeftTop = this.nextLeftTop.bind(this)
    }

    setActive(coords: string, player: string) {
        this.possibleMoves = []
        this.takeMoves = {}
        if (this.cells[coords] && this.activePlayer === player) {
            this.activeFigure = coords
            if (!this.cells[coords]?.isQueen) {
                this.fetchSteps(this.activePlayer, coords)
            } else {
                this.fetchQueenSteps(coords)
            }
        }
    }

    fetchSteps(player: string, coords: string, step = 1) {
        if (player === 'w') {
            this.addMoves(coords, LeftTop)
            this.addMoves(coords, RightTop)
        } else {
            this.addMoves(coords, LeftDown)
            this.addMoves(coords, RightDown)
        }

    }

    fetchQueenSteps(coords: string) {
        this.addMoves(coords, LeftTop)
        this.addMoves(coords, RightTop)
        this.addMoves(coords, LeftDown)
        this.addMoves(coords, RightDown)
    }

    nextRightDown(coords: string) {
        let [y, x] = coords.split(':')
        return (+y + 1) + ':' + (+x + 1)
    }
    nextLeftDown(coords: string) {
        let [y, x] = coords.split(':')
        return (+y + 1) + ':' + (+x - 1)
    }

    nextRightTop(coords: string) {
        let [y, x] = coords.split(':')
        return (+y - 1) + ':' + (+x + 1)
    }

    nextLeftTop(coords: string) {
        let [y, x] = coords.split(':')
        return (+y - 1) + ':' + (+x - 1)
    }

    getDirectionHandler(direction: string) {
        switch (direction) {
            case RightDown: return this.nextRightDown
            case LeftDown: return this.nextLeftDown
            case RightTop: return this.nextRightTop
            case LeftTop: return this.nextLeftTop
        }
    }

    addMoves(coords: string, direction: string) {
        let currentStep = ''
        let nextStepHandler = this.getDirectionHandler(direction)
        currentStep = nextStepHandler!(coords)
        const currentFigure = this.cells[this.activeFigure]
        if (currentFigure?.isQueen) {
            while (this.isEmptyCell(currentStep)) {
                this.addStep(currentStep)
                currentStep = nextStepHandler!(currentStep)
            }
            this.addTakeMoves(currentStep, nextStepHandler)
        } else {
            if (this.isEmptyCell(currentStep)) {
                this.addStep(currentStep)
            } else {
                this.addTakeMoves(currentStep, nextStepHandler)
            }
        }
    }

    addTakeMoves(coords: string, nextStepHandler: ((coords: string) => string) | undefined) {
        const [y, x] = coords.split(':')
        if (this.isRivalFigure(coords, this.activePlayer) && (+y > 1 && +y < 8) && (+x > 1 && +x < 8)) {
            const takeStep = nextStepHandler!(coords)
            if (!this.cells[takeStep]) {
                this.addStep(takeStep, coords)
            }
        }
    }

    isEmptyCell(coords: string) {
        return coords in this.cells && !this.cells[coords]

    }

    isRivalFigure(coords: string, player: string) {
        return this.cells[coords] && this.cells[coords]?.player !== player
    }

    addStep(coords: string, take = '') {
        if (!take) {
            this.possibleMoves.push(coords)
        } else {
            this.takeMoves[coords] = take
        }
    }

    move(coords: string) {
        if (this.possibleMoves.includes(coords)) {
            this.cells[coords] = this.cells[this.activeFigure]
            this.cells[this.activeFigure] = null
            this.isQueen(coords)
            this.changePlayer()
        } else if (coords in this.takeMoves) {
            const removeFigureCoords = this.takeMoves[coords]
            this.activePlayer === 'w' ? this.whiteScore.push(1) : this.redScore.push(1)
            this.checkWinner()
            this.cells[removeFigureCoords] = null
            this.cells[coords] = this.cells[this.activeFigure]
            this.cells[this.activeFigure] = null
            this.isQueen(coords)
            this.setActive(coords, this.activePlayer)
            this.possibleMoves = []
            if (!Object.keys(this.takeMoves).length) {
                this.changePlayer()
            }
        }

    }

    checkWinner() {
        if (this.whiteScore.length === 11) {
            this.winner = "Белые победили"
        }
        if (this.redScore.length === 11) {
            this.winner = "Красные победили"
        }
    }

    changePlayer() {
        if (this.activePlayer === 'w') {
            this.activePlayer = 'r'
        } else {
            this.activePlayer = 'w'
        }
        this.activeFigure = ''
        this.takeMoves = {}
        this.possibleMoves = []
    }

    isQueen(coords: string) {
        if (this.cells[coords]) {
            const [y, x] = coords.split(':')
            const player = this.cells[coords]?.player
            if ((player === 'w' && +y === 1) || (player === 'r' && +y === 8)) {
                this.cells[coords]!.isQueen = true
            }

        }
    }

    reset() {
        this.activePlayer = 'w'
        this.winner = ''
        this.activeFigure = ''
        this.whiteScore = []
        this.redScore = []
        this.possibleMoves = []
        this.takeMoves = {}
        this.cells = initialState
    }


}

export const field = new Field()