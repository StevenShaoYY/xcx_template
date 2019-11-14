import request from "@/utils/wx-request"
//
export function login(data) {
  return request({
    url: 'eyousystem/login/token',
    method: 'POST',
    data
  })
}

//
export function getAuthorize(data) {
  return request({
    url: 'eyousystem/routine/authorize',
    method: 'get',
    data
  })
}
//校验oppid
export function getValidateUser(data) {
  console.log('getValidateUser', data)
  return request({
    url: 'eyousystem/login/validateUser',
    method: 'post',
    data
  })
}
export function getOpenId(data) {
  return request({
    url: 'eyousystem/login/openId/' + data,
    method: 'get',
    data
  })
}


