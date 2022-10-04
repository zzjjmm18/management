import request from '@/utils/request'

export function getHistorysData(data) {
  return request({
    url: `/social_securitys/historys/archiveDetail/${data.userId}/${data.yearMonth}`,
    data
  })
}
