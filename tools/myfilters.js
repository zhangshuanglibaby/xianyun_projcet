import moment from 'moment'


//时间过滤器
export const timeFormat = (time) => {
    return moment(time).format('YYYY-MM-DD')
}

