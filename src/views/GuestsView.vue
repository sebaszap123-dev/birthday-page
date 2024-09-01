<template>
  <div class="guests min-h-screen bg-white p-8">
    <h2 class="text-4xl mb-8 text-center text-tertiary font-cursive">Lista de Invitados</h2>
    <div class="max-w-3xl mx-auto">
      <table class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead class="bg-primary text-white">
          <tr>
            <th class="py-3 px-4 text-left">Nombre</th>
            <th class="py-3 px-4 text-left">Asistencia</th>
            <th class="py-3 px-4 text-left">Hora de llegada</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="guest in guests"
            :key="guest.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="py-3 px-4 text-black">{{ guest.name }}</td>
            <td class="py-3 px-4 text-black">{{ guest.attending ? 'Sí' : 'No' }}</td>
            <td class="py-3 px-4 text-black">{{ guest.arrivalTime || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { guestRef } from '@/assets/js/firebase'
import { getDocs } from 'firebase/firestore'

export default defineComponent({
  name: 'Guests',
  setup() {
    const guests = ref([])

    const fetchGuests = async () => {
      try {
        const querySnapshot = await getDocs(guestRef)
        guests.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.error('Error fetching guests:', error)
      }
    }

    onMounted(fetchGuests)

    return {
      guests
    }
  }
})
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
