import http from './method'

// 查询
export const musicxmlAllByName = (params = {}) => {
  return http().post('/api/front/musicxml/search', params)
};


export const xmlSetAllByName = (params = {}) => {
  return http().post('/api/front/xmlset/search', params)
};