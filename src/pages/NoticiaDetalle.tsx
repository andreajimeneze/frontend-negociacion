import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchApi } from '../services/api';

const NoticiaDetalle = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchApi(`/api/news/${slug}`);

      setPost(data);
    };

    fetchPost();
  }, [slug]);

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">{post.titulo}</h1>
      <p className="text-gray-500 mb-6">{post.fecha_publicacion}</p>

      <img
        src={`https://api-negociacion.vercel.app/public/${post.url_imagen}`}
        className="w-full rounded-xl mb-8"
      />

      <div className="prose max-w-none">
        {post.texto}
      </div>
    </div>
  );
};

export default NoticiaDetalle;
