import React, { Component } from 'react'
import style from './style'
import { Tooltip } from 'ui'

interface IState {
    startId: number
    startStyle: string
    isBindUp: boolean
    isClick: boolean[][]
    startIsClick: boolean
    preIndex: string
    dataList: string[]
    result: string
    col: number
}

export interface ITimeTableProps {
    row?: number
    count?: number
    num?: number
    className?: string
    onChange: (item: string) => void
    style?: object
    value?: string
    isColNum?: boolean
}

const week = ['一', '二', '三', '四', '五', '六', '日']
class TimeTable extends Component<ITimeTableProps, IState> {
    static defaultProps: ITimeTableProps = {
        row: 7,
        count: 50,
        num: 10000,
        onChange: string => {},
        isColNum: true
    }

    state = {
        startId: 0,
        startStyle: '',
        isBindUp: false,
        isClick: [],
        startIsClick: false,
        preIndex: '',
        dataList: [],
        result: '',
        col: 48
    }

    handleGetChange = () => {
        // const dataList = this.state.dataList
        let timeSeries = ''
        for (let i = 0; i < this.props.row; i++) {
            for (let j = 0; j < this.state.col; j++) {
                if (this.state.isClick[i][j]) {
                    if (this.state.col === 24) timeSeries += '11'
                    else timeSeries += '1'
                } else {
                    if (this.state.col === 24) timeSeries += '00'
                    else timeSeries += '0'
                }
            }
        }
        // console.log(result)
        // dataList.splice(0, dataList.length)
        // for (let i = 0; i < this.props.row; i++) {
        //     for (let j = 0; j < this.props.col; j++) {
        //         if (this.state.isClick[i][j]) {
        //             const indexData = this.props.num + this.props.count * (i * this.props.col + j + 1)
        //             if (!dataList.find(pane => pane === indexData)) {
        //                 dataList.push(indexData)
        //             }
        //         }
        //     }
        // }
        // this.setState({ dataList: dataList })
        this.props.onChange(timeSeries)
    }

    handleSetColor = e => {
        const classIndex = e.target.className
        if (e.target.tagName === 'LI') {
            if (classIndex.indexOf('active') !== -1) {
                e.target.className = 'box'
            } else {
                e.target.className = 'box active'
            }
            const dataId = e.target.getAttribute('data-id')
            const point = {
                x: Math.floor(((dataId - this.props.num) / this.props.count - 1) / this.state.col),
                y: ((dataId - this.props.num) / this.props.count - 1) % this.state.col
            }
            const isClick = this.state.isClick
            isClick[point.x][point.y] = !isClick[point.x][point.y]
            this.setState({ isClick })
            this.handleGetChange()
        }
    }

    handleMouseUp = e => {
        this.setState({ isBindUp: false })
    }

    handleMouseDown = e => {
        const classIndex = e.target.className
        this.setState({ startId: e.target.getAttribute('data-id') })
        this.setState({ preIndex: e.target.getAttribute('data-id') })
        if (classIndex.indexOf('active') !== -1) {
            this.setState({ startIsClick: false })
        } else {
            this.setState({ startIsClick: true })
        }
        this.setState({ isBindUp: true })
    }

    handleSetColorEvent = e => {
        const endIndex = e.target.getAttribute('data-id')
        const startIndex = this.state.startId
        if (endIndex !== this.state.preIndex) {
            this.setState({ preIndex: endIndex })
            const sPoint = {
                x: Math.floor(((startIndex - this.props.num) / this.props.count - 1) / this.state.col),
                y: ((startIndex - this.props.num) / this.props.count - 1) % this.state.col
            }
            const ePoint = {
                x: Math.floor(((endIndex - this.props.num) / this.props.count - 1) / this.state.col),
                y: ((endIndex - this.props.num) / this.props.count - 1) % this.state.col
            }
            const minX = Math.min(sPoint.x, ePoint.x)
            const maxX = Math.max(sPoint.x, ePoint.x)
            const minY = Math.min(sPoint.y, ePoint.y)
            const maxY = Math.max(sPoint.y, ePoint.y)
            const isClick = this.state.isClick
            for (let i = minX; i <= maxX; i++) {
                for (let j = minY; j <= maxY; j++) {
                    isClick[i][j] = this.state.startIsClick
                }
            }
            this.setState({ isClick })
            this.handleGetChange()
        }
    }

    handleMouseMove = e => {
        if (this.state.isBindUp) {
            this.handleSetColorEvent(e)
        }
    }

    handleDelete = () => {
        const isClick = this.state.isClick
        for (let i = 0; i < this.props.row; i++) {
            for (let j = 0; j < this.state.col; j++) {
                isClick[i][j] = false
            }
        }
        this.setState({ isClick })
        this.handleGetChange()
    }

    componentWillMount() {
        if (!this.props.isColNum) {
            this.setState({ col: 24 })
        }
        this.initCheck(this.props.value)
        document.onmouseup = this.handleMouseUp.bind(this)
    }

