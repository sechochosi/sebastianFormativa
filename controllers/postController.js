import Post from "../models/Post.js";
import User from "../models/User.js";

// Obtener todos los posts públicos
export const getAllPublishedPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { status: "published" },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName", "faculty"]
      },
      order: [["createdAt", "DESC"]]
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener publicaciones", details: err.message });
  }
};

// Obtener un post por ID
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id, {
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName", "faculty"]
      }
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el post", details: err.message });
  }
};

// Crear un post (usuario autenticado y activo)
export const createPost = async (req, res) => {
  const { title, content, category, status } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user || !user.isActive) {
      return res.status(403).json({ error: "Usuario no autorizado o inactivo" });
    }

    const newPost = await Post.create({
      title,
      content,
      category,
      status: status || "draft",
      userId: user.id
    });

    res.status(201).json({ message: "Post creado correctamente", post: newPost });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el post", details: err.message });
  }
};

// Obtener los posts del usuario autenticado
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]]
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tus publicaciones", details: err.message });
  }
};

// Actualizar post (solo si es el autor)
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, status } = req.body;

  try {
    const post = await Post.findByPk(id);

    if (!post || post.userId !== req.user.id) {
      return res.status(403).json({ error: "No autorizado para editar este post" });
    }

    await post.update({ title, content, category, status });

    res.json({ message: "Post actualizado correctamente", post });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el post", details: err.message });
  }
};

// Eliminar post (solo si el rol es teacher o admin)
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    if (req.user.role !== "admin" && req.user.role !== "teacher") {
      return res.status(403).json({ error: "Solo admin o teacher pueden eliminar posts" });
    }

    await post.destroy();

    res.json({ message: "Post eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el post", details: err.message });
  }
};
