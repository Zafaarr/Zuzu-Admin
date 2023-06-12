import { request } from "./axios";

export const adminService = {
  getAll: (slug) => request.get(`${slug}`),
  getById: (slug, id) => request.get(`${slug}/${id}`),
  updateById: ({ slug, id, body }) => request.put(`${slug}/${id}`, body),
  deleteById: ({ slug, id }) => request.delete(`${slug}/${id}`),
  addItem: ({ slug, body }) => request.post(`${slug}`, body),
};

export const getAll = (slug) => request.get(`${slug}`);
export const getById = (slug, id) => request.get(`${slug}/${id}`);
export const updateById = (slug, id, body) =>
  request.put(`${slug}/${id}`, body);
export const deleteById = (slug, id) => request.delete(`${slug}/${id}`);
export const addItem = (slug, body) => request.post(`${slug}`, body);
