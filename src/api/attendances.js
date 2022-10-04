import request from '@/utils/request'

// 获取考勤详情
export function getAtteArchiveDetail(data) {
  return request({
    url: `/attendances/archive/${data.userId}/${data.yearMonth}`
  })
}
