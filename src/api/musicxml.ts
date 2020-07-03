import http from './method'

// 查询
export const searchAllByName = (params = {}) => {
  return http().post('/api/front/musicxml/search', params)
};