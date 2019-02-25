import styled from 'styled-components'

const style = comp => styled(comp)`
    * {
        padding: 0;
        margin: 0;
        text-align: center;
        box-sizing: border-box;
    }
    ul {
        list-style: none;
    }
    .duration {
        width: 707px;
        border: 1px solid #eee;
        cursor: default;
        border-right: 0;
        line-height: 1;
        font-size: 15px;
        border-bottom: 0;
        position: relative;
        .info,
        .week .day {
            background: #fafafa;
        }
        .boxzone {
            float: left;
            width: 624px;
            height: 100%;
            overflow: hidden;
            .box {
                width: 13px;
                height: 35px;
                float: left;
                background: #fff;
                border-right: 1px solid #eee;
                border-bottom: 1px solid #eee;
                -moz-user-select: -moz-none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                &:hover {
                    background: #f2f2f2;
                }
                &.active,
                &.choosed {
                    background-color: $primary-color;
                }
            }
        }
        .header {
            height: 71px;
            border-bottom: 1px solid #eee;
            text-align: center;
            .info {
                width: 82px;
                height: 70px;
                line-height: 70px;
                border-right: 1px solid #eee;
            }
            .time {
                background: #fafafa;
                border-right: 1px solid #eee;
                width: 312px;
                .detail {
                    width: 313px;
                }
            }
            .num {
                height: 35px;
                line-height: 34px;
                width: 312px;
                border-bottom: 1px solid #eee;
                border-right: 1px solid #eee;
                font-weight: 700;
            }
            .digital {
                width: 26px;
                height: 35px;
                line-height: 35px;
                border-right: 1px solid #eee;
            }
        }
        .timetip {
            position: absolute;
            z-index: 2;
            background: #fff;
            padding: 7px 10px;
            border-radius: 3px;
            border: 1px solid #e4e6eb;
        }
        .time-content {
            clear: both;
            height: 245px;
            overflow: hidden;
            position: relative;
            .pre-selection {
                position: absolute;
                z-index: 2;
            }
            .timetip {
                background: #fff;
                padding: 7px 10px;
                border-radius: 3px;
                border: 1px solid #e4e6eb;
            }
            .pre-selection {
                background: rgba(29, 171, 255, 0.2);
            }
            .week {
                width: 82px;
                border-right: 1px solid #eee;
                height: 100%;
                .day {
                    border-bottom: 1px solid #eee;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                }
            }
        }
    }
    .duration-tipline {
        line-height: 40px;
        width: 707px;
        span {
            display: inline-block;
            vertical-align: middle;
        }
        .color-box {
            display: inline-block;
            height: 16px;
            width: 16px;
            border: 1px solid rgba(57, 73, 103, 0.2);
            vertical-align: middle;
            margin-right: 5px;
        }
        .color-box.color-blue {
            height: 15px;
            width: 15px;
            border-color: $primary-color;
            background: $primary-color;
        }
        .color-box + span {
            margin-right: 15px;
        }
        .weektip {
            color: #888;
            padding-left: 5px;
        }
        .emptied {
            float: right;
        }
    }
    #CssGaga {
        content: '170222112213,hai,334';
    }
    .pull-left {
        float: left !important;
    }
`

export default style
