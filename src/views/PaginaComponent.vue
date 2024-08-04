<template>
  <div class="bg-img">
    <div class="form-container">
      <img class="background-image" src="https://firebasestorage.googleapis.com/v0/b/proyectofinal-938c3.appspot.com/o/19388.jpg?alt=media&token=90faecfa-1f06-41a2-8241-3413cdf6324a" alt="Fondo">
      <form @submit.prevent="signIn">
        <label for="email"><b>Correo</b></label>
        <input v-model="email" type="email" placeholder="Escribe tu correo" name="email" required>

        <label for="psw"><b>Contraseña</b></label>
        <input v-model="password" type="password" placeholder="Escribe tu contraseña" name="psw" required>

        <button type="submit" class="btn">Entrar</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../assets/utils/firebase.js';

export default {
  name: 'PaginaComponent',
  setup(props, { emit }) {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');

    const signIn = async () => {
      errorMessage.value = '';
      successMessage.value = '';

      if (!email.value || !password.value) {
        errorMessage.value = 'Por favor, complete todos los campos.';
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        successMessage.value = 'Inicio de sesión exitoso';
        emit('authenticated');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage.value = 'Correo incorrecto.';
            break;
          case 'auth/wrong-password':
            errorMessage.value = 'Contraseña incorrecta.';
            break;
          case 'auth/user-not-found':
            errorMessage.value = 'Usuario no encontrado.';
            break;
          default:
            errorMessage.value = `Error al iniciar sesión: ${error.message}`;
            break;
        }
      }
    };

    return {
      email,
      password,
      errorMessage,
      successMessage,
      signIn
    };
  }
}
</script>

<style scoped>
.bg-img {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;
}

form {
  width: 90%;
  max-width: 400px;
  background: rgba(17, 15, 23, 0.7);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

label {
  display: block;
  margin: 10px 0;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 50px;
}

button.btn {
  width: 95%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin: 10px 0;
}

button.btn:hover {
  background-color: #0056b3;
}

.error {
  color: #ff0000;
}

.success {
  color: #28a745;
}
</style>