    componentWillReceiveProps(newProps: ITimeTableProps) {
        if (typeof this.props.value === 'undefined' && typeof newProps.value !== 'undefined') {
            const value = newProps.value.split('')
            if (this.state.col === 24) {
                const valueArray = []
                let j = 0
                for (let i = 0; i < value.length; i++) {
                    if (i % 2) {
                        valueArray[j++] = value[i]
                    }
                }
                this.initCheck(valueArray)
            } else {
                this.initCheck(value)
            }
        }
    }
    initCheck = newProps => {
        for (let i = 0; i < this.props.row; i++) {
            this.state.isClick[i] = []
            for (let j = 0; j < this.state.col; j++) {
                if (newProps) {
                    if (newProps[i * this.state.col + j] === '1') {
                        this.state.isClick[i].push(true)
                    } else {
                        this.state.isClick[i].push(false)
                    }
                }
            }
        }
    }

    render() {
        return (
            <div className={`${this.props.className} duration-area`} style={this.props.style}>
                <div className="duration">
                    <ul className="header" id="head">
                        <li className="pull-left info">星期／时间</li>
                        <li className="pull-left time">
                            <div className="num">00:00 - 12:00</div>
                            <ul className="detail clearfix">
                                {Array(11)
                                    .fill(0)
                                    .map((item, index) => (
                                        <li className="digital pull-left" key={index}>
                                            {index}
                                        </li>
                                    ))}
                                <li className="digital pull-left last">11</li>
                            </ul>
                        </li>
                        <li className="pull-left time">
                            <div className="num">12:00 - 24:00</div>
                            <ul className="detail clearfix">
                                {Array(11)
                                    .fill(0)
                                    .map((item, index) => (
                                        <li className="digital pull-left" key={index + 12}>
                                            {index + 12}
                                        </li>
                                    ))}
                                <li className="digital pull-left last">23</li>
                            </ul>
                        </li>
                    </ul>
                    <div className="time-content">
                        <ul className="pull-left week">
                            <li className="day">星期一</li>
                            <li className="day">星期二</li>
                            <li className="day">星期三</li>
                            <li className="day">星期四</li>
                            <li className="day">星期五</li>
                            <li className="day">星期六</li>
                            <li className="day">星期日</li>
                        </ul>
                        <ul
                            className="boxzone"
                            id="box-content"
                            onClick={this.handleSetColor}
                            onMouseDown={this.handleMouseDown}
                            onMouseMove={this.handleMouseMove}
                        >
                            {Array(this.props.row)
                                .fill(0)
                                .map((rowItem, i) =>
                                    Array(this.state.col)
                                        .fill(0)
                                        .map((colItem, j) => (
                                            <Tooltip
                                                placement="topLeft"
                                                title={
                                                    this.state.col === 48
                                                        ? `星期${week[i]} ${
                                                              !(j % 2)
                                                                  ? `${
                                                                        Math.floor(j / 2) >= 10
                                                                            ? Math.floor(j / 2)
                                                                            : '0' + Math.floor(j / 2)
                                                                    }:00- ${
                                                                        Math.floor(j / 2) >= 10
                                                                            ? Math.floor(j / 2)
                                                                            : '0' + Math.floor(j / 2)
                                                                    }:30`
                                                                  : `${
                                                                        Math.floor(j / 2) >= 10
                                                                            ? Math.floor(j / 2)
                                                                            : '0' + Math.floor(j / 2)
                                                                    }:30-${
                                                                        Math.floor((j + 1) / 2) >= 10
                                                                            ? Math.floor((j + 1) / 2)
                                                                            : '0' + Math.floor((j + 1) / 2)
                                                                    }:00`
                                                          }`
                                                        : `星期${week[i]} ${j >= 10 ? j : `0${j}`}:00-${
                                                              j + 1 >= 10 ? j + 1 : `0${j + 1}`
                                                          }:00`
                                                }
                                                arrowPointAtCenter
                                            >
                                                <li
                                                    key={
                                                        this.props.num + this.props.count * (i * this.state.col + j + 1)
                                                    }
                                                    data-id={
                                                        this.props.num + this.props.count * (i * this.state.col + j + 1)
                                                    }
                                                    className={this.state.isClick[i][j] ? 'box active' : 'box'}
                                                    style={{ width: (48 / this.state.col) * 13 }}
                                                />
                                            </Tooltip>
                                        ))
                                )}
                        </ul>
                    </div>
                </div>
                <div className="duration-tipline">
                    <span className="color-box" />
                    <span>未选</span>
                    <span className="color-box color-blue" />
                    <span>已选</span>
                    <span className="weektip">可拖动鼠标选择时间段</span>
                    <a onClick={this.handleDelete} className="emptied" style={{ cursor: 'pointer' }}>
                        撤销所有选择
                    </a>
                </div>
            </div>
        )
    }
}

export default style(TimeTable)
