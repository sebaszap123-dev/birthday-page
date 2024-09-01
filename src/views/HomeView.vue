<template>
  <div id="app" class="relative min-h-screen bg-primary">
    <!-- Home Section -->
    <section id="home" class="fullscreen bg-[url('../assets/background.jpg')]">
      <div class="content bg-white bg-opacity-80 p-8 rounded-lg">
        <h1 class="text-4xl mb-4 text-tertiary font-cursive">Estás invitado a mi fiesta</h1>
        <p class="mb-6 text-primary">Trae regalo conchetumadre xD</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="fixed bottom-0 left-0 right-0 bg-primary text-white p-4">
      <div class="container mx-auto">
        <table class="w-full text-sm border-collapse">
          <tr class="border-b border-secondary">
            <th class="py-2 px-4 text-left text-secondary font-cursive text-xl">Location</th>
            <th class="py-2 px-4 text-left text-secondary font-cursive text-xl">Date</th>
            <th class="py-2 px-4 text-left text-secondary font-cursive text-xl">Time</th>
            <th class="py-2 px-4" rowspan="2">
              <button
                @click="showConfirmation"
                class="bg-tertiary hover:bg-secondary hover:text-primary text-white py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Confirma tu asistencia
              </button>
            </th>
          </tr>
          <tr>
            <td class="py-2 px-4">Villa de alba 302,<br />Villa de alba</td>
            <td class="py-2 px-4">Saturday, September 07, 2024</td>
            <td class="py-2 px-4">
              Doors Open - 3:00 pm<br />
              Last Call - 8:30 pm
            </td>
          </tr>
        </table>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { guestRef } from '@/assets/js/firebase'
import { addDoc } from 'firebase/firestore'

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter()

    const showConfirmation = () => {
      Swal.fire({
        title: 'Confirma tu asistencia',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Tu nombre">
          <input id="swal-input2" class="swal2-input" type="time" placeholder="Hora de llegada">
          <div class="swal2-checkbox-container">
            <input type="checkbox" id="swal-checkbox" class="swal2-checkbox">
            <label for="swal-checkbox">Asistiré</label>
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const name = (document.getElementById('swal-input1') as HTMLInputElement).value
          const arrivalTime = (document.getElementById('swal-input2') as HTMLInputElement).value
          const attending = (document.getElementById('swal-checkbox') as HTMLInputElement).checked
          if (!name || !arrivalTime) {
            Swal.showValidationMessage('Por favor, completa todos los campos')
          }
          return { name, arrivalTime, attending }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          confirmAttendance(result.value)
        }
      })
    }

    const confirmAttendance = async (guestData: {
      name: string
      arrivalTime: string
      attending: boolean
    }) => {
      try {
        await addDoc(guestRef, guestData)
        Swal.fire('¡Gracias!', 'Tu asistencia ha sido confirmada', 'success')
        router.push('/guests')
      } catch (error) {
        console.error('Error adding document: ', error)
        Swal.fire('Error', 'Hubo un problema al confirmar tu asistencia', 'error')
      }
    }

    return {
      showConfirmation
    }
  }
})
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
