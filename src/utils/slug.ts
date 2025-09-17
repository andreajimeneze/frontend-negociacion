

export const generarSlug = (titulo: string) =>
  titulo
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '') // elimina acentos, comas, puntos, etc.
    .replace(/\s+/g, '-');       // reemplaza espacios por guiones
