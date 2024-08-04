<template>
  <div>
    <div class="topnav">
      <a href="#home" class="active">Home</a>
      <a v-b-modal.modal-1 class="mb-3">Crear Noticia</a>
    </div>

    <div class="container mt-4">
      <div v-if="news.length" class="news-list">
        <div v-for="item in news" :key="item.id" class="news-item mb-4">
          <br>
          <h3 style="text-align:center">{{ item.title }}</h3>
          <img v-if="item.image" :src="item.image" alt="Noticia" style="display:block;margin-left:auto;margin-right:auto;width:50%" class="img-fluid" />
          <br><br>
          <p style="text-align:center">{{ item.content }}</p>
          <!-- Botón de eliminar -->
          <button @click="deleteNews(item.id)" class="btn btn-danger">Eliminar</button>
        </div>
      </div>

      <!-- Modal para Crear Noticia -->
      <b-modal id="modal-1" title="Crear Noticia" static-backdrop keyboard="false">
        <form @submit.prevent="submitNews">
          <div class="mb-3">
            <label for="fileInput" class="form-label">Imagen (opcional)</label>
            <input type="file" class="form-control" id="fileInput" @change="onFileChange">
          </div>
          <div class="mb-3">
            <label for="titleInput" class="form-label">Título</label>
            <input type="text" class="form-control" id="titleInput" v-model="title" placeholder="Título">
          </div>
          <div class="mb-3">
            <label for="contentInput" class="form-label">Contenido</label>
            <textarea class="form-control" id="contentInput" v-model="content" cols="30" rows="10" placeholder="Contenido"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Publicar</button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/assets/utils/firebase'; // Ajusta la ruta según tu estructura de carpetas

export default {
  data() {
    return {
      title: '',
      content: '',
      image: null,
      news: [] // Array para almacenar las noticias
    }
  },
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
        console.log('Imagen seleccionada:', this.image); // Verifica la imagen seleccionada
      }
    },
    async submitNews() {
      if (this.title && this.content) {
        try {
          const newPost = {
            title: this.title,
            content: this.content,
            image: this.image || '' // Guarda una cadena vacía si no hay imagen
          };
          
          console.log('Enviando noticia:', newPost); // Verifica los datos que se están enviando

          // Guardar noticia en Firestore
          const docRef = await addDoc(collection(db, 'news'), newPost);

          // Actualizar la lista de noticias con el ID del documento
          this.news.push({ ...newPost, id: docRef.id });

          // Limpiar el formulario y cerrar el modal
          this.title = '';
          this.content = '';
          this.image = null;
          this.$bvModal.hide('modal-1');
        } catch (error) {
          console.error("Error al agregar el documento: ", error);
          alert('Hubo un problema al agregar la noticia. Verifica la consola para más detalles.');
        }
      } else {
        alert('Por favor, complete todos los campos.');
      }
    },
    async deleteNews(newsId) {
      try {
        // Eliminar noticia de Firestore
        await deleteDoc(doc(db, 'news', newsId));

        // Actualizar la lista de noticias local
        this.news = this.news.filter(item => item.id !== newsId);
        
        alert('Noticia eliminada con éxito.');
      } catch (error) {
        console.error("Error al eliminar el documento: ", error);
        alert('Hubo un problema al eliminar la noticia. Verifica la consola para más detalles.');
      }
    }
  },
  async mounted() {
    try {
      // Cargar noticias desde Firestore
      const querySnapshot = await getDocs(collection(db, 'news'));
      this.news = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      console.log('Noticias cargadas:', this.news); // Verifica las noticias cargadas
    } catch (error) {
      console.error("Error al obtener los documentos: ", error);
      alert('Hubo un problema al cargar las noticias. Verifica la consola para más detalles.');
    }
  }
}
</script>

<style scoped>
.topnav {
  background-color: #333;
  overflow: hidden;
  position: fixed; /* Fija el banner en la parte superior */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Asegura que el banner esté sobre otros contenidos */
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.container {
  width: 100%;
  padding-top: 60px; /* Espacio suficiente para que el contenido no quede debajo del banner */
}

.news-item {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.btn-danger {
  margin-top: 10px; /* Espacio para separar el botón del contenido */
}
</style>
