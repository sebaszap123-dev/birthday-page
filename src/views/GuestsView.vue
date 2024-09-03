<template>
  <div class="guests min-h-screen bg-white p-4 sm:p-8">
    <h2 class="text-3xl sm:text-4xl mb-6 sm:mb-8 text-center text-tertiary font-cursive">
      Lista de Invitados
    </h2>
    <div class="max-w-full sm:max-w-3xl mx-auto overflow-x-auto">
      <table class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead class="bg-primary text-white">
          <tr>
            <th class="py-2 px-3 sm:py-3 sm:px-4 text-left">Nombre</th>
            <th class="py-2 px-3 sm:py-3 sm:px-4 text-left">Asistencia</th>
            <th class="py-2 px-3 sm:py-3 sm:px-4 text-left">Hora de llegada</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="guest in guests"
            :key="guest.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="py-2 px-3 sm:py-3 sm:px-4 text-black">{{ guest.name }}</td>
            <td class="py-2 px-3 sm:py-3 sm:px-4 text-black">
              <span
                :class="guest.attending ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ guest.attending ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="py-2 px-3 sm:py-3 sm:px-4 text-black">{{ guest.arrivalTime || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
      <p class="text-black mt-10 flex w-full justify-center">Invitados {{ guests.length }}</p>
      <div class="mt-10 mb-10"></div>
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
@media (max-width: 640px) {
  table {
    font-size: 0.875rem;
  }
}
</style>
