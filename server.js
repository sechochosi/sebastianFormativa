import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
}

startServer();
