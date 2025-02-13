<template>
    <div class="flex justify-center items-center bg-black rounded-3xl shadow-xl mb-5 border-2 border-blue-300 crd-blue" id="contact" data-aos="flip-right" data-aos-duration="1000">
      <div class="container mx-auto">
        <h1 class="flex justify-center text-2xl md:text-3xl dark:text-slate-200 mx-auto pt-10">Drop me a message<span class="animate-pulsing">|</span></h1>
        <form target="_blank" action="https://formspree.io/f/mgegplkr" method="POST" class="w-full p-8 my-4 md:px-12">
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2 my-5">
            <input type="text" name="name" class="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg" placeholder="Full Name" required>
            <input type="email" name="email" class="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg" placeholder="Email Address" required>
          </div>
          <div class="mb-5">
            <textarea placeholder="Your Message" class="w-full h-32 bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:shadow-outline" name="message" rows="10" required></textarea>
          </div>
          <button type="submit" class="uppercase text-sm font-bold tracking-wide p-3 text-white rounded-full w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-600 hover:scale-[101%] duration-300  shadow-lg border-b-2 border-white">Submit Form</button>
        </form>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  
  const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const submitForm = () => {
    // Handle form submission logic here
    console.log('Form submitted:', form.value);
    
    // Reset form after submission
    form.value = { name: '', email: '', subject: '', message: '' };
  };
  </script>
  